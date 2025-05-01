
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { ItineraryItem } from "@/types/admin";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ItineraryFormFieldProps {
  value: ItineraryItem[];
  onChange: (value: ItineraryItem[]) => void;
}

const ItineraryFormField = ({ value, onChange }: ItineraryFormFieldProps) => {
  const addItineraryItem = () => {
    const nextDay = value.length > 0 ? Math.max(...value.map(item => item.day)) + 1 : 1;
    onChange([
      ...value,
      { day: nextDay, highlight: "", details: "" }
    ]);
  };

  const removeItineraryItem = (index: number) => {
    const newItems = [...value];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const updateItineraryItem = (index: number, field: keyof ItineraryItem, newValue: string | number) => {
    const newItems = [...value];
    newItems[index] = { ...newItems[index], [field]: newValue };
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Trip Itinerary</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={addItineraryItem}
          className="h-8"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Add Day
        </Button>
      </div>

      {value.length === 0 && (
        <div className="text-center py-4 text-sm text-gray-500 border border-dashed rounded-md">
          No itinerary items yet. Click 'Add Day' to create your trip schedule.
        </div>
      )}

      {value.map((item, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-3 relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 absolute top-3 right-3 text-gray-400 hover:text-red-500"
            onClick={() => removeItineraryItem(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-20">
              <label className="text-sm font-medium">Day</label>
              <Input 
                type="number"
                min="1" 
                value={item.day}
                onChange={(e) => updateItineraryItem(index, 'day', parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Highlight</label>
              <Input 
                value={item.highlight}
                onChange={(e) => updateItineraryItem(index, 'highlight', e.target.value)}
                placeholder="Main activity or location"
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Details</label>
            <Textarea
              value={item.details}
              onChange={(e) => updateItineraryItem(index, 'details', e.target.value)}
              placeholder="Describe the day's activities, places to visit, meals, etc."
              rows={2}
              className="mt-1"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryFormField;
