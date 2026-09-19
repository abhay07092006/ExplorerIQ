/**
 * Distance Calculator & Geodesic Routing Utilities
 * Implements standard Haversine formula, road circuity winding factor,
 * live OSRM routing, and regional landmark disambiguation.
 */

export const EARTH_RADIUS_KM = 6371;
export const DEFAULT_CIRCUITY_FACTOR = 1.28; // Standard Indian urban & highway road winding factor

/**
 * Standard Haversine Formula for Geodesic Straight-Line Distance
 * Formula:
 * dLat = (lat2 - lat1) * Math.PI / 180
 * dLon = (lon2 - lon1) * Math.PI / 180
 * a = Math.sin(dLat/2)^2 + Math.cos(lat1*PI/180) * Math.cos(lat2*PI/180) * Math.sin(dLon/2)^2
 * c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
 * distanceKm = R * c
 *
 * @param {number} lat1 
 * @param {number} lon1 
 * @param {number} lat2 
 * @param {number} lon2 
 * @returns {number} Geodesic distance in kilometers
 */
export const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
  const p1 = Number(lat1);
  const l1 = Number(lon1);
  const p2 = Number(lat2);
  const l2 = Number(lon2);

  if (isNaN(p1) || isNaN(l1) || isNaN(p2) || isNaN(l2)) return 0;

  const dLat = ((p2 - p1) * Math.PI) / 180;
  const dLon = ((l2 - l1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((p1 * Math.PI) / 180) *
      Math.cos((p2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = EARTH_RADIUS_KM * c;

  return Number(distanceKm.toFixed(3));
};

/**
 * Convert straight-line geodesic distance to realistic driving road distance
 * using the Circuity / Road Winding Factor (~1.25x - 1.3x)
 *
 * @param {number} lat1 
 * @param {number} lon1 
 * @param {number} lat2 
 * @param {number} lon2 
 * @param {number} circuityFactor 
 * @returns {number} Estimated road distance in kilometers
 */
export const calculateRoadDistance = (
  lat1,
  lon1,
  lat2,
  lon2,
  circuityFactor = DEFAULT_CIRCUITY_FACTOR
) => {
  const straightDist = calculateHaversineDistance(lat1, lon1, lat2, lon2);
  // For very short distances (<1 km) winding factor is slightly lower; for general roads 1.25x-1.3x
  const factor = straightDist < 1 ? 1.15 : circuityFactor;
  return Number((straightDist * factor).toFixed(2));
};

/**
 * Fetch live road routing distance and duration via OSRM (Open Source Routing Machine)
 * Endpoint: https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${destLon},${destLat}
 *
 * @param {{ lat: number, lng: number }} startCoords 
 * @param {{ lat: number, lng: number }} destCoords 
 * @param {boolean} includeGeometry - whether to return geojson polyline for map display
 * @returns {Promise<{ success: boolean, distanceKm: number, durationMinutes: number, polyline: Array<[number, number]>, isLiveRoute: boolean }>}
 */
export const fetchLiveRoadRoute = async (startCoords, destCoords, includeGeometry = true) => {
  const lat1 = Number(startCoords?.lat);
  const lon1 = Number(startCoords?.lng);
  const lat2 = Number(destCoords?.lat);
  const lon2 = Number(destCoords?.lng);

  if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
    throw new Error('Invalid coordinates provided to fetchLiveRoadRoute.');
  }

  // OSRM URL format: startLon,startLat;destLon,destLat
  const overviewParam = includeGeometry ? 'overview=full&geometries=geojson' : 'overview=false';
  const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?${overviewParam}`;

  try {
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

        let polyline = [];
        if (includeGeometry && route.geometry?.coordinates) {
          polyline = route.geometry.coordinates.map(([lon, lat]) => [lat, lon]);
        }

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
    console.warn('[distanceCalculator] OSRM live routing timed out or failed, using geodesic fallback:', err.message);
  }

  // Fallback: Circuity road distance + realistic speed estimation
  const fallbackDistance = calculateRoadDistance(lat1, lon1, lat2, lon2);
  const avgSpeedKmh = fallbackDistance > 50 ? 65 : 30; // Highway vs urban speed
  const fallbackDuration = Math.max(2, Math.round((fallbackDistance / avgSpeedKmh) * 60));

  return {
    success: true,
    isLiveRoute: false,
    distanceKm: fallbackDistance,
    durationMinutes: fallbackDuration,
    polyline: [
      [lat1, lon1],
      [(lat1 + lat2) / 2 + 0.002, (lon1 + lon2) / 2 - 0.002],
      [lat2, lon2]
    ]
  };
};

/**
 * Disambiguate landmark based on starting location and city context.
 * Specifically distinguishes Agra Fort (Agra, ~2.5 km from Taj Mahal)
 * vs Delhi Red Fort (Delhi, ~210 km from Taj Mahal).
 *
 * @param {string} landmarkName 
 * @param {Object} currentContext
 * @param {string} [currentContext.city]
 * @param {string} [currentContext.cityName]
 * @param {{ lat: number, lng: number }} [currentContext.startCoords]
 * @returns {Object|null}
 */
export const resolveLandmarkLocation = (landmarkName = '', currentContext = {}) => {
  const norm = (landmarkName || '').toLowerCase().trim();
  const city = (currentContext?.city || currentContext?.cityName || '').toLowerCase();
  const startCoords = currentContext?.startCoords;

  const isRedFortQuery =
    norm.includes('red fort') ||
    norm.includes('lal qila') ||
    norm.includes('agra fort') ||
    norm.includes('delhi fort');

  if (isRedFortQuery) {
    // If starting point or city is in/near Agra:
    const isNearAgra =
      city.includes('agra') ||
      (startCoords && calculateHaversineDistance(startCoords.lat, startCoords.lng, 27.1751, 78.0421) < 50);

    // If query explicitly mentions "agra" or user is in/near Agra
    if (norm.includes('agra') || (!norm.includes('delhi') && isNearAgra)) {
      return {
        id: 'agra-fort',
        name: 'Agra Fort (Agra Red Fort)',
        city: 'Agra',
        state: 'Uttar Pradesh',
        coordinates: [27.1795, 78.0211],
        coordObj: { lat: 27.1795, lng: 78.0211 },
        isAgraFort: true
      };
    }

    // Otherwise resolve to Delhi Red Fort
    return {
      id: 'delhi-red-fort',
      name: 'Red Fort (Lal Qila, Delhi)',
      city: 'Old Delhi',
      state: 'Delhi',
      coordinates: [28.6562, 77.241],
      coordObj: { lat: 28.6562, lng: 77.241 },
      isDelhiRedFort: true
    };
  }

  return null;
};

export default {
  calculateHaversineDistance,
  calculateRoadDistance,
  fetchLiveRoadRoute,
  resolveLandmarkLocation,
  EARTH_RADIUS_KM,
  DEFAULT_CIRCUITY_FACTOR
};
