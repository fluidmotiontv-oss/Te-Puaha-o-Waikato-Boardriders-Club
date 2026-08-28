import React from 'react';
import { MediaAsset, StorySegment, DirectorPersona } from '../App';
import { Film, Sparkles, Play, Plus, Zap, Cpu } from 'lucide-react';

interface StoryForgeProps {
  timeline: StorySegment[];
  availableAssets: MediaAsset[];
  onUpdateTimeline: React.Dispatch<React.SetStateAction<StorySegment[]>>;
  onOpenKdenliveExport: () => void;
  activeDirector: DirectorPersona;
  onChangeDirector: (d: string) => void;
}

export default function StoryForge({
  timeline,
  availableAssets,
  onUpdateTimeline,
  onOpenKdenliveExport,
  activeDirector,
  onChangeDirector,
}: StoryForgeProps) {
  const handleAddAsset = (asset: MediaAsset) => {
    const newSegment: StorySegment = {
      id: `seg_${Date.now()}`,
      asset,
      track: 'A-Roll (Main)',
      startTimeSec: timeline.reduce((acc, curr) => acc + curr.durationSec, 0),
      durationSec: 15,
      transition: 'glitch',
      notes: `${asset.fileName} added to timeline`,
    };
    onUpdateTimeline((prev) => [...prev, newSegment]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/60 to-slate-900 border border-purple-500/30 p-6 rounded-3xl space-y-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold mb-2">
              <Film className="w-3.5 h-3.5" />
              <span>Dragon 9 Story Forge</span>
            </div>
            <h2 className="text-2xl font-black text-white">Interactive Narrative Storyboard Engine</h2>
            <p className="text-slate-300 text-xs max-w-xl">
              Construct high-energy surf reels and documentary cut lists powered by AI Director Personas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Director Mode</label>
              <select
                value={activeDirector.id}
                onChange={(e) => onChangeDirector(e.target.value)}
                className="bg-slate-900 border border-purple-500/40 rounded-xl px-3 py-1.5 text-xs text-purple-300 font-mono font-bold focus:outline-none"
              >
                <option value="chaos">Mad Maxwell (Chaos Cut)</option>
                <option value="zen">Mist Flow (Zen Flow)</option>
                <option value="sovereign">The Nine (Sovereign Law)</option>
                <option value="hype">Hype Timmy (Full Noise)</option>
              </select>
            </div>

            <button
              onClick={onOpenKdenliveExport}
              className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-mono font-bold text-xs hover:brightness-110 shadow-lg flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Export .kdenlive</span>
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Timeline Tracks */}
        <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Zap className="w-4 h-4 text-purple-400" />
            Active Timeline Segments ({timeline.length})
          </h3>

          <div className="space-y-3">
            {timeline.map((seg, idx) => (
              <div
                key={seg.id}
                className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-10 rounded-lg overflow-hidden relative border border-slate-800 shrink-0">
                    <img src={seg.asset.thumbnailUrl} alt={seg.asset.fileName} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0.5 right-0.5 px-1 bg-black/80 text-[8px] font-mono text-cyan-400 font-bold">
                      #{idx + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{seg.asset.fileName}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Track: <span className="text-purple-400">{seg.track}</span> • Duration: {seg.durationSec}s
                    </p>
                    <p className="text-[11px] text-slate-300 italic">{seg.notes}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[10px]">
                    FX: {seg.transition}
                  </span>
                  <button
                    onClick={() => onUpdateTimeline((prev) => prev.filter((s) => s.id !== seg.id))}
                    className="text-rose-400 hover:text-rose-300 text-xs px-2 py-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Assets Library */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Media Bin Assets ({availableAssets.length})
          </h3>

          <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar">
            {availableAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <img src={asset.thumbnailUrl} alt={asset.fileName} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-white line-clamp-1">{asset.fileName}</h5>
                    <p className="text-[10px] text-slate-400 font-mono">{asset.resolution} • {asset.duration}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddAsset(asset)}
                  className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 text-xs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
