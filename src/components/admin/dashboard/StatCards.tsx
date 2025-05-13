import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const StatCards: React.FC = () => {
  const [stats, setStats] = useState([
    { title: "Total Users", value: 0, icon: Users, change: "", color: "bg-blue-100 text-blue-600" },
    { title: "Active Bookings", value: 0, icon: FileText, change: "", color: "bg-green-100 text-green-600" },
    { title: "Upcoming Trips", value: 0, icon: Calendar, change: "", color: "bg-orange-100 text-orange-600" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      // Total Users (from backend API for Auth users)
      let userCount = 0;
      try {
        const response = await fetch('http://localhost:4000/api/admin-users');
        const result = await response.json();
        userCount = result?.users?.length || result?.data?.length || 0;
      } catch (e) {
        userCount = 0;
      }
      // Active Bookings (status Confirmed)
      const { count: activeBookings } = await supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "Confirmed");
      // Upcoming Trips (start_date in future)
      const today = new Date().toISOString().split('T')[0];
      const { count: upcomingTrips } = await supabase.from("trips").select("id", { count: "exact", head: true }).gt("start_date", today);
      setStats([
        { title: "Total Users", value: userCount || 0, icon: Users, change: "", color: "bg-blue-100 text-blue-600" },
        { title: "Active Bookings", value: activeBookings || 0, icon: FileText, change: "", color: "bg-green-100 text-green-600" },
        { title: "Upcoming Trips", value: upcomingTrips || 0, icon: Calendar, change: "", color: "bg-orange-100 text-orange-600" },
      ]);
      setLoading(false);
    };
    fetchStats();
  }, []);

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
            <div className="text-3xl font-bold">{loading ? "..." : stat.value}</div>
            {/* <p className="text-xs text-muted-foreground mt-1">{stat.change} from last month</p> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
