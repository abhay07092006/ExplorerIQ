import { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Heart, 
  Plus, 
  Compass, 
  Search,
  MapPin
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { CITIES_DATA } from '../../data/travelData';
import AddGemModal from './AddGemModal';
import { handleImageError, DEFAULT_AVATAR_FALLBACK } from '../../utils/imageUtils';

const CATEGORY_TAGS = [
  'All',
  'Secret Photo Angle',
  'Budget Street Food',
  'Cultural Custom',
  'Hidden Lane'
];

export default function HiddenGems() {
  const { communityGems, likeGem } = useTravel();
  const [selectedTag, setSelectedTag] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredGems = useMemo(() => {
    return communityGems.filter((gem) => {
      const matchesTag = selectedTag === 'All' || gem.category === selectedTag;
      const matchesCity = cityFilter === 'All' || gem.city.toLowerCase() === cityFilter.toLowerCase();
      const matchesSearch = search.trim() === '' ||
        gem.title.toLowerCase().includes(search.toLowerCase()) ||
        gem.description.toLowerCase().includes(search.toLowerCase()) ||
        gem.city.toLowerCase().includes(search.toLowerCase());

      return matchesTag && matchesCity && matchesSearch;
    });
  }, [communityGems, selectedTag, cityFilter, search]);

  return (
    <div className="w-full space-y-6">
      
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-serif font-bold mb-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Crowdsourced Heritage Explorer Intelligence</span>
        </div>
        <h1 className="font-serif font-bold text-2xl sm:text-4xl text-[#E2D9CC] tracking-tight">
          Community Secrets & Hidden Gems
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans mt-2">
          Locally curated vantage points, quiet sunrise angles, off-menu street delicacies, and traditional customs from passionate travelers.
        </p>
      </div>

      {/* Control Bar: Filter Pills, Search & Share Button */}
      <div className="bg-[#121824] rounded-3xl border border-amber-500/30 p-4 sm:p-5 shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search & City Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative min-w-[200px] w-full sm:w-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search secrets or food..."
              className="w-full pl-10 pr-4 py-2 bg-[#1A2232] border border-amber-500/30 rounded-xl text-xs text-[#E2D9CC] placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#1A2232] border border-amber-500/30 rounded-xl px-2.5 py-1.5 w-full sm:w-auto">
            <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="bg-transparent text-xs text-amber-200 font-serif font-semibold focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#121824] text-white">All Cities</option>
              {CITIES_DATA.map((c) => (
                <option key={c.id} value={c.name} className="bg-[#121824] text-white">{c.name}</option>
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
              className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold'
                  : 'bg-[#1A2232] text-slate-400 border border-amber-500/20 hover:text-amber-300 hover:border-amber-500/40'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Add Gem Trigger Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-serif rounded-xl text-xs font-bold shadow-lg transition-all flex-shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Share a Secret</span>
        </button>
      </div>

      {/* Feed Cards Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGems.map((gem) => (
          <div
            key={gem.id}
            className="bg-[#121824] rounded-3xl border border-amber-500/20 p-5 shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Header: Author & Date */}
              <div className="flex items-center justify-between gap-3 mb-3.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src={gem.avatar}
                    alt={gem.author}
                    onError={(e) => handleImageError(e, DEFAULT_AVATAR_FALLBACK)}
                    className="w-9 h-9 rounded-full object-cover border border-amber-500/30"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#E2D9CC] leading-tight">
                      {gem.author}
                    </h4>
                    <p className="text-[10px] text-slate-400">{gem.date}</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-md text-[10px] font-serif font-bold">
                  {gem.city}
                </span>
              </div>

              {/* Tag Badge */}
              <div className="mb-2">
                <span className="text-[10px] font-serif font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-amber-500/20 bg-[#1A2232] text-amber-300">
                  {gem.category}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif font-bold text-sm text-[#E2D9CC] mb-2 leading-snug group-hover:text-amber-400 transition-colors">
                {gem.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {gem.description}
              </p>
            </div>

            {/* Footer Action: Upvote / Like */}
            <div className="mt-5 pt-3 border-t border-amber-500/15 flex items-center justify-between">
              <button
                onClick={() => likeGem(gem.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-colors cursor-pointer ${
                  gem.userLiked
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    : 'bg-[#1A2232] text-slate-300 hover:text-amber-300 border border-amber-500/20'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${gem.userLiked ? 'fill-rose-500 text-rose-400' : 'text-slate-400'}`} />
                <span>{gem.likes} Upvotes</span>
              </button>

              <span className="text-[10px] text-slate-400 font-serif">
                Verified Local Tip
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredGems.length === 0 && (
        <div className="py-16 text-center max-w-sm mx-auto">
          <Compass className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-[#E2D9CC] text-sm">No tips match this filter</h3>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Try switching tags or be the first to share an insider secret!
          </p>
        </div>
      )}

      {/* Add Secret Tip Modal */}
      <AddGemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

    </div>
  );
}
