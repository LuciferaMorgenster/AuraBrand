/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Camera,
  Palette,
  Type,
  Layers,
  MessageSquare,
  Compass,
  ArrowRight,
  ShieldCheck,
  Download,
  Sliders,
  RefreshCw,
  PlusCircle,
  ExternalLink,
} from 'lucide-react';
import { BrandBible, ImageResolution, ChatMessage } from './types/brand';
import { INITIAL_DEFAULT_BRAND } from './data/presets';
import { loadTypographyPairing } from './utils/fontLoader';
import { Header } from './components/Header';
import { MissionForm } from './components/MissionForm';
import { BrandOverview } from './components/BrandOverview';
import { LogoSection } from './components/LogoSection';
import { ColorPaletteSection } from './components/ColorPaletteSection';
import { TypographySection } from './components/TypographySection';
import { MockupStudio } from './components/MockupStudio';
import { BrandConsultantChat } from './components/BrandConsultantChat';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [brand, setBrand] = useState<BrandBible>(INITIAL_DEFAULT_BRAND);
  const [isGeneratingBible, setIsGeneratingBible] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [imageResolution, setImageResolution] = useState<ImageResolution>('1K');
  const [isGeneratingPrimary, setIsGeneratingPrimary] = useState(false);
  const [generatingMarkIndex, setGeneratingMarkIndex] = useState<number | null>(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'overview' | 'logo' | 'colors' | 'typography' | 'mockups'>('all');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Pre-load Google Fonts for current brand
  useEffect(() => {
    if (brand?.typography) {
      loadTypographyPairing(
        brand.typography.headerFont?.family,
        brand.typography.bodyFont?.family,
        brand.typography.accentFont?.family
      );
    }
  }, [brand]);

  // Main Brand Bible generation from mission
  const handleGenerateBrand = async (formData: {
    mission: string;
    companyName: string;
    industry: string;
    tone: string;
    audience: string;
    imageResolution: ImageResolution;
  }) => {
    setIsGeneratingBible(true);
    setGenerationStep('Analyzing company mission & strategic positioning...');

    try {
      setTimeout(() => setGenerationStep('Formulating color palette & typography pairings...'), 1800);
      setTimeout(() => setGenerationStep('Architecting primary logo & secondary marks...'), 3500);

      const response = await fetch('/api/brand/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate Brand Bible');
      }

      const newBrand: BrandBible = data.brandBible;
      setBrand(newBrand);
      setIsMissionModalOpen(false);
      showToast(`Brand Bible generated for ${newBrand.companyName}!`);

      // Automatically synthesize primary logo with gemini-3-pro-image-preview
      if (newBrand.primaryLogoConcept?.imagePrompt) {
        setGenerationStep(`Synthesizing primary logo with gemini-3-pro-image-preview (${formData.imageResolution})...`);
        try {
          const imgRes = await fetch('/api/brand/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: newBrand.primaryLogoConcept.imagePrompt,
              size: formData.imageResolution,
              type: 'logo',
            }),
          });
          const imgData = await imgRes.json();
          if (imgData.imageUrl) {
            setBrand((prev) => ({
              ...prev,
              primaryLogoConcept: {
                ...prev.primaryLogoConcept,
                generatedImageUrl: imgData.imageUrl,
                imageSize: formData.imageResolution,
              },
            }));
          }
        } catch (imgErr) {
          console.warn('Initial logo generation warning:', imgErr);
        }
      }
    } catch (err: any) {
      console.error('Error generating brand:', err);
      showToast(`Error: ${err.message}`);
    } finally {
      setIsGeneratingBible(false);
      setGenerationStep('');
    }
  };

  // Specific logo or mark image generation with gemini-3-pro-image-preview
  const handleGenerateImage = async (
    target: 'primary' | number,
    prompt: string,
    resolution: ImageResolution
  ) => {
    if (target === 'primary') {
      setIsGeneratingPrimary(true);
    } else {
      setGeneratingMarkIndex(target);
    }

    try {
      const response = await fetch('/api/brand/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          size: resolution,
          type: target === 'primary' ? 'logo' : 'secondary_mark',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      if (target === 'primary') {
        setBrand((prev) => ({
          ...prev,
          primaryLogoConcept: {
            ...prev.primaryLogoConcept,
            generatedImageUrl: data.imageUrl,
            imageSize: resolution,
          },
        }));
        showToast(`Primary logo rendered in ${resolution} with gemini-3-pro-image-preview!`);
      } else {
        setBrand((prev) => {
          const updatedMarks = [...prev.secondaryMarks];
          updatedMarks[target] = {
            ...updatedMarks[target],
            generatedImageUrl: data.imageUrl,
            imageSize: resolution,
          };
          return {
            ...prev,
            secondaryMarks: updatedMarks,
          };
        });
        showToast(`Secondary mark ${target + 1} rendered in ${resolution}!`);
      }
    } catch (err: any) {
      console.error('Image generation error:', err);
      showToast(`Image generation failed: ${err.message}`);
    } finally {
      if (target === 'primary') {
        setIsGeneratingPrimary(false);
      } else {
        setGeneratingMarkIndex(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-xs font-semibold text-white shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Header
        companyName={brand.companyName}
        tagline={brand.tagline}
        imageResolution={imageResolution}
        onResolutionChange={setImageResolution}
        onOpenChat={() => setIsChatOpen(!isChatOpen)}
        onOpenExport={() => setIsExportModalOpen(true)}
        onOpenNewMission={() => setIsMissionModalOpen(true)}
        isChatOpen={isChatOpen}
        chatMessageCount={chatMessages.filter((m) => m.role === 'model').length}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        {/* Navigation Section Sub-Nav */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-zinc-900/80 p-1 border border-zinc-800 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`rounded-lg px-3 py-1.5 font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Full Brand Bible
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`rounded-lg px-3 py-1.5 font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Mission & Strategy
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('logo')}
              className={`rounded-lg px-3 py-1.5 font-semibold transition-all ${
                activeTab === 'logo'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Logo & Marks
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('colors')}
              className={`rounded-lg px-3 py-1.5 font-semibold transition-all ${
                activeTab === 'colors'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              5-Color Palette
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('typography')}
              className={`rounded-lg px-3 py-1.5 font-semibold transition-all ${
                activeTab === 'typography'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Google Fonts
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mockups')}
              className={`rounded-lg px-3 py-1.5 font-semibold transition-all ${
                activeTab === 'mockups'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Mockups
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMissionModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Describe New Mission</span>
            </button>
          </div>
        </div>

        {/* Loading Overlay State */}
        {isGeneratingBible && (
          <div className="rounded-3xl border border-indigo-500/30 bg-indigo-950/20 p-12 text-center backdrop-blur-xl space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
              <RefreshCw className="h-7 w-7 animate-spin" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Synthesizing Brand Bible</h3>
              <p className="mt-1 text-sm text-indigo-300 font-mono">{generationStep}</p>
            </div>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              Generates primary logo, secondary marks, 5-color palette with usage notes, and Google Font pairings using Gemini AI.
            </p>
          </div>
        )}

        {/* SECTIONS */}
        {!isGeneratingBible && (
          <div className="space-y-16">
            {(activeTab === 'all' || activeTab === 'overview') && (
              <BrandOverview brand={brand} />
            )}

            {(activeTab === 'all' || activeTab === 'logo') && (
              <LogoSection
                primaryLogo={brand.primaryLogoConcept}
                secondaryMarks={brand.secondaryMarks}
                globalResolution={imageResolution}
                onGenerateImage={handleGenerateImage}
                isGeneratingPrimary={isGeneratingPrimary}
                generatingMarkIndex={generatingMarkIndex}
              />
            )}

            {(activeTab === 'all' || activeTab === 'colors') && (
              <ColorPaletteSection palette={brand.colorPalette} />
            )}

            {(activeTab === 'all' || activeTab === 'typography') && (
              <TypographySection typography={brand.typography} />
            )}

            {(activeTab === 'all' || activeTab === 'mockups') && (
              <MockupStudio brand={brand} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">AuraBrand Studio</span>
            <span>•</span>
            <span>Brand Bible & Design Systems Engine</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Model: gemini-3.8-flash & gemini-3-pro-image-preview</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsMissionModalOpen(true)}
              className="text-indigo-400 hover:underline"
            >
              New Brand
            </button>
          </div>
        </div>
      </footer>

      {/* New Mission Generator Modal */}
      {isMissionModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto"
          onClick={() => setIsMissionModalOpen(false)}
        >
          <div className="w-full max-w-3xl my-8" onClick={(e) => e.stopPropagation()}>
            <MissionForm
              onGenerate={handleGenerateBrand}
              isGenerating={isGeneratingBible}
              selectedResolution={imageResolution}
              onResolutionChange={setImageResolution}
              onClose={() => setIsMissionModalOpen(false)}
              isModal={true}
            />
          </div>
        </div>
      )}

      {/* Export Brand Bible Modal */}
      <ExportModal
        brand={brand}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      {/* Gemini Multi-turn Brand Consultant Chat Drawer */}
      <BrandConsultantChat
        brand={brand}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={chatMessages}
        setMessages={setChatMessages}
      />
    </div>
  );
}
