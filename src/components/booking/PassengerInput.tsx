
import React from "react";
import { Input } from "../ui/input";

interface PassengerInputProps {
  name: string;
  age: string;
  aadhaar?: string;
  index: number;
  onChange: (index: number, field: string, value: string) => void;
}

const PassengerInput: React.FC<PassengerInputProps> = ({
  name,
  age,
  aadhaar,
  index,
  onChange,
}) => {
  return (
    <div className="rounded bg-gray-50 p-2 border mb-1 animate-float">
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          value={name}
          onChange={e => onChange(index, "name", e.target.value)}
          placeholder={`Passenger ${index + 1} Name`}
          className="w-1/2"
          required
        />
        <Input
          type="number"
          value={age}
          onChange={e => onChange(index, "age", e.target.value)}
          placeholder="Age"
          min={1}
          className="w-1/4"
          required
        />
        <Input
          type="text"
          value={aadhaar || ""}
          onChange={e => onChange(index, "aadhaar", e.target.value)}
          placeholder="Aadhaar (optional)"
          className="w-1/4"
          maxLength={12}
        />
      </div>
    </div>
  );
};

export default PassengerInput;
