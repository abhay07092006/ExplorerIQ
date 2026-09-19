import fetch from 'node-fetch'; // or global fetch in Node 18+

const EARTH_RADIUS_KM = 6371;
const CIRCUITY_FACTOR = 1.28;

// Metro-enabled cities in India
const METRO_CITIES = [
  'delhi', 'new delhi', 'jaipur', 'bengaluru', 'bangalore',
  'kolkata', 'mumbai', 'chennai', 'kochi', 'hyderabad',
  'lucknow', 'ahmedabad', 'pune', 'noida', 'gurugram', 'agra'
];

/**
 * Standard Haversine straight-line distance (km)
 */
function calculateHaversine(lat1, lon1, lat2, lon2) {
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((EARTH_RADIUS_KM * c).toFixed(3));
}

/**
 * Disambiguate destination based on name and city context
 */
function disambiguateDestination(destName, destCoords, cityContext = {}) {
  const name = String(destName || '').toLowerCase();
  const userCity = String(cityContext.userCity || cityContext.city || '').toLowerCase();

  // If user is looking for "Red Fort" / "Lal Qila"
  if (name.includes('red fort') || name.includes('lal qila') || name.includes('agra fort')) {
    if (userCity.includes('agra') || name.includes('agra')) {
      // User is in Agra -> Target Agra Fort [27.1795, 78.0211]
      return {
        lat: 27.1795,
        lng: 78.0211,
        resolvedName: 'Agra Fort (Agra Red Fort)',
        disambiguated: true
      };
    } else if (userCity.includes('delhi') || name.includes('delhi')) {
      // User is in Delhi -> Target Delhi Red Fort [28.6562, 77.2410]
      return {
        lat: 28.6562,
        lng: 77.2410,
        resolvedName: 'Red Fort (Lal Qila, Delhi)',
        disambiguated: true
      };
    }
  }

  return {
    lat: Number(destCoords.lat),
    lng: Number(destCoords.lng),
    resolvedName: destName,
    disambiguated: false
  };
}

/**
 * Calculate multi-modal transit options from road distance
 */
function calculateMultiModalFares(distanceKm, cityName = '') {
  const d = Math.max(0.5, Number(distanceKm));
  const normCity = String(cityName).toLowerCase().trim();
  const hasMetro = METRO_CITIES.some((mc) => normCity.includes(mc));

  // 1. Bike Taxi (Rapido / Uber Moto)
  const bikeBase = 20;
  const bikePerKm = 10;
  const bikeFare = Math.round(bikeBase + d * bikePerKm);
  const bikeTimeMins = Math.max(4, Math.round((d / 35) * 60)); // ~35 km/h
  const bikeCO2 = Math.round(d * 60); // ~60g CO2/km

  // 2. Auto-Rickshaw (Tuk-Tuk)
  const autoBase = 30;
  const autoPerKm = 15;
  const autoFare = Math.round(autoBase + d * autoPerKm);
  const autoTimeMins = Math.max(5, Math.round((d / 25) * 60)); // ~25 km/h
  const autoCO2 = Math.round(d * 75); // ~75g CO2/km

  // 3. Local Public Bus
  let busFare = 10;
  if (d > 15) busFare = 35;
  else if (d > 8) busFare = 25;
  else if (d > 3) busFare = 15;
  const busTimeMins = Math.max(10, Math.round((d / 20) * 60) + 8); // ~20 km/h + stops
  const busCO2 = Math.round(d * 20); // ~20g CO2/passenger-km

  // 4. Metro Rail Rapid Transit
  let metroFare = 20;
  if (d > 20) metroFare = 60;
  else if (d > 12) metroFare = 50;
  else if (d > 6) metroFare = 40;
  else if (d > 2) metroFare = 30;
  const metroTimeMins = Math.max(8, Math.round((d / 32) * 60) + 6); // ~32 km/h
  const metroCO2 = Math.round(d * 15); // ~15g CO2/passenger-km

  // 5. AC Cab / Taxi (Uber / Ola)
  const cabBase = 50;
  const cabPerKm = 18;
  const cabFare = Math.round(cabBase + d * cabPerKm);
  const cabTimeMins = Math.max(6, Math.round((d / 30) * 60)); // ~30 km/h
  const cabCO2 = Math.round(d * 150); // ~150g CO2/km

  const modes = [
    {
      id: 'bike',
      name: 'Bike Taxi (Rapido / Uber Moto)',
      fare: bikeFare,
      durationMins: bikeTimeMins,
      co2Grams: bikeCO2,
      speedKmh: 35,
      capacity: '1 Passenger',
      comfort: 'Swift & Agil',
      isAvailable: true,
      bookingUrl: `https://www.rapido.bike/`
    },
    {
      id: 'auto',
      name: 'Auto-Rickshaw (Tuk-Tuk)',
      fare: autoFare,
      durationMins: autoTimeMins,
      co2Grams: autoCO2,
      speedKmh: 25,
      capacity: 'Up to 3 Passengers',
      comfort: 'Classic Local Ride',
      isAvailable: true,
      bookingUrl: `https://m.uber.com/`
    },
    {
      id: 'bus',
      name: 'Local Public Bus / City Transit',
      fare: busFare,
      durationMins: busTimeMins,
      co2Grams: busCO2,
      speedKmh: 20,
      capacity: 'High Capacity',
      comfort: 'Standard',
      isAvailable: true,
      isBudget: true
    },
    {
      id: 'metro',
      name: 'Metro Rail Rapid Transit',
      fare: hasMetro ? metroFare : null,
      durationMins: hasMetro ? metroTimeMins : null,
      co2Grams: hasMetro ? metroCO2 : null,
      speedKmh: 32,
      capacity: 'Rapid Mass Transit',
      comfort: 'Air-Conditioned & Fast',
      isAvailable: hasMetro,
      notice: hasMetro ? 'Fastest corridor transit' : `Metro network is not operational in ${cityName || 'this region'}.`
    },
    {
      id: 'cab',
      name: 'AC Cab / Taxi (Uber / Ola)',
      fare: cabFare,
      durationMins: cabTimeMins,
      co2Grams: cabCO2,
      speedKmh: 30,
      capacity: 'Up to 4 Passengers',
      comfort: 'Comfort AC & Luggage Friendly',
      isAvailable: true,
      bookingUrl: `https://m.uber.com/`
    }
  ];

  // Assign badges
  // Cheapest
  const availableModes = modes.filter((m) => m.isAvailable && m.fare !== null);
  const cheapest = availableModes.reduce((prev, curr) => (curr.fare < prev.fare ? curr : prev), availableModes[0]);
  if (cheapest) cheapest.isCheapest = true;

  // Fastest
  const fastest = availableModes.reduce((prev, curr) => (curr.durationMins < prev.durationMins ? curr : prev), availableModes[0]);
  if (fastest) fastest.isFastest = true;

  // Eco-Friendly (Lowest CO2)
  const eco = availableModes.reduce((prev, curr) => (curr.co2Grams < prev.co2Grams ? curr : prev), availableModes[0]);
  if (eco) eco.isEcoFriendly = true;

  return modes;
}

/**
 * POST /api/route/calculate
 * Calculate route between start and destination coordinates
 */
export const calculateRoute = async (req, res) => {
  try {
    const {
      startLat,
      startLng,
      destLat,
      destLng,
      destName = '',
      cityContext = {}
    } = req.body;

    const sLat = Number(startLat);
    const sLng = Number(startLng);
    const dLatRaw = Number(destLat);
    const dLngRaw = Number(destLng);

    if (isNaN(sLat) || isNaN(sLng) || isNaN(dLatRaw) || isNaN(dLngRaw)) {
      return res.status(400).json({
        success: false,
        message: 'Valid startLat, startLng, destLat, and destLng are required.'
      });
    }

    // 1. Disambiguate landmark coordinates
    const resolved = disambiguateDestination(destName, { lat: dLatRaw, lng: dLngRaw }, cityContext);
    const dLat = resolved.lat;
    const dLng = resolved.lng;

    // 2. Query OSRM
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${sLng},${sLat};${dLng},${dLat}?overview=full&geometries=geojson`;

    let distanceKm = 0;
    let durationMins = 0;
    let polyline = [];
    let isLiveRoute = false;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const osrmRes = await fetch(osrmUrl, {
        headers: { 'User-Agent': 'ExplorerIQ-Routing/2.0' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (osrmRes.ok) {
        const data = await osrmRes.json();
        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          distanceKm = Number((route.distance / 1000).toFixed(2));
          durationMins = Math.max(1, Math.round(route.duration / 60));
          if (route.geometry?.coordinates) {
            polyline = route.geometry.coordinates.map(([lon, lat]) => [lat, lon]);
          }
          isLiveRoute = true;
        }
      }
    } catch (_osrmErr) {
      isLiveRoute = false;
    }

    // 3. Fallback to Haversine with Circuity Factor if OSRM is offline/throttled
    if (!isLiveRoute || distanceKm === 0) {
      const straight = calculateHaversine(sLat, sLng, dLat, dLng);
      distanceKm = Number((straight * CIRCUITY_FACTOR).toFixed(2));
      durationMins = Math.max(2, Math.round((distanceKm / 30) * 60));
      polyline = [[sLat, sLng], [dLat, dLng]];
    }

    // 4. Multi-modal calculation
    const cityName = cityContext.userCity || cityContext.city || '';
    const modes = calculateMultiModalFares(distanceKm, cityName);

    return res.json({
      success: true,
      startCoords: { lat: sLat, lng: sLng },
      destCoords: { lat: dLat, lng: dLng },
      resolvedName: resolved.resolvedName,
      disambiguated: resolved.disambiguated,
      distanceKm,
      durationMinutes: durationMins,
      polyline,
      isLiveRoute,
      modes
    });
  } catch (error) {
    console.error('[routeController.calculateRoute] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate route.',
      error: error.message
    });
  }
};
