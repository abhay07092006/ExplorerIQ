import { TravelProvider } from './context/TravelContext';
import { AuthProvider } from './context/AuthContext';
import { useTravel } from './context/useTravel';
import Navbar from './components/Navbar';
import SmartSearchExplorer from './components/Discovery/SmartSearchExplorer';
import PanIndiaExplorer from './components/PanIndiaExplorer';
import MonumentScanner from './components/Scanner/MonumentScanner';
import SmartPlanner from './components/SmartPlanner';
import HiddenGems from './components/Gems/HiddenGems';
import UserProfile from './components/Profile/UserProfile';
import AuthModal from './components/Auth/AuthModal';
import AudioGuidePlayer from './components/Common/AudioGuidePlayer';
import { Compass } from 'lucide-react';

function AppContent() {
  const { activeTab, setActiveTab } = useTravel();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'explore' && <SmartSearchExplorer />}
        {activeTab === 'panindia' && <PanIndiaExplorer />}
        {activeTab === 'scan' && <MonumentScanner />}
        {activeTab === 'planner' && <SmartPlanner />}
        {activeTab === 'gems' && <HiddenGems />}
        {activeTab === 'profile' && <UserProfile />}
      </main>

      {/* Auth Modal Dialog */}
      <AuthModal />

      {/* Persistent Audio Tour Guide Floating Bar */}
      <AudioGuidePlayer />

      {/* Modern Travel Footer */}
      <footer className="mt-16 bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">
                Explorer<span className="text-sky-400">IQ</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Interactive Smart Tourism & Monument Visual Recognition Platform
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center gap-4 text-xs font-semibold flex-wrap justify-center">
            <button onClick={() => setActiveTab('explore')} className="hover:text-white transition-colors">
              Destinations & Search
            </button>
            <button onClick={() => setActiveTab('panindia')} className="hover:text-white transition-colors text-sky-400">
              Pan-India (36 States & UTs)
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
            <button onClick={() => setActiveTab('profile')} className="hover:text-white transition-colors">
              User Profile
            </button>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <span>Powered by React, Leaflet, OpenStreetMap Overpass & Neural Vision</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TravelProvider>
        <AppContent />
      </TravelProvider>
    </AuthProvider>
  );
}
