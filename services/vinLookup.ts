import { VinLookupResult } from '../types';
import { lookupVinModel } from './vinModels';

// World Manufacturer Identifier (primele 3 caractere din VIN)
const WMI_DATABASE: Record<string, { make: string; country: string }> = {
  // Germania
  WBA: { make: 'BMW', country: 'DE' },
  WBS: { make: 'BMW', country: 'DE' },
  WBY: { make: 'BMW', country: 'DE' },
  WMW: { make: 'MINI', country: 'DE' },
  WAU: { make: 'Audi', country: 'DE' },
  WA1: { make: 'Audi', country: 'DE' },
  WVW: { make: 'Volkswagen', country: 'DE' },
  WVG: { make: 'Volkswagen', country: 'DE' },
  WV2: { make: 'Volkswagen', country: 'DE' },
  WV1: { make: 'Volkswagen', country: 'DE' },
  VSS: { make: 'SEAT', country: 'ES' },
  WDB: { make: 'Mercedes-Benz', country: 'DE' },
  WDC: { make: 'Mercedes-Benz', country: 'DE' },
  WDD: { make: 'Mercedes-Benz', country: 'DE' },
  WDF: { make: 'Mercedes-Benz', country: 'DE' },
  W1K: { make: 'Mercedes-Benz', country: 'DE' },
  WP0: { make: 'Porsche', country: 'DE' },
  WP1: { make: 'Porsche', country: 'DE' },
  WUA: { make: 'Audi', country: 'DE' },
  ZAR: { make: 'Alfa Romeo', country: 'IT' },
  ZFF: { make: 'Ferrari', country: 'IT' },
  ZLA: { make: 'Lancia', country: 'IT' },
  ZFA: { make: 'Fiat', country: 'IT' },
  ZHW: { make: 'Lamborghini', country: 'IT' },
  VF1: { make: 'Renault', country: 'FR' },
  VF3: { make: 'Peugeot', country: 'FR' },
  VF7: { make: 'Citroën', country: 'FR' },
  VF8: { make: 'Citroën', country: 'FR' },
  VSK: { make: 'Volvo', country: 'SE' },
  YV1: { make: 'Volvo', country: 'SE' },
  YS3: { make: 'Saab', country: 'SE' },
  SAJ: { make: 'Jaguar', country: 'GB' },
  SAL: { make: 'Land Rover', country: 'GB' },
  SCA: { make: 'Rolls-Royce', country: 'GB' },
  SCB: { make: 'Bentley', country: 'GB' },
  TMA: { make: 'Opel', country: 'DE' },
  W0L: { make: 'Opel', country: 'DE' },
  // SUA
  '1HG': { make: 'Honda', country: 'US' },
  '1G1': { make: 'Chevrolet', country: 'US' },
  '1FA': { make: 'Ford', country: 'US' },
  '1FT': { make: 'Ford', country: 'US' },
  '2T1': { make: 'Toyota', country: 'US' },
  // Japonia
  JHM: { make: 'Honda', country: 'JP' },
  JTD: { make: 'Toyota', country: 'JP' },
  JN1: { make: 'Nissan', country: 'JP' },
  JN6: { make: 'Nissan', country: 'JP' },
  JM1: { make: 'Mazda', country: 'JP' },
  JMB: { make: 'Mitsubishi', country: 'JP' },
  JS1: { make: 'Suzuki', country: 'JP' },
  JS2: { make: 'Suzuki', country: 'JP' },
  JS3: { make: 'Suzuki', country: 'JP' },
  JF1: { make: 'Subaru', country: 'JP' },
  JF2: { make: 'Subaru', country: 'JP' },
  KNA: { make: 'Kia', country: 'KR' },
  KNB: { make: 'Kia', country: 'KR' },
  KMH: { make: 'Hyundai', country: 'KR' },
  KMF: { make: 'Hyundai', country: 'KR' },
  // România / Europa de Est
  UU1: { make: 'Dacia', country: 'RO' },
  UU3: { make: 'Dacia', country: 'RO' },
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
  const yearChar = vin[9];
  const yearMap: Record<string, number> = {
    A: 1980, B: 1981, C: 1982, D: 1983, E: 1984, F: 1985, G: 1986, H: 1987,
    J: 1988, K: 1989, L: 1990, M: 1991, N: 1992, P: 1993, R: 1994, S: 1995,
    T: 1996, V: 1997, W: 1998, X: 1999, Y: 2000,
    '1': 2001, '2': 2002, '3': 2003, '4': 2004, '5': 2005, '6': 2006,
    '7': 2007, '8': 2008, '9': 2009, A2: 2010,
  };
  // Post-2010: cycle repeats
  const post2010: Record<string, number> = {
    A: 2010, B: 2011, C: 2012, D: 2013, E: 2014, F: 2015, G: 2016,
    H: 2017, J: 2018, K: 2019, L: 2020, M: 2021, N: 2022, P: 2023,
    R: 2024, S: 2025, T: 2026,
  };
  return post2010[yearChar] || yearMap[yearChar] || 0;
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
        year: year || new Date().getFullYear(),
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
      year: year || new Date().getFullYear(),
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
