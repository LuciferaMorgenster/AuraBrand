import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '20mb' }));

// Server-side Google GenAI initialization with required telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for brand bible structured output
const brandBibleSchema = {
  type: Type.OBJECT,
  properties: {
    companyName: {
      type: Type.STRING,
      description: 'The polished brand name',
    },
    tagline: {
      type: Type.STRING,
      description: 'A punchy, memorable 4-8 word brand tagline or slogan',
    },
    missionStatement: {
      type: Type.STRING,
      description: 'A powerful, clear 2-3 sentence company mission statement',
    },
    brandStory: {
      type: Type.STRING,
      description: 'A compelling 2-paragraph origin story and vision manifesto',
    },
    brandArchetype: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: 'E.g., The Creator, The Sage, The Outlaw, The Explorer, The Ruler' },
        description: { type: Type.STRING, description: 'Why this archetype fits the mission and how it behaves' },
        traits: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: '3-4 core character traits',
        },
      },
      required: ['name', 'description', 'traits'],
    },
    brandValues: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ['title', 'description'],
      },
      description: '4 foundational brand values',
    },
    voiceAndTone: {
      type: Type.OBJECT,
      properties: {
        attributes: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: '4 paired adjectives, e.g. "Confident but Humble"',
        },
        doList: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: '3 concrete verbal Do guidelines',
        },
        dontList: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: '3 concrete verbal Don\'t guidelines',
        },
        sampleCopy: {
          type: Type.STRING,
          description: 'A sample hero marketing paragraph illustrating the tone',
        },
      },
      required: ['attributes', 'doList', 'dontList', 'sampleCopy'],
    },
    colorPalette: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: 'Evocative design name, e.g., "Obsidian Slate", "Solar Citron"' },
          hex: { type: Type.STRING, description: 'Valid 6-digit hex code with # prefix, e.g. #0F172A' },
          role: { type: Type.STRING, description: 'E.g., Dominant Background, Core Brand Identity, Accent Highlight, Secondary Surface, Text High-Contrast' },
          percentage: { type: Type.STRING, description: 'E.g. 60%, 20%, 10%, 5%, 5%' },
          usageNotes: { type: Type.STRING, description: 'Specific rules on when and how to apply this color across digital and physical touchpoints' },
          recommendedOnDark: { type: Type.BOOLEAN, description: 'Whether this color functions best on dark backgrounds' },
          contrastNotes: { type: Type.STRING, description: 'WCAG contrast advice for text/UI' },
        },
        required: ['name', 'hex', 'role', 'percentage', 'usageNotes'],
      },
      description: 'Exactly 5 cohesive hex colors with comprehensive usage notes',
    },
    typography: {
      type: Type.OBJECT,
      properties: {
        headerFont: {
          type: Type.OBJECT,
          properties: {
            family: { type: Type.STRING, description: 'A renowned Google Font for display/headers, e.g. Plus Jakarta Sans, Syne, Playfair Display, Space Grotesk, Cinzel, Outfit, Montserrat' },
            category: { type: Type.STRING, description: 'Sans-Serif, Serif, Display, Monospace' },
            weights: { type: Type.ARRAY, items: { type: Type.STRING } },
            vibe: { type: Type.STRING, description: 'Why this font was chosen for headlines' },
            googleFontQuery: { type: Type.STRING, description: 'Query name for Google Fonts url, e.g. "Plus+Jakarta+Sans:wght@600;700;800"' },
          },
          required: ['family', 'category', 'weights', 'vibe', 'googleFontQuery'],
        },
        bodyFont: {
          type: Type.OBJECT,
          properties: {
            family: { type: Type.STRING, description: 'A highly legible Google Font for body copy, e.g. Inter, DM Sans, Plus Jakarta Sans, Source Sans 3, Lora' },
            category: { type: Type.STRING, description: 'Sans-Serif, Serif' },
            weights: { type: Type.ARRAY, items: { type: Type.STRING } },
            vibe: { type: Type.STRING, description: 'Why this body font pairs harmoniously with headerFont' },
            googleFontQuery: { type: Type.STRING, description: 'Query name for Google Fonts url, e.g. "Inter:wght@400;500;600"' },
          },
          required: ['family', 'category', 'weights', 'vibe', 'googleFontQuery'],
        },
        accentFont: {
          type: Type.OBJECT,
          properties: {
            family: { type: Type.STRING, description: 'Monospace or decorative accent font, e.g. JetBrains Mono, Space Mono, Cormorant Garamond' },
            usage: { type: Type.STRING, description: 'Usage recommendation, e.g., metadata, badges, captions' },
            googleFontQuery: { type: Type.STRING, description: 'Query name for Google Fonts url' },
          },
          required: ['family', 'usage', 'googleFontQuery'],
        },
        fontPairingRationale: {
          type: Type.STRING,
          description: 'Design analysis explaining contrast, x-height balance, and psychological resonance of this pairing',
        },
        typographicScale: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              level: { type: Type.STRING, description: 'Display, H1, H2, H3, Body Large, Body, Caption' },
              sizeRem: { type: Type.STRING, description: 'E.g., 3.5rem, 2.25rem, 1rem, 0.875rem' },
              weight: { type: Type.STRING, description: 'E.g., 700 Bold, 600 SemiBold, 400 Regular' },
              tracking: { type: Type.STRING, description: 'E.g., -0.03em, 0em, 0.05em' },
              sampleText: { type: Type.STRING, description: 'Tailored preview text fitting the brand' },
            },
            required: ['level', 'sizeRem', 'weight', 'tracking', 'sampleText'],
          },
        },
      },
      required: ['headerFont', 'bodyFont', 'accentFont', 'fontPairingRationale', 'typographicScale'],
    },
    primaryLogoConcept: {
      type: Type.OBJECT,
      properties: {
        conceptName: { type: Type.STRING, description: 'Name of the mark concept' },
        description: { type: Type.STRING, description: 'Detailed visual breakdown of geometry, mark structure, and iconography' },
        symbolism: { type: Type.STRING, description: 'Metaphors, philosophical meaning behind the shapes' },
        clearSpaceRule: { type: Type.STRING, description: 'Clear space clearance specification, e.g. "Minimum clearance of 1.5X where X equals the height of the logomark symbol."' },
        minimumSize: { type: Type.STRING, description: 'E.g. Digital: 24px height; Print: 10mm width' },
        imagePrompt: { type: Type.STRING, description: 'High-detail graphic design prompt for gemini-3-pro-image-preview to generate this primary logo on clean background' },
      },
      required: ['conceptName', 'description', 'symbolism', 'clearSpaceRule', 'minimumSize', 'imagePrompt'],
    },
    secondaryMarks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: 'E.g., Monogram Icon, Circular Heritage Seal, Horizontal Responsive Mark' },
          type: { type: Type.STRING, description: 'E.g., App Icon / Favicon, Badge / Stamp, Compact Lockup' },
          description: { type: Type.STRING, description: 'Visual arrangement and simplified geometry' },
          usageGuidelines: { type: Type.STRING, description: 'When to deploy this secondary mark instead of the primary logo' },
          imagePrompt: { type: Type.STRING, description: 'Graphic design prompt for gemini-3-pro-image-preview to generate this secondary mark' },
        },
        required: ['name', 'type', 'description', 'usageGuidelines', 'imagePrompt'],
      },
      description: '3 distinct secondary marks (e.g. monogram icon, circular emblem badge, responsive wordmark)',
    },
    mockups: {
      type: Type.OBJECT,
      properties: {
        stationeryCard: {
          type: Type.STRING,
          description: 'Description of premium embossed business card & letterhead aesthetic',
        },
        mobileApp: {
          type: Type.STRING,
          description: 'Description of dark/light mobile iOS icon & launch screen aesthetic',
        },
        merchandise: {
          type: Type.STRING,
          description: 'Description of premium merchandise (organic tote, matte aluminum water bottle, apparel)',
        },
        packaging: {
          type: Type.STRING,
          description: 'Description of unboxing experience, sustainable matte packaging, blind debossing',
        },
      },
      required: ['stationeryCard', 'mobileApp', 'merchandise', 'packaging'],
    },
  },
  required: [
    'companyName',
    'tagline',
    'missionStatement',
    'brandStory',
    'brandArchetype',
    'brandValues',
    'voiceAndTone',
    'colorPalette',
    'typography',
    'primaryLogoConcept',
    'secondaryMarks',
    'mockups',
  ],
};

// POST /api/brand/generate - Generate complete structured Brand Bible
app.post('/api/brand/generate', async (req, res) => {
  try {
    const { mission, companyName, industry, tone, audience } = req.body;

    if (!mission || typeof mission !== 'string' || mission.trim().length === 0) {
      return res.status(400).json({ error: 'Company mission description is required.' });
    }

    const prompt = `You are a world-class Brand Identity Director, Design Systems Architect, and Master Typographer.
Analyze this company's mission and craft an exhaustive, award-winning "Brand Bible" design system.

COMPANY INPUTS:
- Company Mission: "${mission.trim()}"
- Proposed Name: ${companyName ? `"${companyName.trim()}"` : 'Please invent an evocative, memorable, international-grade company name that perfectly fits this mission'}
- Industry/Domain: ${industry ? `"${industry.trim()}"` : 'Derive appropriately from mission'}
- Desired Vibe/Tone: ${tone ? `"${tone.trim()}"` : 'Curate the most sophisticated, elevated aesthetic matching the mission'}
- Target Audience: ${audience ? `"${audience.trim()}"` : 'Discerning modern global audience'}

SYSTEM REQUIREMENTS:
1. Primary Logo: Must have an exact concept description, clear space rules, and a detailed prompt tailored for logo generation with gemini-3-pro-image-preview.
2. Secondary Marks: Exactly 3 distinct marks (1: Monogram / App Icon, 2: Badge / Seal Lockup, 3: Responsive Compact Mark).
3. 5-Color Hex Palette: Exactly 5 complementary, modern colors with real 6-digit hex values, role, usage percentages (e.g. 60%, 20%, 10%, 5%, 5%), and deep usage notes.
4. Typography: Pair two famous Google Fonts (one for Headers/Display, one for Body text) that exhibit high optical synergy and typographic hierarchy. Include typographic scale ladder.
5. Voice, Story, Values & Mockups: Complete editorial-grade guidelines.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are AuraBrand, an elite brand identity studio design director. Always return valid, structured JSON adhering strictly to the responseSchema.',
        responseMimeType: 'application/json',
        responseSchema: brandBibleSchema,
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error('No response text received from Gemini');
    }

    const brandBible = JSON.parse(jsonText);
    return res.json({ success: true, brandBible });
  } catch (error: any) {
    console.error('Error generating brand bible:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate brand bible',
    });
  }
});

// POST /api/brand/generate-image - Generates logo or mark with gemini-3-pro-image-preview and 1K/2K/4K size affordance
app.post('/api/brand/generate-image', async (req, res) => {
  try {
    const { prompt, size = '1K', aspectRatio = '1:1', type = 'logo' } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Image prompt is required.' });
    }

    // Validate size affordance (1K, 2K, 4K)
    const validSizes = ['1K', '2K', '4K'];
    const selectedSize = validSizes.includes(size) ? size : '1K';

    // Enrich the prompt for vector-clean, studio-quality brand design
    let refinedPrompt = prompt;
    if (type === 'logo' || type === 'secondary_mark') {
      refinedPrompt = `Graphic design vector identity, minimalist modern logo design on clean isolated solid background. Flat vector aesthetic, perfect geometric symmetry, clean lines, professional branding, high resolution, no photographic noise, no realistic shadows, pure iconic graphic mark: ${prompt}`;
    } else if (type === 'mockup') {
      refinedPrompt = `Studio product photography mockup, editorial high-end branding showcase, clean lighting, minimalist luxury presentation: ${prompt}`;
    }

    console.log(`Generating image with model gemini-3-pro-image-preview, size: ${selectedSize}...`);

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: refinedPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
            imageSize: selectedSize as any,
          },
        },
      });
    } catch (primaryError: any) {
      console.warn('gemini-3-pro-image-preview call encountered error, attempting fallback...', primaryError?.message);
      // Fallback to gemini-nano-banana-2.1 or gemini-3.1-flash-lite-image if model preview unavailable in region/key
      try {
        response = await ai.models.generateContent({
          model: 'gemini-nano-banana-2.1',
          contents: {
            parts: [{ text: refinedPrompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio as any,
              imageSize: selectedSize as any,
            },
          },
        });
      } catch (fallbackError: any) {
        // Last-resort general image model
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite-image',
          contents: {
            parts: [{ text: refinedPrompt }],
          },
        });
      }
    }

    let imageUrl: string | null = null;
    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType ?? 'image/png';
        imageUrl = `data:${mime};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!imageUrl) {
      throw new Error('Image generation succeeded but no image data part was returned.');
    }

    return res.json({
      success: true,
      imageUrl,
      size: selectedSize,
      aspectRatio,
      prompt,
    });
  } catch (error: any) {
    console.error('Error generating image:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate image',
    });
  }
});

// POST /api/brand/chat - Multi-turn chat interface with Gemini maintaining conversation history & role system instructions
app.post('/api/brand/chat', async (req, res) => {
  try {
    const { messages, currentBrandContext, taskType = 'general', requestedModel } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array with history is required.' });
    }

    // Model selection based on requirements:
    // "Use gemini-4-argon for particularly complex tasks, gemini-3.8-flash for general tasks, and gemini-3.1-flash-lite for tasks that should happen fast. Model: models/gemini-3.8-flash"
    let modelName = 'gemini-3.8-flash';
    if (requestedModel) {
      modelName = requestedModel.replace(/^models\//, '');
    } else if (taskType === 'complex') {
      modelName = 'gemini-4-argon';
    } else if (taskType === 'fast') {
      modelName = 'gemini-3.1-flash-lite';
    }

    const brandContextString = currentBrandContext
      ? `CURRENT BRAND BIBLE CONTEXT:
- Company Name: ${currentBrandContext.companyName}
- Tagline: ${currentBrandContext.tagline}
- Mission: ${currentBrandContext.missionStatement}
- Archetype: ${currentBrandContext.brandArchetype?.name}
- Palette: ${currentBrandContext.colorPalette?.map((c: any) => `${c.name} (${c.hex}) - ${c.role}`).join(', ')}
- Typography: Headers: ${currentBrandContext.typography?.headerFont?.family}, Body: ${currentBrandContext.typography?.bodyFont?.family}
- Primary Logo Concept: ${currentBrandContext.primaryLogoConcept?.conceptName}`
      : 'No active brand bible generated yet. Prompt the user to describe their mission if they want a tailored brand identity.';

    const systemInstruction = `You are AuraBrand's Executive Creative Director, Chief Brand Strategist, and Design Systems Architect.
Your role:
- Guide founders, CMOs, and designers to refine, expand, and apply their brand identity systems.
- Critique or enhance typography pairings, color harmonies, logo concepts, and brand voice.
- Formulate pitch deck headlines, tagline alternatives, advertising slogans, social media campaigns, brand launch rollouts, packaging briefs, and brand tone guidelines.
- Always provide articulate, tasteful, professional, and actionable creative direction.
- Reference the active Brand Bible context whenever relevant.

${brandContextString}`;

    // Convert history into contents structure expected by @google/genai
    // Each item has role: "user" | "model" and parts: [{ text }]
    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'assistant' ? 'model' : m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config: {
        systemInstruction,
      },
    });

    const replyText = response.text || 'I could not generate a response. Please try rephrasing your request.';

    return res.json({
      success: true,
      reply: replyText,
      modelUsed: modelName,
    });
  } catch (error: any) {
    console.error('Error in brand chat:', error);
    return res.status(500).json({
      error: error.message || 'Chat generation failed',
    });
  }
});

// Vite middleware or static serving
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AuraBrand server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
