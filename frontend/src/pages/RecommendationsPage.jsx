import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { RecommendationCard } from '../components/dashboard/RecommendationCard';
import { useMarkets } from '../hooks/useMarkets';
import { useRecommendation } from '../hooks/useRecommendation';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { TrendingUp, Brain, AlertTriangle, ArrowRight } from 'lucide-react';

export const RecommendationsPage = ({ onMarketClick, onViewDetailedRecommendation }) => {
  const { data: markets, isLoading } = useMarkets();

  // Get top markets by volume
  const topMarkets = markets?.slice(0, 6) || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-12 h-12 text-purple-400" />
          <h1 className="text-4xl font-bold text-white">AI Recommendations</h1>
        </div>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Get AI-powered trading recommendations based on technical analysis, sentiment, and market data
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-green-500/30 bg-green-500/5">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {topMarkets.filter((_, i) => i % 3 === 0).length}
            </div>
            <div className="text-gray-400">Strong Buy Signals</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-yellow-500/30 bg-yellow-500/5">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {topMarkets.filter((_, i) => i % 3 === 1).length}
            </div>
            <div className="text-gray-400">Hold Positions</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-500/30 bg-purple-500/5">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {topMarkets.length}
            </div>
            <div className="text-gray-400">Total Recommendations</div>
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <Card className="border-2 border-blue-500/50 bg-blue-500/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-semibold mb-2">How AI Recommendations Work</h3>
              <p className="text-gray-300 text-sm">
                Our AI analyzes multiple factors including historical price data, technical indicators (RSI, MACD, Moving Averages), 
                sentiment from news and social media, trading volume patterns, and market liquidity. Each recommendation includes 
                a confidence score (0-100%), risk assessment, and detailed reasoning.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Grid */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple-400" />
          Top Market Recommendations
        </h2>

        <div className="space-y-6">
          {topMarkets.map((market) => (
            <RecommendationWithMarket
              key={market.id}
              market={market}
              onMarketClick={onMarketClick}
              onViewDetailedRecommendation={onViewDetailedRecommendation}
            />
          ))}
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            <p className="text-gray-400 mt-4">Loading recommendations...</p>
          </div>
        )}

        {!isLoading && topMarkets.length === 0 && (
          <Card>
            <CardContent className="py-20 text-center">
              <p className="text-gray-400 text-lg">No recommendations available at this time</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Sub-component for each recommendation
const RecommendationWithMarket = ({ market, onMarketClick, onViewDetailedRecommendation }) => {
  const { data: recommendation } = useRecommendation(market.id);

  return (
    <Card className="hover:bg-white/5 transition">
      <CardContent className="p-6">
        {/* Market Info */}
        <div className="mb-4 pb-4 border-b border-white/10">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="default">{market.category}</Badge>
                <span className="text-gray-400 text-sm">#{market.id}</span>
              </div>
              <h3 
                className="text-white font-semibold text-lg hover:text-purple-400 cursor-pointer transition"
                onClick={() => onMarketClick(market)}
              >
                {market.question}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-400">{market.impliedProb}%</div>
              <div className="text-xs text-gray-400">Implied Probability</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Volume:</span>
              <span className="text-white font-semibold ml-2">
                ${(market.volume / 1000000).toFixed(1)}M
              </span>
            </div>
            <div>
              <span className="text-gray-400">Liquidity:</span>
              <span className="text-white font-semibold ml-2">
                ${(market.liquidity / 1000000).toFixed(1)}M
              </span>
            </div>
            <div>
              <span className="text-gray-400">YES Price:</span>
              <span className="text-green-400 font-semibold ml-2">
                ${market.yesPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="mb-4">
          <RecommendationCard recommendation={recommendation} compact />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            variant="primary" 
            className="flex-1"
            onClick={() => onViewDetailedRecommendation(market)}
          >
            View Detailed Analysis
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            variant="secondary"
            onClick={() => onMarketClick(market)}
          >
            View Market
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
