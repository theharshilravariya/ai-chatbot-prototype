import { TextAnimate } from '../components/ui/text-animate';
import { HyperText } from '../components/ui/hyper-text';
import { MarketCard } from '../components/dashboard/MarketCard';
import { useTrendingMarkets } from '../hooks/useMarkets';
import { Spinner } from '../components/ui/spinner';
import { TrendingUp, Activity, Users, Target } from 'lucide-react';

export const DashboardPage = ({ onNavigate, onMarketClick }) => {
  const { data: trendingMarkets, isLoading } = useTrendingMarkets();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div>
          <HyperText 
            className="text-5xl md:text-6xl font-bold text-white leading-tight inline-block"
            duration={1000}
            delay={0}
          >
            Predict the Future
          </HyperText>
          <br />
          <HyperText 
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent inline-block mt-2"
            duration={1000}
            delay={500}
          >
            Earn Rewards
          </HyperText>
        </div>
        
        <TextAnimate 
          className="text-xl text-gray-300 max-w-3xl mx-auto"
          animation="blurIn"
          by="word"
          delay={1.5}
        >
          AI-powered prediction market analysis. Make informed decisions with real-time data, sentiment analysis, and intelligent recommendations.
        </TextAnimate>

        <div className="flex gap-4 justify-center pt-4">
          <button 
            onClick={() => onNavigate('markets')}
            className="px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
          >
            Explore Markets
          </button>
          <button 
            onClick={() => onNavigate('portfolio')}
            className="px-8 py-4 bg-white/10 backdrop-blur text-white text-lg font-semibold rounded-lg hover:bg-white/20 transition"
          >
            View Portfolio
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-6 text-center">
          <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <TextAnimate className="text-3xl font-bold text-white" animation="scaleUp" by="character">
            $10M+
          </TextAnimate>
          <TextAnimate className="text-gray-400 mt-1 text-sm" animation="fadeIn">
            Trading Volume
          </TextAnimate>
        </div>
        
        <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-6 text-center">
          <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <TextAnimate className="text-3xl font-bold text-white" animation="scaleUp" by="character">
            50K+
          </TextAnimate>
          <TextAnimate className="text-gray-400 mt-1 text-sm" animation="fadeIn">
            Active Traders
          </TextAnimate>
        </div>
        
        <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-6 text-center">
          <Activity className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <TextAnimate className="text-3xl font-bold text-white" animation="scaleUp" by="character">
            1000+
          </TextAnimate>
          <TextAnimate className="text-gray-400 mt-1 text-sm" animation="fadeIn">
            Markets
          </TextAnimate>
        </div>
        
        <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-6 text-center">
          <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <TextAnimate className="text-3xl font-bold text-white" animation="scaleUp" by="character">
            92%
          </TextAnimate>
          <TextAnimate className="text-gray-400 mt-1 text-sm" animation="fadeIn">
            Accuracy Rate
          </TextAnimate>
        </div>
      </div>

      {/* Trending Markets */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Trending Markets</h2>
          <button 
            onClick={() => onNavigate('markets')}
            className="text-purple-400 hover:text-purple-300 transition font-medium"
          >
            View All →
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingMarkets?.map((market) => (
              <MarketCard 
                key={market.id} 
                market={market} 
                onClick={onMarketClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-8 bg-white/5 backdrop-blur rounded-xl border border-white/10">
          <div className="text-4xl mb-4">🤖</div>
          <HyperText 
            className="text-xl font-semibold text-white mb-2 py-1"
            duration={600}
            startOnView={true}
          >
            AI-Powered Analysis
          </HyperText>
          <TextAnimate 
            className="text-gray-400"
            animation="fadeIn"
            by="word"
          >
            Advanced machine learning models analyze market sentiment, news, and technical indicators to provide intelligent recommendations.
          </TextAnimate>
        </div>

        <div className="p-8 bg-white/5 backdrop-blur rounded-xl border border-white/10">
          <div className="text-4xl mb-4">📊</div>
          <HyperText 
            className="text-xl font-semibold text-white mb-2 py-1"
            duration={600}
            startOnView={true}
            delay={100}
          >
            Real-Time Data
          </HyperText>
          <TextAnimate 
            className="text-gray-400"
            animation="fadeIn"
            by="word"
          >
            Live market updates, price tracking, and order book analysis with WebSocket-powered real-time feeds.
          </TextAnimate>
        </div>

        <div className="p-8 bg-white/5 backdrop-blur rounded-xl border border-white/10">
          <div className="text-4xl mb-4">🎯</div>
          <HyperText 
            className="text-xl font-semibold text-white mb-2 py-1"
            duration={600}
            startOnView={true}
            delay={200}
          >
            Risk Management
          </HyperText>
          <TextAnimate 
            className="text-gray-400"
            animation="fadeIn"
            by="word"
          >
            Comprehensive risk scoring, volatility analysis, and position sizing recommendations to protect your capital.
          </TextAnimate>
        </div>
      </div>
    </div>
  );
};
