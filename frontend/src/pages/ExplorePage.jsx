import { MarketList } from '../components/dashboard/MarketList';
import { useMarkets } from '../hooks/useMarkets';
import { Card, CardContent } from '../components/ui/card';
import { TrendingUp, Star, Flame } from 'lucide-react';

export const ExplorePage = ({ onMarketClick }) => {
  const { data: markets, isLoading } = useMarkets();

  const categories = [
    { name: 'Hot Today', icon: <Flame className="w-5 h-5" />, color: 'text-orange-500' },
    { name: 'Most Traded', icon: <TrendingUp className="w-5 h-5" />, color: 'text-green-500' },
    { name: 'Featured', icon: <Star className="w-5 h-5" />, color: 'text-yellow-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Explore Markets</h1>
        <p className="text-gray-400">Discover trending prediction markets and opportunities</p>
      </div>

      {/* Quick Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, idx) => (
          <Card key={idx} className="cursor-pointer hover:bg-white/10 transition">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className={category.color}>{category.icon}</div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                  <p className="text-gray-400 text-sm">Explore trending markets</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* All Markets */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">All Markets</h2>
        <MarketList 
          markets={markets} 
          isLoading={isLoading} 
          onMarketClick={onMarketClick}
        />
      </div>
    </div>
  );
};
