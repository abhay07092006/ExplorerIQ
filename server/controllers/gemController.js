import mongoose from 'mongoose';
import { CommunityGem } from '../models/CommunityGem.js';

let inMemoryGems = [];

export const setInMemoryGems = (list) => {
  inMemoryGems = list;
};

export const getCommunityGems = async (req, res) => {
  try {
    let gems = [];
    if (mongoose.connection.readyState === 1) {
      try {
        gems = await CommunityGem.find({}).sort({ createdAt: -1 });
      } catch (_err) {
        gems = inMemoryGems;
      }
    } else {
      gems = inMemoryGems;
    }

    res.json({ success: true, count: gems.length, gems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCommunityGem = async (req, res) => {
  try {
    const gemData = {
      id: `gem-api-${Date.now()}`,
      city: req.body.city,
      title: req.body.title,
      image: req.body.image,
      author: req.body.author || 'Fellow Explorer',
      avatar: req.body.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      category: req.body.category || 'Secret Photo Angle',
      description: req.body.description,
      likes: 1,
      date: 'Just now',
      badgeColor: 'bg-teal-500/10 text-teal-600 border-teal-200'
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

export const likeCommunityGem = async (req, res) => {
  try {
    const { id } = req.params;
    let gem = null;
    try {
      gem = await CommunityGem.findOne({ id });
      if (gem) {
        gem.likes += 1;
        await gem.save();
        return res.json({ success: true, likes: gem.likes });
      }
    } catch (_err) {}

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
