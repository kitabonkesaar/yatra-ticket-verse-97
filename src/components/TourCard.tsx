
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface TourCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  advanceAmount: number;
  busType: string;
  duration: number;
  startDate: string;
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
}) => {
  return (
    <Link to={`/trip/${id}`}>
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
            <span className="text-sm font-medium text-bharat-orange">View Details</span>
            <span className="text-sm font-medium">Book Now →</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TourCard;
