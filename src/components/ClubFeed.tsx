import React, { useState } from 'react';
import {
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  Send,
  Newspaper,
  Waves,
  ShieldAlert,
  Video,
  Sparkles,
  UserCheck,
  PlusCircle,
  Filter,
  Flame,
  CheckCircle2,
  Clock,
  ThumbsUp,
  Tag
} from 'lucide-react';
import { ClubTab } from './ClubNav';

import tekahunaImg from '../assets/images/tekahuna_avatar_1786363378977.jpg';
import rawiriImg from '../assets/images/rawiri_avatar_1786363393568.jpg';

export interface FeedComment {
  id: string;
  author: string;
  avatar?: string;
  isAI?: boolean;
  timeAgo: string;
  text: string;
  stokes: number;
}

export interface FeedItem {
  id: string;
  type: 'bulletin' | 'surf_log' | 'media' | 'community';
  author: {
    name: string;
    role: string;
    avatar: string;
    isAI?: boolean;
    isVerified?: boolean;
  };
  timestamp: string;
  title: string;
  content: string;
  badge?: {
    label: string;
    color: string;
  };
  surfStats?: {
    spot: string;
    waveHeight: string;
    wind: string;
    rating: string;
  };
  mediaUrl?: string;
  stokes: number;
  hasStoked?: boolean;
  comments: FeedComment[];
  isBookmarked?: boolean;
  targetTab?: ClubTab;
}

const INITIAL_FEED_ITEMS: FeedItem[] = [
  {
    id: 'f1',
    type: 'bulletin',
    author: {
      name: 'Te Kahuna AI',
      role: 'AI Ocean Kaihautū',
      avatar: tekahunaImg,
      isAI: true,
      isVerified: true,
    },
    timestamp: '15 mins ago',
    title: 'Port Waikato River Bar Migration Advisory',
    content: 'Mid-tide sandbar has shifted 40 meters North following the recent West Coast swell event. Lifejackets are mandatory for all vessels crossing the bar during the ebb tide. Hydrodynamic flow speed is currently 3.4 knots.',
    badge: {
      label: 'BAR SAFETY',
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    surfStats: {
      spot: 'Port Waikato Bar',
      waveHeight: '2.4m',
      wind: '11kt ENE',
      rating: 'CAUTION',
    },
    stokes: 24,
    hasStoked: false,
    comments: [
      {
        id: 'c1',
        author: 'Rawiri Henare',
        avatar: rawiriImg,
        timeAgo: '10 mins ago',
        text: 'Chur Te Kahuna! Sandbar looks shallow on the south spit, stick to the main channel near the northern headland.',
        stokes: 8,
      },
      {
        id: 'c2',
        author: 'Wiremu K.',
        timeAgo: '5 mins ago',
        text: 'Thanks for the heads up, heading out for a fish around high tide.',
        stokes: 3,
      },
    ],
    targetTab: 'bar',
  },
  {
    id: 'f2',
    type: 'surf_log',
    author: {
      name: 'Rawiri Henare',
      role: 'Club Captain',
      avatar: rawiriImg,
      isVerified: true,
    },
    timestamp: '1 hour ago',
    title: 'Sunset Beach Main Peak Morning Session Firing!',
    content: 'Paddled out at 7:00 AM right on the push. Long 150m lefts peeling off the main point past the rocks. Glassy conditions early before the light offshore breeze kicked in. Get out there before 1:00 PM!',
    badge: {
      label: 'EPIC SESSION',
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    surfStats: {
      spot: 'Sunset Beach Main Peak',
      waveHeight: '2.2m',
      wind: '8kt E Offshore',
      rating: 'EXCELLENT',
    },
    stokes: 42,
    hasStoked: true,
    comments: [
      {
        id: 'c3',
        author: 'Aroha M.',
        timeAgo: '45 mins ago',
        text: 'Saw you score that clean barrel on the second set! Board looked fast.',
        stokes: 12,
      },
      {
        id: 'c4',
        author: 'Te Kahuna AI',
        avatar: tekahunaImg,
        isAI: true,
        timeAgo: '30 mins ago',
        text: 'Swell energy vector confirmed at 310° WNW with 14.2s period. Optimal tide window continuing through 13:45 NZST.',
        stokes: 19,
      },
    ],
    targetTab: 'surf',
  },
  {
    id: 'f3',
    type: 'bulletin',
    author: {
      name: 'Te Puaha Boardriders Committee',
      role: 'Official Club',
      avatar: rawiriImg,
      isVerified: true,
    },
    timestamp: '3 hours ago',
    title: 'Winter Solstice Cup Registration Now Open',
    content: 'Calling all groms, open shortboarders, and masters longboarders! The annual Sunset Beach Solstice Cup heat draw is live. Register your division on the Club Ladder tab to lock in your heat slot.',
    badge: {
      label: 'COMPETITION',
      color: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    },
    stokes: 35,
    hasStoked: false,
    comments: [
      {
        id: 'c5',
        author: 'Tane P.',
        timeAgo: '2 hours ago',
        text: 'Signed up for Masters Longboard! Is the BBQ starting after finals?',
        stokes: 5,
      },
    ],
    targetTab: 'ladder',
  },
  {
    id: 'f4',
    type: 'media',
    author: {
      name: 'Media Vault Bot',
      role: 'Media Sync',
      avatar: tekahunaImg,
      isAI: true,
      isVerified: true,
    },
    timestamp: '5 hours ago',
    title: 'Drone Clip Uploaded: Sunset Point Sunset Wave Sets',
    content: 'New 4K 60fps aerial clip added to the Club Media Vault by member @TaneP. Shot with 8K anamorphic lens setup.',
    badge: {
      label: 'MEDIA VAULT',
      color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    },
    stokes: 18,
    hasStoked: false,
    comments: [],
    targetTab: 'media',
  },
];

interface ClubFeedProps {
  onNavigateTab: (tab: ClubTab) => void;
}

export const ClubFeed: React.FC<ClubFeedProps> = ({ onNavigateTab }) => {
  const [items, setItems] = useState<FeedItem[]>(INITIAL_FEED_ITEMS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'bulletin' | 'surf_log' | 'media' | 'community'>('all');
  const [newPostText, setNewPostText] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostType, setNewPostType] = useState<'community' | 'surf_log'>('community');
  const [isPosting, setIsPosting] = useState(false);
  const [openCommentBoxId, setOpenCommentBoxId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<{ [key: string]: string }>({});

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const handleToggleStoke = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const nextStoked = !item.hasStoked;
          return {
            ...item,
            hasStoked: nextStoked,
            stokes: nextStoked ? item.stokes + 1 : item.stokes - 1,
          };
        }
        return item;
      })
    );
  };

  const handleToggleBookmark = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, isBookmarked: !item.isBookmarked };
        }
        return item;
      })
    );
  };

  const handleAddComment = (itemId: string) => {
    const text = commentInput[itemId]?.trim();
    if (!text) return;

    const newComment: FeedComment = {
      id: 'c_' + Date.now(),
      author: 'You (Member)',
      timeAgo: 'Just now',
      text,
      stokes: 1,
    };

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            comments: [...item.comments, newComment],
          };
        }
        return item;
      })
    );

    setCommentInput((prev) => ({ ...prev, [itemId]: '' }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostText.trim()) return;

    const newEntry: FeedItem = {
      id: 'post_' + Date.now(),
      type: newPostType,
      author: {
        name: 'You (Sunset Boardrider)',
        role: 'Verified Member',
        avatar: rawiriImg,
        isVerified: true,
      },
      timestamp: 'Just now',
      title: newPostTitle,
      content: newPostText,
      badge: {
        label: newPostType === 'surf_log' ? 'SURF REPORT' : 'COMMUNITY POST',
        color: newPostType === 'surf_log' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      },
      stokes: 1,
      hasStoked: true,
      comments: [],
    };

    setItems([newEntry, ...items]);
    setNewPostTitle('');
    setNewPostText('');
    setIsPosting(false);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white font-mono flex items-center gap-2">
              <span>Club Activity & News Feed</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Live Community
              </span>
            </h2>
            <p className="text-slate-400 text-xs font-mono">
              Official bulletins, surf reports, safety alerts & member updates
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsPosting(!isPosting)}
          className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isPosting ? 'Close Form' : 'Post Update / Log'}</span>
        </button>
      </div>

      {/* New Post Form Drawer */}
      {isPosting && (
        <form onSubmit={handleCreatePost} className="bg-slate-950 p-5 rounded-2xl border border-amber-500/40 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Share Activity or Surf Log</span>
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono">
              <label className="text-slate-400">Post Type:</label>
              <select
                value={newPostType}
                onChange={(e) => setNewPostType(e.target.value as any)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1 text-white text-xs font-mono"
              >
                <option value="community">Community Post</option>
                <option value="surf_log">Surf Session Log</option>
              </select>
            </div>
          </div>

          <input
            type="text"
            placeholder="Post Headline / Title (e.g., Morning session at Sunset Point)..."
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 font-sans"
            required
          />

          <textarea
            placeholder="Share details, wave conditions, gear recommendations or questions for the crew..."
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            rows={3}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 font-sans leading-relaxed"
            required
          />

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={() => setIsPosting(false)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 text-xs font-mono hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-mono text-xs font-bold flex items-center gap-2 hover:bg-amber-400 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish to Feed</span>
            </button>
          </div>
        </form>
      )}

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-mono text-slate-400 flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {[
          { id: 'all', label: 'All Activity' },
          { id: 'bulletin', label: 'Official Bulletins' },
          { id: 'surf_log', label: 'Surf Session Logs' },
          { id: 'community', label: 'Community Posts' },
          { id: 'media', label: 'Vault Media' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-all ${
              activeFilter === f.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="space-y-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-slate-950 p-5 md:p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition-all shadow-md group"
          >
            {/* Author & Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img
                    src={item.author.avatar}
                    alt={item.author.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-800"
                  />
                  {item.author.isAI && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-[9px] font-bold">
                      🤖
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{item.author.name}</span>
                    {item.author.isVerified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {item.author.role}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    {item.timestamp}
                  </span>
                </div>
              </div>

              {/* Category Badge */}
              {item.badge && (
                <span className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold border ${item.badge.color} shrink-0`}>
                  {item.badge.label}
                </span>
              )}
            </div>

            {/* Content Title & Body */}
            <div className="space-y-2">
              <h3 className="text-base font-black text-white font-sans group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                {item.content}
              </p>
            </div>

            {/* Optional Surf Telemetry Pill */}
            {item.surfStats && (
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">LOCATION</span>
                  <span className="text-white font-bold">{item.surfStats.spot}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">SWELL</span>
                  <span className="text-cyan-300 font-bold">{item.surfStats.waveHeight}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">WIND VECTOR</span>
                  <span className="text-emerald-300 font-bold">{item.surfStats.wind}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">RATING</span>
                  <span className="text-amber-300 font-bold">{item.surfStats.rating}</span>
                </div>
              </div>
            )}

            {/* Actions Bar */}
            <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-4">
                {/* Stoke / Like Button */}
                <button
                  onClick={() => handleToggleStoke(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                    item.hasStoked
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                      : 'text-slate-400 hover:text-rose-300 hover:bg-slate-900'
                  }`}
                >
                  <Flame className={`w-4 h-4 ${item.hasStoked ? 'fill-rose-400 text-rose-400' : ''}`} />
                  <span>{item.stokes} Stoked</span>
                </button>

                {/* Comments Toggle */}
                <button
                  onClick={() =>
                    setOpenCommentBoxId(openCommentBoxId === item.id ? null : item.id)
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-900 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{item.comments.length} Comments</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Optional Jump to Tab */}
                {item.targetTab && (
                  <button
                    onClick={() => onNavigateTab(item.targetTab!)}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 font-bold text-[11px] flex items-center gap-1 transition-all"
                  >
                    <span>Module View</span>
                  </button>
                )}

                {/* Bookmark */}
                <button
                  onClick={() => handleToggleBookmark(item.id)}
                  className={`p-1.5 rounded-xl transition-colors ${
                    item.isBookmarked ? 'text-amber-400 bg-amber-500/20' : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title="Bookmark Post"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inline Comments Section */}
            {openCommentBoxId === item.id && (
              <div className="pt-3 space-y-3 border-t border-slate-900 animate-in fade-in duration-150">
                {/* Comment List */}
                {item.comments.map((comment) => (
                  <div key={comment.id} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/60 text-xs space-y-1">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white">{comment.author}</span>
                        {comment.isAI && (
                          <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[9px] font-bold">
                            AI
                          </span>
                        )}
                      </div>
                      <span className="text-slate-500">{comment.timeAgo}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed font-sans">{comment.text}</p>
                  </div>
                ))}

                {/* Add Comment Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Write a response or question..."
                    value={commentInput[item.id] || ''}
                    onChange={(e) =>
                      setCommentInput({ ...commentInput, [item.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(item.id);
                    }}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
                  />
                  <button
                    onClick={() => handleAddComment(item.id)}
                    className="px-3 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 text-xs font-mono font-bold shrink-0 transition-colors"
                  >
                    Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
