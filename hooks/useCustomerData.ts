import { authenticatedRequest } from '@/utils/apiClient';
import { CLIENT_ID, DEFAULT_MERCHANT_ID } from '@/constants/Config';
import { useMerchantStore } from '@/store/merchantStore';
import { supabase } from '@/components/auth/supabase';

interface CustomerData {
  customer: any; // Replace with proper customer type
}

export const useCustomerData = () => {
  const merchantId = useMerchantStore((state) => state.merchantId) || DEFAULT_MERCHANT_ID;

  const fetchCustomerData = async (authUUID: string) => {
    try {
      console.log('Starting fetchCustomerData:', { authUUID, merchantId });
      
      // Check authentication status
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Auth session status:', session ? 'Active' : 'No session');
      
      if (!session) {
        throw new Error('No authenticated session found');
      }

      const data = await authenticatedRequest(
        'get',
        `/api/v1/client/${CLIENT_ID}/merchant/${merchantId}/customers`,
        {
          params: { authUUID }  // Send authUUID as a query parameter
        }
      );
      return { data: data.customer, error: null };
    } catch (error) {
      console.error('Error fetching customer data:', {
        error,
        message: error.message,
        status: error.response?.status,
        responseData: error.response?.data,
      });
      return { data: null, error };
    }
  };

  const updateCustomerMerchant = async (authUUID: string, newMerchantId: string) => {
    try {
      console.log('Updating customer merchant:', authUUID, newMerchantId);
      const data = await authenticatedRequest(
        'put',
        `/api/v1/client/${CLIENT_ID}/merchant/${newMerchantId}/customers/merchant`,
        {
          data: { authUUID }
        }
      );
      return { data: data.customer, error: null };
    } catch (error) {
      console.error('Error updating customer merchant:', error);
      return { data: null, error };
    }
  };

  return { fetchCustomerData, updateCustomerMerchant };
};