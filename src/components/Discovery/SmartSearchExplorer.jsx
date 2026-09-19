import { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Clock, 
  Ticket, 
  Lightbulb, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  CalendarPlus, 
  X, 
  Compass,
  Landmark,
  Flame,
  Image as ImageIcon,
  Utensils,
  Trees,
  Filter
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { CATEGORY_FILTERS } from '../../constants/categories';
import PlaceDrawer from '../Map/PlaceDrawer';
import PlaceCard from '../PlaceCard';
import { handleImageError } from '../../utils/imageUtils';

const ICON_MAP = {
  Sparkles,
  Landmark,
  Flame,
  Image: ImageIcon,
  Utensils,
  Trees
};

const CATEGORY_STYLES = {
  heritage: { bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-[#8B5CF6]', label: 'History & Heritage' },
  temples: { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-[#F59E0B]', label: 'Temples & Spiritual Sites' },
  food: { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-[#EF4444]', label: 'Local Food & Eateries' },
  museums: { bg: 'bg-pink-50 text-pink-700 border-pink-200', dot: 'bg-[#EC4899]', label: 'Museums & Cultural Galleries' },
  scenic: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-[#10B981]', label: 'Parks & Scenic Spots' }
};

const POPULAR_SEARCH_SUGGESTIONS = [
  'Taj Mahal',
  'Kolkata',
  'Amritsar',
  'Goa',
  'Udaipur',
  'Hampi',
  'Madurai',
  'Shimla',
  'Varanasi',
  'Srinagar'
];

export default function SmartSearchExplorer() {
  const { 
    setCurrentCityId, 
    activeCategories, 
    toggleCategory, 
    openPlaceDrawer,
    toggleBookmark,
    isBookmarked,
    setActiveTab,
    destinations = [],
    allPlaces = []
  } = useTravel();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCityFilter, setSelectedCityFilter] = useState('all'); // 'all' or cityId

  // Filter destination places matching search query, selected city, and category filters
  const filteredPlaces = useMemo(() => {
    return allPlaces.filter((place) => {
      // City Filter
      const matchesCity = selectedCityFilter === 'all' || place.cityId === selectedCityFilter;

      // Category Filter (multi-select)
      const matchesCategory = activeCategories.includes(place.category);

      // Search query filter (matches place name, city, state, description, category, or tips)
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = query === '' ||
        place.name.toLowerCase().includes(query) ||
        place.cityName.toLowerCase().includes(query) ||
        place.state.toLowerCase().includes(query) ||
        place.shortDesc.toLowerCase().includes(query) ||
        place.category.toLowerCase().includes(query) ||
        (place.tip && place.tip.toLowerCase().includes(query));

      return matchesCity && matchesCategory && matchesSearch;
    });
  }, [allPlaces, searchQuery, selectedCityFilter, activeCategories]);

  // Calculate live count per category
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') {
      return allPlaces.filter((p) =>
        selectedCityFilter === 'all' || p.cityId === selectedCityFilter
      ).length;
    }
    return allPlaces.filter((p) => {
      const cityMatch = selectedCityFilter === 'all' || p.cityId === selectedCityFilter;
      return cityMatch && p.category === categoryId;
    }).length;
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCityFilter('all');
    if (activeCategories.length < 5) {
      toggleCategory('all');
    }
  };

  const isAllCategoriesActive = activeCategories.length === 5;

  return (
    <div className="w-full space-y-6">
      
      {/* Hero Search & Discovery Header */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden border border-slate-700">
        
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Interactive Smart Destination Discovery</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Discover Heritage, Temples & Street Eateries
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Search across India's premier tourist destinations by city, monument, or culinary secret.
            Refine using intelligent category filters to plan your cultural voyage.
          </p>

          {/* Instant Search Bar */}
          <div className="relative max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center bg-white rounded-2xl shadow-2xl p-1.5 border-2 border-sky-400/40 focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-500/20 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-3.5 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search destination, city, or monument (e.g. "Jaipur", "Varanasi", "Taj Mahal")...'
                className="w-full px-3 py-3 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 mr-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                className="px-5 py-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-500/30 transition-all flex-shrink-0 hidden sm:block"
              >
                Search
              </button>
            </div>
          </div>

          {/* Quick Search Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold mr-1">Popular:</span>
            {POPULAR_SEARCH_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setSearchQuery(suggestion)}
                className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-[11px] text-slate-300 hover:text-white transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Destination City Filter Strip */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sky-500" />
            <h2 className="font-display font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-wider">
              Filter by Destination Hub
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {destinations.length} Cultural Regions
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
          <button
            onClick={() => setSelectedCityFilter('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border snap-start ${
              selectedCityFilter === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4 text-sky-400" />
            <span>All Regions ({allPlaces.length})</span>
          </button>

          {destinations.map((city) => {
            const isSelected = selectedCityFilter === city.id;
            return (
              <button
                key={city.id}
                onClick={() => setSelectedCityFilter(city.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border snap-start ${
                  isSelected
                    ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <img
                  src={city.heroImage}
                  alt={city.name}
                  onError={handleImageError}
                  className="w-5 h-5 rounded-full object-cover border border-white/40"
                />
                <span>{city.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {city.places.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Category Filter Pills Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider flex-shrink-0">
          <Filter className="w-4 h-4 text-sky-500" />
          <span>Category Filters:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-wrap">
          {CATEGORY_FILTERS.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Sparkles;
            const isAll = cat.id === 'all';
            const isActive = isAll ? isAllCategoriesActive : activeCategories.includes(cat.id);
            const count = getCategoryCount(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.8 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Results Metadata Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800">
            Showing {filteredPlaces.length} Destinations
          </span>
          {searchQuery && (
            <span className="text-xs text-slate-500">
              for "<span className="font-semibold text-sky-600">{searchQuery}</span>"
            </span>
          )}
          {selectedCityFilter !== 'all' && (
            <span className="text-xs text-slate-500">
              in <span className="font-semibold text-slate-700 capitalize">{selectedCityFilter}</span>
            </span>
          )}
        </div>

        {(searchQuery || selectedCityFilter !== 'all' || activeCategories.length < 5) && (
          <button
            onClick={handleResetFilters}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Destination Cards Grid */}
      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => {
            const bookmarked = isBookmarked(place.id);
            const catStyle = CATEGORY_STYLES[place.category] || {
              bg: 'bg-sky-50 text-sky-700 border-sky-200',
              label: place.category
            };

            return (
              <PlaceCard
                key={place.id}
                place={place}
                bookmarked={bookmarked}
                catStyle={catStyle}
                onToggleBookmark={toggleBookmark}
                onOpenDrawer={openPlaceDrawer}
                onPlanTrip={(p) => {
                  setCurrentCityId(p.cityId);
                  setActiveTab('planner');
                }}
              />
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto p-8">
          <Compass className="w-14 h-14 text-sky-500 mx-auto mb-3 animate-pulse" />
          <h3 className="font-display font-bold text-lg text-slate-900">
            No Destinations Found
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
            We couldn't find any places matching your current search "{searchQuery}" and active category filters.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

      {/* Slide-over Detail Drawer */}
      <PlaceDrawer />

    </div>
  );
}
