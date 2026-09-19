import { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Navigation,
  MapPin,
  Locate,
  Clock,
  Compass,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Leaf,
  Coins,
  Search,
  X,
  AlertCircle,
  Bus,
  Train,
  Car,
  Bike,
  Sparkles,
  RefreshCw,
  Layers
} from 'lucide-react';
import { useTravel } from '../context/useTravel';
import { transitApi } from '../services/transitApi';

export default function RoutePlanner({
  initialDestination = null,
  isOpen = false,
  onClose = () => {}
}) {
  const { allPlaces = [], currentCity, destinations = [] } = useTravel();

  // Selected Destination
  const [destination, setDestination] = useState(initialDestination || allPlaces[0] || null);

  // Origin (Start)
  const [startQuery, setStartQuery] = useState('');
  const [startCoords, setStartCoords] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const [isManualStart, setIsManualStart] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);

  // Routing State
  const [routeData, setRouteData] = useState(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [routeError, setRouteError] = useState(null);

  // Map DOM and instance refs
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeLayerGroupRef = useRef(null);

  // Sync initialDestination when it changes
  useEffect(() => {
    if (initialDestination) {
      setDestination(initialDestination);
    } else if (!destination && allPlaces.length > 0) {
      setDestination(allPlaces[0]);
    }
  }, [initialDestination, allPlaces]);

  // Destination coordinates resolution
  const destCoords = useMemo(() => {
    if (!destination) return null;
    if (destination.coordObj && destination.coordObj.lat && destination.coordObj.lng) {
      return destination.coordObj;
    }
    if (Array.isArray(destination.coordinates) && destination.coordinates.length === 2) {
      return { lat: destination.coordinates[0], lng: destination.coordinates[1] };
    }
    // Fallback: Jaipur center
    return { lat: 26.9124, lng: 75.7873 };
  }, [destination]);

  // Destination city name
  const destCityName = useMemo(() => {
    return destination?.cityName || destination?.city || currentCity?.name || 'Jaipur';
  }, [destination, currentCity]);

  // Group places for intuitive selector
  const currentCityPlaces = useMemo(() => {
    return allPlaces.filter((p) => {
      const pCity = (p.cityName || p.city || '').toLowerCase();
      return pCity.includes(destCityName.toLowerCase()) || destCityName.toLowerCase().includes(pCity);
    });
  }, [allPlaces, destCityName]);

  const otherPlaces = useMemo(() => {
    return allPlaces.filter((p) => {
      const pCity = (p.cityName || p.city || '').toLowerCase();
      return !pCity.includes(destCityName.toLowerCase()) && !destCityName.toLowerCase().includes(pCity);
    });
  }, [allPlaces, destCityName]);

  // Trigger browser GPS on initial open if no startCoords
  useEffect(() => {
    if (isOpen && !startCoords && !isManualStart) {
      handleUseLiveLocation();
    }
  }, [isOpen]);

  // Handler: Acquire user GPS coordinates
  const handleUseLiveLocation = async () => {
    setIsLocating(true);
    setLocationStatus('Detecting live GPS location...');
    try {
      const pos = await transitApi.getCurrentUserLocation();
      setStartCoords({ lat: pos.lat, lng: pos.lng });
      setIsManualStart(false);

      // Attempt reverse geocoding for friendly label
      try {
        const address = await transitApi.reverseGeocode(pos.lat, pos.lng);
        setStartQuery(address);
        setLocationStatus('Live GPS acquired.');
      } catch {
        setStartQuery(`Current Location (${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)})`);
        setLocationStatus('Live GPS acquired.');
      }
    } catch (err) {
      console.warn('[RoutePlanner] GPS fallback:', err.message);
      // Fallback: near the destination city center offset by ~3km
      const fallbackLat = destCoords ? destCoords.lat - 0.035 : 26.9124;
      const fallbackLng = destCoords ? destCoords.lng - 0.025 : 75.7873;
      setStartCoords({ lat: fallbackLat, lng: fallbackLng });
      setStartQuery(`City Center, ${destCityName}`);
      setLocationStatus('GPS unavailable. Used local city center.');
    } finally {
      setIsLocating(false);
    }
  };

  // Handler: Search address suggestions when typing
  const handleStartInputChange = (e) => {
    const val = e.target.value;
    setStartQuery(val);
    setIsManualStart(true);

    if (val.trim().length >= 3) {
      setIsSearchingSuggestions(true);
      transitApi
        .geocodeAddress(val)
        .then((items) => {
          setSuggestions(items);
          setIsSearchingSuggestions(false);
        })
        .catch(() => {
          setSuggestions([]);
          setIsSearchingSuggestions(false);
        });
    } else {
      setSuggestions([]);
    }
  };

  // Handler: Pick suggestion
  const handleSelectSuggestion = (item) => {
    setStartQuery(item.displayName);
    setStartCoords({ lat: item.lat, lng: item.lng });
    setSuggestions([]);
    setIsManualStart(true);
  };

  // Calculate Route when startCoords or destCoords change
  useEffect(() => {
    if (!startCoords || !destCoords || !isOpen) return;

    let isCancelled = false;
    setIsLoadingRoute(true);
    setRouteError(null);

    transitApi
      .calculateRoute({
        startCoords,
        destCoords,
        mode: 'driving',
        destinationName: destination?.name,
        cityContext: {
          city: destCityName,
          startCoords
        }
      })
      .then((res) => {
        if (!isCancelled) {
          setRouteData(res);
          setIsLoadingRoute(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error('[RoutePlanner] Route calculation failed:', err);
          setRouteError('Could not calculate optimal route.');
          setIsLoadingRoute(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [startCoords, destCoords, isOpen, destination?.name, destCityName]);

  // Compute Multi-Modal Comparison Matrix
  const multiModal = useMemo(() => {
    const dist = routeData?.distanceKm || (startCoords && destCoords
      ? transitApi.calculateRoadDistance(startCoords.lat, startCoords.lng, destCoords.lat, destCoords.lng)
      : 5);
    return transitApi.calculateMultiModalEstimates(dist, destCityName);
  }, [routeData, startCoords, destCoords, destCityName]);

  // Check for potential Red Fort (Delhi) vs Agra Fort (Agra) confusion
  const regionalMismatchNotice = useMemo(() => {
    if (!startCoords || !destination) return null;

    const isStartInAgra = transitApi.calculateHaversineDistance(startCoords.lat, startCoords.lng, 27.1751, 78.0421) < 50;
    const isStartInDelhi = transitApi.calculateHaversineDistance(startCoords.lat, startCoords.lng, 28.6139, 77.2090) < 50;

    if (isStartInAgra && destination.id === 'delhi-red-fort') {
      const agraFortPlace = allPlaces.find(p => p.id === 'agra-fort');
      return {
        message: 'You selected Red Fort in Delhi (~210 km from Agra).',
        suggestionText: 'Switch to Agra Fort (Agra Red Fort) ~2.5 km away',
        targetPlace: agraFortPlace
      };
    }

    if (isStartInDelhi && destination.id === 'agra-fort') {
      const delhiRedFortPlace = allPlaces.find(p => p.id === 'delhi-red-fort');
      return {
        message: 'You selected Agra Fort in Agra (~210 km from Delhi).',
        suggestionText: 'Switch to Red Fort (Delhi Lal Qila) ~12 km away',
        targetPlace: delhiRedFortPlace
      };
    }

    return null;
  }, [startCoords, destination, allPlaces]);

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    // Initialize map if not yet initialized
    if (!mapInstanceRef.current) {
      const initialCenter = startCoords
        ? [startCoords.lat, startCoords.lng]
        : destCoords
        ? [destCoords.lat, destCoords.lng]
        : [26.9124, 75.7873];

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      routeLayerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const layerGroup = routeLayerGroupRef.current;

    if (!map || !layerGroup) return;

    // Clear previous markers & polylines
    layerGroup.clearLayers();

    // Custom Start Marker (Pulsing blue radar dot)
    if (startCoords) {
      const startIcon = L.divIcon({
        className: 'custom-start-marker',
        html: `
          <div style="display:flex;align-items:center;justify-content:center;width:24px;height:24px;background:#0ea5e9;border:3px solid #ffffff;border-radius:50%;box-shadow:0 4px 12px rgba(14,165,233,0.5);">
            <div style="width:6px;height:6px;background:#ffffff;border-radius:50%;"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      L.marker([startCoords.lat, startCoords.lng], { icon: startIcon })
        .bindPopup(`<strong>Your Origin</strong><br/>${startQuery || 'Starting Point'}`)
        .addTo(layerGroup);
    }

    // Custom Destination Marker (Red Monument Pin)
    if (destCoords) {
      const destIcon = L.divIcon({
        className: 'custom-dest-marker',
        html: `
          <div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;background:#ef4444;border:3px solid #ffffff;border-radius:50%;box-shadow:0 4px 14px rgba(239,68,68,0.6);font-size:14px;color:#ffffff;">
            🏛️
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      L.marker([destCoords.lat, destCoords.lng], { icon: destIcon })
        .bindPopup(`<strong>${destination?.name || 'Destination'}</strong><br/>${destCityName}`)
        .addTo(layerGroup);
    }

    // Polyline Route
    if (routeData?.polyline && routeData.polyline.length > 0) {
      const polyline = L.polyline(routeData.polyline, {
        color: '#0284c7',
        weight: 5,
        opacity: 0.85,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(layerGroup);

      // Fit bounds with comfortable padding
      try {
        map.fitBounds(polyline.getBounds(), { padding: [40, 40], maxZoom: 15 });
      } catch {
        // Ignore bounds fitting on initial zero-size
      }
    } else if (startCoords && destCoords) {
      const bounds = L.latLngBounds(
        [startCoords.lat, startCoords.lng],
        [destCoords.lat, destCoords.lng]
      );
      try {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
      } catch {
        // Ignore
      }
    }

    // Invalidate size after container render
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);

    return () => {
      // Keep map alive while modal is open, will be cleaned on unmount
    };
  }, [isOpen, startCoords, destCoords, routeData]);

  // Clean up map when modal closes
  useEffect(() => {
    if (!isOpen && mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
      routeLayerGroupRef.current = null;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <Navigation className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                  Live Multi-Modal Transit & Route Planner
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Live GPS
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Calculate real-time distances, transit fares, and travel times to any monument across India.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Close Route Planner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Controls: Origin & Destination Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
            
            {/* Origin (Start) */}
            <div className="space-y-1.5 relative">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-500 ring-2 ring-sky-200" />
                  <span>Starting From (Origin)</span>
                </label>
                <button
                  onClick={handleUseLiveLocation}
                  disabled={isLocating}
                  className="text-[11px] font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition-colors disabled:opacity-50"
                  title="Detect GPS coordinates"
                >
                  <Locate className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                  <span>{isLocating ? 'Locating...' : 'Use My GPS'}</span>
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={startQuery}
                  onChange={handleStartInputChange}
                  placeholder="Enter starting street, landmark, or city..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-xs"
                />
                {isSearchingSuggestions && (
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400 animate-spin absolute right-3 top-3" />
                )}
              </div>

              {locationStatus && (
                <p className="text-[10px] text-slate-500 italic truncate">
                  {locationStatus}
                </p>
              )}

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-30 max-h-48 overflow-y-auto">
                  {suggestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSuggestion(item)}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-sky-50 border-b border-slate-100 last:border-b-0 flex items-start gap-2"
                    >
                      <MapPin className="w-3.5 h-3.5 text-sky-500 flex-shrink-0 mt-0.5" />
                      <span className="truncate text-slate-700">{item.displayName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-rose-200" />
                <span>Destination Monument / Place</span>
              </label>

              <select
                value={destination?.id || ''}
                onChange={(e) => {
                  const found = allPlaces.find((p) => p.id === e.target.value);
                  if (found) setDestination(found);
                }}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-xs"
              >
                {currentCityPlaces.length > 0 && (
                  <optgroup label={`📍 Monuments in ${destCityName}`}>
                    {currentCityPlaces.map((place) => (
                      <option key={place.id} value={place.id}>
                        {place.name} ({place.cityName || place.city})
                      </option>
                    ))}
                  </optgroup>
                )}
                {otherPlaces.length > 0 && (
                  <optgroup label="🌐 Other Landmarks Across India">
                    {otherPlaces.map((place) => (
                      <option key={place.id} value={place.id}>
                        {place.name} ({place.cityName || place.city})
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>

              {destination && (
                <p className="text-[10px] text-slate-500 flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>
                    {destination.name}, {destCityName}, {destination.state || ''}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Regional Mismatch Alert Banner (e.g. Red Fort Delhi vs Agra Fort) */}
          {regionalMismatchNotice && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 animate-in fade-in">
              <div className="flex items-start sm:items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                <span>
                  {regionalMismatchNotice.message}{' '}
                  <strong>Did you mean {regionalMismatchNotice.suggestionText}?</strong>
                </span>
              </div>
              {regionalMismatchNotice.targetPlace && (
                <button
                  onClick={() => setDestination(regionalMismatchNotice.targetPlace)}
                  className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-[11px] whitespace-nowrap shadow-xs transition-colors self-end sm:self-auto"
                >
                  Switch Destination
                </button>
              )}
            </div>
          )}

          {/* Route Overview & Distance Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30 flex-shrink-0">
                <Compass className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-400 block">
                  Calculated Optimal Road Route
                </span>
                <h4 className="font-display font-extrabold text-lg sm:text-xl text-white">
                  {routeData?.distanceKm || multiModal.distanceKm} km{' '}
                  <span className="text-slate-400 text-sm font-normal">
                    (~{routeData?.durationMinutes || Math.round((multiModal.distanceKm / 30) * 60)} mins driving)
                  </span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Route to <strong>{destination?.name}</strong> in {destCityName}.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 block font-medium">Metro Operational</span>
                <span className={`text-xs font-extrabold ${multiModal.hasMetro ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {multiModal.hasMetro ? 'Yes (Active Network)' : 'No (Road Transit Only)'}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Leaflet Route Map */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-sky-500" />
                <span>Live Route Polyline & Navigation Map</span>
              </span>
              <span className="text-[10px] text-slate-400">
                OpenStreetMap Tiles • OSRM Routing Engine
              </span>
            </div>

            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              {isLoadingRoute && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center gap-2 z-10">
                  <RefreshCw className="w-5 h-5 text-sky-500 animate-spin" />
                  <span className="text-xs font-bold text-slate-800">Calculating driving polyline...</span>
                </div>
              )}
            </div>
          </div>

          {/* 5-Mode Comparison Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-base text-slate-900">
                  Multi-Modal Travel Comparison Matrix
                </h4>
                <p className="text-xs text-slate-500">
                  Compare fares, transit durations, and carbon footprints for 5 local travel modes.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
                5 Modes Analyzed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {multiModal.modes.map((mode) => (
                <div
                  key={mode.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between relative ${
                    !mode.available
                      ? 'bg-slate-50 border-slate-200 opacity-60'
                      : 'bg-white border-slate-200 hover:border-sky-300 hover:shadow-lg'
                  }`}
                >
                  {/* Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-2xl">{mode.emoji}</span>
                      <div>
                        <h5 className="font-bold text-sm text-slate-900 leading-tight">
                          {mode.name}
                        </h5>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {mode.capacity}
                        </span>
                      </div>
                    </div>

                    {/* Smart Badges */}
                    <div className="flex flex-col items-end gap-1">
                      {mode.isCheapest && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-0.5">
                          <Coins className="w-2.5 h-2.5" />
                          <span>Best Budget</span>
                        </span>
                      )}
                      {mode.isFastest && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-amber-100 text-amber-700 border border-amber-200 flex items-center gap-0.5">
                          <Zap className="w-2.5 h-2.5" />
                          <span>Fastest</span>
                        </span>
                      )}
                      {mode.isEco && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-sky-100 text-sky-700 border border-sky-200 flex items-center gap-0.5">
                          <Leaf className="w-2.5 h-2.5" />
                          <span>Eco-Friendly</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing & Duration */}
                  {mode.available ? (
                    <div className="my-2 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-medium">Estimated Fare:</span>
                        <span className="text-base font-extrabold text-slate-900">
                          ₹{mode.estimatedCost}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Est. Travel Time:</span>
                        </span>
                        <span className="font-bold text-sky-600">
                          {mode.durationMinutes} mins
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                        <span>Speed: ~{mode.speedKmh} km/h</span>
                        <span className="text-emerald-600 font-medium">CO2: ~{mode.co2Grams}g</span>
                      </div>
                    </div>
                  ) : (
                    <div className="my-2 p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-800">
                      <p className="font-semibold text-[11px] leading-relaxed">
                        {mode.unavailableNotice}
                      </p>
                    </div>
                  )}

                  {/* Best For Description */}
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-2">
                    {mode.bestFor}
                  </p>

                  {/* Action Link / Booking Button */}
                  {mode.available && mode.bookingUrl ? (
                    <a
                      href={mode.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>{mode.bookingLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : mode.available ? (
                    <div className="w-full py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1">
                      <span>{mode.bookingLabel}</span>
                    </div>
                  ) : (
                    <div className="w-full py-2 bg-slate-200/60 text-slate-400 rounded-xl text-xs font-medium text-center">
                      Not Available in {destCityName}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Calculated using realistic regional fare slabs and verified speed indices.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors"
          >
            Done Planning
          </button>
        </div>
      </div>
    </div>
  );
}
