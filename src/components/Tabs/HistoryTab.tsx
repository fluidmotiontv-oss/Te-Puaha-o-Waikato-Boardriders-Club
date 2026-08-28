import React from "react";
import { LanguageMode, SessionLog } from "../../types";
import { Flame, Star, Trash2, Calendar, MapPin, Waves, Sparkles } from "lucide-react";
import { KowhaiwhaiPattern } from "../KowhaiwhaiPattern";

interface HistoryTabProps {
  lang: LanguageMode;
  sessions: SessionLog[];
  onDeleteLog: (id: string) => void;
  onOpenLogger: () => void;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({
  lang,
  sessions,
  onDeleteLog,
  onOpenLogger
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-3">
        <KowhaiwhaiPattern color="#FF9E00" height={16} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#FF9E00]" />
              {lang === "reo" ? "Pukapuka Eke Ngaru • Session Logbook" : "Local Sunset Beach Session Logbook"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {lang === "reo" ? "Ngā Haerenga o te Moana" : "Recorded Surf Sessions"}
            </h3>
            <p className="text-slate-300 text-sm">
              {lang === "reo" 
                ? "Tukuna ōu haerenga ki Sunset Beach me te awa o Waikato."
                : "Personal surf logbook saved locally in your browser. Track wave counts, boards used, and stoke ratings."
              }
            </p>
          </div>

          <button
            onClick={onOpenLogger}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF9E00] to-amber-500 text-[#0B0E14] font-black text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,158,0,0.3)]"
          >
            <Flame className="w-4 h-4" />
            <span>{lang === "reo" ? "Tukuna te Session Log" : "Log New Session"}</span>
          </button>
        </div>
      </div>

      {/* Sessions Grid */}
      {sessions.length === 0 ? (
        <div className="bg-slate-900/60 p-12 rounded-2xl border border-slate-800 text-center space-y-4">
          <Waves className="w-12 h-12 text-[#00F0FF] mx-auto opacity-50" />
          <h4 className="text-xl font-bold text-white">No Sessions Logged Yet</h4>
          <p className="text-slate-400 text-xs max-w-md mx-auto">
            Hit the button above to record your first Sunset Beach or Port Waikato river bar surf session!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map((log) => (
            <div key={log.id} className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3 relative group hover:border-[#00F0FF]/40 transition-colors shadow-lg">
              
              <button
                onClick={() => onDeleteLog(log.id)}
                className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                title="Delete session"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{log.date}</span>
                <span>•</span>
                <MapPin className="w-3.5 h-3.5 text-[#FF9E00]" />
                <span className="text-slate-300 font-bold">{log.spot}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono text-xs bg-[#0B0E14] p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[10px]">WAVES</span>
                  <span className="font-bold text-[#00F0FF] text-sm">{log.waveCount} waves</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">HEIGHT</span>
                  <span className="font-bold text-[#FF9E00] text-sm">{log.waveHeightFeet} ft</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">BOARD</span>
                  <span className="font-bold text-white text-xs truncate block">{log.boardUsed}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 italic leading-relaxed">"{log.notes}"</p>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-[#FF9E00]">
                  {[...Array(log.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-cyan-300 font-mono text-[11px] font-bold">"{log.stokedQuote}"</span>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
