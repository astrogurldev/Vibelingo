import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eraser, Check, Loader2 } from 'lucide-react';

interface WritingCanvasProps {
  isOpen: boolean;
  onClose: () => void;
  targetWord: string;
  language: string;
  translation: string;
}

interface GradeResult {
  score: number;
  feedback: string;
}

export default function WritingCanvas({ isOpen, onClose, targetWord, language, translation }: WritingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize canvas
  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#ffffff'; // White pen
        // Fill black background so it's not transparent for image export
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    } else {
      setResult(null);
      setError(null);
    }
  }, [isOpen]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (result || isGrading) return; // Disable drawing if graded or grading
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || result || isGrading) return;
    e.preventDefault(); // Prevent scrolling on touch

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.closePath();
      }
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setResult(null);
    setError(null);
  };

  const submitDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = canvas.toDataURL('image/png');
    
    setIsGrading(true);
    setError(null);

    try {
      const response = await fetch('/api/grade-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageData,
          targetWord,
          language
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to grade');

      setResult({ score: data.score, feedback: data.feedback });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to analyze writing.');
    } finally {
      setIsGrading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#121212] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div>
            <h2 className="text-white font-medium">Zen Canvas</h2>
            <p className="text-xs text-mint">Coba tulis: <span className="font-bold text-lg">{targetWord}</span> ({translation})</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col items-center">
          <div className="relative border-2 border-white/10 rounded-xl overflow-hidden bg-[#0a0a0a] shadow-inner mb-6">
            {/* Target word watermark */}
            {!result && !isGrading && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <span className="text-8xl font-bold">{targetWord}</span>
              </div>
            )}
            
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className={`touch-none cursor-crosshair ${isGrading || result ? 'pointer-events-none' : ''}`}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              onTouchCancel={stopDrawing}
            />

            {/* Grading Overlay */}
            {isGrading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-mint mb-2" size={32} />
                <p className="text-sm text-mint font-medium animate-pulse">Menilai coretanmu...</p>
              </div>
            )}
          </div>

          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 mb-4 text-center"
              >
                <div className="text-4xl font-black mb-2">
                  <span className={result.score >= 80 ? 'text-green-400' : result.score >= 60 ? 'text-yellow-400' : 'text-red-400'}>
                    {result.score}
                  </span>
                  <span className="text-gray-500 text-2xl">/100</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{result.feedback}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 w-full">
            <button
              onClick={clearCanvas}
              disabled={isGrading}
              className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <Eraser size={18} />
              Hapus
            </button>
            {!result ? (
              <button
                onClick={submitDrawing}
                disabled={isGrading}
                className="flex-1 py-3 px-4 rounded-xl bg-mint hover:bg-mint/90 text-black font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 click-pop"
              >
                <Check size={18} />
                Koreksi
              </button>
            ) : (
              <button
                onClick={clearCanvas}
                className="flex-1 py-3 px-4 rounded-xl bg-violet hover:bg-violet/90 text-white font-bold flex items-center justify-center gap-2 transition-colors click-pop"
              >
                Coba Lagi
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
