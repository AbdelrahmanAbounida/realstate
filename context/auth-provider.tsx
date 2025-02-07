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
  session: Session | null;
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
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const path = usePathname();
  const normalizedPath = normalizePath(path);
  const router = useRouter();

  const _storeError = (error?: AuthError) => {
    setAuthError(error || null);
  };

  const handleLogin = async ({ email, password }: LoginProps) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setSession(data.session);
      setUser(data.session?.user ?? null);
    } catch (error) {
      setAuthError(error as AuthError);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

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

      if (error) throw error;

      setSession(data.session);
      setUser(data.session?.user ?? null);
    } catch (error) {
      setAuthError(error as AuthError);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const _fetchSession = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      setSession(data.session);
      setUser(data.session?.user ?? null);
    } catch (error) {
      console.error("Error fetching session:", error);
      setAuthError(error as AuthError);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  }, []);

  const _handleRouting = useCallback(() => {
    if (!isInitialized || isLoading) return;

    const isPublicRoute = PUBLIC_ROUTES.some((route) =>
      normalizedPath.startsWith(route.toString())
    );
    const isAuthRoute = Auth_ROUTES.some((route) =>
      normalizedPath.startsWith(route.toString())
    );

    if (!user) {
      if (
        !isPublicRoute &&
        !isAuthRoute &&
        path !== DEFAULT_REDIRECT_TO_LOGIN_ROUTE
      ) {
        router.replace(DEFAULT_REDIRECT_TO_LOGIN_ROUTE);
      }
    } else if (isAuthRoute) {
      router.replace(DEFAULT_REDIRECT_TO_HOME_ROUTE);
    }
  }, [isInitialized, isLoading, user, path, normalizedPath]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setSession(null);
      setUser(null);
      router.replace(DEFAULT_REDIRECT_TO_LOGIN_ROUTE);
    } catch (error) {
      setAuthError(error as AuthError);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize auth state
  useEffect(() => {
    _fetchSession();
  }, []);

  // Handle routing when auth state or path changes
  // useEffect(() => {
  //   _handleRouting();
  // }, [_handleRouting]);

  // Listen for auth state changes
  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     async (event, session) => {
  //       setSession(session);
  //       setUser(session?.user ?? null);
  //     }
  //   );

  //   return () => {
  //     authListener.subscription.unsubscribe();
  //   };
  // }, []);

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
