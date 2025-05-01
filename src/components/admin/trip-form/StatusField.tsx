
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { TripPackageFormValues } from "@/schemas/tripPackageSchema";

interface StatusFieldProps {
  control: Control<TripPackageFormValues>;
}

const StatusField = ({ control }: StatusFieldProps) => {
  return (
    <FormField 
      control={control} 
      name="status" 
      render={({ field }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} 
    />
  );
};

export default StatusField;
