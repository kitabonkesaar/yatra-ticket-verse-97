
import React from "react";

const Testimonials = () => {
  return (
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
  );
};

export default Testimonials;
