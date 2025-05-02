
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar } from "lucide-react";

// Mock data for stats
const stats = [
  { 
    title: "Total Users", 
    value: 342, 
    icon: Users, 
    change: "+12%", 
    color: "bg-blue-100 text-blue-600" 
  },
  { 
    title: "Active Bookings", 
    value: 56, 
    icon: FileText, 
    change: "+3%", 
    color: "bg-green-100 text-green-600" 
  },
  { 
    title: "Upcoming Trips", 
    value: 24, 
    icon: Calendar, 
    change: "+18%", 
    color: "bg-orange-100 text-orange-600" 
  },
];

export const StatCards: React.FC = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-md ${stat.color}`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
