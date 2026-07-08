import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Accordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={item.title} className="bg-white rounded-xl border border-black/5 overflow-hidden shadow-sm">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between text-left px-5 py-4 font-semibold text-azul-dark hover:bg-black/[0.02]"
          >
            <span className="presentacion-grande">{item.title}</span>
            <span className={`text-naranja transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 text-gris leading-relaxed presentacion-grande">{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
