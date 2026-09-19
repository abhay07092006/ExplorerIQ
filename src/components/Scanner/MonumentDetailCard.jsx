import { useState } from 'react';
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
  Calendar,
  Bookmark,
  Share2,
  Check,
  BookOpen,
  Info
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { handleImageError } from '../../utils/imageUtils';

export default function MonumentDetailCard({ monument, confidence = 99.2, features = [] }) {
  const { playAudio, pauseAudio, audioState, setActiveTab, setCurrentCityId, toggleBookmark, isBookmarked } = useTravel();
  const [activeTab, setActiveTabLocal] = useState('about'); // 'about' | 'architecture' | 'visiting' | 'gastronomy'
  const [copied, setCopied] = useState(false);

  if (!monument) return null;

  const isCurrentAudioPlaying = audioState.isPlaying && audioState.title === monument.name;
  const saved = isBookmarked ? isBookmarked(monument.id) : false;

  const handleAudioToggle = () => {
    if (isCurrentAudioPlaying) {
      pauseAudio();
    } else {
      playAudio(monument.audioGuideTranscript, monument.name);
    }
  };

  const handleOpenOnMap = () => {
    const cityMap = {
      'Agra': 'agra',
      'Jaipur': 'jaipur',
      'Mumbai': 'mumbai',
      'Delhi': 'delhi',
      'Amritsar': 'delhi',
      'Varanasi': 'varanasi',
      'Kochi': 'kochi',
      'Hampi': 'hampi'
    };
    const targetCityId = cityMap[monument.city] || 'agra';
    setCurrentCityId(targetCityId);
    setActiveTab('explore');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      const shareText = `${monument.name} - ${monument.city}, ${monument.state}. Identified via ExplorerIQ AI Vision.`;
      navigator.clipboard.writeText(shareText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="w-full bg-[#121824] rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
      
      {/* Top Banner with Badges & Action bar */}
      <div className="bg-[#0B0F14] border-b border-amber-500/20 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold font-serif flex items-center gap-1.5 shadow-sm backdrop-blur-md ${
            monument.isUncatalogued
              ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300'
              : 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
          }`}>
            <ShieldCheck className={`w-3.5 h-3.5 ${monument.isUncatalogued ? 'text-amber-400' : 'text-emerald-400'}`} />
            <span>{monument.isUncatalogued ? 'Uncatalogued Landmark (Feature Analysis)' : `Match Confidence: ${confidence}%`}</span>
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-serif font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300">
            {monument.isUncatalogued ? 'Architectural Feature Scan' : 'AI Vision Verified'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {toggleBookmark && (
            <button
              onClick={() => toggleBookmark(monument)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-serif font-semibold border transition-colors cursor-pointer ${
                saved 
                  ? 'bg-amber-500 text-slate-950 border-amber-400' 
                  : 'bg-[#1A2232] text-amber-300 border-amber-500/30 hover:border-amber-400'
              }`}
              title={saved ? 'Remove Bookmark' : 'Save to Heritage Bookmarks'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A2232] hover:bg-[#222C3E] text-amber-300 rounded-xl text-xs font-serif font-semibold border border-amber-500/30 transition-colors cursor-pointer"
            title="Share Landmark"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
          </button>

          {!monument.isUncatalogued && (
            <button
              onClick={handleOpenOnMap}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-serif font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Locate on Map</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Large Hero Image + Key Facts Dossier */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Monument Image with Gold Border & Gradient Overlay */}
          <div className="relative group rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-xl bg-slate-950 aspect-[4/3]">
            <img
              src={monument.primaryImage}
              alt={monument.name}
              onError={handleImageError}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/40 to-transparent" />
            
            {/* Overlay Title at bottom of photo */}
            <div className="absolute bottom-0 inset-x-0 p-4">
              <div className="flex items-center gap-1.5 text-xs text-amber-300/90 font-serif mb-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {monument.isUncatalogued
                    ? 'Pan-Indian Architectural Study'
                    : `${monument.city}, ${monument.state} • ${monument.zone} Zone`}
                </span>
              </div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#E2D9CC] leading-tight">
                {monument.name}
              </h2>
              {monument.hindiName && (
                <p className="text-sm text-amber-200/80 font-serif italic mt-0.5">
                  {monument.hindiName}
                </p>
              )}
            </div>
          </div>

          {/* Audio Guide Player Action Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1A2232] to-[#121824] border border-amber-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 text-amber-400">
                <Volume2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-serif font-bold text-xs text-[#E2D9CC] truncate">Smart Audio Tour</h4>
                <p className="text-[11px] text-slate-400 truncate">AI voice narrative of {monument.name}</p>
              </div>
            </div>
            <button
              onClick={handleAudioToggle}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-serif font-bold text-xs shadow-lg transition-all flex-shrink-0 cursor-pointer ${
                isCurrentAudioPlaying
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/40 ring-2 ring-rose-400'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20'
              }`}
            >
              {isCurrentAudioPlaying ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </>
              )}
            </button>
          </div>

          {/* UNESCO Status */}
          {monument.unescoStatus && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
              <Award className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-serif font-bold block text-amber-300 mb-0.5">Heritage Status</span>
                <span className="text-[11px] text-slate-300 leading-relaxed">{monument.unescoStatus}</span>
              </div>
            </div>
          )}

          {/* Key Architectural & Historical Facts Dossier */}
          <div className="p-5 rounded-2xl bg-[#1A2232]/70 border border-amber-500/20 space-y-3">
            <h3 className="font-serif font-bold text-xs tracking-wider uppercase text-amber-400 flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Architectural Specifications</span>
            </h3>

            <div className="space-y-2.5 text-xs divide-y divide-slate-800/80">
              <div className="pt-2 flex justify-between gap-2">
                <span className="text-slate-400 font-medium">Style:</span>
                <span className="text-[#E2D9CC] font-serif font-bold text-right">{monument.architecturalStyle || 'Classical Indian'}</span>
              </div>
              <div className="pt-2 flex justify-between gap-2">
                <span className="text-slate-400 font-medium">Era:</span>
                <span className="text-[#E2D9CC] font-serif font-bold text-right">{monument.constructionEra || 'Historical'}</span>
              </div>
              <div className="pt-2 flex justify-between gap-2">
                <span className="text-slate-400 font-medium">Commissioned:</span>
                <span className="text-[#E2D9CC] font-serif font-bold text-right">{monument.commissionedBy || 'Historic Dynasty'}</span>
              </div>
              <div className="pt-2 flex justify-between gap-2">
                <span className="text-slate-400 font-medium">Primary Material:</span>
                <span className="text-[#E2D9CC] font-serif text-right text-[11px] max-w-[65%]">{monument.material || 'Carved Stone'}</span>
              </div>
              {monument.dimensions && (
                <div className="pt-2 flex justify-between gap-2">
                  <span className="text-slate-400 font-medium">Dimensions:</span>
                  <span className="text-[#E2D9CC] font-serif text-right text-[11px] max-w-[65%]">{monument.dimensions}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: 4 Structured Tabs (About, Architecture, Visiting, Gastronomy) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          
          {/* Tab Navigation Header */}
          <div className="flex border-b border-amber-500/20 gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'about', label: 'Narrative & History', icon: BookOpen },
              { id: 'architecture', label: 'Architecture & Craft', icon: Building2 },
              { id: 'visiting', label: 'Visiting & Tickets', icon: Ticket },
              { id: 'gastronomy', label: 'Nearby Food & Gems', icon: Utensils }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabLocal(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-serif text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                    isActive
                      ? 'border-amber-400 text-amber-300 bg-amber-500/10 rounded-t-xl'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: NARRATIVE & HISTORY */}
          {activeTab === 'about' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Vision Features Detected Chips */}
              {features && features.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#1A2232]/80 border border-amber-500/20">
                  <h4 className="text-[11px] uppercase tracking-wider font-serif font-bold text-amber-400 mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Neural Vision Geometry & Features Detected</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#121824] border border-amber-500/30 text-amber-200 rounded-lg text-xs font-serif font-medium shadow-xs"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Historical Narrative & Audio Guide Text */}
              <div className="p-6 rounded-2xl bg-[#1A2232]/50 border border-amber-500/20 space-y-3">
                <h3 className="font-serif font-bold text-sm text-[#E2D9CC] flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>Historical Chronicle & Cultural Significance</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal">
                  {monument.audioGuideTranscript || `A masterpiece of Indian cultural architecture standing prominently in ${monument.city}. Featuring exquisite stone carvings, classical proportions, and enduring historical testament to the artistic patronage of its era.`}
                </p>
              </div>

              {/* Local Legends & Folklore */}
              {monument.legendsAndFacts && (
                <div className="p-5 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border-l-4 border-amber-500 rounded-r-2xl">
                  <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-xs mb-1.5">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Folklore & Historical Legends</span>
                  </div>
                  <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
                    {monument.legendsAndFacts}
                  </p>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: ARCHITECTURE & CRAFT */}
          {activeTab === 'architecture' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Highlights cards */}
              <div>
                <h3 className="font-serif font-bold text-sm text-[#E2D9CC] mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Key Architectural Highlights & Mastercraft</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {monument.keyHighlights && monument.keyHighlights.length > 0 ? (
                    monument.keyHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-[#1A2232]/70 rounded-2xl border border-amber-500/20 flex items-start gap-3 hover:border-amber-500/40 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 text-xs font-serif font-bold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                          {idx + 1}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {highlight}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-[#1A2232]/70 rounded-2xl border border-amber-500/20 text-xs text-slate-400">
                      Standard regional heritage construction style with ornate stone facades and classic proportions.
                    </div>
                  )}
                </div>
              </div>

              {/* Four Architectural Metrics Boxes */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-[#1A2232]/50 border border-amber-500/20">
                  <span className="text-[10px] font-serif font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Design Tradition
                  </span>
                  <p className="text-xs font-serif font-bold text-[#E2D9CC]">
                    {monument.architecturalStyle || 'Classical Indian'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#1A2232]/50 border border-amber-500/20">
                  <span className="text-[10px] font-serif font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Century of Origin
                  </span>
                  <p className="text-xs font-serif font-bold text-[#E2D9CC]">
                    {monument.constructionEra || 'Historical'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#1A2232]/50 border border-amber-500/20">
                  <span className="text-[10px] font-serif font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Patron / Ruler
                  </span>
                  <p className="text-xs font-serif font-bold text-[#E2D9CC]">
                    {monument.commissionedBy || 'Regional Kings'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#1A2232]/50 border border-amber-500/20">
                  <span className="text-[10px] font-serif font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Primary Medium
                  </span>
                  <p className="text-xs font-serif font-bold text-[#E2D9CC]">
                    {monument.material || 'Natural Stone'}
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: VISITING & TICKETS */}
          {activeTab === 'visiting' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Schedule Box */}
                <div className="p-5 rounded-2xl border border-amber-500/20 bg-[#1A2232]/70">
                  <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-xs mb-4">
                    <Clock className="w-4 h-4" />
                    <span>Visiting Hours & Schedule</span>
                  </div>
                  <div className="space-y-2.5 text-xs divide-y divide-slate-800">
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">Opening Hours:</span>
                      <span className="font-serif font-bold text-[#E2D9CC]">{monument.openingHours || 'Sunrise to Sunset'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 pt-2">
                      <span className="text-slate-400">Weekly Closing:</span>
                      <span className="font-serif font-bold text-amber-400">{monument.closedOn || 'Open Daily'}</span>
                    </div>
                    {monument.bestTimeToVisit && (
                      <div className="flex justify-between py-1.5 pt-2">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Best Time:</span>
                        </span>
                        <span className="font-serif font-bold text-emerald-400 text-right">{monument.bestTimeToVisit}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ticket Fees Box */}
                <div className="p-5 rounded-2xl border border-amber-500/20 bg-[#1A2232]/70">
                  <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-xs mb-4">
                    <Ticket className="w-4 h-4" />
                    <span>Official Entry Ticket Fees</span>
                  </div>
                  <div className="space-y-2.5 text-xs divide-y divide-slate-800">
                    {monument.ticketPricing && Object.keys(monument.ticketPricing).length > 0 ? (
                      Object.entries(monument.ticketPricing).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-1.5 pt-2 items-center capitalize">
                          <span className="text-slate-400">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="font-serif font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-lg text-xs">
                            {value}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-400 py-2">
                        Nominal entry fee or free public heritage monument.
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Visitor Pro Tips */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-amber-500/20 flex items-start gap-3 text-xs text-slate-300">
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-amber-300 font-serif">Pro Tip:</strong> Book tickets through the Archaeological Survey of India (ASI) official portal or entry QR codes at the gate to avoid long queues during peak morning hours.
                </p>
              </div>

            </div>
          )}

          {/* TAB 4: GASTRONOMY & NEARBY */}
          {activeTab === 'gastronomy' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Nearby Food */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif font-bold text-sm text-[#E2D9CC] flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-orange-400" />
                    <span>Authentic Nearby Dining & Street Food</span>
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">Walking distance</span>
                </div>

                {monument.nearbyFood && monument.nearbyFood.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {monument.nearbyFood.map((food, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#1A2232]/70 border border-amber-500/20 hover:border-amber-500/40 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-serif font-bold text-xs text-[#E2D9CC] truncate">{food.name}</h4>
                          <span className="text-[10px] font-serif font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                            {food.distance}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-2">{food.cuisine}</p>
                        <div className="text-[11px] font-medium text-orange-300 bg-orange-500/10 border border-orange-500/20 p-2 rounded-xl">
                          🍴 {food.specialty}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Authentic local tea stalls and sweet shops are situated right outside the complex.</p>
                )}
              </div>

              {/* Nearby Attractions */}
              {monument.nearbyAttractions && monument.nearbyAttractions.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif font-bold text-sm text-[#E2D9CC] flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-amber-400" />
                      <span>Nearby Temples & Heritage Sites</span>
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">Adjacent sights</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {monument.nearbyAttractions.map((attr, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#1A2232]/70 border border-amber-500/20 flex items-center justify-between gap-3 hover:border-amber-500/40 transition-colors"
                      >
                        <div>
                          <h4 className="font-serif font-bold text-xs text-[#E2D9CC]">{attr.name}</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">{attr.type}</p>
                        </div>
                        <span className="text-[10px] font-serif font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full whitespace-nowrap">
                          {attr.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
