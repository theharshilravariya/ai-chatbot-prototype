// API client for backend communication
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

class ApiClient {
  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Markets
  async getMarkets(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/markets${query ? `?${query}` : ''}`);
  }

  async getMarket(id) {
    return this.request(`/markets/${id}`);
  }

  async getMarketHistory(id, range = '24h') {
    return this.request(`/markets/${id}/history?range=${range}`);
  }

  async getOrderBook(id) {
    return this.request(`/markets/${id}/orderbook`);
  }

  async getTrendingMarkets() {
    return this.request('/markets/trending');
  }

  // Recommendations
  async getRecommendation(marketId) {
    return this.request(`/recommendations/${marketId}`);
  }

  // Sentiment
  async getSentiment(marketId) {
    return this.request(`/sentiment/${marketId}`);
  }

  // Technical Indicators
  async getIndicators(marketId) {
    return this.request(`/indicators/${marketId}`);
  }

  // News
  async getNews(marketId) {
    return this.request(`/news?marketId=${marketId}`);
  }

  // User preferences
  async getPreferences() {
    return this.request('/user/preferences');
  }

  async updatePreferences(preferences) {
    return this.request('/user/preferences', {
      method: 'POST',
      body: JSON.stringify(preferences),
    });
  }
}

export const api = new ApiClient();

// Mock data for development (remove when backend is ready)
export const mockMarkets = [
  {
    id: '0x123abc',
    question: 'Will Bitcoin reach $100K by end of 2025?',
    category: 'Crypto',
    yesPrice: 0.65,
    noPrice: 0.35,
    volume: 1250000,
    liquidity: 500000,
    impliedProb: 65,
    resolutionDate: '2025-12-31T23:59:59Z',
  },
  {
    id: '0x456def',
    question: 'Will Trump win the 2024 election?',
    category: 'Politics',
    yesPrice: 0.52,
    noPrice: 0.48,
    volume: 5800000,
    liquidity: 2100000,
    impliedProb: 52,
    resolutionDate: '2024-11-05T23:59:59Z',
  },
  {
    id: '0x789ghi',
    question: 'Will S&P 500 close above 5000 in 2025?',
    category: 'Finance',
    yesPrice: 0.78,
    noPrice: 0.22,
    volume: 980000,
    liquidity: 450000,
    impliedProb: 78,
    resolutionDate: '2025-12-31T23:59:59Z',
  },
  {
    id: '0xabcjkl',
    question: 'Will AI surpass human performance in most tasks by 2030?',
    category: 'Technology',
    yesPrice: 0.42,
    noPrice: 0.58,
    volume: 720000,
    liquidity: 320000,
    impliedProb: 42,
    resolutionDate: '2030-12-31T23:59:59Z',
  },
  {
    id: '0xdefmno',
    question: 'Will Ethereum reach $5000 in 2025?',
    category: 'Crypto',
    yesPrice: 0.55,
    noPrice: 0.45,
    volume: 1100000,
    liquidity: 480000,
    impliedProb: 55,
    resolutionDate: '2025-12-31T23:59:59Z',
  },
  {
    id: '0xghipqr',
    question: 'Will Tesla stock reach $500 in 2025?',
    category: 'Finance',
    yesPrice: 0.38,
    noPrice: 0.62,
    volume: 850000,
    liquidity: 380000,
    impliedProb: 38,
    resolutionDate: '2025-12-31T23:59:59Z',
  },
];

export const mockRecommendation = {
  marketId: '0x123abc',
  decision: 'YES',
  riskScore: 35,
  confidence: 0.78,
  reasoning: 'Strong market price fundamentals, bullish sentiment (78%), positive technical setup (RSI 62). Liquidity adequate for $10K positions.',
  caveats: 'High volatility (45%). Macroeconomic risk if Fed raises rates.',
  generatedAt: '2025-12-14T14:30:00Z',
};

export const mockSentiment = {
  score: 0.72,
  newsCount: 8,
  recentHeadlines: [
    'Bitcoin bounces off support, bulls gain momentum',
    'Institutional inflows accelerate crypto adoption',
    'Analysts predict BTC rally continues through Q4',
  ],
  urgency: 7,
  timestamp: '2025-12-14T14:25:00Z',
};
