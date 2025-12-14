import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { formatProbability, formatVolume, formatDate } from '../../lib/formatters';
import { TrendingUp, Activity, Calendar, DollarSign } from 'lucide-react';

export const PriceInfoBox = ({ market }) => {
  if (!market) return null;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{market.question}</h2>
            <Badge variant="default">{market.category}</Badge>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-500 mb-1">
              {formatProbability(market.yesPrice)}
            </div>
            <div className="text-gray-400 text-sm">Yes Probability</div>
          </div>
        </div>

        {/* Price Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 text-sm font-medium">YES Price</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {formatProbability(market.yesPrice)}
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-red-400 text-sm font-medium">NO Price</span>
              <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
            </div>
            <div className="text-2xl font-bold text-white">
              {formatProbability(market.noPrice)}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-white font-bold text-lg">{formatVolume(market.volume)}</div>
            <div className="text-gray-400 text-xs">24h Volume</div>
          </div>

          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-white font-bold text-lg">{formatVolume(market.liquidity)}</div>
            <div className="text-gray-400 text-xs">Liquidity</div>
          </div>

          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-white font-bold text-sm">{formatDate(market.resolutionDate)}</div>
            <div className="text-gray-400 text-xs">Resolves</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
