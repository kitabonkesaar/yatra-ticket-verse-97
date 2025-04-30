
import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Shyam Kumar",
    trip: "Kedarnath Trip",
    image: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80",
    rating: 5,
    text: "Bharat Yatra made my Kedarnath journey so affordable and hassle-free. The ride was comfortable and the guide was knowledgeable about all the spiritual aspects of each location."
  },
  {
    name: "Radha Agarwal",
    trip: "Nepal Temple Tour",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    rating: 5,
    text: "Going to Pashupatinath with Bharat Yatra was a blessing. The booking process was simple and the tour was well organized. I'll definitely book with them again for my next spiritual journey."
  },
  {
    name: "Vijay Patel",
    trip: "Varanasi Retreat",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    rating: 4,
    text: "The Ganga Aarti experience arranged by Bharat Yatra was magical. Excellent service for the price we paid. The spiritual atmosphere was perfectly preserved."
  }
];

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
          {testimonials.map((testimonial, idx) => (
            <div 
              key={testimonial.name} 
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300 relative overflow-hidden animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="absolute top-0 right-0 text-bharat-orange/10 pointer-events-none">
                <Quote size={80} />
              </div>
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.trip}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i + testimonial.rating} className="h-4 w-4 text-gray-300" />
                ))}
              </div>
              <p className="text-gray-600">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
