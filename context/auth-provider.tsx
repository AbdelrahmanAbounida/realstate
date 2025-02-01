import React, { createContext, useState, useEffect } from "react";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/db";
import { LoginProps, RegisterProps } from "@/types/auth";

type ContextProps = {
  currentUser: null | User;
  session: Session | null; // user info
  register: (data: RegisterProps) => void;
  authError: AuthError | null;
  login: (data: LoginProps) => void;
  logout: () => void;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
  const [user, setUser] = useState<null | User>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true); // TODO:: add this too and use it for routing handling
  const [authError, setauthError] = useState<AuthError | null>(null);

  const _storeError = (error?: AuthError) => {
    if (error) {
      setauthError(error);
    } else {
      setauthError(null);
    }
  };

  // login
  const handleLogin = async ({ email, password }: LoginProps) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    _storeError(error!);
  };

  // register
  const handleRegister = async ({ name, email, password }: RegisterProps) => {
    const { data, error } = await supabase.auth.signUp({
      // name, >> TODOL:: how ot add more data
      email,
      password,
    });
    _storeError(error!);
  };

  // logout
  const handleLogout = async () => {};

  // auth session checking >> TODO:: handle routing in case of non authenticated user and authenticated route
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user!);
    });
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
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
