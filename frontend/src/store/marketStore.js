import { create } from 'zustand';

export const useMarketStore = create((set, get) => ({
  markets: [],
  selectedMarket: null,
  filter: {
    category: 'All',
    search: '',
    sortBy: 'volume_desc',
  },
  
  setMarkets: (markets) => set({ markets }),
  
  setSelectedMarket: (market) => set({ selectedMarket: market }),
  
  updateMarketPrice: (marketId, yesPrice, noPrice) => {
    set((state) => ({
      markets: state.markets.map((market) =>
        market.id === marketId
          ? { ...market, yesPrice, noPrice, impliedProb: yesPrice * 100 }
          : market
      ),
      selectedMarket:
        state.selectedMarket?.id === marketId
          ? { ...state.selectedMarket, yesPrice, noPrice, impliedProb: yesPrice * 100 }
          : state.selectedMarket,
    }));
  },
  
  setFilter: (filter) => set((state) => ({ filter: { ...state.filter, ...filter } })),
  
  getFilteredMarkets: () => {
    const { markets, filter } = get();
    let filtered = [...markets];
    
    // Category filter
    if (filter.category !== 'All') {
      filtered = filtered.filter((m) => m.category === filter.category);
    }
    
    // Search filter
    if (filter.search) {
      const search = filter.search.toLowerCase();
      filtered = filtered.filter((m) =>
        m.question.toLowerCase().includes(search)
      );
    }
    
    // Sort
    switch (filter.sortBy) {
      case 'volume_desc':
        filtered.sort((a, b) => b.volume - a.volume);
        break;
      case 'volume_asc':
        filtered.sort((a, b) => a.volume - b.volume);
        break;
      case 'prob_desc':
        filtered.sort((a, b) => b.impliedProb - a.impliedProb);
        break;
      case 'prob_asc':
        filtered.sort((a, b) => a.impliedProb - b.impliedProb);
        break;
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case 'ending_soon':
        filtered.sort((a, b) => new Date(a.resolutionDate) - new Date(b.resolutionDate));
        break;
    }
    
    return filtered;
  },
}));
