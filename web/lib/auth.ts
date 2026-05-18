import { User } from './types';

const USER_KEY = '@carnet_user';
const KEEP_KEY = '@carnet_keep_logged_in';

const HARDCODED: Array<{ email: string; password: string; displayName: string; isPremium: boolean }> = [
  { email: 'admin', password: 'admin123', displayName: 'Administrator', isPremium: true },
  { email: 'admin@carnet.ro', password: 'admin123', displayName: 'Administrator', isPremium: true },
];

function buildUser(a: { email: string; displayName: string; isPremium: boolean }): User {
  return { id: `user_${a.email}`, email: a.email, displayName: a.displayName, isPremium: a.isPremium, carCount: 0 };
}

export type AuthError = 'INVALID_CREDENTIALS' | 'EMAIL_TAKEN' | 'WEAK_PASSWORD';

export async function loginWithEmail(
  email: string, password: string, keep: boolean
): Promise<{ user: User } | { error: AuthError }> {
  const lower = email.trim().toLowerCase();
  const found = HARDCODED.find(a => a.email.toLowerCase() === lower && a.password === password);

  if (!found) {
    const raw = localStorage.getItem('@carnet_registered_accounts');
    const registered: typeof HARDCODED = raw ? JSON.parse(raw) : [];
    const reg = registered.find(a => a.email.toLowerCase() === lower && a.password === password);
    if (!reg) return { error: 'INVALID_CREDENTIALS' };
    const user = buildUser(reg);
    if (keep) { localStorage.setItem(USER_KEY, JSON.stringify(user)); localStorage.setItem(KEEP_KEY, 'true'); }
    return { user };
  }

  const user = buildUser(found);
  if (keep) { localStorage.setItem(USER_KEY, JSON.stringify(user)); localStorage.setItem(KEEP_KEY, 'true'); }
  return { user };
}

export async function registerWithEmail(
  displayName: string, email: string, password: string
): Promise<{ user: User } | { error: AuthError }> {
  const lower = email.trim().toLowerCase();
  if (HARDCODED.some(a => a.email.toLowerCase() === lower)) return { error: 'EMAIL_TAKEN' };
  const raw = localStorage.getItem('@carnet_registered_accounts');
  const registered: typeof HARDCODED = raw ? JSON.parse(raw) : [];
  if (registered.some(a => a.email.toLowerCase() === lower)) return { error: 'EMAIL_TAKEN' };
  if (password.length < 6) return { error: 'WEAK_PASSWORD' };
  const newAcc = { email: lower, password, displayName: displayName.trim(), isPremium: false };
  registered.push(newAcc);
  localStorage.setItem('@carnet_registered_accounts', JSON.stringify(registered));
  return { user: buildUser(newAcc) };
}

export function loadPersistedSession(): User | null {
  if (typeof window === 'undefined') return null;
  if (localStorage.getItem(KEEP_KEY) !== 'true') return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearSession() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(KEEP_KEY);
}
