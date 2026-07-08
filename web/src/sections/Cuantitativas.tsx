import type { ReactNode } from 'react';
import stats from '../data/stats.json';
import { Section, Reveal } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { Formula } from '../components/ui/Formula';
import { Figure } from '../components/ui/Figure';
import { EChart } from '../components/charts/EChart';
import { barOption, lineOption, radarOption, funnelOption, scatterTrendOption, densityCurveOption, comparisonBarLineOption, boxplotOption } from '../components/charts/options';
import { ExplainButton } from '../components/ExplainContext';
import { fmt, fmtPct } from '../lib/format';

function StatRow({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <tr className="border-b border-azul/5 last:border-0 hover:bg-azul/[0.03] transition-colors align-top">
      <td className="py-2.5 pr-3">
        <span className="text-gris font-medium">{label}</span>
        {hint && <span className="block text-xs text-gris/75 mt-0.5 leading-snug">{hint}</span>}
      </td>
      <td className="tnum py-2.5 text-right font-bold text-azul-dark whitespace-nowrap">{value}</td>
    </tr>
  );
}

function ChartTitle({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <div className="mb-2">
      <p className="text-sm font-semibold text-azul-dark">{children}</p>
      {note && <p className="text-xs text-gris/80 mt-0.5 leading-snug">{note}</p>}
    </div>
  );
}

function Analisis({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm text-gris mt-5 leading-relaxed presentacion-grande border-l-[3px] border-naranja/70 pl-4">
      <b className="text-azul-dark">Análisis.</b> {children}
    </p>
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
              <StatRow label="Media" value={fmt(s.media, 2)} hint="Año 'promedio' de los casos: cae hacia la mitad del periodo → casos repartidos de forma pareja en el tiempo." />
              <StatRow label="Moda" value={`${fmt(s.moda, 2)} (clase 2020)`} hint="El año con mayor número de casos fue 2020." />
              <StatRow label="Mediana" value={fmt(s.mediana, 2)} hint="La mitad de los casos ocurrió antes de mediados de 2021 y la otra mitad después." />
              <StatRow label="Q1" value={fmt(s.q1, 2)} hint="El 25% de los casos más tempranos se había acumulado hacia 2019." />
              <StatRow label="Q3" value={fmt(s.q3, 2)} hint="El 75% de los casos ya había ocurrido para 2023." />
              <StatRow label="Desviación estándar" value={`${fmt(s.desviacion, 2)} años`} hint="Los casos se dispersan ~2 años alrededor del año medio: distribución temporal muy estable." />
            </tbody>
          </table>
        </Card>
        <Card className="p-5">
          <ChartTitle note="Muestra la tendencia temporal: ideal para ver subidas o bajadas año a año.">Evolución de casos por año</ChartTitle>
          <EChart option={lineOption(cats, vals)} height={280} />
        </Card>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="p-5">
          <ChartTitle note="Compara el número de casos entre años de un vistazo.">Frecuencia por año</ChartTitle>
          <EChart option={barOption(cats, vals)} height={280} />
        </Card>
        <Card className="p-5">
          <ChartTitle note="Ordena los años de mayor a menor: resalta cuáles concentran más casos.">Diagrama de embudo</ChartTitle>
          <EChart option={funnelOption(cats, vals)} height={280} />
        </Card>
        <Card className="p-5 sm:col-span-2">
          <ChartTitle note="Compara todos los años en un mismo círculo: cuanto más regular es el polígono, más parejo el reparto.">Gráfico de araña (radar)</ChartTitle>
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
              <StatRow label="Media" value={`${fmt(s.media, 2)} años`} hint="Edad promedio de las gestantes afectadas: adultez joven." />
              <StatRow label="Moda" value={`${fmt(s.moda, 2)} (clase 20-24)`} hint="El grupo de edad más frecuente es 20–24 años." />
              <StatRow label="Mediana" value={fmt(s.mediana, 2)} hint="La mitad de las gestantes tiene 27 años o menos." />
              <StatRow label="Q1 / Q3" value={`${fmt(s.q1, 2)} / ${fmt(s.q3, 2)}`} hint="El 50% central de las gestantes tiene entre ~22 y ~34 años." />
              <StatRow label="Desviación estándar" value={`${fmt(s.desviacion, 2)} años`} hint="Las edades varían en promedio ±7,8 años alrededor de la media." />
              <StatRow label="Coef. de variación" value={fmtPct(s.coefVariacion)} hint="Dispersión moderada (28% < 30%): edades relativamente homogéneas." />
              <StatRow label="Mínimo / Máximo" value={`${s.min} / ${s.max} años`} hint="Se registran casos desde los 13 hasta los 48 años." />
            </tbody>
          </table>
        </Card>
        <Card className="p-5">
          <ChartTitle note="Muestra la forma de la distribución por intervalos de edad: es la base del análisis cuantitativo.">Histograma</ChartTitle>
          <EChart option={barOption(cats, vals)} height={280} />
        </Card>
        <Card className="p-5">
          <ChartTitle note="Resume en una figura el mínimo, los cuartiles, la mediana y el máximo, y dónde se concentran las edades.">Diagrama de caja y bigotes — Edad</ChartTitle>
          <EChart
            option={boxplotOption({ min: s.min, q1: s.q1, median: s.mediana, q3: s.q3, max: s.max, mean: s.media, label: 'Edad' })}
            height={200}
          />
          <p className="text-xs text-gris mt-1.5 leading-snug">
            Caja = rango intercuartílico (Q1–Q3) · línea central = mediana · línea naranja punteada = media.
          </p>
        </Card>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="p-5">
          <ChartTitle note="Une los puntos del histograma para ver la silueta de la distribución.">Polígono de frecuencias</ChartTitle>
          <EChart option={lineOption(cats, vals)} height={260} />
        </Card>
        <Card className="p-5">
          <ChartTitle note="Frecuencia acumulada: permite leer cuántas gestantes hay por debajo de cierta edad.">Ojiva (frecuencia acumulada)</ChartTitle>
          <EChart option={lineOption(cats, stats.edad.tabla.map((r) => r.fiAcum), { color: '#D95E1E', name: 'Acumulada (Fi)' })} height={260} />
        </Card>
        <Card className="p-5 sm:col-span-2">
          <Figure
            src="img/mujer embarazo reisgoso variables cuantitativas.jpg"
            alt="Madre joven con su bebé"
            ratio="21 / 9"
            caption="La sífilis gestacional se concentra en mujeres jóvenes en edad reproductiva (grupo modal 20–24 años)."
          />
        </Card>
        <Card className="p-5 sm:col-span-2">
          <ChartTitle note="Compara el peso de cada grupo etario sobre un mismo eje radial.">Distribución por grupo etario (radial)</ChartTitle>
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
              how: 'Se calculó la edad promedio de las gestantes por cada año (Y) y se ajustó un modelo de mínimos cuadrados frente al año (X): b = Σ(x−x̄)(y−ȳ)/Σ(x−x̄)²; a = ȳ − b·x̄. En Excel se obtiene con PENDIENTE(), INTERSECCION.EJE() y COEF.DE.CORREL(), o con la línea de tendencia del gráfico de dispersión mostrando la ecuación y el R².',
              purpose: 'Permite examinar si el perfil etario de la población afectada ha cambiado de forma sostenida a lo largo del tiempo.',
              sheet: 'Regresion',
            }}
          />
        </div>

        <p className="text-sm text-gris leading-relaxed mb-3">
          <b className="text-azul-dark">¿Por qué Año → Edad promedio?</b> Uno de los objetivos específicos es saber si
          el <b>perfil de edad</b> de las gestantes ha cambiado con el tiempo. Por eso tomamos el <b>Año como variable
          independiente (X)</b> y la <b>edad promedio de cada año como dependiente (Y)</b>, y buscamos la recta que
          mejor las relaciona.
        </p>

        <div className="bg-azul/[0.05] border border-azul/10 rounded-xl px-4 py-1 mb-3">
          <Formula tex={`Edad_{prom} = ${stats.regresion.pendiente} \\times Año ${stats.regresion.intercepto < 0 ? '-' : '+'} ${Math.abs(stats.regresion.intercepto)}`} />
        </div>

        <table className="w-full text-sm">
          <tbody>
            <StatRow label="Pendiente (b)" value={fmt(stats.regresion.pendiente, 4)} hint="Sale de b = Σ(x−x̄)(y−ȳ)/Σ(x−x̄)². Por cada año que pasa, la edad promedio sube solo 0,026 años (≈ 9 días): casi nada." />
            <StatRow label="Intercepto (a)" value={fmt(stats.regresion.intercepto, 4)} hint="Sale de a = ȳ − b·x̄. Es el valor teórico de Y en el 'año 0'; solo ubica la recta, no tiene lectura práctica." />
            <StatRow label="Correlación (r)" value={fmt(stats.regresion.r, 4)} hint="Fuerza y dirección de la relación lineal (de −1 a 1). 0,18 = relación positiva muy débil." />
            <StatRow label="Determinación (r²)" value={`${fmt(stats.regresion.r2 * 100, 1)}%`} hint="% de la variación de la edad que explica el año. Solo 3,2%: el 96,8% restante se debe a otros factores." />
          </tbody>
        </table>

        <Analisis>
          Como r² = {fmt(stats.regresion.r2 * 100, 1)}% y la pendiente es casi cero, <b>no existe una tendencia lineal
          relevante</b>: el perfil etario de las gestantes se mantuvo estable entre 2018 y 2025. La recta prácticamente
          horizontal lo confirma visualmente.
        </Analisis>
      </Card>
      <Card className="p-5">
        <ChartTitle note="Cada punto es un año; la recta muestra si la edad promedio cambia con el tiempo. Si la recta es casi horizontal, no hay tendencia.">Dispersión con línea de tendencia</ChartTitle>
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
              <StatRow label="μ (media)" value={`${fmt(stats.normal.mu, 2)} años`} hint="Centro de la campana: la edad alrededor de la cual se agrupan los casos." />
              <StatRow label="σ (desviación estándar)" value={`${fmt(stats.normal.sigma, 2)} años`} hint="Ancho de la campana: a mayor σ, edades más dispersas." />
              <StatRow label="Asimetría (g1)" value={fmt(stats.edad.stats.skewness, 2)} hint="Positiva y leve: una cola hacia las edades mayores estira la distribución a la derecha (0 = simétrica)." />
              <StatRow label="Curtosis (g2)" value={fmt(stats.edad.stats.kurtosis, 2)} hint="Negativa: la distribución es más plana que la normal, con edades algo más repartidas." />
            </tbody>
          </table>
        </Card>
        <Card className="p-5">
          <ChartTitle note="Barras = frecuencias reales; línea = frecuencias esperadas si la edad fuera perfectamente normal. Las diferencias muestran dónde se aleja.">Observada vs. esperada bajo normalidad</ChartTitle>
          <EChart option={comparisonBarLineOption(cats, obs, exp)} height={320} />
        </Card>
      </div>

      <Card className="p-6">
        <p className="font-bold text-azul-dark mb-1">Regla empírica (68-95-99.7)</p>
        <p className="text-sm text-gris mb-4 max-w-3xl leading-relaxed">
          <b>μ ± kσ</b> significa "la media <b>más o menos</b> k desviaciones estándar": es un rango de edades centrado
          en la media. En una distribución normal, ~<b>68%</b> de los datos cae en μ±1σ, ~<b>95%</b> en μ±2σ y
          ~<b>99,7%</b> en μ±3σ. Comparamos ese porcentaje <b>teórico</b> con el <b>observado</b> en nuestros datos: si
          se parecen, la edad se comporta como una normal.
        </p>
        <div className="overflow-x-auto rounded-xl ring-1 ring-azul/10">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-azul to-azul-dark text-white">
                <th className="px-4 py-3 text-left font-semibold">Rango de edad (μ ± kσ)</th>
                <th className="px-4 py-3 text-right font-semibold">% teórico (normal)</th>
                <th className="px-4 py-3 text-right font-semibold">% observado (real)</th>
              </tr>
            </thead>
            <tbody>
              {stats.normal.reglaEmpirica.map((r, i) => (
                <tr key={r.k} className={`transition-colors hover:bg-azul/[0.05] ${i % 2 ? 'bg-azul/[0.025]' : 'bg-white'}`}>
                  <td className="tnum px-4 py-2.5">
                    μ ± {r.k}σ → de {fmt(r.lo, 1)} a {fmt(r.hi, 1)} años
                  </td>
                  <td className="tnum px-4 py-2.5 text-right text-gris">{fmtPct(r.teoricoPct, 2)}</td>
                  <td className="tnum px-4 py-2.5 text-right font-bold text-azul-dark">{fmtPct(r.observadoPct, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gris mt-3">
          Ejemplo: el tramo <b>μ ± 1σ</b> abarca de {fmt(stats.normal.reglaEmpirica[0].lo, 1)} a {fmt(stats.normal.reglaEmpirica[0].hi, 1)} años;
          en una normal debería contener ~68% de las gestantes.
        </p>
      </Card>

      <Card className="p-5">
        <ChartTitle note="Campana teórica N(μ, σ²) que tendría la edad si fuera perfectamente normal. La línea naranja marca la media μ; los puntos, las fronteras μ±1σ, μ±2σ y μ±3σ.">Curva normal teórica, N(μ, σ²)</ChartTitle>
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
