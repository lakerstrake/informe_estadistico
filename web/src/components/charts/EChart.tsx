import ReactEChartsCore from 'echarts-for-react/lib/core';
import type { EChartsOption } from 'echarts';
import echarts from './echarts-core';

export function EChart({ option, height = 360 }: { option: EChartsOption; height?: number }) {
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      style={{ height, width: '100%' }}
      opts={{ renderer: 'svg' }}
      notMerge
    />
  );
}
