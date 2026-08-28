import React, { useState } from "react";
import { LanguageMode, MediaUploadItem } from "../../types";
import { featuredMediaItemsData } from "../../data/clubData";
import { Upload, Video, Play, ExternalLink, CheckCircle, Sparkles, Tag, Eye, Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface MediaUploadTabProps {
  lang: LanguageMode;
}

export const MediaUploadTab: React.FC<MediaUploadTabProps> = ({ lang }) => {
  const [mediaList, setMediaList] = useState<MediaUploadItem[]>(featuredMediaItemsData);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  // Form Fields
  const [titleInput, setTitleInput] = useState("");
  const [surferInput, setSurferInput] = useState("");
  const [spotInput, setSpotInput] = useState("Sunset Beach Main Peak");
  const [tagInput, setTagInput] = useState("Barrels, Grom, Full Noise");

  const handleSimulatedUpload = () => {
    if (!titleInput) {
      alert("Please enter a clip title!");
      return;
    }

    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          
          // Complete upload
          const newItem: MediaUploadItem = {
            id: `m_${Date.now()}`,
            title: titleInput,
            surferName: surferInput || "Local Boardrider",
            spot: spotInput,
            thumbnailUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&auto=format&fit=crop&q=80",
            duration: "2:45",
            uploadDate: "Just Now",
            tags: tagInput.split(",").map((t) => t.trim()),
            views: 12,
            likes: 4
          };

          setMediaList([newItem, ...mediaList]);
          setTitleInput("");
          setSurferInput("");
          confetti({
            particleCount: 40,
            spread: 80,
            origin: { y: 0.5 },
            colors: ["#00F0FF", "#FF007F", "#FF9E00"]
          });
          return null;
        }
        return prev + 20;
      });
    }, 300);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B0E14] via-[#0A2540] to-[#120024] border-2 border-[#00F0FF]/40 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/40 text-[#00F0FF] text-xs font-mono font-bold uppercase">
              <Upload className="w-3.5 h-3.5" />
              {lang === "reo" ? "Tukuna Ataata - Direct Media Portal" : "Direct Media Upload Portal"}
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              {lang === "reo" ? "Tukua ngā Clip ki te Weekly Reel" : "Raw Clips & Video Upload Zone"}
            </h2>
            <p className="text-slate-300 text-sm max-w-xl">
              {lang === "reo"
                ? "Tukuna mai a koutou ataata eke ngaru no Sunset Beach me Port Waikato mo te Fluid Motion TV."
                : "Drag-and-drop raw footage from drones, GoPros, or land cameras to get featured on the weekly Fluid Motion edit reel."}
            </p>
          </div>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase font-mono tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all"
          >
            <Video className="w-4 h-4" />
            <span>Fluid Motion YouTube Channel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Upload Drop Zone & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Drag & Drop Drop Zone */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#00F0FF]" />
              Video Drop Zone
            </h3>

            {/* Drop Zone Box */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (!titleInput) setTitleInput("Raw Sunset Beach Barrel Drop");
                handleSimulatedUpload();
              }}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center gap-3 cursor-pointer ${
                isDragging
                  ? "border-[#00F0FF] bg-[#00F0FF]/10 scale-102"
                  : "border-slate-700 bg-[#0B0E14] hover:border-slate-500"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                <Upload className="w-7 h-7 animate-bounce" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">Drag & Drop MP4 / MOV Raw Clips Here</p>
                <p className="text-[11px] text-slate-400">Supports 4K 60FPS, GoPro, Drone & iPhone footage up to 2GB</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!titleInput) setTitleInput("Sunset Beach Session Edit");
                  handleSimulatedUpload();
                }}
                className="px-4 py-2 rounded-xl bg-[#00F0FF] text-[#0B0E14] font-black text-xs hover:brightness-110"
              >
                Browse Video Files
              </button>
            </div>

            {/* Upload Progress Bar */}
            {uploadProgress !== null && (
              <div className="bg-[#0B0E14] p-3 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>Uploading Clip to Fluid Motion Portal...</span>
                  <span className="text-[#00F0FF] font-bold">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#00F0FF] to-[#FF007F] h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Metadata Details Form */}
        <div className="lg:col-span-7 bg-slate-900/80 rounded-3xl border border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
            <Tag className="w-4 h-4 text-[#FF9E00]" />
            Clip Metadata & Credits
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Clip Title:</label>
              <input
                type="text"
                placeholder="e.g. Rawiri's 10-Point Left Point Drop"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="w-full bg-[#0B0E14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-[#00F0FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Featured Surfer(s):</label>
              <input
                type="text"
                placeholder="e.g. Kaia Henderson / Grom Squad"
                value={surferInput}
                onChange={(e) => setSurferInput(e.target.value)}
                className="w-full bg-[#0B0E14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-[#00F0FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Break Location:</label>
              <select
                value={spotInput}
                onChange={(e) => setSpotInput(e.target.value)}
                className="w-full bg-[#0B0E14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option>Sunset Beach Main Peak</option>
                <option>Port Waikato River Mouth Bar</option>
                <option>Left Hand Point</option>
                <option>The Dunes Beachbreak</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Tags (comma separated):</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="w-full bg-[#0B0E14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSimulatedUpload}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-cyan-500 text-[#0B0E14] font-black text-xs uppercase font-mono tracking-wider hover:brightness-110 shadow-lg"
            >
              Submit Raw Clip to Editor
            </button>
          </div>
        </div>

      </div>

      {/* Gallery of Featured Clips */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FF007F]" />
          Featured Uploaded Clips & Raw Edits
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mediaList.map((item) => (
            <div key={item.id} className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden space-y-3 p-3 hover:border-[#00F0FF]/40 transition-all">
              <div className="relative aspect-video rounded-xl overflow-hidden group">
                <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-[#00F0FF] text-[#0B0E14] flex items-center justify-center font-bold">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[10px] font-bold">
                  {item.duration}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                <p className="text-xs text-slate-400 font-mono">Surfer: <span className="text-[#00F0FF]">{item.surferName}</span></p>
                <p className="text-[10px] text-slate-500">📍 {item.spot} • {item.uploadDate}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-cyan-400" /> {item.views}</span>
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-pink-400" /> {item.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
