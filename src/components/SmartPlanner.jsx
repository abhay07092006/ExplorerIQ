import { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  CalendarDays, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Printer, 
  ArrowRight, 
  Check, 
  Search, 
  Wallet, 
  Bookmark, 
  Building, 
  Utensils, 
  Car, 
  Ticket, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  BedDouble, 
  Users, 
  Info, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useTravel } from '../context/useTravel';
import { handleImageError } from '../utils/imageUtils';

const BUDGET_TIERS = [
  {
    id: 'backpacker',
    label: 'Backpacker',
    sub: 'Verified social hostels, street eats & local transit',
    icon: '🎒',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'moderate',
    label: 'Moderate',
    sub: 'Heritage havelis, boutique 3-4★ hotels & local cabs',
    icon: '🧳',
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'luxury',
    label: 'Luxury',
    sub: '5-star royal palaces, fine dining & private chauffeur',
    icon: '💎',
    color: 'from-purple-500 to-indigo-600'
  }
];

const STYLE_OPTIONS = [
  { id: 'heritage', label: 'Culture & Heritage', icon: '🏛️' },
  { id: 'temples', label: 'Spiritual & Temples', icon: '🛕' },
  { id: 'food', label: 'Foodie & Street Eats', icon: '🍲' },
  { id: 'scenic', label: 'Relaxed & Scenic', icon: '🌳' },
  { id: 'adventure', label: 'Adventure & Nature', icon: '🏔️' }
];

export default function SmartPlanner() {
  const { 
    currentCityId, 
    setCurrentCityId, 
    destinations = [], 
    openPlaceDrawer,
    plannerParams,
    setPlannerParams,
    plannerResult,
    isLoadingPlanner,
    plannerLoadingMessage,
    plannerError,
    calculateLivePlan
  } = useTravel();

  // Local form state
  const [selectedCityId, setSelectedCityId] = useState(currentCityId || 'jaipur');
  const [checkIn, setCheckIn] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [checkOut, setCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 10);
    return d.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState(2);
  const [selectedBudget, setSelectedBudget] = useState('moderate');
  const [selectedStyles, setSelectedStyles] = useState(['heritage', 'food', 'scenic']);
  
  // Completed stops tracker
  const [completedStops, setCompletedStops] = useState({});
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');

  // Calculate nights
  const nightsCount = useMemo(() => {
    if (!checkIn || !checkOut) return 3;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
    return Math.max(1, isNaN(diff) ? 3 : diff);
  }, [checkIn, checkOut]);

  // Current selected destination object
  const activeCity = useMemo(() => {
    return destinations.find((c) => c.id === selectedCityId) || destinations[0] || {
      id: 'jaipur',
      name: 'Jaipur',
      state: 'Rajasthan',
      zone: 'North'
    };
  }, [destinations, selectedCityId]);

  // Filter destinations for selector
  const filteredDestinations = useMemo(() => {
    return destinations.filter((c) => {
      const q = citySearch.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q);
    });
  }, [destinations, citySearch]);

  // Trigger initial calculation once destinations load
  useEffect(() => {
    if (destinations.length > 0 && !plannerResult && !isLoadingPlanner) {
      calculateLivePlan({
        destinationId: selectedCityId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guests,
        budgetTier: selectedBudget,
        travelStyles: selectedStyles
      });
    }
  }, [destinations.length]);

  const handleGeneratePlan = () => {
    calculateLivePlan({
      destinationId: selectedCityId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      budgetTier: selectedBudget,
      travelStyles: selectedStyles
    });
  };

  const toggleStyle = (id) => {
    setSelectedStyles((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((s) => s !== id) : prev;
      }
      return [...prev, id];
    });
  };

  const toggleStop = (stopId) => {
    setCompletedStops((prev) => {
      const next = { ...prev, [stopId]: !prev[stopId] };
      const checkedCount = Object.values(next).filter(Boolean).length;
      if (checkedCount >= 4 && !prev[stopId]) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      return next;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const budget = plannerResult?.budgetSummary;
  const hotel = plannerResult?.hotel;

  return (
    <div className="w-full space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-600 text-xs font-bold mb-3">
          <Sparkles className="w-4 h-4 text-sky-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Live Hotel Search API & ASI Verified Ticketing Engine</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
          Real-Time Smart Itinerary & Budget Planner
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          No static formulas. We fetch authentic nightly hotel rates, verified ASI monument entry ticket fees,
          and regional cost indexes to calculate your trip down to the rupee.
        </p>
      </div>

      {/* Control Panel: Destination, Dates, Guests, Tier */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* Step 1: Destination Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Step 1: Destination Hub
            </span>
            <span className="text-xs font-bold text-sky-600">
              {activeCity.name}, {activeCity.state}
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-2xl text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
                  <img
                    src={activeCity.heroImage}
                    alt={activeCity.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{activeCity.name}</h4>
                  <p className="text-xs text-slate-500">{activeCity.state} • {activeCity.zone} Zone</p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </button>

            {isCityDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-30 max-h-72 overflow-hidden flex flex-col">
                <div className="relative mb-2">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    placeholder="Search 29 destinations..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                  />
                </div>
                <div className="overflow-y-auto space-y-1 flex-1">
                  {filteredDestinations.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCityId(c.id);
                        setCurrentCityId(c.id);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                        c.id === selectedCityId
                          ? 'bg-sky-50 text-sky-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                      <span>{c.name}</span>
                      <span className="text-slate-400 ml-auto text-[11px]">{c.state}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Stay Dates & Guests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-sky-500" />
              <span>Check-in Date</span>
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-sky-500" />
              <span>Check-out Date</span>
              <span className="ml-auto text-[11px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
                {nightsCount} Nights ({nightsCount} Days)
              </span>
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-sky-500" />
              <span>Guests Count</span>
              <span className="ml-auto text-[11px] text-slate-400 font-medium">
                {Math.ceil(guests / 2)} Room(s)
              </span>
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-10 h-9 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 flex items-center justify-center transition-colors"
              >
                -
              </button>
              <div className="flex-1 text-center font-bold text-sm text-slate-800 bg-slate-50 border border-slate-200 py-2 rounded-xl">
                {guests} {guests === 1 ? 'Adult' : 'Adults'}
              </div>
              <button
                type="button"
                onClick={() => setGuests(Math.min(10, guests + 1))}
                className="w-10 h-9 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Step 3: Budget Tier */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
            Step 3: Choose Budget Comfort Tier
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BUDGET_TIERS.map((tier) => {
              const isSelected = selectedBudget === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedBudget(tier.id)}
                  className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50/40 ring-4 ring-sky-500/10 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{tier.icon}</span>
                    {isSelected && (
                      <span className="p-1 rounded-full bg-sky-500 text-white">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900">{tier.label}</h5>
                    <p className="text-xs text-slate-500 mt-0.5">{tier.sub}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 4: Travel Styles */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Step 4: Itinerary Focus & Travel Styles
          </span>
          <div className="flex flex-wrap gap-2">
            {STYLE_OPTIONS.map((style) => {
              const isSelected = selectedStyles.includes(style.id);
              return (
                <button
                  key={style.id}
                  onClick={() => toggleStyle(style.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{style.icon}</span>
                  <span>{style.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Real arithmetic guarantee: Nightly Hotel + Exact ASI Tickets + Regional Dining & Transit.</span>
          </div>
          <button
            onClick={handleGeneratePlan}
            disabled={isLoadingPlanner}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoadingPlanner ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Fetching Live Pricing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Calculate Live Itinerary & Budget</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading HUD */}
      {isLoadingPlanner && (
        <div className="bg-white rounded-3xl p-8 border border-sky-200 shadow-lg text-center max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-200 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
            <RefreshCw className="w-7 h-7 animate-spin text-sky-500" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">Real-Time Pricing Synchronization</h4>
            <p className="text-xs text-sky-600 font-medium mt-1 animate-pulse">
              {plannerLoadingMessage || 'Querying live hotel and ticket APIs...'}
            </p>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-sky-500 h-full w-2/3 animate-[pulse_1.5s_infinite]" />
          </div>
        </div>
      )}

      {/* Error Banner */}
      {plannerError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
          <span>{plannerError}</span>
        </div>
      )}

      {/* Planner Result Views */}
      {plannerResult && !isLoadingPlanner && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Live Notice Pill */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-emerald-900">
                Live Pricing Activated:
              </span>
              <span className="text-emerald-700">
                {plannerResult.notice || 'Verified property rates and ASI ticket schedules synchronized.'}
              </span>
            </div>
            <div className="text-slate-400 text-[11px]">
              Destination Hub: <strong className="text-slate-700">{activeCity.name}</strong> • {nightsCount} Nights • {guests} Guests
            </div>
          </div>

          {/* Cards Row: Recommended Hotel + Ticket Costs + Regional Dining Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. Live Property Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-600">
                    <BedDouble className="w-4 h-4" />
                    <span>Real-Time Property Listing</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-sky-100 text-sky-700">
                    {plannerResult.budgetTier}
                  </span>
                </div>

                <h4 className="font-bold text-base text-slate-900">{hotel?.name || 'Selected Heritage Property'}</h4>
                <p className="text-xs text-slate-500 mt-1 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>{hotel?.address || `Historic Quarter, ${activeCity.name}`}</span>
                </p>

                {hotel?.rating && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="px-2 py-0.5 bg-amber-500 text-white text-[11px] font-extrabold rounded-md">
                      ★ {hotel.rating}
                    </span>
                    <span className="text-xs text-slate-400">Verified Guest Rating</span>
                  </div>
                )}

                {hotel?.amenities && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {hotel.amenities.slice(0, 3).map((a, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Nightly Rate (1 Room):</span>
                    <span className="font-semibold text-slate-800">₹{hotel?.nightlyRatePerRoom?.toLocaleString('en-IN') || 0}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Stay Duration:</span>
                    <span className="font-semibold text-slate-800">{hotel?.roomsNeeded || Math.ceil(guests / 2)} Room(s) × {nightsCount} Night(s)</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Base Accommodation:</span>
                    <span className="font-semibold text-slate-800">₹{budget?.accommodation?.baseCost?.toLocaleString('en-IN') || 0}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Estimated 12% GST:</span>
                    <span className="font-semibold text-slate-800">₹{budget?.accommodation?.taxes?.toLocaleString('en-IN') || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1 border-t border-slate-100">
                    <span>Total Stay Cost:</span>
                    <span className="text-sky-600">₹{budget?.accommodation?.total?.toLocaleString('en-IN') || 0}</span>
                  </div>
                </div>

                {hotel?.bookingUrl && (
                  <a
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Check Property on Booking.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* 2. ASI Entry Tickets Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-600">
                    <Ticket className="w-4 h-4" />
                    <span>Verified ASI Monument Tickets</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-100 text-purple-700">
                    ASI Verified
                  </span>
                </div>

                <h4 className="font-bold text-base text-slate-900">Scheduled Monument Entry Fees</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Exact counter and online ASI entry fees for each visited landmark:
                </p>

                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-1">
                  {budget?.tickets?.items?.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                      <div className="min-w-0 pr-2">
                        <span className="font-bold text-slate-800 truncate block">
                          Day {item.day}: {item.name}
                        </span>
                        <span className="text-[10px] text-slate-400">Authorized ASI Heritage Site</span>
                      </div>
                      <span className="font-extrabold text-slate-900 whitespace-nowrap">
                        ₹{item.fee} <span className="text-[10px] font-normal text-slate-500">/ person</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Total Ticket Cost per Person:</span>
                    <span className="font-semibold text-slate-800">₹{budget?.tickets?.perPerson}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Guests Count:</span>
                    <span className="font-semibold text-slate-800">{guests} Adults</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1 border-t border-slate-100">
                    <span>Total Entry Tickets:</span>
                    <span className="text-purple-600">₹{budget?.tickets?.total?.toLocaleString('en-IN') || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Regional Dining & Transit Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                    <Utensils className="w-4 h-4" />
                    <span>Regional Food & Local Transit</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-700">
                    Indexed Cost
                  </span>
                </div>

                <h4 className="font-bold text-base text-slate-900">Living Expenses & City Mobility</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Indexed for {plannerResult?.regionalCosts?.tierLabel || 'Heritage Region'}:
                </p>

                <div className="mt-4 space-y-3">
                  <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-amber-900 flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-amber-600" />
                        <span>Food & Street Crawls:</span>
                      </span>
                      <span className="font-extrabold text-amber-950">₹{budget?.food?.perPersonPerDay} / person / day</span>
                    </div>
                    <p className="text-[11px] text-amber-800/80 mt-1">
                      Includes traditional breakfast, mid-day thali, evening chai breaks, and dinner street food crawls.
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50/60 border border-blue-200/60 rounded-xl">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-blue-900 flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-blue-600" />
                        <span>Intra-City Transit:</span>
                      </span>
                      <span className="font-extrabold text-blue-950">₹{budget?.transit?.perDay} / day</span>
                    </div>
                    <p className="text-[11px] text-blue-800/80 mt-1">
                      Covers full-day e-rickshaws, city autos, and heritage circuit rides between monuments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Total Dining ({guests} guests × {nightsCount} days):</span>
                    <span className="font-semibold text-slate-800">₹{budget?.food?.total?.toLocaleString('en-IN') || 0}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Total Local Transit ({nightsCount} days):</span>
                    <span className="font-semibold text-slate-800">₹{budget?.transit?.total?.toLocaleString('en-IN') || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1 border-t border-slate-100">
                    <span>Dining & Mobility Total:</span>
                    <span className="text-amber-600">₹{((budget?.food?.total || 0) + (budget?.transit?.total || 0)).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grand Total Calculation Banner */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold">
                <Wallet className="w-3.5 h-3.5" />
                <span>Exact Mathematical Grand Total</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold">
                Estimated Trip Budget: <span className="text-sky-400">₹{budget?.grandTotal?.toLocaleString('en-IN') || 0}</span>
              </h3>
              <p className="text-xs text-slate-400 max-w-xl">
                Breakdown: ₹{budget?.accommodation?.total?.toLocaleString('en-IN')} (Hotel) + ₹{budget?.tickets?.total?.toLocaleString('en-IN')} (ASI Tickets) + ₹{budget?.food?.total?.toLocaleString('en-IN')} (Dining) + ₹{budget?.transit?.total?.toLocaleString('en-IN')} (Transit).
              </p>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto justify-center lg:justify-end">
              <div className="text-center p-3 bg-slate-800/80 rounded-2xl border border-slate-700 min-w-[120px]">
                <span className="text-[11px] text-slate-400 block font-medium">Per Person</span>
                <span className="text-base font-extrabold text-white">₹{budget?.perPersonCost?.toLocaleString('en-IN')}</span>
              </div>
              <div className="text-center p-3 bg-slate-800/80 rounded-2xl border border-slate-700 min-w-[120px]">
                <span className="text-[11px] text-slate-400 block font-medium">Daily Average</span>
                <span className="text-base font-extrabold text-white">₹{budget?.dailyAverage?.toLocaleString('en-IN')}</span>
              </div>
              <button
                onClick={handlePrint}
                className="px-4 py-3 bg-sky-500 hover:bg-sky-600 text-slate-950 font-bold text-xs rounded-2xl transition-colors flex items-center gap-2 flex-shrink-0"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>
            </div>
          </div>

          {/* Day-by-Day 7-Slot Schedule */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-xl text-slate-900">
                  Day-by-Day 7-Slot Itinerary
                </h3>
                <p className="text-xs text-slate-500">
                  Carefully arranged chronological slots starting from Sunrise Vista through Primary ASI Monuments to Night Street Food Crawls.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
                {plannerResult.schedule?.length} Planned Days
              </span>
            </div>

            <div className="space-y-8">
              {plannerResult.schedule?.map((day) => (
                <div key={day.dayNumber} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-extrabold text-sm flex items-center justify-center">
                        D{day.dayNumber}
                      </span>
                      <h4 className="font-bold text-base text-slate-900">{day.dayTitle}</h4>
                    </div>
                    <span className="text-xs font-semibold text-slate-400">7 Scheduled Slots</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {day.slots?.map((slot) => {
                      const isCompleted = !!completedStops[slot.id];
                      return (
                        <div
                          key={slot.id}
                          className={`p-4 rounded-2xl border transition-all relative ${
                            isCompleted
                              ? 'bg-slate-50/70 border-slate-200 opacity-60'
                              : slot.slotIndex === 3
                              ? 'bg-purple-50/30 border-purple-200 shadow-xs'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                              slot.slotIndex === 3
                                ? 'bg-purple-100 text-purple-700 border border-purple-200'
                                : slot.isFood
                                ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {slot.slotLabel}
                            </span>
                            <button
                              onClick={() => toggleStop(slot.id)}
                              className="text-slate-400 hover:text-emerald-600 transition-colors"
                              title="Mark stop as completed"
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{slot.time}</span>
                          </div>

                          <h5 className={`font-bold text-sm text-slate-900 ${isCompleted ? 'line-through text-slate-400' : ''}`}>
                            {slot.title}
                          </h5>

                          <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                            {slot.desc}
                          </p>

                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                            <span className="text-slate-500 flex items-center gap-1">
                              {slot.transit}
                            </span>
                            <span className={`font-bold ${slot.numericFee > 0 ? 'text-purple-600 font-extrabold' : 'text-slate-600'}`}>
                              {slot.entryFee}
                            </span>
                          </div>

                          {slot.place && (
                            <button
                              onClick={() => openPlaceDrawer(slot.place)}
                              className="mt-2 text-[11px] font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                            >
                              <span>View details & photos</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
