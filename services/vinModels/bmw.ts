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

  // ── WBA G-platform numeric VDS (2019+) ───────────────────────────────────
  // Position 4 = series number, position 5 = body style digit
  'WBA11': '1 Series',
  'WBA21': '2 Series Active Tourer',
  'WBA22': '2 Series Coupé',
  'WBA31': '3 Series',
  'WBA34': '3 Series Touring',
  'WBA35': '3 Series GT',
  'WBA41': '4 Series Coupé',
  'WBA43': '4 Series Cabriolet',
  'WBA46': '4 Series Gran Coupé',
  'WBA51': '5 Series',
  'WBA54': '5 Series Touring',
  'WBA71': '7 Series',
  'WBA72': '7 Series L',
  'WBA81': '8 Series Coupé',
  'WBA83': '8 Series Cabriolet',
  'WBA86': '8 Series Gran Coupé',

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

  // ── WBX G-platform numeric VDS ───────────────────────────────────────────
  'WBX11': 'X1',
  'WBX21': 'X2',
  'WBX31': 'X3',
  'WBX41': 'X4',
  'WBX51': 'X5',
  'WBX61': 'X6',
  'WBX71': 'X7',

  // ── WBY = BMW i (electric) ───────────────────────────────────────────────
  // G-platform i numeric VDS
  'WBY21': 'iX',
  'WBY31': 'i4',
  'WBY51': 'i5',
  'WBY71': 'i7',

  'WBYYA': 'i3',
  'WBYYB': 'i8',
  'WBYB': 'i4',
  'WBYC': 'iX3',
  'WBYD': 'iX',
  'WBYE': 'i7',
  'WBYF': 'i5',

  // ── WBS = BMW M GmbH ─────────────────────────────────────────────────────
  // G-platform M numeric VDS
  'WBS21': 'M2',
  'WBS31': 'M3',
  'WBS41': 'M4',
  'WBS51': 'M5',
  'WBS81': 'M8',

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
