
import { useState } from "react";
import { TripPackage } from "@/types/admin";

export const useTripPackageState = () => {
  const [tripPackages, setTripPackages] = useState<TripPackage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<TripPackage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewItineraryDialogOpen, setViewItineraryDialogOpen] = useState(false);

  const filteredPackages = tripPackages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    tripPackages,
    setTripPackages,
    searchTerm,
    setSearchTerm,
    selectedPackage,
    setSelectedPackage,
    isEditing,
    setIsEditing,
    loading,
    setLoading,
    dialogOpen,
    setDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    viewItineraryDialogOpen,
    setViewItineraryDialogOpen,
    filteredPackages
  };
};
