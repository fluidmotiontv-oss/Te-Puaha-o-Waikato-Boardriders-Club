import React from 'react';
import { StorySegment, DirectorPersona } from '../App';
import { Film, ArrowLeft, Download, FileCode } from 'lucide-react';

interface KdenliveExporterProps {
  timeline: StorySegment[];
  director: DirectorPersona;
  onBack: () => void;
}

const escapeXml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export default function KdenliveExporter({ timeline, director, onBack }: KdenliveExporterProps) {
  const xmlSample = `<mlt version="7.0.0" title="${escapeXml(director.name)}_${Date.now()}">
  <profile frame_rate_num="60" frame_rate_den="1" width="3840" height="2160" display_aspect_num="16" display_aspect_den="9"/>
  <!-- Director Persona: ${escapeXml(director.name)} (${escapeXml(director.tagline)}) -->
  ${timeline.map((s, i) => `<producer id="producer_${i}" resource="${escapeXml(s.asset.filePath)}"/>
  <entry producer="producer_${i}" in="00:00:00" out="00:00:${s.durationSec}" note="${escapeXml(s.notes)}"/>`).join('\n  ')}
</mlt>`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Story Forge</span>
        </button>
        <button
          onClick={() => {
            const element = document.createElement("a");
            const file = new Blob([xmlSample], {type: 'text/xml'});
            element.href = URL.createObjectURL(file);
            element.download = "sunset_beach_project.kdenlive";
            document.body.appendChild(element);
            element.click();
          }}
          className="px-4 py-2 rounded-xl bg-pink-500 text-white font-mono text-xs font-bold flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Download .kdenlive Project File</span>
        </button>
      </div>

      <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-mono font-bold text-pink-400 flex items-center gap-2">
          <FileCode className="w-4 h-4" />
          Generated Kdenlive MLT XML Source
        </h3>
        <pre className="p-4 bg-[#06080D] rounded-2xl text-slate-300 font-mono text-xs overflow-x-auto border border-slate-800">
          {xmlSample}
        </pre>
      </div>
    </div>
  );
}
