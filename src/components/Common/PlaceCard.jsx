import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Ticket, 
  ExternalLink, 
  Bookmark, 
  Navigation, 
  Star,
  Sparkles
} from 'lucide-react';
import { 
  getPlacePhoto, 
  fetchWikipediaPlacePhoto, 
  handlePlacePhotoError 
} from '../../utils/getPlaceImage';

export default function PlaceCard({
  place,
  city = '',
  index = 0,
  isBookmarked = false,
  onBookmarkToggle,
  onOpenDetails
}) {
  const [imageSrc, setImageSrc] = useState(() => getPlacePhoto(place, city, index));
  const [isOfficialWiki, setIsOfficialWiki] = useState(false);

  // Dynamically resolve authentic official photograph of this specific place
  useEffect(() => {
    let isMounted = true;

    // If place already has an official direct image, update immediately
    if (
      place.image &&
      typeof place.image === 'string' &&
      place.image.startsWith('http') &&
      !place.image.includes('source.unsplash.com')
    ) {
      setImageSrc(place.image);
      setIsOfficialWiki(false);
      return;
    }

    // Default to authentic category photo first
    setImageSrc(getPlacePhoto(place, city, index));
    setIsOfficialWiki(false);

    async function loadOfficialPhoto() {
      try {
        const wikiPhoto = await fetchWikipediaPlacePhoto(place.name, city);
        if (isMounted && wikiPhoto) {
          setImageSrc(wikiPhoto);
          setIsOfficialWiki(true);
        }
      } catch {
        // Fallback authentic photo remains active
      }
    }

    loadOfficialPhoto();

    return () => {
      isMounted = false;
    };
  }, [place.name, place.image, city, index]);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-sky-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Thumbnail & Badges */}
        <div className="relative h-48 overflow-hidden bg-slate-900">
          <img
            src={imageSrc}
            alt={place.name}
            onError={(e) => handlePlacePhotoError(e, place.category, index)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

          {/* Category Tag */}
          <span
            className={`absolute top-3 left-3 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border backdrop-blur-md shadow-sm ${
              place.badgeColor || 'bg-slate-900/80 text-sky-300 border-sky-500/30'
            }`}
          >
            {place.category}
          </span>

          {/* Official Photo Badge */}
          {isOfficialWiki && (
            <span className="absolute bottom-10 left-3 inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-md bg-black/60 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Official Photo</span>
            </span>
          )}

          {/* Bookmark Action */}
          <button
            onClick={() => onBookmarkToggle && onBookmarkToggle(place)}
            className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
              isBookmarked
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-black/40 text-white hover:bg-black/60'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Save to Bookmarks'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Rating & Distance */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-semibold drop-shadow">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{place.distanceKm || '0.5'} km away</span>
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
            {place.address || `${city || 'Local area'}, India`}
          </p>

          <div className="pt-1 flex flex-wrap gap-1.5 text-[11px]">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">
              <Clock className="w-3 h-3 text-slate-400" />
              <span className="truncate max-w-[120px]">{place.openingHours || '09:00 AM - 06:00 PM'}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-medium">
              <Ticket className="w-3 h-3 text-emerald-600" />
              <span>{place.fee || 'Free Entry'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <a
          href={place.navigationUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + (city || ''))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Navigate</span>
        </a>

        <button
          onClick={() => onOpenDetails && onOpenDetails(place)}
          className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>
      </div>
    </div>
  );
}
