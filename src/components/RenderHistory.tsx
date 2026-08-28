import React from 'react';
import { Archive, Film, CheckCircle2 } from 'lucide-react';

export default function RenderHistory() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <h2 className="text-2xl font-black text-white">Render Archive & Finished Reels</h2>
        <p className="text-slate-300 text-xs">High-definition 4K video exports from Dragon 9 Render Node.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> COMPLETED (4K UHD)
            </span>
            <span className="text-[10px] text-slate-500 font-mono">RENDERED TODAY</span>
          </div>
          <h3 className="text-base font-bold text-white">Sunset Beach Winter Solstice Bomb Drop</h3>
          <p className="text-xs text-slate-400">Duration: 14:20 • Codec: HEVC / H.265 • Bitrate: 45 Mbps</p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> COMPLETED (4K UHD)
            </span>
            <span className="text-[10px] text-slate-500 font-mono">RENDERED YESTERDAY</span>
          </div>
          <h3 className="text-base font-bold text-white">Port Waikato Bar Crossing Heavy Swell Edit</h3>
          <p className="text-xs text-slate-400">Duration: 08:45 • Codec: ProRes 422 • Bitrate: 120 Mbps</p>
        </div>
      </div>
    </div>
  );
}
