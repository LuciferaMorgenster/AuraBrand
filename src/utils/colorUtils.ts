export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export function hexToRgb(hex: string): RGB {
  let cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function rgbToCmyk({ r, g, b }: RGB): CMYK {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const c = (1 - rNorm - k) / (1 - k);
  const m = (1 - gNorm - k) / (1 - k);
  const y = (1 - bNorm - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

export function getLuminance({ r, g, b }: RGB): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  try {
    const lum1 = getLuminance(hexToRgb(hex1));
    const lum2 = getLuminance(hexToRgb(hex2));
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);
    return Math.round(ratio * 100) / 100;
  } catch {
    return 1;
  }
}

export function getWcagRating(ratio: number): { aaNormal: boolean; aaLarge: boolean; aaaNormal: boolean } {
  return {
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3.0,
    aaaNormal: ratio >= 7.0,
  };
}

export function isColorDark(hex: string): boolean {
  try {
    const { r, g, b } = hexToRgb(hex);
    // HSP color model brightness formula
    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    return hsp < 127.5;
  } catch {
    return false;
  }
}

export function generateCssTokens(palette: { name: string; hex: string }[]): string {
  let css = ':root {\n';
  palette.forEach((color, i) => {
    const safeName = color.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    css += `  --color-brand-${safeName}: ${color.hex};\n`;
    css += `  --brand-palette-${i + 1}: ${color.hex};\n`;
  });
  css += '}';
  return css;
}

export function generateTailwindConfig(palette: { name: string; hex: string }[]): string {
  const colorsObj = palette.reduce((acc, color, i) => {
    const safeName = color.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    return {
      ...acc,
      [safeName]: color.hex,
      [`palette_${i + 1}`]: color.hex,
    };
  }, {});

  return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: ${JSON.stringify(colorsObj, null, 2)}\n    }\n  }\n};`;
}
