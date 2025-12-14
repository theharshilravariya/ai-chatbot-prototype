import { useQuery } from '@tanstack/react-query';
import { api, mockRecommendation } from '../lib/api';

export const useRecommendation = (marketId) => {
  return useQuery({
    queryKey: ['recommendation', marketId],
    queryFn: async () => {
      try {
        return await api.getRecommendation(marketId);
      } catch (error) {
        console.warn('Using mock data for recommendation');
        return { ...mockRecommendation, marketId };
      }
    },
    enabled: !!marketId,
    staleTime: 300000, // 5 minutes
    refetchInterval: 1800000, // 30 minutes
  });
};
