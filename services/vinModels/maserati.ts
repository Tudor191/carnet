/**
 * Maserati VIN model lookup
 * WMI: ZAM = Maserati S.p.A., Modena, Italy
 * Key = WMI (3) + VIN[3] + VIN[4]  →  positions 4-5 of VIN
 */
import { ModelInfo } from './types';

export const MASERATI_DB: Record<string, ModelInfo> = {
  // Ghibli (M157, 2013–2021)
  'ZAMAA':  { model: 'Ghibli', generation: 'M157', start: 2013, end: 2021 },
  'ZAMAB':  { model: 'Ghibli Hybrid', generation: 'M157', start: 2020, end: 2021 },

  // Levante (M161, 2016–present)
  'ZAMBA':  { model: 'Levante', generation: 'M161', start: 2016 },
  'ZAMBB':  { model: 'Levante GT', generation: 'M161', start: 2018 },

  // Quattroporte (M139, 2004–2020)
  'ZAMCA':  { model: 'Quattroporte', generation: 'M139', start: 2004, end: 2020 },

  // Grecale (F698, 2022–present)
  'ZAMDA':  { model: 'Grecale', generation: 'F698', start: 2022 },
  'ZAMDB':  { model: 'Grecale GT', generation: 'F698', start: 2022 },

  // GranTurismo (M196, 2023–present)
  'ZAMEA':  { model: 'GranTurismo', generation: 'M196', start: 2023 },

  // MC20 (2021–present)
  'ZAMFA':  { model: 'MC20', generation: 'MC20', start: 2021 },
};

/** @deprecated Use MASERATI_DB instead */
export const MASERATI_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(MASERATI_DB).map(([k, v]) => [k, v.model])
);
