import { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';

let cachedWorkbook: XLSX.WorkBook | null = null;
let loadingPromise: Promise<XLSX.WorkBook> | null = null;

function loadWorkbook(): Promise<XLSX.WorkBook> {
  if (cachedWorkbook) return Promise.resolve(cachedWorkbook);
  if (loadingPromise) return loadingPromise;
  loadingPromise = fetch(`${import.meta.env.BASE_URL}docs/Al_merged_v1.xlsx`)
    .then((res) => res.arrayBuffer())
    .then((buf) => {
      const wb = XLSX.read(buf, { type: 'array' });
      cachedWorkbook = wb;
      return wb;
    });
  return loadingPromise;
}

// Hojas visibles al público (se ocultan las de caché de tablas dinámicas de Excel)
const VISIBLE_SHEETS = [
  'Datos',
  'Frec_Migrante',
  'Frec_Regimen',
  'Frec_Enfoque',
  'Frec_Anio',
  'Frec_Edad',
  'Regresion',
  'Distribucion_Normal',
];

export function ExcelViewer({ initialSheet }: { initialSheet?: string }) {
  const [wb, setWb] = useState<XLSX.WorkBook | null>(null);
  const [sheet, setSheet] = useState(initialSheet || 'Datos');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWorkbook()
      .then(setWb)
      .catch(() => setError('No se pudo cargar el archivo Excel.'));
  }, []);

  useEffect(() => {
    if (initialSheet) setSheet(initialSheet);
  }, [initialSheet]);

  const sheetNames = useMemo(() => {
    if (!wb) return [];
    return wb.SheetNames.filter((n) => VISIBLE_SHEETS.includes(n));
  }, [wb]);

  const rows: unknown[][] = useMemo(() => {
    if (!wb || !wb.Sheets[sheet]) return [];
    const data = XLSX.utils.sheet_to_json(wb.Sheets[sheet], { header: 1, raw: false, defval: '' }) as unknown[][];
    return data.slice(0, 120); // limitar filas visibles para rendimiento
  }, [wb, sheet]);

  if (error) return <p className="text-red-600 text-sm">{error}</p>;
  if (!wb) {
    return (
      <div className="flex items-center gap-2 text-gris text-sm py-8">
        <span className="w-4 h-4 border-2 border-azul border-t-transparent rounded-full animate-spin" />
        Cargando el archivo Excel real…
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {sheetNames.map((name) => (
          <button
            key={name}
            onClick={() => setSheet(name)}
            className={`px-3 py-1.5 text-xs md:text-sm rounded-full font-medium border transition-colors ${
              sheet === name
                ? 'bg-azul text-white border-azul'
                : 'bg-white text-gris border-black/10 hover:border-azul/40'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="overflow-auto max-h-[420px] border border-black/10 rounded-lg">
        <table className="min-w-full text-xs md:text-sm border-collapse">
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className={ri === 0 ? 'bg-azul text-white sticky top-0' : ri % 2 ? 'bg-black/[0.02]' : ''}>
                {row.map((cell, ci) => (
                  <td key={ci} className="border border-black/5 px-2.5 py-1.5 whitespace-nowrap">
                    {String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gris mt-2">
        Mostrando hasta 120 filas de la hoja "{sheet}". Este es el archivo Excel real usado en el análisis.
      </p>
    </div>
  );
}
