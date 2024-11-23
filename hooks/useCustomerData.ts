import { MERCHANT_ID, CLIENT_ID } from '@/constants/Config';
import { authenticatedRequest } from '@/utils/apiClient';

interface CustomerData {
  customer: any; // Replace with proper customer type
}

export const useCustomerData = () => {
  const fetchCustomerData = async () => {
    try {
      const data = await authenticatedRequest<CustomerData>(
        'get',
        `/api/v1/client/${CLIENT_ID}/merchant/${MERCHANT_ID}/customers`
      );
      
      return {
        data: data.customer,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      };
    }
  };

  return { fetchCustomerData };
};