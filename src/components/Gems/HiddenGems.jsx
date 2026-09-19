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
  User,
  Calendar
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { gemsApi } from '../../services/gemsApi';
import AddGemModal from './AddGemModal';
import GemReviewModal from './GemReviewModal';
import { handleImageError, DEFAULT_AVATAR_FALLBACK } from '../../utils/imageUtils';

const CATEGORY_TAGS = [
  'All',
  'Secret Photo Angle',
  'Budget Street Food',
  'Cultural Custom',
  'Hidden Lane',
  'Offbeat Viewpoint'
];

export default function HiddenGems() {
  const { destinations = [] } = useTravel();
  const [gemsList, setGemsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Review modal state
  const [selectedGemForReview, setSelectedGemForReview] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  // Expanded reviews accordion state
  const [expandedReviews, setExpandedReviews] = useState({});

  // Fetch gems on mount or city filter change
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    gemsApi.getHiddenGems(cityFilter)
      .then((data) => {
        if (!isCancelled) {
          setGemsList(data || []);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Failed to load gems:', err);
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [cityFilter]);

  const handleLike = async (gemId) => {
    setGemsList((prev) =>
      prev.map((g) => {
        if (g.id === gemId) {
          return { ...g, likes: (g.likes || 0) + 1, userLiked: true };
        }
        return g;
      })
    );
    await gemsApi.likeGem(gemId);
  };

  const handleOpenReviewModal = (gem) => {
    setSelectedGemForReview(gem);
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = async (gemId, reviewPayload) => {
    const res = await gemsApi.addGemReview(gemId, reviewPayload);
    if (res?.gem) {
      setGemsList((prev) =>
        prev.map((g) => (g.id === gemId ? res.gem : g))
      );
      // Auto-expand reviews for this gem so user sees their new review
      setExpandedReviews((prev) => ({ ...prev, [gemId]: true }));
    }
  };

  const toggleExpandReviews = (gemId) => {
    setExpandedReviews((prev) => ({ ...prev, [gemId]: !prev[gemId] }));
  };

  const filteredGems = useMemo(() => {
    return gemsList.filter((gem) => {
      const matchesTag = selectedTag === 'All' || gem.category === selectedTag;
      const matchesCity = cityFilter === 'All' || gem.city.toLowerCase() === cityFilter.toLowerCase();
      const matchesSearch = search.trim() === '' ||
        gem.title.toLowerCase().includes(search.toLowerCase()) ||
        gem.description.toLowerCase().includes(search.toLowerCase()) ||
        gem.city.toLowerCase().includes(search.toLowerCase());

      return matchesTag && matchesCity && matchesSearch;
    });
  }, [gemsList, selectedTag, cityFilter, search]);

  return (
    <div className="w-full space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-bold mb-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Interactive Community Reviews & Verified Tips</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
          Community Reviews & Hidden Gems
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Locally sourced secrets, quiet sunrise angles, off-menu street delicacies, and verified traveler reviews with 1-5 star ratings.
        </p>
      </div>

      {/* Control Bar: Filter Pills, Search & Share Button */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm max-w-5xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search & City Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative min-w-[200px] w-full sm:w-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search secrets or food..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 w-full sm:w-auto">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-700 font-semibold focus:outline-none"
            >
              <option value="All">All Cities</option>
              {destinations.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CATEGORY_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Add Gem Trigger Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-500/20 transition-all flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Share a Secret</span>
        </button>
      </div>

      {/* Feed Cards Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGems.map((gem) => {
          const isReviewsExpanded = !!expandedReviews[gem.id];
          const reviewCount = gem.totalReviews || gem.reviews?.length || 1;
          const avgRating = gem.averageRating || 4.8;

          return (
            <div
              key={gem.id}
              className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Author & Date */}
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={gem.avatar}
                      alt={gem.author}
                      onError={(e) => handleImageError(e, DEFAULT_AVATAR_FALLBACK)}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">
                        {gem.author}
                      </h4>
                      <p className="text-[10px] text-slate-400">{gem.date}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-md text-[10px] font-bold">
                    {gem.city}
                  </span>
                </div>

                {/* Rating & Tag Row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${gem.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                    {gem.category}
                  </span>

                  {/* Interactive Star Rating Summary */}
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-amber-800 text-[11px] font-extrabold">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{avgRating}</span>
                    <span className="text-slate-400 font-normal">({reviewCount})</span>
                  </div>
                </div>

                {/* Gem Authentic Photo */}
                {gem.image && (
                  <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-3 border border-slate-100 bg-slate-100">
                    <img
                      src={gem.image}
                      alt={gem.title}
                      onError={handleImageError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Title & Description */}
                <h3 className="font-display font-bold text-sm text-slate-900 mb-2 leading-snug group-hover:text-sky-600 transition-colors">
                  {gem.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {gem.description}
                </p>

                {/* Expandable Reviews Accordion */}
                {gem.reviews && gem.reviews.length > 0 && (
                  <div className="border-t border-slate-100 pt-2.5 mb-3">
                    <button
                      onClick={() => toggleExpandReviews(gem.id)}
                      className="w-full flex items-center justify-between text-[11px] font-bold text-slate-600 hover:text-slate-900 py-1"
                    >
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
                        <span>Traveler Reviews ({gem.reviews.length})</span>
                      </span>
                      {isReviewsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isReviewsExpanded && (
                      <div className="mt-2 space-y-2 max-h-48 overflow-y-auto pr-1">
                        {gem.reviews.map((rev) => (
                          <div key={rev.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                                {rev.author}
                                {rev.verifiedTraveler && (
                                  <ShieldCheck className="w-3 h-3 text-emerald-500 inline" title="Verified Traveler" />
                                )}
                              </span>
                              <div className="flex items-center gap-0.5">
                                {[...Array(rev.rating || 5)].map((_, i) => (
                                  <Star key={i} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-600">{rev.comment}</p>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                              <span>Visited as {rev.travelerType || 'Solo'}</span>
                              <span>{rev.visitDate}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer Actions: Upvote & Write Review */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleLike(gem.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    gem.userLiked
                      ? 'bg-rose-50 text-rose-600'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${gem.userLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                  <span>{gem.likes}</span>
                </button>

                <button
                  onClick={() => handleOpenReviewModal(gem)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl text-xs font-bold transition-colors"
                >
                  <Star className="w-3 h-3 text-sky-600" />
                  <span>Rate & Review</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredGems.length === 0 && !isLoading && (
        <div className="py-16 text-center max-w-sm mx-auto">
          <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-sm">No tips match this filter</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try switching tags or be the first to share an insider secret!
          </p>
        </div>
      )}

      {/* Add Secret Tip Modal */}
      <AddGemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onGemAdded={(newGem) => setGemsList((prev) => [newGem, ...prev])}
      />

      {/* Review Modal */}
      <GemReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        gem={selectedGemForReview}
        onSubmitReview={handleSubmitReview}
      />

    </div>
  );
}
