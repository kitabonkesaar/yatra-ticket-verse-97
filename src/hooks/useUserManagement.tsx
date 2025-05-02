
import { useState, useEffect } from "react";
import { User } from "@/types/admin";
import { fetchUsers, createUser, updateUser, deleteUser } from "@/services/userService";
import { toast } from "@/hooks/use-toast";

export function useUserManagement() {
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
        toast({
          title: "Error",
          description: "Failed to load users. Please try again.",
          variant: "destructive"
        });
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

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortField) return 0;
    
    const fieldA = a[sortField as keyof typeof a];
    const fieldB = b[sortField as keyof typeof b];
    
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortDirection === "asc" 
        ? fieldA.localeCompare(fieldB) 
        : fieldB.localeCompare(fieldA);
    }
    
    // For numeric fields
    return sortDirection === "asc" 
      ? Number(fieldA) - Number(fieldB) 
      : Number(fieldB) - Number(fieldA);
  });

  const filteredUsers = sortedUsers.filter(user => 
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
        toast({
          title: "User Added",
          description: `${newUser.name} has been added successfully.`,
        });
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        title: "Error",
        description: "Failed to add user. Please try again.",
        variant: "destructive"
      });
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
      
      toast({
        title: "User Updated",
        description: `${userData.name}'s information has been updated.`,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      await deleteUser(selectedUser.id);
      
      setUsers(users.filter(user => user.id !== selectedUser.id));
      toast({
        title: "User Deleted",
        description: `${selectedUser.name} has been deleted.`,
        variant: "destructive",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive"
      });
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
}
