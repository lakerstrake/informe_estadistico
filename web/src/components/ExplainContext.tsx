import { createContext, useContext, useState, lazy, Suspense, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ExcelViewer = lazy(() => import('./ExcelViewer').then((m) => ({ default: m.ExcelViewer })));

export interface ExplainPayload {
  title: string;
  how: string;
  purpose: string;
  sheet?: string;
}

interface Ctx {
  open: (payload: ExplainPayload) => void;
}

const ExplainCtx = createContext<Ctx | null>(null);

export function useExplain() {
  const ctx = useContext(ExplainCtx);
  if (!ctx) throw new Error('useExplain debe usarse dentro de ExplainProvider');
  return ctx;
}

export function ExplainProvider({ children }: { children: ReactNode }) {
  const [payload, setPayload] = useState<ExplainPayload | null>(null);
  const [view, setView] = useState<'explicacion' | 'excel'>('explicacion');

  const open = (p: ExplainPayload) => {
    setPayload(p);
    setView('explicacion');
  };
  const close = () => setPayload(null);

  return (
    <ExplainCtx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {payload && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-full sm:w-[520px] bg-white z-50 shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-black/10 bg-azul text-white">
                <h3 className="font-bold text-base pr-4">{payload.title}</h3>
                <button onClick={close} className="text-white/80 hover:text-white text-2xl leading-none">
                  ×
                </button>
              </div>

              <div className="flex border-b border-black/10">
                <button
                  onClick={() => setView('explicacion')}
                  className={`flex-1 py-3 text-sm font-semibold ${
                    view === 'explicacion' ? 'text-azul border-b-2 border-azul' : 'text-gris'
                  }`}
                >
                  ¿Cómo se calculó?
                </button>
                <button
                  onClick={() => setView('excel')}
                  className={`flex-1 py-3 text-sm font-semibold ${
                    view === 'excel' ? 'text-azul border-b-2 border-azul' : 'text-gris'
                  }`}
                >
                  Ver en el Excel
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {view === 'explicacion' ? (
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-naranja mb-1.5">Cómo se calculó</p>
                      <p className="text-gris leading-relaxed text-sm">{payload.how}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-naranja mb-1.5">Para qué sirve</p>
                      <p className="text-gris leading-relaxed text-sm">{payload.purpose}</p>
                    </div>
                    <button
                      onClick={() => setView('excel')}
                      className="w-full mt-2 bg-azul/10 text-azul font-semibold text-sm rounded-lg py-2.5 hover:bg-azul/20 transition-colors"
                    >
                      Ir más profundo → ver la hoja de cálculo real
                    </button>
                  </div>
                ) : (
                  <Suspense
                    fallback={
                      <div className="flex items-center gap-2 text-gris text-sm py-8">
                        <span className="w-4 h-4 border-2 border-azul border-t-transparent rounded-full animate-spin" />
                        Cargando visor de Excel…
                      </div>
                    }
                  >
                    <ExcelViewer initialSheet={payload.sheet} />
                  </Suspense>
                )}
              </div>

              <div className="px-5 py-3 border-t border-black/10 bg-black/[0.02]">
                <a
                  href={`${import.meta.env.BASE_URL}docs/Al_merged_v1.xlsx`}
                  download
                  className="text-xs font-semibold text-azul hover:underline"
                >
                  ↓ Descargar el Excel completo
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ExplainCtx.Provider>
  );
}

export function ExplainButton({ payload }: { payload: ExplainPayload }) {
  const { open } = useExplain();
  return (
    <button
      onClick={() => open(payload)}
      className="presentacion-oculto inline-flex items-center gap-1.5 text-xs font-semibold text-azul bg-azul/10 hover:bg-azul/20 transition-colors rounded-full px-3 py-1.5"
    >
      <span className="text-sm leading-none">¿?</span> ¿Cómo se calculó esto?
    </button>
  );
}
