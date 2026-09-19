import { useState, useMemo, useEffect, useCallback } from 'react';
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
  Filter,
  RefreshCw,
  Building2,
  Church,
  Castle,
  Mountain,
  AlertCircle
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import PlaceDrawer from '../Map/PlaceDrawer';
import PlaceCard from '../PlaceCard';
import { handleImageError } from '../../utils/imageUtils';
import {
  PAN_INDIA_REGIONS,
  PAN_INDIA_CATEGORIES,
  fetchPanIndiaPlaces
} from '../../services/panIndiaPlacesApi';

const CATEGORY_ICONS = {
  all: Sparkles,
  temples: Church,
  monuments: Castle,
  food: Utensils,
  museums: Landmark,
  scenic: Mountain,
  heritage: Castle
};

const POPULAR_SEARCH_SUGGESTIONS = [
  'Taj Mahal',
  'Hawa Mahal',
  'Golden Temple',
  'Meenakshi Temple',
  'Qutub Minar',
  'Varanasi Ghats',
  'Hampi',
  'Goa',
  'Udaipur Lake Palace',
  'Amber Fort'
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

  // State / District Pan-India Selection
  const [selectedStateId, setSelectedStateId] = useState('rajasthan');
  const [selectedDistrictId, setSelectedDistrictId] = useState('jaipur');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCityFilter, setSelectedCityFilter] = useState('all'); // 'all' or cityId from curated hubs
  
  // Live Overpass API state
  const [overpassPlaces, setOverpassPlaces] = useState([]);
  const [isLoadingOverpass, setIsLoadingOverpass] = useState(false);
  const [overpassError, setOverpassError] = useState(null);

  // Group states and UTs
  const statesList = useMemo(
    () => PAN_INDIA_REGIONS.filter((r) => r.type === 'State'),
    []
  );
  const utList = useMemo(
    () => PAN_INDIA_REGIONS.filter((r) => r.type === 'Union Territory'),
    []
  );

  // Current State & Districts
  const currentState = useMemo(
    () => PAN_INDIA_REGIONS.find((r) => r.id === selectedStateId) || PAN_INDIA_REGIONS[0],
    [selectedStateId]
  );
  const currentDistricts = currentState?.districts || [];
  const currentDistrict = useMemo(
    () => currentDistricts.find((d) => d.id === selectedDistrictId) || currentDistricts[0],
    [currentDistricts, selectedDistrictId]
  );

  // Handle State Change
  const handleStateChange = (e) => {
    const newStateId = e.target.value;
    setSelectedStateId(newStateId);
    setSelectedCityFilter('all');
    const targetState = PAN_INDIA_REGIONS.find((r) => r.id === newStateId);
    if (targetState && targetState.districts.length > 0) {
      setSelectedDistrictId(targetState.districts[0].id);
    }
  };

  // Load Pan-India places via live Overpass API
  const loadPanIndiaData = useCallback(async () => {
    setIsLoadingOverpass(true);
    setOverpassError(null);
    try {
      const results = await fetchPanIndiaPlaces({
        stateId: selectedStateId,
        districtId: selectedDistrictId,
        categoryId: selectedCategory,
        customSearch: searchQuery
      });
      setOverpassPlaces(results || []);
    } catch (err) {
      console.warn('[SmartSearchExplorer] Overpass loading error:', err);
      setOverpassError('Some stories are taking longer to arrive.');
    } finally {
      setIsLoadingOverpass(false);
    }
  }, [selectedStateId, selectedDistrictId, selectedCategory, searchQuery]);

  useEffect(() => {
    loadPanIndiaData();
  }, [loadPanIndiaData]);

  // Handle Selecting a Curated Destination Hub (e.g. Delhi, Agra, Jaipur, etc.)
  const handleSelectHub = (city) => {
    if (city === 'all') {
      setSelectedCityFilter('all');
      return;
    }
    setSelectedCityFilter(city.id);
    
    // Find matching state and district in PAN_INDIA_REGIONS
    const cityNameLower = city.name.toLowerCase();
    for (const reg of PAN_INDIA_REGIONS) {
      const foundDist = reg.districts.find(
        (d) => cityNameLower.includes(d.name.toLowerCase()) || d.name.toLowerCase().includes(cityNameLower)
      );
      if (foundDist) {
        setSelectedStateId(reg.id);
        setSelectedDistrictId(foundDist.id);
        break;
      }
    }
  };

  // Combine curated places with Overpass places
  const combinedPlaces = useMemo(() => {
    // Curated places matching filters
    const matchingCurated = allPlaces.filter((place) => {
      // City Filter
      const matchesCity = selectedCityFilter === 'all' || place.cityId === selectedCityFilter;

      // Category Filter
      const normCat = place.category?.toLowerCase() || '';
      let matchesCategory = true;
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'temples') {
          matchesCategory = normCat.includes('temple') || normCat.includes('spiritual');
        } else if (selectedCategory === 'monuments') {
          matchesCategory = normCat.includes('heritage') || normCat.includes('monument') || normCat.includes('fort');
        } else if (selectedCategory === 'food') {
          matchesCategory = normCat.includes('food') || normCat.includes('eatery');
        } else if (selectedCategory === 'museums') {
          matchesCategory = normCat.includes('museum') || normCat.includes('gallery');
        } else if (selectedCategory === 'scenic') {
          matchesCategory = normCat.includes('scenic') || normCat.includes('park') || normCat.includes('nature');
        }
      }

      // Keyword query
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = query === '' ||
        place.name.toLowerCase().includes(query) ||
        (place.cityName && place.cityName.toLowerCase().includes(query)) ||
        (place.city && place.city.toLowerCase().includes(query)) ||
        (place.state && place.state.toLowerCase().includes(query)) ||
        (place.shortDesc && place.shortDesc.toLowerCase().includes(query)) ||
        (place.description && place.description.toLowerCase().includes(query)) ||
        (place.tip && place.tip.toLowerCase().includes(query));

      return matchesCity && matchesCategory && matchesSearch;
    });

    // If a specific curated hub is selected, prefer curated places
    if (selectedCityFilter !== 'all' && matchingCurated.length > 0) {
      return matchingCurated;
    }

    // Otherwise merge Overpass places and curated places avoiding duplicates by name
    const seenNames = new Set();
    const result = [];

    for (const p of matchingCurated) {
      const key = p.name.trim().toLowerCase();
      if (!seenNames.has(key)) {
        seenNames.add(key);
        result.push(p);
      }
    }

    for (const p of overpassPlaces) {
      const key = p.name.trim().toLowerCase();
      if (!seenNames.has(key)) {
        seenNames.add(key);
        result.push(p);
      }
    }

    return result;
  }, [allPlaces, overpassPlaces, selectedCityFilter, selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCityFilter('all');
    setSelectedCategory('all');
  };

  return (
    <div className="w-full space-y-7 animate-in fade-in duration-300">
      
      {/* =========================================================================
          HERO SECTION: "Explore the Soul of India" - Deep Maroon, Antique Gold
          ========================================================================= */}
      <div className="relative bg-gradient-to-br from-[#420E15] via-[#57151E] to-[#7A1F2B] text-[#FFF9EF] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden border border-[#E2C46B]/30">
        
        {/* Subtle Heritage Architectural & Jaali Background Accents */}
        <div 
          className="absolute inset-0 opacity-8 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#E2C46B 1px, transparent 1px), radial-gradient(#E2C46B 1px, #57151E 1px)`,
            backgroundSize: '28px 28px',
            backgroundPosition: '0 0, 14px 14px'
          }}
        />
        
        {/* Warm Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C89B3C]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D97706]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          
          {/* Elegant Heritage Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C89B3C]/20 border border-[#E2C46B]/40 text-[#E2C46B] text-xs font-bold uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E2C46B]" />
            <span>PAN-INDIA HERITAGE EXPLORER</span>
          </div>

          {/* Major Brand Tagline */}
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#FFF9EF] tracking-tight leading-tight drop-shadow-sm">
            Explore the Soul of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E2C46B] via-[#F3E5AB] to-[#C89B3C]">
              India
            </span>
          </h1>

          {/* Supporting Heritage Copy */}
          <p className="text-xs sm:text-sm text-[#F7EEDC]/85 max-w-2xl mx-auto leading-relaxed">
            Discover India's heritage, culture, cuisine and hidden stories — from royal forts and sacred temples to vibrant streets and breathtaking landscapes.
          </p>

          {/* =========================================================================
              PAN-INDIA SEARCH & SELECTION CONTROLS (State, District & Keyword Search)
              ========================================================================= */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 bg-[#FFF9EF] p-4 sm:p-5 rounded-2xl border border-[#E2C46B]/50 shadow-2xl text-[#25211D] text-left">
            
            {/* 1. State / Union Territory Dropdown */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B4423] mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>1. State / Union Territory</span>
              </label>
              <select
                value={selectedStateId}
                onChange={handleStateChange}
                className="w-full bg-[#FCF8F2] border border-[#E2C46B]/40 rounded-xl px-3 py-2.5 text-xs text-[#25211D] focus:outline-hidden focus:ring-2 focus:ring-[#C89B3C] font-semibold"
              >
                <optgroup label="🏛️ 28 States">
                  {statesList.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🌐 8 Union Territories">
                  {utList.map((ut) => (
                    <option key={ut.id} value={ut.id}>
                      {ut.name} (UT)
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* 2. District / City Hub Dropdown */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B4423] mb-1.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#D97706]" />
                <span>2. District / City Hub</span>
              </label>
              <select
                value={selectedDistrictId}
                onChange={(e) => {
                  setSelectedDistrictId(e.target.value);
                  setSelectedCityFilter('all');
                }}
                className="w-full bg-[#FCF8F2] border border-[#E2C46B]/40 rounded-xl px-3 py-2.5 text-xs text-[#25211D] focus:outline-hidden focus:ring-2 focus:ring-[#C89B3C] font-semibold"
              >
                {currentDistricts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name} ({district.lat.toFixed(2)}°N, {district.lon.toFixed(2)}°E)
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Keyword Search Input */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B4423] mb-1.5 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-[#57151E]" />
                <span>3. Search by Keyword</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Amber Fort, Taj Mahal, Biryani..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FCF8F2] border border-[#E2C46B]/40 rounded-xl pl-8 pr-7 py-2.5 text-xs text-[#25211D] placeholder-[#6B4423]/50 focus:outline-hidden focus:ring-2 focus:ring-[#C89B3C] font-medium"
                />
                <Search className="w-3.5 h-3.5 text-[#6B4423] absolute left-2.5 top-3" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-2.5 text-[#6B4423] hover:text-[#57151E]"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Popular Search Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 text-xs">
            <span className="text-[#E2C46B] text-[11px] font-bold mr-1">Popular Discoveries:</span>
            {POPULAR_SEARCH_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setSearchQuery(suggestion)}
                className="px-2.5 py-1 rounded-full bg-[#57151E]/70 hover:bg-[#7A1F2B] border border-[#E2C46B]/30 text-[11px] text-[#FFF9EF] transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* =========================================================================
          DESTINATION / REGION HUBS STRIP: Ivory cards, maroon text, gold accents
          ========================================================================= */}
      <div className="bg-[#FFF9EF] rounded-2xl p-4 border border-[#E2C46B]/40 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#7A1F2B]" />
            <h2 className="font-display font-bold text-xs sm:text-sm text-[#57151E] uppercase tracking-wider">
              Cultural Regions & Premier Hubs
            </h2>
          </div>
          <span className="text-xs text-[#6B4423] font-medium">
            {destinations.length} Curated Destination Hubs
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
          <button
            onClick={() => handleSelectHub('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border snap-start ${
              selectedCityFilter === 'all'
                ? 'bg-[#57151E] text-[#FFF9EF] border-[#57151E] shadow-sm'
                : 'bg-[#FCF8F2] text-[#6B4423] border-[#E2C46B]/40 hover:bg-[#F7EEDC]'
            }`}
          >
            <Compass className={`w-4 h-4 ${selectedCityFilter === 'all' ? 'text-[#E2C46B]' : 'text-[#7A1F2B]'}`} />
            <span>All Hubs ({combinedPlaces.length})</span>
          </button>

          {destinations.map((city) => {
            const isSelected = selectedCityFilter === city.id;
            return (
              <button
                key={city.id}
                onClick={() => handleSelectHub(city)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border snap-start ${
                  isSelected
                    ? 'bg-[#57151E] text-[#FFF9EF] border-[#57151E] shadow-sm'
                    : 'bg-[#FCF8F2] text-[#6B4423] border-[#E2C46B]/40 hover:bg-[#F7EEDC]'
                }`}
              >
                <img
                  src={city.heroImage}
                  alt={city.name}
                  onError={handleImageError}
                  className="w-5 h-5 rounded-full object-cover border border-[#E2C46B]/50"
                />
                <span>{city.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-[#C89B3C] text-[#57151E]' : 'bg-[#F7EEDC] text-[#6B4423]'
                }`}>
                  {city.places?.length || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          CATEGORY FILTERS: Deep Maroon Active, Warm Ivory Inactive with Gold
          ========================================================================= */}
      <div className="bg-[#FFF9EF] rounded-2xl p-4 border border-[#E2C46B]/40 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[#57151E] font-bold text-xs uppercase tracking-wider flex-shrink-0">
          <Filter className="w-4 h-4 text-[#C89B3C]" />
          <span>Heritage Categories:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-wrap">
          {PAN_INDIA_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Sparkles;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-[#57151E] text-[#FFF9EF] border-[#57151E] shadow-sm scale-[1.02]'
                    : 'bg-[#FFF9EF] text-[#25211D] border-[#E2C46B]/50 hover:bg-[#F7EEDC] hover:border-[#C89B3C]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E2C46B]' : 'text-[#C89B3C]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          RESULTS COUNT & LIVE STATUS BAR
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-xs text-[#6B4423]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-[#25211D]">
            Showing <span className="text-[#57151E] font-extrabold">{combinedPlaces.length}</span> Destinations
          </span>
          <span className="text-[#6B4423]">
            in <span className="font-bold text-[#7A1F2B]">{currentDistrict?.name}</span>, <span className="font-semibold text-[#25211D]">{currentState?.name}</span>
          </span>
          {searchQuery && (
            <span className="text-[#6B4423]">
              matching "<span className="font-bold text-[#57151E]">{searchQuery}</span>"
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isLoadingOverpass && (
            <span className="inline-flex items-center gap-1.5 text-[#C89B3C] font-bold animate-pulse">
              <Compass className="w-3.5 h-3.5 animate-spin text-[#C89B3C]" />
              <span>Discovering India's stories...</span>
            </span>
          )}

          {(searchQuery || selectedCityFilter !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-[#7A1F2B] hover:text-[#57151E] flex items-center gap-1 transition-colors"
            >
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          DESTINATION CARDS GRID OR SKELETON LOADING
          ========================================================================= */}
      {isLoadingOverpass ? (
        /* Warm Heritage Ivory/Cream Skeleton Cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-[#FFF9EF] rounded-3xl p-4 border border-[#E2C46B]/30 shadow-xs animate-pulse space-y-3"
            >
              <div className="h-52 bg-[#F7EEDC] rounded-2xl w-full" />
              <div className="h-4 bg-[#F7EEDC] rounded w-3/4" />
              <div className="h-3 bg-[#FCF8F2] rounded w-1/2" />
              <div className="h-9 bg-[#F7EEDC] rounded-xl w-full mt-4" />
            </div>
          ))}
        </div>
      ) : combinedPlaces.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {combinedPlaces.map((place) => {
            const bookmarked = isBookmarked(place.id);
            return (
              <PlaceCard
                key={place.id}
                place={place}
                bookmarked={bookmarked}
                onToggleBookmark={toggleBookmark}
                onOpenDrawer={openPlaceDrawer}
                onPlanTrip={(p) => {
                  setCurrentCityId(p.cityId || 'jaipur');
                  setActiveTab('planner');
                }}
              />
            );
          })}
        </div>
      ) : (
        /* Empty / Polished Error State */
        <div className="py-16 text-center bg-[#FFF9EF] rounded-3xl border border-[#E2C46B]/50 shadow-xs max-w-xl mx-auto p-8 space-y-3">
          <Compass className="w-12 h-12 text-[#C89B3C] mx-auto mb-2 animate-pulse" />
          <h3 className="font-display font-bold text-lg text-[#25211D]">
            {overpassError || 'No Heritage Destinations Found'}
          </h3>
          <p className="text-xs text-[#6B4423] max-w-md mx-auto leading-relaxed">
            {overpassError 
              ? 'Please try the discovery again or refine your search parameters.'
              : `We couldn't find any places matching "${searchQuery}" in ${currentDistrict?.name}. Try changing your category filter or search terms.`}
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            {overpassError ? (
              <button
                onClick={loadPanIndiaData}
                className="px-5 py-2.5 bg-[#57151E] hover:bg-[#7A1F2B] text-[#FFF9EF] text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#E2C46B]" />
                <span>Retry Discovery</span>
              </button>
            ) : (
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-[#57151E] hover:bg-[#7A1F2B] text-[#FFF9EF] text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Slide-over Detail Drawer */}
      <PlaceDrawer />

    </div>
  );
}
