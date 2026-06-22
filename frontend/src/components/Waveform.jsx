import { useEffect, useRef } from 'react';

const Waveform = ({ isRecording, duration }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Format time (MM:SS)
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let phase = 0;
    
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio;
      canvas.height = 100 * window.devicePixelRatio;
      canvas.style.width = '100%';
      canvas.style.height = '100px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      
      ctx.clearRect(0, 0, w, h);
      
      // Draw baseline
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.strokeStyle = '#E2E8F0'; // slate-200
      ctx.lineWidth = 1;
      ctx.stroke();

      if (isRecording) {
        // Draw 3 layers of waves with different phase, speed, and opacity
        const waves = [
          { amplitude: 22, frequency: 0.015, color: 'rgba(37, 99, 235, 0.45)', speed: 0.15 }, // Medical blue
          { amplitude: 14, frequency: 0.025, color: 'rgba(16, 185, 129, 0.35)', speed: -0.1 }, // Healthgreen
          { amplitude: 8, frequency: 0.035, color: 'rgba(37, 99, 235, 0.15)', speed: 0.25 }
        ];

        phase += 0.5;

        waves.forEach((wave) => {
          ctx.beginPath();
          ctx.moveTo(0, h / 2);
          
          for (let x = 0; x < w; x++) {
            // Apply a bell-curve envelope to pin the ends of the wave to the center baseline
            const envelope = Math.sin((x / w) * Math.PI);
            const y = h / 2 + Math.sin(x * wave.frequency + (phase * wave.speed)) * wave.amplitude * envelope;
            ctx.lineTo(x, y);
          }

          ctx.strokeStyle = wave.color;
          ctx.lineWidth = 2.5;
          ctx.stroke();
        });
      } else {
        // Flat wave with static resting noise
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        for (let x = 0; x < w; x++) {
          const envelope = Math.sin((x / w) * Math.PI);
          const y = h / 2 + Math.sin(x * 0.015) * 1.5 * envelope;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#CBD5E1'; // slate-300
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isRecording]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Waveform Container */}
      <div className="w-full h-[100px] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden relative shadow-inner">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        {isRecording && (
          <div className="absolute top-3 right-4 flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Live Rec</span>
          </div>
        )}
      </div>

      {/* Recording duration timer */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className={`text-2xl font-display font-bold tabular-nums tracking-wide ${isRecording ? 'text-slate-800' : 'text-slate-400'}`}>
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default Waveform;
