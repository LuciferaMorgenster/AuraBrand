export type ImageResolution = '1K' | '2K' | '4K';

export interface BrandColor {
  name: string;
  hex: string;
  role: string;
  percentage: string;
  usageNotes: string;
  recommendedOnDark?: boolean;
  contrastNotes?: string;
}

export interface GoogleFontMeta {
  family: string;
  category?: string;
  weights?: string[];
  vibe?: string;
  googleFontQuery?: string;
  usage?: string;
}

export interface TypographicScaleLevel {
  level: string;
  sizeRem: string;
  weight: string;
  tracking: string;
  sampleText: string;
}

export interface TypographyPairing {
  headerFont: GoogleFontMeta;
  bodyFont: GoogleFontMeta;
  accentFont: GoogleFontMeta;
  fontPairingRationale: string;
  typographicScale: TypographicScaleLevel[];
}

export interface PrimaryLogo {
  conceptName: string;
  description: string;
  symbolism: string;
  clearSpaceRule: string;
  minimumSize: string;
  imagePrompt: string;
  generatedImageUrl?: string;
  imageSize?: ImageResolution;
}

export interface SecondaryMark {
  name: string;
  type: string;
  description: string;
  usageGuidelines: string;
  imagePrompt: string;
  generatedImageUrl?: string;
  imageSize?: ImageResolution;
}

export interface BrandArchetype {
  name: string;
  description: string;
  traits: string[];
}

export interface BrandValue {
  title: string;
  description: string;
}

export interface VoiceAndTone {
  attributes: string[];
  doList: string[];
  dontList: string[];
  sampleCopy: string;
}

export interface MockupGuidelines {
  stationeryCard: string;
  mobileApp: string;
  merchandise: string;
  packaging: string;
}

export interface BrandBible {
  companyName: string;
  tagline: string;
  missionStatement: string;
  brandStory: string;
  brandArchetype: BrandArchetype;
  brandValues: BrandValue[];
  voiceAndTone: VoiceAndTone;
  colorPalette: BrandColor[];
  typography: TypographyPairing;
  primaryLogoConcept: PrimaryLogo;
  secondaryMarks: SecondaryMark[];
  mockups: MockupGuidelines;
  createdAt?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'assistant';
  text: string;
  timestamp: string;
  modelUsed?: string;
}
