
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DesktopNav from "./navbar/DesktopNav";
import AuthButtons from "./navbar/AuthButtons";
import MobileNav from "./navbar/MobileNav";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Set up auth state change listener first
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_, session) => {
            setUser(session?.user || null);
          }
        );
        
        // Then check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
        setLoading(false);
        
        return () => subscription.unsubscribe();
      } catch (error) {
        console.error("Error fetching session:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gradient">Bharat Yatra</span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <AuthButtons loading={loading} user={user} />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-700 rounded-md hover:text-bharat-orange hover:bg-gray-100 focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileNav 
        isOpen={isMenuOpen} 
        user={user} 
        loading={loading} 
        onItemClick={closeMenu} 
      />
    </header>
  );
};

export default Navbar;
