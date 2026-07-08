import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface Ctx {
  active: boolean;
  toggle: () => void;
}
const SustCtx = createContext<Ctx | null>(null);

export function useSustentacion() {
  const ctx = useContext(SustCtx);
  if (!ctx) throw new Error('useSustentacion debe usarse dentro de SustentacionProvider');
  return ctx;
}

const SECTION_IDS = [
  'inicio',
  'resumen',
  'marco-teorico',
  'metodologia',
  'cualitativas',
  'cuantitativas',
  'conclusiones',
  'referencias',
];

export function SustentacionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('sustentacion', active);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') goTo(Math.min(idx + 1, SECTION_IDS.length - 1));
      if (e.key === 'ArrowLeft') goTo(Math.max(idx - 1, 0));
      if (e.key === 'Escape') setActive(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, idx]);

  function goTo(i: number) {
    setIdx(i);
    document.getElementById(SECTION_IDS[i])?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <SustCtx.Provider value={{ active, toggle: () => setActive((a) => !a) }}>
      {children}
      <button
        onClick={() => setActive((a) => !a)}
        className={`fixed bottom-6 right-6 z-30 rounded-full shadow-lg px-5 py-3 font-semibold text-sm transition-colors ${
          active ? 'bg-naranja text-white' : 'bg-azul text-white hover:bg-azul-dark'
        }`}
      >
        {active ? '✕ Salir de modo sustentación' : '▶ Modo sustentación'}
      </button>

      {active && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-white/95 backdrop-blur rounded-full shadow-lg px-4 py-2.5 border border-black/10">
          <button
            onClick={() => goTo(Math.max(idx - 1, 0))}
            className="w-8 h-8 rounded-full bg-azul/10 text-azul font-bold hover:bg-azul/20"
          >
            ←
          </button>
          <span className="text-xs font-semibold text-gris w-24 text-center">
            Sección {idx + 1} / {SECTION_IDS.length}
          </span>
          <button
            onClick={() => goTo(Math.min(idx + 1, SECTION_IDS.length - 1))}
            className="w-8 h-8 rounded-full bg-azul/10 text-azul font-bold hover:bg-azul/20"
          >
            →
          </button>
        </div>
      )}
    </SustCtx.Provider>
  );
}
