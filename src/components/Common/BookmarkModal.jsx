import { X, Bookmark, Trash2, MapPin, ExternalLink, Compass } from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { handleImageError } from '../../utils/imageUtils';

export default function BookmarkModal({ isOpen, onClose }) {
  const { bookmarks, toggleBookmark, openPlaceDrawer, setActiveTab } = useTravel();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#121824] rounded-3xl shadow-2xl border border-amber-500/30 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-amber-500/20 flex items-center justify-between bg-[#0B0F14]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/15 text-amber-400 rounded-xl border border-amber-500/30">
              <Bookmark className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#E2D9CC]">Saved Heritage Highlights</h3>
              <p className="text-xs text-slate-400">{bookmarks.length} destinations saved for quick reference</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-[#1A2232] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto divide-y divide-amber-500/10 flex-1">
          {bookmarks.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-14 h-14 mx-auto mb-3 bg-[#1A2232] border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400">
                <Compass className="w-7 h-7" />
              </div>
              <h4 className="font-serif font-bold text-[#E2D9CC]">No saved heritage gems yet</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 font-sans">
                Click the bookmark icon on any monument, temple, or cultural landmark to save it here for instant access.
              </p>
            </div>
          ) : (
            bookmarks.map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image || item.heroImage || item.primaryImage}
                    alt={item.name}
                    onError={handleImageError}
                    className="w-14 h-14 rounded-xl object-cover border border-amber-500/30 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-[#E2D9CC] text-xs sm:text-sm truncate">{item.name}</h4>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{item.city || item.state || 'Destination'}</span>
                      {item.category && (
                        <span className="capitalize px-1.5 py-0.5 bg-[#1A2232] border border-amber-500/20 rounded text-[10px] text-amber-300 font-serif">
                          {item.category}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      if (item.category && openPlaceDrawer) {
                        openPlaceDrawer(item);
                        setActiveTab('explore');
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-serif font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => toggleBookmark(item)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-[#1A2232] rounded-lg transition-colors cursor-pointer"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0B0F14] border-t border-amber-500/20 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-serif font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
