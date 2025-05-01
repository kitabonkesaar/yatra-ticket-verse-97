
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TripPackageFormDialog } from "@/components/admin/TripPackageFormDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Bus, Star, ListTodo, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TripPackage, ItineraryItem } from "@/types/admin";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import TripItinerary from "@/components/TripItinerary";

// Mock data - in a real app, this would come from your backend
const mockTripPackages: TripPackage[] = [
  {
    id: 1,
    name: "Golden Triangle Tour",
    destination: "Delhi-Agra-Jaipur",
    duration: "6 days 5 nights",
    price: 25000,
    status: "Active",
    startDate: "2025-06-15",
    endDate: "2025-06-20",
    description: "Experience the rich culture and heritage of India's most famous cities",
    imageUrl: "https://example.com/golden-triangle.jpg",
    featured: true,
    itinerary: [
      {
        day: 1,
        highlight: "Arrival in Delhi",
        details: "Arrive at Delhi airport, transfer to hotel. Evening visit to local markets."
      },
      {
        day: 2,
        highlight: "Delhi City Tour",
        details: "Full day sightseeing of Old and New Delhi including Red Fort, Jama Masjid, and Qutub Minar."
      },
      {
        day: 3,
        highlight: "Delhi to Agra",
        details: "Morning drive to Agra. Afternoon visit to Taj Mahal and Agra Fort."
      }
    ]
  },
  {
    id: 2,
    name: "Kashmir Valley",
    destination: "Srinagar-Gulmarg-Pahalgam",
    duration: "5 days 4 nights",
    price: 30000,
    status: "Active",
    description: "Explore the paradise on earth with beautiful landscapes and serene lakes",
    imageUrl: "https://example.com/kashmir.jpg",
    featured: true,
    itinerary: [
      {
        day: 1,
        highlight: "Arrival in Srinagar",
        details: "Arrive at Srinagar airport, transfer to houseboat. Evening Shikara ride on Dal Lake."
      },
      {
        day: 2,
        highlight: "Gulmarg Excursion",
        details: "Full day trip to Gulmarg. Enjoy gondola ride and panoramic views."
      }
    ]
  },
  {
    id: 3,
    name: "Kerala Backwaters",
    destination: "Kochi-Alleppey-Kovalam",
    duration: "7 days 6 nights",
    price: 35000,
    status: "Inactive",
    description: "Relax in the serene backwaters and beautiful beaches of God's own country",
    imageUrl: "https://example.com/kerala.jpg",
    featured: false,
    itinerary: []
  },
];

const TripPackagesManagement = () => {
  const [tripPackages, setTripPackages] = useState<TripPackage[]>(mockTripPackages);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<TripPackage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewItineraryDialogOpen, setViewItineraryDialogOpen] = useState(false);

  const filteredPackages = tripPackages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPackage = () => {
    setIsEditing(false);
    setSelectedPackage(null);
    setDialogOpen(true);
  };

  const handleEditPackage = (tripPackage: TripPackage) => {
    setIsEditing(true);
    setSelectedPackage(tripPackage);
    setDialogOpen(true);
  };

  const handleDeletePackage = (tripPackage: TripPackage) => {
    setSelectedPackage(tripPackage);
    setDeleteDialogOpen(true);
  };

  const viewItinerary = (tripPackage: TripPackage) => {
    setSelectedPackage(tripPackage);
    setViewItineraryDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPackage) {
      setTripPackages(tripPackages.filter(pkg => pkg.id !== selectedPackage.id));
      toast({
        title: "Trip package deleted",
        description: `${selectedPackage.name} has been removed.`,
      });
      setDeleteDialogOpen(false);
    }
  };

  const handleSubmit = (values: Omit<TripPackage, "id">) => {
    if (isEditing && selectedPackage) {
      setTripPackages(tripPackages.map(pkg => 
        pkg.id === selectedPackage.id ? { ...values, id: selectedPackage.id } : pkg
      ));
      toast({
        title: "Trip package updated",
        description: `${values.name} has been updated.`,
      });
    } else {
      const newId = Math.max(0, ...tripPackages.map(pkg => pkg.id)) + 1;
      setTripPackages([...tripPackages, { ...values, id: newId }]);
      toast({
        title: "Trip package added",
        description: `${values.name} has been added to the offerings.`,
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getItineraryCount = (itinerary?: ItineraryItem[]) => {
    if (!itinerary) return 0;
    return itinerary.length;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Trip Packages Management</h2>
        <Button onClick={handleAddPackage}>
          <Plus className="mr-2 h-4 w-4" />
          Add Trip Package
        </Button>
      </div>

      <div className="flex items-center mb-4">
        <Input
          placeholder="Search packages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Itinerary</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPackages.length > 0 ? (
              filteredPackages.map((tripPackage) => (
                <TableRow key={tripPackage.id}>
                  <TableCell className="font-medium">{tripPackage.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Bus className="h-4 w-4" />
                      {tripPackage.destination}
                    </div>
                  </TableCell>
                  <TableCell>{tripPackage.duration}</TableCell>
                  <TableCell>{formatPrice(tripPackage.price)}</TableCell>
                  <TableCell>
                    <Badge className={tripPackage.status === 'Active' ? 
                      'bg-green-100 text-green-800 hover:bg-green-100' : 
                      'bg-gray-100 text-gray-800 hover:bg-gray-100'}>
                      {tripPackage.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {tripPackage.featured && (
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <ListTodo className="h-4 w-4 text-gray-500" />
                      <span>{getItineraryCount(tripPackage.itinerary)} days</span>
                      {getItineraryCount(tripPackage.itinerary) > 0 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 ml-1"
                          onClick={() => viewItinerary(tripPackage)}
                        >
                          <Eye className="h-3.5 w-3.5 text-blue-500" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditPackage(tripPackage)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleDeletePackage(tripPackage)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No trip packages found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TripPackageFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={selectedPackage || undefined}
        title={isEditing ? "Edit Trip Package" : "Add Trip Package"}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete the trip package "{selectedPackage?.name}" from the system. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 text-white hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Dialog open={viewItineraryDialogOpen} onOpenChange={setViewItineraryDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedPackage?.name} - Itinerary</DialogTitle>
          </DialogHeader>
          
          {selectedPackage && selectedPackage.itinerary && selectedPackage.itinerary.length > 0 ? (
            <TripItinerary itinerary={selectedPackage.itinerary} />
          ) : (
            <div className="py-8 text-center text-gray-500">
              No itinerary available for this trip package.
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setViewItineraryDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TripPackagesManagement;
