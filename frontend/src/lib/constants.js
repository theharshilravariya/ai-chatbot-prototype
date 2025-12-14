// Constants for the application

export const MARKET_CATEGORIES = [
  'All',
  'Crypto',
  'Politics',
  'Finance',
  'Technology',
  'Sports',
  'Entertainment',
  'Science',
];

export const TIMEFRAMES = [
  { label: '1H', value: '1h' },
  { label: '24H', value: '24h' },
  { label: '7D', value: '7d' },
  { label: '30D', value: '30d' },
  { label: '1Y', value: '1y' },
  { label: 'All', value: 'all' },
];

export const SORT_OPTIONS = [
  { label: 'Volume (High to Low)', value: 'volume_desc' },
  { label: 'Volume (Low to High)', value: 'volume_asc' },
  { label: 'Probability (High to Low)', value: 'prob_desc' },
  { label: 'Probability (Low to High)', value: 'prob_asc' },
  { label: 'Recent', value: 'recent' },
  { label: 'Ending Soon', value: 'ending_soon' },
];

export const RISK_LEVELS = {
  LOW: { min: 0, max: 30, label: 'Low Risk', color: 'green' },
  MEDIUM: { min: 30, max: 60, label: 'Medium Risk', color: 'yellow' },
  HIGH: { min: 60, max: 100, label: 'High Risk', color: 'red' },
};

export const DECISION_TYPES = {
  YES: { label: 'Buy YES', color: 'green', icon: '↑' },
  NO: { label: 'Buy NO', color: 'red', icon: '↓' },
  HOLD: { label: 'Hold', color: 'gray', icon: '−' },
};

export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:4000';

export const CHART_COLORS = {
  primary: '#8b5cf6',
  secondary: '#ec4899',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};
