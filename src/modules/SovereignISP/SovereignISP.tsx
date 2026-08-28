import React from 'react';
import { Wifi, ShieldAlert, Cpu } from 'lucide-react';

export default function SovereignISP() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-xl">
            <Wifi className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Sovereign ISP Mesh Topology</h2>
            <p className="text-slate-300 text-xs">Decentralized P2P mesh network bridging Sunset Beach, Port Waikato, and Raglan.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-cyan-500/30 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-bold text-white">Node #01: Sunset Tower</h3>
          </div>
          <p className="text-xs text-slate-400 font-mono">Signal: 98% • Throughput: 1.2 Gbps Mesh</p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-cyan-500/30 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-bold text-white">Node #02: River Bar Recon</h3>
          </div>
          <p className="text-xs text-slate-400 font-mono">Signal: 94% • Throughput: 850 Mbps Mesh</p>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-cyan-500/30 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-bold text-white">Node #03: D9 Anchor Station</h3>
          </div>
          <p className="text-xs text-slate-400 font-mono">Signal: 100% • Throughput: 2.4 Gbps Mesh</p>
        </div>
      </div>
    </div>
  );
}
