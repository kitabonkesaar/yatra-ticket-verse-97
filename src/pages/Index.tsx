import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import TourCard from "@/components/TourCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Car, List, Calendar, MapPin, Users, List as ListIcon, Mountain, Bus, Bed, Calculator } from "lucide-react";

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

// Updated: Vehicle categories with images
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroBanner />

        {/* Vehicle Categories */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Car className="text-bharat-orange" /> Our Vehicles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {vehicleCategories.map((vehicle, idx) => (
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

        {/* Featured Tours - Now more mobile-friendly */}
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

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Bharat Yatra</h2>
              <p className="text-gray-600">
                We specialize in budget-friendly spiritual journeys without compromising on the experience
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bharat-orange/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bharat-orange">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Affordable Prices</h3>
                <p className="text-gray-600">
                  Budget-friendly packages with transparent pricing. No hidden charges.
                </p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bharat-orange/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bharat-orange">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Experienced Guides</h3>
                <p className="text-gray-600">
                  Knowledgeable guides who understand the spiritual significance of each site.
                </p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bharat-orange/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bharat-orange">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Safe Journeys</h3>
                <p className="text-gray-600">
                  Safety is our priority. Well-maintained vehicles and experienced drivers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Travelers Say</h2>
              <p className="text-gray-600">
                Hear from those who have experienced the spiritual journey with us
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-bharat-red/20 flex items-center justify-center text-bharat-red font-bold">
                    SK
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Shyam Kumar</h4>
                    <p className="text-sm text-gray-500">Kedarnath Trip</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Bharat Yatra made my Kedarnath journey so affordable and hassle-free. The ride was comfortable and the guide was knowledgeable."
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-bharat-orange/20 flex items-center justify-center text-bharat-orange font-bold">
                    RA
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Radha Agarwal</h4>
                    <p className="text-sm text-gray-500">Nepal Temple Tour</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Going to Pashupatinath with Bharat Yatra was a blessing. The booking process was simple and the tour was well organized."
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-bharat-purple/20 flex items-center justify-center text-bharat-purple font-bold">
                    VP
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Vijay Patel</h4>
                    <p className="text-sm text-gray-500">Varanasi Retreat</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The Ganga Aarti experience arranged by Bharat Yatra was magical. Excellent service for the price we paid."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
