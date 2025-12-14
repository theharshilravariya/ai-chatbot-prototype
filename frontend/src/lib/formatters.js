// Utility functions for formatting data

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatProbability = (prob) => {
  return `${(prob * 100).toFixed(1)}%`;
};

export const formatVolume = (volume) => {
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(1)}M`;
  } else if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(1)}K`;
  }
  return formatPrice(volume);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
};

export const getRiskColor = (riskScore) => {
  if (riskScore < 30) return 'text-green-500';
  if (riskScore < 60) return 'text-yellow-500';
  return 'text-red-500';
};

export const getRiskLabel = (riskScore) => {
  if (riskScore < 30) return 'Low Risk';
  if (riskScore < 60) return 'Medium Risk';
  return 'High Risk';
};

export const getDecisionColor = (decision) => {
  if (decision === 'YES') return 'bg-green-500';
  if (decision === 'NO') return 'bg-red-500';
  return 'bg-gray-500';
};

export const getSentimentColor = (score) => {
  if (score > 0.5) return 'text-green-500';
  if (score < -0.5) return 'text-red-500';
  return 'text-gray-500';
};

export const getSentimentLabel = (score) => {
  if (score > 0.5) return 'Bullish';
  if (score > 0.2) return 'Slightly Bullish';
  if (score > -0.2) return 'Neutral';
  if (score > -0.5) return 'Slightly Bearish';
  return 'Bearish';
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
