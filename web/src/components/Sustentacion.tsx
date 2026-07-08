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
        className={`fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 rounded-full shadow-[0_8px_24px_rgba(9,46,65,0.3)] px-5 py-3 font-semibold text-sm transition-all hover:-translate-y-0.5 ${
          active ? 'bg-naranja text-white hover:bg-naranja/90' : 'bg-azul text-white hover:bg-azul-dark'
        }`}
      >
        {active ? (
          <>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Salir de modo sustentación
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
              <path d="M2.5 1.5v9l8-4.5-8-4.5z" />
            </svg>
            Modo sustentación
          </>
        )}
      </button>

      {active && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-white/95 backdrop-blur rounded-full shadow-[0_8px_24px_rgba(9,46,65,0.2)] px-4 py-2.5 border border-azul/15">
          <button
            onClick={() => goTo(Math.max(idx - 1, 0))}
            aria-label="Sección anterior"
            className="w-8 h-8 rounded-full bg-azul/10 text-azul font-bold hover:bg-azul/20 transition-colors"
          >
            ←
          </button>
          <div className="flex items-center gap-1.5 px-1" aria-label={`Sección ${idx + 1} de ${SECTION_IDS.length}`}>
            {SECTION_IDS.map((id, i) => (
              <button
                key={id}
                onClick={() => goTo(i)}
                aria-label={`Ir a la sección ${i + 1}`}
                className={`rounded-full transition-all ${
                  i === idx ? 'w-5 h-2 bg-azul' : 'w-2 h-2 bg-azul/25 hover:bg-azul/50'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => goTo(Math.min(idx + 1, SECTION_IDS.length - 1))}
            aria-label="Sección siguiente"
            className="w-8 h-8 rounded-full bg-azul/10 text-azul font-bold hover:bg-azul/20 transition-colors"
          >
            →
          </button>
        </div>
      )}
    </SustCtx.Provider>
  );
}
