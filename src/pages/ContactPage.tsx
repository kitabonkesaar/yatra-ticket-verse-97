
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      subject: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you shortly.");
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gray-900 text-white">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?auto=format&fit=crop&q=80"
              alt="Contact Us"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          </div>
          <div className="relative container-custom py-16 md:py-24">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact <span className="text-bharat-orange">Bharat Yatra</span>
              </h1>
              <p className="text-lg text-gray-200 mb-8">
                Get in touch with our team for inquiries, bookings, or any assistance you need
                with your spiritual journey.
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info Card */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold mb-6">Reach Out To Us</h2>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="rounded-full bg-bharat-orange/10 p-3 mt-1">
                        <Phone className="h-5 w-5 text-bharat-orange" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Phone</h3>
                        <p className="text-gray-600 mt-1">+91 98765 43210</p>
                        <p className="text-gray-600">+91 89765 12340</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="rounded-full bg-bharat-orange/10 p-3 mt-1">
                        <Mail className="h-5 w-5 text-bharat-orange" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Email</h3>
                        <p className="text-gray-600 mt-1">info@bharatyatra.com</p>
                        <p className="text-gray-600">bookings@bharatyatra.com</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="rounded-full bg-bharat-orange/10 p-3 mt-1">
                        <MapPin className="h-5 w-5 text-bharat-orange" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Address</h3>
                        <p className="text-gray-600 mt-1">
                          123 Pilgrim Road, Karol Bagh,<br />
                          New Delhi, 110005, India
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="rounded-full bg-bharat-orange/10 p-3 mt-1">
                        <Clock className="h-5 w-5 text-bharat-orange" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Office Hours</h3>
                        <p className="text-gray-600 mt-1">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                        <p className="text-gray-600">Sunday: 10:00 AM - 2:00 PM</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your email address"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Your phone number"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Select value={formData.subject} onValueChange={handleSelectChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="booking">Booking Question</SelectItem>
                              <SelectItem value="support">Customer Support</SelectItem>
                              <SelectItem value="partnership">Business Partnership</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          rows={5}
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-bharat-orange hover:bg-bharat-orange/90"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="flex items-center">Sending message...</span>
                        ) : (
                          <span className="flex items-center">
                            Send Message <Send className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Map */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Our Location</h3>
                  <div className="h-[300px] bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.693298517787!2d77.1830160748932!3d28.642911982120222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d02a257b3ad95%3A0x9afd3e6013cd6cf8!2sKarol%20Bagh%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1682315825222!5m2!1sen!2sin"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Bharat Yatra Office Location"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQs Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">How do I book a tour?</h3>
                <p className="text-gray-700">
                  You can book a tour through our website by selecting your preferred journey and filling out the booking form. Alternatively, you can contact our team directly by phone or email.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">What is your cancellation policy?</h3>
                <p className="text-gray-700">
                  For cancellations made more than 7 days before departure, a full refund is provided. For cancellations within 7 days, a 50% refund is offered. No refunds for cancellations within 48 hours of departure.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Are meals included in the tour price?</h3>
                <p className="text-gray-700">
                  Meals are typically not included in our tour prices to keep costs low and allow you flexibility. You'll find many affordable food options at all our destinations.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">How many people are usually in a tour group?</h3>
                <p className="text-gray-700">
                  Our tour groups typically range from 10 to 20 people, depending on the destination and vehicle type. This allows for a personal experience while keeping costs affordable.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;
