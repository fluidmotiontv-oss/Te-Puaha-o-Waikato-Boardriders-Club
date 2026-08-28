import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Waves, Wind, Compass, ArrowRight, ShieldCheck, Play, Pause, Radio, HeartHandshake } from 'lucide-react';
import { ClubTab } from './ClubNav';
import { MetServiceData } from './SurfForecastTab';
import { SurfWeatherWidget } from './SurfWeatherWidget';
import { AlertBanner } from './AlertBanner';

import tekahunaImg from '../assets/images/tekahuna_avatar_1786363378977.jpg';
import rawiriImg from '../assets/images/rawiri_avatar_1786363393568.jpg';

interface ClubWelcomeAvatarsProps {
  onNavigateTab?: (tab: ClubTab) => void;
  surfData?: MetServiceData | null;
}

export const ClubWelcomeAvatars: React.FC<ClubWelcomeAvatarsProps> = ({ onNavigateTab, surfData }) => {
  const [speakingAvatar, setSpeakingAvatar] = useState<'tekahuna' | 'rawiri' | null>(null);

  // Time of day greeting calculation
  const currentHour = new Date().getHours();
  const timeOfDayGreeting = currentHour < 12 ? 'Good Morning' : currentHour < 17 ? 'Good Afternoon' : 'Good Evening';

  const tekahunaText = "Kia ora e te whānau! Welcome to Te Puaha o Waikato Boardriders. I am Te Kahuna, your AI Ocean Kaihautū. Right now at Sunset Beach, swell is sitting clean at 2.2 meters at 14 seconds with groomed 12 knot offshore winds. Caution on the river mouth bar during ebb tide!";
  const rawiriText = "G'day crew! Rawiri Henare here, Te Puaha Club Captain. Welcome to the clubrooms! Sunset Beach main peak is firing today with clean left-handers. The ideal surfing window is from 10am to 2pm on the incoming tide. See you out in the lineup!";

  const speakText = (avatar: 'tekahuna' | 'rawiri', text: string) => {
    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    if (speakingAvatar === avatar) {
      window.speechSynthesis.cancel();
      setSpeakingAvatar(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = avatar === 'tekahuna' ? 0.95 : 1.0;
    utterance.pitch = avatar === 'tekahuna' ? 1.05 : 0.95;

    utterance.onend = () => setSpeakingAvatar(null);
    utterance.onerror = () => setSpeakingAvatar(null);

    setSpeakingAvatar(avatar);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              {timeOfDayGreeting} &bull; Kia Ora!
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Hub Active
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white font-mono tracking-tight mt-1">
            Sunset Beach Boardrider Welcome
          </h2>
          <p className="text-slate-300 text-xs font-mono mt-0.5">
            Your coastal command portal for live MetService surf forecasts, river bar telemetry & boardrider community.
          </p>
        </div>

        {/* Quick Surf Badge Summary */}
        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800 text-xs font-mono shrink-0">
          <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
            <Waves className="w-4 h-4" />
            <span>2.2m @ 14s</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
            <Wind className="w-4 h-4" />
            <span>12kts ENE (Offshore)</span>
          </div>
          <span className="text-slate-700">|</span>
          <span className="text-amber-400 font-bold">Clean Lefts</span>
        </div>
      </div>

      {/* Daily Surf Conditions Outlook Banner */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-slate-950 to-amber-950/40 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white">Daily Surf Outlook: </span>
            <span className="text-slate-300">
              Optimal surf window today is <span className="text-cyan-300 font-bold">10:00 AM – 2:00 PM (Incoming High Tide)</span> with 2.2m clean swell and 12kt ENE offshores.
            </span>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab && onNavigateTab('surf')}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold shrink-0 border border-slate-700 flex items-center gap-1.5 transition-all"
        >
          <span>MetService Live Radar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Critical Marine Weather Warning Banner */}
      <div className="relative z-10">
        <AlertBanner surfData={surfData} onNavigateTab={onNavigateTab} />
      </div>

      {/* Hero Live Surf Weather Widget */}
      <div className="relative z-10">
        <SurfWeatherWidget data={surfData} onNavigateTab={onNavigateTab} />
      </div>

      {/* Avatar Hosts Section Header */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 relative z-10">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-black text-white font-mono uppercase tracking-wider">
            Club Host Avatars & Audio Commentary
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">Click audio buttons to play speech</span>
      </div>

      {/* Two Avatars Grid (Placed at the bottom of the welcome section) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Avatar 1: Te Kahuna AI */}
        <div className="bg-slate-950/80 p-5 rounded-3xl border border-cyan-500/30 space-y-4 hover:border-cyan-500/60 transition-all flex flex-col justify-between shadow-lg relative group">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src={tekahunaImg}
                  alt="Te Kahuna AI Avatar"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 border-2 border-slate-950 flex items-center justify-center text-[10px]">
                  🤖
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-white font-mono">Te Kahuna AI</h3>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[9px] font-mono font-bold">
                    AI Ocean Kaihautū
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">Te Puaha Coastal Intelligence & Bar Radar</p>
              </div>
            </div>

            {/* Speech Bubble */}
            <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans relative">
              <div className="absolute -top-2 left-6 w-3 h-3 bg-slate-900 rotate-45 border-t border-l border-slate-800" />
              <p className="italic">
                "Kia ora! Sunset Beach is sitting clean today with <strong>2.2m WSW groundswell</strong>. Wind vectors are ideal at 12 knots ENE offshore. Watch the river mouth ebb tide current!"
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
            <button
              onClick={() => speakText('tekahuna', tekahunaText)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                speakingAvatar === 'tekahuna'
                  ? 'bg-cyan-500 text-slate-950 animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
              }`}
            >
              {speakingAvatar === 'tekahuna' ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{speakingAvatar === 'tekahuna' ? 'Stop Audio' : 'Listen to Te Kahuna'}</span>
            </button>

            <button
              onClick={() => onNavigateTab && onNavigateTab('surf')}
              className="text-xs font-mono font-bold text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <span>Full Forecast</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Avatar 2: Rawiri Henare */}
        <div className="bg-slate-950/80 p-5 rounded-3xl border border-amber-500/30 space-y-4 hover:border-amber-500/60 transition-all flex flex-col justify-between shadow-lg relative group">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src={rawiriImg}
                  alt="Rawiri Henare Avatar"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 border-2 border-slate-950 flex items-center justify-center text-[10px]">
                  🏄‍♂️
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-white font-mono">Rawiri Henare</h3>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-mono font-bold">
                    Club Captain
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">Te Puaha Boardriders Local Legend</p>
              </div>
            </div>

            {/* Speech Bubble */}
            <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans relative">
              <div className="absolute -top-2 left-6 w-3 h-3 bg-slate-900 rotate-45 border-t border-l border-slate-800" />
              <p className="italic">
                "Chur crew! Main peak is peeling clean past the rocks. Best surf window is <strong>10:00 AM – 2:00 PM</strong> on the incoming tide. Pop into the clubroom for a hot coffee after!"
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
            <button
              onClick={() => speakText('rawiri', rawiriText)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                speakingAvatar === 'rawiri'
                  ? 'bg-amber-500 text-slate-950 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
              }`}
            >
              {speakingAvatar === 'rawiri' ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{speakingAvatar === 'rawiri' ? 'Stop Audio' : 'Listen to Captain Rawiri'}</span>
            </button>

            <button
              onClick={() => onNavigateTab && onNavigateTab('chat')}
              className="text-xs font-mono font-bold text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <span>Join Club Chat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Brief Surf Conditions Outlook Banner */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-slate-950 to-amber-950/40 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white">Daily Surf Outlook: </span>
            <span className="text-slate-300">
              Optimal surf window today is <span className="text-cyan-300 font-bold">10:00 AM – 2:00 PM (Incoming High Tide)</span> with 2.2m clean swell and 12kt ENE offshores.
            </span>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab && onNavigateTab('surf')}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold shrink-0 border border-slate-700 flex items-center gap-1.5 transition-all"
        >
          <span>MetService Live Radar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default ClubWelcomeAvatars;
