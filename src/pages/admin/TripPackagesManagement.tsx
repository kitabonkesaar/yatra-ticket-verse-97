
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TripPackageFormDialog } from "@/components/admin/TripPackageFormDialog";
import { useTripPackages } from "@/hooks/useTripPackages";
import TripPackageTable from "@/components/admin/trips/TripPackageTable";
import DeleteTripDialog from "@/components/admin/trips/DeleteTripDialog";
import ViewItineraryDialog from "@/components/admin/trips/ViewItineraryDialog";

const TripPackagesManagement = () => {
  const {
    filteredPackages,
    searchTerm,
    setSearchTerm,
    selectedPackage,
    isEditing,
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
  } = useTripPackages();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Trip Packages Management</h2>
        <Button onClick={handleAddPackage}>
          <Plus className="mr-2 h-4 w-4" />
          Add Trip Package
        </Button>
      </div>

      <div className="flex items-center mb-4">
        <Input
          placeholder="Search packages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <TripPackageTable
        packages={filteredPackages}
        onEdit={handleEditPackage}
        onDelete={handleDeletePackage}
        onViewItinerary={viewItinerary}
      />

      <TripPackageFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={selectedPackage || undefined}
        title={isEditing ? "Edit Trip Package" : "Add Trip Package"}
      />

      <DeleteTripDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        tripPackage={selectedPackage}
        onConfirm={confirmDelete}
      />
      
      <ViewItineraryDialog
        open={viewItineraryDialogOpen}
        onOpenChange={setViewItineraryDialogOpen}
        tripPackage={selectedPackage}
      />
    </div>
  );
};

export default TripPackagesManagement;
