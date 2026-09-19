import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const GEMS_STORAGE_KEY = 'exploreriq_community_gems_offline_v2';

// Helper to read cached gems from localStorage
const getOfflineGems = () => {
  try {
    const saved = localStorage.getItem(GEMS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (_e) {
    return [];
  }
};

// Helper to save gems to localStorage
const setOfflineGems = (gems) => {
  try {
    localStorage.setItem(GEMS_STORAGE_KEY, JSON.stringify(gems));
  } catch (_e) {}
};

export const gemsApi = {
  /**
   * 1. getHiddenGems(city)
   * Fetches crowd-sourced heritage sites, lesser-known monuments, and street food stalls.
   */
  async getHiddenGems(city = 'All') {
    try {
      const response = await axios.get(`${API_BASE_URL}/gems`, {
        params: { city: city !== 'All' ? city : undefined },
        timeout: 5000
      });

      if (response.data && response.data.success && Array.isArray(response.data.gems)) {
        const liveGems = response.data.gems;
        // Merge with local offline gems
        const offline = getOfflineGems();
        const merged = [...liveGems];
        for (const off of offline) {
          if (!merged.some(g => g.id === off.id)) {
            merged.unshift(off);
          }
        }
        setOfflineGems(merged);
        return merged;
      }
      throw new Error('Invalid gems response format');
    } catch (err) {
      console.warn('[gemsApi.getHiddenGems] Backend request failed, using localStorage fallback:', err.message);
      const offline = getOfflineGems();
      if (offline.length > 0) {
        if (!city || city === 'All') return offline;
        return offline.filter(g => g.city.toLowerCase() === city.toLowerCase());
      }
      // Default fallback
      return [
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
              rating: 5,
              comment: 'Unbelievable view! Far better than fighting the crowd inside the Taj grounds.',
              visitDate: '2026-09-10',
              travelerType: 'Couple',
              verifiedTraveler: true
            }
          ]
        },
        {
          id: 'gem-2',
          city: 'Jaipur',
          title: 'Panna Meena Ka Kund Hidden Stepwell',
          image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
          imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
          author: 'Sneha Verma',
          authorName: 'Sneha Verma',
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
              rating: 5,
              comment: 'Quiet, peaceful, and totally free to admire from the top parapet.',
              visitDate: '2026-09-01',
              travelerType: 'Friends',
              verifiedTraveler: true
            }
          ]
        }
      ];
    }
  },

  /**
   * 2. submitHiddenGem(gemPayload)
   * Submits a new community spot with title, location, category, photos, and description.
   */
  async submitHiddenGem(gemPayload) {
    const newGem = {
      id: `gem-${Date.now()}`,
      city: gemPayload.city,
      title: gemPayload.title,
      image: gemPayload.image || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
      author: gemPayload.author || 'Fellow Explorer',
      avatar: gemPayload.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      category: gemPayload.category || 'Secret Photo Angle',
      description: gemPayload.description,
      likes: 1,
      date: 'Just now',
      badgeColor: 'bg-teal-500/10 text-teal-600 border-teal-200',
      averageRating: 5.0,
      totalReviews: 1,
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: gemPayload.author || 'Fellow Explorer',
          rating: 5,
          comment: gemPayload.description,
          visitDate: new Date().toISOString().split('T')[0],
          travelerType: 'Solo',
          verifiedTraveler: true
        }
      ]
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/gems`, newGem, { timeout: 5000 });
      if (response.data && response.data.gem) {
        // Save to offline storage as well
        const offline = getOfflineGems();
        setOfflineGems([response.data.gem, ...offline]);
        return response.data.gem;
      }
    } catch (err) {
      console.warn('[gemsApi.submitHiddenGem] Backend failed, saving to localStorage:', err.message);
    }

    // Save offline
    const offline = getOfflineGems();
    setOfflineGems([newGem, ...offline]);
    return newGem;
  },

  /**
   * 3. addGemReview(gemId, reviewPayload)
   * Submits user feedback (1-5 star rating, text review, visit date, traveler type)
   */
  async addGemReview(gemId, reviewPayload) {
    const newReview = {
      id: `rev-${Date.now()}`,
      author: reviewPayload.author || 'Verified Traveler',
      avatar: reviewPayload.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      rating: Math.min(5, Math.max(1, parseInt(reviewPayload.rating, 10) || 5)),
      comment: reviewPayload.comment,
      visitDate: reviewPayload.visitDate || new Date().toISOString().split('T')[0],
      travelerType: reviewPayload.travelerType || 'Solo',
      verifiedTraveler: true,
      createdAt: new Date()
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/gems/${gemId}/reviews`, newReview, { timeout: 5000 });
      if (response.data && response.data.gem) {
        // Update local storage
        const offline = getOfflineGems();
        const updated = offline.map(g => g.id === gemId ? response.data.gem : g);
        setOfflineGems(updated);
        return { success: true, gem: response.data.gem, review: response.data.review };
      }
    } catch (err) {
      console.warn('[gemsApi.addGemReview] Backend failed, updating localStorage:', err.message);
    }

    // Offline update in localStorage
    const offline = getOfflineGems();
    let updatedGem = null;
    const updated = offline.map(g => {
      if (g.id === gemId) {
        const revs = [newReview, ...(g.reviews || [])];
        const sum = revs.reduce((a, r) => a + (r.rating || 5), 0);
        const avg = Number((sum / revs.length).toFixed(1));
        updatedGem = {
          ...g,
          reviews: revs,
          totalReviews: revs.length,
          averageRating: avg
        };
        return updatedGem;
      }
      return g;
    });

    setOfflineGems(updated);
    return { success: true, gem: updatedGem, review: newReview };
  },

  /**
   * 4. likeGem(gemId)
   */
  async likeGem(gemId) {
    try {
      await axios.post(`${API_BASE_URL}/gems/${gemId}/like`, {}, { timeout: 4000 });
    } catch (e) {
      console.warn('[gemsApi.likeGem] Backend sync failed, updating local storage:', e.message);
    }
    const offline = getOfflineGems();
    const updated = offline.map(g => g.id === gemId ? { ...g, likes: (g.likes || 0) + 1, userLiked: true } : g);
    setOfflineGems(updated);
  }
};
