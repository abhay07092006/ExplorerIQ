import { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { CITIES_DATA } from '../../data/travelData';

const GEM_CATEGORIES = [
  'Secret Photo Angle',
  'Budget Street Food',
  'Cultural Custom',
  'Hidden Lane',
  'Offbeat Viewpoint'
];

export default function AddGemModal({ isOpen, onClose }) {
  const { addCommunityGem, currentCityId } = useTravel();

  const [title, setTitle] = useState('');
  const [city, setCity] = useState(
    CITIES_DATA.find((c) => c.id === currentCityId)?.name || 'Agra'
  );
  const [category, setCategory] = useState(GEM_CATEGORIES[0]);
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addCommunityGem({
      title: title.trim(),
      city,
      category,
      author: author.trim() || 'Local Travel Explorer',
      description: description.trim()
    });

    setTitle('');
    setDescription('');
    setAuthor('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-lg bg-[#121824] rounded-3xl shadow-2xl border border-amber-500/30 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-amber-500/20 flex items-center justify-between bg-[#0B0F14]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/15 text-amber-400 rounded-xl border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#E2D9CC]">
                Share a Secret Heritage Gem
              </h3>
              <p className="text-xs text-slate-400">
                Help fellow travelers discover offbeat angles and authentic budget eats
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-[#1A2232] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-serif font-bold text-amber-300 block mb-1">
              Gem Title / Secret Name *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Hidden Rooftop View Behind Agra Fort"
              className="w-full px-3.5 py-2.5 bg-[#1A2232] border border-amber-500/30 rounded-xl text-xs text-[#E2D9CC] placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-serif font-bold text-amber-300 block mb-1">
                Destination City *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#1A2232] border border-amber-500/30 rounded-xl text-xs text-[#E2D9CC] focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {CITIES_DATA.map((c) => (
                  <option key={c.id} value={c.name} className="bg-[#121824] text-white">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-serif font-bold text-amber-300 block mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#1A2232] border border-amber-500/30 rounded-xl text-xs text-[#E2D9CC] focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {GEM_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#121824] text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-serif font-bold text-amber-300 block mb-1">
              Your Name / Handle
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Maya S. or WanderingExplorer"
              className="w-full px-3.5 py-2.5 bg-[#1A2232] border border-amber-500/30 rounded-xl text-xs text-[#E2D9CC] placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-xs font-serif font-bold text-amber-300 block mb-1">
              Insider Tip Details & Exact Instructions *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Where is it located? How much does it cost? Best time of day to visit?"
              className="w-full px-3.5 py-2.5 bg-[#1A2232] border border-amber-500/30 rounded-xl text-xs text-[#E2D9CC] placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#1A2232] text-slate-300 hover:text-white rounded-xl text-xs font-serif transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-serif font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Gem</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
