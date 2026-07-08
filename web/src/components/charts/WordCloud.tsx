import { motion } from 'framer-motion';
import { PALETTE } from '../../lib/format';

/** Nube de palabras ligera (HTML/CSS): tamaño proporcional a la frecuencia. */
export function WordCloud({ items }: { items: { text: string; weight: number }[] }) {
  const sorted = [...items].sort((a, b) => b.weight - a.weight);
  const ws = sorted.map((i) => i.weight);
  const max = Math.max(...ws);
  const min = Math.min(...ws);
  const sq = (x: number) => Math.sqrt(x);
  const size = (w: number) => 15 + ((sq(w) - sq(min)) / (sq(max) - sq(min) || 1)) * 40;

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 py-6 min-h-[220px] overflow-hidden">
      {sorted.map((it, i) => (
        <motion.span
          key={it.text}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 16 }}
          style={{ fontSize: size(it.weight), color: PALETTE[i % PALETTE.length], lineHeight: 1.05 }}
          className="font-extrabold tracking-tight text-center break-words max-w-full"
          title={`${it.text}: ${it.weight.toLocaleString('es-CO')} casos`}
        >
          {it.text}
        </motion.span>
      ))}
    </div>
  );
}
