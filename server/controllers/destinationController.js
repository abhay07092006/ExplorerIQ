import mongoose from 'mongoose';
import { Destination } from '../models/Destination.js';

let inMemoryDestinations = [];

export const setInMemoryDestinations = (list) => {
  inMemoryDestinations = list;
};

// Haversine distance formula in km
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const getDestinations = async (req, res) => {
  try {
    let destinations = [];
    if (mongoose.connection.readyState === 1) {
      try {
        destinations = await Destination.find({});
      } catch (_err) {
        destinations = inMemoryDestinations;
      }
    } else {
      destinations = inMemoryDestinations;
    }

    res.json({ success: true, count: destinations.length, destinations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;
    let destination = null;
    if (mongoose.connection.readyState === 1) {
      try {
        destination = await Destination.findOne({ id });
      } catch (_err) {
        destination = inMemoryDestinations.find(d => d.id === id);
      }
    } else {
      destination = inMemoryDestinations.find(d => d.id === id);
    }

    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.json({ success: true, destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNearbyEateries = async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    // const radius = parseFloat(req.query.radius) || 15; // default 15 km

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ success: false, message: 'Valid lat and lng query parameters required.' });
    }

    let allDestinations = [];
    if (mongoose.connection.readyState === 1) {
      try {
        allDestinations = await Destination.find({});
      } catch (_err) {
        allDestinations = inMemoryDestinations;
      }
    } else {
      allDestinations = inMemoryDestinations;
    }

    // Find nearest destination
    let nearestDest = null;
    let minDistance = Infinity;

    for (const d of allDestinations) {
      if (d.coordinates && d.coordinates.length === 2) {
        const dist = calculateDistance(lat, lng, d.coordinates[0], d.coordinates[1]);
        if (dist < minDistance) {
          minDistance = dist;
          nearestDest = d;
        }
      }
    }

    const eateries = [];
    if (nearestDest && nearestDest.localFoodSpecialties) {
      for (const food of nearestDest.localFoodSpecialties) {
        eateries.push({
          name: food.name,
          desc: food.desc,
          place: food.place,
          image: food.image,
          distance: `${(minDistance * 0.15 + 0.4).toFixed(1)} km`,
          city: nearestDest.name
        });
      }
    }

    res.json({
      success: true,
      city: nearestDest ? nearestDest.name : 'Surrounding Region',
      distanceFromCityCenter: `${minDistance.toFixed(1)} km`,
      count: eateries.length,
      eateries
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
