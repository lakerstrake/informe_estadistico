// Lee data/osb_sifilis_gestacional.csv y genera src/data/stats.json
// Metodología: cada fila del CSV se cuenta una sola vez (N=1186), sin ponderar por 'conteo'.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const csvPath = path.join(__dirname, '..', 'data', 'osb_sifilis_gestacional.csv');
const outPath = path.join(__dirname, '..', 'src', 'data', 'stats.json');

const raw = fs.readFileSync(csvPath, 'utf8').replace(/^﻿/, '');
const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
const headers = lines[0].split(',').map((h) => h.trim());
const rows = lines.slice(1).map((line) => {
  const cols = line.split(',');
  const obj = {};
  headers.forEach((h, i) => (obj[h] = cols[i]));
  return obj;
});

const N = rows.length;
if (N !== 1186) {
  console.warn(`ADVERTENCIA: se esperaban 1186 registros, se encontraron ${N}`);
}

// ---------- Helpers ----------
function freqTable(values, categories) {
  const fi = Object.fromEntries(categories.map((c) => [c, 0]));
  values.forEach((v) => {
    if (fi[v] === undefined) fi[v] = 0;
    fi[v] += 1;
  });
  const total = Object.values(fi).reduce((a, b) => a + b, 0);
  return categories.map((c) => ({
    categoria: c,
    fi: fi[c],
    fr: +(fi[c] / total).toFixed(4),
    pct: +((fi[c] / total) * 100).toFixed(1),
  }));
}

function erf(x) {
  // Abramowitz-Stegun approximation
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const a1 = 0.254829592,
    a2 = -0.284496736,
    a3 = 1.421413741,
    a4 = -1.453152027,
    a5 = 1.061405429,
    p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}
function normalCdf(x, mu, sigma) {
  return 0.5 * (1 + erf((x - mu) / (sigma * Math.SQRT2)));
}

// Estadísticas de datos agrupados. classes: [{L, c, f, mark}], continuityCorrection: resta 0.5 a L
// 'mark' es la marca de clase real (punto medio) provista explícitamente por el caller,
// ya que difiere según la convención de cada variable (Año vs. Edad).
function groupedStats(classes, N, continuityCorrection) {
  const marks = classes.map((cl) => cl.mark);
  const fis = classes.map((cl) => cl.f);
  const mean = marks.reduce((s, m, i) => s + m * fis[i], 0) / N;
  const variance = marks.reduce((s, m, i) => s + fis[i] * (m - mean) ** 2, 0) / N;
  const sd = Math.sqrt(variance);
  const m3 = marks.reduce((s, m, i) => s + fis[i] * (m - mean) ** 3, 0) / N;
  const m4 = marks.reduce((s, m, i) => s + fis[i] * (m - mean) ** 4, 0) / N;
  const skewness = m3 / sd ** 3;
  const kurtosis = m4 / sd ** 4 - 3;

  // moda
  const maxF = Math.max(...fis);
  const mi = fis.indexOf(maxF);
  const Lmoda = (continuityCorrection ? classes[mi].L - 0.5 : classes[mi].L);
  const f1 = fis[mi];
  const f0 = mi > 0 ? fis[mi - 1] : 0;
  const f2 = mi < fis.length - 1 ? fis[mi + 1] : 0;
  const moda = Lmoda + ((f1 - f0) / (f1 - f0 + (f1 - f2))) * classes[mi].c;

  // cuantiles
  const cum = [];
  fis.reduce((s, f) => {
    const t = s + f;
    cum.push(t);
    return t;
  }, 0);
  function quantile(k) {
    const target = N * k;
    for (let i = 0; i < cum.length; i++) {
      if (cum[i] >= target) {
        const L = continuityCorrection ? classes[i].L - 0.5 : classes[i].L;
        const F = i > 0 ? cum[i - 1] : 0;
        return L + ((target - F) / fis[i]) * classes[i].c;
      }
    }
    return null;
  }

  return {
    media: +mean.toFixed(4),
    moda: +moda.toFixed(2),
    mediana: +quantile(0.5).toFixed(2),
    q1: +quantile(0.25).toFixed(2),
    q3: +quantile(0.75).toFixed(2),
    varianza: +variance.toFixed(4),
    desviacion: +sd.toFixed(4),
    coefVariacion: +((sd / mean) * 100).toFixed(1),
    skewness: +skewness.toFixed(4),
    kurtosis: +kurtosis.toFixed(4),
  };
}

// ---------- Migrante ----------
const migrante = freqTable(
  rows.map((r) => r.MIGRANTE),
  ['Colombiano', 'Extranjero']
);

// ---------- Régimen ----------
const regimenCats = [
  'Contributivo',
  'Especial',
  'Excepción',
  'Indeterminado/Pendiente',
  'No Asegurado',
  'Subsidiado',
];
const regimen = freqTable(
  rows.map((r) => r.REGIMEN_SEGURIDAD_SOCIAL),
  regimenCats
);

// ---------- Enfoque diferencial ----------
const enfoqueCats = ['Otro', 'Negro-mulato-afro colombiano', 'Indígena', 'Rom Gitano', 'Raizal', 'Palenquero'];
const enfoque = freqTable(
  rows.map((r) => r.ENFOQUE_DIFERENCIAL),
  enfoqueCats
);

// ---------- Año ----------
const anioValues = rows.map((r) => parseInt(r.ANO, 10));
const anios = Array.from({ length: 8 }, (_, i) => 2018 + i);
const anioFreq = anios.map((y) => ({ anio: y, fi: anioValues.filter((v) => v === y).length }));
let cumA = 0;
const anioTable = anioFreq.map((row) => {
  cumA += row.fi;
  return {
    anio: row.anio,
    fi: row.fi,
    fr: +(row.fi / N).toFixed(4),
    pct: +((row.fi / N) * 100).toFixed(1),
    fiAcum: cumA,
    frAcumPct: +((cumA / N) * 100).toFixed(1),
  };
});
const anioClasses = anioFreq.map((r) => ({ L: r.anio, c: 1, f: r.fi, mark: r.anio }));
const anioStats = groupedStats(anioClasses, N, true); // continuity correction (L-0.5)

// ---------- Edad ----------
const edadBins = [
  [10, 14],
  [15, 19],
  [20, 24],
  [25, 29],
  [30, 34],
  [35, 39],
  [40, 44],
  [45, 49],
];
const edadValues = rows.map((r) => parseInt(r.EDAD, 10));
const edadFi = edadBins.map(([lo, hi]) => edadValues.filter((v) => v >= lo && v <= hi).length);
let cumE = 0;
const edadTable = edadBins.map(([lo, hi], i) => {
  cumE += edadFi[i];
  return {
    intervalo: `${lo}-${hi}`,
    marca: (lo + hi) / 2,
    fi: edadFi[i],
    fr: +(edadFi[i] / N).toFixed(4),
    pct: +((edadFi[i] / N) * 100).toFixed(1),
    fiAcum: cumE,
    frAcumPct: +((cumE / N) * 100).toFixed(1),
  };
});
const edadClasses = edadBins.map(([lo, hi], i) => ({ L: lo, c: 5, f: edadFi[i], mark: (lo + hi) / 2 }));
const edadStats = groupedStats(edadClasses, N, false); // sin corrección, L literal
edadStats.min = Math.min(...edadValues);
edadStats.max = Math.max(...edadValues);
edadStats.rango = edadStats.max - edadStats.min;
edadStats.riq = +(edadStats.q3 - edadStats.q1).toFixed(2);

// ---------- Regresión lineal: Año -> Edad promedio ----------
const edadPromedioPorAnio = anios.map((y) => {
  const vals = rows.filter((r) => parseInt(r.ANO, 10) === y).map((r) => parseInt(r.EDAD, 10));
  return vals.reduce((a, b) => a + b, 0) / vals.length;
});
{
  const xs = anios;
  const ys = edadPromedioPorAnio;
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  const sxy = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0);
  const sxx = xs.reduce((s, x) => s + (x - mx) ** 2, 0);
  const syy = ys.reduce((s, y) => s + (y - my) ** 2, 0);
  const slope = sxy / sxx;
  const intercept = my - slope * mx;
  const r = sxy / Math.sqrt(sxx * syy);
  var regresion = {
    puntos: xs.map((x, i) => ({ anio: x, edadPromedio: +ys[i].toFixed(3) })),
    pendiente: +slope.toFixed(4),
    intercepto: +intercept.toFixed(4),
    r: +r.toFixed(4),
    r2: +(r * r).toFixed(4),
  };
}

// ---------- Distribución normal aplicada a Edad ----------
const mu = edadStats.media;
const sigma = edadStats.desviacion;
const normalComparacion = edadBins.map(([lo, hi]) => {
  const p = normalCdf(hi + 0.5, mu, sigma) - normalCdf(lo - 0.5, mu, sigma);
  return { intervalo: `${lo}-${hi}`, esperada: +(p * N).toFixed(1) };
});
const reglaEmpirica = [1, 2, 3].map((k) => {
  const lo = mu - k * sigma;
  const hi = mu + k * sigma;
  const teorico = (normalCdf(hi, mu, sigma) - normalCdf(lo, mu, sigma)) * 100;
  const observado = (edadValues.filter((v) => v >= lo && v <= hi).length / N) * 100;
  return {
    k,
    lo: +lo.toFixed(2),
    hi: +hi.toFixed(2),
    teoricoPct: +teorico.toFixed(2),
    observadoPct: +observado.toFixed(2),
  };
});

// Curva de densidad (81 puntos entre mu-4sigma y mu+4sigma)
const curva = [];
for (let i = 0; i <= 80; i++) {
  const x = mu - 4 * sigma + (i / 80) * (8 * sigma);
  const fx = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
  curva.push({ x: +x.toFixed(3), fx: +fx.toFixed(6) });
}

// ---------- Ensamblar ----------
const stats = {
  meta: { n: N, generadoEn: new Date().toISOString().slice(0, 10) },
  migrante,
  regimen,
  enfoque,
  anio: { tabla: anioTable, stats: anioStats },
  edad: { tabla: edadTable, stats: edadStats },
  regresion,
  normal: { mu: +mu.toFixed(4), sigma: +sigma.toFixed(4), comparacion: normalComparacion, reglaEmpirica, curva },
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(stats, null, 2));
console.log('stats.json generado en', outPath);
console.log('N =', N);
console.log('Migrante:', migrante);
console.log('Edad stats:', edadStats);
console.log('Año stats:', anioStats);
console.log('Regresión:', regresion);
