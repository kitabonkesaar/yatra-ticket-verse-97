
import { supabase } from "@/integrations/supabase/client";
import { Vehicle } from "@/types/admin";
import { toast } from "@/hooks/use-toast";

/**
 * Fetches all vehicles from Supabase
 */
export const fetchVehicles = async (): Promise<Vehicle[]> => {
  try {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order('name');

    if (error) {
      throw error;
    }

    if (data) {
      // Map data from Supabase to our Vehicle interface
      return data.map(item => ({
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
    }
    return [];
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    toast({
      title: "Error",
      description: "Failed to fetch vehicles. Please try again.",
      variant: "destructive",
    });
    return [];
  }
};

/**
 * Maps Vehicle interface to Supabase format
 */
export const mapVehicleToSupabase = (vehicle: Omit<Vehicle, "id">) => {
  return {
    name: vehicle.name,
    type: vehicle.type,
    seats: vehicle.seats,
    registration_number: vehicle.registrationNumber,
    status: vehicle.status,
    model_year: vehicle.modelYear,
    image_url: vehicle.imageUrl,
    description: vehicle.description
  };
};

/**
 * Creates a new vehicle in Supabase
 */
export const createVehicle = async (vehicle: Omit<Vehicle, "id">): Promise<Vehicle | null> => {
  const supabaseData = mapVehicleToSupabase(vehicle);
  
  const { data, error } = await supabase
    .from("vehicles")
    .insert(supabaseData)
    .select()
    .single();

  if (error) throw error;
    
  if (data) {
    return {
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
  }
  
  return null;
};

/**
 * Updates an existing vehicle in Supabase
 */
export const updateVehicle = async (id: string, vehicle: Omit<Vehicle, "id">): Promise<void> => {
  const supabaseData = mapVehicleToSupabase(vehicle);
  
  const { error } = await supabase
    .from("vehicles")
    .update(supabaseData)
    .eq('id', id);

  if (error) throw error;
};

/**
 * Deletes a vehicle from Supabase
 */
export const deleteVehicle = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("vehicles")
    .delete()
    .eq('id', id);

  if (error) throw error;
};

/**
 * Updates user metadata to ensure admin role
 */
export const ensureAdminRole = async () => {
  const { error } = await supabase.auth.updateUser({
    data: { role: 'admin' }
  });
  
  if (error) {
    console.warn("Unable to update user metadata:", error);
  }
};
