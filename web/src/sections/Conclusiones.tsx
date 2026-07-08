import { Section, Reveal } from '../components/ui/Section';

const conclusiones = [
  {
    n: '01',
    titulo: 'Variables cualitativas',
    texto:
      'El análisis estadístico realizado sobre la razón de prevalencia de sífilis gestacional en Bogotá D.C. entre 2018 y 2025, contando cada registro una sola vez (N = 1,186), permite concluir que esta patología persiste como un desafío relevante para la salud pública distrital. La mayoría de los casos se concentró en gestantes de nacionalidad colombiana (61.2%), afiliadas al régimen subsidiado (38.8%) y sin un enfoque étnico diferencial declarado (86.8%); no obstante, la proporción de casos en población extranjera y en los regímenes de menor cobertura sugiere una vulnerabilidad diferencial asociada a barreras de acceso a controles prenatales.',
  },
  {
    n: '02',
    titulo: 'Variables cuantitativas',
    texto:
      'La distribución por año se mantuvo relativamente estable, sin una tendencia sostenida de aumento o disminución, mientras que la edad materna se concentró principalmente en el grupo de 20 a 24 años, con una edad promedio de 27.36 años, confirmando que la enfermedad afecta sobre todo a mujeres jóvenes en edad reproductiva. El modelo de regresión lineal entre el año y la edad promedio no evidenció una relación relevante (r² = 3.2%), y la distribución de la Edad mostró un sesgo positivo leve y una forma más aplanada que la normal teórica.',
  },
  {
    n: '03',
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
              <p className="display-serif text-4xl font-bold text-white/25 mb-3" aria-hidden>
                {c.n}
              </p>
              <h3 className="font-bold text-white text-lg mb-3">{c.titulo}</h3>
              <p className="text-white/80 text-sm md:text-[0.92rem] leading-relaxed presentacion-grande">{c.texto}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
