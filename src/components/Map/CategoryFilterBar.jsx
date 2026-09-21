import { 
  Sparkles, 
  Landmark, 
  Flame, 
  Image, 
  Utensils, 
  Trees, 
  Search
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { CATEGORY_FILTERS } from '../../constants/categories';

const ICON_MAP = {
  Sparkles,
  Landmark,
  Flame,
  Image,
  Utensils,
  Trees
};

export default function CategoryFilterBar() {
  const { 
    activeCategories, 
    toggleCategory, 
    searchQuery, 
    setSearchQuery,
    currentCity
  } = useTravel();

  // Calculate counts for current city
  const getCategoryCount = (categoryId) => {
    if (!currentCity || !currentCity.places) return 0;
    if (categoryId === 'all') return currentCity.places.length;
    return currentCity.places.filter((p) => p.category === categoryId).length;
  };

  const isAllActive = activeCategories.length === 5;

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
      {/* Search Input */}
      <div className="relative min-w-[240px] flex-shrink-0">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${currentCity?.name || 'spots'} (e.g. Taj, Biryani, Temple)...`}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
        {CATEGORY_FILTERS.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || Sparkles;
          const isAll = cat.id === 'all';
          const isActive = isAll ? isAllActive : activeCategories.includes(cat.id);
          const count = getCategoryCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.8 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
