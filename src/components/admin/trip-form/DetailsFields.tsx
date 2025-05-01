
import React from "react";
import { Control } from "react-hook-form";
import { TripPackageFormValues } from "@/schemas/tripPackageSchema";
import StatusField from "./StatusField";
import ImageUrlField from "./ImageUrlField";
import DescriptionField from "./DescriptionField";
import FeaturedField from "./FeaturedField";

interface DetailsFieldsProps {
  control: Control<TripPackageFormValues>;
}

const DetailsFields = ({ control }: DetailsFieldsProps) => {
  return (
    <>
      <StatusField control={control} />
      <ImageUrlField control={control} />
      <DescriptionField control={control} />
      <FeaturedField control={control} />
    </>
  );
};

export default DetailsFields;
