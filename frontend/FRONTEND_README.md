# CounterSatta Frontend - Prediction Market Predictor

AI-powered prediction market analysis platform built with React, Vite, and modern web technologies.

## 🚀 Features

### Core Features
- **Real-time Market Data**: Live price updates via WebSocket connections
- **AI-Powered Recommendations**: Intelligent trading suggestions with risk assessment
- **Sentiment Analysis**: News sentiment tracking and analysis
- **Technical Indicators**: RSI, MACD, Moving Averages, and more
- **Interactive Charts**: Real-time price, volume, and sentiment charts
- **Portfolio Management**: Track positions and P&L
- **Market Discovery**: Browse, search, and filter prediction markets
- **Risk Assessment**: Comprehensive risk scoring and visualization

### Pages
1. **Dashboard** - Overview with trending markets and key stats
2. **Markets** - Browse all available prediction markets
3. **Market Detail** - In-depth analysis with charts and recommendations
4. **Explore** - Discover trending and featured markets
5. **Portfolio** - Track your positions and performance
6. **Settings** - Customize preferences and risk tolerance

### Components

#### Layout
- `Navbar` - Navigation with search
- `Footer` - Site footer with links

#### Dashboard
- `MarketCard` - Market preview cards
- `RecommendationCard` - AI recommendation display
- `RiskGauge` - Visual risk assessment
- `MarketList` - Searchable market list with filters

#### Charts
- `PriceChart` - Historical price data with area charts
- `VolumeChart` - Trading volume bar charts
- `SentimentChart` - Sentiment trends and news
- `IndicatorChart` - Technical indicators display

#### Market
- `MarketDetailView` - Complete market analysis page
- `PriceInfoBox` - Market price and stats
- `OrderBookSnapshot` - Order book visualization

#### UI Components
- `Card`, `Button`, `Badge`, `Modal`, `Spinner`
- `HyperText` - Animated text component
- `TextAnimate` - Word/character animation

## 🛠 Tech Stack

- **Framework**: React 19 + Vite
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Charts**: Recharts
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (Framer Motion)
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Real-time**: WebSocket API

## 📦 Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

Edit `.env.local`:

```env
# Backend API URL
VITE_API_URL=http://localhost:4000/api

# WebSocket URL
VITE_WS_URL=ws://localhost:4000

# Feature Flags
VITE_ENABLE_WEBSOCKET=true
VITE_ENABLE_MOCK_DATA=true
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── dashboard/       # MarketCard, RecommendationCard, etc.
│   ├── charts/          # Price, Volume, Sentiment charts
│   ├── market/          # Market detail components
│   └── ui/              # Reusable UI components
├── pages/
│   ├── DashboardPage.jsx
│   ├── MarketsPage.jsx
│   ├── ExplorePage.jsx
│   ├── PortfolioPage.jsx
│   └── SettingsPage.jsx
├── hooks/
│   ├── useMarkets.js
│   ├── useRecommendation.js
│   ├── useSentiment.js
│   ├── useTechnicalIndicators.js
│   └── useWebSocket.js
├── store/
│   ├── marketStore.js
│   └── preferenceStore.js
├── lib/
│   ├── api.js           # API client
│   ├── formatters.js    # Utility formatters
│   └── constants.js     # App constants
├── App.jsx
└── main.jsx
```

## 🎨 Key Features Explained

### Real-time Updates
The app uses WebSocket connections to receive live market updates:
```jsx
const { isConnected } = useWebSocket('/markets');
```

### Data Fetching
TanStack Query handles all server state with automatic caching and refetching:
```jsx
const { data: markets, isLoading } = useMarkets();
const { data: recommendation } = useRecommendation(marketId);
```

### State Management
Zustand stores for global state:
- `marketStore` - Market data and filters
- `preferenceStore` - User preferences

### Mock Data
When the backend isn't available, the app uses mock data for development:
- Markets, recommendations, sentiment, indicators all have fallback data
- Configurable via `VITE_ENABLE_MOCK_DATA` environment variable

## 📊 Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 5173)

# Build
npm run build            # Build for production
npm run preview          # Preview production build

# Linting
npm run lint             # Run ESLint
```

## 🎯 Usage Examples

### Navigate Between Pages
```jsx
<Navbar currentPage={currentPage} onNavigate={handleNavigate} />
```

### Display Market Cards
```jsx
<MarketCard market={market} onClick={handleMarketClick} />
```

### Show Recommendation
```jsx
<RecommendationCard recommendation={recommendation} />
```

### Render Charts
```jsx
<PriceChart data={historyData} isLoading={isLoading} timeframe="24h" />
<VolumeChart data={historyData} />
<SentimentChart sentiment={sentiment} />
<IndicatorChart indicators={indicators} />
```

## 🔌 API Integration

The frontend is designed to work with the backend API. Key endpoints:

- `GET /api/markets` - Fetch all markets
- `GET /api/markets/:id` - Get market details
- `GET /api/markets/:id/history` - Price history
- `GET /api/recommendations/:marketId` - AI recommendation
- `GET /api/sentiment/:marketId` - Sentiment data
- `GET /api/indicators/:marketId` - Technical indicators
- `WS /ws/markets` - Real-time price updates

## 🎨 Customization

### Theming
Modify `tailwind.config.js` for custom colors and styles.

### Chart Colors
Edit `src/lib/constants.js`:
```js
export const CHART_COLORS = {
  primary: '#8b5cf6',
  secondary: '#ec4899',
  // ...
};
```

### Risk Levels
Customize risk thresholds in `src/lib/constants.js`:
```js
export const RISK_LEVELS = {
  LOW: { min: 0, max: 30, label: 'Low Risk', color: 'green' },
  // ...
};
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build for Static Hosting
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API endpoint | `http://localhost:4000/api` |
| `VITE_WS_URL` | WebSocket endpoint | `ws://localhost:4000` |
| `VITE_ENABLE_WEBSOCKET` | Enable real-time updates | `true` |
| `VITE_ENABLE_MOCK_DATA` | Use mock data fallback | `true` |

## 🐛 Troubleshooting

### Charts not rendering
- Ensure Recharts is installed: `npm install recharts`
- Check browser console for errors

### WebSocket connection fails
- Verify backend is running
- Check `VITE_WS_URL` in `.env.local`
- Disable WebSocket: Set `VITE_ENABLE_WEBSOCKET=false`

### API errors
- Backend might not be running
- Mock data will be used automatically
- Check browser console for detailed errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- [Documentation](./docs)
- [Backend Repository](../backend)
- [Polymarket API](https://docs.polymarket.com)
- [React Query Docs](https://tanstack.com/query)
- [Recharts Docs](https://recharts.org)

---

Built with ❤️ using React + Vite + Tailwind CSS
