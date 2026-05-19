export interface ModelInfo {
  model: string;      // human-readable model name, e.g. "A4 Avant", "3 Series"
  generation?: string; // internal generation code, e.g. "B9", "G20", "W205"
  start?: number;     // first model year
  end?: number;       // last model year (undefined = current production)
}
