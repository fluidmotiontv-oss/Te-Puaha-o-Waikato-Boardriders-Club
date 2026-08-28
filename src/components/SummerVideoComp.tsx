import React, { useState } from 'react';
import {
  Video,
  Trophy,
  Flame,
  Award,
  Sparkles,
  Play,
  Upload,
  Heart,
  Laugh,
  Maximize2,
  Plus,
  X,
  CheckCircle2,
  Filter,
  Calendar,
  Zap,
  Tag,
  ThumbsUp,
  MapPin,
  MessageSquare,
  Share2,
  Star,
  FileText,
  ExternalLink
} from 'lucide-react';
import { ClubTab } from './ClubNav';

export interface VideoCompEntry {
  id: string;
  title: string;
  surferName: string;
  avatarUrl: string;
  category: 'best' | 'funniest' | 'biggest' | 'air' | 'grom';
  categoryLabel: string;
  spot: string;
  videoUrl: string;
  thumbnailUrl: string;
  votes: number;
  judgeScore: number;
  hasVoted?: boolean;
  submittedDate: string;
  caption: string;
  boardUsed?: string;
}

const INITIAL_SUMMER_ENTRIES: VideoCompEntry[] = [
  {
    id: 'entry-1',
    title: 'Drainer at Low Tide Main Peak - 10 Second Tube',
    surferName: 'Rawiri Kahu',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    category: 'best',
    categoryLabel: '🏆 Best Overall Wave',
    spot: 'Sunset Beach Main Peak',
    videoUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&auto=format&fit=crop&q=80',
    votes: 342,
    judgeScore: 9.8,
    submittedDate: 'Dec 12, 2026',
    caption: 'Cleanest 8ft west barrel of the summer season so far! Fully spit out at the inside section.',
    boardUsed: "6'1 Twin Pin Rocket",
  },
  {
    id: 'entry-2',
    title: 'Double Over the Falls Scorpion & Board Launch',
    surferName: 'Dave "Kook" Jenkins',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    category: 'funniest',
    categoryLabel: '😂 Funniest Wipeout',
    spot: 'The Dunes Inside Shorebreak',
    videoUrl: 'https://images.unsplash.com/photo-1455729552865-3658a5d3a092?w=900&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1455729552865-3658a5d3a092?w=900&auto=format&fit=crop&q=80',
    votes: 489,
    judgeScore: 9.9,
    submittedDate: 'Jan 02, 2027',
    caption: 'Tried a late drop on a 4ft shorebreak, lost my fins, went full scorpion and sent the board into orbit!',
    boardUsed: "8'0 Soft Top Foamie",
  },
  {
    id: 'entry-3',
    title: '12ft Monster Outer Reef Bomb Wave',
    surferName: "Te Kahuna 'TK' Parata",
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    category: 'biggest',
    categoryLabel: '🌊 Biggest Wave',
    spot: 'Outer Bar Breakwater',
    videoUrl: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&auto=format&fit=crop&q=80',
    votes: 410,
    judgeScore: 9.7,
    submittedDate: 'Jan 15, 2027',
    caption: 'Massive SW swell pulse breaking 500m off the river mouth. Jet ski tow-in assist.',
    boardUsed: "7'2 Step-Up Gun",
  },
  {
    id: 'entry-4',
    title: 'Grom T-Bone Stomps Rotation Air',
    surferName: "Tāne 'T-Bone' Roa",
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    category: 'air',
    categoryLabel: '🚀 Best Air',
    spot: 'South Spit Lefts',
    videoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80',
    votes: 275,
    judgeScore: 9.4,
    submittedDate: 'Jan 22, 2027',
    caption: '13-year-old local grom launching 4 feet above the lip off the sandbar section!',
    boardUsed: "5'4 Grom Performance Thruster",
  },
  {
    id: 'entry-5',
    title: 'Noseride Highline on 1968 Single Fin',
    surferName: 'Aroha Kingi',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    category: 'grom',
    categoryLabel: '🏄 Grom & Legend',
    spot: 'Left Hand Point',
    videoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&auto=format&fit=crop&q=80',
    votes: 318,
    judgeScore: 9.5,
    submittedDate: 'Feb 01, 2027',
    caption: 'Gliding for 200 meters hanging ten on glassy 4ft sunset peeling waves.',
    boardUsed: "9'6 Parata Custom Log",
  },
];

interface SummerVideoCompProps {
  onNavigateTab?: (tab: ClubTab) => void;
}

export const SummerVideoComp: React.FC<SummerVideoCompProps> = ({ onNavigateTab }) => {
  const [entries, setEntries] = useState<VideoCompEntry[]>(INITIAL_SUMMER_ENTRIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [previewVideoEntry, setPreviewVideoEntry] = useState<VideoCompEntry | null>(null);

  // New Entry Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSurferName, setNewSurferName] = useState('');
  const [newCategory, setNewCategory] = useState<'best' | 'funniest' | 'biggest' | 'air' | 'grom'>('best');
  const [newSpot, setNewSpot] = useState('Sunset Beach Main Peak');
  const [newBoard, setNewBoard] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&auto=format&fit=crop&q=80');

  const handleVote = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEntries((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const hasVoted = !item.hasVoted;
          return {
            ...item,
            hasVoted,
            votes: hasVoted ? item.votes + 1 : item.votes - 1,
          };
        }
        return item;
      })
    );

    if (previewVideoEntry && previewVideoEntry.id === id) {
      setPreviewVideoEntry((prev) => {
        if (!prev) return null;
        const hasVoted = !prev.hasVoted;
        return {
          ...prev,
          hasVoted,
          votes: hasVoted ? prev.votes + 1 : prev.votes - 1,
        };
      });
    }
  };

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSurferName.trim()) return;

    const categoryLabels = {
      best: '🏆 Best Overall Wave',
      funniest: '😂 Funniest Wipeout',
      biggest: '🌊 Biggest Wave',
      air: '🚀 Best Air',
      grom: '🏄 Grom & Legend',
    };

    const newEntryObj: VideoCompEntry = {
      id: `custom-entry-${Date.now()}`,
      title: newTitle,
      surferName: newSurferName,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      category: newCategory,
      categoryLabel: categoryLabels[newCategory],
      spot: newSpot,
      videoUrl: newVideoUrl || 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&auto=format&fit=crop&q=80',
      thumbnailUrl: newVideoUrl || 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&auto=format&fit=crop&q=80',
      votes: 1,
      hasVoted: true,
      judgeScore: 8.5,
      submittedDate: 'Just Now',
      caption: newCaption || 'User submitted personal video clip entry for Summer 26/27 competition.',
      boardUsed: newBoard || 'Local Custom Board',
    };

    setEntries([newEntryObj, ...entries]);
    setIsSubmitModalOpen(false);

    // Reset Form
    setNewTitle('');
    setNewSurferName('');
    setNewCaption('');
    setNewBoard('');
  };

  const filteredEntries = entries.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="bg-slate-950/95 p-6 md:p-8 rounded-3xl border border-[#00F0FF]/40 space-y-6 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#0A2540]/60">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 text-xs font-mono font-bold uppercase flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5" /> Summer of 2026 / 2027 Video Showdown
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-400" /> $2,500 Prize Pool + Custom Shape
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white font-sans tracking-tight">
            Personal Video Competition Leaderboard & Submissions
          </h2>
          <p className="text-slate-300 text-xs font-mono max-w-2xl">
            Upload your personal surf clips from Sunset Beach & Port Waikato! Compete across Best Wave, Funniest Wipeout, Biggest Barrel, Best Air, and Grom categories.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://acrobat.adobe.com/id/urn:aaid:sc:AP:5cb0e01c-f695-404b-9f0f-1afb6dc93979"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-2xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-mono font-bold text-xs flex items-center gap-2 transition-all shadow-md"
          >
            <FileText className="w-4 h-4 text-red-400" />
            <span className="hidden sm:inline">Official Rules PDF</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-[#00F0FF] hover:bg-cyan-300 text-[#0B0E14] font-mono font-black text-xs flex items-center gap-2 transition-all shadow-lg shadow-[#00F0FF]/25"
          >
            <Upload className="w-4 h-4" />
            <span>Submit Video Entry</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none relative z-10 font-mono text-xs">
        <span className="text-slate-400 font-bold flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5 text-[#00F0FF]" /> Category:
        </span>
        {[
          { id: 'all', label: 'All Entries' },
          { id: 'best', label: '🏆 Best Wave' },
          { id: 'funniest', label: '😂 Funniest Wipeout' },
          { id: 'biggest', label: '🌊 Biggest Wave' },
          { id: 'air', label: '🚀 Best Air' },
          { id: 'grom', label: '🏄 Grom & Legend' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
              selectedCategory === tab.id
                ? 'bg-[#00F0FF] text-[#0B0E14] shadow-md shadow-[#00F0FF]/20'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Competition Leaderboard Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800/90 overflow-hidden shadow-2xl relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
              <tr>
                <th className="p-3.5 pl-5">Rank</th>
                <th className="p-3.5">Video Title & Preview</th>
                <th className="p-3.5">Rider / Creator</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Judge Score</th>
                <th className="p-3.5">Votes</th>
                <th className="p-3.5 text-right pr-5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredEntries.map((item, index) => (
                <tr
                  key={item.id}
                  onClick={() => setPreviewVideoEntry(item)}
                  className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                >
                  {/* Rank */}
                  <td className="p-3.5 pl-5 font-bold">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-black ${
                        index === 0
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : index === 1
                          ? 'bg-slate-300 text-slate-950'
                          : index === 2
                          ? 'bg-amber-700 text-amber-100'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      #{index + 1}
                    </span>
                  </td>

                  {/* Video Title & Thumbnail */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-10 rounded-lg bg-slate-950 overflow-hidden relative border border-slate-800 shrink-0">
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                          <Play className="w-4 h-4 fill-[#00F0FF] text-[#00F0FF]" />
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-sans font-bold text-xs group-hover:text-[#00F0FF] transition-colors line-clamp-1">
                          {item.title}
                        </p>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#00F0FF]" /> {item.spot} • {item.submittedDate}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Rider / Creator */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.avatarUrl}
                        alt={item.surferName}
                        className="w-6 h-6 rounded-full object-cover border border-[#00F0FF]/40"
                      />
                      <span className="text-slate-200 font-bold">{item.surferName}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-bold">
                      {item.categoryLabel}
                    </span>
                  </td>

                  {/* Judge Score */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{item.judgeScore.toFixed(1)} / 10</span>
                    </div>
                  </td>

                  {/* Votes */}
                  <td className="p-3.5">
                    <span className="text-white font-bold text-xs">{item.votes} Votes</span>
                  </td>

                  {/* Action Vote Button */}
                  <td className="p-3.5 text-right pr-5">
                    <button
                      onClick={(e) => handleVote(item.id, e)}
                      className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold inline-flex items-center gap-1.5 transition-all ${
                        item.hasVoted
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white hover:border-[#00F0FF]/50'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${item.hasVoted ? 'fill-rose-400 text-rose-400' : ''}`} />
                      <span>{item.hasVoted ? 'Voted' : 'Vote +1'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Submit Entry Modal Form */}
      {isSubmitModalOpen && (
        <div
          onClick={() => setIsSubmitModalOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-[#00F0FF]/40 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative font-sans text-xs"
          >
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 text-[10px] font-mono font-bold uppercase">
                Summer 26/27 Entry Form
              </span>
              <h3 className="text-xl font-black text-white">
                Submit Your Personal Surf Video Clip
              </h3>
              <p className="text-slate-400 text-xs font-mono">
                Enter your best rides, bloopers, or heavy barrel clips to win the Summer 26/27 trophy!
              </p>
            </div>

            <form onSubmit={handleCreateEntry} className="space-y-4 font-mono">
              <div className="space-y-1">
                <label className="text-slate-300 text-[11px] font-bold block">
                  Video Title / Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clean Sunset Beach Left Barrel at Sunset"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00F0FF] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 text-[11px] font-bold block">
                    Rider / Creator Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rawiri Kahu"
                    value={newSurferName}
                    onChange={(e) => setNewSurferName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00F0FF] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 text-[11px] font-bold block">
                    Competition Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00F0FF] outline-none"
                  >
                    <option value="best">🏆 Best Overall Wave</option>
                    <option value="funniest">😂 Funniest Wipeout</option>
                    <option value="biggest">🌊 Biggest Wave</option>
                    <option value="air">🚀 Best Air</option>
                    <option value="grom">🏄 Grom & Legend</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 text-[11px] font-bold block">
                    Break Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sunset Beach Main Peak"
                    value={newSpot}
                    onChange={(e) => setNewSpot(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00F0FF] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 text-[11px] font-bold block">
                    Board / Hardware Used
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6'0 Twin Pin Rocket"
                    value={newBoard}
                    onChange={(e) => setNewBoard(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00F0FF] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 text-[11px] font-bold block">
                  Video / Thumbnail URL
                </label>
                <input
                  type="url"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00F0FF] outline-none text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 text-[11px] font-bold block">
                  Description / Story
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell the story behind this wave..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00F0FF] outline-none font-sans"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00F0FF] text-[#0B0E14] font-bold flex items-center gap-2 hover:brightness-110"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Entry to Table</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Video Playback Preview Lightbox */}
      {previewVideoEntry && (
        <div
          onClick={() => setPreviewVideoEntry(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-[#00F0FF]/40 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative font-mono text-xs"
          >
            <button
              onClick={() => setPreviewVideoEntry(null)}
              className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src={previewVideoEntry.videoUrl}
                alt={previewVideoEntry.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#00F0FF] text-[#0B0E14] flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.6)] cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-[#0B0E14] ml-1" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <span className="px-2 py-0.5 rounded bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 text-[10px] font-bold">
                    {previewVideoEntry.categoryLabel}
                  </span>
                  <h3 className="text-lg font-bold text-white font-sans mt-1">
                    {previewVideoEntry.title}
                  </h3>
                </div>

                <button
                  onClick={() => handleVote(previewVideoEntry.id)}
                  className={`px-4 py-2 rounded-xl border font-bold flex items-center gap-2 ${
                    previewVideoEntry.hasVoted
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                      : 'bg-[#00F0FF] text-[#0B0E14] border-[#00F0FF]'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${previewVideoEntry.hasVoted ? 'fill-rose-400' : ''}`} />
                  <span>{previewVideoEntry.votes} Votes</span>
                </button>
              </div>

              <p className="text-slate-200 font-sans text-xs leading-relaxed">
                {previewVideoEntry.caption}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
                  <img
                    src={previewVideoEntry.avatarUrl}
                    alt={previewVideoEntry.surferName}
                    className="w-8 h-8 rounded-full object-cover border border-[#00F0FF]/40"
                  />
                  <div>
                    <span className="text-slate-500 text-[9px] uppercase">Rider</span>
                    <p className="text-white font-bold">{previewVideoEntry.surferName}</p>
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[9px] uppercase">Break & Equipment</span>
                  <p className="text-white font-bold truncate">{previewVideoEntry.spot} • {previewVideoEntry.boardUsed}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
