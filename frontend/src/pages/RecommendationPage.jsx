import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { RecommendationCard } from '../components/dashboard/RecommendationCard';
import { RiskGauge } from '../components/dashboard/RiskGauge';
import { useRecommendation } from '../hooks/useRecommendation';
import { useSentiment } from '../hooks/useSentiment';
import { useTechnicalIndicators } from '../hooks/useTechnicalIndicators';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, XCircle, Brain, BarChart3, Newspaper } from 'lucide-react';
import { formatTimeAgo, formatProbability } from '../lib/formatters';

export const RecommendationPage = ({ market, onBack }) => {
  const { data: recommendation, isLoading: recLoading } = useRecommendation(market?.id);
  const { data: sentiment } = useSentiment(market?.id);
  const { data: indicators } = useTechnicalIndicators(market?.id);

  if (!market) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Markets
        </Button>
        
        <h1 className="text-3xl font-bold text-white mb-2">AI Recommendation Analysis</h1>
        <p className="text-gray-400 mb-4">{market.question}</p>
        <Badge variant="default">{market.category}</Badge>
      </div>

      {/* Main Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecommendationCard recommendation={recommendation} />
        </div>
        <div>
          <RiskGauge riskScore={recommendation?.riskScore} />
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Decision Factors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              Decision Factors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Market Price Analysis */}
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Market Price Analysis
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Current YES Price</span>
                  <span className="text-white font-semibold">{formatProbability(market.yesPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Current NO Price</span>
                  <span className="text-white font-semibold">{formatProbability(market.noPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Implied Probability</span>
                  <span className="text-white font-semibold">{market.impliedProb}%</span>
                </div>
              </div>
            </div>

            {/* Sentiment Analysis */}
            {sentiment && (
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Newspaper className="w-4 h-4" />
                  Sentiment Analysis
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Overall Sentiment</span>
                    <span className={`font-semibold ${sentiment.score > 0.5 ? 'text-green-400' : sentiment.score < -0.5 ? 'text-red-400' : 'text-gray-400'}`}>
                      {(sentiment.score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">News Articles</span>
                    <span className="text-white font-semibold">{sentiment.newsCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Urgency Level</span>
                    <span className="text-white font-semibold">{sentiment.urgency}/10</span>
                  </div>
                </div>
              </div>
            )}

            {/* Technical Indicators */}
            {indicators && (
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Technical Indicators
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">RSI (14)</span>
                    <span className={`font-semibold ${indicators.rsi > 70 ? 'text-red-400' : indicators.rsi < 30 ? 'text-green-400' : 'text-gray-400'}`}>
                      {indicators.rsi.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Volatility</span>
                    <span className="text-white font-semibold">{(indicators.volatility * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Trend</span>
                    <Badge variant={indicators.trend === 'bullish' ? 'success' : indicators.trend === 'bearish' ? 'danger' : 'default'}>
                      {indicators.trend.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Risk Assessment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Risk Assessment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Risk Breakdown */}
            <div>
              <h4 className="text-white font-medium mb-3">Risk Components</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Market Volatility</span>
                    <span className="text-white text-sm font-medium">High</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: '75%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Liquidity Risk</span>
                    <span className="text-white text-sm font-medium">Low</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '25%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Time to Resolution</span>
                    <span className="text-white text-sm font-medium">Medium</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: '50%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Information Quality</span>
                    <span className="text-white text-sm font-medium">High</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Key Risks */}
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Key Risks to Consider
              </h4>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• High market volatility may lead to rapid price swings</li>
                <li>• External events could significantly impact outcome</li>
                <li>• Limited historical data for similar events</li>
                <li>• Sentiment may shift quickly with new information</li>
              </ul>
            </div>

            {/* Confidence Breakdown */}
            <div>
              <h4 className="text-white font-medium mb-3">Confidence Factors</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-gray-400 text-sm">Data Quality</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: '90%' }} />
                    </div>
                    <span className="text-white text-xs w-8">90%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-gray-400 text-sm">Model Accuracy</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: '78%' }} />
                    </div>
                    <span className="text-white text-xs w-8">78%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-gray-400 text-sm">Historical Performance</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: '85%' }} />
                    </div>
                    <span className="text-white text-xs w-8">85%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alternative Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Alternative Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Bull Case */}
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <h4 className="text-white font-semibold">Bull Case (YES)</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Strong upward momentum supported by positive sentiment and technical indicators suggesting continued rally.
              </p>
              <div className="text-green-400 font-bold text-xl">+45% upside</div>
            </div>

            {/* Base Case */}
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <h4 className="text-white font-semibold">Base Case</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Market consolidates at current levels with moderate volatility. Expected probability aligned with current price.
              </p>
              <div className="text-purple-400 font-bold text-xl">0% to +15%</div>
            </div>

            {/* Bear Case */}
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-400" />
                <h4 className="text-white font-semibold">Bear Case (NO)</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Negative catalysts emerge causing sentiment reversal and price correction. Risk factors materialize.
              </p>
              <div className="text-red-400 font-bold text-xl">-30% downside</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Plan */}
      <Card className="border-2 border-purple-500/50">
        <CardHeader>
          <CardTitle>Recommended Action Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Entry Strategy</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Target entry: {formatProbability(market.yesPrice - 0.03)} - {formatProbability(market.yesPrice)}</li>
                  <li>• Position size: 2-5% of portfolio</li>
                  <li>• Scale in over 2-3 transactions</li>
                  <li>• Monitor support at {formatProbability(market.yesPrice - 0.05)}</li>
                </ul>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Exit Strategy</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Take profit: {formatProbability(market.yesPrice + 0.10)} or higher</li>
                  <li>• Stop loss: {formatProbability(market.yesPrice - 0.08)}</li>
                  <li>• Re-evaluate if sentiment shifts</li>
                  <li>• Consider scaling out at milestones</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="text-blue-400 font-semibold mb-2">Monitoring Checklist</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300 text-sm">
                <div>• Daily price movements</div>
                <div>• News and sentiment changes</div>
                <div>• Volume trends</div>
                <div>• Technical indicator shifts</div>
                <div>• Market catalyst events</div>
                <div>• Liquidity levels</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="p-4 bg-gray-500/10 border border-gray-500/30 rounded-lg">
        <p className="text-gray-400 text-xs text-center">
          <strong>Disclaimer:</strong> This recommendation is generated by AI and should not be considered financial advice. 
          Always do your own research and consider your risk tolerance before making investment decisions. 
          Past performance does not guarantee future results. Updated {recommendation?.generatedAt ? formatTimeAgo(recommendation.generatedAt) : 'recently'}.
        </p>
      </div>
    </div>
  );
};
