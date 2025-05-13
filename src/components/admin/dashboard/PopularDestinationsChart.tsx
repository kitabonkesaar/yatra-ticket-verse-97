import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF6666'];

export const PopularDestinationsChart: React.FC = () => {
  const [destinationData, setDestinationData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select("trip_title")
        .eq("status", "Confirmed");
      if (error || !data) {
        setDestinationData([]);
        setLoading(false);
        return;
      }
      // Count bookings per destination
      const destMap: Record<string, number> = {};
      data.forEach((b: any) => {
        if (b.trip_title) {
          destMap[b.trip_title] = (destMap[b.trip_title] || 0) + 1;
        }
      });
      const arr = Object.entries(destMap).map(([name, value]) => ({ name, value }));
      setDestinationData(arr);
      setLoading(false);
    };
    fetchDestinations();
  }, []);

  return (
    <Card className="border-none shadow-md lg:col-span-1">
      <CardHeader>
        <CardTitle>Popular Destinations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={destinationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {destinationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          {loading && <div className="text-center mt-4">Loading...</div>}
        </div>
      </CardContent>
    </Card>
  );
};
