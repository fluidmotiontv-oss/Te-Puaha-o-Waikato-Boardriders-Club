import React from 'react';
import { MediaAsset } from '../App';
import { Database, ShieldCheck, CheckCircle2, HardDrive, FileVideo } from 'lucide-react';

interface DriveAuditorProps {
  assets: MediaAsset[];
  onScanNewFolder: () => void;
  onAddToTimeline: () => void;
  onRoastAsset: () => void;
  isScanning: boolean;
}

export default function DriveAuditor({ assets }: DriveAuditorProps) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-xl">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Vault Drive Auditor</h2>
            <p className="text-slate-300 text-xs">Direct filesystem integrity inspector and media codec analyzer.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800">
              <img src={asset.thumbnailUrl} alt={asset.fileName} className="w-full h-full object-cover" />
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 text-cyan-400 font-mono text-[10px] font-bold">
                {asset.codec.toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white line-clamp-1">{asset.fileName}</h3>
              <p className="text-xs text-slate-400 font-mono">{asset.filePath}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 border-t border-slate-800/80 pt-2">
              <div>Size: <span className="text-white">{asset.fileSize}</span></div>
              <div>Res: <span className="text-white">{asset.resolution}</span></div>
              <div>FPS: <span className="text-white">{asset.fps}</span></div>
              <div>Cut Count: <span className="text-amber-400">{asset.sceneCutCount}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
