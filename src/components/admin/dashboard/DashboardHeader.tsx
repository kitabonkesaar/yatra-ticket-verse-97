
import React from "react";
import { Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back to your admin portal</p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="w-px h-8 bg-gray-200"></div>
        <Button>
          View Reports <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
