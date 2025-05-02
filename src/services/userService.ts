
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/admin";
import { toast } from "sonner";

/**
 * Fetches all users from the database
 */
export const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  // Format the users data to match our User type
  return data.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email || `${user.id}@example.com`, // Email might not be available in the table
    phone: user.phone,
    role: user.role as "Customer" | "Admin",
    status: user.status as "Active" | "Inactive",
    lastActive: user.updated_at || user.created_at,
    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
  }));
};

/**
 * Creates a new user in the database
 */
export const createUser = async (userData: Omit<User, 'id' | 'lastActive' | 'image'>): Promise<User> => {
  // The Supabase types expect id as a property but it's auto-generated
  // We'll use type assertion to bypass this type requirement
  const userDataToInsert = {
    name: userData.name,
    phone: userData.phone,
    role: userData.role,
    status: userData.status
  } as any; // Using type assertion to bypass the strict typing

  const { data, error } = await supabase
    .from('users')
    .insert(userDataToInsert)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // Format the returned data to match our User type
  return {
    id: data.id,
    name: data.name,
    email: `${data.id}@example.com`, // Generate an email since it's not in the table
    phone: data.phone,
    role: data.role as "Customer" | "Admin",
    status: data.status as "Active" | "Inactive",
    lastActive: data.updated_at || data.created_at,
    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`
  };
};

/**
 * Updates a user in the database
 */
export const updateUser = async (user: User): Promise<void> => {
  // Extract only the fields that should be updated
  const { id, name, phone, role, status } = user;
  const updateData = { name, phone, role, status };
  
  const { error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', typeof id === 'number' ? id.toString() : id);

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Deletes a user from the database
 */
export const deleteUser = async (id: string | number): Promise<void> => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', typeof id === 'number' ? id.toString() : id);

  if (error) {
    throw new Error(error.message);
  }
};
