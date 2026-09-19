import { useState, useEffect } from 'react';
import { CITIES_DATA, COMMUNITY_GEMS } from '../data/travelData';
import { RECOGNIZED_MONUMENTS, detectMonument } from '../data/monumentsData';
import { TravelContext } from './TravelContextCore';

export function TravelProvider({ children }) {
  // Navigation & View
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'scan' | 'planner' | 'gems'
  const [currentCityId, setCurrentCityId] = useState('agra');
  const [searchQuery, setSearchQuery] = useState('');

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

  // Current City Object
  const currentCity = CITIES_DATA.find((c) => c.id === currentCityId) || CITIES_DATA[0];

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

  // AI Monument Scanner State
  const [scannerState, setScannerState] = useState({
    image: null,
    isScanning: false,
    result: null,
    detectedFeatures: [],
    confidence: null,
    fileName: ''
  });

  const scanImage = (imageSrc, fileName = '', directMonumentId = null) => {
    setScannerState((prev) => ({
      ...prev,
      image: imageSrc,
      fileName,
      isScanning: true,
      result: null,
      confidence: null,
      detectedFeatures: []
    }));

    // Realistic scanning duration simulation
    setTimeout(() => {
      let detection;
      if (directMonumentId) {
        const found = RECOGNIZED_MONUMENTS.find((m) => m.id === directMonumentId) || RECOGNIZED_MONUMENTS[0];
        detection = {
          monument: found,
          confidence: 99.2,
          visualFeatures: [
            'Signature Dome & Arch Geometry',
            'Spectrophotometric Stone Profiling',
            'Monument Architectural Contour',
            'Geographic Landmark Alignment'
          ]
        };
      } else {
        detection = detectMonument(imageSrc, fileName);
      }

      setScannerState((prev) => ({
        ...prev,
        isScanning: false,
        result: detection.monument,
        confidence: detection.confidence,
        detectedFeatures: detection.visualFeatures
      }));
    }, 1800);
  };

  const resetScanner = () => {
    setScannerState({
      image: null,
      isScanning: false,
      result: null,
      detectedFeatures: [],
      confidence: null,
      fileName: ''
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

  // Community Gems State
  const [communityGems, setCommunityGems] = useState(() => {
    try {
      const saved = localStorage.getItem('exploreriq_gems');
      return saved ? JSON.parse(saved) : COMMUNITY_GEMS;
    } catch {
      return COMMUNITY_GEMS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('exploreriq_gems', JSON.stringify(communityGems));
    } catch (e) {
      console.error(e);
    }
  }, [communityGems]);

  const addCommunityGem = (newGem) => {
    const gem = {
      ...newGem,
      id: `gem-custom-${Date.now()}`,
      likes: 1,
      date: 'Just now',
      author: newGem.author || 'Fellow Explorer',
      avatar: newGem.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      badgeColor: 'bg-teal-500/10 text-teal-600 border-teal-200'
    };
    setCommunityGems((prev) => [gem, ...prev]);
  };

  const likeGem = (gemId) => {
    setCommunityGems((prev) =>
      prev.map((g) => {
        if (g.id === gemId) {
          return { ...g, likes: g.likes + 1, userLiked: true };
        }
        return g;
      })
    );
  };

  return (
    <TravelContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentCityId,
        setCurrentCityId,
        currentCity,
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
        addCommunityGem,
        likeGem
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}
