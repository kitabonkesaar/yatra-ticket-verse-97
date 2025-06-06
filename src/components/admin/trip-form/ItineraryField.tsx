
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { TripPackageFormValues } from "@/schemas/tripPackageSchema";
import ItineraryFormField from "@/components/admin/ItineraryFormField";
import { ItineraryItem } from "@/types/admin";

interface ItineraryFieldProps {
  control: Control<TripPackageFormValues>;
}

const ItineraryField = ({ control }: ItineraryFieldProps) => {
  return (
    <FormField 
      control={control} 
      name="itinerary" 
      render={({ field }) => (
        <FormItem>
          <FormLabel>Itinerary</FormLabel>
          <FormControl>
            <ItineraryFormField 
              value={field.value as ItineraryItem[]} 
              onChange={field.onChange} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} 
    />
  );
};

export default ItineraryField;
