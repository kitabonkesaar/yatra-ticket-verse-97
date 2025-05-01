
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { TripPackageFormValues } from "@/schemas/tripPackageSchema";

interface DateFieldsProps {
  control: Control<TripPackageFormValues>;
}

const DateFields = ({ control }: DateFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField 
        control={control} 
        name="startDate" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>Start Date (optional)</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} 
      />
      <FormField 
        control={control} 
        name="endDate" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>End Date (optional)</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} 
      />
    </div>
  );
};

export default DateFields;
