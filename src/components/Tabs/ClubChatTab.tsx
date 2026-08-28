import React, { useState } from 'react';
import { Send as SendIcon, MessageSquare as ChatIcon, Sparkles as SparklesIcon, Bot as BotIcon, User as UserIcon, Users as UsersIcon, ShieldAlert as AlertIcon, Hash as HashIcon, RefreshCw as SpinIcon } from 'lucide-react';

interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: string;
  avatar: string;
  text: string;
  timestamp: string;
  channel: string;
  isAi?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    senderName: 'Te Kahuna AI',
    senderRole: 'Ocean Master AI',
    avatar: '🌊',
    text: 'Kia ora e te whānau! Welcome to the Te Puaha Boardriders Chat. Ask me about Sunset Beach swell conditions, river mouth bar crossing rules, or board recommendations!',
    timestamp: '08:15 NZST',
    channel: 'general',
    isAi: true,
  },
  {
    id: 'm2',
    senderName: 'Rawiri Henare',
    senderRole: 'Club Captain',
    avatar: '🏄‍♂️',
    text: 'Sunset Beach main peak is 4-6ft offshore right now! Perfect lefts coming off the point.',
    timestamp: '08:42 NZST',
    channel: 'general',
  },
  {
    id: 'm3',
    senderName: 'Aroha Smith',
    senderRole: 'Bar Recon Officer',
    avatar: '⚓',
    text: 'Heads up if heading out over the Port Waikato bar — mid-tide ebb is running fast at 3.5 knots.',
    timestamp: '09:05 NZST',
    channel: 'bar-safety',
  },
  {
    id: 'm4',
    senderName: 'Kiri Te Kanawa',
    senderRole: 'Junior Coach',
    avatar: '🏆',
    text: 'Grommet heat training starts at 10am tomorrow in front of the clubrooms!',
    timestamp: '09:20 NZST',
    channel: 'announcements',
  },
];

export const ClubChatTab: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<string>('general');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  const filteredMessages = messages.filter((m) => m.channel === activeChannel || m.channel === 'all');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsgText = inputText.trim();
    setInputText('');

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderName: 'You (Boardrider)',
      senderRole: 'Club Member',
      avatar: '🏄',
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' }),
      channel: activeChannel,
    };

    setMessages((prev) => [...prev, newMsg]);

    // Check if message mentions @kahuna or asks AI
    if (userMsgText.toLowerCase().includes('kahuna') || userMsgText.toLowerCase().includes('ai') || userMsgText.includes('?') || activeChannel === 'ai-lounge') {
      setIsAiThinking(true);
      try {
        const res = await fetch('/api/local-kahuna', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userQuery: userMsgText, lang: 'reo' }),
        });
        const data = await res.json();
        const aiResponseMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          senderName: 'Te Kahuna AI',
          senderRole: 'Ocean Master AI',
          avatar: '🌊',
          text: data.text || 'Kia ora! The waves at Sunset Beach are holding strong.',
          timestamp: new Date().toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' }),
          channel: activeChannel,
          isAi: true,
        };
        setMessages((prev) => [...prev, aiResponseMsg]);
      } catch (err) {
        const aiFallbackMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          senderName: 'Te Kahuna AI',
          senderRole: 'Ocean Master AI',
          avatar: '🌊',
          text: 'Chur bro! The ocean radio signal is steady. Sunset Beach is 5ft with offshore winds!',
          timestamp: new Date().toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' }),
          channel: activeChannel,
          isAi: true,
        };
        setMessages((prev) => [...prev, aiFallbackMsg]);
      } finally {
        setIsAiThinking(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/70 to-slate-900 border border-cyan-500/30 p-6 rounded-3xl space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold mb-2">
              <ChatIcon className="w-3.5 h-3.5" />
              <span>Te Puaha Boardriders Live Chat</span>
            </div>
            <h2 className="text-2xl font-black text-white">Sunset Beach Member Chatroom & Te Kahuna AI</h2>
            <p className="text-slate-300 text-xs">
              Connect with local surfers, report river bar conditions, or mention <span className="text-cyan-300 font-bold">@Kahuna</span> for instant AI surf analysis.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>18 Members Online</span>
          </div>
        </div>
      </div>

      {/* Main Chat Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Channels */}
        <div className="lg:col-span-3 bg-slate-900/80 p-4 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider px-2">
            Chat Channels
          </h3>
          <div className="space-y-1">
            {[
              { id: 'general', name: 'general-talk', icon: '💬', count: 12 },
              { id: 'bar-safety', name: 'bar-safety-reports', icon: '⚓', count: 4 },
              { id: 'announcements', name: 'club-announcements', icon: '📢', count: 2 },
              { id: 'ai-lounge', name: 'te-kahuna-ai-lounge', icon: '🤖', count: 'AI' },
              { id: 'gear-swap', name: 'quiver-gear-swap', icon: '🏄‍♂️', count: 3 },
            ].map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-between transition-all ${
                  activeChannel === ch.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{ch.icon}</span>
                  <span>#{ch.name}</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] text-slate-400">
                  {ch.count}
                </span>
              </button>
            ))}
          </div>

          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-2 text-[11px]">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>AI Kahuna Tip</span>
            </div>
            <p className="text-slate-400 font-mono">
              Type <span className="text-cyan-300 font-bold">@kahuna</span> or ask any wave question in any channel to invoke bilingual AI ocean intelligence.
            </p>
          </div>
        </div>

        {/* Chat Stream & Input */}
        <div className="lg:col-span-9 bg-slate-900/90 rounded-3xl border border-slate-800 flex flex-col h-[600px] overflow-hidden">
          {/* Active Channel Topbar */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HashIcon className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-white font-mono">#{activeChannel}</span>
            </div>
            <span className="text-xs text-slate-500 font-mono">Te Puaha o Waikato Mesh Connected</span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans bg-slate-950/50">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all ${
                  msg.isAi
                    ? 'bg-purple-950/30 border-purple-500/40'
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div className="w-9 h-9 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg shrink-0">
                  {msg.avatar}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{msg.senderName}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold ${
                        msg.isAi ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {msg.senderRole}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}

            {isAiThinking && (
              <div className="p-3 bg-purple-950/20 rounded-2xl border border-purple-500/30 flex items-center gap-2 text-xs text-purple-300 font-mono italic">
                <SpinIcon className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Te Kahuna AI is analyzing ocean currents and generating advice...</span>
              </div>
            )}
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message #${activeChannel} (mention @kahuna for AI advice)...`}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500 font-mono"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isAiThinking}
              className="px-5 py-3 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 hover:bg-cyan-400 disabled:opacity-50 shadow-md transition-all"
            >
              <SendIcon className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClubChatTab;
