
import React from "react";
import { Link } from "react-router-dom";
import { Car } from "lucide-react";

const vehicleCategories = [
  { 
    icon: <Car className="text-bharat-orange" size={22} />, 
    name: "Bolero", 
    image: "/placeholder.svg",
    route: "/vehicle/bolero"
  },
  { 
    icon: <Car className="text-bharat-purple" size={22} />, 
    name: "Traveller", 
    image: "/placeholder.svg",
    route: "/vehicle/traveller"
  },
];

const VehicleCategories = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Car className="text-bharat-orange" /> Our Vehicles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {vehicleCategories.map((vehicle) => (
            <Link
              key={vehicle.name}
              to={vehicle.route}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[16/9] relative">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    {vehicle.icon}
                    <h3 className="text-xl font-bold">{vehicle.name}</h3>
                  </div>
                  <p className="text-sm text-white/80">View details and itinerary →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleCategories;
