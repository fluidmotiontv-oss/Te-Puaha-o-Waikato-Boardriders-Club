import React from 'react';
import { ClubTabType } from '../types';

interface ClubNavbarProps {
  activeTab: ClubTabType;
  setActiveTab: (t: ClubTabType) => void;
  recordCount?: number;
  fileSizeFormatted?: string;
  onOpenUpload?: () => void;
  onOpenAI?: () => void;
}

const TAB_GROUPS = [
  {
    label: 'Broadcast',
    tabs: [
      { id: 'story' as ClubTabType, label: 'Story Forge', icon: '🎬' },
      { id: 'auditor' as ClubTabType, label: 'Vault', icon: '🗃️' },
      { id: 'kdenlive' as ClubTabType, label: 'Export', icon: '🎞️' },
      { id: 'jumble' as ClubTabType, label: 'Jumble', icon: '🎲' },
      { id: 'renders' as ClubTabType, label: 'Archive', icon: '🎬' },
    ]
  },
  {
    label: 'Create',
    tabs: [
      { id: 'tide' as ClubTabType, label: 'Tide', icon: '🌊' },
      { id: 'voice' as ClubTabType, label: 'Voice', icon: '🎭' },
    ]
  },
  {
    label: 'Mesh',
    tabs: [
      { id: 'mesh' as ClubTabType, label: 'Topology', icon: '🕸️' },
      { id: 'ledger' as ClubTabType, label: 'Ledger', icon: '📜' },
      { id: 'walkie' as ClubTabType, label: 'Walkie', icon: '📻' },
      { id: 'gemini' as ClubTabType, label: 'Intelligence', icon: '🧠' },
    ]
  },
  {
    label: 'Legacy',
    tabs: [
      { id: 'terminal' as ClubTabType, label: 'Term', icon: '💻' },
      { id: 'schema' as ClubTabType, label: 'Schema', icon: '📐' },
      { id: 'table' as ClubTabType, label: 'Table', icon: '📊' },
      { id: 'jq' as ClubTabType, label: 'JQ', icon: '🔧' },
      { id: 'health' as ClubTabType, label: 'Health', icon: '❤️' },
    ]
  }
];

export const ClubNavbar: React.FC<ClubNavbarProps> = ({
  activeTab,
  setActiveTab,
  recordCount,
  fileSizeFormatted,
  onOpenUpload,
  onOpenAI
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4">
        {/* Top Row */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 via-purple-500 to-amber-400 flex items-center justify-center text-lg shadow-lg">
              🏄
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Board Riders Club</h1>
              <p className="text-[10px] text-slate-500 font-mono">Dragon9 • Fluid Motion • Sovereign Mesh</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {recordCount !== undefined && (
              <span className="hidden sm:inline text-xs font-mono text-slate-500">
                {recordCount} records • {fileSizeFormatted}
              </span>
            )}
            {onOpenUpload && (
              <button onClick={onOpenUpload} className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:border-cyan-500 transition-all">
                ⬆️ Upload
              </button>
            )}
            {onOpenAI && (
              <button onClick={onOpenAI} className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-400 hover:bg-cyan-500/20 transition-all">
                🤖 AI
              </button>
            )}
          </div>
        </div>

        {/* Tab Groups */}
        <div className="flex gap-6 overflow-x-auto pb-1 scrollbar-hide">
          {TAB_GROUPS.map(group => (
            <div key={group.label} className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mr-2 hidden lg:inline">
                {group.label}
              </span>
              {group.tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="mr-1">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};
