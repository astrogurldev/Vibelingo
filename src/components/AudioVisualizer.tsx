import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  stream: MediaStream | null;
  isRecording: boolean;
  isAccurate?: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ stream, isRecording, isAccurate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!stream || !isRecording) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      // Draw flat line
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();
          ctx.moveTo(0, canvas.height / 2);
          ctx.lineTo(canvas.width, canvas.height / 2);
          ctx.strokeStyle = '#4b5563'; // Gray
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
      return;
    }

    // Set up audio context and analyser
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const audioCtx = audioCtxRef.current;
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;

    // Use a specific track or just stream
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        // Violet: #8F00FF, Mint: #AAF0D1
        // If accurate, glow Mint, otherwise Violet
        if (isAccurate) {
          ctx.fillStyle = `rgb(${170 + barHeight/2}, ${240}, ${209})`; 
          ctx.shadowColor = '#AAF0D1';
        } else {
          ctx.fillStyle = `rgb(${143 + barHeight/2}, ${0}, ${255})`; 
          ctx.shadowColor = '#8F00FF';
        }
        
        ctx.shadowBlur = 10;
        
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      source.disconnect();
    };
  }, [stream, isRecording, isAccurate]);

  return (
    <div className="w-full bg-[#0a0a0a] rounded-2xl border border-white/10 p-4 relative overflow-hidden flex items-center justify-center min-h-[120px]">
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={100} 
        className="w-full h-full"
      />
    </div>
  );
};
