import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

export function Tabs({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div
        role="tablist"
        className="inline-flex flex-wrap gap-1 mb-8 bg-azul/[0.06] rounded-2xl p-1.5 border border-azul/10"
      >
        {tabs.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`relative px-4 md:px-5 py-2.5 text-sm md:text-base font-semibold rounded-xl transition-colors ${
              active === i ? 'text-white' : 'text-gris hover:text-azul-dark'
            }`}
          >
            {active === i && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 bg-azul rounded-xl shadow-md"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10">{t.label}</span>
          </button>
        ))}
      </div>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {tabs[active].content}
      </motion.div>
    </div>
  );
}
