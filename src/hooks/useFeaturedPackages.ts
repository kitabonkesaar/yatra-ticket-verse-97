
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TripPackage } from '@/types/admin';
import { Json } from '@/integrations/supabase/types';

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

        // Transform the data to match our TripPackage type
        const formattedPackages: TripPackage[] = data.map((pkg: any) => ({
          id: pkg.id,
          name: pkg.name,
          destination: pkg.destination,
          duration: pkg.duration,
          price: pkg.price,
          status: pkg.status as "Active" | "Inactive",
          startDate: pkg.start_date || undefined,
          endDate: pkg.end_date || undefined,
          description: pkg.description || undefined,
          imageUrl: pkg.image_url || undefined,
          featured: pkg.featured,
          itinerary: Array.isArray((pkg.itinerary as Json)) 
            ? (pkg.itinerary as any[]).map(item => ({
                day: item.day,
                highlight: item.highlight,
                details: item.details
              }))
            : []
        }));

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
