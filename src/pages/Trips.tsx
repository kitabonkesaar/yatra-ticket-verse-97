import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourCard from "@/components/TourCard";

// Mock tour packages (replace with real data/fetch in production)
const tourPackages = [
  {
    id: "1",
    title: "Kedarnath Budget Tour",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    price: 5999,
    advanceAmount: 2000,
    busType: "Traveller",
    duration: 4,
    startDate: "2025-06-04",
    ex: "Haridwar"
  },
  {
    id: "2",
    title: "Badrinath Yatra",
    image: "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=600&q=80",
    price: 6999,
    advanceAmount: 2500,
    busType: "Traveller",
    duration: 5,
    startDate: "2025-06-10",
    ex: "Haridwar"
  },
  // Add more packages as needed
];

const Trips = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container-custom py-10">
        <h1 className="text-4xl font-extrabold mb-10 text-bharat-orange text-center drop-shadow-sm tracking-tight">Tour Packages</h1>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourPackages.map(pkg => (
              <div key={pkg.id} className="rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-200">
                <TourCard {...pkg} image={pkg.image} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trips; 