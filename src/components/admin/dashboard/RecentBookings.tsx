import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CircleCheck, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Booking {
  id: string;
  user_id: string;
  trip_title: string;
  booking_date: string;
  total_amount: number;
  status: string;
  profile_name?: string;
}

export const RecentBookings: React.FC = () => {
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBookings = async () => {
      setLoading(true);
      // Fetch latest 5 bookings
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select("id, user_id, trip_title, booking_date, total_amount, status")
        .order("booking_date", { ascending: false })
        .limit(5);
      if (error || !bookings) {
        setRecentBookings([]);
        setLoading(false);
        return;
      }
      // Fetch user profiles for names
      const userIds = bookings.map(b => b.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, name")
        .in("id", userIds);
      const profileMap = (profiles || []).reduce((acc, p) => {
        acc[p.id] = p.name;
        return acc;
      }, {} as Record<string, string>);
      setRecentBookings(
        bookings.map(b => ({ ...b, profile_name: profileMap[b.user_id] || "Unknown" }))
      );
      setLoading(false);
    };
    fetchRecentBookings();
  }, []);

  return (
    <Card className="border-none shadow-md lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : recentBookings.length === 0 ? (
            <div className="text-center text-gray-500">No recent bookings found.</div>
          ) : recentBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  {booking.status === 'Confirmed' ? (
                    <CircleCheck className="h-4 w-4 text-green-600" />
                  ) : (
                    <CalendarCheck className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{booking.profile_name}</p>
                  <p className="text-sm text-gray-500">{booking.trip_title}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">₹{booking.total_amount.toLocaleString('en-IN')}</p>
                <p className="text-sm text-gray-500">{new Date(booking.booking_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="outline" size="sm" className="w-full">
            View All Bookings <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
