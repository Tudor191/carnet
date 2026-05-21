import type { VercelRequest, VercelResponse } from '@vercel/node';

export const maxDuration = 30;

const VERIFICRCA_URL = 'https://www.verificrca.ro/api/public/v1/verificare';

function isoToDDMMYYYY(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.VERIFICRCA_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const { plate } = req.body ?? {};
  if (!plate) return res.status(400).json({ error: 'plate required' });

  const query = String(plate).replace(/[\s\-\.]/g, '').toUpperCase();
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  try {
    const initRes = await fetch(VERIFICRCA_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ tip: 'rca', query }),
    });
    let data: any = await initRes.json();

    // Poll while processing — max 3 retries (9s) to stay within function timeout
    const since = Date.now();
    let attempts = 0;
    while (data.status === 'processing' && attempts < 3) {
      await new Promise(r => setTimeout(r, 3000));
      const pollRes = await fetch(
        `${VERIFICRCA_URL}?tip=rca&query=${encodeURIComponent(query)}&since=${since}`,
        { headers },
      );
      data = await pollRes.json();
      attempts++;
    }

    return res.status(200).json({
      status: data.status ?? 'unknown',
      asigurator: data.asigurator ?? null,
      expiresAt: data.expiresAt ?? null,
      // Pre-formatted for the app (DD.MM.YYYY)
      expiryFormatted: data.expiresAt ? isoToDDMMYYYY(data.expiresAt) : null,
    });
  } catch (err: any) {
    console.error('rca-check error:', err.message);
    return res.status(500).json({ error: 'Verification failed' });
  }
}
