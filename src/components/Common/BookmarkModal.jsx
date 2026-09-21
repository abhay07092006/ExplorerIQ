import { X, Bookmark, Trash2, MapPin, ExternalLink, Compass } from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { handleImageError } from '../../utils/imageUtils';

export default function BookmarkModal({ isOpen, onClose }) {
  const { bookmarks, toggleBookmark, openPlaceDrawer, setActiveTab } = useTravel();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-600 rounded-xl border border-amber-200">
              <Bookmark className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">Saved Travel Highlights</h3>
              <p className="text-xs text-slate-500">{bookmarks.length} places saved for offline reference</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto divide-y divide-slate-100 flex-1">
          {bookmarks.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-14 h-14 mx-auto mb-3 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                <Compass className="w-7 h-7" />
              </div>
              <h4 className="font-semibold text-slate-800">No saved destinations yet</h4>
              <p className="text-sm text-slate-500 max-w-xs mx-auto mt-1">
                Click the bookmark icon on any monument, temple, or local eatery to save it here for quick access.
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
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-sky-500" />
                      <span>{item.city || item.state || 'Destination'}</span>
                      {item.category && (
                        <span className="capitalize px-1.5 py-0.5 bg-slate-100 rounded text-[10px] text-slate-600 font-medium">
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
                      if (item.category) {
                        openPlaceDrawer(item);
                        setActiveTab('explore');
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-sky-600 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => toggleBookmark(item)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
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
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
