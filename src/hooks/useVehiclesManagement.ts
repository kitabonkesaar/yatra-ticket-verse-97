
import { useState, useEffect } from "react";
import { Vehicle } from "@/types/admin";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useVehiclesManagement = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Fetch vehicles from Supabase
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order('name');

      if (error) {
        throw error;
      }

      if (data) {
        setVehicles(data);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast({
        title: "Error",
        description: "Failed to fetch vehicles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

  const confirmDelete = async () => {
    if (!selectedVehicle) return;
    
    try {
      const { error } = await supabase
        .from("vehicles")
        .delete()
        .match({ id: selectedVehicle.id });

      if (error) throw error;
      
      setVehicles(vehicles.filter(v => v.id !== selectedVehicle.id));
      toast({
        title: "Vehicle deleted",
        description: `${selectedVehicle.name} has been removed.`,
      });
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast({
        title: "Error",
        description: "Failed to delete vehicle. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleSubmit = async (values: Omit<Vehicle, "id">) => {
    try {
      if (isEditing && selectedVehicle) {
        const { error } = await supabase
          .from("vehicles")
          .update(values)
          .eq('id', selectedVehicle.id);

        if (error) throw error;
          
        // Update local state
        setVehicles(vehicles.map(v => 
          v.id === selectedVehicle.id ? { ...values, id: selectedVehicle.id } : v
        ));
        
        toast({
          title: "Vehicle updated",
          description: `${values.name} has been updated.`,
        });
      } else {
        const { data, error } = await supabase
          .from("vehicles")
          .insert(values)
          .select()
          .single();

        if (error) throw error;
          
        // Add to local state
        setVehicles([...vehicles, data]);
        
        toast({
          title: "Vehicle added",
          description: `${values.name} has been added to the fleet.`,
        });
      }
    } catch (error) {
      console.error("Error saving vehicle:", error);
      toast({
        title: "Error",
        description: "Failed to save vehicle. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDialogOpen(false);
    }
  };

  return {
    vehicles: filteredVehicles,
    loading,
    searchTerm,
    setSearchTerm,
    dialogOpen,
    setDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedVehicle,
    isEditing,
    handleAddVehicle,
    handleEditVehicle,
    handleDeleteVehicle,
    confirmDelete,
    handleSubmit
  };
};
