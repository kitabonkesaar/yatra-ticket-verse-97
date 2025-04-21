
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";

interface BookingFormProps {
  price: number;
  advanceAmount: number;
  ex: string;
  onSuccess: (booking: any) => void;
}

type Passenger = { name: string; age: string; aadhaar?: string };

const BookingForm: React.FC<BookingFormProps> = ({ price, advanceAmount, ex, onSuccess }) => {
  const [passengers, setPassengers] = useState<Passenger[]>([{ name: "", age: "" }]);
  const [numPassengers, setNumPassengers] = useState(1);
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Anim on passenger list:
  const handleNumChange = (n: number) => {
    if (n < 1) return;
    setNumPassengers(n);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!contact || passengers.some(p => !p.name || !p.age)) {
      setError("Fill all passenger details and contact.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({
        passengers,
        contact,
        ex,
        notes,
        bookedAt: new Date(),
      });
    }, 700);
  };

  return (
    <Card className="mt-2 shadow animate-scale-in">
      <CardContent className="py-4">
        <form onSubmit={handleSubmit} className="space-y-3 animate-fade-in">
          <h4 className="font-bold text-lg mb-0">Booking Form</h4>
          <div>
            <label className="font-medium text-bharat-orange">Number of Passengers</label>
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
          <div>
            <FormLabel>Contact Number</FormLabel>
            <Input 
              type="tel"
              value={contact}
              onChange={e => setContact(e.target.value)}
              placeholder="Mobile (required)"
              required
              className="w-full"
            />
          </div>
          <div>
            <FormLabel>Notes (optional)</FormLabel>
            <Textarea 
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any special request?"
              className="w-full"
            />
          </div>
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
          {error && <FormMessage>{error}</FormMessage>}
          <Button 
            type="submit"
            className="bg-bharat-orange hover:bg-bharat-orange/90 w-full mt-2 transition-all duration-200 animate-pulse"
            size="lg"
            disabled={loading}
          >
            {loading ? "Saving Booking..." : "Proceed to Pay ₹" + advanceAmount * numPassengers}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
