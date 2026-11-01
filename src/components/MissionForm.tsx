import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  ArrowRight,
  Compass,
  Palette,
  Type,
  ShieldCheck,
  Check,
  Wand2,
  RefreshCw,
  Building2,
  Users,
  Target,
  SlidersHorizontal,
} from 'lucide-react';
import { ImageResolution } from '../types/brand';
import { PRESET_MISSIONS, PresetMission } from '../data/presets';

interface MissionFormProps {
  onGenerate: (data: {
    mission: string;
    companyName: string;
    industry: string;
    tone: string;
    audience: string;
    imageResolution: ImageResolution;
  }) => Promise<void>;
  isGenerating: boolean;
  selectedResolution: ImageResolution;
  onResolutionChange: (res: ImageResolution) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const MissionForm: React.FC<MissionFormProps> = ({
  onGenerate,
  isGenerating,
  selectedResolution,
  onResolutionChange,
  onClose,
  isModal = false,
}) => {
  const [mission, setMission] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [tone, setTone] = useState('Minimalist, Elevated, Authoritative & Clean');
  const [audience, setAudience] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const handleSelectPreset = (preset: PresetMission) => {
    setSelectedPresetId(preset.id);
    setMission(preset.mission);
    setCompanyName(preset.name);
    setIndustry(preset.industry);
    setTone(preset.vibe);
    setAudience(preset.audience);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mission.trim()) return;

    onGenerate({
      mission: mission.trim(),
      companyName: companyName.trim(),
      industry: industry.trim(),
      tone: tone.trim(),
      audience: audience.trim(),
      imageResolution: selectedResolution,
    });
  };

  const toneOptions = [
    'Minimalist, Elevated, Authoritative & Clean',
    'Futuristic Neo-Cyber, Technical & Immersive',
    'Luxury Haute, Serene, Timeless & Organic',
    'Playful, High-Energy, Bold & Human',
    'Swiss Modernist, Architectural & Archival',
    'Brutalist, Industrial, Raw & Uncompromising',
  ];

  return (
    <div className={`w-full ${isModal ? 'p-0' : 'mx-auto max-w-4xl py-6 sm:py-10'}`}>
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/90 shadow-2xl backdrop-blur-xl">
        {/* Banner Header */}
        <div className="relative border-b border-zinc-800 bg-gradient-to-r from-zinc-900 via-indigo-950/40 to-zinc-900 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20 mb-3">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                AI Brand Identity & Brand Bible Engine
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Describe Your Company Mission
              </h2>
              <p className="mt-1 text-sm text-zinc-400 max-w-xl">
                AuraBrand analyzes your core mission to formulate a complete, production-grade
                Brand Bible: primary logo, secondary marks, 5-color palette with usage rules, and
                Google Font pairings.
              </p>
            </div>

            {/* Resolution Selector Affordance (1K, 2K, 4K) */}
            <div className="flex flex-col items-start sm:items-end gap-1.5 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-indigo-400" />
                Image Resolution (Model: gemini-3-pro-image-preview)
              </span>
              <div className="flex items-center gap-1.5">
                {(['1K', '2K', '4K'] as ImageResolution[]).map((res) => (
                  <button
                    key={res}
                    type="button"
                    onClick={() => onResolutionChange(res)}
                    className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                      selectedResolution === res
                        ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/30'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-zinc-500">
                {selectedResolution === '1K' && '1024×1024 • Fast High-Definition'}
                {selectedResolution === '2K' && '2048×2048 • Ultra-Sharp Retinal Crisp'}
                {selectedResolution === '4K' && '4096×4096 • Print-Ready Master Grade'}
              </span>
            </div>
          </div>

          {/* Quick Presets Bar */}
          <div className="mt-6 pt-5 border-t border-zinc-800/80">
            <span className="text-xs font-medium text-zinc-400 flex items-center gap-1.5 mb-2.5">
              <Compass className="h-3.5 w-3.5 text-amber-400" />
              Or explore with an inspiring industry preset:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_MISSIONS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all flex items-center gap-1.5 border ${
                    selectedPresetId === preset.id
                      ? 'bg-indigo-500/20 text-indigo-200 border-indigo-500/50 shadow-sm'
                      : 'bg-zinc-950/60 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200 hover:bg-zinc-800/60'
                  }`}
                >
                  <span className="font-semibold text-zinc-200">{preset.name}</span>
                  <span className="text-[11px] text-zinc-500 hidden sm:inline">({preset.industry})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Mission Input (Core Requirement) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="mission" className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                <Target className="h-4 w-4 text-rose-400" />
                Company Mission & Purpose <span className="text-rose-400">*</span>
              </label>
              <span className="text-xs text-zinc-500">{mission.length} characters</span>
            </div>
            <textarea
              id="mission"
              rows={4}
              value={mission}
              onChange={(e) => {
                setMission(e.target.value);
                setSelectedPresetId(null);
              }}
              placeholder="e.g. To decentralize urban energy with intelligent modular solar glass and localized battery microgrids that restore ecological equilibrium to 1,000 cities by 2035..."
              className="w-full rounded-xl border border-zinc-700/80 bg-zinc-950/80 p-4 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none shadow-inner"
              required
            />
          </div>

          {/* Quick Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="companyName" className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-zinc-400" />
                Company Name <span className="text-zinc-500 font-normal">(Optional — AI will suggest if empty)</span>
              </label>
              <input
                id="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Solaria, Aetheria, Kairo"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="industry" className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5 text-zinc-400" />
                Industry or Domain
              </label>
              <input
                id="industry"
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Clean Energy, Luxury Skincare, Spatial Audio"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Advanced Customization Toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {showAdvanced ? 'Hide advanced styling preferences' : 'Configure aesthetic vibe, tone & target audience'}
            </button>

            {showAdvanced && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4">
                <div className="space-y-1.5">
                  <label htmlFor="toneSelect" className="text-xs font-semibold text-zinc-300">
                    Aesthetic Vibe & Design Tone
                  </label>
                  <select
                    id="toneSelect"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200 focus:border-indigo-500 focus:outline-none"
                  >
                    {toneOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="audience" className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-zinc-400" />
                    Target Audience
                  </label>
                  <input
                    id="audience"
                    type="text"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g. Design-led founders, discerning architects, enterprise CTOs"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-zinc-800/80">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Full Brand Bible: Logo • 3 Secondary Marks • 5 Hex Colors • Google Fonts</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isGenerating || !mission.trim()}
                className={`relative w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-bold text-white transition-all shadow-lg ${
                  isGenerating || !mission.trim()
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 hover:from-indigo-600 hover:via-purple-600 hover:to-rose-600 shadow-indigo-500/25 active:scale-[0.98]'
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-white" />
                    <span>Architecting Brand Bible...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    <span>Generate Brand Bible</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
