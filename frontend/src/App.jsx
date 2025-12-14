import './App.css'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { DashboardPage } from './pages/DashboardPage'
import { MarketsPage } from './pages/MarketsPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { SettingsPage } from './pages/SettingsPage'
import { ExplorePage } from './pages/ExplorePage'
import { EnhancedExplorePage } from './pages/EnhancedExplorePage'
import { RecommendationPage } from './pages/RecommendationPage'
import { RecommendationsPage } from './pages/RecommendationsPage'
import { AboutPage } from './pages/AboutPage'
import { MarketDetailView } from './components/market/MarketDetailView'
import { useWebSocket } from './hooks/useWebSocket'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedMarket, setSelectedMarket] = useState(null)
  
  // Initialize WebSocket connection for real-time updates
  const { isConnected } = useWebSocket('/markets')

  const handleNavigate = (page) => {
    setCurrentPage(page)
    setSelectedMarket(null)
  }

  const handleMarketClick = (market) => {
    setSelectedMarket(market)
    setCurrentPage('market-detail')
  }

  const handleBackToMarkets = () => {
    setSelectedMarket(null)
    setCurrentPage('markets')
  }

  const handleViewRecommendation = (market) => {
    setSelectedMarket(market)
    setCurrentPage('recommendation')
  }

  const renderPage = () => {
    if (selectedMarket && currentPage === 'market-detail') {
      return <MarketDetailView market={selectedMarket} onBack={handleBackToMarkets} onViewRecommendation={handleViewRecommendation} />
    }

    if (selectedMarket && currentPage === 'recommendation') {
      return <RecommendationPage market={selectedMarket} onBack={handleBackToMarkets} />
    }

    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} onMarketClick={handleMarketClick} />
      case 'markets':
        return <MarketsPage onMarketClick={handleMarketClick} />
      case 'recommendations':
        return <RecommendationsPage onMarketClick={handleMarketClick} onViewDetailedRecommendation={handleViewRecommendation} />
      case 'explore':
        return <EnhancedExplorePage onMarketClick={handleMarketClick} />
      case 'portfolio':
        return <PortfolioPage />
      case 'settings':
        return <SettingsPage />
      case 'about':
        return <AboutPage />
      default:
        return <DashboardPage onNavigate={handleNavigate} onMarketClick={handleMarketClick} />
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        
        {/* WebSocket Status Indicator */}
        <div className="fixed top-20 right-4 z-50">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${
            isConnected 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            {isConnected ? 'Live' : 'Offline'}
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderPage()}
        </main>

        <Footer />
      </div>
    </QueryClientProvider>
  )
}

export default App
