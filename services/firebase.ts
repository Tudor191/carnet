import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAH9MCFBi6dHwRU1HiO-_VIKs-Lk0ukEZ0',
  authDomain: 'carnet-a6089.firebaseapp.com',
  projectId: 'carnet-a6089',
  storageBucket: 'carnet-a6089.firebasestorage.app',
  messagingSenderId: '646251926967',
  appId: '1:646251926967:web:08f122e4279a498ff74432',
  measurementId: 'G-DTJZX55YM5',
};

export const FIREBASE_CONFIGURED = true;

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

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
