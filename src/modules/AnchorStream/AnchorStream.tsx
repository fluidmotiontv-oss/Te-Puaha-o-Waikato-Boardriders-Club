import React from 'react';
import { FluidChannelTab } from '../../components/Tabs/FluidChannelTab';
import { DirectorPersona } from '../../App';
import { ClubTab } from '../../components/ClubNav';
import { ClubWelcomeAvatars } from '../../components/ClubWelcomeAvatars';
import { Newspaper, MessageSquare, Waves, Anchor, Trophy, Shield, Upload, Film, HardDrive, Radio, Mic, Network, ArrowRight, Sparkles, AlertTriangle, Calendar, Bell } from 'lucide-react';

interface AnchorStreamProps {
  director: DirectorPersona;
  tideBpm: number;
  onNavigateTab?: (tab: ClubTab) => void;
}

const CLUB_NEWS = [
  {
    id: 'n1',
    category: 'Competition',
    date: '10 AUG 2026',
    title: 'Sunset Beach Winter Solstice Cup Registration Open',
    summary: 'Heats announced for U18 Grommets, Open Shortboard, and Masters Longboard at Te Puaha o Waikato.',
    badge: 'HOT',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  },
  {
    id: 'n2',
    category: 'Bar Safety',
    date: '09 AUG 2026',
    title: 'Port Waikato River Bar Migration Advisory',
    summary: 'Mid-tide sandbar shifted 40 meters North. Lifejackets mandatory on all vessels crossing the bar.',
    badge: 'SAFETY ALERT',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    id: 'n3',
    category: 'Club Community',
    date: '07 AUG 2026',
    title: 'Sovereign ISP Coastal Mesh Node #3 Live',
    summary: 'New solar-powered Wi-Fi and broadcast relay online atop Sunset Hill for free community connectivity.',
    badge: 'INFRASTRUCTURE',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  },
  {
    id: 'n4',
    category: 'Culture & Arts',
    date: '05 AUG 2026',
    title: 'Te Puaha Kōwhaiwhai Carving & Mural Unveiling',
    summary: 'Whānau gathering this Saturday 10:00 AM at the clubhouse for cultural carving dedication ceremony.',
    badge: 'EVENT',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
];

const SECTION_CARDS: {
  id: ClubTab;
  title: string;
  description: string;
  icon: string;
  category: string;
  color: string;
}[] = [
  {
    id: 'chat',
    title: 'Club Chat & Te Kahuna AI',
    description: 'Real-time boardrider messaging, topic channels & bilingual AI ocean advisor.',
    icon: '💬',
    category: 'Community',
    color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-300',
  },
  {
    id: 'surf',
    title: 'MetService Surf & Tide Forecast',
    description: 'Live swell height, wind vectors & tidal hydrodynamic schedules for Sunset Beach.',
    icon: '🏄‍♂️',
    category: 'Live',
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300',
  },
  {
    id: 'bar',
    title: 'Port Waikato Bar Dynamics',
    description: 'River mouth safety radar, bar crossing advisory & live wave telemetry.',
    icon: '⚓',
    category: 'Live',
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300',
  },
  {
    id: 'ladder',
    title: 'Club Ladder & Leaderboards',
    description: 'Heat points, boardrider standings & competition ladder rankings.',
    icon: '🏆',
    category: 'Club',
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-300',
  },
  {
    id: 'vip',
    title: 'VIP Sanctuary',
    description: 'Verified member sanctuary, travel logs & exclusive club discussion forum.',
    icon: '💎',
    category: 'Club',
    color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/40 text-yellow-300',
  },
  {
    id: 'media',
    title: 'Media Upload',
    description: 'Upload raw surf clips, drone footage & session photos to the club vault.',
    icon: '📤',
    category: 'Media',
    color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/40 text-blue-300',
  },
  {
    id: 'story',
    title: 'Story Forge',
    description: 'Dragon 9 AI video storyboard generator & Director Persona switcher.',
    icon: '🎬',
    category: 'Broadcast',
    color: 'from-rose-500/20 to-red-500/20 border-rose-500/40 text-rose-300',
  },
  {
    id: 'auditor',
    title: 'Vault Auditor',
    description: 'Media file codec analyzer, resolution checker & integrity verification.',
    icon: '🗃️',
    category: 'Broadcast',
    color: 'from-slate-700/40 to-slate-800/40 border-slate-600/40 text-slate-300',
  },
  {
    id: 'voice',
    title: 'Avatar Voice Engine',
    description: 'Te Kahuna bilingual speech commentary & voice announcement generator.',
    icon: '🎭',
    category: 'Create',
    color: 'from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/40 text-fuchsia-300',
  },
  {
    id: 'mesh',
    title: 'Sovereign ISP Mesh',
    description: 'Decentralized P2P coastal node topology & autonomous network dashboard.',
    icon: '🕸️',
    category: 'Mesh',
    color: 'from-lime-500/20 to-emerald-500/20 border-lime-500/40 text-lime-300',
  },
];

export function AnchorStream({ director, onNavigateTab }: AnchorStreamProps) {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/60 to-slate-900 p-6 rounded-3xl border border-purple-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Te Puaha o Waikato Boardriders Portal</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Welcome to Sunset Beach Hub
            </h1>
            <p className="text-slate-300 text-xs max-w-2xl mt-1">
              Your central command center for live broadcasts, MetService forecasts, river bar crossing telemetry, club news, and member chatrooms.
            </p>
          </div>

          <div className="px-4 py-2 bg-slate-950/80 rounded-2xl border border-purple-500/40 text-xs font-mono shrink-0 space-y-1">
            <div className="text-purple-300 font-bold flex items-center gap-1.5">
              <span>🎬 Director Persona:</span>
              <span className="text-white">{director.name}</span>
            </div>
            <div className="text-amber-400 text-[10px] italic">"{director.tagline}"</div>
          </div>
        </div>
      </div>

      {/* Two Avatars Welcome & Surf Outlook Section */}
      <ClubWelcomeAvatars onNavigateTab={onNavigateTab} />

      {/* Club News Bulletin */}
      <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black text-white font-mono">Te Puaha Club News & Announcements</h2>
          </div>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <Bell className="w-3.5 h-3.5 text-cyan-400" />
            Live Bulletin
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CLUB_NEWS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">{item.date} • {item.category}</span>
                  <span className={`px-2 py-0.5 rounded font-bold border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white line-clamp-1">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Section Links Directory */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-white font-mono flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Explore Club Modules & Sections
          </h2>
          <span className="text-xs font-mono text-slate-400">Click any card to launch section</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTION_CARDS.map((card) => (
            <button
              key={card.id}
              onClick={() => onNavigateTab && onNavigateTab(card.id)}
              className={`text-left p-5 rounded-3xl bg-slate-900/90 border bg-gradient-to-br ${card.color} hover:brightness-110 transition-all group flex flex-col justify-between space-y-3 shadow-lg`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{card.icon}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-950/80 text-slate-300 font-bold border border-slate-800">
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
                <span>Launch {card.title.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Live Stream Broadcast Anchor Feed */}
      <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-black text-white font-mono flex items-center gap-2">
            <Radio className="w-5 h-5 text-rose-400" />
            Live Sunset Beach Anchor Channel Stream
          </h2>
          <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold animate-pulse">
            LIVE BROADCAST
          </span>
        </div>
        <FluidChannelTab lang="reo" />
      </div>
    </div>
  );
}
