import React, { useState } from "react";
import { LanguageMode } from "../../types";
import { sponsorsListData } from "../../data/clubData";
import { HeartHandshake, Flame, Coffee, Leaf, Tv, ExternalLink, Ticket, Check } from "lucide-react";
import confetti from "canvas-confetti";

interface SponsorsTabProps {
  lang: LanguageMode;
}

export const SponsorsTab: React.FC<SponsorsTabProps> = ({ lang }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#00F0FF", "#FF9E00", "#D4AF37"]
    });
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Shaper & Glassing":
        return <Flame className="w-5 h-5 text-[#FF9E00]" />;
      case "Eatery & Coffee":
        return <Coffee className="w-5 h-5 text-amber-400" />;
      case "Eco & Coastal":
        return <Leaf className="w-5 h-5 text-emerald-400" />;
      default:
        return <Tv className="w-5 h-5 text-[#FF007F]" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B0E14] via-[#0A2540] to-[#0B0E14] border-2 border-emerald-500/40 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase">
              <HeartHandshake className="w-3.5 h-3.5" />
              {lang === "reo" ? "Ngā Kaihapū o te Rohe" : "Sponsors & Local Business Grid"}
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              {lang === "reo" ? "Support Local • Kaupapa Partners" : "Local Shapers, Eateries & Eco Partners"}
            </h2>
            <p className="text-slate-300 text-sm max-w-xl">
              {lang === "reo"
                ? "He mihi nui ki ngā pakihi o Port Waikato me Waikato mo tā rātou awhi i te rōpū Boardriders."
                : "Supporting the local businesses that fuel our club heats, shape our step-ups, serve flat whites, and restore Port Waikato sand dunes."}
            </p>
          </div>
        </div>
      </div>

      {/* Sponsors Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sponsorsListData.map((sponsor) => (
          <div
            key={sponsor.id}
            className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 space-y-4 hover:border-[#00F0FF]/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0B0E14] border border-slate-700 flex items-center justify-center p-2">
                    {getCategoryIcon(sponsor.category)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      {sponsor.category}
                    </span>
                    <h3 className="text-lg font-black text-white">{sponsor.name}</h3>
                  </div>
                </div>

                {sponsor.badge && (
                  <span className="px-2.5 py-1 rounded-full bg-[#FF9E00]/15 text-[#FF9E00] border border-[#FF9E00]/30 text-[10px] font-mono font-bold">
                    {sponsor.badge}
                  </span>
                )}
              </div>

              <p className="text-xs font-bold text-cyan-300">{sponsor.tagline}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{sponsor.description}</p>

              {sponsor.featuredProduct && (
                <div className="bg-[#0B0E14] p-3 rounded-2xl border border-slate-800 text-xs">
                  <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">Featured Product / Service:</span>
                  <span className="font-bold text-amber-300">{sponsor.featuredProduct}</span>
                </div>
              )}
            </div>

            {/* Bottom Actions: Member Promo Code & Website */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              {sponsor.discountCode ? (
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] font-mono text-xs font-bold flex items-center gap-1.5">
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{sponsor.discountCode}</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(sponsor.discountCode!)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 transition-colors"
                  >
                    {copiedCode === sponsor.discountCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : "Copy Code"}
                  </button>
                </div>
              ) : (
                <span className="text-xs text-emerald-400 font-mono">Community Eco Partner</span>
              )}

              <a
                href={sponsor.websiteUrl}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Visiting partner site: ${sponsor.name}`);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Partner Info</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
