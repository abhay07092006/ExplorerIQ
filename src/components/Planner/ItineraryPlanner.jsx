import { useState, useMemo } from 'react';
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
  Trash2
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';

import { handleImageError } from '../../utils/imageUtils';

const DURATION_OPTIONS = [
  { days: 1, label: '1 Day', sub: 'Express Tour', icon: '⚡' },
  { days: 2, label: '2 Days', sub: 'Weekend Break', icon: '✨' },
  { days: 3, label: '3 Days', sub: 'Classic Explorer', icon: '🌟' },
  { days: 5, label: '5 Days', sub: 'In-Depth Journey', icon: '🧭' },
  { days: 7, label: '7 Days', sub: 'Grand Circuit', icon: '👑' }
];

const STYLE_OPTIONS = [
  { id: 'heritage', label: 'Culture & Heritage', icon: '🏛️' },
  { id: 'temples', label: 'Spiritual & Temples', icon: '🛕' },
  { id: 'food', label: 'Foodie & Street Eats', icon: '🍲' },
  { id: 'scenic', label: 'Relaxed & Scenic', icon: '🌳' },
  { id: 'adventure', label: 'Adventure & Nature', icon: '🏔️' }
];

const BUDGET_TIERS = [
  {
    id: 'budget',
    label: 'Backpacker',
    sub: 'Hostels, local transit & street food',
    dailyRates: { stay: 600, food: 400, transport: 150, tickets: 150 },
    icon: '🎒'
  },
  {
    id: 'moderate',
    label: 'Moderate',
    sub: '3-star boutique hotels, heritage dining & cabs',
    dailyRates: { stay: 2200, food: 1000, transport: 500, tickets: 300 },
    icon: '🧳'
  },
  {
    id: 'luxury',
    label: 'Luxury',
    sub: '5-star heritage palaces, fine dining & chauffeur',
    dailyRates: { stay: 6500, food: 2500, transport: 1500, tickets: 600 },
    icon: '💎'
  }
];

export default function ItineraryPlanner() {
  const { currentCityId, setCurrentCityId, openPlaceDrawer, setActiveTab, destinations = [] } = useTravel();

  // Wizard state
  const [selectedDays, setSelectedDays] = useState(3);
  const [selectedStyles, setSelectedStyles] = useState(['heritage', 'food', 'scenic']);
  const [selectedBudget, setSelectedBudget] = useState('moderate');
  const [completedStops, setCompletedStops] = useState({});

  // Destination search & zone filters
  const [citySearch, setCitySearch] = useState('');
  const [zoneFilter, setZoneFilter] = useState('All');
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);

  // Saved trips state
  const [savedTrips, setSavedTrips] = useState(() => {
    try {
      const stored = localStorage.getItem('exploreriq_saved_trips');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  const city = destinations.find((c) => c.id === currentCityId) || destinations[0] || {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    zone: 'North',
    places: []
  };

  // Zones available
  const zones = ['All', 'North', 'South', 'East', 'West', 'Central'];

  // Filtered cities list
  const filteredCities = useMemo(() => {
    return destinations.filter((c) => {
      const matchesZone = zoneFilter === 'All' || c.zone === zoneFilter;
      const matchesSearch = 
        c.name.toLowerCase().includes(citySearch.toLowerCase()) ||
        c.state.toLowerCase().includes(citySearch.toLowerCase());
      return matchesZone && matchesSearch;
    });
  }, [destinations, zoneFilter, citySearch]);

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

  // Live Budget Calculation
  const budgetTier = BUDGET_TIERS.find((b) => b.id === selectedBudget) || BUDGET_TIERS[1];
  const budgetBreakdown = useMemo(() => {
    const stay = budgetTier.dailyRates.stay * selectedDays;
    const food = budgetTier.dailyRates.food * selectedDays;
    const transport = budgetTier.dailyRates.transport * selectedDays;
    const tickets = budgetTier.dailyRates.tickets * selectedDays;
    const total = stay + food + transport + tickets;

    return {
      stay,
      food,
      transport,
      tickets,
      total,
      dailyAverage: Math.round(total / selectedDays)
    };
  }, [budgetTier, selectedDays]);

  // Dynamic Day-by-Day Plan
  const generatedSchedule = useMemo(() => {
    if (!city || !city.places) return [];

    const daysCount = selectedDays;
    const daysPlan = [];

    // Filter places by selected preferences where possible
    const matchingPlaces = city.places.filter((p) => {
      if (selectedStyles.includes('heritage') && p.category === 'heritage') return true;
      if (selectedStyles.includes('temples') && p.category === 'temples') return true;
      if (selectedStyles.includes('food') && p.category === 'food') return true;
      if (selectedStyles.includes('scenic') && p.category === 'scenic') return true;
      if (selectedStyles.includes('adventure') && (p.category === 'scenic' || p.category === 'heritage')) return true;
      return false;
    });

    const pool = matchingPlaces.length >= 4 ? matchingPlaces : city.places;
    const foodList = city.localFoodSpecialties || [];

    const travelTimeEstimates = [
      '⏱️ 15 min via auto-rickshaw',
      '⏱️ 20 min cab ride across city',
      '⏱️ 10 min heritage walk',
      '⏱️ 25 min scenic drive',
      '⏱️ 12 min walking path'
    ];

    for (let day = 1; day <= daysCount; day++) {
      const daySlots = [];
      const offset = (day - 1) * 3;

      // 1. Morning Vista / Spiritual Site (06:30 - 08:30)
      const morningPlace = pool[offset % pool.length] || city.places[0];
      daySlots.push({
        id: `d${day}-slot1`,
        time: '06:30 AM - 08:45 AM',
        title: `Sunrise at ${morningPlace.name}`,
        category: morningPlace.category,
        place: morningPlace,
        type: 'Sightseeing & Photography',
        desc: `Beat the crowds and relish the tranquil morning breeze. ${morningPlace.tip || 'Golden hour is ideal for photography.'}`,
        transit: '⏱️ Departure from hotel',
        entryFee: morningPlace.fee || 'Free Entry',
        tip: morningPlace.tip || 'Early morning offers crisp lighting without long queues.',
        isFood: false
      });

      // 2. Breakfast & Morning Food Break (09:00 - 10:00)
      const breakfast = foodList[(day - 1) % foodList.length] || {
        name: 'Traditional Regional Breakfast',
        place: 'Old City Bazaar',
        desc: 'Crispy breads, piping hot spiced delicacies, and freshly brewed morning chai.'
      };
      daySlots.push({
        id: `d${day}-slot2`,
        time: '09:00 AM - 10:00 AM',
        title: `Breakfast: ${breakfast.name}`,
        location: breakfast.place,
        desc: breakfast.desc,
        type: 'Culinary Heritage',
        transit: travelTimeEstimates[(day * 2) % travelTimeEstimates.length],
        entryFee: '₹120 - ₹250 per person',
        tip: 'Ask for the house specialty with extra fresh herbs.',
        isFood: true
      });

      // 3. Mid-day Prime Landmark (10:15 - 01:00)
      const midDayPlace = pool[(offset + 1) % pool.length] || city.places[1 % city.places.length];
      daySlots.push({
        id: `d${day}-slot3`,
        time: '10:15 AM - 01:00 PM',
        title: `In-Depth Exploration: ${midDayPlace.name}`,
        category: midDayPlace.category,
        place: midDayPlace,
        type: 'Historic Landmark',
        desc: midDayPlace.shortDesc,
        transit: travelTimeEstimates[(day * 3) % travelTimeEstimates.length],
        entryFee: midDayPlace.fee || 'Standard ASI Entry',
        tip: midDayPlace.tip || 'Audio guides are available at the main gate ticket counter.',
        isFood: false
      });

      // 4. Authentic Lunch Feast (01:15 - 02:30)
      const lunch = foodList[day % foodList.length] || breakfast;
      daySlots.push({
        id: `d${day}-slot4`,
        time: '01:15 PM - 02:30 PM',
        title: `Lunch: ${lunch.name}`,
        location: lunch.place,
        desc: lunch.desc,
        type: 'Regional Gastronomy',
        transit: '⏱️ 10 min walk to dining hub',
        entryFee: '₹250 - ₹600 per person',
        tip: 'Try the traditional unlimited thali for an all-round regional tasting.',
        isFood: true
      });

      // 5. Afternoon Cultural & Museum / Crafts Stop (02:45 - 05:15)
      const afternoonPlace = pool[(offset + 2) % pool.length] || city.places[2 % city.places.length];
      daySlots.push({
        id: `d${day}-slot5`,
        time: '02:45 PM - 05:15 PM',
        title: `Afternoon Discovery: ${afternoonPlace.name}`,
        category: afternoonPlace.category,
        place: afternoonPlace,
        type: 'Art & Culture',
        desc: `${afternoonPlace.shortDesc} (Tip: ${afternoonPlace.tip || 'Check internal museum exhibits'})`,
        transit: travelTimeEstimates[(day * 4) % travelTimeEstimates.length],
        entryFee: afternoonPlace.fee || '₹50 entry fee',
        tip: afternoonPlace.tip || 'Great spot for artisan textiles and souvenirs.',
        isFood: false
      });

      // 6. Sunset Twilight & Evening Bazaar (05:45 - 08:30)
      const eveningPlace = pool[(offset + 3) % pool.length] || pool[0];
      daySlots.push({
        id: `d${day}-slot6`,
        time: '05:45 PM - 08:30 PM',
        title: `Sunset Twilight & Night Bells at ${eveningPlace.name}`,
        category: eveningPlace.category,
        place: eveningPlace,
        type: 'Atmospheric Evening',
        desc: 'Witness golden hour reflections, atmospheric evening ceremonies, and vibrant local night markets.',
        transit: travelTimeEstimates[(day * 5) % travelTimeEstimates.length],
        entryFee: 'Free Public Area',
        tip: 'Arrive 30 minutes before dusk for the best vantage point.',
        isFood: false
      });

      // 7. Late Night Street Eats Crawl (08:45 - 10:15)
      daySlots.push({
        id: `d${day}-slot7`,
        time: '08:45 PM - 10:15 PM',
        title: `Nocturnal Street Bazaar Crawl in ${city.name}`,
        category: 'food',
        type: 'Night Experience',
        desc: `Stroll through the lit market alleys to sample local sweets, saffron milk, roasted dry-fruit treats, and signature desserts.`,
        transit: '⏱️ 5 min walk through market',
        entryFee: 'Pay per street dish (₹60 - ₹150)',
        tip: 'Look for the stalls with the longest local queue for the freshest batches.',
        isFood: true
      });

      const dayThemes = [
        'Imperial Heritage, Palaces & Classic Flavors',
        'Sacred Shrines, Ancient Architecture & Local Alleys',
        'Scenic Horizons, Artisans & Secret Bazaars',
        'Royal Enclaves, Museums & Regional Craft Traditions',
        'Lakeside Vistas, Fortresses & Gastronomy Trails',
        'Spiritual Retreats, Ancient Stepwells & Night Lights',
        'Grand Finale: Panoramic Overlooks & Heritage Fare'
      ];

      daysPlan.push({
        dayNumber: day,
        title: `Day ${day}: ${dayThemes[(day - 1) % dayThemes.length]}`,
        slots: daySlots
      });
    }

    return daysPlan;
  }, [city, selectedDays, selectedStyles]);

  // Save Trip to LocalStorage
  const handleSaveTrip = () => {
    const newTrip = {
      id: `trip-${Date.now()}`,
      cityId: city.id,
      cityName: city.name,
      state: city.state,
      image: city.heroImage,
      days: selectedDays,
      styles: selectedStyles,
      budget: selectedBudget,
      totalCost: budgetBreakdown.total,
      savedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    const updated = [newTrip, ...savedTrips.filter((t) => !(t.cityId === city.id && t.days === selectedDays))];
    setSavedTrips(updated);
    try {
      localStorage.setItem('exploreriq_saved_trips', JSON.stringify(updated));
      setSaveSuccessMessage(`Trip to ${city.name} (${selectedDays} Days) saved to your device!`);
      setTimeout(() => setSaveSuccessMessage(''), 3500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteTrip = (tripId) => {
    const updated = savedTrips.filter((t) => t.id !== tripId);
    setSavedTrips(updated);
    try {
      localStorage.setItem('exploreriq_saved_trips', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoadTrip = (trip) => {
    setCurrentCityId(trip.cityId);
    setSelectedDays(trip.days);
    if (trip.styles) setSelectedStyles(trip.styles);
    if (trip.budget) setSelectedBudget(trip.budget);
    setIsSavedDrawerOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold mb-2">
          <CalendarDays className="w-4 h-4 text-amber-500" />
          <span>Smart Automated Multi-Day Travel Planner</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
          AI Smart Travel Itinerary Planner
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Generate hour-by-hour schedules, travel time estimates, entry fee breakdowns, and live expense calculations across India's top 29 destinations.
        </p>
      </div>

      {/* Saved Trip Notification Toast */}
      {saveSuccessMessage && (
        <div className="max-w-md mx-auto p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-2xl flex items-center justify-between shadow-md animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{saveSuccessMessage}</span>
          </div>
          <button
            onClick={() => setIsSavedDrawerOpen(true)}
            className="text-emerald-700 underline text-[11px] font-semibold"
          >
            View Saved
          </button>
        </div>
      )}

      {/* Configuration Wizard Panel */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl max-w-4xl mx-auto space-y-8">
        
        {/* Step 1: Destination Selection (29 Destinations with Quick Zones) */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Step 1: Destination ({destinations.length} Cities Across India)
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                Current destination: <span className="font-bold text-sky-600">{city?.name || 'Agra'}, {city?.state || 'Uttar Pradesh'}</span> ({city?.zone || 'North'} Zone)
              </p>
            </div>

            <button
              onClick={() => setIsCitySelectorOpen(!isCitySelectorOpen)}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              <span>{isCitySelectorOpen ? 'Close City Grid' : 'Browse All Cities'}</span>
              {isCitySelectorOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Quick Active City Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="absolute inset-0 z-0 opacity-30">
              <img
                src={city.heroImage}
                alt={city.name}
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{city.state} • {city.zone} India</span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                {city.name}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl line-clamp-1">
                {city.tagline}
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0 flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Best Season</span>
                <span className="font-bold text-amber-300">{city.bestTimeToVisit.split('(')[0]}</span>
              </div>
            </div>
          </div>

          {/* Expandable Destination Picker */}
          {isCitySelectorOpen && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-200">
              {/* Search & Zone Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    placeholder="Search city, state (e.g. Jaipur, Varanasi, Kerala)..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {zones.map((z) => (
                    <button
                      key={z}
                      onClick={() => setZoneFilter(z)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                        zoneFilter === z
                          ? 'bg-slate-900 text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </div>

              {/* City Choice Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-56 overflow-y-auto p-1">
                {filteredCities.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCurrentCityId(c.id);
                      setIsCitySelectorOpen(false);
                    }}
                    className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2 ${
                      c.id === currentCityId
                        ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                      <img
                        src={c.heroImage}
                        alt={c.name}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-xs truncate">{c.name}</p>
                      <p className={`text-[10px] truncate ${c.id === currentCityId ? 'text-sky-100' : 'text-slate-400'}`}>
                        {c.zone}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Trip Duration (1, 2, 3, 5, 7 Days) */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
            Step 2: Trip Duration
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.days}
                onClick={() => setSelectedDays(opt.days)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedDays === opt.days
                    ? 'border-sky-500 bg-sky-50/70 ring-2 ring-sky-500/20 shadow-sm'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">{opt.icon}</span>
                  {selectedDays === opt.days && (
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                  )}
                </div>
                <span className="font-extrabold text-sm text-slate-900 block">
                  {opt.label}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5 block truncate">
                  {opt.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Travel Style / Vibe Choice Chips */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
            Step 3: Travel Style & Vibes (Select all that fit you)
          </label>
          <div className="flex flex-wrap gap-2.5">
            {STYLE_OPTIONS.map((style) => {
              const isSelected = selectedStyles.includes(style.id);
              return (
                <button
                  key={style.id}
                  onClick={() => toggleStyle(style.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-102'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-sm">{style.icon}</span>
                  <span>{style.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 4: Budget Tier Selection */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
            Step 4: Budget & Comfort Level
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BUDGET_TIERS.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedBudget(tier.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedBudget === tier.id
                    ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">{tier.icon}</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    ~₹{tier.dailyRates.stay + tier.dailyRates.food + tier.dailyRates.transport + tier.dailyRates.tickets}/day
                  </span>
                </div>
                <h4 className="font-display font-extrabold text-sm text-slate-900">
                  {tier.label}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {tier.sub}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 5: Live Budget & Expense Calculator Widget */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-200 rounded-3xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/60 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-xs">
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm sm:text-base text-slate-900">
                  Live Travel Budget & Expense Calculator
                </h3>
                <p className="text-[11px] text-slate-500">
                  Estimated cost breakdown for {selectedDays} Day(s) in {city.name} ({budgetTier.label} tier)
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Total Estimated Trip Cost
              </span>
              <span className="font-display font-black text-2xl text-emerald-700">
                ₹{budgetBreakdown.total.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-slate-500 block">
                (~₹{budgetBreakdown.dailyAverage.toLocaleString('en-IN')} / day)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
                <Building className="w-3.5 h-3.5 text-sky-500" />
                <span>Stay / Hotel</span>
              </div>
              <p className="font-extrabold text-sm text-slate-900">
                ₹{budgetBreakdown.stay.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-slate-400">
                ₹{budgetTier.dailyRates.stay}/night
              </span>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
                <Utensils className="w-3.5 h-3.5 text-rose-500" />
                <span>Food & Dining</span>
              </div>
              <p className="font-extrabold text-sm text-slate-900">
                ₹{budgetBreakdown.food.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-slate-400">
                ₹{budgetTier.dailyRates.food}/day
              </span>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
                <Car className="w-3.5 h-3.5 text-amber-500" />
                <span>Local Transit</span>
              </div>
              <p className="font-extrabold text-sm text-slate-900">
                ₹{budgetBreakdown.transport.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-slate-400">
                ₹{budgetTier.dailyRates.transport}/day
              </span>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
                <Ticket className="w-3.5 h-3.5 text-purple-500" />
                <span>Entry Tickets</span>
              </div>
              <p className="font-extrabold text-sm text-slate-900">
                ₹{budgetBreakdown.tickets.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-slate-400">
                ₹{budgetTier.dailyRates.tickets}/day
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Generated Itinerary Output & Action Controls */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Output Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">
              Generated Itinerary for
            </span>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-slate-900">
              {city.name} • {selectedDays}-Day Curated Travel Route
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Includes {selectedDays * 7} scheduled slots with travel transit badges and local dining stops
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSaveTrip}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-500/20 transition-all active:scale-95"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save Trip to Device</span>
            </button>

            {savedTrips.length > 0 && (
              <button
                onClick={() => setIsSavedDrawerOpen(!isSavedDrawerOpen)}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                <span>Saved Trips ({savedTrips.length})</span>
                {isSavedDrawerOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
          </div>
        </div>

        {/* Saved Trips Drawer Panel */}
        {isSavedDrawerOpen && savedTrips.length > 0 && (
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-sky-500" />
                <span>Your Saved Itineraries</span>
              </h3>
              <span className="text-xs text-slate-400">Stored in browser localStorage</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {savedTrips.map((t) => (
                <div
                  key={t.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 bg-sky-100 text-sky-700 text-[10px] font-bold rounded-md uppercase">
                        {t.days} Days
                      </span>
                      <button
                        onClick={() => handleDeleteTrip(t.id)}
                        className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                        title="Delete saved trip"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="font-display font-bold text-sm text-slate-900">{t.cityName}</h4>
                    <p className="text-[11px] text-slate-500">{t.state} • Saved {t.savedAt}</p>
                    <p className="text-xs font-bold text-emerald-600 mt-1">Est. ₹{t.totalCost?.toLocaleString('en-IN')}</p>
                  </div>

                  <button
                    onClick={() => handleLoadTrip(t)}
                    className="mt-3 w-full py-1.5 bg-white border border-slate-200 hover:border-sky-500 hover:text-sky-600 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-colors"
                  >
                    Load Itinerary
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Day-by-Day Detailed Timelines */}
        {generatedSchedule.map((dayPlan) => (
          <div
            key={dayPlan.dayNumber}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6"
          >
            {/* Day Header */}
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="px-3 py-1 bg-sky-500/10 text-sky-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  Day {dayPlan.dayNumber} of {selectedDays}
                </span>
                <h3 className="font-display font-black text-xl text-slate-900 mt-1.5">
                  {dayPlan.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">
                  {dayPlan.slots.length} Curated Stops
                </span>
              </div>
            </div>

            {/* Step Timeline */}
            <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-200">
              {dayPlan.slots.map((slot) => {
                const isChecked = !!completedStops[slot.id];
                return (
                  <div
                    key={slot.id}
                    className={`relative pl-10 transition-opacity ${
                      isChecked ? 'opacity-50' : 'opacity-100'
                    }`}
                  >
                    {/* Checkbox button */}
                    <button
                      onClick={() => toggleStop(slot.id)}
                      className={`absolute left-1.5 top-3 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'bg-white border-slate-300 hover:border-sky-500'
                      }`}
                      title="Mark as visited"
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 fill-white text-emerald-500" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-slate-300" />
                      )}
                    </button>

                    {/* Content Box */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100/80 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-sky-600 flex items-center gap-1.5 bg-sky-50 px-2.5 py-1 rounded-lg">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{slot.time}</span>
                        </span>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                              slot.isFood
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-sky-100 text-sky-700'
                            }`}
                          >
                            {slot.type}
                          </span>
                        </div>
                      </div>

                      <h4 className={`font-display font-bold text-base text-slate-900 ${isChecked ? 'line-through' : ''}`}>
                        {slot.title}
                      </h4>

                      {slot.location && (
                        <p className="text-xs font-semibold text-slate-600 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-500" />
                          <span>{slot.location}</span>
                        </p>
                      )}

                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {slot.desc}
                      </p>

                      {/* Travel Badges Row: Transit Time & Entry Ticket */}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {slot.transit && (
                          <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 text-[11px] font-bold rounded-lg shadow-2xs">
                            {slot.transit}
                          </span>
                        )}
                        {slot.entryFee && (
                          <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold rounded-lg shadow-2xs">
                            🎟️ {slot.entryFee}
                          </span>
                        )}
                      </div>

                      {/* Insider Pro-Tip */}
                      {slot.tip && (
                        <div className="mt-2.5 p-2.5 bg-sky-500/10 border border-sky-500/20 rounded-xl text-[11px] text-sky-900 font-medium">
                          💡 <span className="font-bold">Insider Pro-Tip:</span> {slot.tip}
                        </div>
                      )}

                      {/* Map Drawer Shortcut */}
                      {slot.place && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                          <button
                            onClick={() => {
                              openPlaceDrawer(slot.place);
                              setActiveTab('explore');
                            }}
                            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                          >
                            <span>View spot details & live map</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
