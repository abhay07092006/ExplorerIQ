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
  catStyle = { bg: 'bg-[#57151E] text-[#E2C46B] border-[#C89B3C]/40', label: 'Highlight' }
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

    const normCat = (place.category || 'heritage').toLowerCase();
    setImageSrc(CATEGORY_FALLBACK_IMAGES[normCat] || CATEGORY_FALLBACK_IMAGES.heritage);
    setIsResolvingWiki(false);
  };

  return (
    <div className="group bg-[#FFF9EF] rounded-3xl border border-[#E2C46B]/40 hover:border-[#C89B3C] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Image Container with Badges */}
      <div className="relative h-56 w-full overflow-hidden bg-[#F7EEDC]">
        <img
          src={imageSrc}
          alt={place.name}
          onError={handleImageError}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#25211D]/90 via-[#25211D]/30 to-transparent" />

        {/* Top Bar Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#57151E]/90 text-[#E2C46B] border border-[#C89B3C]/50 backdrop-blur-md shadow-xs">
              {place.category?.replace(/_/g, ' ') || catStyle.label || 'Heritage'}
            </span>
            {place.bestDuration && (
              <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-[#25211D]/80 text-[#E2C46B] border border-[#E2C46B]/30 backdrop-blur-md hidden sm:inline-block">
                {place.bestDuration}
              </span>
            )}
            {place.historicalEra && (
              <span className="px-2 py-1 rounded-full text-[9px] font-semibold bg-[#25211D]/80 text-[#FFF9EF] border border-[#E2C46B]/30 backdrop-blur-md hidden lg:inline-flex items-center gap-1">
                <Landmark className="w-2.5 h-2.5 text-[#C89B3C]" />
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
                ? 'bg-[#C89B3C] text-[#57151E]'
                : 'bg-[#57151E]/80 text-[#FFF9EF] hover:bg-[#7A1F2B]'
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
          <div className="flex items-center gap-1.5 text-xs text-[#E2C46B] font-semibold mb-1 drop-shadow">
            <MapPin className="w-3.5 h-3.5 text-[#C89B3C] flex-shrink-0" />
            <span className="truncate">{place.cityName || place.districtName || place.city}, {place.state || place.stateName}</span>
            {place.distanceKm && (
              <span className="text-[10px] text-[#FFF9EF]/80 font-normal">
                • {place.distanceKm} km
              </span>
            )}
          </div>
          <h3 className="font-display font-extrabold text-lg text-[#FFF9EF] leading-snug drop-shadow-md line-clamp-1 group-hover:text-[#F3E5AB] transition-colors">
            {place.name}
          </h3>
        </div>
      </div>

      {/* Card Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Practical Timings & Fees */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 bg-[#F7EEDC]/60 rounded-xl border border-[#E2C46B]/30">
            <span className="text-[10px] font-bold text-[#6B4423] uppercase tracking-wider flex items-center gap-1 mb-0.5">
              <Clock className="w-3 h-3 text-[#C89B3C]" />
              <span>Hours</span>
            </span>
            <p className="font-bold text-[#25211D] text-[11px] truncate">
              {place.timing?.split('(')[0] || place.openingHours || '09:00 AM - 06:00 PM'}
            </p>
          </div>

          <div className="p-2.5 bg-[#F7EEDC]/60 rounded-xl border border-[#E2C46B]/30">
            <span className="text-[10px] font-bold text-[#6B4423] uppercase tracking-wider flex items-center gap-1 mb-0.5">
              <Ticket className="w-3 h-3 text-[#D97706]" />
              <span>Entry Fee</span>
            </span>
            <p className="font-bold text-[#25211D] text-[11px] truncate">
              {place.fee || (place.asiFee != null ? (place.asiFee === 0 ? 'Free Entry' : `₹${place.asiFee} (ASI Entry)`) : 'Free Entry')}
            </p>
          </div>
        </div>

        {/* Short Historical Description */}
        <p className="text-xs text-[#4A3E3D] leading-relaxed line-clamp-3">
          {place.description || place.shortDesc || (place.localName && place.localName !== place.name ? `${place.localName} — A celebrated cultural attraction in ${place.cityName || place.districtName || 'India'}.` : 'A celebrated heritage and cultural attraction in India.')}
        </p>

        {/* Insider Tip Badge */}
        {place.tip && (
          <div className="p-3 bg-[#FFF3E3] border border-[#E2C46B]/50 rounded-xl flex items-start gap-2 text-xs text-[#6B4423]">
            <Lightbulb className="w-3.5 h-3.5 text-[#D97706] flex-shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed line-clamp-2">
              <span className="font-bold text-[#57151E]">Insider Tip:</span> {place.tip}
            </p>
          </div>
        )}

        {/* Card Action Buttons */}
        <div className="pt-3 border-t border-[#E2C46B]/30 flex items-center justify-between gap-1.5">
          <button
            onClick={() => onOpenDrawer && onOpenDrawer(place)}
            className="flex-1 py-2 px-2.5 bg-gradient-to-r from-[#7A1F2B] to-[#57151E] hover:from-[#8F2633] hover:to-[#7A1F2B] text-[#FFF9EF] rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1"
          >
            <span>Explore</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#E2C46B]" />
          </button>

          <button
            onClick={() => openRoutePlanner && openRoutePlanner(place)}
            className="py-2 px-2.5 bg-[#C89B3C]/15 hover:bg-[#C89B3C]/25 text-[#7A1F2B] border border-[#C89B3C]/40 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shadow-2xs"
            title="Directions & Transit Planner"
          >
            <Navigation className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Route</span>
          </button>

          <button
            onClick={() => onPlanTrip && onPlanTrip(place)}
            className="py-2 px-2.5 bg-[#F7EEDC] hover:bg-[#EEDFCA] text-[#6B4423] border border-[#E2C46B]/40 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
            title="Add to Itinerary"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
