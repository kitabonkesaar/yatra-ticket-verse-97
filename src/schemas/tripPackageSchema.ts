
import { z } from "zod";
import { ItineraryItem } from "@/types/admin";

// Define the form schema with proper types that match ItineraryItem
export const tripPackageFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters."
  }),
  duration: z.string().min(1, {
    message: "Duration is required."
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number."
  }),
  status: z.enum(["Active", "Inactive"]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  featured: z.boolean().default(false),
  itinerary: z.array(
    z.object({
      day: z.number().positive(),
      highlight: z.string(),
      details: z.string()
    })
  ).default([])
});

export type TripPackageFormValues = z.infer<typeof tripPackageFormSchema>;

export const getFormDefaultValues = (defaultValues: Partial<TripPackageFormValues> = {}): TripPackageFormValues => {
  return {
    name: "",
    destination: "",
    duration: "3 days",
    price: 0,
    status: "Active" as const,
    startDate: "",
    endDate: "",
    description: "",
    imageUrl: "",
    featured: false,
    // Initialize itinerary with correct types
    itinerary: Array.isArray(defaultValues.itinerary) && defaultValues.itinerary.length > 0
      ? defaultValues.itinerary.map(item => ({
          day: typeof item.day === 'number' ? item.day : 1,
          highlight: typeof item.highlight === 'string' ? item.highlight : '',
          details: typeof item.details === 'string' ? item.details : ''
        }))
      : []
  };
};
