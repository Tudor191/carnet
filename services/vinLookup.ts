import { VinLookupResult } from '../types';
import { lookupVinModel } from './vinModels';

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
  TMA: { make: 'Opel', country: 'HU' },
  WF0: { make: 'Ford', country: 'DE' },
  WF1: { make: 'Ford', country: 'DE' },

  // ── FRANCE ────────────────────────────────────────────────────────────────
  VF1: { make: 'Renault', country: 'FR' },
  VF2: { make: 'Renault', country: 'FR' },
  VF6: { make: 'Renault', country: 'FR' },
  VNE: { make: 'Renault', country: 'FR' },
  VR1: { make: 'Renault', country: 'FR' },
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
  VNV: { make: 'Nissan', country: 'GB' },

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
  SCE: { make: 'McLaren', country: 'GB' },
  SCF: { make: 'Aston Martin', country: 'GB' },
  SFA: { make: 'Ford', country: 'GB' },
  SFZ: { make: 'Tesla', country: 'GB' },
  SHH: { make: 'Honda', country: 'GB' },
  SB1: { make: 'Toyota', country: 'GB' },

  // ── SWEDEN ────────────────────────────────────────────────────────────────
  YV1: { make: 'Volvo', country: 'SE' },
  YV4: { make: 'Volvo', country: 'SE' },
  VSK: { make: 'Volvo', country: 'BE' },
  YS3: { make: 'Saab', country: 'SE' },
  YK1: { make: 'Saab', country: 'SE' },

  // ── SPAIN ─────────────────────────────────────────────────────────────────
  VS6: { make: 'Ford', country: 'ES' },
  VSE: { make: 'Ford', country: 'ES' },

  // ── JAPAN ─────────────────────────────────────────────────────────────────
  JHM: { make: 'Honda', country: 'JP' },
  JAA: { make: 'Honda', country: 'JP' },
  JAB: { make: 'Honda', country: 'JP' },
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
  UU6: { make: 'Dacia', country: 'RO' },

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
  YY3: { make: 'Tesla', country: 'DE' },
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

function decodeYearFromVin(vin: string): number {
  const ch = vin[9]?.toUpperCase();
  if (!ch) return 0;

  // Standard SAE J17255 VIN year cycle (30-year repeating, excludes I O Q U Z 0)
  // First cycle: 1980–2009   Second cycle: 2010–2039
  // Characters that are ambiguous (same letter used in both cycles) are resolved
  // by assuming post-2010 for any vehicle with an otherwise modern WMI/VDS.
  // For digits 1-9, the SECOND cycle (2031-2039) only begins after 2030,
  // so currently 1-9 unambiguously means 2001-2009.
  const YEAR: Record<string, number> = {
    // Digits — unambiguous in current era (2001-2009 first, 2031-2039 second)
    '1': 2001, '2': 2002, '3': 2003, '4': 2004, '5': 2005,
    '6': 2006, '7': 2007, '8': 2008, '9': 2009,
    // Letters — we always pick the LATEST (post-2010) cycle, which is correct
    // for any vehicle registered in the last decade. A 1980 car showing 2010
    // is acceptable; a 2020 car showing 1990 is not.
    A: 2010, B: 2011, C: 2012, D: 2013, E: 2014, F: 2015, G: 2016,
    H: 2017, J: 2018, K: 2019, L: 2020, M: 2021, N: 2022, P: 2023,
    R: 2024, S: 2025, T: 2026, V: 2027, W: 2028, X: 2029, Y: 2030,
  };
  return YEAR[ch] ?? 0;
}

export async function lookupVin(vin: string): Promise<VinLookupResult> {
  const cleanVin = vin.trim().toUpperCase().replace(/\s/g, '');

  if (cleanVin.length !== 17) {
    return buildError('Numărul de șasiu trebuie să aibă exact 17 caractere.');
  }

  // WMI fallback from local database
  const wmi = cleanVin.slice(0, 3);
  const wmiData = WMI_DATABASE[wmi];

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
      const model = apiModel || lookupVinModel(cleanVin) || '';

      const year = yearStr ? parseInt(yearStr, 10) : decodeYearFromVin(cleanVin);

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
        make: capitalizeFirst(make),
        model: model || 'Necunoscut',
        year,
        color: 'Necunoscut',
        engineType: engineType || 'Necunoscut',
        engineDisplacement: displacement,
        horsepower: hp,
        fuelType,
        transmission,
        bodyType: capitalizeFirst(bodyType),
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
    const year = decodeYearFromVin(cleanVin);
    const localModel = lookupVinModel(cleanVin);
    return {
      make: wmiData.make,
      model: localModel || 'Necunoscut',
      year,
      color: 'Necunoscut',
      engineType: 'Necunoscut',
      engineDisplacement: 'Necunoscut',
      horsepower: 0,
      fuelType: 'Necunoscut',
      transmission: 'Necunoscută',
      bodyType: 'Necunoscut',
    };
  }

  return buildError('VIN-ul nu a fost găsit în baza de date. Verificați numărul și încercați din nou.');
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
