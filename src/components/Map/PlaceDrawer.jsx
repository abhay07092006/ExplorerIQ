import { 
  X, 
  Clock, 
  Ticket, 
  MapPin, 
  Bookmark, 
  BookmarkCheck, 
  Volume2, 
  Utensils, 
  Compass, 
  CalendarPlus,
  Info,
  Lightbulb
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { handleImageError } from '../../utils/imageUtils';

const CATEGORY_COLORS = {
  heritage: { bg: 'bg-purple-500/20 text-purple-300 border-purple-500/40', label: 'Heritage & History' },
  temples: { bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40', label: 'Temples & Sacred Sites' },
  museums: { bg: 'bg-pink-500/20 text-pink-300 border-pink-500/40', label: 'Museums & Culture' },
  food: { bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40', label: 'Local Food & Eateries' },
  scenic: { bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', label: 'Parks & Scenic Views' }
};

export default function PlaceDrawer() {
  const { 
    selectedPlace, 
    isPlaceDrawerOpen, 
    closePlaceDrawer, 
    toggleBookmark, 
    isBookmarked,
    playAudio,
    currentCity,
    setActiveTab
  } = useTravel();

  if (!isPlaceDrawerOpen || !selectedPlace) return null;

  const activeCityName = selectedPlace.cityName || currentCity.name;
  const activeState = selectedPlace.state || currentCity.state;
  const activeFoodList = selectedPlace.localFoodSpecialties || currentCity.localFoodSpecialties || [];
  const activeOverview = selectedPlace.cityOverview || currentCity.overview;
  const activeBestTime = selectedPlace.bestTimeToVisit || currentCity.bestTimeToVisit;
  const activeBestDuration = selectedPlace.bestDuration || currentCity.bestDuration;

  const bookmarked = isBookmarked(selectedPlace.id);
  const catStyle = CATEGORY_COLORS[selectedPlace.category] || {
    bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    label: selectedPlace.category
  };

  const handlePlayAudio = () => {
    const speechScript = `${selectedPlace.name} in ${activeCityName}, ${activeState}. ${selectedPlace.shortDesc}. Visiting hours are ${selectedPlace.timing}. Insider traveler tip: ${selectedPlace.tip}`;
    playAudio(speechScript, selectedPlace.name);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        onClick={closePlaceDrawer}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md md:max-w-lg bg-[#121824] border-l border-amber-500/30 text-[#E2D9CC] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Hero Image Container */}
          <div className="relative h-64 sm:h-72 w-full flex-shrink-0">
            <img
              src={selectedPlace.image}
              alt={selectedPlace.name}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-[#121824]/30 to-transparent" />

            {/* Top Bar on Image */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-serif font-bold border backdrop-blur-md uppercase tracking-wider ${catStyle.bg}`}>
                {catStyle.label}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(selectedPlace)}
                  className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-lg cursor-pointer ${
                    bookmarked
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-950/70 text-amber-300 hover:bg-slate-950'
                  }`}
                  title={bookmarked ? 'Saved to Bookmarks' : 'Bookmark this spot'}
                >
                  {bookmarked ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={closePlaceDrawer}
                  className="p-2.5 bg-slate-950/70 hover:bg-slate-950 text-slate-300 rounded-full backdrop-blur-md transition-all shadow-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title on Image */}
            <div className="absolute bottom-4 left-5 right-5 text-white">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-serif font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeCityName}, {activeState}</span>
              </div>
              <h2 className="font-serif font-bold text-2xl leading-tight text-[#E2D9CC] drop-shadow-md">
                {selectedPlace.name}
              </h2>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="px-6 py-3 bg-[#0B0F14] border-b border-amber-500/20 flex items-center justify-between gap-3">
            <button
              onClick={handlePlayAudio}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-serif rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Audio Guide</span>
            </button>
            <button
              onClick={() => {
                closePlaceDrawer();
                setActiveTab('planner');
              }}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#1A2232] hover:bg-[#222C3E] text-amber-300 border border-amber-500/30 rounded-xl text-xs font-serif font-semibold transition-colors cursor-pointer"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-amber-400" />
              <span>Add to Plan</span>
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            
            {/* Practical Info Pill Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-[#1A2232]/70 rounded-2xl border border-amber-500/20">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-serif font-semibold mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Visiting Hours</span>
                </div>
                <p className="text-xs font-bold font-serif text-[#E2D9CC]">
                  {selectedPlace.timing || 'Sunrise to Sunset'}
                </p>
              </div>

              <div className="p-3.5 bg-[#1A2232]/70 rounded-2xl border border-amber-500/20">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-serif font-semibold mb-1">
                  <Ticket className="w-3.5 h-3.5 text-amber-400" />
                  <span>Entry Fee</span>
                </div>
                <p className="text-xs font-bold font-serif text-[#E2D9CC]">
                  {selectedPlace.fee || 'Free / Included'}
                </p>
              </div>
            </div>

            {/* Historical Overview */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-amber-400" />
                <h3 className="font-serif font-bold text-xs text-amber-300 uppercase tracking-wider">
                  Deep Historical Significance
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-[#1A2232]/50 p-4 rounded-2xl border border-amber-500/20">
                {selectedPlace.shortDesc}
              </p>
            </div>

            {/* Insider Tip / Secret Photo Spot */}
            {selectedPlace.tip && (
              <div className="p-4 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl flex items-start gap-3">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl flex-shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-amber-300 uppercase tracking-wider mb-0.5">
                    Insider Travel Secret & Best Photo Spot
                  </h4>
                  <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
                    {selectedPlace.tip}
                  </p>
                </div>
              </div>
            )}

            {/* Local Cuisine & Famous Eateries */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-orange-400" />
                  <h3 className="font-serif font-bold text-xs text-amber-300 uppercase tracking-wider">
                    Nearby Famous Local Dishes
                  </h3>
                </div>
                <span className="text-[11px] font-serif font-semibold text-orange-400">
                  {activeCityName} Specialties
                </span>
              </div>

              <div className="space-y-2.5">
                {activeFoodList.map((food, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#1A2232]/70 border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-xs text-[#E2D9CC]">{food.name}</h4>
                      <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                        {food.place}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal font-sans">
                      {food.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Destination Overview */}
            <div className="p-4 bg-[#0B0F14] border border-amber-500/30 text-[#E2D9CC] rounded-2xl">
              <div className="flex items-center gap-2 mb-1.5">
                <Compass className="w-4 h-4 text-amber-400" />
                <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-400">
                  About {activeCityName} Region
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {activeOverview}
              </p>
              <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-slate-400">
                <span>Best Season: {activeBestTime}</span>
                {activeBestDuration && (
                  <span className="text-amber-400 font-serif font-semibold">{activeBestDuration}</span>
                )}
              </div>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-amber-500/20 bg-[#0B0F14] flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-mono">
              Coordinates: {selectedPlace.coordinates?.join(', ')}
            </span>
            <button
              onClick={closePlaceDrawer}
              className="px-4 py-2 bg-[#1A2232] hover:bg-[#222C3E] border border-amber-500/30 text-amber-300 rounded-xl text-xs font-serif font-semibold transition-colors cursor-pointer"
            >
              Close Drawer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
