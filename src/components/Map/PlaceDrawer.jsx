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
  heritage: { bg: 'bg-purple-100 text-purple-700 border-purple-200', label: 'Heritage & History' },
  temples: { bg: 'bg-amber-100 text-amber-700 border-amber-200', label: 'Temples & Sacred Sites' },
  museums: { bg: 'bg-pink-100 text-pink-700 border-pink-200', label: 'Museums & Culture' },
  food: { bg: 'bg-rose-100 text-rose-700 border-rose-200', label: 'Local Food & Eateries' },
  scenic: { bg: 'bg-emerald-100 text-emerald-700 border-emerald-200', label: 'Parks & Scenic Views' }
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
    bg: 'bg-sky-100 text-sky-700 border-sky-200',
    label: selectedPlace.category
  };

  const handlePlayAudio = () => {
    const speechScript = `${selectedPlace.name} in ${activeCityName}, ${activeState}. ${selectedPlace.shortDesc}. Visiting hours are ${selectedPlace.timing}. Insider traveler tip: ${selectedPlace.tip}`;
    playAudio(speechScript, selectedPlace.name);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closePlaceDrawer}
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md md:max-w-lg bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Hero Image Container */}
          <div className="relative h-64 sm:h-72 w-full flex-shrink-0">
            <img
              src={selectedPlace.image}
              alt={selectedPlace.name}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            {/* Top Bar on Image */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md uppercase tracking-wider ${catStyle.bg}`}>
                {catStyle.label}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(selectedPlace)}
                  className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-lg ${
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
                <button
                  onClick={closePlaceDrawer}
                  className="p-2.5 bg-slate-900/60 hover:bg-slate-900/90 text-white rounded-full backdrop-blur-md transition-all shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title on Image */}
            <div className="absolute bottom-4 left-5 right-5 text-white">
              <div className="flex items-center gap-1.5 text-xs text-sky-300 font-medium mb-1">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>{activeCityName}, {activeState}</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl leading-tight drop-shadow-md">
                {selectedPlace.name}
              </h2>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
            <button
              onClick={handlePlayAudio}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-500/20 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Audio Guide</span>
            </button>
            <button
              onClick={() => {
                closePlaceDrawer();
                setActiveTab('planner');
              }}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-colors"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-amber-500" />
              <span>Add to Plan</span>
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            
            {/* Practical Info Pill Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
                  <Clock className="w-3.5 h-3.5 text-sky-500" />
                  <span>Visiting Hours</span>
                </div>
                <p className="text-xs font-bold text-slate-800">
                  {selectedPlace.timing || 'Sunrise to Sunset'}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
                  <Ticket className="w-3.5 h-3.5 text-amber-500" />
                  <span>Entry Fee</span>
                </div>
                <p className="text-xs font-bold text-slate-800">
                  {selectedPlace.fee || 'Free / Included'}
                </p>
              </div>
            </div>

            {/* Historical Overview */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-sky-600" />
                <h3 className="font-display font-bold text-sm text-slate-900 uppercase tracking-wider">
                  Deep Historical Significance
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed bg-sky-50/50 p-4 rounded-xl border border-sky-100">
                {selectedPlace.shortDesc}
              </p>
            </div>

            {/* Insider Tip / Secret Photo Spot */}
            {selectedPlace.tip && (
              <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex items-start gap-3">
                <div className="p-2 bg-amber-500/20 text-amber-700 rounded-xl flex-shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wider mb-0.5">
                    Insider Travel Secret & Best Photo Spot
                  </h4>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    {selectedPlace.tip}
                  </p>
                </div>
              </div>
            )}

            {/* Local Cuisine & Famous Eateries */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-rose-500" />
                  <h3 className="font-display font-bold text-sm text-slate-900 uppercase tracking-wider">
                    Nearby Famous Local Dishes
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-rose-600">
                  {activeCityName} Specialties
                </span>
              </div>

              <div className="space-y-2.5">
                {activeFoodList.map((food, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900">{food.name}</h4>
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {food.place}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                      {food.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Destination Overview */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl">
              <div className="flex items-center gap-2 mb-1.5">
                <Compass className="w-4 h-4 text-sky-400" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-sky-300">
                  About {activeCityName} Region
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeOverview}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Best Season: {activeBestTime}</span>
                {activeBestDuration && (
                  <span className="text-sky-300 font-semibold">{activeBestDuration}</span>
                )}
              </div>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Coordinates: {selectedPlace.coordinates?.join(', ')}
            </span>
            <button
              onClick={closePlaceDrawer}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Close Drawer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
