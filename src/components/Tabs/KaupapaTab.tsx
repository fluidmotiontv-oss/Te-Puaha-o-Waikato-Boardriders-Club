import React, { useRef, useEffect } from "react";
import { LanguageMode } from "../../types";
import { kaupapaArticles } from "../../data/clubData";
import { ShieldAlert, Flame, Waves, Heart, BookOpen, Compass, CheckCircle2 } from "lucide-react";
import { KowhaiwhaiPattern } from "../KowhaiwhaiPattern";

interface KaupapaTabProps {
  lang: LanguageMode;
}

export const KaupapaTab: React.FC<KaupapaTabProps> = ({ lang }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated Rip Current Diagram Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      const w = canvas.width;
      const h = canvas.height;

      // Dark sea canvas background
      ctx.fillStyle = "#0B0E14";
      ctx.fillRect(0, 0, w, h);

      // Black Sand Shoreline at bottom
      ctx.fillStyle = "#18202E";
      ctx.fillRect(0, h * 0.75, w, h * 0.25);

      ctx.fillStyle = "#D4AF37";
      ctx.font = "bold 12px monospace";
      ctx.fillText("ONE MAANGUMANGU (BLACK SAND BEACH)", 20, h - 15);

      // Waves breaking
      ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        const waveY = h * 0.45 + i * 30 + Math.sin(t + i) * 5;
        ctx.beginPath();
        ctx.moveTo(0, waveY);
        ctx.quadraticCurveTo(w * 0.5, waveY - 10, w, waveY);
        ctx.stroke();
      }

      // Strong Rip Current Arrow Flowing Out To Sea (Upward)
      const ripX = w * 0.5;
      ctx.strokeStyle = "#FF9E00";
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(ripX, h * 0.75);
      ctx.lineTo(ripX, h * 0.2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Particles moving in rip current
      ctx.fillStyle = "#FF9E00";
      for (let p = 0; p < 6; p++) {
        const particleY = (h * 0.75) - ((t * 60 + p * 40) % (h * 0.55));
        ctx.beginPath();
        ctx.arc(ripX, particleY, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Parallel Escape Routes (Arrows pointing Left and Right out of the rip)
      ctx.strokeStyle = "#00F0FF";
      ctx.lineWidth = 3;

      // Left Escape Arrow
      ctx.beginPath();
      ctx.moveTo(ripX, h * 0.45);
      ctx.lineTo(ripX - 80, h * 0.45);
      ctx.stroke();

      // Right Escape Arrow
      ctx.beginPath();
      ctx.moveTo(ripX, h * 0.45);
      ctx.lineTo(ripX + 80, h * 0.45);
      ctx.stroke();

      // Escape Route Labels
      ctx.fillStyle = "#00F0FF";
      ctx.font = "bold 11px monospace";
      ctx.fillText("← ESCAPE ROUTE (PARALLEL TO SHORE)", ripX - 220, h * 0.45 - 8);
      ctx.fillText("ESCAPE ROUTE →", ripX + 90, h * 0.45 - 8);

      // Warning label in rip
      ctx.fillStyle = "#FF9E00";
      ctx.font = "bold 11px monospace";
      ctx.fillText("RIP CURRENT (DO NOT FIGHT)", ripX - 85, h * 0.3);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-3">
        <KowhaiwhaiPattern color="#D4AF37" height={16} />

        <div>
          <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-[#FF9E00]" />
            {lang === "reo" ? "Kaupapa & Tikanga • Te Puaha o Waikato" : "Tangaroa Veneration & Local Kaupapa"}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {lang === "reo" ? "Kia Maia ki ngā Ngaru — Respect & Manaakitanga" : "Tangaroa, Water Safety & Cultural Kaupapa"}
          </h3>
          <p className="text-slate-300 text-sm">
            {lang === "reo" 
              ? "Te hononga o te tangata ki te moana, te kawa o te awa, me te tiaki i ngā dunes o Sunset Beach."
              : "Honoring Tangaroa, preserving black sand dunes, understanding West Coast rip current dynamics, and local surfing etiquette."
            }
          </p>
        </div>
      </div>

      {/* Rip Current Visualizer Section */}
      <div className="bg-slate-900/90 rounded-2xl border border-[#FF9E00]/40 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#FF9E00]" />
            <h4 className="font-bold text-white text-base">
              {lang === "reo" ? "Whakakitenga Rip Current o Sunset Beach" : "Sunset Beach Rip Current & Safety Diagram"}
            </h4>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#FF9E00]/20 text-[#FF9E00] font-mono text-xs font-bold">
            DO NOT PANIC • FLOAT & PADDLE PARALLEL
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {lang === "reo" 
            ? "Mēnā ka hopukia e te rip current i Sunset Beach: Kaua e pukuriri ki te ngaru! Hoe whakarite ki te taha moana (parallel to beach) kia puta mai i te awa."
            : "Sunset Beach features powerful feeder rips that flow out along the black sand banks into the river channel. If caught, relax, float on your surfboard, and paddle parallel to the shore."
          }
        </p>

        {/* Animated Rip Visualizer Canvas */}
        <div className="w-full rounded-xl overflow-hidden border border-slate-800 bg-[#0B0E14] aspect-[2/1]">
          <canvas
            ref={canvasRef}
            width={700}
            height={350}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Kaupapa Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kaupapaArticles.map((art) => (
          <div key={art.id} className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-lg hover:border-[#00F0FF]/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded-lg bg-[#00F0FF]/15 text-[#00F0FF] text-[10px] font-mono font-bold uppercase">
                {art.category}
              </span>
              <h4 className="font-black text-white text-lg leading-snug">
                {lang === "reo" ? art.titleReo : art.titleEn}
              </h4>
              <p className="text-xs text-[#FF9E00] font-mono">
                {lang === "reo" ? art.subtitleReo : art.subtitleEn}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
                {(lang === "reo" ? art.contentReo : art.contentEn).map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 bg-[#0B0E14] p-3 rounded-xl border border-slate-800 text-xs text-emerald-400 font-mono font-bold flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{lang === "reo" ? art.keyTakeawayReo : art.keyTakeawayEn}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Local Etiquette & Glossary */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h4 className="font-bold text-white text-base flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#00F0FF]" />
          {lang === "reo" ? "Ngā Kupu Eke Ngaru (Local Surf Glossary)" : "Kiwi Surf Lingo & Te Reo Kaupapa"}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-[#0B0E14] p-3 rounded-xl border border-slate-800">
            <span className="text-[#00F0FF] font-bold block text-sm">Kia Maia</span>
            <span className="text-slate-400">Be courageous and ride with power & respect.</span>
          </div>
          <div className="bg-[#0B0E14] p-3 rounded-xl border border-slate-800">
            <span className="text-[#FF9E00] font-bold block text-sm">Full Noise</span>
            <span className="text-slate-400">100% commitment on heavy river bar drops.</span>
          </div>
          <div className="bg-[#0B0E14] p-3 rounded-xl border border-slate-800">
            <span className="text-emerald-400 font-bold block text-sm">Tangaroa</span>
            <span className="text-slate-400">Atua of the ocean and sea life.</span>
          </div>
          <div className="bg-[#0B0E14] p-3 rounded-xl border border-slate-800">
            <span className="text-[#D4AF37] font-bold block text-sm">Rāhui</span>
            <span className="text-slate-400">Temporary restriction for marine preservation or safety.</span>
          </div>
        </div>
      </div>

    </div>
  );
};
