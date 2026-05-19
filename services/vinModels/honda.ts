/**
 * Honda VIN model lookup
 * WMI codes:
 *   JHM = Honda (Japan)
 *   SHH = Honda (UK/Swindon)
 */
import { ModelInfo } from './types';

export const HONDA_DB: Record<string, ModelInfo> = {
  // ═══════════════════════════════════════════════════════════
  // HONDA JAPAN (JHM)
  // ═══════════════════════════════════════════════════════════
  'JHMAA': { model: 'Jazz', generation: 'GK', start: 2020 },
  'JHMAB': { model: 'Jazz Crosstar', generation: 'GK', start: 2020 },
  'JHMAC': { model: 'Jazz e:HEV', generation: 'GK', start: 2020 },
  'JHMBA': { model: 'Civic', generation: 'FL', start: 2021 },
  'JHMBB': { model: 'Civic Type R', generation: 'FL5', start: 2022 },
  'JHMBC': { model: 'Civic e:HEV', generation: 'FL', start: 2022 },
  'JHMCA': { model: 'CR-V', generation: 'RW', start: 2022 },
  'JHMCB': { model: 'CR-V e:PHEV', generation: 'RW', start: 2022 },
  'JHMDA': { model: 'HR-V', generation: 'RV', start: 2021 },
  'JHMEA': { model: 'ZR-V', start: 2023 },
  'JHMFA': { model: 'e:Ny1', start: 2023 },
  'JHMGA': { model: 'Legend', generation: 'KC2', start: 2014 },
  'JHMHA': { model: 'Accord', generation: 'CV', start: 2018 },

  // ═══════════════════════════════════════════════════════════
  // HONDA UK (SHH)
  // ═══════════════════════════════════════════════════════════
  'SHHAA': { model: 'Jazz', generation: 'GK', start: 2020 },
  'SHHAB': { model: 'Jazz Crosstar', generation: 'GK', start: 2020 },
  'SHHAC': { model: 'Jazz e:HEV', generation: 'GK', start: 2020 },
  'SHHBA': { model: 'Civic', generation: 'FL', start: 2021 },
  'SHHBB': { model: 'Civic Type R', generation: 'FL5', start: 2022 },
  'SHHBC': { model: 'Civic e:HEV', generation: 'FL', start: 2022 },
  'SHHCA': { model: 'CR-V', generation: 'RW', start: 2022 },
  'SHHCB': { model: 'CR-V e:PHEV', generation: 'RW', start: 2022 },
  'SHHDA': { model: 'HR-V', generation: 'RV', start: 2021 },
  'SHHEA': { model: 'ZR-V', start: 2023 },
  'SHHFA': { model: 'e:Ny1', start: 2023 },
  'SHHHA': { model: 'Accord', generation: 'CV', start: 2018 },
};

/** @deprecated Use HONDA_DB instead */
export const HONDA_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(HONDA_DB).map(([k, v]) => [k, v.model])
);
