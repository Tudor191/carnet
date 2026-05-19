/**
 * BMW & MINI VIN model lookup
 * BMW uses position 4 (index 3) as the primary model series indicator.
 * Key = WMI (3) + VIN[3] + VIN[4]  →  positions 4-5 of VIN
 *
 * WMI codes:
 *   WBA = BMW AG (standard)
 *   WBS = BMW M GmbH (M models)
 *   WBX = BMW (SAV/SUV)
 *   WBW = BMW (roadsters, special)
 *   WBY = BMW i (electric)
 *   WMW = MINI
 */
import { ModelInfo } from './types';

export const BMW_DB: Record<string, ModelInfo> = {
  // ── WBA = BMW AG ─────────────────────────────────────────────────────────
  // 1 Series (F20/F40)
  'WBANU': { model: '1 Series', generation: 'F40', start: 2019 },
  'WBANV': { model: '1 Series', generation: 'F40', start: 2019 },
  'WBAAB': { model: '1 Series Hatch', generation: 'F40', start: 2019 },
  'WBAAD': { model: '1 Series', generation: 'F40', start: 2019 },

  // 2 Series (F22/F45/G42/U06)
  'WBAGE': { model: '2 Series Coupé', generation: 'G42', start: 2021 },
  'WBAGF': { model: '2 Series Convertible', generation: 'F23', start: 2015, end: 2021 },
  'WBAKG': { model: '2 Series Active Tourer', generation: 'F44', start: 2021 },
  'WBAKJ': { model: '2 Series Gran Tourer', generation: 'F46', start: 2015, end: 2021 },
  'WBAKL': { model: '2 Series Gran Coupé', generation: 'F44', start: 2020 },

  // 3 Series (F30/G20)
  'WBA3A': { model: '3 Series', generation: 'F30', start: 2012, end: 2019 },
  'WBA3B': { model: '3 Series Touring', generation: 'F31', start: 2012, end: 2019 },
  'WBA3C': { model: '3 Series Coupé', generation: 'F32', start: 2013, end: 2020 },
  'WBA3D': { model: '3 Series Convertible', generation: 'F33', start: 2013, end: 2020 },
  'WBA3F': { model: '3 Series GT', generation: 'F34', start: 2013, end: 2020 },
  'WBA8E': { model: '3 Series (G20)', generation: 'G20', start: 2018 },
  'WBA8G': { model: '3 Series Touring (G21)', generation: 'G21', start: 2019 },

  // 4 Series (F32/G22)
  'WBA3R': { model: '4 Series Coupé', generation: 'F32', start: 2013, end: 2020 },
  'WBA3S': { model: '4 Series Convertible', generation: 'F33', start: 2013, end: 2020 },
  'WBA3T': { model: '4 Series Gran Coupé', generation: 'F36', start: 2014, end: 2020 },
  'WBA8H': { model: '4 Series Coupé (G22)', generation: 'G22', start: 2020 },
  'WBA8J': { model: '4 Series Convertible (G23)', generation: 'G23', start: 2021 },
  'WBA8K': { model: '4 Series Gran Coupé (G26)', generation: 'G26', start: 2021 },

  // 5 Series (F10/G30/G60)
  'WBA5A': { model: '5 Series', generation: 'F10', start: 2010, end: 2017 },
  'WBA5B': { model: '5 Series Touring', generation: 'F11', start: 2010, end: 2017 },
  'WBA5C': { model: '5 Series GT', generation: 'F07', start: 2010, end: 2017 },
  'WBAJA': { model: '5 Series (G30)', generation: 'G30', start: 2017, end: 2023 },
  'WBAJB': { model: '5 Series Touring (G31)', generation: 'G31', start: 2017, end: 2023 },
  'WBAJC': { model: '5 Series GT (G32)', generation: 'G32', start: 2017, end: 2023 },

  // 6 Series (F06/F12/F13)
  'WBA6A': { model: '6 Series Coupé', generation: 'F13', start: 2011, end: 2018 },
  'WBA6B': { model: '6 Series Convertible', generation: 'F12', start: 2011, end: 2018 },
  'WBA6C': { model: '6 Series Gran Coupé', generation: 'F06', start: 2011, end: 2018 },

  // 7 Series (F01/G11/G70)
  'WBA7A': { model: '7 Series', generation: 'F01', start: 2009, end: 2015 },
  'WBA7B': { model: '7 Series L', generation: 'F02', start: 2009, end: 2015 },
  'WBAGN': { model: '7 Series (G11)', generation: 'G11', start: 2015, end: 2022 },
  'WBAGP': { model: '7 Series L (G12)', generation: 'G12', start: 2015, end: 2022 },

  // 8 Series (G14/G15/G16)
  'WBABC': { model: '8 Series Coupé', generation: 'G15', start: 2018 },
  'WBABD': { model: '8 Series Convertible', generation: 'G14', start: 2018 },
  'WBABE': { model: '8 Series Gran Coupé', generation: 'G16', start: 2019 },

  // ── WBA G-platform codes (verified from real-world VINs) ─────────────────
  // BMW G-platform VDS does NOT follow "digit = series number" logic.
  // Codes differ between NA (SAE year at pos 10) and EU (pos 10 = '0') markets.
  //
  // NA market VINs (verified from public listings):
  //   WBA23EH03PCN09717 = 2023 BMW 740i  → key WBA23
  //   WBA53BH04PWY21975 = 2023 BMW 530i  → key WBA53
  //   WBA13BK08PCL27322 = 2023 BMW M550i → key WBA13
  //
  // EU market VINs (user-confirmed, pos 10 = '0'):
  //   WBA31EM0609R68792 = BMW 7 Series   → 6-char key WBA31M (pos7='M')
  //   WBA31EX0109V76203 = BMW X6 2024    → 6-char key WBA31X (pos7='X')
  //   WBA11EY0909423106 = BMW X6 2026    → 6-char key WBA11Y (pos7='Y')
  //
  // 6-char keys (WMI+pos4+pos5+pos7) are checked first by lookupVinModel
  // to disambiguate models that share the same pos4+pos5 prefix.
  'WBA31M': { model: '7 Series', generation: 'G70', start: 2022 },   // G70 7 Series EU (pos7='M' = sedan body)
  'WBA31X': { model: 'X6', generation: 'G06', start: 2023 },         // G06 X6 EU 2024  (pos7='X')
  'WBA11Y': { model: 'X6', generation: 'G06', start: 2025 },         // G06 X6 EU 2026  (WBA11EY0909423106 user-confirmed)
  // 5-char fallback keys (used when pos7 disambiguation key not found)
  'WBA13': { model: '5 Series', generation: 'G60', start: 2023 },
  'WBA23': { model: '7 Series', generation: 'G70', start: 2022 },
  'WBA53': { model: '5 Series', generation: 'G60', start: 2023 },
  'WBA31': { model: '7 Series', generation: 'G11', start: 2015, end: 2022 },
  'WBA11': { model: 'X6', generation: 'G06', start: 2023 },          // G06 X6 EU fallback (WBA11EY prefix confirmed)

  // ── WBX = BMW SAV/SUV ────────────────────────────────────────────────────
  // X1 (F48/U11)
  'WBXHT': { model: 'X1', generation: 'F48', start: 2015 },
  'WBXHU': { model: 'X1 sDrive', generation: 'F48', start: 2015 },
  'WBXHV': { model: 'X1 xDrive', generation: 'F48', start: 2015 },

  // X2 (F39/U10)
  'WBXYH': { model: 'X2', generation: 'F39', start: 2017 },
  'WBXYJ': { model: 'X2 sDrive', generation: 'F39', start: 2017 },
  'WBXYK': { model: 'X2 xDrive', generation: 'F39', start: 2017 },

  // X3 (F25/G01)
  'WBXPC': { model: 'X3', generation: 'F25', start: 2010, end: 2017 },
  'WBXPD': { model: 'X3 sDrive', generation: 'F25', start: 2010, end: 2017 },
  'WBXPE': { model: 'X3 xDrive', generation: 'F25', start: 2010, end: 2017 },
  'WBX5L': { model: 'X3 (G01)', generation: 'G01', start: 2017 },
  'WBX5P': { model: 'X3 xDrive (G01)', generation: 'G01', start: 2017 },

  // X4 (F26/G02)
  'WBX5C': { model: 'X4', generation: 'F26', start: 2014, end: 2018 },
  'WBX5D': { model: 'X4 xDrive', generation: 'F26', start: 2014, end: 2018 },
  'WBX5E': { model: 'X4 (G02)', generation: 'G02', start: 2018 },

  // X5 (E70/F15/G05)
  'WBX5A': { model: 'X5', generation: 'F15', start: 2013 },
  'WBXPA': { model: 'X5 (G05)', generation: 'G05', start: 2018 },
  'WBXPB': { model: 'X5 xDrive (G05)', generation: 'G05', start: 2018 },

  // X6 (E71/F16/G06)
  'WBX5B': { model: 'X6', generation: 'F16', start: 2014, end: 2019 },
  'WBXPF': { model: 'X6 (G06)', generation: 'G06', start: 2019 },

  // X7 (G07)
  'WBXPG': { model: 'X7', generation: 'G07', start: 2018 },
  'WBXPH': { model: 'X7 xDrive (G07)', generation: 'G07', start: 2018 },

  // ── WBY = BMW i (electric) ───────────────────────────────────────────────
  'WBYYA': { model: 'i3', generation: 'I01', start: 2013, end: 2022 },
  'WBYYB': { model: 'i8', generation: 'I12', start: 2014, end: 2020 },
  'WBYB': { model: 'i4', generation: 'G26', start: 2021 },
  'WBYC': { model: 'iX3', generation: 'G08', start: 2020 },
  'WBYD': { model: 'iX', generation: 'I20', start: 2021 },
  'WBYE': { model: 'i7', generation: 'G70', start: 2022 },
  'WBYF': { model: 'i5', generation: 'G60', start: 2023 },

  // ── WBS = BMW M GmbH ─────────────────────────────────────────────────────
  'WBSAE': { model: 'M3', generation: 'F80', start: 2014 },
  'WBSAF': { model: 'M3 Competition', generation: 'G80', start: 2021 },
  'WBSAG': { model: 'M4 Coupé', generation: 'F82', start: 2014 },
  'WBSAH': { model: 'M4 Convertible', generation: 'G83', start: 2021 },
  'WBSAJ': { model: 'M4 CSL', generation: 'G82', start: 2022 },
  'WBSBA': { model: 'M5', generation: 'F90', start: 2018 },
  'WBSBB': { model: 'M5 Competition', generation: 'F90', start: 2018 },
  'WBSBC': { model: 'M6 Coupé', generation: 'F13', start: 2012, end: 2018 },
  'WBSBD': { model: 'M6 Convertible', generation: 'F12', start: 2012, end: 2018 },
  'WBSBE': { model: 'M6 Gran Coupé', generation: 'F06', start: 2012, end: 2018 },
  'WBSBF': { model: 'M8 Coupé', generation: 'F92', start: 2018 },
  'WBSBG': { model: 'M8 Convertible', generation: 'F91', start: 2019 },
  'WBSBH': { model: 'M8 Gran Coupé', generation: 'F93', start: 2019 },
  'WBSCK': { model: 'M2', generation: 'F87', start: 2015 },
  'WBSCL': { model: 'M2 Competition', generation: 'F87', start: 2018 },
  'WBSBK': { model: 'X5 M', generation: 'F85', start: 2014 },
  'WBSBL': { model: 'X5 M Competition', generation: 'F95', start: 2019 },
  'WBSBM': { model: 'X6 M', generation: 'F86', start: 2014 },
  'WBSBN': { model: 'X6 M Competition', generation: 'F96', start: 2019 },
  'WBSDC': { model: 'X3 M', generation: 'F97', start: 2019 },
  'WBSDD': { model: 'X3 M Competition', generation: 'F97', start: 2019 },
  'WBSDE': { model: 'X4 M', generation: 'F98', start: 2019 },
  'WBSDF': { model: 'X4 M Competition', generation: 'F98', start: 2019 },

  // ── WMW = MINI ───────────────────────────────────────────────────────────
  'WMWBA': { model: 'MINI Cooper 3-door', generation: 'F56', start: 2014 },
  'WMWBB': { model: 'MINI Cooper 5-door', generation: 'F55', start: 2014 },
  'WMWBC': { model: 'MINI Convertible', generation: 'F57', start: 2016 },
  'WMWBD': { model: 'MINI Clubman', generation: 'F54', start: 2015 },
  'WMWBE': { model: 'MINI Countryman', generation: 'F60', start: 2017 },
  'WMWBF': { model: 'MINI Paceman', generation: 'R61', start: 2012, end: 2016 },
  'WMWBG': { model: 'MINI Coupe', generation: 'R58', start: 2011, end: 2015 },
  'WMWBH': { model: 'MINI Roadster', generation: 'R59', start: 2012, end: 2015 },
  'WMWLV': { model: 'MINI Cooper S', generation: 'F56', start: 2014 },
  'WMWLY': { model: 'MINI JCW', generation: 'F56', start: 2015 },
  'WMWXM': { model: 'MINI Aceman', generation: 'J05', start: 2024 },

  // Shorter keys as fallback (WMI + position 4 only)
  'WBAA': { model: '1 Series' },
  'WBAC': { model: '3 Series' },
  'WBAD': { model: '4 Series' },
  'WBAF': { model: '5 Series' },
  'WBAG': { model: '7 Series' },
  'WBAH': { model: '8 Series' },
  'WBAJ': { model: '3 Series G20' },
  'WBAS': { model: 'M3/M4' },
  'WBAT': { model: 'M5' },
  'WBAU': { model: '1 Series' },
};

/** @deprecated Use BMW_DB instead */
export const BMW_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(BMW_DB).map(([k, v]) => [k, v.model])
);
