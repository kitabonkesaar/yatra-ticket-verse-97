import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TripItinerary from "../components/TripItinerary";
import BookingForm from "../components/BookingForm";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

// Demo trip data for placeholder
const mockTrips = [{
  id: "1",
  title: "Kedarnath Budget Tour",
  image: "/placeholder.svg",
  ex: "Haridwar",
  price: 5999,
  advanceAmount: 2000,
  startDate: "2025-06-04",
  duration: 4,
  busType: "Traveller",
  itinerary: [{
    day: 1,
    highlight: "Haridwar - Guptkashi",
    details: "Pickup from Haridwar & drive to Guptkashi. Night stay."
  }, {
    day: 2,
    highlight: "Guptkashi - Sonprayag - Kedarnath",
    details: "Early drive, trek to Kedarnath. Darshan & stay."
  }, {
    day: 3,
    highlight: "Kedarnath - Sonprayag - Guptkashi",
    details: "Return trek, drive to Guptkashi. Night stay."
  }, {
    day: 4,
    highlight: "Guptkashi - Haridwar",
    details: "Return to Haridwar. Trip ends."
  }],
  stayNote: "Meals & Stay not included – pay on site.",
  routeMapUrl: ""
}
// More trips could go here ...
];
const TripDetails = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const trip = mockTrips.find(t => t.id === id) || mockTrips[0];
  const [showPayment, setShowPayment] = useState(false);
  const handleBookingSuccess = (bookingDetails: any) => {
    setShowPayment(true);
    // In real app, you would pass data to payment API
  };
  return <div className="container-custom py-6 animate-fade-in">
      <Card className="overflow-hidden max-w-2xl mx-auto">
        <div className="relative h-60 md:h-80 w-full overflow-hidden">
          <img src={trip.image} alt={trip.title} style={{
          animation: "scale-in 0.5s"
        }} className="w-full h-full object-center object-cover" />
          <span className="absolute top-4 left-4 bg-bharat-orange rounded text-white px-3 py-1 shadow font-semibold text-sm">Bus: {trip.busType}</span>
          <span className="absolute top-4 right-4 bg-foreground text-white px-3 py-1 rounded shadow font-semibold text-sm animate-float">Ex - {trip.ex}</span>
        </div>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-between">
            {trip.title}
            <span className="inline-block text-bharat-orange text-lg ml-2 font-bold">₹{trip.price.toLocaleString("en-IN")}</span>
          </CardTitle>
          <div className="mt-1 text-sm text-gray-600 flex gap-4">
            <span>{trip.duration} days</span>
            <span>Start: {new Date(trip.startDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short"
            })}</span>
          </div>
          <div className="mt-2">
            <span className="disclaimer">{trip.stayNote}</span>
          </div>
        </CardHeader>
        <CardContent>
          <TripItinerary itinerary={trip.itinerary} />
          <hr className="my-4" />
          {showPayment ? <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
              <p className="font-semibold text-success mb-6 text-lg">Booking Saved!</p>
              <div className="rounded-xl bg-gradient-to-tr from-orange-100 to-white shadow-lg max-w-xs w-full p-4 flex flex-col items-center gap-2 animate-scale-in">
                <span className="text-3xl font-bold text-bharat-orange animate-float">Proceed to Payment</span>
                <span className="text-gray-700 font-medium">Click to pay your advance:<br /> <span className="text-xl">₹{trip.advanceAmount}</span></span>
                <Button className="mt-4 w-full bg-bharat-orange hover:bg-bharat-orange/90 pulse" size="lg" onClick={() => alert("Redirecting to Razorpay... (demo)")}>
                  Pay with Razorpay →
                </Button>
                <span className="text-xs text-gray-400 mt-1">* Demo payment only</span>
              </div>
            </div> : <BookingForm price={trip.price} advanceAmount={trip.advanceAmount} ex={trip.ex} onSuccess={handleBookingSuccess} />}
          <Button variant="outline" className="mt-6" onClick={() => navigate(-1)}>← Back to Packages</Button>
        </CardContent>
      </Card>
    </div>;
};
export default TripDetails;