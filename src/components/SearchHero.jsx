import { useState, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  Compass,
  Sparkles,
  Church,
  Castle,
  Utensils,
  Landmark,
  Mountain,
  X,
  Loader2
} from 'lucide-react';
import { searchLocations } from '../services/placesApi';

const CATEGORIES = [
  { id: 'all', label: 'All Places', icon: Sparkles },
  { id: 'temples', label: 'Temples & Spiritual', icon: Church },
  { id: 'monuments', label: 'Monuments & Forts', icon: Castle },
  { id: 'food', label: 'Food & Street Eats', icon: Utensils },
  { id: 'museums', label: 'Museums & Culture', icon: Landmark },
  { id: 'scenic', label: 'Scenic & Natural', icon: Mountain }
];

const TRENDING_SEARCHES = [
  { name: 'Chandigarh', lat: 30.7333, lon: 76.7794, state: 'Chandigarh', boundingBox: [30.65, 30.82, 76.68, 76.88] },
  { name: 'Madurai', lat: 9.9252, lon: 78.1198, state: 'Tamil Nadu', boundingBox: [9.85, 10.02, 78.05, 78.20] },
  { name: 'Leh', lat: 34.1526, lon: 77.5771, state: 'Ladakh', boundingBox: [34.05, 34.25, 77.47, 77.67] },
  { name: 'Varanasi', lat: 25.3176, lon: 82.9739, state: 'Uttar Pradesh', boundingBox: [25.25, 25.40, 82.90, 83.05] },
  { name: 'Shimla', lat: 31.1048, lon: 77.1734, state: 'Himachal Pradesh', boundingBox: [31.02, 31.18, 77.10, 77.25] },
  { name: 'Hampi', lat: 15.3350, lon: 76.4600, state: 'Karnataka', boundingBox: [15.28, 15.38, 76.40, 76.52] },
  { name: 'Amritsar', lat: 31.6200, lon: 74.8765, state: 'Punjab', boundingBox: [31.55, 31.70, 74.80, 74.95] },
  { name: 'Munnar', lat: 10.0889, lon: 77.0595, state: 'Kerala', boundingBox: [10.02, 10.15, 77.00, 77.12] },
  { name: 'Kanyakumari', lat: 8.0883, lon: 77.5385, state: 'Tamil Nadu', boundingBox: [8.02, 8.15, 77.48, 77.60] }
];

export default function SearchHero({
  selectedLocation,
  onLocationSelect,
  activeCategory = 'all',
  onCategoryChange
}) {
  const [query, setQuery] = useState(selectedLocation?.name || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sync input when selectedLocation changes externally
  useEffect(() => {
    if (selectedLocation?.name) {
      setQuery(selectedLocation.name);
    }
  }, [selectedLocation]);

  // Debounced search for locations
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setIsDropdownOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await searchLocations(query);
        setSuggestions(results);
        setIsDropdownOpen(results.length > 0);
      } catch (err) {
        console.error('Location search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (loc) => {
    setQuery(loc.name);
    setIsDropdownOpen(false);
    if (onLocationSelect) {
      onLocationSelect({
        name: loc.name,
        lat: loc.lat,
        lon: loc.lon,
        state: loc.state,
        displayName: loc.displayName || `${loc.name}, ${loc.state}`,
        boundingBox: loc.boundingBox || null
      });
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-6">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-500/30">
          <Compass className="w-3.5 h-3.5 animate-spin" />
          <span>Pan-India Open Location Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Explore Any City or District Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-amber-300">India</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
          Search any city, district, town, or sacred pilgrimage. Real-time extraction of temples, monuments, local eateries, and scenic vistas powered by OpenStreetMap Nominatim & Overpass QL.
        </p>
      </div>

      {/* Autocomplete Search Bar */}
      <div ref={dropdownRef} className="relative max-w-2xl">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-sky-400">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setIsDropdownOpen(true)}
            placeholder="Type any Indian city, district, or town (e.g. Leh, Madurai, Varanasi, Shimla)..."
            className="w-full bg-slate-800/90 backdrop-blur-md border-2 border-slate-700 hover:border-sky-500/50 focus:border-sky-500 text-white placeholder-slate-400 rounded-2xl pl-12 pr-10 py-4 text-sm font-medium focus:outline-none shadow-xl transition-all"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setIsDropdownOpen(false);
              }}
              className="absolute right-4 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Autocomplete Suggestions Dropdown */}
        {isDropdownOpen && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-72 overflow-y-auto">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
              Matching Destinations in India
            </p>
            <div className="space-y-1">
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors hover:bg-slate-800 text-slate-200 hover:text-white group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-xs">{item.name}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-md">{item.displayName}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-sky-400 font-mono hidden sm:inline">
                    {item.lat.toFixed(2)}°N, {item.lon.toFixed(2)}°E
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trending Search Tags */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">
          Trending:
        </span>
        {TRENDING_SEARCHES.map((item) => (
          <button
            key={item.name}
            onClick={() => handleSelect(item)}
            className="px-3 py-1 rounded-xl bg-slate-800/80 hover:bg-sky-500/20 text-slate-300 hover:text-sky-300 border border-slate-700 hover:border-sky-500/30 transition-all text-xs font-semibold flex items-center gap-1"
          >
            <span>{item.name}</span>
            <span className="text-[10px] text-slate-500">({item.state})</span>
          </button>
        ))}
      </div>

      {/* Category Filter Pills */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange && onCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30 scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
