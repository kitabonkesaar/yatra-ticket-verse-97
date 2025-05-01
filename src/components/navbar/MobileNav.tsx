
import { Link } from "react-router-dom";
import { User, LogOut, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface MobileNavProps {
  isOpen: boolean;
  user: any | null;
  loading: boolean;
  onItemClick: () => void;
}

const MobileNav = ({ isOpen, user, loading, onItemClick }: MobileNavProps) => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      onItemClick();
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to log out");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
        <Link
          to="/"
          className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-bharat-orange hover:bg-gray-100"
          onClick={onItemClick}
        >
          Home
        </Link>
        <Link
          to="/trips"
          className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-bharat-orange hover:bg-gray-100"
          onClick={onItemClick}
        >
          Tours
        </Link>
        <Link
          to="/about"
          className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-bharat-orange hover:bg-gray-100"
          onClick={onItemClick}
        >
          About
        </Link>
        <Link
          to="/contact"
          className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-bharat-orange hover:bg-gray-100"
          onClick={onItemClick}
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
              onClick={onItemClick}
            >
              <User className="w-5 h-5 mr-2" />
              Profile
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-bharat-orange hover:bg-gray-100"
              onClick={onItemClick}
            >
              <Ticket className="w-5 h-5 mr-2" />
              My Bookings
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-bharat-orange hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Log out
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-2 pt-2">
            <Button variant="outline" asChild className="w-full">
              <Link to="/login" onClick={onItemClick}>Login</Link>
            </Button>
            <Button className="w-full bg-bharat-orange hover:bg-bharat-orange/90" asChild>
              <Link to="/register" onClick={onItemClick}>Register</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
