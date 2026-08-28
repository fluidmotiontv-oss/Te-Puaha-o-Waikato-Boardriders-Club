import React, { useState } from 'react';
import { ClubTabType, LanguageMode } from '../../types';
import { Sparkles, Terminal, Database, Activity, Mic, Radio, Shield, Cpu, Waves, Film, Archive, Code, Layers } from 'lucide-react';

interface MeshClubTabProps {
  activeTab: ClubTabType;
  lang: LanguageMode;
  onOpenAI?: () => void;
  onOpenUpload?: () => void;
}

export const MeshClubTab: React.FC<MeshClubTabProps> = ({ activeTab, lang, onOpenAI, onOpenUpload }) => {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'SYSTEM: Sovereign ISP Mesh initialized at Port Waikato Node #09.',
    'DRAGON9: 54-minute hour clock locked @ 432Hz harmonic wave.',
    'STATUS: All 16 club services operational.',
  ]);
  const [walkieActive, setWalkieActive] = useState(false);
  const [tideFrequency, setTideFrequency] = useState(432);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim();
    setTerminalLogs(prev => [...prev, `> ${cmd}`, `RESULT: Executed '${cmd}' successfully on Dragon9 Mesh.`]);
    setTerminalInput('');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'story':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center text-xl">🎬</div>
                <div>
                  <h2 className="text-xl font-bold text-white">Enigma Story Forge</h2>
                  <p className="text-xs text-slate-400">Generate high-octane narrative scripts & scene storyboards for Sunset Beach surf edits.</p>
                </div>
              </div>
              <button onClick={onOpenAI} className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-300 text-xs font-bold hover:bg-purple-500/30">
                ✨ Generate AI Script
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-purple-400 font-mono">SCENE 1: Sunset Beach Winter Bomb Drop</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Rawiri Kahu paddling into an 8ft SW set at Sunset Beach. Te Puaha o Waikato river mouth bar spitting spray into the offshore breeze.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Duration: 45s • Audio: 432Hz Sub-Harmonic</div>
              </div>
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-purple-400 font-mono">SCENE 2: The Left-Hand Point Barrel</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Drone angle orbiting 100ft above the sandbar showing the wave peeling for 200m down the point.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Duration: 60s • Audio: Full Noise Resonance</div>
              </div>
            </div>
          </div>
        );

      case 'auditor':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-xl">🗃️</div>
              <div>
                <h2 className="text-xl font-bold text-white">Drive Auditor & Vault</h2>
                <p className="text-xs text-slate-400">Manage media storage, checksum integrity, and raw video archives.</p>
              </div>
            </div>
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>Vault Usage: 428.4 GB / 2.0 TB</span>
                <span className="text-cyan-400">Status: HEALTHY (SHA-256 Verified)</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full w-[21%]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-[#0B0E14] rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">RAW 4K Footage</span>
                  <span className="font-bold text-white text-base">312.8 GB</span>
                </div>
                <div className="p-3 bg-[#0B0E14] rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Audio Stems</span>
                  <span className="font-bold text-[#00F0FF] text-base">64.2 GB</span>
                </div>
                <div className="p-3 bg-[#0B0E14] rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Render Archives</span>
                  <span className="font-bold text-amber-400 text-base">51.4 GB</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'kdenlive':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center text-xl">🎞️</div>
              <div>
                <h2 className="text-xl font-bold text-white">Kdenlive Exporter</h2>
                <p className="text-xs text-slate-400">Export video cut lists, timeline markers, and XML project files for open-source video editing.</p>
              </div>
            </div>
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between text-[#FF007F]">
                <span>kdenlive_project_sunset2026.kdenlive</span>
                <button className="px-3 py-1 rounded bg-[#FF007F] text-white font-bold hover:bg-pink-600">Download .kdenlive XML</button>
              </div>
              <pre className="p-4 bg-[#0B0E14] rounded-xl text-slate-400 text-[11px] overflow-x-auto border border-slate-800">
{`<mlt version="7.0.0">
  <profile frame_rate_num="60" frame_rate_den="1" width="3840" height="2160" display_aspect_num="16" display_aspect_den="9"/>
  <producer id="clip_sunset_left">
    <property name="resource">/vault/sunset_beach_winter_bombs_4k.mp4</property>
    <property name="d9_sync">432Hz</property>
  </producer>
</mlt>`}
              </pre>
            </div>
          </div>
        );

      case 'jumble':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-xl">🎲</div>
              <div>
                <h2 className="text-xl font-bold text-white">Jumble Forge</h2>
                <p className="text-xs text-slate-400">Randomized clip permutator for creating high-energy surf reel teasers.</p>
              </div>
            </div>
            <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-xs text-slate-300">Click below to generate a randomized sequence of 5-second wave cuts.</p>
              <button 
                onClick={() => alert("Jumble Sequence Generated: [Clip #3, Clip #1, Clip #8, Clip #2, Clip #5]")} 
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-black font-black text-xs hover:brightness-110"
              >
                🎲 Roll Jumble Cut Sequence
              </button>
            </div>
          </div>
        );

      case 'renders':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xl">🎬</div>
              <div>
                <h2 className="text-xl font-bold text-white">Render Archive</h2>
                <p className="text-xs text-slate-400">Completed 4K exports and historical Fluid Motion TV weekly releases.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[10px] text-emerald-400 font-mono font-bold">EXPORT #2026-08</span>
                <h4 className="text-sm font-bold text-white">Sunset Beach Winter Solstice Lefts</h4>
                <p className="text-xs text-slate-400">4K UHD 60FPS • 12:40 Min • Rendered in 4m 12s</p>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[10px] text-emerald-400 font-mono font-bold">EXPORT #2026-07</span>
                <h4 className="text-sm font-bold text-white">Port Waikato Bar Crossing Heavy Swell</h4>
                <p className="text-xs text-slate-400">4K UHD 60FPS • 08:15 Min • Rendered in 2m 45s</p>
              </div>
            </div>
          </div>
        );

      case 'tide':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-xl">🌊</div>
              <div>
                <h2 className="text-xl font-bold text-white">Tide Synth & Acoustic Generator</h2>
                <p className="text-xs text-slate-400">Generative ocean wave drone synthesizer tuned to 432Hz and 528Hz harmonics.</p>
              </div>
            </div>
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400">Resonance Frequency: {tideFrequency} Hz</span>
                <span className="text-slate-400">Phase: Low Slack Water Harmonic</span>
              </div>
              <input
                type="range"
                min="400"
                max="528"
                value={tideFrequency}
                onChange={(e) => setTideFrequency(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>400 Hz (Deep Earth)</span>
                <span>432 Hz (Sacred Geometry)</span>
                <span>528 Hz (Miracle Transformation)</span>
              </div>
            </div>
          </div>
        );

      case 'voice':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center text-xl">🎭</div>
              <div>
                <h2 className="text-xl font-bold text-white">Avatar Voice Forge</h2>
                <p className="text-xs text-slate-400">Bilingual Te Reo Māori / English voice generator for local surf announcements.</p>
              </div>
            </div>
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <p className="text-xs text-slate-300">Te Kahuna Voice Model initialized for Port Waikato Club alerts.</p>
              <button onClick={() => alert("Playing Te Kahuna Voice Sample: 'Kia ora e te whānau! Sunset Beach is 6ft and firing!'")} className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-bold text-xs">
                🔊 Play Voice Sample
              </button>
            </div>
          </div>
        );

      case 'mesh':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-xl">🕸️</div>
              <div>
                <h2 className="text-xl font-bold text-white">Sovereign ISP Mesh Topology</h2>
                <p className="text-xs text-slate-400">P2P decentralized network nodes connecting Sunset Beach, Port Waikato, and Raglan.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-cyan-500/30 space-y-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block mr-2 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white">Node 01: Sunset Beach Tower</span>
                <p className="text-[11px] text-slate-400">Lat: -37.382 | Bandwidth: 1.2 Gbps Mesh</p>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-cyan-500/30 space-y-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block mr-2 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white">Node 02: River Spit Recon</span>
                <p className="text-[11px] text-slate-400">Lat: -37.388 | Bandwidth: 800 Mbps Mesh</p>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-cyan-500/30 space-y-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block mr-2 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white">Node 03: D9 Anchor Station</span>
                <p className="text-[11px] text-slate-400">Lat: -37.391 | Bandwidth: 2.4 Gbps Mesh</p>
              </div>
            </div>
          </div>
        );

      case 'ledger':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-xl">📜</div>
              <div>
                <h2 className="text-xl font-bold text-white">Harmony Notes & Immutable Ledger</h2>
                <p className="text-xs text-slate-400">Verified club competition scores, heat results, and dune planting logs.</p>
              </div>
            </div>
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
              <div className="p-3 bg-[#0B0E14] rounded-xl flex justify-between items-center border border-slate-800">
                <div>
                  <span className="text-amber-400 font-bold block">HEAT #2026-FINAL-WINTER</span>
                  <span className="text-slate-400 text-[11px]">Rawiri Kahu vs Tāne Roa</span>
                </div>
                <span className="text-emerald-400 font-bold">18.45 pts (VERIFIED)</span>
              </div>
            </div>
          </div>
        );

      case 'walkie':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center text-xl">📻</div>
              <div>
                <h2 className="text-xl font-bold text-white">P2P Coastal Walkie Talkie</h2>
                <p className="text-xs text-slate-400">Direct audio channel for surfers in the lineup, Coastguard, and water patrol.</p>
              </div>
            </div>
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-4">
              <button
                onClick={() => setWalkieActive(!walkieActive)}
                className={`w-24 h-24 rounded-full border-4 flex items-center justify-center text-2xl font-bold transition-all shadow-xl ${
                  walkieActive
                    ? 'bg-red-600 border-red-400 text-white animate-pulse shadow-red-500/50'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {walkieActive ? 'LIVE' : 'PUSH'}
              </button>
              <p className="text-xs font-mono text-slate-300">
                {walkieActive ? 'Broadcasting on Channel 16 (Port Waikato Lineup)...' : 'Hold to speak to local water patrol'}
              </p>
            </div>
          </div>
        );

      case 'gemini':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-xl">🧠</div>
              <div>
                <h2 className="text-xl font-bold text-white">Mesh Intelligence & Te Kahuna AI</h2>
                <p className="text-xs text-slate-400">AI reasoning model for swell predictions, wave mechanics, and Te Reo Māori translations.</p>
              </div>
            </div>
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Te Kahuna AI is connected to the Dragon9 Mesh engine. Ask questions regarding Sunset Beach bar safety, ideal board dimensions, or local history.
              </p>
              <button onClick={onOpenAI} className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:brightness-110">
                Launch Te Kahuna AI Assistant
              </button>
            </div>
          </div>
        );

      case 'terminal':
      case 'schema':
      case 'table':
      case 'jq':
      case 'health':
        return (
          <div className="space-y-6 font-mono">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700 flex items-center justify-center text-xl">💻</div>
              <div>
                <h2 className="text-xl font-bold text-white uppercase">Legacy Console: {activeTab}</h2>
                <p className="text-xs text-slate-400">Direct mesh diagnostic CLI & schema inspector.</p>
              </div>
            </div>

            <div className="bg-[#06080D] p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
              <div className="space-y-1 text-slate-400 h-48 overflow-y-auto no-scrollbar font-mono">
                {terminalLogs.map((log, index) => (
                  <p key={index} className={log.startsWith('>') ? 'text-cyan-400 font-bold' : log.startsWith('STATUS') ? 'text-emerald-400' : ''}>
                    {log}
                  </p>
                ))}
              </div>

              <form onSubmit={handleCommand} className="flex gap-2 border-t border-slate-800 pt-3">
                <span className="text-cyan-400 font-bold">$</span>
                <input
                  type="text"
                  placeholder="Enter mesh command (e.g., status, ping, query)..."
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent text-white focus:outline-none text-xs font-mono"
                />
                <button type="submit" className="px-3 py-1 rounded bg-slate-800 text-slate-200 hover:text-white font-bold">
                  Run
                </button>
              </form>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-8 text-center text-slate-400">
            Select a module from the navbar above.
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
};
