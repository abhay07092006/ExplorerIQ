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
  heritage: {
    bg: 'bg-[#FFF8E7] text-[#6B1E2B] border-[#C9972B]',
    dot: 'bg-[#C9972B]',
    label: 'History & Heritage'
  },

  temples: {
    bg: 'bg-[#FFF3E0] text-[#A44A3F] border-[#D88924]',
    dot: 'bg-[#D88924]',
    label: 'Temples & Spiritual Sites'
  },

  food: {
    bg: 'bg-[#FCEEEA] text-[#A44A3F] border-[#D8A095]',
    dot: 'bg-[#A44A3F]',
    label: 'Local Food & Eateries'
  },

  museums: {
    bg: 'bg-[#F3EDEA] text-[#6B1E2B] border-[#B98C7C]',
    dot: 'bg-[#6B1E2B]',
    label: 'Museums & Cultural Galleries'
  },

  scenic: {
    bg: 'bg-[#F4E7D0] text-[#304C6E] border-[#D8B98A]',
    dot: 'bg-[#304C6E]',
    label: 'Parks & Scenic Spots'
  }
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
  const [selectedCityFilter, setSelectedCityFilter] = useState('all');

  // Filter destination places matching search query, selected city, and category filters
  const filteredPlaces = useMemo(() => {
    return allPlaces.filter((place) => {
      // City Filter
      const matchesCity =
        selectedCityFilter === 'all' ||
        place.cityId === selectedCityFilter;

      // Category Filter (multi-select)
      const matchesCategory = activeCategories.includes(place.category);

      // Search query filter
      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        query === '' ||
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
      return allPlaces.filter(
        (p) =>
          selectedCityFilter === 'all' ||
          p.cityId === selectedCityFilter
      ).length;
    }

    return allPlaces.filter((p) => {
      const cityMatch =
        selectedCityFilter === 'all' ||
        p.cityId === selectedCityFilter;

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
      <div className="relative bg-gradient-to-br from-[#3D2925] via-[#6B1E2B] to-[#304C6E] text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden border border-[#7A3940]">

        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D88924]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9972B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D88924]/20 border border-[#D88924]/40 text-[#F4D58D] text-xs font-bold">
            <Sparkles className="w-4 h-4 text-[#C9972B]" />
            <span>Interactive Smart Destination Discovery</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Discover Heritage, Temples & Street Eateries
          </h1>

          <p className="text-xs sm:text-sm text-[#F4E7D0] max-w-2xl mx-auto leading-relaxed">
            Search across India's premier tourist destinations by city, monument, or culinary secret.
            Refine using intelligent category filters to plan your cultural voyage.
          </p>

          {/* Instant Search Bar */}
          <div className="relative max-w-2xl mx-auto pt-2">

            <div className="relative flex items-center bg-white rounded-2xl shadow-2xl p-1.5 border-2 border-[#C9972B]/40 focus-within:border-[#C9972B] focus-within:ring-4 focus-within:ring-[#C9972B]/20 transition-all">

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
                  className="p-1.5 mr-1 text-slate-400 hover:text-[#6B1E2B] rounded-lg transition-colors"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                className="px-5 py-3 bg-gradient-to-r from-[#D88924] to-[#6B1E2B] hover:from-[#C2761D] hover:to-[#54202A] text-white rounded-xl text-xs font-bold shadow-md shadow-[#6B1E2B]/30 transition-all flex-shrink-0 hidden sm:block"
              >
                Search
              </button>

            </div>
          </div>

          {/* Quick Search Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-xs">

            <span className="text-[#E5CDB5] text-[11px] font-semibold mr-1">
              Popular:
            </span>

            {POPULAR_SEARCH_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setSearchQuery(suggestion)}
                className="px-2.5 py-1 rounded-full bg-[#54202A]/80 hover:bg-[#7A3940] border border-[#7A3940] text-[11px] text-[#F4E7D0] hover:text-white transition-colors"
              >
                {suggestion}
              </button>
            ))}

          </div>
        </div>
      </div>

      {/* Destination City Filter Strip */}
      <div className="bg-white rounded-2xl p-4 border border-[#E5D5C1] shadow-xs">

        <div className="flex items-center justify-between mb-3">

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#A44A3F]" />

            <h2 className="font-display font-bold text-xs sm:text-sm text-[#3D2925] uppercase tracking-wider">
              Filter by Destination Hub
            </h2>
          </div>

          <span className="text-xs text-[#7A665E] font-medium">
            {destinations.length} Cultural Regions
          </span>

        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">

          <button
            onClick={() => setSelectedCityFilter('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border snap-start ${
              selectedCityFilter === 'all'
                ? 'bg-[#6B1E2B] text-white border-[#6B1E2B] shadow-sm'
                : 'bg-[#FFF8E7] text-[#6B1E2B] border-[#E5D5C1] hover:bg-[#F4E7D0]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#C9972B]" />
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
                    ? 'bg-[#D88924] text-white border-[#D88924] shadow-md shadow-[#D88924]/20'
                    : 'bg-[#FFF8E7] text-[#6B1E2B] border-[#E5D5C1] hover:bg-[#F4E7D0]'
                }`}
              >
                <img
                  src={city.heroImage}
                  alt={city.name}
                  onError={handleImageError}
                  className="w-5 h-5 rounded-full object-cover border border-white/40"
                />

                <span>{city.name}</span>

                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected
                      ? 'bg-white/25 text-white'
                      : 'bg-[#E8DCCB] text-[#6B1E2B]'
                  }`}
                >
                  {city.places.length}
                </span>
              </button>
            );
          })}

        </div>
      </div>

      {/* Interactive Category Filter Pills Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E5D5C1] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">

        <div className="flex items-center gap-2 text-[#3D2925] font-bold text-xs uppercase tracking-wider flex-shrink-0">
          <Filter className="w-4 h-4 text-[#C9972B]" />
          <span>Category Filters:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-wrap">

          {CATEGORY_FILTERS.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Sparkles;
            const isAll = cat.id === 'all';
            const isActive = isAll
              ? isAllCategoriesActive
              : activeCategories.includes(cat.id);

            const count = getCategoryCount(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.8 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-[#6B1E2B] text-white border-[#6B1E2B] shadow-xs'
                    : 'bg-[#FFF8E7] text-[#6B1E2B] border-[#E5D5C1] hover:bg-[#F4E7D0]'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: cat.color
                  }}
                />

                <Icon className="w-3.5 h-3.5" />

                <span>{cat.label}</span>

                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#E8DCCB] text-[#6B1E2B]'
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

          <span className="text-xs font-bold text-[#3D2925]">
            Showing {filteredPlaces.length} Destinations
          </span>

          {searchQuery && (
            <span className="text-xs text-[#7A665E]">
              for "
              <span className="font-semibold text-[#A44A3F]">
                {searchQuery}
              </span>
              "
            </span>
          )}

          {selectedCityFilter !== 'all' && (
            <span className="text-xs text-[#7A665E]">
              in{' '}
              <span className="font-semibold text-[#6B1E2B] capitalize">
                {selectedCityFilter}
              </span>
            </span>
          )}

        </div>

        {(searchQuery ||
          selectedCityFilter !== 'all' ||
          activeCategories.length < 5) && (
          <button
            onClick={handleResetFilters}
            className="text-xs font-semibold text-[#A44A3F] hover:text-[#6B1E2B] flex items-center gap-1"
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
              bg: 'bg-[#FFF8E7] text-[#6B1E2B] border-[#E5D5C1]',
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
        <div className="py-20 text-center bg-white rounded-3xl border border-[#E5D5C1] shadow-sm max-w-xl mx-auto p-8">

          <Compass className="w-14 h-14 text-[#C9972B] mx-auto mb-3 animate-pulse" />

          <h3 className="font-display font-bold text-lg text-[#3D2925]">
            No Destinations Found
          </h3>

          <p className="text-xs text-[#7A665E] mt-1 max-w-md mx-auto leading-relaxed">
            We couldn't find any places matching your current search "
            {searchQuery}" and active category filters.
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">

            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#6B1E2B] hover:bg-[#54202A] text-white text-xs font-bold rounded-xl shadow transition-colors"
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