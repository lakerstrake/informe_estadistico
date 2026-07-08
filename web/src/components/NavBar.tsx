import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const LINKS = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'marco-teorico', label: 'Marco teórico' },
  { id: 'metodologia', label: 'Metodología' },
  { id: 'cualitativas', label: 'Cualitativas' },
  { id: 'cuantitativas', label: 'Cuantitativas' },
  { id: 'conclusiones', label: 'Conclusiones' },
  { id: 'referencias', label: 'Referencias' },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scrollspy: resalta la sección visible en el menú.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`presentacion-oculto fixed top-0 inset-x-0 z-20 transition-all ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_12px_rgba(9,46,65,0.08)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2.5 font-extrabold text-azul-dark">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="UMNG" className="h-8 w-auto" />
          <span className={`hidden sm:inline text-sm md:text-base ${scrolled ? '' : 'text-white'}`}>
            Sífilis Gestacional Bogotá D.C.
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => {
            const active = activeId === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? scrolled
                      ? 'text-azul font-semibold'
                      : 'text-white font-semibold'
                    : scrolled
                      ? 'text-gris hover:text-azul'
                      : 'text-white/75 hover:text-white'
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full ${scrolled ? 'bg-naranja' : 'bg-white'}`}
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
              </a>
            );
          })}
        </nav>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          className={`lg:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
            scrolled ? 'bg-azul/10 text-azul' : 'bg-white/15 text-white'
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            {open ? (
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Barra de progreso de lectura */}
      <motion.div
        className="h-[3px] bg-gradient-to-r from-naranja via-naranja to-azul-light origin-left"
        style={{ scaleX: progress }}
        aria-hidden
      />

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden bg-white/97 backdrop-blur border-t border-azul/10 overflow-hidden shadow-lg"
          >
            <div className="px-5 py-3 flex flex-col">
              {LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={`py-2.5 text-sm font-medium border-b border-azul/5 last:border-0 ${
                    activeId === l.id ? 'text-azul font-semibold' : 'text-gris'
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
