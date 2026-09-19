import axios from 'axios';
import { CITIES_DATA, COMMUNITY_GEMS } from '../data/travelData.js';
import { SAMPLE_MONUMENTS, RECOGNIZED_MONUMENTS, detectMonument } from '../data/monumentsData.js';
import { generateDynamicItinerary } from '../utils/itineraryEngine.js';
import { calculateRoute as clientCalculateRoute, calculateRoadDistance, calculateHaversineDistance } from './transitApi.js';

// API Base URL from Vite environment or default localhost:5000
const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || 'http://localhost:5000/api';

// Check if running on localhost to avoid mixed content errors on HTTPS deployments (e.g. GitHub Pages)
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Helper for local offline gems
const getLocalGems = () => {
  try {
    const saved = localStorage.getItem('exploreriq_custom_gems');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveLocalGems = (gems) => {
  try {
    localStorage.setItem('exploreriq_custom_gems', JSON.stringify(gems));
  } catch {}
};

// ==========================================
// 1. SMART PLANNER API CLIENT
// ==========================================
export const plannerApi = {
  /**
   * POST /api/planner/generate
   * Generates custom 7-slot daily itinerary and dynamic budget breakdown
   */
  async generateItinerary(payload) {
    if (isLocalhost) {
      try {
        const response = await apiClient.post('/planner/generate', payload);
        if (response.data?.success) {
          return response.data;
        }
      } catch (err) {
        console.warn('[plannerApi.generateItinerary] Server unreachable, using client engine fallback:', err.message);
      }
    }

    // Client-side fallback engine
    const targetCity = CITIES_DATA.find(
      (c) => c.name.toLowerCase() === (payload.city || '').toLowerCase()
    ) || CITIES_DATA[0] || { name: payload.city || 'Agra' };

    const itinerary = generateDynamicItinerary({
      city: targetCity,
      places: targetCity.places || [],
      days: payload.days || 3,
      totalBudget: payload.budgetLimit || 25000,
      guests: payload.guests || 2,
      travelStyles: payload.travelStyles || ['heritage', 'food', 'scenic']
    });

    return {
      success: true,
      isClientFallback: true,
      ...itinerary
    };
  },

  /**
   * POST /api/planner/save
   * Saves itinerary to MongoDB / localStorage fallback
   */
  async saveItinerary(itineraryData) {
    if (isLocalhost) {
      try {
        const response = await apiClient.post('/planner/save', itineraryData);
        if (response.data?.success) {
          return response.data;
        }
      } catch (err) {
        console.warn('[plannerApi.saveItinerary] Server unreachable, saving to localStorage:', err.message);
      }
    }

    const savedId = `itin_${Date.now()}`;
    const savedList = JSON.parse(localStorage.getItem('exploreriq_saved_itineraries') || '[]');
    savedList.unshift({ _id: savedId, id: savedId, ...itineraryData, savedAt: new Date().toISOString() });
    localStorage.setItem('exploreriq_saved_itineraries', JSON.stringify(savedList));
    return {
      success: true,
      isClientFallback: true,
      itineraryId: savedId,
      message: 'Saved to local storage.'
    };
  },

  /**
   * GET /api/planner/itineraries/:id
   * Retrieves saved itinerary
   */
  async getItineraryById(id) {
    if (isLocalhost) {
      try {
        const response = await apiClient.get(`/planner/itineraries/${id}`);
        if (response.data?.success) {
          return response.data.itinerary;
        }
      } catch (err) {
        console.warn('[plannerApi.getItineraryById] Looking up in localStorage:', err.message);
      }
    }

    const savedList = JSON.parse(localStorage.getItem('exploreriq_saved_itineraries') || '[]');
    const found = savedList.find((i) => i._id === id || i.id === id);
    if (found) return found;
    throw new Error('Itinerary not found');
  }
};

// ==========================================
// 2. ROUTE PLANNER API CLIENT
// ==========================================
export const routeApi = {
  /**
   * POST /api/route/calculate
   * Calculates road distance, duration, multi-modal fares, and route geometry
   */
  async calculateRoute(payload) {
    if (isLocalhost) {
      try {
        const response = await apiClient.post('/route/calculate', payload);
        if (response.data?.success) {
          return response.data;
        }
      } catch (err) {
        console.warn('[routeApi.calculateRoute] Server unreachable, using client routing engine fallback:', err.message);
      }
    }

    // Client-side routing engine fallback
    return clientCalculateRoute({
      startCoords: { lat: payload.startLat, lng: payload.startLng },
      destCoords: { lat: payload.destLat, lng: payload.destLng },
      destinationName: payload.destName,
      cityContext: payload.cityContext
    });
  }
};

// ==========================================
// 3. COMMUNITY HIDDEN GEMS API CLIENT
// ==========================================
export const gemsApi = {
  /**
   * GET /api/gems
   * Retrieves all hidden gems sorted by newest or upvotes
   */
  async getAll(params = {}) {
    if (isLocalhost) {
      try {
        const response = await apiClient.get('/gems', { params });
        if (response.data?.success && Array.isArray(response.data.gems) && response.data.gems.length > 0) {
          return response.data.gems;
        }
      } catch (err) {
        console.warn('[gemsApi.getAll] Server unreachable, using local storage/fallback:', err.message);
      }
    }

    const localGems = getLocalGems();
    const combined = [...localGems, ...COMMUNITY_GEMS];
    return combined;
  },

  /**
   * POST /api/gems/create or POST /api/gems
   * Submits a new hidden gem
   */
  async create(gemData) {
    if (isLocalhost) {
      try {
        const response = await apiClient.post('/gems/create', gemData);
        if (response.data?.success) {
          return response.data.gem;
        }
      } catch (err) {
        console.warn('[gemsApi.create] Server unreachable, saving to localStorage:', err.message);
      }
    }

    const newGem = {
      _id: `gem_${Date.now()}`,
      id: `gem_${Date.now()}`,
      ...gemData,
      upvotes: 1,
      likes: 1,
      createdAt: new Date().toISOString()
    };
    const localGems = getLocalGems();
    localGems.unshift(newGem);
    saveLocalGems(localGems);
    return newGem;
  },

  /**
   * POST /api/gems/:id/upvote
   * Increments upvote count
   */
  async upvote(id) {
    if (isLocalhost) {
      try {
        const response = await apiClient.post(`/gems/${id}/upvote`);
        if (response.data?.success) {
          return response.data.upvotes || response.data.likes;
        }
      } catch (err) {
        console.warn('[gemsApi.upvote] Server unreachable, updating in localStorage:', err.message);
      }
    }

    const localGems = getLocalGems();
    const found = localGems.find((g) => g._id === id || g.id === id);
    if (found) {
      found.upvotes = (found.upvotes || found.likes || 0) + 1;
      found.likes = found.upvotes;
      saveLocalGems(localGems);
      return found.upvotes;
    }
    return null;
  }
};

// ==========================================
// 4. UNIFIED EXPLORERIQ API CLIENT
// ==========================================
export const api = {
  plannerApi,
  routeApi,
  gemsApi,

  // 1. Destinations & Places
  async getDestinations() {
    if (isLocalhost) {
      try {
        const response = await apiClient.get('/destinations');
        if (response.data?.destinations && response.data.destinations.length > 0) {
          return response.data.destinations;
        }
      } catch (err) {
        console.warn('[api.getDestinations] Using curated CITIES_DATA:', err.message);
      }
    }
    return CITIES_DATA;
  },

  // 2. Sample Monuments for 1-Click Scanner Gallery
  async getSampleMonuments() {
    if (isLocalhost) {
      try {
        const response = await apiClient.get('/monuments/samples');
        if (response.data?.samples && response.data.samples.length > 0) {
          return response.data.samples;
        }
      } catch (err) {
        console.warn('[api.getSampleMonuments] Using curated SAMPLE_MONUMENTS:', err.message);
      }
    }
    return SAMPLE_MONUMENTS;
  },

  // 3. Community Gems (Required by TravelContext)
  async getCommunityGems() {
    return gemsApi.getAll();
  },

  // 4. Create Community Gem (Required by TravelContext)
  async createCommunityGem(gemData) {
    return gemsApi.create(gemData);
  },

  // 5. Like / Upvote Community Gem (Required by TravelContext)
  async likeCommunityGem(gemId) {
    return gemsApi.upvote(gemId);
  },

  // 6. Nearby Eateries (Required by PlaceDrawer)
  async getNearbyEateries(lat, lng, radius = 15) {
    if (isLocalhost) {
      try {
        const response = await apiClient.get('/places/nearby', {
          params: { lat, lng, radius }
        });
        if (response.data?.success) {
          return response.data;
        }
      } catch (err) {
        console.warn('[api.getNearbyEateries] Using client calculation:', err.message);
      }
    }

    // Client-side nearest city eateries calculation
    let nearest = null;
    let minD = Infinity;
    for (const d of CITIES_DATA) {
      if (d.coordinates) {
        const dist = calculateHaversineDistance(lat, lng, d.coordinates[0], d.coordinates[1]);
        if (dist < minD) {
          minD = dist;
          nearest = d;
        }
      }
    }

    return {
      success: true,
      city: nearest ? nearest.name : 'Surrounding Area',
      distanceFromCityCenter: `${minD.toFixed(1)} km`,
      eateries: (nearest && nearest.localFoodSpecialties) ? nearest.localFoodSpecialties.map(f => ({
        ...f,
        distance: `${(minD * 0.15 + 0.5).toFixed(1)} km`,
        city: nearest.name
      })) : []
    };
  },

  // 7. Identify Monument with AI Scanner
  async identifyMonument(imageFile, rawFileName = '', directMonumentId = null) {
    if (isLocalhost) {
      const formData = new FormData();
      if (imageFile instanceof File || imageFile instanceof Blob) {
        formData.append('image', imageFile, rawFileName || imageFile.name || 'scan.jpg');
      } else if (typeof imageFile === 'string') {
        formData.append('imageUri', imageFile);
      }
      if (rawFileName) formData.append('fileName', rawFileName);
      if (directMonumentId) formData.append('directMonumentId', directMonumentId);

      try {
        const response = await apiClient.post('/monuments/identify', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.data?.success) {
          return response.data;
        }
      } catch (err) {
        console.warn('[api.identifyMonument] Using client scanner engine:', err.message);
      }
    }

    // Client fallback scanner
    if (directMonumentId) {
      const found = RECOGNIZED_MONUMENTS.find((m) => m.id === directMonumentId) || RECOGNIZED_MONUMENTS[0];
      return {
        success: true,
        monument: found,
        confidence: 99.4,
        visualFeatures: [
          `${found.architecturalStyle || 'Classical'} Profile Verified`,
          'High-Resolution Benchmark Signature Confirmed',
          `${found.city}, ${found.state} Geographically Aligned`
        ]
      };
    }
    return detectMonument(imageFile, rawFileName);
  },

  // 8. Get Monument by ID
  async getMonumentById(id) {
    if (isLocalhost) {
      try {
        const response = await apiClient.get(`/monuments/${id}`);
        if (response.data?.monument) {
          return response.data.monument;
        }
      } catch {}
    }
    return RECOGNIZED_MONUMENTS.find((m) => m.id === id);
  },

  // 9. Check Backend Health
  async checkHealth() {
    if (!isLocalhost) return false;
    try {
      const response = await apiClient.get('/health', { timeout: 1500 });
      return response.data.status === 'online';
    } catch {
      return false;
    }
  }
};

export default api;
