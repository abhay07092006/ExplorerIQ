import { useState } from 'react';
import { X, Sparkles, Send, Upload } from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { handleImageError } from '../../utils/imageUtils';

const GEM_CATEGORIES = [
  'SECRET PHOTO ANGLE',
  'BUDGET STREET FOOD',
  'CULTURAL CUSTOM',
  'HIDDEN LANE',
  'OFFBEAT VIEWPOINT'
];

export default function AddGemModal({ isOpen, onClose, onGemAdded }) {
  const { addCommunityGem, currentCityId, destinations = [] } = useTravel();

  const [formData, setFormData] = useState({
    title: '',
    city: destinations.find((c) => c.id === currentCityId)?.name || 'Agra',
    category: GEM_CATEGORIES[0],
    authorName: '',
    rating: 5,
    description: '',
    imageUrl: ''
  });

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.description?.trim()) return;

    const newSecret = {
      id: Date.now().toString(),
      authorName: formData.authorName || "Anonymous Traveler",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      city: formData.city || "Agra",
      category: formData.category || "SECRET PHOTO ANGLE",
      rating: parseFloat(formData.rating) || 5.0,
      reviewsCount: 1,
      title: formData.title,
      description: formData.description,
      imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
      timeAgo: "Just now",
      likes: 1,
      userLiked: true,
      badgeColor: "bg-teal-500/10 text-teal-600 border-teal-200",
      author: formData.authorName || "Anonymous Traveler",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      image: formData.imageUrl || "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
      date: "Just now",
      averageRating: parseFloat(formData.rating) || 5.0,
      totalReviews: 1,
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: formData.authorName || "Anonymous Traveler",
          rating: parseFloat(formData.rating) || 5,
          comment: formData.description,
          visitDate: new Date().toISOString().split('T')[0],
          travelerType: "Solo",
          verifiedTraveler: true
        }
      ]
    };

    if (onGemAdded) {
      onGemAdded(newSecret);
    }

    if (addCommunityGem) {
      addCommunityGem(newSecret);
    }

    // Save to LocalStorage
    try {
      const savedGems = JSON.parse(localStorage.getItem('explorer_hidden_gems') || '[]');
      localStorage.setItem('explorer_hidden_gems', JSON.stringify([newSecret, ...savedGems]));
    } catch (_e) {}

    setFormData({
      title: '',
      city: 'Agra',
      category: GEM_CATEGORIES[0],
      authorName: '',
      rating: 5,
      description: '',
      imageUrl: ''
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-500/10 text-sky-600 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Share a Secret Local Gem
              </h3>
              <p className="text-xs text-slate-500">
                Help fellow travelers discover offbeat angles and budget eats
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Gem Title / Secret Name *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Hidden Rooftop View Behind Old Fort"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Destination City *
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                {destinations.length > 0 ? (
                  destinations.map((c) => (
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
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                {GEM_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Your Name / Handle
              </label>
              <input
                type="text"
                value={formData.authorName}
                onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
                placeholder="e.g. Maya S. or WanderingNomad"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Initial Rating *
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5.0 - Exceptional)</option>
                <option value={4.5}>⭐⭐⭐⭐½ (4.5 - Excellent)</option>
                <option value={4}>⭐⭐⭐⭐ (4.0 - Very Good)</option>
                <option value={3.5}>⭐⭐⭐½ (3.5 - Good)</option>
                <option value={3}>⭐⭐⭐ (3.0 - Average)</option>
              </select>
            </div>
          </div>

          {/* Photo Upload & URL */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Gem Photo (Upload File or Paste URL)
            </label>

            <div className="flex items-center gap-2">
              <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-xl bg-slate-50 hover:bg-sky-50/40 text-xs font-bold text-slate-700 transition-colors">
                <Upload className="w-4 h-4 text-sky-500" />
                <span>Upload Image File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="Or paste Image URL (https://...)"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />

            {formData.imageUrl && (
              <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 mt-2">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                  className="absolute top-2 right-2 px-2.5 py-1 bg-slate-900/80 hover:bg-slate-900 text-white text-[11px] font-bold rounded-xl flex items-center gap-1 backdrop-blur-xs transition-colors shadow-sm"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove Photo</span>
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Insider Tip Details & Exact Instructions *
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Where is it located? How much does it cost? Best time of day to visit?"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white text-xs font-bold rounded-xl shadow-md shadow-sky-500/20 flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Secret</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
