
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TripPackageFormDialog } from "@/components/admin/TripPackageFormDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Bus, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TripPackage } from "@/types/admin";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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
  },
];

const TripPackagesManagement = () => {
  const [tripPackages, setTripPackages] = useState<TripPackage[]>(mockTripPackages);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<TripPackage | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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
                <TableCell colSpan={7} className="text-center py-4">
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
    </div>
  );
};

export default TripPackagesManagement;
