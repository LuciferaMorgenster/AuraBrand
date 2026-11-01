import React from 'react';
import {
  Quote,
  Compass,
  Sparkles,
  CheckCircle2,
  XCircle,
  FileText,
  Target,
  Crown,
  Heart,
  Shield,
  Lightbulb,
} from 'lucide-react';
import { BrandBible } from '../types/brand';

interface BrandOverviewProps {
  brand: BrandBible;
}

export const BrandOverview: React.FC<BrandOverviewProps> = ({ brand }) => {
  return (
    <section className="space-y-8">
      {/* Brand Hero & Manifesto Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-8 sm:p-10 shadow-2xl">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800/80 px-3.5 py-1 text-xs font-semibold text-zinc-300 border border-zinc-700">
              <Compass className="h-3.5 w-3.5 text-amber-400" />
              <span>Brand Identity Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">Archetype:</span>
              <span className="rounded-lg bg-indigo-500/20 px-2.5 py-0.5 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                {brand.brandArchetype?.name}
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              {brand.companyName}
            </h1>
            <p className="mt-2 text-xl sm:text-2xl font-light text-zinc-300">
              "{brand.tagline}"
            </p>
          </div>

          {/* Mission Statement Blockquote */}
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-6 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <Quote className="h-6 w-6 text-indigo-400 shrink-0 mt-1" />
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-indigo-300">
                  Mission Statement
                </span>
                <p className="mt-1 text-base sm:text-lg font-medium text-zinc-100 leading-relaxed">
                  {brand.missionStatement}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Narrative & Archetype Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Brand Story (2 cols on large) */}
        <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-2 text-zinc-200 font-semibold text-sm">
            <FileText className="h-4 w-4 text-amber-400" />
            <span>Origin Story & Strategic Manifesto</span>
          </div>
          <div className="prose prose-invert max-w-none text-sm text-zinc-300 leading-relaxed space-y-3 whitespace-pre-line">
            {brand.brandStory}
          </div>
        </div>

        {/* Archetype Profile Card */}
        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 text-zinc-200 font-semibold text-sm">
            <Crown className="h-4 w-4 text-indigo-400" />
            <span>Brand Archetype</span>
          </div>

          <div className="space-y-3">
            <div className="text-xl font-bold text-white">
              {brand.brandArchetype?.name}
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {brand.brandArchetype?.description}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Archetypal Traits
            </span>
            <div className="flex flex-wrap gap-1.5">
              {brand.brandArchetype?.traits?.map((trait, idx) => (
                <span
                  key={idx}
                  className="rounded-lg bg-zinc-800/90 px-2.5 py-1 text-xs font-medium text-zinc-200 border border-zinc-700/60"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Foundational Values */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            Foundational Core Values
          </h3>
          <span className="text-xs text-zinc-500">Guiding internal culture & external brand promise</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {brand.brandValues?.map((val, idx) => {
            const icons = [Compass, Heart, Shield, Lightbulb];
            const IconComponent = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="group rounded-2xl border border-zinc-800/90 bg-zinc-900/50 p-5 hover:border-zinc-700 hover:bg-zinc-850 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-zinc-600">0{idx + 1}</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                  {val.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Voice & Tone Governance (Do's & Don'ts) */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-400" />
              Verbal Voice & Tone Governance
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              How the brand speaks across customer touchpoints, marketing copy, and documentation.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {brand.voiceAndTone?.attributes?.map((attr, idx) => (
              <span
                key={idx}
                className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300 border border-zinc-700"
              >
                {attr}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Verbal Do's */}
          <div className="rounded-xl border border-emerald-950/40 bg-emerald-950/10 p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wider uppercase">
              <CheckCircle2 className="h-4 w-4" />
              <span>Verbal Do's</span>
            </div>
            <ul className="space-y-2.5">
              {brand.voiceAndTone?.doList?.map((doItem, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{doItem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verbal Don'ts */}
          <div className="rounded-xl border border-rose-950/40 bg-rose-950/10 p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs tracking-wider uppercase">
              <XCircle className="h-4 w-4" />
              <span>Verbal Don'ts</span>
            </div>
            <ul className="space-y-2.5">
              {brand.voiceAndTone?.dontList?.map((dontItem, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>{dontItem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sample Hero Copy */}
        {brand.voiceAndTone?.sampleCopy && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">
              Sample Voice In Action (Hero Statement)
            </span>
            <p className="text-sm font-medium italic text-zinc-200">
              "{brand.voiceAndTone.sampleCopy}"
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
