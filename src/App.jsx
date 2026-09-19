import { TravelProvider } from './context/TravelContext';
import { useTravel } from './context/useTravel';
import Navbar from './components/Navbar';
import SmartSearchExplorer from './components/Discovery/SmartSearchExplorer';
import MonumentScanner from './components/Scanner/MonumentScanner';
import AIGuideChat from './components/Guide/AIGuideChat';
import ItineraryPlanner from './components/Planner/ItineraryPlanner';
import HiddenGems from './components/Gems/HiddenGems';
import AudioGuidePlayer from './components/Common/AudioGuidePlayer';
import { Compass, Sparkles } from 'lucide-react';

function AppContent() {
  const { activeTab, setActiveTab } = useTravel();

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F14] text-[#E2D9CC] selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Top Navigation */}
      <Navbar />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'explore' && <SmartSearchExplorer />}
        {activeTab === 'scan' && <MonumentScanner />}
        {activeTab === 'guide' && <AIGuideChat />}
        {activeTab === 'planner' && <ItineraryPlanner />}
        {activeTab === 'gems' && <HiddenGems />}
      </main>

      {/* Persistent Audio Tour Guide Floating Bar */}
      <AudioGuidePlayer />

      {/* Modern Royal Travel Footer */}
      <footer className="mt-16 bg-[#070A0E] text-slate-400 border-t border-amber-500/20 text-xs py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-inner">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[#E2D9CC] font-serif font-bold text-sm">
                Explorer<span className="text-amber-400">IQ</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Interactive Smart Indian Tourism & Monument Visual Intelligence Platform
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-serif font-semibold">
            <button 
              onClick={() => setActiveTab('explore')} 
              className={`transition-colors cursor-pointer ${activeTab === 'explore' ? 'text-amber-400 font-bold' : 'hover:text-amber-300'}`}
            >
              Destinations & Search
            </button>
            <button 
              onClick={() => setActiveTab('scan')} 
              className={`transition-colors cursor-pointer ${activeTab === 'scan' ? 'text-amber-400 font-bold' : 'hover:text-amber-300'}`}
            >
              AI Monument Scanner
            </button>
            <button 
              onClick={() => setActiveTab('guide')} 
              className={`transition-colors cursor-pointer flex items-center gap-1 ${activeTab === 'guide' ? 'text-amber-400 font-bold' : 'hover:text-amber-300'}`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>AI Cultural Guide</span>
            </button>
            <button 
              onClick={() => setActiveTab('planner')} 
              className={`transition-colors cursor-pointer ${activeTab === 'planner' ? 'text-amber-400 font-bold' : 'hover:text-amber-300'}`}
            >
              Trip Planner
            </button>
            <button 
              onClick={() => setActiveTab('gems')} 
              className={`transition-colors cursor-pointer ${activeTab === 'gems' ? 'text-amber-400 font-bold' : 'hover:text-amber-300'}`}
            >
              Hidden Gems
            </button>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-serif">
            <span>Powered by Neural Vision & Indian Cultural Knowledge Base</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <TravelProvider>
      <AppContent />
    </TravelProvider>
  );
}
