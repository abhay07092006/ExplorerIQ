import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Camera, 
  UploadCloud, 
  Sparkles, 
  RefreshCw, 
  Video, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import ScanningHUD from './ScanningHUD';
import SampleGallery from './SampleGallery';
import MonumentDetailCard from './MonumentDetailCard';

export default function MonumentScanner() {
  const { scannerState, scanImage, resetScanner } = useTravel();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Camera access denied or unavailable. You can still upload photos from files or use the sample gallery.');
      setIsCameraActive(false);
    }
  };

  const captureCameraFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

    stopCamera();
    scanImage(dataUrl, 'live_camera_capture.jpg');
  };

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
      
      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} className="hidden" />

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
          Upload or capture a snapshot of any monument to instantly extract its construction era,
          architectural secrets, visiting hours, and nearby local food.
        </p>
      </div>

      {/* Main Interactive Capture / Scan Card */}
      {!scannerState.result && (
        <div className="relative max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8">
          
          {/* Scanning HUD Overlay if in progress */}
          {scannerState.isScanning && <ScanningHUD />}

          {/* Camera View Mode */}
          {isCameraActive ? (
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center border-2 border-sky-500">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Shutter Button and Stop Button */}
              <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-20">
                <button
                  onClick={stopCamera}
                  className="px-4 py-2.5 bg-slate-900/80 hover:bg-slate-900 text-slate-300 rounded-xl text-xs font-bold backdrop-blur-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={captureCameraFrame}
                  className="px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-sky-500/30 flex items-center gap-2 transform active:scale-95 transition-all"
                >
                  <Camera className="w-5 h-5" />
                  <span>Snap Monument Photo</span>
                </button>
              </div>
            </div>
          ) : (
            /* Drag & Drop Upload Zone */
            <div>
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
                  <span className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-xs hover:bg-slate-100 transition-colors">
                    Browse Files
                  </span>
                </div>
              </div>

              {/* Camera Shutter Alternative Button */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">or</span>
                <button
                  onClick={startCamera}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow transition-all hover:scale-102"
                >
                  <Video className="w-4 h-4 text-sky-400" />
                  <span>Use Live Device Camera</span>
                </button>
              </div>

              {cameraError && (
                <div className="mt-3 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{cameraError}</span>
                </div>
              )}
            </div>
          )}
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
