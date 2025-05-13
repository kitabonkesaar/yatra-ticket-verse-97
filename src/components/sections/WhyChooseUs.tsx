import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Mo Yatra</h2>
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
  );
};

export default WhyChooseUs;
