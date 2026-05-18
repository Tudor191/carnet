/**
 * Firebase Firestore cache for VIN decode results.
 *
 * Collection: vinCache
 *   doc id = VIN (uppercase)
 *   fields:
 *     make, model, year       — decoded values
 *     source                  — 'nhtsa' | 'ai' | 'user'
 *     confidence              — 'high' | 'medium' | 'low'
 *     updatedAt               — server timestamp
 *
 * Priority order when reading: user > nhtsa > ai
 * User corrections always win; AI results are overwritten by NHTSA or user.
 */

import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getApps } from 'firebase/app';

export type VinCacheSource = 'nhtsa' | 'ai' | 'user';

export interface VinCacheEntry {
  make: string;
  model: string;
  year: number;
  source: VinCacheSource;
  confidence: 'high' | 'medium' | 'low';
}

function getDb() {
  const apps = getApps();
  if (!apps.length) return null;
  try {
    return getFirestore(apps[0]);
  } catch {
    return null;
  }
}

export async function getCachedVin(vin: string): Promise<VinCacheEntry | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, 'vinCache', vin.toUpperCase()));
    if (!snap.exists()) return null;
    const d = snap.data();
    if (d?.make && d?.year) {
      return {
        make: d.make,
        model: d.model ?? '',
        year: d.year,
        source: d.source ?? 'ai',
        confidence: d.confidence ?? 'medium',
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function cacheVinResult(
  vin: string,
  entry: VinCacheEntry,
): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    const existing = await getCachedVin(vin);
    // Never overwrite a user correction with ai/nhtsa data
    if (existing?.source === 'user' && entry.source !== 'user') return;
    await setDoc(doc(db, 'vinCache', vin.toUpperCase()), {
      ...entry,
      updatedAt: serverTimestamp(),
    });
  } catch {
    // Cache write failure is non-fatal
  }
}
