
import { useState, useEffect } from "react";
import { User } from "@/types/admin";
import { fetchUsers, updateUser, createUser, deleteUser } from "@/services/userService";
import { toast } from "sonner";

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Fetch users from Supabase
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error loading users:", error);
        toast.error("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    loadUsers();
  }, []);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredUsers = users
    .sort((a, b) => {
      if (!sortField) return 0;
      
      const fieldA = a[sortField as keyof typeof a];
      const fieldB = b[sortField as keyof typeof b];
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === "asc" 
          ? fieldA.localeCompare(fieldB) 
          : fieldB.localeCompare(fieldA);
      }
      
      // For other types, convert to string for comparison
      return sortDirection === "asc" 
        ? String(fieldA).localeCompare(String(fieldB)) 
        : String(fieldB).localeCompare(String(fieldA));
    })
    .filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // CRUD operations
  const handleAddUser = async (userData: Omit<User, 'id' | 'lastActive' | 'image'>) => {
    try {
      const newUser = await createUser(userData);
      
      if (newUser) {
        setUsers([...users, newUser]);
        toast.success(`${newUser.name} has been added successfully.`);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user. Please try again.");
    }
  };

  const handleEditUser = async (userData: Omit<User, 'id' | 'lastActive' | 'image'>) => {
    if (!selectedUser) return;
    
    try {
      const updatedUser = {
        ...selectedUser,
        ...userData
      };
      
      await updateUser(updatedUser);
      
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...userData } 
          : user
      ));
      
      toast.success(`${userData.name}'s information has been updated.`);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      await deleteUser(selectedUser.id as string);
      
      setUsers(users.filter(user => user.id !== selectedUser.id));
      toast.success(`${selectedUser.name} has been deleted.`);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  // UI handlers
  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const openAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  return {
    users: filteredUsers,
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
  };
};
