import React, { useState } from 'react';
import {
  Palette,
  Copy,
  Check,
  ShieldCheck,
  Code2,
  Sliders,
  Sparkles,
  Info,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { BrandColor } from '../types/brand';
import {
  hexToRgb,
  rgbToHsl,
  rgbToCmyk,
  getContrastRatio,
  getWcagRating,
  isColorDark,
  generateCssTokens,
  generateTailwindConfig,
} from '../utils/colorUtils';

interface ColorPaletteSectionProps {
  palette: BrandColor[];
}

export const ColorPaletteSection: React.FC<ColorPaletteSectionProps> = ({ palette }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'cards' | 'contrast' | 'export'>('cards');

  const copyToClipboard = (text: string, id: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) setCopiedIndex(index);
    setCopiedType(id);
    setTimeout(() => {
      setCopiedIndex(null);
      setCopiedType(null);
    }, 2000);
  };

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 mb-2">
            <Palette className="h-3.5 w-3.5" />
            Chromatic Architecture
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            5-Color Hex Palette & Usage System
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Harmonic palette with exact usage roles, 60-30-10 distribution, and WCAG accessibility standards.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center rounded-xl bg-zinc-900 p-1 border border-zinc-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('cards')}
            className={`rounded-lg px-3 py-1.5 font-semibold transition-all ${
              activeTab === 'cards'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Swatches & Notes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('contrast')}
            className={`rounded-lg px-3 py-1.5 font-semibold transition-all ${
              activeTab === 'contrast'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            WCAG Contrast Matrix
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`rounded-lg px-3 py-1.5 font-semibold transition-all ${
              activeTab === 'export'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Code Tokens
          </button>
        </div>
      </div>

      {/* 60-30-10 Visual Distribution Hierarchy Bar */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-indigo-400" />
            60-30-10 Proportional Visual Balance
          </span>
          <span className="text-zinc-500 text-[11px]">Recommended Application Weight</span>
        </div>

        {/* Multi-segment Bar */}
        <div className="flex h-5 w-full overflow-hidden rounded-xl border border-zinc-700/60 shadow-inner">
          {palette.map((color, i) => {
            const rawPct = parseInt(color.percentage, 10) || 20;
            return (
              <div
                key={i}
                style={{ backgroundColor: color.hex, width: `${rawPct}%` }}
                className="group relative flex items-center justify-center transition-all hover:brightness-110"
                title={`${color.name}: ${color.percentage}`}
              >
                <span
                  className={`text-[9px] font-mono font-bold ${
                    isColorDark(color.hex) ? 'text-white' : 'text-zinc-950'
                  } opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-sm`}
                >
                  {color.percentage}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-zinc-400">
          {palette.map((color, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full border border-white/20"
                style={{ backgroundColor: color.hex }}
              />
              <span className="font-medium text-zinc-200">{color.name}</span>
              <span className="text-zinc-500">({color.percentage})</span>
            </div>
          ))}
        </div>
      </div>

      {/* VIEW 1: Swatches & Usage Cards */}
      {activeTab === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {palette.map((color, idx) => {
            const rgb = hexToRgb(color.hex);
            const hsl = rgbToHsl(rgb);
            const cmyk = rgbToCmyk(rgb);
            const isDark = isColorDark(color.hex);
            const contrastWithWhite = getContrastRatio(color.hex, '#FFFFFF');
            const contrastWithBlack = getContrastRatio(color.hex, '#0F172A');

            return (
              <div
                key={idx}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-lg hover:border-zinc-700 transition-all group"
              >
                {/* Visual Color Pill */}
                <div
                  className="relative h-44 w-full p-4 flex flex-col justify-between transition-transform duration-300 group-hover:scale-[1.01]"
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Top bar on swatch */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md ${
                        isDark ? 'bg-black/40 text-white' : 'bg-white/60 text-black'
                      }`}
                    >
                      {color.percentage}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-semibold ${
                        isDark ? 'text-white/80' : 'text-black/80'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Hex Copy Button on Swatch */}
                  <div className="flex items-end justify-between">
                    <div>
                      <span
                        className={`text-xs font-mono font-black tracking-wider uppercase block ${
                          isDark ? 'text-white' : 'text-zinc-950'
                        }`}
                      >
                        {color.hex}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(color.hex, `hex-${idx}`, idx)}
                      className={`rounded-lg p-2 transition-all ${
                        isDark
                          ? 'bg-black/40 text-white hover:bg-black/60'
                          : 'bg-white/60 text-black hover:bg-white/80'
                      }`}
                      title="Copy Hex Code"
                    >
                      {copiedIndex === idx ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Color Details & Usage Notes */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between bg-zinc-900/90">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold block">
                      {color.role}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                      {color.name}
                    </h4>

                    {/* Deep Usage Notes */}
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 mt-2">
                      <span className="text-[10px] font-semibold uppercase text-zinc-500 block mb-1">
                        Usage Rule
                      </span>
                      <p className="text-xs text-zinc-300 leading-relaxed">{color.usageNotes}</p>
                    </div>
                  </div>

                  {/* Color Codes Drawer */}
                  <div className="space-y-1 pt-2 border-t border-zinc-800/80 text-[10px] font-mono text-zinc-400">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">RGB:</span>
                      <span className="text-zinc-300">
                        {rgb.r}, {rgb.g}, {rgb.b}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">HSL:</span>
                      <span className="text-zinc-300">
                        {hsl.h}°, {hsl.s}%, {hsl.l}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">CMYK:</span>
                      <span className="text-zinc-300">
                        {cmyk.c},{cmyk.m},{cmyk.y},{cmyk.k}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 text-[9px]">
                      <span className="text-zinc-500">vs White:</span>
                      <span className={contrastWithWhite >= 4.5 ? 'text-emerald-400 font-bold' : 'text-zinc-400'}>
                        {contrastWithWhite}:1 {contrastWithWhite >= 4.5 ? 'AA' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: WCAG Accessibility Contrast Matrix */}
      {activeTab === 'contrast' && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-5">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              WCAG 2.2 Contrast & Accessibility Analysis
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Validating foreground text readability against background surfaces. AA threshold is 4.5:1 (normal text) and 3:1 (large text).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="pb-3 font-semibold">Foreground / Background</th>
                  {palette.map((c, i) => (
                    <th key={i} className="pb-3 font-semibold text-center">
                      <div className="flex flex-col items-center">
                        <span
                          className="h-3 w-3 rounded-full mb-1"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-[10px] truncate max-w-[70px]">{c.name}</span>
                      </div>
                    </th>
                  ))}
                  <th className="pb-3 font-semibold text-center">Pure White</th>
                  <th className="pb-3 font-semibold text-center">Dark Basalt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {palette.map((rowColor, rIdx) => (
                  <tr key={rIdx} className="hover:bg-zinc-850/40">
                    <td className="py-3 font-medium text-white flex items-center gap-2">
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-white/20 shrink-0"
                        style={{ backgroundColor: rowColor.hex }}
                      />
                      <span>{rowColor.name}</span>
                      <span className="text-[10px] font-mono text-zinc-500">({rowColor.hex})</span>
                    </td>

                    {palette.map((colColor, cIdx) => {
                      if (rIdx === cIdx) {
                        return (
                          <td key={cIdx} className="py-3 text-center text-zinc-600 font-mono text-[11px]">
                            —
                          </td>
                        );
                      }
                      const ratio = getContrastRatio(rowColor.hex, colColor.hex);
                      const rating = getWcagRating(ratio);
                      return (
                        <td key={cIdx} className="py-3 text-center">
                          <span
                            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
                              rating.aaaNormal
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : rating.aaNormal
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : rating.aaLarge
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-zinc-800 text-zinc-500'
                            }`}
                          >
                            {ratio}:1
                          </span>
                        </td>
                      );
                    })}

                    {/* Against White */}
                    <td className="py-3 text-center">
                      {(() => {
                        const ratio = getContrastRatio(rowColor.hex, '#FFFFFF');
                        return (
                          <span
                            className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
                              ratio >= 4.5
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-zinc-800 text-zinc-500'
                            }`}
                          >
                            {ratio}:1
                          </span>
                        );
                      })()}
                    </td>

                    {/* Against Dark Basalt */}
                    <td className="py-3 text-center">
                      {(() => {
                        const ratio = getContrastRatio(rowColor.hex, '#0A0F1D');
                        return (
                          <span
                            className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
                              ratio >= 4.5
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-zinc-800 text-zinc-500'
                            }`}
                          >
                            {ratio}:1
                          </span>
                        );
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: Code Tokens Export */}
      {activeTab === 'export' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CSS Variables */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                <Code2 className="h-4 w-4 text-indigo-400" />
                CSS Custom Properties (:root)
              </span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(generateCssTokens(palette), 'css-tokens')
                }
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                {copiedType === 'css-tokens' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedType === 'css-tokens' ? 'Copied' : 'Copy CSS'}</span>
              </button>
            </div>
            <pre className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
              {generateCssTokens(palette)}
            </pre>
          </div>

          {/* Tailwind Config */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                <Code2 className="h-4 w-4 text-emerald-400" />
                Tailwind CSS Config
              </span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(generateTailwindConfig(palette), 'tailwind-tokens')
                }
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                {copiedType === 'tailwind-tokens' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedType === 'tailwind-tokens' ? 'Copied' : 'Copy Config'}</span>
              </button>
            </div>
            <pre className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
              {generateTailwindConfig(palette)}
            </pre>
          </div>
        </div>
      )}
    </section>
  );
};
