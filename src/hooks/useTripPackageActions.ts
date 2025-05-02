
import { toast } from "sonner";
import { TripPackage } from "@/types/admin";
import { 
  fetchTripPackages as fetchPackagesFromService,
  createTripPackage,
  updateTripPackage,
  deleteTripPackage
} from "@/services/tripPackageService";

export const useTripPackageActions = (state: any) => {
  const { 
    setTripPackages, 
    setSelectedPackage, 
    setIsEditing, 
    setDialogOpen, 
    setDeleteDialogOpen,
    setViewItineraryDialogOpen,
    setLoading
  } = state;

  const fetchTripPackages = async () => {
    setLoading(true);
    const packages = await fetchPackagesFromService();
    setTripPackages(packages);
    setLoading(false);
  };

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
    const { selectedPackage, tripPackages } = state;
    if (selectedPackage) {
      const success = await deleteTripPackage(selectedPackage.id);
      
      if (success) {
        setTripPackages(tripPackages.filter((pkg: TripPackage) => pkg.id !== selectedPackage.id));
        toast("Trip package deleted successfully");
      }
      
      setDeleteDialogOpen(false);
    }
  };

  const handleSubmit = async (values: Omit<TripPackage, "id">) => {
    const { isEditing, selectedPackage } = state;
    let success = false;
    
    if (isEditing && selectedPackage) {
      success = await updateTripPackage(selectedPackage.id, values);
      if (success) toast("Trip package updated successfully");
    } else {
      success = await createTripPackage(values);
      if (success) toast("Trip package added successfully");
    }

    if (success) {
      await fetchTripPackages();
      setDialogOpen(false);
    }
  };

  return {
    fetchTripPackages,
    handleAddPackage,
    handleEditPackage,
    handleDeletePackage,
    viewItinerary,
    confirmDelete,
    handleSubmit
  };
};
