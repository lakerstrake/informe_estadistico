import { Section, Reveal } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Formula } from '../components/ui/Formula';

const ficha: [string, string][] = [
  ['Fuente', 'Observatorio de Salud de Bogotá (SaluData)'],
  ['Entidad responsable', 'Secretaría Distrital de Salud de Bogotá'],
  ['Indicador', 'Razón de prevalencia de sífilis gestacional en Bogotá D.C.'],
  ['Cobertura', 'Bogotá D.C.'],
  ['Periodo analizado', '2018–2025 (2025 preliminar)'],
  ['Periodicidad', 'Trimestral'],
  ['Fuente del numerador', 'SIVIGILA'],
  ['Fuente del denominador', 'DANE y RUAF'],
  ['Unidad de medida', 'Casos por cada 1,000 nacidos vivos y muertes fetales'],
];

export function Metodologia() {
  return (
    <Section id="metodologia" kicker="De dónde salen los datos" title="Base de datos y metodología">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Reveal>
          <Card className="p-6">
            <p className="font-semibold text-azul-dark mb-4">Ficha técnica</p>
            <table className="w-full text-sm">
              <tbody>
                {ficha.map(([k, v]) => (
                  <tr key={k} className="border-b border-black/5 last:border-0">
                    <td className="py-2 pr-3 font-medium text-gris w-2/5">{k}</td>
                    <td className="py-2 text-azul-dark">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-6">
            <p className="font-semibold text-azul-dark mb-2">Fórmula de la razón de prevalencia</p>
            <Formula tex={'\\text{Razón de prevalencia} = \\dfrac{N_s}{N_v + M_f} \\times 1000'} />
            <p className="text-sm text-gris mt-3">
              Donde <b>N</b>ₛ es el número de casos de sífilis gestacional, <b>N</b>ᵥ los nacidos vivos y{' '}
              <b>M</b>f las muertes fetales. El resultado expresa el número de casos por cada 1,000 nacidos vivos
              más muertes fetales.
            </p>
            <p className="text-sm text-gris mt-4">
              Para este análisis se utilizó el archivo CSV descargado del portal de Datos Abiertos de Bogotá, con
              variables de edad, condición migratoria, régimen de afiliación y enfoque diferencial. Cada registro
              (fila) se cuenta una sola vez.
            </p>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
