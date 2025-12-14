import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { getSentimentColor, getSentimentLabel } from '../../lib/formatters';

export const SentimentChart = ({ sentiment }) => {
  if (!sentiment) {
    return (
      <Card>
        <CardContent>
          <p className="text-gray-400 text-center py-12">No sentiment data available</p>
        </CardContent>
      </Card>
    );
  }

  // Generate mock historical sentiment data
  const historicalData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    sentiment: sentiment.score + (Math.random() - 0.5) * 0.3,
  }));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Market Sentiment</CardTitle>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${getSentimentColor(sentiment.score)}`}>
              {(sentiment.score * 100).toFixed(0)}
            </span>
            <span className="text-gray-400">{getSentimentLabel(sentiment.score)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis 
              dataKey="hour" 
              tickFormatter={(value) => `${value}h`}
              stroke="#888"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              domain={[-1, 1]}
              ticks={[-1, -0.5, 0, 0.5, 1]}
              stroke="#888"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              formatter={(value) => [(value * 100).toFixed(0), 'Sentiment']}
              labelFormatter={(label) => `${label} hours ago`}
            />
            <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
            <Line 
              type="monotone" 
              dataKey="sentiment" 
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Recent Headlines */}
        <div className="mt-6 space-y-3">
          <h4 className="text-white font-medium text-sm">Recent News</h4>
          {sentiment.recentHeadlines?.slice(0, 3).map((headline, idx) => (
            <div key={idx} className="flex items-start gap-2 p-3 bg-white/5 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">{headline}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-gray-400 text-xs">News Articles</p>
            <p className="text-white text-xl font-bold">{sentiment.newsCount}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-gray-400 text-xs">Urgency Level</p>
            <p className="text-white text-xl font-bold">{sentiment.urgency}/10</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
