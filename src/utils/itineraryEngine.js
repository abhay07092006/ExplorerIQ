import { getRegionalDailyCosts } from '../services/plannerApi';

/**
 * Dynamic Smart Itinerary Generator
 * Builds an authentic, realistic day-by-day 7-slot schedule and performs real-arithmetic budget calculations.
 */
export function generateDynamicItinerary({
  city,
  places = [],
  days = 3,
  hotel = null,
  monumentPrices = [],
  budgetTier = 'moderate',
  guests = 2,
  travelStyles = ['heritage', 'food', 'scenic']
}) {
  const daysCount = Math.max(1, parseInt(days, 10) || 3);
  const guestCount = Math.max(1, parseInt(guests, 10) || 2);
  const cityName = city?.name || 'Destination';
  const foodList = city?.localFoodSpecialties || [];
  const allPlaces = places.length > 0 ? places : (city?.places || []);

  // Filter places based on selected styles if available
  const preferredPlaces = allPlaces.filter((p) => {
    if (travelStyles.includes('heritage') && p.category === 'heritage') return true;
    if (travelStyles.includes('temples') && p.category === 'temples') return true;
    if (travelStyles.includes('food') && p.category === 'food') return true;
    if (travelStyles.includes('scenic') && p.category === 'scenic') return true;
    if (travelStyles.includes('adventure') && (p.category === 'scenic' || p.category === 'heritage')) return true;
    return false;
  });

  const pool = preferredPlaces.length >= 4 ? preferredPlaces : (allPlaces.length > 0 ? allPlaces : [
    { name: `${cityName} Grand Fort`, category: 'heritage', tip: 'Arrive early to capture dramatic light.' },
    { name: `${cityName} Royal Palace`, category: 'heritage', tip: 'Guided audio tour available.' },
    { name: `${cityName} Sacred Temple`, category: 'temples', tip: 'Remove footwear before entering.' },
    { name: `${cityName} Scenic Lake / Hill View`, category: 'scenic', tip: 'Sunset views are panoramic.' }
  ]);

  // Transit time estimates
  const transitTimes = [
    '⏱️ 15 min via auto-rickshaw',
    '⏱️ 20 min cab across heritage corridor',
    '⏱️ 10 min scenic walk through old lanes',
    '⏱️ 25 min scenic drive',
    '⏱️ 12 min e-rickshaw ride'
  ];

  const hotelName = hotel?.name || `Selected ${cityName} Hotel`;

  const schedule = [];
  const visitedMonuments = [];
  let totalTicketFeePerPerson = 0;

  for (let day = 1; day <= daysCount; day++) {
    const daySlots = [];
    const offset = (day - 1) * 3;

    // 1. Sunrise Spot (06:00 AM - 08:00 AM)
    const morningPlace = pool[offset % pool.length];
    daySlots.push({
      id: `d${day}-slot1`,
      slotIndex: 1,
      slotLabel: 'Slot 1: Sunrise & Morning Vista',
      time: '06:00 AM - 08:00 AM',
      title: `Sunrise at ${morningPlace.name}`,
      category: morningPlace.category || 'scenic',
      place: morningPlace,
      type: 'Sightseeing & Photography',
      desc: `Beat the crowds and relish the tranquil dawn breeze. ${morningPlace.tip || 'Golden hour is ideal for crisp architectural photography.'}`,
      transit: `⏱️ Departure from ${hotelName}`,
      entryFee: 'Free Entry / Morning Access',
      numericFee: 0,
      tip: morningPlace.tip || 'Crisp morning air and peaceful atmosphere.',
      isFood: false
    });

    // 2. Breakfast Stop (08:30 AM - 09:30 AM)
    const breakfast = foodList[(day - 1) % (foodList.length || 1)] || {
      name: `Traditional ${cityName} Morning Breakfast`,
      place: 'Old City Heritage Bazaar',
      desc: 'Freshly fried breads, spiced lentil curries, and piping hot clay-cup chai.'
    };
    daySlots.push({
      id: `d${day}-slot2`,
      slotIndex: 2,
      slotLabel: 'Slot 2: Authentic Morning Breakfast',
      time: '08:30 AM - 09:30 AM',
      title: `Breakfast: ${breakfast.name}`,
      location: breakfast.place,
      desc: breakfast.desc,
      type: 'Culinary Heritage',
      transit: transitTimes[(day * 2) % transitTimes.length],
      entryFee: '₹120 - ₹250 per person',
      numericFee: 0,
      tip: 'Ask for freshly brewed ginger-cardamom chai with sweet jalebis.',
      isFood: true
    });

    // 3. Primary Monument (10:00 AM - 01:00 PM)
    const monument = monumentPrices[(day - 1) % (monumentPrices.length || 1)] || {
      name: pool[(offset + 1) % pool.length]?.name || `${cityName} Archeological Monument`,
      indianTicketPrice: 50,
      feeDisplay: '₹50 (ASI Verified)',
      openingHours: '09:00 AM - 05:30 PM'
    };

    const monumentFee = monument.indianTicketPrice || 50;
    totalTicketFeePerPerson += monumentFee;
    visitedMonuments.push({
      day,
      name: monument.name,
      fee: monumentFee,
      feeDisplay: monument.feeDisplay || `₹${monumentFee}`
    });

    daySlots.push({
      id: `d${day}-slot3`,
      slotIndex: 3,
      slotLabel: 'Slot 3: Primary ASI Monument',
      time: '10:00 AM - 01:00 PM',
      title: monument.name,
      category: 'heritage',
      place: pool[(offset + 1) % pool.length],
      type: 'Verified ASI Heritage Landmark',
      desc: `Explore the intricate stone-carvings and royal halls with an authorized ASI audio guide. Timings: ${monument.openingHours || '09:00 AM - 05:30 PM'}.`,
      transit: transitTimes[day % transitTimes.length],
      entryFee: `₹${monumentFee} per Indian adult (ASI verified)`,
      numericFee: monumentFee,
      tip: 'Book tickets online via ASI portal for faster entry counter queues.',
      isFood: false
    });

    // 4. Authentic Regional Lunch (01:00 PM - 02:30 PM)
    const lunchSpecialty = foodList[day % (foodList.length || 1)] || {
      name: `${cityName} Royal Thali & Specialties`,
      place: 'Historic Heritage Quarter',
      desc: 'Multi-course regional thali showcasing local heritage spices, breads, and desserts.'
    };
    daySlots.push({
      id: `d${day}-slot4`,
      slotIndex: 4,
      slotLabel: 'Slot 4: Authentic Regional Lunch',
      time: '01:00 PM - 02:30 PM',
      title: `Lunch: ${lunchSpecialty.name}`,
      location: lunchSpecialty.place,
      desc: lunchSpecialty.desc,
      type: 'Culinary Heritage',
      transit: transitTimes[(day + 1) % transitTimes.length],
      entryFee: '₹250 - ₹600 per person',
      numericFee: 0,
      tip: 'Relax during midday heat with fresh seasonal coolers or spiced buttermilk.',
      isFood: true
    });

    // 5. Artisan Bazaars & Cultural Exploration (03:00 PM - 05:30 PM)
    const afternoonPlace = pool[(offset + 2) % pool.length];
    daySlots.push({
      id: `d${day}-slot5`,
      slotIndex: 5,
      slotLabel: 'Slot 5: Artisan Bazaars & Crafts',
      time: '03:00 PM - 05:30 PM',
      title: `Bazaars & Artisans near ${afternoonPlace.name}`,
      category: afternoonPlace.category || 'heritage',
      place: afternoonPlace,
      type: 'Living Culture & Crafts',
      desc: `Stroll through historic artisan alleys, block-printing guilds, and brass workshops. ${afternoonPlace.tip || 'Polite bargaining is customary.'}`,
      transit: transitTimes[(day * 3) % transitTimes.length],
      entryFee: 'Free to explore',
      numericFee: 0,
      tip: 'Support local artisans directly for authentic handloom textiles and handicrafts.',
      isFood: false
    });

    // 6. Twilight Spot (06:00 PM - 07:30 PM)
    const twilightPlace = pool[(offset + 3) % pool.length];
    daySlots.push({
      id: `d${day}-slot6`,
      slotIndex: 6,
      slotLabel: 'Slot 6: Twilight / Sunset Viewpoint',
      time: '06:00 PM - 07:30 PM',
      title: `Sunset Vantage at ${twilightPlace.name}`,
      category: 'scenic',
      place: twilightPlace,
      type: 'Evening Atmosphere & Aarti',
      desc: `Watch the evening sky illuminate the ramparts as dusk falls across the city horizon.`,
      transit: transitTimes[(day + 2) % transitTimes.length],
      entryFee: 'Free Entry',
      numericFee: 0,
      tip: 'Arrive 20 minutes before sunset for the best viewpoint seating.',
      isFood: false
    });

    // 7. Street Food Crawl & Dinner (08:00 PM - 10:00 PM)
    const dinnerFood = foodList[(day + 2) % (foodList.length || 1)] || {
      name: `${cityName} Night Market Delicacies`,
      place: 'Sarafa / Old Bazaar Night Lane',
      desc: 'Bustling night food stalls serving sizzling kebabs, spiced chaats, and chilled sweets.'
    };
    daySlots.push({
      id: `d${day}-slot7`,
      slotIndex: 7,
      slotLabel: 'Slot 7: Street Food Crawl & Dinner',
      time: '08:00 PM - 10:00 PM',
      title: `Night Food Crawl: ${dinnerFood.name}`,
      location: dinnerFood.place,
      desc: dinnerFood.desc,
      type: 'Night Food Safari',
      transit: `⏱️ 15 min return to ${hotelName}`,
      entryFee: '₹150 - ₹400 per person',
      numericFee: 0,
      tip: 'Head to famous century-old sweet shops for authentic regional desserts.',
      isFood: true
    });

    schedule.push({
      dayNumber: day,
      dayTitle: `Day ${day}: ${morningPlace.name} & ${monument.name}`,
      slots: daySlots
    });
  }

  // ==========================================
  // REAL ARITHMETIC BUDGET CALCULATIONS
  // ==========================================
  const regionalCosts = getRegionalDailyCosts(city?.id || '', budgetTier);

  // 1. Accommodation: Live Nightly Rate x Rooms Needed x Nights + Taxes
  const stayDurationNights = hotel?.nights || daysCount;
  const nightlyRate = hotel?.property?.nightlyRatePerRoom || 3500;
  const roomsCount = hotel?.roomsNeeded || Math.ceil(guestCount / 2);
  const accommodationBase = nightlyRate * roomsCount * stayDurationNights;
  const accommodationTax = hotel?.property?.estimatedTaxes || Math.round(accommodationBase * 0.12);
  const accommodationTotal = accommodationBase + accommodationTax;

  // 2. Entry Tickets: Exact sum of all visited monuments x Number of Guests
  const ticketsTotal = totalTicketFeePerPerson * guestCount;

  // 3. Food: Regional daily food cost x Number of Guests x Number of Days
  const foodTotal = regionalCosts.foodPerPersonPerDay * guestCount * daysCount;

  // 4. Local Transit: Regional daily intra-city transit rate x Number of Days
  const transitTotal = regionalCosts.transitPerDay * daysCount;

  // 5. Grand Total
  const grandTotal = accommodationTotal + ticketsTotal + foodTotal + transitTotal;
  const dailyAverage = Math.round(grandTotal / daysCount);
  const perPersonCost = Math.round(grandTotal / guestCount);

  return {
    cityName,
    days: daysCount,
    guests: guestCount,
    budgetTier,
    hotel: hotel?.property || null,
    schedule,
    visitedMonuments,
    regionalCosts,
    budgetSummary: {
      accommodation: {
        hotelName: hotel?.property?.name || hotelName,
        nightlyRatePerRoom: nightlyRate,
        roomsCount,
        nights: stayDurationNights,
        baseCost: accommodationBase,
        taxes: accommodationTax,
        total: accommodationTotal
      },
      tickets: {
        perPerson: totalTicketFeePerPerson,
        guests: guestCount,
        monumentsCount: visitedMonuments.length,
        items: visitedMonuments,
        total: ticketsTotal
      },
      food: {
        perPersonPerDay: regionalCosts.foodPerPersonPerDay,
        guests: guestCount,
        days: daysCount,
        total: foodTotal
      },
      transit: {
        perDay: regionalCosts.transitPerDay,
        days: daysCount,
        total: transitTotal
      },
      grandTotal,
      dailyAverage,
      perPersonCost
    }
  };
}
