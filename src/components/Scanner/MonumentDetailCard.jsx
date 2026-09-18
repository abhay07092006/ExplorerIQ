import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Ticket, 
  Volume2, 
  VolumeX, 
  Utensils, 
  Compass, 
  ShieldCheck, 
  Building2, 
  Award, 
  Flame,
  Landmark,
  Calendar
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { handleImageError } from '../../utils/imageUtils';

export default function MonumentDetailCard({ monument, confidence = 99.2, features = [] }) {
  const { playAudio, pauseAudio, audioState, setActiveTab, setCurrentCityId } = useTravel();

  if (!monument) return null;

  const isCurrentAudioPlaying = audioState.isPlaying && audioState.title === monument.name;

  const handleAudioToggle = () => {
    if (isCurrentAudioPlaying) {
      pauseAudio();
    } else {
      playAudio(monument.audioGuideTranscript, monument.name);
    }
  };

  const handleOpenOnMap = () => {
    // Map city name to city ID
    const cityMap = {
      'Agra': 'agra',
      'Jaipur': 'jaipur',
      'Mumbai': 'mumbai',
      'Delhi': 'delhi',
      'Amritsar': 'delhi', // Fallback to Delhi if Amritsar isn't distinct
      'Varanasi': 'varanasi',
      'Kochi': 'kochi',
      'Hampi': 'hampi'
    };
    const targetCityId = cityMap[monument.city] || 'agra';
    setCurrentCityId(targetCityId);
    setActiveTab('explore');
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
      
      {/* Top Identification Header */}
      <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 text-white p-6 sm:p-8 overflow-hidden">
        {monument.primaryImage && (
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src={monument.primaryImage}
              alt={monument.name}
              onError={handleImageError}
              className="w-full h-full object-cover filter blur-[2px] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
          </div>
        )}

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm backdrop-blur-md ${
                monument.isUncatalogued
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                  : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
              }`}>
                <ShieldCheck className={`w-3.5 h-3.5 ${monument.isUncatalogued ? 'text-amber-400' : 'text-emerald-400'}`} />
                <span>{monument.isUncatalogued ? 'Uncatalogued Landmark (Feature Analysis)' : `Match Confidence: ${confidence}%`}</span>
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
                monument.isUncatalogued
                  ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300'
                  : 'bg-sky-500/20 border border-sky-500/40 text-sky-300'
              }`}>
                {monument.isUncatalogued ? 'Architectural Feature Scan' : 'AI Vision Verified'}
              </span>
            </div>

            {!monument.isUncatalogued && (
              <button
                onClick={handleOpenOnMap}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700/80 backdrop-blur-md transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                <span>Locate on Map</span>
              </button>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              {monument.primaryImage && (
                <div className="hidden sm:block w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl flex-shrink-0">
                  <img
                    src={monument.primaryImage}
                    alt={monument.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 text-sm text-sky-300 font-medium mb-1">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>
                    {monument.isUncatalogued
                      ? 'Pan-Indian Architectural Study • Uncatalogued Site'
                      : `${monument.city}, ${monument.state} • ${monument.zone} Zone, ${monument.country}`}
                  </span>
                </div>
                <h1 className="font-display font-black text-2xl sm:text-4xl tracking-tight text-white">
                  {monument.name}
                </h1>
                {monument.hindiName && (
                  <p className="text-base text-slate-300 font-serif italic mt-0.5">
                    {monument.hindiName}
                  </p>
                )}
              </div>
            </div>

            {/* Audio Tour Guide Button */}
            <button
              onClick={handleAudioToggle}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-xs shadow-lg transition-all transform hover:scale-105 active:scale-95 flex-shrink-0 ${
                isCurrentAudioPlaying
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30 ring-2 ring-rose-300'
                  : 'bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white shadow-sky-500/30'
              }`}
            >
              {isCurrentAudioPlaying ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Pause Audio Guide</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Listen to Smart Audio Guide</span>
                </>
              )}
            </button>
          </div>

          {/* UNESCO Status Bar */}
          {monument.unescoStatus && (
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-amber-300">
              <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="font-semibold">{monument.unescoStatus}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-6 sm:p-8 space-y-8">

        {/* Neural Extracted Features Pill Bar */}
        {features && features.length > 0 && (
          <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-2xl">
            <h4 className="text-[11px] uppercase tracking-wider font-bold text-sky-800 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Vision Geometry & Materials Detected</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {features.map((feat, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-white border border-sky-200 text-sky-900 rounded-lg text-xs font-semibold shadow-xs"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Architectural Specification Grid */}
        <div>
          <h3 className="font-display font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-600" />
            <span>Architectural & Construction Specifications</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Architectural Style
              </span>
              <p className="text-xs font-bold text-slate-800 leading-snug">
                {monument.architecturalStyle}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Construction Era
              </span>
              <p className="text-xs font-bold text-slate-800 leading-snug">
                {monument.constructionEra}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Commissioned By
              </span>
              <p className="text-xs font-bold text-slate-800 leading-snug">
                {monument.commissionedBy}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Primary Materials
              </span>
              <p className="text-xs font-bold text-slate-800 leading-snug">
                {monument.material}
              </p>
            </div>
          </div>
        </div>

        {/* Visiting Timings & Ticket Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Timings */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2 text-sky-600 font-bold text-sm mb-3">
              <Clock className="w-4 h-4" />
              <span>Visiting Hours & Schedule</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Opening Hours:</span>
                <span className="font-bold text-slate-800">{monument.openingHours}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Weekly Closing:</span>
                <span className="font-bold text-rose-600">{monument.closedOn}</span>
              </div>
              {monument.bestTimeToVisit && (
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Best Time to Visit:</span>
                  </span>
                  <span className="font-bold text-emerald-600">{monument.bestTimeToVisit}</span>
                </div>
              )}
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Physical Dimensions:</span>
                <span className="font-semibold text-slate-700 text-right">{monument.dimensions}</span>
              </div>
            </div>
          </div>

          {/* Ticket Pricing */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-sm mb-3">
              <Ticket className="w-4 h-4" />
              <span>Official Entry Ticket Fees</span>
            </div>
            <div className="space-y-2 text-xs">
              {Object.entries(monument.ticketPricing || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between py-1.5 border-b border-slate-100 last:border-0 capitalize">
                  <span className="text-slate-500">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="font-bold text-slate-900 bg-amber-50 px-2 py-0.5 rounded text-amber-800">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Architectural Highlights */}
        <div>
          <h3 className="font-display font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Key Architectural Highlights & Mastercraft</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {monument.keyHighlights?.map((highlight, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Legends, Folklore & Fun Facts */}
        {monument.legendsAndFacts && (
          <div className="p-5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 rounded-r-2xl">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1.5">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Local Legend & Historical Lore</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              {monument.legendsAndFacts}
            </p>
          </div>
        )}

        {/* Curated Nearby Restaurants & Food */}
        {monument.nearbyFood && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-rose-500" />
                <span>Nearby Authentic Dining & Street Food</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">Within walking distance</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {monument.nearbyFood.map((food, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-xs text-slate-900">{food.name}</h4>
                    <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                      {food.distance}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-1.5">{food.cuisine}</p>
                  <div className="text-[11px] font-semibold text-rose-600 bg-rose-50/80 p-2 rounded-lg">
                    🍴 Specialty: {food.specialty}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nearby Temples & Attractions */}
        {monument.nearbyAttractions && monument.nearbyAttractions.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-amber-500" />
                <span>Nearby Temples, Forts & Tourist Attractions</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">Adjacent sights to bundle</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {monument.nearbyAttractions.map((attr, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:border-amber-300 transition-colors"
                >
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{attr.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{attr.type}</p>
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full whitespace-nowrap">
                    {attr.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
