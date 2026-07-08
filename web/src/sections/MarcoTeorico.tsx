import { Section, Reveal } from '../components/ui/Section';
import { Accordion } from '../components/ui/Accordion';

export function MarcoTeorico() {
  return (
    <Section id="marco-teorico" kicker="Fundamentos" title="Marco teórico, planteamiento y objetivos">
      <Reveal>
        <Accordion
          items={[
            {
              title: '🧬 Marco teórico',
              content: (
                <div className="space-y-4">
                  <p>
                    La sífilis gestacional es una infección de transmisión sexual causada por la bacteria{' '}
                    <em>Treponema pallidum</em>, que afecta a mujeres embarazadas y puede transmitirse al feto
                    durante la gestación mediante transmisión vertical (World Health Organization, 2017). Si no se
                    diagnostica y trata oportunamente, puede ocasionar aborto espontáneo, muerte fetal, parto
                    prematuro, bajo peso al nacer, muerte neonatal y sífilis congénita (Alexander, 1999).
                  </p>
                  <p>
                    En Colombia es un evento de notificación obligatoria al Sistema Nacional de Vigilancia en
                    Salud Pública (SIVIGILA) (Instituto Nacional de Salud, 2015), cuya vigilancia busca identificar
                    oportunamente los casos y disminuir la transmisión materno-infantil.
                  </p>
                  <p className="font-semibold text-azul-dark">Variables sociodemográficas asociadas</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <b>Edad:</b> la enfermedad suele concentrarse en mujeres jóvenes en edad reproductiva (Muñoz
                      et al., 2021).
                    </li>
                    <li>
                      <b>Régimen de afiliación:</b> mayor proporción de casos en régimen subsidiado y población no
                      asegurada, evidenciando desigualdades de acceso (Becerra-Arias et al., 2022; Cruz-Aconcha,
                      2012).
                    </li>
                    <li>
                      <b>Condición migratoria:</b> barreras económicas, administrativas y geográficas pueden
                      retrasar el diagnóstico (World Health Organization, 2017).
                    </li>
                    <li>
                      <b>Enfoque diferencial:</b> comunidades indígenas, afrodescendientes y otras poblaciones
                      vulnerables requieren estrategias específicas (Ministerio de Salud y Protección Social, s.f.).
                    </li>
                  </ul>
                </div>
              ),
            },
            {
              title: '❗ Planteamiento del problema',
              content: (
                <p>
                  La sífilis gestacional continúa siendo un problema de salud pública debido a las complicaciones
                  que puede generar tanto para la madre como para el recién nacido. En Bogotá se presentan
                  diferencias en la prevalencia según características sociodemográficas como la condición
                  migratoria, el régimen de afiliación, el enfoque diferencial y la edad de las gestantes. A partir
                  de la información disponible en SaluData, surge la necesidad de analizar estadísticamente estas
                  variables para identificar patrones que contribuyan a comprender mejor el comportamiento de esta
                  enfermedad y apoyar la formulación de estrategias de prevención.
                </p>
              ),
            },
            {
              title: '🎯 Objetivos',
              content: (
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-azul-dark mb-1">Objetivo general</p>
                    <p>
                      Analizar estadísticamente el comportamiento de la razón de prevalencia de sífilis gestacional
                      en Bogotá D.C. durante el periodo 2018–2025, con el fin de identificar patrones
                      sociodemográficos y temporales que orienten la formulación de estrategias de prevención y
                      control.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-azul-dark mb-1">Objetivos específicos</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>Identificar las características de la población gestante según condición migratoria, régimen de afiliación y enfoque diferencial.</li>
                      <li>Establecer el perfil de edad de las mujeres con sífilis gestacional y su evolución año a año.</li>
                      <li>Examinar la relación entre el año y la edad promedio de las gestantes afectadas.</li>
                      <li>Comparar la distribución observada de la edad materna frente a un modelo de distribución normal teórica.</li>
                    </ul>
                  </div>
                </div>
              ),
            },
            {
              title: '📊 Justificación de las variables',
              content: (
                <div className="space-y-3">
                  <p><b>Migrante:</b> determinante social asociado a barreras de acceso a los servicios de salud.</p>
                  <p><b>Régimen de Seguridad Social:</b> condiciona el acceso real a controles prenatales y tratamiento.</p>
                  <p><b>Enfoque diferencial:</b> visibiliza si existen grupos poblacionales que requieran estrategias específicas de prevención.</p>
                  <p><b>Año:</b> permite describir el comportamiento temporal del indicador entre 2018 y 2025.</p>
                  <p><b>Edad:</b> variable cuantitativa central: confirma o refuta el patrón de concentración en mujeres jóvenes.</p>
                  <p><b>Regresión lineal y distribución normal:</b> responden directamente a los objetivos específicos, evaluando relación temporal y forma de la distribución.</p>
                </div>
              ),
            },
          ]}
        />
      </Reveal>
    </Section>
  );
}
