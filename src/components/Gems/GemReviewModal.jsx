import { useState } from 'react';
import { X, Star, Sparkles, Send, ShieldCheck, User, Calendar, Image as ImageIcon } from 'lucide-react';

const TRAVELER_TYPES = ['Solo', 'Couple', 'Family', 'Friends'];

export default function GemReviewModal({ isOpen, onClose, gem, onSubmitReview }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [travelerType, setTravelerType] = useState('Solo');
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);
  const [comment, setComment] = useState('');
  const [isVerified, setIsVerified] = useState(true);

  if (!isOpen || !gem) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onSubmitReview(gem.id, {
      author: author.trim() || 'Verified Explorer',
      rating,
      comment: comment.trim(),
      travelerType,
      visitDate,
      verifiedTraveler: isVerified
    });

    setComment('');
    setAuthor('');
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Review & Rate This Secret
              </h3>
              <p className="text-xs text-slate-500 truncate max-w-xs">
                {gem.title} • {gem.city}
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
          
          {/* Star Rating Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Your Rating (1 to 5 Stars) *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        isFilled ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
              <span className="text-xs font-bold text-slate-600 ml-2">
                {rating === 5 ? 'Exceptional!' : rating === 4 ? 'Very Good' : rating === 3 ? 'Average' : 'Below Expectation'}
              </span>
            </div>
          </div>

          {/* Traveler Type */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Traveler Type *
            </label>
            <div className="grid grid-cols-4 gap-2">
              {TRAVELER_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTravelerType(type)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    travelerType === type
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Author Name & Visit Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Your Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Rohan Verma"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Date of Visit
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                />
              </div>
            </div>
          </div>

          {/* Review Comment */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Your Experience / Insider Tip *
            </label>
            <textarea
              rows={4}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What makes this spot special? Best time to arrive, parking advice, or specific photo angle..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>

          {/* Verified Traveler Checkbox */}
          <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <input
              type="checkbox"
              id="verifiedCheck"
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <label htmlFor="verifiedCheck" className="text-xs font-medium text-emerald-800 flex items-center gap-1 cursor-pointer">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>I personally visited this location and verify this tip</span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Publish Community Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
