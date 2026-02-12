import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Scan, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppStore } from '@/store/AppContext';
import { getProductByBarcode, mockProducts } from '@/data/mockProducts';

export function BarcodeScanner() {
  const { isBarcodeModalOpen, setIsBarcodeModalOpen, setSelectedProduct, setCurrentView } = useAppStore();
  const [scanMode, setScanMode] = useState<'camera' | 'upload'>('camera');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasCamera, setHasCamera] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isBarcodeModalOpen && scanMode === 'camera') {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isBarcodeModalOpen, scanMode]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCamera(true);
      setError(null);
    } catch (err) {
      setHasCamera(false);
      setError('Camera access denied or not available. Please use upload mode.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    setError(null);
    
    // Simulate barcode scanning with random product
    setTimeout(() => {
      const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      const barcode = randomProduct.barcode || '1234567890123';
      setScanResult(barcode);
      setIsScanning(false);
      
      // Find and show product
      const product = getProductByBarcode(barcode);
      if (product) {
        setTimeout(() => {
          setIsBarcodeModalOpen(false);
          setSelectedProduct(product);
          setCurrentView('product-detail');
          setScanResult(null);
        }, 1000);
      }
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsScanning(true);
      setError(null);
      
      // Simulate processing
      setTimeout(() => {
        const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
        const barcode = randomProduct.barcode || '1234567890123';
        setScanResult(barcode);
        setIsScanning(false);
        
        const product = getProductByBarcode(barcode);
        if (product) {
          setTimeout(() => {
            setIsBarcodeModalOpen(false);
            setSelectedProduct(product);
            setCurrentView('product-detail');
            setScanResult(null);
          }, 1000);
        }
      }, 1500);
    }
  };

  const handleClose = () => {
    stopCamera();
    setIsBarcodeModalOpen(false);
    setScanResult(null);
    setError(null);
    setIsScanning(false);
  };

  return (
    <Dialog open={isBarcodeModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-dark-secondary border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Scan className="w-5 h-5 text-cyan" />
            Scan Barcode
          </DialogTitle>
        </DialogHeader>

        {/* Mode Toggle */}
        <div className="flex gap-2 p-1 bg-black/30 rounded-lg">
          <button
            onClick={() => {
              setScanMode('camera');
              setError(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              scanMode === 'camera'
                ? 'bg-cyan text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            Camera
          </button>
          <button
            onClick={() => {
              setScanMode('upload');
              stopCamera();
              setError(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              scanMode === 'upload'
                ? 'bg-cyan text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>

        {/* Camera Mode */}
        {scanMode === 'camera' && (
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {hasCamera ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                {/* Scan Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`relative w-48 h-32 border-2 ${isScanning ? 'border-cyan' : 'border-white/30'} rounded-lg`}>
                    {/* Corner Markers */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan" />
                    
                    {/* Scan Line */}
                    {isScanning && (
                      <div className="absolute left-0 right-0 h-0.5 bg-cyan shadow-glow animate-[scan-line_2s_linear_infinite]" />
                    )}
                  </div>
                </div>
                
                {/* Scan Button */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <Button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="bg-cyan text-black hover:bg-cyan-light font-semibold"
                  >
                    {isScanning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Scan className="w-4 h-4 mr-2" />
                        Scan Now
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white/60">
                <Camera className="w-12 h-12 mb-2 opacity-50" />
                <p>Camera not available</p>
              </div>
            )}
          </div>
        )}

        {/* Upload Mode */}
        {scanMode === 'upload' && (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative aspect-video bg-black/30 border-2 border-dashed border-white/20 hover:border-cyan/50 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload className="w-12 h-12 text-white/40 mb-3" />
            <p className="text-white/60 text-sm">Click to upload barcode image</p>
            <p className="text-white/40 text-xs mt-1">or drag and drop</p>
          </div>
        )}

        {/* Scan Result */}
        {scanResult && (
          <div className="flex items-center gap-3 p-3 bg-cyan/10 border border-cyan/30 rounded-lg animate-scale-in">
            <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-cyan" />
            </div>
            <div>
              <p className="text-sm text-white/60">Barcode detected</p>
              <p className="text-sm font-mono text-cyan">{scanResult}</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Instructions */}
        <p className="text-xs text-white/40 text-center">
          Position the barcode within the frame for best results
        </p>
      </DialogContent>
    </Dialog>
  );
}
