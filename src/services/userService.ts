
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/admin";
import { toast } from "sonner";

/**
 * Fetches all users from the database
 */
export const fetchUsers = async (): Promise<User[]> => {
  // Fetch users from the auth.users view via the profiles table
  // since we can't directly query auth.users from client-side code
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, name, phone, role, updated_at');

  if (error) {
    throw new Error(error.message);
  }

  if (!profiles) {
    return [];
  }

  // Format the users data to match our User type
  return profiles.map((profile: any) => ({
    id: profile.id,
    name: profile.name || 'Anonymous User',
    email: `${profile.id.slice(0, 8)}@example.com`, // Email might not be available in the table
    phone: profile.phone?.toString() || 'N/A',
    role: profile.role as "Customer" | "Admin",
    status: "Active", // Assume all profiles are active
    lastActive: profile.updated_at || new Date().toISOString(),
    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'User')}&background=random`
  }));
};

/**
 * Creates a new user in the database
 */
export const createUser = async (userData: Omit<User, 'id' | 'lastActive' | 'image'>): Promise<User> => {
  const { name, phone, role, status } = userData;
  
  // Convert phone to number if it's a string since Supabase expects a number
  const phoneNumber = phone ? parseFloat(phone) : null;
  
  // Insert into profiles table instead of users table
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      name,
      phone: phoneNumber, 
      role,
      // Status is not in the profiles table, so we omit it
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // Format the returned data to match our User type
  return {
    id: data.id,
    name: data.name || 'Anonymous User',
    email: `${data.id.slice(0, 8)}@example.com`,
    phone: data.phone?.toString() || 'N/A',
    role: data.role as "Customer" | "Admin",
    status: status as "Active" | "Inactive", // Use the provided status since it's not in profiles
    lastActive: data.updated_at || new Date().toISOString(),
    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'User')}&background=random`
  };
};

/**
 * Updates a user in the database
 */
export const updateUser = async (user: User): Promise<void> => {
  // Extract only the fields that should be updated
  const { id, name, phone, role } = user;
  
  // Convert phone to number if it's a string since Supabase expects a number
  const phoneNumber = phone ? parseFloat(phone) : null;
  
  const updateData = { 
    name, 
    phone: phoneNumber, 
    role 
  };
  
  const { error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', id.toString());

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Deletes a user from the database
 */
export const deleteUser = async (id: string | number): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id.toString());

  if (error) {
    throw new Error(error.message);
  }
};
