import { Monument } from '../models/Monument.js';
import { Itinerary } from '../models/Itinerary.js';

// Regional daily cost indexes (INR)
const REGIONAL_COSTS = {
  agra: { foodPerDay: 500, transitPerDay: 250, hotelBase: 2500 },
  jaipur: { foodPerDay: 550, transitPerDay: 300, hotelBase: 3000 },
  delhi: { foodPerDay: 650, transitPerDay: 350, hotelBase: 3500 },
  varanasi: { foodPerDay: 400, transitPerDay: 200, hotelBase: 2000 },
  amritsar: { foodPerDay: 450, transitPerDay: 220, hotelBase: 2200 },
  mumbai: { foodPerDay: 750, transitPerDay: 400, hotelBase: 4500 },
  default: { foodPerDay: 500, transitPerDay: 250, hotelBase: 2800 }
};

// Regional food specialties
const REGIONAL_FOOD = {
  agra: [
    { name: 'Bedmi Puri & Aloo Sabzi with Petha', place: 'Deviram Sweets, Sadar Bazaar', desc: 'Crispy lentil breads with spiced potato gravy.' },
    { name: 'Mughlai Gosht & Butter Naan', place: 'Pinch of Spice, Fatehabad Rd', desc: 'Aromatic saffron gravy with charcoal-baked flatbreads.' },
    { name: 'Dalmoth & Kesar Jalebi Safari', place: 'Chaat Gali, Sadar Bazaar', desc: 'Crunchy savory lentils paired with piping hot jalebis.' }
  ],
  jaipur: [
    { name: 'Pyaz Kachori & Saffron Chai', place: 'Rawat Mishthan Bhandar', desc: 'Flaky onion-stuffed pastries with hot spiced tea.' },
    { name: 'Royal Rajasthani Dal Baati Churma', place: 'Chokhi Dhani / Laxmi Mishthan', desc: 'Baked wheat balls dipped in pure ghee with spiced lentils.' },
    { name: 'Ghewar & Kulfi Falooda Crawl', place: 'Johari Bazaar Night Lane', desc: 'Traditional honeycomb pastry soaked in saffron syrup.' }
  ],
  delhi: [
    { name: 'Chole Bhature & Lassi', place: 'Sita Ram Diwan Chand, Paharganj', desc: 'Fluffy fried breads with rich tangy chickpeas.' },
    { name: 'Old Delhi Nihari & Mutton Korma', place: 'Karim\'s / Al Jawahar, Jama Masjid', desc: 'Slow-cooked stew infused with royal spices.' },
    { name: 'Chandni Chowk Chaat Safari', place: 'Paranthe Wali Gali', desc: 'Stuffed fried flatbreads and cooling dahi bhallas.' }
  ],
  default: [
    { name: 'Traditional Regional Breakfast', place: 'Heritage Bazaar', desc: 'Fresh local breads, lentils, and hot clay-cup tea.' },
    { name: 'Royal Heritage Thali', place: 'Historic Dining Quarter', desc: 'Multi-course regional thali with local breads and curries.' },
    { name: 'Night Market Street Food Crawl', place: 'Old Town Night Square', desc: 'Sizzling local delicacies, kebabs, and sweets.' }
  ]
};

/**
 * Format Date to YYYY-MM-DD string
 */
function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Generate Booking.com search URL with dates and destination
 */
function buildBookingUrl(city, checkIn, checkOut, guests = 2) {
  const cIn = formatDate(checkIn) || formatDate(new Date());
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 2);
  const cOut = formatDate(checkOut) || formatDate(nextDay);

  const params = new URLSearchParams({
    ss: city || 'India',
    checkin: cIn,
    checkout: cOut,
    group_adults: guests.toString(),
    no_rooms: '1'
  });

  return `https://www.booking.com/searchresults.html?${params.toString()}`;
}

/**
 * POST /api/planner/generate
 * Generates custom 7-slot balanced day plans and dynamic budget breakdown
 */
export const generateItinerary = async (req, res) => {
  try {
    const {
      city = 'Agra',
      checkInDate,
      checkOutDate,
      budgetLimit = 25000,
      travelerType = 'Solo Explorer',
      guests = 2,
      travelStyles = ['heritage', 'food', 'scenic']
    } = req.body;

    const guestCount = Math.max(1, parseInt(guests, 10) || 2);
    const budgetInINR = Number(budgetLimit) || 25000;
    const normCity = String(city).trim().toLowerCase();

    // 1. Calculate Stay Nights
    let nights = 2;
    if (checkInDate && checkOutDate) {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diffDays = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
      if (diffDays > 0) nights = diffDays;
    }
    const daysCount = nights;

    // 2. Fetch Monuments for City from MongoDB (or seeded fallbacks)
    let monuments = [];
    try {
      monuments = await Monument.find({
        $or: [
          { city: new RegExp(normCity, 'i') },
          { name: new RegExp(normCity, 'i') }
        ]
      }).lean();
    } catch (_err) {
      monuments = [];
    }

    if (!monuments || monuments.length === 0) {
      // Fallback default monuments for common cities
      monuments = [
        { name: `${city} Grand Fort`, category: 'heritage', asiFee: { indian: 50, foreigner: 600 }, openingHours: '09:00 AM - 05:30 PM' },
        { name: `${city} Royal Palace`, category: 'heritage', asiFee: { indian: 40, foreigner: 400 }, openingHours: '09:30 AM - 05:00 PM' },
        { name: `${city} Sacred Heritage Temple`, category: 'temples', asiFee: { indian: 0, foreigner: 0 }, openingHours: '06:00 AM - 08:30 PM' },
        { name: `${city} Scenic Sunset Point`, category: 'scenic', asiFee: { indian: 20, foreigner: 100 }, openingHours: '06:00 AM - 07:00 PM' }
      ];
    }

    // 3. Regional cost reference
    const regional = REGIONAL_COSTS[normCity] || REGIONAL_COSTS.default;
    const foodList = REGIONAL_FOOD[normCity] || REGIONAL_FOOD.default;

    // 4. Calculate Fixed Committed Costs
    // Accommodation: nights * rooms * nightlyRate
    const roomsCount = Math.ceil(guestCount / 2);
    const nightlyRate = regional.hotelBase;
    const accommodationBase = nightlyRate * roomsCount * nights;
    const accommodationTax = Math.round(accommodationBase * 0.12);
    const accommodationTotal = accommodationBase + accommodationTax;

    // Entry Tickets: sum of visited monuments fees * guests
    let totalTicketFeePerPerson = 0;
    const dayPlan = [];

    for (let day = 1; day <= daysCount; day++) {
      const offset = (day - 1) * 2;
      const primaryMon = monuments[offset % monuments.length];
      const monFee = primaryMon?.asiFee?.indian ?? 50;
      totalTicketFeePerPerson += monFee;

      const morningSpot = monuments[(offset + 1) % monuments.length] || primaryMon;
      const eveningSpot = monuments[(offset + 2) % monuments.length] || primaryMon;
      const breakfast = foodList[(day - 1) % foodList.length];
      const lunch = foodList[day % foodList.length];
      const dinner = foodList[(day + 1) % foodList.length];

      const slots = [
        {
          id: `d${day}-s1`,
          slotIndex: 1,
          slotLabel: 'Slot 1: Sunrise & Morning Vista',
          time: '06:00 AM - 08:00 AM',
          title: `Sunrise at ${morningSpot.name}`,
          category: morningSpot.category || 'scenic',
          type: 'Sightseeing & Photography',
          desc: `Beat the crowds and relish the tranquil dawn breeze. Golden hour light creates ideal architectural views.`,
          transit: `⏱️ Departure from Selected ${city} Hotel`,
          entryFee: 'Free Entry / Morning Access',
          numericFee: 0,
          tip: 'Crisp morning air and peaceful atmosphere for photography.',
          isFood: false
        },
        {
          id: `d${day}-s2`,
          slotIndex: 2,
          slotLabel: 'Slot 2: Authentic Morning Breakfast',
          time: '08:30 AM - 09:30 AM',
          title: `Breakfast: ${breakfast.name}`,
          location: breakfast.place,
          desc: breakfast.desc,
          type: 'Culinary Heritage',
          transit: '⏱️ 15 min via auto-rickshaw',
          entryFee: '₹120 - ₹250 per person',
          numericFee: 0,
          tip: 'Ask for freshly brewed ginger-cardamom chai.',
          isFood: true
        },
        {
          id: `d${day}-s3`,
          slotIndex: 3,
          slotLabel: 'Slot 3: Primary ASI Monument',
          time: '10:00 AM - 01:00 PM',
          title: primaryMon.name,
          category: 'heritage',
          type: 'Verified ASI Heritage Landmark',
          desc: `Explore the intricate stone-carvings and royal halls with an authorized audio guide. Timings: ${primaryMon.openingHours || '09:00 AM - 05:30 PM'}.`,
          transit: '⏱️ 20 min cab across heritage corridor',
          entryFee: `₹${monFee} per Indian adult (ASI verified)`,
          numericFee: monFee,
          tip: 'Book tickets online via ASI portal for faster entry queue access.',
          isFood: false
        },
        {
          id: `d${day}-s4`,
          slotIndex: 4,
          slotLabel: 'Slot 4: Authentic Regional Lunch',
          time: '01:00 PM - 02:30 PM',
          title: `Lunch: ${lunch.name}`,
          location: lunch.place,
          desc: lunch.desc,
          type: 'Culinary Heritage',
          transit: '⏱️ 10 min scenic walk',
          entryFee: '₹250 - ₹600 per person',
          numericFee: 0,
          tip: 'Relax during midday heat with fresh seasonal coolers or lassi.',
          isFood: true
        },
        {
          id: `d${day}-s5`,
          slotIndex: 5,
          slotLabel: 'Slot 5: Artisan Bazaars & Crafts',
          time: '03:00 PM - 05:30 PM',
          title: `Artisan Guilds & Crafts near ${primaryMon.name}`,
          category: 'heritage',
          type: 'Living Culture & Crafts',
          desc: `Stroll through historic artisan alleys, block-printing guilds, and brass workshops.`,
          transit: '⏱️ 12 min e-rickshaw ride',
          entryFee: 'Free to explore',
          numericFee: 0,
          tip: 'Support local artisans directly for authentic handloom crafts.',
          isFood: false
        },
        {
          id: `d${day}-s6`,
          slotIndex: 6,
          slotLabel: 'Slot 6: Twilight / Sunset Viewpoint',
          time: '06:00 PM - 07:30 PM',
          title: `Sunset Vantage at ${eveningSpot.name}`,
          category: 'scenic',
          type: 'Evening Atmosphere & Aarti',
          desc: `Watch the evening sky illuminate the ramparts as dusk falls across the horizon.`,
          transit: '⏱️ 25 min scenic drive',
          entryFee: 'Free Entry',
          numericFee: 0,
          tip: 'Arrive 20 minutes before sunset for the best viewpoint seating.',
          isFood: false
        },
        {
          id: `d${day}-s7`,
          slotIndex: 7,
          slotLabel: 'Slot 7: Street Food Crawl & Dinner',
          time: '08:00 PM - 10:00 PM',
          title: `Night Food Safari: ${dinner.name}`,
          location: dinner.place,
          desc: dinner.desc,
          type: 'Night Food Safari',
          transit: '⏱️ 15 min return to Hotel',
          entryFee: '₹150 - ₹400 per person',
          numericFee: 0,
          tip: 'Head to century-old sweet shops for authentic regional desserts.',
          isFood: true
        }
      ];

      dayPlan.push({
        dayNumber: day,
        dayTitle: `Day ${day}: ${morningSpot.name} & ${primaryMon.name}`,
        slots
      });
    }

    const ticketsTotal = totalTicketFeePerPerson * guestCount;

    // 5. Residual Budget Allocation
    const committedCosts = accommodationTotal + ticketsTotal;
    const residualBudget = budgetInINR - committedCosts;

    let foodTotal = 0;
    let transitTotal = 0;
    let bufferTotal = 0;
    let isDeficit = false;
    let deficitAmount = 0;

    const standardFood = regional.foodPerDay * guestCount * daysCount;
    const standardTransit = regional.transitPerDay * daysCount;
    const baselineTotal = committedCosts + standardFood + standardTransit;

    if (residualBudget > 0) {
      const dynamicFood = Math.round(residualBudget * 0.55);
      const dynamicTransit = Math.round(residualBudget * 0.25);
      foodTotal = Math.max(standardFood * 0.8, dynamicFood);
      transitTotal = Math.max(standardTransit * 0.8, dynamicTransit);
      bufferTotal = Math.max(0, budgetInINR - (committedCosts + foodTotal + transitTotal));

      if (committedCosts + foodTotal + transitTotal > budgetInINR) {
        isDeficit = true;
        deficitAmount = Math.round((committedCosts + foodTotal + transitTotal) - budgetInINR);
        bufferTotal = 0;
      }
    } else {
      isDeficit = true;
      deficitAmount = Math.round(baselineTotal - budgetInINR);
      foodTotal = standardFood;
      transitTotal = standardTransit;
      bufferTotal = 0;
    }

    const grandTotal = accommodationTotal + ticketsTotal + foodTotal + transitTotal;

    // Suggestions for deficit
    const suggestions = [];
    if (isDeficit) {
      const hostelSavings = Math.round(accommodationTotal * 0.65);
      suggestions.push({
        id: 'switch_hostel',
        title: 'Switch to a Verified Budget Hostel',
        description: `Opt for a social heritage hostel like Zostel. Saves approximately ₹${hostelSavings.toLocaleString('en-IN')}.`,
        savingsINR: hostelSavings
      });
      if (daysCount > 1) {
        const daySavings = Math.round(grandTotal / daysCount);
        suggestions.push({
          id: 'shorten_trip',
          title: `Shorten Trip by 1 Day (${daysCount - 1} Days instead of ${daysCount})`,
          description: `Reduces hotel room nights, daily food, and local transit. Saves approximately ₹${daySavings.toLocaleString('en-IN')}.`,
          savingsINR: daySavings
        });
      }
    }

    const bookingUrl = buildBookingUrl(city, checkInDate, checkOutDate, guestCount);

    return res.json({
      success: true,
      destinationCity: city,
      days: daysCount,
      guests: guestCount,
      travelerType,
      budget: budgetInINR,
      breakdown: {
        accommodation: accommodationTotal,
        entryFees: ticketsTotal,
        food: foodTotal,
        transit: transitTotal,
        buffer: bufferTotal
      },
      grandTotal,
      isDeficit,
      deficitAmount,
      suggestions,
      dayPlan,
      bookingUrl
    });
  } catch (error) {
    console.error('[plannerController.generateItinerary] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate itinerary.',
      error: error.message
    });
  }
};

/**
 * POST /api/planner/save
 * Saves a generated itinerary to MongoDB
 */
export const saveItinerary = async (req, res) => {
  try {
    const {
      userId = null,
      destinationCity,
      startDate,
      endDate,
      days,
      guests,
      travelerType,
      budget,
      breakdown,
      dayPlan,
      bookingUrl,
      isDeficit,
      deficitAmount,
      suggestions
    } = req.body;

    if (!destinationCity || !budget) {
      return res.status(400).json({
        success: false,
        message: 'Destination city and budget are required.'
      });
    }

    const newItinerary = new Itinerary({
      userId,
      destinationCity,
      startDate,
      endDate,
      days: days || (dayPlan ? dayPlan.length : 1),
      guests: guests || 1,
      travelerType: travelerType || 'Solo Explorer',
      budget,
      breakdown,
      dayPlan,
      bookingUrl,
      isDeficit: !!isDeficit,
      deficitAmount: deficitAmount || 0,
      suggestions: suggestions || []
    });

    const saved = await newItinerary.save();

    return res.status(201).json({
      success: true,
      message: 'Itinerary saved successfully.',
      itineraryId: saved._id,
      itinerary: saved
    });
  } catch (error) {
    console.error('[plannerController.saveItinerary] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save itinerary.',
      error: error.message
    });
  }
};

/**
 * GET /api/planner/itineraries/:id
 * Retrieves an itinerary by ID from MongoDB
 */
export const getItineraryById = async (req, res) => {
  try {
    const { id } = req.params;
    const itinerary = await Itinerary.findById(id).lean();

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found.'
      });
    }

    return res.json({
      success: true,
      itinerary
    });
  } catch (error) {
    console.error('[plannerController.getItineraryById] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve itinerary.',
      error: error.message
    });
  }
};
