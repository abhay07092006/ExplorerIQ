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
  Check
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { CITIES_DATA } from '../../data/travelData';

const PREFERENCE_OPTIONS = [
  { id: 'heritage', label: 'Heritage & History', icon: '🏛️' },
  { id: 'temples', label: 'Temples & Spirituality', icon: '🛕' },
  { id: 'food', label: 'Street Food & Dining', icon: '🍲' },
  { id: 'museums', label: 'Museums & Culture', icon: '🖼️' },
  { id: 'scenic', label: 'Scenic Views & Parks', icon: '🌳' }
];

export default function ItineraryPlanner() {
  const { currentCityId, setCurrentCityId, openPlaceDrawer, setActiveTab } = useTravel();

  const [selectedDays, setSelectedDays] = useState(1); // 1 or 3
  const [selectedPreferences, setSelectedPreferences] = useState([
    'heritage',
    'food',
    'scenic'
  ]);
  const [selectedPace, setSelectedPace] = useState('balanced'); // 'relaxed' | 'balanced' | 'packed'
  const [completedStops, setCompletedStops] = useState({});

  const city = CITIES_DATA.find((c) => c.id === currentCityId) || CITIES_DATA[0];

  const togglePreference = (id) => {
    setSelectedPreferences((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleStop = (stopId) => {
    setCompletedStops((prev) => {
      const next = { ...prev, [stopId]: !prev[stopId] };

      // Trigger confetti if all stops in Day 1 are checked
      const allChecked = Object.values(next).filter(Boolean).length >= 4;
      if (allChecked && !prev[stopId]) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      return next;
    });
  };

  // Generate dynamic day-by-day plan based on city's actual places and food specialties
  const generatedSchedule = useMemo(() => {
    if (!city || !city.places) return [];

    const daysCount = selectedDays;
    const daysPlan = [];

    // Filter matching places by user preferences
    const matchingPlaces = city.places.filter((p) =>
      selectedPreferences.includes(p.category)
    );
    const pool = matchingPlaces.length >= 3 ? matchingPlaces : city.places;
    const foodList = city.localFoodSpecialties || [];

    for (let day = 1; day <= daysCount; day++) {
      const daySlots = [];
      const offset = (day - 1) * 2;

      // Morning Slot: Scenic / Early Heritage
      const morningPlace = pool[offset % pool.length] || city.places[0];
      daySlots.push({
        id: `d${day}-slot1`,
        time: '06:30 AM - 08:30 AM',
        title: `Sunrise at ${morningPlace.name}`,
        category: morningPlace.category,
        place: morningPlace,
        type: 'Sightseeing',
        desc: `Beat the daytime rush and capture golden morning reflections. ${morningPlace.tip || ''}`,
        isFood: false
      });

      // Breakfast Slot
      const breakfast = foodList[0] || { name: 'Local Heritage Breakfast', place: 'Old City Bazaar', desc: 'Fresh morning street specialties' };
      daySlots.push({
        id: `d${day}-slot2`,
        time: '08:45 AM - 09:45 AM',
        title: `Breakfast: ${breakfast.name}`,
        location: breakfast.place,
        desc: breakfast.desc,
        type: 'Culinary Highlight',
        isFood: true
      });

      // Mid-day Major Sight
      const midDayPlace = pool[(offset + 1) % pool.length] || city.places[1 % city.places.length];
      daySlots.push({
        id: `d${day}-slot3`,
        time: '10:15 AM - 01:00 PM',
        title: `Deep Exploration of ${midDayPlace.name}`,
        category: midDayPlace.category,
        place: midDayPlace,
        type: 'Cultural Landmark',
        desc: midDayPlace.shortDesc,
        isFood: false
      });

      // Lunch Slot
      const lunch = foodList[1] || foodList[0] || { name: 'Traditional Regional Thali', place: 'Iconic Local Eatery', desc: 'Slow-cooked authentic feast' };
      daySlots.push({
        id: `d${day}-slot4`,
        time: '01:15 PM - 02:30 PM',
        title: `Lunch: ${lunch.name}`,
        location: lunch.place,
        desc: lunch.desc,
        type: 'Food Experience',
        isFood: true
      });

      // Afternoon Cultural / Museum / Temple Spot
      const afternoonPlace = pool[(offset + 2) % pool.length] || city.places[2 % city.places.length];
      daySlots.push({
        id: `d${day}-slot5`,
        time: '03:00 PM - 05:30 PM',
        title: `Afternoon Tour: ${afternoonPlace.name}`,
        category: afternoonPlace.category,
        place: afternoonPlace,
        type: 'Heritage & Art',
        desc: `${afternoonPlace.shortDesc} (Tip: ${afternoonPlace.tip || 'Check opening hours'})`,
        isFood: false
      });

      // Sunset & Evening Walk
      const eveningPlace = pool[(offset + 3) % pool.length] || pool[0];
      daySlots.push({
        id: `d${day}-slot6`,
        time: '06:00 PM - 08:30 PM',
        title: `Sunset Twilight & Night Atmosphere at ${eveningPlace.name}`,
        category: eveningPlace.category,
        place: eveningPlace,
        type: 'Evening Atmosphere',
        desc: `Wind down your day with evening illuminations, temple bells, and night street bazaars.`,
        isFood: false
      });

      // Adjust slots by selected pace
      let finalSlots = daySlots;
      if (selectedPace === 'relaxed') {
        // 4 leisurely stops: morning vista, breakfast, major sight, sunset
        finalSlots = [daySlots[0], daySlots[1], daySlots[2], daySlots[5]];
      } else if (selectedPace === 'packed') {
        // Add 7th late night street food & bazaar crawl stop
        finalSlots = [
          ...daySlots,
          {
            id: `d${day}-slot7`,
            time: '09:00 PM - 10:30 PM',
            title: `Night Bazaar & Late Street Delicacies in ${city.name}`,
            category: 'food',
            type: 'Night Experience',
            desc: `Sample sizzling kulfi, hot spiced milk, or roasted sweets amidst the bustling nocturnal bazaar.`,
            isFood: true
          }
        ];
      }

      daysPlan.push({
        dayNumber: day,
        title: day === 1 ? 'Day 1: Imperial Landmarks & Classic Flavors' : day === 2 ? 'Day 2: Sacred Shrines, Art & Hidden Alleys' : 'Day 3: Scenic Horizons & Artisan Markets',
        slots: finalSlots
      });
    }

    return daysPlan;
  }, [city, selectedDays, selectedPreferences, selectedPace]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold mb-2">
          <CalendarDays className="w-4 h-4 text-amber-500" />
          <span>Smart Automated Travel Schedule Generator</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
          Custom Itinerary Planner
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Pick your preferences, trip duration, and pace to generate a tailored, hour-by-hour cultural route.
        </p>
      </div>

      {/* Configuration Wizard Panel */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg max-w-4xl mx-auto space-y-6">
        
        {/* Step 1: Destination Selection */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
            Step 1: Choose Your Destination
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {CITIES_DATA.map((c) => (
              <button
                key={c.id}
                onClick={() => setCurrentCityId(c.id)}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  c.id === currentCityId
                    ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20 scale-102'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Duration (1-Day vs 3-Day) & Travel Pace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
              Step 2: Trip Duration
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedDays(1)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedDays === 1
                    ? 'border-sky-500 bg-sky-50/70 ring-2 ring-sky-500/20'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80'
                }`}
              >
                <span className="font-extrabold text-sm text-slate-900 block">
                  1-Day Express Tour
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  Best for quick weekend trips & must-sees
                </span>
              </button>

              <button
                onClick={() => setSelectedDays(3)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedDays === 3
                    ? 'border-sky-500 bg-sky-50/70 ring-2 ring-sky-500/20'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80'
                }`}
              >
                <span className="font-extrabold text-sm text-slate-900 block">
                  3-Day In-Depth Explorer
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  Covers all top monuments, food, and culture
                </span>
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
              Step 3: Exploration Pace
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'relaxed', label: 'Relaxed', sub: 'Leisurely' },
                { id: 'balanced', label: 'Balanced', sub: 'Optimal' },
                { id: 'packed', label: 'Packed', sub: 'Fast-Track' }
              ].map((pace) => (
                <button
                  key={pace.id}
                  onClick={() => setSelectedPace(pace.id)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedPace === pace.id
                      ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs'
                  }`}
                >
                  <p className="text-xs font-bold">{pace.label}</p>
                  <p className="text-[10px] text-slate-500">{pace.sub}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 4: Travel Vibe & Preferences */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
            Step 4: Your Travel Interests (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2.5">
            {PREFERENCE_OPTIONS.map((pref) => {
              const isSelected = selectedPreferences.includes(pref.id);
              return (
                <button
                  key={pref.id}
                  onClick={() => togglePreference(pref.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{pref.icon}</span>
                  <span>{pref.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Generated Itinerary Timeline Output */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Output Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">
              Generated Schedule for
            </span>
            <h2 className="font-display font-extrabold text-lg text-slate-900">
              {city.name} ({selectedDays}-Day Curated Route)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Day-by-day schedules */}
        {generatedSchedule.map((dayPlan) => (
          <div
            key={dayPlan.dayNumber}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg space-y-6"
          >
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 bg-sky-500/10 text-sky-600 rounded-md text-[11px] font-bold uppercase tracking-wider">
                  Day {dayPlan.dayNumber}
                </span>
                <h3 className="font-display font-black text-xl text-slate-900 mt-1">
                  {dayPlan.title}
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {dayPlan.slots.length} Curated Stops
              </span>
            </div>

            {/* Timeline Steps */}
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
                    {/* Checkbox circle indicator */}
                    <button
                      onClick={() => toggleStop(slot.id)}
                      className={`absolute left-1.5 top-2 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
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

                    {/* Step Card */}
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-slate-100/70 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-sky-600 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{slot.time}</span>
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            slot.isFood
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-sky-100 text-sky-700'
                          }`}
                        >
                          {slot.type}
                        </span>
                      </div>

                      <h4 className={`font-display font-bold text-sm text-slate-900 ${isChecked ? 'line-through' : ''}`}>
                        {slot.title}
                      </h4>

                      {slot.location && (
                        <p className="text-xs font-semibold text-slate-600 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-amber-500" />
                          <span>{slot.location}</span>
                        </p>
                      )}

                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {slot.desc}
                      </p>

                      {/* Map drawer trigger if place exists */}
                      {slot.place && (
                        <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                          <button
                            onClick={() => {
                              openPlaceDrawer(slot.place);
                              setActiveTab('explore');
                            }}
                            className="text-[11px] font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                          >
                            <span>View spot details & hours</span>
                            <ArrowRight className="w-3 h-3" />
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
