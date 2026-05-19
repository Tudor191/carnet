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
import { ModelInfo } from './types';

export const MERCEDES_DB: Record<string, ModelInfo> = {
  // ── WDD = Modern Mercedes (A/B/C/E/CLA/CLS/GLA) ─────────────────────────
  // A-Class (W177, 2018–present)
  'WDDWF': { model: 'A-Class', generation: 'W177', start: 2018 },
  'WDDW1': { model: 'A-Class Sedan', generation: 'W177', start: 2018 },
  'WDDA1': { model: 'A-Class', generation: 'W177', start: 2018 },
  'WDDA2': { model: 'A 35 AMG', generation: 'W177', start: 2018 },
  'WDDA3': { model: 'A 45 AMG', generation: 'W177', start: 2019 },

  // B-Class (W247, 2018–present)
  'WDDFB': { model: 'B-Class', generation: 'W247', start: 2018 },
  'WDDGB': { model: 'B-Class', generation: 'W247', start: 2018 },

  // C-Class (W205 2014–2021, W206 2021–present)
  'WDDC2': { model: 'C-Class Sedan', generation: 'W206', start: 2021 },
  'WDDC3': { model: 'C-Class Coupé', generation: 'C206', start: 2021 },
  'WDDC4': { model: 'C-Class Cabriolet', generation: 'A206', start: 2021 },
  'WDDC5': { model: 'C-Class Estate', generation: 'S206', start: 2021 },
  'WDDC6': { model: 'C 43 AMG', generation: 'W206', start: 2022 },
  'WDDC7': { model: 'C 63 AMG', generation: 'W206', start: 2022 },
  'WDDC8': { model: 'C 63 S AMG', generation: 'W205', start: 2014, end: 2021 },
  'WDDC9': { model: 'C-Class', generation: 'W206', start: 2021 },

  // E-Class (W213 2016–2023, W214 2023–present)
  'WDDE2': { model: 'E-Class Sedan', generation: 'W214', start: 2023 },
  'WDDE3': { model: 'E-Class Coupé', generation: 'C238', start: 2017, end: 2023 },
  'WDDE4': { model: 'E-Class Cabriolet', generation: 'A238', start: 2017, end: 2023 },
  'WDDE5': { model: 'E-Class Estate', generation: 'S214', start: 2023 },
  'WDDE6': { model: 'E 43 AMG', generation: 'W213', start: 2016, end: 2023 },
  'WDDE7': { model: 'E 53 AMG', generation: 'W213', start: 2018, end: 2023 },
  'WDDE8': { model: 'E 63 AMG', generation: 'W213', start: 2017, end: 2023 },
  'WDDE9': { model: 'E All-Terrain', generation: 'S214', start: 2023 },

  // S-Class (W222 2013–2020, W223 2020–present)
  'WDDS1': { model: 'S-Class', generation: 'W223', start: 2020 },
  'WDDS2': { model: 'S-Class L', generation: 'W223', start: 2020 },
  'WDDS3': { model: 'S 63 AMG', generation: 'W222', start: 2014, end: 2020 },
  'WDDS4': { model: 'S 65 AMG', generation: 'W222', start: 2013, end: 2020 },
  'WDDS5': { model: 'Maybach S-Class', generation: 'W223', start: 2020 },

  // CLA (C117 2013–2019, C118 2019–present)
  'WDDBF': { model: 'CLA', generation: 'C118', start: 2019 },
  'WDDBG': { model: 'CLA Shooting Brake', generation: 'X118', start: 2019 },
  'WDDBH': { model: 'CLA 35 AMG', generation: 'C118', start: 2019 },
  'WDDBJ': { model: 'CLA 45 AMG', generation: 'C118', start: 2019 },

  // CLS (C257 2018–2023)
  'WDDLJ': { model: 'CLS', generation: 'C257', start: 2018, end: 2023 },
  'WDDLK': { model: 'CLS 53 AMG', generation: 'C257', start: 2018, end: 2023 },
  'WDDLL': { model: 'CLS 63 AMG', generation: 'C218', start: 2011, end: 2018 },

  // EQA / EQB / EQC / EQE / EQS
  'WDDYJ': { model: 'EQA', generation: 'H243', start: 2021 },
  'WDDYK': { model: 'EQB', generation: 'X243', start: 2022 },
  'WDDYH': { model: 'EQE', generation: 'V295', start: 2022 },
  'WDDYS': { model: 'EQS', generation: 'V297', start: 2021 },
  'WDDRG': { model: 'EQC', generation: 'N293', start: 2019 },

  // 5-char keys from GENERATION_DB (WDD17 style — WMI + chassis number prefix)
  'WDD17': { model: 'A-Class', generation: 'W176', start: 2012, end: 2018 },
  'WDD24': { model: 'B-Class', generation: 'W246', start: 2011, end: 2018 },
  'WDD20': { model: 'C-Class', generation: 'W205', start: 2014, end: 2021 },
  'WDD21': { model: 'E-Class', generation: 'W213', start: 2016, end: 2023 },
  'WDD22': { model: 'S-Class', generation: 'W222', start: 2013, end: 2020 },
  'WDD11': { model: 'CLA', generation: 'C117', start: 2013, end: 2019 },
  'WDD23': { model: 'CLS', generation: 'C257', start: 2018, end: 2023 },

  // ── WDB = Mercedes-Benz (older models) ──────────────────────────────────
  'WDBNG': { model: 'E-Class (W211)', generation: 'W211', start: 2002, end: 2009 },
  'WDBNF': { model: 'C-Class (W203)', generation: 'W203', start: 2000, end: 2007 },
  'WDBNH': { model: 'S-Class (W220)', generation: 'W220', start: 1998, end: 2005 },
  'WDBNK': { model: 'S-Class (W221)', generation: 'W221', start: 2005, end: 2013 },
  'WDBUF': { model: 'CLK', generation: 'W209', start: 2002, end: 2010 },
  'WDBUG': { model: 'SLK / SLC', generation: 'R172', start: 2011 },
  'WDBUH': { model: 'SL', generation: 'R231', start: 2012, end: 2021 },
  'WDBUJ': { model: 'SLS AMG', generation: 'C197', start: 2009, end: 2014 },
  'WDBUK': { model: 'SL AMG', generation: 'R231', start: 2012 },
  'WDBUL': { model: 'GT AMG', generation: 'C190', start: 2014 },
  'WDBWF': { model: 'C-Class (W204)', generation: 'W204', start: 2007, end: 2014 },

  // ── WDC = Mercedes SUVs ──────────────────────────────────────────────────
  // 5-char GENERATION_DB keys
  'WDC16': { model: 'GLE', generation: 'W166', start: 2011, end: 2018 },
  'WDC25': { model: 'GLC', generation: 'X253', start: 2015, end: 2022 },
  'WDC29': { model: 'GLS', generation: 'X166', start: 2012, end: 2019 },
  'WDC19': { model: 'GLA', generation: 'H247', start: 2020 },
  'WDC18': { model: 'GLB', generation: 'X247', start: 2019 },

  // GLA (X156/H247)
  'WDCTG': { model: 'GLA', generation: 'H247', start: 2020 },
  'WDCTH': { model: 'GLA 35 AMG', generation: 'H247', start: 2020 },
  'WDCTJ': { model: 'GLA 45 AMG', generation: 'H247', start: 2020 },

  // GLB (X247)
  'WDCTK': { model: 'GLB', generation: 'X247', start: 2019 },
  'WDCTL': { model: 'GLB 35 AMG', generation: 'X247', start: 2020 },

  // GLC (X253/X254)
  'WDCTM': { model: 'GLC', generation: 'X254', start: 2022 },
  'WDCTN': { model: 'GLC Coupé', generation: 'C254', start: 2023 },
  'WDCTP': { model: 'GLC 43 AMG', generation: 'X253', start: 2016, end: 2022 },
  'WDCTQ': { model: 'GLC 63 AMG', generation: 'X253', start: 2017, end: 2022 },

  // GLE (W166/V167)
  'WDCWR': { model: 'GLE', generation: 'W167', start: 2018 },
  'WDCWS': { model: 'GLE Coupé', generation: 'C167', start: 2019 },
  'WDCWT': { model: 'GLE 43 AMG', generation: 'W166', start: 2016, end: 2018 },
  'WDCWU': { model: 'GLE 53 AMG', generation: 'W167', start: 2019 },
  'WDCWV': { model: 'GLE 63 AMG', generation: 'W167', start: 2019 },

  // GLS (X166/X167)
  'WDCWW': { model: 'GLS', generation: 'X167', start: 2019 },
  'WDCWX': { model: 'Maybach GLS', generation: 'X167', start: 2020 },
  'WDCWY': { model: 'GLS 63 AMG', generation: 'X167', start: 2020 },

  // G-Class (W463, 2018 facelift)
  'WDCYB': { model: 'G-Class', generation: 'W463', start: 2018 },
  'WDCYC': { model: 'G 63 AMG', generation: 'W463', start: 2018 },
  'WDCYD': { model: 'G 500', generation: 'W463', start: 2018 },

  // EQE SUV / EQS SUV
  'WDCYM': { model: 'EQE SUV', generation: 'X294', start: 2022 },
  'WDCYN': { model: 'EQS SUV', generation: 'X296', start: 2022 },

  // ── W1K / W1N = US-spec Mercedes ────────────────────────────────────────
  'W1KCF': { model: 'C-Class', generation: 'W206', start: 2021 },
  'W1KEF': { model: 'E-Class', generation: 'W214', start: 2023 },
  'W1KSF': { model: 'S-Class', generation: 'W223', start: 2020 },
  'W1NA5': { model: 'GLA', generation: 'H247', start: 2020 },
  'W1NB5': { model: 'GLB', generation: 'X247', start: 2019 },
  'W1NC5': { model: 'GLC', generation: 'X254', start: 2022 },
  'W1NE5': { model: 'GLE', generation: 'W167', start: 2018 },
  'W1NG5': { model: 'GLS', generation: 'X167', start: 2019 },
  'W1NYB': { model: 'G-Class', generation: 'W463', start: 2018 },

  // AMG GT (C190/R190/R232)
  'WDDAG': { model: 'AMG GT', generation: 'C190', start: 2015 },
  'WDDAH': { model: 'AMG GT S', generation: 'C190', start: 2015 },
  'WDDAJ': { model: 'AMG GT C', generation: 'C190', start: 2017 },
  'WDDAK': { model: 'AMG GT R', generation: 'C190', start: 2017 },
  'WDDAL': { model: 'AMG GT 4-door', generation: 'X290', start: 2018 },
};

/** @deprecated Use MERCEDES_DB instead */
export const MERCEDES_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(MERCEDES_DB).map(([k, v]) => [k, v.model])
);
