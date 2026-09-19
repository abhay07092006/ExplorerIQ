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
  AlertCircle,
  TrendingDown,
  Coins,
  ShieldAlert,
  Percent,
  Navigation
} from 'lucide-react';
import { useTravel } from '../context/useTravel';
import { handleImageError } from '../utils/imageUtils';
import { getBookingUrl } from '../utils/bookingUrlBuilder';

const STYLE_OPTIONS = [
  { id: 'heritage', label: 'Culture & Heritage', icon: '🏛️' },
  { id: 'temples', label: 'Spiritual & Temples', icon: '🛕' },
  { id: 'food', label: 'Foodie & Street Eats', icon: '🍲' },
  { id: 'scenic', label: 'Relaxed & Scenic', icon: '🌳' },
  { id: 'adventure', label: 'Adventure & Nature', icon: '🏔️' }
];

const PRESET_BUDGETS_INR = [12000, 25000, 50000, 100000];
const PRESET_BUDGETS_USD = [150, 300, 600, 1200];

export default function SmartPlanner() {
  const { 
    currentCityId, 
    setCurrentCityId, 
    destinations = [], 
    openPlaceDrawer,
    openRoutePlanner,
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
  const [currency, setCurrency] = useState('INR'); // 'INR' or 'USD'
  const [totalBudget, setTotalBudget] = useState(25000);
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
        totalBudget,
        currency,
        travelStyles: selectedStyles
      });
    }
  }, [destinations.length]);

  const handleCurrencyToggle = (newCurr) => {
    if (newCurr === currency) return;
    setCurrency(newCurr);
    if (newCurr === 'USD') {
      setTotalBudget(Math.round(totalBudget / 84));
    } else {
      setTotalBudget(Math.round(totalBudget * 84));
    }
  };

  const handleGeneratePlan = (customOverrides = {}) => {
    calculateLivePlan({
      destinationId: selectedCityId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      totalBudget,
      currency,
      travelStyles: selectedStyles,
      ...customOverrides
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
  const progress = plannerResult?.progressBreakdown;
  const isDeficit = plannerResult?.isDeficit;
  const deficitAmount = plannerResult?.deficitAmount;
  const suggestions = plannerResult?.suggestions || [];

  return (
    <div className="w-full space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-600 text-xs font-bold mb-3">
          <Sparkles className="w-4 h-4 text-sky-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span>User-Defined Budget Engine • 45% Accommodation Cap • Live ASI Pricing</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
          Smart Travel Planner & Budget Allocator
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Set your exact spending limit in ₹ or $. We constrain hotel costs to 45%, fetch verified ASI monument fees,
          and dynamically distribute the rest for dining and intra-city mobility.
        </p>
      </div>

      {/* Control Panel: Budget, Destination, Dates, Guests */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* Step 1: User-Defined Exact Budget Input */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Step 1: Your Total Travel Budget
              </span>
              <p className="text-xs text-slate-500">
                Enter your total spending cap for the entire trip (all guests & days).
              </p>
            </div>

            {/* Currency Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleCurrencyToggle('INR')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currency === 'INR' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => handleCurrencyToggle('USD')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currency === 'USD' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                $ USD
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">
                {currency === 'USD' ? '$' : '₹'}
              </span>
              <input
                type="number"
                min="1000"
                step="500"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Math.max(100, parseInt(e.target.value, 10) || 0))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-lg font-extrabold text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                placeholder="e.g. 25000"
              />
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(currency === 'USD' ? PRESET_BUDGETS_USD : PRESET_BUDGETS_INR).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTotalBudget(preset)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                    totalBudget === preset
                      ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {currency === 'USD' ? `$${preset}` : `₹${preset.toLocaleString('en-IN')}`}
                </button>
              ))}
            </div>
          </div>

          {/* 45% Rule Indicator */}
          <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
            <span>
              45% Hotel Cap: Maximum <strong className="text-slate-700">{currency === 'USD' ? `$${Math.round(totalBudget * 0.45)}` : `₹${Math.round(totalBudget * 0.45).toLocaleString('en-IN')}`}</strong> will be allocated for accommodation.
            </span>
          </div>
        </div>

        {/* Step 2: Destination Hub */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Step 2: Destination Hub
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

        {/* Step 3: Dates & Guests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
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

        {/* Step 4: Travel Styles */}
        <div className="pt-3 border-t border-slate-100">
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
            <span>Strict Budget Guardrails: Real hotel rates, exact ASI tickets & residual food allocation.</span>
          </div>
          <button
            onClick={() => handleGeneratePlan()}
            disabled={isLoadingPlanner}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoadingPlanner ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Allocating Budget & Itinerary...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Calculate Adaptive Itinerary Plan</span>
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
            <h4 className="font-bold text-slate-900 text-base">Allocating Real-Time Travel Budget</h4>
            <p className="text-xs text-sky-600 font-medium mt-1 animate-pulse">
              {plannerLoadingMessage || 'Applying 45% accommodation cap and querying verified ASI rates...'}
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
          
          {/* Budget Deficit Alert Banner if over budget */}
          {isDeficit && (
            <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-rose-100 text-rose-700 rounded-2xl flex-shrink-0 mt-0.5">
                  <ShieldAlert className="w-6 h-6 text-rose-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-rose-600 text-white rounded-md text-[10px] font-extrabold uppercase tracking-wider">
                      Budget Deficit Alert
                    </span>
                    <span className="text-xs font-bold text-rose-900">
                      Estimated expenses exceed your cap by ₹{deficitAmount.toLocaleString('en-IN')} ({currency === 'USD' ? `$${Math.round(deficitAmount / 84)}` : ''})
                    </span>
                  </div>
                  <p className="text-xs text-rose-700 mt-1.5">
                    Your specified budget of <strong>{currency === 'USD' ? `$${totalBudget}` : `₹${totalBudget.toLocaleString('en-IN')}`}</strong> is below the minimum realistic baseline (₹{budget?.grandTotal?.toLocaleString('en-IN')}) for {nightsCount} nights and {guests} adults in {activeCity.name}.
                  </p>
                </div>
              </div>

              {/* Actionable Cost-Saving Suggestions */}
              {suggestions.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-rose-200 space-y-2">
                  <span className="text-xs font-extrabold text-slate-900 block flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-emerald-600" />
                    <span>Recommended Cost-Saving Adjustments:</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {suggestions.map((sug) => (
                      <div key={sug.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex flex-col justify-between">
                        <div>
                          <p className="font-bold text-slate-900">{sug.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{sug.description}</p>
                        </div>
                        <span className="mt-2 text-[11px] font-extrabold text-emerald-600">
                          Potential Savings: ₹{sug.savingsINR?.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VISUAL BUDGET PROGRESS BAR */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Budget Allocation Progress Bar
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-0.5">
                  Where Your {currency === 'USD' ? `$${totalBudget}` : `₹${totalBudget.toLocaleString('en-IN')}`} Goes
                </h4>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-500">Total Cap: <strong>₹{budget?.userCustomBudget?.toLocaleString('en-IN')}</strong></span>
                <span className="text-slate-500">•</span>
                <span className={isDeficit ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                  {isDeficit ? `Deficit: ₹${deficitAmount.toLocaleString('en-IN')}` : `Buffer: ₹${budget?.emergencyBuffer?.total?.toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>

            {/* Multi-segment Progress Bar */}
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              {progress?.accommodationPct > 0 && (
                <div
                  style={{ width: `${Math.min(100, progress.accommodationPct)}%` }}
                  className="bg-sky-500 hover:opacity-90 transition-all cursor-pointer"
                  title={`Accommodation: ${progress.accommodationPct}%`}
                />
              )}
              {progress?.ticketsPct > 0 && (
                <div
                  style={{ width: `${Math.min(100, progress.ticketsPct)}%` }}
                  className="bg-purple-500 hover:opacity-90 transition-all cursor-pointer"
                  title={`ASI Tickets: ${progress.ticketsPct}%`}
                />
              )}
              {progress?.foodPct > 0 && (
                <div
                  style={{ width: `${Math.min(100, progress.foodPct)}%` }}
                  className="bg-amber-500 hover:opacity-90 transition-all cursor-pointer"
                  title={`Local Dining: ${progress.foodPct}%`}
                />
              )}
              {progress?.transitPct > 0 && (
                <div
                  style={{ width: `${Math.min(100, progress.transitPct)}%` }}
                  className="bg-teal-500 hover:opacity-90 transition-all cursor-pointer"
                  title={`City Transit: ${progress.transitPct}%`}
                />
              )}
              {progress?.bufferPct > 0 && (
                <div
                  style={{ width: `${Math.min(100, progress.bufferPct)}%` }}
                  className="bg-emerald-500 hover:opacity-90 transition-all cursor-pointer"
                  title={`Emergency Buffer: ${progress.bufferPct}%`}
                />
              )}
              {isDeficit && (
                <div
                  style={{ width: `${Math.min(100, progress?.deficitPct || 10)}%` }}
                  className="bg-rose-500 hover:opacity-90 transition-all cursor-pointer animate-pulse"
                  title={`Deficit Overrun: ${progress?.deficitPct}%`}
                />
              )}
            </div>

            {/* Progress Bar Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-sky-500" />
                <span className="text-slate-600">Hotel ({progress?.accommodationPct}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-slate-600">ASI Tickets ({progress?.ticketsPct}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-slate-600">Dining ({progress?.foodPct}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-teal-500" />
                <span className="text-slate-600">Transit ({progress?.transitPct}%)</span>
              </div>
              {progress?.bufferPct > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-emerald-700 font-bold">Buffer ({progress.bufferPct}%)</span>
                </div>
              )}
              {isDeficit && (
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="text-rose-700 font-bold">Deficit ({progress?.deficitPct}%)</span>
                </div>
              )}
            </div>
          </div>

          {/* Cards Row: Recommended Hotel + Ticket Costs + Regional Dining Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. Live Property Card (Enforcing 45% cap) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-600">
                    <BedDouble className="w-4 h-4" />
                    <span>Selected Under 45% Cap</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-sky-100 text-sky-700">
                    {plannerResult.budgetTier}
                  </span>
                </div>

                <h4 className="font-bold text-base text-slate-900">{hotel?.name || 'Selected Property'}</h4>
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

                <a
                  href={getBookingUrl({
                    destination: activeCity?.name || 'India',
                    checkInDate: checkIn,
                    checkOutDate: checkOut,
                    guests: guests || 1,
                    hotelName: hotel?.name || ''
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Check Property on Booking.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
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
                    <span>Residual Dining & Transit</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-700">
                    Allocated
                  </span>
                </div>

                <h4 className="font-bold text-base text-slate-900">Living Expenses & City Mobility</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Dynamically allocated from remaining budget:
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
                      Covers breakfast, lunch thali, chai stops, and evening street food crawls.
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
                      Covers full-day e-rickshaws, autos, and transit between scheduled landmarks.
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
                {currency === 'USD' && <span className="text-slate-400 text-xl font-normal ml-2">(${Math.round((budget?.grandTotal || 0) / 84)})</span>}
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
                            <div className="mt-2 flex items-center justify-between gap-2">
                              <button
                                onClick={() => openPlaceDrawer(slot.place)}
                                className="text-[11px] font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                              >
                                <span>View details</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>

                              <button
                                onClick={() => openRoutePlanner && openRoutePlanner(slot.place)}
                                className="text-[11px] font-bold text-slate-700 hover:text-sky-600 flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 hover:bg-sky-50 transition-colors"
                                title="Plan Route & Transit to Stop"
                              >
                                <Navigation className="w-3 h-3 text-sky-500" />
                                <span>Directions</span>
                              </button>
                            </div>
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
