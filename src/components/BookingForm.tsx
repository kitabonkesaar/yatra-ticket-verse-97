
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

interface BookingFormProps {
  price: number;
  advanceAmount: number;
  ex: string;
  onSuccess: (booking: any) => void;
}

type Passenger = { name: string; age: string; aadhaar?: string };

// Define the form schema with zod
const formSchema = z.object({
  numPassengers: z.number().min(1).max(6),
  contact: z.string().min(10, "Contact number must be at least 10 digits"),
  notes: z.string().optional(),
});

const BookingForm: React.FC<BookingFormProps> = ({ price, advanceAmount, ex, onSuccess }) => {
  const [passengers, setPassengers] = useState<Passenger[]>([{ name: "", age: "" }]);
  const [numPassengers, setNumPassengers] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numPassengers: 1,
      contact: "",
      notes: "",
    },
  });

  // Anim on passenger list:
  const handleNumChange = (n: number) => {
    if (n < 1) return;
    setNumPassengers(n);
    form.setValue("numPassengers", n);
    
    setPassengers(ps => {
      const arr = [...ps];
      while (arr.length < n) arr.push({ name: "", age: "" });
      while (arr.length > n) arr.pop();
      return arr;
    });
  };

  const handleChange = (i: number, field: string, val: string) => {
    setPassengers(ps => ps.map((p, idx) => idx === i ? { ...p, [field]: val } : p));
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (passengers.some(p => !p.name || !p.age)) {
      return; // Don't submit if passenger info is incomplete
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({
        passengers,
        contact: data.contact,
        ex,
        notes: data.notes,
        bookedAt: new Date(),
      });
    }, 700);
  };

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
              <div key={idx} className="rounded bg-gray-50 p-2 border mb-1 animate-float">
                <div className="flex gap-2 items-center">
                  <Input
                    type="text"
                    value={p.name}
                    onChange={e => handleChange(idx, "name", e.target.value)}
                    placeholder={`Passenger ${idx + 1} Name`}
                    className="w-1/2"
                    required
                  />
                  <Input
                    type="number"
                    value={p.age}
                    onChange={e => handleChange(idx, "age", e.target.value)}
                    placeholder="Age"
                    min={1}
                    className="w-1/4"
                    required
                  />
                  <Input
                    type="text"
                    value={p.aadhaar || ""}
                    onChange={e => handleChange(idx, "aadhaar", e.target.value)}
                    placeholder="Aadhaar (optional)"
                    className="w-1/4"
                    maxLength={12}
                  />
                </div>
              </div>
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
