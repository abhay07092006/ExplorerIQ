import { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Clock, 
  Ticket, 
  Lightbulb, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  CalendarPlus,
  Landmark,
  Navigation
} from 'lucide-react';
import { useTravel } from '../context/useTravel';

const CATEGORY_FALLBACK_IMAGES = {
  heritage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
  temples: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
  food: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
  museums: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=800&q=80',
  scenic: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
};

const wikiCache = new Map();

export default function PlaceCard({
  place,
  bookmarked = false,
  onToggleBookmark,
  onOpenDrawer,
  onPlanTrip,
  catStyle = { bg: 'bg-sky-50 text-sky-700 border-sky-200', label: 'Highlight' }
}) {
  const { openRoutePlanner } = useTravel();
  const [imageSrc, setImageSrc] = useState(place.image);
  const [isResolvingWiki, setIsResolvingWiki] = useState(false);
  const hasAttemptedWiki = useRef(false);

  // Sync imageSrc when place prop changes
  useEffect(() => {
    setImageSrc(place.image);
    hasAttemptedWiki.current = false;
  }, [place.image, place.name]);

  // Dynamic Wikipedia resolution on error
  const handleImageError = async () => {
    if (hasAttemptedWiki.current) {
      // Final fallback to category-specific photo (never a mismatched monument)
      const normCat = (place.category || 'heritage').toLowerCase();
      setImageSrc(CATEGORY_FALLBACK_IMAGES[normCat] || CATEGORY_FALLBACK_IMAGES.heritage);
      return;
    }

    hasAttemptedWiki.current = true;

    // Check memory cache first
    const cacheKey = place.name.trim().toLowerCase();
    if (wikiCache.has(cacheKey)) {
      const cached = wikiCache.get(cacheKey);
      if (cached) {
        setImageSrc(cached);
        return;
      }
    }

    setIsResolvingWiki(true);
    try {
      const queryName = place.name.replace(/\(.*?\)/g, '').trim();
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(queryName)}&gsrlimit=1&prop=pageimages&pithumbsize=800&format=json&origin=*`;
      const res = await fetch(searchUrl);
      if (res.ok) {
        const data = await res.json();
        const pages = data?.query?.pages;
        if (pages) {
          for (const k in pages) {
            const thumb = pages[k]?.thumbnail?.source;
            if (thumb) {
              wikiCache.set(cacheKey, thumb);
              setImageSrc(thumb);
              setIsResolvingWiki(false);
              return;
            }
          }
        }
      }
    } catch {
      // Ignore network errors
    }

    // Secondary fallback to category photo
    const normCat = (place.category || 'heritage').toLowerCase();
    setImageSrc(CATEGORY_FALLBACK_IMAGES[normCat] || CATEGORY_FALLBACK_IMAGES.heritage);
    setIsResolvingWiki(false);
  };

  return (
    <div className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Image Container with Badges */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={imageSrc}
          alt={place.name}
          onError={handleImageError}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

        {/* Top Bar Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border backdrop-blur-md shadow-xs ${catStyle.bg}`}>
              {catStyle.label}
            </span>
            {place.bestDuration && (
              <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-sky-300 border border-sky-500/30 backdrop-blur-md hidden sm:inline-block">
                {place.bestDuration}
              </span>
            )}
            {place.historicalEra && (
              <span className="px-2 py-1 rounded-full text-[9px] font-semibold bg-black/60 text-amber-300 border border-amber-500/30 backdrop-blur-md hidden lg:inline-flex items-center gap-1">
                <Landmark className="w-2.5 h-2.5" />
                <span className="truncate max-w-[120px]">{place.historicalEra}</span>
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark && onToggleBookmark(place);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
              bookmarked
                ? 'bg-amber-500 text-white'
                : 'bg-slate-900/60 text-white hover:bg-slate-900/90'
            }`}
            title={bookmarked ? 'Saved to Bookmarks' : 'Bookmark this spot'}
          >
            {bookmarked ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Location & Title on Image */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <div className="flex items-center gap-1.5 text-xs text-sky-300 font-medium mb-1">
            <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            <span className="truncate">{place.cityName || place.city}, {place.state}</span>
          </div>
          <h3 className="font-display font-extrabold text-lg text-white leading-snug drop-shadow-sm line-clamp-1">
            {place.name}
          </h3>
        </div>
      </div>

      {/* Card Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Practical Timings & Fees */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
              <Clock className="w-3 h-3 text-sky-500" />
              <span>Hours</span>
            </span>
            <p className="font-bold text-slate-800 text-[11px] truncate">
              {place.timing?.split('(')[0] || 'Open Daily'}
            </p>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
              <Ticket className="w-3 h-3 text-amber-500" />
              <span>Entry Fee</span>
            </span>
            <p className="font-bold text-slate-800 text-[11px] truncate">
              {place.fee || (place.asiFee != null ? (place.asiFee === 0 ? 'Free Entry' : `₹${place.asiFee} (ASI Entry)`) : 'Free Entry')}
            </p>
          </div>
        </div>

        {/* Short Historical Description */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
          {place.description || place.shortDesc}
        </p>

        {/* Insider Tip Badge */}
        {place.tip && (
          <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-start gap-2 text-xs text-amber-900">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed line-clamp-2">
              <span className="font-bold">Insider Tip:</span> {place.tip}
            </p>
          </div>
        )}

        {/* Card Action Buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
          <button
            onClick={() => onOpenDrawer && onOpenDrawer(place)}
            className="flex-1 py-2 px-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1"
          >
            <span>Explore</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => openRoutePlanner && openRoutePlanner(place)}
            className="py-2 px-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs"
            title="Directions & Transit Planner"
          >
            <Navigation className="w-3.5 h-3.5 text-sky-400" />
            <span>Route</span>
          </button>

          <button
            onClick={() => onPlanTrip && onPlanTrip(place)}
            className="py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
            title="Add to Itinerary"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-amber-500" />
            <span>Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
