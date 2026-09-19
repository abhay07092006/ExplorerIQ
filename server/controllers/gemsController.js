import mongoose from 'mongoose';
import { HiddenGem } from '../models/HiddenGem.js';

let inMemoryGems = [
  {
    _id: 'gem-1',
    id: 'gem-1',
    title: 'Mehtab Bagh Secret Sunset Point',
    location: 'Agra, Uttar Pradesh',
    city: 'Agra',
    category: 'Nature & Views',
    description: 'Walk 100m past the official entrance towards the Yamuna riverbank at 5:30 PM for a crowd-free, glowing Taj reflection.',
    rating: 5,
    userImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    upvotes: 48,
    likes: 48,
    submittedBy: 'Aarav Sharma',
    author: 'Aarav Sharma',
    badgeColor: 'bg-teal-500/10 text-teal-600 border-teal-200',
    createdAt: new Date('2026-09-10')
  },
  {
    _id: 'gem-2',
    id: 'gem-2',
    title: 'Panna Meena Ka Kund Hidden Stepwell',
    location: 'Jaipur, Rajasthan',
    city: 'Jaipur',
    category: 'Heritage & Architecture',
    description: 'Near Amer Fort, this 16th-century stepwell is virtually tourist-free before 9 AM. Symmetrical zigzag steps are stunning.',
    rating: 5,
    userImage: 'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?auto=format&fit=crop&w=800&q=80',
    image: 'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?auto=format&fit=crop&w=800&q=80',
    upvotes: 35,
    likes: 35,
    submittedBy: 'Sneha Verma',
    author: 'Sneha Verma',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
    createdAt: new Date('2026-09-08')
  },
  {
    _id: 'gem-3',
    id: 'gem-3',
    title: 'Agrasen Ki Baoli Midday Solitude',
    location: 'Connaught Place, Delhi',
    city: 'Delhi',
    category: 'Hidden Corridors',
    description: 'Tucked between high-rise buildings near Connaught Place. 108 steps down into cooling medieval red sandstone.',
    rating: 5,
    userImage: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=800&q=80',
    image: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=800&q=80',
    upvotes: 42,
    likes: 42,
    submittedBy: 'Vikram Joshi',
    author: 'Vikram Joshi',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    createdAt: new Date('2026-09-12')
  }
];

/**
 * GET /api/gems
 * Retrieve all hidden gems sorted by newest or highest upvotes
 */
export const getGems = async (req, res) => {
  try {
    const { city, sort = 'newest' } = req.query;
    let query = {};
    if (city && city !== 'All') {
      query.$or = [
        { city: new RegExp(city, 'i') },
        { location: new RegExp(city, 'i') }
      ];
    }

    const sortOption = sort === 'upvotes' || sort === 'likes' ? { upvotes: -1 } : { createdAt: -1 };

    let gems = [];
    if (mongoose.connection.readyState === 1) {
      try {
        gems = await HiddenGem.find(query).sort(sortOption).lean();
      } catch (_err) {
        gems = [];
      }
    }

    if (!gems || gems.length === 0) {
      gems = inMemoryGems;
      if (city && city !== 'All') {
        const cLow = city.toLowerCase();
        gems = gems.filter((g) => g.city?.toLowerCase().includes(cLow) || g.location?.toLowerCase().includes(cLow));
      }
      if (sort === 'upvotes' || sort === 'likes') {
        gems = [...gems].sort((a, b) => (b.upvotes || b.likes || 0) - (a.upvotes || a.likes || 0));
      } else {
        gems = [...gems].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    }

    return res.json({
      success: true,
      count: gems.length,
      gems
    });
  } catch (error) {
    console.error('[gemsController.getGems] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve hidden gems.',
      error: error.message
    });
  }
};

/**
 * POST /api/gems/create and POST /api/gems
 * Create a new community-submitted hidden gem
 */
export const createGem = async (req, res) => {
  try {
    const {
      title,
      location,
      city,
      category = 'General',
      description,
      rating = 5,
      userImage,
      image,
      submittedBy,
      author
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required.'
      });
    }

    const finalLocation = location || city || 'India';
    const finalCity = city || finalLocation.split(',')[0].trim();
    const finalImage = userImage || image || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80';
    const finalAuthor = submittedBy || author || 'Community Explorer';
    const numRating = Math.min(5, Math.max(1, parseInt(rating, 10) || 5));

    const gemData = {
      title: title.trim(),
      location: finalLocation.trim(),
      city: finalCity,
      category,
      description: description.trim(),
      rating: numRating,
      userImage: finalImage,
      image: finalImage,
      upvotes: 1,
      likes: 1,
      submittedBy: finalAuthor,
      author: finalAuthor,
      badgeColor: 'bg-teal-500/10 text-teal-600 border-teal-200',
      createdAt: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      try {
        const created = await HiddenGem.create(gemData);
        return res.status(201).json({
          success: true,
          message: 'Hidden gem published successfully!',
          gem: created
        });
      } catch (_err) {}
    }

    // Fallback to in-memory store
    const memGem = {
      _id: `gem-${Date.now()}`,
      id: `gem-${Date.now()}`,
      ...gemData
    };
    inMemoryGems.unshift(memGem);

    return res.status(201).json({
      success: true,
      message: 'Hidden gem published successfully (memory mode)!',
      gem: memGem
    });
  } catch (error) {
    console.error('[gemsController.createGem] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create hidden gem.',
      error: error.message
    });
  }
};

/**
 * POST /api/gems/:id/upvote and POST /api/gems/:id/like
 * Increment upvote count for a hidden gem
 */
export const upvoteGem = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      try {
        const gem = await HiddenGem.findOne({
          $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { id }]
        });
        if (gem) {
          gem.upvotes = (gem.upvotes || gem.likes || 0) + 1;
          gem.likes = gem.upvotes;
          await gem.save();
          return res.json({
            success: true,
            upvotes: gem.upvotes,
            likes: gem.likes
          });
        }
      } catch (_err) {}
    }

    // Fallback
    const memGem = inMemoryGems.find((g) => g._id === id || g.id === id);
    if (memGem) {
      memGem.upvotes = (memGem.upvotes || memGem.likes || 0) + 1;
      memGem.likes = memGem.upvotes;
      return res.json({
        success: true,
        upvotes: memGem.upvotes,
        likes: memGem.likes
      });
    }

    return res.status(404).json({
      success: false,
      message: 'Hidden gem not found.'
    });
  } catch (error) {
    console.error('[gemsController.upvoteGem] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upvote hidden gem.',
      error: error.message
    });
  }
};
