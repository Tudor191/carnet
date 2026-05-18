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
export const BMW_MODELS: Record<string, string> = {
  // ── WBA = BMW AG ─────────────────────────────────────────────────────────
  // 1 Series (F20/F40)
  'WBANU': '1 Series',
  'WBANV': '1 Series',
  'WBAAB': '1 Series Hatch',
  'WBAAD': '1 Series',

  // 2 Series (F22/F45/G42/U06)
  'WBAGE': '2 Series Coupé',
  'WBAGF': '2 Series Convertible',
  'WBAKG': '2 Series Active Tourer',
  'WBAKJ': '2 Series Gran Tourer',
  'WBAKL': '2 Series Gran Coupé',

  // 3 Series (F30/G20)
  'WBA3A': '3 Series',
  'WBA3B': '3 Series Touring',
  'WBA3C': '3 Series Coupé',
  'WBA3D': '3 Series Convertible',
  'WBA3F': '3 Series GT',
  'WBA8E': '3 Series (G20)',
  'WBA8G': '3 Series Touring (G21)',

  // 4 Series (F32/G22)
  'WBA3R': '4 Series Coupé',
  'WBA3S': '4 Series Convertible',
  'WBA3T': '4 Series Gran Coupé',
  'WBA8H': '4 Series Coupé (G22)',
  'WBA8J': '4 Series Convertible (G23)',
  'WBA8K': '4 Series Gran Coupé (G26)',

  // 5 Series (F10/G30)
  'WBA5A': '5 Series',
  'WBA5B': '5 Series Touring',
  'WBA5C': '5 Series GT',
  'WBAJA': '5 Series (G30)',
  'WBAJB': '5 Series Touring (G31)',
  'WBAJC': '5 Series GT (G32)',

  // 6 Series (F06/F12/F13)
  'WBA6A': '6 Series Coupé',
  'WBA6B': '6 Series Convertible',
  'WBA6C': '6 Series Gran Coupé',

  // 7 Series (F01/G11)
  'WBA7A': '7 Series',
  'WBA7B': '7 Series L',
  'WBAGN': '7 Series (G11)',
  'WBAGP': '7 Series L (G12)',

  // 8 Series (G14/G15/G16)
  'WBABC': '8 Series Coupé',
  'WBABD': '8 Series Convertible',
  'WBABE': '8 Series Gran Coupé',

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
  'WBA31M': '7 Series',   // G70 7 Series EU (pos7='M' = sedan body)
  'WBA31X': 'X6',         // G06 X6 EU 2024  (pos7='X')
  'WBA11Y': 'X6',         // G06 X6 EU 2026  (WBA11EY0909423106 user-confirmed)
  // 5-char fallback keys (used when pos7 disambiguation key not found)
  'WBA13': '5 Series',
  'WBA23': '7 Series',
  'WBA53': '5 Series',
  'WBA31': '7 Series',
  'WBA11': 'X6',          // G06 X6 EU fallback (WBA11EY prefix confirmed)

  // ── WBX = BMW SAV/SUV ────────────────────────────────────────────────────
  // X1 (F48/U11)
  'WBXHT': 'X1',
  'WBXHU': 'X1 sDrive',
  'WBXHV': 'X1 xDrive',

  // X2 (F39/U10)
  'WBXYH': 'X2',
  'WBXYJ': 'X2 sDrive',
  'WBXYK': 'X2 xDrive',

  // X3 (F25/G01)
  'WBXPC': 'X3',
  'WBXPD': 'X3 sDrive',
  'WBXPE': 'X3 xDrive',
  'WBX5L': 'X3 (G01)',
  'WBX5P': 'X3 xDrive (G01)',

  // X4 (F26/G02)
  'WBX5C': 'X4',
  'WBX5D': 'X4 xDrive',
  'WBX5E': 'X4 (G02)',

  // X5 (E70/F15/G05)
  'WBX5A': 'X5',
  'WBXPA': 'X5 (G05)',
  'WBXPB': 'X5 xDrive (G05)',

  // X6 (E71/F16/G06)
  'WBX5B': 'X6',
  'WBXPF': 'X6 (G06)',

  // X7 (G07)
  'WBXPG': 'X7',
  'WBXPH': 'X7 xDrive (G07)',

  // ── WBY = BMW i (electric) ───────────────────────────────────────────────
  'WBYYA': 'i3',
  'WBYYB': 'i8',
  'WBYB': 'i4',
  'WBYC': 'iX3',
  'WBYD': 'iX',
  'WBYE': 'i7',
  'WBYF': 'i5',

  // ── WBS = BMW M GmbH ─────────────────────────────────────────────────────
  'WBSAE': 'M3',
  'WBSAF': 'M3 Competition',
  'WBSAG': 'M4 Coupé',
  'WBSAH': 'M4 Convertible',
  'WBSAJ': 'M4 CSL',
  'WBSBA': 'M5',
  'WBSBB': 'M5 Competition',
  'WBSBC': 'M6 Coupé',
  'WBSBD': 'M6 Convertible',
  'WBSBE': 'M6 Gran Coupé',
  'WBSBF': 'M8 Coupé',
  'WBSBG': 'M8 Convertible',
  'WBSBH': 'M8 Gran Coupé',
  'WBSCK': 'M2',
  'WBSCL': 'M2 Competition',
  'WBSBK': 'X5 M',
  'WBSBL': 'X5 M Competition',
  'WBSBM': 'X6 M',
  'WBSBN': 'X6 M Competition',
  'WBSDC': 'X3 M',
  'WBSDD': 'X3 M Competition',
  'WBSDE': 'X4 M',
  'WBSDF': 'X4 M Competition',

  // ── WMW = MINI ───────────────────────────────────────────────────────────
  'WMWBA': 'MINI Cooper 3-door',
  'WMWBB': 'MINI Cooper 5-door',
  'WMWBC': 'MINI Convertible',
  'WMWBD': 'MINI Clubman',
  'WMWBE': 'MINI Countryman',
  'WMWBF': 'MINI Paceman',
  'WMWBG': 'MINI Coupe',
  'WMWBH': 'MINI Roadster',
  'WMWLV': 'MINI Cooper S',
  'WMWLY': 'MINI JCW',
  'WMWXM': 'MINI Aceman',

  // Shorter keys as fallback (WMI + position 4 only)
  'WBAA': '1 Series',
  'WBAC': '3 Series',
  'WBAD': '4 Series',
  'WBAF': '5 Series',
  'WBAG': '7 Series',
  'WBAH': '8 Series',
  'WBAJ': '3 Series G20',
  'WBAS': 'M3/M4',
  'WBAT': 'M5',
  'WBAU': '1 Series',
};
