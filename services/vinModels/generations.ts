export interface GenerationInfo {
  name: string;
  start: number;
  end?: number; // undefined = ongoing/current
}

/**
 * European vehicle generation database.
 * Key = WMI+pos4+pos5 (5-char) OR WMI+pos4+pos5+pos7 (6-char for disambiguation).
 * The 6-char key is checked first (more specific).
 */
export const GENERATION_DB: Record<string, GenerationInfo> = {
  // ── Mercedes-Benz (WDD=cars, WDC=SUVs) ───────────────────────────────────
  'WDD17': { name: 'W176', start: 2012, end: 2018 },   // A-Class
  'WDD24': { name: 'W246', start: 2011, end: 2018 },   // B-Class
  'WDD20': { name: 'W205', start: 2014, end: 2021 },   // C-Class
  'WDD21': { name: 'W213', start: 2016, end: 2023 },   // E-Class
  'WDD22': { name: 'W222', start: 2013, end: 2020 },   // S-Class
  'WDD11': { name: 'C117', start: 2013, end: 2019 },   // CLA
  'WDD23': { name: 'C257', start: 2018, end: 2023 },   // CLS
  'WDC16': { name: 'W166', start: 2011, end: 2018 },   // GLE/M-Class
  'WDC25': { name: 'X253', start: 2015, end: 2022 },   // GLC
  'WDC29': { name: 'X166', start: 2012, end: 2019 },   // GLS
  'WDC19': { name: 'H247', start: 2020 },              // GLA
  'WDC18': { name: 'X247', start: 2019 },              // GLB

  // ── BMW (WBA=standard, WBX=SAV, WBY=electric, WBS=M) ────────────────────
  // 6-char keys (WMI+pos4+pos5+pos7) — checked first for disambiguation
  'WBA31M': { name: 'G70',     start: 2022 },          // 7 Series EU sedan
  'WBA31X': { name: 'G06',     start: 2023 },          // X6 EU 2024
  'WBA11Y': { name: 'G06',     start: 2025 },          // X6 EU 2026
  // 5-char fallback keys
  'WBA31':  { name: 'G11/G12', start: 2015, end: 2022 }, // 7 Series
  'WBA23':  { name: 'G70',     start: 2022 },          // 7 Series new
  'WBA53':  { name: 'G60',     start: 2023 },          // 5 Series
  'WBA13':  { name: 'G60',     start: 2023 },          // M550i
  'WBA11':  { name: 'G06',     start: 2023 },          // X6 EU fallback
  'WBA8E':  { name: 'G20',     start: 2018 },          // 3 Series G20
  'WBA8H':  { name: 'G22',     start: 2021 },          // 4 Series G22
  'WBAJA':  { name: 'G30',     start: 2017, end: 2023 }, // 5 Series G30
  'WBAGN':  { name: 'G11',     start: 2015, end: 2022 }, // 7 Series G11
  // SUV (WBX)
  'WBXHT':  { name: 'F48/U11', start: 2015 },          // X1
  'WBXPC':  { name: 'G01',     start: 2017 },          // X3 G01
  'WBXPA':  { name: 'G05',     start: 2018 },          // X5 G05

  // ── Porsche (WP0=sports, WP1=SUV) ────────────────────────────────────────
  'WP099':  { name: '992',  start: 2019 },             // 911
  'WP09Y':  { name: '9YA',  start: 2018 },             // Cayenne
  'WP097':  { name: '971',  start: 2016, end: 2023 },  // Panamera
  'WP0J1':  { name: 'J1',   start: 2019 },             // Taycan
  'WP195':  { name: '95B',  start: 2014, end: 2018 },  // Macan (1st gen)

  // ── Ferrari (ZFF) ────────────────────────────────────────────────────────
  'ZFF47':  { name: 'F142',     start: 2009, end: 2015 }, // 458
  'ZFF67':  { name: 'F154',     start: 2015, end: 2019 }, // 488
  'ZFF77':  { name: 'F149',     start: 2014, end: 2017 }, // California T
  'ZFFAA':  { name: 'F169',     start: 2020 },            // Roma
  'ZFFBA':  { name: 'F164',     start: 2017, end: 2022 }, // Portofino
  'ZFFCA':  { name: 'F173',     start: 2020 },            // SF90 Stradale
  'ZFFDA':  { name: 'F152A',    start: 2017, end: 2022 }, // 812 Superfast
  'ZFFEA':  { name: 'F154 Evo', start: 2019, end: 2022 }, // F8 Tributo
  'ZFFFA':  { name: 'F175',     start: 2022 },            // Purosangue
  'ZFFGA':  { name: 'F138',     start: 2016, end: 2020 }, // GTC4 Lusso
  'ZFFHA':  { name: 'F154',     start: 2015, end: 2019 }, // 488 GTB

  // ── Lamborghini (ZHW) ────────────────────────────────────────────────────
  'ZHWAA':  { name: 'Urus',    start: 2018 },          // Urus
  'ZHWBA':  { name: 'LP 580',  start: 2014, end: 2022 }, // Huracán
  'ZHWCA':  { name: 'LP700-4', start: 2011, end: 2022 }, // Aventador
  'ZHWCC':  { name: 'LB744',   start: 2023 },          // Revuelto

  // ── Maserati (ZAM) ───────────────────────────────────────────────────────
  'ZAMAA':  { name: 'M157',  start: 2013, end: 2021 }, // Ghibli
  'ZAMBA':  { name: 'M161',  start: 2016 },            // Levante
  'ZAMCA':  { name: 'M139',  start: 2004, end: 2020 }, // Quattroporte
  'ZAMDA':  { name: 'F698',  start: 2022 },            // Grecale
  'ZAMEA':  { name: 'M196',  start: 2023 },            // GranTurismo
  'ZAMFA':  { name: 'MC20',  start: 2021 },            // MC20
};

export function lookupGeneration(eu5Key: string, eu6Key?: string): GenerationInfo | null {
  return (eu6Key ? GENERATION_DB[eu6Key] ?? null : null) ?? GENERATION_DB[eu5Key] ?? null;
}

export function formatGeneration(info: GenerationInfo): string {
  const range = info.end ? `${info.start} - ${info.end}` : `${info.start} - prezent`;
  return `${info.name} [${range}]`;
}
