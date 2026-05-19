/**
 * Peugeot, Citroën, DS & Alpine VIN model lookup
 * WMI codes:
 *   VF3 = Peugeot (France)
 *   VR3 = Peugeot (Slovakia)
 *   VF7 = Citroën (France)
 *   VF8 = Citroën (France)
 *   VR7 = Citroën (Spain/Slovakia)
 *   VS7 = Citroën (Spain)
 *   VF9 = DS Automobiles (France)
 *   VR1 = DS Automobiles (PSA 2017 WMI reassignment)
 *   VR8 = DS Automobiles (PSA-range, unconfirmed)
 *   VFA = Alpine (France)
 */
import { ModelInfo } from './types';

export const PEUGEOT_DB: Record<string, ModelInfo> = {
  // ═══════════════════════════════════════════════════════════
  // PEUGEOT (VF3)
  // ═══════════════════════════════════════════════════════════
  'VF3AA': { model: '108', start: 2014, end: 2021 },
  'VF3BA': { model: '208', start: 2019 },
  'VF3BB': { model: '208 GT', start: 2019 },
  'VF3BC': { model: 'e-208', start: 2019 },
  'VF3CA': { model: '308', start: 2021 },
  'VF3CB': { model: '308 SW', start: 2021 },
  'VF3CC': { model: '308 GT', start: 2021 },
  'VF3DA': { model: '408', start: 2022 },
  'VF3EA': { model: '508', start: 2018 },
  'VF3EB': { model: '508 SW', start: 2018 },
  'VF3EC': { model: '508 PSE', start: 2021 },
  'VF3FA': { model: '2008', start: 2019 },
  'VF3FB': { model: 'e-2008', start: 2019 },
  'VF3GA': { model: '3008', start: 2024 },
  'VF3GB': { model: '3008 GT', start: 2016, end: 2023 },
  'VF3GC': { model: 'e-3008', start: 2024 },
  'VF3HA': { model: '5008', start: 2024 },
  'VF3HB': { model: 'e-5008', start: 2024 },
  'VF3JA': { model: 'Rifter', start: 2018 },
  'VF3KA': { model: 'Traveller', start: 2016 },
  'VF3LA': { model: 'Partner', start: 2018 },
  'VF3MA': { model: 'Expert', start: 2016 },
};

export const CITROEN_DB: Record<string, ModelInfo> = {
  // ═══════════════════════════════════════════════════════════
  // CITROËN (VF7, VF8, VR7)
  // ═══════════════════════════════════════════════════════════
  'VF7AA': { model: 'C1', start: 2014, end: 2022 },
  'VF7BA': { model: 'C3', start: 2016 },
  'VF7BB': { model: 'C3 Aircross', start: 2017 },
  'VF7BC': { model: 'ë-C3', start: 2024 },
  'VF7CA': { model: 'C4', start: 2020 },
  'VF7CB': { model: 'ë-C4', start: 2020 },
  'VF7CC': { model: 'C4 X', start: 2022 },
  'VF7DA': { model: 'C5', start: 2008, end: 2017 },
  'VF7DB': { model: 'C5 X', start: 2022 },
  'VF7DC': { model: 'C5 Aircross', start: 2018 },
  'VF7EA': { model: 'C3 Picasso', start: 2009, end: 2017 },
  'VF7EB': { model: 'C4 Picasso', start: 2013, end: 2018 },
  'VF7EC': { model: 'Grand C4 Picasso', start: 2013, end: 2018 },
  'VF7FA': { model: 'Berlingo', start: 2018 },
  'VF7GA': { model: 'SpaceTourer', start: 2016 },
  'VF7HA': { model: 'Jumpy', start: 2016 },
  'VF8AA': { model: 'C-Elysée', start: 2012 },
  // VR7 = Citroën Vigo (Spain)
  'VR7FA': { model: 'Berlingo', start: 2018 },
  'VR7GA': { model: 'SpaceTourer', start: 2016 },
  'VR7HA': { model: 'Jumpy', start: 2016 },
  'VR7BA': { model: 'C3', start: 2016 },
  'VR7CA': { model: 'C4', start: 2020 },
};

export const DS_DB: Record<string, ModelInfo> = {
  // ═══════════════════════════════════════════════════════════
  // DS AUTOMOBILES (VF9, VR1, VR8)
  // ═══════════════════════════════════════════════════════════
  'VF9AA': { model: 'DS 3', start: 2010, end: 2019 },
  'VF9AB': { model: 'DS 3 Crossback', start: 2019 },
  'VF9BA': { model: 'DS 4', start: 2021 },
  'VF9BB': { model: 'DS 4 Crossback', start: 2016, end: 2019 },
  'VF9CA': { model: 'DS 5', start: 2011, end: 2019 },
  'VF9DA': { model: 'DS 7 Crossback', start: 2018 },
  'VF9EA': { model: 'DS 9', start: 2021 },
  // VR1 = DS Automobiles (confirmed PSA 2017 reassignment)
  'VR1AA': { model: 'DS 3', start: 2019 },
  'VR1AB': { model: 'DS 3 Crossback', start: 2019 },
  'VR1AC': { model: 'DS 3 E-Tense', start: 2019 },
  'VR1BA': { model: 'DS 4', start: 2021 },
  'VR1BB': { model: 'DS 4 E-Tense', start: 2021 },
  'VR1CA': { model: 'DS 5', start: 2011, end: 2019 },
  'VR1DA': { model: 'DS 7 Crossback', start: 2018 },
  'VR1DB': { model: 'DS 7 E-Tense', start: 2020 },
  'VR1EA': { model: 'DS 9', start: 2021 },
  // VR8 = PSA-range WMI (unconfirmed but commonly DS)
  'VR8AA': { model: 'DS 3', start: 2019 },
  'VR8AB': { model: 'DS 3 Crossback', start: 2019 },
  'VR8AC': { model: 'DS 3 E-Tense', start: 2019 },
  'VR8BA': { model: 'DS 4', start: 2021 },
  'VR8BB': { model: 'DS 4 E-Tense', start: 2021 },
  'VR8CA': { model: 'DS 5', start: 2011, end: 2019 },
  'VR8DA': { model: 'DS 7', start: 2018 },
  'VR8DB': { model: 'DS 7 E-Tense', start: 2020 },
  'VR8EA': { model: 'DS 9', start: 2021 },
  'VR8EB': { model: 'DS 9 E-Tense', start: 2021 },
};

export const ALPINE_DB: Record<string, ModelInfo> = {
  // ═══════════════════════════════════════════════════════════
  // ALPINE (VFA)
  // ═══════════════════════════════════════════════════════════
  'VFAAA': { model: 'A110', generation: 'A110', start: 2017 },
  'VFAAB': { model: 'A110 S', generation: 'A110', start: 2019 },
  'VFAAC': { model: 'A110 R', generation: 'A110', start: 2022 },
  'VFABA': { model: 'A290', start: 2024 },
  'VFACA': { model: 'A310', start: 2025 },
};

/** @deprecated Use PEUGEOT_DB instead */
export const PEUGEOT_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(PEUGEOT_DB).map(([k, v]) => [k, v.model])
);

/** @deprecated Use CITROEN_DB instead */
export const CITROEN_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(CITROEN_DB).map(([k, v]) => [k, v.model])
);

/** @deprecated Use DS_DB instead */
export const DS_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(DS_DB).map(([k, v]) => [k, v.model])
);

/** @deprecated Use ALPINE_DB instead */
export const ALPINE_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(ALPINE_DB).map(([k, v]) => [k, v.model])
);
