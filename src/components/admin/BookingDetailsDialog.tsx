import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Booking } from "@/types/admin";
import { CalendarIcon, UserIcon, MapPinIcon, UsersIcon, CreditCardIcon, FileTextIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useBookingManagement } from '@/hooks/useBookingManagement';

interface BookingDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Booking | null;
}

export function BookingDetailsDialog({
  open,
  onOpenChange,
  booking
}: BookingDetailsDialogProps) {
  const { confirmBooking } = useBookingManagement();
  if (!booking) {
    return null;
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={booking.customerImage} alt={booking.customer} />
                <AvatarFallback>{booking.customer.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{booking.customer}</h3>
                <p className="text-sm text-gray-500">{booking.customerEmail}</p>
              </div>
            </div>
            <Badge className={getStatusBadgeColor(booking.status)}>
              {booking.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Booking Date</p>
                <p className="font-medium">{format(booking.date, "dd MMM, yyyy")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Destination</p>
                <p className="font-medium">{booking.destination}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Passengers</p>
                <p className="font-medium">{booking.passengers}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CreditCardIcon className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Payment</p>
                <p className="font-medium">₹{booking.total.toLocaleString('en-IN')} ({booking.paymentType})</p>
              </div>
            </div>
          </div>

          {booking.notes && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileTextIcon className="h-4 w-4 text-gray-500" />
                <p className="text-sm text-gray-500">Notes</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md text-sm">
                {booking.notes}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {booking.status === 'Pending' && (
            <Button
              className="bg-green-600 text-white mr-2"
              onClick={async () => {
                await confirmBooking(booking.id);
                onOpenChange(false);
              }}
            >
              Confirm Ticket
            </Button>
          )}
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
