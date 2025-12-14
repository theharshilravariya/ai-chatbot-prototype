import { useQuery } from '@tanstack/react-query';
import { api, mockSentiment } from '../lib/api';

export const useSentiment = (marketId) => {
  return useQuery({
    queryKey: ['sentiment', marketId],
    queryFn: async () => {
      try {
        return await api.getSentiment(marketId);
      } catch (error) {
        console.warn('Using mock data for sentiment');
        return { ...mockSentiment, marketId };
      }
    },
    enabled: !!marketId,
    staleTime: 300000, // 5 minutes
    refetchInterval: 3600000, // 1 hour
  });
};

export const useNews = (marketId) => {
  return useQuery({
    queryKey: ['news', marketId],
    queryFn: async () => {
      try {
        return await api.getNews(marketId);
      } catch (error) {
        console.warn('Using mock data for news');
        return [
          {
            id: 1,
            title: 'Bitcoin bounces off support, bulls gain momentum',
            source: 'CryptoNews',
            sentiment: 0.8,
            publishedAt: new Date(Date.now() - 3600000).toISOString(),
            url: '#',
          },
          {
            id: 2,
            title: 'Institutional inflows accelerate crypto adoption',
            source: 'Bloomberg',
            sentiment: 0.6,
            publishedAt: new Date(Date.now() - 7200000).toISOString(),
            url: '#',
          },
          {
            id: 3,
            title: 'Analysts predict BTC rally continues through Q4',
            source: 'Reuters',
            sentiment: 0.7,
            publishedAt: new Date(Date.now() - 10800000).toISOString(),
            url: '#',
          },
        ];
      }
    },
    enabled: !!marketId,
    staleTime: 300000,
    refetchInterval: 3600000,
  });
};
