import { Section, Reveal } from '../components/ui/Section';

export function Conclusiones() {
  return (
    <Section id="conclusiones" kicker="Síntesis final" title="Conclusiones generales" dark>
      <Reveal>
        <div className="space-y-5 text-white/90 leading-relaxed max-w-4xl text-base md:text-lg presentacion-grande">
          <p>
            El análisis estadístico realizado sobre la razón de prevalencia de sífilis gestacional en Bogotá D.C.
            entre 2018 y 2025, contando cada registro una sola vez (N = 1,186), permite concluir que esta patología
            persiste como un desafío relevante para la salud pública distrital. En cuanto a las variables
            cualitativas, la mayoría de los casos se concentró en gestantes de nacionalidad colombiana (61.2%),
            afiliadas al régimen subsidiado (38.8%) y sin un enfoque étnico diferencial declarado (86.8%); no
            obstante, la proporción de casos en población extranjera y en los regímenes de menor cobertura sugiere
            una vulnerabilidad diferencial asociada a barreras de acceso a controles prenatales.
          </p>
          <p>
            Respecto a las variables cuantitativas, la distribución por año se mantuvo relativamente estable, sin
            una tendencia sostenida de aumento o disminución, mientras que la edad materna se concentró
            principalmente en el grupo de 20 a 24 años, con una edad promedio de 27.36 años, confirmando que la
            enfermedad afecta sobre todo a mujeres jóvenes en edad reproductiva. El modelo de regresión lineal
            entre el año y la edad promedio no evidenció una relación relevante (r² = 3.2%), y la distribución de
            la Edad mostró un sesgo positivo leve y una forma más aplanada que la normal teórica.
          </p>
          <p>
            En conjunto, estos resultados confirman que la sífilis gestacional en Bogotá D.C. se concentra en
            grupos poblacionales específicos —mujeres jóvenes, migrantes y afiliadas a regímenes de menor
            cobertura—, lo cual constituye un insumo relevante para orientar la focalización de estrategias de
            prevención, tamizaje temprano y fortalecimiento de los controles prenatales.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
