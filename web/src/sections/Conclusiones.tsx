import { Section, Reveal } from '../components/ui/Section';

const conclusiones = [
  {
    n: '01',
    cifra: '61,2%',
    cifraLabel: 'de los casos en gestantes colombianas',
    titulo: 'Variables cualitativas',
    texto:
      'El análisis estadístico realizado sobre la razón de prevalencia de sífilis gestacional en Bogotá D.C. entre 2018 y 2025, contando cada registro una sola vez (N = 1,186), permite concluir que esta patología persiste como un desafío relevante para la salud pública distrital. La mayoría de los casos se concentró en gestantes de nacionalidad colombiana (61.2%), afiliadas al régimen subsidiado (38.8%) y sin un enfoque étnico diferencial declarado (86.8%); no obstante, la proporción de casos en población extranjera y en los regímenes de menor cobertura sugiere una vulnerabilidad diferencial asociada a barreras de acceso a controles prenatales.',
  },
  {
    n: '02',
    cifra: '20–24',
    cifraLabel: 'años: el grupo etario más afectado',
    titulo: 'Variables cuantitativas',
    texto:
      'La distribución por año se mantuvo relativamente estable, sin una tendencia sostenida de aumento o disminución, mientras que la edad materna se concentró principalmente en el grupo de 20 a 24 años, con una edad promedio de 27.36 años, confirmando que la enfermedad afecta sobre todo a mujeres jóvenes en edad reproductiva. El modelo de regresión lineal entre el año y la edad promedio no evidenció una relación relevante (r² = 3.2%), y la distribución de la Edad mostró un sesgo positivo leve y una forma más aplanada que la normal teórica.',
  },
  {
    n: '03',
    cifra: '63,1%',
    cifraLabel: 'en regímenes de menor cobertura',
    titulo: 'Síntesis',
    texto:
      'En conjunto, estos resultados confirman que la sífilis gestacional en Bogotá D.C. se concentra en grupos poblacionales específicos —mujeres jóvenes, migrantes y afiliadas a regímenes de menor cobertura—, lo cual constituye un insumo relevante para orientar la focalización de estrategias de prevención, tamizaje temprano y fortalecimiento de los controles prenatales.',
  },
];

export function Conclusiones() {
  return (
    <Section id="conclusiones" kicker="Síntesis final" title="Conclusiones generales" dark>
      <div className="grid md:grid-cols-3 gap-6">
        {conclusiones.map((c, i) => (
          <Reveal key={c.n} delay={i * 0.08}>
            <article className="h-full bg-white/[0.07] backdrop-blur border border-white/15 rounded-2xl p-6 md:p-7 hover:bg-white/[0.11] hover:border-white/25 transition-colors">
              <div className="flex items-baseline justify-between mb-4">
                <p className="display-serif text-4xl font-bold text-white/25" aria-hidden>
                  {c.n}
                </p>
                <div className="text-right">
                  <p className="tnum text-3xl font-extrabold text-[#ffb98a]">{c.cifra}</p>
                  <p className="text-[0.65rem] text-white/60 max-w-40">{c.cifraLabel}</p>
                </div>
              </div>
              <h3 className="font-bold text-white text-lg mb-2.5">{c.titulo}</h3>
              <p className="text-white/75 text-sm leading-relaxed presentacion-grande">{c.texto}</p>
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
