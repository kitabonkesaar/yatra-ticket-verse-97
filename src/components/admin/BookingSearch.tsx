
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BookingSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const BookingSearch = ({ searchQuery, setSearchQuery }: BookingSearchProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search bookings..."
          className="pl-9 pr-4 w-[280px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button variant="outline" size="icon">
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};
