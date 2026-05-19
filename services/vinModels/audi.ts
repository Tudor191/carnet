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
import { ModelInfo } from './types';

export const AUDI_DB: Record<string, ModelInfo> = {
  // ── WUA = Audi Sport GmbH ───────────────────────────────────────────────
  // Q8 / RSQ8 family (4M platform, position 7 = F)
  'WUAF1': { model: 'RSQ8', generation: '4M', start: 2019 },
  'WUAF2': { model: 'RSQ8', generation: '4M', start: 2019 },          // RSQ8 Performance variant

  // RS6 Avant (C8, position 7 = F, position 8 = 2 or similar)
  'WUAF6': { model: 'RS6 Avant', generation: 'C8', start: 2019 },
  'WUAF7': { model: 'RS7 Sportback', generation: 'C8', start: 2019 },

  // RS4 / RS5 (B9/F5 platform)
  'WUAF4': { model: 'RS4 Avant', generation: 'B9', start: 2017 },
  'WUAF5': { model: 'RS5', generation: 'F5', start: 2017 },
  'WUAFB': { model: 'RS5 Sportback', generation: 'F5', start: 2017 },

  // Q5 / RSQ5
  'WUAFY': { model: 'RSQ5', generation: 'FY', start: 2017 },
  'WUAFS': { model: 'RSQ5 Sportback', generation: 'FY', start: 2020 },

  // Q3 / RSQ3 (F3 platform)
  'WUAF3': { model: 'RSQ3', generation: 'F3', start: 2019 },
  'WUAFR': { model: 'RSQ3 Sportback', generation: 'F3', start: 2019 },

  // Q7 / RSQ7 / SQ7
  'WUAM1': { model: 'RSQ7', generation: '4M', start: 2019 },
  'WUAM2': { model: 'SQ7', generation: '4M', start: 2019 },

  // A3 / RS3 (8Y platform)
  'WUAGB': { model: 'RS3 Sportback', generation: '8Y', start: 2021 },
  'WUAGY': { model: 'RS3 Sedan', generation: '8Y', start: 2021 },
  'WUAG1': { model: 'RS3', generation: '8Y', start: 2021 },

  // RS e-tron GT
  'WUAET': { model: 'RS e-tron GT', generation: 'J1', start: 2021 },
  'WUAGE': { model: 'RS e-tron GT', generation: 'J1', start: 2021 },

  // TT RS (8S platform)
  'WUACS': { model: 'TT RS', generation: '8S', start: 2016, end: 2023 },
  'WUAC1': { model: 'TT RS Coupé', generation: '8S', start: 2016, end: 2023 },
  'WUAC2': { model: 'TT RS Roadster', generation: '8S', start: 2016, end: 2023 },

  // R8 (4S platform)
  'WUAGS': { model: 'R8', generation: '4S', start: 2015, end: 2023 },
  'WUAG4': { model: 'R8 Coupé', generation: '4S', start: 2015, end: 2023 },
  'WUAG5': { model: 'R8 Spyder', generation: '4S', start: 2015, end: 2023 },
  'WUAG6': { model: 'R8 V10 Plus', generation: '4S', start: 2015, end: 2023 },

  // ── WAU = Audi AG standard models ───────────────────────────────────────
  // A1 (8Y / GB platform)
  'WAUZY': { model: 'A1', generation: '8Y', start: 2018 },
  'WAUZB': { model: 'A1 Sportback', generation: '8Y', start: 2018 },
  'WAUAB': { model: 'A1 Allstreet', generation: '8Y', start: 2020 },

  // A2
  'WAUZ1': { model: 'A2', start: 1999, end: 2005 },

  // A3 (8Y)
  'WAUGB': { model: 'A3 Sportback', generation: '8Y', start: 2020 },
  'WAUGY': { model: 'A3 Sedan', generation: '8Y', start: 2020 },
  'WAUG1': { model: 'A3', generation: '8Y', start: 2020 },
  'WAUGC': { model: 'A3 Cabriolet', generation: '8V', start: 2014, end: 2020 },
  'WAUGD': { model: 'A3 Allstreet', generation: '8Y', start: 2022 },
  // S3
  'WAUGF': { model: 'S3 Sportback', generation: '8Y', start: 2020 },
  'WAUGS': { model: 'S3 Sedan', generation: '8Y', start: 2020 },

  // A4 (B9)
  'WAUZE': { model: 'A4', generation: 'B9', start: 2015, end: 2023 },
  'WAUZA': { model: 'A4 Avant', generation: 'B9', start: 2015, end: 2023 },
  'WAUE3': { model: 'A4', generation: 'B9', start: 2015, end: 2023 },
  'WAUE4': { model: 'A4 Avant', generation: 'B9', start: 2015, end: 2023 },
  'WAUE5': { model: 'A4 allroad', generation: 'B9', start: 2016, end: 2023 },
  // S4
  'WAUE6': { model: 'S4', generation: 'B9', start: 2016, end: 2023 },
  'WAUE7': { model: 'S4 Avant', generation: 'B9', start: 2016, end: 2023 },

  // A5 (F5)
  'WAUF4': { model: 'A5 Coupé', generation: 'F5', start: 2016, end: 2023 },
  'WAUF5': { model: 'A5 Sportback', generation: 'F5', start: 2016, end: 2023 },
  'WAUFN': { model: 'A5 Cabriolet', generation: 'F5', start: 2016, end: 2023 },
  'WAUE8': { model: 'A5 Coupé', generation: 'F5', start: 2016, end: 2023 },
  // S5
  'WAUFC': { model: 'S5 Coupé', generation: 'F5', start: 2016, end: 2023 },
  'WAUFD': { model: 'S5 Sportback', generation: 'F5', start: 2016, end: 2023 },
  'WAUFE': { model: 'S5 Cabriolet', generation: 'F5', start: 2016, end: 2023 },

  // A6 (C8)
  'WAUFG': { model: 'A6', generation: 'C8', start: 2018 },
  'WAUFH': { model: 'A6 Avant', generation: 'C8', start: 2018 },
  'WAUFJ': { model: 'A6 allroad', generation: 'C8', start: 2019 },
  // S6
  'WAUFK': { model: 'S6', generation: 'C8', start: 2019 },
  'WAUFL': { model: 'S6 Avant', generation: 'C8', start: 2019 },

  // A7 (4K)
  'WAUFM': { model: 'A7 Sportback', generation: '4K', start: 2018 },
  'WAUHY': { model: 'A7 Sportback', generation: '4K', start: 2018 },
  // S7
  'WAUFP': { model: 'S7 Sportback', generation: '4K', start: 2019 },

  // A8 (D5)
  'WAUN1': { model: 'A8', generation: 'D5', start: 2017 },
  'WAUN2': { model: 'A8 L', generation: 'D5', start: 2017 },
  'WAUN3': { model: 'S8', generation: 'D5', start: 2019 },

  // Q2 (GA)
  'WAUGK': { model: 'Q2', generation: 'GA', start: 2016 },
  'WAUGM': { model: 'SQ2', generation: 'GA', start: 2018 },

  // Q3 (F3)
  'WAUF3': { model: 'Q3', generation: 'F3', start: 2018 },
  'WAUFT': { model: 'Q3 Sportback', generation: 'F3', start: 2019 },
  'WAUFV': { model: 'SQ3', generation: 'F3', start: 2020 },

  // Q4 e-tron
  'WAUQB': { model: 'Q4 e-tron', generation: 'MEB', start: 2021 },
  'WAUQC': { model: 'Q4 Sportback e-tron', generation: 'MEB', start: 2021 },

  // Q5 (FY)
  'WAUFY': { model: 'Q5', generation: 'FY', start: 2016 },
  'WAUFX': { model: 'Q5 Sportback', generation: 'FY', start: 2020 },
  'WAUFW': { model: 'SQ5', generation: 'FY', start: 2017 },
  'WAUFZ': { model: 'SQ5 Sportback', generation: 'FY', start: 2021 },

  // Q6 e-tron
  'WAUQE': { model: 'Q6 e-tron', generation: 'PPE', start: 2024 },
  'WAUQF': { model: 'SQ6 e-tron', generation: 'PPE', start: 2024 },

  // Q7 (4M)
  'WAUM1': { model: 'Q7', generation: '4M', start: 2015 },
  'WAUM2': { model: 'SQ7', generation: '4M', start: 2016 },

  // Q8 (4M)
  'WAUF1': { model: 'Q8', generation: '4M', start: 2018 },
  'WAUF2': { model: 'SQ8', generation: '4M', start: 2019 },
  'WAUFQ': { model: 'Q8 e-tron', generation: '4M', start: 2023 },
  'WAUQG': { model: 'Q8 e-tron', generation: '4M', start: 2023 },
  'WAUQH': { model: 'SQ8 e-tron', generation: '4M', start: 2023 },

  // e-tron GT
  'WAUGE': { model: 'e-tron GT', generation: 'J1', start: 2021 },
  'WAUGT': { model: 'e-tron GT', generation: 'J1', start: 2021 },

  // TT (8S)
  'WAUCS': { model: 'TT Coupé', generation: '8S', start: 2014, end: 2023 },
  'WAUCT': { model: 'TT Roadster', generation: '8S', start: 2014, end: 2023 },

  // R8 (WAU registered)
  'WAUG4': { model: 'R8 Coupé', generation: '4S', start: 2015, end: 2023 },
  'WAUG5': { model: 'R8 Spyder', generation: '4S', start: 2015, end: 2023 },

  // ── WA1 = Audi US-market ────────────────────────────────────────────────
  'WA1F': { model: 'Q5', generation: 'FY', start: 2016 },
  'WA1L': { model: 'Q7', generation: '4M', start: 2015 },
  'WA1V': { model: 'Q3', generation: 'F3', start: 2018 },
  'WA1B': { model: 'Q8', generation: '4M', start: 2018 },
  'WA1E': { model: 'e-tron', start: 2018 },
  'WA1C': { model: 'Q4 e-tron', generation: 'MEB', start: 2021 },

  // ── TRU = Audi Hungary ───────────────────────────────────────────────────
  'TRUF3': { model: 'Q3', generation: 'F3', start: 2018 },
  'TRUFT': { model: 'Q3 Sportback', generation: 'F3', start: 2019 },
  'TRUGY': { model: 'A3 Sedan', generation: '8Y', start: 2020 },
  'TRUGB': { model: 'A3 Sportback', generation: '8Y', start: 2020 },
  'TRUGK': { model: 'Q2', generation: 'GA', start: 2016 },
  'TRUFY': { model: 'Q5', generation: 'FY', start: 2016 },
};

/** @deprecated Use AUDI_DB instead */
export const AUDI_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(AUDI_DB).map(([k, v]) => [k, v.model])
);
