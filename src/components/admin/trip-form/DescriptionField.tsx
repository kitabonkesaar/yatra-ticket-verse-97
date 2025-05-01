
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { TripPackageFormValues } from "@/schemas/tripPackageSchema";

interface DescriptionFieldProps {
  control: Control<TripPackageFormValues>;
}

const DescriptionField = ({ control }: DescriptionFieldProps) => {
  return (
    <FormField 
      control={control} 
      name="description" 
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea placeholder="Trip package description..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} 
    />
  );
};

export default DescriptionField;
