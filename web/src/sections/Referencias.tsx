import { Section, Reveal } from '../components/ui/Section';
import { Figure } from '../components/ui/Figure';

const refs: { text: string; url?: string }[] = [
  { text: 'Alexander, J. (1999). Efficacy of treatment for syphilis in pregnancy. Obstetrics and Gynecology, 93(1), 5–8.', url: 'https://doi.org/10.1016/s0029-7844(98)00338-x' },
  { text: 'Becerra-Arias, C., Alvarado-Socarras, J. L., Manrique-Hernández, E. F., & Caballero-Carvajal, J. A. (2022). Estudio ecológico de la sífilis gestacional y congénita en Colombia, 2012-2018. Revista Cuidarte, 13(1).' },
  { text: 'Cruz-Aconcha, A. R. (2012). Situación de la sífilis gestacional y congénita en Colombia, un desafío al Sistema General de Seguridad Social en Salud. Revista Colombiana de Obstetricia y Ginecología.' },
  { text: 'Effectiveness of benzathine penicillin regimen in the treatment of syphilis in pregnancy. (1989, February 1). PubMed.', url: 'https://pubmed.ncbi.nlm.nih.gov/2738484/' },
  { text: 'Instituto Nacional de Salud. (2015). Protocolo de Vigilancia en Salud Pública: Sífilis gestacional y sífilis congénita.' },
  { text: 'Ministerio de Salud y Protección Social. (s.f.). Infecciones de transmisión sexual (ITS), VIH y sífilis gestacional.' },
  { text: 'Muñoz, L., et al. (2021). Características sociodemográficas y clínicas de la sífilis gestacional en Cali, 2018. Biomédica.' },
  { text: 'Salomè, S., & Tzialla, C. (2026). Treatment of syphilis in pregnancy and congenital syphilis: current evidence, challenges, and future directions. Antibiotics, 15(3), 305.', url: 'https://doi.org/10.3390/antibiotics15030305' },
  { text: 'Secretaría Distrital de Salud de Bogotá. (2026, 25 de junio). Sífilis gestacional en Bogotá D.C. – SaluData, Observatorio de Salud de Bogotá.', url: 'https://saludata.saludcapital.gov.co/osb/indicadores/sifilis-gestacional/' },
  { text: 'World Health Organization. (2017, January 1). WHO guideline on syphilis screening and treatment for pregnant women.', url: 'https://www.who.int/publications/i/item/9789241550093' },
];

export function Referencias() {
  return (
    <Section id="referencias" kicker="Fuentes" title="Referencias (APA 7)">
      <Reveal>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start mb-10">
          <div>
            <p className="text-gris leading-relaxed presentacion-grande">
              Todos los datos analizados provienen del <b className="text-azul-dark">Observatorio de Salud de Bogotá
              (SaluData)</b>, el portal oficial de datos abiertos de la Secretaría Distrital de Salud. De allí se
              descargó el conjunto de registros de sífilis gestacional (2018–2025) usado en todo el informe.
            </p>
            <a
              href="https://saludata.saludcapital.gov.co/osb/indicadores/sifilis-gestacional/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-azul text-white font-semibold rounded-full px-5 py-3 hover:bg-azul-dark transition-colors"
            >
              Ir al indicador en SaluData →
            </a>
          </div>
          <Figure
            src="img/saluddata.png"
            alt="Página del Observatorio de Salud de Bogotá (SaluData)"
            ratio="16 / 9"
            caption="Portal SaluData — Observatorio de Salud de Bogotá (Secretaría Distrital de Salud), fuente oficial de los datos."
          />
        </div>

        <ol className="max-w-3xl space-y-2.5">
          {refs.map((r, i) => (
            <li
              key={i}
              className="flex gap-4 bg-white border border-azul/10 rounded-xl px-5 py-3.5 text-sm text-gris leading-relaxed hover:border-azul/25 hover:shadow-[0_4px_16px_rgba(9,46,65,0.07)] transition-all"
            >
              <span className="tnum shrink-0 font-bold text-naranja/90 w-6 text-right" aria-hidden>
                {i + 1}.
              </span>
              <span>
                {r.text}{' '}
                {r.url && (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-azul font-medium hover:underline break-all"
                  >
                    {r.url}
                  </a>
                )}
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
