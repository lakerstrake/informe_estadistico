import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`presentacion-oculto fixed top-0 inset-x-0 z-20 transition-all ${
        scrolled ? 'bg-white/90 backdrop-blur shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2.5 font-extrabold text-azul-dark">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="UMNG" className="h-8 w-auto" />
          <span className="hidden sm:inline text-sm md:text-base">Sífilis Gestacional Bogotá D.C.</span>
        </a>
        <nav className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="text-sm font-medium text-gris hover:text-azul transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-azul/10 text-azul"
        >
          ☰
        </button>
      </div>
      {open && (
        <nav className="lg:hidden bg-white border-t border-black/10 px-5 py-3 flex flex-col gap-3">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="text-sm font-medium text-gris">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
