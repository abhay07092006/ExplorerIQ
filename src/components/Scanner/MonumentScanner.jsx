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
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-600 text-xs font-bold mb-2">
          <Sparkles className="w-4 h-4 text-sky-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>AI Vision & Monument Architectural Intelligence</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
          Visual Landmark & Monument Scanner
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Upload any monument photo to instantly extract its construction era,
          architectural secrets, visiting hours, and nearby local food.
        </p>
      </div>

      {/* Main Interactive Capture / Scan Card */}
      {!scannerState.result && (
        <div className="relative max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8">
          
          {/* Scanning HUD Overlay if in progress */}
          {scannerState.isScanning && <ScanningHUD />}

          {/* Drag & Drop Photo Upload Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? 'border-sky-500 bg-sky-50/70 scale-[0.99]'
                : 'border-slate-300 hover:border-sky-400 bg-slate-50/60 hover:bg-slate-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-4 shadow-inner">
              <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
            </div>

            <h3 className="font-display font-bold text-base sm:text-lg text-slate-800">
              Drag and drop monument photo here
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Supports JPG, PNG, WEBP (e.g. Taj Mahal, Hawa Mahal, India Gate, Gateway of India)
            </p>

            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-2">
                <UploadCloud className="w-4 h-4" />
                Browse Photo
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Identified Output Card */}
      {scannerState.result && (
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Monument Identified Successfully</span>
            </div>
            <button
              onClick={resetScanner}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
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
      <div className="max-w-4xl mx-auto">
        <SampleGallery />
      </div>

    </div>
  );
}
