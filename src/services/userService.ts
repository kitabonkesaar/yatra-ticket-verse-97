import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/admin";
import { toast } from "sonner";

/**
 * Fetches all users from Supabase
 */
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('http://localhost:4000/api/admin-users');
    const result = await response.json();
    // result.users or result.data depending on Supabase response structure
    // Map the Supabase Auth user fields to your User type
    return (result.users || result.data || []).map((u: any) => ({
      id: u.id,
      name: u.user_metadata?.name || u.email || 'No Name',
      email: u.email,
      phone: u.phone || '',
      role: u.user_metadata?.role === 'admin' ? 'Admin' : 'Customer',
      status: u.confirmed_at ? 'Active' : 'Inactive',
      lastActive: u.last_sign_in_at,
      image: u.user_metadata?.avatar_url || '',
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    toast("Failed to load users");
    return [];
  }
};

/**
 * Creates a new user
 */
export const createUser = async (values: Omit<User, "id"> & { password: string }): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:4000/api/admin-users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        name: values.name,
        phone: values.phone,
        role: values.role,
      }),
    });
    const result = await response.json();
    if (response.ok) return true;
    throw new Error(result.error || 'Failed to create user');
  } catch (error) {
    console.error("Error creating user:", error);
    toast("Failed to create user");
    return false;
  }
};

/**
 * Updates an existing user
 */
export const updateUser = async (id: string, values: Omit<User, "id">): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:4000/api/admin-users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: values.email,
        name: values.name,
        phone: values.phone,
        role: values.role,
      }),
    });
    const result = await response.json();
    if (response.ok) return true;
    throw new Error(result.error || 'Failed to update user');
  } catch (error) {
    console.error("Error updating user:", error);
    toast("Failed to update user");
    return false;
  }
};

/**
 * Deletes a user
 */
export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:4000/api/admin-users/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (response.ok) return true;
    throw new Error(result.error || 'Failed to delete user');
  } catch (error) {
    console.error("Error deleting user:", error);
    toast("Failed to delete user");
    return false;
  }
};
