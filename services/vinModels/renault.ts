/**
 * Renault & Dacia VIN model lookup
 * WMI codes:
 *   VF1, VF2, VF6, VNE = Renault (various plants)
 *   UU1, UU3 = Dacia (Romania)
 */
import { ModelInfo } from './types';

export const RENAULT_DB: Record<string, ModelInfo> = {
  // ═══════════════════════════════════════════════════════════
  // RENAULT (VF1)
  // ═══════════════════════════════════════════════════════════
  'VF1AA': { model: 'Clio', start: 2019 },
  'VF1AB': { model: 'Clio RS', start: 2013, end: 2019 },
  'VF1AC': { model: 'Clio E-Tech', start: 2020 },
  'VF1BA': { model: 'Megane', start: 2016 },
  'VF1BB': { model: 'Megane RS', start: 2017, end: 2023 },
  'VF1BC': { model: 'Megane E-Tech', start: 2022 },
  'VF1CA': { model: 'Laguna', start: 2007, end: 2015 },
  'VF1CB': { model: 'Laguna Coupé', start: 2008, end: 2015 },
  'VF1DA': { model: 'Espace', start: 2014 },
  'VF1EA': { model: 'Scenic', start: 2016 },
  'VF1EB': { model: 'Grand Scenic', start: 2016 },
  'VF1EC': { model: 'Scenic E-Tech', start: 2024 },
  'VF1FA': { model: 'Trafic', start: 2014 },
  'VF1GA': { model: 'Kangoo', start: 2021 },
  'VF1GB': { model: 'Kangoo E-Tech', start: 2021 },
  'VF1HA': { model: 'Kadjar', start: 2015, end: 2022 },
  'VF1JA': { model: 'Koleos', start: 2017 },
  'VF1KA': { model: 'Captur', start: 2019 },
  'VF1KB': { model: 'Captur E-Tech', start: 2020 },
  'VF1LA': { model: 'Twingo', start: 2014, end: 2022 },
  'VF1LB': { model: 'Twingo Electric', start: 2020, end: 2022 },
  'VF1MA': { model: 'Zoe', start: 2012, end: 2023 },
  'VF1NA': { model: 'Arkana', start: 2021 },
  'VF1PA': { model: 'Austral', start: 2022 },
  'VF1QA': { model: 'Rafale', start: 2023 },
  'VF1RA': { model: 'Talisman', start: 2015, end: 2022 },
  'VF1SA': { model: 'Safrane', start: 1992, end: 1996 },

  // RENAULT additional plants (VF2, VF6, VNE)
  'VF2AA': { model: 'Clio', start: 2019 },
  'VF2BA': { model: 'Megane', start: 2016 },
  'VF2CA': { model: 'Laguna', start: 2007, end: 2015 },
  'VF6AA': { model: 'Clio', start: 2019 },
  'VF6BA': { model: 'Megane', start: 2016 },
  'VF6KA': { model: 'Captur', start: 2019 },
  'VNEAA': { model: 'Clio', start: 2019 },
  'VNEBA': { model: 'Megane', start: 2016 },
  'VNEKA': { model: 'Captur', start: 2019 },
};

export const DACIA_DB: Record<string, ModelInfo> = {
  // ═══════════════════════════════════════════════════════════
  // DACIA (UU1, UU3)
  // ═══════════════════════════════════════════════════════════
  'UU1AA': { model: 'Duster', start: 2017 },
  'UU1AB': { model: 'Duster 4WD', start: 2017 },
  'UU1BA': { model: 'Logan', start: 2013 },
  'UU1BB': { model: 'Logan MCV', start: 2013 },
  'UU1CA': { model: 'Sandero', start: 2012 },
  'UU1CB': { model: 'Sandero Stepway', start: 2012 },
  'UU1DA': { model: 'Lodgy', start: 2012, end: 2022 },
  'UU1EA': { model: 'Dokker', start: 2012, end: 2022 },
  'UU1FA': { model: 'Spring', start: 2021 },
  'UU1GA': { model: 'Jogger', start: 2021 },
  'UU1HA': { model: 'Bigster', start: 2025 },
  'UU3AA': { model: 'Duster', start: 2017 },
  'UU3BA': { model: 'Logan', start: 2013 },
  'UU3CA': { model: 'Sandero', start: 2012 },
};

/** @deprecated Use RENAULT_DB instead */
export const RENAULT_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(RENAULT_DB).map(([k, v]) => [k, v.model])
);

/** @deprecated Use DACIA_DB instead */
export const DACIA_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(DACIA_DB).map(([k, v]) => [k, v.model])
);
