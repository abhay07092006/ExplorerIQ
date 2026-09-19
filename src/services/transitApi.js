/**
 * Live Multi-Modal Transit & Routing Service
 * Handles HTML5 Geolocation, OpenStreetMap Nominatim Geocoding,
 * OSRM Road Routing, and Multi-Modal Cost/Time/Carbon Comparison.
 */

// Metro-enabled cities in India (operational networks)
const METRO_CITIES = [
  'delhi',
  'new delhi',
  'jaipur',
  'bengaluru',
  'bangalore',
  'kolkata',
  'mumbai',
  'chennai',
  'kochi',
  'hyderabad',
  'lucknow',
  'ahmedabad',
  'pune',
  'noida',
  'gurugram',
  'kanpur',
  'nagpur',
  'agra'
];

/**
 * Check whether a given city has an operational metro network
 * @param {string} cityName 
 * @returns {boolean}
 */
export const hasMetroNetwork = (cityName) => {
  if (!cityName) return false;
  const norm = cityName.toLowerCase().trim();
  return METRO_CITIES.some((city) => norm.includes(city) || city.includes(norm));
};

/**
 * Calculate Haversine direct spherical distance between two coordinates in km
 */
export const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
};

/**
 * Capture user's real-time GPS location via HTML5 Geolocation API
 * @returns {Promise<{ lat: number, lng: number, accuracy: number }>}
 */
export const getCurrentUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        let msg = 'Unable to retrieve your location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission denied. Please enter your location manually.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
};

/**
 * Search/geocode an address or landmark string using OpenStreetMap Nominatim
 * @param {string} query 
 * @returns {Promise<Array<{ lat: number, lng: number, displayName: string, city: string }>>}
 */
export const geocodeAddress = async (query) => {
  if (!query || query.trim().length < 2) return [];

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query.trim()
    )}&format=json&limit=5&countrycodes=in&addressdetails=1`;

    const res = await fetch(url, {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'ExplorerIQ-SmartTourism/2.0'
      }
    });

    if (!res.ok) throw new Error('Geocoding request failed');
    const data = await res.json();

    return data.map((item) => ({
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      displayName: item.display_name,
      city:
        item.address?.city ||
        item.address?.town ||
        item.address?.state_district ||
        item.address?.state ||
        ''
    }));
  } catch (err) {
    console.warn('[transitApi.geocodeAddress] Geocoding fallback:', err.message);
    return [];
  }
};

/**
 * Reverse geocode coordinates into a human-friendly address using Nominatim
 * @param {number} lat 
 * @param {number} lng 
 * @returns {Promise<string>}
 */
export const reverseGeocode = async (lat, lng) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;
    const res = await fetch(url, {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'ExplorerIQ-SmartTourism/2.0'
      }
    });

    if (!res.ok) throw new Error('Reverse geocoding failed');
    const data = await res.json();
    return (
      data.display_name ||
      `${data.address?.suburb || data.address?.neighbourhood || ''}, ${
        data.address?.city || data.address?.town || 'India'
      }`
    );
  } catch {
    return `${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`;
  }
};

/**
 * Calculate driving / road route using Open Source Routing Machine (OSRM)
 * Returns road distance in km, duration in minutes, and polyline coordinates [[lat, lng], ...]
 * Fallback to direct Haversine curve if OSRM is offline or throttled.
 */
export const calculateRoute = async ({ startCoords, destCoords, mode = 'driving' }) => {
  if (!startCoords || !destCoords) {
    throw new Error('Start and destination coordinates are required.');
  }

  const { lat: lat1, lng: lon1 } = startCoords;
  const { lat: lat2, lng: lon2 } = destCoords;

  try {
    // OSRM expects coordinates in {lon},{lat} order
    const osrmUrl = `https://router.project-osrm.org/route/v1/${mode}/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=geojson`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(osrmUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const distanceKm = Number((route.distance / 1000).toFixed(2));
        const durationMinutes = Math.max(1, Math.round(route.duration / 60));

        // Convert [lon, lat] pairs to Leaflet [lat, lon] pairs
        const polyline = (route.geometry?.coordinates || []).map(([lon, lat]) => [lat, lon]);

        return {
          success: true,
          isLiveRoute: true,
          distanceKm,
          durationMinutes,
          polyline: polyline.length > 0 ? polyline : [[lat1, lon1], [lat2, lon2]]
        };
      }
    }
  } catch (err) {
    console.warn('[transitApi.calculateRoute] OSRM query timed out or failed, using geometric fallback:', err.message);
  }

  // Robust fallback: Haversine distance with 1.3x road curvature factor
  const straightDist = calculateHaversineDistance(lat1, lon1, lat2, lon2);
  const roadDist = Number((straightDist * 1.3).toFixed(2));
  const avgSpeedKmh = 30;
  const fallbackDuration = Math.max(2, Math.round((roadDist / avgSpeedKmh) * 60));

  // Generate a smooth intermediate waypoint for visual polyline
  const midLat = (lat1 + lat2) / 2 + 0.003;
  const midLng = (lon1 + lon2) / 2 - 0.003;

  return {
    success: true,
    isLiveRoute: false,
    distanceKm: roadDist,
    durationMinutes: fallbackDuration,
    polyline: [
      [lat1, lon1],
      [midLat, midLng],
      [lat2, lon2]
    ]
  };
};

/**
 * Multi-Modal Travel Comparison Matrix Engine
 * Computes side-by-side estimates for 5 transport modes:
 * 1. Bike Taxi / Rapido
 * 2. Auto-Rickshaw / Tuk-Tuk
 * 3. Local Public Bus / City Transit
 * 4. Metro Rail (if available in destination city)
 * 5. Cab / Taxi (Uber / Ola)
 */
export const calculateMultiModalEstimates = (distanceKm, cityName = '') => {
  const d = Math.max(0.5, Number(distanceKm) || 1);
  const hasMetro = hasMetroNetwork(cityName);

  // 1. Bike Taxi / Rapido
  const bikeFare = Math.round(20 + 10 * d);
  const bikeDuration = Math.max(3, Math.round((d / 35) * 60));
  const bikeCo2 = Math.round(d * 60);

  // 2. Auto-Rickshaw / Tuk-Tuk
  const autoFare = Math.round(30 + 15 * d);
  const autoDuration = Math.max(5, Math.round((d / 25) * 60));
  const autoCo2 = Math.round(d * 75);

  // 3. Local Public Bus
  let busFare = 10;
  if (d > 20) busFare = 35;
  else if (d > 10) busFare = 25;
  else if (d > 5) busFare = 15;

  const busDuration = Math.max(12, Math.round((d / 20) * 60 + 10)); // includes waiting/stops
  const busCo2 = Math.round(d * 20);

  // 4. Metro Rail
  let metroFare = 20;
  if (d > 32) metroFare = 60;
  else if (d > 21) metroFare = 50;
  else if (d > 12) metroFare = 40;
  else if (d > 5) metroFare = 30;

  const metroDuration = Math.max(8, Math.round((d / 40) * 60 + 6)); // 40 km/h + 6 min station access
  const metroCo2 = Math.round(d * 15);

  // 5. Cab / Taxi (Uber / Ola)
  const cabFare = Math.round(50 + 18 * d);
  const cabDuration = Math.max(6, Math.round((d / 30) * 60));
  const cabCo2 = Math.round(d * 150);

  const rawModes = [
    {
      id: 'bike',
      name: 'Bike Taxi (Rapido / Uber Moto)',
      icon: 'Bike',
      emoji: '🛵',
      estimatedCost: bikeFare,
      durationMinutes: bikeDuration,
      speedKmh: 35,
      co2Grams: bikeCo2,
      capacity: '1 Rider (Solo)',
      available: true,
      bestFor: 'Solo travelers navigating heavy local market traffic',
      bookingUrl: 'https://www.rapido.bike/',
      bookingLabel: 'Book on Rapido'
    },
    {
      id: 'auto',
      name: 'Auto-Rickshaw (Tuk-Tuk)',
      icon: 'Car',
      emoji: '🛺',
      estimatedCost: autoFare,
      durationMinutes: autoDuration,
      speedKmh: 25,
      co2Grams: autoCo2,
      capacity: '2-3 Passengers',
      available: true,
      bestFor: 'Small groups & classic open-air heritage experience',
      bookingUrl: 'https://ola.app/',
      bookingLabel: 'Hail Auto on Ola'
    },
    {
      id: 'bus',
      name: 'Local Public Bus / City Transit',
      icon: 'Bus',
      emoji: '🚌',
      estimatedCost: busFare,
      durationMinutes: busDuration,
      speedKmh: 20,
      co2Grams: busCo2,
      capacity: 'Mass Transit',
      available: true,
      bestFor: 'Budget / backpacker travel with frequent city stops',
      bookingUrl: null,
      bookingLabel: 'Board at Nearest Bus Stop',
      transitTip: 'Tickets purchased on-board via conductor; exact change recommended.'
    },
    {
      id: 'metro',
      name: 'Metro Rail Rapid Transit',
      icon: 'Train',
      emoji: '🚇',
      estimatedCost: hasMetro ? metroFare : 0,
      durationMinutes: hasMetro ? metroDuration : 0,
      speedKmh: 40,
      co2Grams: hasMetro ? metroCo2 : 0,
      capacity: 'High-Speed Rapid Rail',
      available: hasMetro,
      unavailableNotice: `Metro network is not operational in ${cityName || 'this region'}. Auto-Rickshaw or City Bus is recommended.`,
      bestFor: 'Fastest, air-conditioned urban travel avoiding all road signals',
      bookingUrl: null,
      bookingLabel: 'Buy Smart Token / Metro Card'
    },
    {
      id: 'cab',
      name: 'AC Cab / Taxi (Uber / Ola)',
      icon: 'CarTaxiFront',
      emoji: '🚕',
      estimatedCost: cabFare,
      durationMinutes: cabDuration,
      speedKmh: 30,
      co2Grams: cabCo2,
      capacity: 'Up to 4 Passengers + Luggage',
      available: true,
      bestFor: 'Families, group travelers with luggage & AC comfort',
      bookingUrl: 'https://m.uber.com/',
      bookingLabel: 'Ride with Uber'
    }
  ];

  // Identify smart badges among available modes
  const activeModes = rawModes.filter((m) => m.available);
  const minCost = Math.min(...activeModes.map((m) => m.estimatedCost));
  const minTime = Math.min(...activeModes.map((m) => m.durationMinutes));
  const minCo2 = Math.min(...activeModes.map((m) => m.co2Grams));

  const modes = rawModes.map((m) => ({
    ...m,
    isCheapest: m.available && m.estimatedCost === minCost,
    isFastest: m.available && m.durationMinutes === minTime,
    isEco: m.available && m.co2Grams === minCo2
  }));

  return {
    distanceKm: d,
    cityName,
    hasMetro,
    modes
  };
};

export const transitApi = {
  getCurrentUserLocation,
  geocodeAddress,
  reverseGeocode,
  calculateRoute,
  calculateMultiModalEstimates,
  hasMetroNetwork,
  calculateHaversineDistance
};

export default transitApi;
