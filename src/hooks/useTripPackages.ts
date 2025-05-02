
import { useEffect } from "react";
import { useTripPackageState } from "./useTripPackageState";
import { useTripPackageActions } from "./useTripPackageActions";

export const useTripPackages = () => {
  const state = useTripPackageState();
  const actions = useTripPackageActions(state);

  // Fetch trip packages on mount
  useEffect(() => {
    actions.fetchTripPackages();
  }, []);

  return {
    ...state,
    ...actions
  };
};
