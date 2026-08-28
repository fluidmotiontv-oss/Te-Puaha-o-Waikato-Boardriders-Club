/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClubNav, type ClubTab } from './components/ClubNav';
import { useD9Time } from './hooks/useD9Time';
import { useBilingual } from './hooks/useBilingual';
import { TabErrorBoundary } from './components/TabErrorBoundary';

// ─── Existing Modules ───
import StoryForge from './components/StoryForge';
import DriveAuditor from './components/DriveAuditor';
import KdenliveExporter from './components/KdenliveExporter';
import JumbleForge from './components/JumbleForge';
import RenderHistory from './components/RenderHistory';
import AvatarForge from './components/AvatarForge';
import SovereignISP from './modules/SovereignISP/SovereignISP';
import SurfForecastTab from './components/SurfForecastTab';
import ClubChatTab from './components/Tabs/ClubChatTab';
import HomeView from './components/HomeView';
import { PortWaikatoDirectory } from './components/PortWaikatoDirectory';

// ─── Club Modules ───
import { ClubLadder } from './modules/ClubLadder/ClubLadder';
import { VIPSanctuary } from './modules/VIPSanctuary/VIPSanctuary';
import { BarDynamics } from './modules/BarDynamics/BarDynamics';
import { D9SandbarFrequencies } from './components/D9SandbarFrequencies';
import { MediaUpload } from './modules/MediaUpload/MediaUpload';
import { AnchorStream } from './modules/AnchorStream/AnchorStream';

// ─── Types ───
export interface DirectorPersona {
  id: string;
  name: string;
  tagline: string;
  color: string;
  roastCatchphrases: string[];
}

export interface MediaAsset {
  id: string;
  filePath: string;
  fileName: string;
  fileSize: string;
  duration: string;
  resolution: string;
  fps: number;
  codec: string;
  thumbnailUrl: string;
  motionEnergy: number;
  audioMood: string;
  bpm: number;
  sceneCutCount: number;
  aiTag: string;
  directorVibe: string;
  inTime: string;
  outTime: string;
}

export interface StorySegment {
  id: string;
  asset: MediaAsset;
  track: string;
  startTimeSec: number;
  durationSec: number;
  transition: string;
  notes: string;
}

const DIRECTORS: Record<string, DirectorPersona> = {
  chaos: { id: 'chaos', name: 'Mad Maxwell', tagline: 'Break the rules. Keep the beauty.', color: 'from-rose-500 to-amber-500', roastCatchphrases: ['This edit has the energy of a 404 page.'] },
  zen: { id: 'zen', name: 'Mist Flow', tagline: 'Let the tide breathe.', color: 'from-cyan-400 to-purple-400', roastCatchphrases: ['The void is silent. Too silent.'] },
  sovereign: { id: 'sovereign', name: 'The Nine', tagline: 'Every frame is law.', color: 'from-amber-400 to-emerald-400', roastCatchphrases: ['Sovereign split violated.'] },
  hype: { id: 'hype', name: 'Hype Timmy', tagline: 'Make it LOUD.', color: 'from-pink-500 to-yellow-400', roastCatchphrases: ['Where is the DROP?'] },
};

const INITIAL_DRIVE_ASSETS: MediaAsset[] = [
  { id: 'a1', filePath: '/home/tim/Videos/sunset_drone_01.mp4', fileName: 'sunset_drone_01.mp4', fileSize: '1.2 GB', duration: '00:00:45', resolution: '3840x2160', fps: 60, codec: 'hevc', thumbnailUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80', motionEnergy: 0.85, audioMood: 'hype', bpm: 128, sceneCutCount: 12, aiTag: 'DRONE-GOLD', directorVibe: 'chaos', inTime: '00:00:00', outTime: '00:00:45' },
  { id: 'a2', filePath: '/home/tim/Videos/port_interview_master.mp4', fileName: 'port_interview_master.mp4', fileSize: '3.4 GB', duration: '00:12:30', resolution: '1920x1080', fps: 24, codec: 'prores', thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', motionEnergy: 0.12, audioMood: 'calm', bpm: 0, sceneCutCount: 3, aiTag: 'A-ROLL-INTERVIEW', directorVibe: 'sovereign', inTime: '00:00:00', outTime: '00:12:30' },
  { id: 'a3', filePath: '/home/tim/Videos/bar_night_broll.mp4', fileName: 'bar_night_broll.mp4', fileSize: '890 MB', duration: '00:02:15', resolution: '3840x2160', fps: 30, codec: 'h264', thumbnailUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80', motionEnergy: 0.72, audioMood: 'hype', bpm: 110, sceneCutCount: 24, aiTag: 'B-ROLL-NIGHT', directorVibe: 'hype', inTime: '00:00:00', outTime: '00:02:15' },
];

const INITIAL_TIMELINE: StorySegment[] = [
  { id: 'seg_1', asset: INITIAL_DRIVE_ASSETS[0], track: 'A-Roll (Main)', startTimeSec: 0, durationSec: 15, transition: 'glitch', notes: 'Sunset Beach drone intro' },
  { id: 'seg_2', asset: INITIAL_DRIVE_ASSETS[1], track: 'A-Roll (Main)', startTimeSec: 15, durationSec: 30, transition: 'sovereign_wipe', notes: 'Port Waikato club president interview' },
  { id: 'seg_3', asset: INITIAL_DRIVE_ASSETS[2], track: 'B-Roll (Overlay)', startTimeSec: 45, durationSec: 20, transition: 'glitch', notes: 'Bar night energy — Te Puaha vibes' },
];

export default function App() {
  const { d9Hour, d9Min, d9Sec } = useD9Time();
  const { lang, toggleLang, t } = useBilingual();
  const [activeTab, setActiveTab] = useState<ClubTab>('home');
  const [activeDirector, setActiveDirector] = useState<DirectorPersona>(DIRECTORS.chaos);
  const [assets] = useState<MediaAsset[]>(INITIAL_DRIVE_ASSETS);
  const [timeline, setTimeline] = useState<StorySegment[]>(INITIAL_TIMELINE);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ─── Tab Render Map ───
  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onNavigateTab={setActiveTab} lang={lang} />;
      case 'business':
        return <PortWaikatoDirectory onNavigateTab={setActiveTab} />;
      case 'anchor':
        return <AnchorStream director={activeDirector} tideBpm={110} onNavigateTab={setActiveTab} />;
      case 'chat':
        return <ClubChatTab />;
      case 'surf':
        return <SurfForecastTab lang={lang} />;
      case 'story':
        return <StoryForge timeline={timeline} availableAssets={assets} onUpdateTimeline={setTimeline} onOpenKdenliveExport={() => setActiveTab('kdenlive')} activeDirector={activeDirector} onChangeDirector={(d: string) => setActiveDirector(DIRECTORS[d] || DIRECTORS.chaos)} />;
      case 'auditor':
        return <DriveAuditor assets={assets} onScanNewFolder={() => {}} onAddToTimeline={() => {}} onRoastAsset={() => {}} isScanning={false} />;
      case 'kdenlive':
        return <KdenliveExporter timeline={timeline} director={activeDirector} onBack={() => setActiveTab('story')} />;
      case 'jumble':
        return <JumbleForge assets={assets} activeDirector={activeDirector} tideBpm={110} isBroadcasting={false} onGoLiveWithJumble={() => {}} />;
      case 'renders':
        return <RenderHistory />;
      case 'voice':
        return <AvatarForge activeDirector={activeDirector} timeline={timeline} />;
      case 'mesh':
        return <SovereignISP />;
      case 'ladder':
        return <ClubLadder />;
      case 'vip':
        return <VIPSanctuary />;
      case 'bar':
        return <BarDynamics />;
      case 'dragon9':
        return <D9SandbarFrequencies onNavigateTab={setActiveTab} />;
      case 'media':
        return <MediaUpload />;
      default:
        return <HomeView onNavigateTab={setActiveTab} lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-600 selection:text-white">
      {/* ─── Top Bar ─── */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 via-purple-500 to-amber-400 flex items-center justify-center text-lg shadow-lg">
                🌊
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold text-white leading-tight">Te Puaha o Waikato</h1>
                <p className="text-[10px] text-slate-500 font-mono leading-tight">Boardriders Club • Dragon 9</p>
              </div>
            </div>

            {/* Center: D9 Clock */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-500 font-mono">D9</span>
              <span className="text-sm font-mono text-amber-400 font-bold">
                {d9Hour}°{d9Min.toString().padStart(2, '0')}:{d9Sec.toString().padStart(2, '0')}
              </span>
            </div>

            {/* Right: Lang + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLang}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              >
                {lang === 'en' ? 'EN' : 'MI'}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400"
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>

        {/* ─── Navigation ─── */}
        <ClubNav
          activeTab={activeTab}
          setActiveTab={(t) => { setActiveTab(t); setIsMobileMenuOpen(false); }}
          isMobileOpen={isMobileMenuOpen}
          t={t}
        />
      </header>

      {/* ─── Main Content ─── */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <TabErrorBoundary fallbackTitle={`Module [${activeTab.toUpperCase()}] Isolated`}>
              <Suspense fallback={
                <div className="p-12 text-center text-slate-500 font-mono text-xs flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  Loading D9 Module...
                </div>
              }>
                {renderTab()}
              </Suspense>
            </TabErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 mt-12">
        <div className="max-w-[1600px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 font-mono">
          <span>Te Puaha o Waikato Boardriders Club • Sunset Beach & Port Waikato</span>
          <span>Fluid Motion Dragon 9 • {t('sovereign')}</span>
        </div>
      </footer>
    </div>
  );
}
