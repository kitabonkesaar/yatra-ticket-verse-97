
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Check, X } from "lucide-react";
import TripItinerary from "@/components/TripItinerary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const vehicleData = {
  bolero: {
    name: "Bolero",
    image: "/placeholder.svg",
    description: "Perfect for small groups and rough terrain adventures",
    capacity: "7 Passengers",
    itinerary: [
      {
        day: 1,
        highlight: "Departure from Haridwar",
        details: "Early morning departure, visit local temples"
      },
      {
        day: 2,
        highlight: "Reach Kedarnath Base",
        details: "Evening aarti and temple visit"
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
    image: "/placeholder.svg",
    description: "Comfortable travel for larger groups",
    capacity: "12 Passengers",
    itinerary: [
      {
        day: 1,
        highlight: "Start from Delhi",
        details: "Morning departure towards Haridwar"
      },
      {
        day: 2,
        highlight: "Rishikesh Tour",
        details: "Visit famous temples and ashrams"
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
  const vehicle = vehicleData[type as keyof typeof vehicleData];

  if (!vehicle) return <div>Vehicle not found</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container-custom py-8">
          {/* Hero Section */}
          <div className="relative rounded-xl overflow-hidden mb-8">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{vehicle.name}</h1>
              <p className="text-lg">{vehicle.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Itinerary Section */}
            <Card>
              <CardContent className="p-6">
                <TripItinerary itinerary={vehicle.itinerary} />
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions */}
            <Card>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VehicleDetails;
