import React from 'react';

export type ClubTab =
  | 'home'
  | 'business'
  | 'anchor'
  | 'chat'
  | 'surf'
  | 'story'
  | 'auditor'
  | 'kdenlive'
  | 'jumble'
  | 'renders'
  | 'voice'
  | 'mesh'
  | 'ladder'
  | 'vip'
  | 'bar'
  | 'dragon9'
  | 'media';

interface ClubNavProps {
  activeTab: ClubTab;
  setActiveTab: (tab: ClubTab) => void;
  isMobileOpen?: boolean;
  t: (key: string) => string;
}

const NAV_ITEMS: { id: ClubTab; label: string; icon: string; category: string }[] = [
  { id: 'home', label: 'Home', icon: '🏠', category: 'Hub' },
  { id: 'business', label: 'Business Hub', icon: '🏪', category: 'Hub' },
  { id: 'surf', label: 'Surf Forecast', icon: '🏄‍♂️', category: 'Stories & Surf' },
  { id: 'bar', label: 'Bar Safety', icon: '⚓', category: 'Stories & Surf' },
  { id: 'dragon9', label: 'D9 Sandbars & Frequencies', icon: '🐉', category: 'Stories & Surf' },
  { id: 'chat', label: 'Club Chat', icon: '💬', category: 'Stories & Surf' },
  { id: 'anchor', label: 'Anchor Stream', icon: '📺', category: 'Stories & Surf' },
  { id: 'ladder', label: 'Club Ladder', icon: '🏆', category: 'Stories & Surf' },
  { id: 'vip', label: 'VIP Sanctuary', icon: '💎', category: 'Stories & Surf' },
  { id: 'media', label: 'Media Vault', icon: '📤', category: 'Stories & Surf' },
  { id: 'story', label: 'Story Forge', icon: '🎬', category: 'Creative Studio' },
  { id: 'voice', label: 'Avatar Voice', icon: '🎭', category: 'Creative Studio' },
  { id: 'auditor', label: 'Vault Auditor', icon: '🗃️', category: 'Creative Studio' },
  { id: 'mesh', label: 'Sovereign ISP', icon: '🕸️', category: 'Creative Studio' },
  { id: 'kdenlive', label: 'Studio Export', icon: '🎞️', category: 'Creative Studio' },
  { id: 'jumble', label: 'Jumble Forge', icon: '🎲', category: 'Creative Studio' },
  { id: 'renders', label: 'Render Archive', icon: '🎬', category: 'Creative Studio' },
];

export const ClubNav: React.FC<ClubNavProps> = ({
  activeTab,
  setActiveTab,
  isMobileOpen,
}) => {
  return (
    <nav className={`border-t border-slate-800/80 bg-slate-950/95 transition-all ${isMobileOpen ? 'block' : 'hidden lg:block'}`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar scrollbar-hide">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === item.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
