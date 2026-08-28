import React, { useState } from "react";
import { LanguageMode, TravelLogPost, ForumTopic } from "../../types";
import { travelLogsData, forumTopicsData } from "../../data/clubData";
import { Lock, Bell, MessageSquare, Heart, Pin, Send, Plus, Shield, CheckCircle, Smartphone, Compass } from "lucide-react";
import confetti from "canvas-confetti";

interface MembersSanctuaryTabProps {
  lang: LanguageMode;
}

export const MembersSanctuaryTab: React.FC<MembersSanctuaryTabProps> = ({ lang }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const [smsAlertsEnabled, setSmsAlertsEnabled] = useState(true);
  const [barAlertsEnabled, setBarAlertsEnabled] = useState(true);
  const [compAlertsEnabled, setCompAlertsEnabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("+64 21 028 9482");

  const [travelPosts, setTravelPosts] = useState<TravelLogPost[]>(travelLogsData);
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>(forumTopicsData);

  const handleVipVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setLoginError("");
    try {
      const res = await fetch('/api/vip/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcodeInput }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsLoggedIn(true);
        setShowLoginModal(false);
        setPasscodeInput("");
        confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
      } else {
        setLoginError(data.error || "Invalid Passcode");
      }
    } catch (err) {
      // Fallback local check if offline
      if (passcodeInput.toLowerCase() === "dragon9" || passcodeInput.toLowerCase() === "puaha2026") {
        setIsLoggedIn(true);
        setShowLoginModal(false);
        setPasscodeInput("");
      } else {
        setLoginError("Verification failed. Try 'dragon9'");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  // New Post State
  const [showTravelModal, setShowTravelModal] = useState(false);
  const [newTravelTitle, setNewTravelTitle] = useState("");
  const [newTravelDest, setNewTravelDest] = useState("");
  const [newTravelContent, setNewTravelContent] = useState("");

  // Forum Reply State
  const [activeForumId, setActiveForumId] = useState<string | null>(null);
  const [forumCommentInput, setForumCommentInput] = useState("");

  const handleTestSms = () => {
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00F0FF", "#FF9E00", "#FF007F"]
    });
    alert(`[TEST ALERT SENT TO ${phoneNumber}]: "SURF ALERT: 8ft SW Swell hitting Sunset Beach on 14s period. Bar is SAFE at High Slack Water!"`);
  };

  const handleLikeTravel = (id: string) => {
    setTravelPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleAddTravelPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTravelTitle || !newTravelContent) return;

    const newPost: TravelLogPost = {
      id: `t_${Date.now()}`,
      author: "Member Surfer",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      title: newTravelTitle,
      destination: newTravelDest || "Raglan & Beyond",
      date: "Just Now",
      content: newTravelContent,
      imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&auto=format&fit=crop&q=80",
      likes: 1,
      commentsCount: 0,
      tags: ["MemberTrip", "SunsetBeach"]
    };

    setTravelPosts([newPost, ...travelPosts]);
    setShowTravelModal(false);
    setNewTravelTitle("");
    setNewTravelDest("");
    setNewTravelContent("");
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B0E14] via-[#0A2540] to-[#0B0E14] border-2 border-[#FF9E00]/40 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF9E00]/20 border border-[#FF9E00]/40 text-[#FF9E00] text-xs font-mono font-bold uppercase">
              <Lock className="w-3.5 h-3.5" />
              {lang === "reo" ? "Wāhi Ngaro - VIP Sanctuary" : "VIP Members Sanctuary"}
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              {lang === "reo" ? "Ngā Rōpū me ngā Rorohiko" : "Swell Alerts, Travel Logs & Local Forum"}
            </h2>
            <p className="text-slate-300 text-sm max-w-xl">
              {lang === "reo"
                ? "Thrive with the local Sunset Beach & Port Waikato crew. Instant SMS alerts, trip reports, and board swaps."
                : "Exclusive member area for real-time swell SMS notifications, trip logs from around Aotearoa & overseas, and the community board."}
            </p>
          </div>

          {/* Login Toggle */}
          <div className="bg-[#0B0E14] p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className={`w-2.5 h-2.5 rounded-full ${isLoggedIn ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <span className="text-slate-300">{isLoggedIn ? "Status: Verified Member" : "Status: Guest Mode"}</span>
            </div>
            <button
              onClick={() => {
                if (isLoggedIn) {
                  setIsLoggedIn(false);
                } else {
                  setShowLoginModal(true);
                }
              }}
              className="px-4 py-2 rounded-xl bg-[#00F0FF] text-[#0B0E14] font-black text-xs hover:brightness-110 transition-all shadow-md"
            >
              {isLoggedIn ? "Switch to Guest View" : "Member Login"}
            </button>
          </div>
        </div>
      </div>

      {/* Grid: SMS Alert Trigger Config + Travel Logs + Forum */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: SMS & Event Alert System */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF9E00]/20 border border-[#FF9E00]/40 flex items-center justify-center text-[#FF9E00]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Swell & Event SMS Alerts</h3>
                <p className="text-[11px] text-slate-400">Instant notifications to your phone</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Mobile Number (NZ / Overseas):</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Smartphone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-[#0B0E14] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono focus:border-[#00F0FF]"
                    />
                  </div>
                  <button
                    onClick={handleTestSms}
                    className="px-3 py-2 rounded-xl bg-[#FF9E00] text-[#0B0E14] font-bold text-xs hover:brightness-110"
                  >
                    Test
                  </button>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between bg-[#0B0E14] p-3 rounded-2xl border border-slate-800">
                  <div>
                    <p className="text-xs font-bold text-white">Sunset Beach Heavy Swell Pulses</p>
                    <p className="text-[10px] text-slate-400">Alert when SW swell &gt; 2.5m offshore</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsAlertsEnabled}
                    onChange={(e) => setSmsAlertsEnabled(e.target.checked)}
                    className="w-4 h-4 accent-[#00F0FF]"
                  />
                </div>

                <div className="flex items-center justify-between bg-[#0B0E14] p-3 rounded-2xl border border-slate-800">
                  <div>
                    <p className="text-xs font-bold text-white">River Mouth Bar Crossing Calls</p>
                    <p className="text-[10px] text-slate-400">Bar danger & slack water windows</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={barAlertsEnabled}
                    onChange={(e) => setBarAlertsEnabled(e.target.checked)}
                    className="w-4 h-4 accent-[#00F0FF]"
                  />
                </div>

                <div className="flex items-center justify-between bg-[#0B0E14] p-3 rounded-2xl border border-slate-800">
                  <div>
                    <p className="text-xs font-bold text-white">2026 Club Comp Callouts</p>
                    <p className="text-[10px] text-slate-400">Heat schedules & comp location calls</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={compAlertsEnabled}
                    onChange={(e) => setCompAlertsEnabled(e.target.checked)}
                    className="w-4 h-4 accent-[#00F0FF]"
                  />
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3 flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Alerts active for Port Waikato Boardriders VIP Member.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Travel Logs & Forum Board */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section A: Members Travel Logs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#00F0FF]" />
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
                  Members' Travel & Surf Stories Feed
                </h3>
              </div>
              <button
                onClick={() => setShowTravelModal(true)}
                className="px-4 py-2 rounded-xl bg-[#00F0FF] text-[#0B0E14] font-bold text-xs flex items-center gap-1.5 hover:brightness-110 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Log Trip / Story</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {travelPosts.map((post) => (
                <div key={post.id} className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden space-y-3 flex flex-col justify-between p-4 hover:border-slate-700 transition-all">
                  <div className="space-y-3">
                    <div className="relative aspect-video rounded-xl overflow-hidden">
                      <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#00F0FF] font-bold">
                        📍 {post.destination}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <img src={post.avatarUrl} alt={post.author} className="w-7 h-7 rounded-full border border-[#00F0FF]" />
                      <span className="text-xs font-bold text-white">{post.author}</span>
                      <span className="text-[10px] text-slate-500 font-mono">• {post.date}</span>
                    </div>

                    <h4 className="text-sm font-bold text-cyan-200 line-clamp-1">{post.title}</h4>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{post.content}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleLikeTravel(post.id)}
                      className="flex items-center gap-1.5 text-pink-400 font-bold hover:scale-105 transition-transform"
                    >
                      <Heart className="w-4 h-4 fill-pink-500/30" />
                      <span>{post.likes} Stoke</span>
                    </button>
                    <span className="text-slate-400 text-[11px] font-mono">💬 {post.commentsCount} comments</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: Community Forum */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#FF9E00]" />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
                Port Waikato Community Forum & Board Swap
              </h3>
            </div>

            <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-5 space-y-4">
              {forumTopics.map((topic) => (
                <div key={topic.id} className="bg-[#0B0E14] rounded-2xl border border-slate-800 p-4 space-y-2 hover:border-[#00F0FF]/40 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      {topic.isPinned && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold flex items-center gap-1 border border-amber-500/40">
                          <Pin className="w-3 h-3" /> PINNED
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] text-[10px] font-mono font-bold">
                        {topic.category}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{topic.timestamp}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white hover:text-[#00F0FF] transition-colors">{topic.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{topic.snippet}</p>

                  <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <img src={topic.avatarUrl} alt={topic.author} className="w-5 h-5 rounded-full" />
                      <span className="text-slate-300 font-bold">{topic.author}</span>
                    </div>
                    <button
                      onClick={() => setActiveForumId(activeForumId === topic.id ? null : topic.id)}
                      className="text-[#FF9E00] font-mono hover:underline text-[11px]"
                    >
                      💬 {topic.repliesCount} Replies
                    </button>
                  </div>

                  {/* Inline Reply Box if active */}
                  {activeForumId === topic.id && (
                    <div className="pt-3 border-t border-slate-800/80 flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a reply to local crew..."
                        value={forumCommentInput}
                        onChange={(e) => setForumCommentInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                      />
                      <button
                        onClick={() => {
                          if (!forumCommentInput) return;
                          alert("Reply posted to community board!");
                          setForumCommentInput("");
                          setActiveForumId(null);
                        }}
                        className="px-3 py-2 rounded-xl bg-[#00F0FF] text-[#0B0E14] font-bold text-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Travel Story Modal */}
      {showTravelModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0E14] border-2 border-[#00F0FF] rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#00F0FF]" />
              Log Member Travel / Story
            </h3>

            <form onSubmit={handleAddTravelPost} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300">Trip / Mission Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Taranaki Ring Road Winter Swell"
                  value={newTravelTitle}
                  onChange={(e) => setNewTravelTitle(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Destination</label>
                <input
                  type="text"
                  placeholder="e.g. Stent Road, Taranaki"
                  value={newTravelDest}
                  onChange={(e) => setNewTravelDest(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Story / Waves / Board Used</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share details of waves, reef drops, or road trip banter..."
                  value={newTravelContent}
                  onChange={(e) => setNewTravelContent(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTravelModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00F0FF] text-[#0B0E14] text-xs font-black hover:brightness-110"
                >
                  Publish Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* VIP Passcode Verification Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0E14] border-2 border-[#FF9E00] rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FF9E00]/20 text-[#FF9E00] border border-[#FF9E00]/40 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">VIP Sanctuary Login</h3>
                <p className="text-[10px] text-slate-400 font-mono">Server Passcode Verification</p>
              </div>
            </div>

            <form onSubmit={handleVipVerify} className="space-y-3">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Enter VIP Passcode:</label>
                <input
                  type="password"
                  required
                  placeholder="e.g. dragon9"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-[#FF9E00]"
                />
              </div>

              {loginError && (
                <p className="text-xs text-rose-400 font-mono">{loginError}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-4 py-2 rounded-xl bg-[#FF9E00] text-[#0B0E14] text-xs font-black hover:brightness-110 disabled:opacity-50"
                >
                  {isVerifying ? "Verifying..." : "Verify & Unlock"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
