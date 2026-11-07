# AuraBrand — AI Brand Identity Studio & Brand Bible Generator

**AuraBrand** is a comprehensive, production-grade Brand Identity Studio and Brand Bible generator powered by the Google GenAI SDK. Users simply describe their company mission (or choose from curated industry presets), and the application synthesizes an exhaustive, editorial-standard **Brand Bible**: vector-calibrated primary logos, secondary marks, a 5-color hex palette with strict usage notes, dynamically paired Google Fonts, interactive real-world mockups, and an AI Creative Director consultation suite.

---

## 💖 Sponsor AuraBrand — AI Brand Identity Studio & Brand Bible Generator

AuraBrand — AI Brand Identity Studio & Brand Bible Generator is an open-source project built with passion and dedication. Want to support the continued development of this project? You can!

**Sponsor this project by making a donation via PayPal:**

<div align="center">

### ☕ [Donate via PayPal](https://paypal.me/luciferamorgenster)

📧 **PayPal:** `luciferamorgenster@gmail.com`

</div>

Every donation, big or small, helps keep Ivory Tower BBS alive, fund new features, and support ongoing development. Thank you for your generosity! 🙏

---

## 🌟 Key Features

### 1. Mission-Driven Brand Bible Engine
- **Strategic Synthesis**: Analyzes mission statements, company names, industry domains, and desired aesthetic tones to construct a coherent brand system.
- **Origin Narrative & Archetypes**: Formulates brand story manifesto, brand archetypes (e.g. *The Creator*, *The Sage*, *The Outlaw*), 4 foundational core values, and verbal voice governance (paired tone attributes, verbal Do's and Don'ts, sample hero copy).
- **Curated Industry Presets**: Instant one-click inspiration presets including:
  - **Solaria Energy**: Clean Tech & Autonomous Microgrids
  - **Aetheria Botanicals**: Biotech Luxury Skincare
  - **Kairo Spatial**: Spatial Audio & Distributed Collaboration
  - **Veloce Dynamics**: Sustainable Micro-Mobility
  - **Luminary Press**: Architectural Publishing & Archival Monographs

### 2. Primary Logo & Secondary Marks (`gemini-3-pro-image-preview`)
- **Configurable Image Resolution**: Direct affordance to specify output size between **1K** (1024×1024), **2K** (2048×2048), and **4K** (4096×4096) for retina and print master reproduction.
- **Graphic Design Studio Prompts**: Tailored vector-clean generation with isolation on dark/light substrates.
- **Clearance & Scale Governance**: Interactive **1.5X exclusion zone grid overlay**, minimum scale constraints (print and digital), symbolism analysis, and prompt visualizer/editor.
- **3 Calibrated Secondary Marks**:
  - **Monogram / Favicon**: Simplified touch icon for mobile applications and browser tabs.
  - **Circular Architectural Seal**: Traditional emblem stamp for hardware, plaques, and packaging.
  - **Horizontal Wordmark Lockup**: Compact mark-and-type lockup for primary navigation headers.

### 3. 5-Color Hex Palette & Usage System
- **Chromatic Precision**: 5 harmonic colors with exact 6-digit Hex, RGB, HSL, and CMYK color codes.
- **60-30-10 Proportional Balance**: Visual distribution weight bar detailing dominant background, core brand, accent pop, secondary surface, and contrast text.
- **Detailed Touchpoint Rules**: Clear guidance for applying colors across digital UI, dark modes, physical packaging, and print.
- **WCAG 2.2 Contrast & Accessibility Matrix**: Real-time relative luminance calculation verifying contrast ratios against pure white, dark basalt, and palette pairs, with AA and AAA compliance badges.
- **Code Export**: One-click copy for CSS Custom Properties (`:root`) and Tailwind CSS color configurations.

### 4. Google Font Pairings for Headers & Body
- **Dynamic DOM Injection**: Automatically loads specified Google Fonts into the browser runtime so identity headlines and copy render live.
- **Typographic Synergy**: Pairs characterful display headline fonts (e.g., *Plus Jakarta Sans*, *Syne*, *Playfair Display*, *Space Grotesk*) with micro-legible body typefaces (e.g., *Inter*, *DM Sans*, *Lora*), plus monospace accents.
- **Interactive Live Sandbox**: Real-time editable canvas allowing users to type custom headlines, body text, adjust size scaling, and test layout dynamics.
- **Typographic Hierarchy Ladder**: Complete scale (Display Hero, Section H1, Card Title H2, Body Regular, Telemetry Caption) with sizes in rem, weights, and letter-spacing tracking.
- **Embed Directives**: Ready-to-copy HTML `<link>` and CSS `@import` snippets.

### 5. Real-World Brand Mockup Studio
- **Stationery Business Card**: 600gsm cardstock simulation with an interactive **3D front/back flip** mechanism, foil edge accent, debossed logo, and founder credentials.
- **Mobile iOS App**: Squircle touch icon, notification interface, and dark-mode launch dashboard.
- **Tactile Merchandise**: Heavyweight 400gsm recycled organic canvas field tote bag with screenprinted identity centerpieces.
- **Luxury Packaging Box**: Matte modular unboxing experience with metallic accent ribbons and sustainable certifications.

### 6. Gemini Multi-Turn Brand Director Chat
- **Conversational Continuity**: Full multi-turn message history maintained across turns.
- **Executive Persona**: Role-governed as AuraBrand's Executive Creative Director and Design Systems Architect.
- **Model Intelligence Selector**:
  - `gemini-3.8-flash`: Default model for general creative consulting, color advice, and brand critique.
  - `gemini-4-argon`: Specialized tier for complex brand architecture, multi-product strategy, and governance.
  - `gemini-3.1-flash-lite`: High-velocity tier for rapid copy alternatives, taglines, and micro-tweaks.
- **Context-Aware Direction**: Automatically references the active company name, mission, color palette, and typography during replies.

### 7. Export Suite
- **Print / Save as PDF**: Clean print-media stylesheets formatted for client presentations and print books.
- **JSON Specification**: Complete programmatic schema export (`brand-bible.json`).
- **Design Tokens**: Standardized CSS variables and Tailwind JS configuration snippets.

---

## 🛠️ Tech Stack & Model Mapping

| Capability | Technology / Model |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite |
| **Styling & Motion** | Tailwind CSS v4, Lucide React, Motion |
| **Server Runtime** | Express.js with Vite middleware integration |
| **Brand Bible Synthesis** | `gemini-3.8-flash` (Structured JSON schema via `@google/genai`) |
| **High-Res Logo & Mark Synthesis**| `gemini-3-pro-image-preview` (Configurable 1K, 2K, 4K resolutions) |
| **AI Creative Director Chat** | `gemini-3.8-flash`, `gemini-4-argon`, `gemini-3.1-flash-lite` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- Google Gemini API Key (configured in environment secrets)

### Installation

```bash
# Install dependencies
npm install

# Start development server (serves frontend & backend on port 3000)
npm run dev
```

The application runs on `http://localhost:3000`.

### Production Build

```bash
# Build production bundle
npm run build

# Start production server
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Gemini API Key for brand generation, image synthesis, and chat
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Optional App URL for hosting
APP_URL="http://localhost:3000"
```

---

## 📂 Project Structure

```
├── server.ts                       # Express backend with Gemini API routes
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Navigation bar, resolution toggle, export triggers
│   │   ├── MissionForm.tsx         # Mission input form, presets, and 1K/2K/4K selector
│   │   ├── BrandOverview.tsx       # Mission statement, story, archetype, values & voice
│   │   ├── LogoSection.tsx         # Primary logo & 3 secondary marks with 1.5X clear grid
│   │   ├── ColorPaletteSection.tsx # 5-color palette, 60-30-10 bar, WCAG contrast matrix
│   │   ├── TypographySection.tsx   # Google Font duo, live interactive sandbox, scale ladder
│   │   ├── MockupStudio.tsx        # Business card 3D flip, mobile app, tote, packaging
│   │   ├── BrandConsultantChat.tsx # Multi-turn Gemini AI chat drawer with model switcher
│   │   └── ExportModal.tsx         # PDF print, JSON download, CSS/Tailwind tokens
│   ├── data/
│   │   └── presets.ts              # Curated preset brand missions and fallback data
│   ├── types/
│   │   └── brand.ts                # TypeScript interfaces for Brand Bible & chat
│   ├── utils/
│   │   ├── colorUtils.ts           # WCAG contrast, RGB/HSL/CMYK conversions, CSS tokens
│   │   └── fontLoader.ts           # Dynamic Google Fonts head link injector
│   ├── App.tsx                     # Main layout & state orchestration
│   ├── main.tsx                    # React DOM entry point
│   └── index.css                   # Tailwind CSS import & print media rules
├── index.html                      # HTML entry with metadata
├── metadata.json                   # Applet metadata & capabilities
└── package.json                    # Project configuration & scripts
```

---

## 📄 License
Apache-2.0
