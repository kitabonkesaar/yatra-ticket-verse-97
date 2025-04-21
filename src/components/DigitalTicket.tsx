
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Calendar, MapPin, Bus, Users } from "lucide-react";

interface TicketProps {
  booking: {
    passengers: Array<{
      name: string;
      age: string;
      aadhaar?: string;
    }>;
    contact: string;
    tourTitle: string;
    startDate: string;
    ex: string;
    busType: string;
  };
}

const DigitalTicket: React.FC<TicketProps> = ({ booking }) => {
  return (
    <Card className="max-w-md mx-auto bg-white shadow-lg animate-scale-in">
      <CardHeader className="bg-bharat-orange text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Bharat Yatra</h3>
          <span className="text-sm">Booking Confirmed</span>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="border-b pb-4">
          <h4 className="font-bold text-lg mb-2">{booking.tourTitle}</h4>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={16} />
            <span>{new Date(booking.startDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <MapPin size={16} />
            <span>Ex - {booking.ex}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <Bus size={16} />
            <span>{booking.busType}</span>
          </div>
        </div>
        
        <div>
          <h5 className="font-semibold mb-2 flex items-center gap-2">
            <Users size={16} /> Passenger Details
          </h5>
          <div className="space-y-2">
            {booking.passengers.map((passenger, idx) => (
              <div key={idx} className="bg-gray-50 p-2 rounded">
                <p className="font-medium">{passenger.name}</p>
                <p className="text-sm text-gray-600">Age: {passenger.age}</p>
                {passenger.aadhaar && (
                  <p className="text-sm text-gray-500">Aadhaar: {passenger.aadhaar}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600">Contact: {booking.contact}</p>
          <p className="text-xs text-gray-500 mt-2">
            Please keep this ticket handy during the journey
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalTicket;
