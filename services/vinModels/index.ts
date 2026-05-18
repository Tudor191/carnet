import { AUDI_MODELS } from './audi';
import { BMW_MODELS } from './bmw';
import { MERCEDES_MODELS } from './mercedes';
import { VW_MODELS } from './vw';
import { OTHER_MODELS } from './others';

const ALL_MODELS: Record<string, string> = {
  ...OTHER_MODELS,
  ...VW_MODELS,
  ...MERCEDES_MODELS,
  ...BMW_MODELS,
  ...AUDI_MODELS, // last wins for any rare overlaps
};

/**
 * Look up a car model name from a VIN.
 *
 * European VINs often have "ZZZ" in positions 4-6 (indices 3-5) as a
 * placeholder.  When that pattern is present the real model codes sit at
 * positions 7-8 (indices 6-7).  For all other VINs the model codes are at
 * positions 4-5 (indices 3-4).
 *
 * Returns the model string, or null if not found.
 */
export function lookupVinModel(vin: string): string | null {
  if (!vin || vin.length < 8) return null;

  const upper = vin.toUpperCase();
  const wmi = upper.slice(0, 3);
  const isZZZFormat = upper.slice(3, 6) === 'ZZZ';

  const twoCharSuffix = isZZZFormat
    ? upper[6] + upper[7]
    : upper[3] + upper[4];

  const fiveCharKey = wmi + twoCharSuffix;       // e.g. "WUAF1"
  const fourCharKey = wmi + twoCharSuffix[0];    // e.g. "WUAF"  (fallback)

  return ALL_MODELS[fiveCharKey] ?? ALL_MODELS[fourCharKey] ?? null;
}
