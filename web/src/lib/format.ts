export const fmt = (n: number, decimals = 0) =>
  n.toLocaleString('es-CO', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export const fmtPct = (n: number, decimals = 1) => `${fmt(n, decimals)}%`;

export const COLORS = {
  azul: '#156082',
  azulDark: '#0e4560',
  azulLight: '#4a8bab',
  naranja: '#E97132',
  verde: '#9DC183',
  gris: '#595959',
  grisClaro: '#D9D9D9',
};

export const PALETTE = [COLORS.azul, COLORS.naranja, COLORS.verde, '#7C6FDB', '#D65DB1', '#4CAEE0'];
