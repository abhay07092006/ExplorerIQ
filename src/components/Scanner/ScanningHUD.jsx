import { useState, useEffect } from 'react';
import { Cpu, Scan, Activity } from 'lucide-react';

const ANALYSIS_STEPS = [
  'Extracting architectural contour & edges...',
  'Calculating facade symmetry & dome geometry...',
  'Matching stone texture against UNESCO heritage archives...',
  'Cross-referencing historical epochs & imperial records...',
  'Synthesizing architectural profile & local legend dossier...'
];

export default function ScanningHUD() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 320);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-30 bg-slate-950/75 backdrop-blur-xs flex flex-col items-center justify-between p-6 pointer-events-none select-none">
      
      {/* Animated Laser Scanning Line */}
      <div className="laser-bar animate-scanner-laser" />

      {/* Target Reticle Crosshairs */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 border-2 border-sky-400/40 rounded-3xl animate-pulse">
          {/* Corner Target Markers */}
          <span className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-sky-400 rounded-tl-lg"></span>
          <span className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-sky-400 rounded-tr-lg"></span>
          <span className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-sky-400 rounded-bl-lg"></span>
          <span className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-sky-400 rounded-br-lg"></span>

          {/* Central Target Reticle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Scan className="w-16 h-16 text-sky-400/80 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>
      </div>

      {/* Top HUD Telemetry */}
      <div className="w-full flex items-center justify-between text-xs font-mono text-sky-400">
        <div className="flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/30 rounded-xl">
          <Activity className="w-4 h-4 text-sky-400 animate-pulse" />
          <span>NEURAL VISION ENGINE ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-emerald-400 font-bold">ACCURACY 99.1%</span>
        </div>
      </div>

      {/* Bottom Step-by-Step Progress Console */}
      <div className="w-full max-w-md bg-slate-900/90 border border-sky-500/40 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 mb-2">
          <Cpu className="w-4 h-4 animate-spin text-sky-400" />
          <span>AI MONUMENT RECOGNITION IN PROGRESS</span>
        </div>

        {/* Dynamic Progress Indicator */}
        <p className="text-xs font-mono text-slate-200 transition-all">
          {ANALYSIS_STEPS[currentStepIndex]}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
          <div
            className="bg-gradient-to-r from-sky-400 via-teal-400 to-amber-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentStepIndex + 1) / ANALYSIS_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

    </div>
  );
}
