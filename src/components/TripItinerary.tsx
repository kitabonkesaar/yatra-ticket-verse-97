
import React from "react";
import { Calendar, MapPin } from "lucide-react";

interface ItineraryItem {
  day: number;
  highlight: string;
  details: string;
}

const TripItinerary: React.FC<{ itinerary: ItineraryItem[] }> = ({ itinerary }) => (
  <div>
    <h4 className="mb-2 text-xl font-bold text-bharat-red flex items-center gap-2 animate-fade-in">
      <Calendar size={20} className="text-bharat-red" /> Trip Itinerary
    </h4>
    <ol className="border-l-4 border-bharat-orange pl-4 space-y-5 animate-fade-in">
      {itinerary.map((item, idx) => (
        <li
          key={item.day}
          className="relative group"
          style={{ animationDelay: `${(idx + 1) * 60}ms`, animationName: "fade-in" }}
        >
          <div className="absolute -left-7 top-1">
            <MapPin size={20} className="text-bharat-orange animate-float group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col gap-1 pl-2">
            <span className="font-bold text-lg text-bharat-orange group-hover:text-bharat-red transition-colors">Day {item.day}: {item.highlight}</span>
            <span className="text-sm text-gray-700">{item.details}</span>
          </div>
        </li>
      ))}
    </ol>
  </div>
);

export default TripItinerary;
