import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TripItinerary from "../components/TripItinerary";
import BookingForm from "../components/BookingForm";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

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
  routeMapUrl: "",
  included: [
    "Transport by AC/Non-AC bus",
    "Sightseeing as per itinerary",
    "Toll taxes, parking, driver allowance",
    "Basic first aid kit"
  ],
  notIncluded: [
    "Meals",
    "Accommodation",
    "Entry fees at monuments",
    "Personal expenses"
  ]
}
// More trips could go here ...
];
const TripDetails = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const trip = mockTrips.find(t => t.id === id) || mockTrips[0];
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const { user } = useAuth();

  const handleBookingSuccess = (bookingDetails: any) => {
    setShowPayment(true);
    // In real app, you would pass data to payment API
  };

  if (!user) {
    return (
      <div className="text-center p-6">
        <p className="mb-4 font-semibold text-bharat-orange">You must be logged in to book a trip.</p>
        <button
          className="bg-bharat-orange text-white px-4 py-2 rounded"
          onClick={() => window.location.href = '/login'}
        >
          Login to Continue
        </button>
      </div>
    );
  }

  return <div className="container-custom py-6 animate-fade-in">
      <Card className="overflow-hidden max-w-2xl mx-auto">
        <div className="relative h-56 sm:h-60 md:h-80 w-full overflow-hidden">
          <img src={trip.image} alt={trip.title} style={{ animation: "scale-in 0.5s" }} className="w-full h-full object-center object-cover rounded" />
          <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-bharat-orange rounded text-white px-2 py-1 sm:px-3 sm:py-1 shadow font-semibold text-xs sm:text-sm">Bus: {trip.busType}</span>
          <span className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-foreground text-white px-2 py-1 sm:px-3 sm:py-1 rounded shadow font-semibold text-xs sm:text-sm animate-float">Ex - {trip.ex}</span>
        </div>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            {trip.title}
            <span className="inline-block text-bharat-orange text-lg ml-0 sm:ml-2 font-bold">₹{trip.price.toLocaleString("en-IN")}</span>
          </CardTitle>
          <div className="mt-1 text-xs sm:text-sm text-gray-600 flex flex-col sm:flex-row gap-2 sm:gap-4">
            <span>{trip.duration} days</span>
            <span>Start: {new Date(trip.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
          </div>
          <div className="mt-2">
            <span className="disclaimer text-xs sm:text-sm">{trip.stayNote}</span>
          </div>
        </CardHeader>
        <CardContent>
          {!showBookingForm ? (
            <>
              <TripItinerary itinerary={trip.itinerary} />
              <hr className="my-4" />
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                    <span className="inline-block bg-green-100 rounded-full p-1"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {trip.included?.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm">
                        <span className="inline-block bg-green-100 rounded-full p-1"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                    <span className="inline-block bg-red-100 rounded-full p-1"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                    What's Not Included
                  </h3>
                  <ul className="space-y-2">
                    {trip.notIncluded?.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm">
                        <span className="inline-block bg-red-100 rounded-full p-1"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button className="mt-8 w-full bg-bharat-orange hover:bg-bharat-orange/90 text-base sm:text-lg py-3" size="lg" onClick={() => setShowBookingForm(true)}>
                Proceed to Booking
              </Button>
            </>
          ) : (
            !showPayment ? (
              <BookingForm price={trip.price} advanceAmount={trip.advanceAmount} ex={trip.ex} onSuccess={handleBookingSuccess} />
            ) : (
              <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
                <p className="font-semibold text-success mb-6 text-lg">Booking Saved!</p>
                <div className="rounded-xl bg-gradient-to-tr from-orange-100 to-white shadow-lg max-w-xs w-full p-4 flex flex-col items-center gap-2 animate-scale-in">
                  <span className="text-3xl font-bold text-bharat-orange animate-float">Proceed to Payment</span>
                  <span className="text-gray-700 font-medium">Click to pay your advance:<br /> <span className="text-xl">₹{trip.advanceAmount}</span></span>
                  <Button className="mt-4 w-full bg-bharat-orange hover:bg-bharat-orange/90 pulse" size="lg" onClick={() => alert("Redirecting to Razorpay... (demo)")}>Pay with Razorpay →</Button>
                  <span className="text-xs text-gray-400 mt-1">* Demo payment only</span>
                </div>
              </div>
            )
          )}
          <Button variant="outline" className="mt-6" onClick={() => navigate(-1)}>← Back to Packages</Button>
        </CardContent>
      </Card>
    </div>;
};
export default TripDetails;