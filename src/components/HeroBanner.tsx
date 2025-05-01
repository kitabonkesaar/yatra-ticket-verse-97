import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
const HeroBanner = () => {
  return <div className="relative bg-gray-900 text-white">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80" alt="Spiritual journey across India" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>
      
      {/* Hero Content */}
      <div className="relative container-custom py-20 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Sacred India with <span className="text-bharat-orange">Bharat Yatra</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Affordable pilgrimage journeys to the most sacred sites across India. 
            Experience spiritual awakening without breaking the bank.
          </p>
          <div className="space-x-4">
            <Button size="lg" className="bg-bharat-orange hover:bg-bharat-orange/90" asChild>
              <Link to="/trips">Explore Tours</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default HeroBanner;