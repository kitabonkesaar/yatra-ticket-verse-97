
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserFormDialog } from "@/components/admin/UserFormDialog";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminRoute } from "@/hooks/useAdminRoute";
import { useUserManagement } from "@/hooks/useUserManagement";
import { UsersHeader } from "@/components/admin/users/UsersHeader";
import { UsersList } from "@/components/admin/users/UsersList";

const UsersManagement = () => {
  // Protect admin route
  useAdminRoute();
  
  const { user: authUser, isAdmin } = useAuth();
  const {
    users,
    loading,
    searchQuery,
    setSearchQuery,
    sortField,
    sortDirection,
    handleSort,
    selectedUser,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    openEditDialog,
    openDeleteDialog,
    openAddDialog
  } = useUserManagement();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-500">Manage all users of the platform</p>
        </div>
      </div>
      
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <UsersHeader 
            loading={loading}
            totalUsers={users.length}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddUser={openAddDialog}
          />
        </CardHeader>
        <CardContent>
          <UsersList
            users={users}
            loading={loading}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            onEdit={openEditDialog}
            onDelete={openDeleteDialog}
          />
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <UserFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddUser}
        title="Add New User"
      />

      {/* Edit User Dialog */}
      {selectedUser && (
        <UserFormDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleEditUser}
          defaultValues={{
            name: selectedUser.name,
            email: selectedUser.email,
            phone: selectedUser.phone,
            role: selectedUser.role,
            status: selectedUser.status
          }}
          title="Edit User"
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteUser}
        title="Delete User"
        description={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default UsersManagement;
