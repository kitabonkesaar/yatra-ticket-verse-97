
import { useState, useEffect } from "react";
import { Vehicle } from "@/types/admin";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { fetchVehicles, createVehicle, updateVehicle, deleteVehicle, ensureAdminRole } from "@/services/vehicleService";
import { filterVehicles, checkVehicleManagementPermission } from "@/utils/vehicleUtils";

export const useVehiclesManagement = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { user, isAdmin } = useAuth();
  
  // Fetch vehicles from Supabase
  useEffect(() => {
    const loadVehicles = async () => {
      setLoading(true);
      const data = await fetchVehicles();
      setVehicles(data);
      setLoading(false);
    };
    
    loadVehicles();
  }, []);

  // Filter vehicles based on search term
  const filteredVehicles = filterVehicles(vehicles, searchTerm);

  const handleAddVehicle = () => {
    const { hasPermission, errorTitle, errorMessage } = checkVehicleManagementPermission(user, isAdmin);
    
    if (!hasPermission) {
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }
    
    setIsEditing(false);
    setSelectedVehicle(null);
    setDialogOpen(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    const { hasPermission, errorTitle, errorMessage } = checkVehicleManagementPermission(user, isAdmin);
    
    if (!hasPermission) {
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }
    
    setIsEditing(true);
    setSelectedVehicle(vehicle);
    setDialogOpen(true);
  };

  const handleDeleteVehicle = (vehicle: Vehicle) => {
    const { hasPermission, errorTitle, errorMessage } = checkVehicleManagementPermission(user, isAdmin);
    
    if (!hasPermission) {
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }
    
    setSelectedVehicle(vehicle);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedVehicle) return;
    
    try {
      await deleteVehicle(selectedVehicle.id);
      
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
      const { hasPermission, errorTitle, errorMessage } = checkVehicleManagementPermission(user, isAdmin);
      
      if (!hasPermission) {
        throw new Error(errorMessage);
      }
      
      // Try to ensure admin role is set in metadata
      await ensureAdminRole();
      
      if (isEditing && selectedVehicle) {
        await updateVehicle(selectedVehicle.id, values);
          
        // Update local state
        setVehicles(vehicles.map(v => 
          v.id === selectedVehicle.id ? { ...values, id: selectedVehicle.id } : v
        ));
        
        toast({
          title: "Vehicle updated",
          description: `${values.name} has been updated.`,
        });
      } else {
        const newVehicle = await createVehicle(values);
        
        if (newVehicle) {
          // Add to local state
          setVehicles([...vehicles, newVehicle]);
          
          toast({
            title: "Vehicle added",
            description: `${values.name} has been added to the fleet.`,
          });
        }
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
