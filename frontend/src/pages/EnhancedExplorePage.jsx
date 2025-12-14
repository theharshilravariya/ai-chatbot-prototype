import { useState } from 'react';
import { MarketList } from '../components/dashboard/MarketList';
import { useMarkets } from '../hooks/useMarkets';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { TrendingUp, Flame, Star, Search, SlidersHorizontal, Newspaper, ExternalLink, Clock } from 'lucide-react';
import { MARKET_CATEGORIES } from '../lib/constants';
import { formatTimeAgo } from '../lib/formatters';

export const EnhancedExplorePage = ({ onMarketClick }) => {
  const { data: markets, isLoading } = useMarkets();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [volumeFilter, setVolumeFilter] = useState('all');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Mock trending news
  const trendingNews = [
    {
      id: 1,
      title: 'Bitcoin Rally Continues as Institutional Adoption Grows',
      source: 'CryptoNews',
      category: 'Crypto',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      sentiment: 0.8,
    },
    {
      id: 2,
      title: 'Federal Reserve Signals Potential Rate Cuts in 2025',
      source: 'Bloomberg',
      category: 'Finance',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      sentiment: 0.6,
    },
    {
      id: 3,
      title: 'AI Companies Report Record Growth Despite Regulatory Concerns',
      source: 'TechCrunch',
      category: 'Technology',
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      sentiment: 0.5,
    },
    {
      id: 4,
      title: 'Election Polls Show Tightening Race in Key Swing States',
      source: 'Reuters',
      category: 'Politics',
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      sentiment: 0.0,
    },
    {
      id: 5,
      title: 'Stock Market Volatility Increases Amid Global Uncertainty',
      source: 'Financial Times',
      category: 'Finance',
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      sentiment: -0.3,
    },
  ];

  const filterMarkets = () => {
    if (!markets) return [];
    
    let filtered = [...markets];
    
    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(m => m.category === selectedCategory);
    }
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(m => 
        m.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Price range filter
    filtered = filtered.filter(m => 
      m.impliedProb >= priceRange[0] && m.impliedProb <= priceRange[1]
    );
    
    // Volume filter
    if (volumeFilter === 'high') {
      filtered = filtered.filter(m => m.volume > 1000000);
    } else if (volumeFilter === 'medium') {
      filtered = filtered.filter(m => m.volume > 500000 && m.volume <= 1000000);
    } else if (volumeFilter === 'low') {
      filtered = filtered.filter(m => m.volume <= 500000);
    }
    
    return filtered;
  };

  const filteredMarkets = filterMarkets();

  // Get category counts
  const getCategoryCount = (category) => {
    if (!markets) return 0;
    if (category === 'All') return markets.length;
    return markets.filter(m => m.category === category).length;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Explore Markets</h1>
        <p className="text-gray-400">Discover trending prediction markets and opportunities</p>
      </div>

      {/* Quick Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:bg-white/10 transition border-2 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-orange-500" />
              <div>
                <h3 className="text-white font-semibold text-lg">Hot Today</h3>
                <p className="text-gray-400 text-sm">High volume and activity</p>
              </div>
            </div>
            <div className="mt-4 text-3xl font-bold text-orange-500">
              {markets?.filter(m => m.volume > 1000000).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-white/10 transition border-2 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="text-white font-semibold text-lg">Most Traded</h3>
                <p className="text-gray-400 text-sm">Highest trading volume</p>
              </div>
            </div>
            <div className="mt-4 text-3xl font-bold text-green-500">
              {markets?.sort((a, b) => b.volume - a.volume).slice(0, 3).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-white/10 transition border-2 border-yellow-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500" />
              <div>
                <h3 className="text-white font-semibold text-lg">Featured</h3>
                <p className="text-gray-400 text-sm">Editor's picks</p>
              </div>
            </div>
            <div className="mt-4 text-3xl font-bold text-yellow-500">
              {markets?.slice(0, 3).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trending News Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-purple-400" />
              Trending News
            </CardTitle>
            <Button variant="ghost" size="sm">
              View All →
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trendingNews.map((article) => (
              <div 
                key={article.id}
                className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition cursor-pointer group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className={`text-xs ${
                      article.sentiment > 0.5 ? 'text-green-400' :
                      article.sentiment < -0.5 ? 'text-red-400' :
                      'text-gray-400'
                    }`}>
                      {article.sentiment > 0.5 ? '↑ Bullish' :
                       article.sentiment < -0.5 ? '↓ Bearish' :
                       '− Neutral'}
                    </span>
                  </div>
                  <h4 className="text-white font-medium mb-2 group-hover:text-purple-400 transition">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(article.publishedAt)}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition flex-shrink-0" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-purple-400" />
              Advanced Filters
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? 'Hide' : 'Show'}
            </Button>
          </div>
        </CardHeader>
        {showAdvanced && (
          <CardContent className="space-y-6">
            {/* Search */}
            <div>
              <label className="text-white font-medium mb-2 block">Search Markets</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-white font-medium mb-2 block">Category</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {MARKET_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {category}
                    <span className="ml-2 text-xs opacity-70">
                      ({getCategoryCount(category)})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-white font-medium mb-2 block">
                Probability Range: {priceRange[0]}% - {priceRange[1]}%
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="flex-1"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="flex-1"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Volume Filter */}
            <div>
              <label className="text-white font-medium mb-2 block">Trading Volume</label>
              <div className="grid grid-cols-4 gap-2">
                {['all', 'high', 'medium', 'low'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setVolumeFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
                      volumeFilter === filter
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Filters */}
            <div className="flex justify-end">
              <Button 
                variant="secondary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setPriceRange([0, 100]);
                  setVolumeFilter('all');
                }}
              >
                Reset All Filters
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {selectedCategory === 'All' ? 'All Markets' : `${selectedCategory} Markets`}
          </h2>
          <p className="text-gray-400">
            {filteredMarkets.length} {filteredMarkets.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        {filteredMarkets.length === 0 ? (
          <Card>
            <CardContent className="py-20 text-center">
              <p className="text-gray-400 text-lg mb-2">No markets found</p>
              <p className="text-gray-500 text-sm">Try adjusting your filters</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets.map((market) => (
              <div key={market.id} onClick={() => onMarketClick(market)}>
                <Card className="cursor-pointer hover:bg-white/10 transition-all transform hover:scale-[1.02] h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="default">{market.category}</Badge>
                      <div className="flex items-center gap-1">
                        {market.impliedProb > 50 ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                        )}
                        <span className={`font-bold text-lg ${market.impliedProb > 50 ? 'text-green-500' : 'text-red-500'}`}>
                          {market.impliedProb}%
                        </span>
                      </div>
                    </div>
                    <h3 className="text-white font-semibold text-base mb-4 line-clamp-2 h-12">
                      {market.question}
                    </h3>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Yes</span>
                        <span>No</span>
                      </div>
                      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="absolute h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                          style={{ width: `${market.impliedProb}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Vol: ${(market.volume / 1000000).toFixed(1)}M</span>
                      <span>Liq: ${(market.liquidity / 1000000).toFixed(1)}M</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
