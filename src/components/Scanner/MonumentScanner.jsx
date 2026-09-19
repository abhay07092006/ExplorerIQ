import { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import ScanningHUD from './ScanningHUD';
import SampleGallery from './SampleGallery';
import MonumentDetailCard from './MonumentDetailCard';

export default function MonumentScanner() {
  const { scannerState, scanImage, resetScanner } = useTravel();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        scanImage(event.target?.result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        scanImage(event.target?.result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-serif tracking-widest uppercase shadow-lg shadow-amber-500/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Neural Vision & Architectural Intelligence</span>
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-sand-100 tracking-tight">
          Identify Indian Heritage
        </h1>
        <p className="text-xs sm:text-sm text-sand-300/80 max-w-2xl mx-auto font-sans leading-relaxed">
          Upload any photograph of an Indian monument, temple, fort, or sculpture to instantly extract 
          its construction era, dynastic patron, architectural style, and visiting guide.
        </p>
      </div>

      {/* Main Interactive Capture / Scan Card */}
      {!scannerState.result && (
        <div className="relative max-w-3xl mx-auto bg-[#121824] rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden p-6 sm:p-10">
          
          {/* Scanning HUD Overlay if in progress */}
          {scannerState.isScanning && <ScanningHUD />}

          {/* Drag & Drop Photo Upload Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? 'border-amber-400 bg-amber-500/15 scale-[0.99]'
                : 'border-amber-500/30 hover:border-amber-400 bg-[#0B0F14]/70 hover:bg-[#0B0F14]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-5 shadow-inner">
              <UploadCloud className="w-10 h-10 animate-bounce" />
            </div>

            <h3 className="font-serif font-bold text-lg sm:text-xl text-sand-100">
              Drag and drop your heritage photo here
            </h3>
            <p className="text-xs text-sand-400 mt-1 max-w-md mx-auto font-sans leading-relaxed">
              Supports JPG, PNG, WEBP • Analyzes stone textures, domes, arches & inscriptions (e.g. Taj Mahal, Hawa Mahal, India Gate)
            </p>

            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="px-6 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-saffron-warm hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-serif font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2">
                <UploadCloud className="w-4 h-4" />
                Browse Heritage Photo
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Identified Output Card */}
      {scannerState.result && (
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Heritage Landmark Analyzed & Identified</span>
            </div>
            <button
              onClick={resetScanner}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#121824] hover:bg-[#1A2232] border border-amber-500/30 text-amber-300 text-xs font-serif font-bold rounded-xl shadow transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Scan Another Photo</span>
            </button>
          </div>

          <MonumentDetailCard
            monument={scannerState.result}
            confidence={scannerState.confidence}
            features={scannerState.detectedFeatures}
          />
        </div>
      )}

      {/* Preset Benchmark Samples for Instant Testing */}
      <div className="max-w-5xl mx-auto">
        <SampleGallery />
      </div>

    </div>
  );
}
