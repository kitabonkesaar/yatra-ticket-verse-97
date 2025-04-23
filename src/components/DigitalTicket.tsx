import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Calendar, MapPin, Bus, Users, QrCode, Download } from "lucide-react";
import { Button } from "./ui/button";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

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
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    const generateQR = async () => {
      try {
        const qrData = JSON.stringify({
          tourTitle: booking.tourTitle,
          date: booking.startDate,
          passengers: booking.passengers.length,
        });
        const url = await QRCode.toDataURL(qrData);
        setQrCodeUrl(url);
      } catch (err) {
        console.error("Could not generate QR code", err);
      }
    };
    generateQR();
  }, [booking]);

  const handleDownload = () => {
    const ticketElement = document.querySelector(".ticket-container");
    if (ticketElement) {
      window.print();
    }
  };

  return (
    <Card className="max-w-md mx-auto bg-white shadow-lg animate-scale-in ticket-container">
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
            <Bus size={16} className="text-bharat-orange" />
            <span className="flex items-center gap-2">
              {booking.busType}
              <img 
                src="/placeholder.svg" 
                alt="Vehicle" 
                className="h-8 w-8 object-cover rounded"
              />
            </span>
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
        
        <div className="mt-4 pt-4 border-t flex flex-col items-center gap-4">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            {qrCodeUrl && (
              <img src={qrCodeUrl} alt="Ticket QR Code" className="w-32 h-32" />
            )}
          </div>
          
          <Button 
            onClick={handleDownload}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Download Ticket
          </Button>
          
          <p className="text-sm text-gray-600">Contact: {booking.contact}</p>
          <p className="text-xs text-gray-500">
            Please keep this ticket handy during the journey
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalTicket;
