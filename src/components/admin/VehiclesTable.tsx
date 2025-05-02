
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
import { Edit, Trash2, Car, Bus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Vehicle } from "@/types/admin";

interface VehiclesTableProps {
  vehicles: Vehicle[];
  loading: boolean;
  handleEditVehicle: (vehicle: Vehicle) => void;
  handleDeleteVehicle: (vehicle: Vehicle) => void;
}

export const VehiclesTable = ({
  vehicles,
  loading,
  handleEditVehicle,
  handleDeleteVehicle,
}: VehiclesTableProps) => {
  
  function getStatusBadgeColor(status: string) {
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
  }

  function getVehicleIcon(type: string) {
    switch (type) {
      case 'Car':
        return <Car className="h-5 w-5" />;
      case 'Bus':
        return <Bus className="h-5 w-5" />;
      default:
        return <Car className="h-5 w-5" />;
    }
  }

  return (
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
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                <div className="flex justify-center items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
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
  );
};
