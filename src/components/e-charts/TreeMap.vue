<template>
  <div class="treemap-container">
    <h2>Tree Map</h2>
    <div class="legend">
      <span><span class="swatch" style="background: #4e73b6"></span> Ca</span>
      <span><span class="swatch" style="background: #eb7c2e"></span> Mg</span>
      <span><span class="swatch" style="background: #73a94d"></span> H</span>
      <span><span class="swatch" style="background: #b0b0b0"></span> K</span>
      <span><span class="swatch" style="background: #f6c100"></span> Na</span>
      <span><span class="swatch" style="background: #5ba5d0"></span> other</span>
    </div>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

const chartRef = ref(null);

onMounted(() => {
  const chart = echarts.init(chartRef.value);

  chart.setOption({
    color: ['#4E73B6', '#EB7C2E', '#73A94D', '#B0B0B0', '#F6C100', '#5BA5D0'],
    tooltip: {
      formatter: '{b}: {c}',
    },
    series: [
      {
        type: 'treemap',
        // silent: true,
        roam: false,
        nodeClick: false,
        leafDepth: 1,
        colorMappingBy: 'index',
        top: 10,
        label: {
          show: true,
          formatter: '{c}',
          fontSize: 16,
          fontWeight: 700,
          color: '#fff',
          position: 'insideBottomLeft',
          distance: 2,
        },
        cursor: 'default',
        breadcrumb: {
          show: false,
        },
        upperLabel: {
          show: false,
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
        },
        data: [
          { name: 'Ca', value: 68 },
          { name: 'Mg', value: 15 },
          { name: 'H', value: 7 },
          { name: 'other', value: 5 },
          { name: 'K', value: 5 },
          { name: 'Na', value: 1 },
        ],
      },
    ],
  });
});
</script>

<style lang="css" scoped>
.chart {
  width: 1024px;
  height: 400px;
}

.legend {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 1rem;
}

.legend span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
}

.legend .swatch {
  width: 14px;
  height: 14px;
  border-radius: 3px;
}
</style>
