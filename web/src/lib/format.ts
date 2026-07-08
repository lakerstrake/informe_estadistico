export const fmt = (n: number, decimals = 0) =>
  n.toLocaleString('es-CO', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export const fmtPct = (n: number, decimals = 1) => `${fmt(n, decimals)}%`;

/** Colores de identidad (texto, UI, superficies). */
export const COLORS = {
  azul: '#156082',
  azulDark: '#0e4560',
  azulLight: '#4a8bab',
  naranja: '#d95e1e',
  verde: '#3f8b4e',
  gris: '#4b5563',
  grisClaro: '#d9d9d9',
  ink: '#16232e',
  linea: '#e3ebf1',
};

/**
 * Paleta categórica para las gráficas, validada (luminosidad, croma,
 * separación CVD ΔE 14.2 y contraste ≥ 3:1 sobre superficie clara).
 * El orden es fijo: nunca se recicla ni se reordena por rango.
 */
export const PALETTE = ['#1268A5', '#D95E1E', '#3F8B4E', '#7263D6', '#C2439B', '#2C8CBF'];

/** Tono de serie principal (azul de marca ajustado para marcas de datos). */
export const SERIES_BLUE = PALETTE[0];
export const SERIES_ORANGE = PALETTE[1];
