import { Sparkles, ArrowRight } from 'lucide-react';
import { SAMPLE_MONUMENTS } from '../../data/monumentsData';
import { useTravel } from '../../context/useTravel';
import { handleImageError } from '../../utils/imageUtils';

export default function SampleGallery({ onSelectSample }) {
  const { scanImage } = useTravel();

  const handlePick = (sample) => {
    if (onSelectSample) {
      onSelectSample(sample);
    } else {
      scanImage(sample.image, sample.name, sample.id);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-sky-500/10 text-sky-600 rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-slate-900">
              Quick Test Gallery (1-Click Instant Scan)
            </h3>
            <p className="text-xs text-slate-500">
              Don't have a photo on hand? Select any verified monument benchmark below:
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SAMPLE_MONUMENTS.map((sample) => (
          <button
            key={sample.id}
            onClick={() => handlePick(sample)}
            className="group relative rounded-2xl overflow-hidden border border-slate-200 hover:border-sky-500 hover:shadow-lg transition-all duration-200 text-left bg-slate-50 flex flex-col"
          >
            <div className="relative h-28 w-full overflow-hidden">
              <img
                src={sample.image}
                alt={sample.name}
                onError={handleImageError}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-950/70 text-white backdrop-blur-xs">
                {sample.city}
              </span>
            </div>

            <div className="p-2.5 flex-1 flex flex-col justify-between">
              <div>
                <p className="font-bold text-xs text-slate-900 group-hover:text-sky-600 line-clamp-1 transition-colors">
                  {sample.name}
                </p>
                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {sample.tag}
                </p>
              </div>

              <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Scan Photo</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
