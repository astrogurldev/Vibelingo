import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload, Scan, RefreshCcw } from 'lucide-react';
import { VocabularyItem } from './VocabularyCard';

interface VisionPortalProps {
  onCapture: (imageSrc: string) => void;
  isAnalyzing: boolean;
  capturedImage?: string | null;
  currentScanItems?: VocabularyItem[];
  onReset?: () => void;
}

export const VisionPortal: React.FC<VisionPortalProps> = ({ 
  onCapture, 
  isAnalyzing, 
  capturedImage, 
  currentScanItems, 
  onReset 
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraActive, setIsCameraActive] = useState(true);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [webcamRef, onCapture]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        
        // Draw to canvas to bake EXIF rotation
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, img.width, img.height);
            onCapture(canvas.toDataURL('image/jpeg', 0.8));
          } else {
            onCapture(base64String);
          }
        };
        img.src = base64String;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden rounded-3xl glass-card bg-black/40">
      {!capturedImage && (
        <div className="absolute top-4 left-4 z-10 flex gap-4">
          <button
            onClick={() => setIsCameraActive(true)}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              isCameraActive ? 'bg-violet/50 text-white' : 'bg-black/50 text-gray-400 hover:text-white'
            }`}
            title="Use Camera"
          >
            <Camera size={24} />
          </button>
          <label
            className={`p-2 rounded-full backdrop-blur-md cursor-pointer transition-colors ${
              !isCameraActive ? 'bg-violet/50 text-white' : 'bg-black/50 text-gray-400 hover:text-white'
            }`}
            title="Upload Image"
          >
            <Upload size={24} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setIsCameraActive(false);
                handleFileUpload(e);
              }}
            />
          </label>
        </div>
      )}

      <div className="w-full h-full flex items-center justify-center relative">
        {capturedImage ? (
          <div className="relative inline-block max-w-full max-h-full">
            <img 
              src={capturedImage} 
              alt="Captured" 
              className="max-w-full max-h-[500px] object-contain block" 
            />
            
            {!isAnalyzing && currentScanItems && [...currentScanItems].sort((a, b) => {
              if (!a.box || !b.box) return 0;
              const areaA = (a.box[2] - a.box[0]) * (a.box[3] - a.box[1]);
              const areaB = (b.box[2] - b.box[0]) * (b.box[3] - b.box[1]);
              return areaB - areaA; // Sort descending: largest first, smallest last (rendered on top)
            }).map((item, idx) => {
              if (!item.box || item.box.length !== 4) return null;
              const [ymin, xmin, ymax, xmax] = item.box;
              
              const top = `${ymin / 10}%`;
              const left = `${xmin / 10}%`;
              const height = `${(ymax - ymin) / 10}%`;
              const width = `${(xmax - xmin) / 10}%`;

              return (
                <div 
                  key={idx}
                  className="absolute border-[3px] border-mint bg-mint/10 hover:bg-mint/30 transition-colors cursor-pointer group"
                  style={{ top, left, width, height }}
                >
                  <span className="absolute -top-7 left-0 bg-black/90 text-mint font-bold text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    {item.word} ({item.translation})
                  </span>
                </div>
              );
            })}
          </div>
        ) : isCameraActive ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
            videoConstraints={{ facingMode: 'environment' }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <Upload size={64} className="mb-4 opacity-50" />
            <p>Upload an image to start</p>
          </div>
        )}

        {isAnalyzing && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="w-full h-full bg-mint/10" />
            <div
              className="w-full h-2 bg-mint/80 shadow-[0_0_15px_rgba(170,240,209,1)] animate-scan"
              style={{
                animation: 'scan 2s linear infinite',
              }}
            />
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-4">
        {!capturedImage ? (
          <button
            onClick={capture}
            disabled={!isCameraActive || isAnalyzing}
            className="click-pop hover-glow w-16 h-16 rounded-full bg-violet/80 border-4 border-mint flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <Scan size={28} className="text-white animate-spin" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-white" />
            )}
          </button>
        ) : (
          <button
            onClick={onReset}
            disabled={isAnalyzing}
            className="click-pop hover-glow px-6 py-3 rounded-full bg-violet border-2 border-mint text-white font-medium flex items-center gap-2"
          >
            <RefreshCcw size={20} />
            Scan New Area
          </button>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      ` }} />
    </div>
  );
};
