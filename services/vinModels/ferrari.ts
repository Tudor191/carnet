/**
 * Ferrari VIN model lookup
 * WMI: ZFF = Ferrari S.p.A., Maranello, Italy
 * Key = WMI (3) + VIN[3] + VIN[4]  →  positions 4-5 of VIN
 */
import { ModelInfo } from './types';

export const FERRARI_DB: Record<string, ModelInfo> = {
  // Classic/older models
  'ZFF47':  { model: '458 Italia', generation: 'F142', start: 2009, end: 2015 },
  'ZFF67':  { model: '488 GTB', generation: 'F154', start: 2015, end: 2019 },
  'ZFF68':  { model: '488 Spider', generation: 'F154', start: 2015, end: 2019 },
  'ZFF76':  { model: 'California', generation: 'F149M', start: 2012, end: 2014 },
  'ZFF77':  { model: 'California T', generation: 'F149', start: 2014, end: 2017 },

  // Roma family (F169, 2020–present)
  'ZFFAA':  { model: 'Roma', generation: 'F169', start: 2020 },
  'ZFFAB':  { model: 'Roma Spider', generation: 'F169A', start: 2023 },

  // 296 GTB/GTS (F171, 2022–present)
  'ZFFAC':  { model: '296 GTB', generation: 'F171', start: 2022 },
  'ZFFAD':  { model: '296 GTS', generation: 'F171', start: 2023 },
  'ZFFAE':  { model: '296 GT3', generation: 'F171', start: 2023 },

  // Portofino (F164, 2017–2022)
  'ZFFBA':  { model: 'Portofino', generation: 'F164', start: 2017, end: 2022 },
  'ZFFBB':  { model: 'Portofino M', generation: 'F164', start: 2020, end: 2022 },

  // SF90 family (F173, 2020–present)
  'ZFFCA':  { model: 'SF90 Stradale', generation: 'F173', start: 2020 },
  'ZFFCB':  { model: 'SF90 Spider', generation: 'F173A', start: 2021 },

  // 812 family (F152A, 2017–2022)
  'ZFFDA':  { model: '812 Superfast', generation: 'F152A', start: 2017, end: 2022 },
  'ZFFDB':  { model: '812 GTS', generation: 'F152A', start: 2019, end: 2022 },
  'ZFFDC':  { model: '812 Competizione', generation: 'F152A', start: 2021, end: 2022 },

  // F8 family (F154 Evo, 2019–2022)
  'ZFFEA':  { model: 'F8 Tributo', generation: 'F154 Evo', start: 2019, end: 2022 },
  'ZFFEB':  { model: 'F8 Spider', generation: 'F154 Evo', start: 2019, end: 2022 },

  // Purosangue (F175, 2022–present)
  'ZFFFA':  { model: 'Purosangue', generation: 'F175', start: 2022 },
  'ZFFFB':  { model: 'Purosangue', generation: 'F175', start: 2022 },

  // GTC4 Lusso (F138, 2016–2020)
  'ZFFGA':  { model: 'GTC4 Lusso', generation: 'F138', start: 2016, end: 2020 },

  // 488 GTB duplicate WMI
  'ZFFHA':  { model: '488 GTB', generation: 'F154', start: 2015, end: 2019 },
};

/** @deprecated Use FERRARI_DB instead */
export const FERRARI_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(FERRARI_DB).map(([k, v]) => [k, v.model])
);
