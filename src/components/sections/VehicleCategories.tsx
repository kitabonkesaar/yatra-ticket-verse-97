
import React from "react";
import { Link } from "react-router-dom";
import { Car, TrendingUp } from "lucide-react";

const vehicleCategories = [
  { 
    icon: <Car className="text-bharat-orange" size={22} />, 
    name: "Bolero", 
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80",
    description: "Perfect for small groups and rough terrain adventures",
    route: "/vehicle/bolero"
  },
  { 
    icon: <Car className="text-bharat-purple" size={22} />, 
    name: "Traveller", 
    image: "https://images.unsplash.com/photo-1545171709-49f212b5a084?auto=format&fit=crop&q=80",
    description: "Comfortable travel for larger groups with extra space",
    route: "/vehicle/traveller"
  },
];

const VehicleCategories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Car className="text-bharat-orange" /> Our Vehicles
          </h2>
          <Link to="/vehicle/bolero" className="text-bharat-orange hover:underline flex items-center">
            View all <TrendingUp className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {vehicleCategories.map((vehicle) => (
            <Link
              key={vehicle.name}
              to={vehicle.route}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video relative">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    {vehicle.icon}
                    <h3 className="text-xl font-bold">{vehicle.name}</h3>
                  </div>
                  <p className="text-sm text-white/90 mb-3">{vehicle.description}</p>
                  <span className="inline-block bg-bharat-orange/90 px-3 py-1 rounded-full text-xs font-medium">
                    View details →
                  </span>
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
