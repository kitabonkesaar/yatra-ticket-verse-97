import React, { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

function getQuarter(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const quarter = Math.floor(date.getMonth() / 3) + 1;
  return `Q${quarter} ${year}`;
}

export const RevenueOverviewChart: React.FC = () => {
  const [revenueData, setRevenueData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenue = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select("total_amount, booking_date")
        .eq("status", "Confirmed");
      if (error) {
        setRevenueData([]);
        setLoading(false);
        return;
      }
      // Group by quarter
      const quarterMap: Record<string, number> = {};
      data.forEach((b: any) => {
        if (b.booking_date && b.total_amount) {
          const quarter = getQuarter(b.booking_date);
          quarterMap[quarter] = (quarterMap[quarter] || 0) + b.total_amount;
        }
      });
      const sorted = Object.entries(quarterMap)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => a.name.localeCompare(b.name));
      setRevenueData(sorted);
      setLoading(false);
    };
    fetchRevenue();
  }, []);

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Revenue (₹)" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
          {loading && <div className="text-center mt-4">Loading...</div>}
        </div>
      </CardContent>
    </Card>
  );
};
