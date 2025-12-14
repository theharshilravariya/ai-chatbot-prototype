import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { formatProbability, formatVolume, formatDate } from '../../lib/formatters';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export const MarketCard = ({ market, onClick }) => {
  const isProbabilityHigh = market.impliedProb > 50;
  
  return (
    <Card 
      className="cursor-pointer hover:bg-white/10 transition-all transform hover:scale-[1.02]"
      onClick={() => onClick(market)}
    >
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <Badge variant="default">{market.category}</Badge>
          <div className="flex items-center gap-1">
            {isProbabilityHigh ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`font-bold text-lg ${isProbabilityHigh ? 'text-green-500' : 'text-red-500'}`}>
              {formatProbability(market.yesPrice)}
            </span>
          </div>
        </div>

        {/* Question */}
        <h3 className="text-white font-semibold text-base mb-4 line-clamp-2 h-12">
          {market.question}
        </h3>

        {/* Probability Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Yes</span>
            <span>No</span>
          </div>
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
              style={{ width: `${market.impliedProb}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-green-400 font-medium">{formatProbability(market.yesPrice)}</span>
            <span className="text-red-400 font-medium">{formatProbability(market.noPrice)}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
          <div>
            <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
              <Activity className="w-3 h-3" />
              <span>Volume</span>
            </div>
            <p className="text-white font-semibold text-sm">{formatVolume(market.volume)}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Resolves</p>
            <p className="text-white font-semibold text-sm">{formatDate(market.resolutionDate)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
