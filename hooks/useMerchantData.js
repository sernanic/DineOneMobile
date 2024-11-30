import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useMerchantData = (clientId) => {
    // Using React Query for data fetching and caching
    const { data: merchantData, isLoading, error } = useQuery({
        queryKey: ['merchants', clientId],
        queryFn: async () => {
            const response = await axios.get(`http://127.0.0.1:4000/api/${clientId}/merchants`);
            return response.data;
        },
        // Cache the data for 1 hour
        staleTime: 1000 * 60 * 60,
        // Keep the data in cache for 2 hours
        cacheTime: 1000 * 60 * 60 * 2,
    });

    return {
        merchants: merchantData?.merchants ?? [],
        isLoading,
        error
    };
};

export default useMerchantData;
