import mongoose from 'mongoose';
import { CommunityGem } from '../models/CommunityGem.js';

let inMemoryGems = [
  {
    id: 'gem-1',
    city: 'Agra',
    title: 'Mehtab Bagh Secret Sunset Point',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    author: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    category: 'Secret Photo Angle',
    likes: 48,
    date: '3 days ago',
    description: 'Walk 100m past the official entrance towards the Yamuna riverbank at 5:30 PM for a crowd-free, glowing Taj reflection.',
    badgeColor: 'bg-teal-500/10 text-teal-600 border-teal-200',
    averageRating: 4.9,
    totalReviews: 3,
    reviews: [
      {
        id: 'rev-1',
        author: 'Priya Patel',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        comment: 'Unbelievable view! Far better than fighting the crowd inside the Taj grounds.',
        visitDate: '2026-09-10',
        travelerType: 'Couple',
        verifiedTraveler: true,
        createdAt: new Date('2026-09-12')
      },
      {
        id: 'rev-2',
        author: 'Rohan Mehra',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        comment: 'Golden hour here is magical. Bring a wide angle lens.',
        visitDate: '2026-09-05',
        travelerType: 'Solo',
        verifiedTraveler: true,
        createdAt: new Date('2026-09-08')
      }
    ]
  },
  {
    id: 'gem-2',
    city: 'Jaipur',
    title: 'Panna Meena Ka Kund Hidden Stepwell',
    image: 'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?auto=format&fit=crop&w=800&q=80',
    author: 'Sneha Verma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    category: 'Hidden Lane',
    likes: 35,
    date: '1 week ago',
    description: 'Near Amer Fort, this 16th-century stepwell is virtually tourist-free before 9 AM. Symmetrical zigzag steps are stunning.',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
    averageRating: 4.8,
    totalReviews: 2,
    reviews: [
      {
        id: 'rev-3',
        author: 'Ananya Roy',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        comment: 'Quiet, peaceful, and totally free to admire from the top parapet.',
        visitDate: '2026-09-01',
        travelerType: 'Friends',
        verifiedTraveler: true,
        createdAt: new Date('2026-09-03')
      }
    ]
  },
  {
    id: 'gem-3',
    city: 'Delhi',
    title: 'Agrasen Ki Baoli Midday Solitude',
    image: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=800&q=80',
    author: 'Vikram Joshi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    category: 'Offbeat Viewpoint',
    likes: 42,
    date: '4 days ago',
    description: 'Tucked between high-rise buildings near Connaught Place. 108 steps down into cooling medieval red sandstone.',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    averageRating: 4.7,
    totalReviews: 2,
    reviews: [
      {
        id: 'rev-4',
        author: 'Karan Singh',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        comment: 'A hidden oasis in the middle of Delhi traffic.',
        visitDate: '2026-09-14',
        travelerType: 'Solo',
        verifiedTraveler: true,
        createdAt: new Date('2026-09-15')
      }
    ]
  }
];

export const setInMemoryGems = (list) => {
  if (list && list.length > 0) inMemoryGems = list;
};

// GET /api/v1/gems?city=...
export const getCommunityGems = async (req, res) => {
  try {
    const { city } = req.query;
    let query = {};
    if (city && city !== 'All') {
      query.city = new RegExp(city, 'i');
    }

    let gems = [];
    if (mongoose.connection.readyState === 1) {
      try {
        gems = await CommunityGem.find(query).sort({ createdAt: -1 });
      } catch (_err) {
        gems = filterInMemory(city);
      }
    } else {
      gems = filterInMemory(city);
    }

    res.json({ success: true, count: gems.length, gems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const filterInMemory = (city) => {
  if (!city || city === 'All') return inMemoryGems;
  return inMemoryGems.filter(g => g.city.toLowerCase() === city.toLowerCase());
};

// POST /api/v1/gems
export const createCommunityGem = async (req, res) => {
  try {
    const gemData = {
      id: `gem-api-${Date.now()}`,
      city: req.body.city,
      title: req.body.title,
      image: req.body.image || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
      author: req.body.author || 'Fellow Explorer',
      avatar: req.body.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      category: req.body.category || 'Secret Photo Angle',
      description: req.body.description,
      likes: 1,
      date: 'Just now',
      badgeColor: 'bg-teal-500/10 text-teal-600 border-teal-200',
      averageRating: 5.0,
      totalReviews: 1,
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: req.body.author || 'Fellow Explorer',
          avatar: req.body.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
          rating: 5,
          comment: req.body.description,
          visitDate: new Date().toISOString().split('T')[0],
          travelerType: 'Solo',
          verifiedTraveler: true,
          createdAt: new Date()
        }
      ]
    };

    try {
      const created = await CommunityGem.create(gemData);
      return res.status(201).json({ success: true, gem: created });
    } catch (_err) {
      inMemoryGems.unshift(gemData);
      return res.status(201).json({ success: true, gem: gemData });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/gems/:id/reviews
export const addGemReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, avatar, rating, comment, visitDate, travelerType } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ success: false, message: 'Rating and comment are required.' });
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      author: author?.trim() || 'Verified Traveler',
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      rating: Math.min(5, Math.max(1, parseInt(rating, 10) || 5)),
      comment: comment.trim(),
      visitDate: visitDate || new Date().toISOString().split('T')[0],
      travelerType: travelerType || 'Solo',
      verifiedTraveler: true,
      createdAt: new Date()
    };

    // Try MongoDB
    if (mongoose.connection.readyState === 1) {
      try {
        const gem = await CommunityGem.findOne({ id });
        if (gem) {
          gem.reviews = gem.reviews || [];
          gem.reviews.unshift(newReview);
          const sumRatings = gem.reviews.reduce((acc, r) => acc + (r.rating || 5), 0);
          gem.totalReviews = gem.reviews.length;
          gem.averageRating = Number((sumRatings / gem.totalReviews).toFixed(1));
          await gem.save();
          return res.status(201).json({ success: true, review: newReview, gem });
        }
      } catch (_err) {}
    }

    // In-memory fallback
    const memGem = inMemoryGems.find(g => g.id === id);
    if (memGem) {
      memGem.reviews = memGem.reviews || [];
      memGem.reviews.unshift(newReview);
      const sumRatings = memGem.reviews.reduce((acc, r) => acc + (r.rating || 5), 0);
      memGem.totalReviews = memGem.reviews.length;
      memGem.averageRating = Number((sumRatings / memGem.totalReviews).toFixed(1));
      return res.status(201).json({ success: true, review: newReview, gem: memGem });
    }

    res.status(404).json({ success: false, message: 'Gem not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/gems/:id/like
export const likeCommunityGem = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      try {
        const gem = await CommunityGem.findOne({ id });
        if (gem) {
          gem.likes += 1;
          await gem.save();
          return res.json({ success: true, likes: gem.likes });
        }
      } catch (_err) {}
    }

    const memGem = inMemoryGems.find(g => g.id === id);
    if (memGem) {
      memGem.likes += 1;
      return res.json({ success: true, likes: memGem.likes });
    }

    res.status(404).json({ success: false, message: 'Gem not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
