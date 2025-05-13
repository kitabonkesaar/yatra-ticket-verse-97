import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await signIn(formData.email, formData.password);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Login error:", error);
      // Error is already handled in the signIn function
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            name="email"
            type="email" 
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-bharat-orange hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input 
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div className="pt-4 text-sm">
          <p className="text-orange-600">Demo Accounts:</p>
          <p>- User: user@bharatyatra.com / password123</p>
          <p>- Admin: admin@bharatyatra.com / admin123</p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          type="submit" 
          className="w-full bg-bharat-orange hover:bg-bharat-orange/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Please wait..." : "Login"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default LoginForm;
