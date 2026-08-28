import React, { useState, useEffect } from "react";
import { LanguageMode } from "../../types";
import { Tv, Play, Pause, Volume2, Radio, Sparkles, Sliders, ExternalLink, RefreshCw, Zap } from "lucide-react";

interface FluidChannelTabProps {
  lang: LanguageMode;
}

export const FluidChannelTab: React.FC<FluidChannelTabProps> = ({ lang }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedStream, setSelectedStream] = useState<"sunset" | "d9harmonics" | "archives" | "raw">("sunset");
  const [activeStem, setActiveStem] = useState<string>("432Hz Sub Harmonic");
  const [d9Minute, setD9Minute] = useState(38);
  const [d9Second, setD9Second] = useState(14);
  const [visualizerSpeed, setVisualizerSpeed] = useState<number>(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setD9Second((prev) => {
        if (prev >= 59) {
          setD9Minute((m) => (m >= 53 ? 0 : m + 1));
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const streams = [
    {
      id: "sunset",
      title: "Sunset Beach 4K Live Wave Cam & Bar Stream",
      quality: "4K UHD 60FPS",
      location: "Port Waikato River Spit Point",
      viewers: 284,
      thumbnail: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1000&auto=format&fit=crop&q=80",
      description: "Live 4K feed of the left-hand point break peeling off the Sunset Beach sandbar with real-time river outflow telemetries."
    },
    {
      id: "d9harmonics",
      title: "Dragon 9 Dedicated Anchor Stream (54-Min Cycle)",
      quality: "HI-RES 96kHz AUDIO",
      location: "Fluid Motion D9 Frequency Engine",
      viewers: 512,
      thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=80",
      description: "Mathematical 54-minute hour temporal soundscape designed for deep focus, flow state surfing, and sacred ocean resonance."
    },
    {
      id: "archives",
      title: "Fluid Motion Vault: Heavy West Coast Winter Bombs",
      quality: "1080p RAW",
      location: "Sunset Beach Main Peak Archives",
      viewers: 195,
      thumbnail: "https://images.unsplash.com/photo-1455729552865-3658a5d3a092?w=1000&auto=format&fit=crop&q=80",
      description: "Curated 30-minute edit reel of Rawiri Kahu, Kaia Henderson, and local legends charging 8-12ft West Coast barrels."
    },
    {
      id: "raw",
      title: "D9 Geometric Wave Visualizer & Drone Angles",
      quality: "RAW DRONE 4K",
      location: "River Mouth Air Recon",
      viewers: 140,
      thumbnail: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1000&auto=format&fit=crop&q=80",
      description: "Geometric fluid dynamics mapped over raw drone footage showing sandbar movement, rip currents, and wave diffraction patterns."
    }
  ];

  const currentStreamInfo = streams.find((s) => s.id === selectedStream) || streams[0];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A2540] via-[#0B0E14] to-[#1a0525] border-2 border-[#FF007F]/40 p-6 sm:p-8 shadow-[0_0_35px_rgba(255,0,127,0.25)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF007F]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF007F]/20 border border-[#FF007F]/50 text-[#FF007F] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#FF007F] animate-spin" />
              {lang === "reo" ? "Wānanga Dragon 9 Anchor" : "Fluid Motion D9 Dedicated Stream"}
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {lang === "reo" ? "Puaha o Waikato D9 Channel" : "World's First Dedicated Fluid Motion Dragon 9 Anchor Channel"}
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              {lang === "reo"
                ? "He rerenga ataata me ngā reo pūoro 54-mīiniti mo ngā eke ngaru o Port Waikato me ngā rārangi pūoro hōhonu."
                : "Continuous high-octane 4K surf stream integrated with the 54-minute hour Dragon 9 temporal cycle, live wave stems, and geometric fluid visualizer."}
            </p>
          </div>

          {/* D9 Clock Status Box */}
          <div className="bg-[#0B0E14]/90 border border-[#FF007F]/60 rounded-2xl p-4 shadow-xl text-right font-mono min-w-[220px]">
            <div className="text-[10px] text-[#FF007F] uppercase tracking-widest font-bold flex items-center justify-end gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#FF007F] animate-pulse" />
              DRAGON 9 ANCHOR SYNC
            </div>
            <div className="text-3xl font-black text-white my-1 tracking-wider">
              {d9Minute.toString().padStart(2, "0")}:{d9Second.toString().padStart(2, "0")} <span className="text-xs text-[#FF007F]">/ 54:00</span>
            </div>
            <div className="text-[10px] text-amber-400 font-bold">
              Midday/Midnight Harmonics 432Hz
            </div>
          </div>
        </div>
      </div>

      {/* Main Stream Player & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Video Viewport & Stem Mixer */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Stream Video Player Container */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#00F0FF]/40 bg-[#06080D] shadow-2xl group">
            
            {/* Visual Stream Frame Image / Canvas Simulation */}
            <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={currentStreamInfo.thumbnail}
                alt={currentStreamInfo.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? "scale-105 filter brightness-105" : "filter brightness-50"}`}
              />

              {/* Dynamic Geometric Visualizer Overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full opacity-30 animate-pulse" viewBox="0 0 400 200">
                  <path d="M 0 100 Q 100 20, 200 100 T 400 100" fill="none" stroke="#00F0FF" strokeWidth="2" />
                  <path d="M 0 100 Q 100 180, 200 100 T 400 100" fill="none" stroke="#FF007F" strokeWidth="2" />
                  <polygon points="200,40 250,160 150,160" fill="none" stroke="#FF9E00" strokeWidth="1.5" />
                  <circle cx="200" cy="100" r="45" fill="none" stroke="#00F0FF" strokeWidth="1" strokeDasharray="5,5" />
                </svg>
              </div>

              {/* Stream Overlay HUD Info */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white font-mono font-black text-xs uppercase flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  LIVE D9 STREAM
                </span>
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                  {currentStreamInfo.quality}
                </span>
              </div>

              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                👥 {currentStreamInfo.viewers} Viewers
              </div>

              {/* Center Play/Pause Overlay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="relative z-10 w-20 h-20 rounded-full bg-[#FF007F]/80 backdrop-blur-md border-2 border-white flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,0,127,0.8)] hover:scale-110 transition-transform cursor-pointer"
              >
                {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
              </button>

              {/* Bottom Video Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex items-center justify-between text-white font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-[#00F0FF] font-bold">📍 {currentStreamInfo.location}</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-amber-400">D9 Harmonic Rate: {(432 * visualizerSpeed).toFixed(1)}Hz</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>Fluid Motion TV</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Stream Title & Description */}
            <div className="p-5 bg-[#0B0E14] space-y-2">
              <h3 className="text-xl font-bold text-white">{currentStreamInfo.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{currentStreamInfo.description}</p>
            </div>
          </div>

          {/* D9 Audio Stem Triggers & Soundscape Panel */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#FF007F]" />
                Dragon 9 Audio Stems & Resonant Frequencies
              </h4>
              <span className="text-xs text-[#00F0FF] font-mono">Web Audio Synthesizer Engine</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "432Hz Sub Harmonic", hz: "432 Hz", desc: "Deep Ocean Grounding" },
                { name: "528Hz Solfeggio Flow", hz: "528 Hz", desc: "Transformation & Flow" },
                { name: "West Coast Surf Rumble", hz: "Ambient", desc: "Sunset Sandbar White Noise" },
                { name: "Kowhaiwhai Rhythm", hz: "7.83 Hz", desc: "Schumann Earth Resonance" }
              ].map((stem) => (
                <button
                  key={stem.name}
                  onClick={() => setActiveStem(stem.name)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeStem === stem.name
                      ? "bg-[#FF007F]/20 border-[#FF007F] text-white shadow-[0_0_15px_rgba(255,0,127,0.3)]"
                      : "bg-[#0B0E14] border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Volume2 className={`w-4 h-4 ${activeStem === stem.name ? "text-[#FF007F]" : "text-slate-500"}`} />
                    <span className="text-[10px] font-mono font-bold text-[#00F0FF]">{stem.hz}</span>
                  </div>
                  <p className="text-xs font-bold mt-2 text-white">{stem.name}</p>
                  <p className="text-[10px] text-slate-400">{stem.desc}</p>
                </button>
              ))}
            </div>

            {/* Visualizer Speed Controls */}
            <div className="flex items-center justify-between bg-[#0B0E14] p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <Zap className="w-4 h-4 text-amber-400" />
                D9 Visualizer Harmonic Multiplier:
              </span>
              <div className="flex items-center gap-2">
                {[0.5, 1, 1.5, 2].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setVisualizerSpeed(speed)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                      visualizerSpeed === speed
                        ? "bg-[#00F0FF] text-[#0B0E14]"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Preset Stream Switcher & Live Chat Feed */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Preset Streams List */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
              <Tv className="w-4 h-4 text-[#00F0FF]" />
              Select Live Stream Channel
            </h4>

            <div className="space-y-3">
              {streams.map((stream) => (
                <button
                  key={stream.id}
                  onClick={() => setSelectedStream(stream.id as any)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex gap-3 ${
                    selectedStream === stream.id
                      ? "bg-[#0A2540] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                      : "bg-[#0B0E14] border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-20 h-14 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white line-clamp-2 leading-snug">{stream.title}</p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span className="text-emerald-400">{stream.quality}</span>
                      <span>•</span>
                      <span className="text-[#00F0FF]">{stream.viewers} watching</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* D9 Stream Live Chat Simulation */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4 flex flex-col h-[320px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#FF007F]" />
                D9 Stream Chat
              </h4>
              <span className="text-[10px] text-emerald-400 font-mono">Live</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs font-sans no-scrollbar">
              <div className="bg-[#0B0E14] p-2.5 rounded-xl border border-slate-800">
                <p className="font-bold text-[#00F0FF]">Rawiri Kahu <span className="text-[10px] text-slate-500 font-mono">11:02</span></p>
                <p className="text-slate-300">Left point sandbar is firing right now! 4ft glassy sets.</p>
              </div>
              <div className="bg-[#0B0E14] p-2.5 rounded-xl border border-slate-800">
                <p className="font-bold text-[#FF9E00]">Kaia Henderson <span className="text-[10px] text-slate-500 font-mono">11:04</span></p>
                <p className="text-slate-300">The 432Hz stem sounds mean through the boat speakers bro!</p>
              </div>
              <div className="bg-[#0B0E14] p-2.5 rounded-xl border border-slate-800">
                <p className="font-bold text-[#FF007F]">Fluid Motion Filmer <span className="text-[10px] text-slate-500 font-mono">11:05</span></p>
                <p className="text-slate-300">Drone 4K stream synced up with D9 minute 38!</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder="Send message to crew..."
                className="flex-1 bg-[#0B0E14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF007F]"
              />
              <button className="px-3 py-2 rounded-xl bg-[#FF007F] text-white font-bold text-xs hover:bg-pink-600 transition-colors">
                Send
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
