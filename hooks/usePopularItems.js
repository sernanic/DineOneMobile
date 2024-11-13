import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL, CLIENT_ID, MERCHANT_ID } from '@/constants/Config';

export const usePopularItems = () => {
  const { data: popularItems = [], isLoading, error } = useQuery({
    queryKey: ['popularItems'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/api/${CLIENT_ID}/items/popular/${MERCHANT_ID}`);
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