/**
 * Mercedes-Benz VIN model lookup
 * European Mercedes VINs use ZZZ in positions 4-6 for many models.
 * Key = WMI (3) + VIN[3] + VIN[4]  →  positions 4-5 of VIN
 * Also supports ZZZ-format: WMI + VIN[6] + VIN[7]  →  positions 7-8
 *
 * WMI codes:
 *   WDB = Mercedes-Benz AG (cars)
 *   WDC = Mercedes-Benz AG (SUVs, GLE/GLC/etc.)
 *   WDD = Mercedes-Benz AG (newer A/B/C/E/S)
 *   WDF = Mercedes-Benz (vans)
 *   W1K = Mercedes-Benz (US-spec)
 *   W1N = Mercedes-Benz (US SUVs)
 */
export const MERCEDES_MODELS: Record<string, string> = {
  // ── WDD = Modern Mercedes (A/B/C/E/CLA/CLS/GLA) ─────────────────────────
  // A-Class (W177)
  'WDDWF': 'A-Class',
  'WDDW1': 'A-Class Sedan',
  'WDDA1': 'A-Class',
  'WDDA2': 'A 35 AMG',
  'WDDA3': 'A 45 AMG',

  // B-Class (W246/W247)
  'WDDFB': 'B-Class',
  'WDDGB': 'B-Class',

  // C-Class (W204/W205/W206)
  'WDDC2': 'C-Class Sedan',
  'WDDC3': 'C-Class Coupé',
  'WDDC4': 'C-Class Cabriolet',
  'WDDC5': 'C-Class Estate',
  'WDDC6': 'C 43 AMG',
  'WDDC7': 'C 63 AMG',
  'WDDC8': 'C 63 S AMG',
  'WDDC9': 'C-Class',

  // E-Class (W212/W213)
  'WDDE2': 'E-Class Sedan',
  'WDDE3': 'E-Class Coupé',
  'WDDE4': 'E-Class Cabriolet',
  'WDDE5': 'E-Class Estate',
  'WDDE6': 'E 43 AMG',
  'WDDE7': 'E 53 AMG',
  'WDDE8': 'E 63 AMG',
  'WDDE9': 'E All-Terrain',

  // S-Class (W222/W223)
  'WDDS1': 'S-Class',
  'WDDS2': 'S-Class L',
  'WDDS3': 'S 63 AMG',
  'WDDS4': 'S 65 AMG',
  'WDDS5': 'Maybach S-Class',

  // CLA (C117/C118)
  'WDDBF': 'CLA',
  'WDDBG': 'CLA Shooting Brake',
  'WDDBH': 'CLA 35 AMG',
  'WDDBJ': 'CLA 45 AMG',

  // CLS (C218/C257)
  'WDDLJ': 'CLS',
  'WDDLK': 'CLS 53 AMG',
  'WDDLL': 'CLS 63 AMG',

  // EQA / EQB / EQC / EQE / EQS
  'WDDYJ': 'EQA',
  'WDDYK': 'EQB',
  'WDDYH': 'EQE',
  'WDDYS': 'EQS',
  'WDDRG': 'EQC',

  // ── WDB = Mercedes-Benz (older models) ──────────────────────────────────
  'WDBNG': 'E-Class (W211)',
  'WDBNF': 'C-Class (W203)',
  'WDBNH': 'S-Class (W220)',
  'WDBNK': 'S-Class (W221)',
  'WDBUF': 'CLK',
  'WDBUG': 'SLK / SLC',
  'WDBUH': 'SL',
  'WDBUJ': 'SLS AMG',
  'WDBUK': 'SL AMG',
  'WDBUL': 'GT AMG',
  'WDBWF': 'C-Class (W204)',

  // ── WDC = Mercedes SUVs ──────────────────────────────────────────────────
  // GLA (X156/H247)
  'WDCTG': 'GLA',
  'WDCTH': 'GLA 35 AMG',
  'WDCTJ': 'GLA 45 AMG',

  // GLB (X247)
  'WDCTK': 'GLB',
  'WDCTL': 'GLB 35 AMG',

  // GLC (X253/X254)
  'WDCTM': 'GLC',
  'WDCTN': 'GLC Coupé',
  'WDCTP': 'GLC 43 AMG',
  'WDCTQ': 'GLC 63 AMG',

  // GLE (W166/V167)
  'WDCWR': 'GLE',
  'WDCWS': 'GLE Coupé',
  'WDCWT': 'GLE 43 AMG',
  'WDCWU': 'GLE 53 AMG',
  'WDCWV': 'GLE 63 AMG',

  // GLS (X166/X167)
  'WDCWW': 'GLS',
  'WDCWX': 'Maybach GLS',
  'WDCWY': 'GLS 63 AMG',

  // G-Class (W463)
  'WDCYB': 'G-Class',
  'WDCYC': 'G 63 AMG',
  'WDCYD': 'G 500',

  // EQE SUV / EQS SUV
  'WDCYM': 'EQE SUV',
  'WDCYN': 'EQS SUV',

  // ── W1K / W1N = US-spec Mercedes ────────────────────────────────────────
  'W1KCF': 'C-Class',
  'W1KEF': 'E-Class',
  'W1KSF': 'S-Class',
  'W1NA5': 'GLA',
  'W1NB5': 'GLB',
  'W1NC5': 'GLC',
  'W1NE5': 'GLE',
  'W1NG5': 'GLS',
  'W1NYB': 'G-Class',

  // AMG GT (R190/C190/R232)
  'WDDAG': 'AMG GT',
  'WDDAH': 'AMG GT S',
  'WDDAJ': 'AMG GT C',
  'WDDAK': 'AMG GT R',
  'WDDAL': 'AMG GT 4-door',
};
