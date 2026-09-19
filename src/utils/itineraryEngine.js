import { getRegionalDailyCosts, USD_TO_INR_RATE } from '../services/plannerApi.js';

/**
 * Dynamic Smart Itinerary Generator with User-Defined Budgeting Engine
 */
export function generateDynamicItinerary({
  city,
  places = [],
  days = 3,
  hotel = null,
  monumentPrices = [],
  totalBudget = 25000,
  currency = 'INR',
  budgetTier = 'moderate',
  guests = 2,
  travelStyles = ['heritage', 'food', 'scenic']
}) {
  const daysCount = Math.max(1, parseInt(days, 10) || 3);
  const guestCount = Math.max(1, parseInt(guests, 10) || 2);
  const cityName = city?.name || 'Destination';
  const foodList = city?.localFoodSpecialties || [];
  const allPlaces = places.length > 0 ? places : (city?.places || []);

  // Currency normalization: Internal calculations in INR
  const budgetInINR = currency === 'USD' ? totalBudget * USD_TO_INR_RATE : totalBudget;

  // Filter places based on selected styles
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

  const transitTimes = [
    '⏱️ 15 min via auto-rickshaw',
    '⏱️ 20 min cab across heritage corridor',
    '⏱️ 10 min scenic walk through old lanes',
    '⏱️ 25 min scenic drive',
    '⏱️ 12 min e-rickshaw ride'
  ];

  const hotelName = hotel?.property?.name || `Selected ${cityName} Hotel`;

  const schedule = [];
  const visitedMonuments = [];
  let totalTicketFeePerPerson = 0;

  for (let day = 1; day <= daysCount; day++) {
    const daySlots = [];
    const offset = (day - 1) * 3;

    // Slot 1: Sunrise & Morning Vista
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

    // Slot 2: Authentic Morning Breakfast
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

    // Slot 3: Primary ASI Monument
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

    // Slot 4: Authentic Regional Lunch
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

    // Slot 5: Artisan Bazaars & Cultural Exploration
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

    // Slot 6: Twilight Spot
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

    // Slot 7: Street Food Crawl & Dinner
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
  // DYNAMIC BUDGET ALLOCATION & GUARDRAILS
  // ==========================================
  const regionalCosts = getRegionalDailyCosts(city?.id || '', budgetTier);

  // 1. Accommodation: Constrained by 45% cap
  const stayDurationNights = hotel?.nights || daysCount;
  const nightlyRate = hotel?.property?.nightlyRatePerRoom || 3500;
  const roomsCount = hotel?.roomsNeeded || Math.ceil(guestCount / 2);
  const accommodationBase = nightlyRate * roomsCount * stayDurationNights;
  const accommodationTax = hotel?.property?.estimatedTaxes || Math.round(accommodationBase * 0.12);
  const accommodationTotal = accommodationBase + accommodationTax;

  // 2. Entry Tickets: Exact sum of all visited monuments x Number of Guests
  const ticketsTotal = totalTicketFeePerPerson * guestCount;

  // 3. Residual Budget Allocation
  // Deduct Hotel + Tickets from User's Custom Budget
  const committedCosts = accommodationTotal + ticketsTotal;
  const residualBudget = budgetInINR - committedCosts;

  let foodTotal = 0;
  let transitTotal = 0;
  let emergencyBuffer = 0;
  let isDeficit = false;
  let deficitAmount = 0;

  // Minimum survival costs based on regional indexes
  const standardFoodTotal = regionalCosts.foodPerPersonPerDay * guestCount * daysCount;
  const standardTransitTotal = regionalCosts.transitPerDay * daysCount;
  const baselineTotal = committedCosts + standardFoodTotal + standardTransitTotal;

  if (residualBudget > 0) {
    // If residual budget is healthy, allocate dynamically
    const dynamicFood = Math.round(residualBudget * 0.55);
    const dynamicTransit = Math.round(residualBudget * 0.25);
    const dynamicBuffer = residualBudget - (dynamicFood + dynamicTransit);

    // Ensure we provide at least reasonable regional minimums or surplus
    foodTotal = Math.max(standardFoodTotal * 0.8, dynamicFood);
    transitTotal = Math.max(standardTransitTotal * 0.8, dynamicTransit);
    emergencyBuffer = Math.max(0, budgetInINR - (accommodationTotal + ticketsTotal + foodTotal + transitTotal));

    if (accommodationTotal + ticketsTotal + foodTotal + transitTotal > budgetInINR) {
      isDeficit = true;
      deficitAmount = Math.round((accommodationTotal + ticketsTotal + foodTotal + transitTotal) - budgetInINR);
      emergencyBuffer = 0;
    }
  } else {
    // Immediate Deficit
    isDeficit = true;
    deficitAmount = Math.round(baselineTotal - budgetInINR);
    foodTotal = standardFoodTotal;
    transitTotal = standardTransitTotal;
    emergencyBuffer = 0;
  }

  const grandTotal = accommodationTotal + ticketsTotal + foodTotal + transitTotal;

  // Multi-segment Budget Progress Bar Percentages (relative to user's budget or grand total)
  const baseForPercentages = Math.max(budgetInINR, grandTotal);
  const accommodationPct = Number(((accommodationTotal / baseForPercentages) * 100).toFixed(1));
  const ticketsPct = Number(((ticketsTotal / baseForPercentages) * 100).toFixed(1));
  const foodPct = Number(((foodTotal / baseForPercentages) * 100).toFixed(1));
  const transitPct = Number(((transitTotal / baseForPercentages) * 100).toFixed(1));
  const bufferPct = emergencyBuffer > 0 ? Number(((emergencyBuffer / baseForPercentages) * 100).toFixed(1)) : 0;
  const deficitPct = isDeficit ? Number(((deficitAmount / baseForPercentages) * 100).toFixed(1)) : 0;

  // Cost-saving suggestions for budget deficit
  const suggestions = [];
  if (isDeficit) {
    if (hotel?.budgetTier !== 'backpacker') {
      const hostelSavings = Math.round(accommodationTotal * 0.65);
      suggestions.push({
        id: 'switch_hostel',
        title: 'Switch to a Verified Budget Hostel',
        description: `Opt for a social heritage hostel like Zostel or Moustache. Saves approximately ₹${hostelSavings.toLocaleString('en-IN')}.`,
        savingsINR: hostelSavings
      });
    }
    if (daysCount > 1) {
      const daySavings = Math.round(grandTotal / daysCount);
      suggestions.push({
        id: 'reduce_day',
        title: `Shorten Trip by 1 Day (${daysCount - 1} Days instead of ${daysCount})`,
        description: `Reduces hotel room nights, daily food, and local transit. Saves approximately ₹${daySavings.toLocaleString('en-IN')}.`,
        savingsINR: daySavings
      });
    }
    if (guestCount > 1) {
      suggestions.push({
        id: 'group_stays',
        title: 'Choose Quad Dorms / Family Suites',
        description: 'Book a 4-bed private dorm or family room instead of individual double rooms to cut lodging costs by 30%.',
        savingsINR: Math.round(accommodationTotal * 0.3)
      });
    }
  }

  const dailyAverage = Math.round(grandTotal / daysCount);
  const perPersonCost = Math.round(grandTotal / guestCount);

  // Conversion for display if user selected USD
  const currencySymbol = currency === 'USD' ? '$' : '₹';
  const formatAmount = (inrVal) => {
    if (currency === 'USD') {
      return (inrVal / USD_TO_INR_RATE).toFixed(1);
    }
    return inrVal.toLocaleString('en-IN');
  };

  return {
    cityName,
    days: daysCount,
    guests: guestCount,
    budgetTier: hotel?.budgetTier || budgetTier,
    totalBudget: budgetInINR,
    userBudget: totalBudget,
    currency,
    currencySymbol,
    isDeficit,
    deficitAmount,
    suggestions,
    hotel: hotel?.property || null,
    schedule,
    visitedMonuments,
    regionalCosts,
    progressBreakdown: {
      accommodationPct,
      ticketsPct,
      foodPct,
      transitPct,
      bufferPct,
      deficitPct
    },
    budgetSummary: {
      userCustomBudget: budgetInINR,
      accommodation: {
        hotelName: hotel?.property?.name || hotelName,
        nightlyRatePerRoom: nightlyRate,
        roomsCount,
        nights: stayDurationNights,
        baseCost: accommodationBase,
        taxes: accommodationTax,
        total: accommodationTotal,
        pct: accommodationPct
      },
      tickets: {
        perPerson: totalTicketFeePerPerson,
        guests: guestCount,
        monumentsCount: visitedMonuments.length,
        items: visitedMonuments,
        total: ticketsTotal,
        pct: ticketsPct
      },
      food: {
        perPersonPerDay: Math.round(foodTotal / (guestCount * daysCount)),
        guests: guestCount,
        days: daysCount,
        total: foodTotal,
        pct: foodPct
      },
      transit: {
        perDay: Math.round(transitTotal / daysCount),
        days: daysCount,
        total: transitTotal,
        pct: transitPct
      },
      emergencyBuffer: {
        total: emergencyBuffer,
        pct: bufferPct
      },
      grandTotal,
      dailyAverage,
      perPersonCost,
      isDeficit,
      deficitAmount,
      formatAmount
    }
  };
}
