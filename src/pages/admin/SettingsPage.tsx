
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const [siteSettings, setSiteSettings] = useState({
    siteName: "Bharat Yatra",
    contactEmail: "contact@bharatyatra.com",
    contactPhone: "+91 98765 43210",
    footerAbout: "We are a premium travel company specializing in adventure tours across India.",
    copyright: "© 2025 Bharat Yatra. All rights reserved.",
    advancePaymentPercentage: 25,
    cancellationPeriod: 7,
    enableNotifications: true,
    enableReviews: true,
  });

  const handleSiteSave = () => {
    toast({
      title: "Settings saved",
      description: "Your site settings have been updated successfully.",
    });
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    setSiteSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="booking">Booking</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>Manage basic site information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input 
                  id="site-name" 
                  value={siteSettings.siteName} 
                  onChange={(e) => handleChange('siteName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input 
                  id="contact-email" 
                  type="email" 
                  value={siteSettings.contactEmail} 
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <Input 
                  id="contact-phone" 
                  value={siteSettings.contactPhone} 
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                />
              </div>
              <Button onClick={handleSiteSave}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Footer Content</CardTitle>
              <CardDescription>Customize your website footer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="footer-about">About Text</Label>
                <Textarea 
                  id="footer-about" 
                  rows={4} 
                  value={siteSettings.footerAbout}
                  onChange={(e) => handleChange('footerAbout', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="copyright">Copyright Text</Label>
                <Input 
                  id="copyright" 
                  value={siteSettings.copyright}
                  onChange={(e) => handleChange('copyright', e.target.value)}
                />
              </div>
              <Button onClick={handleSiteSave}>Update Footer</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="booking" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Booking Settings</CardTitle>
              <CardDescription>Configure how bookings work on your site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="advance-percentage">Advance Payment %</Label>
                  <Input 
                    id="advance-percentage" 
                    type="number" 
                    value={siteSettings.advancePaymentPercentage}
                    onChange={(e) => handleChange('advancePaymentPercentage', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cancellation-period">Free Cancellation Period (days)</Label>
                  <Input 
                    id="cancellation-period" 
                    type="number" 
                    value={siteSettings.cancellationPeriod}
                    onChange={(e) => handleChange('cancellationPeriod', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between space-y-0 pt-4">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-reviews">Enable Customer Reviews</Label>
                  <p className="text-muted-foreground text-sm">
                    Allow customers to leave reviews after their trips
                  </p>
                </div>
                <Switch 
                  id="enable-reviews" 
                  checked={siteSettings.enableReviews}
                  onCheckedChange={(checked) => handleChange('enableReviews', checked)}
                />
              </div>
              <Button onClick={handleSiteSave} className="mt-6">Save Booking Settings</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure available payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="4" fill="#0066FF" fillOpacity="0.2"/>
                        <path d="M6 11.25H18V16.5C18 16.6989 17.921 16.8897 17.7803 17.0303C17.6397 17.171 17.4489 17.25 17.25 17.25H6.75C6.55109 17.25 6.36032 17.171 6.21967 17.0303C6.07902 16.8897 6 16.6989 6 16.5V11.25Z" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 7.5C6 7.30109 6.07902 7.11032 6.21967 6.96967C6.36032 6.82902 6.55109 6.75 6.75 6.75H17.25C17.4489 6.75 17.6397 6.82902 17.7803 6.96967C17.921 7.11032 18 7.30109 18 7.5V11.25H6V7.5Z" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.75 14.25H12.75" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Razorpay</h4>
                      <p className="text-sm text-gray-500">Accept credit cards and online payments</p>
                    </div>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-md">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="4" fill="#22C55E" fillOpacity="0.2"/>
                        <path d="M12 17.25V6.75" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.5 9.75H8.25C9.04565 9.75 9.80871 9.43393 10.3713 8.87132C10.9339 8.30871 11.25 7.54565 11.25 6.75C11.25 5.95435 11.5661 5.19129 12.1287 4.62868C12.6913 4.06607 13.4543 3.75 14.25 3.75H16.5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.5 14.25H15.75C14.9544 14.25 14.1913 14.5661 13.6287 15.1287C13.0661 15.6913 12.75 16.4544 12.75 17.25C12.75 18.0456 12.4339 18.8087 11.8713 19.3713C11.3087 19.9339 10.5456 20.25 9.75 20.25H7.5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Cash Payment</h4>
                      <p className="text-sm text-gray-500">Accept cash on arrival</p>
                    </div>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://github.com/shadcn.png" alt="Admin User" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input id="full-name" defaultValue="Admin User" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="admin@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" defaultValue="Administrator" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+91 98765 43210" />
                    </div>
                  </div>
                  <Button onClick={() => toast({ title: "Profile updated", description: "Your profile has been saved successfully" })}>
                    Update Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Button onClick={() => toast({ title: "Password updated", description: "Your password has been changed successfully" })}>
                Change Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="font-medium">New Booking Alerts</h4>
                    <p className="text-sm text-gray-500">Get notified when a new booking is made</p>
                  </div>
                  <Switch 
                    checked={siteSettings.enableNotifications}
                    onCheckedChange={(checked) => handleChange('enableNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="font-medium">Booking Cancellations</h4>
                    <p className="text-sm text-gray-500">Get notified when a booking is cancelled</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="font-medium">User Registrations</h4>
                    <p className="text-sm text-gray-500">Get notified when a new user registers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between pb-4">
                  <div>
                    <h4 className="font-medium">System Updates</h4>
                    <p className="text-sm text-gray-500">Get notified about system updates</p>
                  </div>
                  <Switch />
                </div>
                <Button onClick={handleSiteSave}>
                  Save Notification Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
