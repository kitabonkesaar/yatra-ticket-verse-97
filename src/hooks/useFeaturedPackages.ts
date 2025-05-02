
import { useState, useEffect } from 'react';
import { TripPackage } from '@/types/admin';
import { supabase } from '@/integrations/supabase/client';
import { formatTripPackageFromDB } from '@/services/tripPackageService';

export const useFeaturedPackages = () => {
  const [featuredPackages, setFeaturedPackages] = useState<TripPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedPackages = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('trip_packages')
          .select('*')
          .eq('featured', true)
          .eq('status', 'Active')
          .limit(4);

        if (error) {
          throw error;
        }

        // Use the formatTripPackageFromDB function from tripPackageService
        const formattedPackages: TripPackage[] = data.map((pkg: any) => formatTripPackageFromDB(pkg));

        setFeaturedPackages(formattedPackages);
      } catch (err) {
        console.error("Error fetching featured packages:", err);
        setError('Failed to load featured packages');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPackages();
  }, []);

  return { featuredPackages, loading, error };
};
