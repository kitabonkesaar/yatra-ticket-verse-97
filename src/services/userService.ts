
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/admin";
import { toast } from "sonner";

/**
 * Fetches all users from Supabase
 */
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      throw error;
    }

    return data as User[];
  } catch (error) {
    console.error("Error fetching users:", error);
    toast("Failed to load users");
    return [];
  }
};

/**
 * Creates a new user
 */
export const createUser = async (values: Omit<User, "id">): Promise<boolean> => {
  try {
    // For new users, we need to convert the phone string to a number or null
    const phoneNumber = values.phone === "N/A" ? null : parseFloat(values.phone);

    const { error } = await supabase
      .from('users')
      .insert({
        name: values.name,
        phone: phoneNumber,
        role: values.role,
        status: values.status,
      });

    if (error) throw error;
    
    return true;
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
    // Convert phone string to number or null
    const phoneNumber = values.phone === "N/A" ? null : parseFloat(values.phone);

    const { error } = await supabase
      .from('users')
      .update({
        name: values.name,
        phone: phoneNumber,
        role: values.role,
        status: values.status,
      })
      .eq('id', id);

    if (error) throw error;
    
    return true;
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
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast("Failed to delete user");
    return false;
  }
};
