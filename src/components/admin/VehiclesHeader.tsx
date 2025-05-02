
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface VehiclesHeaderProps {
  onAddVehicle: () => void;
}

export const VehiclesHeader = ({ onAddVehicle }: VehiclesHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Vehicles Management</h1>
        <p className="text-gray-500">Manage your fleet of vehicles</p>
      </div>
      <Button onClick={onAddVehicle}>
        <Plus className="mr-2 h-4 w-4" />
        Add Vehicle
      </Button>
    </div>
  );
};
