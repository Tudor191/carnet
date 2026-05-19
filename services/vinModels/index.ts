import { ModelInfo } from './types';
import { AUDI_DB } from './audi';
import { BMW_DB } from './bmw';
import { MERCEDES_DB } from './mercedes';
import { VW_DB } from './vw';
import { PORSCHE_DB } from './porsche';
import { FERRARI_DB } from './ferrari';
import { LAMBORGHINI_DB } from './lamborghini';
import { MASERATI_DB } from './maserati';
import { TOYOTA_DB } from './toyota';
import { HONDA_DB } from './honda';
import { HYUNDAI_DB } from './hyundai';
import { RENAULT_DB } from './renault';
import { OPEL_DB } from './opel';
import { PEUGEOT_DB } from './peugeot';
import { OTHER_DB } from './others';

// Merged DB — brand-specific files win over others (last write wins for any rare overlaps)
const ALL_DB: Record<string, ModelInfo> = {
  ...OTHER_DB,
  ...RENAULT_DB,
  ...PEUGEOT_DB,
  ...OPEL_DB,
  ...TOYOTA_DB,
  ...HONDA_DB,
  ...HYUNDAI_DB,
  ...VW_DB,
  ...MERCEDES_DB,
  ...BMW_DB,
  ...AUDI_DB,
  ...PORSCHE_DB,
  ...FERRARI_DB,
  ...LAMBORGHINI_DB,
  ...MASERATI_DB,
};

/**
 * Compute the lookup key for a VIN.
 *
 * European VINs often have "ZZZ" in positions 4-6 (indices 3-5).
 * When that pattern is present the real model codes are at positions 7-8 (indices 6-7).
 * For all other VINs model codes are at positions 4-5 (indices 3-4).
 *
 * G-platform BMW EU VINs use position 7 (index 6) to disambiguate models that share
 * the same pos4+pos5 prefix — we try a 6-char key (WMI+pos4+pos5+pos7) first.
 */
function resolveKeys(vin: string): { six: string | null; five: string; four: string } {
  const upper = vin.toUpperCase();
  const wmi = upper.slice(0, 3);
  const isZZZFormat = upper.slice(3, 6) === 'ZZZ';

  const suffix = isZZZFormat ? upper[6] + upper[7] : upper[3] + upper[4];
  const five = wmi + suffix;
  const four = wmi + suffix[0];
  const six = !isZZZFormat ? wmi + upper[3] + upper[4] + upper[6] : null;

  return { six, five, four };
}

/** Returns the full ModelInfo for a VIN, or null if not found. */
export function lookupVinModelInfo(vin: string): ModelInfo | null {
  if (!vin || vin.length < 8) return null;
  const { six, five, four } = resolveKeys(vin);
  return (six ? ALL_DB[six] ?? null : null)
    ?? ALL_DB[five]
    ?? ALL_DB[four]
    ?? null;
}

/** Returns just the model name string, or null if not found. Preserves backward compatibility. */
export function lookupVinModel(vin: string): string | null {
  return lookupVinModelInfo(vin)?.model ?? null;
}
