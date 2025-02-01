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
import { Href, useFocusEffect, usePathname, useRouter } from "expo-router";
import {
  Auth_ROUTES,
  DEFAULT_REDIRECT_TO_HOME_ROUTE,
  DEFAULT_REDIRECT_TO_LOGIN_ROUTE,
  PUBLIC_ROUTES,
} from "@/constants/routes";

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
  const pathname = usePathname();
  const router = useRouter();

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

  const _handleRouting = useCallback(() => {
    if (!isLoading && !user) {
      // user not login , private path (not public and not auth)
      console.log({ pathname });
      if (
        !DEFAULT_REDIRECT_TO_LOGIN_ROUTE.toString().includes(pathname) &&
        !PUBLIC_ROUTES.find((r) => r.toString().includes(pathname)) &&
        !PUBLIC_ROUTES.find((r) => r.toString().includes(pathname))
      ) {
        router.push(DEFAULT_REDIRECT_TO_LOGIN_ROUTE);
      }
    } else {
      // user login , auth path
      if (Auth_ROUTES.includes(pathname as Href)) {
        router.push(DEFAULT_REDIRECT_TO_HOME_ROUTE); // main page
      }
    }
  }, [isLoading, user, pathname]);

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

  useFocusEffect(
    useCallback(() => {
      _fetchSession();
      _handleRouting();
    }, [isLoading, user, pathname])
  );

  useEffect(() => {
    // listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`);
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
