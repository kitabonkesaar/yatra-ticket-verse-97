
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
  startDate,
}) => {
  const [step, setStep] = useState<"form" | "success">("form");
  const [form, setForm] = useState({
    name: "",
    age: "",
    aadhaar: "",
    seats: "1",
  });

  if (!open) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("success");
  }

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative animate-scale-in">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >×</button>
        {step === "form" && (
          <>
            <h3 className="text-2xl font-bold mb-3 text-bharat-orange">Book Now</h3>
            <p className="mb-2 text-sm font-medium text-gray-700">
              {tourTitle} <span className="text-xs text-bharat-orange font-semibold">Ex - {ex}</span>
            </p>
            <p className="mb-4">
              Start: <b>{new Date(startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</b>
              {` | ₹${price.toLocaleString("en-IN")} (Advance: ₹${advanceAmount.toLocaleString("en-IN")})`}
            </p>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="font-medium mb-1 block">Passenger Name*</label>
                <Input required name="name" value={form.name} onChange={handleChange} autoFocus />
              </div>
              <div>
                <label className="font-medium mb-1 block">Age*</label>
                <Input
                  type="number"
                  min={1}
                  required
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  inputMode="numeric"
                />
              </div>
              <div>
                <label className="font-medium mb-1 block">Aadhaar (Optional)</label>
                <Input
                  name="aadhaar"
                  value={form.aadhaar}
                  maxLength={12}
                  pattern="\d{0,12}"
                  onChange={handleChange}
                  placeholder="12 digit (optional)"
                />
              </div>
              <div>
                <label className="font-medium mb-1 block">No. of Seats*</label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  required
                  name="seats"
                  value={form.seats}
                  onChange={handleChange}
                  inputMode="numeric"
                />
              </div>
              <div className="flex gap-2 pt-3">
                <Button
                  type="submit"
                  className="bg-bharat-orange hover:bg-bharat-orange/90 w-full transition-transform hover:scale-105"
                >
                  Book & Continue
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="w-full"
                >Cancel</Button>
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
            <Button onClick={onClose} className="bg-bharat-orange w-full">
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;

