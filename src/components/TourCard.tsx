
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import BookingModal from "./BookingModal";

interface TourCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  advanceAmount: number;
  busType: string;
  duration: number;
  startDate: string;
  // Optionally allow ex field (route origin)
  ex?: string;
}

const TourCard: React.FC<TourCardProps> = ({
  id,
  title,
  image,
  price,
  advanceAmount,
  busType,
  duration,
  startDate,
  ex = "Haridwar", // Default to Haridwar if not provided
}) => {
  const [showModal, setShowModal] = useState(false);

  // Animation: scale in when rendered, hover shadow/lift
  return (
    <>
      <div className="animate-scale-in hover:shadow-lg transition-transform duration-200 hover:-translate-y-1">
        <Card className="overflow-hidden card-hover h-full">
          <div className="relative h-48">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <Badge className="bg-bharat-orange hover:bg-bharat-orange">{busType}</Badge>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <h3 className="text-white font-bold text-lg line-clamp-1">{title}</h3>
              {/* Ex / Route origin */}
              <span className="text-bharat-orange text-xs block font-semibold mt-1">Ex - {ex}</span>
            </div>
          </div>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold text-lg">₹{price.toLocaleString('en-IN')}</p>
                <p className="text-sm text-gray-500">Advance: ₹{advanceAmount.toLocaleString('en-IN')}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{duration} days</p>
                <p className="text-sm text-gray-500">Starts {new Date(startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
              </div>
            </div>
            <div className="mt-2">
              <span className="disclaimer">Meals & Stay not included – pay on site</span>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 py-3">
            <div className="w-full flex justify-between items-center">
              <Link to={`/trip/${id}`} className="text-sm font-medium text-bharat-orange story-link">View Details</Link>
              <Button 
                size="sm"
                className="bg-bharat-orange hover:bg-bharat-orange/90 text-white animate-pulse" 
                onClick={e => {
                  e.preventDefault();
                  setShowModal(true);
                }}
              >
                Book Now →
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      {/* Modal for booking */}
      {showModal && (
        <BookingModal
          open={showModal}
          onClose={() => setShowModal(false)}
          tourTitle={title}
          ex={ex}
          price={price}
          advanceAmount={advanceAmount}
          startDate={startDate}
        />
      )}
    </>
  );
};

export default TourCard;

