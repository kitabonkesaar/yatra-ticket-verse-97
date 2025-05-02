
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
import { useFeaturedPackages } from "@/hooks/useFeaturedPackages";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { featuredPackages, loading, error } = useFeaturedPackages();

  // Fallback tour data in case we need to display something when there are no featured packages
  const fallbackTour = {
    id: "fallback",
    title: "Spiritual Journey",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80",
    price: 9999,
    advanceAmount: 2000,
    busType: "Sleeper Bus",
    duration: 4,
    startDate: "2025-07-15",
  };

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
                {error && <p className="text-red-500 text-sm mt-1">Error loading featured packages</p>}
              </div>
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link to="/trips">View All Tours</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {loading ? (
                // Display loading skeletons
                Array(4).fill(0).map((_, index) => (
                  <div key={`skeleton-${index}`} className="rounded-lg overflow-hidden">
                    <Skeleton className="h-48 w-full mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))
              ) : featuredPackages.length > 0 ? (
                // Display real data from Supabase
                featuredPackages.map((tour) => (
                  <TourCard 
                    key={tour.id}
                    id={tour.id}
                    title={tour.name}
                    image={tour.imageUrl || "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80"}
                    price={Number(tour.price)}
                    advanceAmount={2000}
                    busType="Sleeper Bus"
                    duration={Number(tour.duration.split(' ')[0]) || 5}
                    startDate={tour.startDate || "2025-05-15"}
                    ex={tour.destination.split(',')[0] || "Haridwar"}
                  />
                ))
              ) : (
                // Fallback for when there are no featured packages
                <div className="col-span-full flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
                  <p className="text-gray-600 mb-4 text-center">No featured tours are currently available.</p>
                  <Button asChild>
                    <Link to="/admin/trip-packages">Add Tour Packages</Link>
                  </Button>
                </div>
              )}
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
