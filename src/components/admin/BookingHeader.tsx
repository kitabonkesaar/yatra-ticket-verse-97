
import React from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingHeaderProps {
  onAddBooking: () => void;
}

export const BookingHeader = ({ onAddBooking }: BookingHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Bookings Management</h1>
        <p className="text-gray-500">View and manage tour bookings</p>
      </div>
      <div>
        <Button variant="outline" className="mr-2">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
        <Button onClick={onAddBooking}>
          <Plus className="mr-2 h-4 w-4" /> Add Booking
        </Button>
      </div>
    </div>
  );
};
