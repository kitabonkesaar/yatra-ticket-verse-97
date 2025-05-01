
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function useAdminRoute() {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login", { replace: true });
      } else if (!isAdmin) {
        // If user is not admin, redirect to home
        navigate("/", { replace: true });
      }
    }
  }, [user, loading, navigate, isAdmin]);

  return { user, loading, isAdmin };
}
