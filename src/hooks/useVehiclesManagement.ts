
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
        // Map data from Supabase to our Vehicle interface
        const mappedData: Vehicle[] = data.map(item => ({
          id: item.id,
          name: item.name,
          type: item.type as "Car" | "Bus" | "Tempo Traveller" | "Other",
          seats: item.seats,
          registrationNumber: item.registration_number,
          status: item.status as "Available" | "Booked" | "Maintenance",
          modelYear: item.model_year,
          imageUrl: item.image_url || undefined,
          description: item.description || undefined
        }));
        
        setVehicles(mappedData);
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
        .eq('id', selectedVehicle.id);

      if (error) throw error;
      
      // Update local state
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
        // Map our Vehicle interface to Supabase format
        const supabaseData = {
          name: values.name,
          type: values.type,
          seats: values.seats,
          registration_number: values.registrationNumber,
          status: values.status,
          model_year: values.modelYear,
          image_url: values.imageUrl,
          description: values.description
        };
        
        const { error } = await supabase
          .from("vehicles")
          .update(supabaseData)
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
        // Map our Vehicle interface to Supabase format
        const supabaseData = {
          name: values.name,
          type: values.type,
          seats: values.seats,
          registration_number: values.registrationNumber,
          status: values.status,
          model_year: values.modelYear,
          image_url: values.imageUrl,
          description: values.description
        };
        
        const { data, error } = await supabase
          .from("vehicles")
          .insert(supabaseData)
          .select()
          .single();

        if (error) throw error;
          
        // Map the returned Supabase data to our Vehicle interface
        const newVehicle: Vehicle = {
          id: data.id,
          name: data.name,
          type: data.type as "Car" | "Bus" | "Tempo Traveller" | "Other",
          seats: data.seats,
          registrationNumber: data.registration_number,
          status: data.status as "Available" | "Booked" | "Maintenance",
          modelYear: data.model_year,
          imageUrl: data.image_url || undefined,
          description: data.description || undefined
        };
        
        // Add to local state
        setVehicles([...vehicles, newVehicle]);
        
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
