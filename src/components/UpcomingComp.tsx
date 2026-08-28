import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Clock,
  Calendar,
  MapPin,
  Users,
  Flame,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Zap,
  Medal,
  Award,
  Radio,
  UserCheck,
  FileText,
  ExternalLink,
  Download
} from 'lucide-react';
import { ClubTab } from './ClubNav';

interface UpcomingCompProps {
  onNavigateTab?: (tab: ClubTab) => void;
}

export interface CompetitionEvent {
  id: string;
  title: string;
  subtitle: string;
  dateString: string;
  targetDate: Date;
  location: string;
  pointsAtStake: number;
  registeredCount: number;
  maxParticipants: number;
  divisions: string[];
  forecastSwell: string;
  status: 'Registration Open' | 'Heats Seeding' | 'Live Today';
}

const NEXT_COMPETITION: CompetitionEvent = {
  id: 'comp-spring-2026',
  title: 'Port Waikato Sunset Beach Spring Club Exposé',
  subtitle: '2026/27 Boardriders Season Opening Championship • Round 1 Spring Kickoff',
  dateString: 'Saturday, 12 September 2026 • 07:30 AM NZST',
  // Set target date ~ 32 days ahead or simulated time for upcoming Spring
  targetDate: new Date('2026-09-12T07:30:00+12:00'),
  location: 'Sunset Beach Main Peak & River Mouth Break',
  pointsAtStake: 1250,
  registeredCount: 36,
  maxParticipants: 48,
  divisions: ["Open Men's", "Women's", "Grom Squad", "Legends & Masters", "Spring Exposé Showcase"],
  forecastSwell: '2.1m @ 13s WSW • Offshore ENE Spring Breeze',
  status: 'Registration Open',
};

export const UpcomingComp: React.FC<UpcomingCompProps> = ({ onNavigateTab }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 4, hours: 21, minutes: 48, seconds: 32 });

  const [isRegistered, setIsRegistered] = useState(false);
  const [participantCount, setParticipantCount] = useState(NEXT_COMPETITION.registeredCount);

  // Live D9 Clock countdown timer calculation
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date().getTime();
      const target = NEXT_COMPETITION.targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleRegister = () => {
    if (!isRegistered) {
      setIsRegistered(true);
      setParticipantCount((prev) => prev + 1);
    } else {
      setIsRegistered(false);
      setParticipantCount((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-slate-950/95 p-6 md:p-8 rounded-3xl border border-[#FF9E00]/40 space-y-6 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#1e1708]/60">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9E00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-5 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> 🌸 Spring Club Exposé Hero
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-400" /> 2026/27 Season Kickoff
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {NEXT_COMPETITION.status}
            </span>
            <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              D9 Clock Heat Sync
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white font-sans tracking-tight">
            {NEXT_COMPETITION.title}
          </h2>
          <p className="text-amber-200/90 text-xs font-mono">
            {NEXT_COMPETITION.subtitle}
          </p>
        </div>

        {/* Action Button to View Ladder */}
        {onNavigateTab && (
          <button
            onClick={() => onNavigateTab('ladder')}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF9E00] to-amber-500 text-[#0B0E14] font-mono font-black text-xs hover:brightness-110 flex items-center gap-2 transition-all shadow-lg shadow-[#FF9E00]/20 shrink-0"
          >
            <Trophy className="w-4 h-4" />
            <span>View Full Club Ladder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Grid: Countdown Clock & Comp Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-stretch">
        {/* Countdown Box (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 p-5 rounded-2xl border border-amber-500/30 space-y-4 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono text-amber-300 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#FF9E00] animate-pulse" />
              D9 Official Heat Countdown
            </span>
            <span className="text-[10px] text-slate-400">Live Ticking</span>
          </div>

          {/* 4 Big Countdown Metric Blocks */}
          <div className="grid grid-cols-4 gap-2 text-center font-mono py-2">
            <div className="bg-slate-950 p-3 rounded-xl border border-amber-500/40">
              <span className="text-2xl md:text-3xl font-black text-white block">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 font-bold block uppercase mt-0.5">
                Days
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-amber-500/40">
              <span className="text-2xl md:text-3xl font-black text-white block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 font-bold block uppercase mt-0.5">
                Hours
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-amber-500/40">
              <span className="text-2xl md:text-3xl font-black text-[#00F0FF] block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 font-bold block uppercase mt-0.5">
                Mins
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-amber-500/40">
              <span className="text-2xl md:text-3xl font-black text-amber-400 block animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 font-bold block uppercase mt-0.5">
                Secs
              </span>
            </div>
          </div>

          {/* Registration Button */}
          <button
            onClick={handleToggleRegister}
            className={`w-full py-3 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              isRegistered
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30'
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md shadow-amber-500/20'
            }`}
          >
            {isRegistered ? (
              <>
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>You are Registered for Heat!</span>
              </>
            ) : (
              <>
                <Flame className="w-4 h-4" />
                <span>Register Your Spot ({participantCount}/{NEXT_COMPETITION.maxParticipants})</span>
              </>
            )}
          </button>
        </div>

        {/* Comp Info Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            {/* Event Time & Date */}
            <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Date & Heat Call
              </span>
              <p className="text-white font-bold text-xs">{NEXT_COMPETITION.dateString}</p>
            </div>

            {/* Location */}
            <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Break Location
              </span>
              <p className="text-white font-bold text-xs">{NEXT_COMPETITION.location}</p>
            </div>

            {/* Points at stake */}
            <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
                <Award className="w-3.5 h-3.5 text-purple-400" /> Ladder Points
              </span>
              <p className="text-amber-300 font-black text-sm">
                +{NEXT_COMPETITION.pointsAtStake} Pts for 1st Place
              </p>
            </div>

            {/* Participants */}
            <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase">
                <Users className="w-3.5 h-3.5 text-emerald-400" /> Heat Entries
              </span>
              <p className="text-white font-bold text-xs">
                {participantCount} of {NEXT_COMPETITION.maxParticipants} Registered
              </p>
            </div>
          </div>

          {/* Forecast Swell & Divisions Bar */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-[#00F0FF] font-bold">
              <span className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" /> MetService Comp Swell Forecast
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">Favorable Offshore</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">
              {NEXT_COMPETITION.forecastSwell}
            </p>

            <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-slate-500 uppercase mr-1">Divisions:</span>
              {NEXT_COMPETITION.divisions.map((div, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-lg bg-slate-950 text-slate-300 text-[10px] border border-slate-800"
                >
                  {div}
                </span>
              ))}
            </div>
          </div>

          {/* Adobe Acrobat Official PDF Rules & Schedule Link */}
          <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-red-500/30 flex items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="truncate">
                <p className="text-white font-bold text-xs truncate">
                  Official Club Competition Rulebook & Event Schedule
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  Adobe Acrobat PDF • Port Waikato Boardriders Championship
                </p>
              </div>
            </div>

            <a
              href="https://acrobat.adobe.com/id/urn:aaid:sc:AP:5cb0e01c-f695-404b-9f0f-1afb6dc93979"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-[11px] font-bold flex items-center gap-1.5 transition-all shrink-0"
            >
              <span>Open PDF</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
