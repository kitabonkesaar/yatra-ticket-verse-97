
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function useProtectedRoute(adminOnly = false) {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login", { replace: true });
      } else if (adminOnly && !isAdmin) {
        // If admin route but user is not admin
        navigate("/", { replace: true });
      }
    }
  }, [user, loading, navigate, adminOnly, isAdmin]);

  return { user, loading, isAdmin };
}
