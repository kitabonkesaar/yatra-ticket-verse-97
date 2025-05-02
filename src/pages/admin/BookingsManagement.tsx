
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookingFormDialog } from "@/components/admin/BookingFormDialog";
import { BookingDetailsDialog } from "@/components/admin/BookingDetailsDialog";
import { BookingHeader } from "@/components/admin/BookingHeader";
import { BookingSearch } from "@/components/admin/BookingSearch";
import { BookingTable } from "@/components/admin/BookingTable";
import { useBookingManagement } from "@/hooks/useBookingManagement";
import { useAdminRoute } from "@/hooks/useAdminRoute";
import { TripPackage } from "@/types/admin";

// Mock trip packages for the booking form
const mockTripPackages: TripPackage[] = [
  {
    id: "1",
    name: "Golden Triangle Tour",
    destination: "Delhi-Agra-Jaipur",
    duration: "6 days 5 nights",
    price: 25000,
    status: "Active",
    featured: true,
  },
  {
    id: "2",
    name: "Kashmir Valley",
    destination: "Srinagar-Gulmarg-Pahalgam",
    duration: "5 days 4 nights",
    price: 30000,
    status: "Active",
    featured: true,
  },
  {
    id: "3",
    name: "Kerala Backwaters",
    destination: "Kochi-Alleppey-Kovalam",
    duration: "7 days 6 nights",
    price: 35000,
    status: "Inactive",
    featured: false,
  },
];

const BookingsManagement = () => {
  // Protect admin route
  useAdminRoute();
  
  const {
    bookings,
    loading,
    searchQuery,
    setSearchQuery,
    sortField,
    sortDirection,
    handleSort,
    formDialogOpen,
    setFormDialogOpen,
    detailsDialogOpen,
    setDetailsDialogOpen,
    selectedBooking,
    handleAddBooking,
    handleViewBooking,
    handleSubmitBooking,
  } = useBookingManagement();

  return (
    <div className="space-y-6">
      <BookingHeader onAddBooking={handleAddBooking} />
      
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>
                {loading ? "Loading bookings..." : `Total ${bookings.length} bookings`}
              </CardDescription>
            </div>
            <BookingSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </CardHeader>
        <CardContent>
          <BookingTable 
            bookings={bookings}
            loading={loading}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
            handleViewBooking={handleViewBooking}
          />
        </CardContent>
      </Card>

      <BookingFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        onSubmit={handleSubmitBooking}
        title="Add New Booking"
        tripPackages={mockTripPackages}
      />

      <BookingDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        booking={selectedBooking}
      />
    </div>
  );
};

export default BookingsManagement;
