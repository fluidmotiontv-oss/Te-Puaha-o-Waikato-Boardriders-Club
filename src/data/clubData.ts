import { SurfReportData, SurferRanking, BoardQuiverItem, KaupapaArticle, SessionLog } from "../types";

export const initialSurfReport: SurfReportData = {
  swellHeightMeters: 2.3,
  swellPeriodSeconds: 14,
  swellDirection: "SW (220°)",
  windSpeedKnots: 12,
  windDirection: "ENE (Offshore)",
  isOffshore: true,
  tideState: "Incoming Ebb",
  tideTimeNext: "14:45 PM (High Tide +1.8m)",
  waterTempC: 17.5,
  barStatus: "SAFE_TO_CROSS",
  riverOutflowKnots: 3.8,
  barSafetyScore: 82,
  hazardWarnings: [
    "Ebb tide outflow creates standing waves on sandbar north channel",
    "Strong west coast rip current pulling north towards Port Waikato river spit",
    "Submerged logs floating down river after recent heavy Waikato rain"
  ],
  lastUpdatedTime: "Live (Synced with Port Waikato Hydro Station)"
};

export const clubRankings: SurferRanking[] = [
  {
    id: "s1",
    name: "Rawiri Kahu",
    nickname: "The Black Sand Bullet",
    division: "Open Men's",
    rank: 1,
    totalPoints: 3850,
    heatWins: 5,
    highestWaveScore: 9.8,
    favoriteBoard: "6'0 Twin Pin Rocket",
    homeBreak: "Sunset Beach Main Peak",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    bioReo: "Kua roa e eke ana ki ngā ngaru nunui o Sunset Beach. No te whānau Kahu o Port Waikato.",
    bioEn: "Sunset Beach local legend known for late drops on heavy river bar lefts and high-line rail turns.",
    badges: ["2025 Club Champ", "Heavy Barrel Award", "Grom Mentor"]
  },
  {
    id: "s2",
    name: "Kaia Henderson",
    nickname: "Kaia Kaiora",
    division: "Women's",
    rank: 1,
    totalPoints: 3920,
    heatWins: 6,
    highestWaveScore: 9.9,
    favoriteBoard: "5'11 Performance Thruster",
    homeBreak: "Left Hand Point",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    bioReo: "Toa whakaihuwaka o ngā mōhine! Kei te ako hoki i ngā pēpi o te Grom Squad ki te au moana.",
    bioEn: "Current Women's Division leader with buttery smooth carves and unmatched ocean reading skills.",
    badges: ["2025 Women's Champ", "Top Heat Score", "Water Safety Patrol"]
  },
  {
    id: "s3",
    name: "Tāne 'T-Bone' Roa",
    nickname: "T-Bone",
    division: "Grom Squad",
    rank: 1,
    totalPoints: 3410,
    heatWins: 4,
    highestWaveScore: 9.5,
    favoriteBoard: "5'4 Grom Firewire Fish",
    homeBreak: "The Dunes Beachbreak",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
    bioReo: "Te riro a te tangata poto! Eke noa i ngā ngaru ririki me ngā ngaru rahi i Sunset Beach.",
    bioEn: "13-year-old grom charging 6ft Sunset Beach barrels without fear. Future NZ junior title contender.",
    badges: ["2025 Grom of the Year", "Air Reverse Master", "Dune Care Junior"]
  },
  {
    id: "s4",
    name: "Uncle Hone 'Old Salt' Parata",
    nickname: "Old Salt Hone",
    division: "Legends & Masters",
    rank: 1,
    totalPoints: 3780,
    heatWins: 5,
    highestWaveScore: 9.2,
    favoriteBoard: "9'6 Single Fin Log",
    homeBreak: "Port Waikato River Mouth Point",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    bioReo: "40 tau e heke ana i ngā ngaru o Waikato! He Tohunga mō te crossing o te river bar.",
    bioEn: "Surfing Sunset Beach since 1978. Master bar-crosser and guardian of local river mouth history.",
    badges: ["Club Life Member", "40+ Years Stoke", "Bar Master"]
  },
  {
    id: "s5",
    name: "Aroha Kingi",
    nickname: "Wave Whisperer",
    division: "Women's",
    rank: 2,
    totalPoints: 3640,
    heatWins: 4,
    highestWaveScore: 9.1,
    favoriteBoard: "9'2 Noserider",
    homeBreak: "Sunset Beach Main Peak",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    bioReo: "He tohunga ki te whakanoho waewae ki te mata o te papa noho.",
    bioEn: "Longboard maestro known for hanging ten over heavy Sunset Beach section drops.",
    badges: ["Grace & Style Award", "Rāhui Guardian"]
  },
  {
    id: "s6",
    name: "Manaia Campbell",
    nickname: "Mana Nitro",
    division: "Grom Squad",
    rank: 2,
    totalPoints: 3200,
    heatWins: 3,
    highestWaveScore: 8.9,
    favoriteBoard: "5'2 Soft-Top Grom Charger",
    homeBreak: "The Dunes Beachbreak",
    avatarUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300&auto=format&fit=crop&q=80",
    bioReo: "He reo hou engari he kaha nui tonu ki te eke ngaru.",
    bioEn: "High-energy 11-year-old grom ripping up the summer sandbar peaks.",
    badges: ["Stoke Award", "Fastest Paddle"]
  },
  {
    id: "s7",
    name: "Brodie 'Crusty' Vance",
    nickname: "Crusty Vance",
    division: "Open Men's",
    rank: 2,
    totalPoints: 3590,
    heatWins: 3,
    highestWaveScore: 9.4,
    favoriteBoard: "6'3 Step-Up Quad",
    homeBreak: "Port Waikato River Mouth Bar",
    avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80",
    bioReo: "He tangata e hiahia ana ki te eke ki ngā ngaru kōpahi rahi.",
    bioEn: "Heavy-water barrel hunter who thrives when Port Waikato breaks 8ft+.",
    badges: ["Wipeout Survivor", "Bar Patrol"]
  }
];

export const surfboardQuiver: BoardQuiverItem[] = [
  {
    id: "q1",
    name: "The Sunset Obsidian Step-Up",
    taglineReo: "He papa mo ngā ngaru nunui me te kōpahi o te river bar.",
    taglineEn: "Built for heavy 6-10ft Sunset Beach sandbar drops and river mouth barrels.",
    type: "Step-Up / Barrel",
    idealWaveHeight: "5 - 10 ft",
    lengthRange: "6'2\" - 6'8\"",
    finSetup: "Quad or Thruster (FCS II)",
    volumeRange: "33L - 38L",
    shaper: "Waikato Custom Shapes",
    descriptionReo: "Kua hoahoatia me te puku i raro me te reke ririki mo te pupuri hohonu ki te mata o te ngaru.",
    descriptionEn: "Features added chest volume for paddling against strong river currents and a tight round pin tail for hold in steep hollow black sand barrels.",
    svgShapeType: "stepup",
    accentColor: "#00F0FF"
  },
  {
    id: "q2",
    name: "Mangōpare Twin Fin Fish",
    taglineReo: "He reka poto me ngā tara rua mo ngā ngaru raumati.",
    taglineEn: "Fast, loose, and skatey for 2-4ft clean summer peaks at Sunset Beach.",
    type: "Fish / Twin",
    idealWaveHeight: "2 - 5 ft",
    lengthRange: "5'4\" - 5'10\"",
    finSetup: "Keel Twins or Upright Twins",
    volumeRange: "30L - 35L",
    shaper: "Port Waikato Craft Co.",
    descriptionReo: "Ko te hoahoa Mangōpare (hammerhead) mo te whai tere me te huri tere i runga i te ngaru.",
    descriptionEn: "Wide point forward with deep swallow tail and Mangōpare Kowhaiwhai deck graphic. Generates instant speed on fat fat section drops.",
    svgShapeType: "fish",
    accentColor: "#FF9E00"
  },
  {
    id: "q3",
    name: "Left Hand Point High-Performer",
    taglineReo: "Mō ngā huri koi me ngā rere rangi i te point.",
    taglineEn: "Precision rail-to-rail surfing for clean left-hand point breaks.",
    type: "High Performance Thruster",
    idealWaveHeight: "3 - 6 ft",
    lengthRange: "5'10\" - 6'2\"",
    finSetup: "Thruster (Medium/Large Template)",
    volumeRange: "28L - 33L",
    shaper: "Black Sand Surfboards",
    descriptionReo: "Rocker koi me te single-to-double concave mo te tere me te whakahaere ngā huri.",
    descriptionEn: "Refined foil with medium entry rocker and squash tail. Perfect for vertical snaps and pocket surfing when the left point fires on offshore easterlies.",
    svgShapeType: "thruster",
    accentColor: "#D4AF37"
  },
  {
    id: "q4",
    name: "Te Puaha River Glider",
    taglineReo: "He papa roa ngāwari mo te hoe papa me te eke ngaru roa.",
    taglineEn: "High-line speed and effortless paddling across shifting river mouth sandbars.",
    type: "Mid-Length / Glider",
    idealWaveHeight: "2 - 6 ft",
    lengthRange: "7'0\" - 7'8\"",
    finSetup: "2+1 Single Fin + Side Bites",
    volumeRange: "42L - 50L",
    shaper: "Sunset Surfboards NZ",
    descriptionReo: "He pai mo ngā rā katoa, ahakoa te tai me te hau.",
    descriptionEn: "Beveled entry with subtle rolled V through the tail. Paddles like a dream when river outflow currents are pushing hard against the swell.",
    svgShapeType: "midlength",
    accentColor: "#0A2540"
  },
  {
    id: "q5",
    name: "Tangaroa Classic Noserider",
    taglineReo: "Mo te haere ki te mata o te papa noho i ngā rā marie.",
    taglineEn: "Hang ten in style on glassy 2-3ft Sunset Beach log waves.",
    type: "Noserider Log",
    idealWaveHeight: "1 - 4 ft",
    lengthRange: "9'2\" - 9'8\"",
    finSetup: "10\" Pivot Single Fin",
    volumeRange: "68L - 78L",
    shaper: "Parata Vintage Glassing",
    descriptionReo: "Papa taumaha me te nose concave deep mo te noho ki te mata o te ngaru.",
    descriptionEn: "Heavy glass job with a wide nose concave and 50/50 soft rails. Cross-step gracefully down the line as the sun sets over the Tasman Sea.",
    svgShapeType: "log",
    accentColor: "#00F0FF"
  }
];

export const kaupapaArticles: KaupapaArticle[] = [
  {
    id: "k1",
    titleReo: "Te Kaupapa o Tangaroa & Tikanga mo te Moana",
    titleEn: "Veneration of Tangaroa & Ocean Tikanga at Port Waikato",
    subtitleReo: "Manaakitanga me te Kawa ki te takutai moana.",
    subtitleEn: "Cultural respect, ocean safety, and honoring the meeting place of river and sea.",
    category: "Tikanga & History",
    iconName: "Waves",
    contentReo: [
      "Ko Te Puaha o Waikato te wāhi e tutaki ai te Awa Tupuna o Waikato ki te Moana Tāpokopoko a Tāne (Tasman Sea). Koinei tētahi wāhi tapu tonu ki ngā iwi o Tainui me te hapū o Waikato.",
      "Venerating Tangaroa means acknowledging that the ocean is a living entity. Before entering the surf at Sunset Beach, take a moment of quiet reflection to honor the water, assess the conditions, and leave all ego on the black sand."
    ],
    contentEn: [
      "Te Puaha o Waikato marks the sacred mouth where the mighty ancestral Waikato River discharges into the wild Tasman Sea. It is a place of immense spiritual power and dynamic water movement.",
      "Respecting Tangaroa means recognizing that we are visitors in the marine domain. Surfers are taught to observe the water before plunging in, respect fellow water craft, and protect the fragile coastal environment."
    ],
    keyTakeawayReo: "Whakawhetai ki a Tangaroa i mua i te eke ngaru. (Give thanks to Tangaroa before paddling out.)",
    keyTakeawayEn: "Check conditions, paddle out with respect, and look after visiting watermen."
  },
  {
    id: "k2",
    titleReo: "Te Crossover o te Port Waikato River Bar",
    titleEn: "Mastering the Port Waikato River Mouth Bar Crossing",
    subtitleReo: "He tohu whakaora mo te awa me te bar crossover.",
    subtitleEn: "Essential watercraft and boatie guide for navigating West Coast bar hazards.",
    category: "Ocean Safety",
    iconName: "ShieldAlert",
    contentReo: [
      "Ko te bar crossover i Port Waikato tetahi o ngā wāhi tino tūpato i Aotearoa nei. I te wā e heke ana te tai (ebb tide), ka tutaki te wai awa ki ngā ngaru moana, ka ara ake ngā ngaru kōpahi ririki.",
      "Kia mau tonu ki ngā Ture Bar: 1) Whakamahia te lifejacket i nga wa katoa; 2) Kaua rawa e tatū i te bar i te wā o te Ebb Tide me te Swell Nui; 3) Mātakitaki mai i te kora mo te 15 min."
    ],
    contentEn: [
      "The Port Waikato river bar is notoriously unpredictable. The collision of 400+ cubic meters per second of river flow with heavy West Coast swells creates standing waves and shallow sandbar shifts.",
      "Bar Crossing Golden Rules: Always wear lifejackets, never attempt crossover during max ebb tide with S/SW swell, check weather VHF 05, and maintain radio contact with Coastguard."
    ],
    keyTakeawayReo: "Mēnā e raruraru ana te kitenga, kaua e whawhai ki te bar! (If in doubt, don't cross out!)",
    keyTakeawayEn: "Always check the live bar camera and tidal state before launching from Port Waikato."
  },
  {
    id: "k3",
    titleReo: "Ngā Rip Current o Sunset Beach & Dune Care",
    titleEn: "Sunset Beach Rips, Sandbars & Black Sand Dune Care",
    subtitleReo: "Tiakina te One Maangumangu me ngā Rip Current.",
    subtitleEn: "Understanding West Coast rip dynamics and preserving fragile Spinifex sand dunes.",
    category: "Eco & Dunes",
    iconName: "Flame",
    contentReo: [
      "Ko te one maangumangu (iron-rich black sand) o Sunset Beach e whakatika ana i te taha moana. Kia mau ki te ara waka/hikoi huri noa i ngā Spinifex me Pīngao dunes.",
      "Mēnā ka hopukia koe e te Rip Current: Kaua e pukuriri! Hoe whakarite pātahi ki te taha moana (parallel to beach), ka noho ki runga i tō papa."
    ],
    contentEn: [
      "Sunset Beach black sand gets extremely hot in summer and absorbs magnetic energy. The strong rips feed northward into the river channel. If caught in a rip, stay calm, float on your board, and paddle parallel to the shore.",
      "Dune Care Kaupapa: Please keep off the Spinifex and Pīngao plants on the dunes. They bind the black sand and stop beach erosion."
    ],
    keyTakeawayReo: "Manaaki i ngā Pīngao me te One Maangumangu. (Protect the Pīngao and Black Sand.)",
    keyTakeawayEn: "Relax in rips, float with your surfboard, and use designated boardwalks over dunes."
  }
];

export const initialSessions: SessionLog[] = [
  {
    id: "log1",
    date: "2026-07-28",
    spot: "Sunset Beach Main Peak",
    waveCount: 12,
    waveHeightFeet: 4,
    boardUsed: "6'0 Twin Pin Rocket",
    rating: 5,
    notes: "Offshore easterly wind all morning! Clean 4ft left-hand barrels coming off the black sand bank. Best session of the winter so far.",
    stokedQuote: "Full noise on the left point! Absolute glasshouse."
  },
  {
    id: "log2",
    date: "2026-07-20",
    spot: "Port Waikato River Mouth Bar",
    waveCount: 8,
    waveHeightFeet: 6,
    boardUsed: "6'4 Sunset Obsidian Step-Up",
    rating: 4,
    notes: "Crossed the river mouth bar at high tide slack water. Long walling lefts running 150m down the sandspit. Heavy paddling against river current.",
    stokedQuote: "Tangaroa gave us some absolute bombs today!"
  }
];

export const travelLogsData = [
  {
    id: "t1",
    author: "Rawiri Kahu",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    title: "Northland Reef Mission: Ahipara & Shipwreck Bay",
    destination: "Ahipara, Aotearoa",
    date: "July 2026",
    content: "Took the 4WD crew up North to catch the massive SW swell hitting Shippy's. Endless lefts peeling for 300 meters down the boulder point. Sunset Beach training paid off on the heavy drops!",
    imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&auto=format&fit=crop&q=80",
    likes: 42,
    commentsCount: 9,
    tags: ["Left Hand Point", "RoadTrip", "Ahipara"]
  },
  {
    id: "t2",
    author: "Kaia Henderson",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    title: "Mentawai Islands Boat Charter: Charging Hollow Coral",
    destination: "Mentawai Islands, Indonesia",
    date: "June 2026",
    content: "Two weeks on the water testing out custom 5'11 thrusters in 6ft glass-house barrels. The speed and rail control built from Port Waikato heavy sandbars made every wave feel like home!",
    imageUrl: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&auto=format&fit=crop&q=80",
    likes: 68,
    commentsCount: 14,
    tags: ["Mentawais", "TubeRiding", "WahinePower"]
  }
];

export const forumTopicsData = [
  {
    id: "f1",
    author: "Uncle Hone",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    title: "Sandbar Shift Notice: River Mouth South Channel Opening",
    category: "Bar Safety Chat" as const,
    timestamp: "2 hours ago",
    repliesCount: 12,
    isPinned: true,
    snippet: "Kia ora crew, recent heavy Waikato rain has pushed a new sand spit 100m further west. Watch for shallow sand bars during low tide ebb flow."
  },
  {
    id: "f2",
    author: "Tāne 'T-Bone'",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
    title: "BOARD SWAP: 5'6 Fish for 5'8 Thruster or Grom Step-Up",
    category: "Board Swap" as const,
    timestamp: "Yesterday",
    repliesCount: 5,
    isPinned: false,
    snippet: "Mint condition twin fin keel fish, 29L. Looking to swap for a step-up before the next 8ft winter swell hits Sunset!"
  },
  {
    id: "f3",
    author: "Port Waikato Dune Care",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    title: "Community Dune Planting Working Bee - This Sunday 9AM",
    category: "Dune Eco Project" as const,
    timestamp: "3 days ago",
    repliesCount: 18,
    isPinned: true,
    snippet: "Help us plant 500 native Pīngao & Spinifex grasses along the Sunset Beach dunes. Free coffee & BBQ for all volunteers!"
  }
];

export const sponsorsListData = [
  {
    id: "sp1",
    name: "Waikato Custom Shapes",
    category: "Shaper & Glassing" as const,
    tagline: "Hand-shaped heavy water boards for West Coast sandbars",
    description: "Master shaper Wiremu Kahu has been crafting custom step-ups and fish boards for Sunset Beach surfers for over 25 years.",
    logoIcon: "Flame",
    discountCode: "PUAHA2026",
    websiteUrl: "#",
    featuredProduct: "Sunset Obsidian 6'3 Step-Up",
    badge: "FOUNDING CLUB SPONSOR"
  },
  {
    id: "sp2",
    name: "Blacksand Eatery & Roastery",
    category: "Eatery & Coffee" as const,
    tagline: "Fueling Port Waikato chargers with flat whites & Kai",
    description: "Located right by the river store. Serving organic coffee, smash burgers, and fresh local fish 'n' chips after heavy surf sessions.",
    logoIcon: "Coffee",
    discountCode: "FREECOFFEE10",
    websiteUrl: "#",
    featuredProduct: "Dragon 9 Double Espresso & Stoke Burger",
    badge: "OFFICIAL CLUB CAFE"
  },
  {
    id: "sp3",
    name: "Port Waikato Dune Care Trust",
    category: "Eco & Coastal" as const,
    tagline: "Preserving sacred black sand ecosystems & Pīngao",
    description: "Community driven ecological restoration protecting Port Waikato sand dunes, nesting sea birds, and river spit biodiversity.",
    logoIcon: "Leaf",
    websiteUrl: "#",
    featuredProduct: "Pīngao Planting Grants",
    badge: "KAUPAPA ECO PARTNER"
  },
  {
    id: "sp4",
    name: "Fluid Motion TV & D9 Labs",
    category: "Surf Hardware" as const,
    tagline: "High-octane surf filming, 54-min hour audio & Dragon 9 stream",
    description: "Pioneering fluid motion videography, 4K drone surf coverage, and the world's first 54-minute hour Dragon 9 Anchor audio engine.",
    logoIcon: "Tv",
    discountCode: "FLUIDD9VIP",
    websiteUrl: "#",
    featuredProduct: "Dragon 9 Harmonic Audio Stream & Water Housing",
    badge: "MEDIA & TECHNOLOGY PARTNER"
  }
];

export const featuredMediaItemsData = [
  {
    id: "m1",
    title: "Sunset Beach Winter Bombs: Full Noise Left Point",
    surferName: "Rawiri Kahu & Kaia Henderson",
    spot: "Sunset Beach Main Peak",
    thumbnailUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&auto=format&fit=crop&q=80",
    duration: "4:12",
    uploadDate: "2 days ago",
    tags: ["4K Surf", "West Coast", "Full Noise"],
    views: 1420,
    likes: 184
  },
  {
    id: "m2",
    title: "Port Waikato River Bar Crossover in 8ft Heavy Swell",
    surferName: "Coastguard & Local Boaties",
    spot: "Port Waikato River Mouth Bar",
    thumbnailUrl: "https://images.unsplash.com/photo-1455729552865-3658a5d3a092?w=800&auto=format&fit=crop&q=80",
    duration: "6:45",
    uploadDate: "1 week ago",
    tags: ["Bar Crossover", "Safety", "Heavy Water"],
    views: 3200,
    likes: 410
  },
  {
    id: "m3",
    title: "Grom Squad Air Session & Summer Twin Fin Shred",
    surferName: "Tāne Roa & Manaia Campbell",
    spot: "The Dunes Sandbar",
    thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    duration: "3:20",
    uploadDate: "2 weeks ago",
    tags: ["Grom Squad", "Twin Fin", "Stoke"],
    views: 980,
    likes: 125
  }
];

