import { useEffect, useRef, useState } from 'react';
import { useMarketStore } from '../store/marketStore';
import { WS_URL } from '../lib/constants';

export const useWebSocket = (endpoint = '/markets') => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const wsRef = useRef(null);
  const updateMarketPrice = useMarketStore((state) => state.updateMarketPrice);

  useEffect(() => {
    // Connect to WebSocket
    const ws = new WebSocket(`${WS_URL}${endpoint}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLastMessage(data);

        // Update market prices in store
        if (data.type === 'price_update' && data.marketId) {
          updateMarketPrice(data.marketId, data.yesPrice, data.noPrice);
        }
      } catch (error) {
        console.error('WebSocket message parse error:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    // Cleanup
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [endpoint, updateMarketPrice]);

  const sendMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  return { isConnected, lastMessage, sendMessage };
};
