
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

/**
 * Signs in a user with email and password
 */
export const signInWithEmail = async (email: string, password: string): Promise<void> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  
  toast.success("Logged in successfully!");
};

/**
 * Signs up a new user with email and password
 */
export const signUpWithEmail = async (email: string, password: string, metadata = {}): Promise<void> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });

  if (error) throw error;
  
  toast.success("Account created successfully! Please check your email.");
};

/**
 * Signs out the current user
 */
export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  
  toast.success("Logged out successfully");
};

/**
 * Updates user metadata to ensure admin role
 */
export const ensureAdminRole = async (): Promise<void> => {
  const { error } = await supabase.auth.updateUser({
    data: { role: 'admin' }
  });
  
  if (error) {
    console.warn("Unable to update user metadata:", error);
  }
};

/**
 * Checks if a user is an admin based on email or metadata
 */
export const checkIsAdmin = (user: User | null): boolean => {
  if (!user) return false;

  // Check via email (demo only) or user metadata
  const isAdminByEmail = user.email === "admin@bharatyatra.com";
  const isAdminByMetadata = user.user_metadata?.role === "admin";
  
  return isAdminByEmail || isAdminByMetadata;
};
