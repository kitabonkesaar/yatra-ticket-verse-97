
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { VehicleFormDialog } from "@/components/admin/VehicleFormDialog";
import { VehiclesHeader } from "@/components/admin/VehiclesHeader";
import { VehiclesSearch } from "@/components/admin/VehiclesSearch";
import { VehiclesTable } from "@/components/admin/VehiclesTable";
import { useVehiclesManagement } from "@/hooks/useVehiclesManagement";
import { useAdminRoute } from "@/hooks/useAdminRoute";

const VehiclesManagement = () => {
  // Protect admin route
  useAdminRoute();
  
  const {
    vehicles,
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
  } = useVehiclesManagement();

  return (
    <div className="space-y-6">
      <VehiclesHeader onAddVehicle={handleAddVehicle} />
      
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <VehiclesSearch 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </CardHeader>
        <CardContent>
          <VehiclesTable 
            vehicles={vehicles}
            loading={loading}
            handleEditVehicle={handleEditVehicle}
            handleDeleteVehicle={handleDeleteVehicle}
          />
        </CardContent>
      </Card>

      <VehicleFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={selectedVehicle || undefined}
        title={isEditing ? "Edit Vehicle" : "Add Vehicle"}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete the vehicle "{selectedVehicle?.name}" from the system. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 text-white hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default VehiclesManagement;
