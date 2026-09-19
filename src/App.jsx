import { TravelProvider } from './context/TravelContext';
import { useTravel } from './context/useTravel';
import Navbar from './components/Navbar';
import SmartSearchExplorer from './components/Discovery/SmartSearchExplorer';
import MonumentScanner from './components/Scanner/MonumentScanner';
import SmartPlanner from './components/SmartPlanner';
import HiddenGems from './components/Gems/HiddenGems';
import AudioGuidePlayer from './components/Common/AudioGuidePlayer';
import RoutePlanner from './components/RoutePlanner';
import { Compass } from 'lucide-react';

function AppContent() {
  const { 
    activeTab, 
    setActiveTab, 
    isRoutePlannerOpen, 
    closeRoutePlanner, 
    routeDestination 
  } = useTravel();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF8F2] text-[#25211D] selection:bg-[#57151E] selection:text-[#FFF9EF]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'explore' && <SmartSearchExplorer />}
        {activeTab === 'scan' && <MonumentScanner />}
        {activeTab === 'planner' && <SmartPlanner />}
        {activeTab === 'gems' && <HiddenGems />}
      </main>

      {/* Live Multi-Modal Route Planner Modal */}
      <RoutePlanner
        isOpen={isRoutePlannerOpen}
        onClose={closeRoutePlanner}
        initialDestination={routeDestination}
      />

      {/* Persistent Audio Tour Guide Floating Bar */}
      <AudioGuidePlayer />

      {/* Modern Indian Heritage Travel Footer */}
      <footer className="mt-16 bg-[#420E15] text-[#F7EEDC]/80 border-t border-[#E2C46B]/30 text-xs py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#C89B3C]/20 text-[#E2C46B] flex items-center justify-center border border-[#E2C46B]/40">
              <Compass className="w-4 h-4 text-[#E2C46B]" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">
                Explorer<span className="text-[#E2C46B]">IQ</span>
              </p>
              <p className="text-[11px] text-[#E2C46B]/80">
                Interactive Smart Tourism & Monument Visual Recognition Platform
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center gap-4 text-xs font-semibold text-[#F7EEDC]">
            <button onClick={() => setActiveTab('explore')} className="hover:text-white transition-colors">
              Destinations & Search
            </button>
            <button onClick={() => setActiveTab('scan')} className="hover:text-white transition-colors">
              AI Monument Scanner
            </button>
            <button onClick={() => setActiveTab('planner')} className="hover:text-white transition-colors">
              Trip Planner
            </button>
            <button onClick={() => setActiveTab('gems')} className="hover:text-white transition-colors">
              Hidden Gems
            </button>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <span>Powered by React, Leaflet & Neural Vision Engines</span>
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
