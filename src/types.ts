export type LanguageMode = "reo" | "en";

export type ClubTabType = 
  | 'story'      // Enigma Story Forge
  | 'auditor'    // Drive Auditor
  | 'kdenlive'   // Kdenlive Exporter
  | 'jumble'     // Jumble Forge
  | 'renders'    // Render Archive
  | 'tide'       // Tide Synth
  | 'voice'      // Avatar Forge
  | 'mesh'       // Sovereign ISP Mesh
  | 'ledger'     // Harmony Notes
  | 'walkie'     // P2P Walkie
  | 'gemini'     // Mesh Intelligence
  | 'terminal'   // Legacy terminal
  | 'schema'     // Legacy schema
  | 'table'      // Legacy table
  | 'jq'         // Legacy jq
  | 'health';    // Legacy health

export type TabType = 
  | "channel"
  | "sanctuary"
  | "upload"
  | "report"
  | "leaderboard"
  | "quiver"
  | "sponsors"
  | "kaupapa"
  | "history"
  | ClubTabType;

export type BarStatusType = "SAFE_TO_CROSS" | "CAUTION_REQUIRED" | "DANGER_DO_NOT_CROSS";

export interface Dragon9CycleState {
  currentMinute54: number;
  currentSecond: number;
  cyclePhase: "Ascent" | "Apex Midday" | "Descent" | "Midnight Sync";
  harmonicsFreqHz: number;
  isSynced: boolean;
}

export interface TravelLogPost {
  id: string;
  author: string;
  avatarUrl: string;
  title: string;
  destination: string;
  date: string;
  content: string;
  imageUrl: string;
  likes: number;
  commentsCount: number;
  tags: string[];
}

export interface ForumTopic {
  id: string;
  author: string;
  avatarUrl: string;
  title: string;
  category: "Board Swap" | "Bar Safety Chat" | "Dune Eco Project" | "Road Trip";
  timestamp: string;
  repliesCount: number;
  isPinned?: boolean;
  snippet: string;
}

export interface SponsorItem {
  id: string;
  name: string;
  category: "Shaper & Glassing" | "Eatery & Coffee" | "Eco & Coastal" | "Surf Hardware";
  tagline: string;
  description: string;
  logoIcon: string;
  discountCode?: string;
  websiteUrl: string;
  featuredProduct?: string;
  badge?: string;
}

export interface MediaUploadItem {
  id: string;
  title: string;
  surferName: string;
  spot: string;
  videoUrl?: string;
  thumbnailUrl: string;
  duration: string;
  uploadDate: string;
  tags: string[];
  views: number;
  likes: number;
}

export interface SurfReportData {
  swellHeightMeters: number;
  swellPeriodSeconds: number;
  swellDirection: string;
  windSpeedKnots: number;
  windDirection: string;
  isOffshore: boolean;
  tideState: "High" | "Low" | "Incoming Ebb" | "Outgoing Flood";
  tideTimeNext: string;
  waterTempC: number;
  barStatus: BarStatusType;
  riverOutflowKnots: number;
  barSafetyScore: number; // 0 to 100
  hazardWarnings: string[];
  lastUpdatedTime: string;
}

export interface SurferRanking {
  id: string;
  name: string;
  nickname?: string;
  division: "Open Men's" | "Women's" | "Grom Squad" | "Legends & Masters";
  rank: number;
  totalPoints: number;
  heatWins: number;
  highestWaveScore: number;
  favoriteBoard: string;
  homeBreak: string;
  avatarUrl: string;
  bioReo: string;
  bioEn: string;
  badges: string[];
}

export interface BoardQuiverItem {
  id: string;
  name: string;
  taglineReo: string;
  taglineEn: string;
  type: "Fish / Twin" | "High Performance Thruster" | "Step-Up / Barrel" | "Mid-Length / Glider" | "Noserider Log";
  idealWaveHeight: string;
  lengthRange: string;
  finSetup: string;
  volumeRange: string;
  descriptionReo: string;
  descriptionEn: string;
  shaper: string;
  imageUrl?: string;
  svgShapeType: "fish" | "thruster" | "stepup" | "midlength" | "log";
  accentColor: string;
}

export interface SessionLog {
  id: string;
  date: string;
  spot: "Sunset Beach Main Peak" | "Port Waikato River Mouth Bar" | "Left Hand Point" | "The Dunes";
  waveCount: number;
  waveHeightFeet: number;
  boardUsed: string;
  rating: number; // 1 to 5 stars
  notes: string;
  stokedQuote: string;
}

export interface KaupapaArticle {
  id: string;
  titleReo: string;
  titleEn: string;
  subtitleReo: string;
  subtitleEn: string;
  category: "Tikanga & History" | "Ocean Safety" | "Eco & Dunes" | "Local Etiquette";
  iconName: string;
  contentReo: string[];
  contentEn: string[];
  keyTakeawayReo: string;
  keyTakeawayEn: string;
}

export interface AIAnalysisResponse {
  barSafetyStatus: BarStatusType;
  statusTitle: string;
  summary: string;
  idealBoard: string;
  tikangaTip: string;
}
