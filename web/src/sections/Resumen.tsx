import stats from '../data/stats.json';
import { Section, Reveal } from '../components/ui/Section';
import { StatCard } from '../components/ui/StatCard';

export function Resumen() {
  return (
    <Section id="resumen" kicker="En pocas palabras" title="Resumen ejecutivo">
      <Reveal>
        <p className="text-gris leading-relaxed text-base md:text-lg max-w-3xl presentacion-grande">
          Este informe analiza la razón de prevalencia de sífilis gestacional en Bogotá D.C. entre 2018 y 2025,
          usando los {stats.meta.n.toLocaleString('es-CO')} registros publicados por el Observatorio de Salud de
          Bogotá (SaluData). Se estudian tres variables cualitativas (condición migratoria, régimen de afiliación
          y enfoque diferencial) y dos cuantitativas (año de notificación y edad materna), con un modelo de
          regresión lineal y una comparación contra la distribución normal.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        <Reveal delay={0.05}>
          <StatCard value={stats.meta.n} label="Registros analizados (2018–2025)" accent="azul" icon="layers" />
        </Reveal>
        <Reveal delay={0.1}>
          <StatCard value={stats.edad.stats.media} decimals={2} suffix=" años" label="Edad materna promedio" accent="naranja" icon="user" />
        </Reveal>
        <Reveal delay={0.15}>
          <StatCard value={stats.migrante[0].pct} decimals={1} suffix="%" label="Gestantes de nacionalidad colombiana" accent="verde" icon="flag" />
        </Reveal>
        <Reveal delay={0.2}>
          <StatCard value={stats.regresion.r2 * 100} decimals={1} suffix="%" label="Variación explicada por el año (r²)" accent="azul" icon="trendingDown" />
        </Reveal>
      </div>

      <Reveal delay={0.25}>
        <div className="mt-8 max-w-3xl flex gap-3 bg-azul/[0.05] border border-azul/10 rounded-xl px-4 py-3.5">
          <span className="shrink-0 w-5 h-5 mt-0.5 rounded-full bg-azul/15 text-azul text-xs font-bold flex items-center justify-center" aria-hidden>
            i
          </span>
          <p className="text-sm text-gris italic leading-relaxed">
            Nota metodológica: cada registro (fila) del conjunto de datos se cuenta una sola vez (N = 1,186), de
            forma consistente en todas las variables del informe.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
