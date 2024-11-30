import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL, CLIENT_ID, DEFAULT_MERCHANT_ID } from '@/constants/Config';
import { useMerchantStore } from '@/store/merchantStore';
import { RewardItem } from '@/types/rewards';

export const useRewards = () => {
  const merchantId = useMerchantStore((state) => state.merchantId) || DEFAULT_MERCHANT_ID;

  const { data: rewards = [], isLoading, error } = useQuery({
    queryKey: ['rewards', merchantId],
    queryFn: async () => {
      const response = await axios.get(
        `${API_BASE_URL}/api/client/${CLIENT_ID}/rewards/${merchantId}`
      );
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch rewards');
      }

      // Transform the rewards data to match the RewardCard component's expected format
      return response.data.data.rewards.map((reward: any) => ({
        id: reward.id,
        title: reward.rewardName,
        points: reward.pointsRequired,
        description: reward.description,
        imgsrc: reward.imageURL,
        associatedItemId: reward.associatedItemId,
      }));
    },
    // Cache the data for 1 hour
    staleTime: 1000 * 60 * 60,
    // Keep the data in cache for 2 hours
    cacheTime: 1000 * 60 * 60 * 2,
  });

  return { rewards, isLoading, error: error?.message };
};
