/**
 * Volkswagen Group VIN model lookup
 * Covers: VW, Skoda, SEAT/Cupra, Porsche
 * Key = WMI (3) + VIN[3] + VIN[4]  →  positions 4-5 of VIN
 *
 * WMI codes:
 *   WVW = Volkswagen AG
 *   WV1 = Volkswagen (vans)
 *   WV2 = Volkswagen (Transporter)
 *   TMB = Skoda Auto
 *   VSS = SEAT / Cupra
 *   WP0 = Porsche AG (cars)
 *   WP1 = Porsche AG (SUVs: Cayenne, Macan)
 */
export const VW_MODELS: Record<string, string> = {
  // ── WVW = Volkswagen ─────────────────────────────────────────────────────
  // Polo (AW)
  'WVWAA': 'Polo',
  'WVWAB': 'Polo GTI',
  'WVWZZ': 'Polo',

  // Golf (Mk7/8)
  'WVWBA': 'Golf',
  'WVWBB': 'Golf Plus',
  'WVWBC': 'Golf Sportsvan',
  'WVWBD': 'Golf Variant',
  'WVWBE': 'Golf R',
  'WVWBF': 'Golf GTI',
  'WVWBG': 'Golf GTE',
  'WVWBH': 'Golf eGolf',
  'WVWHA': 'Golf',
  'WVWHB': 'Golf GTI',
  'WVWHC': 'Golf R',

  // ID. (electric)
  'WVWEA': 'ID.3',
  'WVWFA': 'ID.4',
  'WVWFB': 'ID.4 GTX',
  'WVWFC': 'ID.5',
  'WVWFD': 'ID.5 GTX',
  'WVWFE': 'ID.7',
  'WVWFF': 'ID.7 Tourer',
  'WVWFG': 'ID.2',

  // Passat (B8/B9)
  'WVWCA': 'Passat',
  'WVWCB': 'Passat Variant',
  'WVWCC': 'Passat Alltrack',
  'WVWCD': 'Passat GTE',

  // Arteon / Phaeton
  'WVWDA': 'Arteon',
  'WVWDB': 'Arteon Shooting Brake',

  // Tiguan (AD/BW)
  'WVWNA': 'Tiguan',
  'WVWNB': 'Tiguan R',

  // Touareg (CR)
  'WVWGA': 'Touareg',
  'WVWGB': 'Touareg eHybrid',
  'WVWGC': 'Touareg R',

  // T-Cross / T-Roc
  'WVWPA': 'T-Roc',
  'WVWPB': 'T-Roc R',
  'WVWQA': 'T-Cross',

  // Touran / Sharan
  'WVWIA': 'Touran',
  'WVWJA': 'Sharan',

  // Up! / e-Up (shares WMI+pos4 with Polo; Polo takes priority)

  // Beetle
  'WVWLA': 'Beetle',
  'WVWLB': 'Beetle Cabriolet',

  // Caddy / Transporter
  'WV1ZZ': 'Caddy',
  'WV2ZZ': 'Transporter T6',

  // ── TMB = Skoda Auto ────────────────────────────────────────────────────
  // Fabia (MK3/MK4)
  'TMBAA': 'Fabia',
  'TMBAB': 'Fabia Combi',

  // Rapid / Scala
  'TMBBA': 'Rapid',
  'TMBCA': 'Scala',

  // Octavia (MK3/MK4)
  'TMBDA': 'Octavia',
  'TMBDB': 'Octavia Combi',
  'TMBDC': 'Octavia RS',
  'TMBDD': 'Octavia Scout',
  'TMBHA': 'Octavia',

  // Superb (B8)
  'TMBEA': 'Superb',
  'TMBEB': 'Superb Combi',
  'TMBEC': 'Superb SportLine',

  // Kamiq / Karoq / Kodiaq
  'TMBFA': 'Kamiq',
  'TMBGA': 'Karoq',
  'TMBGB': 'Karoq Scout',
  'TMBHB': 'Kodiaq RS',
  'TMBHC': 'Kodiaq SportLine',

  // Enyaq (iV / RS)
  'TMBJA': 'Enyaq iV',
  'TMBJB': 'Enyaq Coupé iV',
  'TMBJC': 'Enyaq RS',

  // Citigo
  'TMBKA': 'Citigo',
  'TMBKB': 'e-Citigo',

  // ── VSS = SEAT / Cupra ──────────────────────────────────────────────────
  // Ibiza (KJ)
  'VSSAA': 'Ibiza',
  'VSSAB': 'Ibiza FR',

  // Arona
  'VSSBA': 'Arona',
  'VSSBB': 'Arona FR',

  // Leon (KL)
  'VSSCA': 'Leon',
  'VSSCB': 'Leon ST',
  'VSSCC': 'Leon Cupra (pre-brand)',

  // Ateca / Tarraco
  'VSSDA': 'Ateca',
  'VSSDB': 'Ateca Cupra',
  'VSSEA': 'Tarraco',

  // Cupra Born / Formentor / Leon Cupra
  'VSSFA': 'Cupra Born',
  'VSSFB': 'Cupra Formentor',
  'VSSGA': 'Cupra Leon',
  'VSSGB': 'Cupra Leon Sportstourer',
  'VSSLA': 'Cupra Ateca',
  'VSSLB': 'Cupra Terramar',

  // Alhambra
  'VSSHA': 'Alhambra',

  // ── WP0 / WP1 = Porsche ────────────────────────────────────────────────
  // 911 (992)
  'WP0AA': '911 Carrera',
  'WP0AB': '911 Carrera S',
  'WP0AC': '911 Carrera 4',
  'WP0AD': '911 Carrera 4S',
  'WP0AE': '911 Targa',
  'WP0AF': '911 Turbo',
  'WP0AG': '911 Turbo S',
  'WP0AH': '911 GT3',
  'WP0AJ': '911 GT3 RS',
  'WP0AK': '911 GT2 RS',
  'WP0AL': '911 Speedster',
  'WP0AM': '911 Sport Classic',
  'WP0AN': '911 Dakar',

  // Panamera (G2)
  'WP0BA': 'Panamera',
  'WP0BB': 'Panamera 4',
  'WP0BC': 'Panamera Turbo',
  'WP0BD': 'Panamera Sport Turismo',
  'WP0BE': 'Panamera GTS',

  // Taycan
  'WP0CA': 'Taycan',
  'WP0CB': 'Taycan 4S',
  'WP0CC': 'Taycan Turbo',
  'WP0CD': 'Taycan Turbo S',
  'WP0CE': 'Taycan Cross Turismo',
  'WP0CF': 'Taycan Sport Turismo',
  'WP0CG': 'Taycan GTS',

  // Boxster / Cayman (982) — use WP0D prefix
  'WP0DA': 'Boxster',
  'WP0DB': 'Boxster S',
  'WP0DC': 'Boxster GTS',
  'WP0DD': 'Boxster Spyder',
  'WP0DE': 'Cayman',
  'WP0DF': 'Cayman S',
  'WP0DG': 'Cayman GTS',
  'WP0DH': 'Cayman GT4',
  'WP0DJ': 'Cayman GT4 RS',

  // Cayenne (9YA)
  'WP1AA': 'Cayenne',
  'WP1AB': 'Cayenne S',
  'WP1AC': 'Cayenne GTS',
  'WP1AD': 'Cayenne Turbo',
  'WP1AE': 'Cayenne Turbo S',
  'WP1AF': 'Cayenne E-Hybrid',
  'WP1AG': 'Cayenne Turbo S E-Hybrid',
  'WP1AH': 'Cayenne Coupé',
  'WP1AJ': 'Cayenne Coupé GTS',

  // Macan (J1)
  'WP1BA': 'Macan',
  'WP1BB': 'Macan S',
  'WP1BC': 'Macan GTS',
  'WP1BD': 'Macan Turbo',
  'WP1BE': 'Macan Electric',
};
