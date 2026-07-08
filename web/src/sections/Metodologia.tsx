import type { ReactNode } from 'react';
import { Section, Reveal } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Formula } from '../components/ui/Formula';
import { Icon } from '../components/ui/Icon';
import { DataExplorer } from '../components/DataExplorer';

const ficha: [string, string, string][] = [
  ['layers', 'Fuente', 'Observatorio de Salud de Bogotá (SaluData)'],
  ['building', 'Entidad responsable', 'Secretaría Distrital de Salud de Bogotá'],
  ['pulse', 'Indicador', 'Razón de prevalencia de sífilis gestacional'],
  ['mapPin', 'Cobertura', 'Bogotá D.C.'],
  ['calendar', 'Periodo analizado', '2018–2025 (2025 preliminar)'],
  ['repeat', 'Periodicidad', 'Trimestral'],
  ['fileText', 'Fuente del numerador', 'SIVIGILA'],
  ['calculator', 'Fuente del denominador', 'DANE y RUAF'],
  ['ruler', 'Unidad de medida', 'Casos por cada 1.000 nacidos vivos y muertes fetales'],
];

const NODE_COLOR: Record<string, string> = {
  azul: 'bg-azul/10 text-azul',
  verde: 'bg-verde/10 text-verde',
  naranja: 'bg-naranja/10 text-naranja',
};

function FlowNode({ icon, title, sub, tag, color }: { icon: string; title: string; sub: string; tag: string; color: string }) {
  return (
    <div className="flex-1 rounded-xl border border-azul/10 bg-white p-4 text-center min-w-0">
      <div className={`mx-auto mb-2.5 w-11 h-11 rounded-xl flex items-center justify-center ${NODE_COLOR[color]}`}>
        <Icon name={icon} className="w-6 h-6" />
      </div>
      <p className="font-bold text-azul-dark text-sm">{title}</p>
      <p className="text-xs text-gris mt-0.5 leading-snug">{sub}</p>
      <span className="inline-block mt-2 text-[0.65rem] font-semibold text-azul bg-azul/10 rounded-full px-2 py-0.5">{tag}</span>
    </div>
  );
}

function FlowSep({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center text-2xl font-bold text-gris/50 py-1 md:py-0 md:px-1 rotate-90 md:rotate-0" aria-hidden>
      {children}
    </div>
  );
}

export function Metodologia() {
  return (
    <Section id="metodologia" kicker="De dónde salen los datos" title="Base de datos y metodología">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-azul/10 shadow-[0_8px_28px_rgba(9,46,65,0.12)] mb-8 h-44 md:h-60">
          <img
            src={`${import.meta.env.BASE_URL}img/bogota.avif`}
            alt="Bogotá D.C."
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-azul-deep/90 via-azul-dark/55 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white">
            <p className="text-[0.7rem] md:text-xs uppercase tracking-[0.2em] text-white/70 mb-1">Territorio del estudio</p>
            <p className="display-serif text-2xl md:text-4xl font-bold">Bogotá D.C. · 2018–2025</p>
            <p className="text-white/80 text-sm md:text-base mt-1">1.186 registros del Observatorio de Salud de Bogotá (SaluData)</p>
          </div>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Reveal>
          <Card className="p-6">
            <p className="flex items-center gap-2 font-bold text-azul-dark mb-4">
              <Icon name="fileText" className="w-5 h-5 text-naranja" /> Ficha técnica
            </p>
            <table className="w-full text-sm">
              <tbody>
                {ficha.map(([ic, k, v]) => (
                  <tr key={k} className="border-b border-azul/5 last:border-0 hover:bg-azul/[0.03] transition-colors">
                    <td className="py-2.5 pr-3 w-2/5">
                      <span className="flex items-center gap-2 font-semibold text-gris text-[0.78rem] uppercase tracking-wide">
                        <Icon name={ic} className="w-4 h-4 text-azul shrink-0" /> {k}
                      </span>
                    </td>
                    <td className="py-2.5 text-azul-dark">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-6">
            <p className="flex items-center gap-2 font-bold text-azul-dark mb-3">
              <Icon name="calculator" className="w-5 h-5 text-naranja" /> Fórmula de la razón de prevalencia
            </p>
            <div className="bg-azul/[0.05] border border-azul/10 rounded-xl px-4 py-1">
              <Formula tex={'\\text{Razón de prevalencia} = \\dfrac{N_s}{N_v + M_f} \\times 1000'} />
            </div>
            <p className="text-sm text-gris mt-4 leading-relaxed">
              <b className="text-azul-dark">¿Para qué sirve?</b> Es una <b>razón</b> que mide cuántos casos de sífilis
              gestacional ocurren en relación con el total de embarazos que terminaron en nacimiento o muerte fetal.
              Permite comparar la magnitud del problema entre años o territorios de distinto tamaño, porque no depende
              de cuántos embarazos haya en total.
            </p>
            <ul className="text-sm text-gris mt-3 space-y-1.5 list-disc pl-5">
              <li><b>N</b>ₛ = número de casos de sífilis gestacional (numerador).</li>
              <li><b>N</b>ᵥ + <b>M</b>f = nacidos vivos + muertes fetales, es decir el total de gestaciones consideradas (denominador).</li>
            </ul>
            <p className="text-sm text-gris mt-3 leading-relaxed">
              <b className="text-azul-dark">¿De dónde sale el ×1000?</b> El cociente daría un número muy pequeño (por
              ejemplo 0,0071). Multiplicar por <b>1.000</b> lo convierte en una cifra fácil de leer —
              <b> casos por cada 1.000 nacidos vivos</b>— igual que otros indicadores de salud pública (mortalidad
              infantil, natalidad). No cambia la proporción, solo la escala.
            </p>
            <p className="text-sm text-gris mt-4 leading-relaxed">
              Para este análisis se utilizó el archivo CSV descargado del portal de Datos Abiertos de Bogotá. Cada
              registro (fila) se cuenta una sola vez.
            </p>
          </Card>
        </Reveal>
      </div>

      {/* Diagrama del indicador: ayuda visual para la sustentación */}
      <Reveal delay={0.15}>
        <Card className="p-6 mt-8">
          <p className="flex items-center gap-2 font-bold text-azul-dark mb-2">
            <Icon name="pulse" className="w-5 h-5 text-naranja" /> Cómo se construye el indicador
          </p>
          <p className="text-sm text-gris mb-5 max-w-3xl leading-relaxed">
            El indicador combina <b>tres fuentes oficiales</b>. Se toman los casos confirmados de sífilis gestacional
            (numerador) y se dividen entre el total de gestaciones —nacidos vivos más muertes fetales— (denominador);
            ese cociente se multiplica por 1.000 para expresarlo en una escala legible. Lee el diagrama de izquierda a
            derecha:
          </p>
          <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-3">
            <FlowNode icon="fileText" title="Numerador" sub="Casos confirmados de sífilis gestacional" tag="SIVIGILA" color="azul" />
            <FlowSep>÷</FlowSep>
            <FlowNode icon="user" title="Denominador" sub="Nacidos vivos + muertes fetales" tag="DANE · RUAF" color="verde" />
            <FlowSep>×1000</FlowSep>
            <FlowNode icon="pulse" title="Razón de prevalencia" sub="Casos por cada 1.000 nacidos vivos" tag="Indicador final" color="naranja" />
          </div>
          <p className="text-xs text-gris mt-4">
            <b>SIVIGILA</b>: sistema nacional de vigilancia que reporta los casos · <b>DANE</b> y <b>RUAF</b>: registran
            nacimientos y muertes fetales que forman el denominador.
          </p>
        </Card>
      </Reveal>

      <Reveal delay={0.2}>
        <DataExplorer />
      </Reveal>
    </Section>
  );
}
