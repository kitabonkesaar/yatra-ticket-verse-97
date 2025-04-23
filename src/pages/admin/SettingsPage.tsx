
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Settings</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Site Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Site Name</Label>
              <Input id="site-name" defaultValue="Travel Adventures" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input id="contact-email" defaultValue="contact@traveladventures.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Contact Phone</Label>
              <Input id="contact-phone" defaultValue="+91 98765 43210" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Footer Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="footer-about">About Text</Label>
              <Textarea 
                id="footer-about" 
                rows={4} 
                defaultValue="We are a premium travel company specializing in adventure tours across India."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="copyright">Copyright Text</Label>
              <Input id="copyright" defaultValue="© 2025 Travel Adventures. All rights reserved." />
            </div>
            <Button>Update Footer</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="advance-percentage">Advance Payment %</Label>
              <Input id="advance-percentage" type="number" defaultValue="25" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cancellation-period">Free Cancellation Period (days)</Label>
              <Input id="cancellation-period" type="number" defaultValue="7" />
            </div>
          </div>
          <Button>Save Booking Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
