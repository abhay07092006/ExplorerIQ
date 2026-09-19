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
    <div className="w-full bg-[#121824] rounded-3xl p-5 sm:p-7 border border-amber-500/20 shadow-xl">
      <div className="flex items-center justify-between mb-5 border-b border-amber-500/15 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500/15 text-amber-400 rounded-xl border border-amber-500/25">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-sand-100">
              Try with a Sample Benchmark (Instant Vision Analysis)
            </h3>
            <p className="text-xs text-sand-400 font-sans">
              Don't have a photo on hand? Select any verified imperial landmark benchmark below:
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SAMPLE_MONUMENTS.map((sample) => (
          <button
            key={sample.id}
            onClick={() => handlePick(sample)}
            className="group relative rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 text-left bg-[#0B0F14] flex flex-col cursor-pointer"
          >
            <div className="relative h-28 w-full overflow-hidden">
              <img
                src={sample.image}
                alt={sample.name}
                onError={handleImageError}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-transparent opacity-60" />
              <span className="absolute top-2 left-2 text-[9px] font-serif font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#0B0F14]/85 text-amber-300 border border-amber-500/30 backdrop-blur-xs">
                {sample.city}
              </span>
            </div>

            <div className="p-2.5 flex-1 flex flex-col justify-between">
              <div>
                <p className="font-serif font-bold text-xs text-sand-100 group-hover:text-amber-300 line-clamp-1 transition-colors">
                  {sample.name}
                </p>
                <p className="text-[10px] text-amber-200/50 line-clamp-1 mt-0.5 font-sans">
                  {sample.tag}
                </p>
              </div>

              <div className="mt-2 flex items-center gap-1 text-[10px] font-serif font-bold text-amber-400 opacity-80 group-hover:opacity-100 transition-opacity">
                <span>Analyze</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
