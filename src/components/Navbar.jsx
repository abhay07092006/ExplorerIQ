import { useState } from 'react';
import { 
  Compass, 
  Scan, 
  Search, 
  CalendarDays, 
  Sparkles, 
  Bookmark, 
  MapPin, 
  ChevronDown, 
  Menu, 
  X, 
  Volume2,
  Crown
} from 'lucide-react';
import { useTravel } from '../context/useTravel';
import { CITIES_DATA } from '../data/travelData';
import BookmarkModal from './Common/BookmarkModal';
import { handleImageError } from '../utils/imageUtils';

export default function Navbar() {
  const { 
    activeTab, 
    setActiveTab, 
    currentCityId, 
    setCurrentCityId, 
    bookmarks,
    audioState,
    searchQuery,
    setSearchQuery
  } = useTravel();

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentCity = CITIES_DATA.find((c) => c.id === currentCityId) || CITIES_DATA[0];

  const navItems = [
    { id: 'explore', label: 'Explore & Heritage', icon: Compass, badge: 'Curated' },
    { id: 'scan', label: 'Identify Heritage', icon: Scan, badge: 'Vision AI' },
    { id: 'guide', label: 'AI Cultural Guide', icon: Sparkles, badge: 'Live Chat' },
    { id: 'planner', label: 'Smart Planner', icon: CalendarDays },
    { id: 'gems', label: 'Hidden Gems', icon: Crown }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0B0F14]/95 backdrop-blur-md border-b border-amber-500/20 text-[#E2D9CC] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group flex-shrink-0" 
              onClick={() => setActiveTab('explore')}
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-saffron-warm p-[2px] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
                <div className="w-full h-full bg-[#0B0F14] rounded-[14px] flex items-center justify-center">
                  <Compass className="w-6 h-6 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-black text-xl tracking-wider text-sand-100">
                    Explorer<span className="text-amber-400">IQ</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-full font-serif">
                    Heritage
                  </span>
                </div>
                <p className="text-[10px] text-amber-200/60 font-sans tracking-wide hidden sm:block">
                  Imperial Tourism & Cultural Intelligence
                </p>
              </div>
            </div>

            {/* Quick Header Search Bar */}
            <div className="hidden lg:flex items-center flex-1 max-w-xs xl:max-w-sm mx-2">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/70 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search forts, temples, eras..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeTab !== 'explore') setActiveTab('explore');
                  }}
                  className="w-full bg-[#121824] border border-amber-500/20 focus:border-amber-400/60 rounded-xl pl-9 pr-8 py-2 text-xs text-sand-100 placeholder-sand-400/50 outline-none transition-colors shadow-inner"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sand-400 hover:text-amber-300 text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-[#121824]/90 p-1.5 rounded-2xl border border-amber-500/20">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/25 via-amber-400/20 to-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/20 font-semibold'
                        : 'text-sand-300 hover:text-amber-200 hover:bg-[#1A2232]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-amber-400/70'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[8px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                          isActive
                            ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40'
                            : 'bg-amber-500/10 text-amber-300/80 border border-amber-500/20'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Controls: City Switcher, Bookmarks, Profile */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Audio Pulse Indicator */}
              {audioState.isPlaying && (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-500/15 border border-amber-500/30 rounded-xl text-amber-300 text-xs font-medium animate-pulse">
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-serif font-bold uppercase tracking-wider">Audio Guide Active</span>
                </div>
              )}

              {/* City Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-[#121824] hover:bg-[#1A2232] border border-amber-500/20 hover:border-amber-500/40 rounded-xl text-xs font-medium text-sand-200 transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold">{currentCity.name}</span>
                  <ChevronDown className="w-3 h-3 text-sand-400" />
                </button>

                {isCityDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#121824] border border-amber-500/30 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-wider font-serif font-bold text-amber-300/70 px-3 py-1.5">
                      Heritage Regions
                    </p>
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {CITIES_DATA.map((city) => (
                        <button
                          key={city.id}
                          onClick={() => {
                            setCurrentCityId(city.id);
                            setIsCityDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                            city.id === currentCityId
                              ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                              : 'text-sand-300 hover:bg-[#1A2232] hover:text-sand-100'
                          }`}
                        >
                          <img
                            src={city.heroImage}
                            alt={city.name}
                            onError={handleImageError}
                            className="w-7 h-7 rounded-lg object-cover border border-amber-500/20"
                          />
                          <div>
                            <p className="font-semibold text-sand-100">{city.name}</p>
                            <p className="text-[10px] text-amber-200/50">{city.state}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bookmarks Counter Button */}
              <button
                onClick={() => setIsBookmarkModalOpen(true)}
                className="relative p-2.5 bg-[#121824] hover:bg-[#1A2232] border border-amber-500/20 hover:border-amber-500/40 rounded-xl text-sand-300 hover:text-amber-300 transition-colors cursor-pointer"
                title="Saved Heritage Sites"
              >
                <Bookmark className="w-4 h-4" />
                {bookmarks.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gradient-to-r from-amber-500 to-saffron-warm text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-[#0B0F14]">
                    {bookmarks.length}
                  </span>
                )}
              </button>

              {/* Profile / Avatar Badge */}
              <div 
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-[#121824] hover:bg-[#1A2232] border border-amber-500/30 rounded-xl cursor-pointer transition-colors"
                title="Explorer Heritage Profile"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-saffron-warm p-[1px]">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="User Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="text-[11px] font-serif font-bold text-sand-200 hidden xl:inline">
                  Patron
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsBookmarkModalOpen(true)}
                className="p-2 bg-[#121824] border border-amber-500/20 rounded-xl text-sand-300"
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-[#121824] border border-amber-500/20 rounded-xl text-sand-300 hover:text-amber-300"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-amber-500/20 bg-[#0B0F14]/98 px-4 pt-3 pb-5 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-[#121824] text-sand-300 border border-amber-500/10'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-amber-400" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Destination Selector */}
            <div className="pt-2">
              <label className="text-xs font-serif font-semibold text-amber-300/80 block mb-1">
                Heritage Destination:
              </label>
              <select
                value={currentCityId}
                onChange={(e) => {
                  setCurrentCityId(e.target.value);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-[#121824] border border-amber-500/20 rounded-xl px-3 py-2 text-xs text-sand-100 outline-none"
              >
                {CITIES_DATA.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name} ({city.state})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </header>

      {/* Bookmark Modal */}
      <BookmarkModal
        isOpen={isBookmarkModalOpen}
        onClose={() => setIsBookmarkModalOpen(false)}
      />
    </>
  );
}
