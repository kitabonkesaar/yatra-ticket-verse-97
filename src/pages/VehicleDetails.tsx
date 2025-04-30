
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Check, X, ArrowLeft } from "lucide-react";
import TripItinerary from "@/components/TripItinerary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";

const vehicleData = {
  bolero: {
    name: "Bolero",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80",
    description: "Perfect for small groups and rough terrain adventures",
    capacity: "7 Passengers",
    features: ["4x4 Drive", "Comfortable Seating", "Luggage Space", "Air Conditioning"],
    itinerary: [
      {
        day: 1,
        highlight: "Departure from Haridwar",
        details: "Early morning departure, visit local temples, comfortable travel to base location"
      },
      {
        day: 2,
        highlight: "Reach Kedarnath Base",
        details: "Evening aarti and temple visit, preparation for the trek ahead"
      },
      {
        day: 3,
        highlight: "Return Journey",
        details: "Visit other local spiritual sites on the return journey to Haridwar"
      }
    ],
    included: [
      "Experienced Driver",
      "Fuel Charges",
      "Vehicle Maintenance",
      "Basic First Aid Kit"
    ],
    notIncluded: [
      "Meals",
      "Accommodation",
      "Temple Entry Fees",
      "Personal Expenses"
    ]
  },
  traveller: {
    name: "Traveller",
    image: "https://images.unsplash.com/photo-1545171709-49f212b5a084?auto=format&fit=crop&q=80",
    description: "Comfortable travel for larger groups with extra space",
    capacity: "12 Passengers",
    features: ["Reclining Seats", "Extra Luggage Space", "USB Charging", "Reading Lights"],
    itinerary: [
      {
        day: 1,
        highlight: "Start from Delhi",
        details: "Morning departure towards Haridwar with comfort breaks"
      },
      {
        day: 2,
        highlight: "Rishikesh Tour",
        details: "Visit famous temples and ashrams, attend Ganga Aarti in the evening"
      },
      {
        day: 3,
        highlight: "Spiritual Sites",
        details: "Visit nearby spiritual sites and return to Delhi with happy memories"
      }
    ],
    included: [
      "Professional Driver",
      "Fuel Charges",
      "Vehicle Maintenance",
      "Basic First Aid Kit",
      "More Luggage Space"
    ],
    notIncluded: [
      "Meals",
      "Accommodation",
      "Entry Tickets",
      "Personal Expenses"
    ]
  }
};

const VehicleDetails = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const vehicle = vehicleData[type as keyof typeof vehicleData];

  if (!vehicle) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Vehicle not found</h1>
        <Button asChild className="mt-4">
          <Link to="/">Return Home</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-80 md:h-96">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white container-custom">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-2">{vehicle.name}</h1>
            <p className="text-xl">{vehicle.description}</p>
            <p className="mt-2 bg-bharat-orange/90 inline-block px-3 py-1 rounded-full text-sm font-medium">
              Capacity: {vehicle.capacity}
            </p>
          </div>
        </div>

        <div className="container-custom py-8">
          {/* Features Section */}
          <div className="mb-10 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-bharat-orange">Vehicle Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {vehicle.features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="bg-bharat-orange/10 p-2 rounded-full">
                    <Check size={18} className="text-bharat-orange" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Itinerary Section */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="text-bharat-red flex items-center gap-2">
                  <Calendar size={20} /> Sample Itinerary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TripItinerary itinerary={vehicle.itinerary} />
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions */}
            <Card className="animate-scale-in" style={{ animationDelay: "100ms" }}>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                    <Check size={20} /> What's Included
                  </h3>
                  <ul className="space-y-2">
                    {vehicle.included.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <Check size={16} className="text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                    <X size={20} /> What's Not Included
                  </h3>
                  <ul className="space-y-2">
                    {vehicle.notIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <X size={16} className="text-red-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-bharat-orange/10 to-bharat-red/10 p-6 rounded-lg text-center animate-fade-in">
            <h3 className="text-2xl font-bold mb-3 text-bharat-red">Ready to Book Your Journey?</h3>
            <p className="mb-4">Our {vehicle.name} vehicles are perfect for your spiritual journey</p>
            <Button 
              className="bg-bharat-orange hover:bg-bharat-orange/90" 
              size="lg"
              asChild
            >
              <Link to="/trips">Browse Available Tours</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default VehicleDetails;
