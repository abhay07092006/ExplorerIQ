import { useEffect, useRef, useState } from 'react'

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
  Navigation,
  User,
  Settings,
  Map,
  CircleHelp,
  LogOut,
  ChevronDown,
} from 'lucide-react'

import { useTravel } from '../context/useTravel'
import { useUser, useClerk } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

import BookmarkModal from './Common/BookmarkModal'

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    bookmarks,
    audioState,
    openRoutePlanner,
  } = useTravel()

  const { user } = useUser()
  const { signOut } = useClerk()
  const navigate = useNavigate()

  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  // IMPORTANT:
  // Separate refs for desktop and mobile profile menus
  const desktopProfileRef = useRef(null)
  const mobileProfileRef = useRef(null)

  const navItems = [
    {
      id: 'explore',
      label: 'Search & Discover',
      icon: Search,
      badge: 'Smart Filter',
    },
    {
      id: 'scan',
      label: 'AI Monument Scanner',
      icon: Scan,
      badge: 'AI Vision',
    },
    {
      id: 'planner',
      label: 'Smart Planner',
      icon: CalendarDays,
    },
    {
      id: 'gems',
      label: 'Hidden Gems',
      icon: Sparkles,
    },
  ]

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideDesktop =
        desktopProfileRef.current?.contains(event.target)

      const clickedInsideMobile =
        mobileProfileRef.current?.contains(event.target)

      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const displayName =
    user?.fullName ||
    user?.firstName ||
    user?.username ||
    'Explorer'

  const email =
    user?.primaryEmailAddress?.emailAddress || ''

  const initials = displayName
    .split(' ')
    .map((name) => name[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  // Navigate to another page
  const goTo = (path) => {
    setIsProfileMenuOpen(false)
    setIsMobileMenuOpen(false)

    navigate(path)
  }

  // Sign out
  const handleSignOut = async () => {
    try {
      setIsProfileMenuOpen(false)
      setIsMobileMenuOpen(false)

      await signOut({
        redirectUrl: '/login',
      })
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#3D2925]/95 backdrop-blur-md border-b border-[#6B1E2B] text-white shadow-lg">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between h-[72px]">

            {/* =====================================================
                LOGO
            ====================================================== */}

            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setActiveTab('explore')}
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#D88924] via-[#A44A3F] to-[#C9972B] p-[2px] shadow-lg shadow-[#D88924]/20">

                <div className="w-full h-full bg-[#3D2925] rounded-[14px] flex items-center justify-center">

                  <Compass className="w-6 h-6 text-[#C9972B] animate-[spin_12s_linear_infinite]" />

                </div>

              </div>

              <div>

                <div className="flex items-center gap-1.5">

                  <span className="font-display font-extrabold text-xl tracking-tight text-white">
                    Explorer<span className="text-[#C9972B]">IQ</span>
                  </span>

                  <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#C9972B]/20 text-[#E8C76A] border border-[#C9972B]/30 rounded-full">
                    v2.5
                  </span>

                </div>

                <p className="text-[11px] text-[#D8C9B8] font-medium hidden sm:block">
                  Smart Tourism & Monument Visual Recognition
                </p>

              </div>

            </div>

            {/* =====================================================
                DESKTOP NAVIGATION
            ====================================================== */}

            <nav className="hidden md:flex items-center gap-1 bg-[#54202A]/80 p-1 rounded-2xl border border-[#7A3940]/60">

              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#D88924] to-[#6B1E2B] text-white shadow-md shadow-[#D88924]/30'
                        : 'text-[#E4D7C8] hover:text-white hover:bg-[#6B1E2B]/70'
                    }`}
                  >

                    <Icon
                      className={`w-4 h-4 ${
                        isActive
                          ? 'text-white'
                          : 'text-[#C9972B]'
                      }`}
                    />

                    <span>
                      {item.label}
                    </span>

                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#C9972B]/15 text-[#E8C76A] border border-[#C9972B]/20'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                  </button>
                )
              })}

            </nav>

            {/* =====================================================
                DESKTOP RIGHT CONTROLS
            ====================================================== */}

            <div className="hidden sm:flex items-center gap-3">

              {/* Audio */}

              {audioState.isPlaying && (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#D88924]/15 border border-[#D88924]/30 rounded-xl text-[#E8C76A] text-xs font-medium">

                  <Volume2 className="w-4 h-4 animate-pulse text-[#C9972B]" />

                  <span className="text-[11px] font-semibold">
                    Narrating...
                  </span>

                </div>
              )}

              {/* Route Planner */}

              <button
                type="button"
                onClick={() =>
                  openRoutePlanner && openRoutePlanner(null)
                }
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#D88924]/15 to-[#6B1E2B]/20 hover:from-[#D88924]/25 hover:to-[#6B1E2B]/30 border border-[#C9972B]/30 rounded-xl text-xs font-semibold text-[#E8C76A] hover:text-white transition-all shadow-xs"
                title="Live Multi-Modal Transit & Route Planner"
              >

                <Navigation className="w-3.5 h-3.5 text-[#C9972B]" />

                <span className="hidden lg:inline">
                  Route Planner
                </span>

              </button>

              {/* Bookmarks */}

              <button
                type="button"
                onClick={() => setIsBookmarkModalOpen(true)}
                className="relative p-2.5 bg-[#54202A]/90 hover:bg-[#6B1E2B]/90 border border-[#7A3940] rounded-xl text-[#D8C9B8] hover:text-white transition-colors"
                title="Saved Places"
              >

                <Bookmark className="w-4 h-4" />

                {bookmarks.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#C9972B] text-[#3D2925] text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-[#3D2925]">
                    {bookmarks.length}
                  </span>
                )}

              </button>

              {/* =================================================
                  DESKTOP PROFILE
              ================================================== */}

              <div
                className="relative"
                ref={desktopProfileRef}
              >

                <button
                  type="button"
                  onClick={() =>
                    setIsProfileMenuOpen(
                      (previous) => !previous
                    )
                  }
                  className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl bg-[#54202A]/90 hover:bg-[#6B1E2B] border border-[#7A3940] transition-all"
                  title="Account"
                >

                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={displayName}
                      className="w-8 h-8 rounded-lg object-cover border border-[#C9972B]/50"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D88924] to-[#6B1E2B] flex items-center justify-center text-white text-xs font-bold">
                      {initials}
                    </div>
                  )}

                  <div className="hidden xl:block text-left max-w-[100px]">

                    <p className="text-[11px] font-semibold text-white truncate">
                      {displayName}
                    </p>

                    <p className="text-[9px] text-[#D8C9B8] truncate">
                      Explorer
                    </p>

                  </div>

                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#C9972B] transition-transform ${
                      isProfileMenuOpen
                        ? 'rotate-180'
                        : ''
                    }`}
                  />

                </button>

                {/* Desktop Dropdown */}

                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full mt-3 w-72 bg-[#FFF8E7] rounded-2xl border border-[#C9972B]/40 shadow-2xl overflow-hidden z-[100]">

                    {/* User Header */}

                    <div className="p-4 bg-gradient-to-r from-[#6B1E2B] to-[#54202A]">

                      <div className="flex items-center gap-3">

                        {user?.imageUrl ? (
                          <img
                            src={user.imageUrl}
                            alt={displayName}
                            className="w-11 h-11 rounded-xl object-cover border-2 border-[#C9972B]/60"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-[#D88924] flex items-center justify-center text-[#3D2925] font-bold">
                            {initials}
                          </div>
                        )}

                        <div className="min-w-0">

                          <p className="text-sm font-bold text-white truncate">
                            {displayName}
                          </p>

                          <p className="text-[11px] text-[#E8C76A] truncate">
                            {email}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Menu */}

                    <div className="p-2">

                      {/* Profile */}

                      <button
                        type="button"
                        onClick={() => goTo('/profile')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#3D2925] hover:bg-[#F4E7D0] transition-colors text-left cursor-pointer"
                      >

                        <User className="w-4 h-4 text-[#6B1E2B]" />

                        <div>

                          <p className="text-sm font-semibold">
                            Profile
                          </p>

                          <p className="text-[10px] text-[#6B5A55]">
                            Manage your account
                          </p>

                        </div>

                      </button>

                      {/* Settings */}

                      <button
                        type="button"
                        onClick={() => goTo('/settings')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#3D2925] hover:bg-[#F4E7D0] transition-colors text-left cursor-pointer"
                      >

                        <Settings className="w-4 h-4 text-[#6B1E2B]" />

                        <div>

                          <p className="text-sm font-semibold">
                            Settings
                          </p>

                          <p className="text-[10px] text-[#6B5A55]">
                            Preferences & account
                          </p>

                        </div>

                      </button>

                      {/* My Trips */}

                      <button
                        type="button"
                        onClick={() => goTo('/trips')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#3D2925] hover:bg-[#F4E7D0] transition-colors text-left cursor-pointer"
                      >

                        <Map className="w-4 h-4 text-[#6B1E2B]" />

                        <div>

                          <p className="text-sm font-semibold">
                            My Trips
                          </p>

                          <p className="text-[10px] text-[#6B5A55]">
                            Your travel plans
                          </p>

                        </div>

                      </button>

                      {/* Saved Places */}

                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileMenuOpen(false)
                          setIsBookmarkModalOpen(true)
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#3D2925] hover:bg-[#F4E7D0] transition-colors text-left cursor-pointer"
                      >

                        <Bookmark className="w-4 h-4 text-[#6B1E2B]" />

                        <div>

                          <p className="text-sm font-semibold">
                            Saved Places
                          </p>

                          <p className="text-[10px] text-[#6B5A55]">
                            Your bookmarked destinations
                          </p>

                        </div>

                      </button>

                      <div className="my-2 border-t border-[#C9972B]/20" />

                      {/* Help */}

                      <button
                        type="button"
                        onClick={() => goTo('/help')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#3D2925] hover:bg-[#F4E7D0] transition-colors text-left cursor-pointer"
                      >

                        <CircleHelp className="w-4 h-4 text-[#6B1E2B]" />

                        <div>

                          <p className="text-sm font-semibold">
                            Help & Support
                          </p>

                          <p className="text-[10px] text-[#6B5A55]">
                            Get help with ExplorerIQ
                          </p>

                        </div>

                      </button>

                      {/* Sign Out */}

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#A44A3F] hover:bg-[#A44A3F]/10 transition-colors text-left cursor-pointer"
                      >

                        <LogOut className="w-4 h-4" />

                        <div>

                          <p className="text-sm font-semibold">
                            Sign Out
                          </p>

                          <p className="text-[10px] text-[#6B5A55]">
                            Sign out of ExplorerIQ
                          </p>

                        </div>

                      </button>

                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* =====================================================
                MOBILE CONTROLS
            ====================================================== */}

            <div className="flex sm:hidden items-center gap-2">

              {/* Mobile Profile */}

              <div
                className="relative"
                ref={mobileProfileRef}
              >

                <button
                  type="button"
                  onClick={() =>
                    setIsProfileMenuOpen(
                      (previous) => !previous
                    )
                  }
                  className="p-1 rounded-xl bg-[#54202A] border border-[#7A3940]"
                >

                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={displayName}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D88924] to-[#6B1E2B] flex items-center justify-center text-white text-xs font-bold">
                      {initials}
                    </div>
                  )}

                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full mt-3 w-64 bg-[#FFF8E7] rounded-2xl border border-[#C9972B]/40 shadow-2xl overflow-hidden z-[100]">

                    <div className="p-4 bg-[#6B1E2B]">

                      <p className="text-sm font-bold text-white">
                        {displayName}
                      </p>

                      <p className="text-[10px] text-[#E8C76A] truncate">
                        {email}
                      </p>

                    </div>

                    <div className="p-2">

                      <button
                        type="button"
                        onClick={() => goTo('/profile')}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#F4E7D0] text-[#3D2925] text-left cursor-pointer"
                      >
                        <User className="w-4 h-4 text-[#6B1E2B]" />
                        <span className="text-sm font-semibold">
                          Profile
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => goTo('/settings')}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#F4E7D0] text-[#3D2925] text-left cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-[#6B1E2B]" />
                        <span className="text-sm font-semibold">
                          Settings
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => goTo('/trips')}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#F4E7D0] text-[#3D2925] text-left cursor-pointer"
                      >
                        <Map className="w-4 h-4 text-[#6B1E2B]" />
                        <span className="text-sm font-semibold">
                          My Trips
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => goTo('/help')}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#F4E7D0] text-[#3D2925] text-left cursor-pointer"
                      >
                        <CircleHelp className="w-4 h-4 text-[#6B1E2B]" />
                        <span className="text-sm font-semibold">
                          Help & Support
                        </span>
                      </button>

                      <div className="my-2 border-t border-[#C9972B]/20" />

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#A44A3F]/10 text-[#A44A3F] text-left cursor-pointer"
                      >

                        <LogOut className="w-4 h-4" />

                        <span className="text-sm font-semibold">
                          Sign Out
                        </span>

                      </button>

                    </div>

                  </div>
                )}

              </div>

              {/* Mobile Bookmark */}

              <button
                type="button"
                onClick={() => setIsBookmarkModalOpen(true)}
                className="p-2 bg-[#54202A] rounded-xl text-[#D8C9B8]"
              >
                <Bookmark className="w-4 h-4" />
              </button>

              {/* Mobile Menu */}

              <button
                type="button"
                onClick={() =>
                  setIsMobileMenuOpen(
                    (previous) => !previous
                  )
                }
                className="p-2 bg-[#54202A] rounded-xl text-[#D8C9B8] hover:text-white"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

            </div>

          </div>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION DRAWER
        ====================================================== */}

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#6B1E2B] bg-[#3D2925]/98 px-4 pt-3 pb-5 space-y-3">

            <div className="grid grid-cols-2 gap-2">

              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#D88924] text-white'
                        : 'bg-[#54202A] text-[#D8C9B8]'
                    }`}
                  >

                    <Icon className="w-4 h-4" />

                    <span>
                      {item.label}
                    </span>

                  </button>
                )
              })}

            </div>

            {/* Mobile Route Planner */}

            <button
              type="button"
              onClick={() => {
                openRoutePlanner && openRoutePlanner(null)
                setIsMobileMenuOpen(false)
              }}
              className="w-full p-3 bg-gradient-to-r from-[#D88924] to-[#6B1E2B] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#D88924]/20"
            >

              <Navigation className="w-4 h-4" />

              <span>
                Open Live Route & Transit Planner
              </span>

            </button>

          </div>
        )}

      </header>

      {/* =====================================================
          BOOKMARK MODAL
      ====================================================== */}

      <BookmarkModal
        isOpen={isBookmarkModalOpen}
        onClose={() => setIsBookmarkModalOpen(false)}
      />

    </>
  )
}