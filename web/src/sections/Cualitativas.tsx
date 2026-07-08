import stats from '../data/stats.json';
import { Section, Reveal } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { EChart } from '../components/charts/EChart';
import { barOption, pieOption, funnelOption, radarOption } from '../components/charts/options';
import { WordCloud } from '../components/charts/WordCloud';
import { ExplainButton } from '../components/ExplainContext';
import { fmt, fmtPct } from '../lib/format';

function FreqTable({ rows, catLabel }: { rows: { categoria: string; fi: number; fr: number; pct: number }[]; catLabel: string }) {
  const total = rows.reduce((s, r) => s + r.fi, 0);
  const maxPct = Math.max(...rows.map((r) => r.pct));
  return (
    <div className="overflow-x-auto rounded-xl ring-1 ring-azul/10">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-azul to-azul-dark text-white">
            <th className="px-4 py-3 text-left font-semibold">{catLabel}</th>
            <th className="px-4 py-3 text-right font-semibold">fi</th>
            <th className="px-4 py-3 text-right font-semibold">fr</th>
            <th className="px-4 py-3 text-right font-semibold">%</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.categoria}
              className={`transition-colors hover:bg-azul/[0.05] ${i % 2 ? 'bg-azul/[0.025]' : 'bg-white'}`}
            >
              <td className="px-4 py-2.5 font-medium text-ink">{r.categoria}</td>
              <td className="tnum px-4 py-2.5 text-right text-gris">{fmt(r.fi)}</td>
              <td className="tnum px-4 py-2.5 text-right text-gris">{r.fr.toFixed(4)}</td>
              <td className="px-4 py-2.5">
                <div className="flex items-center justify-end gap-2.5">
                  <span
                    className="hidden sm:block h-1.5 rounded-full bg-gradient-to-r from-azul/80 to-azul-light/80"
                    style={{ width: `${Math.max((r.pct / maxPct) * 56, 3)}px` }}
                    aria-hidden
                  />
                  <span className="tnum font-bold text-azul-dark">{fmtPct(r.pct)}</span>
                </div>
              </td>
            </tr>
          ))}
          <tr className="font-bold bg-azul/[0.06] border-t-2 border-azul/15">
            <td className="px-4 py-2.5 text-azul-dark">Total</td>
            <td className="tnum px-4 py-2.5 text-right text-azul-dark">{fmt(total)}</td>
            <td className="tnum px-4 py-2.5 text-right text-azul-dark">1.0000</td>
            <td className="tnum px-4 py-2.5 text-right text-azul-dark">100.0%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Analisis({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-gris mt-5 leading-relaxed presentacion-grande border-l-[3px] border-naranja/70 pl-4">
      <b className="text-azul-dark">Análisis.</b> {children}
    </p>
  );
}

function ChartTitle({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div className="mb-2">
      <p className="text-sm font-semibold text-azul-dark">{children}</p>
      {note && <p className="text-xs text-gris/80 mt-0.5 leading-snug">{note}</p>}
    </div>
  );
}

function MigranteTab() {
  const cats = stats.migrante.map((r) => r.categoria);
  const vals = stats.migrante.map((r) => r.fi);
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <p className="font-bold text-azul-dark">Tabla 1. Migrante</p>
          <ExplainButton
            payload={{
              title: 'Migrante — ¿cómo se calculó?',
              how: 'fi = número de registros cuyo valor de MIGRANTE coincide con la categoría (Colombiano/Extranjero). fr = fi/N. % = fr en formato porcentual, con N = 1,186.',
              purpose: 'Permite dimensionar qué proporción de las gestantes con sífilis gestacional son de nacionalidad colombiana vs. extranjera, para identificar posible vulnerabilidad diferencial en población migrante.',
              sheet: 'Frec_Migrante',
            }}
          />
        </div>
        <FreqTable rows={stats.migrante} catLabel="Migrante" />
        <Analisis>
          Aunque la mayoría de los casos se presenta en población colombiana, la proporción en población
          extranjera (38.8%) es considerablemente alta respecto a su participación demográfica en la ciudad, lo
          que sugiere una vulnerabilidad diferencial asociada a barreras de acceso a controles prenatales.
        </Analisis>
      </Card>
      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="p-5">
          <ChartTitle note="Barras: comparan de forma directa cuántos casos hay en cada categoría.">Cantidad por nacionalidad</ChartTitle>
          <EChart option={barOption(cats, vals)} height={260} />
        </Card>
        <Card className="p-5">
          <ChartTitle note="Sectores (torta): muestran qué proporción del total representa cada categoría.">Participación porcentual</ChartTitle>
          <EChart option={pieOption(cats, vals)} height={260} />
        </Card>
        <Card className="p-5">
          <ChartTitle note="Dona: igual que la torta pero libera el centro para destacar el total.">Formato dona</ChartTitle>
          <EChart option={pieOption(cats, vals, { donut: true })} height={260} />
        </Card>
        <Card className="p-5">
          <ChartTitle note="Embudo: ordena de mayor a menor para ver la jerarquía entre categorías.">Diagrama de embudo</ChartTitle>
          <EChart option={funnelOption(cats, vals)} height={260} />
        </Card>
      </div>
    </div>
  );
}

function RegimenTab() {
  const cats = stats.regimen.map((r) => r.categoria);
  const vals = stats.regimen.map((r) => r.fi);
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <p className="font-bold text-azul-dark">Tabla 2. Régimen de Seguridad Social</p>
          <ExplainButton
            payload={{
              title: 'Régimen — ¿cómo se calculó?',
              how: 'fi = número de registros por cada categoría de REGIMEN_SEGURIDAD_SOCIAL. fr = fi/N. % = fr en formato porcentual, con N = 1,186.',
              purpose: 'La suma de Subsidiado y No Asegurado (63.1%) confirma que la enfermedad se concentra en población con menor cobertura de aseguramiento en salud.',
              sheet: 'Frec_Regimen',
            }}
          />
        </div>
        <FreqTable rows={stats.regimen} catLabel="Régimen" />
        <Analisis>
          La suma de los regímenes Subsidiado y No Asegurado alcanza el 63.1% de los casos, lo cual confirma que
          la sífilis gestacional se concentra en población con menor cobertura de aseguramiento en salud.
        </Analisis>
      </Card>
      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="p-5">
          <ChartTitle note="Barras horizontales: cómodas cuando hay muchas categorías con nombres largos.">Cantidad por régimen</ChartTitle>
          <EChart option={barOption(cats, vals, { horizontal: true })} height={280} />
        </Card>
        <Card className="p-5">
          <ChartTitle note="Sectores: revelan qué regímenes dominan el total de casos.">Participación porcentual</ChartTitle>
          <EChart option={pieOption(cats, vals)} height={280} />
        </Card>
        <Card className="p-5">
          <ChartTitle note="Embudo: ordena los seis regímenes de mayor a menor de un vistazo.">Diagrama de embudo</ChartTitle>
          <EChart option={funnelOption(cats, vals)} height={300} />
        </Card>
        <Card className="p-5">
          <ChartTitle note="Radar: compara todas las categorías a la vez sobre un mismo eje circular.">Comparación por régimen (radar)</ChartTitle>
          <EChart option={radarOption(cats.map((c) => ({ name: c })), vals)} height={300} />
        </Card>
      </div>
    </div>
  );
}

function EnfoqueTab() {
  const cats = stats.enfoque.map((r) => r.categoria);
  const vals = stats.enfoque.map((r) => r.fi);
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <p className="font-bold text-azul-dark">Tabla 3. Enfoque Diferencial</p>
          <ExplainButton
            payload={{
              title: 'Enfoque diferencial — ¿cómo se calculó?',
              how: 'fi = número de registros por categoría de ENFOQUE_DIFERENCIAL (variable añadida por el equipo como tercera cualitativa). fr = fi/N. % = fr en formato porcentual.',
              purpose: 'Permite identificar si existen grupos étnicos con mayor riesgo relativo que requieran estrategias diferenciales de prevención.',
              sheet: 'Frec_Enfoque',
            }}
          />
        </div>
        <FreqTable rows={stats.enfoque} catLabel="Enfoque diferencial" />
        <Analisis>
          El 86.8% de los registros no declara un enfoque étnico diferencial ("Otro"). Entre quienes sí lo
          declaran, la población afrodescendiente (7.1%) e indígena (3.7%) son los grupos más representados.
        </Analisis>
      </Card>
      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="p-5">
          <ChartTitle note="Barras: dejan ver la enorme diferencia entre 'Otro' y los grupos étnicos declarados.">Frecuencia de casos</ChartTitle>
          <EChart option={barOption(cats, vals)} height={280} />
        </Card>
        <Card className="p-5">
          <ChartTitle note="Dona: muestra que 'Otro' concentra casi 9 de cada 10 registros.">Distribución porcentual</ChartTitle>
          <EChart option={pieOption(cats, vals, { donut: true })} height={280} />
        </Card>
        <Card className="p-5 sm:col-span-2">
          <ChartTitle note="Nube de palabras: el tamaño de cada término refleja su frecuencia; ideal para captar lo dominante de un vistazo.">Nube de palabras (tamaño proporcional a la frecuencia)</ChartTitle>
          <WordCloud
            items={stats.enfoque.map((r) => ({
              text: r.categoria === 'Negro-mulato-afro colombiano' ? 'Afrocolombiano' : r.categoria,
              weight: r.fi,
            }))}
          />
        </Card>
      </div>
    </div>
  );
}

export function Cualitativas() {
  return (
    <Section id="cualitativas" kicker="Parte I" title="Variables cualitativas">
      <Reveal>
        <Tabs
          tabs={[
            { label: 'Migrante', content: <MigranteTab /> },
            { label: 'Régimen de Seguridad Social', content: <RegimenTab /> },
            { label: 'Enfoque Diferencial', content: <EnfoqueTab /> },
          ]}
        />
      </Reveal>
    </Section>
  );
}
