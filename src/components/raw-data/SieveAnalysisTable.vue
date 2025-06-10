<template>
  <div class="sieve-table">
    <h3>Rådata</h3>
    <table>
      <thead>
        <tr>
          <th>Sikt (mm)</th>
          <th v-for="sample in data" :key="sample.label">{{ sample.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="size in sieveSizes" :key="size">
          <td>{{ size }}</td>
          <td v-for="sample in data" :key="sample.label + size">
            {{ format(sample.valuesBySieveSize[size]) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { sieveAnalysisMockData as data } from '../../utils/constants';

// Extract all unique sieve sizes and sort descending
const sieveSizes = [...new Set(data.flatMap((d) => Object.keys(d.valuesBySieveSize)))].map(Number).sort((a, b) => b - a);

// Format to 1 decimal unless it's 0
const format = (val) => (val != null ? (val % 1 === 0 ? val : val.toFixed(1)) : '');
</script>

<style scoped>
.sieve-table {
  max-width: 100%;
  overflow-x: auto;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  padding: 0.5rem;
  border: 1px solid #ddd;
  font-size: 14px;
  white-space: nowrap;
}

thead {
  background-color: #f5f5f5;
  font-weight: bold;
}
</style>
