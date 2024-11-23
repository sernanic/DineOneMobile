import axios, { AxiosRequestConfig } from 'axios';
import { supabase } from '@/components/auth/supabase';
import { API_BASE_URL } from '@/constants/Config';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Type for the request options
interface RequestOptions extends Omit<AxiosRequestConfig, 'headers'> {
  headers?: Record<string, string>;
}

export const authenticatedRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No authenticated session');
    }

    const { headers = {}, ...restOptions } = options;

    const response = await apiClient.request<T>({
      method,
      url: endpoint,
      headers: {
        ...headers,
        'Authorization': `Bearer ${session.access_token}`,
      },
      ...restOptions,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw error;
  }
};
