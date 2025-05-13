import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import MyBookings from './MyBookings';
const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email.").optional(),
  phone: z.string().optional()
});
const profilePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters")
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
const ProfilePage = () => {
  const {
    user,
    loading
  } = useProtectedRoute();
  const {
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPasswordUpdate, setLoadingPasswordUpdate] = useState(false);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: ""
    }
  });
  const passwordForm = useForm<z.infer<typeof profilePasswordSchema>>({
    resolver: zodResolver(profilePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });
  useEffect(() => {
    if (user) {
      // In a real app, you'd fetch profile details from a profiles table
      // For this demo, we're using user metadata
      form.setValue("fullName", user.user_metadata?.name || "");
      form.setValue("email", user.email || "");
      form.setValue("phone", user.user_metadata?.phone || "");
    }
  }, [user, form]);
  const onUpdateProfile = async (values: z.infer<typeof profileSchema>) => {
    if (!user) return;
    setLoadingProfile(true);
    try {
      const {
        error
      } = await supabase.auth.updateUser({
        data: {
          name: values.fullName,
          phone: values.phone
        }
      });
      if (error) throw error;
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Error updating profile");
    } finally {
      setLoadingProfile(false);
    }
  };
  const onUpdatePassword = async (values: z.infer<typeof profilePasswordSchema>) => {
    setLoadingPasswordUpdate(true);
    try {
      const {
        error
      } = await supabase.auth.updateUser({
        password: values.newPassword
      });
      if (error) throw error;
      toast.success("Password updated successfully");
      passwordForm.reset();
    } catch (error: any) {
      toast.error(error.message || "Error updating password");
    } finally {
      setLoadingPasswordUpdate(false);
    }
  };
  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="h-12 w-48 bg-gray-200 rounded"></div>
            <div className="h-64 w-full max-w-md bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 w-full px-2 sm:px-4 py-4 sm:py-6 max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">My Profile</h1>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-3 sm:mb-4 flex flex-col sm:flex-row gap-2 sm:gap-0 w-full">
            <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
            <TabsTrigger value="password" className="flex-1">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card className="w-full shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onUpdateProfile)}>
                  <CardContent className="space-y-4">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} disabled className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={loadingProfile} className="bg-bharat-orange hover:bg-bharat-orange/90 w-full">
                      {loadingProfile ? "Saving..." : "Update Profile"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card className="w-full shadow-sm mt-4 sm:mt-0">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onUpdatePassword)}>
                  <CardContent className="space-y-4">
                    <FormField control={passwordForm.control} name="currentPassword" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={passwordForm.control} name="newPassword" render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={passwordForm.control} name="confirmPassword" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={loadingPasswordUpdate} className="bg-bharat-orange hover:bg-bharat-orange/90 w-full">
                      {loadingPasswordUpdate ? "Updating..." : "Update Password"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-6 sm:mt-8 text-center flex flex-col gap-3">
          <Link to="/my-bookings">
            <Button variant="secondary" className="w-full">My Bookings</Button>
          </Link>
          <Button variant="outline" onClick={handleLogout} className="w-full">
            Log Out
          </Button>
        </div>
      </main>
      <Footer />
    </div>;
};
export default ProfilePage;