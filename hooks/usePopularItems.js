import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, CLIENT_ID, MERCHANT_ID } from '@/constants/Config';

export const usePopularItems = () => {
  const [popularItems, setPopularItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        setIsLoading(true);
        
        const response = await axios.get(`${API_BASE_URL}/api/${CLIENT_ID}/items/popular/${MERCHANT_ID}`);
        
        const { items } = response.data;
        setPopularItems(Array.isArray(items) ? items : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching popular items:', error);
        setError(error.message);
        setPopularItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularItems();
  }, []);

  return { popularItems, isLoading, error };
}; 