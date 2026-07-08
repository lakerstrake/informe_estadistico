import type { EChartsOption } from 'echarts';
import { COLORS, PALETTE } from '../../lib/format';

const baseTextStyle = { fontFamily: 'Inter, sans-serif', color: COLORS.gris };

export function barOption(categories: string[], values: number[], opts: { name?: string; horizontal?: boolean; color?: string } = {}): EChartsOption {
  const horizontal = opts.horizontal ?? false;
  return {
    textStyle: baseTextStyle,
    grid: { left: horizontal ? 110 : 50, right: 20, top: 30, bottom: horizontal ? 30 : 60, containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: horizontal
      ? { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#eee' } } }
      : { type: 'category', data: categories, axisLabel: { rotate: categories.length > 6 ? 30 : 0 } },
    yAxis: horizontal
      ? { type: 'category', data: categories }
      : { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#eee' } } },
    series: [
      {
        type: 'bar',
        data: values,
        name: opts.name || 'fi',
        itemStyle: { color: opts.color || COLORS.azul, borderRadius: horizontal ? [0, 6, 6, 0] : [6, 6, 0, 0] },
        barMaxWidth: 46,
        label: { show: true, position: horizontal ? 'right' : 'top', color: COLORS.gris, fontWeight: 600 },
      },
    ],
  };
}

export function pieOption(categories: string[], values: number[], opts: { donut?: boolean } = {}): EChartsOption {
  return {
    textStyle: baseTextStyle,
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { top: 0, textStyle: baseTextStyle },
    color: PALETTE,
    series: [
      {
        type: 'pie',
        radius: opts.donut ? ['45%', '72%'] : '68%',
        center: ['50%', '56%'],
        avoidLabelOverlap: true,
        data: categories.map((c, i) => ({ name: c, value: values[i] })),
        label: { formatter: '{d}%', color: COLORS.gris, fontWeight: 600 },
        itemStyle: { borderColor: '#fff', borderWidth: 2 },
      },
    ],
  };
}

export function lineOption(categories: (string | number)[], values: number[], opts: { name?: string; color?: string } = {}): EChartsOption {
  return {
    textStyle: baseTextStyle,
    grid: { left: 50, right: 20, top: 30, bottom: 40, containLabel: true },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: categories.map(String) },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#eee' } } },
    series: [
      {
        type: 'line',
        data: values,
        name: opts.name || 'fi',
        smooth: true,
        symbolSize: 8,
        lineStyle: { width: 3, color: opts.color || COLORS.azul },
        itemStyle: { color: opts.color || COLORS.azul },
        areaStyle: { color: (opts.color || COLORS.azul) + '22' },
        label: { show: true, position: 'top', color: COLORS.gris, fontWeight: 600 },
      },
    ],
  };
}

export function radarOption(indicators: { name: string; max: number }[], values: number[], name = 'fi'): EChartsOption {
  return {
    textStyle: baseTextStyle,
    tooltip: {},
    color: [COLORS.azul],
    radar: {
      indicator: indicators,
      splitArea: { areaStyle: { color: ['#fff', '#f5f8fa'] } },
      axisName: { color: COLORS.gris, fontSize: 11 },
    },
    series: [
      {
        type: 'radar',
        data: [{ value: values, name, areaStyle: { color: COLORS.azul + '33' }, lineStyle: { color: COLORS.azul, width: 2 } }],
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
    tooltip: { trigger: 'item', formatter: '{b}: {c}' },
    color: PALETTE,
    series: [
      {
        type: 'funnel',
        left: '10%',
        width: '80%',
        label: { position: 'inside', color: '#fff', fontWeight: 600 },
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
    grid: { left: 60, right: 20, top: 30, bottom: 50, containLabel: true },
    tooltip: { trigger: 'item' },
    xAxis: { type: 'value', name: axisNames.x, min: 'dataMin', max: 'dataMax' },
    yAxis: { type: 'value', name: axisNames.y, scale: true },
    series: [
      {
        type: 'scatter',
        symbolSize: 12,
        data: points.map((p) => [p.x, p.y]),
        itemStyle: { color: COLORS.azul },
      },
      {
        type: 'line',
        data: trend.map((p) => [p.x, p.y]),
        showSymbol: false,
        lineStyle: { color: COLORS.naranja, width: 2, type: 'dashed' },
      },
    ],
  };
}

export function densityCurveOption(
  curve: { x: number; fx: number }[],
  markers: { x: number; fx: number; label: string }[]
): EChartsOption {
  return {
    textStyle: baseTextStyle,
    grid: { left: 55, right: 20, top: 30, bottom: 50, containLabel: true },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'value', name: 'Edad' },
    yAxis: { type: 'value', name: 'Densidad f(x)' },
    series: [
      {
        type: 'line',
        data: curve.map((p) => [p.x, p.fx]),
        showSymbol: false,
        smooth: true,
        lineStyle: { color: COLORS.azul, width: 3 },
        areaStyle: { color: COLORS.azul + '15' },
      },
      {
        type: 'scatter',
        data: markers.map((m) => [m.x, m.fx]),
        symbolSize: 10,
        itemStyle: { color: COLORS.naranja },
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
    grid: { left: 50, right: 20, top: 40, bottom: 40, containLabel: true },
    tooltip: { trigger: 'axis' },
    legend: { top: 0, data: ['Observada', 'Esperada (normal)'], textStyle: baseTextStyle },
    xAxis: { type: 'category', data: categories },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#eee' } } },
    series: [
      { type: 'bar', name: 'Observada', data: observed, itemStyle: { color: COLORS.azul, borderRadius: [6, 6, 0, 0] }, barMaxWidth: 36 },
      {
        type: 'line',
        name: 'Esperada (normal)',
        data: expected,
        smooth: true,
        lineStyle: { color: COLORS.naranja, width: 3 },
        itemStyle: { color: COLORS.naranja },
        symbolSize: 8,
      },
    ],
  };
}
