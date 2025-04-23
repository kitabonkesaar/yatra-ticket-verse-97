
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

// Mock data - in a real app, this would come from your backend
const mockBookings = [
  { id: 1, customer: "John Doe", destination: "Manali", date: new Date(2025, 5, 15), passengers: 3, status: "Confirmed", total: 6500 },
  { id: 2, customer: "Jane Smith", destination: "Ladakh", date: new Date(2025, 6, 2), passengers: 2, status: "Pending", total: 8200 },
  { id: 3, customer: "Bob Johnson", destination: "Shimla", date: new Date(2025, 4, 20), passengers: 4, status: "Confirmed", total: 5800 },
  { id: 4, customer: "Alice Brown", destination: "Manali", date: new Date(2025, 7, 10), passengers: 2, status: "Cancelled", total: 6500 },
  { id: 5, customer: "Charlie Wilson", destination: "Ladakh", date: new Date(2025, 6, 28), passengers: 5, status: "Confirmed", total: 12000 },
];

const BookingsManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = mockBookings.filter(booking => 
    booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
    booking.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bookings Management</h1>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>All Bookings</CardTitle>
          <div className="flex items-center mt-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search bookings..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Passengers</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell className="font-medium">{booking.customer}</TableCell>
                    <TableCell>{booking.destination}</TableCell>
                    <TableCell>{format(booking.date, "MMM dd, yyyy")}</TableCell>
                    <TableCell>{booking.passengers}</TableCell>
                    <TableCell>₹{booking.total}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsManagement;
