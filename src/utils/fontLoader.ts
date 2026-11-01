const loadedFonts = new Set<string>();

/**
 * Dynamically loads Google Fonts by appending link tags or checking existing ones.
 */
export function loadGoogleFont(fontFamily: string, query?: string): void {
  if (!fontFamily) return;

  const fontKey = fontFamily.trim();
  if (loadedFonts.has(fontKey)) return;

  try {
    const formattedFamily = fontFamily.replace(/\s+/g, '+');
    // Common weights to fetch for preview
    const defaultQuery = `${formattedFamily}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400`;
    const targetQuery = query && query.includes(':') ? query.replace(/\s+/g, '+') : defaultQuery;

    const linkId = `google-font-${fontKey.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    if (document.getElementById(linkId)) {
      loadedFonts.add(fontKey);
      return;
    }

    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${targetQuery}&display=swap`;

    document.head.appendChild(link);
    loadedFonts.add(fontKey);
  } catch (e) {
    console.warn(`Could not load Google Font: ${fontFamily}`, e);
  }
}

export function loadTypographyPairing(headerFont?: string, bodyFont?: string, accentFont?: string): void {
  if (headerFont) loadGoogleFont(headerFont);
  if (bodyFont) loadGoogleFont(bodyFont);
  if (accentFont) loadGoogleFont(accentFont);
}
