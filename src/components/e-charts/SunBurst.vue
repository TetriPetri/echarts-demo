<template>
  <div class="sunburst-container">
    <h2>Sun Burst</h2>
    <div ref="chartRef" class="chart"></div>
    <div class="legend">
      <span><span class="swatch" style="background: #4e73b6"></span>Anjon</span>
      <span><span class="swatch" style="background: #eb7c2e"></span>Katjon</span>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

const chartRef = ref(null);

onMounted(() => {
  const chart = echarts.init(chartRef.value);

  chart.setOption({
    tooltip: {
      formatter: '{b}: {c}',
    },
    series: [
      {
        type: 'sunburst',
        name: 'Översikt',
        radius: ['30%', '100%'],
        center: ['50%', '50%'],
        sort: null,
        colorMappingBy: 'id',
        color: ['#555', '#4E73B6', '#EB7C2E'],
        itemStyle: { borderWidth: 2 },
        data: [
          {
            name: 'Katjon',
            children: [
              { name: 'Na+1', value: 2.23 },
              { name: 'Ca+2', value: 1.43 },
              { name: 'mg+2', value: 0.59 },
              { name: 'K+1', value: 0.13 },
            ],
          },
          {
            name: 'Anjon',
            children: [
              { name: 'Cl-1', value: 1.7 },
              { name: 'HCO3-1', value: 1.6 },
              { name: 'SO4-2', value: 0.66 },
            ],
          },
        ],
        label: {
          rotate: 'radial',
          fontSize: 18,
        },
        levels: [
          {
            // Level 0 - Root node ring (center)
            label: {
              rotate: 'tangential',
            },
          },
          {
            // Level 1 - First ring (Anjon/Katjon)
            label: {
              rotate: 'tangential',
              fontSize: 16,
            },
            itemStyle: {
              borderWidth: 2,
            },
          },
          {
            // Level 2 - Second ring (individual ions)
            label: {
              rotate: 'radial',
              fontSize: 14,
            },
            itemStyle: {
              borderWidth: 2,
            },
          },
        ],
      },
    ],
  });
});
</script>

<style scoped>
.chart {
  width: 600px;
  height: 500px;
  margin: 0 auto;
}

.sunburst-container {
  text-align: center;
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
