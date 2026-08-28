import React, { useState } from "react";
import { LanguageMode, BoardQuiverItem } from "../../types";
import { surfboardQuiver } from "../../data/clubData";
import { SurfboardSVG } from "../SurfboardSVG";
import { Flame, Sparkles, Sliders, Waves, Check, RefreshCw } from "lucide-react";
import { KowhaiwhaiPattern } from "../KowhaiwhaiPattern";

interface QuiverTabProps {
  lang: LanguageMode;
}

export const QuiverTab: React.FC<QuiverTabProps> = ({ lang }) => {
  const [quiverList] = useState<BoardQuiverItem[]>(surfboardQuiver);
  const [selectedBoard, setSelectedBoard] = useState<BoardQuiverItem>(surfboardQuiver[0]);

  // AI Shaper Calculator State
  const [weightKg, setWeightKg] = useState<number>(75);
  const [experience, setExperience] = useState<string>("Intermediate");
  const [waveHeightFt, setWaveHeightFt] = useState<number>(4);
  const [waveType, setWaveType] = useState<string>("Sunset Beach Black Sand Barrels");

  const [aiResult, setAiResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const handleCalculateBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    try {
      const res = await fetch("/api/quiver-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weightKg,
          experience,
          waveHeightFt,
          waveType,
          lang
        })
      });
      const data = await res.json();
      setAiResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner Header */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-3">
        <KowhaiwhaiPattern color="#00F0FF" height={16} />

        <div>
          <span className="text-xs font-mono font-bold text-[#FF9E00] uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#00F0FF]" />
            {lang === "reo" ? "Te Codex Papahoe • Quiver Inspector" : "Sunset Beach Quiver Inspector & Surfboard Codex"}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {lang === "reo" ? "Ngā Papa Eke Ngaru o Sunset Beach" : "The Sunset Beach Quiver & Board Matcher"}
          </h3>
          <p className="text-slate-300 text-sm">
            {lang === "reo" 
              ? "He mea whakarite ngā papa nei mo te awa, ngā ngaru kōpahi me te one maangumangu o Port Waikato."
              : "An interactive breakdown of surfboards designed specifically for Sunset Beach's heavy beach breaks and river mouth barrels."
            }
          </p>
        </div>
      </div>

      {/* Main Quiver Codex & Inspector Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List of Boards */}
        <div className="lg:col-span-5 space-y-3">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider px-1">
            {lang === "reo" ? "Kōwhiri Papa (Select Board)" : "Sunset Beach Quiver Collection"}
          </h4>

          {quiverList.map((board) => {
            const isSelected = selectedBoard.id === board.id;

            return (
              <div
                key={board.id}
                onClick={() => setSelectedBoard(board)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                  isSelected
                    ? "bg-[#0A2540] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60"
                }`}
              >
                <div className="w-12 h-24 shrink-0 flex items-center justify-center bg-[#0B0E14] rounded-xl p-1 border border-slate-800">
                  <SurfboardSVG shapeType={board.svgShapeType} accentColor={board.accentColor} className="w-8 h-20" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300">
                    {board.type}
                  </span>
                  <h4 className="font-bold text-white text-base leading-snug">{board.name}</h4>
                  <p className="text-xs text-[#00F0FF] font-mono">{board.idealWaveHeight} • Volume: {board.volumeRange}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Board Inspector Detailed View */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-[#00F0FF]/30 p-6 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Inspector Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#FF9E00] uppercase">
                {selectedBoard.shaper} • {selectedBoard.type}
              </span>
              <h3 className="text-2xl font-black text-white mt-1">{selectedBoard.name}</h3>
              <p className="text-xs text-slate-300 italic mt-0.5">
                {lang === "reo" ? selectedBoard.taglineReo : selectedBoard.taglineEn}
              </p>
            </div>

            <div className="w-20 h-40 bg-[#0B0E14] rounded-2xl p-2 border border-[#00F0FF]/40 shadow-inner flex items-center justify-center shrink-0">
              <SurfboardSVG shapeType={selectedBoard.svgShapeType} accentColor={selectedBoard.accentColor} className="w-14 h-36" />
            </div>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="bg-[#0B0E14] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">WAVE RANGE</span>
              <span className="font-bold text-[#00F0FF] text-sm">{selectedBoard.idealWaveHeight}</span>
            </div>
            <div className="bg-[#0B0E14] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">LENGTH</span>
              <span className="font-bold text-white text-sm">{selectedBoard.lengthRange}</span>
            </div>
            <div className="bg-[#0B0E14] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">FIN SETUP</span>
              <span className="font-bold text-[#FF9E00] text-sm">{selectedBoard.finSetup}</span>
            </div>
            <div className="bg-[#0B0E14] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">VOLUME</span>
              <span className="font-bold text-emerald-400 text-sm">{selectedBoard.volumeRange}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h5 className="text-xs font-mono font-bold text-slate-400 uppercase">Shaper Mechanics & Design Notes</h5>
            <p className="text-xs text-slate-300 leading-relaxed bg-[#0B0E14]/60 p-4 rounded-xl border border-slate-800">
              {lang === "reo" ? selectedBoard.descriptionReo : selectedBoard.descriptionEn}
            </p>
          </div>

        </div>

      </div>

      {/* AI Shaper Custom Board Recommender */}
      <div className="bg-slate-900/90 rounded-2xl border border-[#FF9E00]/40 p-6 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#FF9E00]/20 border border-[#FF9E00]/50 text-[#FF9E00]">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-wider">
              AI Shaper Calculator • Gemini Powered
            </span>
            <h3 className="text-2xl font-black text-white">
              {lang === "reo" ? "Whakakatika Papa AI (Custom Board Matcher)" : "Custom Board Shape & Volume Calculator"}
            </h3>
          </div>
        </div>

        <form onSubmit={handleCalculateBoard} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          
          <div>
            <label className="block text-slate-300 mb-1">Surfer Weight (kg):</label>
            <input
              type="number"
              min="30"
              max="130"
              value={weightKg}
              onChange={(e) => setWeightKg(parseInt(e.target.value))}
              className="w-full bg-[#0B0E14] border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-[#FF9E00]"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Ability Level:</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-[#0B0E14] border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-[#FF9E00]"
            >
              <option value="Grom / Junior">Grom / Junior Charger</option>
              <option value="Intermediate">Intermediate Surfer</option>
              <option value="Advanced / Club Competitor">Advanced / Club Competitor</option>
              <option value="Legends / Master">Legends / Master</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Target Wave Height (ft):</label>
            <input
              type="number"
              min="2"
              max="12"
              value={waveHeightFt}
              onChange={(e) => setWaveHeightFt(parseInt(e.target.value))}
              className="w-full bg-[#0B0E14] border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-[#FF9E00]"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Break Style:</label>
            <select
              value={waveType}
              onChange={(e) => setWaveType(e.target.value)}
              className="w-full bg-[#0B0E14] border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-[#FF9E00]"
            >
              <option value="Sunset Beach Black Sand Barrels">Sunset Beach Black Sand Barrels</option>
              <option value="Port Waikato River Mouth Point Lefts">Port Waikato River Mouth Point Lefts</option>
              <option value="Summer Fat Peak Beachbreaks">Summer Fat Peak Beachbreaks</option>
            </select>
          </div>

          <div className="sm:col-span-2 lg:col-span-4 pt-2">
            <button
              type="submit"
              disabled={isCalculating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF9E00] to-amber-500 text-[#0B0E14] font-black text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,158,0,0.3)] disabled:opacity-50"
            >
              {isCalculating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isCalculating ? "Calculating Board Specs..." : "Calculate Ideal Board Dimensions"}</span>
            </button>
          </div>

        </form>

        {/* AI Result Card */}
        {aiResult && (
          <div className="bg-[#0B0E14] p-5 rounded-2xl border border-[#00F0FF]/40 text-xs space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-[#00F0FF] font-mono text-sm uppercase">
                {aiResult.boardName || "Recommended Sunset Shaper Custom"}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] font-mono font-bold">
                {aiResult.recommendedVolume}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">LENGTH</span>
                <span className="font-bold text-white text-sm">{aiResult.boardLength}</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">WIDTH</span>
                <span className="font-bold text-white text-sm">{aiResult.boardWidth}</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">THICKNESS</span>
                <span className="font-bold text-white text-sm">{aiResult.thickness}</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">FIN SETUP</span>
                <span className="font-bold text-[#FF9E00] text-sm">{aiResult.finSetup}</span>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed font-sans">{aiResult.shaperNotes}</p>
          </div>
        )}

      </div>

    </div>
  );
};
