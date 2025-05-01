
import { Link } from "react-router-dom";

const DesktopNav = () => {
  return (
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
  );
};

export default DesktopNav;
