
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
import { Search, FileText, Filter, Download, ArrowDown, ArrowUp, Plus, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookingFormDialog } from "@/components/admin/BookingFormDialog";
import { BookingDetailsDialog } from "@/components/admin/BookingDetailsDialog";
import { toast } from "@/hooks/use-toast";
import { Booking, TripPackage } from "@/types/admin";

// Mock trip packages for the booking form
const mockTripPackages: TripPackage[] = [
  {
    id: 1,
    name: "Golden Triangle Tour",
    destination: "Delhi-Agra-Jaipur",
    duration: "6 days 5 nights",
    price: 25000,
    status: "Active",
    featured: true,
  },
  {
    id: 2,
    name: "Kashmir Valley",
    destination: "Srinagar-Gulmarg-Pahalgam",
    duration: "5 days 4 nights",
    price: 30000,
    status: "Active",
    featured: true,
  },
  {
    id: 3,
    name: "Kerala Backwaters",
    destination: "Kochi-Alleppey-Kovalam",
    duration: "7 days 6 nights",
    price: 35000,
    status: "Inactive",
    featured: false,
  },
];

// Mock data - in a real app, this would come from your backend
const mockBookings: Booking[] = [
  { 
    id: 1, 
    customer: "John Doe", 
    customerEmail: "john@example.com",
    customerImage: "https://ui-avatars.com/api/?name=John+Doe",
    destination: "Manali Adventure", 
    date: new Date(2025, 5, 15), 
    passengers: 3, 
    status: "Confirmed", 
    total: 16500,
    paymentType: "Online",
    notes: "Customer requested vegetarian meals."
  },
  { 
    id: 2, 
    customer: "Jane Smith", 
    customerEmail: "jane@example.com",
    customerImage: "https://ui-avatars.com/api/?name=Jane+Smith&background=7e3af2&color=fff",
    destination: "Ladakh Explorer", 
    date: new Date(2025, 6, 2), 
    passengers: 2, 
    status: "Pending", 
    total: 28200,
    paymentType: "Online"
  },
  { 
    id: 3, 
    customer: "Bob Johnson", 
    customerEmail: "bob@example.com",
    customerImage: "https://ui-avatars.com/api/?name=Bob+Johnson",
    destination: "Shimla Weekend", 
    date: new Date(2025, 4, 20), 
    passengers: 4, 
    status: "Confirmed", 
    total: 25800,
    paymentType: "Cash"
  },
  { 
    id: 4, 
    customer: "Alice Brown", 
    customerEmail: "alice@example.com",
    customerImage: "https://ui-avatars.com/api/?name=Alice+Brown&background=16a34a&color=fff",
    destination: "Manali Adventure", 
    date: new Date(2025, 7, 10), 
    passengers: 2, 
    status: "Cancelled", 
    total: 12500,
    paymentType: "Online"
  },
  { 
    id: 5, 
    customer: "Charlie Wilson", 
    customerEmail: "charlie@example.com",
    customerImage: "https://ui-avatars.com/api/?name=Charlie+Wilson",
    destination: "Ladakh Explorer", 
    date: new Date(2025, 6, 28), 
    passengers: 5, 
    status: "Confirmed", 
    total: 42000,
    paymentType: "Online"
  },
];

const BookingsManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedBookings = [...bookings].sort((a, b) => {
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

  const filteredBookings = sortedBookings.filter(booking => 
    booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
    booking.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />;
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddBooking = () => {
    setSelectedBooking(null);
    setFormDialogOpen(true);
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setDetailsDialogOpen(true);
  };

  const handleSubmitBooking = (values: any) => {
    const newId = Math.max(0, ...bookings.map(b => b.id)) + 1;
    const newBooking: Booking = {
      id: newId,
      customer: values.customer,
      customerEmail: values.customerEmail,
      customerImage: `https://ui-avatars.com/api/?name=${values.customer.replace(' ', '+')}`,
      destination: values.destination,
      date: values.date,
      passengers: values.passengers,
      status: values.status,
      total: values.total,
      paymentType: values.paymentType,
      notes: values.notes
    };
    
    setBookings([...bookings, newBooking]);
    toast({
      title: "Booking created",
      description: `Booking for ${values.customer} has been created successfully.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bookings Management</h1>
          <p className="text-gray-500">View and manage tour bookings</p>
        </div>
        <div>
          <Button variant="outline" className="mr-2">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={handleAddBooking}>
            <Plus className="mr-2 h-4 w-4" /> Add Booking
          </Button>
        </div>
      </div>
      
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>Total {filteredBookings.length} bookings</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search bookings..."
                  className="pl-9 pr-4 w-[280px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>#{booking.id}</TableCell>
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
                ))}

                {filteredBookings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No bookings found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
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
