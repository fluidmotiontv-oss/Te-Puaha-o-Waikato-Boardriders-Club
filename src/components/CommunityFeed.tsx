import React, { useState } from 'react';
import {
  Camera,
  Upload,
  Heart,
  Eye,
  Play,
  Sparkles,
  MapPin,
  Tag,
  Maximize2,
  MessageSquare,
  Share2,
  ArrowRight,
  Filter,
  CheckCircle2,
  Waves,
  X,
  Plus
} from 'lucide-react';
import { ClubTab } from './ClubNav';

export interface WaveSnapshot {
  id: string;
  title: string;
  surferName: string;
  avatarUrl: string;
  spot: string;
  imageUrl: string;
  aspectRatio: 'portrait' | 'landscape' | 'square' | 'tall';
  category: 'barrels' | 'groms' | 'drone' | 'log' | 'heavy';
  uploadTime: string;
  views: number;
  likes: number;
  isLiked?: boolean;
  type: 'video' | 'photo';
  duration?: string;
  caption: string;
  boardUsed?: string;
}

const INITIAL_SNAPSHOTS: WaveSnapshot[] = [
  {
    id: 'snap-1',
    title: 'Heavy Winter Black Sand Barrel',
    surferName: 'Rawiri Kahu',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    spot: 'Sunset Beach Main Peak',
    imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&auto=format&fit=crop&q=80',
    aspectRatio: 'tall',
    category: 'barrels',
    uploadTime: '2 hours ago',
    views: 840,
    likes: 192,
    type: 'video',
    duration: '0:45',
    caption: 'Clean 6ft offshore left draining over the black sandbank. Swell period was 14s!',
    boardUsed: "6'0 Twin Pin Rocket",
  },
  {
    id: 'snap-2',
    title: 'Port Waikato River Bar Crossing Action',
    surferName: 'Coastguard & Local Boaties',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    spot: 'Port Waikato River Bar',
    imageUrl: 'https://images.unsplash.com/photo-1455729552865-3658a5d3a092?w=900&auto=format&fit=crop&q=80',
    aspectRatio: 'landscape',
    category: 'heavy',
    uploadTime: '5 hours ago',
    views: 1250,
    likes: 310,
    type: 'photo',
    caption: 'Passing the outer river bar during slack high tide water. Smooth navigation with 10 knot ENE winds.',
    boardUsed: 'Te Puaha Charter Vessel',
  },
  {
    id: 'snap-3',
    title: 'Grom Squad Air Reverse at The Dunes',
    surferName: "Tāne 'T-Bone' Roa",
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    spot: 'The Dunes Beachbreak',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80',
    aspectRatio: 'square',
    category: 'groms',
    uploadTime: 'Yesterday',
    views: 620,
    likes: 145,
    type: 'video',
    duration: '0:22',
    caption: '13yo grom T-Bone stomping a clean air reverse on the inside sandbar reform!',
    boardUsed: "5'4 Firewire Grom Fish",
  },
  {
    id: 'snap-4',
    title: 'Sunset Beach Sunset Noseride',
    surferName: 'Aroha Kingi',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    spot: 'Left Hand Point',
    imageUrl: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&auto=format&fit=crop&q=80',
    aspectRatio: 'portrait',
    category: 'log',
    uploadTime: '1 day ago',
    views: 910,
    likes: 224,
    type: 'photo',
    caption: 'Hanging ten as the golden sun dips into the Tasman Sea. Glassy 3ft peeling walls.',
    boardUsed: "9'2 Tangaroa Classic Log",
  },
  {
    id: 'snap-5',
    title: '4K Aerial Drone View of Shifting Sandbars',
    surferName: 'Fluid Motion Droneworks',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    spot: 'Sunset Beach & River Spit',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&auto=format&fit=crop&q=80',
    aspectRatio: 'landscape',
    category: 'drone',
    uploadTime: '2 days ago',
    views: 1890,
    likes: 412,
    type: 'video',
    duration: '1:15',
    caption: 'Overhead 4K capture showing the new south river channel sandbank formations and line-ups.',
    boardUsed: 'DJI Mavic 3 Cine 4K',
  },
  {
    id: 'snap-6',
    title: 'High Rail Carve at South Spit Lefts',
    surferName: 'Kaia Henderson',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    spot: 'South Spit Lefts',
    imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&auto=format&fit=crop&q=80',
    aspectRatio: 'tall',
    category: 'heavy',
    uploadTime: '3 days ago',
    views: 730,
    likes: 188,
    type: 'photo',
    caption: 'Laying down heavy rail drive through the mid-section cutback at low tide.',
    boardUsed: "5'11 Performance Thruster",
  },
  {
    id: 'snap-7',
    title: 'Old Salt Single Fin Tribute Wave',
    surferName: "Uncle Hone 'Old Salt'",
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    spot: 'Sunset Point',
    imageUrl: 'https://images.unsplash.com/photo-1455729552865-3658a5d3a092?w=900&auto=format&fit=crop&q=80',
    aspectRatio: 'square',
    category: 'log',
    uploadTime: '4 days ago',
    views: 1100,
    likes: 295,
    type: 'photo',
    caption: '40 years of riding Sunset Beach! Trim line mastery on a 1979 vintage single fin.',
    boardUsed: "9'6 Parata Vintage Log",
  },
];

interface CommunityFeedProps {
  onNavigateTab?: (tab: ClubTab) => void;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({ onNavigateTab }) => {
  const [snapshots, setSnapshots] = useState<WaveSnapshot[]>(INITIAL_SNAPSHOTS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'barrels' | 'groms' | 'drone' | 'log' | 'heavy'>('all');
  const [activeModalSnapshot, setActiveModalSnapshot] = useState<WaveSnapshot | null>(null);

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSnapshots((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isLiked = !item.isLiked;
          return {
            ...item,
            isLiked,
            likes: isLiked ? item.likes + 1 : item.likes - 1,
          };
        }
        return item;
      })
    );

    if (activeModalSnapshot && activeModalSnapshot.id === id) {
      setActiveModalSnapshot((prev) => {
        if (!prev) return null;
        const isLiked = !prev.isLiked;
        return {
          ...prev,
          isLiked,
          likes: isLiked ? prev.likes + 1 : prev.likes - 1,
        };
      });
    }
  };

  const filteredSnapshots = snapshots.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  return (
    <div className="space-y-6">
      {/* Feed Section Header */}
      <div className="bg-slate-900/90 border border-[#00F0FF]/30 p-6 md:p-7 rounded-3xl space-y-4 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-[#0A2540]/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/90 pb-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 text-xs font-mono font-bold uppercase">
              <Camera className="w-3.5 h-3.5 animate-pulse" />
              <span>Media Vault Community Feed</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight font-sans">
              Sunset Beach & Port Waikato Wave Snapshots
            </h2>
            <p className="text-slate-300 text-xs md:text-sm max-w-xl">
              User-submitted surf clips, drone 4K footage, and local barrel snapshots uploaded directly to the Media Vault.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab && onNavigateTab('media')}
              className="px-4 py-2.5 rounded-2xl bg-[#00F0FF] text-[#0B0E14] font-mono font-black text-xs hover:brightness-110 flex items-center gap-2 transition-all shadow-lg shadow-[#00F0FF]/20"
            >
              <Upload className="w-4 h-4" />
              <span>Submit Wave Snapshot</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none relative z-10">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#00F0FF]" /> Filter:
          </span>
          {[
            { id: 'all', label: 'All Snapshots' },
            { id: 'barrels', label: 'Heavy Barrels' },
            { id: 'groms', label: 'Grom Squad' },
            { id: 'drone', label: 'Drone 4K' },
            { id: 'log', label: 'Log & Twin' },
            { id: 'heavy', label: 'Bar Action' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 ${
                selectedFilter === f.id
                  ? 'bg-[#00F0FF] text-[#0B0E14] shadow-md shadow-[#00F0FF]/20'
                  : 'bg-slate-950/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-Style Grid Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {filteredSnapshots.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalSnapshot(item)}
            className="break-inside-avoid bg-slate-950 rounded-3xl border border-slate-800/90 hover:border-[#00F0FF]/50 transition-all duration-300 overflow-hidden group cursor-pointer shadow-xl hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] flex flex-col justify-between"
          >
            {/* Thumbnail Image Box */}
            <div className="relative overflow-hidden bg-slate-900">
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Type Badge & Duration */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md text-[#00F0FF] border border-[#00F0FF]/40 text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                  {item.type === 'video' ? (
                    <>
                      <Play className="w-3 h-3 fill-[#00F0FF]" /> {item.duration}
                    </>
                  ) : (
                    <>
                      <Camera className="w-3 h-3" /> PHOTO
                    </>
                  )}
                </span>
              </div>

              {/* Quick Action Heart */}
              <button
                onClick={(e) => toggleLike(item.id, e)}
                className={`absolute top-3 right-3 p-2 rounded-2xl backdrop-blur-md border transition-all ${
                  item.isLiked
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 scale-110'
                    : 'bg-slate-950/80 text-slate-300 border-slate-700/80 hover:text-rose-400 hover:border-rose-500/40'
                }`}
              >
                <Heart className={`w-4 h-4 ${item.isLiked ? 'fill-rose-500' : ''}`} />
              </button>

              {/* Spot Location Pill */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white">
                <span className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-800/80">
                  <MapPin className="w-3 h-3 text-[#00F0FF]" />
                  {item.spot}
                </span>
                <span className="text-slate-400 text-[10px] bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-800">
                  {item.uploadTime}
                </span>
              </div>
            </div>

            {/* Snapshot Card Footer */}
            <div className="p-4 space-y-3">
              <h3 className="text-sm font-bold text-white group-hover:text-[#00F0FF] transition-colors font-sans line-clamp-2">
                {item.title}
              </h3>

              {/* Surfer Info & Engagement */}
              <div className="flex items-center justify-between text-xs font-mono border-t border-slate-800/80 pt-2.5">
                <div className="flex items-center gap-2">
                  <img
                    src={item.avatarUrl}
                    alt={item.surferName}
                    className="w-5 h-5 rounded-full object-cover border border-[#00F0FF]/40"
                  />
                  <span className="text-slate-300 font-bold text-[11px] truncate max-w-[120px]">
                    {item.surferName}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-slate-500" /> {item.views}
                  </span>
                  <span className="flex items-center gap-1 text-rose-400">
                    <Heart className={`w-3 h-3 ${item.isLiked ? 'fill-rose-500' : ''}`} /> {item.likes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Snapshot Lightbox Modal */}
      {activeModalSnapshot && (
        <div
          onClick={() => setActiveModalSnapshot(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-[#00F0FF]/40 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalSnapshot(null)}
              className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src={activeModalSnapshot.imageUrl}
                alt={activeModalSnapshot.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[450px] object-cover"
              />
              {activeModalSnapshot.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30">
                  <div className="w-16 h-16 rounded-full bg-[#00F0FF] text-[#0B0E14] flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.5)] cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-[#0B0E14] ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Content Info */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 text-[10px] font-mono font-bold uppercase">
                      {activeModalSnapshot.type} SNAPSHOT
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" /> {activeModalSnapshot.spot}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white font-sans">
                    {activeModalSnapshot.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleLike(activeModalSnapshot.id)}
                    className={`px-4 py-2 rounded-2xl border text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                      activeModalSnapshot.isLiked
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${activeModalSnapshot.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{activeModalSnapshot.likes} Stokes</span>
                  </button>
                </div>
              </div>

              {/* Caption & Equipment */}
              <p className="text-slate-200 text-sm leading-relaxed font-sans">
                {activeModalSnapshot.caption}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
                  <img
                    src={activeModalSnapshot.avatarUrl}
                    alt={activeModalSnapshot.surferName}
                    className="w-10 h-10 rounded-full object-cover border border-[#00F0FF]/40"
                  />
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase">Rider / Creator</span>
                    <p className="text-white font-bold">{activeModalSnapshot.surferName}</p>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 flex items-center justify-center shrink-0">
                    <Waves className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase">Board / Hardware</span>
                    <p className="text-white font-bold">{activeModalSnapshot.boardUsed || 'Waikato Custom Shape'}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Uploaded {activeModalSnapshot.uploadTime} via Media Vault</span>
                <button
                  onClick={() => {
                    setActiveModalSnapshot(null);
                    if (onNavigateTab) onNavigateTab('media');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#00F0FF] text-[#0B0E14] font-bold flex items-center gap-2 hover:brightness-110 transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Your Own Clip</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
