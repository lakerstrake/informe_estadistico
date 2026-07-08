import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Section({
  id,
  title,
  kicker,
  children,
  dark = false,
}: {
  id: string;
  title?: string;
  kicker?: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      data-section
      className={`scroll-mt-20 py-16 md:py-24 px-5 md:px-10 ${
        dark ? 'bg-gradient-to-br from-azul-deep via-azul-dark to-azul text-white' : ''
      }`}
    >
      <div className="max-w-[88rem] mx-auto">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-10 md:mb-14"
          >
            {kicker && (
              <p
                className={`flex items-center gap-3 text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3 ${
                  dark ? 'text-white/60' : 'text-naranja'
                }`}
              >
                <span className={`h-px w-10 ${dark ? 'bg-white/40' : 'bg-naranja/60'}`} aria-hidden />
                {kicker}
              </p>
            )}
            <h2
              className={`display-serif text-3xl md:text-[2.75rem] leading-tight font-bold ${
                dark ? 'text-white' : 'text-azul-dark'
              }`}
            >
              {title}
            </h2>
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  );
}
