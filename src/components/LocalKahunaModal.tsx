import React, { useState } from "react";
import { LanguageMode } from "../types";
import { Sparkles, Send, X, Bot, User, RefreshCw } from "lucide-react";

interface KahunaModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageMode;
}

interface ChatMessage {
  sender: "user" | "kahuna";
  text: string;
}

export const LocalKahunaModal: React.FC<KahunaModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "kahuna",
      text: lang === "reo"
        ? "Kia ora e hoa! Ko Te Kahuna tenei o Sunset Beach. He aha to patai mo te moana, te bar crossover, te kawa o Tangaroa ranei?"
        : "Chur bro! Te Kahuna here. What's on your mind? Ask me about Port Waikato bar safety, Sunset Beach left-handers, surfboard volumes, or local club history!"
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isSending) return;

    const userText = inputQuery.trim();
    setInputQuery("");
    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    setIsSending(true);

    try {
      const res = await fetch("/api/local-kahuna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuery: userText,
          lang
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: "kahuna", text: data.text }]);
    } catch (e) {
      setMessages(prev => [...prev, {
        sender: "kahuna",
        text: "Chur bro! The ocean radio hit a brief glitch on the sandbar. Sunset Beach is still firing though!"
      }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0B0E14] border border-[#00F0FF]/40 rounded-2xl max-w-xl w-full h-[600px] flex flex-col relative shadow-[0_0_40px_rgba(0,240,255,0.25)] animate-scaleUp overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#00F0FF]/20 text-[#00F0FF]">
              <Sparkles className="w-5 h-5 text-[#FF9E00]" />
            </div>
            <div>
              <h3 className="font-black text-white text-base">Te Kahuna o Sunset AI</h3>
              <p className="text-[11px] text-[#00F0FF] font-mono">Bilingual Ocean Master & Surf Historian</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0B0E14] text-xs font-sans">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "kahuna" && (
                <div className="w-7 h-7 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center shrink-0 font-bold">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`p-3.5 rounded-2xl max-w-[80%] leading-relaxed ${
                msg.sender === "user"
                  ? "bg-[#00F0FF] text-[#0B0E14] font-bold rounded-tr-none"
                  : "bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none font-sans"
              }`}>
                {msg.text}
              </div>

              {msg.sender === "user" && (
                <div className="w-7 h-7 rounded-full bg-[#FF9E00]/20 text-[#FF9E00] flex items-center justify-center shrink-0 font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isSending && (
            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs italic">
              <RefreshCw className="w-4 h-4 animate-spin text-[#00F0FF]" />
              <span>Te Kahuna is consulting the ocean waves...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={lang === "reo" ? "Pātai ki a Te Kahuna..." : "Ask Te Kahuna about Sunset Beach surf..."}
            className="flex-1 bg-[#0B0E14] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-[#00F0FF]"
          />
          <button
            type="submit"
            disabled={isSending || !inputQuery.trim()}
            className="p-2.5 rounded-xl bg-[#00F0FF] text-[#0B0E14] font-bold hover:brightness-110 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
