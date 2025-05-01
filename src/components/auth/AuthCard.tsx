
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
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
          <LoginForm />
        </TabsContent>
        
        <TabsContent value="register">
          <RegisterForm />
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
  );
};

export default AuthCard;
