import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ItineraryItem } from "@/types/admin";
import ItineraryFormField from "./ItineraryFormField";

// Define the form schema
const tripPackageFormSchema = z.object({
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
  itinerary: z.array(z.object({
    day: z.number().positive(),
    highlight: z.string(),
    details: z.string()
  })).optional()
});
type TripPackageFormValues = z.infer<typeof tripPackageFormSchema>;
interface TripPackageFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: TripPackageFormValues) => void;
  defaultValues?: Partial<TripPackageFormValues>;
  title: string;
}
export function TripPackageFormDialog({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {
    name: "",
    destination: "",
    duration: "3 days",
    price: 0,
    status: "Active",
    startDate: "",
    endDate: "",
    description: "",
    imageUrl: "",
    featured: false,
    itinerary: []
  },
  title
}: TripPackageFormDialogProps) {
  const form = useForm<TripPackageFormValues>({
    resolver: zodResolver(tripPackageFormSchema),
    defaultValues
  });
  function handleSubmit(values: TripPackageFormValues) {
    onSubmit(values);
    form.reset();
    onOpenChange(false);
    toast({
      title: "Trip package saved",
      description: "The trip package has been successfully saved"
    });
  }
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({
              field
            }) => <FormItem>
                    <FormLabel>Package Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Golden Triangle Tour" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="destination" render={({
              field
            }) => <FormItem>
                    <FormLabel>Starting Point</FormLabel>
                    <FormControl>
                      <Input placeholder="Delhi-Agra-Jaipur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="duration" render={({
              field
            }) => <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="5 days 4 nights" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="price" render={({
              field
            }) => <FormItem>
                    <FormLabel>Price (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="startDate" render={({
              field
            }) => <FormItem>
                    <FormLabel>Start Date (optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="endDate" render={({
              field
            }) => <FormItem>
                    <FormLabel>End Date (optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </div>

            <FormField control={form.control} name="status" render={({
            field
          }) => <FormItem>
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
                </FormItem>} />

            <FormField control={form.control} name="imageUrl" render={({
            field
          }) => <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="description" render={({
            field
          }) => <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Trip package description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="featured" render={({
            field
          }) => <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      Display this package prominently on the homepage
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>} />

            <FormField control={form.control} name="itinerary" render={({
            field
          }) => <FormItem>
                  <FormLabel>Itinerary</FormLabel>
                  <FormControl>
                    <ItineraryFormField value={field.value || []} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>;
}