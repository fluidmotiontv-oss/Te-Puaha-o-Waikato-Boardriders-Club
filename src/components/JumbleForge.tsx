import React, { useState, useEffect, useRef } from 'react';
import { MediaAsset, DirectorPersona } from '../App';
import { Shuffle, Zap } from 'lucide-react';

interface JumbleForgeProps {
  assets: MediaAsset[];
  activeDirector: DirectorPersona;
  tideBpm?: number;
  isBroadcasting?: boolean;
  onGoLiveWithJumble?: () => void;
}

export default function JumbleForge({ assets, activeDirector }: JumbleForgeProps) {
  const [shuffled, setShuffled] = useState(assets);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleReshuffle = () => {
    setShuffled([...assets].sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const render = () => {
      step += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;

      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin(x * 0.05 + step) * 12 + Math.cos(x * 0.02 + step) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Jumble Cut Permutator</h2>
          <p className="text-slate-300 text-xs font-mono">
            Director Mode: <span className="text-amber-400 font-bold">{activeDirector.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-36 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <canvas ref={canvasRef} width={140} height={40} className="w-full h-full" />
          </div>
          <button
            onClick={handleReshuffle}
            className="px-4 py-2 rounded-xl bg-amber-500 text-black font-mono font-bold text-xs flex items-center gap-2 hover:bg-amber-400 transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            <span>Reshuffle Sequence</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {shuffled.map((a, i) => (
          <div key={a.id + i} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2 hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold">
              <span className="text-amber-400">CUT #{i + 1}</span>
              <span className="text-slate-500 flex items-center gap-1">
                <Zap className="w-3 h-3 text-cyan-400" /> {a.duration}
              </span>
            </div>
            <img src={a.thumbnailUrl} alt={a.fileName} className="w-full h-32 object-cover rounded-xl" />
            <h4 className="text-xs font-bold text-white line-clamp-1">{a.fileName}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
