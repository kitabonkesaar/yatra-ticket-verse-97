
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface VehiclesSearchProps {
  searchTerm: string;
  setSearchTerm: (query: string) => void;
}

export const VehiclesSearch = ({ searchTerm, setSearchTerm }: VehiclesSearchProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search vehicles..."
          className="pl-9 pr-4 w-[280px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};
