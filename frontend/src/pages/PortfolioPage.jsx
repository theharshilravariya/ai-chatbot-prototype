import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatProbability, formatVolume, formatPrice } from '../lib/formatters';

export const PortfolioPage = () => {
  // Mock portfolio data
  const positions = [
    {
      id: 1,
      marketQuestion: 'Will Bitcoin reach $100K by end of 2025?',
      side: 'YES',
      shares: 100,
      avgPrice: 0.62,
      currentPrice: 0.65,
      value: 65,
      pnl: 3,
      pnlPercent: 4.84,
    },
    {
      id: 2,
      marketQuestion: 'Will Trump win the 2024 election?',
      side: 'NO',
      shares: 50,
      avgPrice: 0.50,
      currentPrice: 0.48,
      value: 24,
      pnl: -1,
      pnlPercent: -4.0,
    },
  ];

  const totalValue = positions.reduce((sum, p) => sum + p.value, 0);
  const totalPnL = positions.reduce((sum, p) => sum + p.pnl, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Portfolio</h1>
        <p className="text-gray-400">Track your positions and performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-400 text-sm mb-2">Total Value</p>
            <p className="text-3xl font-bold text-white">{formatPrice(totalValue)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-gray-400 text-sm mb-2">Total P&L</p>
            <div className="flex items-center gap-2">
              <p className={`text-3xl font-bold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {totalPnL >= 0 ? '+' : ''}{formatPrice(totalPnL)}
              </p>
              {totalPnL >= 0 ? (
                <TrendingUp className="w-6 h-6 text-green-500" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-500" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-gray-400 text-sm mb-2">Active Positions</p>
            <p className="text-3xl font-bold text-white">{positions.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Positions Table */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Your Positions</h2>
          
          {positions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No positions yet</p>
              <p className="text-gray-500 text-sm mt-2">Start trading to build your portfolio</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-gray-400 font-medium text-sm pb-3">Market</th>
                    <th className="text-left text-gray-400 font-medium text-sm pb-3">Side</th>
                    <th className="text-right text-gray-400 font-medium text-sm pb-3">Shares</th>
                    <th className="text-right text-gray-400 font-medium text-sm pb-3">Avg Price</th>
                    <th className="text-right text-gray-400 font-medium text-sm pb-3">Current</th>
                    <th className="text-right text-gray-400 font-medium text-sm pb-3">Value</th>
                    <th className="text-right text-gray-400 font-medium text-sm pb-3">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((position) => (
                    <tr key={position.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 text-white max-w-md">{position.marketQuestion}</td>
                      <td className="py-4">
                        <Badge variant={position.side === 'YES' ? 'success' : 'danger'}>
                          {position.side}
                        </Badge>
                      </td>
                      <td className="py-4 text-right text-white">{position.shares}</td>
                      <td className="py-4 text-right text-gray-300">{formatProbability(position.avgPrice)}</td>
                      <td className="py-4 text-right text-white">{formatProbability(position.currentPrice)}</td>
                      <td className="py-4 text-right text-white font-medium">{formatPrice(position.value)}</td>
                      <td className="py-4 text-right">
                        <div className={position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
                          <div className="font-bold">
                            {position.pnl >= 0 ? '+' : ''}{formatPrice(position.pnl)}
                          </div>
                          <div className="text-xs">
                            {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
