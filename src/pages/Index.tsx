import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import TourCard from "@/components/TourCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import VehicleCategories from "@/components/sections/VehicleCategories";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";

// Mock data for featured tours
const featuredTours = [
  {
    id: "1",
    title: "Kedarnath Spiritual Journey",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80",
    price: 12999,
    advanceAmount: 2000,
    busType: "Sleeper Bus",
    duration: 5,
    startDate: "2025-05-15",
  },
  {
    id: "2",
    title: "Badrinath Divine Pilgrimage",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80",
    price: 14999,
    advanceAmount: 2000,
    busType: "Traveller",
    duration: 7,
    startDate: "2025-05-20",
  },
  {
    id: "3",
    title: "Nepal Temple Tour",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80",
    price: 18999,
    advanceAmount: 2000,
    busType: "Bolero",
    duration: 8,
    startDate: "2025-06-10",
  },
  {
    id: "4",
    title: "Varanasi Spiritual Retreat",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80",
    price: 10999,
    advanceAmount: 2000,
    busType: "Sleeper Bus",
    duration: 4,
    startDate: "2025-06-05",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroBanner />
        <VehicleCategories />
        
        {/* Featured Tours Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Featured Tours</h2>
                <p className="text-gray-600">Discover our most popular pilgrimage journeys</p>
              </div>
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link to="/trips">View All Tours</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {featuredTours.map((tour) => (
                <TourCard key={tour.id} {...tour} />
              ))}
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
