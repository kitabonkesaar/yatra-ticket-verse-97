
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TripPackage } from "@/types/admin";
import TripItinerary from "@/components/TripItinerary";

interface ViewItineraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tripPackage: TripPackage | null;
}

const ViewItineraryDialog = ({ open, onOpenChange, tripPackage }: ViewItineraryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{tripPackage?.name} - Itinerary</DialogTitle>
        </DialogHeader>
        
        {tripPackage && tripPackage.itinerary && tripPackage.itinerary.length > 0 ? (
          <TripItinerary itinerary={tripPackage.itinerary} />
        ) : (
          <div className="py-8 text-center text-gray-500">
            No itinerary available for this trip package.
          </div>
        )}
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewItineraryDialog;
