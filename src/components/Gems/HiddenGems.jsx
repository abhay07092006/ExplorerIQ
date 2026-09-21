import { useState, useMemo, useEffect } from 'react';

import {
  Sparkles,
  Heart,
  Plus,
  Compass,
  Search,
  MapPin,
  Star,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  X,
  Upload,
  Send,
  Trash2
} from 'lucide-react';

import { useTravel } from '../../context/useTravel';
import { DEFAULT_HIDDEN_GEMS } from '../../data/hiddenGemsData';
import GemReviewModal from './GemReviewModal';

import {
  handleImageError,
  DEFAULT_AVATAR_FALLBACK
} from '../../utils/imageUtils';

const CATEGORY_OPTIONS = [
  'SECRET PHOTO ANGLE',
  'BUDGET STREET FOOD',
  'CULTURAL CUSTOM',
  'HIDDEN LANE',
  'OFFBEAT VIEWPOINT'
];

const CATEGORY_TAGS = ['All', ...CATEGORY_OPTIONS];

export default function HiddenGems() {
  const { destinations = [] } = useTravel();

  const [secrets, setSecrets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Review modal state
  const [selectedGemForReview, setSelectedGemForReview] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Expanded reviews accordion state
  const [expandedReviews, setExpandedReviews] = useState({});

  // Form state for "Share a Secret" modal
  const [formData, setFormData] = useState({
    title: '',
    city: 'Agra',
    category: 'SECRET PHOTO ANGLE',
    authorName: '',
    rating: 5,
    description: '',
    imageUrl: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      city: 'Agra',
      category: 'SECRET PHOTO ANGLE',
      authorName: '',
      rating: 5,
      description: '',
      imageUrl: ''
    });
  };

  // Photo Upload Handler with FileReader Base64 conversion
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageUrl: reader.result
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  // Load pre-existing items merged with localStorage on component mount
  useEffect(() => {
    try {
      const savedGems = JSON.parse(
        localStorage.getItem('explorer_hidden_gems') || '[]'
      );

      const deletedIds = JSON.parse(
        localStorage.getItem('explorer_deleted_gems') || '[]'
      );

      // Clean saved gems that were marked as deleted
      const activeSaved = savedGems.filter(
        s => !deletedIds.includes(s.id)
      );

      // Build merged list
      const merged = [...activeSaved];

      for (const def of DEFAULT_HIDDEN_GEMS) {
        if (deletedIds.includes(def.id)) continue;

        const existingIdx = merged.findIndex(
          s =>
            s.id === def.id ||
            (s.title &&
              s.title.toLowerCase() === def.title.toLowerCase())
        );

        if (existingIdx >= 0) {
          // Sync with latest verified image, title, and city
          merged[existingIdx] = {
            ...merged[existingIdx],
            image: def.image,
            imageUrl: def.imageUrl,
            title: def.title,
            city: def.city,
            category: def.category
          };
        } else {
          merged.push(def);
        }
      }

      setSecrets(merged);

      localStorage.setItem(
        'explorer_hidden_gems',
        JSON.stringify(merged)
      );
    } catch (_err) {
      setSecrets(DEFAULT_HIDDEN_GEMS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Submit New Secret & Persist in LocalStorage
  const handleSubmitSecret = (e) => {
    e.preventDefault();

    if (
      !formData.title?.trim() ||
      !formData.description?.trim()
    ) {
      return;
    }

    const newSecret = {
      id: Date.now().toString(),

      authorName:
        formData.authorName || 'Anonymous Traveler',

      authorAvatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',

      city: formData.city || 'Agra',

      category:
        formData.category || 'SECRET PHOTO ANGLE',

      rating: parseFloat(formData.rating) || 5.0,

      reviewsCount: 1,

      title: formData.title,

      description: formData.description,

      imageUrl:
        formData.imageUrl ||
        'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',

      timeAgo: 'Just now',

      likes: 1,

      userLiked: true,

      badgeColor:
        'bg-[#D88924]/10 text-[#A44A3F] border-[#D8B98A]',

      // Backwards-compatible aliases
      author:
        formData.authorName || 'Anonymous Traveler',

      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',

      image:
        formData.imageUrl ||
        'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',

      date: 'Just now',

      averageRating: parseFloat(formData.rating) || 5.0,

      totalReviews: 1,

      reviews: [
        {
          id: `rev-${Date.now()}`,

          author:
            formData.authorName || 'Anonymous Traveler',

          rating: parseFloat(formData.rating) || 5,

          comment: formData.description,

          visitDate: new Date()
            .toISOString()
            .split('T')[0],

          travelerType: 'Solo',

          verifiedTraveler: true
        }
      ]
    };

    // Update active React state
    setSecrets(prev => [newSecret, ...prev]);

    // Save to LocalStorage
    const savedGems = JSON.parse(
      localStorage.getItem('explorer_hidden_gems') || '[]'
    );

    localStorage.setItem(
      'explorer_hidden_gems',
      JSON.stringify([newSecret, ...savedGems])
    );

    // Close modal & reset form
    setIsModalOpen(false);
    resetForm();
  };

  // Delete Gem Option
  const handleDeleteGem = (gemId, e) => {
    if (e) e.stopPropagation();

    if (
      !window.confirm(
        'Are you sure you want to delete this secret from the community feed?'
      )
    ) {
      return;
    }

    // Update React state
    setSecrets(prev =>
      prev.filter(g => g.id !== gemId)
    );

    // Remove from saved localStorage gems
    try {
      const savedGems = JSON.parse(
        localStorage.getItem('explorer_hidden_gems') || '[]'
      );

      const updated = savedGems.filter(
        g => g.id !== gemId
      );

      localStorage.setItem(
        'explorer_hidden_gems',
        JSON.stringify(updated)
      );

      // Track deleted IDs so default items don't re-appear
      const deletedIds = JSON.parse(
        localStorage.getItem('explorer_deleted_gems') || '[]'
      );

      if (!deletedIds.includes(gemId)) {
        localStorage.setItem(
          'explorer_deleted_gems',
          JSON.stringify([...deletedIds, gemId])
        );
      }
    } catch (_e) {}
  };

  // Delete Individual Review Option
  const handleDeleteReview = (gemId, reviewId) => {
    setSecrets(prev => {
      const updated = prev.map(g => {
        if (g.id === gemId) {
          const newReviews = (g.reviews || []).filter(
            r => r.id !== reviewId
          );

          const newTotal = newReviews.length;

          const newAvg =
            newTotal > 0
              ? parseFloat(
                  (
                    newReviews.reduce(
                      (sum, r) =>
                        sum + (r.rating || 5),
                      0
                    ) / newTotal
                  ).toFixed(1)
                )
              : 5.0;

          return {
            ...g,
            reviews: newReviews,
            totalReviews: newTotal,
            reviewsCount: newTotal,
            averageRating: newAvg,
            rating: newAvg
          };
        }

        return g;
      });

      // Sync to localStorage
      try {
        const savedGems = JSON.parse(
          localStorage.getItem('explorer_hidden_gems') || '[]'
        );

        const updatedSaved = savedGems.map(s => {
          if (s.id === gemId) {
            const newReviews = (s.reviews || []).filter(
              r => r.id !== reviewId
            );

            const newTotal = newReviews.length;

            const newAvg =
              newTotal > 0
                ? parseFloat(
                    (
                      newReviews.reduce(
                        (sum, r) =>
                          sum + (r.rating || 5),
                        0
                      ) / newTotal
                    ).toFixed(1)
                  )
                : 5.0;

            return {
              ...s,
              reviews: newReviews,
              totalReviews: newTotal,
              reviewsCount: newTotal,
              averageRating: newAvg,
              rating: newAvg
            };
          }

          return s;
        });

        localStorage.setItem(
          'explorer_hidden_gems',
          JSON.stringify(updatedSaved)
        );
      } catch (_e) {}

      return updated;
    });
  };

  // Upvote / Like Handler with LocalStorage Persistence
  const handleLike = (gemId) => {
    setSecrets(prev => {
      const updated = prev.map(g => {
        if (g.id === gemId) {
          const isLiked = g.userLiked;

          return {
            ...g,
            likes: isLiked
              ? Math.max(0, (g.likes || 0) - 1)
              : (g.likes || 0) + 1,
            userLiked: !isLiked
          };
        }

        return g;
      });

      // Update in LocalStorage
      try {
        const savedGems = JSON.parse(
          localStorage.getItem('explorer_hidden_gems') || '[]'
        );

        const updatedSaved = savedGems.map(s => {
          if (s.id === gemId) {
            const isLiked = s.userLiked;

            return {
              ...s,
              likes: isLiked
                ? Math.max(0, (s.likes || 0) - 1)
                : (s.likes || 0) + 1,
              userLiked: !isLiked
            };
          }

          return s;
        });

        localStorage.setItem(
          'explorer_hidden_gems',
          JSON.stringify(updatedSaved)
        );
      } catch (_e) {}

      return updated;
    });
  };

  const handleOpenReviewModal = (gem) => {
    setSelectedGemForReview(gem);
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = (gemId, reviewPayload) => {
    setSecrets(prev => {
      const updated = prev.map(g => {
        if (g.id === gemId) {
          const existingReviews = g.reviews || [];

          const newReviews = [
            {
              id: `rev-${Date.now()}`,
              ...reviewPayload
            },
            ...existingReviews
          ];

          const newTotal = newReviews.length;

          const sumRating = newReviews.reduce(
            (sum, r) => sum + (r.rating || 5),
            0
          );

          const newAvg = parseFloat(
            (sumRating / newTotal).toFixed(1)
          );

          return {
            ...g,
            reviews: newReviews,
            totalReviews: newTotal,
            reviewsCount: newTotal,
            averageRating: newAvg,
            rating: newAvg
          };
        }

        return g;
      });

      // Persist in LocalStorage
      try {
        const savedGems = JSON.parse(
          localStorage.getItem('explorer_hidden_gems') || '[]'
        );

        const updatedSaved = savedGems.map(s => {
          if (s.id === gemId) {
            const existingReviews = s.reviews || [];

            const newReviews = [
              {
                id: `rev-${Date.now()}`,
                ...reviewPayload
              },
              ...existingReviews
            ];

            const newTotal = newReviews.length;

            const sumRating = newReviews.reduce(
              (sum, r) => sum + (r.rating || 5),
              0
            );

            const newAvg = parseFloat(
              (sumRating / newTotal).toFixed(1)
            );

            return {
              ...s,
              reviews: newReviews,
              totalReviews: newTotal,
              reviewsCount: newTotal,
              averageRating: newAvg,
              rating: newAvg
            };
          }

          return s;
        });

        localStorage.setItem(
          'explorer_hidden_gems',
          JSON.stringify(updatedSaved)
        );
      } catch (_e) {}

      return updated;
    });

    setExpandedReviews(prev => ({
      ...prev,
      [gemId]: true
    }));
  };

  const toggleExpandReviews = (gemId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [gemId]: !prev[gemId]
    }));
  };

  const filteredGems = useMemo(() => {
    return secrets.filter(gem => {
      const gemCategory = (
        gem.category || ''
      ).toUpperCase();

      const matchesTag =
        selectedTag === 'All' ||
        gemCategory === selectedTag.toUpperCase();

      const matchesCity =
        cityFilter === 'All' ||
        (gem.city || '').toLowerCase() ===
          cityFilter.toLowerCase();

      const q = search.trim().toLowerCase();

      const matchesSearch =
        q === '' ||
        (gem.title || '').toLowerCase().includes(q) ||
        (gem.description || '')
          .toLowerCase()
          .includes(q) ||
        (gem.city || '').toLowerCase().includes(q) ||
        (gem.category || '')
          .toLowerCase()
          .includes(q);

      return (
        matchesTag &&
        matchesCity &&
        matchesSearch
      );
    });
  }, [secrets, selectedTag, cityFilter, search]);

  return (
    <div className="w-full space-y-6 max-w-7xl mx-auto">

      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9972B]/10 border border-[#C9972B]/30 text-[#6B1E2B] text-xs font-bold mb-2">
          <Sparkles className="w-4 h-4 text-[#C9972B]" />

          <span>
            Interactive Community Reviews & Verified Tips
          </span>
        </div>

        <h1 className="font-display font-black text-2xl sm:text-4xl text-[#3D2925] tracking-tight">
          Community Reviews & Hidden Gems
        </h1>

        <p className="text-sm text-[#7A4A3A] mt-2">
          Locally sourced secrets, quiet sunrise angles,
          off-menu street delicacies, and verified traveler
          reviews with 1-5 star ratings.
        </p>
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-3xl border border-[#E5D5C1] p-4 sm:p-5 shadow-sm max-w-5xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">

        {/* Search & City Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-2">

          <div className="relative min-w-[200px] w-full sm:w-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A44A3F]" />

            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search secrets or food..."
              className="w-full pl-10 pr-4 py-2 bg-[#FFF8E7] border border-[#E5D5C1] rounded-xl text-xs text-[#3D2925] focus:outline-none focus:ring-2 focus:ring-[#D88924]/40"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#FFF8E7] border border-[#E5D5C1] rounded-xl px-2.5 py-1.5 w-full sm:w-auto">
            <MapPin className="w-3.5 h-3.5 text-[#A44A3F] flex-shrink-0" />

            <select
              value={cityFilter}
              onChange={e => setCityFilter(e.target.value)}
              className="bg-transparent text-xs text-[#7A4A3A] font-semibold focus:outline-none"
            >
              <option value="All">All Cities</option>

              {destinations.length > 0 ? (
                destinations.map(c => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))
              ) : (
                <>
                  <option value="Agra">Agra</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Varanasi">Varanasi</option>
                  <option value="Kochi">Kochi</option>
                  <option value="Hampi">Hampi</option>
                  <option value="Amritsar">Amritsar</option>
                  <option value="Udaipur">Udaipur</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CATEGORY_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-[#6B1E2B] text-white shadow-sm'
                  : 'bg-[#FFF8E7] text-[#7A4A3A] border border-[#E5D5C1] hover:bg-[#F4E7D0]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Add Gem Trigger Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#D88924] to-[#6B1E2B] hover:from-[#C2761D] hover:to-[#54202A] text-white rounded-xl text-xs font-bold shadow-md shadow-[#D88924]/20 transition-all flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Share a Secret</span>
        </button>
      </div>

      {/* Feed Cards Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {filteredGems.map(gem => {
          const isReviewsExpanded =
            !!expandedReviews[gem.id];

          const reviewCount =
            gem.reviewsCount ||
            gem.totalReviews ||
            (gem.reviews?.length || 1);

          const avgRating =
            gem.rating ||
            gem.averageRating ||
            5.0;

          const displayAuthor =
            gem.authorName ||
            gem.author ||
            'Anonymous Traveler';

          const displayAvatar =
            gem.authorAvatar ||
            gem.avatar ||
            DEFAULT_AVATAR_FALLBACK;

          const displayImage =
            gem.imageUrl || gem.image;

          const displayDate =
            gem.timeAgo ||
            gem.date ||
            'Recently';

          return (
            <div
              key={gem.id}
              className="bg-white rounded-3xl border border-[#E5D5C1] p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative"
            >
              <div>

                {/* Header: Author & Date */}
                <div className="flex items-center justify-between gap-3 mb-3.5">

                  <div className="flex items-center gap-2.5">
                    <img
                      src={displayAvatar}
                      alt={displayAuthor}
                      onError={e =>
                        handleImageError(
                          e,
                          DEFAULT_AVATAR_FALLBACK
                        )
                      }
                      className="w-9 h-9 rounded-full object-cover border border-[#E5D5C1] flex-shrink-0"
                    />

                    <div>
                      <h4 className="font-bold text-xs text-[#3D2925] leading-tight">
                        {displayAuthor}
                      </h4>

                      <p className="text-[10px] text-[#9A7B68]">
                        {displayDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 bg-[#F4E7D0] text-[#6B1E2B] border border-[#D8B98A] rounded-md text-[10px] font-bold">
                      {gem.city}
                    </span>

                    <button
                      onClick={e =>
                        handleDeleteGem(gem.id, e)
                      }
                      className="p-1 text-[#9A7B68] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Secret"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Rating & Tag Row */}
                <div className="flex items-center justify-between gap-2 mb-2">

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                      gem.badgeColor ||
                      'bg-[#F4E7D0] text-[#6B1E2B] border-[#D8B98A]'
                    }`}
                  >
                    {gem.category}
                  </span>

                  {/* Interactive Star Rating Summary */}
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-amber-800 text-[11px] font-extrabold">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />

                    <span>{avgRating}</span>

                    <span className="text-[#9A7B68] font-normal">
                      ({reviewCount})
                    </span>
                  </div>
                </div>

                {/* Gem Authentic Photo */}
                {displayImage && (
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-3 border border-[#E5D5C1] bg-[#F4E7D0]">
                    <img
                      src={displayImage}
                      alt={gem.title}
                      onError={handleImageError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Title & Description */}
                <h3 className="font-display font-bold text-sm text-[#3D2925] mb-2 leading-snug group-hover:text-[#A44A3F] transition-colors">
                  {gem.title}
                </h3>

                <p className="text-xs text-[#7A4A3A] leading-relaxed mb-3">
                  {gem.description}
                </p>

                {/* Expandable Reviews Accordion */}
                {gem.reviews &&
                  gem.reviews.length > 0 && (
                    <div className="border-t border-[#E8DCCB] pt-2.5 mb-3">

                      <button
                        onClick={() =>
                          toggleExpandReviews(gem.id)
                        }
                        className="w-full flex items-center justify-between text-[11px] font-bold text-[#7A4A3A] hover:text-[#3D2925] py-1"
                      >
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-[#C9972B]" />

                          <span>
                            Traveler Reviews (
                            {gem.reviews.length})
                          </span>
                        </span>

                        {isReviewsExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {isReviewsExpanded && (
                        <div className="mt-2 space-y-2 max-h-48 overflow-y-auto pr-1">
                          {gem.reviews.map(rev => (
                            <div
                              key={rev.id}
                              className="p-2.5 bg-[#FFF8E7] border border-[#E8DCCB] rounded-xl text-xs space-y-1 relative group/rev"
                            >
                              <div className="flex items-center justify-between">

                                <span className="font-bold text-[#3D2925] text-[11px] flex items-center gap-1">
                                  {rev.author}

                                  {rev.verifiedTraveler && (
                                    <ShieldCheck
                                      className="w-3 h-3 text-emerald-500 inline"
                                      title="Verified Traveler"
                                    />
                                  )}
                                </span>

                                <div className="flex items-center gap-2">

                                  <div className="flex items-center gap-0.5">
                                    {[...Array(
                                      rev.rating || 5
                                    )].map((_, i) => (
                                      <Star
                                        key={i}
                                        className="w-2.5 h-2.5 text-amber-400 fill-amber-400"
                                      />
                                    ))}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeleteReview(
                                        gem.id,
                                        rev.id
                                      )
                                    }
                                    className="text-[#9A7B68] hover:text-rose-600 p-0.5 rounded transition-colors"
                                    title="Delete this review"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>

                              <p className="text-[11px] text-[#7A4A3A]">
                                {rev.comment}
                              </p>

                              <div className="flex items-center justify-between text-[10px] text-[#9A7B68] pt-0.5">
                                <span>
                                  Visited as{' '}
                                  {rev.travelerType ||
                                    'Solo'}
                                </span>

                                <span>
                                  {rev.visitDate}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-[#E8DCCB] flex items-center justify-between gap-2">

                <button
                  onClick={() => handleLike(gem.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    gem.userLiked
                      ? 'bg-rose-50 text-rose-600'
                      : 'bg-[#FFF8E7] text-[#7A4A3A] hover:bg-[#F4E7D0]'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      gem.userLiked
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-[#9A7B68]'
                    }`}
                  />

                  <span>{gem.likes || 0}</span>
                </button>

                <div className="flex items-center gap-1.5">

                  <button
                    onClick={() =>
                      handleOpenReviewModal(gem)
                    }
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#F4E7D0] hover:bg-[#E8D2AE] text-[#6B1E2B] rounded-xl text-xs font-bold transition-colors"
                  >
                    <Star className="w-3 h-3 text-[#C9972B]" />

                    <span>Rate & Review</span>
                  </button>

                  <button
                    onClick={e =>
                      handleDeleteGem(gem.id, e)
                    }
                    className="flex items-center gap-1 px-2.5 py-1.5 text-[#9A7B68] hover:text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-colors"
                    title="Delete this secret"
                  >
                    <Trash2 className="w-3.5 h-3.5" />

                    <span className="hidden sm:inline">
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredGems.length === 0 && !isLoading && (
        <div className="py-16 text-center max-w-sm mx-auto">

          <Compass className="w-12 h-12 text-[#D8B98A] mx-auto mb-3" />

          <h3 className="font-bold text-[#3D2925] text-sm">
            No tips match this filter
          </h3>

          <p className="text-xs text-[#8A6A58] mt-1">
            Try switching tags or be the first to share
            an insider secret!
          </p>
        </div>
      )}

      {/* Share a Secret Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E5D5C1] overflow-hidden flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="p-6 border-b border-[#E8DCCB] flex items-center justify-between bg-[#FFF8E7]">

              <div className="flex items-center gap-2.5">

                <div className="p-2 bg-[#D88924]/10 text-[#A44A3F] rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-[#3D2925]">
                    Share a Secret Local Gem
                  </h3>

                  <p className="text-xs text-[#8A6A58]">
                    Help fellow travelers discover
                    offbeat angles, photo spots, and
                    budget eats
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="p-2 rounded-xl text-[#9A7B68] hover:text-[#6B1E2B] hover:bg-[#F4E7D0] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form
              onSubmit={handleSubmitSecret}
              className="p-6 overflow-y-auto space-y-4 flex-1"
            >

              {/* Title */}
              <div>
                <label className="text-xs font-bold text-[#6B1E2B] block mb-1">
                  Gem Title / Secret Name *
                </label>

                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      title: e.target.value
                    }))
                  }
                  placeholder="e.g. Mehtab Bagh Secret Sunset Point"
                  className="w-full px-3.5 py-2.5 bg-[#FFF8E7] border border-[#E5D5C1] rounded-xl text-xs text-[#3D2925] focus:outline-none focus:ring-2 focus:ring-[#D88924]/40"
                />
              </div>

              {/* City & Category */}
              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label className="text-xs font-bold text-[#6B1E2B] block mb-1">
                    Destination City *
                  </label>

                  <select
                    value={formData.city}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        city: e.target.value
                      }))
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FFF8E7] border border-[#E5D5C1] rounded-xl text-xs text-[#3D2925] focus:outline-none focus:ring-2 focus:ring-[#D88924]/40"
                  >
                    {destinations.length > 0 ? (
                      destinations.map(c => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Agra">Agra</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Varanasi">Varanasi</option>
                        <option value="Kochi">Kochi</option>
                        <option value="Hampi">Hampi</option>
                        <option value="Amritsar">Amritsar</option>
                        <option value="Udaipur">Udaipur</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#6B1E2B] block mb-1">
                    Category *
                  </label>

                  <select
                    value={formData.category}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        category: e.target.value
                      }))
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FFF8E7] border border-[#E5D5C1] rounded-xl text-xs text-[#3D2925] focus:outline-none focus:ring-2 focus:ring-[#D88924]/40"
                  >
                    {CATEGORY_OPTIONS.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Author & Rating */}
              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label className="text-xs font-bold text-[#6B1E2B] block mb-1">
                    Your Name / Handle
                  </label>

                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        authorName: e.target.value
                      }))
                    }
                    placeholder="e.g. Maya S. or WanderingNomad"
                    className="w-full px-3.5 py-2.5 bg-[#FFF8E7] border border-[#E5D5C1] rounded-xl text-xs text-[#3D2925] focus:outline-none focus:ring-2 focus:ring-[#D88924]/40"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#6B1E2B] block mb-1">
                    Initial Rating *
                  </label>

                  <select
                    value={formData.rating}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        rating: parseFloat(
                          e.target.value
                        )
                      }))
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FFF8E7] border border-[#E5D5C1] rounded-xl text-xs text-[#3D2925] focus:outline-none focus:ring-2 focus:ring-[#D88924]/40"
                  >
                    <option value={5}>
                      ⭐⭐⭐⭐⭐ (5.0 - Exceptional)
                    </option>

                    <option value={4.5}>
                      ⭐⭐⭐⭐½ (4.5 - Excellent)
                    </option>

                    <option value={4}>
                      ⭐⭐⭐⭐ (4.0 - Very Good)
                    </option>

                    <option value={3.5}>
                      ⭐⭐⭐½ (3.5 - Good)
                    </option>

                    <option value={3}>
                      ⭐⭐⭐ (3.0 - Average)
                    </option>
                  </select>
                </div>
              </div>

              {/* Photo Upload & Image URL */}
              <div className="space-y-2">

                <label className="text-xs font-bold text-[#6B1E2B] block">
                  Gem Photo (Upload File or Paste URL)
                </label>

                {/* File Upload Input */}
                <div className="flex items-center gap-2">

                  <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-[#D8B98A] hover:border-[#D88924] rounded-xl bg-[#FFF8E7] hover:bg-[#F4E7D0] text-xs font-bold text-[#6B1E2B] transition-colors">

                    <Upload className="w-4 h-4 text-[#D88924]" />

                    <span>Upload Image File</span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Optional Image URL */}
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      imageUrl: e.target.value
                    }))
                  }
                  placeholder="Or paste Image URL (https://...)"
                  className="w-full px-3.5 py-2 bg-[#FFF8E7] border border-[#E5D5C1] rounded-xl text-xs text-[#3D2925] focus:outline-none focus:ring-2 focus:ring-[#D88924]/40"
                />

                {/* Instant Image Preview */}
                {formData.imageUrl && (
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-[#E5D5C1] bg-[#F4E7D0] mt-2">

                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      onError={handleImageError}
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setFormData(prev => ({
                          ...prev,
                          imageUrl: ''
                        }))
                      }
                      className="absolute top-2 right-2 px-2.5 py-1 bg-slate-900/80 hover:bg-slate-900 text-white text-[11px] font-bold rounded-xl flex items-center gap-1 backdrop-blur-xs transition-colors shadow-sm"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Remove Photo</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-[#6B1E2B] block mb-1">
                  Insider Tip Details & Exact Instructions *
                </label>

                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      description: e.target.value
                    }))
                  }
                  placeholder="Where is it located? How much does it cost? Best time of day to visit?"
                  className="w-full px-3.5 py-2.5 bg-[#FFF8E7] border border-[#E5D5C1] rounded-xl text-xs text-[#3D2925] focus:outline-none focus:ring-2 focus:ring-[#D88924]/40"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E8DCCB]">

                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-[#7A4A3A] hover:bg-[#F4E7D0] rounded-xl transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-[#D88924] to-[#6B1E2B] hover:from-[#C2761D] hover:to-[#54202A] text-white text-xs font-bold rounded-xl shadow-md shadow-[#D88924]/20 flex items-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Secret</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review & Rating Modal */}
      <GemReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        gem={selectedGemForReview}
        onSubmitReview={handleSubmitReview}
      />
    </div>
  );
}