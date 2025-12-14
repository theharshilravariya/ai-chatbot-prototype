import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api, mockMarkets } from '../lib/api';
import { useMarketStore } from '../store/marketStore';
import { useEffect } from 'react';

export const useMarkets = (options = {}) => {
  const setMarkets = useMarketStore((state) => state.setMarkets);
  
  const query = useQuery({
    queryKey: ['markets', options],
    queryFn: async () => {
      try {
        return await api.getMarkets(options);
      } catch (error) {
        // Fallback to mock data if backend not available
        console.warn('Using mock data for markets');
        return mockMarkets;
      }
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  });

  useEffect(() => {
    if (query.data) {
      setMarkets(query.data);
    }
  }, [query.data, setMarkets]);

  return query;
};

export const useMarket = (id) => {
  const setSelectedMarket = useMarketStore((state) => state.setSelectedMarket);
  
  const query = useQuery({
    queryKey: ['market', id],
    queryFn: async () => {
      try {
        return await api.getMarket(id);
      } catch (error) {
        console.warn('Using mock data for market');
        return mockMarkets.find((m) => m.id === id);
      }
    },
    enabled: !!id,
    staleTime: 30000,
  });

  useEffect(() => {
    if (query.data) {
      setSelectedMarket(query.data);
    }
  }, [query.data, setSelectedMarket]);

  return query;
};

export const useTrendingMarkets = () => {
  return useQuery({
    queryKey: ['markets', 'trending'],
    queryFn: async () => {
      try {
        return await api.getTrendingMarkets();
      } catch (error) {
        console.warn('Using mock data for trending markets');
        return mockMarkets.slice(0, 3);
      }
    },
    staleTime: 60000,
  });
};

export const useMarketHistory = (id, range = '24h') => {
  return useQuery({
    queryKey: ['market', id, 'history', range],
    queryFn: async () => {
      try {
        return await api.getMarketHistory(id, range);
      } catch (error) {
        console.warn('Using mock data for market history');
        // Generate mock historical data
        const now = Date.now();
        const interval = range === '1h' ? 60000 : range === '24h' ? 3600000 : 86400000;
        const points = range === '1h' ? 60 : range === '24h' ? 24 : 30;
        
        return Array.from({ length: points }, (_, i) => ({
          timestamp: new Date(now - (points - i) * interval).toISOString(),
          yesPrice: 0.6 + Math.random() * 0.1 - 0.05,
          noPrice: 0.4 + Math.random() * 0.1 - 0.05,
          volume: Math.floor(Math.random() * 10000) + 5000,
        }));
      }
    },
    enabled: !!id,
    staleTime: 60000,
  });
};

export const useOrderBook = (id) => {
  return useQuery({
    queryKey: ['market', id, 'orderbook'],
    queryFn: async () => {
      try {
        return await api.getOrderBook(id);
      } catch (error) {
        console.warn('Using mock data for order book');
        return {
          bids: [
            { price: 0.65, size: 1500 },
            { price: 0.64, size: 2300 },
            { price: 0.63, size: 1800 },
            { price: 0.62, size: 3200 },
            { price: 0.61, size: 2700 },
          ],
          asks: [
            { price: 0.66, size: 1200 },
            { price: 0.67, size: 2100 },
            { price: 0.68, size: 1600 },
            { price: 0.69, size: 2900 },
            { price: 0.70, size: 2400 },
          ],
        };
      }
    },
    enabled: !!id,
    staleTime: 15000,
    refetchInterval: 30000,
  });
};
