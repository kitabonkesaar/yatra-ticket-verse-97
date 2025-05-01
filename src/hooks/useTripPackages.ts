
import { useState } from "react";
import { TripPackage } from "@/types/admin";
import { toast } from "@/hooks/use-toast";

// Mock data for trip packages - in a real app, this would come from your backend
const mockTripPackages: TripPackage[] = [
  {
    id: 1,
    name: "Golden Triangle Tour",
    destination: "Delhi-Agra-Jaipur",
    duration: "6 days 5 nights",
    price: 25000,
    status: "Active",
    startDate: "2025-06-15",
    endDate: "2025-06-20",
    description: "Experience the rich culture and heritage of India's most famous cities",
    imageUrl: "https://example.com/golden-triangle.jpg",
    featured: true,
    itinerary: [
      {
        day: 1,
        highlight: "Arrival in Delhi",
        details: "Arrive at Delhi airport, transfer to hotel. Evening visit to local markets."
      },
      {
        day: 2,
        highlight: "Delhi City Tour",
        details: "Full day sightseeing of Old and New Delhi including Red Fort, Jama Masjid, and Qutub Minar."
      },
      {
        day: 3,
        highlight: "Delhi to Agra",
        details: "Morning drive to Agra. Afternoon visit to Taj Mahal and Agra Fort."
      }
    ]
  },
  {
    id: 2,
    name: "Kashmir Valley",
    destination: "Srinagar-Gulmarg-Pahalgam",
    duration: "5 days 4 nights",
    price: 30000,
    status: "Active",
    description: "Explore the paradise on earth with beautiful landscapes and serene lakes",
    imageUrl: "https://example.com/kashmir.jpg",
    featured: true,
    itinerary: [
      {
        day: 1,
        highlight: "Arrival in Srinagar",
        details: "Arrive at Srinagar airport, transfer to houseboat. Evening Shikara ride on Dal Lake."
      },
      {
        day: 2,
        highlight: "Gulmarg Excursion",
        details: "Full day trip to Gulmarg. Enjoy gondola ride and panoramic views."
      }
    ]
  },
  {
    id: 3,
    name: "Kerala Backwaters",
    destination: "Kochi-Alleppey-Kovalam",
    duration: "7 days 6 nights",
    price: 35000,
    status: "Inactive",
    description: "Relax in the serene backwaters and beautiful beaches of God's own country",
    imageUrl: "https://example.com/kerala.jpg",
    featured: false,
    itinerary: []
  },
];

export const useTripPackages = () => {
  const [tripPackages, setTripPackages] = useState<TripPackage[]>(mockTripPackages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<TripPackage | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewItineraryDialogOpen, setViewItineraryDialogOpen] = useState(false);

  const filteredPackages = tripPackages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPackage = () => {
    setIsEditing(false);
    setSelectedPackage(null);
    setDialogOpen(true);
  };

  const handleEditPackage = (tripPackage: TripPackage) => {
    setIsEditing(true);
    setSelectedPackage(tripPackage);
    setDialogOpen(true);
  };

  const handleDeletePackage = (tripPackage: TripPackage) => {
    setSelectedPackage(tripPackage);
    setDeleteDialogOpen(true);
  };

  const viewItinerary = (tripPackage: TripPackage) => {
    setSelectedPackage(tripPackage);
    setViewItineraryDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPackage) {
      setTripPackages(tripPackages.filter(pkg => pkg.id !== selectedPackage.id));
      toast({
        title: "Trip package deleted",
        description: `${selectedPackage.name} has been removed.`,
      });
      setDeleteDialogOpen(false);
    }
  };

  const handleSubmit = (values: Omit<TripPackage, "id">) => {
    if (isEditing && selectedPackage) {
      setTripPackages(tripPackages.map(pkg => 
        pkg.id === selectedPackage.id ? { ...values, id: selectedPackage.id } : pkg
      ));
      toast({
        title: "Trip package updated",
        description: `${values.name} has been updated.`,
      });
    } else {
      const newId = Math.max(0, ...tripPackages.map(pkg => pkg.id)) + 1;
      setTripPackages([...tripPackages, { ...values, id: newId }]);
      toast({
        title: "Trip package added",
        description: `${values.name} has been added to the offerings.`,
      });
    }
  };

  return {
    tripPackages,
    filteredPackages,
    searchTerm,
    setSearchTerm,
    selectedPackage,
    isEditing,
    dialogOpen,
    setDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    viewItineraryDialogOpen,
    setViewItineraryDialogOpen,
    handleAddPackage,
    handleEditPackage,
    handleDeletePackage,
    viewItinerary,
    confirmDelete,
    handleSubmit
  };
};
