
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export type Passenger = {
  name: string;
  age: string;
  aadhaar?: string;
};

// Form schema
const formSchema = z.object({
  numPassengers: z.number().min(1).max(6),
  contact: z.string().min(10, "Contact number must be at least 10 digits"),
  notes: z.string().optional(),
});

export const useBookingForm = (onSuccess: (booking: any) => void) => {
  const [passengers, setPassengers] = useState<Passenger[]>([{ name: "", age: "" }]);
  const [numPassengers, setNumPassengers] = useState(1);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numPassengers: 1,
      contact: "",
      notes: "",
    },
  });

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

  const handlePassengerChange = (index: number, field: string, value: string) => {
    setPassengers(ps => ps.map((p, idx) => idx === index ? { ...p, [field]: value } : p));
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (passengers.some(p => !p.name || !p.age)) {
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({
        passengers,
        contact: data.contact,
        notes: data.notes,
        bookedAt: new Date(),
      });
    }, 700);
  };

  return {
    form,
    passengers,
    numPassengers,
    loading,
    handleNumChange,
    handlePassengerChange,
    onSubmit
  };
};
