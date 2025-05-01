
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import DigitalTicket from "./DigitalTicket";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  tourTitle: string;
  ex: string;
  price: number;
  advanceAmount: number;
  startDate: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onClose,
  tourTitle,
  ex,
  price,
  advanceAmount,
  startDate
}) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "success" | "ticket">("form");
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    age: "",
    aadhaar: "",
    contact: "",
    seats: "1"
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    
    checkAuth();
  }, []);

  if (!open) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({
      ...f,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      // If user is logged in, save the booking to the database
      if (user) {
        // Insert booking record
        const { data: bookingData, error: bookingError } = await supabase
          .from("bookings")
          .insert({
            user_id: user.id,
            trip_title: tourTitle,
            start_date: startDate,
            ex: ex,
            bus_type: "Sleeper Bus", // This could be dynamic in a real app
            contact: form.contact,
            total_amount: price,
            payment_type: "Advance"
          })
          .select()
          .single();
          
        if (bookingError) throw bookingError;
        
        // Insert passenger record
        const { error: passengerError } = await supabase
          .from("passengers")
          .insert({
            booking_id: bookingData.id,
            name: form.name,
            age: form.age,
            aadhaar: form.aadhaar || null
          });
          
        if (passengerError) throw passengerError;
        
        toast.success("Booking saved successfully!");
      } else {
        // If not logged in, prompt to login
        toast.warning("Please log in to save your booking", {
          action: {
            label: "Login",
            onClick: () => navigate('/login')
          }
        });
      }
      
      setStep("success");
    } catch (error) {
      console.error("Error saving booking:", error);
      toast.error("Failed to save booking. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative animate-scale-in">
        <button className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl font-bold" onClick={onClose} aria-label="Close">×</button>

        {step === "form" && (
          <>
            <h3 className="text-2xl font-bold mb-3 text-bharat-orange">Book Now</h3>
            <p className="mb-2 text-sm font-medium text-gray-700">
              {tourTitle} <span className="text-xs text-bharat-orange font-semibold">Ex - {ex}</span>
            </p>
            <p className="mb-4">
              Start: <b>{new Date(startDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short"
            })}</b>
              {` | ₹${price.toLocaleString("en-IN")} (Advance: ₹${advanceAmount.toLocaleString("en-IN")})`}
            </p>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="font-medium mb-1 block">Passenger Name*</label>
                <Input required name="name" value={form.name} onChange={handleChange} autoFocus />
              </div>
              <div>
                <label className="font-medium mb-1 block">Age*</label>
                <Input type="number" min={1} required name="age" value={form.age} onChange={handleChange} inputMode="numeric" />
              </div>
              <div>
                <label className="font-medium mb-1 block">Contact Number*</label>
                <Input 
                  type="tel" 
                  required 
                  name="contact" 
                  value={form.contact} 
                  onChange={handleChange} 
                  placeholder="Your 10-digit phone number"
                  pattern="[0-9]{10}"
                  inputMode="tel"
                />
              </div>
              <div>
                <label className="font-medium mb-1 block">No. of Seats*</label>
                <Input type="number" min={1} max={10} required name="seats" value={form.seats} onChange={handleChange} inputMode="numeric" />
              </div>
              <div className="flex gap-2 pt-3">
                <Button type="submit" className="bg-bharat-orange hover:bg-bharat-orange/90 w-full transition-transform hover:scale-105">
                  Book & Continue
                </Button>
                <Button type="button" variant="outline" onClick={onClose} className="w-full">Cancel</Button>
              </div>
            </form>
          </>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center py-8 animate-scale-in">
            <div className="rounded-full bg-green-100 p-4 mb-4">
              <span role="img" aria-label="success" className="text-3xl">✅</span>
            </div>
            <h4 className="text-lg font-bold mb-2 text-bharat-orange">Booking Initiated!</h4>
            <p className="text-center text-gray-600 mb-4">
              Thank you for your interest.<br />A team member will contact you for payment and all details soon.
            </p>
            <Button onClick={() => setStep("ticket")} className="bg-bharat-orange w-full mb-2">
              View Ticket
            </Button>
            <Button onClick={onClose} variant="outline" className="w-full">
              Close
            </Button>
          </div>
        )}

        {step === "ticket" && (
          <DigitalTicket booking={{
            passengers: [{
              name: form.name,
              age: form.age,
              aadhaar: form.aadhaar
            }],
            contact: form.contact || form.name,
            tourTitle,
            startDate,
            ex,
            busType: "Sleeper Bus"
          }} />
        )}
      </div>
    </div>
  );
};

export default BookingModal;
