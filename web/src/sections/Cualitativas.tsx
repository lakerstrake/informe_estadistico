import stats from '../data/stats.json';
import { Section, Reveal } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { EChart } from '../components/charts/EChart';
import { barOption, pieOption, funnelOption, radarOption } from '../components/charts/options';
import { ExplainButton } from '../components/ExplainContext';
import { fmt, fmtPct } from '../lib/format';

function FreqTable({ rows, catLabel }: { rows: { categoria: string; fi: number; fr: number; pct: number }[]; catLabel: string }) {
  const total = rows.reduce((s, r) => s + r.fi, 0);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-azul text-white">
            <th className="px-3 py-2 text-left rounded-tl-lg">{catLabel}</th>
            <th className="px-3 py-2 text-right">fi</th>
            <th className="px-3 py-2 text-right">fr</th>
            <th className="px-3 py-2 text-right rounded-tr-lg">%</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.categoria} className={i % 2 ? 'bg-black/[0.02]' : ''}>
              <td className="px-3 py-2">{r.categoria}</td>
              <td className="px-3 py-2 text-right">{fmt(r.fi)}</td>
              <td className="px-3 py-2 text-right">{r.fr.toFixed(4)}</td>
              <td className="px-3 py-2 text-right font-semibold">{fmtPct(r.pct)}</td>
            </tr>
          ))}
          <tr className="font-bold border-t-2 border-azul/20">
            <td className="px-3 py-2">Total</td>
            <td className="px-3 py-2 text-right">{fmt(total)}</td>
            <td className="px-3 py-2 text-right">1.0000</td>
            <td className="px-3 py-2 text-right">100.0%</td>
          </tr>
        </tbody>
      </table>
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
          <p className="font-semibold text-azul-dark">Tabla 1. Migrante</p>
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
        <p className="text-sm text-gris mt-4 leading-relaxed presentacion-grande">
          <b className="text-azul-dark">Análisis.</b> Aunque la mayoría de los casos se presenta en población
          colombiana, la proporción en población extranjera (38.8%) es considerablemente alta respecto a su
          participación demográfica en la ciudad, lo que sugiere una vulnerabilidad diferencial asociada a
          barreras de acceso a controles prenatales.
        </p>
      </Card>
      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="p-5">
          <p className="text-sm font-semibold text-gris mb-2">Cantidad por nacionalidad</p>
          <EChart option={barOption(cats, vals)} height={260} />
        </Card>
        <Card className="p-5">
          <p className="text-sm font-semibold text-gris mb-2">Participación porcentual</p>
          <EChart option={pieOption(cats, vals)} height={260} />
        </Card>
        <Card className="p-5">
          <p className="text-sm font-semibold text-gris mb-2">Formato dona</p>
          <EChart option={pieOption(cats, vals, { donut: true })} height={260} />
        </Card>
        <Card className="p-5">
          <p className="text-sm font-semibold text-gris mb-2">Diagrama de embudo</p>
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
          <p className="font-semibold text-azul-dark">Tabla 2. Régimen de Seguridad Social</p>
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
        <p className="text-sm text-gris mt-4 leading-relaxed presentacion-grande">
          <b className="text-azul-dark">Análisis.</b> La suma de los regímenes Subsidiado y No Asegurado alcanza
          el 63.1% de los casos, lo cual confirma que la sífilis gestacional se concentra en población con menor
          cobertura de aseguramiento en salud.
        </p>
      </Card>
      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="p-5">
          <p className="text-sm font-semibold text-gris mb-2">Cantidad por régimen</p>
          <EChart option={barOption(cats, vals, { horizontal: true })} height={280} />
        </Card>
        <Card className="p-5">
          <p className="text-sm font-semibold text-gris mb-2">Participación porcentual</p>
          <EChart option={pieOption(cats, vals)} height={280} />
        </Card>
        <Card className="p-5 sm:col-span-2">
          <p className="text-sm font-semibold text-gris mb-2">Comparación por régimen (radar)</p>
          <EChart
            option={radarOption(
              cats.map((c) => ({ name: c, max: 500 })),
              vals
            )}
            height={300}
          />
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
          <p className="font-semibold text-azul-dark">Tabla 3. Enfoque Diferencial</p>
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
        <p className="text-sm text-gris mt-4 leading-relaxed presentacion-grande">
          <b className="text-azul-dark">Análisis.</b> El 86.8% de los registros no declara un enfoque étnico
          diferencial ("Otro"). Entre quienes sí lo declaran, la población afrodescendiente (7.1%) e indígena
          (3.7%) son los grupos más representados.
        </p>
      </Card>
      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="p-5">
          <p className="text-sm font-semibold text-gris mb-2">Frecuencia de casos</p>
          <EChart option={barOption(cats, vals)} height={280} />
        </Card>
        <Card className="p-5">
          <p className="text-sm font-semibold text-gris mb-2">Distribución porcentual</p>
          <EChart option={pieOption(cats, vals, { donut: true })} height={280} />
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
