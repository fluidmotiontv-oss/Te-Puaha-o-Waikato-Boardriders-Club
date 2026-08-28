import React, { useState, useEffect, useRef } from "react";
import { LanguageMode, SurfReportData, AIAnalysisResponse, BarStatusType } from "../../types";
import { ShieldCheck, AlertTriangle, Radio, Sparkles, Sliders, Wind, Waves, RefreshCw, Anchor, Eye, Camera } from "lucide-react";
import { KowhaiwhaiPattern } from "../KowhaiwhaiPattern";

interface LiveReportTabProps {
  lang: LanguageMode;
  report: SurfReportData;
  setReport: React.Dispatch<React.SetStateAction<SurfReportData>>;
}

export const LiveReportTab: React.FC<LiveReportTabProps> = ({
  lang,
  report,
  setReport
}) => {
  const [activeCam, setActiveCam] = useState<"bar" | "peak" | "point">("bar");
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResponse | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Custom Swell Simulator State
  const [simSwell, setSimSwell] = useState<number>(report.swellHeightMeters);
  const [simPeriod, setSimPeriod] = useState<number>(report.swellPeriodSeconds);
  const [simWind, setSimWind] = useState<number>(report.windSpeedKnots);
  const [simTide, setSimTide] = useState<string>(report.tideState);

  // Canvas ref for animated live webcam simulator
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Recalculate bar safety score dynamically when slider changes
  useEffect(() => {
    let score = 100;
    // Higher swell lowers score
    score -= simSwell * 15;
    // Longer period means heavier bar break
    score -= (simPeriod - 8) * 2.5;
    // Strong winds
    score -= simWind * 0.8;
    // Ebb tide is dangerous at river mouth bar
    if (simTide.includes("Ebb")) score -= 25;

    score = Math.max(10, Math.min(100, Math.round(score)));

    let status: BarStatusType = "SAFE_TO_CROSS";
    if (score < 45) status = "DANGER_DO_NOT_CROSS";
    else if (score < 75) status = "CAUTION_REQUIRED";

    setReport(prev => ({
      ...prev,
      swellHeightMeters: simSwell,
      swellPeriodSeconds: simPeriod,
      windSpeedKnots: simWind,
      tideState: simTide as any,
      barSafetyScore: score,
      barStatus: status
    }));
  }, [simSwell, simPeriod, simWind, simTide]);

  // Animated Live Webcam Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.03;
      const width = canvas.width;
      const height = canvas.height;

      // Dark obsidian ocean background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, "#080B10");
      skyGrad.addColorStop(0.5, "#0A2540");
      skyGrad.addColorStop(1, "#0B0E14");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Sunset / Dusk glow on horizon
      const sunGrad = ctx.createRadialGradient(width * 0.8, height * 0.3, 10, width * 0.8, height * 0.3, 180);
      sunGrad.addColorStop(0, "rgba(255, 158, 0, 0.4)");
      sunGrad.addColorStop(1, "rgba(255, 158, 0, 0)");
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant Black Sand Dune Outline
      ctx.beginPath();
      ctx.moveTo(0, height * 0.45);
      ctx.quadraticCurveTo(width * 0.3, height * 0.38, width * 0.6, height * 0.45);
      ctx.quadraticCurveTo(width * 0.8, height * 0.5, width, height * 0.42);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fillStyle = "#07090D";
      ctx.fill();

      // Render Animated Waves according to simSwell
      const waveCount = 4;
      for (let i = 0; i < waveCount; i++) {
        const yOffset = height * (0.55 + i * 0.1);
        const waveAmp = (simSwell * 8) + Math.sin(time + i) * 6;
        const waveFreq = 0.015 - i * 0.002;

        ctx.beginPath();
        ctx.moveTo(0, yOffset);

        for (let x = 0; x <= width; x += 10) {
          const y = yOffset + Math.sin(x * waveFreq + time * (1.5 + i * 0.2)) * waveAmp;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);

        // Wave gradient cyan foaming crest
        const waveGrad = ctx.createLinearGradient(0, yOffset - 20, 0, height);
        waveGrad.addColorStop(0, i === 0 ? "rgba(0, 240, 255, 0.6)" : "rgba(10, 37, 64, 0.8)");
        waveGrad.addColorStop(1, "rgba(11, 14, 20, 0.95)");
        ctx.fillStyle = waveGrad;
        ctx.fill();

        // White foam spray at crests
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Render River Mouth Outflow Current Vectors if on 'bar' cam
      if (activeCam === "bar") {
        ctx.fillStyle = "#FF9E00";
        for (let i = 0; i < 5; i++) {
          const cx = (width * 0.2 + (time * 40 + i * 80) % (width * 0.6));
          const cy = height * 0.72 + Math.sin(cx * 0.02) * 5;
          ctx.beginPath();
          ctx.arc(cx, cy, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Label overlay
        ctx.fillStyle = "#FF9E00";
        ctx.font = "bold 11px monospace";
        ctx.fillText("<<< WAIKATO RIVER EBB OUTFLOW: " + report.riverOutflowKnots + " KTS", 20, height - 20);
      }

      // Camera HUD Overlay
      ctx.fillStyle = "rgba(0, 240, 255, 0.9)";
      ctx.font = "12px monospace";
      ctx.fillText(`REC • LIVE HD 1080p | ${activeCam.toUpperCase()} CAM | ${simSwell}m @ ${simPeriod}s`, 15, 25);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [simSwell, simPeriod, activeCam, report.riverOutflowKnots]);

  // Handle Gemini AI Bar Analysis Request
  const handleFetchAiAnalysis = async () => {
    setIsLoadingAi(true);
    try {
      const res = await fetch("/api/surf-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          swellHeight: report.swellHeightMeters,
          swellPeriod: report.swellPeriodSeconds,
          windSpeed: report.windSpeedKnots,
          windDirection: report.windDirection,
          tideState: report.tideState,
          lang
        })
      });
      const data = await res.json();
      setAiAnalysis(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Section: Live Bar Crossover Hazard Card */}
      <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-[#00F0FF]/30 p-6 shadow-[0_0_30px_rgba(0,240,255,0.15)] relative overflow-hidden">
        <KowhaiwhaiPattern color="#00F0FF" height={16} className="mb-4" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-[#00F0FF]/20 border border-[#00F0FF]/40 text-[#00F0FF]">
                <Anchor className="w-6 h-6" />
              </span>
              <div>
                <span className="text-xs font-mono font-bold text-[#FF9E00] uppercase tracking-wider">
                  {lang === "reo" ? "Tawhai Bar Status • Port Waikato" : "Port Waikato River Mouth Bar Safety"}
                </span>
                <h3 className="text-2xl font-black text-white">
                  {lang === "reo" ? "Ngā Tohu Crossover o te Awa" : "Live River Mouth Bar Crossover Dashboard"}
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {lang === "reo" 
                ? "Ko Port Waikato Bar tētahi o ngā ara moana tino tūpato. Kia mahara ki te heke o te tai me te aukati o te awa i mua i te haerenga."
                : "Essential real-time river mouth crossover safety metrics. The Waikato River meets heavy West Coast swells — check bar risk level before launching any watercraft."
              }
            </p>
          </div>

          {/* Bar Safety Score Meter Gauge */}
          <div className="w-full lg:w-auto bg-[#0B0E14] p-5 rounded-2xl border border-slate-800 flex items-center gap-6 justify-between lg:justify-start">
            <div className="text-center">
              <p className="text-[10px] font-mono text-slate-400 uppercase font-bold">Bar Safety Index</p>
              <p className={`text-4xl font-black font-mono ${
                report.barSafetyScore > 75 ? "text-emerald-400" : report.barSafetyScore > 45 ? "text-amber-400" : "text-red-400"
              }`}>
                {report.barSafetyScore}<span className="text-xs text-slate-500">/100</span>
              </p>
            </div>

            <div className="h-10 w-px bg-slate-800" />

            <div>
              <p className="text-[10px] font-mono text-slate-400 uppercase font-bold">Status Assessment</p>
              <p className={`text-sm font-black font-mono flex items-center gap-1.5 ${
                report.barStatus === "SAFE_TO_CROSS" ? "text-emerald-300" : report.barStatus === "CAUTION_REQUIRED" ? "text-amber-300" : "text-red-300"
              }`}>
                {report.barStatus === "SAFE_TO_CROSS" && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                {report.barStatus !== "SAFE_TO_CROSS" && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                {report.barStatus.replace(/_/g, " ")}
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">Ebb Outflow: {report.riverOutflowKnots} knots</p>
            </div>
          </div>

        </div>

        {/* Hazard List */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-3">
          {report.hazardWarnings.map((warning, idx) => (
            <div key={idx} className="bg-[#0B0E14]/60 p-3 rounded-xl border border-amber-500/20 text-xs text-slate-300 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{warning}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section: Live Webcam Visualizer & Swell Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Animated Live Webcam Stream Card */}
        <div className="lg:col-span-8 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#00F0FF]" />
              <h4 className="font-bold text-white text-base">
                {lang === "reo" ? "Kāmera Ora • Port Waikato & Sunset Beach" : "Live Animated Surf Cam Stream"}
              </h4>
            </div>

            {/* Camera View Switcher */}
            <div className="flex items-center gap-1 bg-[#0B0E14] p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveCam("bar")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCam === "bar" ? "bg-[#00F0FF] text-[#0B0E14]" : "text-slate-400 hover:text-white"
                }`}
              >
                River Mouth Bar
              </button>
              <button
                onClick={() => setActiveCam("peak")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCam === "peak" ? "bg-[#00F0FF] text-[#0B0E14]" : "text-slate-400 hover:text-white"
                }`}
              >
                Sunset Beach Peak
              </button>
              <button
                onClick={() => setActiveCam("point")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCam === "point" ? "bg-[#00F0FF] text-[#0B0E14]" : "text-slate-400 hover:text-white"
                }`}
              >
                Left Hand Point
              </button>
            </div>
          </div>

          {/* HTML5 Canvas Webcam View */}
          <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-[#0B0E14] aspect-video">
            <canvas
              ref={canvasRef}
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />

            {/* Overlay Info Watermark */}
            <div className="absolute bottom-3 right-3 bg-[#0B0E14]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-[#00F0FF] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>LIVE • 1080p Stream</span>
            </div>
          </div>

          {/* AI Oceanographer Analysis Trigger */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#00F0FF]" />
              <span>{lang === "reo" ? "Mātakitaki ki te tai me te hau o Sunset Beach" : "Offshore easterlies active • Swell period 14s"}</span>
            </div>

            <button
              onClick={handleFetchAiAnalysis}
              disabled={isLoadingAi}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-cyan-500 text-[#0B0E14] font-black text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] disabled:opacity-50"
            >
              {isLoadingAi ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isLoadingAi ? "Analyzing Conditions..." : (lang === "reo" ? "Ripoata AI Bar Safety" : "Generate Gemini AI Safety Analysis")}</span>
            </button>
          </div>

          {/* AI Analysis Result Display */}
          {aiAnalysis && (
            <div className="bg-[#0B0E14] p-4 rounded-xl border border-[#00F0FF]/40 text-xs space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#00F0FF] font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FF9E00]" />
                  Gemini AI Oceanographer Assessment
                </span>
                <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                  aiAnalysis.barSafetyStatus === "SAFE_TO_CROSS" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                }`}>
                  {aiAnalysis.barSafetyStatus}
                </span>
              </div>
              <p className="text-white font-bold text-sm">{aiAnalysis.statusTitle}</p>
              <p className="text-slate-300 leading-relaxed">{aiAnalysis.summary}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                <div className="text-[#FF9E00]">
                  <span className="font-bold">Recommended Board:</span> {aiAnalysis.idealBoard}
                </div>
                <div className="text-cyan-300">
                  <span className="font-bold">Tikanga Advice:</span> {aiAnalysis.tikangaTip}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Dynamic Swell Simulator & Adjuster */}
        <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#FF9E00]" />
              <h4 className="font-bold text-white text-base">
                {lang === "reo" ? "Whakakatika Swell & Bar Simulator" : "Swell & Bar Simulator"}
              </h4>
            </div>
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className="text-xs text-[#00F0FF] font-mono hover:underline"
            >
              {isSimulating ? "Reset Live" : "Custom Test"}
            </button>
          </div>

          <p className="text-xs text-slate-400">
            {lang === "reo" 
              ? "Whakaritea te rahi o te ngaru me te hau e kite ai i te huringa o te bar hazard level."
              : "Adjust live ocean parameters to simulate how incoming swells and ebb tides impact bar safety levels."
            }
          </p>

          {/* Controls */}
          <div className="space-y-4 font-mono text-xs">
            
            {/* Swell Height Slider */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Swell Height:</span>
                <span className="text-[#00F0FF] font-bold">{simSwell}m ({Math.round(simSwell * 3.28)}ft)</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="5.0"
                step="0.1"
                value={simSwell}
                onChange={(e) => setSimSwell(parseFloat(e.target.value))}
                className="w-full accent-[#00F0FF] bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Swell Period Slider */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Swell Period:</span>
                <span className="text-[#FF9E00] font-bold">{simPeriod} sec</span>
              </div>
              <input
                type="range"
                min="6"
                max="18"
                step="1"
                value={simPeriod}
                onChange={(e) => setSimPeriod(parseInt(e.target.value))}
                className="w-full accent-[#FF9E00] bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Wind Speed Slider */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Wind Speed:</span>
                <span className="text-emerald-400 font-bold">{simWind} knots</span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="1"
                value={simWind}
                onChange={(e) => setSimWind(parseInt(e.target.value))}
                className="w-full accent-emerald-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Tide Selector */}
            <div>
              <label className="block text-slate-300 mb-1">Tide / River Outflow Phase:</label>
              <select
                value={simTide}
                onChange={(e) => setSimTide(e.target.value)}
                className="w-full bg-[#0B0E14] border border-slate-700 rounded-lg p-2 text-white text-xs focus:border-[#00F0FF] outline-none"
              >
                <option value="Incoming Ebb (Max Outflow)">Incoming Ebb (Max Outflow Current)</option>
                <option value="High Tide Slack Water">High Tide Slack Water (Calm Bar)</option>
                <option value="Outgoing Flood Tide">Outgoing Flood Tide</option>
                <option value="Low Tide Shallow Bar">Low Tide Shallow Sandbar</option>
              </select>
            </div>

          </div>

          <div className="p-3 bg-[#0B0E14] rounded-xl border border-slate-800 text-[11px] text-slate-400">
            <span className="text-[#FF9E00] font-bold">Pro Tip:</span> Port Waikato River Mouth Bar is safest during High Tide Slack Water with E/ENE offshore winds under 15 knots.
          </div>
        </div>

      </div>

    </div>
  );
};
