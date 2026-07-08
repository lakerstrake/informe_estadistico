import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/Card';
import { Icon } from './ui/Icon';

const ExcelViewer = lazy(() => import('./ExcelViewer').then((m) => ({ default: m.ExcelViewer })));

/** Tarjeta + modal para visualizar el Excel real de la base de datos desde la página. */
export function DataExplorer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card className="p-6 mt-8">
        <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
          <div className="flex items-start gap-4">
            <span className="shrink-0 w-12 h-12 rounded-xl bg-azul/10 text-azul flex items-center justify-center">
              <Icon name="layers" className="w-6 h-6" />
            </span>
            <div>
              <p className="font-bold text-azul-dark">Explora la base de datos completa</p>
              <p className="text-sm text-gris mt-1 max-w-xl leading-relaxed">
                Visualiza aquí mismo el archivo Excel real (SaluData) con los 1.186 registros y todas las hojas de
                cálculo del análisis, sin descargar nada ni salir de la página.
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="shrink-0 inline-flex items-center gap-2 bg-azul text-white font-semibold rounded-full px-5 py-3 hover:bg-azul-dark hover:-translate-y-0.5 transition-all shadow-[0_8px_24px_rgba(9,46,65,0.2)]"
          >
            <Icon name="fileText" className="w-5 h-5" /> Ver la base de datos
          </button>
        </div>
      </Card>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-3 md:inset-8 z-50 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-label="Base de datos"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-black/10 bg-gradient-to-r from-azul to-azul-dark text-white">
                <h3 className="font-bold flex items-center gap-2 text-sm md:text-base">
                  <Icon name="layers" className="w-5 h-5" /> Base de datos — Sífilis Gestacional (SaluData)
                </h3>
                <button onClick={() => setOpen(false)} aria-label="Cerrar" className="text-white/80 hover:text-white text-2xl leading-none">
                  ×
                </button>
              </div>
              <div className="flex-1 overflow-auto p-5">
                <Suspense
                  fallback={
                    <div className="flex items-center gap-2 text-gris text-sm py-8">
                      <span className="w-4 h-4 border-2 border-azul border-t-transparent rounded-full animate-spin" />
                      Cargando la base de datos…
                    </div>
                  }
                >
                  <ExcelViewer initialSheet="Datos" />
                </Suspense>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
