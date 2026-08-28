import React, { useState } from "react";
import { LanguageMode, SessionLog } from "../types";
import { Flame, X, Check, Star } from "lucide-react";
import confetti from "canvas-confetti";

interface SessionLoggerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageMode;
  onLogSaved: (log: SessionLog) => void;
}

export const SessionLoggerModal: React.FC<SessionLoggerProps> = ({
  isOpen,
  onClose,
  lang,
  onLogSaved
}) => {
  if (!isOpen) return null;

  const [spot, setSpot] = useState<any>("Sunset Beach Main Peak");
  const [waveCount, setWaveCount] = useState<number>(10);
  const [waveHeightFeet, setWaveHeightFeet] = useState<number>(4);
  const [boardUsed, setBoardUsed] = useState<string>("6'0 Twin Pin Rocket");
  const [rating, setRating] = useState<number>(5);
  const [notes, setNotes] = useState<string>("");
  const [stokedQuote, setStokedQuote] = useState<string>("Full noise on the left point!");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newLog: SessionLog = {
      id: "log_" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      spot,
      waveCount,
      waveHeightFeet,
      boardUsed,
      rating,
      notes: notes || "Glassy Sunset Beach session with clean waves.",
      stokedQuote: stokedQuote || "Beached as, bro!"
    };

    onLogSaved(newLog);

    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#00F0FF", "#FF9E00", "#D4AF37"]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-[#0B0E14] border border-[#FF9E00]/40 rounded-2xl max-w-lg w-full p-6 space-y-4 relative shadow-2xl animate-scaleUp">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#FF9E00]/20 text-[#FF9E00]">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">
              {lang === "reo" ? "Tukuna te Session Log" : "Log Sunset Beach Surf Session"}
            </h3>
            <p className="text-xs text-slate-400 font-mono">Record your wave stats & stoke level</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div>
            <label className="block text-slate-300 mb-1">Surf Spot:</label>
            <select
              value={spot}
              onChange={(e) => setSpot(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-[#00F0FF]"
            >
              <option value="Sunset Beach Main Peak">Sunset Beach Main Peak</option>
              <option value="Port Waikato River Mouth Bar">Port Waikato River Mouth Bar</option>
              <option value="Left Hand Point">Left Hand Point</option>
              <option value="The Dunes">The Dunes</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Board Used:</label>
            <input
              type="text"
              value={boardUsed}
              onChange={(e) => setBoardUsed(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-[#00F0FF]"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Wave Count:</label>
            <input
              type="number"
              min="1"
              max="50"
              value={waveCount}
              onChange={(e) => setWaveCount(parseInt(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-[#00F0FF]"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Wave Height (ft):</label>
            <input
              type="number"
              min="1"
              max="15"
              value={waveHeightFeet}
              onChange={(e) => setWaveHeightFeet(parseInt(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-[#00F0FF]"
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Session Stoke Rating (1-5 Stars):</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`p-1.5 rounded-lg border ${
                  rating >= star ? "bg-[#FF9E00]/20 text-[#FF9E00] border-[#FF9E00]" : "bg-slate-900 text-slate-600 border-slate-800"
                }`}
              >
                <Star className="w-5 h-5 fill-current" />
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Session Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Clean offshore lefts, fast section drops on black sand bank..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-[#00F0FF]"
          />
        </div>

        {/* Stoked Quote */}
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Stoked Kiwi / Reo Quote:</label>
          <input
            type="text"
            value={stokedQuote}
            onChange={(e) => setStokedQuote(e.target.value)}
            placeholder="e.g. Full noise on the left point!"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-[#FF9E00]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF9E00] to-amber-500 text-[#0B0E14] font-black text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Save Session to Local Logbook</span>
        </button>

      </form>
    </div>
  );
};
