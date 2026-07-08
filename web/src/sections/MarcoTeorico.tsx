import type { ReactNode } from 'react';
import { Section, Reveal } from '../components/ui/Section';
import { Figure } from '../components/ui/Figure';
import { Icon } from '../components/ui/Icon';

function Panel({ icon, title, children }: { icon: string; title: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-azul/12 shadow-[0_2px_10px_rgba(9,46,65,0.06)] overflow-hidden">
      <div className="flex items-center gap-3.5 px-5 md:px-7 py-4 bg-azul/[0.05] border-b border-azul/10">
        <span className="shrink-0 w-10 h-10 rounded-xl bg-azul text-white flex items-center justify-center">
          <Icon name={icon} className="w-5 h-5" />
        </span>
        <h3 className="font-bold text-azul-dark text-lg md:text-xl">{title}</h3>
      </div>
      <div className="px-5 md:px-7 py-5 text-gris leading-relaxed presentacion-grande">{children}</div>
    </div>
  );
}

export function MarcoTeorico() {
  return (
    <Section id="marco-teorico" kicker="Fundamentos" title="Marco teórico, planteamiento y objetivos">
      <Reveal>
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-stretch mb-8">
          <Figure
            src="img/que es.png"
            alt="Infografía: qué es la sífilis gestacional"
            fit="contain"
            ratio="16 / 9"
            caption="Infografía educativa · Día Mundial de la Sífilis (fuente: Savia Salud EPS)."
            className="min-w-0"
          />
          <Figure
            src="img/treponema.png"
            alt="Bacteria Treponema pallidum, agente causal de la sífilis"
            ratio="3 / 2"
            caption="Treponema pallidum, la bacteria que causa la sífilis (imagen: Química Tarri)."
            className="min-w-0"
          />
        </div>
      </Reveal>

      <div className="space-y-5">
        <Reveal>
          <Panel icon="flask" title="Marco teórico">
            <div className="space-y-4">
              <p>
                La sífilis gestacional es una infección de transmisión sexual causada por la bacteria{' '}
                <em>Treponema pallidum</em>, que afecta a mujeres embarazadas y puede transmitirse al feto durante la
                gestación mediante <b>transmisión vertical</b> (World Health Organization, 2017). Si no se diagnostica
                y trata oportunamente, puede ocasionar aborto espontáneo, muerte fetal, parto prematuro, bajo peso al
                nacer, muerte neonatal y sífilis congénita (Alexander, 1999).
              </p>
              <p>
                En Colombia es un <b>evento de notificación obligatoria</b> al Sistema Nacional de Vigilancia en Salud
                Pública (SIVIGILA) (Instituto Nacional de Salud, 2015), cuya vigilancia busca identificar oportunamente
                los casos y disminuir la transmisión materno-infantil.
              </p>
              <p className="font-semibold text-azul-dark">Variables sociodemográficas asociadas</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Edad:</b> la enfermedad suele concentrarse en mujeres jóvenes en edad reproductiva (Muñoz et al., 2021).</li>
                <li><b>Régimen de afiliación:</b> mayor proporción de casos en régimen subsidiado y población no asegurada, evidenciando desigualdades de acceso (Becerra-Arias et al., 2022; Cruz-Aconcha, 2012).</li>
                <li><b>Condición migratoria:</b> barreras económicas, administrativas y geográficas pueden retrasar el diagnóstico (World Health Organization, 2017).</li>
                <li><b>Enfoque diferencial:</b> comunidades indígenas, afrodescendientes y otras poblaciones vulnerables requieren estrategias específicas (Ministerio de Salud y Protección Social, s.f.).</li>
              </ul>
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={0.05}>
          <Panel icon="alert" title="Planteamiento del problema">
            <Figure
              src="img/control-prenatal.avif"
              alt="Control prenatal de una gestante"
              ratio="4 / 3"
              caption="El control prenatal oportuno permite detectar y tratar la sífilis gestacional a tiempo."
              className="md:float-right md:w-80 md:ml-6 mb-4"
            />
            <p className="mb-3">
              La sífilis gestacional continúa siendo un problema de salud pública debido a las complicaciones que puede
              generar tanto para la madre como para el recién nacido. En Bogotá se presentan diferencias en la
              prevalencia según características sociodemográficas como la condición migratoria, el régimen de afiliación,
              el enfoque diferencial y la edad de las gestantes.
            </p>
            <p>
              A partir de la información disponible en <b>SaluData</b>, surge la necesidad de analizar estadísticamente
              estas variables para identificar patrones que ayuden a comprender el comportamiento de la enfermedad y a
              orientar estrategias de prevención. De ahí la <b>pregunta que guía el trabajo</b>: ¿cómo se distribuye la
              razón de prevalencia de sífilis gestacional en Bogotá D.C. (2018–2025) según estas variables?
            </p>
          </Panel>
        </Reveal>

        <Reveal delay={0.1}>
          <Panel icon="target" title="Objetivos">
            <div className="grid md:grid-cols-[auto_1fr] gap-x-5 gap-y-4">
              <p className="font-semibold text-azul-dark md:text-right">Objetivo general</p>
              <p>
                Analizar estadísticamente el comportamiento de la razón de prevalencia de sífilis gestacional en Bogotá
                D.C. durante 2018–2025, para identificar patrones sociodemográficos y temporales que orienten la
                formulación de estrategias de prevención y control.
              </p>
              <p className="font-semibold text-azul-dark md:text-right">Objetivos específicos</p>
              <ul className="space-y-2">
                {[
                  'Caracterizar a la población gestante según condición migratoria, régimen de afiliación y enfoque diferencial.',
                  'Establecer el perfil de edad de las mujeres afectadas y su evolución año a año.',
                  'Examinar la relación entre el año y la edad promedio mediante regresión lineal.',
                  'Comparar la distribución observada de la edad materna frente a un modelo de distribución normal teórica.',
                ].map((t, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="shrink-0 mt-0.5 text-verde"><Icon name="check" className="w-5 h-5" /></span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={0.15}>
          <Panel icon="bars" title="Justificación de las variables">
            <p className="mb-4">
              Cada variable se eligió porque responde a un <b>determinante social</b> o a un objetivo del estudio, no al
              azar:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ['Migrante', 'Determinante social asociado a barreras de acceso a los servicios de salud.'],
                ['Régimen de Seguridad Social', 'Condiciona el acceso real a controles prenatales y tratamiento.'],
                ['Enfoque diferencial', 'Visibiliza grupos poblacionales que requieren estrategias específicas.'],
                ['Año', 'Describe el comportamiento temporal del indicador entre 2018 y 2025.'],
                ['Edad', 'Variable cuantitativa central: confirma o refuta la concentración en mujeres jóvenes.'],
                ['Regresión y distribución normal', 'Responden a los objetivos: relación temporal y forma de la distribución.'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-azul/10 bg-azul/[0.03] px-4 py-3">
                  <p className="font-semibold text-azul-dark text-sm">{k}</p>
                  <p className="text-sm mt-0.5">{v}</p>
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}
