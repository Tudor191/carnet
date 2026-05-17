import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE = 'https://www.erovinieta.ro/vignettes-portal-web';
const CREDS_KEY = '@erovinieta_creds';

export interface ErovinetaCreds {
  username: string;
  password: string;
}

export interface VignetteInfo {
  plateNo: string;
  active: boolean;
  expiryDate?: string; // DD.MM.YYYY
  startDate?: string;
}

export async function saveCredentials(creds: ErovinetaCreds): Promise<void> {
  await AsyncStorage.setItem(CREDS_KEY, JSON.stringify(creds));
}

export async function loadCredentials(): Promise<ErovinetaCreds | null> {
  try {
    const raw = await AsyncStorage.getItem(CREDS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function clearCredentials(): Promise<void> {
  await AsyncStorage.removeItem(CREDS_KEY);
}

function msToRomDate(ms: number): string {
  const d = new Date(ms);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
}

async function login(username: string, password: string): Promise<string> {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&_spring_security_remember_me=on`,
    signal: AbortSignal.timeout(10000),
  });

  // Spring Security sets JSESSIONID in Set-Cookie on the login response or redirect
  const setCookie = res.headers.get('set-cookie') ?? '';
  const match = setCookie.match(/JSESSIONID=([^;,\s]+)/i);
  if (!match) {
    throw new Error('LOGIN_FAILED');
  }
  return match[1];
}

export async function fetchVignettes(creds: ErovinetaCreds): Promise<VignetteInfo[]> {
  const sessionId = await login(creds.username, creds.password);

  const res = await fetch(
    `${BASE}/rest/desktop/home/getDataPaginated?limit=50&page=0&_=${Date.now()}`,
    {
      headers: {
        Cookie: `JSESSIONID=${sessionId}`,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(10000),
    }
  );

  if (!res.ok) throw new Error('FETCH_FAILED');
  const data = await res.json();

  const results: VignetteInfo[] = [];
  for (const item of data?.view ?? []) {
    const plateNo: string = (item?.entity?.plateNo ?? '').replace(/[\s\-\.]/g, '').toUpperCase();
    if (!plateNo) continue;

    const vignettes: any[] = item?.userDetailsVignettes ?? [];
    if (vignettes.length === 0) {
      results.push({ plateNo, active: false });
      continue;
    }

    const stopMs: number = vignettes[0]?.vignetteStopDate ?? 0;
    const startMs: number = vignettes[0]?.vignetteStartDate ?? 0;
    const now = Date.now();
    results.push({
      plateNo,
      active: stopMs > now,
      expiryDate: stopMs ? msToRomDate(stopMs) : undefined,
      startDate: startMs ? msToRomDate(startMs) : undefined,
    });
  }

  return results;
}

export async function checkPlateVignette(
  creds: ErovinetaCreds,
  plate: string
): Promise<VignetteInfo | null> {
  const normalized = plate.replace(/[\s\-\.]/g, '').toUpperCase();
  const all = await fetchVignettes(creds);
  return all.find(v => v.plateNo === normalized) ?? null;
}
