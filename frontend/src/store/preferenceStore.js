import { create } from 'zustand';

export const usePreferenceStore = create((set) => ({
  riskTolerance: 'medium', // low, medium, high
  notifications: true,
  theme: 'dark',
  defaultTimeframe: '24h',
  autoRefresh: true,
  refreshInterval: 30000, // 30 seconds
  
  setRiskTolerance: (level) => set({ riskTolerance: level }),
  setNotifications: (enabled) => set({ notifications: enabled }),
  setTheme: (theme) => set({ theme }),
  setDefaultTimeframe: (timeframe) => set({ defaultTimeframe: timeframe }),
  setAutoRefresh: (enabled) => set({ autoRefresh: enabled }),
  setRefreshInterval: (interval) => set({ refreshInterval: interval }),
}));
