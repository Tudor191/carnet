import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURARE FIREBASE
//
// Pași pentru a obține aceste date (GRATUIT, ~5 minute):
//
// 1. Mergi la https://console.firebase.google.com/
// 2. Apasă "Adaugă proiect" → dă-i un nume (ex: carnet-app) → Continuă
// 3. În meniu stânga → "Build" → "Authentication" → "Începeți"
// 4. Tab "Sign-in method" → activează: Google, Facebook, Apple
// 5. În setări proiect (iconiță roată) → "Aplicațiile tale" → "</>" (Web)
// 6. Înregistrează aplicația → copiază obiectul firebaseConfig de mai jos
// 7. Înlocuiește valorile placeholder cu cele reale
//
// IMPORTANT: După ce ai config-ul, dacă folosești Firebase pe web (localhost),
// adaugă localhost la "Domenii autorizate" în Firebase Console →
// Authentication → Settings → Authorized domains
// ─────────────────────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

export const FIREBASE_CONFIGURED =
  firebaseConfig.apiKey !== 'YOUR_API_KEY' &&
  firebaseConfig.projectId !== 'YOUR_PROJECT_ID';

let auth: ReturnType<typeof getAuth> | null = null;

if (FIREBASE_CONFIGURED) {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
}

export { auth };

// ─── Provider sign-in helpers ─────────────────────────────────────────────────

export async function signInWithGoogle(): Promise<FirebaseUser> {
  if (!auth) throw new Error('Firebase not configured');
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function signInWithFacebook(): Promise<FirebaseUser> {
  if (!auth) throw new Error('Firebase not configured');
  const provider = new FacebookAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function signInWithApple(): Promise<FirebaseUser> {
  if (!auth) throw new Error('Firebase not configured');
  const provider = new OAuthProvider('apple.com');
  provider.addScope('email');
  provider.addScope('name');
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function firebaseSignOut(): Promise<void> {
  if (!auth) return;
  await signOut(auth);
}

export function firebaseUserToAppUser(fbUser: FirebaseUser) {
  return {
    id: fbUser.uid,
    email: fbUser.email || '',
    displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Utilizator',
    photoURL: fbUser.photoURL || undefined,
    isPremium: false,
    carCount: 0,
    isGuest: false,
  };
}
