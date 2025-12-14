import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export const useTechnicalIndicators = (marketId) => {
  return useQuery({
    queryKey: ['indicators', marketId],
    queryFn: async () => {
      try {
        return await api.getIndicators(marketId);
      } catch (error) {
        console.warn('Using mock data for technical indicators');
        return {
          rsi: 62.5,
          macd: {
            value: 0.025,
            signal: 0.018,
            histogram: 0.007,
          },
          movingAverages: {
            ma20: 0.63,
            ma50: 0.61,
            ma200: 0.58,
          },
          volatility: 0.45,
          volume24h: 1250000,
          volumeChange: 0.15,
          support: 0.60,
          resistance: 0.70,
          trend: 'bullish',
        };
      }
    },
    enabled: !!marketId,
    staleTime: 300000, // 5 minutes
    refetchInterval: 900000, // 15 minutes
  });
};
