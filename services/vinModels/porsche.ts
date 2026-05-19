/**
 * Porsche VIN model lookup
 * European Porsche VINs use ZZZ format (pos 4-6 = 'ZZZ'); lookup key = WMI + pos7 + pos8.
 * Type codes: 911→99x, Panamera→97x, 718/Boxster/Cayman→98x, Cayenne→9Y, Macan→95, Taycan→J1
 *
 * WMI codes:
 *   WP0 = Porsche AG (sports cars: 911, Boxster, Cayman, Taycan, Panamera)
 *   WP1 = Porsche AG (SUVs: Cayenne, Macan)
 */
import { ModelInfo } from './types';

export const PORSCHE_DB: Record<string, ModelInfo> = {
  // ── WP0 = Porsche sports cars ────────────────────────────────────────────
  // 911 (992 gen, 2019–present)
  'WP099':  { model: '911', generation: '992', start: 2019 },
  'WP0ZZ':  { model: '911', generation: '992', start: 2019 },           // ZZZ EU format fallback

  // 911 variants (992)
  'WP0AA':  { model: '911 Carrera', generation: '992', start: 2019 },
  'WP0AB':  { model: '911 Carrera S', generation: '992', start: 2019 },
  'WP0AC':  { model: '911 Carrera 4', generation: '992', start: 2019 },
  'WP0AD':  { model: '911 Carrera 4S', generation: '992', start: 2019 },
  'WP0AE':  { model: '911 Targa', generation: '992', start: 2020 },
  'WP0AF':  { model: '911 Turbo', generation: '992', start: 2020 },
  'WP0AG':  { model: '911 Turbo S', generation: '992', start: 2020 },
  'WP0AH':  { model: '911 GT3', generation: '992', start: 2021 },
  'WP0AJ':  { model: '911 GT3 RS', generation: '992', start: 2022 },
  'WP0AK':  { model: '911 GT2 RS', generation: '991.2', start: 2018, end: 2021 },
  'WP0AL':  { model: '911 Speedster', generation: '991.2', start: 2019, end: 2020 },
  'WP0AM':  { model: '911 Sport Classic', generation: '992', start: 2022 },
  'WP0AN':  { model: '911 Dakar', generation: '992', start: 2023 },

  // Panamera (971 gen, 2016–2023)
  'WP097':  { model: 'Panamera', generation: '971', start: 2016, end: 2023 },
  'WP0BA':  { model: 'Panamera', generation: '971', start: 2016, end: 2023 },
  'WP0BB':  { model: 'Panamera 4', generation: '971', start: 2016, end: 2023 },
  'WP0BC':  { model: 'Panamera Turbo', generation: '971', start: 2016, end: 2023 },
  'WP0BD':  { model: 'Panamera Sport Turismo', generation: '971', start: 2017, end: 2023 },
  'WP0BE':  { model: 'Panamera GTS', generation: '971', start: 2018, end: 2023 },

  // Taycan (J1 platform, 2019–present)
  'WP0J1':  { model: 'Taycan', generation: 'J1', start: 2019 },
  'WP0CA':  { model: 'Taycan', generation: 'J1', start: 2019 },
  'WP0CB':  { model: 'Taycan 4S', generation: 'J1', start: 2020 },
  'WP0CC':  { model: 'Taycan Turbo', generation: 'J1', start: 2019 },
  'WP0CD':  { model: 'Taycan Turbo S', generation: 'J1', start: 2019 },
  'WP0CE':  { model: 'Taycan Cross Turismo', generation: 'J1', start: 2021 },
  'WP0CF':  { model: 'Taycan Sport Turismo', generation: 'J1', start: 2021 },
  'WP0CG':  { model: 'Taycan GTS', generation: 'J1', start: 2022 },

  // 718 Boxster / Cayman (982 gen, 2016–present)
  'WP098':  { model: 'Boxster / Cayman', generation: '982', start: 2016 },
  'WP0DA':  { model: 'Boxster', generation: '982', start: 2016 },
  'WP0DB':  { model: 'Boxster S', generation: '982', start: 2016 },
  'WP0DC':  { model: 'Boxster GTS', generation: '982', start: 2018 },
  'WP0DD':  { model: 'Boxster Spyder', generation: '982', start: 2019, end: 2024 },
  'WP0DE':  { model: 'Cayman', generation: '982', start: 2016 },
  'WP0DF':  { model: 'Cayman S', generation: '982', start: 2016 },
  'WP0DG':  { model: 'Cayman GTS', generation: '982', start: 2018 },
  'WP0DH':  { model: 'Cayman GT4', generation: '982', start: 2019 },
  'WP0DJ':  { model: 'Cayman GT4 RS', generation: '982', start: 2021 },

  // ── WP1 = Porsche SUVs ───────────────────────────────────────────────────
  // Cayenne (9YA gen, 2018–present)
  'WP09Y':  { model: 'Cayenne', generation: '9YA', start: 2018 },
  'WP1AA':  { model: 'Cayenne', generation: '9YA', start: 2018 },
  'WP1AB':  { model: 'Cayenne S', generation: '9YA', start: 2018 },
  'WP1AC':  { model: 'Cayenne GTS', generation: '9YA', start: 2020 },
  'WP1AD':  { model: 'Cayenne Turbo', generation: '9YA', start: 2018 },
  'WP1AE':  { model: 'Cayenne Turbo S', generation: '9YA', start: 2019 },
  'WP1AF':  { model: 'Cayenne E-Hybrid', generation: '9YA', start: 2018 },
  'WP1AG':  { model: 'Cayenne Turbo S E-Hybrid', generation: '9YA', start: 2019 },
  'WP1AH':  { model: 'Cayenne Coupé', generation: '9YA', start: 2019 },
  'WP1AJ':  { model: 'Cayenne Coupé GTS', generation: '9YA', start: 2020 },

  // Macan (95B gen ICE 2014–2022, J1 electric 2024–present)
  'WP195':  { model: 'Macan', generation: '95B', start: 2014, end: 2022 },
  'WP19J':  { model: 'Macan', generation: 'J1', start: 2024 },
  'WP1BA':  { model: 'Macan', generation: '95B', start: 2014, end: 2022 },
  'WP1BB':  { model: 'Macan S', generation: '95B', start: 2014, end: 2022 },
  'WP1BC':  { model: 'Macan GTS', generation: '95B', start: 2015, end: 2022 },
  'WP1BD':  { model: 'Macan Turbo', generation: '95B', start: 2014, end: 2022 },
  'WP1BE':  { model: 'Macan Electric', generation: 'J1', start: 2024 },

  // 4-char fallback keys (WMI + pos4) for non-ZZZ / unrecognised VDS
  'WP09':   { model: '911' },
  'WP19':   { model: 'Macan' },
};

/** @deprecated Use PORSCHE_DB instead */
export const PORSCHE_MODELS: Record<string, string> = Object.fromEntries(
  Object.entries(PORSCHE_DB).map(([k, v]) => [k, v.model])
);
