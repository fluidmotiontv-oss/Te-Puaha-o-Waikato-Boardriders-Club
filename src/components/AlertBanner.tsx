import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  Wind,
  Waves,
  X,
  ChevronRight,
  Info,
  CheckCircle2,
  BellRing,
  Anchor
} from 'lucide-react';
import { MetServiceData } from './SurfForecastTab';
import { ClubTab } from './ClubNav';

interface AlertBannerProps {
  surfData?: MetServiceData | null;
  onNavigateTab?: (tab: ClubTab) => void;
}

export interface MarineWarning {
  id: string;
  level: 'CRITICAL' | 'WARNING' | 'ADVISORY';
  title: string;
  description: string;
  issuedTime: string;
  category: 'WIND' | 'BAR' | 'SWELL' | 'SURGE';
}

const DEFAULT_WARNINGS: MarineWarning[] = [
  {
    id: 'warn-1',
    level: 'WARNING',
    title: 'SW Gale Wind & Spring Tide Advisory',
    description: 'MetService NZ Marine Warning: SW winds gusting up to 28-35 knots with 2.8m spring tide ebb current through Port Waikato bar.',
    issuedTime: 'Updated 15 mins ago',
    category: 'WIND',
  },
  {
    id: 'warn-2',
    level: 'CRITICAL',
    title: 'Port Waikato River Bar Crossing - High Risk Window',
    description: 'Maximum ebb current between 11:30 AM – 2:00 PM. Coastguard recommends lifejackets mandatory & extreme caution for small vessels.',
    issuedTime: 'Live Coastguard Alert',
    category: 'BAR',
  },
];

export const AlertBanner: React.FC<AlertBannerProps> = ({ surfData, onNavigateTab }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [activeWarningIndex, setActiveWarningIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  if (isDismissed) return null;

  // Derive warnings from surfData or fallback to defaults
  const warnings: MarineWarning[] = surfData?.metServiceWarnings?.length
    ? surfData.metServiceWarnings.map((w, idx) => ({
        id: w.id || `w-${idx}`,
        level: (w.level?.toUpperCase() as any) || 'WARNING',
        title: w.title,
        description: w.description,
        issuedTime: 'MetService Live Feed',
        category: w.title.toLowerCase().includes('bar') ? 'BAR' : 'WIND',
      }))
    : DEFAULT_WARNINGS;

  const currentWarning = warnings[activeWarningIndex] || warnings[0];

  const levelStyles = {
    CRITICAL: {
      border: 'border-rose-500/80',
      bg: 'bg-gradient-to-r from-rose-950/90 via-slate-950 to-slate-950',
      badge: 'bg-rose-500 text-slate-950 font-black',
      iconColor: 'text-rose-400',
      ring: 'ring-1 ring-rose-500/40',
      shadow: 'shadow-rose-950/50',
    },
    WARNING: {
      border: 'border-amber-500/80',
      bg: 'bg-gradient-to-r from-amber-950/90 via-slate-950 to-slate-950',
      badge: 'bg-amber-500 text-slate-950 font-black',
      iconColor: 'text-amber-400',
      ring: 'ring-1 ring-amber-500/40',
      shadow: 'shadow-amber-950/50',
    },
    ADVISORY: {
      border: 'border-cyan-500/80',
      bg: 'bg-gradient-to-r from-cyan-950/90 via-slate-950 to-slate-950',
      badge: 'bg-cyan-500 text-slate-950 font-black',
      iconColor: 'text-cyan-400',
      ring: 'ring-1 ring-cyan-500/40',
      shadow: 'shadow-cyan-950/50',
    },
  }[currentWarning.level || 'WARNING'];

  return (
    <div className={`relative rounded-2xl border p-4 shadow-2xl transition-all duration-300 ${levelStyles.border} ${levelStyles.bg} ${levelStyles.ring} ${levelStyles.shadow}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left Side Icon + Title + Message */}
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2.5 rounded-xl ${levelStyles.badge} shrink-0 mt-0.5 animate-pulse`}>
            {currentWarning.category === 'BAR' ? (
              <Anchor className="w-5 h-5" />
            ) : currentWarning.category === 'WIND' ? (
              <Wind className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-extrabold ${levelStyles.badge}`}>
                {currentWarning.level} ALERT
              </span>
              <span className="text-slate-400 text-[11px] font-bold">
                {currentWarning.issuedTime}
              </span>
              {warnings.length > 1 && (
                <span className="text-slate-500 text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Warning {activeWarningIndex + 1} of {warnings.length}
                </span>
              )}
            </div>

            <h4 className="text-sm md:text-base font-black text-white font-sans flex items-center gap-2">
              <span>{currentWarning.title}</span>
            </h4>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {currentWarning.description}
            </p>
          </div>
        </div>

        {/* Right Side Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0 font-mono text-xs pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/80 w-full md:w-auto justify-between md:justify-end">
          {warnings.length > 1 && (
            <button
              onClick={() => setActiveWarningIndex((prev) => (prev + 1) % warnings.length)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:text-white hover:border-slate-700 transition-all text-[11px] font-bold"
            >
              Next Alert ({activeWarningIndex + 1}/{warnings.length})
            </button>
          )}

          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab(currentWarning.category === 'BAR' ? 'bar' : 'surf')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>{currentWarning.category === 'BAR' ? 'Bar Dynamics' : 'Forecast Matrix'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-all ml-1"
            title="Dismiss Alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
