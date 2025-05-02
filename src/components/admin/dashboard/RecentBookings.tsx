
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CircleCheck, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

// Recent bookings data
const recentBookings = [
  {
    id: "BK-1001",
    customer: "Raj Kumar",
    destination: "Manali Adventure",
    date: "2025-06-15",
    amount: 12500,
    status: "confirmed"
  },
  {
    id: "BK-1002",
    customer: "Priya Singh",
    destination: "Ladakh Explorer",
    date: "2025-06-22",
    amount: 24800,
    status: "pending"
  },
  {
    id: "BK-1003",
    customer: "Amit Shah",
    destination: "Shimla Weekend",
    date: "2025-06-10",
    amount: 8900,
    status: "confirmed"
  }
];

export const RecentBookings: React.FC = () => {
  return (
    <Card className="border-none shadow-md lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${booking.status === 'confirmed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  {booking.status === 'confirmed' ? (
                    <CircleCheck className="h-4 w-4 text-green-600" />
                  ) : (
                    <CalendarCheck className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{booking.customer}</p>
                  <p className="text-sm text-gray-500">{booking.destination}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">₹{booking.amount.toLocaleString('en-IN')}</p>
                <p className="text-sm text-gray-500">{new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
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
