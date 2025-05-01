
// User interface
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "Customer" | "Admin";
  status: "Active" | "Inactive";
  lastActive?: string;
  image?: string;
}

// Vehicle interface
export interface Vehicle {
  id: number;
  name: string;
  type: "Car" | "Bus" | "Tempo Traveller" | "Other";
  seats: number;
  registrationNumber: string;
  status: "Available" | "Booked" | "Maintenance";
  modelYear: number;
  imageUrl?: string;
  description?: string;
}

// Itinerary item interface
export interface ItineraryItem {
  day: number;
  highlight: string;
  details: string;
}

// Trip Package interface
export interface TripPackage {
  id: number;
  name: string;
  destination: string;
  duration: string;
  price: number;
  status: "Active" | "Inactive";
  startDate?: string;
  endDate?: string;
  description?: string;
  imageUrl?: string;
  featured: boolean;
  itinerary?: ItineraryItem[];
}

// Booking interface
export interface Booking {
  id: number;
  customer: string;
  customerEmail: string;
  customerImage?: string;
  destination: string;
  date: Date;
  passengers: number;
  status: "Confirmed" | "Pending" | "Cancelled";
  total: number;
  paymentType: "Online" | "Cash";
  notes?: string;
}
