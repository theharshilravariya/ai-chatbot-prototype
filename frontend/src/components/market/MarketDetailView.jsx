import { useState } from 'react';
import { PriceInfoBox } from './PriceInfoBox';
import { OrderBookSnapshot } from './OrderBookSnapshot';
import { PriceChart } from '../charts/PriceChart';
import { VolumeChart } from '../charts/VolumeChart';
import { SentimentChart } from '../charts/SentimentChart';
import { IndicatorChart } from '../charts/IndicatorChart';
import { RecommendationCard } from '../dashboard/RecommendationCard';
import { RiskGauge } from '../dashboard/RiskGauge';
import { useMarketHistory, useOrderBook } from '../../hooks/useMarkets';
import { useRecommendation } from '../../hooks/useRecommendation';
import { useSentiment, useNews } from '../../hooks/useSentiment';
import { useTechnicalIndicators } from '../../hooks/useTechnicalIndicators';
import { Button } from '../ui/button';
import { TIMEFRAMES } from '../../lib/constants';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { formatTimeAgo } from '../../lib/formatters';

export const MarketDetailView = ({ market, onBack, onViewRecommendation }) => {
  const [timeframe, setTimeframe] = useState('24h');

  const { data: historyData, isLoading: historyLoading } = useMarketHistory(market.id, timeframe);
  const { data: orderBook } = useOrderBook(market.id);
  const { data: recommendation } = useRecommendation(market.id);
  const { data: sentiment } = useSentiment(market.id);
  const { data: news } = useNews(market.id);
  const { data: indicators } = useTechnicalIndicators(market.id);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Markets
      </Button>

      {/* Market Info */}
      <PriceInfoBox market={market} />

      {/* Timeframe Selector */}
      <div className="flex gap-2 justify-center">
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf.value}
            onClick={() => setTimeframe(tf.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              timeframe === tf.value
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          <PriceChart data={historyData} isLoading={historyLoading} timeframe={timeframe} />
          <VolumeChart data={historyData} />
          <OrderBookSnapshot orderBook={orderBook} />
        </div>

        {/* Right Column - Analysis */}
        <div className="space-y-6">
          <div>
            <RecommendationCard recommendation={recommendation} />
            {onViewRecommendation && (
              <Button 
                variant="secondary" 
                className="w-full mt-3"
                onClick={() => onViewRecommendation(market)}
              >
                View Detailed Analysis →
              </Button>
            )}
          </div>
          <RiskGauge riskScore={recommendation?.riskScore} />
        </div>
      </div>

      {/* Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentChart sentiment={sentiment} />
        <IndicatorChart indicators={indicators} />
      </div>

      {/* News Section */}
      {news && news.length > 0 && (
        <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Latest News</h3>
          <div className="space-y-4">
            {news.map((article) => (
              <div key={article.id} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{article.title}</h4>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-400">{article.source}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">{formatTimeAgo(article.publishedAt)}</span>
                      {article.sentiment && (
                        <>
                          <span className="text-gray-500">•</span>
                          <span className={article.sentiment > 0.5 ? 'text-green-400' : article.sentiment < -0.5 ? 'text-red-400' : 'text-gray-400'}>
                            {article.sentiment > 0.5 ? 'Bullish' : article.sentiment < -0.5 ? 'Bearish' : 'Neutral'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
