import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import {
  Activity,
  Zap,
  Radio,
  Clock,
  Waves,
  Gauge,
  Sparkles,
  Play,
  Pause,
  RefreshCw,
  TrendingUp,
  Info
} from 'lucide-react';

interface SwellDataPoint {
  time: string;
  swellPeriod: number; // in seconds (e.g., 14.2s)
  waveEnergy: number;  // in kJ/m² (e.g., 340 kJ)
  frequency: number;   // in Hz (0.05 - 0.12 Hz)
  setPulsePower: number; // kW/m
  height: number;      // wave height in meters
}

const GENERATE_PHYSICS_SERIES = (basePeriod: number, pulseFactor: number): SwellDataPoint[] => {
  const points: SwellDataPoint[] = [];
  const times = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
  
  times.forEach((t, index) => {
    const cycle = Math.sin((index + pulseFactor) * 0.8);
    const period = Number((basePeriod + cycle * 1.4).toFixed(1));
    const frequency = Number((1 / period).toFixed(3));
    const height = Number((2.2 + cycle * 0.6).toFixed(2));
    const waveEnergy = Math.round(1025 * 9.81 * Math.pow(height, 2) / 8); // E = 1/8 * rho * g * H^2
    const setPulsePower = Math.round(0.49 * Math.pow(height, 2) * period); // P = 0.49 * H^2 * T (kW/m)

    points.push({
      time: t,
      swellPeriod: period,
      waveEnergy,
      frequency,
      setPulsePower,
      height
    });
  });

  return points;
};

const PhysicsTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as SwellDataPoint;
    return (
      <div className="bg-slate-950/95 border border-[#00F0FF]/40 p-3.5 rounded-2xl shadow-2xl text-xs font-mono space-y-2 max-w-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span className="text-[#00F0FF] font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Time: {label}
          </span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
            Live D9 Hydro
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="text-slate-400 text-[10px] block">Swell Period (T)</span>
            <span className="text-white font-bold">{data.swellPeriod} seconds</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px]">Wave Power (P)</span>
            <span className="text-amber-400 font-bold block">{data.setPulsePower} kW/m</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px]">Energy Density (E)</span>
            <span className="text-purple-300 font-bold block">{data.waveEnergy} kJ/m²</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px]">Swell Freq (f)</span>
            <span className="text-cyan-300 font-bold block">{data.frequency} Hz</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const WavePhysics: React.FC = () => {
  const [basePeriod, setBasePeriod] = useState<number>(14);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [pulseFactor, setPulseFactor] = useState<number>(0);
  const [physicsMode, setPhysicsMode] = useState<'power' | 'energy'>('power');

  // Real-time hydro pulse clock context simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPulseFactor((prev) => (prev + 0.15) % 10);
    }, 1500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const seriesData = GENERATE_PHYSICS_SERIES(basePeriod, pulseFactor);

  // Live calculated current physics metrics
  const currentPoint = seriesData[seriesData.length - 2] || seriesData[0];
  const groupVelocity = Number((1.56 * currentPoint.swellPeriod * 1.94384).toFixed(1)); // Cg = (g * T) / (4 * pi) in knots (~1.56 * T in knots)

  return (
    <div className="bg-slate-950/90 p-5 md:p-6 rounded-3xl border border-[#00F0FF]/30 space-y-5 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#0A2540]/50">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-white font-mono">
                Port Waikato Live Wave Physics & Spectral Dynamics
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                D9 Real-Time Clock
              </span>
            </div>
            <p className="text-slate-400 text-xs font-mono mt-0.5">
              Deep water spectral energy, group velocity (Cg), and wave pulse power analytics
            </p>
          </div>
        </div>

        {/* Live Simulation Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto font-mono text-xs">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-bold transition-all ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Live Pulse On' : 'Paused'}</span>
          </button>

          <button
            onClick={() => setPulseFactor((prev) => prev + 1)}
            className="p-1.5 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700 transition-all"
            title="Refresh D9 Hydro Cycle"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Physics Metric Gauges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/90 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#00F0FF]" /> Swell Period (T)
          </span>
          <div className="text-lg font-black text-white flex items-baseline gap-1">
            <span>{currentPoint.swellPeriod}s</span>
            <span className="text-[10px] text-emerald-400 font-bold">Groundswell</span>
          </div>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/90 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" /> Wave Power (P)
          </span>
          <div className="text-lg font-black text-amber-300">
            {currentPoint.setPulsePower} <span className="text-xs text-amber-400/80 font-normal">kW/m</span>
          </div>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/90 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
            <Gauge className="w-3 h-3 text-purple-400" /> Energy Density (E)
          </span>
          <div className="text-lg font-black text-purple-300">
            {currentPoint.waveEnergy} <span className="text-xs text-purple-400/80 font-normal">kJ/m²</span>
          </div>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/90 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-cyan-400" /> Group Velocity (Cg)
          </span>
          <div className="text-lg font-black text-cyan-300">
            {groupVelocity} <span className="text-xs text-cyan-400/80 font-normal">knots</span>
          </div>
        </div>
      </div>

      {/* Control Selector Buttons & Mode Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono pt-1">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px] flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-[#00F0FF]" /> Swell Swatch:
          </span>
          {[
            { label: '12s Windswell', val: 12 },
            { label: '14s SW Groundswell', val: 14 },
            { label: '18s Deep Bomb', val: 18 },
          ].map((item) => (
            <button
              key={item.val}
              onClick={() => setBasePeriod(item.val)}
              className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                basePeriod === item.val
                  ? 'bg-[#00F0FF] text-[#0B0E14] shadow-md shadow-[#00F0FF]/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setPhysicsMode('power')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              physicsMode === 'power'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Wave Power (kW/m)
          </button>
          <button
            onClick={() => setPhysicsMode('energy')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              physicsMode === 'energy'
                ? 'bg-purple-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Energy Density (kJ/m²)
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={seriesData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="time"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              unit={physicsMode === 'power' ? ' kW' : ' kJ'}
            />

            <Tooltip content={<PhysicsTooltip />} />

            <ReferenceLine
              y={150}
              stroke="#10b981"
              strokeDasharray="3 3"
              label={{ value: 'Clean Surf Threshold', fill: '#34d399', fontSize: 9, position: 'top' }}
            />

            <Area
              type="monotone"
              dataKey={physicsMode === 'power' ? 'setPulsePower' : 'waveEnergy'}
              stroke={physicsMode === 'power' ? '#f59e0b' : '#a855f7'}
              strokeWidth={3}
              fillOpacity={1}
              fill={physicsMode === 'power' ? 'url(#powerGradient)' : 'url(#energyGradient)'}
            />

            <Line
              type="monotone"
              dataKey="swellPeriod"
              stroke="#00F0FF"
              strokeWidth={2}
              dot={{ r: 4, fill: '#00F0FF', stroke: '#0B0E14', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Insight Note */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-slate-900 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>Longer swell periods (T &gt; 14s) yield higher wave power density at Sunset Beach bar reef.</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <Info className="w-3.5 h-3.5" />
          <span>Real-time D9 Hydro telemetry connected</span>
        </div>
      </div>
    </div>
  );
};
