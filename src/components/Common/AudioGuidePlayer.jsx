import { Square, Sparkles } from 'lucide-react';
import { useTravel } from '../../context/useTravel';

export default function AudioGuidePlayer() {
  const { audioState, pauseAudio } = useTravel();

  if (!audioState.isPlaying) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-[#0B0F14]/95 backdrop-blur-md text-[#E2D9CC] border border-amber-500/40 rounded-2xl p-4 shadow-2xl shadow-amber-950/40 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      {/* Animated Sound Wave Bars */}
      <div className="flex items-center gap-1 h-8 px-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
        <span className="w-1 bg-amber-400 rounded-full animate-[bounce_1s_infinite_100ms] h-3"></span>
        <span className="w-1 bg-orange-400 rounded-full animate-[bounce_1s_infinite_300ms] h-6"></span>
        <span className="w-1 bg-amber-300 rounded-full animate-[bounce_1s_infinite_200ms] h-4"></span>
        <span className="w-1 bg-amber-500 rounded-full animate-[bounce_1s_infinite_400ms] h-5"></span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-serif font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>ExplorerIQ Audio Narrator</span>
        </div>
        <p className="text-xs font-serif font-semibold text-[#E2D9CC] truncate mt-0.5">
          {audioState.title || 'Heritage Tour Guide'}
        </p>
      </div>

      <button
        onClick={pauseAudio}
        className="p-2.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
        title="Stop Audio Guide"
      >
        <Square className="w-4 h-4 fill-current" />
      </button>
    </div>
  );
}
