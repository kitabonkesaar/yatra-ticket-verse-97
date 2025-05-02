
import { useState, useEffect } from "react";
import { TripPackage } from "@/types/admin";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

export const useTripPackages = () => {
  const [tripPackages, setTripPackages] = useState<TripPackage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<TripPackage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewItineraryDialogOpen, setViewItineraryDialogOpen] = useState(false);

  // Fetch trip packages from Supabase
  useEffect(() => {
    fetchTripPackages();
  }, []);

  const fetchTripPackages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('trip_packages')
        .select('*');

      if (error) {
        throw error;
      }

      // Transform the data to match our TripPackage type
      const formattedPackages: TripPackage[] = data.map((pkg: any) => ({
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
      }));

      setTripPackages(formattedPackages);
    } catch (error) {
      console.error("Error fetching trip packages:", error);
      toast("Failed to load trip packages");
    } finally {
      setLoading(false);
    }
  };

  const filteredPackages = tripPackages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPackage = () => {
    setIsEditing(false);
    setSelectedPackage(null);
    setDialogOpen(true);
  };

  const handleEditPackage = (tripPackage: TripPackage) => {
    setIsEditing(true);
    setSelectedPackage(tripPackage);
    setDialogOpen(true);
  };

  const handleDeletePackage = (tripPackage: TripPackage) => {
    setSelectedPackage(tripPackage);
    setDeleteDialogOpen(true);
  };

  const viewItinerary = (tripPackage: TripPackage) => {
    setSelectedPackage(tripPackage);
    setViewItineraryDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedPackage) {
      try {
        const { error } = await supabase
          .from('trip_packages')
          .delete()
          .eq('id', selectedPackage.id);

        if (error) throw error;

        setTripPackages(tripPackages.filter(pkg => pkg.id !== selectedPackage.id));
        toast("Trip package deleted successfully");
      } catch (error) {
        console.error("Error deleting trip package:", error);
        toast("Failed to delete trip package");
      } finally {
        setDeleteDialogOpen(false);
      }
    }
  };

  const handleSubmit = async (values: Omit<TripPackage, "id">) => {
    try {
      if (isEditing && selectedPackage) {
        // Map the values to Supabase column names
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
            itinerary: values.itinerary || []
          })
          .eq('id', selectedPackage.id);

        if (error) throw error;

        // Refresh trip packages
        await fetchTripPackages();
        toast("Trip package updated successfully");
      } else {
        // Add new trip package
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
            itinerary: values.itinerary || []
          });

        if (error) throw error;

        // Refresh trip packages
        await fetchTripPackages();
        toast("Trip package added successfully");
      }

      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving trip package:", error);
      toast("Failed to save trip package");
    }
  };

  return {
    tripPackages,
    filteredPackages,
    searchTerm,
    setSearchTerm,
    selectedPackage,
    isEditing,
    loading,
    dialogOpen,
    setDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    viewItineraryDialogOpen,
    setViewItineraryDialogOpen,
    handleAddPackage,
    handleEditPackage,
    handleDeletePackage,
    viewItinerary,
    confirmDelete,
    handleSubmit
  };
};
