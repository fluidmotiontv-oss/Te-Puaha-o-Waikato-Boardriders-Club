import React, { useState, useEffect } from "react";
import { LanguageMode, BarStatusType, SurfReportData, TabType } from "../types";
import { KowhaiwhaiPattern } from "./KowhaiwhaiPattern";
import { toggleAmbientOceanSound, playStokeSound } from "../lib/audioUtils";
import { 
  Volume2, VolumeX, ShieldCheck, AlertTriangle, Flame, Compass, Radio, 
  Users, Sparkles, Navigation, Tv, Lock, Upload, HeartHandshake, BookOpen, Calendar
} from "lucide-react";
import confetti from "canvas-confetti";

interface HeaderProps {
  lang: LanguageMode;
  setLang: (lang: LanguageMode) => void;
  report: SurfReportData;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenKahuna: () => void;
  onOpenLogger: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  report,
  activeTab,
  setActiveTab,
  onOpenKahuna,
  onOpenLogger
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Dragon 9 54-Minute Hour Cycle Simulator
  const [d9Minute, setD9Minute] = useState(38);
  const [d9Second, setD9Second] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setD9Second((prevSec) => {
        if (prevSec >= 59) {
          setD9Minute((prevMin) => (prevMin >= 53 ? 0 : prevMin + 1));
          return 0;
        }
        return prevSec + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLanguageToggle = (newLang: LanguageMode) => {
    setLang(newLang);
    playStokeSound();
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.1 },
      colors: ["#00F0FF", "#FF9E00", "#FF007F"]
    });
  };

  const handleAudioToggle = () => {
    const playing = toggleAmbientOceanSound();
    setIsAudioPlaying(playing);
  };

  const getBarBadge = (status: BarStatusType) => {
    switch (status) {
      case "SAFE_TO_CROSS":
        return {
          text: lang === "reo" ? "BAR: SAFE TO CROSS (KUA MARIE)" : "BAR STATUS: SAFE TO CROSS",
          bgColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50",
          dotColor: "bg-emerald-400 animate-pulse",
          icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />
        };
      case "CAUTION_REQUIRED":
        return {
          text: lang === "reo" ? "BAR: KIA TŪPATO (CAUTION)" : "BAR STATUS: CAUTION REQUIRED",
          bgColor: "bg-amber-500/20 text-amber-300 border-amber-500/50",
          dotColor: "bg-amber-400 animate-ping",
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />
        };
      default:
        return {
          text: lang === "reo" ? "BAR: DANGER (HEAVY SWELL)" : "BAR STATUS: CLOSED - DANGER",
          bgColor: "bg-red-500/20 text-red-300 border-red-500/50",
          dotColor: "bg-red-500 animate-bounce",
          icon: <AlertTriangle className="w-4 h-4 text-red-400" />
        };
    }
  };

  const barBadgeInfo = getBarBadge(report.barStatus);

  return (
    <header className="relative w-full bg-[#0B0E14] border-b border-[#00F0FF]/20 text-white overflow-hidden">
      {/* Top Cyber-Kowhaiwhai Border Accent */}
      <KowhaiwhaiPattern color="#00F0FF" height={16} className="opacity-90" />

      {/* Dragon 9 Temporal Cycle Bar */}
      <div className="w-full bg-[#06080D] border-b border-[#FF007F]/30 px-4 py-1.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-300">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("channel")}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FF007F]/20 text-[#FF007F] border border-[#FF007F]/50 font-bold hover:bg-[#FF007F]/40 transition-colors shadow-[0_0_10px_rgba(255,0,127,0.3)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF007F] animate-ping" />
            <span>DRAGON 9 ANCHOR: SYNCED</span>
          </button>
          
          <span className="hidden sm:inline text-slate-400">
            Cycle: <strong className="text-white">{d9Minute.toString().padStart(2, "0")}:{d9Second.toString().padStart(2, "0")} / 54:00</strong> (54-Min Hour)
          </span>

          <span className="hidden lg:inline text-[#FF9E00]">
            Apex State: <strong className="text-white">Midday-Midnight Harmonic Wave</strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span className="italic text-cyan-300 font-sans hidden md:inline">
            "Kia Maia ki ngā Ngaru — Ride with Power & Respect"
          </span>
          <span className="text-[#FF9E00] font-black hidden xl:inline">
            "Full Noise on the Point!"
          </span>
        </div>
      </div>

      {/* Main Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Club Name */}
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => setActiveTab("report")}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#0B0E14] border-2 border-[#00F0FF] flex items-center justify-center p-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
                {/* SVG Surfboard & Waikato Wave icon */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M20 70 Q 50 30, 80 70 Q 50 85, 20 70 Z" fill="#00F0FF" opacity="0.25" />
                  <path d="M10 80 Q 50 45, 90 80" stroke="#00F0FF" strokeWidth="4" fill="none" />
                  <path d="M50 10 C 65 35, 65 75, 50 90 C 35 75, 35 35, 50 10 Z" fill="none" stroke="#FF9E00" strokeWidth="3" />
                  <circle cx="50" cy="50" r="5" fill="#FF007F" />
                </svg>
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FF007F] rounded-full border-2 border-[#0B0E14] animate-ping" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-widest bg-[#FF9E00]/15 text-[#FF9E00] border border-[#FF9E00]/30 rounded-md">
                  Port Waikato • Sunset Beach
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Radio className="w-3 h-3 text-[#00F0FF] animate-pulse" />
                  {report.lastUpdatedTime}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider bg-gradient-to-r from-white via-cyan-100 to-[#00F0FF] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,240,255,0.2)]">
                Te Puaha o Waikato <span className="text-[#FF9E00]">Boardriders</span>
              </h1>
            </div>
          </div>

          {/* Right Header Controls: Bar Badge, Ambient Sound, Language Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Live Bar Status Badge */}
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border font-mono text-xs font-bold shadow-lg ${barBadgeInfo.bgColor}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${barBadgeInfo.dotColor}`} />
              {barBadgeInfo.icon}
              <span>{barBadgeInfo.text}</span>
            </div>

            {/* Sound Synthesizer Toggle */}
            <button
              onClick={handleAudioToggle}
              title="Toggle Web Audio Ambient Surf Sound"
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
                isAudioPlaying
                  ? "bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  : "bg-slate-900/60 text-slate-400 border-slate-700 hover:text-white"
              }`}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 text-[#00F0FF] animate-bounce" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{isAudioPlaying ? "Surf Ambient ON" : "Surf Sound"}</span>
            </button>

            {/* Language Switcher */}
            <div className="bg-slate-900/80 p-1 rounded-xl border border-slate-800 flex items-center">
              <button
                onClick={() => handleLanguageToggle("reo")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  lang === "reo"
                    ? "bg-gradient-to-r from-[#0A2540] to-[#00F0FF]/30 text-[#00F0FF] border border-[#00F0FF]/50 shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Te Reo Māori
              </button>
              <button
                onClick={() => handleLanguageToggle("en")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  lang === "en"
                    ? "bg-gradient-to-r from-[#0A2540] to-[#FF9E00]/30 text-[#FF9E00] border border-[#FF9E00]/50 shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                English / Kiwi
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-0">
        <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-800 pb-2">
          
          <button
            onClick={() => setActiveTab("channel")}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "channel"
                ? "bg-[#FF007F] text-white shadow-[0_0_15px_rgba(255,0,127,0.5)] border border-pink-400"
                : "bg-slate-900/80 text-[#FF007F] border border-[#FF007F]/30 hover:bg-[#FF007F]/20"
            }`}
          >
            <Tv className="w-4 h-4 text-[#FF007F]" />
            <span>📺 FLUID MOTION D9</span>
          </button>

          <button
            onClick={() => setActiveTab("sanctuary")}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "sanctuary"
                ? "bg-[#00F0FF] text-[#0B0E14] shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Lock className="w-4 h-4 text-[#FF9E00]" />
            <span>🔒 VIP SANCTUARY</span>
          </button>

          <button
            onClick={() => setActiveTab("upload")}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "upload"
                ? "bg-[#00F0FF] text-[#0B0E14] shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>📹 UPLOAD FOOTAGE</span>
          </button>

          <button
            onClick={() => setActiveTab("report")}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "report"
                ? "bg-[#00F0FF] text-[#0B0E14] shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Compass className="w-4 h-4 text-cyan-300" />
            <span>🌊 SURF & BAR REPORT</span>
          </button>

          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "leaderboard"
                ? "bg-[#00F0FF] text-[#0B0E14] shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Users className="w-4 h-4 text-[#FF9E00]" />
            <span>🏆 CLUB LADDER</span>
          </button>

          <button
            onClick={() => setActiveTab("quiver")}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "quiver"
                ? "bg-[#00F0FF] text-[#0B0E14] shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>🏄 QUIVER CODEX</span>
          </button>

          <button
            onClick={() => setActiveTab("sponsors")}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "sponsors"
                ? "bg-[#00F0FF] text-[#0B0E14] shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span>🤝 SPONSORS</span>
          </button>

          <button
            onClick={() => setActiveTab("kaupapa")}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "kaupapa"
                ? "bg-[#00F0FF] text-[#0B0E14] shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-300" />
            <span>🌿 KAUPAPA</span>
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "history"
                ? "bg-[#00F0FF] text-[#0B0E14] shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Calendar className="w-4 h-4 text-[#FF9E00]" />
            <span>📖 LOGBOOK</span>
          </button>

        </nav>
      </div>

    </header>
  );
};

