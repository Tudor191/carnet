import { VinLookupResult } from '../types';

// Romanian car color map (translated)
const COLOR_MAP: Record<string, string> = {
  WHITE: 'Alb',
  BLACK: 'Negru',
  SILVER: 'Argintiu',
  GRAY: 'Gri',
  GREY: 'Gri',
  RED: 'Roșu',
  BLUE: 'Albastru',
  GREEN: 'Verde',
  YELLOW: 'Galben',
  ORANGE: 'Portocaliu',
  BROWN: 'Maro',
  BEIGE: 'Bej',
  GOLD: 'Auriu',
};

const FUEL_MAP: Record<string, string> = {
  GASOLINE: 'Benzină',
  DIESEL: 'Motorină',
  ELECTRIC: 'Electric',
  HYBRID: 'Hibrid',
  'PLUG-IN HYBRID': 'Hibrid plug-in',
  GAS: 'Gaz (GPL)',
  NATURAL_GAS: 'Gaz natural (CNG)',
};

const TRANSMISSION_MAP: Record<string, string> = {
  MANUAL: 'Manuală',
  AUTOMATIC: 'Automată',
  CVT: 'CVT',
  'SEMI-AUTOMATIC': 'Semi-automată',
};

function translateColor(color: string): string {
  return COLOR_MAP[color?.toUpperCase()] || color || 'Necunoscut';
}

function translateFuel(fuel: string): string {
  return FUEL_MAP[fuel?.toUpperCase()] || fuel || 'Necunoscut';
}

function translateTransmission(tr: string): string {
  return TRANSMISSION_MAP[tr?.toUpperCase()] || tr || 'Necunoscută';
}

// Estimate horsepower from displacement and cylinders
function estimateHorsepower(displacement: number, cylinders: number, fuelType: string): number {
  if (!displacement || !cylinders) return 0;
  const base = (displacement / 1000) * 60;
  const cylinderBonus = cylinders * 5;
  const fuelBonus = fuelType.includes('DIESEL') ? 10 : 0;
  return Math.round(base + cylinderBonus + fuelBonus);
}

export async function lookupVin(vin: string): Promise<VinLookupResult> {
  if (!vin || vin.length !== 17) {
    return { error: 'Numărul de șasiu trebuie să aibă exact 17 caractere.', make: '', model: '', year: 0, color: 'Necunoscut', engineType: '', engineDisplacement: '', horsepower: 0, fuelType: '', transmission: '', bodyType: '' };
  }

  try {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin.toUpperCase()}?format=json`;
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    const data = await response.json();

    if (!data?.Results) {
      return buildErrorResult('Datele vehiculului nu au putut fi găsite.');
    }

    const results: Array<{ Variable: string; Value: string | null }> = data.Results;
    const get = (variable: string) => results.find(r => r.Variable === variable)?.Value || '';

    const make = get('Make');
    const model = get('Model');
    const yearStr = get('Model Year');
    const year = yearStr ? parseInt(yearStr, 10) : 0;
    const cylinders = parseInt(get('Engine Number of Cylinders') || '0', 10);
    const displacementCC = get('Displacement (CC)');
    const displacementL = get('Displacement (L)');
    const fuelTypeRaw = get('Fuel Type - Primary');
    const transmissionRaw = get('Transmission Style');
    const bodyType = get('Body Class') || 'Sedan';

    const displacement = displacementL
      ? `${parseFloat(displacementL).toFixed(1)}L`
      : displacementCC
      ? `${Math.round(parseFloat(displacementCC))} cc`
      : 'Necunoscut';

    const fuelType = translateFuel(fuelTypeRaw);
    const transmission = translateTransmission(transmissionRaw);
    const hp = estimateHorsepower(
      displacementCC ? parseFloat(displacementCC) : 0,
      cylinders,
      fuelTypeRaw
    );

    // Determine engine type label
    const engineCylindersLabel = cylinders
      ? `${cylinders} cilindri`
      : '';
    const engineType = [fuelType, engineCylindersLabel].filter(Boolean).join(', ');

    if (!make || !model) {
      return buildErrorResult('VIN-ul introdus nu a returnat date valide. Verificați numărul de șasiu.');
    }

    return {
      make: make.charAt(0) + make.slice(1).toLowerCase(),
      model,
      year,
      color: 'Necunoscut',
      engineType,
      engineDisplacement: displacement,
      horsepower: hp,
      fuelType,
      transmission,
      bodyType,
    };
  } catch (err: any) {
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      return buildErrorResult('Conexiunea a expirat. Verificați internetul și încercați din nou.');
    }
    return buildErrorResult('Eroare la interogarea bazei de date. Verificați conexiunea la internet.');
  }
}

function buildErrorResult(error: string): VinLookupResult {
  return { error, make: '', model: '', year: 0, color: 'Necunoscut', engineType: '', engineDisplacement: '', horsepower: 0, fuelType: '', transmission: '', bodyType: '' };
}
