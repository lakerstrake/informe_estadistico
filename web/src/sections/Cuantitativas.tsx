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
    <tr className="border-b border-black/5 last:border-0">
      <td className="py-1.5 pr-3 text-gris">{label}</td>
      <td className="py-1.5 text-right font-semibold text-azul-dark">{value}</td>
    </tr>
  );
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
            <p className="font-semibold text-azul-dark">Medidas estadísticas — Año</p>
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
          <p className="text-sm font-semibold text-gris mb-2">Evolución de casos por año</p>
          <EChart option={lineOption(cats, vals)} height={280} />
        </Card>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="p-5">
          <p className="text-sm font-semibold text-gris mb-2">Frecuencia por año</p>
          <EChart option={barOption(cats, vals)} height={280} />
        </Card>
        <Card className="p-5">
          <p className="text-sm font-semibold text-gris mb-2">Diagrama de embudo</p>
          <EChart option={funnelOption(cats, vals)} height={280} />
        </Card>
        <Card className="p-5 sm:col-span-2">
          <p className="text-sm font-semibold text-gris mb-2">Gráfico de araña (radar)</p>
          <EChart option={radarOption(cats.map((c) => ({ name: c, max: 180 })), vals)} height={300} />
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
            <p className="font-semibold text-azul-dark">Medidas estadísticas — Edad</p>
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
          <p className="text-sm font-semibold text-gris mb-2">Histograma</p>
          <EChart option={barOption(cats, vals)} height={280} />
        </Card>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="p-5">
          <p className="text-sm font-semibold text-gris mb-2">Polígono de frecuencias</p>
          <EChart option={lineOption(cats, vals)} height={260} />
        </Card>
        <Card className="p-5">
          <p className="text-sm font-semibold text-gris mb-2">Ojiva (frecuencia acumulada)</p>
          <EChart option={lineOption(cats, stats.edad.tabla.map((r) => r.fiAcum), { color: '#E97132' })} height={260} />
        </Card>
        <Card className="p-5 sm:col-span-2">
          <p className="text-sm font-semibold text-gris mb-2">Distribución por grupo etario (radial)</p>
          <EChart option={radarOption(cats.map((c) => ({ name: c, max: 300 })), vals)} height={300} />
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
          <p className="font-semibold text-azul-dark">Regresión lineal: Año → Edad promedio</p>
          <ExplainButton
            payload={{
              title: 'Regresión lineal — ¿cómo se calculó?',
              how: 'Se calculó la edad promedio de las gestantes por cada año (Y) y se ajustó un modelo de mínimos cuadrados frente al año (X), obteniendo pendiente, intercepto, r y r² con las fórmulas estándar de regresión lineal simple.',
              purpose: 'Permite examinar si el perfil etario de la población afectada ha cambiado de forma sostenida a lo largo del tiempo.',
              sheet: 'Regresion',
            }}
          />
        </div>
        <Formula tex={`Edad_{prom} = ${stats.regresion.pendiente} \\times Año ${stats.regresion.intercepto < 0 ? '-' : '+'} ${Math.abs(stats.regresion.intercepto)}`} />
        <table className="w-full text-sm mt-4">
          <tbody>
            <StatRow label="Pendiente (b)" value={fmt(stats.regresion.pendiente, 4)} />
            <StatRow label="Intercepto (a)" value={fmt(stats.regresion.intercepto, 4)} />
            <StatRow label="Coeficiente de correlación (r)" value={fmt(stats.regresion.r, 4)} />
            <StatRow label="Coeficiente de determinación (r²)" value={`${fmt(stats.regresion.r2 * 100, 1)}%`} />
          </tbody>
        </table>
        <p className="text-sm text-gris mt-4 leading-relaxed presentacion-grande">
          <b className="text-azul-dark">Análisis.</b> El modelo obtuvo r² = {fmt(stats.regresion.r2 * 100, 1)}%, lo
          que significa que el año explica apenas esa fracción de la variación en la edad promedio de las
          gestantes. No existe una tendencia lineal relevante: el perfil etario se mantuvo estable entre 2018 y
          2025.
        </p>
      </Card>
      <Card className="p-5">
        <p className="text-sm font-semibold text-gris mb-2">Dispersión con línea de tendencia</p>
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
            <p className="font-semibold text-azul-dark">Distribución normal aplicada a Edad</p>
            <ExplainButton
              payload={{
                title: 'Distribución normal — ¿cómo se calculó?',
                how: `Se usó μ = ${fmt(stats.normal.mu, 2)} y σ = ${fmt(stats.normal.sigma, 2)} (media y desviación estándar de Edad). La frecuencia esperada por intervalo = [CDF(límite superior) − CDF(límite inferior)] × N. La regla empírica compara el % observado dentro de μ±kσ contra el % teórico (68-95-99.7).`,
                purpose: 'Permite evaluar qué tan cerca está la distribución real de la edad materna de un modelo normal teórico, y detectar en qué tramos se aleja más.',
                sheet: 'Distribucion_Normal',
              }}
            />
          </div>
          <Formula tex={'f(x) = \\dfrac{1}{\\sigma\\sqrt{2\\pi}}\\, e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}'} />
          <table className="w-full text-sm mt-3">
            <tbody>
              <StatRow label="μ (media)" value={`${fmt(stats.normal.mu, 2)} años`} />
              <StatRow label="σ (desviación estándar)" value={`${fmt(stats.normal.sigma, 2)} años`} />
              <StatRow label="Asimetría (g1)" value={fmt(stats.edad.stats.skewness, 2)} />
              <StatRow label="Curtosis (g2)" value={fmt(stats.edad.stats.kurtosis, 2)} />
            </tbody>
          </table>
        </Card>
        <Card className="p-5">
          <p className="text-sm font-semibold text-gris mb-2">Observada vs. esperada bajo normalidad</p>
          <EChart option={comparisonBarLineOption(cats, obs, exp)} height={320} />
        </Card>
      </div>

      <Card className="p-6">
        <p className="font-semibold text-azul-dark mb-4">Regla empírica (68-95-99.7)</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-azul text-white">
                <th className="px-3 py-2 text-left rounded-tl-lg">Rango</th>
                <th className="px-3 py-2 text-right">% teórico</th>
                <th className="px-3 py-2 text-right rounded-tr-lg">% observado</th>
              </tr>
            </thead>
            <tbody>
              {stats.normal.reglaEmpirica.map((r, i) => (
                <tr key={r.k} className={i % 2 ? 'bg-black/[0.02]' : ''}>
                  <td className="px-3 py-2">
                    μ ± {r.k}σ [{fmt(r.lo, 2)}, {fmt(r.hi, 2)}]
                  </td>
                  <td className="px-3 py-2 text-right">{fmtPct(r.teoricoPct, 2)}</td>
                  <td className="px-3 py-2 text-right font-semibold">{fmtPct(r.observadoPct, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-sm font-semibold text-gris mb-2">Curva normal teórica, N(μ, σ²)</p>
        <EChart option={densityCurveOption(stats.normal.curva, markersOnCurve)} height={340} />
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
