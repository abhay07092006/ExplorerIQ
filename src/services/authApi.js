import axios from 'axios';

const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || 'http://localhost:5000/api/v1';

// Local storage keys for resilient offline/static fallback
const STORAGE_USER_KEY = 'exploreriq_auth_user';
const STORAGE_TOKEN_KEY = 'exploreriq_auth_token';

// Helper: Get token from localStorage
export const getStoredToken = () => localStorage.getItem(STORAGE_TOKEN_KEY);

// Helper: Set user session in localStorage
export const setStoredSession = (user, token) => {
  if (user) localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
  if (token) localStorage.setItem(STORAGE_TOKEN_KEY, token);
};

// Helper: Clear user session
export const clearStoredSession = () => {
  localStorage.removeItem(STORAGE_USER_KEY);
  localStorage.removeItem(STORAGE_TOKEN_KEY);
};

// Helper: Get offline stored user
export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/**
 * Register a new user
 */
export async function registerUser({ name, email, password, homeCity = 'New Delhi' }) {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, {
      name,
      email,
      password,
      homeCity
    });
    const { user, token } = res.data;
    setStoredSession(user, token);
    return { user, token };
  } catch (err) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }

    // Offline / Standalone Fallback
    console.warn('[authApi] Backend unreachable. Registering in local offline storage.');
    const mockUser = {
      _id: `user-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Passionate explorer uncovering the architectural wonders of India.',
      homeCity,
      joinedDate: new Date().toISOString(),
      savedTrips: [],
      bookmarkedPlaces: [],
      contributedReviews: [],
      scannedMonuments: []
    };
    const mockToken = `offline-token-${Date.now()}`;
    setStoredSession(mockUser, mockToken);
    return { user: mockUser, token: mockToken };
  }
}

/**
 * Log in an existing user
 */
export async function loginUser({ email, password }) {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password
    });
    const { user, token } = res.data;
    setStoredSession(user, token);
    return { user, token };
  } catch (err) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }

    // Offline fallback for demo
    console.warn('[authApi] Backend unreachable. Logging in with local offline session.');
    const stored = getStoredUser();
    if (stored && stored.email === email.toLowerCase()) {
      const mockToken = `offline-token-${Date.now()}`;
      setStoredSession(stored, mockToken);
      return { user: stored, token: mockToken };
    }

    // Default Demo Traveler fallback
    const demoUser = {
      _id: 'demo-traveler-001',
      name: 'Aarav Sharma',
      email: email.toLowerCase(),
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      bio: 'Heritage enthusiast exploring UNESCO world heritage landmarks and ancient stepwells.',
      homeCity: 'Jaipur, Rajasthan',
      joinedDate: new Date().toISOString(),
      savedTrips: [
        {
          tripId: 'demo-trip-1',
          destination: 'Jaipur',
          cityName: 'Jaipur',
          durationDays: 3,
          guests: 2,
          totalBudget: 30000,
          currency: 'INR',
          currencySymbol: '₹',
          grandTotal: 26912,
          isDeficit: false,
          deficitAmount: 0,
          hotel: {
            name: 'Traditional Heritage Haveli',
            nightlyRate: 3500,
            totalStayCost: 10500,
            tier: 'moderate'
          },
          createdAt: new Date().toISOString(),
          schedule: []
        }
      ],
      bookmarkedPlaces: [
        {
          placeId: 'demo-bm-1',
          name: 'Amber Palace & Jaigarh Fort',
          category: 'monument',
          city: 'Jaipur',
          state: 'Rajasthan',
          lat: 26.9855,
          lon: 75.8513,
          image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
          description: 'Magnificent 16th-century Rajput citadel overlooking Maota Lake.',
          openingHours: '09:00 AM - 05:30 PM',
          addedAt: new Date().toISOString()
        }
      ],
      contributedReviews: [
        {
          reviewId: 'demo-rev-1',
          gemId: 'gem-2',
          gemTitle: 'Hidden Stairwell inside Panna Meena Ka Kund',
          rating: 5,
          comment: 'Incredible sunrise spot with virtually no tourists before 8:30 AM!',
          createdAt: new Date().toISOString()
        }
      ],
      scannedMonuments: [
        {
          monumentId: 'monument-1',
          name: 'Hawa Mahal (Palace of Winds)',
          confidence: 0.98,
          location: 'Jaipur',
          state: 'Rajasthan',
          image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
          scannedAt: new Date().toISOString()
        }
      ]
    };
    const demoToken = 'demo-token-123';
    setStoredSession(demoUser, demoToken);
    return { user: demoUser, token: demoToken };
  }
}

/**
 * Fetch current user profile
 */
export async function getCurrentUser(token) {
  try {
    const res = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStoredSession(res.data.user, token);
    return res.data.user;
  } catch (err) {
    return getStoredUser();
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(profileData, token) {
  try {
    const res = await axios.put(`${API_BASE_URL}/auth/profile`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStoredSession(res.data.user, token);
    return res.data.user;
  } catch (err) {
    const current = getStoredUser() || {};
    const updated = { ...current, ...profileData };
    setStoredSession(updated, token);
    return updated;
  }
}

/**
 * Save custom itinerary trip to user profile
 */
export async function saveUserTrip(tripData, token) {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/saved-trips`, tripData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const current = getStoredUser() || {};
    current.savedTrips = res.data.savedTrips;
    setStoredSession(current, token);
    return res.data.savedTrips;
  } catch (err) {
    const current = getStoredUser() || { savedTrips: [] };
    const tripId = tripData.tripId || `trip-${Date.now()}`;
    const newTrip = { ...tripData, tripId, createdAt: new Date().toISOString() };
    const idx = (current.savedTrips || []).findIndex(t => t.tripId === tripId);
    if (idx >= 0) {
      current.savedTrips[idx] = newTrip;
    } else {
      current.savedTrips = [newTrip, ...(current.savedTrips || [])];
    }
    setStoredSession(current, token);
    return current.savedTrips;
  }
}

/**
 * Delete a saved trip
 */
export async function deleteUserTrip(tripId, token) {
  try {
    const res = await axios.delete(`${API_BASE_URL}/auth/saved-trips/${tripId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const current = getStoredUser() || {};
    current.savedTrips = res.data.savedTrips;
    setStoredSession(current, token);
    return res.data.savedTrips;
  } catch (err) {
    const current = getStoredUser() || { savedTrips: [] };
    current.savedTrips = (current.savedTrips || []).filter(t => t.tripId !== tripId);
    setStoredSession(current, token);
    return current.savedTrips;
  }
}

/**
 * Toggle bookmark for a place
 */
export async function toggleUserBookmark(placeData, token) {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/bookmarks`, placeData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const current = getStoredUser() || {};
    current.bookmarkedPlaces = res.data.bookmarkedPlaces;
    setStoredSession(current, token);
    return res.data;
  } catch (err) {
    const current = getStoredUser() || { bookmarkedPlaces: [] };
    const idx = (current.bookmarkedPlaces || []).findIndex(b => b.placeId === placeData.placeId);
    let isBookmarked = false;
    if (idx >= 0) {
      current.bookmarkedPlaces.splice(idx, 1);
      isBookmarked = false;
    } else {
      current.bookmarkedPlaces = [{ ...placeData, addedAt: new Date().toISOString() }, ...(current.bookmarkedPlaces || [])];
      isBookmarked = true;
    }
    setStoredSession(current, token);
    return { isBookmarked, bookmarkedPlaces: current.bookmarkedPlaces };
  }
}

/**
 * Record a scanned monument to history
 */
export async function recordUserScannedMonument(scanData, token) {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/scanned-monuments`, scanData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const current = getStoredUser() || {};
    current.scannedMonuments = res.data.scannedMonuments;
    setStoredSession(current, token);
    return res.data.scannedMonuments;
  } catch (err) {
    const current = getStoredUser() || { scannedMonuments: [] };
    current.scannedMonuments = [{ ...scanData, scannedAt: new Date().toISOString() }, ...(current.scannedMonuments || [])];
    setStoredSession(current, token);
    return current.scannedMonuments;
  }
}
