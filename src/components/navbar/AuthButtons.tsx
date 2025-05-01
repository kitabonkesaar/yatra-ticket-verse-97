
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UserMenu from "./UserMenu";

interface AuthButtonsProps {
  loading: boolean;
  user: any | null;
}

const AuthButtons = ({ loading, user }: AuthButtonsProps) => {
  if (loading) {
    return <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>;
  }
  
  if (user) {
    return <UserMenu user={user} />;
  }
  
  return (
    <>
      <Button variant="outline" asChild>
        <Link to="/login">Login</Link>
      </Button>
      <Button className="bg-bharat-orange hover:bg-bharat-orange/90" asChild>
        <Link to="/register">Register</Link>
      </Button>
    </>
  );
};

export default AuthButtons;
