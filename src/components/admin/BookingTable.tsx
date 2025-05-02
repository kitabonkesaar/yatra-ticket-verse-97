
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, FileText, ArrowDown, ArrowUp } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Booking } from "@/types/admin";

interface BookingTableProps {
  bookings: Booking[];
  loading: boolean;
  sortField: string | null;
  sortDirection: "asc" | "desc";
  handleSort: (field: string) => void;
  handleViewBooking: (booking: Booking) => void;
}

export const BookingTable = ({
  bookings,
  loading,
  sortField,
  sortDirection,
  handleSort,
  handleViewBooking,
}: BookingTableProps) => {
  
  function getSortIcon(field: string) {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />;
  }

  function getStatusBadgeColor(status: string) {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead className="min-w-[180px]">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => handleSort('customer')}
              >
                Customer {getSortIcon('customer')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => handleSort('destination')}
              >
                Destination {getSortIcon('destination')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => handleSort('date')}
              >
                Date {getSortIcon('date')}
              </button>
            </TableHead>
            <TableHead>Passengers</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => handleSort('status')}
              >
                Status {getSortIcon('status')}
              </button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <div className="flex justify-center items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : bookings.length > 0 ? (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>#{typeof booking.id === 'string' ? booking.id.substring(0, 5) : booking.id.toString().substring(0, 5)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={booking.customerImage} alt={booking.customer} />
                      <AvatarFallback>{booking.customer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{booking.customer}</div>
                      <div className="text-xs text-gray-500">{booking.customerEmail}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{booking.destination}</TableCell>
                <TableCell>{format(booking.date, "dd MMM, yyyy")}</TableCell>
                <TableCell>{booking.passengers}</TableCell>
                <TableCell>
                  <div>₹{booking.total.toLocaleString('en-IN')}</div>
                  <div className="text-xs text-gray-500">{booking.paymentType}</div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewBooking(booking)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                No bookings found matching your search criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
