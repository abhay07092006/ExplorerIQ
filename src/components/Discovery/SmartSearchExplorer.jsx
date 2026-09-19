import { useState, useMemo, useRef } from 'react';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Clock, 
  Ticket, 
  Lightbulb, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  CalendarPlus, 
  Compass,
  Landmark,
  Flame,
  Image as ImageIcon,
  Utensils,
  Trees,
  Filter,
  ArrowRight,
  MessageSquareText,
  ChevronLeft,
  ChevronRight,
  Heart,
  Crown
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { CITIES_DATA, ALL_PLACES, CATEGORY_FILTERS } from '../../data/travelData';
import PlaceDrawer from '../Map/PlaceDrawer';
import { handleImageError } from '../../utils/imageUtils';

const ICON_MAP = {
  Sparkles,
  Landmark,
  Flame,
  Image: ImageIcon,
  Utensils,
  Trees
};

const CATEGORY_STYLES = {
  heritage: { bg: 'bg-purple-950/60 text-purple-300 border-purple-500/30', dot: 'bg-purple-400', label: 'History & Heritage' },
  temples: { bg: 'bg-amber-950/60 text-amber-300 border-amber-500/30', dot: 'bg-amber-400', label: 'Temples & Sacred Sites' },
  food: { bg: 'bg-rose-950/60 text-rose-300 border-rose-500/30', dot: 'bg-rose-400', label: 'Local Food & Flavors' },
  museums: { bg: 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30', dot: 'bg-indigo-400', label: 'Museums & Galleries' },
  scenic: { bg: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30', dot: 'bg-emerald-400', label: 'Scenic Ghats & Parks' }
};

const CULTURAL_PILLARS = [
  {
    id: 'forts',
    title: 'Royal Forts & Palaces',
    hindiTitle: 'राजसी दुर्ग व महल',
    category: 'heritage',
    description: 'Mughal bastions, Rajput sheesh mahals & hill citadels',
    icon: Landmark,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
    count: '38 Forts'
  },
  {
    id: 'temples',
    title: 'Sacred Temples & Shrines',
    hindiTitle: 'पवित्र देवालय व संगम',
    category: 'temples',
    description: 'Dravidian gopurams, Nagara spires & mystical ghats',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    count: '42 Temples'
  },
  {
    id: 'arts',
    title: 'Classical Performing Arts',
    hindiTitle: 'शास्त्रीय नृत्य व संगीत',
    category: 'heritage',
    description: 'Kathakali drama, Vedic ragas & centuries-old gharanas',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    count: '16 Traditions'
  },
  {
    id: 'cuisine',
    title: 'Imperial Culinary Arts',
    hindiTitle: 'शाही दस्तरख़्वान व स्वाद',
    category: 'food',
    description: 'Awadhi dum pukht, Chettinad spices & royal thalis',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    count: '28 Cuisines'
  },
  {
    id: 'museums',
    title: 'Antiquities & Museums',
    hindiTitle: 'ऐतिहासिक धरोहर व कला',
    category: 'museums',
    description: 'Chola bronzes, Mughal armory & ancient stone relics',
    icon: Compass,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    count: '24 Galleries'
  },
  {
    id: 'scenic',
    title: 'Sacred Ghats & Valleys',
    hindiTitle: 'प्राकृतिक छटा व तीर्थ',
    category: 'scenic',
    description: 'Misty Himalayan passes, backwaters & sacred confluences',
    icon: Trees,
    image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=600&q=80',
    count: '19 Landscapes'
  }
];

const POPULAR_SEARCH_SUGGESTIONS = [
  'Taj Mahal',
  'Kashi Vishwanath',
  'Hawa Mahal',
  'Red Fort',
  'Meenakshi Temple',
  'Hampi Chariot',
  'Charminar',
  'Konark Sun Temple',
  'Ajanta Caves',
  'Amber Fort'
];

export default function SmartSearchExplorer() {
  const { 
    setCurrentCityId, 
    activeCategories, 
    toggleCategory, 
    openPlaceDrawer,
    toggleBookmark,
    isBookmarked,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    communityGems
  } = useTravel();

  const [selectedCityFilter, setSelectedCityFilter] = useState('all');
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Filter destination places matching search query, selected city, and category filters
  const filteredPlaces = useMemo(() => {
    return ALL_PLACES.filter((place) => {
      const matchesCity = selectedCityFilter === 'all' || place.cityId === selectedCityFilter;
      const matchesCategory = activeCategories.includes(place.category);
      const query = (searchQuery || '').trim().toLowerCase();
      const matchesSearch = query === '' ||
        place.name.toLowerCase().includes(query) ||
        place.cityName.toLowerCase().includes(query) ||
        place.state.toLowerCase().includes(query) ||
        place.shortDesc.toLowerCase().includes(query) ||
        place.category.toLowerCase().includes(query) ||
        (place.tip && place.tip.toLowerCase().includes(query));

      return matchesCity && matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCityFilter, activeCategories]);

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') {
      return ALL_PLACES.filter((p) =>
        selectedCityFilter === 'all' || p.cityId === selectedCityFilter
      ).length;
    }
    return ALL_PLACES.filter((p) => {
      const cityMatch = selectedCityFilter === 'all' || p.cityId === selectedCityFilter;
      return cityMatch && p.category === categoryId;
    }).length;
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCityFilter('all');
    if (activeCategories.length < 5) {
      toggleCategory('all');
    }
  };

  const handlePillarClick = (category) => {
    toggleCategory(category);
    const target = document.getElementById('heritage-destinations-grid');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isAllCategoriesActive = activeCategories.length === 5;

  return (
    <div className="w-full space-y-12">
      
      {/* 1. HERO SECTION: Royal Indian Atmosphere */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/25 shadow-2xl bg-gradient-to-b from-[#121824] via-[#0B0F14] to-[#0B0F14]">
        
        {/* Background Atmosphere Image with Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80"
            alt="Indian Heritage"
            className="w-full h-full object-cover opacity-20 filter saturate-150 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/80 to-[#0B0F14]/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 sm:py-16 text-center space-y-6">
          
          {/* Imperial Crest Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-serif tracking-widest uppercase shadow-lg shadow-amber-500/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Imperial Heritage of Bharat • AI Cultural Discovery</span>
          </div>

          {/* Heading in Classical Serif */}
          <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-sand-100 tracking-tight leading-[1.15]">
            Journey Through the <span className="gold-gradient-text">Living Heritage</span> of India
          </h1>

          <p className="text-xs sm:text-base text-sand-300/85 max-w-2xl mx-auto font-sans leading-relaxed font-normal">
            Explore centuries of royal dynasties, architectural marvels, sacred sanctums, 
            and timeless culinary legacies across India's premier cultural hubs.
          </p>

          {/* Majestic Instant Search Bar */}
          <div className="relative max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center bg-[#121824] rounded-2xl shadow-2xl p-2 border border-amber-500/40 focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-500/20 transition-all">
              <Search className="w-5 h-5 text-amber-400 ml-3 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search forts, temples, eras, or dishes (e.g., "Taj Mahal", "Varanasi", "Chola")...'
                className="w-full px-3 py-2.5 text-sand-100 placeholder:text-sand-400/50 text-xs sm:text-sm font-medium bg-transparent outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 mr-1 text-sand-400 hover:text-amber-300 rounded-lg transition-colors text-xs font-bold"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
              <button
                type="button"
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-saffron-warm hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-serif font-bold shadow-md shadow-amber-500/20 transition-all flex-shrink-0 cursor-pointer hidden sm:block"
              >
                Search Heritage
              </button>
            </div>
          </div>

          {/* Curated Suggestion Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-sand-400 text-[11px] font-serif font-bold tracking-wider mr-1 text-amber-400/80">
              Popular:
            </span>
            {POPULAR_SEARCH_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setSearchQuery(suggestion)}
                className="px-3 py-1 rounded-full bg-[#121824]/80 hover:bg-[#1A2232] border border-amber-500/20 hover:border-amber-500/40 text-[11px] text-sand-300 hover:text-amber-300 transition-all cursor-pointer font-sans"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-6 border-t border-amber-500/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center max-w-3xl mx-auto">
            <div>
              <p className="font-serif font-black text-lg sm:text-xl text-amber-400">29</p>
              <p className="text-[10px] uppercase tracking-widest text-sand-400 font-sans font-semibold">Cultural Hubs</p>
            </div>
            <div>
              <p className="font-serif font-black text-lg sm:text-xl text-amber-400">104+</p>
              <p className="text-[10px] uppercase tracking-widest text-sand-400 font-sans font-semibold">UNESCO Benchmarks</p>
            </div>
            <div>
              <p className="font-serif font-black text-lg sm:text-xl text-amber-400">128</p>
              <p className="text-[10px] uppercase tracking-widest text-sand-400 font-sans font-semibold">Destinations</p>
            </div>
            <div>
              <p className="font-serif font-black text-lg sm:text-xl text-amber-400">100%</p>
              <p className="text-[10px] uppercase tracking-widest text-sand-400 font-sans font-semibold">Vision Verified</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. EXPLORE BY CULTURE: 6-Card Heritage Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-amber-500/20 pb-3">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-serif font-bold uppercase tracking-wider mb-1">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Cultural Pillars of India</span>
            </div>
            <h2 className="font-serif font-black text-xl sm:text-2xl text-sand-100 tracking-tight">
              Explore by Living Tradition
            </h2>
          </div>
          <p className="text-xs text-sand-400 max-w-md sm:text-right font-sans">
            Delve into specialized artistic, spiritual, and architectural disciplines of the subcontinent.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          {CULTURAL_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                onClick={() => handlePillarClick(pillar.category)}
                className="group relative bg-[#121824] rounded-2xl border border-amber-500/20 hover:border-amber-400/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                {/* Background Subtle Image Texture */}
                <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-25 transition-opacity">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-[#121824]/80 to-transparent" />
                </div>

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-serif font-bold text-amber-300/80 uppercase tracking-widest px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                      {pillar.count}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-sm text-sand-100 group-hover:text-amber-300 transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] text-amber-200/50 font-serif italic mt-0.5">
                      {pillar.hindiTitle}
                    </p>
                  </div>

                  <p className="text-[11px] text-sand-400 line-clamp-2 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-amber-500/10 flex items-center justify-between text-xs text-amber-400 font-serif font-semibold mt-3">
                  <span>Explore Lens</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. HIDDEN GEMS CAROUSEL: Offbeat Subcontinental Wonders */}
      {communityGems && communityGems.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <div>
              <div className="flex items-center gap-2 text-saffron text-xs font-serif font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-saffron" />
                <span>Crowdsourced & Curated</span>
              </div>
              <h2 className="font-serif font-black text-xl sm:text-2xl text-sand-100 tracking-tight">
                Curated Hidden Gems
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                className="p-2 rounded-xl bg-[#121824] hover:bg-[#1A2232] border border-amber-500/20 text-sand-300 hover:text-amber-300 transition-colors cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="p-2 rounded-xl bg-[#121824] hover:bg-[#1A2232] border border-amber-500/20 text-sand-300 hover:text-amber-300 transition-colors cursor-pointer"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('gems')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#121824] hover:bg-[#1A2232] border border-amber-500/30 text-amber-300 rounded-xl text-xs font-serif font-semibold transition-colors cursor-pointer ml-2"
              >
                <span>View All Gems</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex items-stretch gap-4 overflow-x-auto pb-4 scrollbar-thin snap-x scroll-smooth"
          >
            {communityGems.map((gem) => (
              <div
                key={gem.id}
                className="w-72 sm:w-80 flex-shrink-0 bg-[#121824] rounded-2xl border border-amber-500/20 hover:border-amber-400/50 shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between snap-start group"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={gem.image}
                    alt={gem.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-[#121824]/40 to-transparent" />
                  
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-serif font-bold uppercase tracking-wider bg-[#0B0F14]/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                      {gem.category || 'Secret Site'}
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0B0F14]/80 text-saffron border border-saffron/30 backdrop-blur-md">
                      <Heart className="w-3 h-3 fill-current" />
                      <span>{gem.likes}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 text-sand-100">
                    <p className="flex items-center gap-1 text-[11px] text-amber-300 font-medium font-serif">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{gem.location}</span>
                    </p>
                    <h3 className="font-serif font-bold text-base text-sand-100 line-clamp-1">
                      {gem.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-sand-400 line-clamp-2 leading-relaxed font-sans">
                    {gem.description}
                  </p>
                  <div className="pt-2 border-t border-amber-500/10 flex items-center justify-between text-[11px] text-sand-400">
                    <span className="truncate">By {gem.author}</span>
                    <button
                      onClick={() => setActiveTab('gems')}
                      className="text-amber-400 font-serif font-bold hover:underline cursor-pointer"
                    >
                      Inspect →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. PERSONAL AI CULTURAL GUIDE: Interactive Callout Section */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#121824] via-[#182030] to-[#121824] border border-amber-500/30 shadow-2xl overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-serif tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Personal AI Cultural Guide</span>
            </div>
            <h3 className="font-serif font-black text-2xl sm:text-3xl text-sand-100 tracking-tight">
              Unravel Imperial Mysteries with Your AI Historian
            </h3>
            <p className="text-xs sm:text-sm text-sand-300/80 leading-relaxed font-sans">
              Engage with our conversational guide trained on Vedic architectural treatises, 
              medieval travelogues, and UNESCO archaeological dossiers.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-[#0B0F14]/70 border border-amber-500/20 text-sand-300">
                💬 Architecture Secrets
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-[#0B0F14]/70 border border-amber-500/20 text-sand-300">
                📜 Mythological Dossiers
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-[#0B0F14]/70 border border-amber-500/20 text-sand-300">
                🎙️ Audio Narration
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
            <button
              onClick={() => setActiveTab('guide')}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-saffron-warm hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-2xl text-xs font-serif font-bold shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquareText className="w-4 h-4 text-slate-950" />
              <span>Launch Cultural Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('scan')}
              className="px-5 py-3.5 bg-[#0B0F14] hover:bg-[#1A2232] border border-amber-500/30 text-amber-300 rounded-2xl text-xs font-serif font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Identify Photo</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. DESTINATION HUBS & CATEGORY FILTER STRIP */}
      <div id="heritage-destinations-grid" className="space-y-4 pt-2">
        
        {/* Destination City Filter Strip */}
        <div className="bg-[#121824] rounded-2xl p-4 border border-amber-500/20 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <h2 className="font-serif font-bold text-xs sm:text-sm text-sand-100 uppercase tracking-wider">
                Filter by Imperial Region
              </h2>
            </div>
            <span className="text-xs text-sand-400 font-sans">
              {CITIES_DATA.length} Heritage Hubs
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
            <button
              onClick={() => setSelectedCityFilter('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all border snap-start cursor-pointer ${
                selectedCityFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-[#1A2232] text-sand-300 border-amber-500/15 hover:bg-[#232E42] hover:text-amber-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>All Hubs ({ALL_PLACES.length})</span>
            </button>

            {CITIES_DATA.map((city) => {
              const isSelected = selectedCityFilter === city.id;
              return (
                <button
                  key={city.id}
                  onClick={() => setSelectedCityFilter(city.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all border snap-start cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-[#1A2232] text-sand-300 border-amber-500/15 hover:bg-[#232E42] hover:text-sand-100'
                  }`}
                >
                  <img
                    src={city.heroImage}
                    alt={city.name}
                    onError={handleImageError}
                    className="w-5 h-5 rounded-full object-cover border border-amber-400/40"
                  />
                  <span>{city.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-slate-950/40 text-slate-950' : 'bg-[#0B0F14] text-sand-400'
                  }`}>
                    {city.places.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filters */}
        <div className="bg-[#121824] rounded-2xl p-4 border border-amber-500/20 shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sand-300 font-serif font-bold text-xs uppercase tracking-wider flex-shrink-0">
            <Filter className="w-4 h-4 text-amber-400" />
            <span>Category Filters:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-wrap">
            {CATEGORY_FILTERS.map((cat) => {
              const Icon = ICON_MAP[cat.icon] || Sparkles;
              const isAll = cat.id === 'all';
              const isActive = isAll ? isAllCategoriesActive : activeCategories.includes(cat.id);
              const count = getCategoryCount(cat.id);

              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10'
                      : 'bg-[#1A2232] text-sand-400 border-amber-500/10 hover:bg-[#232E42] hover:text-sand-200'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <Icon className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>{cat.label}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-[#0B0F14] text-sand-400 border border-amber-500/15">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Metadata Bar */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif font-bold text-sand-200">
              Showing {filteredPlaces.length} Destinations
            </span>
            {searchQuery && (
              <span className="text-xs text-sand-400">
                for "<span className="font-semibold text-amber-400">{searchQuery}</span>"
              </span>
            )}
            {selectedCityFilter !== 'all' && (
              <span className="text-xs text-sand-400">
                in <span className="font-semibold text-amber-300 capitalize">{selectedCityFilter}</span>
              </span>
            )}
          </div>

          {(searchQuery || selectedCityFilter !== 'all' || activeCategories.length < 5) && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-serif font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Destination Cards Grid */}
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => {
              const bookmarked = isBookmarked(place.id);
              const catStyle = CATEGORY_STYLES[place.category] || {
                bg: 'bg-amber-950/60 text-amber-300 border-amber-500/30',
                label: place.category
              };

              return (
                <div
                  key={place.id}
                  className="group bg-[#121824] rounded-3xl border border-amber-500/20 hover:border-amber-400/50 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {/* Image Container with Badges */}
                  <div className="relative h-60 w-full overflow-hidden bg-[#0B0F14]">
                    <img
                      src={place.image}
                      alt={place.name}
                      onError={handleImageError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-[#121824]/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-serif font-bold uppercase tracking-wider border backdrop-blur-md shadow-xs ${catStyle.bg}`}>
                          {catStyle.label}
                        </span>
                        {place.bestDuration && (
                          <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-[#0B0F14]/85 text-amber-300 border border-amber-500/30 backdrop-blur-md hidden sm:inline-block font-serif">
                            {place.bestDuration}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(place);
                        }}
                        className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                          bookmarked
                            ? 'bg-amber-500 text-slate-950 shadow-amber-500/30 ring-2 ring-amber-400'
                            : 'bg-[#0B0F14]/80 text-sand-300 hover:text-amber-300 border border-amber-500/20'
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
                      <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium mb-1 font-serif">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{place.cityName}, {place.state}</span>
                      </div>
                      <h3 className="font-serif font-black text-xl text-sand-100 leading-snug drop-shadow-sm group-hover:text-amber-300 transition-colors">
                        {place.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    {/* Practical Timings & Fees */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-[#1A2232] rounded-xl border border-amber-500/10">
                        <span className="text-[10px] font-bold text-amber-400/80 uppercase tracking-wider flex items-center gap-1 mb-0.5 font-serif">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>Hours</span>
                        </span>
                        <p className="font-bold text-sand-200 text-[11px] truncate">
                          {place.timing?.split('(')[0] || 'Open Daily'}
                        </p>
                      </div>

                      <div className="p-2.5 bg-[#1A2232] rounded-xl border border-amber-500/10">
                        <span className="text-[10px] font-bold text-saffron uppercase tracking-wider flex items-center gap-1 mb-0.5 font-serif">
                          <Ticket className="w-3 h-3 text-saffron" />
                          <span>Entry Fee</span>
                        </span>
                        <p className="font-bold text-sand-200 text-[11px] truncate">
                          {place.fee || 'Free entry'}
                        </p>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-sand-400 leading-relaxed line-clamp-3 font-sans">
                      {place.shortDesc}
                    </p>

                    {/* Insider Tip Badge */}
                    {place.tip && (
                      <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-start gap-2 text-xs text-amber-200">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <p className="text-[11px] leading-relaxed line-clamp-2">
                          <span className="font-serif font-bold text-amber-300">Heritage Note:</span> {place.tip}
                        </p>
                      </div>
                    )}

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-amber-500/15 flex items-center justify-between gap-2">
                      <button
                        onClick={() => openPlaceDrawer(place)}
                        className="flex-1 py-2 px-3 bg-gradient-to-r from-amber-500 via-amber-600 to-saffron-warm hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-serif font-bold shadow-md shadow-amber-500/15 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Explore Details</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          setCurrentCityId(place.cityId);
                          setActiveTab('planner');
                        }}
                        className="py-2 px-3 bg-[#1A2232] hover:bg-[#232E42] border border-amber-500/20 text-amber-300 rounded-xl text-xs font-serif font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        title="Add to Itinerary"
                      >
                        <CalendarPlus className="w-3.5 h-3.5 text-amber-400" />
                        <span>Plan</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#121824] rounded-3xl border border-amber-500/20 shadow-xl max-w-xl mx-auto p-8">
            <Compass className="w-14 h-14 text-amber-400 mx-auto mb-3 animate-spin" style={{ animationDuration: '12s' }} />
            <h3 className="font-serif font-bold text-lg text-sand-100">
              No Heritage Sites Found
            </h3>
            <p className="text-xs text-sand-400 mt-1 max-w-md mx-auto leading-relaxed">
              We couldn't find any places matching your current search query "{searchQuery}" and active category filters.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-serif font-bold rounded-xl shadow transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Slide-over Detail Drawer */}
      <PlaceDrawer />

    </div>
  );
}
