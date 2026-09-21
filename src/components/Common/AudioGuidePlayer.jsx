import { Square, Sparkles } from 'lucide-react';
import { useTravel } from '../../context/useTravel';

export default function AudioGuidePlayer() {
  const { audioState, pauseAudio } = useTravel();

  if (!audioState.isPlaying) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-slate-900/95 backdrop-blur-md text-white border border-sky-500/40 rounded-2xl p-4 shadow-2xl shadow-sky-950/50 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      {/* Animated Sound Wave Bars */}
      <div className="flex items-center gap-1 h-8 px-2 bg-sky-500/10 border border-sky-500/30 rounded-xl">
        <span className="w-1 bg-sky-400 rounded-full animate-[bounce_1s_infinite_100ms] h-3"></span>
        <span className="w-1 bg-sky-400 rounded-full animate-[bounce_1s_infinite_300ms] h-6"></span>
        <span className="w-1 bg-amber-400 rounded-full animate-[bounce_1s_infinite_200ms] h-4"></span>
        <span className="w-1 bg-sky-400 rounded-full animate-[bounce_1s_infinite_400ms] h-5"></span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ExplorerIQ Audio Narrator</span>
        </div>
        <p className="text-sm font-medium text-slate-100 truncate mt-0.5">
          {audioState.title || 'Tour Guide Voiceover'}
        </p>
      </div>

      <button
        onClick={pauseAudio}
        className="p-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl transition-all hover:scale-105 active:scale-95"
        title="Stop Audio Guide"
      >
        <Square className="w-4 h-4 fill-current" />
      </button>
    </div>
  );
}
