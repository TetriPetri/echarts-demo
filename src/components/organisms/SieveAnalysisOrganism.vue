<template>
  <div class="sieve-analysis-container" ref="pdfRef">
    <div class="sieve-analysis-pdf-container" ref="pdfRef">
      <h2>Siktanalys</h2>
      <SieveAnalysisTable />
      <CurvedLine />
    </div>
    <div class="export-container">
      <button @click="exportPdf">Exportera PDF</button>
      <button @click="exportXls">Exportera Excel</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

import { sieveAnalysisMockData } from '../../utils/constants';

import SieveAnalysisTable from '../raw-data/SieveAnalysisTable.vue';
import CurvedLine from '../e-charts/CurvedLine.vue';

const pdfRef = ref(null);

const exportPdf = async () => {
  if (!pdfRef.value) return;

  const element = pdfRef.value;
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  // First page (table)
  await html2canvas(element.querySelector('.sieve-table'), { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  });

  // Second page (chart)
  pdf.addPage();
  await html2canvas(element.querySelector('.curved-line-container'), { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  });

  pdf.save('siktanalys.pdf');
};

const exportXls = () => {
  const header = ['Sikt (mm)', ...sieveAnalysisMockData.map((d) => d.label)];

  // Get all sieve sizes in sorted order (desc)
  const sieveSizes = [...new Set(sieveAnalysisMockData.flatMap((d) => Object.keys(d.valuesBySieveSize)))].map(Number).sort((a, b) => b - a);

  const rows = sieveSizes.map((size) => {
    const row = [size];
    for (const sample of sieveAnalysisMockData) {
      row.push(sample.valuesBySieveSize[size] ?? '');
    }
    return row;
  });

  const worksheet = XLSX.utils.aoa_to_sheet([header, ...rows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Siktanalys');
  XLSX.writeFile(workbook, 'siktanalys.xlsx');
};
</script>

<style scoped>
.sieve-analysis-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border: 1px solid #555;
  border-radius: 1rem;
  padding: 2rem;
}

.sieve-analysis-pdf-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.export-container {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  button {
    background-color: aliceblue;
    border: 1px solid #555;
  }
}
</style>
