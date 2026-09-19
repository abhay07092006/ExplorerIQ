import { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Clock, 
  Ticket, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  CalendarPlus, 
  X, 
  Compass,
  Landmark,
  Utensils,
  Navigation,
  Star,
  Loader2
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { useAuth } from '../../context/AuthContext';
import SearchHero from '../SearchHero';
import PlaceDrawer from '../Map/PlaceDrawer';
import { fetchPlacesNearby } from '../../services/placesApi';
import { getPlaceImage, handlePlaceImageError } from '../../utils/getPlaceImage';

export default function SmartSearchExplorer() {
  const { 
    openPlaceDrawer,
    setActiveTab,
    destinations = []
  } = useTravel();

  const { user, toggleBookmark, isAuthenticated, openAuthModal } = useAuth();

  // Active Location & Category State
  const [selectedLocation, setSelectedLocation] = useState({
    name: 'Jaipur',
    lat: 26.9124,
    lon: 75.7873,
    state: 'Rajasthan'
  });
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [drawerPlace, setDrawerPlace] = useState(null);

  // Fetch places when location or category changes
  useEffect(() => {
    let isMounted = true;
    async function loadPlaces() {
      setIsLoading(true);
      try {
        const results = await fetchPlacesNearby({
          lat: selectedLocation.lat,
          lon: selectedLocation.lon,
          category: activeCategory,
          searchKeyword,
          cityName: selectedLocation.name
        });
        if (isMounted) {
          setPlaces(results);
        }
      } catch (err) {
        console.error('Error fetching places:', err);
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
  }, [selectedLocation, activeCategory, searchKeyword]);

  const isPlaceBookmarked = (placeId) => {
    return user?.bookmarkedPlaces?.some((b) => b.placeId === placeId);
  };

  const handleBookmark = async (place) => {
    if (!isAuthenticated) {
      openAuthModal('signin');
      return;
    }
    await toggleBookmark({
      placeId: place.id,
      name: place.name,
      category: place.category,
      city: selectedLocation.name,
      state: selectedLocation.state,
      lat: place.lat,
      lon: place.lon,
      image: place.image,
      openingHours: place.openingHours
    });
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      {/* 1. Open Autocomplete Search Hero */}
      <SearchHero
        selectedLocation={selectedLocation}
        onLocationSelect={(loc) => setSelectedLocation(loc)}
        activeCategory={activeCategory}
        onCategoryChange={(cat) => setActiveCategory(cat)}
      />

      {/* 2. Results Header & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>Places & Attractions in {selectedLocation.name}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold">
              {places.length} found
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time discoveries within a 20km radius around {selectedLocation.name}, {selectedLocation.state}
          </p>
        </div>

        {/* Local search refinement input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Refine list by name..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
          />
          {searchKeyword && (
            <button
              onClick={() => setSearchKeyword('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Places Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm animate-pulse space-y-3">
              <div className="h-44 bg-slate-200 rounded-2xl w-full" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
              <div className="h-8 bg-slate-100 rounded-xl w-full mt-4" />
            </div>
          ))}
        </div>
      ) : places.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {places.map((place) => {
            const saved = isPlaceBookmarked(place.id);
            return (
              <div
                key={place.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-sky-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail & Badges */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={getPlaceImage(place, selectedLocation?.name)}
                      alt={place.name}
                      onError={(e) => handlePlaceImageError(e, place.category)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category Tag */}
                    <span className={`absolute top-3 left-3 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border backdrop-blur-md shadow-sm ${place.badgeColor} bg-slate-900/80`}>
                      {place.category}
                    </span>

                    {/* Bookmark Action */}
                    <button
                      onClick={() => handleBookmark(place)}
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
                        saved
                          ? 'bg-amber-500 text-slate-950 shadow-md'
                          : 'bg-black/40 text-white hover:bg-black/60'
                      }`}
                      title={saved ? 'Remove Bookmark' : 'Save to Bookmarks'}
                    >
                      <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                    </button>

                    {/* Rating & Distance */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-semibold drop-shadow">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{place.distanceKm} km away</span>
                      </span>
                      {place.rating && (
                        <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                          <Star className="w-3 h-3 text-amber-400 fill-current" />
                          <span>{place.rating}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-sky-600 transition-colors">
                      {place.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {place.address || `${selectedLocation.name}, ${selectedLocation.state}`}
                    </p>

                    <div className="pt-1 flex flex-wrap gap-1.5 text-[11px]">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="truncate max-w-[120px]">{place.openingHours}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-medium">
                        <Ticket className="w-3 h-3 text-emerald-600" />
                        <span>{place.fee}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <a
                    href={place.navigationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Navigate</span>
                  </a>

                  <button
                    onClick={() => {
                      if (openPlaceDrawer) {
                        openPlaceDrawer({
                          ...place,
                          cityName: selectedLocation.name,
                          state: selectedLocation.state,
                          shortDesc: `${place.name} located in ${selectedLocation.name}.`
                        });
                      }
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto animate-bounce" />
          <h3 className="text-base font-bold text-slate-800">No Places Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No places matched your query around {selectedLocation.name}. Try changing the category filter or searching a different city.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchKeyword('');
            }}
            className="px-4 py-2 bg-sky-500 text-white text-xs font-bold rounded-xl hover:bg-sky-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Place Drawer */}
      <PlaceDrawer />
    </div>
  );
}
