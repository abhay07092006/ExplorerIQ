import { useState, useEffect, useMemo } from 'react';
import {
  Compass,
  MapPin,
  Search,
  Navigation,
  Bookmark,
  ExternalLink,
  Clock,
  Ticket,
  Sparkles,
  Church,
  Castle,
  Utensils,
  Landmark,
  Mountain,
  Share2,
  Check,
  Info,
  X
} from 'lucide-react';
import {
  PAN_INDIA_REGIONS,
  PAN_INDIA_CATEGORIES,
  fetchPanIndiaPlaces
} from '../services/panIndiaPlacesApi';
import { useAuth } from '../context/AuthContext';
import PlaceCard from './Common/PlaceCard';
import { getPlaceImage, handlePlaceImageError } from '../utils/getPlaceImage';

export default function PanIndiaExplorer() {
  const { user, toggleBookmark, isAuthenticated } = useAuth();

  const [selectedStateId, setSelectedStateId] = useState('rajasthan');
  const [selectedDistrictId, setSelectedDistrictId] = useState('jaipur');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModalPlace, setActiveModalPlace] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Group states and UTs
  const statesList = useMemo(
    () => PAN_INDIA_REGIONS.filter((r) => r.type === 'State'),
    []
  );
  const utList = useMemo(
    () => PAN_INDIA_REGIONS.filter((r) => r.type === 'Union Territory'),
    []
  );

  // Current selected state and districts
  const currentState = useMemo(
    () => PAN_INDIA_REGIONS.find((r) => r.id === selectedStateId) || PAN_INDIA_REGIONS[0],
    [selectedStateId]
  );
  const currentDistricts = currentState.districts || [];
  const currentDistrict = useMemo(
    () => currentDistricts.find((d) => d.id === selectedDistrictId) || currentDistricts[0],
    [currentDistricts, selectedDistrictId]
  );

  // Handle State Change
  const handleStateChange = (e) => {
    const newStateId = e.target.value;
    setSelectedStateId(newStateId);
    const targetState = PAN_INDIA_REGIONS.find((r) => r.id === newStateId);
    if (targetState && targetState.districts.length > 0) {
      setSelectedDistrictId(targetState.districts[0].id);
    }
  };

  // Fetch places when state, district, or category changes
  useEffect(() => {
    let isMounted = true;
    async function loadPlaces() {
      setIsLoading(true);
      try {
        const results = await fetchPanIndiaPlaces({
          stateId: selectedStateId,
          districtId: selectedDistrictId,
          categoryId: selectedCategory,
          customSearch: searchQuery
        });
        if (isMounted) {
          setPlaces(results);
        }
      } catch (err) {
        console.error('Error loading places:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPlaces();
    return () => {
      isMounted = false;
    };
  }, [selectedStateId, selectedDistrictId, selectedCategory, searchQuery]);

  // Check if place is bookmarked by user
  const isBookmarked = (placeId) => {
    return user?.bookmarkedPlaces?.some((b) => b.placeId === placeId);
  };

  const handleBookmarkToggle = async (place) => {
    if (!isAuthenticated) {
      alert('Please sign in to save places to your profile bookmarks.');
      return;
    }
    await toggleBookmark({
      placeId: place.id,
      name: place.name,
      category: place.category,
      city: place.districtName,
      state: place.stateName,
      lat: place.lat,
      lon: place.lon,
      image: place.image,
      description: place.localName || place.name,
      openingHours: place.openingHours
    });
  };

  const handleShare = (place) => {
    const url = place.navigationUrl;
    navigator.clipboard.writeText(url);
    setCopiedId(place.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Category Icon Resolver
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Church':
        return Church;
      case 'Castle':
        return Castle;
      case 'Utensils':
        return Utensils;
      case 'Landmark':
        return Landmark;
      case 'Mountain':
        return Mountain;
      case 'Sparkles':
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4 border border-sky-500/30">
            <Compass className="w-3.5 h-3.5 animate-spin" />
            Exhaustive Pan-India Coverage (36 States & UTs)
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Discover Every Corner of <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-amber-300">India</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Powered by live OpenStreetMap Overpass QL & Wikidata. Explore verified temples, historic forts, regional culinary hotspots, and scenic vistas with GPS navigation.
          </p>
        </div>

        {/* State & District Selectors Bar */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700">
          {/* State Dropdown */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              1. State / Union Territory
            </label>
            <select
              value={selectedStateId}
              onChange={handleStateChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
            >
              <optgroup label="28 States">
                {statesList.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="8 Union Territories">
                {utList.map((ut) => (
                  <option key={ut.id} value={ut.id}>
                    {ut.name} (UT)
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* District Dropdown */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              2. District / City Hub
            </label>
            <select
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
            >
              {currentDistricts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name} ({district.lat.toFixed(2)}°N, {district.lon.toFixed(2)}°E)
                </option>
              ))}
            </select>
          </div>

          {/* Keyword Search */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              3. Filter by Keyword
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g., Fort, Temple, Biryani..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {PAN_INDIA_CATEGORIES.map((cat) => {
          const Icon = getCategoryIcon(cat.icon);
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
                isActive
                  ? 'bg-sky-500 text-white shadow-sky-500/25 shadow-md scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Status & Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <p>
          Showing <span className="font-bold text-slate-800">{places.length}</span> spots in{' '}
          <span className="font-semibold text-sky-600">{currentDistrict?.name}</span>,{' '}
          <span className="font-semibold text-slate-700">{currentState?.name}</span>
        </p>
        {isLoading && (
          <span className="inline-flex items-center gap-1.5 text-sky-500 font-semibold animate-pulse">
            <Compass className="w-3.5 h-3.5 animate-spin" />
            Querying Overpass API...
          </span>
        )}
      </div>

      {/* Places Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm animate-pulse space-y-3"
            >
              <div className="h-44 bg-slate-200 rounded-2xl w-full" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
              <div className="h-8 bg-slate-100 rounded-xl w-full mt-4" />
            </div>
          ))}
        </div>
      ) : places.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(() => {
            const assignedUrls = new Set();
            return places.map((place, idx) => (
              <PlaceCard
                key={place.id || idx}
                place={place}
                city={selectedDistrict?.name}
                index={idx}
                isBookmarked={isBookmarked(place.id)}
                onBookmarkToggle={handleBookmarkToggle}
                onOpenDetails={(p) => setActiveModalPlace(p)}
                assignedUrls={assignedUrls}
              />
            ));
          })()}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3 animate-bounce" />
          <h3 className="text-base font-bold text-slate-800">No Places Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            No places matched your query in {currentDistrict?.name}. Try changing the category filter or search terms.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-sky-500 text-white text-xs font-bold rounded-xl hover:bg-sky-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Place Details Modal */}
      {activeModalPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="relative h-56 bg-slate-900">
              <img
                src={getPlaceImage(activeModalPlace, selectedDistrict?.name)}
                alt={activeModalPlace.name}
                onError={(e) => handlePlaceImageError(e, activeModalPlace, selectedDistrict?.name)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <button
                onClick={() => setActiveModalPlace(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${activeModalPlace.badgeColor} bg-slate-900/80`}>
                  {activeModalPlace.category}
                </span>
                <h3 className="text-xl font-extrabold mt-1 leading-tight">{activeModalPlace.name}</h3>
                <p className="text-xs text-slate-300">
                  {activeModalPlace.districtName}, {activeModalPlace.stateName}
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-600">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl">
                <div>
                  <span className="font-semibold text-slate-400 block text-[10px] uppercase">Opening Hours</span>
                  <span className="font-bold text-slate-800">{activeModalPlace.openingHours}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 block text-[10px] uppercase">Entry Fee</span>
                  <span className="font-bold text-emerald-600">{activeModalPlace.fee}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 block text-[10px] uppercase">GPS Coordinates</span>
                  <span className="font-mono text-slate-700">
                    {activeModalPlace.lat.toFixed(4)}, {activeModalPlace.lon.toFixed(4)}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 block text-[10px] uppercase">Distance</span>
                  <span className="font-bold text-sky-600">{activeModalPlace.distanceKm} km from center</span>
                </div>
              </div>

              {activeModalPlace.wikipedia && (
                <div className="flex items-center justify-between p-3 bg-sky-50 rounded-2xl text-sky-900">
                  <span className="font-medium">Wikipedia Reference:</span>
                  <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(activeModalPlace.wikipedia)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sky-600 hover:underline inline-flex items-center gap-1"
                  >
                    Read Article <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={activeModalPlace.navigationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-center flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Launch Google Maps Navigation
                </a>
                <button
                  onClick={() => handleShare(activeModalPlace)}
                  className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 transition-colors"
                  title="Copy Directions Link"
                >
                  {copiedId === activeModalPlace.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
