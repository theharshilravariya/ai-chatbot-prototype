import { useState } from 'react';
import { MarketCard } from './MarketCard';
import { Spinner } from '../ui/spinner';
import { MARKET_CATEGORIES, SORT_OPTIONS } from '../../lib/constants';
import { Search, SlidersHorizontal } from 'lucide-react';

export const MarketList = ({ markets, isLoading, onMarketClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('volume_desc');

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  // Filter and sort markets
  let filteredMarkets = [...(markets || [])];
  
  if (selectedCategory !== 'All') {
    filteredMarkets = filteredMarkets.filter(m => m.category === selectedCategory);
  }
  
  if (searchQuery) {
    filteredMarkets = filteredMarkets.filter(m => 
      m.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Sort
  switch (sortBy) {
    case 'volume_desc':
      filteredMarkets.sort((a, b) => b.volume - a.volume);
      break;
    case 'volume_asc':
      filteredMarkets.sort((a, b) => a.volume - b.volume);
      break;
    case 'prob_desc':
      filteredMarkets.sort((a, b) => b.impliedProb - a.impliedProb);
      break;
    case 'prob_asc':
      filteredMarkets.sort((a, b) => a.impliedProb - b.impliedProb);
      break;
    case 'ending_soon':
      filteredMarkets.sort((a, b) => new Date(a.resolutionDate) - new Date(b.resolutionDate));
      break;
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Category and Sort */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Categories */}
          <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-2">
            {MARKET_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-800">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm">
          Showing {filteredMarkets.length} {filteredMarkets.length === 1 ? 'market' : 'markets'}
        </p>
      </div>

      {/* Market Grid */}
      {filteredMarkets.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No markets found</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market) => (
            <MarketCard 
              key={market.id} 
              market={market} 
              onClick={onMarketClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
