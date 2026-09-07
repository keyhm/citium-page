import { useQuery } from '@tanstack/react-query';
import { propertyService } from '@/services/property.service';

/**
 * Hook to fetch paginated properties
 */
export const useProperties = (filters?: any) => {
    return useQuery({
        queryKey: ['properties', filters],
        queryFn: () => propertyService.getProperties(filters),
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
};

/**
 * Hook to fetch a single property details
 */
export const usePropertyDetails = (id: string) => {
    return useQuery({
        queryKey: ['property', id],
        queryFn: () => propertyService.getPropertyById(id),
        enabled: !!id, // Only fetch if ID is provided
        staleTime: 1000 * 60 * 10, // 10 minutes cache for details
    });
};

/**
 * Hook to fetch featured properties for the homepage
 */
export const useFeaturedProperties = () => {

    return useQuery({

        queryKey:['properties','featured'],

        queryFn: () =>
            propertyService.getFeaturedProperties(),

        staleTime:1000*60*60,

        gcTime:1000*60*60*2,

        retry:3,

        retryDelay:(attempt)=>
            Math.min(
                1000 * 2 ** attempt,
                8000
            ),

        refetchOnReconnect:true,

        refetchOnWindowFocus:false

    });
};

/**
 * Hook to fetch similar properties
 */
export const useSimilarProperties = (currentId: string) => {
    return useQuery({
        queryKey: ['properties', 'similar', currentId],
        queryFn: () => propertyService.getSimilarProperties(currentId),
        enabled: !!currentId,
        staleTime: 1000 * 60 * 10,
    });
};
