import React, { useState, useEffect } from 'react';
import {
  Radio,
  Waves,
  Activity,
  Zap,
  ShieldCheck,
  MessageSquare,
  ThumbsUp,
  Send,
  Plus,
  Users,
  Sliders,
  Sparkles,
  Share2,
  Compass,
  Anchor,
  TrendingUp,
  Volume2,
  Award,
  Info,
  X,
  CheckCircle2,
  Filter,
  Flame,
  Search,
  MessageCircle,
  Clock,
  UserCheck
} from 'lucide-react';
import { ClubTab } from './ClubNav';

interface D9SandbarFrequenciesProps {
  onNavigateTab?: (tab: ClubTab) => void;
}

export interface DiscussionThread {
  id: string;
  title: string;
  authorName: string;
  authorAvatar: string;
  authorBadge: string;
  category: 'shaping' | 'safety' | 'sediment' | 'telemetry';
  categoryLabel: string;
  frequencyChannel: string;
  likes: number;
  hasLiked?: boolean;
  repliesCount: number;
  timestamp: string;
  content: string;
  replies: {
    id: string;
    authorName: string;
    authorAvatar: string;
    authorBadge: string;
    timestamp: string;
    text: string;
    likes: number;
  }[];
}

const INITIAL_THREADS: DiscussionThread[] = [
  {
    id: 'thread-1',
    title: 'How 7.83Hz Schumann harmonics created the new South Spit left-hand barrel sandbar last week',
    authorName: "Te Kahuna 'TK' Parata",
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    authorBadge: 'D9 Lead Hydro-Acoustician',
    category: 'shaping',
    categoryLabel: '🌊 Wave Quality & A-Frame',
    frequencyChannel: '7.83 Hz (Schumann Accretion)',
    likes: 42,
    repliesCount: 6,
    timestamp: '2 hours ago',
    content: 'By emitting a continuous 7.83 Hz acoustic pulse through the underwater transducers on Buoy Alpha during the ebb tide, fine sand grains migrated into a distinct crescent sandbar 120m off South Spit. The resulting wave shape produced a clean 6-second barrel on the set waves yesterday morning!',
    replies: [
      {
        id: 'r-1',
        authorName: 'Rawiri Kahu',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
        authorBadge: 'Master Shaper & Waterman',
        timestamp: '1 hour ago',
        text: 'Can confirm! Surfed it at 8:00 AM on low tide. The wave had a distinct A-frame wedge rather than the usual closeout section.',
        likes: 12,
      },
      {
        id: 'r-2',
        authorName: 'Aroha Kingi',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
        authorBadge: 'Coastal Geomorphologist',
        timestamp: '45 mins ago',
        text: 'Acoustic levitation of fine quartz sand at 7.83Hz aligns perfectly with acoustic radiation pressure theory. The nodal points create stable sand ridges.',
        likes: 9,
      },
    ],
  },
  {
    id: 'thread-2',
    title: 'Using 432Hz standing waves to carve a safe 2-meter paddling channel through the Port Waikato bar rip',
    authorName: 'Dr. Hemi Taylor',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    authorBadge: 'Coastguard Safety Advisor',
    category: 'safety',
    categoryLabel: '⚓ Rip Safety & Channel Steering',
    frequencyChannel: '432 Hz (Standing Wave Channel)',
    likes: 38,
    repliesCount: 4,
    timestamp: '5 hours ago',
    content: 'The Port Waikato river mouth bar rip can be treacherous during spring ebb tides. We ran a test using 432 Hz harmonic standing wave nodes to prevent sand build-up in the central channel. This keeps a clear 2-meter deep gutter for surfers paddling out and Coastguard vessels crossing safely.',
    replies: [
      {
        id: 'r-3',
        authorName: 'Dave "Kook" Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
        authorBadge: 'Surfer & Lifeguard',
        timestamp: '3 hours ago',
        text: 'I paddled out through that channel this morning. The rip current felt smooth and predictable without sudden suction holes.',
        likes: 8,
      },
    ],
  },
  {
    id: 'thread-3',
    title: 'Acoustic sand migration vs spring tide ebb currents: Telemetry data from Buoy Beta',
    authorName: 'Rawiri Kahu',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    authorBadge: 'Master Shaper & Waterman',
    category: 'sediment',
    categoryLabel: '🏖️ Sandbar Accretion',
    frequencyChannel: '14.2 Hz (Groundswell Sync)',
    likes: 29,
    repliesCount: 3,
    timestamp: '1 day ago',
    content: 'When we ramp up the frequency to 14.2 Hz during a 14s SW swell, the wave power couples with the acoustic frequency, creating dense sand ridges that hold their shape even against 4-knot river currents.',
    replies: [],
  },
  {
    id: 'thread-4',
    title: 'Safety Protocol: Infrasonic early warning pings for shifting sandbanks at Sunset Main Peak',
    authorName: 'Aroha Kingi',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    authorBadge: 'Coastal Geomorphologist',
    category: 'telemetry',
    categoryLabel: '📡 Telemetry & Safety Alarms',
    frequencyChannel: '18.5 Hz (Infrasonic Warning)',
    likes: 31,
    repliesCount: 2,
    timestamp: '2 days ago',
    content: 'If the sandbar collapses due to heavy storm surges, the D9 array emits a low 18.5 Hz warning tone on the app map, letting surfers know the sandbank profile has altered and rips may shift.',
    replies: [],
  },
];

export const D9SandbarFrequencies: React.FC<D9SandbarFrequenciesProps> = ({ onNavigateTab }) => {
  const [threads, setThreads] = useState<DiscussionThread[]>(INITIAL_THREADS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeThreadId, setActiveThreadId] = useState<string | null>('thread-1');
  const [selectedFrequency, setSelectedFrequency] = useState<number>(7.83);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [amplitude, setAmplitude] = useState<number>(85);
  const [replyText, setReplyText] = useState<string>('');

  // New Thread Form state
  const [isNewThreadOpen, setIsNewThreadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'shaping' | 'safety' | 'sediment' | 'telemetry'>('shaping');
  const [newFreqChannel, setNewFreqChannel] = useState('7.83 Hz (Schumann Accretion)');
  const [newContent, setNewContent] = useState('');

  // Poll state
  const [pollVotes, setPollVotes] = useState({
    opt1: 84, // 7.83Hz Accretion
    opt2: 62, // 14.2Hz Swell Sync
    opt3: 45, // 432Hz Rip Channel
  });
  const [userVotedOpt, setUserVotedOpt] = useState<string | null>(null);

  // Animated wave pulse state
  const [wavePhase, setWavePhase] = useState(0);
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setWavePhase((prev) => (prev + 0.1) % (Math.PI * 2));
    }, 100);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleLikeThread = (threadId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          const hasLiked = !t.hasLiked;
          return {
            ...t,
            hasLiked,
            likes: hasLiked ? t.likes + 1 : t.likes - 1,
          };
        }
        return t;
      })
    );
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThreadId) return;

    const newReplyObj = {
      id: `r-${Date.now()}`,
      authorName: 'Local Surfer (You)',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      authorBadge: 'D9 Research Contributor',
      timestamp: 'Just now',
      text: replyText.trim(),
      likes: 1,
    };

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            repliesCount: t.repliesCount + 1,
            replies: [...t.replies, newReplyObj],
          };
        }
        return t;
      })
    );

    setReplyText('');
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const categoryLabels = {
      shaping: '🌊 Wave Quality & A-Frame',
      safety: '⚓ Rip Safety & Channel Steering',
      sediment: '🏖️ Sandbar Accretion',
      telemetry: '📡 Telemetry & Safety Alarms',
    };

    const newThreadObj: DiscussionThread = {
      id: `thread-${Date.now()}`,
      title: newTitle,
      authorName: 'Local Surfer (You)',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      authorBadge: 'D9 Member & Surfer',
      category: newCategory,
      categoryLabel: categoryLabels[newCategory],
      frequencyChannel: newFreqChannel,
      likes: 1,
      hasLiked: true,
      repliesCount: 0,
      timestamp: 'Just now',
      content: newContent,
      replies: [],
    };

    setThreads([newThreadObj, ...threads]);
    setActiveThreadId(newThreadObj.id);
    setIsNewThreadOpen(false);

    setNewTitle('');
    setNewContent('');
  };

  const handlePollVote = (optionKey: 'opt1' | 'opt2' | 'opt3') => {
    if (userVotedOpt) return;
    setUserVotedOpt(optionKey);
    setPollVotes((prev) => ({
      ...prev,
      [optionKey]: prev[optionKey] + 1,
    }));
  };

  const filteredThreads = threads.filter((t) => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  // Frequency descriptions
  const getFrequencyMeta = (freq: number) => {
    if (freq < 10) {
      return {
        label: '7.83 Hz — Schumann Earth Resonator',
        effect: 'Sediment Bed Stabilization & Sand Accretion',
        waveTarget: 'Creates thick crescent sandbars on South Spit & Sunset Main Peak',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/20 border-emerald-500/40',
      };
    } else if (freq < 20) {
      return {
        label: '14.2 Hz — Swell Groundswell Sync',
        effect: 'Wave Steepness & A-Frame Wedge Formation',
        waveTarget: 'Modulates incoming 12-16s swell sets into clean hollow A-frame peaks',
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/20 border-cyan-500/40',
      };
    } else {
      return {
        label: '432 Hz — Standing Wave Acoustic Channel',
        effect: 'Rip Current Steering & Paddling Safety Gutter',
        waveTarget: 'Maintains a predictable 2m deep escape channel for safe paddle-outs & Coastguard access',
        color: 'text-purple-400',
        bg: 'bg-purple-500/20 border-purple-500/40',
      };
    }
  };

  const freqMeta = getFrequencyMeta(selectedFrequency);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* ─── 1. HERO HEADER BANNER ─── */}
      <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-[#00F0FF]/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#0A2540]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
              <span className="px-3 py-1 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 font-bold flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse" /> Dragon 9 Protocol • Acoustic Hydrodynamics
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                3 Acoustic Buoys Active
              </span>
              <span className="text-slate-400">Port Waikato & Sunset Beach</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Dragon 9 Sandbar Frequencies & Acoustic Wave Shaping Discussion
            </h1>

            <p className="text-slate-300 text-xs md:text-sm font-sans leading-relaxed">
              Join the local research guild discussing how low-frequency acoustic resonance (7.83Hz Schumann harmonics, 14.2Hz groundswell sync, and 432Hz standing waves) molds Sunset Beach sandbars, optimizes A-frame wave peaks, stabilizes rip channels, and safeguards surfers and river mouth bar crossings.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-300 pt-1 flex-wrap">
              <span className="flex items-center gap-1 text-cyan-300">
                <Users className="w-4 h-4" /> 184 Guild Members
              </span>
              <span className="flex items-center gap-1 text-amber-300">
                <Activity className="w-4 h-4" /> Sandbar Stability: 88%
              </span>
              <span className="flex items-center gap-1 text-emerald-300">
                <ShieldCheck className="w-4 h-4" /> Rip Current Safety Mode: Active
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0 font-mono text-xs">
            <button
              onClick={() => setIsNewThreadOpen(true)}
              className="px-5 py-3 rounded-2xl bg-[#00F0FF] hover:bg-cyan-300 text-[#0B0E14] font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00F0FF]/25"
            >
              <Plus className="w-4 h-4" />
              <span>Start New Discussion</span>
            </button>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('bar')}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center gap-2"
              >
                <Anchor className="w-4 h-4 text-cyan-400" />
                <span>View Bar Safety Telemetry</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── 2. LIVE D9 HYDRO-ACOUSTIC FREQUENCY SIMULATOR & WAVEFORM ─── */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-5 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center shrink-0">
              <Sliders className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>D9 Acoustic Frequency Synthesizer & Sandbar Node Visualizer</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${freqMeta.bg} ${freqMeta.color}`}>
                  {selectedFrequency} Hz
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Simulate acoustic radiation pressure, standing wave nodes, and sand grain accumulation in real time
              </p>
            </div>
          </div>

          {/* Quick Freq Preset Buttons */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            {[
              { freq: 7.83, label: '7.83 Hz (Accretion)' },
              { freq: 14.2, label: '14.2 Hz (Swell Sync)' },
              { freq: 432, label: '432 Hz (Rip Guide)' },
            ].map((p) => (
              <button
                key={p.freq}
                onClick={() => setSelectedFrequency(p.freq)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedFrequency === p.freq
                    ? 'bg-[#00F0FF] text-[#0B0E14] shadow-md shadow-[#00F0FF]/20'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Waveform SVG Canvas & Sandbar Node Visualizer */}
        <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Activity className="w-4 h-4 text-[#00F0FF] animate-pulse" />
              Live Transceiver Node Field (Buoy Alpha to South Spit)
            </span>
            <div className="flex items-center gap-3">
              <span>Amplitude: {amplitude}%</span>
              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className="text-cyan-400 hover:text-cyan-300 underline font-bold"
              >
                {isSimulating ? 'Pause Wave' : 'Resume Wave'}
              </button>
            </div>
          </div>

          {/* Animated SVG Waveform & Sandbed Cross-section */}
          <div className="h-44 w-full relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800/80 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 800 180">
              <defs>
                <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="sandGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#78350f" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="90" x2="800" y2="90" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="200" y1="0" x2="200" y2="180" stroke="#1e293b" strokeDasharray="2 2" />
              <line x1="400" y1="0" x2="400" y2="180" stroke="#1e293b" strokeDasharray="2 2" />
              <line x1="600" y1="0" x2="600" y2="180" stroke="#1e293b" strokeDasharray="2 2" />

              {/* Sandbar Bathymetry Layer (Resonates at acoustic nodes) */}
              <path
                d={`M 0 180 
                   Q 200 ${150 - Math.sin(wavePhase) * (amplitude * 0.15)} 350 ${130 - (selectedFrequency > 400 ? 25 : 0)} 
                   T 600 ${140 + Math.cos(wavePhase) * (amplitude * 0.1)} 
                   L 800 180 Z`}
                fill="url(#sandGradient)"
              />

              {/* Water Surface Wave Sine Curve */}
              {(() => {
                const points = [];
                const freqFactor = selectedFrequency > 400 ? 0.08 : selectedFrequency > 10 ? 0.04 : 0.02;
                const ampFactor = (amplitude / 100) * 35;
                for (let x = 0; x <= 800; x += 10) {
                  const y = 90 + Math.sin(x * freqFactor + wavePhase) * ampFactor;
                  points.push(`${x},${y}`);
                }
                const pathD = `M 0 180 L ${points.join(' L ')} L 800 180 Z`;
                const strokeD = `M ${points.join(' L ')}`;
                return (
                  <>
                    <path d={pathD} fill="url(#waveGradient)" opacity={0.3} />
                    <path d={strokeD} fill="none" stroke="#00F0FF" strokeWidth="3" />
                  </>
                );
              })()}

              {/* Acoustic Nodes & Standing Wave Indicators */}
              <circle cx="200" cy="90" r="6" fill="#10b981" className="animate-ping" />
              <text x="180" y="70" fill="#34d399" fontSize="10" fontFamily="monospace">Acoustic Node A</text>

              <circle cx="500" cy="90" r="6" fill="#a855f7" className="animate-ping" />
              <text x="480" y="70" fill="#c084fc" fontSize="10" fontFamily="monospace">Sand Accretion Crest</text>

              <text x="620" y="165" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">
                Sunset Sandbar Profile
              </text>
            </svg>
          </div>

          {/* Current Acoustic Target Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">Target Effect</span>
              <p className={`font-bold ${freqMeta.color}`}>{freqMeta.effect}</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 md:col-span-2">
              <span className="text-[10px] text-slate-400 uppercase">Surf & Rip Impact</span>
              <p className="text-slate-200 font-sans">{freqMeta.waveTarget}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 3. DISCUSSION GROUP FORUM & POLL LAYOUT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
        {/* Left Column: Discussion Threads List & Filter (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Forum Header & Filter Controls */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-slate-400 font-bold shrink-0">Filter:</span>
              {[
                { id: 'all', label: 'All Topics' },
                { id: 'shaping', label: '🌊 Wave Shaping' },
                { id: 'safety', label: '⚓ Rip Safety' },
                { id: 'sediment', label: '🏖️ Sand Accretion' },
                { id: 'telemetry', label: '📡 Telemetry' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedCategory(f.id)}
                  className={`px-3 py-1 rounded-xl font-bold shrink-0 transition-all ${
                    selectedCategory === f.id
                      ? 'bg-[#00F0FF] text-[#0B0E14]'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsNewThreadOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 font-bold flex items-center gap-1.5 shrink-0 self-start sm:self-auto hover:bg-[#00F0FF]/30"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post Topic</span>
            </button>
          </div>

          {/* Discussion Threads List */}
          <div className="space-y-3">
            {filteredThreads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isActive
                      ? 'bg-slate-900/95 border-[#00F0FF]/60 shadow-xl shadow-[#00F0FF]/10 ring-1 ring-[#00F0FF]/30'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={thread.authorAvatar}
                        alt={thread.authorName}
                        className="w-8 h-8 rounded-full object-cover border border-[#00F0FF]/40 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold text-xs">{thread.authorName}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-cyan-300 border border-slate-700">
                            {thread.authorBadge}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{thread.timestamp}</span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800 font-bold">
                      {thread.categoryLabel}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm md:text-base font-bold text-white leading-snug group-hover:text-[#00F0FF]">
                      {thread.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {thread.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 font-mono text-xs">
                    <span className="text-cyan-400 text-[11px] font-bold flex items-center gap-1">
                      <Radio className="w-3.5 h-3.5 text-[#00F0FF]" /> {thread.frequencyChannel}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => handleLikeThread(thread.id, e)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                          thread.hasLiked
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${thread.hasLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                        <span>{thread.likes}</span>
                      </button>

                      <span className="flex items-center gap-1 text-slate-400">
                        <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{thread.repliesCount} Replies</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Thread Replies & Comment Box */}
          {activeThread && (
            <div className="bg-slate-950 p-6 rounded-3xl border border-cyan-500/30 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                  <MessageCircle className="w-4 h-4 text-[#00F0FF]" />
                  <span>Discussion Stream: {activeThread.title}</span>
                </h4>
                <span className="text-xs font-mono text-slate-400">
                  {activeThread.replies.length} Comments
                </span>
              </div>

              {/* Replies list */}
              <div className="space-y-3">
                {activeThread.replies.length === 0 ? (
                  <p className="text-xs text-slate-500 font-mono italic py-2">
                    No comments yet. Be the first to share your field observations!
                  </p>
                ) : (
                  activeThread.replies.map((rep) => (
                    <div key={rep.id} className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={rep.authorAvatar}
                            alt={rep.authorName}
                            className="w-6 h-6 rounded-full object-cover border border-[#00F0FF]/40"
                          />
                          <span className="text-xs font-bold text-white">{rep.authorName}</span>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            {rep.authorBadge}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{rep.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-sans pl-8">
                        {rep.text}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment Input Form */}
              <form onSubmit={handleAddReply} className="flex gap-2 pt-2 font-mono text-xs">
                <input
                  type="text"
                  placeholder="Share your acoustic sandbar or surf observation..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-[#00F0FF] outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#00F0FF] text-[#0B0E14] font-bold flex items-center gap-1.5 hover:brightness-110 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right Column: Research Guild & Polls (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Poll Card */}
          <div className="bg-slate-950 p-5 rounded-3xl border border-amber-500/30 space-y-4 shadow-xl font-mono text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold border-b border-slate-800 pb-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Community Frequency Poll</span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white font-sans">
                Which frequency protocol should we run on Buoy Alpha for this weekend's 2.2m SW swell?
              </h4>
              <p className="text-[10px] text-slate-400 mt-1">
                Port Waikato Boardriders research guild voting.
              </p>
            </div>

            <div className="space-y-2">
              {[
                { key: 'opt1', label: '7.83 Hz — Schumann Sandbar Accretion (A-Frames)', votes: pollVotes.opt1 },
                { key: 'opt2', label: '14.2 Hz — Groundswell Sync (Steep Barrels)', votes: pollVotes.opt2 },
                { key: 'opt3', label: '432 Hz — Rip Current Steering Channel (Safety)', votes: pollVotes.opt3 },
              ].map((opt) => {
                const total = pollVotes.opt1 + pollVotes.opt2 + pollVotes.opt3;
                const pct = Math.round((opt.votes / total) * 100);
                const isSelected = userVotedOpt === opt.key;

                return (
                  <button
                    key={opt.key}
                    onClick={() => handlePollVote(opt.key as any)}
                    className={`w-full p-3 rounded-2xl border text-left space-y-1 transition-all relative overflow-hidden ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-amber-500/10 pointer-events-none transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />

                    <div className="flex justify-between relative z-10 text-[11px]">
                      <span>{opt.label}</span>
                      <span className="font-bold text-amber-300">{pct}%</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-900 pt-2">
              <span>Total Votes: {pollVotes.opt1 + pollVotes.opt2 + pollVotes.opt3}</span>
              <span className="text-emerald-400 font-bold">Voting Closes Friday 5:00 PM</span>
            </div>
          </div>

          {/* Research Guild Roster */}
          <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-4 shadow-xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-[#00F0FF]" />
                <span>D9 Acoustic Research Guild</span>
              </span>
              <span className="text-[10px] text-cyan-300 font-bold">184 Members</span>
            </div>

            <div className="space-y-2.5">
              {[
                { name: "Te Kahuna 'TK' Parata", role: 'Lead Hydro-Acoustician', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80', status: 'Active Field Testing' },
                { name: 'Rawiri Kahu', role: 'Master Board Shaper', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80', status: 'Buoy Transceiver Ops' },
                { name: 'Dr. Hemi Taylor', role: 'Coastguard Safety Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80', status: 'Rip Dynamics Monitoring' },
                { name: 'Aroha Kingi', role: 'Coastal Geomorphologist', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80', status: 'Bathymetry Mapping' },
              ].map((m, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover border border-[#00F0FF]/40" />
                    <div>
                      <p className="text-white font-bold text-xs">{m.name}</p>
                      <p className="text-[10px] text-slate-400">{m.role}</p>
                    </div>
                  </div>
                  <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: New Discussion Topic */}
      {isNewThreadOpen && (
        <div
          onClick={() => setIsNewThreadOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-[#00F0FF]/40 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative font-sans text-xs"
          >
            <button
              onClick={() => setIsNewThreadOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 text-[10px] font-mono font-bold uppercase">
                Dragon 9 Discussion Proposal
              </span>
              <h3 className="text-xl font-black text-white">
                Start a New D9 Acoustic Research Topic
              </h3>
              <p className="text-slate-400 text-xs font-mono">
                Post your field observations, frequency hypotheses, or sandbar feedback for the boardriders guild.
              </p>
            </div>

            <form onSubmit={handleCreateThread} className="space-y-4 font-mono">
              <div className="space-y-1">
                <label className="text-slate-300 text-[11px] font-bold block">
                  Topic Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 14.2Hz frequency impact on South Spit left barrel section"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00F0FF] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 text-[11px] font-bold block">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00F0FF] outline-none"
                  >
                    <option value="shaping">🌊 Wave Quality & A-Frame</option>
                    <option value="safety">⚓ Rip Safety & Channel Steering</option>
                    <option value="sediment">🏖️ Sandbar Accretion</option>
                    <option value="telemetry">📡 Telemetry & Alarms</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 text-[11px] font-bold block">
                    Target Frequency Channel
                  </label>
                  <select
                    value={newFreqChannel}
                    onChange={(e) => setNewFreqChannel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00F0FF] outline-none"
                  >
                    <option value="7.83 Hz (Schumann Accretion)">7.83 Hz (Schumann Accretion)</option>
                    <option value="14.2 Hz (Groundswell Sync)">14.2 Hz (Groundswell Sync)</option>
                    <option value="432 Hz (Standing Wave Channel)">432 Hz (Standing Wave Channel)</option>
                    <option value="18.5 Hz (Infrasonic Warning)">18.5 Hz (Infrasonic Warning)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 text-[11px] font-bold block">
                  Discussion Content & Observations *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail your observations at Sunset Beach or Port Waikato bar..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00F0FF] outline-none font-sans"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewThreadOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00F0FF] text-[#0B0E14] font-bold flex items-center gap-2 hover:brightness-110"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish Discussion</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
