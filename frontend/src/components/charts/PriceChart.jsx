import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { formatDateTime, formatProbability } from '../../lib/formatters';
import { CHART_COLORS } from '../../lib/constants';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Spinner } from '../ui/spinner';

export const PriceChart = ({ data, isLoading, timeframe = '24h' }) => {
  if (isLoading) {
    return (
      <Card>
        <Spinner className="py-12" />
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent>
          <p className="text-gray-400 text-center py-12">No price data available</p>
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-white/10 rounded-lg p-3 shadow-xl">
          <p className="text-white text-sm mb-1">
            {formatDateTime(payload[0].payload.timestamp)}
          </p>
          <p className="text-green-400 text-sm">
            Yes: {formatProbability(payload[0].value)}
          </p>
          <p className="text-red-400 text-sm">
            No: {formatProbability(payload[1]?.value || 1 - payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price History ({timeframe})</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="yesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.success} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={CHART_COLORS.success} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="noGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.danger} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={CHART_COLORS.danger} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              stroke="#888"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              tickFormatter={(value) => formatProbability(value)}
              stroke="#888"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="yesPrice" 
              stroke={CHART_COLORS.success}
              fill="url(#yesGradient)"
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="noPrice" 
              stroke={CHART_COLORS.danger}
              fill="url(#noGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-400 text-sm">Yes Price</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-400 text-sm">No Price</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
