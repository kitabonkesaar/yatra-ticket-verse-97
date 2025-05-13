import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTASection from "@/components/sections/CTASection";
import { MapPin, Calendar, Shield, Users, Smile, Clock } from "lucide-react";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Aditya Sharma",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80",
      bio: "With over 15 years of experience organizing spiritual journeys across India."
    },
    {
      name: "Priya Patel",
      role: "Tour Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      bio: "Expert in crafting mindful travel experiences and managing client relations."
    },
    {
      name: "Rahul Singh",
      role: "Spiritual Guide",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      bio: "Deeply knowledgeable about India's spiritual traditions and sacred sites."
    }
  ];

  const milestones = [
    { year: 2015, event: "Mo Yatra founded with just 2 routes" },
    { year: 2018, event: "Expanded to 10+ spiritual destinations" },
    { year: 2020, event: "Launched online booking platform" },
    { year: 2022, event: "Reached 10,000 satisfied travelers" },
    { year: 2024, event: "Introducing new premium tour packages" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gray-900 text-white">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?auto=format&fit=crop&q=80"
              alt="Spiritual journey"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
          </div>
          <div className="relative container-custom py-20 md:py-28">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="text-bharat-orange">Mo Yatra</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                We are dedicated to making spiritual journeys accessible to all. Our mission is to connect people with
                the sacred sites of India through affordable, well-organized tours that honor
                the spiritual significance of each destination.
              </p>
            </div>
          </div>
        </div>

        {/* Our Vision Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-gray-700">
                To be the most trusted name in spiritual tourism, making the sacred sites of India
                accessible to all seekers, regardless of their budget constraints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
                <div className="rounded-full bg-bharat-orange/10 p-4 mb-4 w-16 h-16 flex items-center justify-center">
                  <MapPin className="text-bharat-orange h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sacred Destinations</h3>
                <p className="text-gray-700">
                  We carefully select spiritual destinations that hold deep significance in
                  Indian culture and religion.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: "100ms" }}>
                <div className="rounded-full bg-bharat-red/10 p-4 mb-4 w-16 h-16 flex items-center justify-center">
                  <Calendar className="text-bharat-red h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">Meaningful Journeys</h3>
                <p className="text-gray-700">
                  Our tours are designed to provide not just travel but a transformative 
                  spiritual experience.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="rounded-full bg-bharat-purple/10 p-4 mb-4 w-16 h-16 flex items-center justify-center">
                  <Shield className="text-bharat-purple h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">Safety First</h3>
                <p className="text-gray-700">
                  Your safety is paramount. We ensure all vehicles and accommodations meet strict 
                  safety standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Mo Yatra began in 2015 with a simple idea: make spiritual journeys affordable without compromising the experience. 
                  Our founder, Aditya Sharma, realized many people wanted to visit sacred sites but were deterred by high costs.
                </p>
                <p className="text-gray-700 mb-6">
                  Starting with just two routes - Haridwar to Kedarnath and Delhi to Varanasi - we've grown to offer over 20 different
                  spiritual journeys across India. Our commitment to affordability, safety, and spiritual authenticity has earned us
                  the trust of thousands of pilgrims.
                </p>

                <h3 className="font-bold text-xl mb-3">Our Milestones</h3>
                <ul className="space-y-2">
                  {milestones.map((milestone, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="bg-bharat-orange text-white text-xs px-2 py-1 rounded-full mt-1">
                        {milestone.year}
                      </span>
                      <span className="text-gray-700">{milestone.event}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1515091943-9d5c0ad475af?auto=format&fit=crop&q=80"
                  alt="Our journey"
                  className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-medium text-lg">
                    "Our journey is about connecting souls to the spiritual heart of India"
                  </p>
                  <p className="text-sm mt-2">- Aditya Sharma, Founder</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow duration-300">
                <Users className="h-10 w-10 text-bharat-orange mb-4" />
                <h3 className="text-xl font-bold mb-2">Inclusivity</h3>
                <p className="text-gray-600">
                  We believe spiritual journeys should be accessible to everyone, regardless of their budget.
                </p>
              </div>

              <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow duration-300">
                <Smile className="h-10 w-10 text-bharat-orange mb-4" />
                <h3 className="text-xl font-bold mb-2">Authenticity</h3>
                <p className="text-gray-600">
                  We preserve the true spiritual essence of each destination without commercial distractions.
                </p>
              </div>

              <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow duration-300">
                <Clock className="h-10 w-10 text-bharat-orange mb-4" />
                <h3 className="text-xl font-bold mb-2">Reliability</h3>
                <p className="text-gray-600">
                  Our schedules are carefully planned and adhered to, respecting your time and journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AboutPage;
