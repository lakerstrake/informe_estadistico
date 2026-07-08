import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-azul-dark via-azul to-azul-light text-white px-5">
      {/* patrón geométrico de fondo */}
      <div className="absolute inset-0 opacity-[0.07]" aria-hidden>
        <svg width="100%" height="100%">
          <pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-naranja/20 blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-verde/20 blur-3xl" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-4xl text-center"
      >
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Universidad Militar Nueva Granada" className="h-28 md:h-32 mx-auto mb-8 drop-shadow-lg" />
        <p className="uppercase tracking-[0.25em] text-white/70 text-xs md:text-sm font-semibold mb-4">
          Trabajo Final Estadística — Universidad Militar Nueva Granada
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-5">
          Razón de Prevalencia de Sífilis Gestacional
          <br className="hidden md:block" /> en Bogotá D.C.
        </h1>
        <p className="text-white/85 text-base md:text-lg mb-10">2018 – 2025 · Informe estadístico interactivo</p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/80 mb-10">
          <span>Shesly Colorado</span>
          <span className="opacity-40">·</span>
          <span>Juan Lagos</span>
          <span className="opacity-40">·</span>
          <span>Luis Narváez</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#resumen"
            className="bg-white text-azul-dark font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-colors shadow-lg"
          >
            Explorar el informe ↓
          </a>
          <a
            href={`${import.meta.env.BASE_URL}docs/Informe_Sifilis_Gestacional_Juan.pdf`}
            target="_blank"
            rel="noreferrer"
            className="border border-white/40 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
          >
            Ver PDF completo
          </a>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/60 text-2xl" aria-hidden>
        ⌄
      </div>
    </section>
  );
}
