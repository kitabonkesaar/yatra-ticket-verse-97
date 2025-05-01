
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { TripPackageFormValues } from "@/schemas/tripPackageSchema";

interface ImageUrlFieldProps {
  control: Control<TripPackageFormValues>;
}

const ImageUrlField = ({ control }: ImageUrlFieldProps) => {
  return (
    <FormField 
      control={control} 
      name="imageUrl" 
      render={({ field }) => (
        <FormItem>
          <FormLabel>Image URL</FormLabel>
          <FormControl>
            <Input placeholder="https://example.com/image.jpg" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} 
    />
  );
};

export default ImageUrlField;
