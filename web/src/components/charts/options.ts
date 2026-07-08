import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { COLORS, PALETTE, SERIES_BLUE, SERIES_ORANGE, fmt } from '../../lib/format';

const AXIS_INK = '#3d4c59';
const GRID_LINE = '#e3eaf0';

const baseTextStyle = { fontFamily: 'Inter, sans-serif', color: AXIS_INK, fontSize: 12.5, fontWeight: 500 as const };

const tooltipStyle = {
  backgroundColor: '#ffffff',
  borderColor: GRID_LINE,
  borderWidth: 1,
  padding: [10, 14] as [number, number],
  borderRadius: 10,
  textStyle: { color: COLORS.ink, fontFamily: 'Inter, sans-serif', fontSize: 12.5 },
  extraCssText: 'box-shadow: 0 8px 24px rgba(9,46,65,0.12);',
};

const valueAxis = {
  type: 'value' as const,
  axisLine: { show: false },
  axisTick: { show: false },
  axisLabel: { color: AXIS_INK, formatter: (v: number) => fmt(v), hideOverlap: true },
  splitLine: { lineStyle: { color: GRID_LINE } },
};

const categoryAxisBase = {
  type: 'category' as const,
  axisLine: { lineStyle: { color: GRID_LINE } },
  axisTick: { show: false },
  axisLabel: { color: AXIS_INK },
};

function barGradient(hex: string) {
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: hex },
    { offset: 1, color: hex + 'B8' },
  ]);
}

export function barOption(
  categories: string[],
  values: number[],
  opts: { name?: string; horizontal?: boolean; color?: string } = {}
): EChartsOption {
  const horizontal = opts.horizontal ?? false;
  const color = opts.color || SERIES_BLUE;
  const gradient = horizontal
    ? new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: color + 'B8' },
        { offset: 1, color },
      ])
    : barGradient(color);
  return {
    textStyle: baseTextStyle,
    grid: { left: 12, right: horizontal ? 46 : 16, top: 18, bottom: 8, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(18,104,165,0.06)' } },
      ...tooltipStyle,
      valueFormatter: (v) => fmt(Number(v)),
    },
    xAxis: horizontal
      ? valueAxis
      : { ...categoryAxisBase, data: categories, axisLabel: { ...categoryAxisBase.axisLabel, rotate: categories.length > 6 ? 30 : 0, hideOverlap: true } },
    yAxis: horizontal ? { ...categoryAxisBase, data: categories } : valueAxis,
    series: [
      {
        type: 'bar',
        data: values,
        name: opts.name || 'Casos (fi)',
        itemStyle: { color: gradient, borderRadius: horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0] },
        barMaxWidth: 40,
        label: {
          show: true,
          position: horizontal ? 'right' : 'top',
          color: COLORS.azulDark,
          fontWeight: 600,
          fontSize: 11.5,
          formatter: ({ value }) => fmt(Number(value)),
        },
        emphasis: { itemStyle: { color, shadowBlur: 12, shadowColor: 'rgba(9,46,65,0.25)' } },
      },
    ],
  };
}

export function pieOption(categories: string[], values: number[], opts: { donut?: boolean } = {}): EChartsOption {
  const total = values.reduce((s, v) => s + v, 0);
  return {
    textStyle: baseTextStyle,
    tooltip: {
      trigger: 'item',
      ...tooltipStyle,
      formatter: (p) => {
        const item = p as { name: string; value: number; percent: number };
        return `<b>${item.name}</b><br/>${fmt(item.value)} casos · ${item.percent.toLocaleString('es-CO')}%`;
      },
    },
    legend: {
      top: 0,
      itemWidth: 12,
      itemHeight: 12,
      icon: 'circle',
      textStyle: { ...baseTextStyle, color: COLORS.gris },
    },
    color: PALETTE,
    series: [
      {
        type: 'pie',
        radius: opts.donut ? ['48%', '72%'] : '68%',
        center: ['50%', '58%'],
        avoidLabelOverlap: true,
        padAngle: 1.5,
        // Etiquetas internas solo en porciones >= 5%; el resto queda en la leyenda y el tooltip.
        data: categories.map((c, i) => ({
          name: c,
          value: values[i],
          label: { show: values[i] / total >= 0.05 },
        })),
        label: {
          position: 'inside',
          formatter: '{d}%',
          color: '#fff',
          fontWeight: 700,
          fontSize: 12,
          textShadowColor: 'rgba(0,0,0,0.25)',
          textShadowBlur: 4,
        },
        labelLine: { show: false },
        itemStyle: { borderColor: '#fff', borderWidth: 2, borderRadius: 4 },
        emphasis: {
          scaleSize: 6,
          itemStyle: { shadowBlur: 16, shadowColor: 'rgba(9,46,65,0.2)' },
        },
      },
      ...(opts.donut
        ? [
            {
              // Serie invisible que dibuja el total en el centro de la dona.
              type: 'pie' as const,
              radius: ['0%', '1%'] as [string, string],
              center: ['50%', '58%'] as [string, string],
              silent: true,
              label: {
                show: true,
                position: 'center' as const,
                formatter: `{a|${fmt(total)}}\n{b|casos}`,
                rich: {
                  a: { fontSize: 22, fontWeight: 800, color: COLORS.azulDark, fontFamily: 'Inter, sans-serif' },
                  b: { fontSize: 11, color: AXIS_INK, fontFamily: 'Inter, sans-serif' },
                },
              },
              labelLine: { show: false },
              itemStyle: { color: 'transparent' },
              data: [{ value: 1, name: '' }],
              tooltip: { show: false },
            },
          ]
        : []),
    ],
  };
}

export function lineOption(
  categories: (string | number)[],
  values: number[],
  opts: { name?: string; color?: string } = {}
): EChartsOption {
  const color = opts.color || SERIES_BLUE;
  return {
    textStyle: baseTextStyle,
    grid: { left: 12, right: 20, top: 26, bottom: 8, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'line', lineStyle: { color: '#b9c8d3', type: 'dashed' } },
      ...tooltipStyle,
      valueFormatter: (v) => fmt(Number(v)),
    },
    xAxis: { ...categoryAxisBase, data: categories.map(String), boundaryGap: false },
    yAxis: valueAxis,
    series: [
      {
        type: 'line',
        data: values,
        name: opts.name || 'Casos (fi)',
        smooth: 0.35,
        symbol: 'circle',
        symbolSize: 9,
        lineStyle: { width: 2.5, color },
        itemStyle: { color, borderColor: '#fff', borderWidth: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: color + '33' },
            { offset: 1, color: color + '00' },
          ]),
        },
        label: {
          show: true,
          position: 'top',
          color: COLORS.azulDark,
          fontWeight: 600,
          fontSize: 11,
          formatter: ({ value }) => fmt(Number(value)),
        },
        labelLayout: { hideOverlap: true },
        emphasis: { scale: 1.4 },
      },
    ],
  };
}

export function radarOption(indicators: { name: string; max?: number }[], values: number[], name = 'Casos (fi)'): EChartsOption {
  // Máximo dinámico con 15% de margen: nunca recorta los datos.
  const niceMax = Math.ceil((Math.max(...values) * 1.15) / 10) * 10;
  return {
    textStyle: baseTextStyle,
    tooltip: { ...tooltipStyle },
    color: [SERIES_BLUE],
    radar: {
      indicator: indicators.map((i) => ({ name: i.name, max: i.max ?? niceMax })),
      splitArea: { areaStyle: { color: ['#ffffff', '#f3f8fb'] } },
      splitLine: { lineStyle: { color: GRID_LINE } },
      axisLine: { lineStyle: { color: GRID_LINE } },
      axisName: { color: AXIS_INK, fontSize: 11.5, fontWeight: 600 },
    },
    series: [
      {
        type: 'radar',
        symbol: 'circle',
        symbolSize: 6,
        data: [
          {
            value: values,
            name,
            areaStyle: { color: SERIES_BLUE + '2E' },
            lineStyle: { color: SERIES_BLUE, width: 2.5 },
            itemStyle: { color: SERIES_BLUE, borderColor: '#fff', borderWidth: 1.5 },
          },
        ],
      },
    ],
  };
}

export function funnelOption(categories: string[], values: number[]): EChartsOption {
  const data = categories
    .map((c, i) => ({ name: c, value: values[i] }))
    .sort((a, b) => b.value - a.value);
  return {
    textStyle: baseTextStyle,
    tooltip: {
      trigger: 'item',
      ...tooltipStyle,
      formatter: (p) => {
        const item = p as { name: string; value: number };
        return `<b>${item.name}</b><br/>${fmt(item.value)} casos`;
      },
    },
    color: PALETTE,
    series: [
      {
        type: 'funnel',
        left: '8%',
        width: '84%',
        top: 8,
        bottom: 8,
        gap: 3,
        minSize: '12%',
        label: {
          position: 'inside',
          color: '#fff',
          fontWeight: 600,
          fontSize: 11.5,
          formatter: ({ name, value }) => `${name}: ${fmt(Number(value))}`,
        },
        itemStyle: { borderColor: '#fff', borderWidth: 2 },
        emphasis: { label: { fontSize: 13 } },
        data,
      },
    ],
  };
}

export function scatterTrendOption(
  points: { x: number; y: number }[],
  trend: { x: number; y: number }[],
  axisNames: { x: string; y: string }
): EChartsOption {
  return {
    textStyle: baseTextStyle,
    grid: { left: 16, right: 24, top: 44, bottom: 12, containLabel: true },
    tooltip: {
      trigger: 'item',
      ...tooltipStyle,
      formatter: (p) => {
        const item = p as unknown as { seriesName: string; value: [number, number] };
        return `<b>${axisNames.x} ${item.value[0]}</b><br/>${axisNames.y}: ${fmt(item.value[1], 2)}`;
      },
    },
    legend: {
      top: 0,
      icon: 'circle',
      itemWidth: 12,
      itemHeight: 12,
      textStyle: { ...baseTextStyle, color: COLORS.gris },
    },
    xAxis: {
      type: 'value',
      name: axisNames.x,
      nameTextStyle: { color: AXIS_INK },
      min: 'dataMin',
      max: 'dataMax',
      axisLabel: { color: AXIS_INK, formatter: (v: number) => String(v) },
      axisLine: { lineStyle: { color: GRID_LINE } },
      splitLine: { show: false },
    },
    yAxis: { ...valueAxis, name: axisNames.y, nameTextStyle: { color: AXIS_INK }, scale: true, axisLabel: { color: AXIS_INK, formatter: (v: number) => fmt(v, 1) } },
    series: [
      {
        type: 'scatter',
        name: 'Edad promedio observada',
        symbolSize: 14,
        data: points.map((p) => [p.x, p.y]),
        itemStyle: { color: SERIES_BLUE, borderColor: '#fff', borderWidth: 2, shadowBlur: 6, shadowColor: 'rgba(9,46,65,0.18)' },
      },
      {
        type: 'line',
        name: 'Recta de regresión',
        data: trend.map((p) => [p.x, p.y]),
        showSymbol: false,
        lineStyle: { color: SERIES_ORANGE, width: 2.5, type: 'dashed' },
        itemStyle: { color: SERIES_ORANGE },
      },
    ],
  };
}

export function densityCurveOption(
  curve: { x: number; fx: number }[],
  markers: { x: number; fx: number; label: string }[],
  mu?: number
): EChartsOption {
  return {
    textStyle: baseTextStyle,
    grid: { left: 16, right: 24, top: 30, bottom: 12, containLabel: true },
    tooltip: {
      trigger: 'axis',
      ...tooltipStyle,
      valueFormatter: (v) => Number(v).toLocaleString('es-CO', { maximumFractionDigits: 4 }),
    },
    xAxis: {
      type: 'value',
      name: 'Edad',
      nameTextStyle: { color: AXIS_INK },
      axisLine: { lineStyle: { color: GRID_LINE } },
      splitLine: { show: false },
      axisLabel: { color: AXIS_INK },
    },
    yAxis: { ...valueAxis, name: 'Densidad f(x)', nameTextStyle: { color: AXIS_INK }, axisLabel: { color: AXIS_INK, formatter: (v: number) => v.toLocaleString('es-CO', { maximumFractionDigits: 3 }) } },
    series: [
      {
        type: 'line',
        name: 'N(μ, σ²)',
        data: curve.map((p) => [p.x, p.fx]),
        showSymbol: false,
        smooth: true,
        lineStyle: { color: SERIES_BLUE, width: 3 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: SERIES_BLUE + '2A' },
            { offset: 1, color: SERIES_BLUE + '00' },
          ]),
        },
        ...(mu !== undefined
          ? {
              markLine: {
                silent: true,
                symbol: 'none',
                data: [{ xAxis: mu }],
                lineStyle: { color: COLORS.naranja, type: 'dashed', width: 1.5 },
                label: { formatter: 'μ', color: COLORS.naranja, fontWeight: 700 },
              },
            }
          : {}),
      },
      {
        type: 'scatter',
        name: 'μ ± kσ',
        data: markers.map((m) => ({ value: [m.x, m.fx], name: m.label })),
        symbolSize: 10,
        itemStyle: { color: SERIES_ORANGE, borderColor: '#fff', borderWidth: 2 },
        label: {
          show: true,
          position: 'top',
          formatter: ({ name }) => name ?? '',
          color: COLORS.naranja,
          fontWeight: 600,
          fontSize: 10.5,
        },
      },
    ],
  };
}

export function comparisonBarLineOption(
  categories: string[],
  observed: number[],
  expected: number[]
): EChartsOption {
  return {
    textStyle: baseTextStyle,
    grid: { left: 12, right: 16, top: 44, bottom: 8, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(18,104,165,0.06)' } },
      ...tooltipStyle,
      valueFormatter: (v) => fmt(Number(v), 1),
    },
    legend: {
      top: 0,
      data: ['Observada', 'Esperada (normal)'],
      icon: 'circle',
      itemWidth: 12,
      itemHeight: 12,
      textStyle: { ...baseTextStyle, color: COLORS.gris },
    },
    xAxis: { ...categoryAxisBase, data: categories },
    yAxis: valueAxis,
    series: [
      {
        type: 'bar',
        name: 'Observada',
        data: observed,
        itemStyle: { color: barGradient(SERIES_BLUE), borderRadius: [4, 4, 0, 0] },
        barMaxWidth: 34,
      },
      {
        type: 'line',
        name: 'Esperada (normal)',
        data: expected,
        smooth: 0.35,
        lineStyle: { color: SERIES_ORANGE, width: 2.5 },
        itemStyle: { color: SERIES_ORANGE, borderColor: '#fff', borderWidth: 2 },
        symbol: 'circle',
        symbolSize: 8,
      },
    ],
  };
}
