import { RovinetaStatus } from '../types';

// Romanian license plate validation
// Formats: B-123-ABC, CJ-12-ABC, etc.
export function validateRomanianPlate(plate: string): boolean {
  const normalized = plate.replace(/[\s\-\.]/g, '').toUpperCase();
  // B + 2 digits + 3 letters (Bucharest)
  const bucharestPattern = /^B\d{2,3}[A-Z]{3}$/;
  // County code (2 letters) + 2-3 digits + 3 letters
  const countyPattern = /^[A-Z]{2}\d{2,3}[A-Z]{3}$/;
  return bucharestPattern.test(normalized) || countyPattern.test(normalized);
}

export function formatPlate(plate: string): string {
  const normalized = plate.replace(/[\s\-\.]/g, '').toUpperCase();
  if (normalized.startsWith('B')) {
    const digits = normalized.slice(1).match(/^\d+/)?.[0] || '';
    const letters = normalized.slice(1 + digits.length);
    return `B-${digits}-${letters}`;
  }
  const county = normalized.slice(0, 2);
  const rest = normalized.slice(2);
  const digits = rest.match(/^\d+/)?.[0] || '';
  const letters = rest.slice(digits.length);
  return `${county}-${digits}-${letters}`;
}

export async function checkRovinieta(plate: string): Promise<RovinetaStatus> {
  const normalized = plate.replace(/[\s\-\.]/g, '').toUpperCase();

  if (!validateRomanianPlate(plate)) {
    return {
      valid: false,
      plate: normalized,
      error: 'Numărul de înmatriculare nu este valid pentru România.',
    };
  }

  try {
    // CNAIR public rovinieta check endpoint
    const url = `https://www.roviniete.ro/ro/verificare-rovinieta?plate=${encodeURIComponent(normalized)}`;

    // Since direct API may have CORS or require scraping, we use a fallback approach.
    // The official check can be done via the CNAIR website.
    // For a production app, integrate with CNAIR's official B2B API.
    const response = await fetch(
      `https://api.roviniete.ro/api/rovineta/${encodeURIComponent(normalized)}`,
      {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(8000),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        valid: data.valid === true || data.status === 'valid',
        expiryDate: data.expiryDate || data.validUntil || data.expiry,
        type: data.type || data.category,
        plate: formatPlate(normalized),
      };
    }

    // Fallback: guide user to official site
    return {
      valid: false,
      plate: formatPlate(normalized),
      error: 'VERIFICARE_EXTERNA',
    };
  } catch {
    return {
      valid: false,
      plate: formatPlate(normalized),
      error: 'VERIFICARE_EXTERNA',
    };
  }
}
