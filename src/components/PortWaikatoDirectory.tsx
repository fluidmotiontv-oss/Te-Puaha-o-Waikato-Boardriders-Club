import React, { useState } from 'react';
import {
  Store,
  Tent,
  Building2,
  Phone,
  MapPin,
  Clock,
  Coffee,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Fish,
  Utensils,
  Sparkles,
  Search,
  CheckCircle2,
  Heart,
  Navigation,
  NavigationOff,
  Radio,
  Fuel,
  Wifi,
  ShowerHead,
  ShieldCheck,
  Anchor,
  Compass
} from 'lucide-react';
import { ClubTab } from './ClubNav';

export interface BusinessItem {
  id: string;
  name: string;
  category: 'store' | 'camp' | 'services' | 'food' | 'activities';
  tagline: string;
  description: string;
  address: string;
  phone: string;
  hours: string;
  status: 'Open Now' | 'Closing Soon' | 'Opens 7:00 AM' | 'Open Daily';
  badge: string;
  badgeColor: string;
  imageUrl: string;
  features: string[];
  menuItems?: { name: string; price: string }[];
  isFeatured?: boolean;
}

const DIRECTORY_DATA: BusinessItem[] = [
  {
    id: 'wharf-store',
    name: 'Port Waikato Wharf Store & Takeaways',
    category: 'store',
    tagline: 'Iconic Wharfside General Store, Hot Chips & Fresh Espresso',
    description: 'The heartbeat of Port Waikato! Located right at the river mouth wharf. Famous for fresh snapper & chips, ice cream, hot pies, fresh espresso, bait & tackle, petrol, ice, and daily beach essentials.',
    address: '1 Wharf Road, Port Waikato 2695',
    phone: '(09) 232 9888',
    hours: '7:00 AM – 7:30 PM (7 Days)',
    status: 'Open Now',
    badge: 'WHARF STORE',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    features: ['Hot Fish & Chips', 'Espresso Coffee', 'Bait & Tackle', 'Ice & Fuel', 'General Groceries', 'Wharf Views'],
    menuItems: [
      { name: 'Fresh Catch Snapper & Chips', price: '$14.50' },
      { name: 'Port Special Burger & Beetroot', price: '$12.00' },
      { name: 'Flat White / Long Black', price: '$5.00' },
      { name: 'Saltwater Bait & Salted Mullet', price: '$8.50' },
      { name: 'Beach Ice Cream Tub', price: '$4.50' },
    ],
    isFeatured: true,
  },
  {
    id: 'holiday-park',
    name: 'Port Waikato Holiday Park & Camp',
    category: 'camp',
    tagline: 'Oceanfront & Riverfront Camping Grounds & Cabins',
    description: 'Nestled right where the Waikato River meets the Tasman Sea. Features powered caravan sites, unpowered tent sites, self-contained cabins, hot showers, surfboard wash bays, and family playground.',
    address: '115 Maunsell Road, Port Waikato 2695',
    phone: '(09) 232 9852',
    hours: 'Office 8:00 AM – 8:00 PM',
    status: 'Open Daily',
    badge: 'PORT CAMP',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80',
    features: ['Powered Sites', 'Cabins', 'Hot Showers', 'Surfboard Wash Station', 'Camp Kitchen', 'Free Wi-Fi'],
    menuItems: [
      { name: 'Powered Site (2 Adults / Night)', price: '$45.00' },
      { name: 'Unpowered Tent Pitch', price: '$35.00' },
      { name: 'Deluxe Ocean Cabin', price: '$120.00' },
      { name: 'Surf Gear Locker Storage', price: '$10.00/day' },
    ],
    isFeatured: true,
  },
  {
    id: 'sunset-surf-shop',
    name: 'Sunset Beach Surf & Board Repair',
    category: 'services',
    tagline: 'Custom Surfboard Shaping, Ding Repairs & Wetsuit Gear',
    description: 'Local boardrider workshop located next to the Sunset Beach Surf Lifesaving Club. Epoxy/PU ding repairs, custom fish & shortboard shaping, wax, leashes, and cold-water wetsuits.',
    address: '22 Sunset Beach Road, Port Waikato',
    phone: '(09) 232 9710',
    hours: '8:30 AM – 5:00 PM',
    status: 'Open Daily',
    badge: 'SURF SHOP',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=600&q=80',
    features: ['Ding Repair Service', 'Custom Boards', 'Cold Water Wetsuits', 'Wax & Fin Keys', 'Rental Softtops'],
    isFeatured: true,
  },
  {
    id: 'river-charters',
    name: 'Te Puaha River Bar & Sea Charters',
    category: 'activities',
    tagline: 'Guided River Bar Crossings & Snapper Fishing Trips',
    description: 'Experienced coastguard-certified skipper guiding anglers across the tricky Port Waikato bar to offshore fishing hotspots and river estuary whitebaiting spots.',
    address: 'Port Waikato Boat Ramp & Wharf',
    phone: '027 488 2900',
    hours: 'Tide Dependent (By Booking)',
    status: 'Open Daily',
    badge: 'CHARTERS',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    features: ['Bar Crossing Guide', 'Snapper Fishing', 'Safety Gear Included', 'GPS Fish Finder', 'Sunset Cruises'],
  },
  {
    id: 'coastal-trades',
    name: 'Sunset Coastal Electrical & Marine',
    category: 'services',
    tagline: 'Local Electricians, Solar Installation & Boat Wiring',
    description: 'Local Port Waikato trade technicians servicing off-grid solar systems, marine electronics, home wiring, and Sovereign ISP mesh antenna setups.',
    address: 'Port Waikato Community Hub',
    phone: '021 990 1234',
    hours: '7:30 AM – 5:00 PM (Mon-Fri)',
    status: 'Open Daily',
    badge: 'LOCAL TRADES',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    features: ['Solar Systems', 'Boat Wiring', 'Residential Repairs', '24/7 Emergency Callout'],
  },
];

interface PortWaikatoDirectoryProps {
  onNavigateTab?: (tab: ClubTab) => void;
}

export const PortWaikatoDirectory: React.FC<PortWaikatoDirectoryProps> = ({ onNavigateTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'store' | 'camp' | 'services' | 'activities'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>('wharf-store');

  const filteredBusinesses = DIRECTORY_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Banner Header */}
      <section className="bg-slate-900/90 border border-amber-500/30 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900/95 to-amber-950/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold mb-2">
              <Building2 className="w-4 h-4" />
              <span>Port Waikato Business Hub & Community Directory</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight font-sans">
              Wharf Store, Camp Grounds & Local Services
            </h1>
            <p className="text-slate-300 text-xs md:text-sm max-w-2xl mt-1 leading-relaxed">
              Your official coastal guide to Port Waikato businesses: Wharf Store fish & chips, oceanfront campsite bookings, surfboard repair & local trade directory.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Community Verified Directory</span>
          </div>
        </div>

        {/* Quick Jump Links to Wharf Store & Camp */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10 pt-2">
          {/* Quick Card 1: Wharf Store */}
          <div
            onClick={() => setActiveMenuId('wharf-store')}
            className="cursor-pointer bg-slate-950 p-4 rounded-2xl border border-amber-500/40 hover:border-amber-400 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
                WHARF STORE
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> OPEN NOW
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
              <span>Port Waikato Wharf Store</span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300" />
            </h3>
            <p className="text-xs text-slate-400 font-mono line-clamp-1">
              Hot Snapper & Chips, Ice Cream, Coffee & Bait
            </p>
          </div>

          {/* Quick Card 2: Holiday Park & Camp */}
          <div
            onClick={() => setActiveMenuId('holiday-park')}
            className="cursor-pointer bg-slate-950 p-4 rounded-2xl border border-emerald-500/40 hover:border-emerald-400 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                HOLIDAY PARK & CAMP
              </span>
              <span className="text-xs text-cyan-300 font-mono font-bold">
                BOOKINGS OPEN
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
              <span>Port Waikato Holiday Park</span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-300" />
            </h3>
            <p className="text-xs text-slate-400 font-mono line-clamp-1">
              Powered Sites, Cabins & Riverfront Camping
            </p>
          </div>

          {/* Quick Card 3: Surf Shop & Repairs */}
          <div
            onClick={() => setActiveMenuId('sunset-surf-shop')}
            className="cursor-pointer bg-slate-950 p-4 rounded-2xl border border-cyan-500/40 hover:border-cyan-400 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold">
                SURF & BOARD REPAIR
              </span>
              <span className="text-xs text-slate-400 font-mono font-bold">
                LOCAL SHOP
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
              <span>Sunset Surf Shop</span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300" />
            </h3>
            <p className="text-xs text-slate-400 font-mono line-clamp-1">
              Board Shaping, Ding Repairs & Wetsuits
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Local Hub', icon: Building2 },
            { id: 'store', label: 'Wharf Store', icon: Store },
            { id: 'camp', label: 'Camp Grounds', icon: Tent },
            { id: 'services', label: 'Trades & Surf', icon: Coffee },
            { id: 'activities', label: 'Charters & Tours', icon: Anchor },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 shrink-0 transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search store, camp, chips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 font-mono"
          />
        </div>
      </div>

      {/* Directory Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBusinesses.map((item) => (
          <div
            key={item.id}
            className={`bg-slate-900/90 p-6 rounded-3xl border space-y-5 shadow-xl transition-all flex flex-col justify-between ${
              activeMenuId === item.id
                ? 'border-amber-500/70 ring-1 ring-amber-500/40 bg-gradient-to-b from-slate-900 to-slate-950'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="space-y-4">
              {/* Card Header & Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {item.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-white font-sans mt-1">
                    {item.name}
                  </h2>
                  <p className="text-xs text-amber-300 font-mono italic">
                    "{item.tagline}"
                  </p>
                </div>
              </div>

              {/* Main Image Banner */}
              <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-800">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
                  <span className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {item.address}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {item.hours}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {item.description}
              </p>

              {/* Features Chips */}
              <div className="flex items-center gap-2 flex-wrap">
                {item.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-slate-950 text-slate-300 text-[11px] font-mono border border-slate-800 flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    {feat}
                  </span>
                ))}
              </div>

              {/* Optional Menu / Price List Drawer */}
              {item.menuItems && (
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-300 border-b border-slate-800 pb-2">
                    <span className="flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5" />
                      Popular Menu & Rate Specials
                    </span>
                    <span className="text-[10px] text-slate-500">Live Prices</span>
                  </div>
                  <div className="space-y-1.5 text-xs font-mono pt-1">
                    {item.menuItems.map((m, idx) => (
                      <div key={idx} className="flex items-center justify-between text-slate-300">
                        <span>{m.name}</span>
                        <span className="text-white font-bold">{m.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action Controls */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
              <a
                href={`tel:${item.phone.replace(/[^0-9]/g, '')}`}
                className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center gap-2 hover:bg-amber-400 transition-all shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call {item.phone}</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(item.name + ' ' + item.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-950 text-slate-300 border border-slate-800 hover:text-white hover:border-slate-700 flex items-center gap-2 transition-all"
              >
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
