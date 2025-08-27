import type { Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

interface authContextValue {
  currentUser: User | null;
  currentSession: Session | null;
  isLoading: boolean;
  setCurrentSession: React.Dispatch<React.SetStateAction<Session | null>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<authContextValue | undefined>(undefined);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getSession();
      setCurrentSession(data.session);
      setCurrentUser(data.session?.user ?? null);
      setIsLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setCurrentSession(session);
        setCurrentUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        currentUser,
        currentSession,
        setCurrentSession,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UseAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Auth comtext used outside of the provider");

  return context;
}
