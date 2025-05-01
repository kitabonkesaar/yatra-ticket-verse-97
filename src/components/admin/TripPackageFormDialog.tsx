import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { tripPackageFormSchema, TripPackageFormValues, getFormDefaultValues } from "@/schemas/tripPackageSchema";
import BasicInfoFields from "@/components/admin/trip-form/BasicInfoFields";
import DateFields from "@/components/admin/trip-form/DateFields";
import DetailsFields from "@/components/admin/trip-form/DetailsFields";
import ItineraryField from "@/components/admin/trip-form/ItineraryField";

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
  defaultValues,
  title
}: TripPackageFormDialogProps) {
  // Use the helper function to ensure proper type handling
  const formDefaultValues = getFormDefaultValues(defaultValues);

  const form = useForm<TripPackageFormValues>({
    resolver: zodResolver(tripPackageFormSchema),
    defaultValues: formDefaultValues
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <BasicInfoFields control={form.control} />
            <DateFields control={form.control} />
            <DetailsFields control={form.control} />
            <ItineraryField control={form.control} />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
