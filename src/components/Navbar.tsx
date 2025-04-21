
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gradient">Bharat Yatra</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-bharat-orange transition-colors">
              Home
            </Link>
            <Link to="/trips" className="text-sm font-medium text-gray-700 hover:text-bharat-orange transition-colors">
              Tours
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-bharat-orange transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-bharat-orange transition-colors">
              Contact
            </Link>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-bharat-orange hover:bg-bharat-orange/90" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-700 rounded-md hover:text-bharat-orange hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-bharat-orange hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/trips"
              className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-bharat-orange hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Tours
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-bharat-orange hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-bharat-orange hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </Button>
              <Button className="w-full bg-bharat-orange hover:bg-bharat-orange/90" asChild>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
