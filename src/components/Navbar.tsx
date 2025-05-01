
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Ticket } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to log out");
    }
  };

  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

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
            {loading ? (
              <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9 border border-bharat-orange/20">
                      <AvatarFallback className="bg-bharat-orange/10 text-bharat-orange">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                      <p className="font-medium text-sm">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <Ticket className="mr-2 h-4 w-4" />
                      <span>My Bookings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="bg-bharat-orange hover:bg-bharat-orange/90" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
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
            
            {loading ? (
              <div className="h-10 bg-gray-200 rounded animate-pulse mt-2"></div>
            ) : user ? (
              <div className="border-t pt-2 mt-2">
                <div className="px-3 py-2 text-sm font-medium text-gray-700">
                  Signed in as: <span className="font-semibold">{user.email}</span>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-bharat-orange hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-bharat-orange hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Ticket className="w-5 h-5 mr-2" />
                  My Bookings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-bharat-orange hover:bg-gray-100"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </Button>
                <Button className="w-full bg-bharat-orange hover:bg-bharat-orange/90" asChild>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
