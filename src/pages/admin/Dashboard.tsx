
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar } from "lucide-react";

// Mock data - in a real app, this would come from your backend
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

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-md ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                  <div className="rounded-full bg-gray-100 p-2">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New booking #{1000 + i}</p>
                    <p className="text-xs text-gray-500">{i} hour{i > 1 ? 's' : ''} ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Popular Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Manali', 'Ladakh', 'Shimla'].map((destination, i) => (
                <div key={destination} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{i + 1}.</div>
                    <div>{destination}</div>
                  </div>
                  <div className="text-sm text-gray-500">{90 - i * 20}% booked</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
