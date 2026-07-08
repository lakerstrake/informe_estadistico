import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'inicio', label: 'Portada' },
  { id: 'resumen', label: 'Resumen' },
  { id: 'marco-teorico', label: 'Marco teórico' },
  { id: 'metodologia', label: 'Metodología' },
  { id: 'cualitativas', label: 'Cualitativas' },
  { id: 'cuantitativas', label: 'Cuantitativas' },
  { id: 'conclusiones', label: 'Conclusiones' },
  { id: 'referencias', label: 'Referencias' },
];

/** Riel lateral que muestra el orden de la sustentación y la sección actual. */
export function ProgressRail() {
  const [active, setActive] = useState('inicio');

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      className="presentacion-oculto hidden xl:flex flex-col gap-3 fixed right-6 top-1/2 -translate-y-1/2 z-20"
      aria-label="Progreso de la sustentación"
    >
      {SECTIONS.map((s, i) => {
        const on = active === s.id;
        return (
          <a key={s.id} href={`#${s.id}`} className="group flex items-center justify-end gap-2.5" aria-current={on ? 'true' : undefined}>
            <span
              className={`text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                on ? 'opacity-100 text-azul-dark' : 'opacity-0 group-hover:opacity-100 text-gris'
              }`}
            >
              <span className="tnum text-naranja mr-1">{String(i + 1).padStart(2, '0')}</span>
              {s.label}
            </span>
            <span
              className={`rounded-full transition-all duration-300 ${
                on ? 'w-3 h-3 bg-azul ring-4 ring-azul/15' : 'w-2.5 h-2.5 bg-azul/25 group-hover:bg-azul/50'
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
