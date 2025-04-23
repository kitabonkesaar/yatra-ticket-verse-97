
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import PassengerInput from "./booking/PassengerInput";
import { useBookingForm } from "@/hooks/useBookingForm";

interface BookingFormProps {
  price: number;
  advanceAmount: number;
  ex: string;
  onSuccess: (booking: any) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ price, advanceAmount, ex, onSuccess }) => {
  const {
    form,
    passengers,
    numPassengers,
    loading,
    handleNumChange,
    handlePassengerChange,
    onSubmit
  } = useBookingForm(onSuccess);

  return (
    <Card className="mt-2 shadow animate-scale-in">
      <CardContent className="py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 animate-fade-in">
            <h4 className="font-bold text-lg mb-0">Booking Form</h4>
            
            <div>
              <Label className="font-medium text-bharat-orange">Number of Passengers</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="number"
                  min={1}
                  max={6}
                  value={numPassengers}
                  onChange={e => handleNumChange(Number(e.target.value))}
                  className="w-24 text-center"
                  required
                />
                <span className="text-sm text-gray-500">{`Max 6 per booking`}</span>
              </div>
            </div>

            {passengers.map((p, idx) => (
              <PassengerInput
                key={idx}
                index={idx}
                {...p}
                onChange={handlePassengerChange}
              />
            ))}

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel"
                      placeholder="Mobile (required)"
                      required
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any special request?"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-between mt-3">
              <div>
                <span className="text-gray-500 text-xs">Advance:</span>{" "}
                <span className="text-bharat-orange font-semibold">₹{advanceAmount * numPassengers}</span>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Total:</span>{" "}
                <span className="font-bold text-lg">₹{price * numPassengers}</span>
              </div>
            </div>
            
            <Button 
              type="submit"
              className="bg-bharat-orange hover:bg-bharat-orange/90 w-full mt-2 transition-all duration-200 animate-pulse"
              size="lg"
              disabled={loading}
            >
              {loading ? "Saving Booking..." : "Proceed to Pay ₹" + advanceAmount * numPassengers}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
