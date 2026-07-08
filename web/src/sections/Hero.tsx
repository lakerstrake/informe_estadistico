import { motion } from 'framer-motion';
import stats from '../data/stats.json';

const chips = [
  { valor: stats.meta.n.toLocaleString('es-CO'), etiqueta: 'registros analizados' },
  { valor: '2018–2025', etiqueta: 'periodo de estudio' },
  { valor: 'SaluData', etiqueta: 'fuente oficial · SDS Bogotá' },
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="hero-anim relative min-h-[100svh] flex flex-col items-center [justify-content:safe_center] overflow-hidden bg-gradient-to-br from-azul-deep via-azul-dark to-azul text-white px-5 py-20 md:py-24"
    >
      {/* foto de fondo (control prenatal) muy sutil bajo el degradado */}
      <img
        src={`${import.meta.env.BASE_URL}img/hero-fondo.avif`}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-azul-deep/80 via-azul-dark/70 to-azul/70" aria-hidden />

      {/* patrón de puntos */}
      <div className="absolute inset-0 opacity-[0.08]" aria-hidden>
        <svg width="100%" height="100%">
          <pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-naranja/25 blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-azul-light/30 blur-3xl" aria-hidden />

      {/* silueta de curva normal, decorativa */}
      <svg
        className="absolute bottom-0 inset-x-0 w-full h-40 md:h-56 text-white/[0.06]"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,200 C200,195 320,180 420,120 C500,72 540,20 600,20 C660,20 700,72 780,120 C880,180 1000,195 1200,200 Z"
          fill="currentColor"
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-4xl text-center"
      >
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="Universidad Militar Nueva Granada"
          className="h-24 md:h-28 mx-auto mb-8 drop-shadow-lg"
        />
        <p className="inline-flex items-center gap-2 border border-white/25 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 uppercase tracking-[0.22em] text-white/85 text-[0.65rem] md:text-xs font-bold mb-6">
          Trabajo final de Estadística · UMNG
        </p>
        <h1 className="display-serif text-4xl sm:text-5xl md:text-[4.2rem] font-bold leading-[1.08] mb-6">
          Razón de Prevalencia de
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#ffb98a]">
            Sífilis Gestacional
          </span>
          en Bogotá D.C.
        </h1>
        <p className="text-white/80 text-base md:text-lg mb-8">
          Informe estadístico interactivo · análisis descriptivo, regresión y distribución normal
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 text-sm mb-10">
          {['Shesly Colorado', 'Juan Lagos', 'Luis Narváez'].map((n) => (
            <span key={n} className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-white/85">
              {n}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#resumen"
            className="group bg-white text-azul-dark font-bold px-7 py-3.5 rounded-full hover:bg-white/90 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
          >
            Explorar el informe
            <span className="inline-block ml-2 transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
          <a
            href={`${import.meta.env.BASE_URL}docs/Informe_Sifilis_Gestacional_Juan.pdf`}
            target="_blank"
            rel="noreferrer"
            className="border border-white/40 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 hover:border-white/60 transition-all"
          >
            Ver PDF completo
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {chips.map((c) => (
            <div
              key={c.etiqueta}
              className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl px-5 py-3 text-left min-w-40"
            >
              <p className="tnum text-xl md:text-2xl font-extrabold text-white">{c.valor}</p>
              <p className="text-[0.7rem] md:text-xs text-white/65 mt-0.5">{c.etiqueta}</p>
            </div>
          ))}
        </div>

        {/* Mini-gráfica animada: casos por año */}
        <div className="mt-10 inline-flex items-end gap-2 bg-white/[0.07] backdrop-blur border border-white/15 rounded-2xl px-5 pt-4 pb-3">
          {stats.anio.tabla.map((r, i) => (
            <div key={r.anio} className="flex flex-col items-center gap-1.5">
              <motion.div
                className="w-5 md:w-7 rounded-t-[3px] bg-gradient-to-t from-[#4a8bab] to-[#ffb98a]"
                initial={{ height: 0 }}
                animate={{ height: (r.fi / 158) * 56 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
              />
              <span className="text-[0.55rem] md:text-[0.65rem] text-white/55 tnum">{r.anio}</span>
            </div>
          ))}
          <span className="text-[0.6rem] md:text-xs text-white/60 ml-3 mb-4 max-w-24 text-left leading-tight">
            casos notificados por año
          </span>
        </div>
      </motion.div>

      <motion.a
        href="#resumen"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 hover:text-white/90 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Bajar al resumen"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  );
}
