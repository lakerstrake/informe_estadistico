import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Accordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.title}
            className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border ${
              isOpen
                ? 'border-azul/25 shadow-[0_10px_30px_rgba(9,46,65,0.10)]'
                : 'border-azul/10 shadow-[0_1px_3px_rgba(9,46,65,0.06)] hover:border-azul/20'
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
            >
              <span
                className={`presentacion-grande font-bold text-base md:text-lg transition-colors ${
                  isOpen ? 'text-azul' : 'text-azul-dark'
                }`}
              >
                {item.title}
              </span>
              <span
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300 ${
                  isOpen ? 'bg-azul text-white rotate-45' : 'bg-azul/10 text-azul'
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gris leading-relaxed presentacion-grande border-t border-azul/5 pt-4">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
