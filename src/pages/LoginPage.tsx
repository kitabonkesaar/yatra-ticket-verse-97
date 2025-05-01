
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthPageLayout from "@/components/auth/AuthPageLayout";
import AuthCard from "@/components/auth/AuthCard";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Redirect if already logged in
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  return (
    <AuthPageLayout loading={loading}>
      <AuthCard />
    </AuthPageLayout>
  );
};

export default LoginPage;
