import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export const IndicatorChart = ({ indicators }) => {
  if (!indicators) {
    return (
      <Card>
        <CardContent>
          <p className="text-gray-400 text-center py-12">No indicator data available</p>
        </CardContent>
      </Card>
    );
  }

  const getRSIColor = (rsi) => {
    if (rsi > 70) return 'danger';
    if (rsi < 30) return 'success';
    return 'warning';
  };

  const getRSILabel = (rsi) => {
    if (rsi > 70) return 'Overbought';
    if (rsi < 30) return 'Oversold';
    return 'Neutral';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Indicators</CardTitle>
      </CardHeader>
      <CardContent>
        {/* RSI */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">RSI (14)</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{indicators.rsi.toFixed(1)}</span>
              <Badge variant={getRSIColor(indicators.rsi)}>
                {getRSILabel(indicators.rsi)}
              </Badge>
            </div>
          </div>
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
              style={{ width: `${indicators.rsi}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>30</span>
            <span>70</span>
            <span>100</span>
          </div>
        </div>

        {/* Moving Averages */}
        <div className="mb-6">
          <h4 className="text-white font-medium text-sm mb-3">Moving Averages</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-white/5 rounded">
              <span className="text-gray-400 text-sm">MA 20</span>
              <span className="text-white font-medium">{(indicators.movingAverages.ma20 * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white/5 rounded">
              <span className="text-gray-400 text-sm">MA 50</span>
              <span className="text-white font-medium">{(indicators.movingAverages.ma50 * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white/5 rounded">
              <span className="text-gray-400 text-sm">MA 200</span>
              <span className="text-white font-medium">{(indicators.movingAverages.ma200 * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* MACD */}
        <div className="mb-6">
          <h4 className="text-white font-medium text-sm mb-3">MACD</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 bg-white/5 rounded text-center">
              <p className="text-gray-400 text-xs mb-1">Value</p>
              <p className="text-white text-sm font-medium">{indicators.macd.value.toFixed(3)}</p>
            </div>
            <div className="p-2 bg-white/5 rounded text-center">
              <p className="text-gray-400 text-xs mb-1">Signal</p>
              <p className="text-white text-sm font-medium">{indicators.macd.signal.toFixed(3)}</p>
            </div>
            <div className="p-2 bg-white/5 rounded text-center">
              <p className="text-gray-400 text-xs mb-1">Histogram</p>
              <p className={`text-sm font-medium ${indicators.macd.histogram > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {indicators.macd.histogram.toFixed(3)}
              </p>
            </div>
          </div>
        </div>

        {/* Support & Resistance */}
        <div className="mb-6">
          <h4 className="text-white font-medium text-sm mb-3">Support & Resistance</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-400 text-xs mb-1">Support</p>
              <p className="text-white text-lg font-bold">{(indicators.support * 100).toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-xs mb-1">Resistance</p>
              <p className="text-white text-lg font-bold">{(indicators.resistance * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="text-gray-400 text-xs mb-1">Volatility</p>
            <p className="text-white text-lg font-bold">{(indicators.volatility * 100).toFixed(1)}%</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="text-gray-400 text-xs mb-1">Trend</p>
            <Badge variant={indicators.trend === 'bullish' ? 'success' : indicators.trend === 'bearish' ? 'danger' : 'default'}>
              {indicators.trend.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
