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
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {
          console.warn('Error stopping camera track:', e);
        }
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setIsCameraLoading(false);
  }, []);

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Connect active media stream to video element when DOM mounts
  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      const video = videoRef.current;
      video.srcObject = streamRef.current;
      video.onloadedmetadata = () => {
        video.play().catch((err) => {
          console.warn('Video playback was prevented or interrupted:', err);
        });
      };
    }
  }, [isCameraActive]);

  const startCamera = async () => {
    setCameraError(null);

    // Guard against non-secure context or missing mediaDevices API
    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError(
        'Camera API is not supported in this browser environment or requires a secure connection (HTTPS or localhost). Please upload an image file instead.'
      );
      return;
    }

    setIsCameraLoading(true);

    let stream = null;

    try {
      // 1. Primary attempt: environment-facing camera with ideal HD dimensions
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
    } catch (envErr) {
      console.warn('Environment camera constraint unavailable or rejected, attempting safe fallback:', envErr);
      try {
        // 2. Safe fallback: any available video device (e.g. desktop/laptop webcam)
        stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
      } catch (fallbackErr) {
        console.error('All camera initialization attempts failed:', fallbackErr);
        let message = 'Unable to access camera hardware. You can upload an image file instead.';
        if (fallbackErr.name === 'NotAllowedError' || fallbackErr.name === 'PermissionDeniedError') {
          message = 'Camera permission was denied. Please allow camera permissions in your browser address bar and try again, or upload an image.';
        } else if (fallbackErr.name === 'NotFoundError' || fallbackErr.name === 'DevicesNotFoundError') {
          message = 'No camera hardware was detected on your device. Please connect a webcam or upload a photo.';
        } else if (fallbackErr.name === 'NotReadableError' || fallbackErr.name === 'TrackStartError') {
          message = 'Camera is currently locked or in use by another application. Please close other camera apps and retry.';
        } else if (fallbackErr.name === 'OverconstrainedError') {
          message = 'Requested camera resolution or facing mode is not supported by your hardware.';
        } else if (fallbackErr.message) {
          message = `Camera error: ${fallbackErr.message}. You can upload an image file instead.`;
        }
        setCameraError(message);
        setIsCameraActive(false);
        setIsCameraLoading(false);
        return;
      }
    }

    if (stream) {
      streamRef.current = stream;
      setIsCameraActive(true);
      setIsCameraLoading(false);
    }
  };

  const captureCameraFrame = () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      // Offscreen canvas with dynamic fallback dimensions
      const canvas = canvasRef.current || document.createElement('canvas');
      const width = video.videoWidth || video.clientWidth || 1280;
      const height = video.videoHeight || video.clientHeight || 720;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not obtain 2D canvas context for frame capture.');
      }

      // Draw current video frame onto canvas
      ctx.drawImage(video, 0, 0, width, height);

      // Export snapshot as clean JPEG
      const dataUrl = canvas.toDataURL('image/jpeg', 0.90);

      // Cleanly stop camera stream to release hardware
      stopCamera();

      // Send captured snapshot into vision scanning pipeline
      scanImage(dataUrl, 'live_camera_capture.jpg');
    } catch (err) {
      console.error('Frame capture error:', err);
      setCameraError('Failed to capture camera frame. Please try again or upload a photo.');
    }
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
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center border-2 border-sky-500 shadow-2xl">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                onLoadedMetadata={(e) => {
                  e.target.play().catch((err) => console.warn('Autoplay error:', err));
                }}
              />

              {/* Live Video HUD Overlay */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-slate-950/70 border border-sky-500/30 rounded-xl backdrop-blur-md text-xs font-semibold text-sky-400">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span>LIVE CAMERA FEED</span>
              </div>

              {/* Viewfinder Target Reticle */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 border border-sky-400/40 rounded-3xl flex items-center justify-center">
                  <span className="absolute -top-1 -left-1 w-6 h-6 border-t-3 border-l-3 border-sky-400 rounded-tl-lg"></span>
                  <span className="absolute -top-1 -right-1 w-6 h-6 border-t-3 border-r-3 border-sky-400 rounded-tr-lg"></span>
                  <span className="absolute -bottom-1 -left-1 w-6 h-6 border-b-3 border-l-3 border-sky-400 rounded-bl-lg"></span>
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 border-b-3 border-r-3 border-sky-400 rounded-br-lg"></span>
                  <span className="text-[11px] font-mono font-bold text-sky-300/80 bg-slate-950/60 px-3 py-1 rounded-full backdrop-blur-xs">
                    Align monument in frame
                  </span>
                </div>
              </div>

              {/* Shutter Button and Stop Button */}
              <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-20">
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-4 py-2.5 bg-slate-900/80 hover:bg-slate-900 text-slate-300 rounded-xl text-xs font-bold backdrop-blur-md transition-colors cursor-pointer shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={captureCameraFrame}
                  className="px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-sky-500/30 flex items-center gap-2 transform active:scale-95 transition-all cursor-pointer"
                >
                  <Camera className="w-5 h-5" />
                  <span>Capture &amp; Scan</span>
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
                  type="button"
                  onClick={startCamera}
                  disabled={isCameraLoading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white rounded-xl text-xs font-bold shadow transition-all hover:scale-102 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isCameraLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 text-sky-400 animate-spin" />
                      <span>Initializing Camera...</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4 text-sky-400" />
                      <span>Use Live Device Camera</span>
                    </>
                  )}
                </button>
              </div>

              {cameraError && (
                <div className="mt-3.5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-2xl flex items-start justify-between gap-2 shadow-xs">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-500" />
                    <span>{cameraError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCameraError(null)}
                    className="text-rose-500 hover:text-rose-800 font-bold text-xs ml-2 cursor-pointer"
                  >
                    Dismiss
                  </button>
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
