<template>
  <div class="graphs-page">
    <h2>Exempelgrafer</h2>
    <SunBurst />
    <TreeMap />
  </div>
</template>

<script setup>
import SunBurst from '../components/e-charts/SunBurst.vue';
import TreeMap from '../components/e-charts/TreeMap.vue';
</script>

<style scoped>
.graphs-page {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2rem;
}
</style>
