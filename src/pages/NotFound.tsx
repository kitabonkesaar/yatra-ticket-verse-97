
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 bg-gray-50">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-bharat-orange">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We can't seem to find the page you're looking for. Let's get you back on the right path.
          </p>
          <Button size="lg" className="bg-bharat-orange hover:bg-bharat-orange/90" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default NotFound;
