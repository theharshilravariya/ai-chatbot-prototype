import { MarketList } from '../components/dashboard/MarketList';
import { useMarkets } from '../hooks/useMarkets';

export const MarketsPage = ({ onMarketClick }) => {
  const { data: markets, isLoading } = useMarkets();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">All Markets</h1>
        <p className="text-gray-400">Browse and filter prediction markets</p>
      </div>

      <MarketList 
        markets={markets} 
        isLoading={isLoading} 
        onMarketClick={onMarketClick}
      />
    </div>
  );
};
