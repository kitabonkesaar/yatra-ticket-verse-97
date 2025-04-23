
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-bharat-red text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Spiritual Journey?</h2>
          <p className="text-lg mb-8">
            Book your seat today and embark on a transformative experience
          </p>
          <Button size="lg" className="bg-white text-bharat-red hover:bg-white/90" asChild>
            <Link to="/trips">Explore All Trips</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
