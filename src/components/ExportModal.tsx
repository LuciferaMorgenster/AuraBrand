import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  Code2,
  FileJson,
  Check,
  Copy,
  Layers,
  Sparkles,
} from 'lucide-react';
import { BrandBible } from '../types/brand';
import { generateCssTokens, generateTailwindConfig } from '../utils/colorUtils';

interface ExportModalProps {
  brand: BrandBible;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ brand, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'css' | 'tailwind' | 'json'>('overview');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const downloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(brand, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${brand.companyName.toLowerCase().replace(/\s+/g, '-')}-brand-bible.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Export Brand Identity & Bible</h3>
              <p className="text-xs text-zinc-400">
                Download guidelines for development, print production, and design systems.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-3 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`rounded-lg px-3 py-1.5 font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Export Options
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('css')}
            className={`rounded-lg px-3 py-1.5 font-semibold transition-all ${
              activeTab === 'css'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            CSS Tokens
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tailwind')}
            className={`rounded-lg px-3 py-1.5 font-semibold transition-all ${
              activeTab === 'tailwind'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Tailwind Config
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={`rounded-lg px-3 py-1.5 font-semibold transition-all ${
              activeTab === 'json'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Raw JSON
          </button>
        </div>

        {/* TAB 1: OVERVIEW & ONE-CLICK ACTIONS */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Print / Save to PDF */}
              <div
                onClick={handlePrint}
                className="cursor-pointer group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 hover:border-zinc-700 hover:bg-zinc-850 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-500/20">
                    <Printer className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">PDF / Print</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-200">
                  Print or Save as PDF
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Triggers browser print dialog with print-optimized stylesheets for client presentations.
                </p>
              </div>

              {/* Download JSON Bible */}
              <div
                onClick={downloadJson}
                className="cursor-pointer group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 hover:border-zinc-700 hover:bg-zinc-850 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20">
                    <FileJson className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">.json</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-200">
                  Download Brand Guide JSON
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Full programmatic schema including color hexes, typography scales, logo rules, and values.
                </p>
              </div>
            </div>

            {/* Brand Bible Asset Summary */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2 text-xs">
              <span className="font-semibold text-zinc-300">Identity Package Manifest:</span>
              <ul className="grid grid-cols-2 gap-2 text-zinc-400">
                <li className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  Primary Logo (Prompt + Clearance Rules)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  3 Secondary Marks & Lockups
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  5 Hex Colors + WCAG Ratios
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  Google Fonts Pairing & Typographic Ladder
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: CSS TOKENS */}
        {activeTab === 'css' && (
          <div className="space-y-3">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => copyToClipboard(generateCssTokens(brand.colorPalette), 'css')}
                className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:text-white"
              >
                {copiedType === 'css' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedType === 'css' ? 'Copied' : 'Copy CSS'}</span>
              </button>
            </div>
            <pre className="max-h-72 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300">
              {generateCssTokens(brand.colorPalette)}
            </pre>
          </div>
        )}

        {/* TAB 3: TAILWIND CONFIG */}
        {activeTab === 'tailwind' && (
          <div className="space-y-3">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => copyToClipboard(generateTailwindConfig(brand.colorPalette), 'tw')}
                className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:text-white"
              >
                {copiedType === 'tw' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedType === 'tw' ? 'Copied' : 'Copy Tailwind Config'}</span>
              </button>
            </div>
            <pre className="max-h-72 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300">
              {generateTailwindConfig(brand.colorPalette)}
            </pre>
          </div>
        )}

        {/* TAB 4: RAW JSON */}
        {activeTab === 'json' && (
          <div className="space-y-3">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => copyToClipboard(JSON.stringify(brand, null, 2), 'json')}
                className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:text-white"
              >
                {copiedType === 'json' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedType === 'json' ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre className="max-h-72 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300">
              {JSON.stringify(brand, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
