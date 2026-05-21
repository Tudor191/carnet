const API_URL = process.env.EXPO_PUBLIC_API_URL ?? '';

export type RcaStatus = 'valid' | 'warning' | 'expired' | 'not_found' | 'processing' | 'unknown' | 'error';

export interface RcaLookupResult {
  status: RcaStatus;
  asigurator?: string;
  expiryFormatted?: string; // DD.MM.YYYY — ready to store in car.insuranceExpiry
  expiresAt?: string;       // ISO 8601
}

export async function lookupRCA(plate: string): Promise<RcaLookupResult> {
  try {
    const res = await fetch(`${API_URL}/api/rca-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plate }),
    });
    if (!res.ok) return { status: 'error' };
    return await res.json();
  } catch {
    return { status: 'error' };
  }
}
