
import { User } from "@supabase/supabase-js";

/**
 * Hook for managing authorization roles and permissions
 */
export function useAuthRoles() {
  /**
   * Check if user has admin privileges
   */
  const checkAdminPermission = (user: User | null): boolean => {
    if (!user) return false;
    
    const isAdminByEmail = user.email === "admin@bharatyatra.com";
    const isAdminByMetadata = user.user_metadata?.role === "admin";
    
    return isAdminByEmail || isAdminByMetadata;
  };
  
  /**
   * Check if user has permission for a specific action
   */
  const checkPermission = (
    user: User | null, 
    isAdmin: boolean, 
    requiredRole: 'admin' | 'user' = 'user'
  ): { 
    hasPermission: boolean; 
    errorTitle?: string; 
    errorMessage?: string 
  } => {
    if (!user) {
      return {
        hasPermission: false,
        errorTitle: "Authentication Required",
        errorMessage: "You must be logged in to perform this action."
      };
    }
    
    if (requiredRole === 'admin' && !isAdmin) {
      return {
        hasPermission: false,
        errorTitle: "Unauthorized",
        errorMessage: "You must have admin privileges to perform this action."
      };
    }
    
    return { hasPermission: true };
  };

  return {
    checkAdminPermission,
    checkPermission,
  };
}
