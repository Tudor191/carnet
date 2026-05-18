/**
 * AI-powered VIN decoder using Claude Haiku.
 * Called as a fallback when NHTSA API + local DB cannot identify the car.
 * Results are cached in Firebase by the caller (vinCache.ts).
 */

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';
const HAIKU_MODEL = 'claude-haiku-4-5-20251001';

export interface AIVinResult {
  make: string;
  model: string;
  year: number;
  confidence: 'high' | 'medium' | 'low';
}

export async function decodeVinWithAI(vin: string): Promise<AIVinResult | null> {
  const apiKey = (process.env.EXPO_PUBLIC_ANTHROPIC_KEY ?? '').trim();
  if (!apiKey) return null;

  const prompt = `You are an expert automotive VIN decoder. Decode this VIN: ${vin}

VIN structure (17 chars):
- Pos 1-3 (WMI): manufacturer + country
- Pos 4-8 (VDS): model/body/engine codes
- Pos 9: check digit
- Pos 10: model year code (A=2010,B=2011,C=2012,D=2013,E=2014,F=2015,G=2016,H=2017,J=2018,K=2019,L=2020,M=2021,N=2022,P=2023,R=2024,S=2025,T=2026,V=2027; 1=2001...9=2009; 0=European market marker)
- Pos 11: plant code
- Pos 12-17: sequential number

Key rules:
- If pos 10 is '0' this is a European VIN — estimate year from model generation, not pos 10
- European BMW VINs: pos 7 'M'=sedan, 'X'=X-model SUV/SAC
- ZZZ at pos 4-6 means real model codes are at pos 7-8
- For BMW G-platform: WBA=sedan, WBX=SAV/SUV, WBY=electric, WBS=M GmbH
- Confidence: 'high' if WMI+model clearly identified, 'medium' if estimated, 'low' if uncertain

Return ONLY valid JSON (no markdown fences, no explanation):
{"make":"Brand","model":"Specific Model","year":YYYY,"confidence":"high|medium|low"}`;

  try {
    const res = await fetch(ANTHROPIC_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: HAIKU_MODEL,
        max_tokens: 120,
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const text = (data?.content?.[0]?.text ?? '').trim();
    if (!text) return null;

    const result = JSON.parse(text) as AIVinResult;
    if (
      typeof result.make === 'string' && result.make.length > 0 &&
      typeof result.model === 'string' && result.model.length > 0 &&
      typeof result.year === 'number' && result.year >= 1900 && result.year <= 2030
    ) {
      return result;
    }
    return null;
  } catch {
    return null;
  }
}
