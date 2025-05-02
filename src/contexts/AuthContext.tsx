
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType } from "@/types/auth";
import { signInWithEmail, signUpWithEmail, signOut as authSignOut, checkIsAdmin } from "@/services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state change listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Check admin status when session changes
        if (newSession?.user) {
          setIsAdmin(checkIsAdmin(newSession.user));
        } else {
          setIsAdmin(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Check admin status on initial load
      if (currentSession?.user) {
        setIsAdmin(checkIsAdmin(currentSession.user));
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmail(email, password);
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Error signing in");
      throw error;
    }
  };

  const signUp = async (email: string, password: string, metadata = {}): Promise<void> => {
    try {
      await signUpWithEmail(email, password, metadata);
    } catch (error: any) {
      toast.error(error.message || "Error signing up");
      throw error;
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await authSignOut();
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
    }
  };

  const value: AuthContextType = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut: handleSignOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import { toast } from "sonner";
