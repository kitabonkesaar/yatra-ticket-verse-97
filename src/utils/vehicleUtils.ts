
import { Vehicle } from "@/types/admin";

/**
 * Filter vehicles based on search term
 */
export const filterVehicles = (vehicles: Vehicle[], searchTerm: string): Vehicle[] => {
  return vehicles.filter(vehicle => 
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Check if user has permission to manage vehicles
 */
export const checkVehicleManagementPermission = (user: any, isAdmin: boolean): { hasPermission: boolean; errorTitle?: string; errorMessage?: string } => {
  if (!user) {
    return {
      hasPermission: false,
      errorTitle: "Authentication Required",
      errorMessage: "You must be logged in to manage vehicles."
    };
  }
  
  if (!isAdmin) {
    return {
      hasPermission: false,
      errorTitle: "Unauthorized",
      errorMessage: "You must have admin privileges to manage vehicles."
    };
  }
  
  return { hasPermission: true };
};
