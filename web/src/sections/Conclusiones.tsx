import { Section, Reveal } from '../components/ui/Section';
import { Icon } from '../components/ui/Icon';

const bloques = [
  {
    n: '01',
    cifra: '61,2%',
    cifraLabel: 'de los casos en gestantes colombianas',
    titulo: 'Perfil cualitativo',
    img: 'img/sintesis vulnerabilidad.jpg',
    alt: 'Población migrante caminando',
    puntos: [
      '61,2% de los casos en gestantes colombianas, pero 38,8% en población extranjera, muy por encima de su peso demográfico en la ciudad.',
      '63,1% en regímenes de menor cobertura (Subsidiado 38,8% + No Asegurado 24,3%): barreras de aseguramiento.',
      '86,8% sin enfoque étnico declarado; entre los declarados, afrodescendientes (7,1%) e indígenas (3,7%).',
    ],
  },
  {
    n: '02',
    cifra: '20–24',
    cifraLabel: 'años: el grupo etario más afectado',
    titulo: 'Perfil cuantitativo',
    img: 'img/vulnerabilidad social..webp',
    alt: 'Ilustración de mujeres y niñez',
    puntos: [
      'Casos estables entre 2018 y 2025, sin tendencia sostenida de aumento o descenso.',
      'Edad media de 27,4 años y grupo modal de 20–24 años: concentración en mujeres jóvenes.',
      'Regresión Año → Edad sin relación relevante (r² = 3,2%): el perfil etario no cambió con el tiempo.',
      'La edad es casi normal, con leve sesgo a la derecha y forma más plana (curtosis negativa).',
    ],
  },
  {
    n: '03',
    cifra: '3 grupos',
    cifraLabel: 'jóvenes, migrantes y de baja cobertura',
    titulo: 'Síntesis y recomendaciones',
    img: 'img/sintesis.jpeg',
    alt: 'Jornada de promoción de salud',
    puntos: [
      'La sífilis gestacional se concentra en grupos específicos: mujeres jóvenes, migrantes y de menor cobertura.',
      'Focalizar el tamizaje temprano y los controles prenatales en esos grupos prioritarios.',
      'Reforzar el acceso efectivo de la población migrante y no asegurada al sistema de salud.',
      'Insumo útil para orientar estrategias distritales de prevención y control.',
    ],
  },
];

export function Conclusiones() {
  return (
    <Section id="conclusiones" kicker="Síntesis final" title="Conclusiones generales" dark>
      <div className="grid md:grid-cols-3 gap-6">
        {bloques.map((c, i) => (
          <Reveal key={c.n} delay={i * 0.08}>
            <article className="h-full flex flex-col bg-white/[0.07] backdrop-blur border border-white/15 rounded-2xl overflow-hidden hover:bg-white/[0.11] hover:border-white/25 transition-colors">
              <div className="relative h-36 md:h-40">
                <img src={`${import.meta.env.BASE_URL}${c.img}`} alt={c.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-azul-deep/95 via-azul-dark/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <span className="display-serif text-3xl font-bold text-white/35">{c.n}</span>
                  <div className="text-right">
                    <p className="tnum text-2xl font-extrabold text-[#ffb98a] leading-none">{c.cifra}</p>
                    <p className="text-[0.6rem] text-white/70 max-w-36 mt-0.5 leading-tight">{c.cifraLabel}</p>
                  </div>
                </div>
              </div>
              <div className="p-5 md:p-6 flex-1">
                <h3 className="font-bold text-white text-lg mb-3">{c.titulo}</h3>
                <ul className="space-y-2.5">
                  {c.puntos.map((p, j) => (
                    <li key={j} className="flex gap-2.5 text-white/80 text-sm leading-snug presentacion-grande">
                      <span className="shrink-0 mt-0.5 text-[#ffb98a]"><Icon name="check" className="w-4 h-4" /></span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <div className="relative overflow-hidden rounded-2xl mt-8 h-44 md:h-56 border border-white/15">
          <img
            src={`${import.meta.env.BASE_URL}img/prevencion.avif`}
            alt="Prueba de laboratorio para tamizaje de sífilis"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-azul-deep/92 via-azul-dark/65 to-azul/30" />
          <div className="absolute inset-0 flex items-center px-6 md:px-12">
            <p className="text-white text-lg md:text-2xl font-semibold max-w-2xl leading-snug">
              Una prueba oportuna durante el control prenatal evita la transmisión materno-infantil de la sífilis.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
