
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { TripPackageFormValues } from "@/schemas/tripPackageSchema";

interface BasicInfoFieldsProps {
  control: Control<TripPackageFormValues>;
}

const BasicInfoFields = ({ control }: BasicInfoFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField 
          control={control} 
          name="name" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Name</FormLabel>
              <FormControl>
                <Input placeholder="Golden Triangle Tour" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
        <FormField 
          control={control} 
          name="destination" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Starting Point</FormLabel>
              <FormControl>
                <Input placeholder="Delhi-Agra-Jaipur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField 
          control={control} 
          name="duration" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input placeholder="5 days 4 nights" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
        <FormField 
          control={control} 
          name="price" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (₹)</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
      </div>
    </>
  );
};

export default BasicInfoFields;
