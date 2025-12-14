import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatVolume, formatDateTime } from '../../lib/formatters';
import { CHART_COLORS } from '../../lib/constants';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

export const VolumeChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent>
          <p className="text-gray-400 text-center py-12">No volume data available</p>
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
          <p className="text-purple-400 text-sm font-semibold">
            Volume: {formatVolume(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trading Volume</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit' })}
              stroke="#888"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              tickFormatter={(value) => formatVolume(value)}
              stroke="#888"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="volume" 
              fill={CHART_COLORS.primary}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
