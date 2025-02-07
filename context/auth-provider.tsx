import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/db";
import { LoginProps, RegisterProps } from "@/types/auth";
import { useFocusEffect, usePathname, useRouter } from "expo-router";
import {
  Auth_ROUTES,
  DEFAULT_REDIRECT_TO_HOME_ROUTE,
  DEFAULT_REDIRECT_TO_LOGIN_ROUTE,
  PUBLIC_ROUTES,
} from "@/constants/routes";
import { normalizePath } from "@/lib/utils";

interface ContextProps {
  currentUser: null | User;
  session: Session | null; // user info
  loading: boolean;
  register: (data: RegisterProps) => Promise<void>;
  authError: AuthError | null;
  login: (data: LoginProps) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
  const [user, setUser] = useState<null | User>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true); // TODO:: add this too and use it for routing handling
  const [authError, setauthError] = useState<AuthError | null>(null);
  const path = usePathname();
  const normalizedPath = normalizePath(path);

  const router = useRouter();

  // auth error
  const _storeError = (error?: AuthError) => {
    if (error) {
      setauthError(error);
    } else {
      setauthError(null);
    }
  };

  // login
  const handleLogin = async ({ email, password }: LoginProps) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setSession(data.session);
      setUser(data.session?.user ?? null);
      _storeError(error!);
    } catch (error) {
      setauthError(error as AuthError);
    } finally {
      setIsLoading(false);
    }
  };

  // register
  const handleRegister = async ({ name, email, password }: RegisterProps) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      setSession(data.session);
      setUser(data.session?.user ?? null);
      _storeError(error!);
    } catch (error) {
      setauthError(error as AuthError);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch session
  const _fetchSession = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        setIsLoading(false);
        return;
      }
      setSession(data.session);
      setUser(data.session?.user ?? null);
    } catch (error) {
      setauthError(error as AuthError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // routing user
  const _handleRouting = useCallback(() => {
    if (isLoading) return;

    const isPublicRoute = PUBLIC_ROUTES.some((route) =>
      normalizedPath.startsWith(route.toString())
    );
    const isAuthRoute = Auth_ROUTES.some((route) =>
      normalizedPath.startsWith(route.toString())
    );

    if (!user) {
      // Only redirect if we're not already on login page and not on a public route
      if (
        !isPublicRoute &&
        !isAuthRoute &&
        !(DEFAULT_REDIRECT_TO_LOGIN_ROUTE.toString() == path) // we need here the absolute path
      ) {
        router.push(DEFAULT_REDIRECT_TO_LOGIN_ROUTE);
      }
    } else {
      // user loggedin
      if (isAuthRoute) {
        router.push(DEFAULT_REDIRECT_TO_HOME_ROUTE);
      }
    }
  }, [isLoading, user, path]);

  // logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setauthError(error);
      }
      setSession(null);
      setUser(null);
      setIsLoading(false);
      router.push(DEFAULT_REDIRECT_TO_LOGIN_ROUTE);
    } catch (error) {
      setauthError(error as AuthError);
    }
  };

  // refetch session , handle routing on path change
  useFocusEffect(
    useCallback(() => {
      _fetchSession();
      _handleRouting();
    }, [isLoading, user, path])
  );

  // update user , session info
  useEffect(() => {
    // listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // console.log(`Supabase auth event: ${event}`); // could be used this event in push /..
        setSession(session);
        setUser(session?.user!);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        currentUser: user,
        session,
        loading: isLoading,
        authError,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
