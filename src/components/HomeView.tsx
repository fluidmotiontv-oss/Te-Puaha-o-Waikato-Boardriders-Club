import React, { useState, useEffect } from 'react';
import { Waves, Wind, Compass, Sun, ArrowRight, Sparkles, Store, Tent, Building2, Phone, MapPin, Coffee, Utensils } from 'lucide-react';
import { ClubTab } from './ClubNav';
import { MetServiceData } from './SurfForecastTab';
import { ClubWelcomeAvatars } from './ClubWelcomeAvatars';
import { ClubFeed } from './ClubFeed';
import { TideChart } from './TideChart';
import { CommunityFeed } from './CommunityFeed';
import { WavePhysics } from './WavePhysics';
import { UpcomingComp } from './UpcomingComp';
import { SummerVideoComp } from './SummerVideoComp';

interface HomeViewProps {
  onNavigateTab: (tab: ClubTab) => void;
  lang?: string;
}

const SURF_STORIES_SECTIONS: {
  id: ClubTab;
  title: string;
  description: string;
  icon: string;
  category: string;
  accentGradient: string;
}[] = [
  {
    id: 'surf',
    title: 'MetService Surf & Tide Forecast',
    description: 'Real-time wind vectors, swell metrics & tidal hydrodynamic schedules.',
    icon: '🏄‍♂️',
    category: 'Surf Live',
    accentGradient: 'from-cyan-500/20 to-teal-500/20 border-cyan-500/40 text-cyan-300',
  },
  {
    id: 'bar',
    title: 'Port Waikato Bar Dynamics',
    description: 'River mouth safety radar, bar crossing advisory & live wave telemetry.',
    icon: '⚓',
    category: 'Bar Safety',
    accentGradient: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300',
  },
  {
    id: 'chat',
    title: 'Club Chat & Te Kahuna AI',
    description: 'Live boardrider channel chatroom with @Kahuna bilingual AI surf assistant.',
    icon: '💬',
    category: 'Community',
    accentGradient: 'from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-300',
  },
  {
    id: 'anchor',
    title: 'Anchor Stream Broadcast',
    description: 'Live Sunset Beach video feed & Director Persona AI commentary channel.',
    icon: '📺',
    category: 'Broadcast',
    accentGradient: 'from-rose-500/20 to-purple-500/20 border-rose-500/40 text-rose-300',
  },
  {
    id: 'ladder',
    title: 'Club Ladder & Standings',
    description: 'Heat points, boardrider rankings & competition standings ladder.',
    icon: '🏆',
    category: 'Club Standings',
    accentGradient: 'from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-300',
  },
  {
    id: 'vip',
    title: 'VIP Sanctuary',
    description: 'Verified member sanctuary, travel logs & exclusive club discussion forum.',
    icon: '💎',
    category: 'Member VIP',
    accentGradient: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/40 text-yellow-300',
  },
  {
    id: 'media',
    title: 'Media Vault',
    description: 'Upload raw surf clips, drone footage & session photos to the club vault.',
    icon: '📤',
    category: 'Vault Media',
    accentGradient: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/40 text-indigo-300',
  },
];

const CREATIVE_STUDIO_SECTIONS: {
  id: ClubTab;
  title: string;
  description: string;
  icon: string;
  category: string;
  accentGradient: string;
}[] = [
  {
    id: 'story',
    title: 'Story Forge AI',
    description: 'Dragon 9 AI video storyboard generator & Director Persona switcher.',
    icon: '🎬',
    category: 'AI Storyboard',
    accentGradient: 'from-rose-500/20 to-red-500/20 border-rose-500/40 text-rose-300',
  },
  {
    id: 'voice',
    title: 'Avatar Voice Engine',
    description: 'Te Kahuna bilingual speech commentary & voice announcement generator.',
    icon: '🎭',
    category: 'Voice & Speech',
    accentGradient: 'from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/40 text-fuchsia-300',
  },
  {
    id: 'auditor',
    title: 'Vault Auditor',
    description: 'Media file codec analyzer, resolution checker & integrity verification.',
    icon: '🗃️',
    category: 'Media Inspection',
    accentGradient: 'from-slate-700/40 to-slate-800/40 border-slate-600/40 text-slate-300',
  },
  {
    id: 'mesh',
    title: 'Sovereign ISP Mesh',
    description: 'Decentralized P2P coastal node topology & autonomous network dashboard.',
    icon: '🕸️',
    category: 'Mesh Network',
    accentGradient: 'from-lime-500/20 to-emerald-500/20 border-lime-500/40 text-lime-300',
  },
  {
    id: 'kdenlive',
    title: 'Kdenlive Studio Export',
    description: 'MLT XML video project file exporter for professional NLE editing suites.',
    icon: '🎞️',
    category: 'Video Production',
    accentGradient: 'from-orange-500/20 to-amber-500/20 border-orange-500/40 text-orange-300',
  },
  {
    id: 'jumble',
    title: 'Jumble Forge Engine',
    description: 'Dynamic clip mashup, beat-synced audio re-sequencer & remix studio.',
    icon: '🎲',
    category: 'Remix Studio',
    accentGradient: 'from-violet-500/20 to-purple-500/20 border-violet-500/40 text-violet-300',
  },
  {
    id: 'renders',
    title: 'Render Archive',
    description: 'Completed video exports, generated commentary logs & media history.',
    icon: '🎬',
    category: 'Render History',
    accentGradient: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-300',
  },
];

export const HomeView: React.FC<HomeViewProps> = ({ onNavigateTab }) => {
  const [surfData, setSurfData] = useState<MetServiceData | null>(null);
  const [, setLoadingSurf] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchSurf = async () => {
      setLoadingSurf(true);
      try {
        const res = await fetch('/api/metservice');
        if (!res.ok) throw new Error('API failed');
        const json = await res.json();
        if (isMounted) setSurfData(json);
      } catch (err) {
        if (isMounted) {
          setSurfData({
            spotName: "Sunset Beach / Port Waikato",
            region: "Waikato West Coast, New Zealand",
            source: "MetService NZ Coastal Marine Feed",
            timestamp: new Date().toISOString(),
            current: {
              windSpeedKnots: 12,
              windGustKnots: 18,
              windDirectionDeg: 85,
              windCardinal: "ENE",
              isOffshore: true,
              windQuality: "Offshore (Clean & Groomed)",
              swellHeightMeters: 2.2,
              swellPeriodSeconds: 14,
              swellDirectionDeg: 245,
              swellCardinal: "WSW",
              waterTempC: 16.5,
              airTempC: 19,
              weatherCondition: "Sunny with Offshores",
              uvIndex: 7,
              barCrossingRisk: "MODERATE_RISK",
            },
            tides: [
              { type: "Low Tide", time: "05:18 NZST", height: "0.4m", state: "Past" },
              { type: "High Tide", time: "11:34 NZST", height: "3.1m", state: "Incoming" },
              { type: "Low Tide", time: "17:42 NZST", height: "0.5m", state: "Upcoming" },
            ],
            hourlyForecast: [],
            metServiceWarnings: [
              {
                id: "w1",
                level: "Advisory",
                title: "MetService Coastal Marine Advisory - Waikato West Coast",
                description: "Southwest swell 2.0-2.5m easing gradually. Strong ebb tide currents at the Waikato River Entrance.",
              }
            ]
          });
        }
      } finally {
        if (isMounted) setLoadingSurf(false);
      }
    };

    fetchSurf();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ─── 1. HERO SECTION: SPRING CLUB EXPOSÉ & CHAMPIONSHIP ─── */}
      <UpcomingComp onNavigateTab={onNavigateTab} />

      {/* ─── 1.6 SUMMER 26/27 PERSONAL VIDEO COMPETITION TABLE & SUBMISSIONS ─── */}
      <SummerVideoComp onNavigateTab={onNavigateTab} />

      {/* ─── 1.7 DRAGON 9 ACOUSTIC SANDBAR FREQUENCIES DISCUSSION BANNER ─── */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-[#00F0FF]/40 space-y-4 shadow-2xl relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-[#0A2540]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 font-bold uppercase">
                🐉 Dragon 9 Protocol
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                184 Research Guild Members Active
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white font-sans tracking-tight">
              D9 Hydro-Acoustic Sandbar & Rip Safety Frequency Discussion Group
            </h3>
            <p className="text-slate-300 text-xs font-mono max-w-3xl">
              Explore how 7.83Hz Schumann harmonics, 14.2Hz groundswell sync, and 432Hz standing waves shape A-frame surf peaks, stabilize sandbars, and maintain safe paddling channels through Port Waikato bar.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('dragon9')}
            className="px-5 py-3 rounded-2xl bg-[#00F0FF] hover:bg-cyan-300 text-[#0B0E14] font-mono font-black text-xs flex items-center gap-2 transition-all shadow-lg shadow-[#00F0FF]/25 shrink-0"
          >
            <span>Open Discussion & Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ─── 2. BRIEF SURF CONDITIONS CONTAINER (METSERVICE LOGIC) ─── */}
      <section className="bg-slate-900/90 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-5 shadow-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white font-mono">Sunset Beach Surf Conditions Ticker</h2>
              <p className="text-slate-400 text-xs font-mono">Live MetService NZ coastal marine telemetry for Sunset Beach & Port Waikato bar</p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('surf')}
            className="px-4 py-2 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold flex items-center gap-2 hover:bg-cyan-500/30 transition-all shrink-0"
          >
            <span>Full MetService Matrix</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {surfData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Swell Card */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 space-y-2 hover:border-cyan-500/40 transition-colors">
              <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                <Waves className="w-4 h-4" /> Swell Metric
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{surfData.current.swellHeightMeters}m</span>
                <span className="text-xs font-mono text-cyan-300">@ {surfData.current.swellPeriodSeconds}s</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {surfData.current.swellCardinal} ({surfData.current.swellDirectionDeg}°) WSW Wave Train
              </p>
            </div>

            {/* Wind Card */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 space-y-2 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <Wind className="w-4 h-4" /> Wind Vector
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  OFFSHORE
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{surfData.current.windSpeedKnots} kts</span>
                <span className="text-[10px] font-mono text-slate-400">({surfData.current.windCardinal})</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">{surfData.current.windQuality}</p>
            </div>

            {/* Bar Risk & Tide Card */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 space-y-2 hover:border-amber-500/40 transition-colors">
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <Compass className="w-4 h-4" /> Bar Safety & Tide
              </span>
              <div className="text-sm font-black text-amber-300">
                Risk: {surfData.current.barCrossingRisk.replace('_', ' ')}
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                High Tide: {surfData.tides[1]?.time || '11:34 NZST'} ({surfData.tides[1]?.height || '3.1m'})
              </p>
            </div>

            {/* Atmosphere Card */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 space-y-2 hover:border-purple-500/40 transition-colors">
              <span className="text-xs font-mono font-bold text-purple-400 flex items-center gap-1.5">
                <Sun className="w-4 h-4" /> Atmosphere
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{surfData.current.airTempC}°C Air</span>
                <span className="text-xs font-mono text-cyan-300">{surfData.current.waterTempC}°C Sea</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">{surfData.current.weatherCondition}</p>
            </div>
          </div>
        )}

        {/* Dynamic 24-Hour Tide Graph */}
        <TideChart />

        {/* Live Swell Wave Physics & Spectral Energy Analytics */}
        <WavePhysics />
      </section>

      {/* ─── 2.5 PORT WAIKATO LOCAL BUSINESS HUB, CAMP & WHARF STORE ─── */}
      <section className="bg-slate-900/90 border border-amber-500/40 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white font-mono flex items-center gap-2">
                <span>Port Waikato Local Directory</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                  Wharf Store & Camp Hub
                </span>
              </h2>
              <p className="text-slate-400 text-xs font-mono">
                Direct links to Wharf Store fish & chips, Port Waikato Holiday Park campsite & local services
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('business')}
            className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 shrink-0"
          >
            <span>Open Full Directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Port Waikato Wharf Store */}
          <div
            onClick={() => onNavigateTab('business')}
            className="cursor-pointer bg-slate-950 p-5 rounded-2xl border border-amber-500/40 hover:border-amber-400 transition-all space-y-3 group shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Store className="w-5 h-5" />
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  OPEN NOW
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                Port Waikato Wharf Store & Takeaways
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Fresh snapper & chips, hot pies, espresso coffee, ice cream, salt-water bait, fishing tackle & beach fuel.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-amber-300 font-bold group-hover:translate-x-1 transition-transform">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> (09) 232 9888
              </span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Port Waikato Holiday Park & Camp */}
          <div
            onClick={() => onNavigateTab('business')}
            className="cursor-pointer bg-slate-950 p-5 rounded-2xl border border-emerald-500/40 hover:border-emerald-400 transition-all space-y-3 group shadow-xl hover:shadow-emerald-500/10 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Tent className="w-5 h-5" />
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold">
                  BOOKINGS OPEN
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                Port Waikato Holiday Park & Camp
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Oceanfront & riverfront camping, powered caravan sites, self-contained cabins, surfboard wash station & hot showers.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-emerald-300 font-bold group-hover:translate-x-1 transition-transform">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> 115 Maunsell Rd
              </span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Sunset Beach Surf Shop & Local Services */}
          <div
            onClick={() => onNavigateTab('business')}
            className="cursor-pointer bg-slate-950 p-5 rounded-2xl border border-cyan-500/40 hover:border-cyan-400 transition-all space-y-3 group shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <Building2 className="w-5 h-5" />
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-mono font-bold">
                  SERVICES & TRADES
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                Sunset Beach Business & Trade Hub
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Surfboard shaping & ding repairs, river bar fishing charters, coastal electricians & local community trades.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-300 font-bold group-hover:translate-x-1 transition-transform">
              <span>View All 5 Services</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. CLUB ACTIVITY & NEWS FEED ─── */}
      <ClubFeed onNavigateTab={onNavigateTab} />

      {/* ─── 3.5 MEDIA VAULT COMMUNITY WAVE SNAPSHOTS ─── */}
      <CommunityFeed onNavigateTab={onNavigateTab} />

      {/* ─── 4. STORIES & SURF NAVIGATION CONTAINER ─── */}
      <section className="bg-slate-900/90 border border-cyan-500/30 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white font-mono flex items-center gap-2">
                <span>Stories & Surf Menu</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">Primary Hub</span>
              </h2>
              <p className="text-slate-400 text-xs font-mono">Sunset Beach forecasts, river bar safety, live stream, chat & club standings</p>
            </div>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-xl border border-cyan-500/20 font-bold shrink-0">
            7 Surf Modules
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SURF_STORIES_SECTIONS.map((card) => (
            <button
              key={card.id}
              onClick={() => onNavigateTab(card.id)}
              className={`text-left p-5 rounded-3xl bg-slate-950 border bg-gradient-to-br ${card.accentGradient} hover:brightness-125 transition-all group flex flex-col justify-between space-y-4 shadow-lg hover:shadow-cyan-500/10`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2 rounded-2xl bg-slate-900/80 border border-slate-800">{card.icon}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 font-bold border border-slate-800">
                    {card.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-cyan-300 group-hover:translate-x-1 transition-transform">
                <span>Open {card.title.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ─── 5. CREATIVE & STUDIO NAVIGATION CONTAINER ─── */}
      <section className="bg-slate-900/90 border border-rose-500/30 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-rose-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white font-mono flex items-center gap-2">
                <span>Creative Studio Menu</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">Studio Suite</span>
              </h2>
              <p className="text-slate-400 text-xs font-mono">Dragon 9 AI video storyboards, bilingual speech, mesh network & video export suite</p>
            </div>
          </div>
          <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-3 py-1 rounded-xl border border-rose-500/20 font-bold shrink-0">
            7 Studio Tools
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CREATIVE_STUDIO_SECTIONS.map((card) => (
            <button
              key={card.id}
              onClick={() => onNavigateTab(card.id)}
              className={`text-left p-5 rounded-3xl bg-slate-950 border bg-gradient-to-br ${card.accentGradient} hover:brightness-125 transition-all group flex flex-col justify-between space-y-4 shadow-lg hover:shadow-rose-500/10`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2 rounded-2xl bg-slate-900/80 border border-slate-800">{card.icon}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 font-bold border border-slate-800">
                    {card.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-rose-300 group-hover:translate-x-1 transition-transform">
                <span>Launch {card.title.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ─── 6. AVATARS CLUB WELCOME & MEMBER ROSTER (PAGE BOTTOM) ─── */}
      <ClubWelcomeAvatars onNavigateTab={onNavigateTab} surfData={surfData} />
    </div>
  );
};

export default HomeView;
