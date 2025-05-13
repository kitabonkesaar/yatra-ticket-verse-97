import React, { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

function getMonthName(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'short', year: '2-digit' });
}

export const BookingAnalyticsChart: React.FC = () => {
  const [bookingData, setBookingData] = useState<{ name: string; bookings: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingAnalytics = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select("id, booking_date");
      if (error) {
        setBookingData([]);
        setLoading(false);
        return;
      }
      // Group bookings by month
      const monthMap: Record<string, number> = {};
      data.forEach((b: any) => {
        if (b.booking_date) {
          const month = getMonthName(b.booking_date);
          monthMap[month] = (monthMap[month] || 0) + 1;
        }
      });
      // Convert to array and sort by month (recent last)
      const sorted = Object.entries(monthMap)
        .map(([name, bookings]) => ({ name, bookings }))
        .sort((a, b) => new Date('01 ' + a.name).getTime() - new Date('01 ' + b.name).getTime());
      setBookingData(sorted);
      setLoading(false);
    };
    fetchBookingAnalytics();
  }, []);

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Booking Analytics</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={bookingData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Area type="monotone" dataKey="bookings" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
          {loading && <div className="text-center mt-4">Loading...</div>}
        </div>
      </CardContent>
    </Card>
  );
};
