import axios from 'axios';
import { MERCHANT_ID, CLIENT_ID } from '@/constants/Config';

export const useCustomerData = () => {
  const fetchCustomerData = async (authUUID: string) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:4000/api/v1/client/${CLIENT_ID}/merchant/${MERCHANT_ID}/customers`,
        {
          params: { authUUID },
          headers: {
            'Accept': 'application/json'
          }
        }
      );
      
      return {
        data: response.data.customer,
        error: null
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          error: error.response?.data?.error || 'An unexpected error occurred'
        };
      }
      return {
        data: null,
        error: 'An unexpected error occurred'
      };
    }
  };

  return { fetchCustomerData };
}; 