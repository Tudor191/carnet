import { VinLookupResult, VehicleOrigin } from '../types';
import { lookupVinModel, lookupVinModelInfo } from './vinModels';

// World Manufacturer Identifier (primele 3 caractere din VIN)
const WMI_DATABASE: Record<string, { make: string; country: string }> = {
  // ── GERMANY ──────────────────────────────────────────────────────────────
  WBA: { make: 'BMW', country: 'DE' },
  WBS: { make: 'BMW', country: 'DE' },
  WBW: { make: 'BMW', country: 'DE' },
  WBX: { make: 'BMW', country: 'DE' },
  WBY: { make: 'BMW', country: 'DE' },
  WMW: { make: 'MINI', country: 'DE' },
  WAU: { make: 'Audi', country: 'DE' },
  WUA: { make: 'Audi', country: 'DE' },
  WA1: { make: 'Audi', country: 'US' },
  TRU: { make: 'Audi', country: 'HU' },
  WVW: { make: 'Volkswagen', country: 'DE' },
  WVG: { make: 'Volkswagen', country: 'DE' },
  WV1: { make: 'Volkswagen', country: 'DE' },
  WV2: { make: 'Volkswagen', country: 'DE' },
  TMB: { make: 'Skoda', country: 'CZ' },
  VSS: { make: 'SEAT', country: 'ES' },
  WDB: { make: 'Mercedes-Benz', country: 'DE' },
  WDC: { make: 'Mercedes-Benz', country: 'DE' },
  WDD: { make: 'Mercedes-Benz', country: 'DE' },
  WDF: { make: 'Mercedes-Benz', country: 'DE' },
  W1K: { make: 'Mercedes-Benz', country: 'US' },
  W1N: { make: 'Mercedes-Benz', country: 'US' },
  WP0: { make: 'Porsche', country: 'DE' },
  WP1: { make: 'Porsche', country: 'DE' },
  W0L: { make: 'Opel', country: 'DE' },
  W0V: { make: 'Opel', country: 'DE' },
  TMA: { make: 'Hyundai', country: 'CZ' },
  WF0: { make: 'Ford', country: 'DE' },
  WF1: { make: 'Ford', country: 'DE' },

  // ── FRANCE ────────────────────────────────────────────────────────────────
  VF1: { make: 'Renault', country: 'FR' },
  VF2: { make: 'Renault', country: 'FR' },
  VF6: { make: 'Renault', country: 'FR' },
  VNE: { make: 'Renault', country: 'FR' },
  VR1: { make: 'DS', country: 'FR' },
  VF3: { make: 'Peugeot', country: 'FR' },
  VR3: { make: 'Peugeot', country: 'SK' },
  VF4: { make: 'Peugeot', country: 'FR' },
  VF7: { make: 'Citroën', country: 'FR' },
  VF8: { make: 'Citroën', country: 'FR' },
  VR7: { make: 'Citroën', country: 'SK' },
  VS7: { make: 'Citroën', country: 'ES' },
  VF9: { make: 'DS', country: 'FR' },
  VR8: { make: 'DS', country: 'FR' },
  VFA: { make: 'Alpine', country: 'FR' },
  VNK: { make: 'Toyota', country: 'FR' },
  VNV: { make: 'Nissan', country: 'FR' },

  // ── ITALY ─────────────────────────────────────────────────────────────────
  ZAR: { make: 'Alfa Romeo', country: 'IT' },
  ZFA: { make: 'Fiat', country: 'IT' },
  ZCF: { make: 'Fiat', country: 'IT' },
  ZGA: { make: 'Fiat', country: 'IT' },
  ZLA: { make: 'Lancia', country: 'IT' },
  ZFF: { make: 'Ferrari', country: 'IT' },
  ZHW: { make: 'Lamborghini', country: 'IT' },
  ZAM: { make: 'Maserati', country: 'IT' },

  // ── UNITED KINGDOM ────────────────────────────────────────────────────────
  SAJ: { make: 'Jaguar', country: 'GB' },
  SAL: { make: 'Land Rover', country: 'GB' },
  SCA: { make: 'Rolls-Royce', country: 'GB' },
  SCB: { make: 'Bentley', country: 'GB' },
  SCC: { make: 'Lotus', country: 'GB' },
  SBM: { make: 'McLaren', country: 'GB' },
  SCE: { make: 'DeLorean', country: 'GB' },
  SCF: { make: 'Aston Martin', country: 'GB' },
  SFA: { make: 'Ford', country: 'GB' },
  SFZ: { make: 'Tesla', country: 'GB' },
  SHH: { make: 'Honda', country: 'GB' },
  SB1: { make: 'Toyota', country: 'GB' },

  // ── SWEDEN ────────────────────────────────────────────────────────────────
  YV1: { make: 'Volvo', country: 'SE' },
  YV4: { make: 'Volvo', country: 'SE' },
  VSK: { make: 'Nissan', country: 'ES' },
  YS3: { make: 'Saab', country: 'SE' },
  YK1: { make: 'Saab', country: 'SE' },

  // ── SPAIN ─────────────────────────────────────────────────────────────────
  VS6: { make: 'Ford', country: 'ES' },
  VSE: { make: 'Ford', country: 'ES' },

  // ── JAPAN ─────────────────────────────────────────────────────────────────
  JHM: { make: 'Honda', country: 'JP' },
  JAA: { make: 'Isuzu', country: 'JP' },
  JAB: { make: 'Isuzu', country: 'JP' },
  JTD: { make: 'Toyota', country: 'JP' },
  JTE: { make: 'Toyota', country: 'JP' },
  JTH: { make: 'Lexus', country: 'JP' },
  JTJ: { make: 'Lexus', country: 'JP' },
  JTK: { make: 'Toyota', country: 'JP' },
  JTL: { make: 'Lexus', country: 'JP' },
  JTM: { make: 'Toyota', country: 'JP' },
  JTN: { make: 'Toyota', country: 'JP' },
  JT2: { make: 'Toyota', country: 'JP' },
  JT3: { make: 'Toyota', country: 'JP' },
  JN1: { make: 'Nissan', country: 'JP' },
  JN6: { make: 'Nissan', country: 'JP' },
  JN8: { make: 'Nissan', country: 'JP' },
  JNK: { make: 'Infiniti', country: 'JP' },
  JM1: { make: 'Mazda', country: 'JP' },
  JM4: { make: 'Mazda', country: 'JP' },
  JMZ: { make: 'Mazda', country: 'JP' },
  JMB: { make: 'Mitsubishi', country: 'JP' },
  JA3: { make: 'Mitsubishi', country: 'JP' },
  JA4: { make: 'Mitsubishi', country: 'JP' },
  JS1: { make: 'Suzuki', country: 'JP' },
  JS2: { make: 'Suzuki', country: 'JP' },
  JS3: { make: 'Suzuki', country: 'JP' },
  JS4: { make: 'Suzuki', country: 'JP' },
  JF1: { make: 'Subaru', country: 'JP' },
  JF2: { make: 'Subaru', country: 'JP' },
  J8Z: { make: 'Daihatsu', country: 'JP' },

  // ── KOREA ─────────────────────────────────────────────────────────────────
  KMH: { make: 'Hyundai', country: 'KR' },
  KMF: { make: 'Hyundai', country: 'KR' },
  KMJ: { make: 'Hyundai', country: 'KR' },
  KMT: { make: 'Genesis', country: 'KR' },
  KNA: { make: 'Kia', country: 'KR' },
  KNB: { make: 'Kia', country: 'KR' },
  KND: { make: 'Kia', country: 'KR' },
  KNM: { make: 'Kia', country: 'KR' },
  U5Y: { make: 'Kia', country: 'SK' },
  U6Y: { make: 'Kia', country: 'SK' },
  KPT: { make: 'SsangYong', country: 'KR' },
  KLA: { make: 'SsangYong', country: 'KR' },
  KL4: { make: 'Chevrolet', country: 'KR' },
  KL7: { make: 'Chevrolet', country: 'KR' },
  KL8: { make: 'Chevrolet', country: 'KR' },

  // ── ROMÂNIA / EUROPA DE EST ───────────────────────────────────────────────
  UU1: { make: 'Dacia', country: 'RO' },
  UU3: { make: 'Dacia', country: 'RO' },
  UU6: { make: 'Daewoo', country: 'RO' },

  // ── STATELE UNITE ─────────────────────────────────────────────────────────
  '1HG': { make: 'Honda', country: 'US' },
  '19X': { make: 'Honda', country: 'US' },
  '2HG': { make: 'Honda', country: 'CA' },
  '5FN': { make: 'Honda', country: 'US' },
  '1G1': { make: 'Chevrolet', country: 'US' },
  '1G4': { make: 'Buick', country: 'US' },
  '1G6': { make: 'Cadillac', country: 'US' },
  '2G1': { make: 'Chevrolet', country: 'CA' },
  '3G1': { make: 'Chevrolet', country: 'MX' },
  '1FA': { make: 'Ford', country: 'US' },
  '1FB': { make: 'Ford', country: 'US' },
  '1FT': { make: 'Ford', country: 'US' },
  '2FA': { make: 'Ford', country: 'CA' },
  '2FT': { make: 'Ford', country: 'CA' },
  '3FA': { make: 'Ford', country: 'MX' },
  '1N4': { make: 'Nissan', country: 'US' },
  '5N1': { make: 'Nissan', country: 'US' },
  '3N1': { make: 'Nissan', country: 'MX' },
  '4T1': { make: 'Toyota', country: 'US' },
  '4T3': { make: 'Toyota', country: 'US' },
  '5TD': { make: 'Toyota', country: 'US' },
  '5TF': { make: 'Toyota', country: 'US' },
  '2T1': { make: 'Toyota', country: 'CA' },
  '1C3': { make: 'Chrysler', country: 'US' },
  '1C4': { make: 'Jeep', country: 'US' },
  '1C6': { make: 'Ram', country: 'US' },
  '2C4': { make: 'Chrysler', country: 'CA' },
  '3C4': { make: 'Chrysler', country: 'MX' },
  '1J4': { make: 'Jeep', country: 'US' },
  '1J8': { make: 'Jeep', country: 'US' },
  '1VW': { make: 'Volkswagen', country: 'US' },
  '3VW': { make: 'Volkswagen', country: 'MX' },
  '2VW': { make: 'Volkswagen', country: 'CA' },
  '4US': { make: 'BMW', country: 'US' },
  '5UX': { make: 'BMW', country: 'US' },
  '5YX': { make: 'BMW', country: 'US' },
  '1YV': { make: 'Mazda', country: 'US' },
  '4F2': { make: 'Mazda', country: 'US' },
  '4F4': { make: 'Mazda', country: 'US' },
  '5YJ': { make: 'Tesla', country: 'US' },
  '7SA': { make: 'Tesla', country: 'US' },
  XP7: { make: 'Tesla', country: 'DE' },
  LRW: { make: 'Tesla', country: 'CN' },
  '5NP': { make: 'Hyundai', country: 'US' },
  '5XX': { make: 'Kia', country: 'US' },
  '3KP': { make: 'Kia', country: 'MX' },
  '1LN': { make: 'Lincoln', country: 'US' },
  '1GC': { make: 'Chevrolet', country: 'US' },
  '1GM': { make: 'Pontiac', country: 'US' },
  '2G4': { make: 'Pontiac', country: 'CA' },
};

const COLOR_MAP: Record<string, string> = {
  WHITE: 'Alb', BLACK: 'Negru', SILVER: 'Argintiu',
  GRAY: 'Gri', GREY: 'Gri', RED: 'Roșu', BLUE: 'Albastru',
  GREEN: 'Verde', YELLOW: 'Galben', ORANGE: 'Portocaliu',
  BROWN: 'Maro', BEIGE: 'Bej', GOLD: 'Auriu',
};

const FUEL_MAP: Record<string, string> = {
  GASOLINE: 'Benzină', PETROL: 'Benzină', DIESEL: 'Motorină',
  ELECTRIC: 'Electric', HYBRID: 'Hibrid',
  'PLUG-IN HYBRID': 'Hibrid plug-in', GAS: 'Gaz (GPL)',
  NATURAL_GAS: 'Gaz natural (CNG)', LPG: 'Gaz (GPL)',
};

const TRANSMISSION_MAP: Record<string, string> = {
  MANUAL: 'Manuală', AUTOMATIC: 'Automată',
  CVT: 'CVT', 'SEMI-AUTOMATIC': 'Semi-automată',
};

function translateFuel(fuel: string): string {
  return FUEL_MAP[fuel?.toUpperCase()] || fuel || 'Necunoscut';
}

function translateTransmission(tr: string): string {
  return TRANSMISSION_MAP[tr?.toUpperCase()] || tr || 'Necunoscută';
}

function estimateHorsepower(displacementCC: number, cylinders: number, fuelType: string): number {
  if (!displacementCC) return 0;
  const base = (displacementCC / 1000) * 60;
  const cylinderBonus = (cylinders || 4) * 5;
  const fuelBonus = fuelType?.toUpperCase().includes('DIESEL') ? 10 : 0;
  return Math.round(base + cylinderBonus + fuelBonus);
}

// Many European VINs use '0' at position 10 as a market marker — NOT a year code.
// For these VINs we fall back to the known model generation launch year.
// Key = WMI+pos4+pos5 (5-char) or WMI+pos4+pos5+pos7 (6-char, most specific).
const EU_GENERATION_YEARS: Record<string, number> = {
  // ── BMW G-platform ────────────────────────────────────────────────────────
  // 6-char keys (WMI + pos4 + pos5 + pos7) — needed when models share pos4+pos5
  'WBA31M': 2023, // G70 7 Series EU  (WBA31EM0609R68792 user-confirmed)
  'WBA31X': 2024, // G06 X6 EU 2024   (WBA31EX0109V76203 user-confirmed)
  'WBA11Y': 2026, // G06 X6 EU 2026   (WBA11EY0909423106 user-confirmed)
  // 5-char fallback keys
  'WBA31': 2023, 'WBA11': 2025, 'WBA23': 2023, 'WBA13': 2024, 'WBA53': 2024,

  // ── Ferrari (ZFF) ─────────────────────────────────────────────────────────
  'ZFF77': 2014, // California T (2014–2017) — ZFF77XJB user-confirmed
  'ZFF67': 2015, // 488 GTB / Spider (2015–2019)
  'ZFF47': 2009, // 458 Italia / Spider (2009–2015)
  'ZFFAA': 2020, // Roma (2020+)
  'ZFFAC': 2022, // 296 GTB (2022+)
  'ZFFBA': 2017, // Portofino (2017+)
  'ZFFCA': 2020, // SF90 Stradale (2020+)
  'ZFFDA': 2017, // 812 Superfast (2017+)
  'ZFFEA': 2019, // F8 Tributo (2019+)
  'ZFFFA': 2023, // Purosangue (2023+)
  'ZFFGA': 2016, // GTC4 Lusso (2016+)
  'ZFFHA': 2015, // 488 GTB (2015+)

  // ── Lamborghini (ZHW) ─────────────────────────────────────────────────────
  'ZHWAA': 2018, // Urus (2018+)
  'ZHWBA': 2014, // Huracán (2014+)
  'ZHWCA': 2011, // Aventador (2011+)
  'ZHWCC': 2023, // Revuelto (2023+)

  // ── Maserati (ZAM) ────────────────────────────────────────────────────────
  'ZAMAA': 2013, // Ghibli (2013+)
  'ZAMBA': 2016, // Levante (2016+)
  'ZAMCA': 2004, // Quattroporte (2004+)
  'ZAMDA': 2022, // Grecale (2022+)
  'ZAMEA': 2023, // GranTurismo (2023+)
  'ZAMFA': 2020, // MC20 (2020+)

  // ── Porsche (WP0/WP1) ─────────────────────────────────────────────────────
  'WP099': 2019, // 911 (992 gen, 2019+)
  'WP09Y': 2018, // Cayenne (9Y0, 2018+)
  'WP097': 2016, // Panamera (971, 2016+)
  'WP0J1': 2019, // Taycan (2019+)
  'WP195': 2014, // Macan (95B, 2014+) — WP1ZZZ95Z user-confirmed

  // ── Mercedes-Benz (WDD=cars, WDC=SUVs) ───────────────────────────────────
  // Key = WMI + pos4 + pos5 (often encodes the chassis generation, e.g. '176' = W176 A-Class)
  'WDD17': 2012, // A-Class W176/W177 (2012+) — WDD176... user-confirmed
  'WDD24': 2011, // B-Class W246/W247 (2011+)
  'WDD20': 2014, // C-Class W205/W206 (2014+)
  'WDD21': 2016, // E-Class W213     (2016+)
  'WDD22': 2013, // S-Class W222/W223 (2013+)
  'WDD11': 2013, // CLA C117/C118    (2013+)
  'WDD23': 2018, // CLS C257         (2018+)
  'WDC16': 2011, // GLE/M-Class W166 (2011+)
  'WDC25': 2015, // GLC X253/X254    (2015+)
  'WDC29': 2012, // GLS X166/X167    (2012+)
};

const EU_COUNTRIES = new Set([
  'DE', 'FR', 'IT', 'GB', 'SE', 'ES', 'CZ', 'HU', 'SK', 'RO',
  'AT', 'BE', 'NL', 'PL', 'PT', 'FI', 'DK', 'NO', 'CH', 'SI',
  'HR', 'BG', 'GR', 'LT', 'LV', 'EE',
]);
const NA_COUNTRIES = new Set(['US', 'CA', 'MX']);

function getOrigin(country: string | undefined): VehicleOrigin {
  if (!country) return 'OTHER';
  if (EU_COUNTRIES.has(country)) return 'EU';
  if (NA_COUNTRIES.has(country)) return 'NA';
  if (country === 'JP' || country === 'KR') return 'JP';
  return 'OTHER';
}

// European manufacturer WMIs where pos 10 = '0' is a market marker, not a year
const EU_YEAR_WMI = new Set([
  'WBA', 'WBS', 'WBX', 'WBY', 'WMW', 'WBW', // BMW group
  'ZFF', 'ZHW', 'ZAM', 'ZAR', 'ZFA', 'ZLA', // Italian
  'WP0', 'WP1',                               // Porsche
  'WDB', 'WDC', 'WDD', 'WDF',                 // Mercedes-Benz DE
]);

// German Mercedes WMIs where pos10 is NOT a SAE J1725 year code at all —
// the VDS uses numeric characters that conflict with the pos7 disambiguation rule.
// For these VINs we always skip vinYear and rely on NHTSA year or EU_GENERATION_YEARS.
const UNRELIABLE_YEAR_WMI = new Set(['WDB', 'WDC', 'WDD', 'WDF']);

function decodeYearFromVin(vin: string, minYear?: number): number {
  const ch = vin[9]?.toUpperCase(); // position 10 (0-indexed: 9)
  if (!ch) return 0;

  const FIRST: Record<string, number> = {
    A: 1980, B: 1981, C: 1982, D: 1983, E: 1984, F: 1985, G: 1986,
    H: 1987, J: 1988, K: 1989, L: 1990, M: 1991, N: 1992, P: 1993,
    R: 1994, S: 1995, T: 1996, V: 1997, W: 1998, X: 1999, Y: 2000,
    '1': 2001, '2': 2002, '3': 2003, '4': 2004, '5': 2005,
    '6': 2006, '7': 2007, '8': 2008, '9': 2009,
  };
  const SECOND: Record<string, number> = {
    A: 2010, B: 2011, C: 2012, D: 2013, E: 2014, F: 2015, G: 2016,
    H: 2017, J: 2018, K: 2019, L: 2020, M: 2021, N: 2022, P: 2023,
    R: 2024, S: 2025, T: 2026, V: 2027, W: 2028, X: 2029, Y: 2030,
    '1': 2031, '2': 2032, '3': 2033, '4': 2034, '5': 2035,
    '6': 2036, '7': 2037, '8': 2038, '9': 2039,
  };

  if (minYear !== undefined) {
    // ZZZ-format: pos7 is model code, not a cycle indicator.
    // Pick whichever cycle gives a year >= the generation launch year.
    const y1 = FIRST[ch] ?? 0;
    const y2 = SECOND[ch] ?? 0;
    if (y1 > 0 && y1 >= minYear) return y1;
    return y2 || y1;
  }

  // SAE J1725 disambiguation: position 7 (0-indexed: 6) determines the 30-year cycle.
  //   pos7 = digit  →  first cycle  (1980–2009)
  //   pos7 = letter →  second cycle (2010–2039)
  const pos7 = vin[6];
  const firstCycle = !!pos7 && /\d/.test(pos7);
  return firstCycle ? (FIRST[ch] ?? 0) : (SECOND[ch] ?? 0);
}

export async function lookupVin(vin: string): Promise<VinLookupResult> {
  const cleanVin = vin.trim().toUpperCase().replace(/\s/g, '');

  if (cleanVin.length !== 17) {
    return buildError('Numărul de șasiu trebuie să aibă exact 17 caractere.');
  }

  // WMI fallback from local database
  const wmi = cleanVin.slice(0, 3);
  const wmiData = WMI_DATABASE[wmi];

  // Pre-compute year helpers (independent of API result)
  const isZZZFormat = cleanVin.slice(3, 6) === 'ZZZ';
  const isUnreliablePos10 = UNRELIABLE_YEAR_WMI.has(wmi);

  // For ZZZ-format VINs, pos4-6 are literal 'ZZZ' fill — real model code is at pos7-8.
  const eu5Key = isZZZFormat
    ? cleanVin.slice(0, 3) + cleanVin.slice(6, 8)  // WMI + pos7 + pos8  (e.g. 'WP195')
    : cleanVin.slice(0, 5);                          // WMI + pos4 + pos5
  const eu6Key = isZZZFormat
    ? eu5Key                                         // no further disambiguation for ZZZ
    : cleanVin.slice(0, 5) + cleanVin[6];            // WMI + pos4 + pos5 + pos7

  // isEUVin: generation year table applies for EU VINs with non-standard pos10
  const isEUVin = EU_YEAR_WMI.has(wmi) && (cleanVin[9] === '0' || isUnreliablePos10 || isZZZFormat);
  const generationYear = isEUVin
    ? (EU_GENERATION_YEARS[eu6Key] ?? EU_GENERATION_YEARS[eu5Key] ?? lookupVinModelInfo(cleanVin)?.start ?? 0)
    : 0;

  // For ZZZ-format: pos7 is model code (not SAE cycle indicator) → pass generationYear as cycle hint
  // For UNRELIABLE_YEAR_WMI: skip year decode entirely
  const vinYear = isUnreliablePos10
    ? 0
    : decodeYearFromVin(cleanVin, isZZZFormat ? (generationYear || 2010) : undefined);

  const origin: VehicleOrigin = getOrigin(wmiData?.country);
  const modelInfo = lookupVinModelInfo(cleanVin);
  const generation = modelInfo?.generation
    ? `${modelInfo.generation} [${modelInfo.start ?? '?'}${modelInfo.end ? ' - ' + modelInfo.end : ' - prezent'}]`
    : undefined;

  try {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${cleanVin}?format=json`;
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    const data = await response.json();

    if (data?.Results) {
      const results: Array<{ Variable: string; Value: string | null }> = data.Results;
      const get = (v: string) => results.find(r => r.Variable === v)?.Value?.trim() || '';

      const apiMake = get('Make');
      const apiModel = get('Model');
      const yearStr = get('Model Year');
      const cylinders = parseInt(get('Engine Number of Cylinders') || '0', 10);
      const displacementCC = get('Displacement (CC)');
      const displacementL = get('Displacement (L)');
      const fuelTypeRaw = get('Fuel Type - Primary');
      const transmissionRaw = get('Transmission Style');
      const bodyType = get('Body Class') || 'Sedan';

      // Use API make/model if available; fall back to local VIN model database
      const make = apiMake || wmiData?.make || '';
      const rawModel = apiModel || lookupVinModel(cleanVin) || '';
      // Strip make prefix from model (e.g. NHTSA returns "Mazda3" → we show "3")
      const model = cleanModel(rawModel, make);

      // Validate API year: NHTSA sometimes returns '0' for unknown VINs.
      // For ZZZ-format VINs NHTSA uses the old 30-year cycle (e.g. N→1992 not 2022).
      const apiYear = yearStr ? parseInt(yearStr, 10) : 0;
      const year = (apiYear >= 1900 && apiYear <= 2060 && !isZZZFormat)
        ? apiYear
        : (vinYear > 0 ? vinYear : generationYear);

      const displacement = displacementL
        ? `${parseFloat(displacementL).toFixed(1)} L`
        : displacementCC
        ? `${Math.round(parseFloat(displacementCC))} cc`
        : 'Necunoscut';

      const fuelType = translateFuel(fuelTypeRaw) || 'Necunoscut';
      const transmission = translateTransmission(transmissionRaw) || 'Necunoscută';
      const hp = estimateHorsepower(
        displacementCC ? parseFloat(displacementCC) : 0,
        cylinders,
        fuelTypeRaw
      );
      const engineCylindersLabel = cylinders ? `${cylinders} cilindri` : '';
      const engineType = [fuelType, engineCylindersLabel].filter(Boolean).join(', ');

      if (!make) {
        return buildError('VIN-ul nu a fost recunoscut. Verificați că ați introdus corect toate cele 17 caractere.');
      }

      return {
        make: formatMake(make),
        model: model || 'Necunoscut',
        year,
        color: 'Necunoscut',
        engineType: engineType || 'Necunoscut',
        engineDisplacement: displacement,
        horsepower: hp,
        fuelType,
        transmission,
        bodyType: capitalizeFirst(bodyType),
        origin,
        generation,
      };
    }
  } catch (err: any) {
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      // If offline/timeout, still try WMI fallback
    } else {
      // Network error — try WMI fallback
    }
  }

  // WMI-only fallback (when API is unavailable or VIN not in NHTSA DB)
  if (wmiData) {
    const year = vinYear > 0 ? vinYear : generationYear;
    const localModel = lookupVinModel(cleanVin);
    return {
      make: formatMake(wmiData.make),
      model: localModel || 'Necunoscut',
      year,
      color: 'Necunoscut',
      engineType: 'Necunoscut',
      engineDisplacement: 'Necunoscut',
      horsepower: 0,
      fuelType: 'Necunoscut',
      transmission: 'Necunoscută',
      bodyType: 'Necunoscut',
      origin,
      generation,
    };
  }

  return buildError('VIN-ul nu a fost găsit în baza de date. Verificați numărul și încercați din nou.');
}

function formatMake(s: string): string {
  if (!s) return s;
  const upper = s.toUpperCase().trim();
  const ALL_CAPS_BRANDS = new Set([
    'BMW', 'MINI', 'SEAT', 'DS', 'MG', 'GMC', 'BYD', 'KIA', 'RAM',
    'FIAT', 'SAAB', 'JEEP',
  ]);
  if (ALL_CAPS_BRANDS.has(upper)) return upper;
  // Capitalise each alphabetic word, preserving hyphens and spaces as-is.
  // e.g. "MERCEDES-BENZ" → "Mercedes-Benz", "ALFA ROMEO" → "Alfa Romeo"
  return s.trim().replace(/[A-Za-z]+/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

// Remove the make name prefix from the model when NHTSA returns them combined.
// e.g. make="Mazda" model="Mazda3" → "3"; make="Mazda" model="Mazda CX-5" → "CX-5"
function cleanModel(model: string, make: string): string {
  if (!model || !make) return model;
  const m = model.trim();
  const mk = make.trim();
  // Escape special regex chars in make name, then strip it (with optional space) from start
  const escaped = mk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const cleaned = m.replace(new RegExp(`^${escaped}\\s*`, 'i'), '').trim();
  return cleaned || m; // never return empty string
}

function capitalizeFirst(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function buildError(error: string): VinLookupResult {
  return {
    error, make: '', model: '', year: 0, color: 'Necunoscut',
    engineType: '', engineDisplacement: '', horsepower: 0,
    fuelType: '', transmission: '', bodyType: '',
  };
}

/** Compute origin + generation from local tables only — no API calls. Used to backfill existing cars. */
export function computeVinLocalData(vin: string): { origin: VehicleOrigin; generation?: string } {
  const cleanVin = vin.trim().toUpperCase();
  if (cleanVin.length < 8) return { origin: 'OTHER' };
  const wmi = cleanVin.slice(0, 3);
  const origin = getOrigin(WMI_DATABASE[wmi]?.country);
  const isZZZFormat = cleanVin.slice(3, 6) === 'ZZZ';
  const eu5Key = isZZZFormat
    ? cleanVin.slice(0, 3) + cleanVin.slice(6, 8)
    : cleanVin.slice(0, 5);
  const eu6Key = isZZZFormat ? eu5Key : cleanVin.slice(0, 5) + cleanVin[6];
  const modelInfo = lookupVinModelInfo(cleanVin);
  const generation = modelInfo?.generation
    ? `${modelInfo.generation} [${modelInfo.start ?? '?'}${modelInfo.end ? ' - ' + modelInfo.end : ' - prezent'}]`
    : undefined;
  return { origin, generation };
}
