import { useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '../services/api';
import { plannerApi } from '../services/plannerApi';
import { generateDynamicItinerary } from '../utils/itineraryEngine';
import { TravelContext } from './TravelContextCore';

export function TravelProvider({ children }) {
  // Navigation & View
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'scan' | 'planner' | 'gems'
  const [currentCityId, setCurrentCityId] = useState('agra');
  const [searchQuery, setSearchQuery] = useState('');

  // Live REST API State: Destinations & Places
  const [destinations, setDestinations] = useState([]);
  const [isLoadingDestinations, setIsLoadingDestinations] = useState(true);
  const [destinationsError, setDestinationsError] = useState(null);

  // Live REST API State: Sample Gallery Benchmarks
  const [sampleMonuments, setSampleMonuments] = useState([]);
  const [isLoadingSamples, setIsLoadingSamples] = useState(true);

  // Live REST API State: Community Gems
  const [communityGems, setCommunityGems] = useState([]);
  const [isLoadingGems, setIsLoadingGems] = useState(true);

  // Fetch initial data from REST API
  const fetchInitialData = useCallback(async () => {
    setIsLoadingDestinations(true);
    try {
      const [destData, samplesData, gemsData] = await Promise.all([
        api.getDestinations(),
        api.getSampleMonuments(),
        api.getCommunityGems()
      ]);
      setDestinations(destData || []);
      setSampleMonuments(samplesData || []);
      setCommunityGems(gemsData || []);
    } catch (err) {
      console.error('[TravelContext] API initial data fetch failed:', err);
      setDestinationsError(err.message || 'Failed to load destinations');
    } finally {
      setIsLoadingDestinations(false);
      setIsLoadingSamples(false);
      setIsLoadingGems(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Derived: All Places across destinations
  const allPlaces = useMemo(() => {
    return (destinations || []).flatMap((city) =>
      (city.places || []).map((place) => ({
        ...place,
        cityId: city.id,
        cityName: city.name,
        state: city.state,
        zone: city.zone,
        bestDuration: city.bestDuration,
        bestTimeToVisit: city.bestTimeToVisit,
        localFoodSpecialties: city.localFoodSpecialties,
        cityOverview: city.overview
      }))
    );
  }, [destinations]);

  // Derived: Current Active City
  const currentCity = useMemo(() => {
    if (!destinations || destinations.length === 0) return null;
    return destinations.find((c) => c.id === currentCityId) || destinations[0];
  }, [destinations, currentCityId]);

  // Map Category Filters: all 5 selected by default
  const [activeCategories, setActiveCategories] = useState([
    'heritage',
    'temples',
    'museums',
    'food',
    'scenic'
  ]);

  // Selected Place for Map Drawer / Modal
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isPlaceDrawerOpen, setIsPlaceDrawerOpen] = useState(false);

  // Bookmarks with local persistence
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('exploreriq_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('exploreriq_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  const toggleBookmark = (item) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id);
      if (exists) {
        return prev.filter((b) => b.id !== item.id);
      } else {
        return [...prev, { ...item, savedAt: new Date().toISOString() }];
      }
    });
  };

  const isBookmarked = (id) => bookmarks.some((b) => b.id === id);

  // Category Toggle Handler
  const toggleCategory = (categoryId) => {
    if (categoryId === 'all') {
      if (activeCategories.length === 5) {
        setActiveCategories([]);
      } else {
        setActiveCategories(['heritage', 'temples', 'museums', 'food', 'scenic']);
      }
      return;
    }

    setActiveCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const openPlaceDrawer = (place) => {
    setSelectedPlace(place);
    setIsPlaceDrawerOpen(true);
  };

  const closePlaceDrawer = () => {
    setIsPlaceDrawerOpen(false);
  };

  // AI Monument Scanner State (Powered by POST /api/v1/monuments/identify)
  const [scannerState, setScannerState] = useState({
    image: null,
    isScanning: false,
    result: null,
    detectedFeatures: [],
    confidence: null,
    fileName: '',
    error: null
  });

  const scanImage = async (imageSrc, fileName = '', directMonumentId = null) => {
    setScannerState((prev) => ({
      ...prev,
      image: typeof imageSrc === 'string' ? imageSrc : URL.createObjectURL(imageSrc),
      fileName,
      isScanning: true,
      result: null,
      confidence: null,
      detectedFeatures: [],
      error: null
    }));

    try {
      const data = await api.identifyMonument(imageSrc, fileName, directMonumentId);
      setScannerState((prev) => ({
        ...prev,
        isScanning: false,
        result: data.monument,
        confidence: data.confidence,
        detectedFeatures: data.visualFeatures || [],
        error: null
      }));
      return data;
    } catch (err) {
      console.error('[TravelContext] scanImage error:', err);
      setScannerState((prev) => ({
        ...prev,
        isScanning: false,
        error: err.message || 'Monument vision analysis failed'
      }));
    }
  };

  const resetScanner = () => {
    setScannerState({
      image: null,
      isScanning: false,
      result: null,
      detectedFeatures: [],
      confidence: null,
      fileName: '',
      error: null
    });
  };

  // Global Audio Guide / Text-to-Speech Narrator
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    title: '',
    text: '',
    rate: 1.0
  });

  const playAudio = (text, title = 'Audio Tour Guide') => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported by your browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = audioState.rate;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setAudioState((prev) => ({ ...prev, isPlaying: false }));
    };

    utterance.onerror = () => {
      setAudioState((prev) => ({ ...prev, isPlaying: false }));
    };

    setAudioState({
      isPlaying: true,
      title,
      text,
      rate: audioState.rate
    });

    window.speechSynthesis.speak(utterance);
  };

  const pauseAudio = () => {
    if ('speechSynthesis' in window) {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      setAudioState((prev) => ({ ...prev, isPlaying: false }));
    }
  };

  // Community Gems State with Live API creation & upvoting
  const addCommunityGem = async (newGem) => {
    try {
      const created = await api.createCommunityGem(newGem);
      setCommunityGems((prev) => [created, ...prev]);
    } catch (e) {
      console.error('[TravelContext] addCommunityGem error:', e);
    }
  };

  const likeGem = async (gemId) => {
    setCommunityGems((prev) =>
      prev.map((g) => {
        if (g.id === gemId) {
          return { ...g, likes: (g.likes || 0) + 1, userLiked: true };
        }
        return g;
      })
    );
    try {
      await api.likeCommunityGem(gemId);
    } catch (e) {
      console.warn('[TravelContext] likeGem API sync error:', e);
    }
  };

  // Live Smart Itinerary Planner State with User-Defined Budgeting
  const [plannerParams, setPlannerParams] = useState({
    destinationId: 'jaipur',
    checkInDate: new Date().toISOString().split('T')[0],
    checkOutDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    guests: 2,
    totalBudget: 25000,
    currency: 'INR',
    budgetTier: 'moderate',
    travelStyles: ['heritage', 'food', 'scenic']
  });
  const [plannerResult, setPlannerResult] = useState(null);
  const [isLoadingPlanner, setIsLoadingPlanner] = useState(false);
  const [plannerLoadingMessage, setPlannerLoadingMessage] = useState('');
  const [plannerError, setPlannerError] = useState(null);

  const calculateLivePlan = useCallback(async (overrides = {}) => {
    setIsLoadingPlanner(true);
    setPlannerError(null);
    const params = { ...plannerParams, ...overrides };
    
    // Find target destination
    const targetCity = (destinations || []).find((c) => c.id === (params.destinationId || currentCityId)) ||
      currentCity || { id: 'jaipur', name: 'Jaipur', places: [] };

    setPlannerLoadingMessage(`Fetching real-time hotel prices for ${targetCity.name}...`);

    try {
      // 1. Fetch live property pricing with 45% budget cap
      const hotelData = await plannerApi.searchHotels({
        destination: targetCity.name,
        checkInDate: params.checkInDate,
        checkOutDate: params.checkOutDate,
        guests: params.guests,
        totalBudget: params.totalBudget || 25000,
        currency: params.currency || 'INR',
        budgetTier: params.budgetTier
      });

      // 2. Fetch verified ASI monument ticket pricing
      setPlannerLoadingMessage(`Calculating live ASI ticket rates for ${targetCity.name}...`);
      const monumentPrices = await plannerApi.fetchVerifiedMonumentTickets(targetCity.id, targetCity.name);

      // 3. Compute duration in days/nights
      const start = new Date(params.checkInDate);
      const end = new Date(params.checkOutDate);
      const diffDays = Math.max(1, Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)));

      // 4. Generate dynamic 7-slot itinerary & user-defined budget allocation
      setPlannerLoadingMessage(`Synthesizing 7-slot daily itinerary & allocating custom budget for ${targetCity.name}...`);
      const itinerary = generateDynamicItinerary({
        city: targetCity,
        places: targetCity.places || [],
        days: diffDays,
        hotel: hotelData,
        monumentPrices,
        totalBudget: params.totalBudget || 25000,
        currency: params.currency || 'INR',
        budgetTier: params.budgetTier,
        guests: params.guests,
        travelStyles: params.travelStyles
      });

      setPlannerParams(params);
      setPlannerResult({
        ...itinerary,
        hotelPricing: hotelData,
        monumentPrices,
        params,
        isLiveApi: hotelData.isLiveApi,
        notice: hotelData.notice
      });
    } catch (err) {
      console.error('[TravelContext] calculateLivePlan error:', err);
      setPlannerError(err.message || 'Failed to calculate live itinerary plan');
    } finally {
      setIsLoadingPlanner(false);
      setPlannerLoadingMessage('');
    }
  }, [plannerParams, destinations, currentCity, currentCityId]);

  return (
    <TravelContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentCityId,
        setCurrentCityId,
        currentCity,
        destinations,
        allPlaces,
        isLoadingDestinations,
        destinationsError,
        refetchDestinations: fetchInitialData,
        sampleMonuments,
        isLoadingSamples,
        searchQuery,
        setSearchQuery,
        activeCategories,
        toggleCategory,
        selectedPlace,
        isPlaceDrawerOpen,
        openPlaceDrawer,
        closePlaceDrawer,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        scannerState,
        setScannerState,
        scanImage,
        resetScanner,
        audioState,
        playAudio,
        pauseAudio,
        communityGems,
        isLoadingGems,
        addCommunityGem,
        likeGem,
        plannerParams,
        setPlannerParams,
        plannerResult,
        isLoadingPlanner,
        plannerLoadingMessage,
        plannerError,
        calculateLivePlan
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}
