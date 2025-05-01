
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface AuthPageLayoutProps {
  children: ReactNode;
  loading?: boolean;
}

const AuthPageLayout = ({ children, loading = false }: AuthPageLayoutProps) => {
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="h-12 w-48 bg-gray-200 rounded"></div>
            <div className="h-64 w-full max-w-md bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-bharat-orange mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPageLayout;
