import React, { useState } from 'react';
import {
  Wind,
  Compass,
  Thermometer,
  Sun,
  CloudSun,
  ArrowUpRight,
  Gauge,
  Droplets,
  ShieldCheck,
  Eye,
  Zap,
  ChevronRight
} from 'lucide-react';
import { MetServiceData } from './SurfForecastTab';
import { ClubTab } from './ClubNav';

interface SurfWeatherWidgetProps {
  data?: MetServiceData | null;
  onNavigateTab?: (tab: ClubTab) => void;
  compact?: boolean;
}

// Fallback data if data prop is missing or loading
const DEFAULT_WEATHER = {
  windSpeedKnots: 12,
  windGustKnots: 18,
  windDirectionDeg: 65,
  windCardinal: 'ENE',
  isOffshore: true,
  windQuality: 'Groomed Offshore',
  airTempC: 21.5,
  waterTempC: 18.2,
  weatherCondition: 'Partly Cloudy with Sunny Spells',
  uvIndex: 6,
  barCrossingRisk: 'LOW_RISK',
};

export const SurfWeatherWidget: React.FC<SurfWeatherWidgetProps> = ({
  data,
  onNavigateTab,
  compact = false,
}) => {
  const [unitSystem, setUnitSystem] = useState<'knots' | 'kmh'>('knots');

  const currentData = data?.current || DEFAULT_WEATHER;

  const windSpeedDisplay =
    unitSystem === 'knots'
      ? `${currentData.windSpeedKnots} kts`
      : `${Math.round(currentData.windSpeedKnots * 1.852)} km/h`;

  const windGustDisplay =
    unitSystem === 'knots'
      ? `${currentData.windGustKnots} kts`
      : `${Math.round(currentData.windGustKnots * 1.852)} km/h`;

  return (
    <div className="bg-slate-950/90 p-4 sm:p-5 rounded-2xl border border-slate-800/90 shadow-xl space-y-4 font-mono relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/20">
      {/* Top Bar Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center shrink-0">
            <CloudSun className="w-4 h-4 text-cyan-300" />
          </div>
          <div>
            <h3 className="font-bold text-white text-xs">Sunset Beach Live Weather & Wind Vector</h3>
            <p className="text-[10px] text-slate-400">MetService NZ Coastal Station 4301</p>
          </div>
        </div>

        {/* Unit Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setUnitSystem('knots')}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
              unitSystem === 'knots'
                ? 'bg-cyan-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            KTS
          </button>
          <button
            onClick={() => setUnitSystem('kmh')}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
              unitSystem === 'kmh'
                ? 'bg-cyan-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            KM/H
          </button>
        </div>
      </div>

      {/* Main 3 Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Metric 1: Wind Speed & Gusts */}
        <div className="bg-slate-900/90 p-3.5 rounded-xl border border-emerald-500/30 space-y-2 hover:border-emerald-500/60 transition-colors">
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5" /> Wind Speed
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
                currentData.isOffshore
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}
            >
              {currentData.isOffshore ? 'OFFSHORE' : 'ONSHORE'}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{windSpeedDisplay}</span>
            <span className="text-[10px] text-slate-400">Gusts: {windGustDisplay}</span>
          </div>

          <p className="text-[10px] text-emerald-300/90 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> {currentData.windQuality}
          </p>
        </div>

        {/* Metric 2: Wind Direction & Vector Dial */}
        <div className="bg-slate-900/90 p-3.5 rounded-xl border border-cyan-500/30 space-y-2 hover:border-cyan-500/60 transition-colors">
          <div className="flex items-center justify-between text-xs">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> Direction Vector
            </span>
            <span className="text-[10px] text-cyan-300 font-bold">
              {currentData.windDirectionDeg}°
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Rotating Arrow Dial */}
            <div className="w-10 h-10 rounded-full bg-slate-950 border border-cyan-500/40 flex items-center justify-center shrink-0 relative shadow-inner">
              <ArrowUpRight
                className="w-5 h-5 text-cyan-400 transition-transform duration-500"
                style={{ transform: `rotate(${currentData.windDirectionDeg - 45}deg)` }}
              />
            </div>

            <div>
              <div className="text-lg font-black text-white leading-none">
                {currentData.windCardinal}
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                Blowing towards {((currentData.windDirectionDeg + 180) % 360).toFixed(0)}°
              </span>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-0.5 border-t border-slate-800">
            <span>Coast Angle: WSW (240°)</span>
            <span className="text-cyan-300 font-bold">Offshore Angle</span>
          </div>
        </div>

        {/* Metric 3: Air & Water Temperature */}
        <div className="bg-slate-900/90 p-3.5 rounded-xl border border-amber-500/30 space-y-2 hover:border-amber-500/60 transition-colors">
          <div className="flex items-center justify-between text-xs">
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5" /> Air & Sea Temp
            </span>
            <span className="text-[10px] text-amber-300 font-bold flex items-center gap-1">
              <Sun className="w-3 h-3 text-amber-400" /> UV {currentData.uvIndex}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black text-white">{currentData.airTempC}°C</span>
              <span className="text-[10px] text-slate-400 block">Air Temp</span>
            </div>
            <div className="text-right border-l border-slate-800 pl-3">
              <span className="text-lg font-bold text-cyan-300">{currentData.waterTempC}°C</span>
              <span className="text-[10px] text-slate-400 block">Sea Water</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-300 truncate">
            {currentData.weatherCondition}
          </p>
        </div>
      </div>

      {/* Footer Navigation Link */}
      {onNavigateTab && (
        <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-900">
          <span className="flex items-center gap-1 text-slate-400">
            <Zap className="w-3 h-3 text-cyan-400" /> MetService 1-Hour Telemetry Refresh
          </span>
          <button
            onClick={() => onNavigateTab('surf')}
            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors"
          >
            <span>View Full Surf Forecast</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
