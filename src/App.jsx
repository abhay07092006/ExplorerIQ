import { TravelProvider } from './context/TravelContext'
import { useTravel } from './context/useTravel'

import Navbar from './components/Navbar'
import SmartSearchExplorer from './components/Discovery/SmartSearchExplorer'
import MonumentScanner from './components/Scanner/MonumentScanner'
import SmartPlanner from './components/SmartPlanner'
import HiddenGems from './components/Gems/HiddenGems'
import AudioGuidePlayer from './components/Common/AudioGuidePlayer'
import RoutePlanner from './components/RoutePlanner'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Trips from './pages/Trips'
import Help from './pages/Help'

import { Compass } from 'lucide-react'

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/clerk-react'


function RequireAuth({ children }) {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}


function ProtectedApp() {
  return (
    <RequireAuth>
      <TravelProvider>
        <AppContent />
      </TravelProvider>
    </RequireAuth>
  )
}


function AppContent() {
  const {
    activeTab,
    setActiveTab,
    isRoutePlannerOpen,
    closeRoutePlanner,
    routeDestination,
  } = useTravel()

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8E7] text-[#3D2925] selection:bg-[#C9972B] selection:text-white">

      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {activeTab === 'explore' && (
          <SmartSearchExplorer />
        )}

        {activeTab === 'scan' && (
          <MonumentScanner />
        )}

        {activeTab === 'planner' && (
          <SmartPlanner />
        )}

        {activeTab === 'gems' && (
          <HiddenGems />
        )}

      </main>

      <RoutePlanner
        isOpen={isRoutePlannerOpen}
        onClose={closeRoutePlanner}
        initialDestination={routeDestination}
      />

      <AudioGuidePlayer />

      <footer className="mt-16 bg-[#6B1E2B] text-[#F4E7D0] border-t border-[#54202A] text-xs py-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-3">

            <div className="w-8 h-8 rounded-xl bg-[#D88924]/20 text-[#D88924] flex items-center justify-center border border-[#D88924]/30">
              <Compass className="w-4 h-4" />
            </div>

            <div>

              <p className="text-white font-bold text-sm">
                Explorer<span className="text-[#D88924]">IQ</span>
              </p>

              <p className="text-[11px] text-[#F4E7D0]/60">
                Interactive Smart Tourism & Monument Visual Recognition Platform
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">

            <button
              onClick={() => setActiveTab('explore')}
              className="hover:text-[#D88924] transition-colors"
            >
              Destinations & Search
            </button>

            <button
              onClick={() => setActiveTab('scan')}
              className="hover:text-[#D88924] transition-colors"
            >
              AI Monument Scanner
            </button>

            <button
              onClick={() => setActiveTab('planner')}
              className="hover:text-[#D88924] transition-colors"
            >
              Trip Planner
            </button>

            <button
              onClick={() => setActiveTab('gems')}
              className="hover:text-[#D88924] transition-colors"
            >
              Hidden Gems
            </button>

          </div>

          <div className="text-[11px] text-[#F4E7D0]/50">
            Powered by React, Leaflet & Neural Vision Engines
          </div>

        </div>

      </footer>

    </div>
  )
}


export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Signup */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Profile */}

        <Route
          path="/profile/*"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        {/* Settings */}

        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />

        {/* Trips */}

        <Route
          path="/trips"
          element={
            <RequireAuth>
              <Trips />
            </RequireAuth>
          }
        />

        {/* Help */}

        <Route
          path="/help"
          element={
            <RequireAuth>
              <Help />
            </RequireAuth>
          }
        />

        {/* Main ExplorerIQ */}

        <Route
          path="/*"
          element={<ProtectedApp />}
        />

      </Routes>

    </BrowserRouter>
  )
}