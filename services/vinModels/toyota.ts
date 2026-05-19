/**
 * Toyota & Lexus VIN model lookup
 * WMI codes:
 *   SB1 = Toyota (UK/Burnaston)
 *   VNK = Toyota (France/Valenciennes)
 *   JTD, JTE, JTK, JTM, JTN, JT2, JT3 = Toyota (Japan, various plants)
 *   JTJ = Lexus (Japan)
 *   JTH = Lexus (Japan)
 *   JTL = Lexus (Japan)
 */
import { ModelInfo } from './types';

export const TOYOTA_DB: Record<string, ModelInfo> = {
  // ═══════════════════════════════════════════════════════════
  // TOYOTA EUROPE (SB1)
  // ═══════════════════════════════════════════════════════════
  'SB1AA': { model: 'Yaris', generation: 'XP210', start: 2020 },
  'SB1AB': { model: 'Yaris GR', generation: 'XP210', start: 2020 },
  'SB1AC': { model: 'Yaris Cross', generation: 'MXPB', start: 2021 },
  'SB1BA': { model: 'Corolla', generation: 'E210', start: 2018 },
  'SB1BB': { model: 'Corolla Touring Sports', generation: 'E210', start: 2018 },
  'SB1CA': { model: 'C-HR', generation: 'AX10', start: 2016 },
  'SB1CB': { model: 'C-HR PHEV', generation: 'AX10', start: 2023 },
  'SB1DA': { model: 'RAV4', generation: 'XA50', start: 2018 },
  'SB1DB': { model: 'RAV4 PHEV', generation: 'XA50', start: 2019 },
  'SB1EA': { model: 'Camry', generation: 'XV70', start: 2019 },
  'SB1FA': { model: 'Highlander', generation: 'XU70', start: 2020 },
  'SB1GA': { model: 'Land Cruiser', generation: 'J300', start: 2021 },
  'SB1GB': { model: 'Land Cruiser Prado', generation: 'J150', start: 2009 },
  'SB1HA': { model: 'bZ4X', start: 2022 },
  'SB1JA': { model: 'Aygo X', generation: 'A30', start: 2022 },
  'SB1KA': { model: 'Proace', start: 2016 },

  // TOYOTA JAPAN (JTD)
  'JTDBA': { model: 'Corolla', generation: 'E210', start: 2018 },
  'JTDCA': { model: 'Avensis', generation: 'T270', start: 2008, end: 2018 },
  'JTDDA': { model: 'RAV4', generation: 'XA50', start: 2018 },
  'JTDEA': { model: 'Auris', generation: 'E180', start: 2012, end: 2018 },
  'JTDFA': { model: 'Yaris', generation: 'XP210', start: 2020 },
  'JTDGA': { model: 'C-HR', generation: 'AX10', start: 2016 },
  'JTDHA': { model: 'Hilux', generation: 'AN120', start: 2015 },
  'JTDJA': { model: 'Land Cruiser', generation: 'J300', start: 2021 },

  // ═══════════════════════════════════════════════════════════
  // TOYOTA FRANCE (VNK)
  // ═══════════════════════════════════════════════════════════
  'VNKAA': { model: 'Yaris', generation: 'XP210', start: 2020 },
  'VNKAB': { model: 'Yaris GR', generation: 'XP210', start: 2020 },
  'VNKAC': { model: 'Yaris Cross', generation: 'MXPB', start: 2021 },
  'VNKBA': { model: 'Corolla', generation: 'E210', start: 2018 },
  'VNKBB': { model: 'Corolla Touring Sports', generation: 'E210', start: 2018 },
  'VNKCA': { model: 'C-HR', generation: 'AX10', start: 2016 },
  'VNKCB': { model: 'C-HR PHEV', generation: 'AX10', start: 2023 },
  'VNKDA': { model: 'RAV4', generation: 'XA50', start: 2018 },
  'VNKDB': { model: 'RAV4 PHEV', generation: 'XA50', start: 2019 },
  'VNKEA': { model: 'Camry', generation: 'XV70', start: 2019 },
  'VNKHA': { model: 'bZ4X', start: 2022 },
  'VNKJA': { model: 'Aygo X', generation: 'A30', start: 2022 },
  'VNKKA': { model: 'Proace', start: 2016 },
  'VNKKB': { model: 'Proace City', start: 2019 },

  // ═══════════════════════════════════════════════════════════
  // TOYOTA JAPAN variants (JTE, JTK, JTM, JTN, JT2, JT3)
  // ═══════════════════════════════════════════════════════════
  'JTEBA': { model: 'Corolla', generation: 'E210', start: 2018 },
  'JTECA': { model: 'RAV4', generation: 'XA50', start: 2018 },
  'JTEDA': { model: 'Avensis', generation: 'T270', start: 2008, end: 2018 },
  'JTEFA': { model: 'Yaris', generation: 'XP210', start: 2020 },
  'JTEGA': { model: 'C-HR', generation: 'AX10', start: 2016 },
  'JTEHA': { model: 'Land Cruiser', generation: 'J300', start: 2021 },
  'JTKBA': { model: 'Corolla', generation: 'E210', start: 2018 },
  'JTKCA': { model: 'Camry', generation: 'XV70', start: 2019 },
  'JTKFA': { model: 'Yaris', generation: 'XP210', start: 2020 },
  'JTMBA': { model: 'RAV4', generation: 'XA50', start: 2018 },
  'JTMCA': { model: 'Highlander', generation: 'XU70', start: 2020 },
  'JTMDA': { model: 'Land Cruiser', generation: 'J300', start: 2021 },
  'JTNBA': { model: 'Corolla', generation: 'E210', start: 2018 },
  'JTNCA': { model: 'Camry', generation: 'XV70', start: 2019 },
  'JTNDA': { model: 'RAV4', generation: 'XA50', start: 2018 },
  'JT2BA': { model: 'Corolla', generation: 'E210', start: 2018 },
  'JT3BA': { model: 'Land Cruiser', generation: 'J300', start: 2021 },
};

export const LEXUS_DB: Record<string, ModelInfo> = {
  // ═══════════════════════════════════════════════════════════
  // LEXUS (JTJ, JTH, JTL)
  // ═══════════════════════════════════════════════════════════
  'JTJAA': { model: 'UX', generation: 'ZA10', start: 2018 },
  'JTJBA': { model: 'NX', generation: 'AZ20', start: 2021 },
  'JTJCA': { model: 'RX', generation: 'AL30', start: 2022 },
  'JTJDA': { model: 'GX', generation: 'J250', start: 2023 },
  'JTJEA': { model: 'LX', generation: 'J310', start: 2021 },
  'JTJFA': { model: 'IS', generation: 'XE30', start: 2013 },
  'JTJGA': { model: 'ES', generation: 'XV70', start: 2018 },
  'JTJHA': { model: 'GS', generation: 'L10', start: 2012, end: 2020 },
  'JTJJA': { model: 'LS', generation: 'XF50', start: 2017 },
  'JTJKA': { model: 'RC', generation: 'XC10', start: 2014 },
  'JTJLA': { model: 'LC', generation: 'Z100', start: 2017 },
  'JTJMA': { model: 'CT', generation: 'ZWA10', start: 2011, end: 2022 },
  'JTJPA': { model: 'RZ', start: 2023 },
  // JTH variants
  'JTHAA': { model: 'UX', generation: 'ZA10', start: 2018 },
  'JTHBA': { model: 'IS', generation: 'XE30', start: 2013 },
  'JTHCA': { model: 'ES', generation: 'XV70', start: 2018 },
  'JTHDA': { model: 'GS', generation: 'L10', start: 2012, end: 2020 },
  'JTHEA': { model: 'LS', generation: 'XF50', start: 2017 },
  'JTHFA': { model: 'RC', generation: 'XC10', start: 2014 },
  'JTHGA': { model: 'LC', generation: 'Z100', start: 2017 },
  'JTHHA': { model: 'RZ', start: 2023 },
  // JTL variants
  'JTLAA': { model: 'UX', generation: 'ZA10', start: 2018 },
  'JTLBA': { model: 'NX', generation: 'AZ20', start: 2021 },
  'JTLCA': { model: 'RX', generation: 'AL30', start: 2022 },
  'JTLDA': { model: 'GX', generation: 'J250', start: 2023 },
  'JTLEA': { model: 'LX', generation: 'J310', start: 2021 },
  'JTLFA': { model: 'IS', generation: 'XE30', start: 2013 },
};

/** @deprecated Use TOYOTA_DB instead */
export const TOYOTA_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(TOYOTA_DB).map(([k, v]) => [k, v.model])
);

/** @deprecated Use LEXUS_DB instead */
export const LEXUS_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(LEXUS_DB).map(([k, v]) => [k, v.model])
);
