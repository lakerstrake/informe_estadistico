import { useEffect, useRef } from 'react';
import type { EChartsOption } from 'echarts';
import echarts from './echarts-core';

/**
 * Wrapper mínimo sobre echarts/core: init + setOption + resize automático.
 * (Sustituye a echarts-for-react, cuyo default export CJS no interopera con Vite 8.)
 */
export function EChart({ option, height = 360 }: { option: EChartsOption; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof echarts.init> | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current, undefined, { renderer: 'svg' });
    chartRef.current = chart;
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    chartRef.current?.setOption(
      { animationDuration: 900, animationEasing: 'cubicOut', ...option } as EChartsOption,
      { notMerge: true }
    );
  }, [option]);

  return <div ref={ref} style={{ height, width: '100%' }} role="img" />;
}
