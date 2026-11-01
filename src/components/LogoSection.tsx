import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Download,
  RefreshCw,
  Maximize2,
  Grid,
  Info,
  Sliders,
  Check,
  Shield,
  Eye,
  Camera,
  ExternalLink,
} from 'lucide-react';
import { PrimaryLogo, SecondaryMark, ImageResolution } from '../types/brand';

interface LogoSectionProps {
  primaryLogo: PrimaryLogo;
  secondaryMarks: SecondaryMark[];
  globalResolution: ImageResolution;
  onGenerateImage: (
    type: 'primary' | number,
    prompt: string,
    resolution: ImageResolution
  ) => Promise<void>;
  isGeneratingPrimary: boolean;
  generatingMarkIndex: number | null;
}

export const LogoSection: React.FC<LogoSectionProps> = ({
  primaryLogo,
  secondaryMarks,
  globalResolution,
  onGenerateImage,
  isGeneratingPrimary,
  generatingMarkIndex,
}) => {
  const [showClearSpace, setShowClearSpace] = useState(false);
  const [selectedRes, setSelectedRes] = useState<ImageResolution>(globalResolution);
  const [activeModalImage, setActiveModalImage] = useState<{ url: string; title: string; res?: string } | null>(null);
  const [editablePrompt, setEditablePrompt] = useState<string>(primaryLogo.imagePrompt);
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);

  const handleDownload = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20 mb-2">
            <Camera className="h-3.5 w-3.5" />
            Model: gemini-3-pro-image-preview
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Primary Logo & Secondary Marks
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Vector-calibrated identity marks with 1K, 2K, and 4K image synthesis and clearance specifications.
          </p>
        </div>

        {/* Global Resolution Affordance (1K, 2K, 4K) */}
        <div className="flex items-center gap-2 rounded-xl bg-zinc-900 p-1.5 border border-zinc-800">
          <span className="text-xs font-semibold text-zinc-400 px-2 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-indigo-400" />
            Resolution:
          </span>
          {(['1K', '2K', '4K'] as ImageResolution[]).map((res) => (
            <button
              key={res}
              type="button"
              onClick={() => setSelectedRes(res)}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                selectedRes === res
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              {res}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Logo Showcase Card */}
      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Logo Visual Stage (7 cols on large) */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-950 p-8 sm:p-12 min-h-[360px] sm:min-h-[440px]">
            {/* Grid & Clearspace Pattern */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                showClearSpace ? 'opacity-100' : 'opacity-20'
              }`}
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Clear-space Guidelines Overlay Box */}
            {showClearSpace && (
              <div className="pointer-events-none absolute inset-12 sm:inset-16 rounded-2xl border-2 border-dashed border-indigo-400/80 bg-indigo-500/5 flex items-center justify-center">
                <span className="absolute top-2 left-2 rounded bg-indigo-500 px-1.5 py-0.5 text-[10px] font-mono font-bold text-white uppercase">
                  1.5X Clear Zone
                </span>
                <span className="absolute bottom-2 right-2 rounded bg-indigo-500 px-1.5 py-0.5 text-[10px] font-mono font-bold text-white uppercase">
                  Exclusion Boundary
                </span>
              </div>
            )}

            {/* Logo Display */}
            {primaryLogo.generatedImageUrl ? (
              <div className="relative group z-10 max-w-sm sm:max-w-md w-full aspect-square flex items-center justify-center">
                <img
                  src={primaryLogo.generatedImageUrl}
                  alt={primaryLogo.conceptName}
                  className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <button
                  type="button"
                  onClick={() =>
                    setActiveModalImage({
                      url: primaryLogo.generatedImageUrl!,
                      title: primaryLogo.conceptName,
                      res: primaryLogo.imageSize || selectedRes,
                    })
                  }
                  className="absolute bottom-3 right-3 rounded-xl bg-zinc-900/90 p-2 text-zinc-300 hover:text-white hover:bg-zinc-800 shadow-lg border border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Expand Fullscreen"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 space-y-4 max-w-md">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-amber-500/20 border border-indigo-500/30 text-indigo-400 shadow-inner">
                  <Sparkles className="h-10 w-10 text-amber-300 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{primaryLogo.conceptName}</h4>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-3">
                    {primaryLogo.description}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isGeneratingPrimary}
                  onClick={() =>
                    onGenerateImage('primary', editablePrompt || primaryLogo.imagePrompt, selectedRes)
                  }
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 active:scale-95 transition-all"
                >
                  {isGeneratingPrimary ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Synthesizing in {selectedRes}...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="h-3.5 w-3.5" />
                      <span>Generate with gemini-3-pro-image-preview ({selectedRes})</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Stage Bottom Controls Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs z-20">
              <button
                type="button"
                onClick={() => setShowClearSpace(!showClearSpace)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium border transition-colors ${
                  showClearSpace
                    ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                    : 'bg-zinc-900/90 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Grid className="h-3.5 w-3.5" />
                <span>{showClearSpace ? 'Hide Grid' : 'Exclusion Grid (1.5X)'}</span>
              </button>

              {primaryLogo.generatedImageUrl && (
                <div className="flex items-center gap-2">
                  <span className="rounded bg-zinc-800/90 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-400 border border-zinc-700">
                    {primaryLogo.imageSize || selectedRes} Resolution
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleDownload(primaryLogo.generatedImageUrl!, `${primaryLogo.conceptName}-Logo`)
                    }
                    className="flex items-center gap-1 rounded-lg bg-zinc-900/90 border border-zinc-800 px-2.5 py-1 text-[11px] font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  >
                    <Download className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Logo Specifications & Rules (5 cols on large) */}
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                  Primary Identity Anchor
                </span>
                <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-300 border border-zinc-700">
                  Master Vector Lockup
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">{primaryLogo.conceptName}</h3>
                <p className="mt-1.5 text-xs text-zinc-300 leading-relaxed">
                  {primaryLogo.description}
                </p>
              </div>

              {/* Symbolism */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3.5 space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Visual Symbolism & Metaphor
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">{primaryLogo.symbolism}</p>
              </div>

              {/* Clear Space & Minimum Size Rules */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                    Clearance Zone
                  </span>
                  <span className="text-xs font-semibold text-zinc-200 mt-0.5 block">
                    {primaryLogo.clearSpaceRule}
                  </span>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                    Minimum Scale
                  </span>
                  <span className="text-xs font-semibold text-zinc-200 mt-0.5 block">
                    {primaryLogo.minimumSize}
                  </span>
                </div>
              </div>

              {/* Image Prompt Inspector / Editor */}
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-amber-400" />
                    Gemini Prompt
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingPrompt(!isEditingPrompt)}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    {isEditingPrompt ? 'Save Prompt' : 'Customize Prompt'}
                  </button>
                </div>
                {isEditingPrompt ? (
                  <textarea
                    rows={3}
                    value={editablePrompt}
                    onChange={(e) => setEditablePrompt(e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <p className="text-[11px] text-zinc-400 line-clamp-3 italic">
                    "{editablePrompt || primaryLogo.imagePrompt}"
                  </p>
                )}
              </div>
            </div>

            {/* Regeneration Action */}
            <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-3">
              <button
                type="button"
                disabled={isGeneratingPrimary}
                onClick={() =>
                  onGenerateImage('primary', editablePrompt || primaryLogo.imagePrompt, selectedRes)
                }
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 px-4 py-2.5 text-xs font-bold text-white border border-zinc-700 transition-all active:scale-[0.98]"
              >
                {isGeneratingPrimary ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Rendering {selectedRes} Logo...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Regenerate Logo ({selectedRes})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Marks Trio Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="h-4 w-4 text-indigo-400" />
              Secondary Marks & Alternative Lockups
            </h3>
            <p className="text-xs text-zinc-400">
              Responsive variations for mobile favicons, circular seals, and compact application headers.
            </p>
          </div>
          <span className="text-xs text-zinc-500">3 Calibrated Variations</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryMarks?.map((mark, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 hover:border-zinc-700 transition-all space-y-4"
            >
              {/* Visual Preview / Generator Box */}
              <div className="relative flex aspect-square w-full items-center justify-center rounded-xl bg-zinc-950 border border-zinc-800/80 p-4 overflow-hidden group">
                {mark.generatedImageUrl ? (
                  <>
                    <img
                      src={mark.generatedImageUrl}
                      alt={mark.name}
                      className="max-h-full max-w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveModalImage({
                            url: mark.generatedImageUrl!,
                            title: mark.name,
                            res: mark.imageSize || selectedRes,
                          })
                        }
                        className="rounded-lg bg-zinc-800 p-2 text-zinc-200 hover:text-white"
                        title="View Fullscreen"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownload(mark.generatedImageUrl!, mark.name)}
                        className="rounded-lg bg-zinc-800 p-2 text-zinc-200 hover:text-white"
                        title="Download Mark"
                      >
                        <Download className="h-4 w-4 text-emerald-400" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-3 space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-indigo-400 border border-zinc-800">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-300">{mark.name}</span>
                    <button
                      type="button"
                      disabled={generatingMarkIndex === idx}
                      onClick={() => onGenerateImage(idx, mark.imagePrompt, selectedRes)}
                      className="rounded-lg bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 text-[11px] font-bold text-zinc-200 border border-zinc-700 flex items-center gap-1.5 transition-all"
                    >
                      {generatingMarkIndex === idx ? (
                        <>
                          <RefreshCw className="h-3 w-3 animate-spin" />
                          <span>Generating ({selectedRes})...</span>
                        </>
                      ) : (
                        <>
                          <Camera className="h-3 w-3 text-indigo-400" />
                          <span>Synthesize ({selectedRes})</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {mark.imageSize && (
                  <span className="absolute top-2 left-2 rounded bg-zinc-900/90 px-1.5 py-0.5 text-[9px] font-mono text-zinc-400 border border-zinc-800">
                    {mark.imageSize}
                  </span>
                )}
              </div>

              {/* Mark Meta */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400">
                    {mark.type}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">0{idx + 1}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{mark.name}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{mark.description}</p>
                <div className="rounded-lg bg-zinc-950/60 p-2.5 border border-zinc-800/80">
                  <span className="text-[10px] font-semibold uppercase text-zinc-500 block mb-0.5">
                    Usage Guideline
                  </span>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    {mark.usageGuidelines}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-zinc-800/80">
                <button
                  type="button"
                  disabled={generatingMarkIndex === idx}
                  onClick={() => onGenerateImage(idx, mark.imagePrompt, selectedRes)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-200 border border-zinc-700/80 transition-all"
                >
                  <RefreshCw
                    className={`h-3 w-3 ${generatingMarkIndex === idx ? 'animate-spin' : ''}`}
                  />
                  <span>
                    {mark.generatedImageUrl
                      ? `Regenerate (${selectedRes})`
                      : `Generate Mark (${selectedRes})`}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setActiveModalImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-950 p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 px-2">
              <span className="text-sm font-bold text-white">{activeModalImage.title}</span>
              <span className="text-xs font-mono text-indigo-400">
                {activeModalImage.res} Master Render
              </span>
            </div>
            <div className="p-4 flex items-center justify-center">
              <img
                src={activeModalImage.url}
                alt={activeModalImage.title}
                className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800 px-2">
              <button
                type="button"
                onClick={() => handleDownload(activeModalImage.url, activeModalImage.title)}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500"
              >
                <Download className="h-4 w-4" />
                <span>Download PNG</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveModalImage(null)}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
