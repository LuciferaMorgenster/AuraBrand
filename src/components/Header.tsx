import React from 'react';
import {
  Sparkles,
  BookOpen,
  MessageSquare,
  Printer,
  Download,
  Share2,
  Sliders,
  Layers,
  Code2,
} from 'lucide-react';
import { ImageResolution } from '../types/brand';

interface HeaderProps {
  companyName: string;
  tagline: string;
  imageResolution: ImageResolution;
  onResolutionChange: (res: ImageResolution) => void;
  onOpenChat: () => void;
  onOpenExport: () => void;
  onOpenNewMission: () => void;
  isChatOpen: boolean;
  chatMessageCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  companyName,
  tagline,
  imageResolution,
  onResolutionChange,
  onOpenChat,
  onOpenExport,
  onOpenNewMission,
  isChatOpen,
  chatMessageCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Studio Logo & Active Identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-500 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-zinc-950">
              <Sparkles className="h-5 w-5 text-amber-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white">AuraBrand</span>
              <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 border border-zinc-700">
                Brand Bible Studio
              </span>
            </div>
            <p className="hidden text-xs text-zinc-400 sm:block truncate max-w-[280px] md:max-w-md">
              <span className="font-medium text-zinc-200">{companyName}</span>
              {tagline && ` — ${tagline}`}
            </p>
          </div>
        </div>

        {/* Global Controls & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Image Generation Resolution Selector Affordance (1K, 2K, 4K) */}
          <div className="hidden lg:flex items-center gap-1 rounded-xl bg-zinc-900/90 p-1 border border-zinc-800 text-xs">
            <span className="px-2 text-[11px] font-medium text-zinc-400 flex items-center gap-1">
              <Layers className="h-3 w-3 text-indigo-400" />
              Image Res:
            </span>
            {(['1K', '2K', '4K'] as ImageResolution[]).map((res) => (
              <button
                key={res}
                type="button"
                onClick={() => onResolutionChange(res)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  imageResolution === res
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-sm shadow-indigo-500/30'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
                title={`Generate logo & marks in ${res} quality using gemini-3-pro-image-preview`}
              >
                {res}
              </button>
            ))}
          </div>

          {/* New Mission Generator CTA */}
          <button
            type="button"
            onClick={onOpenNewMission}
            className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 transition-all"
          >
            <Sliders className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">New Brand Mission</span>
            <span className="sm:hidden">Mission</span>
          </button>

          {/* Export / Share Brand Guide */}
          <button
            type="button"
            onClick={onOpenExport}
            className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 transition-all"
            title="Export Brand Bible as PDF, JSON, and CSS Design Tokens"
          >
            <Download className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Export Bible</span>
          </button>

          {/* AI Creative Director Chat Toggle */}
          <button
            type="button"
            onClick={onOpenChat}
            className={`relative flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              isChatOpen
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/60 hover:bg-indigo-500/20'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="font-semibold">Brand AI</span>
            {chatMessageCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                {chatMessageCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
