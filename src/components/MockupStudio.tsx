import React, { useState } from 'react';
import {
  Briefcase,
  Smartphone,
  ShoppingBag,
  Package,
  RotateCw,
  Sparkles,
  QrCode,
  Wifi,
  Battery,
  Shield,
  Layers,
} from 'lucide-react';
import { BrandBible } from '../types/brand';

interface MockupStudioProps {
  brand: BrandBible;
}

export const MockupStudio: React.FC<MockupStudioProps> = ({ brand }) => {
  const [activeMockup, setActiveMockup] = useState<'card' | 'mobile' | 'merch' | 'package'>('card');
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const primaryColor = brand.colorPalette[0]?.hex || '#0A0F1D';
  const accentColor = brand.colorPalette[1]?.hex || '#E2F952';
  const secondaryColor = brand.colorPalette[2]?.hex || '#38BDF8';
  const neutralColor = brand.colorPalette[3]?.hex || '#94A3B8';
  const lightColor = brand.colorPalette[4]?.hex || '#F8FAFC';

  const headerFont = brand.typography.headerFont.family;
  const bodyFont = brand.typography.bodyFont.family;

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-400 border border-pink-500/20 mb-2">
            <Layers className="h-3.5 w-3.5" />
            Applied Identity
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Real-World Brand Mockup Studio
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Preview how your brand colors, logo concepts, and typography manifest across physical and digital touchpoints.
          </p>
        </div>

        {/* Mockup Selector Tabs */}
        <div className="flex flex-wrap items-center rounded-xl bg-zinc-900 p-1 border border-zinc-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveMockup('card')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-all ${
              activeMockup === 'card'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            <span>Stationery Card</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMockup('mobile')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-all ${
              activeMockup === 'mobile'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Mobile App</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMockup('merch')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-all ${
              activeMockup === 'merch'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Merchandise</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMockup('package')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-all ${
              activeMockup === 'package'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Package className="h-3.5 w-3.5" />
            <span>Packaging</span>
          </button>
        </div>
      </div>

      {/* Mockup Presentation Stage */}
      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        {/* MOCKUP 1: BUSINESS CARD (3D FLIP) */}
        {activeMockup === 'card' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white">
                  600gsm Heavyweight Foil-Edge Business Card
                </h3>
                <p className="text-xs text-zinc-400">{brand.mockups?.stationeryCard}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-1.5 text-xs font-semibold text-zinc-200 hover:text-white hover:bg-zinc-700 transition-colors self-start"
              >
                <RotateCw className="h-3.5 w-3.5 text-amber-400" />
                <span>Flip to {isCardFlipped ? 'Front' : 'Back'}</span>
              </button>
            </div>

            {/* Business Card Container */}
            <div className="flex items-center justify-center py-8 sm:py-12">
              <div
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className="cursor-pointer transition-all duration-500 hover:scale-[1.02] shadow-2xl rounded-2xl w-full max-w-md aspect-[1.75/1] p-6 sm:p-8 relative flex flex-col justify-between overflow-hidden border border-white/10"
                style={{
                  backgroundColor: isCardFlipped ? lightColor : primaryColor,
                  color: isCardFlipped ? primaryColor : lightColor,
                }}
              >
                {/* Metallic Accent Edge Simulation */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: accentColor }}
                />

                {!isCardFlipped ? (
                  /* FRONT OF CARD */
                  <>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {brand.primaryLogoConcept?.generatedImageUrl ? (
                          <img
                            src={brand.primaryLogoConcept.generatedImageUrl}
                            alt="Logo"
                            className="h-10 w-10 rounded-lg object-contain"
                          />
                        ) : (
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-lg font-black text-sm"
                            style={{
                              backgroundColor: accentColor,
                              color: primaryColor,
                              fontFamily: headerFont,
                            }}
                          >
                            {brand.companyName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h4
                            style={{ fontFamily: headerFont }}
                            className="text-lg font-extrabold tracking-tight"
                          >
                            {brand.companyName}
                          </h4>
                          <span
                            style={{ fontFamily: bodyFont }}
                            className="text-[10px] tracking-wider uppercase opacity-70 block"
                          >
                            {brand.tagline}
                          </span>
                        </div>
                      </div>

                      <span
                        className="rounded-full px-2 py-0.5 text-[9px] font-mono font-bold"
                        style={{
                          backgroundColor: `${accentColor}20`,
                          color: accentColor,
                          border: `1px solid ${accentColor}40`,
                        }}
                      >
                        OFFICIAL
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div
                        style={{ fontFamily: headerFont }}
                        className="text-base font-bold"
                      >
                        Alexander Wright
                      </div>
                      <div
                        style={{ fontFamily: bodyFont }}
                        className="text-xs opacity-75"
                      >
                        Chief Executive Officer & Founder
                      </div>
                      <div className="pt-2 flex items-center justify-between text-[10px] opacity-60 font-mono">
                        <span>alexander@{brand.companyName.toLowerCase().replace(/\s+/g, '')}.com</span>
                        <span>+1 (415) 890-3200</span>
                      </div>
                    </div>
                  </>
                ) : (
                  /* BACK OF CARD */
                  <div className="h-full flex flex-col justify-between items-center text-center py-2">
                    <div
                      style={{ fontFamily: headerFont }}
                      className="text-2xl font-black tracking-tight"
                    >
                      {brand.companyName}
                    </div>

                    <p
                      style={{ fontFamily: bodyFont }}
                      className="text-xs max-w-xs font-medium italic opacity-85 leading-relaxed"
                    >
                      "{brand.missionStatement}"
                    </p>

                    <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase opacity-60">
                      <span>{brand.companyName.toUpperCase()} STUDIO</span>
                      <span>•</span>
                      <span>EST. 2026</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MOCKUP 2: MOBILE APP */}
        {activeMockup === 'mobile' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Mobile iOS & Android Touchpoint</h3>
              <p className="text-xs text-zinc-400">{brand.mockups?.mobileApp}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-6">
              {/* App Icon Tile */}
              <div className="flex flex-col items-center gap-3">
                <div
                  className="h-28 w-28 rounded-3xl p-4 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden border border-white/20"
                  style={{
                    backgroundColor: primaryColor,
                    boxShadow: `0 20px 40px -15px ${primaryColor}80`,
                  }}
                >
                  <div
                    className="absolute -right-6 -top-6 h-16 w-16 rounded-full blur-xl"
                    style={{ backgroundColor: accentColor }}
                  />
                  {brand.secondaryMarks?.[0]?.generatedImageUrl ? (
                    <img
                      src={brand.secondaryMarks[0].generatedImageUrl}
                      alt="App Icon"
                      className="h-full w-full object-contain"
                    />
                  ) : brand.primaryLogoConcept?.generatedImageUrl ? (
                    <img
                      src={brand.primaryLogoConcept.generatedImageUrl}
                      alt="Logo Icon"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span
                      style={{ fontFamily: headerFont, color: accentColor }}
                      className="text-4xl font-black drop-shadow-md"
                    >
                      {brand.companyName.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-zinc-200">{brand.companyName}</span>
                <span className="text-[10px] font-mono text-zinc-500">iOS Squircle 180×180</span>
              </div>

              {/* Mobile Phone Screen Simulator */}
              <div className="w-full max-w-[280px] rounded-[36px] border-4 border-zinc-700 bg-zinc-950 p-4 shadow-2xl space-y-4">
                {/* Phone Notch */}
                <div className="flex items-center justify-between text-[10px] text-zinc-400 px-2 pt-1">
                  <span className="font-semibold text-white">9:41</span>
                  <div className="h-4 w-16 rounded-full bg-zinc-800" />
                  <div className="flex items-center gap-1">
                    <Wifi className="h-3 w-3" />
                    <Battery className="h-3 w-3" />
                  </div>
                </div>

                {/* App Screen Header */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                        Welcome to
                      </span>
                      <h4 style={{ fontFamily: headerFont }} className="text-base font-bold text-white">
                        {brand.companyName}
                      </h4>
                    </div>
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs"
                      style={{ backgroundColor: accentColor, color: primaryColor }}
                    >
                      {brand.companyName.charAt(0)}
                    </div>
                  </div>

                  {/* Sample Mobile Card */}
                  <div
                    className="rounded-2xl p-4 space-y-2 border border-white/10"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <span
                      style={{ color: accentColor }}
                      className="text-[10px] font-mono font-bold uppercase tracking-wider block"
                    >
                      Active Overview
                    </span>
                    <p
                      style={{ fontFamily: bodyFont }}
                      className="text-xs font-medium text-white/90 leading-snug"
                    >
                      {brand.tagline}
                    </p>
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        style={{ backgroundColor: accentColor, color: primaryColor }}
                        className="rounded-lg px-3 py-1 text-[11px] font-bold shadow-sm"
                      >
                        Explore
                      </button>
                    </div>
                  </div>

                  {/* Telemetry Metric Pill */}
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400">System Status</span>
                    <span className="text-[11px] font-semibold text-emerald-400">● 100% Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MOCKUP 3: MERCHANDISE */}
        {activeMockup === 'merch' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Tactile Merchandise & Field Tote</h3>
              <p className="text-xs text-zinc-400">{brand.mockups?.merchandise}</p>
            </div>

            <div className="flex items-center justify-center py-6">
              {/* Heavyweight Canvas Tote Bag Representation */}
              <div className="relative w-full max-w-sm aspect-[1/1.2] rounded-3xl bg-stone-200 border-2 border-stone-300 p-8 shadow-2xl flex flex-col justify-between overflow-hidden">
                {/* Tote Straps */}
                <div className="absolute -top-12 left-16 right-16 h-20 border-4 border-stone-300 rounded-t-3xl pointer-events-none" />

                {/* Top Stitching line */}
                <div className="border-b-2 border-dashed border-stone-400/50 pb-2 flex justify-between text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                  <span>100% RECYCLED ORGANIC CANVAS</span>
                  <span>400 GSM</span>
                </div>

                {/* Screenprinted Brand Centerpiece */}
                <div className="my-auto text-center space-y-4">
                  <div
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl shadow-md border"
                    style={{
                      backgroundColor: primaryColor,
                      borderColor: accentColor,
                    }}
                  >
                    {brand.primaryLogoConcept?.generatedImageUrl ? (
                      <img
                        src={brand.primaryLogoConcept.generatedImageUrl}
                        alt="Logo"
                        className="h-14 w-14 object-contain"
                      />
                    ) : (
                      <span
                        style={{ fontFamily: headerFont, color: accentColor }}
                        className="text-3xl font-black"
                      >
                        {brand.companyName.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div
                    style={{ fontFamily: headerFont, color: primaryColor }}
                    className="text-2xl font-black tracking-tight"
                  >
                    {brand.companyName.toUpperCase()}
                  </div>

                  <p
                    style={{ fontFamily: bodyFont, color: primaryColor }}
                    className="text-xs max-w-xs mx-auto font-medium opacity-80 italic"
                  >
                    "{brand.missionStatement}"
                  </p>
                </div>

                {/* Bottom Coordinates & Seal */}
                <div className="pt-2 border-t border-stone-300/80 flex items-center justify-between text-[10px] font-mono text-stone-600">
                  <span>GLOBAL HEADQUARTERS</span>
                  <span>SPECIFICATION NO. 2026-A</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MOCKUP 4: PACKAGING BOX */}
        {activeMockup === 'package' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Matte Modular Product Packaging</h3>
              <p className="text-xs text-zinc-400">{brand.mockups?.packaging}</p>
            </div>

            <div className="flex items-center justify-center py-8">
              {/* Luxury Packaging Box Face */}
              <div
                className="w-full max-w-md aspect-[1.3/1] rounded-2xl p-8 shadow-2xl flex flex-col justify-between border border-white/10 relative overflow-hidden"
                style={{ backgroundColor: primaryColor }}
              >
                {/* Gold/Accent Foil Ribbon */}
                <div
                  className="absolute right-8 top-0 bottom-0 w-3 shadow-md opacity-90"
                  style={{ backgroundColor: accentColor }}
                />

                <div className="flex items-center justify-between">
                  <span
                    style={{ color: secondaryColor }}
                    className="text-[10px] font-mono font-bold tracking-widest uppercase"
                  >
                    LIMITED EDITION // 001
                  </span>
                  <Shield className="h-4 w-4 text-zinc-500" />
                </div>

                <div className="space-y-2">
                  <div
                    style={{ fontFamily: headerFont, color: lightColor }}
                    className="text-3xl font-black tracking-tight"
                  >
                    {brand.companyName}
                  </div>
                  <div
                    style={{ fontFamily: bodyFont, color: neutralColor }}
                    className="text-xs tracking-wider uppercase font-semibold"
                  >
                    {brand.tagline}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[10px] font-mono text-zinc-400">
                  <span>BIODEGRADABLE CELLULOSE</span>
                  <span style={{ color: accentColor }}>CERTIFIED SUSTAINABLE</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
