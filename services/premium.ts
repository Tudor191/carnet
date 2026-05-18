const API_URL = process.env.EXPO_PUBLIC_API_URL ?? '';

export type PremiumPlan = 'monthly' | 'yearly';

export interface PremiumStatus {
  isPremium: boolean;
  plan?: 'monthly' | 'yearly' | null;
  currentPeriodEnd?: string | null;
}

export async function createCheckoutSession(email: string, plan: PremiumPlan): Promise<string> {
  const res = await fetch(`${API_URL}/api/create-checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, plan }),
    signal: AbortSignal.timeout(15000),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Eroare la inițierea plății.');
  return data.url as string;
}

export async function checkPremiumStatus(email: string): Promise<PremiumStatus> {
  try {
    const res = await fetch(
      `${API_URL}/api/check-premium?email=${encodeURIComponent(email)}`,
      { signal: AbortSignal.timeout(10000) }
    );
    if (!res.ok) return { isPremium: false };
    return await res.json();
  } catch {
    return { isPremium: false };
  }
}
