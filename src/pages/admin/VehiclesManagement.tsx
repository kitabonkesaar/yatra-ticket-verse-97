
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { VehicleFormDialog } from "@/components/admin/VehicleFormDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Car, Bus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Vehicle } from "@/types/admin";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Mock data - in a real app, this would come from your backend
const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Innova Crysta",
    type: "Car",
    seats: 7,
    registrationNumber: "MH01AB1234",
    status: "Available",
    modelYear: 2022,
    imageUrl: "https://example.com/innova.jpg",
    description: "Comfortable 7-seater SUV perfect for family trips",
  },
  {
    id: 2,
    name: "Volvo B11R",
    type: "Bus",
    seats: 45,
    registrationNumber: "DL01CD5678",
    status: "Available",
    modelYear: 2021,
    imageUrl: "https://example.com/volvo.jpg",
    description: "Luxury bus with reclining seats, TV, and AC",
  },
  {
    id: 3,
    name: "Force Traveller",
    type: "Tempo Traveller",
    seats: 12,
    registrationNumber: "GJ05EF9012",
    status: "Maintenance",
    modelYear: 2020,
    imageUrl: "https://example.com/traveller.jpg",
    description: "12-seater tempo traveller for group tours",
  },
];

const VehiclesManagement = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVehicle = () => {
    setIsEditing(false);
    setSelectedVehicle(null);
    setDialogOpen(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setIsEditing(true);
    setSelectedVehicle(vehicle);
    setDialogOpen(true);
  };

  const handleDeleteVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedVehicle) {
      setVehicles(vehicles.filter(v => v.id !== selectedVehicle.id));
      toast({
        title: "Vehicle deleted",
        description: `${selectedVehicle.name} has been removed.`,
      });
      setDeleteDialogOpen(false);
    }
  };

  const handleSubmit = (values: Omit<Vehicle, "id">) => {
    if (isEditing && selectedVehicle) {
      setVehicles(vehicles.map(v => 
        v.id === selectedVehicle.id ? { ...values, id: selectedVehicle.id } : v
      ));
      toast({
        title: "Vehicle updated",
        description: `${values.name} has been updated.`,
      });
    } else {
      const newId = Math.max(0, ...vehicles.map(v => v.id)) + 1;
      setVehicles([...vehicles, { ...values, id: newId }]);
      toast({
        title: "Vehicle added",
        description: `${values.name} has been added to the fleet.`,
      });
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Booked':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'Car':
        return <Car className="h-5 w-5" />;
      case 'Bus':
        return <Bus className="h-5 w-5" />;
      default:
        return <Car className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Vehicles Management</h2>
        <Button onClick={handleAddVehicle}>
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      <div className="flex items-center mb-4">
        <Input
          placeholder="Search vehicles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Registration</TableHead>
              <TableHead>Seats</TableHead>
              <TableHead>Model Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getVehicleIcon(vehicle.type)}
                      {vehicle.type}
                    </div>
                  </TableCell>
                  <TableCell>{vehicle.registrationNumber}</TableCell>
                  <TableCell>{vehicle.seats}</TableCell>
                  <TableCell>{vehicle.modelYear}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(vehicle.status)}>
                      {vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditVehicle(vehicle)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleDeleteVehicle(vehicle)}
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
                  No vehicles found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <VehicleFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={selectedVehicle || undefined}
        title={isEditing ? "Edit Vehicle" : "Add Vehicle"}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete the vehicle "{selectedVehicle?.name}" from the system. This action cannot be undone.
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

export default VehiclesManagement;
