<template>
  <div class="curved-line-container">
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { sieveAnalysisMockData } from '../../utils/constants';

const chartRef = ref(null);

onMounted(() => {
  const chart = echarts.init(chartRef.value);

  const labels = sieveAnalysisMockData.map((data) => data.label);

  const series = sieveAnalysisMockData.map((data) => ({
    name: data.label,
    type: 'line',
    smooth: true,
    data: Object.entries(data.valuesBySieveSize)
      .map(([sieveSize, value]) => [parseFloat(sieveSize), value])
      .sort((a, b) => a[0] - b[0]),
  }));

  chart.setOption({
    title: {
      text: 'Logarithmic Line Chart',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const x = parseFloat(params[0].value[0]).toFixed(3);
        let html = `<div style="margin-bottom:4px; font-size:18px;"><strong>Kornstorlek: ${x} mm</strong></div>`;

        params.forEach((item) => {
          html += `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
          <span style="display:inline-flex; align-items:center;">${item.marker} ${item.seriesName}</span>
          <span><strong>${item.value[1]}%</strong></span>
        </div>`;
        });

        return html;
      },
      textStyle: {
        align: 'left',
      },
    },
    legend: {
      orient: 'vertical',
      right: -10,
      top: 20,
      data: labels,
    },
    xAxis: {
      type: 'log',
      name: 'Kornstorlek',
      nameLocation: 'middle',
      nameGap: 20,
      axisLabel: {
        formatter: '{value} mm',
      },
      min: 0.05,
      max: 2,
    },
    yAxis: {
      type: 'value',
      name: 'Passerande mängd %',
      min: 0,
      max: 100,
    },
    series,
  });
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 500px;
}
</style>
