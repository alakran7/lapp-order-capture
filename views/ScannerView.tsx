
import React, { useEffect, useRef, useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

interface ScannerViewProps {
  onBack: () => void;
  onProductFound: (product: Product, quantity: number) => void;
}

const ScannerView: React.FC<ScannerViewProps> = ({ onBack, onProductFound }) => {
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showManualFallback, setShowManualFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    async function startCamera() {
      // Step 1: Check if mediaDevices API is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Your browser does not support camera access.");
        setShowManualFallback(true);
        return;
      }

      // Step 2: Try different constraints. 
      // We start with simple video:true to maximize compatibility on laptops.
      const constraintsList = [
        { video: true, audio: false },
        { video: { facingMode: 'environment' }, audio: false },
        { video: { width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false }
      ];

      let lastError: any = null;

      for (const constraints of constraintsList) {
        try {
          console.log("Attempting camera with constraints:", constraints);
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            // Force play in case autoPlay is blocked
            videoRef.current.play().catch(e => console.warn("Auto-play blocked:", e));
          }
          
          streamRef.current = stream;
          setError(null);
          setShowManualFallback(false);
          return; // Success!
        } catch (err: any) {
          console.warn("Constraint failed:", constraints, err);
          lastError = err;
        }
      }

      // If all failed
      console.error("All camera access attempts failed:", lastError);
      
      const errorMessage = lastError?.name === 'NotAllowedError' 
        ? "Camera permission denied. Please enable it in browser settings." 
        : lastError?.name === 'NotReadableError' || lastError?.name === 'TrackStartError'
        ? "Could not start video source. The camera might be in use by another app or hardware is restricted."
        : "Unable to access camera. Hardware might be unavailable or unsupported.";
      
      setError(errorMessage);
      setShowManualFallback(true);
    }

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
          console.debug("Stopped camera track:", track.label);
        });
      }
    };
  }, []);

  const handleManualScan = () => {
    setIsScanning(true);
    // Simulate "processing" time for the scanner
    setTimeout(() => {
      const randomProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
      setScannedProduct(randomProduct);
      setQuantity(1);
      setIsScanning(false);
    }, 800);
  };

  const handleAdd = () => {
    if (scannedProduct) {
      onProductFound(scannedProduct, quantity);
      setScannedProduct(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-black h-full relative overflow-hidden">
      {/* Back Button Overlay */}
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 z-50 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
      >
        <span className="material-symbols-rounded">arrow_back</span>
      </button>

      {/* Camera Viewport */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-hidden relative bg-slate-900">
        <video 
          ref={videoRef}
          autoPlay 
          playsInline 
          muted 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Scanning Overlay UI */}
        {!error && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
              <div className={`w-64 h-40 border-2 transition-colors duration-300 rounded-2xl relative ${isScanning ? 'border-green-500' : 'border-primary/50'}`}>
                  <div className={`absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 rounded-tl-xl transition-colors duration-300 ${isScanning ? 'border-green-500' : 'border-primary'}`}></div>
                  <div className={`absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 rounded-tr-xl transition-colors duration-300 ${isScanning ? 'border-green-500' : 'border-primary'}`}></div>
                  <div className={`absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 rounded-bl-xl transition-colors duration-300 ${isScanning ? 'border-green-500' : 'border-primary'}`}></div>
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 rounded-br-xl transition-colors duration-300 ${isScanning ? 'border-green-500' : 'border-primary'}`}></div>
                  
                  {/* Scanning line animation */}
                  <div className={`absolute top-0 left-0 w-full h-0.5 bg-primary/80 shadow-[0_0_15px_rgba(255,92,0,0.8)] ${isScanning ? 'animate-none bg-green-500 opacity-100 shadow-green-500' : 'animate-[scan_2s_ease-in-out_infinite]'}`}></div>
              </div>
              <p className="mt-8 text-white/70 font-medium text-sm drop-shadow-md">
                {isScanning ? 'Decoding...' : 'Center barcode in the frame'}
              </p>
          </div>
        )}

        {/* Shutter Button Overlay */}
        {!scannedProduct && !error && (
          <div className="absolute bottom-10 left-0 right-0 flex justify-center px-10">
            <button 
              onClick={handleManualScan}
              disabled={isScanning}
              className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all ${isScanning ? 'scale-90 opacity-50' : 'active:scale-95'}`}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <span className="material-symbols-rounded text-white text-3xl">qr_code_scanner</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Error / Manual Fallback Overlay */}
      {showManualFallback && (
        <div className="absolute inset-0 flex items-center justify-center z-[100] px-10 text-center bg-slate-900/90 backdrop-blur-lg">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-2xl max-w-sm w-full border border-slate-100 dark:border-slate-800">
            <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-rounded text-primary text-4xl">sensors_off</span>
            </div>
            <h3 className="text-2xl font-black mb-3 dark:text-white">Camera Offline</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">
              {error || "We couldn't connect to your camera. You can still test the app using manual product entry."}
            </p>
            <div className="space-y-3">
              <button 
                onClick={handleManualScan}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-rounded">touch_app</span>
                Simulation Mode
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-2xl active:scale-95 transition-all"
              >
                Retry Camera
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; }
          50% { top: 100%; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>

      {/* Product Match Modal */}
      {scannedProduct && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-[60] flex items-end justify-center">
          <div className="bg-white dark:bg-slate-900 w-full max-h-[92vh] rounded-t-[40px] shadow-2xl overflow-hidden flex flex-col animate-[slideUp_0.4s_ease-out]">
            <button 
              onClick={() => setScannedProduct(null)}
              className="absolute top-6 right-6 z-[70] bg-slate-100 dark:bg-slate-800 p-2 rounded-full text-slate-900 dark:text-white active:scale-90"
            >
              <span className="material-symbols-rounded">close</span>
            </button>

            <div className="flex-1 overflow-y-auto hide-scrollbar">
              <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 relative">
                <img src={scannedProduct.image} alt={scannedProduct.name} className="w-full h-full object-cover" />
              </div>

              <div className="px-8 pt-8 pb-32">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">Detected Item</span>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">{scannedProduct.name}</h2>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-6">
                  <span className="text-slate-400 dark:text-slate-500 text-sm font-medium">SKU:</span>
                  <span className="text-slate-900 dark:text-white text-sm font-bold">{scannedProduct.sku}</span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Specifications</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                    {scannedProduct.description}
                  </p>
                  <p className="text-xl font-bold text-primary mt-4">${scannedProduct.price.toFixed(2)} / {scannedProduct.unit}</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white dark:from-slate-900 via-white dark:via-slate-900 to-transparent pt-12">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-[28px] flex items-center justify-between border border-slate-100 dark:border-slate-700 shadow-xl">
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-2xl shadow-sm border border-slate-100 dark:border-slate-600 active:scale-90"
                  >
                    <span className="material-symbols-rounded">remove</span>
                  </button>
                  <div className="px-6 flex flex-col items-center">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">{quantity}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{scannedProduct.unit}</span>
                  </div>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-2xl shadow-lg shadow-orange-500/30 active:scale-90"
                  >
                    <span className="material-symbols-rounded">add</span>
                  </button>
                </div>
                <button 
                  onClick={handleAdd}
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center active:scale-95"
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScannerView;
