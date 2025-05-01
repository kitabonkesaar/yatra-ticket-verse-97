
import React from "react";
import { Edit, Eye, ListTodo, Star, Trash2, Bus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TripPackage, ItineraryItem } from "@/types/admin";

interface TripPackageTableProps {
  packages: TripPackage[];
  onEdit: (tripPackage: TripPackage) => void;
  onDelete: (tripPackage: TripPackage) => void;
  onViewItinerary: (tripPackage: TripPackage) => void;
}

const TripPackageTable = ({ packages, onEdit, onDelete, onViewItinerary }: TripPackageTableProps) => {
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
          {packages.length > 0 ? (
            packages.map((tripPackage) => (
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
                        onClick={() => onViewItinerary(tripPackage)}
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
                      onClick={() => onEdit(tripPackage)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:bg-red-50"
                      onClick={() => onDelete(tripPackage)}
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
  );
};

export default TripPackageTable;
