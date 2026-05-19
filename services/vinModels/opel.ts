/**
 * Opel/Vauxhall & Ford Europe VIN model lookup
 * WMI codes:
 *   W0L = Opel (Germany)
 *   X0L = Opel (Belgium)
 *   TMA = Hyundai Motor Manufacturing Czech (Nošovice) — produces some Hyundai models
 *   WF0 = Ford (Germany/Köln)
 *   WF1 = Ford (Germany)
 *   SFA = Ford (UK/Southampton)
 *   VS6 = Ford (Spain/Valencia)
 */
import { ModelInfo } from './types';

export const OPEL_DB: Record<string, ModelInfo> = {
  // ═══════════════════════════════════════════════════════════
  // OPEL / VAUXHALL (W0L)
  // ═══════════════════════════════════════════════════════════
  'W0LAA': { model: 'Corsa', generation: 'F', start: 2019 },
  'W0LAB': { model: 'Corsa-e', generation: 'F', start: 2019 },
  'W0LAC': { model: 'Corsa OPC', generation: 'E', start: 2015, end: 2019 },
  'W0LBA': { model: 'Astra', generation: 'L', start: 2021 },
  'W0LBB': { model: 'Astra Sports Tourer', generation: 'L', start: 2022 },
  'W0LBC': { model: 'Astra GSe', generation: 'L', start: 2022 },
  'W0LBD': { model: 'Astra Electric', generation: 'L', start: 2023 },
  'W0LCA': { model: 'Insignia', generation: 'B', start: 2017, end: 2022 },
  'W0LCB': { model: 'Insignia Sports Tourer', generation: 'B', start: 2017, end: 2022 },
  'W0LCC': { model: 'Insignia Grand Sport', generation: 'B', start: 2017, end: 2022 },
  'W0LDA': { model: 'Mokka', generation: 'B', start: 2020 },
  'W0LDB': { model: 'Mokka-e', generation: 'B', start: 2020 },
  'W0LEA': { model: 'Crossland', start: 2021 },
  'W0LEB': { model: 'Crossland X', start: 2017, end: 2021 },
  'W0LFA': { model: 'Grandland', start: 2021 },
  'W0LFB': { model: 'Grandland X', start: 2017, end: 2021 },
  'W0LFC': { model: 'Grandland GSe', start: 2022 },
  'W0LGA': { model: 'Zafira', generation: 'C', start: 2011, end: 2019 },
  'W0LGB': { model: 'Zafira Tourer', generation: 'C', start: 2011, end: 2019 },
  'W0LHA': { model: 'Vectra', generation: 'C', start: 2002, end: 2008 },
  'W0LHB': { model: 'Vectra Caravan', generation: 'C', start: 2003, end: 2008 },
  'W0LJA': { model: 'Meriva', generation: 'B', start: 2010, end: 2017 },
  'W0LKA': { model: 'Combo', start: 2018 },
  'W0LLA': { model: 'Vivaro', start: 2019 },
  'W0LMA': { model: 'Cascada', start: 2013, end: 2019 },
  'W0LNA': { model: 'Adam', start: 2012, end: 2019 },
  'W0LPA': { model: 'Karl / Viva', start: 2015, end: 2019 },
  // TMA = Hyundai Motor Manufacturing Czech (Nošovice)
  'TMAAA': { model: 'i20', start: 2020 },
  'TMABA': { model: 'i30', start: 2017 },
  'TMACA': { model: 'Tucson', start: 2020 },
};

export const FORD_DB: Record<string, ModelInfo> = {
  // ═══════════════════════════════════════════════════════════
  // FORD EUROPE (WF0, WF1, SFA, VS6)
  // ═══════════════════════════════════════════════════════════
  'WF0AA': { model: 'Fiesta', start: 2017, end: 2023 },
  'WF0AB': { model: 'Fiesta ST', start: 2017, end: 2023 },
  'WF0BA': { model: 'Focus', start: 2018 },
  'WF0BB': { model: 'Focus ST', start: 2019 },
  'WF0BC': { model: 'Focus RS', start: 2015, end: 2018 },
  'WF0CA': { model: 'Mondeo', start: 2022 },
  'WF0CB': { model: 'Mondeo Hybrid', start: 2019, end: 2022 },
  'WF0DA': { model: 'Kuga', start: 2019 },
  'WF0DB': { model: 'Kuga PHEV', start: 2020 },
  'WF0EA': { model: 'EcoSport', start: 2017, end: 2022 },
  'WF0FA': { model: 'Puma', start: 2019 },
  'WF0FB': { model: 'Puma ST', start: 2020 },
  'WF0GA': { model: 'Galaxy', start: 2015 },
  'WF0HA': { model: 'S-Max', start: 2015 },
  'WF0JA': { model: 'Mustang Mach-E', start: 2020 },
  'WF0KA': { model: 'Explorer', start: 2023 },
  'WF0LA': { model: 'Tourneo Connect', start: 2022 },
  'WF0MA': { model: 'Transit Connect', start: 2014 },
  'WF0NA': { model: 'Transit Custom', start: 2013 },
  'WF0PA': { model: 'Transit', start: 2013 },
  // WF1 = Ford additional plant
  'WF1AA': { model: 'Fiesta', start: 2017, end: 2023 },
  'WF1BA': { model: 'Focus', start: 2018 },
  'WF1CA': { model: 'Mondeo', start: 2015 },
  'WF1DA': { model: 'Kuga', start: 2019 },
  'WF1EA': { model: 'EcoSport', start: 2017, end: 2022 },
  'WF1FA': { model: 'Puma', start: 2019 },
  // SFA = Ford UK
  'SFAAA': { model: 'Fiesta', start: 2017, end: 2023 },
  'SFABA': { model: 'Focus', start: 2018 },
  'SFACA': { model: 'Mondeo', start: 2015 },
  'SFADA': { model: 'Kuga', start: 2019 },
  'SFAFA': { model: 'Puma', start: 2019 },
  // VS6 = Ford Spain
  'VS6AA': { model: 'Fiesta', start: 2017, end: 2023 },
  'VS6BA': { model: 'Focus', start: 2018 },
  'VS6FA': { model: 'Puma', start: 2019 },
};

/** @deprecated Use OPEL_DB instead */
export const OPEL_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(OPEL_DB).map(([k, v]) => [k, v.model])
);

/** @deprecated Use FORD_DB instead */
export const FORD_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(FORD_DB).map(([k, v]) => [k, v.model])
);
