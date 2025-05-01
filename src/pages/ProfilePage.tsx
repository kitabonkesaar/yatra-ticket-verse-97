
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ticket, Eye } from "lucide-react";
import { toast } from "sonner";
import DigitalTicket from "@/components/DigitalTicket";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [viewTicket, setViewTicket] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate("/login");
          return;
        }
        
        setUser(session.user);
        fetchBookings(session.user.id);
      } catch (error) {
        console.error("Error checking session:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  const fetchBookings = async (userId: string) => {
    try {
      // Fetch bookings for the current user
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", userId)
        .order("booking_date", { ascending: false });

      if (bookingsError) throw bookingsError;

      // For each booking, fetch its passengers
      if (bookingsData) {
        const bookingsWithPassengers = await Promise.all(
          bookingsData.map(async (booking) => {
            const { data: passengersData, error: passengersError } = await supabase
              .from("passengers")
              .select("*")
              .eq("booking_id", booking.id);

            if (passengersError) throw passengersError;
            
            return {
              ...booking,
              passengers: passengersData || []
            };
          })
        );
        
        setBookings(bookingsWithPassengers);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load booking history");
    }
  };

  const handleViewTicket = (booking: any) => {
    setSelectedBooking(booking);
    setViewTicket(true);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container-custom py-12 flex justify-center">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="h-12 w-48 bg-gray-200 rounded"></div>
            <div className="h-64 w-full max-w-2xl bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container-custom py-8">
        <Card className="shadow animate-fade-in">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-bharat-orange/20">
                <AvatarFallback className="bg-bharat-orange/10 text-bharat-orange text-xl">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user?.email}</CardTitle>
                <p className="text-gray-500">Member since {new Date(user?.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Tabs defaultValue="bookings">
              <TabsList className="mb-6">
                <TabsTrigger value="bookings" className="flex gap-2 items-center">
                  <Ticket className="h-4 w-4" /> My Bookings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bookings" className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-500 mb-4">No bookings found</h3>
                    <p className="text-gray-400 mb-6">You haven't made any tour bookings yet.</p>
                    <Button onClick={() => navigate("/trips")} className="bg-bharat-orange hover:bg-bharat-orange/90">
                      Explore Tours
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tour</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.trip_title}</TableCell>
                            <TableCell>{formatDate(booking.start_date)}</TableCell>
                            <TableCell>Ex - {booking.ex}</TableCell>
                            <TableCell>
                              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell>₹{Number(booking.total_amount).toLocaleString("en-IN")}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-bharat-orange hover:text-bharat-orange/90 hover:bg-bharat-orange/10"
                                onClick={() => handleViewTicket(booking)}
                              >
                                <Eye className="h-4 w-4 mr-1" /> View Ticket
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {viewTicket && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Your E-Ticket</h3>
              <Button variant="ghost" size="sm" onClick={() => setViewTicket(false)}>
                ×
              </Button>
            </div>
            
            <DigitalTicket
              booking={{
                passengers: selectedBooking.passengers,
                contact: selectedBooking.contact,
                tourTitle: selectedBooking.trip_title,
                startDate: selectedBooking.start_date,
                ex: selectedBooking.ex,
                busType: selectedBooking.bus_type
              }}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProfilePage;
