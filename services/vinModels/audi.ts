/**
 * Audi VIN model lookup — European format (positions 4-6 = "ZZZ" placeholder)
 * Key = WMI (3) + VIN[6] + VIN[7]  →  positions 7-8 of VIN (1-indexed)
 *
 * WMI codes:
 *   WAU = Audi AG (standard + S models)
 *   WUA = Audi Sport GmbH (RS models, R8)
 *   TRU = Audi Hungary (Q3, A3, Q2)
 *   WA1 = Audi (US-market SUVs)
 */
export const AUDI_MODELS: Record<string, string> = {
  // ── WUA = Audi Sport GmbH ───────────────────────────────────────────────
  // Q8 / RSQ8 family (4M platform, position 7 = F)
  'WUAF1': 'RSQ8',
  'WUAF2': 'RSQ8',          // RSQ8 Performance variant

  // RS6 Avant (C8, position 7 = F, position 8 = 2 or similar)
  'WUAF6': 'RS6 Avant',
  'WUAF7': 'RS7 Sportback',

  // RS4 / RS5 (B9/F5 platform)
  'WUAF4': 'RS4 Avant',
  'WUAF5': 'RS5',
  'WUAFB': 'RS5 Sportback',

  // Q5 / RSQ5
  'WUAFY': 'RSQ5',
  'WUAFS': 'RSQ5 Sportback',

  // Q3 / RSQ3 (F3 platform)
  'WUAF3': 'RSQ3',
  'WUAFR': 'RSQ3 Sportback',

  // Q7 / RSQ7 / SQ7
  'WUAM1': 'RSQ7',
  'WUAM2': 'SQ7',

  // A3 / RS3 (8Y platform)
  'WUAGB': 'RS3 Sportback',
  'WUAGY': 'RS3 Sedan',
  'WUAG1': 'RS3',

  // RS e-tron GT
  'WUAET': 'RS e-tron GT',
  'WUAGE': 'RS e-tron GT',

  // TT RS (8S platform)
  'WUACS': 'TT RS',
  'WUAC1': 'TT RS Coupé',
  'WUAC2': 'TT RS Roadster',

  // R8 (4S platform)
  'WUAGS': 'R8',
  'WUAG4': 'R8 Coupé',
  'WUAG5': 'R8 Spyder',
  'WUAG6': 'R8 V10 Plus',

  // ── WAU = Audi AG standard models ───────────────────────────────────────
  // A1 (8Y / GB platform)
  'WAUZY': 'A1',
  'WAUZB': 'A1 Sportback',
  'WAUAB': 'A1 Allstreet',

  // A2
  'WAUZ1': 'A2',

  // A3 (8Y)
  'WAUGB': 'A3 Sportback',
  'WAUGY': 'A3 Sedan',
  'WAUG1': 'A3',
  'WAUGC': 'A3 Cabriolet',
  'WAUGD': 'A3 Allstreet',
  // S3
  'WAUGF': 'S3 Sportback',
  'WAUGS': 'S3 Sedan',

  // A4 (B9)
  'WAUZE': 'A4',
  'WAUZA': 'A4 Avant',
  'WAUE3': 'A4',
  'WAUE4': 'A4 Avant',
  'WAUE5': 'A4 allroad',
  // S4
  'WAUE6': 'S4',
  'WAUE7': 'S4 Avant',

  // A5 (F5)
  'WAUF4': 'A5 Coupé',
  'WAUF5': 'A5 Sportback',
  'WAUFN': 'A5 Cabriolet',
  'WAUE8': 'A5 Coupé',
  // S5
  'WAUFC': 'S5 Coupé',
  'WAUFD': 'S5 Sportback',
  'WAUFE': 'S5 Cabriolet',

  // A6 (C8)
  'WAUFG': 'A6',
  'WAUFH': 'A6 Avant',
  'WAUFJ': 'A6 allroad',
  // S6
  'WAUFK': 'S6',
  'WAUFL': 'S6 Avant',

  // A7 (4K)
  'WAUFM': 'A7 Sportback',
  'WAUHY': 'A7 Sportback',
  // S7
  'WAUFP': 'S7 Sportback',

  // A8 (D5)
  'WAUN1': 'A8',
  'WAUN2': 'A8 L',
  'WAUN3': 'S8',

  // Q2 (GA)
  'WAUGK': 'Q2',
  'WAUGM': 'SQ2',

  // Q3 (F3)
  'WAUF3': 'Q3',
  'WAUFT': 'Q3 Sportback',
  'WAUFV': 'SQ3',

  // Q4 e-tron
  'WAUQB': 'Q4 e-tron',
  'WAUQC': 'Q4 Sportback e-tron',

  // Q5 (FY)
  'WAUFY': 'Q5',
  'WAUFX': 'Q5 Sportback',
  'WAUFW': 'SQ5',
  'WAUFZ': 'SQ5 Sportback',

  // Q6 e-tron
  'WAUQE': 'Q6 e-tron',
  'WAUQF': 'SQ6 e-tron',

  // Q7 (4M)
  'WAUM1': 'Q7',
  'WAUM2': 'SQ7',

  // Q8 (4M)
  'WAUF1': 'Q8',
  'WAUF2': 'SQ8',
  'WAUFQ': 'Q8 e-tron',
  'WAUQG': 'Q8 e-tron',
  'WAUQH': 'SQ8 e-tron',

  // e-tron GT
  'WAUGE': 'e-tron GT',
  'WAUGT': 'e-tron GT',

  // TT (8S)
  'WAUCS': 'TT Coupé',
  'WAUCT': 'TT Roadster',

  // R8 (WAU registered)
  'WAUG4': 'R8 Coupé',
  'WAUG5': 'R8 Spyder',

  // ── WA1 = Audi US-market ────────────────────────────────────────────────
  'WA1F': 'Q5',
  'WA1L': 'Q7',
  'WA1V': 'Q3',
  'WA1B': 'Q8',
  'WA1E': 'e-tron',
  'WA1C': 'Q4 e-tron',

  // ── TRU = Audi Hungary ───────────────────────────────────────────────────
  'TRUF3': 'Q3',
  'TRUFT': 'Q3 Sportback',
  'TRUGY': 'A3 Sedan',
  'TRUGB': 'A3 Sportback',
  'TRUGK': 'Q2',
  'TRUFY': 'Q5',
};
