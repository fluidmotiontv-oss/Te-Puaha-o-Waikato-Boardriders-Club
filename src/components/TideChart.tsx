import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { Waves, ArrowUp, ArrowDown, Clock, ShieldAlert } from 'lucide-react';

interface TidePoint {
  time: string;
  height: number; // Tide height in meters
  type?: 'high' | 'low';
  isCurrent?: boolean;
}

// 24-hour tide curve simulation for Sunset Beach / Port Waikato
const TIDE_DATA: TidePoint[] = [
  { time: '00:00', height: 1.1 },
  { time: '02:00', height: 0.6, type: 'low' },
  { time: '04:00', height: 1.2 },
  { time: '06:00', height: 2.1 },
  { time: '08:15', height: 2.8, type: 'high' },
  { time: '10:00', height: 2.4 },
  { time: '12:00', height: 1.6 },
  { time: '14:30', height: 0.7, type: 'low' },
  { time: '16:30', height: 1.5 },
  { time: '18:45', height: 2.7, type: 'high' },
  { time: '21:00', height: 2.0 },
  { time: '23:59', height: 1.0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as TidePoint;
    return (
      <div className="bg-slate-950/95 border border-cyan-500/40 p-3 rounded-xl shadow-xl text-xs font-mono space-y-1">
        <p className="text-cyan-300 font-bold flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" /> Time: {label}
        </p>
        <p className="text-white text-sm font-bold">
          Tide Height: <span className="text-cyan-400">{data.height.toFixed(2)}m</span>
        </p>
        {data.type && (
          <p className={`text-[10px] uppercase font-bold ${data.type === 'high' ? 'text-emerald-400' : 'text-amber-400'}`}>
            {data.type === 'high' ? '▲ High Tide Point' : '▼ Low Tide Point'}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const TideChart: React.FC = () => {
  return (
    <div className="bg-slate-950/90 p-5 md:p-6 rounded-2xl border border-slate-800/90 space-y-4">
      {/* Header Info Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center shrink-0">
            <Waves className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white font-mono flex items-center gap-2">
              <span>Sunset Beach 24-Hour Hydrodynamic Tide Curve</span>
            </h3>
            <p className="text-slate-400 text-[11px] font-mono">
              Port Waikato Semi-Diurnal Astronomical Tide Cycle
            </p>
          </div>
        </div>

        {/* High / Low tide quick stats */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            <ArrowUp className="w-3.5 h-3.5" />
            <span>High: 08:15 (2.8m) & 18:45 (2.7m)</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
            <ArrowDown className="w-3.5 h-3.5" />
            <span>Low: 02:00 (0.6m) & 14:30 (0.7m)</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Container */}
      <div className="h-48 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={TIDE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
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
              domain={[0, 3.2]}
              unit="m"
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Ideal Surf Window Reference Line */}
            <ReferenceLine
              x="10:00"
              stroke="#10b981"
              strokeDasharray="3 3"
              label={{ value: 'Surf Window Open', fill: '#34d399', fontSize: 9, position: 'top' }}
            />
            <ReferenceLine
              x="14:30"
              stroke="#f59e0b"
              strokeDasharray="3 3"
              label={{ value: 'Low Tide Bar Alert', fill: '#fbbf24', fontSize: 9, position: 'top' }}
            />

            <Area
              type="monotone"
              dataKey="height"
              stroke="#06b6d4"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#tideGradient)"
              activeDot={{ r: 6, fill: '#38bdf8', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Legend / Tip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-900 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span>Optimal Surfing Tide: 2.0m – 2.6m (Pushing High)</span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-300">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Ebb tide max current: 11:30 – 14:00 (Caution on river bar)</span>
        </div>
      </div>
    </div>
  );
};
