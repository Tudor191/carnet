/**
 * Volkswagen Group VIN model lookup
 * Covers: VW, Skoda, SEAT/Cupra
 * Key = WMI (3) + VIN[3] + VIN[4]  →  positions 4-5 of VIN
 * For ZZZ-format European VINs: Key = WMI (3) + VIN[6] + VIN[7]
 *
 * WMI codes:
 *   WVW = Volkswagen AG
 *   WVG = Volkswagen AG (Touareg / Slovakia plant)
 *   WV1 = Volkswagen (vans)
 *   WV2 = Volkswagen (Transporter)
 *   TMB = Skoda Auto
 *   VSS = SEAT / Cupra
 */
import { ModelInfo } from './types';

export const VW_DB: Record<string, ModelInfo> = {
  // ── WVG = Volkswagen Touareg (Slovakia plant) ────────────────────────────
  // ZZZ-format: key = WVG + VIN[6] + VIN[7]
  'WVG1T': { model: 'Touran', generation: '1T', start: 2003, end: 2015 },
  'WVG1K': { model: 'Golf Plus', generation: '1K', start: 2004, end: 2014 },
  'WVG7L': { model: 'Touareg', generation: '7L', start: 2002, end: 2010 },
  'WVG7P': { model: 'Touareg', generation: '7P', start: 2010, end: 2018 },
  'WVGCR': { model: 'Touareg', generation: 'CR', start: 2018 },
  'WVG4M': { model: 'Touareg', generation: 'CR', start: 2018 },         // gen 3 facelift

  // ── WVW = Volkswagen ─────────────────────────────────────────────────────
  // Polo (AW, MK6, 2017–present)
  'WVWAA': { model: 'Polo', generation: 'AW', start: 2017 },
  'WVWAB': { model: 'Polo GTI', generation: 'AW', start: 2017 },
  'WVWZZ': { model: 'Polo', generation: 'AW', start: 2017 },

  // Golf (MK7 2012–2019, MK8 2019–present)
  'WVWBA': { model: 'Golf', generation: 'MK8', start: 2019 },
  'WVWBB': { model: 'Golf Plus', generation: 'MK7', start: 2012, end: 2019 },
  'WVWBC': { model: 'Golf Sportsvan', generation: 'MK7', start: 2014, end: 2020 },
  'WVWBD': { model: 'Golf Variant', generation: 'MK8', start: 2020 },
  'WVWBE': { model: 'Golf R', generation: 'MK8', start: 2021 },
  'WVWBF': { model: 'Golf GTI', generation: 'MK8', start: 2020 },
  'WVWBG': { model: 'Golf GTE', generation: 'MK8', start: 2020 },
  'WVWBH': { model: 'Golf eGolf', generation: 'MK7', start: 2014, end: 2020 },
  'WVWHA': { model: 'Golf', generation: 'MK7', start: 2012, end: 2019 },
  'WVWHB': { model: 'Golf GTI', generation: 'MK7', start: 2012, end: 2019 },
  'WVWHC': { model: 'Golf R', generation: 'MK7', start: 2013, end: 2019 },

  // ID. (electric, MEB platform, 2020–present)
  'WVWEA': { model: 'ID.3', generation: 'MEB', start: 2020 },
  'WVWFA': { model: 'ID.4', generation: 'MEB', start: 2020 },
  'WVWFB': { model: 'ID.4 GTX', generation: 'MEB', start: 2021 },
  'WVWFC': { model: 'ID.5', generation: 'MEB', start: 2021 },
  'WVWFD': { model: 'ID.5 GTX', generation: 'MEB', start: 2021 },
  'WVWFE': { model: 'ID.7', generation: 'MEB', start: 2023 },
  'WVWFF': { model: 'ID.7 Tourer', generation: 'MEB', start: 2023 },
  'WVWFG': { model: 'ID.2', generation: 'MEB', start: 2025 },

  // Passat (B8 2014–present, B9 2023–present)
  'WVWCA': { model: 'Passat', generation: 'B9', start: 2023 },
  'WVWCB': { model: 'Passat Variant', generation: 'B9', start: 2023 },
  'WVWCC': { model: 'Passat Alltrack', generation: 'B8', start: 2015, end: 2023 },
  'WVWCD': { model: 'Passat GTE', generation: 'B8', start: 2015, end: 2023 },

  // Arteon
  'WVWDA': { model: 'Arteon', generation: '3H', start: 2017 },
  'WVWDB': { model: 'Arteon Shooting Brake', generation: '3H', start: 2020 },

  // Tiguan (AD MK2 2016–2023, BW MK3 2023–present)
  'WVWNA': { model: 'Tiguan', generation: 'BW', start: 2023 },
  'WVWNB': { model: 'Tiguan R', generation: 'AD', start: 2021, end: 2023 },

  // Touareg (CR gen 3, 2018–present)
  'WVWGA': { model: 'Touareg', generation: 'CR', start: 2018 },
  'WVWGB': { model: 'Touareg eHybrid', generation: 'CR', start: 2019 },
  'WVWGC': { model: 'Touareg R', generation: 'CR', start: 2021 },

  // T-Cross / T-Roc
  'WVWPA': { model: 'T-Roc', generation: 'A1', start: 2017 },
  'WVWPB': { model: 'T-Roc R', generation: 'A1', start: 2019 },
  'WVWQA': { model: 'T-Cross', generation: 'C11', start: 2018 },

  // Taigo
  'WVWRA': { model: 'Taigo', generation: 'CS', start: 2021 },

  // Touran / Sharan
  'WVWIA': { model: 'Touran', generation: '5T', start: 2015 },
  'WVWJA': { model: 'Sharan', generation: '7N', start: 2010, end: 2022 },

  // Beetle
  'WVWLA': { model: 'Beetle', generation: '5C', start: 2011, end: 2019 },
  'WVWLB': { model: 'Beetle Cabriolet', generation: '5C', start: 2012, end: 2019 },

  // Caddy / Transporter
  'WV1ZZ': { model: 'Caddy', start: 2015 },
  'WV2ZZ': { model: 'Transporter T6', generation: 'T6', start: 2015 },

  // ── TMB = Skoda Auto ────────────────────────────────────────────────────
  // Fabia (MK3 2014–2021, MK4 2021–present)
  'TMBAA': { model: 'Fabia', generation: 'MK4', start: 2021 },
  'TMBAB': { model: 'Fabia Combi', generation: 'MK4', start: 2021 },

  // Rapid / Scala
  'TMBBA': { model: 'Rapid', generation: 'NH', start: 2012, end: 2019 },
  'TMBCA': { model: 'Scala', generation: 'NW', start: 2019 },

  // Octavia (MK3 2012–2019, MK4 2020–present)
  'TMBDA': { model: 'Octavia', generation: 'MK4', start: 2020 },
  'TMBDB': { model: 'Octavia Combi', generation: 'MK4', start: 2020 },
  'TMBDC': { model: 'Octavia RS', generation: 'MK4', start: 2021 },
  'TMBDD': { model: 'Octavia Scout', generation: 'MK4', start: 2020 },
  'TMBHA': { model: 'Octavia', generation: 'MK3', start: 2012, end: 2019 },

  // Superb (B8 2015–present)
  'TMBEA': { model: 'Superb', generation: 'B9', start: 2023 },
  'TMBEB': { model: 'Superb Combi', generation: 'B9', start: 2023 },
  'TMBEC': { model: 'Superb SportLine', generation: 'B8', start: 2015, end: 2023 },

  // Kamiq / Karoq / Kodiaq
  'TMBFA': { model: 'Kamiq', generation: 'NW', start: 2019 },
  'TMBGA': { model: 'Karoq', generation: 'NU', start: 2017 },
  'TMBGB': { model: 'Karoq Scout', generation: 'NU', start: 2017 },
  'TMBHB': { model: 'Kodiaq RS', generation: 'NS', start: 2019 },
  'TMBHC': { model: 'Kodiaq SportLine', generation: 'NS', start: 2017 },

  // Enyaq (iV / RS, MEB platform, 2021–present)
  'TMBJA': { model: 'Enyaq iV', generation: 'MEB', start: 2021 },
  'TMBJB': { model: 'Enyaq Coupé iV', generation: 'MEB', start: 2021 },
  'TMBJC': { model: 'Enyaq RS', generation: 'MEB', start: 2022 },

  // Citigo
  'TMBKA': { model: 'Citigo', generation: 'AA', start: 2012, end: 2020 },
  'TMBKB': { model: 'e-Citigo', generation: 'AA', start: 2019, end: 2020 },

  // ── VSS = SEAT / Cupra ──────────────────────────────────────────────────
  // Ibiza (KJ MK5, 2017–present)
  'VSSAA': { model: 'Ibiza', generation: 'KJ', start: 2017 },
  'VSSAB': { model: 'Ibiza FR', generation: 'KJ', start: 2017 },

  // Arona (KJ platform, 2017–present)
  'VSSBA': { model: 'Arona', generation: 'KJ', start: 2017 },
  'VSSBB': { model: 'Arona FR', generation: 'KJ', start: 2017 },

  // Leon (KL MK4, 2020–present)
  'VSSCA': { model: 'Leon', generation: 'KL', start: 2020 },
  'VSSCB': { model: 'Leon ST', generation: 'KL', start: 2020 },
  'VSSCC': { model: 'Leon Cupra (pre-brand)', generation: 'KL', start: 2020 },

  // Ateca / Tarraco
  'VSSDA': { model: 'Ateca', generation: 'KH', start: 2016 },
  'VSSDB': { model: 'Ateca Cupra', generation: 'KH', start: 2018 },
  'VSSEA': { model: 'Tarraco', generation: 'KN', start: 2018 },

  // Cupra Born / Formentor / Leon Cupra
  'VSSFA': { model: 'Cupra Born', generation: 'MEB', start: 2021 },
  'VSSFB': { model: 'Cupra Formentor', generation: 'KH', start: 2020 },
  'VSSGA': { model: 'Cupra Leon', generation: 'KL', start: 2020 },
  'VSSGB': { model: 'Cupra Leon Sportstourer', generation: 'KL', start: 2020 },
  'VSSLA': { model: 'Cupra Ateca', generation: 'KH', start: 2018 },
  'VSSLB': { model: 'Cupra Terramar', generation: 'KH', start: 2024 },

  // Alhambra
  'VSSHA': { model: 'Alhambra', generation: '7N', start: 2010, end: 2022 },
};

/** @deprecated Use VW_DB instead */
export const VW_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(VW_DB).map(([k, v]) => [k, v.model])
);
