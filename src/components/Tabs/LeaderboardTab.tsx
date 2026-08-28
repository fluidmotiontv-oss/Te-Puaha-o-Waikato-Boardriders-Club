import React, { useState } from "react";
import { LanguageMode, SurferRanking } from "../../types";
import { clubRankings } from "../../data/clubData";
import { Award, Trophy, Star, Flame, Search, PlusCircle, Sparkles, X, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { KowhaiwhaiPattern } from "../KowhaiwhaiPattern";

interface LeaderboardTabProps {
  lang: LanguageMode;
}

export const LeaderboardTab: React.FC<LeaderboardTabProps> = ({ lang }) => {
  const [rankings, setRankings] = useState<SurferRanking[]>(clubRankings);
  const [activeDivision, setActiveDivision] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSurfer, setSelectedSurfer] = useState<SurferRanking | null>(null);

  // Heat Score Modal state
  const [isScoreModalOpen, setIsScoreModalOpen] = useState<boolean>(false);
  const [scoreSurferId, setScoreSurferId] = useState<string>(rankings[0]?.id || "s1");
  const [newWave1, setNewWave1] = useState<number>(8.5);
  const [newWave2, setNewWave2] = useState<number>(7.8);

  const divisions = ["All", "Open Men's", "Women's", "Grom Squad", "Legends & Masters"];

  const filteredRankings = rankings.filter(s => {
    const matchesDiv = activeDivision === "All" || s.division === activeDivision;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (s.nickname && s.nickname.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          s.homeBreak.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiv && matchesSearch;
  });

  // Handle score submission
  const handleAddHeatScore = (e: React.FormEvent) => {
    e.preventDefault();
    const totalNewPoints = Math.round((newWave1 + newWave2) * 80);

    setRankings(prev =>
      prev.map(surfer => {
        if (surfer.id === scoreSurferId) {
          const updatedPoints = surfer.totalPoints + totalNewPoints;
          const bestScore = Math.max(surfer.highestWaveScore, newWave1, newWave2);
          return {
            ...surfer,
            totalPoints: updatedPoints,
            heatWins: surfer.heatWins + 1,
            highestWaveScore: parseFloat(bestScore.toFixed(1))
          };
        }
        return surfer;
      }).sort((a, b) => b.totalPoints - a.totalPoints)
    );

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00F0FF", "#FF9E00", "#D4AF37"]
    });

    setIsScoreModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Leaderboard Header Banner */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <KowhaiwhaiPattern color="#FF9E00" height={16} />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-[#FF9E00]" />
              {lang === "reo" ? "Rāngai Toa • Club Championships 2026" : "2026 Boardriders Club Championship Ladder"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {lang === "reo" ? "Ngā Toa o Te Puaha o Waikato" : "Sunset Beach Club Competition Ladder"}
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              {lang === "reo" 
                ? "Ngā tohu eke ngaru mō ngā Tāne, ngā Wāhine, te Grom Squad, me ngā Legends o Port Waikato."
                : "Official club rankings across Open Men's, Women's, Grom Squad, and Legends divisions."
              }
            </p>
          </div>

          <button
            onClick={() => setIsScoreModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF9E00] to-amber-500 text-[#0B0E14] font-black text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,158,0,0.3)]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{lang === "reo" ? "Tukuna te Heat Score" : "Log Heat Score"}</span>
          </button>
        </div>

        {/* Division Filters & Search Input */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {divisions.map(div => (
              <button
                key={div}
                onClick={() => setActiveDivision(div)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeDivision === div
                    ? "bg-[#00F0FF] text-[#0B0E14] shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                    : "bg-slate-800/80 text-slate-300 hover:text-white"
                }`}
              >
                {div}
              </button>
            ))}
          </div>

          <div className="relative min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === "reo" ? "Hoki ki te ingoa..." : "Search surfer name..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B0E14] border border-slate-700 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:border-[#00F0FF] outline-none"
            />
          </div>

        </div>
      </div>

      {/* Top 3 Podium Highlights (If viewing All or specific division) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredRankings.slice(0, 3).map((surfer, index) => {
          const podiumGradients = [
            "from-[#D4AF37]/20 via-[#0B0E14] to-[#0B0E14] border-[#D4AF37]", // 1st Gold
            "from-cyan-500/15 via-[#0B0E14] to-[#0B0E14] border-[#00F0FF]", // 2nd Cyan
            "from-[#FF9E00]/15 via-[#0B0E14] to-[#0B0E14] border-[#FF9E00]"  // 3rd Amber
          ];
          const badgeText = index === 0 ? "1ST PLACE • DIVISION LEADER" : index === 1 ? "2ND PLACE" : "3RD PLACE";

          return (
            <div
              key={surfer.id}
              onClick={() => setSelectedSurfer(surfer)}
              className={`bg-gradient-to-b ${podiumGradients[index]} rounded-2xl border p-5 cursor-pointer hover:scale-[1.02] transition-transform relative group overflow-hidden shadow-lg`}
            >
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/10 text-white font-mono">
                  {badgeText}
                </span>
                <Trophy className={`w-5 h-5 ${index === 0 ? "text-[#D4AF37]" : index === 1 ? "text-[#00F0FF]" : "text-[#FF9E00]"}`} />
              </div>

              <div className="flex items-center gap-4 mt-4">
                <img
                  src={surfer.avatarUrl}
                  alt={surfer.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-md"
                />
                <div>
                  <h4 className="font-black text-white text-lg group-hover:text-[#00F0FF] transition-colors">{surfer.name}</h4>
                  <p className="text-xs text-[#FF9E00] font-mono">{surfer.nickname || surfer.division}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{surfer.homeBreak}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">TOTAL POINTS</span>
                  <span className="font-bold text-[#00F0FF] text-base">{surfer.totalPoints} pts</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">BEST WAVE</span>
                  <span className="font-bold text-[#FF9E00] text-base">{surfer.highestWaveScore} /10</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Leaderboard Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0B0E14] border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Rank</th>
                <th className="py-3.5 px-4">Surfer</th>
                <th className="py-3.5 px-4">Division</th>
                <th className="py-3.5 px-4">Heat Wins</th>
                <th className="py-3.5 px-4">High Wave</th>
                <th className="py-3.5 px-4">Points</th>
                <th className="py-3.5 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {filteredRankings.map((surfer, idx) => (
                <tr
                  key={surfer.id}
                  onClick={() => setSelectedSurfer(surfer)}
                  className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-white">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg ${
                      idx === 0 ? "bg-[#D4AF37]/20 text-[#D4AF37]" : idx === 1 ? "bg-[#00F0FF]/20 text-[#00F0FF]" : "bg-slate-800 text-slate-300"
                    }`}>
                      #{idx + 1}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={surfer.avatarUrl}
                        alt={surfer.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <span className="font-bold text-white block text-sm font-sans">{surfer.name}</span>
                        <span className="text-[10px] text-[#FF9E00]">{surfer.nickname}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-sans text-slate-300">
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[11px]">
                      {surfer.division}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300 font-bold">
                    {surfer.heatWins} heats
                  </td>

                  <td className="py-3.5 px-4 text-[#FF9E00] font-bold">
                    {surfer.highestWaveScore} /10
                  </td>

                  <td className="py-3.5 px-4 text-[#00F0FF] font-bold text-sm">
                    {surfer.totalPoints} pts
                  </td>

                  <td className="py-3.5 px-4 font-sans">
                    <button className="text-[11px] text-[#00F0FF] font-bold hover:underline">
                      View Profile →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Surfer Profile Modal */}
      {selectedSurfer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0B0E14] border border-[#00F0FF]/40 rounded-2xl max-w-lg w-full p-6 space-y-5 relative shadow-[0_0_40px_rgba(0,240,255,0.2)] animate-scaleUp">
            
            <button
              onClick={() => setSelectedSurfer(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/80"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <img
                src={selectedSurfer.avatarUrl}
                alt={selectedSurfer.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#00F0FF]"
              />
              <div>
                <span className="px-2 py-0.5 rounded bg-[#00F0FF]/20 text-[#00F0FF] text-[10px] font-mono font-bold uppercase">
                  {selectedSurfer.division}
                </span>
                <h3 className="text-2xl font-black text-white">{selectedSurfer.name}</h3>
                <p className="text-xs text-[#FF9E00] font-mono">"{selectedSurfer.nickname}" • {selectedSurfer.homeBreak}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed italic">
                {lang === "reo" ? selectedSurfer.bioReo : selectedSurfer.bioEn}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px]">FAVORITE BOARD</span>
                  <p className="font-bold text-white">{selectedSurfer.favoriteBoard}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">HIGHEST WAVE SCORE</span>
                  <p className="font-bold text-[#FF9E00]">{selectedSurfer.highestWaveScore} /10</p>
                </div>
              </div>

              {/* Club Badges */}
              <div>
                <p className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-2">Club Honors & Badges</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSurfer.badges.map((badge, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#FF9E00]/15 border border-[#FF9E00]/40 text-[#FF9E00] text-xs font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedSurfer(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 transition-colors"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Log Heat Score Modal */}
      {isScoreModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddHeatScore} className="bg-[#0B0E14] border border-[#FF9E00]/40 rounded-2xl max-w-md w-full p-6 space-y-4 relative shadow-2xl">
            
            <button
              type="button"
              onClick={() => setIsScoreModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#FF9E00]" />
              {lang === "reo" ? "Tukuna te Heat Score" : "Log Club Comp Heat Result"}
            </h3>

            <div>
              <label className="block text-xs text-slate-300 font-bold mb-1">Select Surfer:</label>
              <select
                value={scoreSurferId}
                onChange={(e) => setScoreSurferId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-[#FF9E00]"
              >
                {rankings.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.division})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Wave 1 Score (0-10):</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={newWave1}
                  onChange={(e) => setNewWave1(parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-[#00F0FF]"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Wave 2 Score (0-10):</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={newWave2}
                  onChange={(e) => setNewWave2(parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-[#00F0FF]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF9E00] to-amber-500 text-[#0B0E14] font-black text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Submit Score & Update Leaderboard</span>
            </button>

          </form>
        </div>
      )}

    </div>
  );
};
