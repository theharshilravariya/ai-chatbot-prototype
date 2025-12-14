import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { formatProbability } from '../../lib/formatters';

export const OrderBookSnapshot = ({ orderBook }) => {
  if (!orderBook) {
    return (
      <Card>
        <CardContent>
          <p className="text-gray-400 text-center py-8">No order book data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Book</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {/* Bids (Buy) */}
          <div>
            <h4 className="text-green-400 font-semibold mb-3 text-sm">Bids (Buy)</h4>
            <div className="space-y-1">
              {orderBook.bids?.map((bid, idx) => (
                <div 
                  key={idx}
                  className="relative flex justify-between items-center p-2 rounded text-sm"
                >
                  <div 
                    className="absolute inset-0 bg-green-500/10 rounded"
                    style={{ width: `${(bid.size / Math.max(...orderBook.bids.map(b => b.size))) * 100}%` }}
                  />
                  <span className="relative z-10 text-green-400 font-medium">
                    {formatProbability(bid.price)}
                  </span>
                  <span className="relative z-10 text-gray-300">
                    {bid.size.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Asks (Sell) */}
          <div>
            <h4 className="text-red-400 font-semibold mb-3 text-sm">Asks (Sell)</h4>
            <div className="space-y-1">
              {orderBook.asks?.map((ask, idx) => (
                <div 
                  key={idx}
                  className="relative flex justify-between items-center p-2 rounded text-sm"
                >
                  <div 
                    className="absolute inset-0 bg-red-500/10 rounded"
                    style={{ width: `${(ask.size / Math.max(...orderBook.asks.map(a => a.size))) * 100}%` }}
                  />
                  <span className="relative z-10 text-red-400 font-medium">
                    {formatProbability(ask.price)}
                  </span>
                  <span className="relative z-10 text-gray-300">
                    {ask.size.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spread */}
        <div className="mt-6 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Spread</span>
            <span className="text-white font-semibold">
              {formatProbability(Math.abs(orderBook.asks[0]?.price - orderBook.bids[0]?.price))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
