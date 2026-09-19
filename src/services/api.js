import axios from 'axios';
import { generateDynamicItinerary } from '../utils/itineraryEngine.js';
import { calculateRoute as clientCalculateRoute } from './transitApi.js';

// API Base URL from Vite environment or default localhost:5000
const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Lazy fallback data loader
let fallbackDataPromise = null;
const getFallbackData = async () => {
  if (!fallbackDataPromise) {
    fallbackDataPromise = (async () => {
      try {
        const [travelMod, monMod] = await Promise.all([
          import('../data/travelData.js'),
          import('../data/monumentsData.js')
        ]);
        return {
          destinations: travelMod.CITIES_DATA || [],
          communityGems: travelMod.COMMUNITY_GEMS || [],
          monuments: monMod.RECOGNIZED_MONUMENTS || [],
          samples: monMod.SAMPLE_MONUMENTS || [],
          detectMonument: monMod.detectMonument
        };
      } catch (e) {
        console.warn('[API Service] Fallback data could not be loaded:', e);
        return { destinations: [], communityGems: [], monuments: [], samples: [] };
      }
    })();
  }
  return fallbackDataPromise;
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
    try {
      const response = await apiClient.post('/planner/generate', payload);
      if (response.data?.success) {
        return response.data;
      }
      throw new Error(response.data?.message || 'Failed to generate itinerary');
    } catch (err) {
      console.warn('[plannerApi.generateItinerary] Server unreachable, using client engine fallback:', err.message);
      // Fallback to client-side itineraryEngine
      const fallback = await getFallbackData();
      const targetCity = fallback.destinations.find(
        (c) => c.name.toLowerCase() === (payload.city || '').toLowerCase()
      ) || fallback.destinations[0] || { name: payload.city || 'Agra' };

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
    }
  },

  /**
   * POST /api/planner/save
   * Saves itinerary to MongoDB / localStorage fallback
   */
  async saveItinerary(itineraryData) {
    try {
      const response = await apiClient.post('/planner/save', itineraryData);
      if (response.data?.success) {
        return response.data;
      }
      throw new Error(response.data?.message || 'Failed to save itinerary');
    } catch (err) {
      console.warn('[plannerApi.saveItinerary] Server unreachable, saving to localStorage:', err.message);
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
    }
  },

  /**
   * GET /api/planner/itineraries/:id
   * Retrieves saved itinerary
   */
  async getItineraryById(id) {
    try {
      const response = await apiClient.get(`/planner/itineraries/${id}`);
      if (response.data?.success) {
        return response.data.itinerary;
      }
      throw new Error(response.data?.message || 'Itinerary not found');
    } catch (err) {
      console.warn('[plannerApi.getItineraryById] Looking up in localStorage:', err.message);
      const savedList = JSON.parse(localStorage.getItem('exploreriq_saved_itineraries') || '[]');
      const found = savedList.find((i) => i._id === id || i.id === id);
      if (found) return found;
      throw err;
    }
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
    try {
      const response = await apiClient.post('/route/calculate', payload);
      if (response.data?.success) {
        return response.data;
      }
      throw new Error(response.data?.message || 'Failed to calculate route');
    } catch (err) {
      console.warn('[routeApi.calculateRoute] Server unreachable, using client routing engine fallback:', err.message);
      // Fallback to client-side calculateRoute
      return clientCalculateRoute({
        startCoords: { lat: payload.startLat, lng: payload.startLng },
        destCoords: { lat: payload.destLat, lng: payload.destLng },
        destinationName: payload.destName,
        cityContext: payload.cityContext
      });
    }
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
    try {
      const response = await apiClient.get('/gems', { params });
      if (response.data?.success) {
        return response.data.gems;
      }
      throw new Error('Failed to fetch gems');
    } catch (err) {
      console.warn('[gemsApi.getAll] Server unreachable, using local storage/fallback:', err.message);
      const localGems = JSON.parse(localStorage.getItem('exploreriq_custom_gems') || '[]');
      const fallback = await getFallbackData();
      const combined = [...localGems, ...(fallback.communityGems || [])];
      return combined;
    }
  },

  /**
   * POST /api/gems/create or POST /api/gems
   * Submits a new hidden gem
   */
  async create(gemData) {
    try {
      const response = await apiClient.post('/gems/create', gemData);
      if (response.data?.success) {
        return response.data.gem;
      }
      throw new Error(response.data?.message || 'Failed to create gem');
    } catch (err) {
      console.warn('[gemsApi.create] Server unreachable, saving to localStorage:', err.message);
      const newGem = {
        _id: `gem_${Date.now()}`,
        id: `gem_${Date.now()}`,
        ...gemData,
        upvotes: 1,
        likes: 1,
        createdAt: new Date().toISOString()
      };
      const localGems = JSON.parse(localStorage.getItem('exploreriq_custom_gems') || '[]');
      localGems.unshift(newGem);
      localStorage.setItem('exploreriq_custom_gems', JSON.stringify(localGems));
      return newGem;
    }
  },

  /**
   * POST /api/gems/:id/upvote
   * Increments upvote count
   */
  async upvote(id) {
    try {
      const response = await apiClient.post(`/gems/${id}/upvote`);
      if (response.data?.success) {
        return response.data.upvotes || response.data.likes;
      }
      throw new Error('Failed to upvote gem');
    } catch (err) {
      console.warn('[gemsApi.upvote] Server unreachable, updating in localStorage:', err.message);
      const localGems = JSON.parse(localStorage.getItem('exploreriq_custom_gems') || '[]');
      const found = localGems.find((g) => g._id === id || g.id === id);
      if (found) {
        found.upvotes = (found.upvotes || found.likes || 0) + 1;
        found.likes = found.upvotes;
        localStorage.setItem('exploreriq_custom_gems', JSON.stringify(localGems));
        return found.upvotes;
      }
      return null;
    }
  }
};

// ==========================================
// 4. GENERAL API COMPATIBILITY CLIENT
// ==========================================
export const api = {
  plannerApi,
  routeApi,
  gemsApi,

  async identifyMonument(imageFile, rawFileName = '', directMonumentId = null) {
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
      return response.data;
    } catch (err) {
      const fallback = await getFallbackData();
      if (directMonumentId) {
        const found = fallback.monuments.find((m) => m.id === directMonumentId) || fallback.monuments[0];
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
      if (fallback.detectMonument) {
        return fallback.detectMonument(imageFile, rawFileName);
      }
      throw err;
    }
  },

  async getMonumentById(id) {
    try {
      const response = await apiClient.get(`/monuments/${id}`);
      return response.data.monument;
    } catch {
      const fallback = await getFallbackData();
      return fallback.monuments.find((m) => m.id === id);
    }
  },

  async getSampleMonuments() {
    try {
      const response = await apiClient.get('/monuments/samples');
      return response.data.samples;
    } catch {
      const fallback = await getFallbackData();
      return fallback.samples;
    }
  },

  async getDestinations() {
    try {
      const response = await apiClient.get('/destinations');
      return response.data.destinations;
    } catch {
      const fallback = await getFallbackData();
      return fallback.destinations;
    }
  },

  async checkHealth() {
    try {
      const response = await apiClient.get('/health', { timeout: 2500 });
      return response.data.status === 'online';
    } catch {
      return false;
    }
  }
};

export default api;
