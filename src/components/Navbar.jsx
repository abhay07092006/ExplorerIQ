import { useState } from 'react';
import { 
  Compass, 
  Scan, 
  Search, 
  CalendarDays, 
  Sparkles, 
  Bookmark, 
  Menu, 
  X, 
  Volume2,
  Navigation
} from 'lucide-react';
import { useTravel } from '../context/useTravel';

import BookmarkModal from './Common/BookmarkModal';

export default function Navbar() {
  const { 
    activeTab, 
    setActiveTab, 
    bookmarks,
    audioState,
    openRoutePlanner
  } = useTravel();

  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: 'Search & Discover', icon: Search, badge: 'Smart Filter' },
    { id: 'scan', label: 'AI Monument Scanner', icon: Scan, badge: 'AI Vision' },
    { id: 'planner', label: 'Smart Planner', icon: CalendarDays },
    { id: 'gems', label: 'Hidden Gems', icon: Sparkles }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('explore')}>
              <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 via-teal-500 to-amber-400 p-[2px] shadow-lg shadow-sky-500/20">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                  <Compass className="w-6 h-6 text-sky-400 animate-[spin_12s_linear_infinite]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xl tracking-tight text-white">
                    Explorer<span className="text-sky-400">IQ</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full">
                    v2.5
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                  Smart Tourism & Monument Visual Recognition
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-2xl border border-slate-700/60">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md shadow-sky-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sky-400'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-sky-400/15 text-sky-300 border border-sky-400/20'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Controls: Route Planner, Saved Bookmarks & Audio Pulse */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Audio Pulse Indicator */}
              {audioState.isPlaying && (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-sky-500/15 border border-sky-500/30 rounded-xl text-sky-400 text-xs font-medium">
                  <Volume2 className="w-4 h-4 animate-pulse text-sky-400" />
                  <span className="text-[11px] font-semibold">Narrating...</span>
                </div>
              )}

              {/* Route Planner Quick Button */}
              <button
                onClick={() => openRoutePlanner && openRoutePlanner(null)}
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-sky-500/15 to-blue-500/15 hover:from-sky-500/25 hover:to-blue-500/25 border border-sky-500/30 rounded-xl text-xs font-semibold text-sky-300 hover:text-white transition-all shadow-xs"
                title="Live Multi-Modal Transit & Route Planner"
              >
                <Navigation className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden lg:inline">Route Planner</span>
              </button>

              {/* Bookmarks Counter Button */}
              <button
                onClick={() => setIsBookmarkModalOpen(true)}
                className="relative p-2.5 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition-colors"
                title="Saved Places"
              >
                <Bookmark className="w-4 h-4" />
                {bookmarks.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-slate-950 text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-slate-900">
                    {bookmarks.length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsBookmarkModalOpen(true)}
                className="p-2 bg-slate-800 rounded-xl text-slate-300"
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-slate-800 rounded-xl text-slate-300 hover:text-white"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900/95 px-4 pt-3 pb-5 space-y-3">
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
                    className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                      isActive
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Route Planner Button */}
            <button
              onClick={() => {
                openRoutePlanner && openRoutePlanner(null);
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
            >
              <Navigation className="w-4 h-4" />
              <span>Open Live Route & Transit Planner</span>
            </button>
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
