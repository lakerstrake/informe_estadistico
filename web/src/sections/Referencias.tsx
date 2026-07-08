import { Section, Reveal } from '../components/ui/Section';

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
        <ol className="space-y-4 text-sm text-gris max-w-3xl">
          {refs.map((r, i) => (
            <li key={i} className="pl-1">
              {r.text}{' '}
              {r.url && (
                <a href={r.url} target="_blank" rel="noreferrer" className="text-azul font-medium hover:underline break-all">
                  {r.url}
                </a>
              )}
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
