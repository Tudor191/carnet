import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const USER_KEY = '@carnet_user';
const KEEP_LOGGED_IN_KEY = '@carnet_keep_logged_in';

// Hardcoded accounts database
const ACCOUNTS: Array<{ email: string; password: string; displayName: string; isPremium: boolean }> = [
  { email: 'admin', password: 'admin123', displayName: 'Administrator', isPremium: true },
  { email: 'admin@carnet.ro', password: 'admin123', displayName: 'Administrator', isPremium: true },
];

export type AuthError = 'INVALID_CREDENTIALS' | 'EMAIL_TAKEN' | 'WEAK_PASSWORD' | 'UNKNOWN';

export async function loginWithEmail(
  email: string,
  password: string,
  keepLoggedIn: boolean
): Promise<{ user: User; error?: never } | { user?: never; error: AuthError }> {
  const trimmedEmail = email.trim().toLowerCase();
  const found = ACCOUNTS.find(
    a => a.email.toLowerCase() === trimmedEmail && a.password === password
  );

  if (!found) {
    // Check registered accounts in AsyncStorage
    const registeredRaw = await AsyncStorage.getItem('@carnet_registered_accounts');
    const registered: typeof ACCOUNTS = registeredRaw ? JSON.parse(registeredRaw) : [];
    const registeredFound = registered.find(
      a => a.email.toLowerCase() === trimmedEmail && a.password === password
    );
    if (!registeredFound) {
      return { error: 'INVALID_CREDENTIALS' };
    }
    const user = buildUser(registeredFound);
    await persistSession(user, keepLoggedIn);
    return { user };
  }

  const user = buildUser(found);
  await persistSession(user, keepLoggedIn);
  return { user };
}

export async function registerWithEmail(
  displayName: string,
  email: string,
  password: string
): Promise<{ user: User; error?: never } | { user?: never; error: AuthError }> {
  const trimmedEmail = email.trim().toLowerCase();

  // Check if already taken
  const isBuiltin = ACCOUNTS.some(a => a.email.toLowerCase() === trimmedEmail);
  if (isBuiltin) return { error: 'EMAIL_TAKEN' };

  const registeredRaw = await AsyncStorage.getItem('@carnet_registered_accounts');
  const registered: typeof ACCOUNTS = registeredRaw ? JSON.parse(registeredRaw) : [];
  if (registered.some(a => a.email.toLowerCase() === trimmedEmail)) {
    return { error: 'EMAIL_TAKEN' };
  }

  if (password.length < 6) return { error: 'WEAK_PASSWORD' };

  const newAccount = { email: trimmedEmail, password, displayName: displayName.trim(), isPremium: false };
  registered.push(newAccount);
  await AsyncStorage.setItem('@carnet_registered_accounts', JSON.stringify(registered));

  // Register does NOT auto-login with keepLoggedIn — user must login manually
  const user = buildUser(newAccount);
  return { user };
}

export async function loginWithProvider(provider: string): Promise<User> {
  // OAuth mock — in production replace with Firebase/OAuth
  return {
    id: `oauth_${provider}_${Date.now()}`,
    email: `utilizator@${provider.toLowerCase()}.com`,
    displayName: `Utilizator ${provider}`,
    isPremium: false,
    carCount: 0,
    isGuest: false,
  };
}

export async function loadPersistedSession(): Promise<User | null> {
  try {
    const keepRaw = await AsyncStorage.getItem(KEEP_LOGGED_IN_KEY);
    if (keepRaw !== 'true') return null; // session not persistent
    const userRaw = await AsyncStorage.getItem(USER_KEY);
    if (!userRaw) return null;
    return JSON.parse(userRaw);
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(USER_KEY);
  await AsyncStorage.removeItem(KEEP_LOGGED_IN_KEY);
}

function buildUser(account: { email: string; displayName: string; isPremium: boolean }): User {
  return {
    id: `user_${account.email}`,
    email: account.email,
    displayName: account.displayName,
    isPremium: account.isPremium,
    carCount: 0,
    isGuest: false,
  };
}

async function persistSession(user: User, keepLoggedIn: boolean): Promise<void> {
  if (keepLoggedIn) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    await AsyncStorage.setItem(KEEP_LOGGED_IN_KEY, 'true');
  } else {
    // Clear any previous persistent session
    await AsyncStorage.removeItem(USER_KEY);
    await AsyncStorage.removeItem(KEEP_LOGGED_IN_KEY);
  }
}
