import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMerchantStore } from '../store/merchantStore';
import {DEFAULT_MERCHANT_ID} from '../constants/Config';

/**
 * Custom hook to fetch and manage feature data
 * Uses React Query for data fetching, caching, and state management
 * 
 * @returns {Object} Object containing:
 * - features: Array of feature objects
 * - isLoading: Boolean indicating if data is being fetched
 * - error: Any error that occurred during fetch
 */
const useFeatures = () => {
    // Get merchantId from store or use default
    const merchantId = useMerchantStore((state) => state.merchantId) || DEFAULT_MERCHANT_ID;

    // Fetch features data using React Query
    const { data: featuresData, isLoading, error } = useQuery({
        queryKey: ['features', merchantId],
        queryFn: async () => {
            const response = await axios.get(`http://127.0.0.1:4000/api/client/10/features/${merchantId}`);
            return response.data.data.features;
        },
        // Cache configuration
        staleTime: 1000 * 60 * 60, // Cache valid for 1 hour
        cacheTime: 1000 * 60 * 60 * 2, // Keep in cache for 2 hours
    });

    return {
        features: featuresData || [],
        isLoading,
        error
    };
};

export default useFeatures;
