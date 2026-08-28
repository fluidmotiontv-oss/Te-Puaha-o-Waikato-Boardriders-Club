import React from 'react';
import { DirectorPersona, StorySegment } from '../App';
import { Mic, Volume2 } from 'lucide-react';

interface AvatarForgeProps {
  activeDirector: DirectorPersona;
  timeline: StorySegment[];
}

export default function AvatarForge({ activeDirector }: AvatarForgeProps) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center text-xl">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Avatar Voice & Commentary Forge</h2>
            <p className="text-slate-300 text-xs">Bilingual AI speech commentary generator for Sunset Beach surf announcements.</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-mono font-bold text-indigo-400">Te Kahuna Speech Engine</h3>
        <p className="text-xs text-slate-300">Active Director Voice: <span className="text-white font-bold">{activeDirector.name}</span></p>
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono text-cyan-300">
          "Kia ora e te whānau! Sunset Beach main peak is 6-8ft with light offshore winds. Bar conditions require extreme caution!"
        </div>
        <button
          onClick={() => alert("Playing bilingual commentary sample audio...")}
          className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-mono font-bold text-xs flex items-center gap-2"
        >
          <Volume2 className="w-4 h-4" />
          <span>Synthesize Speech Sample</span>
        </button>
      </div>
    </div>
  );
}
