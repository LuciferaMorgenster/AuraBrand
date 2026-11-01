import { BrandBible } from '../types/brand';

export interface PresetMission {
  id: string;
  name: string;
  industry: string;
  vibe: string;
  audience: string;
  mission: string;
}

export const PRESET_MISSIONS: PresetMission[] = [
  {
    id: 'solaria',
    name: 'Solaria Energy',
    industry: 'Clean Tech & Microgrids',
    vibe: 'Modern, Technical, Radiant & Trustworthy',
    audience: 'Urban municipalities, eco-conscious estate developers, and infrastructure engineers',
    mission:
      'To decentralize urban energy with intelligent, modular solar glass and hyper-localized battery microgrids that restore ecological equilibrium to 1,000 cities by 2035.',
  },
  {
    id: 'aetheria',
    name: 'Aetheria Botanicals',
    industry: 'Biotech Luxury Skincare',
    vibe: 'Minimalist, Haute Organic, Serene & Scientific',
    audience: 'Luxury wellness connoisseurs valuing clinical cellular longevity and zero-compromise sustainability',
    mission:
      'Pioneering bio-fermented cellular longevity elixirs derived from extreme alpine flora, harmonizing ancient botanical wisdom with precision biotechnology.',
  },
  {
    id: 'kairo',
    name: 'Kairo Spatial',
    industry: 'Spatial Audio & Remote Collaboration',
    vibe: 'Futuristic Neo-Minimalist, Crisp & Immersive',
    audience: 'High-performing distributed engineering teams, game sound designers, and virtual architects',
    mission:
      'Eliminating cognitive fatigue in distributed work through real-time ray-traced spatial acoustics and neural ambient noise sculpting that makes digital rooms feel physical.',
  },
  {
    id: 'veloce',
    name: 'Veloce Dynamics',
    industry: 'Sustainable Micro-Mobility',
    vibe: 'Dynamic, Bold, Industrial Elegance & High Performance',
    audience: 'Next-generation commuters and design purists navigating dense metropolitan hubs',
    mission:
      'Crafting ultra-lightweight aerospace carbon commuter vehicles that make metropolitan movement frictionless, exhilarating, and completely carbon-neutral.',
  },
  {
    id: 'luminary',
    name: 'Luminary Press',
    industry: 'Architectural Publishing & Archival Monographs',
    vibe: 'Timeless Editorial, Swiss Modernism, Tactile & Thoughtful',
    audience: 'Architects, curators, typographers, and collectors of physical print culture',
    mission:
      'Archiving radical contemporary architecture and spatial philosophy in museum-grade linen-bound monographs, celebrating the tactile permanence of the printed word.',
  },
];

// Fallback initial brand bible for instant exploration before generating
export const INITIAL_DEFAULT_BRAND: BrandBible = {
  companyName: 'Solaria',
  tagline: 'Illuminating Autonomous Urban Energy',
  missionStatement:
    'To decentralize urban power with intelligent solar glass microgrids and distributed storage, transforming cities into regenerative living ecosystems.',
  brandStory:
    'Founded at the intersection of material science and urban ecology, Solaria began with a radical observation: the exterior surfaces of our buildings absorb gigawatts of solar radiation yet generate nothing.\n\nBy re-engineering architectural cladding with photovoltaic crystalline nanotechnology, Solaria converts glass, steel, and concrete into silent power generation nodes. We believe the future of clean energy is not built in distant deserts, but woven into the facades of the places where humanity lives and works.',
  brandArchetype: {
    name: 'The Visionary Creator',
    description:
      'Driven by the imperative to redesign foundational infrastructure, Solaria fuses audacious scientific innovation with serene aesthetic craftsmanship.',
    traits: ['Forward-looking', 'Engineered Precision', 'Quietly Authoritative', 'Regenerative'],
  },
  brandValues: [
    {
      title: 'Architectural Symbiosis',
      description: 'Clean energy must elevate architectural beauty, never compromise it.',
    },
    {
      title: 'Radical Transparency',
      description: 'Real-time telemetry and open ledger carbon verification across every kilowatt generated.',
    },
    {
      title: 'Zero-Ego Engineering',
      description: 'Building infrastructure designed to last 50+ years beneath changing human trends.',
    },
    {
      title: 'Decentralized Sovereignty',
      description: 'Empowering local neighborhoods to generate, store, and share energy independently.',
    },
  ],
  voiceAndTone: {
    attributes: [
      'Crisp yet Humane',
      'Architecturally Precise',
      'Quietly Confident',
      'Inspiring without Hype',
    ],
    doList: [
      'Speak in terms of architectural integration and measured kilowatt yields.',
      'Use active, affirmative statements like "Energy crafted into structure".',
      'Celebrate geometric clarity and human habitat equilibrium.',
    ],
    dontList: [
      'Avoid generic corporate jargon like "revolutionizing" or "synergy".',
      'Never sound alarmist; focus on the elegance of the solution.',
      'Do not bury technical truth behind vague marketing claims.',
    ],
    sampleCopy:
      'Every square meter of city glass is a sleeping power plant. Solaria awakens urban architecture with optically pure photovoltaic facades that quietly generate clean power, hour after hour, season after season.',
  },
  colorPalette: [
    {
      name: 'Obsidian Basalt',
      hex: '#0A0F1D',
      role: 'Dominant Canvas / Deep Space',
      percentage: '60%',
      usageNotes:
        'The deep architectural anchor. Used for primary dark backgrounds, footers, typography on light surfaces, and terminal chrome.',
      recommendedOnDark: true,
      contrastNotes: 'Provides 16.4:1 contrast ratio against Solar Citron and 18.2:1 against Pure White.',
    },
    {
      name: 'Solar Citron',
      hex: '#E2F952',
      role: 'Core Energy Accent / High Pop',
      percentage: '10%',
      usageNotes:
        'High-impact radiant accent. Reserved for primary conversion CTAs, active status indicators, and focal geometric logo highlights. Use sparingly.',
      recommendedOnDark: true,
      contrastNotes: 'Pair with Obsidian Basalt for AAA rating. Never use on white backgrounds.',
    },
    {
      name: 'Aero Cyan',
      hex: '#38BDF8',
      role: 'Secondary Technological Glow',
      percentage: '15%',
      usageNotes:
        'Technical precision and fluid data streams. Used for secondary telemetry charts, link hovers, active tab indicators, and subtle gradient strokes.',
      recommendedOnDark: true,
      contrastNotes: 'Ideal for badges and telemetry meters on dark substrates.',
    },
    {
      name: 'Titanium Fog',
      hex: '#94A3B8',
      role: 'Structural Border & Subtitle Neutral',
      percentage: '10%',
      usageNotes:
        'Muted architectural neutral. Applied to card borders, secondary metadata labels, table gridlines, and passive icons.',
      recommendedOnDark: false,
      contrastNotes: 'Passes AA readability for secondary body copy on #0A0F1D.',
    },
    {
      name: 'Alabaster Light',
      hex: '#F8FAFC',
      role: 'Pure Surface & Typography Clarity',
      percentage: '5%',
      usageNotes:
        'High-contrast crisp white. Used for primary headline typography on dark backgrounds, pristine print paper stock, and clean card surfaces.',
      recommendedOnDark: false,
      contrastNotes: 'Provides maximum 19.5:1 optical contrast ratio against Obsidian Basalt.',
    },
  ],
  typography: {
    headerFont: {
      family: 'Plus Jakarta Sans',
      category: 'Sans-Serif Geometric',
      weights: ['600', '700', '800'],
      vibe: 'Modern European geometric clarity with humanistic curve terminals and authoritative presence.',
      googleFontQuery: 'Plus+Jakarta+Sans:wght@600;700;800',
    },
    bodyFont: {
      family: 'Inter',
      category: 'Sans-Serif Grotesque',
      weights: ['400', '500', '600'],
      vibe: 'Universally legible screen font with tall x-height and exceptional micro-readability.',
      googleFontQuery: 'Inter:wght@400;500;600',
    },
    accentFont: {
      family: 'JetBrains Mono',
      usage: 'Precision telemetry, kilowatt metrics, and system coordinate badges.',
      googleFontQuery: 'JetBrains+Mono:wght@400;500;700',
    },
    fontPairingRationale:
      'Plus Jakarta Sans brings forward-thinking architectural weight to display headings, while Inter ensures neutral, zero-strain reading across dense technical specifications and telemetry tables.',
    typographicScale: [
      {
        level: 'Display Hero',
        sizeRem: '3.75rem',
        weight: '800 ExtraBold',
        tracking: '-0.04em',
        sampleText: 'Decentralized Urban Energy, Built Into the Glass.',
      },
      {
        level: 'Section H1',
        sizeRem: '2.5rem',
        weight: '700 Bold',
        tracking: '-0.03em',
        sampleText: 'Living Infrastructure for 1,000 Regenerative Cities.',
      },
      {
        level: 'Card Title H2',
        sizeRem: '1.5rem',
        weight: '600 SemiBold',
        tracking: '-0.02em',
        sampleText: 'Photovoltaic Microgrid Specifications',
      },
      {
        level: 'Body Regular',
        sizeRem: '1rem',
        weight: '400 Regular',
        tracking: '0em',
        sampleText:
          'Our nanocoated architectural modules integrate directly into standard curtain wall glazing, capturing diffused solar rays even in overcast metropolitan climates.',
      },
      {
        level: 'Telemetry Caption',
        sizeRem: '0.8125rem',
        weight: '500 Medium',
        tracking: '0.04em',
        sampleText: 'GRID NODE #8492 // 4.8 kW/h YIELD // EFFICIENCY 99.4%',
      },
    ],
  },
  primaryLogoConcept: {
    conceptName: 'The Radiant Matrix Prism',
    description:
      'A continuous geometric hex-ring that unfolds into an architectural perspective grid. The internal apex represents a solar photon entering a crystal lattice, radiating outward into balanced, balanced isometric lines.',
    symbolism:
      'The outer polygon signifies metropolitan architecture; the glowing internal rays signify captured clean energy distributed outward to the neighborhood.',
    clearSpaceRule:
      'Maintain an unobstructed exclusion zone equal to 1.5X on all four sides, where X equals the vertical height of the central prism emblem.',
    minimumSize: 'Digital: 28px height; Physical Print: 12mm width.',
    imagePrompt:
      'A pristine modern minimalist vector logo mark for "Solaria". An elegant geometric solar crystal prism and isometric energy hexagonal facet. Sharp vector lines, glowing citron yellow #E2F952 and electric cyan #38BDF8 accents on solid dark obsidian #0A0F1D background. Clean negative space, Swiss design aesthetic, award winning graphic identity.',
  },
  secondaryMarks: [
    {
      name: 'Solaria Monogram / App Icon',
      type: 'Icon & Favicon',
      description:
        'A stylized letter "S" constructed from two interlocking photovoltaic angled facets, enclosed in a rounded squircle for mobile touch targets.',
      usageGuidelines:
        'Use on mobile app icons, browser favicons, social media profile avatars, and smart meter hardware badges.',
      imagePrompt:
        'Minimalist mobile app icon for Solaria. Letter S formed by glowing clean geometric solar facets. Deep dark background, vibrant neon citron and sky cyan gradient edges, vector graphic mark, centered.',
    },
    {
      name: 'Architectural Heritage Seal',
      type: 'Circular Stamp / Seal',
      description:
        'A circular emblem featuring the central radiant prism encircled by the text "SOLARIA AUTONOMOUS MICROGRIDS • EST. 2026 • ZERO CARBON" in monospaced caps.',
      usageGuidelines:
        'Deploy on building certification plaques, official equipment hardware engravings, warranty certificates, and embossed packaging.',
      imagePrompt:
        'Circular architectural stamp emblem for Solaria. Technical precision typography in ring around central geometric solar prism. Crisp vector seal, matte gold and cyan linework on dark background.',
    },
    {
      name: 'Horizontal Wordmark Lockup',
      type: 'Compact Header Wordmark',
      description:
        'The geometric Solaria prism mark positioned to the left of the custom kerning wordmark "SOLARIA" in Plus Jakarta Sans Bold, followed by an inline energy dot.',
      usageGuidelines:
        'Primary navigation bars, corporate letterheads, investor pitch decks, and building signage.',
      imagePrompt:
        'Modern corporate horizontal logo lockup. Clean geometric prism icon on left, modern wordmark SOLARIA on right, crisp minimalist typography, isolated on dark neutral background.',
    },
  ],
  mockups: {
    stationeryCard:
      'Matte charcoal 600gsm cotton cardstock with edge-foiled Solar Citron bevels. Blind debossed geometric logo on front, silver hot-stamped typography on back.',
    mobileApp:
      'iOS telemetry dashboard featuring dark mode obsidian glassmorphism, real-time energy flow waveforms, and the glowing citron app icon with haptic status feedback.',
    merchandise:
      'Heavyweight 400gsm recycled organic canvas field totes with screenprinted isometric grid guidelines, and matte black PVD stainless water flasks laser-etched with the Solaria seal.',
    packaging:
      'Rigid recycled cardboard modular casing with magnetic closure. Inside, hardware sits in custom molded cellulose pulp dyed with vegetable inks.',
  },
};
