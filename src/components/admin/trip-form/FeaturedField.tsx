
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";
import { TripPackageFormValues } from "@/schemas/tripPackageSchema";

interface FeaturedFieldProps {
  control: Control<TripPackageFormValues>;
}

const FeaturedField = ({ control }: FeaturedFieldProps) => {
  return (
    <FormField 
      control={control} 
      name="featured" 
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <FormLabel>Featured</FormLabel>
            <FormDescription>
              Display this package prominently on the homepage
            </FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )} 
    />
  );
};

export default FeaturedField;
