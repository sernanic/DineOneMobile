import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL, CLIENT_ID, DEFAULT_MERCHANT_ID } from '@/constants/Config';
import { useMerchantStore } from '@/store/merchantStore';

export const usePopularItems = () => {
  const merchantId = useMerchantStore((state) => state.merchantId) || DEFAULT_MERCHANT_ID;

  const { data: popularItems = [], isLoading, error } = useQuery({
    queryKey: ['popularItems', merchantId],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/api/${CLIENT_ID}/items/popular/${merchantId}`);
      const { items } = response.data;
      return Array.isArray(items) ? items : [];
    },
    // Cache the data for 1 hour
    staleTime: 1000 * 60 * 60,
    // Keep the data in cache for 2 hours
    cacheTime: 1000 * 60 * 60 * 2,
  });

  return { popularItems, isLoading, error: error?.message };
};