
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, loading, signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    // Redirect if already logged in
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await signIn(formData.email, formData.password);
    } catch (error) {
      console.error("Login error:", error);
      // Error is already handled in the signIn function
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setIsSubmitting(true);
      await signUp(formData.email, formData.password, {
        name: formData.name
      });
      // After sign up, switch to login
      setIsLogin(true);
    } catch (error) {
      console.error("Registration error:", error);
      // Error is already handled in the signUp function
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state while checking authentication
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

  // If already logged in, user will be redirected by useEffect

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-bharat-orange mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          
          <Card className="shadow-lg animate-scale-in">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-bharat-orange">Welcome to Bharat Yatra</CardTitle>
              <CardDescription>Your journey to spiritual destinations begins here</CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="login" value={isLogin ? "login" : "register"}>
              <TabsList className="grid grid-cols-2 mb-4 mx-4">
                <TabsTrigger value="login" onClick={() => setIsLogin(true)}>Login</TabsTrigger>
                <TabsTrigger value="register" onClick={() => setIsLogin(false)}>Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
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
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        name="name" 
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input 
                        id="reg-email"
                        name="email"
                        type="email" 
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <div className="relative">
                        <Input 
                          id="reg-password"
                          name="password"
                          type={showPassword ? "text" : "password"} 
                          placeholder="Create a password"
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"} 
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      By registering, you agree to our <Link to="/terms" className="text-bharat-orange hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-bharat-orange hover:underline">Privacy Policy</Link>.
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-bharat-orange hover:bg-bharat-orange/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Please wait..." : "Register"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="text-center pb-4 mt-4">
              <span className="text-sm text-gray-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="ml-1 text-bharat-orange hover:underline"
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </span>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
