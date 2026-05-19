/**
 * Lamborghini VIN model lookup
 * WMI: ZHW = Automobili Lamborghini S.p.A., Sant'Agata Bolognese, Italy
 * Key = WMI (3) + VIN[3] + VIN[4]  →  positions 4-5 of VIN
 */
import { ModelInfo } from './types';

export const LAMBORGHINI_DB: Record<string, ModelInfo> = {
  // Urus (L539, 2018–present)
  'ZHWAA':  { model: 'Urus', generation: 'L539', start: 2018 },
  'ZHWAB':  { model: 'Urus Performante', generation: 'L539', start: 2022 },
  'ZHWAC':  { model: 'Urus S', generation: 'L539', start: 2022 },

  // Huracán (LP 580-2, 2014–2022)
  'ZHWBA':  { model: 'Huracán', generation: 'LP 580-2', start: 2014, end: 2022 },
  'ZHWBB':  { model: 'Huracán Evo', generation: 'LP 580-2 Evo', start: 2019, end: 2022 },
  'ZHWBC':  { model: 'Huracán STO', generation: 'LP 580-2', start: 2021, end: 2022 },

  // Aventador (LP700-4, 2011–2022) and Revuelto (LB744, 2023–present)
  'ZHWCA':  { model: 'Aventador', generation: 'LP700-4', start: 2011, end: 2022 },
  'ZHWCB':  { model: 'Aventador S', generation: 'LP740-4', start: 2017, end: 2022 },
  'ZHWCC':  { model: 'Revuelto', generation: 'LB744', start: 2023 },
};

/** @deprecated Use LAMBORGHINI_DB instead */
export const LAMBORGHINI_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(LAMBORGHINI_DB).map(([k, v]) => [k, v.model])
);
