import { useState, useEffect } from "react";
import { Booking, TripPackage } from "@/types/admin";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useBookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Fetch bookings from Supabase
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("bookings")
          .select(`
            id,
            trip_title,
            start_date,
            total_amount,
            status,
            payment_type,
            contact,
            ex,
            bus_type,
            booking_date,
            passengers (name, age, aadhaar)
          `)
          .order('booking_date', { ascending: false });

        if (error) {
          throw error;
        }

        // Transform data to match Booking type
        const transformedBookings: Booking[] = data.map((booking: any) => ({
          id: booking.id,
          customer: booking.passengers && booking.passengers.length > 0 ? booking.passengers[0].name : 'Unknown',
          customerEmail: booking.contact,
          customerImage: `https://ui-avatars.com/api/?name=${booking.passengers && booking.passengers.length > 0 ? encodeURIComponent(booking.passengers[0].name) : 'U'}`,
          destination: booking.trip_title,
          date: new Date(booking.start_date),
          passengers: booking.passengers ? booking.passengers.length : 1,
          status: booking.status || 'Pending',
          total: booking.total_amount,
          paymentType: booking.payment_type,
          notes: booking.notes || "",
          // Additional data for details view
          rawData: booking
        }));

        setBookings(transformedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast({
          title: "Error",
          description: "Failed to fetch bookings. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getFilteredBookings = () => {
    const sorted = [...bookings].sort((a, b) => {
      if (!sortField) return 0;
      
      const fieldA = a[sortField as keyof typeof a];
      const fieldB = b[sortField as keyof typeof b];
      
      if (fieldA instanceof Date && fieldB instanceof Date) {
        return sortDirection === "asc" 
          ? fieldA.getTime() - fieldB.getTime() 
          : fieldB.getTime() - fieldA.getTime();
      }
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === "asc" 
          ? fieldA.localeCompare(fieldB) 
          : fieldB.localeCompare(fieldA);
      }
      
      // For numeric fields
      return sortDirection === "asc" 
        ? Number(fieldA) - Number(fieldB) 
        : Number(fieldB) - Number(fieldA);
    });

    return sorted.filter(booking => 
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
      booking.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleAddBooking = () => {
    setSelectedBooking(null);
    setFormDialogOpen(true);
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setDetailsDialogOpen(true);
  };

  const handleSubmitBooking = async (values: any) => {
    try {
      // Insert booking record into Supabase
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .insert({
          user_id: "00000000-0000-0000-0000-000000000000", // Admin-created bookings use a placeholder ID
          trip_title: values.destination,
          start_date: values.date.toISOString().split('T')[0],
          ex: "Admin Portal", // Default for admin-created bookings
          bus_type: "Standard", // Default bus type
          contact: values.customerEmail,
          total_amount: values.total,
          payment_type: values.paymentType,
          status: values.status,
          booking_date: new Date().toISOString()
        })
        .select()
        .single();
        
      if (bookingError) throw bookingError;
      
      // Insert passenger record - assuming 1 passenger for admin-created bookings
      const { error: passengerError } = await supabase
        .from("passengers")
        .insert({
          booking_id: bookingData.id,
          name: values.customer,
          age: "30", // Default age for admin-created bookings
          aadhaar: null
        });
        
      if (passengerError) throw passengerError;
      
      // Add to local state
      const newBooking: Booking = {
        id: bookingData.id, // Now correctly typed as string
        customer: values.customer,
        customerEmail: values.customerEmail,
        customerImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(values.customer)}`,
        destination: values.destination,
        date: values.date,
        passengers: values.passengers,
        status: values.status,
        total: values.total,
        paymentType: values.paymentType,
        notes: values.notes || ""
      };
      
      setBookings([newBooking, ...bookings]);
      
      toast({
        title: "Booking created",
        description: `Booking for ${values.customer} has been created successfully.`,
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Confirm booking status
  const confirmBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "Confirmed" })
        .eq("id", bookingId);
      if (error) throw error;
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "Confirmed" } : b
        )
      );
      toast({
        title: "Booking Confirmed",
        description: "The ticket has been confirmed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to confirm booking.",
        variant: "destructive",
      });
    }
  };

  return {
    bookings: getFilteredBookings(),
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
    confirmBooking,
  };
};
