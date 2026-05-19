/**
 * Hyundai, Kia & Genesis VIN model lookup
 * WMI codes:
 *   KMH, KMF, KMJ, TMA = Hyundai (Korea, various plants)
 *   KNA, KND, KNM, KNB = Kia (Korea)
 *   U5Y, U6Y = Kia (Slovakia)
 *   KMT = Genesis (Korea)
 *   KPT, KLA = SsangYong (Korea)
 */
import { ModelInfo } from './types';

export const HYUNDAI_DB: Record<string, ModelInfo> = {
  // ═══════════════════════════════════════════════════════════
  // HYUNDAI (KMH, KMF)
  // ═══════════════════════════════════════════════════════════
  'KMHAA': { model: 'i10', generation: 'AC3', start: 2019 },
  'KMHAB': { model: 'i10 N Line', generation: 'AC3', start: 2020 },
  'KMHBA': { model: 'i20', generation: 'BC3', start: 2020 },
  'KMHBB': { model: 'i20 N', generation: 'BC3', start: 2021 },
  'KMHBC': { model: 'i20 N Line', generation: 'BC3', start: 2020 },
  'KMHCA': { model: 'i30', generation: 'PD', start: 2017 },
  'KMHCB': { model: 'i30 N', generation: 'PD', start: 2017 },
  'KMHCC': { model: 'i30 Fastback', generation: 'PD', start: 2017 },
  'KMHCD': { model: 'i30 SW', generation: 'PD', start: 2017 },
  'KMHDA': { model: 'i40', generation: 'VF', start: 2011, end: 2019 },
  'KMHDB': { model: 'i40 Tourer', generation: 'VF', start: 2011, end: 2019 },
  'KMHEA': { model: 'Elantra', generation: 'CN7', start: 2020 },
  'KMHFA': { model: 'Tucson', generation: 'NX4', start: 2020 },
  'KMHFB': { model: 'Tucson PHEV', generation: 'NX4', start: 2021 },
  'KMHGA': { model: 'Santa Fe', generation: 'MX5', start: 2023 },
  'KMHGB': { model: 'Santa Fe PHEV', generation: 'MX5', start: 2023 },
  'KMHHA': { model: 'Kona', generation: 'SX2', start: 2023 },
  'KMHHB': { model: 'Kona Electric', generation: 'SX2', start: 2023 },
  'KMHJA': { model: 'IONIQ', generation: 'AE', start: 2016, end: 2022 },
  'KMHJB': { model: 'IONIQ 5', generation: 'NE', start: 2021 },
  'KMHJC': { model: 'IONIQ 6', generation: 'CE', start: 2022 },
  'KMHJD': { model: 'IONIQ 9', start: 2024 },
  'KMHKA': { model: 'Staria', start: 2021 },
  'KMHLA': { model: 'Bayon', generation: 'BC3', start: 2021 },
  'KMHMA': { model: 'Nexo', start: 2018 },
  'KMFBA': { model: 'i20', generation: 'BC3', start: 2020 },
  'KMFCA': { model: 'i30', generation: 'PD', start: 2017 },
  'KMFFA': { model: 'Tucson', generation: 'NX4', start: 2020 },
  // TMA = Hyundai Motor Manufacturing Czech (Nošovice) — also listed in opel.ts
  'TMAAA': { model: 'i20', generation: 'BC3', start: 2020 },
  'TMABA': { model: 'i30', generation: 'PD', start: 2017 },
  'TMACA': { model: 'Tucson', generation: 'NX4', start: 2020 },
};

export const KIA_DB: Record<string, ModelInfo> = {
  // ═══════════════════════════════════════════════════════════
  // KIA (KNA, KND, U5Y, U6Y)
  // ═══════════════════════════════════════════════════════════
  'KNAAA': { model: 'Picanto', generation: 'JA', start: 2017 },
  'KNAAB': { model: 'Picanto GT Line', generation: 'JA', start: 2017 },
  'KNABA': { model: 'Rio', generation: 'YB', start: 2017 },
  'KNABB': { model: 'Rio GT Line', generation: 'YB', start: 2017 },
  'KNACA': { model: 'Ceed', generation: 'CD', start: 2018 },
  'KNACB': { model: 'Ceed GT', generation: 'CD', start: 2019 },
  'KNACC': { model: 'ProCeed', generation: 'CD', start: 2018 },
  'KNACD': { model: 'XCeed', generation: 'CD', start: 2019 },
  'KNADA': { model: 'Stonic', generation: 'YB', start: 2017 },
  'KNAEA': { model: 'Soul', generation: 'SK3', start: 2019 },
  'KNAEB': { model: 'Soul EV', generation: 'SK3', start: 2019 },
  'KNAFA': { model: 'Sportage', generation: 'NQ5', start: 2021 },
  'KNAFB': { model: 'Sportage PHEV', generation: 'NQ5', start: 2022 },
  'KNAGA': { model: 'Niro', generation: 'SG2', start: 2022 },
  'KNAGB': { model: 'Niro EV', generation: 'SG2', start: 2022 },
  'KNAGC': { model: 'Niro PHEV', generation: 'SG2', start: 2022 },
  'KNAHA': { model: 'Sorento', generation: 'MQ4', start: 2020 },
  'KNAHB': { model: 'Sorento PHEV', generation: 'MQ4', start: 2021 },
  'KNAJA': { model: 'EV6', generation: 'CV', start: 2021 },
  'KNAJB': { model: 'EV6 GT', generation: 'CV', start: 2022 },
  'KNAKA': { model: 'EV9', generation: 'MV', start: 2023 },
  'KNALA': { model: 'Carnival', generation: 'KA4', start: 2020 },
  'KNAMA': { model: 'Telluride', generation: 'ON', start: 2019 },
  'KNANA': { model: 'EV3', start: 2024 },
  'KNDAA': { model: 'Picanto', generation: 'JA', start: 2017 },
  'KNDCA': { model: 'Ceed', generation: 'CD', start: 2018 },
  'KNDFA': { model: 'Sportage', generation: 'NQ5', start: 2021 },
  'KNDHA': { model: 'Sorento', generation: 'MQ4', start: 2020 },
  // Slovakia plants (U5Y, U6Y)
  'U5YAA': { model: 'Picanto', generation: 'JA', start: 2017 },
  'U6YAA': { model: 'Picanto', generation: 'JA', start: 2017 },
  'U5YCA': { model: 'Ceed', generation: 'CD', start: 2018 },
  'U6YCA': { model: 'Ceed', generation: 'CD', start: 2018 },
  'U5YCB': { model: 'ProCeed', generation: 'CD', start: 2018 },
  'U6YCB': { model: 'ProCeed', generation: 'CD', start: 2018 },
  'U5YDA': { model: 'Stonic', generation: 'YB', start: 2017 },
  'U6YDA': { model: 'Stonic', generation: 'YB', start: 2017 },
  'U5YFA': { model: 'Sportage', generation: 'NQ5', start: 2021 },
  'U6YFA': { model: 'Sportage', generation: 'NQ5', start: 2021 },
  'U5YJA': { model: 'EV6', generation: 'CV', start: 2021 },
  'U6YJA': { model: 'EV6', generation: 'CV', start: 2021 },
  'U5YKA': { model: 'EV9', generation: 'MV', start: 2023 },
  'U6YKA': { model: 'EV9', generation: 'MV', start: 2023 },
};

export const GENESIS_DB: Record<string, ModelInfo> = {
  // ═══════════════════════════════════════════════════════════
  // GENESIS (KMT)
  // ═══════════════════════════════════════════════════════════
  'KMTAA': { model: 'G70', generation: 'IK', start: 2017 },
  'KMTAB': { model: 'G70 Shooting Brake', generation: 'IK', start: 2021 },
  'KMTBA': { model: 'G80', generation: 'RG3', start: 2020 },
  'KMTCA': { model: 'G90', generation: 'RS4', start: 2022 },
  'KMTDA': { model: 'GV70', generation: 'JK1', start: 2021 },
  'KMTDB': { model: 'GV70 Electrified', generation: 'JK1', start: 2022 },
  'KMTEA': { model: 'GV80', generation: 'JX1', start: 2020 },
  'KMTFA': { model: 'GV60', generation: 'JW1', start: 2021 },
  'KMTGA': { model: 'Electrified G80', generation: 'RG3', start: 2021 },
};

export const SSANGYONG_DB: Record<string, ModelInfo> = {
  // ═══════════════════════════════════════════════════════════
  // SSANGYONG (KPT, KLA)
  // ═══════════════════════════════════════════════════════════
  'KPTAA': { model: 'Tivoli', start: 2015 },
  'KPTAB': { model: 'Tivoli Electric', start: 2020 },
  'KPTBA': { model: 'Korando', start: 2019 },
  'KPTBB': { model: 'Korando e-Motion', start: 2021 },
  'KPTCA': { model: 'Rexton', start: 2017 },
  'KPTCB': { model: 'Rexton Sport', start: 2018 },
  'KPTDA': { model: 'Musso', start: 2018 },
  'KLAAA': { model: 'Tivoli', start: 2015 },
  'KLABA': { model: 'Korando', start: 2019 },
  'KLACA': { model: 'Rexton', start: 2017 },
};

/** @deprecated Use HYUNDAI_DB instead */
export const HYUNDAI_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(HYUNDAI_DB).map(([k, v]) => [k, v.model])
);

/** @deprecated Use KIA_DB instead */
export const KIA_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(KIA_DB).map(([k, v]) => [k, v.model])
);

/** @deprecated Use GENESIS_DB instead */
export const GENESIS_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(GENESIS_DB).map(([k, v]) => [k, v.model])
);

/** @deprecated Use SSANGYONG_DB instead */
export const SSANGYONG_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(SSANGYONG_DB).map(([k, v]) => [k, v.model])
);
