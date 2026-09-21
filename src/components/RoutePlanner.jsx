import { useState, useEffect, useRef, useMemo } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {
  Navigation,
  MapPin,
  Locate,
  Clock,
  Compass,
  ExternalLink,
  ShieldCheck,
  Zap,
  Leaf,
  Coins,
  X,
  AlertCircle,
  Train,
  RefreshCw,
  Layers,
  Plane,
  Building2
} from 'lucide-react';

import { useTravel } from '../context/useTravel';
import { transitApi } from '../services/transitApi';

// Major Indian city transit hubs
const CITY_TRANSIT_HUBS = {
  agra: {
    cityName: 'Agra',
    center: { name: 'City Center (Sadar Bazaar)', lat: 27.1625, lng: 78.0100 },
    railway: { name: 'Agra Cantt Railway Station (AGC)', lat: 27.1593, lng: 77.9897 },
    airport: { name: 'Agra Kheria Airport (AGR)', lat: 27.1558, lng: 77.9610 }
  },

  delhi: {
    cityName: 'Delhi',
    center: { name: 'Connaught Place / City Center', lat: 28.6315, lng: 77.2167 },
    railway: { name: 'New Delhi Railway Station (NDLS)', lat: 28.6431, lng: 77.2195 },
    airport: { name: 'IGI International Airport (DEL)', lat: 28.5562, lng: 77.1000 }
  },

  jaipur: {
    cityName: 'Jaipur',
    center: { name: 'City Center (MI Road)', lat: 26.9174, lng: 75.8055 },
    railway: { name: 'Jaipur Junction (JP)', lat: 26.9202, lng: 75.7878 },
    airport: { name: 'Jaipur International Airport (JAI)', lat: 26.8242, lng: 75.8122 }
  },

  varanasi: {
    cityName: 'Varanasi',
    center: { name: 'Godowlia / Ghats Center', lat: 25.3090, lng: 83.0064 },
    railway: { name: 'Varanasi Junction (BSB)', lat: 25.3283, lng: 82.9863 },
    airport: { name: 'Lal Bahadur Shastri Airport (VNS)', lat: 25.4526, lng: 82.8593 }
  },

  mumbai: {
    cityName: 'Mumbai',
    center: { name: 'South Mumbai (Fort)', lat: 18.9322, lng: 72.8335 },
    railway: { name: 'CSMT Railway Terminus', lat: 18.9400, lng: 72.8353 },
    airport: { name: 'Chhatrapati Shivaji Airport (BOM)', lat: 19.0896, lng: 72.8656 }
  },

  kolkata: {
    cityName: 'Kolkata',
    center: { name: 'Esplanade / Park Street', lat: 22.5645, lng: 88.3518 },
    railway: { name: 'Howrah Railway Junction (HWH)', lat: 22.5833, lng: 88.3426 },
    airport: { name: 'Netaji Subhash Chandra Airport (CCU)', lat: 22.6547, lng: 88.4467 }
  },

  bengaluru: {
    cityName: 'Bengaluru',
    center: { name: 'MG Road / City Center', lat: 12.9756, lng: 77.6066 },
    railway: { name: 'KSR Bengaluru City Junction (SBC)', lat: 12.9781, lng: 77.5695 },
    airport: { name: 'Kempegowda International Airport (BLR)', lat: 13.1986, lng: 77.7066 }
  },

  hyderabad: {
    cityName: 'Hyderabad',
    center: { name: 'Abids / Central Hyderabad', lat: 17.3916, lng: 78.4739 },
    railway: { name: 'Secunderabad Junction (SC)', lat: 17.4339, lng: 78.5042 },
    airport: { name: "Rajiv Gandhi Int'l Airport (HYD)", lat: 17.2403, lng: 78.4294 }
  },

  chennai: {
    cityName: 'Chennai',
    center: { name: 'T. Nagar / Central Chennai', lat: 13.0418, lng: 80.2341 },
    railway: { name: 'Chennai Central (MAS)', lat: 13.0827, lng: 80.2755 },
    airport: { name: 'Chennai International Airport (MAA)', lat: 12.9941, lng: 80.1709 }
  },

  kochi: {
    cityName: 'Kochi',
    center: { name: 'Marine Drive / Ernakulam', lat: 9.9790, lng: 76.2750 },
    railway: { name: 'Ernakulam Junction (ERS)', lat: 9.9678, lng: 76.2908 },
    airport: { name: 'Cochin International Airport (COK)', lat: 10.1518, lng: 76.3930 }
  },

  udaipur: {
    cityName: 'Udaipur',
    center: { name: 'City Center (Surajpole)', lat: 24.5786, lng: 73.6967 },
    railway: { name: 'Udaipur City Station (UDZ)', lat: 24.5714, lng: 73.6989 },
    airport: { name: 'Maharana Pratap Airport (UDR)', lat: 24.6178, lng: 73.8961 }
  },

  amritsar: {
    cityName: 'Amritsar',
    center: { name: 'Hall Bazaar / City Center', lat: 31.6288, lng: 74.8765 },
    railway: { name: 'Amritsar Junction (ASR)', lat: 31.6340, lng: 74.8653 },
    airport: { name: 'Sri Guru Ram Dass Jee Airport (ATQ)', lat: 31.7096, lng: 74.7973 }
  },

  goa: {
    cityName: 'Goa',
    center: { name: 'Panaji Capital Center', lat: 15.4909, lng: 73.8278 },
    railway: { name: 'Madgaon Junction (MAO)', lat: 15.2741, lng: 73.9772 },
    airport: { name: 'Dabolim Airport (GOI)', lat: 15.3808, lng: 73.8314 }
  },

  hampi: {
    cityName: 'Hampi',
    center: { name: 'Hampi Bazaar Center', lat: 15.3350, lng: 76.4600 },
    railway: { name: 'Hosapete Junction (HPT)', lat: 15.2750, lng: 76.3860 },
    airport: { name: 'Jindal Vijayanagar Airport (VDY)', lat: 15.1667, lng: 76.6333 }
  }
};

function getTransitHubsForCity(cityName = '', destCoords = null) {
  const norm = (cityName || '').toLowerCase();

  const key = Object.keys(CITY_TRANSIT_HUBS).find(
    (k) => norm.includes(k) || k.includes(norm)
  );

  if (key && CITY_TRANSIT_HUBS[key]) {
    return CITY_TRANSIT_HUBS[key];
  }

  const baseLat = destCoords ? destCoords.lat : 26.9124;
  const baseLng = destCoords ? destCoords.lng : 75.7873;

  return {
    cityName: cityName || 'Local Area',
    center: {
      name: `${cityName || 'Local'} City Center`,
      lat: baseLat - 0.02,
      lng: baseLng - 0.02
    },
    railway: {
      name: `${cityName || 'City'} Central Railway Station`,
      lat: baseLat - 0.035,
      lng: baseLng - 0.015
    },
    airport: {
      name: `${cityName || 'City'} Airport`,
      lat: baseLat - 0.08,
      lng: baseLng - 0.05
    }
  };
}

export default function RoutePlanner({
  initialDestination = null,
  isOpen = false,
  onClose = () => {}
}) {
  const { allPlaces = [], currentCity } = useTravel();

  const [destination, setDestination] = useState(
    initialDestination ||
      (currentCity
        ? allPlaces.find((p) => p.cityId === currentCity.id)
        : null) ||
      allPlaces[0] ||
      null
  );

  const [startQuery, setStartQuery] = useState('');
  const [startCoords, setStartCoords] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const [isManualStart, setIsManualStart] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);

  const [routeData, setRouteData] = useState(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [routeError, setRouteError] = useState(null);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeLayerGroupRef = useRef(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    if (initialDestination) {
      setDestination(initialDestination);
    } else if (!destination && allPlaces.length > 0) {
      setDestination(
        (currentCity
          ? allPlaces.find((p) => p.cityId === currentCity.id)
          : null) || allPlaces[0]
      );
    }
  }, [initialDestination, allPlaces, currentCity]);

  const destCoords = useMemo(() => {
    if (!destination) return null;

    if (
      destination.coordObj &&
      destination.coordObj.lat &&
      destination.coordObj.lng
    ) {
      return destination.coordObj;
    }

    if (
      Array.isArray(destination.coordinates) &&
      destination.coordinates.length === 2
    ) {
      return {
        lat: destination.coordinates[0],
        lng: destination.coordinates[1]
      };
    }

    return {
      lat: 26.9124,
      lng: 75.7873
    };
  }, [destination]);

  const destCityName = useMemo(() => {
    return (
      destination?.cityName ||
      destination?.city ||
      currentCity?.name ||
      'Jaipur'
    );
  }, [destination, currentCity]);

  const cityHubs = useMemo(() => {
    return getTransitHubsForCity(destCityName, destCoords);
  }, [destCityName, destCoords]);

  const currentCityPlaces = useMemo(() => {
    return allPlaces.filter((p) => {
      const pCity = (p.cityName || p.city || '').toLowerCase();

      return (
        pCity.includes(destCityName.toLowerCase()) ||
        destCityName.toLowerCase().includes(pCity)
      );
    });
  }, [allPlaces, destCityName]);

  const otherPlaces = useMemo(() => {
    return allPlaces.filter((p) => {
      const pCity = (p.cityName || p.city || '').toLowerCase();

      return (
        !pCity.includes(destCityName.toLowerCase()) &&
        !destCityName.toLowerCase().includes(pCity)
      );
    });
  }, [allPlaces, destCityName]);

  useEffect(() => {
    if (!isOpen) return;

    if (!startCoords || !isManualStart) {
      setStartCoords({
        lat: cityHubs.center.lat,
        lng: cityHubs.center.lng
      });

      setStartQuery(cityHubs.center.name);

      setLocationStatus(
        `Defaulted to ${cityHubs.center.name}. Click 'Use My GPS' or select a preset.`
      );
    }
  }, [isOpen, destination?.id, cityHubs]);

  const handleUseLiveLocation = async () => {
    setIsLocating(true);
    setLocationStatus('Detecting live GPS location...');

    try {
      const pos = await transitApi.getCurrentUserLocation();

      setStartCoords({
        lat: pos.lat,
        lng: pos.lng
      });

      setIsManualStart(true);

      try {
        const address = await transitApi.reverseGeocode(pos.lat, pos.lng);

        setStartQuery(address);
        setLocationStatus('Live GPS acquired.');
      } catch {
        setStartQuery(
          `Current Location (${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)})`
        );

        setLocationStatus('Live GPS acquired.');
      }
    } catch (err) {
      console.warn('[RoutePlanner] GPS fallback:', err.message);

      setStartCoords({
        lat: cityHubs.center.lat,
        lng: cityHubs.center.lng
      });

      setStartQuery(cityHubs.center.name);
      setLocationStatus('GPS unavailable. Used local city center.');
    } finally {
      setIsLocating(false);
    }
  };

  const handleSelectPreset = (hub) => {
    setStartCoords({
      lat: hub.lat,
      lng: hub.lng
    });

    setStartQuery(hub.name);
    setIsManualStart(true);
    setLocationStatus(`Starting from ${hub.name}`);
    setSuggestions([]);
  };

  const handleStartInputChange = (e) => {
    const val = e.target.value;

    setStartQuery(val);
    setIsManualStart(true);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (val.trim().length >= 3) {
      setIsSearchingSuggestions(true);

      debounceTimerRef.current = setTimeout(() => {
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
      }, 350);
    } else {
      setSuggestions([]);
      setIsSearchingSuggestions(false);
    }
  };

  const handleSelectSuggestion = (item) => {
    setStartQuery(item.displayName);

    setStartCoords({
      lat: item.lat,
      lng: item.lng
    });

    setSuggestions([]);
    setIsManualStart(true);
    setLocationStatus('Selected from address search.');
  };

  useEffect(() => {
    if (!startCoords || !destCoords || !isOpen) return;

    let isCancelled = false;

    setIsLoadingRoute(true);
    setRouteError(null);
    setRouteData(null);

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

          setRouteError(
            'Could not calculate driving polyline. Displaying direct road estimates.'
          );

          setIsLoadingRoute(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [
    startCoords,
    destCoords,
    isOpen,
    destination?.name,
    destCityName
  ]);

  const multiModal = useMemo(() => {
    const dist =
      routeData?.distanceKm ||
      (startCoords && destCoords
        ? transitApi.calculateRoadDistance(
            startCoords.lat,
            startCoords.lng,
            destCoords.lat,
            destCoords.lng
          )
        : 5);

    return transitApi.calculateMultiModalEstimates(
      dist,
      destCityName
    );
  }, [
    routeData,
    startCoords,
    destCoords,
    destCityName
  ]);

  const regionalMismatchNotice = useMemo(() => {
    if (!startCoords || !destination) return null;

    const isStartInAgra =
      transitApi.calculateHaversineDistance(
        startCoords.lat,
        startCoords.lng,
        27.1751,
        78.0421
      ) < 50;

    const isStartInDelhi =
      transitApi.calculateHaversineDistance(
        startCoords.lat,
        startCoords.lng,
        28.6139,
        77.2090
      ) < 50;

    if (
      isStartInAgra &&
      destination.id === 'delhi-red-fort'
    ) {
      const agraFortPlace = allPlaces.find(
        (p) => p.id === 'agra-fort'
      );

      return {
        message:
          'You selected Red Fort in Delhi (~210 km from Agra).',
        suggestionText:
          'Switch to Agra Fort (Agra Red Fort) ~2.5 km away',
        targetPlace: agraFortPlace
      };
    }

    if (
      isStartInDelhi &&
      destination.id === 'agra-fort'
    ) {
      const delhiRedFortPlace = allPlaces.find(
        (p) => p.id === 'delhi-red-fort'
      );

      return {
        message:
          'You selected Agra Fort in Agra (~210 km from Delhi).',
        suggestionText:
          'Switch to Red Fort (Delhi Lal Qila) ~12 km away',
        targetPlace: delhiRedFortPlace
      };
    }

    return null;
  }, [startCoords, destination, allPlaces]);

  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      if (mapContainerRef.current._leaflet_id) {
        delete mapContainerRef.current._leaflet_id;
      }

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

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap contributors'
        }
      ).addTo(map);

      routeLayerGroupRef.current =
        L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const layerGroup = routeLayerGroupRef.current;

    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // Heritage gold origin marker
    if (startCoords) {
      const startIcon = L.divIcon({
        className: 'custom-start-marker',
        html: `
          <div style="
            display:flex;
            align-items:center;
            justify-content:center;
            width:24px;
            height:24px;
            background:#C9972B;
            border:3px solid #ffffff;
            border-radius:50%;
            box-shadow:0 4px 12px rgba(201,151,43,0.5);
          ">
            <div style="
              width:6px;
              height:6px;
              background:#ffffff;
              border-radius:50%;
            "></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      L.marker(
        [startCoords.lat, startCoords.lng],
        { icon: startIcon }
      )
        .bindPopup(
          `<strong>Your Origin</strong><br/>${
            startQuery || 'Starting Point'
          }`
        )
        .addTo(layerGroup);
    }

    // Terracotta destination marker
    if (destCoords) {
      const destIcon = L.divIcon({
        className: 'custom-dest-marker',
        html: `
          <div style="
            display:flex;
            align-items:center;
            justify-content:center;
            width:32px;
            height:32px;
            background:#A44A3F;
            border:3px solid #ffffff;
            border-radius:50%;
            box-shadow:0 4px 14px rgba(164,74,63,0.6);
            font-size:14px;
            color:#ffffff;
          ">
            🏛️
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      L.marker(
        [destCoords.lat, destCoords.lng],
        { icon: destIcon }
      )
        .bindPopup(
          `<strong>${destination?.name || 'Destination'}</strong><br/>${destCityName}`
        )
        .addTo(layerGroup);
    }

    // Heritage route line
    if (
      routeData?.polyline &&
      routeData.polyline.length > 0
    ) {
      const polyline = L.polyline(
        routeData.polyline,
        {
          color: '#D88924',
          weight: 5,
          opacity: 0.9,
          lineCap: 'round',
          lineJoin: 'round'
        }
      ).addTo(layerGroup);

      try {
        map.fitBounds(
          polyline.getBounds(),
          {
            padding: [40, 40],
            maxZoom: 15
          }
        );
      } catch {
        // Ignore zero-bounds
      }
    } else if (startCoords && destCoords) {
      try {
        const bounds = L.latLngBounds(
          [startCoords.lat, startCoords.lng],
          [destCoords.lat, destCoords.lng]
        );

        map.fitBounds(
          bounds,
          {
            padding: [40, 40],
            maxZoom: 15
          }
        );
      } catch {
        // Ignore
      }
    }

    const t1 = setTimeout(
      () => map.invalidateSize(),
      100
    );

    const t2 = setTimeout(
      () => map.invalidateSize(),
      300
    );

    const t3 = setTimeout(
      () => map.invalidateSize(),
      600
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [
    isOpen,
    startCoords,
    destCoords,
    routeData
  ]);

  useEffect(() => {
    if (!isOpen && mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch (e) {
        console.warn(
          'Map cleanup error:',
          e
        );
      }

      mapInstanceRef.current = null;
      routeLayerGroupRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.warn(
            'Map unmount cleanup error:',
            e
          );
        }

        mapInstanceRef.current = null;
        routeLayerGroupRef.current = null;
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">

      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B1B18]/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl bg-[#FFF8E7] rounded-3xl shadow-2xl border border-[#E5D5C1] overflow-hidden z-10 flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#6B1E2B] text-white flex items-center justify-between border-b border-[#54202A]">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-2xl bg-[#D88924]/20 text-[#D88924] flex items-center justify-center border border-[#D88924]/30">
              <Navigation className="w-5 h-5 text-[#D88924]" />
            </div>

            <div>
              <div className="flex items-center gap-2">

                <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                  Live Multi-Modal Transit & Route Planner
                </h3>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#D88924]/20 text-[#F2C56B] border border-[#D88924]/30">
                  {multiModal.isInterCity
                    ? 'Inter-City Route'
                    : 'City Transit'}
                </span>

              </div>

              <p className="text-xs text-[#F4E7D0]/75 mt-0.5">
                Calculate real-time distances, transit fares, and travel times to any monument across India.
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#54202A] hover:bg-[#7A3940] text-[#F4E7D0]/70 hover:text-white transition-colors"
            title="Close Route Planner"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F4E7D0]/60 p-4 sm:p-5 rounded-2xl border border-[#E5D5C1]">

            {/* Origin */}
            <div className="space-y-2 relative">

              <div className="flex items-center justify-between">

                <label className="text-xs font-bold text-[#3D2925] flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C9972B] ring-2 ring-[#E8D39A]" />
                  <span>Starting From (Origin)</span>
                </label>

                <button
                  onClick={handleUseLiveLocation}
                  disabled={isLocating}
                  className="text-[11px] font-bold text-[#6B1E2B] hover:text-[#A44A3F] flex items-center gap-1 transition-colors disabled:opacity-50"
                  title="Detect GPS coordinates"
                >
                  <Locate
                    className={`w-3.5 h-3.5 ${
                      isLocating ? 'animate-spin' : ''
                    }`}
                  />
                  <span>
                    {isLocating
                      ? 'Locating...'
                      : 'Use My GPS'}
                  </span>
                </button>

              </div>

              <div className="relative">

                <input
                  type="text"
                  value={startQuery}
                  onChange={handleStartInputChange}
                  placeholder="Enter starting street, landmark, or city..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8C8B5] rounded-xl text-xs text-[#3D2925] placeholder-[#9A8B7E] focus:outline-hidden focus:ring-2 focus:ring-[#C9972B]/40 focus:border-[#C9972B] shadow-xs"
                />

                {isSearchingSuggestions && (
                  <RefreshCw className="w-3.5 h-3.5 text-[#A44A3F] animate-spin absolute right-3 top-3" />
                )}

              </div>

              {/* Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">

                <span className="text-[10px] text-[#9A8B7E] font-semibold">
                  Quick Presets:
                </span>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectPreset(cityHubs.center)
                  }
                  className="px-2 py-1 rounded-lg bg-white hover:bg-[#F4E7D0] border border-[#E5D5C1] hover:border-[#C9972B] text-[10px] font-bold text-[#3D2925] hover:text-[#6B1E2B] flex items-center gap-1 transition-colors shadow-2xs"
                  title={`Start from ${cityHubs.center.name}`}
                >
                  <Building2 className="w-3 h-3 text-[#C9972B]" />
                  <span>City Center</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectPreset(cityHubs.railway)
                  }
                  className="px-2 py-1 rounded-lg bg-white hover:bg-[#F4E7D0] border border-[#E5D5C1] hover:border-[#C9972B] text-[10px] font-bold text-[#3D2925] hover:text-[#6B1E2B] flex items-center gap-1 transition-colors shadow-2xs"
                  title={`Start from ${cityHubs.railway.name}`}
                >
                  <Train className="w-3 h-3 text-[#A44A3F]" />
                  <span>Railway Station</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectPreset(cityHubs.airport)
                  }
                  className="px-2 py-1 rounded-lg bg-white hover:bg-[#F4E7D0] border border-[#E5D5C1] hover:border-[#C9972B] text-[10px] font-bold text-[#3D2925] hover:text-[#6B1E2B] flex items-center gap-1 transition-colors shadow-2xs"
                  title={`Start from ${cityHubs.airport.name}`}
                >
                  <Plane className="w-3 h-3 text-[#304C6E]" />
                  <span>Airport</span>
                </button>

              </div>

              {locationStatus && (
                <p className="text-[10px] text-[#7A6A5D] italic truncate">
                  {locationStatus}
                </p>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#E5D5C1] rounded-xl shadow-xl z-30 max-h-48 overflow-y-auto">

                  {suggestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        handleSelectSuggestion(item)
                      }
                      className="w-full text-left px-3 py-2 text-xs hover:bg-[#F4E7D0] border-b border-[#EFE4D7] last:border-b-0 flex items-start gap-2"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#A44A3F] flex-shrink-0 mt-0.5" />
                      <span className="truncate text-[#4C3B34]">
                        {item.displayName}
                      </span>
                    </button>
                  ))}

                </div>
              )}

            </div>

            {/* Destination */}
            <div className="space-y-2">

              <label className="text-xs font-bold text-[#3D2925] flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#A44A3F] ring-2 ring-[#E7C2BD]" />
                <span>Destination Monument / Place</span>
              </label>

              <select
                value={destination?.id || ''}
                onChange={(e) => {
                  const found = allPlaces.find(
                    (p) => p.id === e.target.value
                  );

                  if (found) {
                    setDestination(found);
                  }
                }}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D8C8B5] rounded-xl text-xs font-semibold text-[#3D2925] focus:outline-hidden focus:ring-2 focus:ring-[#C9972B]/40 focus:border-[#C9972B] shadow-xs"
              >

                {currentCityPlaces.length > 0 && (
                  <optgroup
                    label={`📍 Monuments in ${destCityName}`}
                  >
                    {currentCityPlaces.map((place) => (
                      <option
                        key={place.id}
                        value={place.id}
                      >
                        {place.name} (
                        {place.cityName ||
                          place.city}
                        )
                      </option>
                    ))}
                  </optgroup>
                )}

                {otherPlaces.length > 0 && (
                  <optgroup label="🌐 Other Landmarks Across India">
                    {otherPlaces.map((place) => (
                      <option
                        key={place.id}
                        value={place.id}
                      >
                        {place.name} (
                        {place.cityName ||
                          place.city}
                        )
                      </option>
                    ))}
                  </optgroup>
                )}

              </select>

              {destination && (
                <p className="text-[10px] text-[#7A6A5D] flex items-center gap-1 truncate pt-1">
                  <MapPin className="w-3 h-3 text-[#A99687]" />
                  <span>
                    {destination.name}, {destCityName},{' '}
                    {destination.state || ''}
                  </span>
                </p>
              )}

            </div>

          </div>

          {/* Regional Alert */}
          {regionalMismatchNotice && (
            <div className="p-3.5 bg-[#F4E7D0] border border-[#D8B98A] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B1E2B] animate-in fade-in">

              <div className="flex items-start sm:items-center gap-2">

                <AlertCircle className="w-4 h-4 text-[#A44A3F] flex-shrink-0 mt-0.5 sm:mt-0" />

                <span>
                  {regionalMismatchNotice.message}{' '}
                  <strong>
                    Did you mean{' '}
                    {regionalMismatchNotice.suggestionText}?
                  </strong>
                </span>

              </div>

              {regionalMismatchNotice.targetPlace && (
                <button
                  onClick={() =>
                    setDestination(
                      regionalMismatchNotice.targetPlace
                    )
                  }
                  className="px-3.5 py-1.5 bg-[#A44A3F] hover:bg-[#8E3D35] text-white rounded-xl font-bold text-[11px] whitespace-nowrap shadow-xs transition-colors self-end sm:self-auto"
                >
                  Switch Destination
                </button>
              )}

            </div>
          )}

          {/* Route Overview */}
          <div className="bg-gradient-to-r from-[#6B1E2B] to-[#3D2925] text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">

            <div className="flex items-center gap-4 text-center sm:text-left">

              <div className="w-12 h-12 rounded-2xl bg-[#D88924]/20 text-[#D88924] flex items-center justify-center border border-[#D88924]/30 flex-shrink-0">

                <Compass className="w-6 h-6 animate-pulse" />

              </div>

              <div>

                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#F2C56B] block">
                  {multiModal.isInterCity
                    ? 'Calculated Inter-City Highway Route'
                    : 'Calculated Optimal City Route'}
                </span>

                <h4 className="font-display font-extrabold text-lg sm:text-xl text-white">

                  {routeData?.distanceKm ||
                    multiModal.distanceKm}{' '}
                  km{' '}

                  <span className="text-[#F4E7D0]/60 text-sm font-normal">
                    (~
                    {routeData?.durationMinutes ||
                      Math.round(
                        (multiModal.distanceKm / 30) *
                          60
                      )}{' '}
                    mins driving)
                  </span>

                </h4>

                <p className="text-xs text-[#F4E7D0]/75 mt-0.5">
                  Route to{' '}
                  <strong>
                    {destination?.name}
                  </strong>{' '}
                  in {destCityName}.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2">

              <div className="px-3 py-1.5 rounded-xl bg-[#54202A] border border-[#7A3940] text-center">

                <span className="text-[10px] text-[#F4E7D0]/60 block font-medium">
                  Metro Operational
                </span>

                <span
                  className={`text-xs font-extrabold ${
                    multiModal.hasMetro
                      ? 'text-emerald-400'
                      : 'text-[#F4E7D0]/60'
                  }`}
                >
                  {multiModal.hasMetro
                    ? 'Yes (Active Network)'
                    : 'No (Road Transit Only)'}
                </span>

              </div>

            </div>

          </div>

          {/* Map */}
          <div className="space-y-2">

            <div className="flex items-center justify-between">

              <span className="text-xs font-bold text-[#3D2925] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#C9972B]" />
                <span>
                  Live Route Polyline & Navigation Map
                </span>
              </span>

              <span className="text-[10px] text-[#9A8B7E]">
                OpenStreetMap Tiles • OSRM Routing Engine
              </span>

            </div>

            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#E5D5C1] shadow-inner bg-[#F4E7D0]">

              <div
                ref={mapContainerRef}
                className="w-full h-full z-0"
              />

              {isLoadingRoute && (
                <div className="absolute inset-0 bg-[#FFF8E7]/75 backdrop-blur-xs flex items-center justify-center gap-2 z-10">

                  <RefreshCw className="w-5 h-5 text-[#C9972B] animate-spin" />

                  <span className="text-xs font-bold text-[#3D2925]">
                    Calculating driving polyline...
                  </span>

                </div>
              )}

            </div>

          </div>

          {/* Comparison */}
          <div className="space-y-3">

            <div className="flex items-center justify-between">

              <div>

                <h4 className="font-display font-bold text-base text-[#3D2925]">
                  Multi-Modal Travel Comparison Matrix
                </h4>

                <p className="text-xs text-[#7A6A5D]">
                  {multiModal.isInterCity
                    ? 'Comparing inter-city trains, outstation cabs, and express highway buses.'
                    : 'Compare fares, transit durations, and carbon footprints for 5 local travel modes.'}
                </p>

              </div>

              <span className="text-xs font-bold text-[#6F6259] bg-[#F4E7D0] px-3 py-1 rounded-xl">
                5 Modes Analyzed
              </span>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              {multiModal.modes.map((mode) => (

                <div
                  key={mode.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between relative ${
                    !mode.available
                      ? 'bg-[#F4E7D0]/50 border-[#E5D5C1] opacity-60'
                      : 'bg-white border-[#E5D5C1] hover:border-[#C9972B] hover:shadow-lg'
                  }`}
                >

                  <div className="flex items-center justify-between gap-2 mb-3">

                    <div className="flex items-center gap-1.5">

                      <span className="text-2xl">
                        {mode.emoji}
                      </span>

                      <div>

                        <h5 className="font-bold text-sm text-[#3D2925] leading-tight">
                          {mode.name}
                        </h5>

                        <span className="text-[10px] text-[#9A8B7E] font-medium">
                          {mode.capacity}
                        </span>

                      </div>

                    </div>

                    <div className="flex flex-col items-end gap-1">

                      {mode.isCheapest && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-0.5">
                          <Coins className="w-2.5 h-2.5" />
                          <span>Best Budget</span>
                        </span>
                      )}

                      {mode.isFastest && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-[#F4E7D0] text-[#A44A3F] border border-[#D8B98A] flex items-center gap-0.5">
                          <Zap className="w-2.5 h-2.5" />
                          <span>Fastest</span>
                        </span>
                      )}

                      {mode.isEco && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-[#F4E7D0] text-[#6B1E2B] border border-[#D8B98A] flex items-center gap-0.5">
                          <Leaf className="w-2.5 h-2.5" />
                          <span>Eco-Friendly</span>
                        </span>
                      )}

                    </div>

                  </div>

                  {mode.available ? (

                    <div className="my-2 p-3 bg-[#F8F1E6] rounded-xl border border-[#EDE1D3] space-y-1.5">

                      <div className="flex items-center justify-between">

                        <span className="text-xs text-[#7A6A5D] font-medium">
                          Estimated Fare:
                        </span>

                        <span className="text-base font-extrabold text-[#3D2925]">
                          ₹{mode.estimatedCost}
                        </span>

                      </div>

                      <div className="flex items-center justify-between text-xs">

                        <span className="text-[#7A6A5D] font-medium flex items-center gap-1">

                          <Clock className="w-3.5 h-3.5 text-[#A99687]" />

                          <span>
                            Est. Travel Time:
                          </span>

                        </span>

                        <span className="font-bold text-[#A44A3F]">

                          {mode.durationMinutes >= 60
                            ? `${Math.floor(
                                mode.durationMinutes / 60
                              )}h ${
                                mode.durationMinutes % 60
                              }m`
                            : `${mode.durationMinutes} mins`}

                        </span>

                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#9A8B7E] pt-1 border-t border-[#E5D5C1]/60">

                        <span>
                          Speed: ~{mode.speedKmh} km/h
                        </span>

                        <span className="text-emerald-600 font-medium">
                          CO2: ~
                          {mode.co2Grams >= 1000
                            ? `${(
                                mode.co2Grams / 1000
                              ).toFixed(1)}kg`
                            : `${mode.co2Grams}g`}
                        </span>

                      </div>

                    </div>

                  ) : (

                    <div className="my-2 p-3 bg-[#F4E7D0]/70 rounded-xl border border-[#D8B98A] text-xs text-[#7A4A3A]">

                      <p className="font-semibold text-[11px] leading-relaxed">
                        {mode.unavailableNotice}
                      </p>

                    </div>

                  )}

                  <p className="text-xs text-[#6F6259] mb-4 leading-relaxed line-clamp-2">
                    {mode.bestFor}
                  </p>

                  {mode.available &&
                  mode.bookingUrl ? (

                    <a
                      href={mode.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-[#6B1E2B] hover:bg-[#54202A] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >

                      <span>
                        {mode.bookingLabel}
                      </span>

                      <ExternalLink className="w-3.5 h-3.5" />

                    </a>

                  ) : mode.available ? (

                    <div className="w-full py-2 bg-[#F4E7D0] text-[#6B1E2B] rounded-xl text-xs font-semibold flex items-center justify-center gap-1">
                      <span>
                        {mode.bookingLabel}
                      </span>
                    </div>

                  ) : (

                    <div className="w-full py-2 bg-[#E8DED2] text-[#A99687] rounded-xl text-xs font-medium text-center">
                      Not Available on this Route
                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F4E7D0]/60 border-t border-[#E5D5C1] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A6A5D]">

          <div className="flex items-center gap-1.5">

            <ShieldCheck className="w-4 h-4 text-emerald-600" />

            <span>
              Calculated using realistic regional fare slabs and verified speed indices.
            </span>

          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#6B1E2B] hover:bg-[#54202A] text-white rounded-xl font-bold text-xs transition-colors"
          >
            Done Planning
          </button>

        </div>

      </div>
    </div>
  );
}