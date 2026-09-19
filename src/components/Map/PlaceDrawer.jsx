import { api } from '../../services/api';
import { useState, useEffect } from 'react';
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
  Lightbulb, 
  Navigation 
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { handleImageError } from '../../utils/imageUtils';

const CATEGORY_COLORS = {
  heritage: { bg: 'bg-[#57151E] text-[#E2C46B] border-[#C89B3C]/50', label: 'Heritage & History' },
  temples: { bg: 'bg-[#D97706]/90 text-[#FFF9EF] border-[#D97706]', label: 'Temples & Sacred Sites' },
  museums: { bg: 'bg-[#6B4423]/90 text-[#FFF9EF] border-[#6B4423]', label: 'Museums & Culture' },
  food: { bg: 'bg-[#B65C3A]/90 text-[#FFF9EF] border-[#B65C3A]', label: 'Local Food & Eateries' },
  scenic: { bg: 'bg-[#234A3A]/90 text-[#FFF9EF] border-[#234A3A]', label: 'Parks & Scenic Views' }
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
    setActiveTab, 
    openRoutePlanner 
  } = useTravel();

  const [liveEateries, setLiveEateries] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    if (selectedPlace?.coordinates && selectedPlace.coordinates.length === 2) {
      api.getNearbyEateries(selectedPlace.coordinates[0], selectedPlace.coordinates[1])
        .then((data) => {
          if (!isCancelled) {
            setLiveEateries(data?.eateries?.length > 0 ? data.eateries : null);
          }
        })
        .catch(() => {
          if (!isCancelled) setLiveEateries(null);
        });
    }
    return () => {
      isCancelled = true;
    };
  }, [selectedPlace]);

  if (!isPlaceDrawerOpen || !selectedPlace) return null;

  const activeCityName = selectedPlace.cityName || selectedPlace.districtName || currentCity?.name || 'India';
  const activeState = selectedPlace.state || selectedPlace.stateName || currentCity?.state || '';
  const activeFoodList = liveEateries || selectedPlace.localFoodSpecialties || currentCity?.localFoodSpecialties || [];
  const activeOverview = selectedPlace.cityOverview || currentCity?.overview || '';
  const activeBestTime = selectedPlace.bestTimeToVisit || currentCity?.bestTimeToVisit || 'October to March';
  const activeBestDuration = selectedPlace.bestDuration || currentCity?.bestDuration || '';

  const bookmarked = isBookmarked(selectedPlace.id);
  const catStyle = CATEGORY_COLORS[selectedPlace.category] || {
    bg: 'bg-[#57151E] text-[#E2C46B] border-[#C89B3C]/50',
    label: selectedPlace.category || 'Heritage'
  };

  const handlePlayAudio = () => {
    const speechScript = `${selectedPlace.name} in ${activeCityName}, ${activeState}. ${selectedPlace.shortDesc || selectedPlace.description}. Visiting hours are ${selectedPlace.timing || selectedPlace.openingHours || 'Standard hours'}. Insider traveler tip: ${selectedPlace.tip || 'Explore early morning for serene views.'}`;
    playAudio(speechScript, selectedPlace.name);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closePlaceDrawer}
        className="absolute inset-0 bg-[#25211D]/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md md:max-w-lg bg-[#FFF9EF] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-[#E2C46B]/40">
          
          {/* Hero Image Container */}
          <div className="relative h-64 sm:h-72 w-full flex-shrink-0 bg-[#25211D]">
            <img
              src={selectedPlace.image}
              alt={selectedPlace.name}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#25211D] via-[#25211D]/30 to-transparent" />

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
                <button
                  onClick={closePlaceDrawer}
                  className="p-2.5 bg-[#57151E]/80 hover:bg-[#7A1F2B] text-white rounded-full backdrop-blur-md transition-all shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title on Image */}
            <div className="absolute bottom-4 left-5 right-5 text-white">
              <div className="flex items-center gap-1.5 text-xs text-[#E2C46B] font-semibold mb-1 drop-shadow">
                <MapPin className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>{activeCityName}, {activeState}</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl leading-tight drop-shadow-md text-[#FFF9EF]">
                {selectedPlace.name}
              </h2>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="px-6 py-3 bg-[#F7EEDC] border-b border-[#E2C46B]/40 flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={handlePlayAudio}
              className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#7A1F2B] to-[#57151E] hover:from-[#8F2633] hover:to-[#7A1F2B] text-[#FFF9EF] rounded-xl text-xs font-bold shadow-xs transition-all"
            >
              <Volume2 className="w-4 h-4 text-[#E2C46B]" />
              <span>Audio Guide</span>
            </button>
            <button
              onClick={() => {
                closePlaceDrawer();
                openRoutePlanner && openRoutePlanner(selectedPlace);
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#C89B3C]/20 hover:bg-[#C89B3C]/30 text-[#7A1F2B] border border-[#C89B3C]/40 rounded-xl text-xs font-bold transition-colors shadow-2xs"
              title="Get Directions & Route Options"
            >
              <Navigation className="w-3.5 h-3.5 text-[#C89B3C]" />
              <span>Plan Route</span>
            </button>
            <button
              onClick={() => {
                closePlaceDrawer();
                setActiveTab('planner');
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#FFF9EF] hover:bg-white text-[#6B4423] border border-[#E2C46B]/40 rounded-xl text-xs font-semibold transition-colors"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Add to Plan</span>
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            
            {/* Practical Info Pill Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#F7EEDC]/60 rounded-xl border border-[#E2C46B]/30">
                <div className="flex items-center gap-1.5 text-[#6B4423] text-xs font-semibold mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>Visiting Hours</span>
                </div>
                <p className="text-xs font-bold text-[#25211D]">
                  {selectedPlace.timing || selectedPlace.openingHours || 'Sunrise to Sunset'}
                </p>
              </div>

              <div className="p-3 bg-[#F7EEDC]/60 rounded-xl border border-[#E2C46B]/30">
                <div className="flex items-center gap-1.5 text-[#6B4423] text-xs font-semibold mb-1">
                  <Ticket className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Entry Fee</span>
                </div>
                <p className="text-xs font-bold text-[#25211D]">
                  {selectedPlace.fee || 'Free Entry / ASI Verified'}
                </p>
              </div>
            </div>

            {/* Historical Overview */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-[#7A1F2B]" />
                <h3 className="font-display font-bold text-sm text-[#57151E] uppercase tracking-wider">
                  Deep Historical Significance
                </h3>
              </div>
              <p className="text-sm text-[#4A3E3D] leading-relaxed bg-[#FCF8F2] p-4 rounded-xl border border-[#E2C46B]/30">
                {selectedPlace.shortDesc || selectedPlace.description || (selectedPlace.localName ? `${selectedPlace.name} (${selectedPlace.localName}) is an iconic cultural treasure in ${activeCityName}, ${activeState}.` : 'An iconic cultural and heritage landmark in India.')}
              </p>
            </div>

            {/* Insider Tip / Secret Photo Spot */}
            {selectedPlace.tip && (
              <div className="p-4 bg-[#FFF3E3] border border-[#E2C46B]/60 rounded-2xl flex items-start gap-3">
                <div className="p-2 bg-[#D97706]/15 text-[#D97706] rounded-xl flex-shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#57151E] uppercase tracking-wider mb-0.5">
                    Insider Travel Secret & Best Photo Spot
                  </h4>
                  <p className="text-xs text-[#6B4423] leading-relaxed">
                    {selectedPlace.tip}
                  </p>
                </div>
              </div>
            )}

            {/* Local Cuisine & Famous Eateries */}
            {activeFoodList.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-[#B65C3A]" />
                    <h3 className="font-display font-bold text-sm text-[#57151E] uppercase tracking-wider">
                      Nearby Famous Local Dishes
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-[#B65C3A]">
                    {activeCityName} Specialties
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeFoodList.map((food, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#FCF8F2] border border-[#E2C46B]/40 rounded-xl hover:border-[#C89B3C] transition-colors flex items-center gap-3"
                    >
                      {food.image && (
                        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#F7EEDC] border border-[#E2C46B]/30">
                          <img
                            src={food.image}
                            alt={food.name}
                            onError={handleImageError}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-xs text-[#25211D] truncate">{food.name}</h4>
                          <span className="text-[10px] text-[#6B4423] bg-[#F7EEDC] px-2 py-0.5 rounded-full flex-shrink-0 font-medium">
                            {food.place}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6B4423] mt-1 leading-normal line-clamp-2">
                          {food.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regional Destination Overview */}
            {activeOverview && (
              <div className="p-4 bg-gradient-to-br from-[#420E15] to-[#57151E] text-[#FFF9EF] rounded-2xl border border-[#E2C46B]/30 shadow-md">
                <div className="flex items-center gap-2 mb-1.5">
                  <Compass className="w-4 h-4 text-[#E2C46B]" />
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#E2C46B]">
                    About {activeCityName} Region
                  </h4>
                </div>
                <p className="text-xs text-[#F7EEDC]/85 leading-relaxed">
                  {activeOverview}
                </p>
                <div className="mt-3 pt-3 border-t border-[#E2C46B]/20 flex items-center justify-between text-[11px] text-[#E2C46B]">
                  <span>Best Season: {activeBestTime}</span>
                  {activeBestDuration && (
                    <span className="text-[#FFF9EF] font-semibold">{activeBestDuration}</span>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-[#E2C46B]/30 bg-[#F7EEDC] flex items-center justify-between">
            <span className="text-xs text-[#6B4423]">
              {selectedPlace.coordinates?.length === 2 ? `GPS: ${selectedPlace.coordinates.join(', ')}` : selectedPlace.lat && selectedPlace.lon ? `GPS: ${selectedPlace.lat.toFixed(3)}°N, ${selectedPlace.lon.toFixed(3)}°E` : 'Verified Heritage Landmark'}
            </span>
            <button
              onClick={closePlaceDrawer}
              className="px-4 py-2 bg-[#57151E] hover:bg-[#7A1F2B] text-[#FFF9EF] rounded-xl text-xs font-bold transition-colors shadow-2xs"
            >
              Close Drawer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
