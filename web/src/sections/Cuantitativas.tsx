import stats from '../data/stats.json';
import { Section, Reveal } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { Formula } from '../components/ui/Formula';
import { EChart } from '../components/charts/EChart';
import { barOption, lineOption, radarOption, funnelOption, scatterTrendOption, densityCurveOption, comparisonBarLineOption } from '../components/charts/options';
import { ExplainButton } from '../components/ExplainContext';
import { fmt, fmtPct } from '../lib/format';

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-azul/5 last:border-0 hover:bg-azul/[0.03] transition-colors">
      <td className="py-2 pr-3 text-gris">{label}</td>
      <td className="tnum py-2 text-right font-bold text-azul-dark">{value}</td>
    </tr>
  );
}

function ChartTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold text-azul-dark mb-2">{children}</p>;
}

function AnioTab() {
  const cats = stats.anio.tabla.map((r) => String(r.anio));
  const vals = stats.anio.tabla.map((r) => r.fi);
  const s = stats.anio.stats;
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <p className="font-bold text-azul-dark">Medidas estadísticas — Año</p>
            <ExplainButton
              payload={{
                title: 'Año — ¿cómo se calculó?',
                how: 'fi se obtiene contando los registros por año (N=1,186). Moda, mediana y cuartiles usan las fórmulas de datos agrupados con corrección de continuidad (L−0.5) y amplitud c=1. La media, varianza y desviación estándar se calculan sobre los 1,186 valores individuales de Año.',
                purpose: 'Permite describir la tendencia temporal del número de casos año a año y resumir su posición y dispersión.',
                sheet: 'Frec_Anio',
              }}
            />
          </div>
          <table className="w-full text-sm">
            <tbody>
              <StatRow label="Media" value={fmt(s.media, 2)} />
              <StatRow label="Moda" value={`${fmt(s.moda, 2)} (clase 2020)`} />
              <StatRow label="Mediana" value={fmt(s.mediana, 2)} />
              <StatRow label="Q1" value={fmt(s.q1, 2)} />
              <StatRow label="Q3" value={fmt(s.q3, 2)} />
              <StatRow label="Desviación estándar" value={`${fmt(s.desviacion, 2)} años`} />
            </tbody>
          </table>
        </Card>
        <Card className="p-5">
          <ChartTitle>Evolución de casos por año</ChartTitle>
          <EChart option={lineOption(cats, vals)} height={280} />
        </Card>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="p-5">
          <ChartTitle>Frecuencia por año</ChartTitle>
          <EChart option={barOption(cats, vals)} height={280} />
        </Card>
        <Card className="p-5">
          <ChartTitle>Diagrama de embudo</ChartTitle>
          <EChart option={funnelOption(cats, vals)} height={280} />
        </Card>
        <Card className="p-5 sm:col-span-2">
          <ChartTitle>Gráfico de araña (radar)</ChartTitle>
          <EChart option={radarOption(cats.map((c) => ({ name: c })), vals)} height={300} />
        </Card>
      </div>
    </div>
  );
}

function EdadTab() {
  const cats = stats.edad.tabla.map((r) => r.intervalo);
  const vals = stats.edad.tabla.map((r) => r.fi);
  const s = stats.edad.stats;
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <p className="font-bold text-azul-dark">Medidas estadísticas — Edad</p>
            <ExplainButton
              payload={{
                title: 'Edad — ¿cómo se calculó?',
                how: 'fi se obtiene contando los registros cuya edad cae en cada intervalo de 5 años (N=1,186). Moda, mediana y cuartiles usan las fórmulas de datos agrupados con L literal (sin corrección) y c=5. Media, varianza y desviación estándar ponderan cada marca de clase por su frecuencia.',
                purpose: 'Describe el perfil etario de las gestantes afectadas y confirma si se concentra en mujeres jóvenes en edad reproductiva.',
                sheet: 'Frec_Edad',
              }}
            />
          </div>
          <table className="w-full text-sm">
            <tbody>
              <StatRow label="Media" value={`${fmt(s.media, 2)} años`} />
              <StatRow label="Moda" value={`${fmt(s.moda, 2)} (clase 20-24)`} />
              <StatRow label="Mediana" value={fmt(s.mediana, 2)} />
              <StatRow label="Q1 / Q3" value={`${fmt(s.q1, 2)} / ${fmt(s.q3, 2)}`} />
              <StatRow label="Desviación estándar" value={`${fmt(s.desviacion, 2)} años`} />
              <StatRow label="Coef. de variación" value={fmtPct(s.coefVariacion)} />
              <StatRow label="Mínimo / Máximo" value={`${s.min} / ${s.max} años`} />
            </tbody>
          </table>
        </Card>
        <Card className="p-5">
          <ChartTitle>Histograma</ChartTitle>
          <EChart option={barOption(cats, vals)} height={280} />
        </Card>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="p-5">
          <ChartTitle>Polígono de frecuencias</ChartTitle>
          <EChart option={lineOption(cats, vals)} height={260} />
        </Card>
        <Card className="p-5">
          <ChartTitle>Ojiva (frecuencia acumulada)</ChartTitle>
          <EChart option={lineOption(cats, stats.edad.tabla.map((r) => r.fiAcum), { color: '#D95E1E', name: 'Acumulada (Fi)' })} height={260} />
        </Card>
        <Card className="p-5 sm:col-span-2">
          <ChartTitle>Distribución por grupo etario (radial)</ChartTitle>
          <EChart option={radarOption(cats.map((c) => ({ name: c })), vals)} height={300} />
        </Card>
      </div>
    </div>
  );
}

function RegresionTab() {
  const pts = stats.regresion.puntos.map((p) => ({ x: p.anio, y: p.edadPromedio }));
  const trend = [2018, 2025].map((x) => ({ x, y: stats.regresion.pendiente * x + stats.regresion.intercepto }));
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <p className="font-bold text-azul-dark">Regresión lineal: Año → Edad promedio</p>
          <ExplainButton
            payload={{
              title: 'Regresión lineal — ¿cómo se calculó?',
              how: 'Se calculó la edad promedio de las gestantes por cada año (Y) y se ajustó un modelo de mínimos cuadrados frente al año (X), obteniendo pendiente, intercepto, r y r² con las fórmulas estándar de regresión lineal simple.',
              purpose: 'Permite examinar si el perfil etario de la población afectada ha cambiado de forma sostenida a lo largo del tiempo.',
              sheet: 'Regresion',
            }}
          />
        </div>
        <div className="bg-azul/[0.05] border border-azul/10 rounded-xl px-4 py-1 mb-4">
          <Formula tex={`Edad_{prom} = ${stats.regresion.pendiente} \\times Año ${stats.regresion.intercepto < 0 ? '-' : '+'} ${Math.abs(stats.regresion.intercepto)}`} />
        </div>
        <table className="w-full text-sm">
          <tbody>
            <StatRow label="Pendiente (b)" value={fmt(stats.regresion.pendiente, 4)} />
            <StatRow label="Intercepto (a)" value={fmt(stats.regresion.intercepto, 4)} />
            <StatRow label="Coeficiente de correlación (r)" value={fmt(stats.regresion.r, 4)} />
            <StatRow label="Coeficiente de determinación (r²)" value={`${fmt(stats.regresion.r2 * 100, 1)}%`} />
          </tbody>
        </table>
        <p className="text-sm text-gris mt-5 leading-relaxed presentacion-grande border-l-[3px] border-naranja/70 pl-4">
          <b className="text-azul-dark">Análisis.</b> El modelo obtuvo r² = {fmt(stats.regresion.r2 * 100, 1)}%, lo
          que significa que el año explica apenas esa fracción de la variación en la edad promedio de las
          gestantes. No existe una tendencia lineal relevante: el perfil etario se mantuvo estable entre 2018 y
          2025.
        </p>
      </Card>
      <Card className="p-5">
        <ChartTitle>Dispersión con línea de tendencia</ChartTitle>
        <EChart option={scatterTrendOption(pts, trend, { x: 'Año', y: 'Edad promedio' })} height={380} />
      </Card>
    </div>
  );
}

function NormalTab() {
  const cats = stats.normal.comparacion.map((r) => r.intervalo);
  const obs = stats.edad.tabla.map((r) => r.fi);
  const exp = stats.normal.comparacion.map((r) => r.esperada);
  const markers = stats.normal.reglaEmpirica.flatMap((r) => [
    { x: r.lo, fx: 0, label: `-${r.k}σ` },
    { x: r.hi, fx: 0, label: `+${r.k}σ` },
  ]);
  const markersOnCurve = markers.map((m) => {
    const closest = stats.normal.curva.reduce((a, b) => (Math.abs(b.x - m.x) < Math.abs(a.x - m.x) ? b : a));
    return { ...m, fx: closest.fx };
  });
  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <p className="font-bold text-azul-dark">Distribución normal aplicada a Edad</p>
            <ExplainButton
              payload={{
                title: 'Distribución normal — ¿cómo se calculó?',
                how: `Se usó μ = ${fmt(stats.normal.mu, 2)} y σ = ${fmt(stats.normal.sigma, 2)} (media y desviación estándar de Edad). La frecuencia esperada por intervalo = [CDF(límite superior) − CDF(límite inferior)] × N. La regla empírica compara el % observado dentro de μ±kσ contra el % teórico (68-95-99.7).`,
                purpose: 'Permite evaluar qué tan cerca está la distribución real de la edad materna de un modelo normal teórico, y detectar en qué tramos se aleja más.',
                sheet: 'Distribucion_Normal',
              }}
            />
          </div>
          <div className="bg-azul/[0.05] border border-azul/10 rounded-xl px-4 py-1 mb-4">
            <Formula tex={'f(x) = \\dfrac{1}{\\sigma\\sqrt{2\\pi}}\\, e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}'} />
          </div>
          <table className="w-full text-sm">
            <tbody>
              <StatRow label="μ (media)" value={`${fmt(stats.normal.mu, 2)} años`} />
              <StatRow label="σ (desviación estándar)" value={`${fmt(stats.normal.sigma, 2)} años`} />
              <StatRow label="Asimetría (g1)" value={fmt(stats.edad.stats.skewness, 2)} />
              <StatRow label="Curtosis (g2)" value={fmt(stats.edad.stats.kurtosis, 2)} />
            </tbody>
          </table>
        </Card>
        <Card className="p-5">
          <ChartTitle>Observada vs. esperada bajo normalidad</ChartTitle>
          <EChart option={comparisonBarLineOption(cats, obs, exp)} height={320} />
        </Card>
      </div>

      <Card className="p-6">
        <p className="font-bold text-azul-dark mb-4">Regla empírica (68-95-99.7)</p>
        <div className="overflow-x-auto rounded-xl ring-1 ring-azul/10">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-azul to-azul-dark text-white">
                <th className="px-4 py-3 text-left font-semibold">Rango</th>
                <th className="px-4 py-3 text-right font-semibold">% teórico</th>
                <th className="px-4 py-3 text-right font-semibold">% observado</th>
              </tr>
            </thead>
            <tbody>
              {stats.normal.reglaEmpirica.map((r, i) => (
                <tr key={r.k} className={`transition-colors hover:bg-azul/[0.05] ${i % 2 ? 'bg-azul/[0.025]' : 'bg-white'}`}>
                  <td className="tnum px-4 py-2.5">
                    μ ± {r.k}σ [{fmt(r.lo, 2)}, {fmt(r.hi, 2)}]
                  </td>
                  <td className="tnum px-4 py-2.5 text-right text-gris">{fmtPct(r.teoricoPct, 2)}</td>
                  <td className="tnum px-4 py-2.5 text-right font-bold text-azul-dark">{fmtPct(r.observadoPct, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-5">
        <ChartTitle>Curva normal teórica, N(μ, σ²)</ChartTitle>
        <EChart option={densityCurveOption(stats.normal.curva, markersOnCurve, stats.normal.mu)} height={340} />
      </Card>
    </div>
  );
}

export function Cuantitativas() {
  return (
    <Section id="cuantitativas" kicker="Parte II" title="Variables cuantitativas">
      <Reveal>
        <Tabs
          tabs={[
            { label: 'Año', content: <AnioTab /> },
            { label: 'Edad', content: <EdadTab /> },
            { label: 'Regresión lineal', content: <RegresionTab /> },
            { label: 'Distribución normal', content: <NormalTab /> },
          ]}
        />
      </Reveal>
    </Section>
  );
}
