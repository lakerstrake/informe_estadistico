import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { fmt } from '../../lib/format';

const ACCENTS = {
  azul: { text: 'text-azul', bar: 'from-azul to-azul-light' },
  naranja: { text: 'text-naranja', bar: 'from-naranja to-naranja/50' },
  verde: { text: 'text-verde', bar: 'from-verde to-verde/50' },
} as const;

/** Cuenta de 0 al valor la primera vez que la tarjeta entra en pantalla. */
function CountUp({ end, decimals, duration = 1.6 }: { end: number; decimals: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(end * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return <span ref={ref}>{fmt(value, decimals)}</span>;
}

export function StatCard({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  label,
  accent = 'azul',
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  accent?: keyof typeof ACCENTS;
}) {
  const a = ACCENTS[accent];
  return (
    <div className="relative bg-white rounded-2xl border border-azul/10 shadow-[0_1px_3px_rgba(9,46,65,0.06)] hover:shadow-[0_10px_30px_rgba(9,46,65,0.12)] hover:-translate-y-1 transition-all duration-300 p-5 md:p-6 text-center overflow-hidden">
      <span className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${a.bar}`} aria-hidden />
      <div className={`tnum text-3xl md:text-4xl font-extrabold ${a.text}`}>
        {prefix}
        <CountUp end={value} decimals={decimals} />
        {suffix}
      </div>
      <p className="text-gris text-sm mt-2.5 leading-snug presentacion-grande">{label}</p>
    </div>
  );
}
