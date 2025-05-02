
import { supabase } from "@/integrations/supabase/client";
import { TripPackage, ItineraryItem } from "@/types/admin";
import { toast } from "sonner";
import { Json } from "@/integrations/supabase/types";

/**
 * Fetches all trip packages from Supabase
 */
export const fetchTripPackages = async (): Promise<TripPackage[]> => {
  try {
    const { data, error } = await supabase
      .from('trip_packages')
      .select('*');

    if (error) {
      throw error;
    }

    // Transform the data to match our TripPackage type
    const formattedPackages: TripPackage[] = data.map((pkg: any) => formatTripPackageFromDB(pkg));
    
    return formattedPackages;
  } catch (error) {
    console.error("Error fetching trip packages:", error);
    toast("Failed to load trip packages");
    return [];
  }
};

/**
 * Creates a new trip package
 */
export const createTripPackage = async (values: Omit<TripPackage, "id">): Promise<boolean> => {
  try {
    // Convert itinerary to a format compatible with Json type
    const itineraryJson = values.itinerary ? values.itinerary as unknown as Json : [];
    
    const { error } = await supabase
      .from('trip_packages')
      .insert({
        name: values.name,
        destination: values.destination,
        duration: values.duration,
        price: values.price,
        status: values.status,
        start_date: values.startDate || null,
        end_date: values.endDate || null,
        description: values.description || null,
        image_url: values.imageUrl || null,
        featured: values.featured,
        itinerary: itineraryJson
      });

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error creating trip package:", error);
    toast("Failed to create trip package");
    return false;
  }
};

/**
 * Updates an existing trip package
 */
export const updateTripPackage = async (id: string, values: Omit<TripPackage, "id">): Promise<boolean> => {
  try {
    // Convert itinerary to a format compatible with Json type
    const itineraryJson = values.itinerary ? values.itinerary as unknown as Json : [];
    
    const { error } = await supabase
      .from('trip_packages')
      .update({
        name: values.name,
        destination: values.destination,
        duration: values.duration,
        price: values.price,
        status: values.status,
        start_date: values.startDate || null,
        end_date: values.endDate || null,
        description: values.description || null,
        image_url: values.imageUrl || null,
        featured: values.featured,
        itinerary: itineraryJson
      })
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error updating trip package:", error);
    toast("Failed to update trip package");
    return false;
  }
};

/**
 * Deletes a trip package
 */
export const deleteTripPackage = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('trip_packages')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error deleting trip package:", error);
    toast("Failed to delete trip package");
    return false;
  }
};

/**
 * Formats a trip package from the database
 */
export const formatTripPackageFromDB = (pkg: any): TripPackage => {
  return {
    id: pkg.id,
    name: pkg.name,
    destination: pkg.destination,
    duration: pkg.duration,
    price: pkg.price,
    status: pkg.status as "Active" | "Inactive",
    startDate: pkg.start_date || undefined,
    endDate: pkg.end_date || undefined,
    description: pkg.description || undefined,
    imageUrl: pkg.image_url || undefined,
    featured: pkg.featured,
    itinerary: Array.isArray((pkg.itinerary as Json)) 
      ? (pkg.itinerary as any[]).map(item => ({
          day: item.day,
          highlight: item.highlight,
          details: item.details
        }))
      : []
  };
};
