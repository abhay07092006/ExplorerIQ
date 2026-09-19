import { createContext, useContext, useState, useEffect } from 'react';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserProfile,
  saveUserTrip,
  deleteUserTrip,
  toggleUserBookmark,
  recordUserScannedMonument,
  getStoredToken,
  getStoredUser,
  clearStoredSession
} from '../services/authApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin'); // 'signin' | 'register'

  // Initialize session on mount
  useEffect(() => {
    async function initSession() {
      const storedToken = getStoredToken();
      if (storedToken) {
        setToken(storedToken);
        try {
          const profile = await getCurrentUser(storedToken);
          setUser(profile);
        } catch {
          const offlineUser = getStoredUser();
          setUser(offlineUser);
        }
      }
      setIsLoading(false);
    }
    initSession();
  }, []);

  // Open & Close Modal Helpers
  const openAuthModal = (mode = 'signin') => {
    setAuthModalMode(mode);
    setAuthError(null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthError(null);
  };

  // Password strength checker helper
  const checkPasswordStrength = (password = '') => {
    if (!password) return { score: 0, label: 'Too short', color: 'text-slate-400' };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 1:
        return { score: 20, label: 'Weak', color: 'text-rose-500 bg-rose-500' };
      case 2:
        return { score: 40, label: 'Fair', color: 'text-amber-500 bg-amber-500' };
      case 3:
        return { score: 65, label: 'Good', color: 'text-sky-500 bg-sky-500' };
      case 4:
      case 5:
        return { score: 100, label: 'Strong', color: 'text-emerald-500 bg-emerald-500' };
      default:
        return { score: 10, label: 'Too short', color: 'text-rose-400 bg-rose-400' };
    }
  };

  // Login handler
  const login = async (email, password) => {
    setAuthError(null);
    try {
      const { user: loggedInUser, token: authToken } = await loginUser({ email, password });
      setUser(loggedInUser);
      setToken(authToken);
      closeAuthModal();
      return loggedInUser;
    } catch (err) {
      setAuthError(err.message || 'Login failed.');
      throw err;
    }
  };

  // Register handler
  const register = async ({ name, email, password, homeCity }) => {
    setAuthError(null);
    try {
      const { user: registeredUser, token: authToken } = await registerUser({
        name,
        email,
        password,
        homeCity
      });
      setUser(registeredUser);
      setToken(authToken);
      closeAuthModal();
      return registeredUser;
    } catch (err) {
      setAuthError(err.message || 'Registration failed.');
      throw err;
    }
  };

  // Logout handler
  const logout = () => {
    clearStoredSession();
    setUser(null);
    setToken(null);
    setAuthError(null);
  };

  // Update Profile
  const updateProfile = async (profileData) => {
    try {
      const updated = await updateUserProfile(profileData, token);
      setUser(updated);
      return updated;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  // Save Trip to Profile
  const saveTrip = async (tripData) => {
    try {
      const savedTrips = await saveUserTrip(tripData, token);
      setUser(prev => prev ? { ...prev, savedTrips } : prev);
      return savedTrips;
    } catch (err) {
      console.error('Save trip error:', err);
    }
  };

  // Delete Trip from Profile
  const deleteTrip = async (tripId) => {
    try {
      const savedTrips = await deleteUserTrip(tripId, token);
      setUser(prev => prev ? { ...prev, savedTrips } : prev);
      return savedTrips;
    } catch (err) {
      console.error('Delete trip error:', err);
    }
  };

  // Toggle Bookmark
  const toggleBookmark = async (placeData) => {
    try {
      const res = await toggleUserBookmark(placeData, token);
      setUser(prev => prev ? { ...prev, bookmarkedPlaces: res.bookmarkedPlaces } : prev);
      return res;
    } catch (err) {
      console.error('Toggle bookmark error:', err);
    }
  };

  // Record Monument Scan
  const recordScan = async (scanData) => {
    try {
      const scannedMonuments = await recordUserScannedMonument(scanData, token);
      setUser(prev => prev ? { ...prev, scannedMonuments } : prev);
      return scannedMonuments;
    } catch (err) {
      console.error('Record scan error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        authError,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateProfile,
        saveTrip,
        deleteTrip,
        toggleBookmark,
        recordScan,
        checkPasswordStrength
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
