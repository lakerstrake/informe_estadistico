import * as echarts from 'echarts/core';
import {
  BarChart,
  PieChart,
  LineChart,
  RadarChart,
  FunnelChart,
  ScatterChart,
} from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
  MarkLineComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([
  BarChart,
  PieChart,
  LineChart,
  RadarChart,
  FunnelChart,
  ScatterChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
  MarkLineComponent,
  SVGRenderer,
]);

export default echarts;
