import React, { useState, useEffect } from 'react';
import {
  Type,
  Copy,
  Check,
  Sparkles,
  Sliders,
  ExternalLink,
  BookOpen,
  AlignLeft,
  Columns,
  Layers,
  Code2,
} from 'lucide-react';
import { TypographyPairing } from '../types/brand';
import { loadTypographyPairing } from '../utils/fontLoader';

interface TypographySectionProps {
  typography: TypographyPairing;
}

export const TypographySection: React.FC<TypographySectionProps> = ({ typography }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImport, setCopiedImport] = useState(false);
  const [interactiveHeadline, setInteractiveHeadline] = useState(
    'Architecture Born From Radiant Sunlight'
  );
  const [interactiveBody, setInteractiveBody] = useState(
    'Every surface is an opportunity for quiet elegance and functional utility. By balancing forward-looking typography with humanistic geometry, our brand identity commands attention without shouting.'
  );
  const [fontSizeScale, setFontSizeScale] = useState<number>(100);

  // Dynamically load the Google Fonts into the document head
  useEffect(() => {
    loadTypographyPairing(
      typography.headerFont.family,
      typography.bodyFont.family,
      typography.accentFont?.family
    );
  }, [typography]);

  const headerFontFamily = `"${typography.headerFont.family}", sans-serif`;
  const bodyFontFamily = `"${typography.bodyFont.family}", sans-serif`;
  const accentFontFamily = typography.accentFont?.family
    ? `"${typography.accentFont.family}", monospace`
    : 'monospace';

  const googleFontsLink = `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=${typography.headerFont.family.replace(
    /\s+/g,
    '+'
  )}:wght@600;700;800&family=${typography.bodyFont.family.replace(
    /\s+/g,
    '+'
  )}:wght@400;500;600&display=swap" rel="stylesheet">`;

  const googleFontsImport = `@import url('https://fonts.googleapis.com/css2?family=${typography.headerFont.family.replace(
    /\s+/g,
    '+'
  )}:wght@600;700;800&family=${typography.bodyFont.family.replace(
    /\s+/g,
    '+'
  )}:wght@400;500;600&display=swap');`;

  const copyCode = (text: string, type: 'link' | 'import') => {
    navigator.clipboard.writeText(text);
    if (type === 'link') setCopiedLink(true);
    if (type === 'import') setCopiedImport(true);
    setTimeout(() => {
      setCopiedLink(false);
      setCopiedImport(false);
    }, 2000);
  };

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400 border border-violet-500/20 mb-2">
            <Type className="h-3.5 w-3.5" />
            Google Fonts Architecture
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Typography Pairings: Headers & Body
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Harmonic Google Font duo pairing authoritative display headlines with optical micro-legibility.
          </p>
        </div>

        {/* External Google Fonts link */}
        <div className="flex items-center gap-2">
          <a
            href={`https://fonts.google.com/specimen/${typography.headerFont.family.replace(
              /\s+/g,
              '+'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <span>{typography.headerFont.family}</span>
            <ExternalLink className="h-3 w-3 text-zinc-500" />
          </a>
          <a
            href={`https://fonts.google.com/specimen/${typography.bodyFont.family.replace(
              /\s+/g,
              '+'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <span>{typography.bodyFont.family}</span>
            <ExternalLink className="h-3 w-3 text-zinc-500" />
          </a>
        </div>
      </div>

      {/* Main Duo Pairing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Header Font Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-bold">
              Primary Header & Display
            </span>
            <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-300 border border-zinc-700">
              {typography.headerFont.category || 'Display / Sans-Serif'}
            </span>
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {typography.headerFont.family}
            </h3>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              {typography.headerFont.vibe}
            </p>
          </div>

          {/* Real Live Font Preview */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-3">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">
              Live Rendering Preview
            </span>
            <div
              style={{ fontFamily: headerFontFamily }}
              className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight leading-snug"
            >
              The Quick Brown Fox Jumps Over The Lazy Dog.
            </div>
            <div
              style={{ fontFamily: headerFontFamily }}
              className="text-xs sm:text-sm font-medium text-zinc-400 uppercase tracking-widest"
            >
              ABCDEFGHIJKLMNOPQRSTUVWXYZ • 0123456789
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-zinc-500 text-[11px]">Recommended Weights:</span>
            {typography.headerFont.weights?.map((w, idx) => (
              <span
                key={idx}
                className="rounded bg-zinc-800/80 px-2 py-0.5 font-mono text-[11px] font-semibold text-zinc-300 border border-zinc-700/60"
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Body Font Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
              Primary Body & UI Text
            </span>
            <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-300 border border-zinc-700">
              {typography.bodyFont.category || 'Body / Grotesque'}
            </span>
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {typography.bodyFont.family}
            </h3>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              {typography.bodyFont.vibe}
            </p>
          </div>

          {/* Real Live Font Preview */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-3">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">
              Live Rendering Preview
            </span>
            <p
              style={{ fontFamily: bodyFontFamily }}
              className="text-sm sm:text-base text-zinc-200 leading-relaxed"
            >
              Great typography establishes an invisible rhythm between human thought and the screen.
              By choosing balanced proportions and generous x-height, long-form reading feels effortless.
            </p>
            <div
              style={{ fontFamily: bodyFontFamily }}
              className="text-xs text-zinc-400 font-mono"
            >
              abcdefghijklmnopqrstuvwxyz • (.,:;!?&%$#@)
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-zinc-500 text-[11px]">Recommended Weights:</span>
            {typography.bodyFont.weights?.map((w, idx) => (
              <span
                key={idx}
                className="rounded bg-zinc-800/80 px-2 py-0.5 font-mono text-[11px] font-semibold text-zinc-300 border border-zinc-700/60"
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Font Pairing Strategic Rationale */}
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-950 p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-zinc-200 font-semibold text-sm">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>Typographic Pairing Rationale & Visual Harmony</span>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed">
          {typography.fontPairingRationale}
        </p>
        {typography.accentFont?.family && (
          <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center gap-2 text-xs text-zinc-400">
            <span className="font-semibold text-zinc-300">Accent / Code Font:</span>
            <span className="font-mono text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/20">
              {typography.accentFont.family}
            </span>
            <span className="text-zinc-500">({typography.accentFont.usage})</span>
          </div>
        )}
      </div>

      {/* Interactive Typography Sandbox */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="h-4 w-4 text-indigo-400" />
              Interactive Typography Sandbox
            </h3>
            <p className="text-xs text-zinc-400">
              Test your brand's headlines and body copy in real time with dynamic font rendering.
            </p>
          </div>

          {/* Size scale slider */}
          <div className="flex items-center gap-3 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800 text-xs">
            <span className="text-zinc-400 text-[11px]">Preview Scale:</span>
            <input
              type="range"
              min="80"
              max="140"
              value={fontSizeScale}
              onChange={(e) => setFontSizeScale(parseInt(e.target.value, 10))}
              className="w-24 accent-indigo-500 cursor-pointer"
            />
            <span className="font-mono text-zinc-300 w-9 text-right">{fontSizeScale}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Editable Inputs (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                <span>Headline Copy ({typography.headerFont.family})</span>
              </label>
              <textarea
                rows={2}
                value={interactiveHeadline}
                onChange={(e) => setInteractiveHeadline(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                <span>Body Copy ({typography.bodyFont.family})</span>
              </label>
              <textarea
                rows={4}
                value={interactiveBody}
                onChange={(e) => setInteractiveBody(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
          </div>

          {/* Live Rendered Showcase (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-4 flex flex-col justify-center">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 border-b border-zinc-800/80 pb-2">
              <span>LIVE VIEWPORT SIMULATION</span>
              <span>
                {typography.headerFont.family} + {typography.bodyFont.family}
              </span>
            </div>

            <h4
              style={{
                fontFamily: headerFontFamily,
                fontSize: `${(2.25 * fontSizeScale) / 100}rem`,
              }}
              className="font-bold text-white tracking-tight leading-tight"
            >
              {interactiveHeadline}
            </h4>

            <p
              style={{
                fontFamily: bodyFontFamily,
                fontSize: `${(1 * fontSizeScale) / 100}rem`,
              }}
              className="text-zinc-300 leading-relaxed"
            >
              {interactiveBody}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                style={{ fontFamily: headerFontFamily }}
                className="rounded-xl bg-white px-5 py-2 text-xs font-bold text-zinc-950 hover:bg-zinc-200 transition-colors"
              >
                Primary Callout
              </button>
              <button
                type="button"
                style={{ fontFamily: bodyFontFamily }}
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
              >
                Secondary Action
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Typographic Scale Ladder */}
      {typography.typographicScale && typography.typographicScale.length > 0 && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 space-y-5">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-violet-400" />
              Complete Typographic Hierarchy Scale
            </h3>
            <p className="text-xs text-zinc-400">
              Precise scale ladder with sizing, tracking, weight, and sample content.
            </p>
          </div>

          <div className="divide-y divide-zinc-800/80 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
            {typography.typographicScale.map((item, idx) => {
              const isHeader = item.level.includes('Hero') || item.level.includes('H1') || item.level.includes('H2');
              return (
                <div key={idx} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-zinc-900/50 transition-colors">
                  <div className="w-48 shrink-0 space-y-1">
                    <span className="text-xs font-bold text-white block">{item.level}</span>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400">
                      <span className="text-indigo-400 font-semibold">{item.sizeRem}</span>
                      <span>•</span>
                      <span>{item.weight}</span>
                      <span>•</span>
                      <span>{item.tracking}</span>
                    </div>
                  </div>

                  <div
                    style={{
                      fontFamily: isHeader ? headerFontFamily : bodyFontFamily,
                      fontSize: `clamp(0.9rem, ${item.sizeRem}, 2.5rem)`,
                      letterSpacing: item.tracking,
                    }}
                    className="flex-1 text-zinc-200 font-medium truncate"
                  >
                    {item.sampleText}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Google Fonts Embed Codes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-violet-400" />
              HTML &lt;link&gt; Embed Code
            </span>
            <button
              type="button"
              onClick={() => copyCode(googleFontsLink, 'link')}
              className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 font-semibold"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Copy &lt;link&gt;'}</span>
            </button>
          </div>
          <pre className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
            {googleFontsLink}
          </pre>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-emerald-400" />
              CSS @import Directive
            </span>
            <button
              type="button"
              onClick={() => copyCode(googleFontsImport, 'import')}
              className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              {copiedImport ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedImport ? 'Copied' : 'Copy @import'}</span>
            </button>
          </div>
          <pre className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
            {googleFontsImport}
          </pre>
        </div>
      </div>
    </section>
  );
};
