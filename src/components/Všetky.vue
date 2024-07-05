<template>
  <div class="bg-gray-800 p-4 shadow rounded-[1.25rem]">
    <div class="flex items-center justify-between">
      <div class="sm:flex-auto">
        <h1 class="text-base text-lg font-semibold leading-6 text-white">Všetky transakcie</h1>
      </div>
      <div class="md:mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.5661 18.6654C18.0829 18.6654 19.3125 17.4715 19.3125 15.9987C19.3125 14.5259 18.0829 13.332 16.5661 13.332C15.0494 13.332 13.8198 14.5259 13.8198 15.9987C13.8198 17.4715 15.0494 18.6654 16.5661 18.6654Z" fill="#9BABC5"/>
          <path d="M5.58079 18.6654C7.09755 18.6654 8.32712 17.4715 8.32712 15.9987C8.32712 14.5259 7.09755 13.332 5.58079 13.332C4.06404 13.332 2.83447 14.5259 2.83447 15.9987C2.83447 17.4715 4.06404 18.6654 5.58079 18.6654Z" fill="#9BABC5"/>
          <path d="M27.5515 18.6654C29.0682 18.6654 30.2978 17.4715 30.2978 15.9987C30.2978 14.5259 29.0682 13.332 27.5515 13.332C26.0347 13.332 24.8052 14.5259 24.8052 15.9987C24.8052 17.4715 26.0347 18.6654 27.5515 18.6654Z" fill="#9BABC5"/>
        </svg>
      </div>
    </div>
    <div class="flex flex-col justify-end mt-4 md:h-[94%]">
      <BarChart :chartData="combinedChartData" :chartOptions="chartOptions" class="flex flex-col justify-end" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps({
  profitChartData: {
    type: Object,
    required: true,
    default: () => ({
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          borderColor: '#ffffff',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          fill: true,
          tension: 0.4,
          pointBorderColor: '#ffffff',
          pointBackgroundColor: '#ffffff',
          pointHoverBackgroundColor: '#ffffff',
          pointRadius: 6,
          pointHoverRadius: 8
        }
      ]
    })
  },
  salesChartData: {
    type: Object,
    required: true,
    default: () => ({
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          borderColor: '#ffffff',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          fill: true,
          tension: 0.4,
          pointBorderColor: '#ffffff',
          pointBackgroundColor: '#ffffff',
          pointHoverBackgroundColor: '#ffffff',
          pointRadius: 6,
          pointHoverRadius: 8
        }
      ]
    })
  }
});

const combinedChartData = ref({
  labels: [],
  datasets: []
});

watch([() => props.profitChartData, () => props.salesChartData], () => {
  combinedChartData.value = {
    labels: props.profitChartData.labels,
    datasets: [
      {
        label: 'Príjmy',
        data: props.profitChartData.datasets[0].data,
        backgroundColor: '#00d8d8'
      },
      {
        label: 'Výdavky',
        data: props.salesChartData.datasets[0].data,
        backgroundColor: '#ff5c5c'
      }
    ]
  };
}, { deep: true, immediate: true });

const chartOptions = ref({
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
        color: '#ffffff'
      },
      ticks: {
        color: '#ffffff' // White x-axis labels
      }
    },
    y: {
      grid: {
        color: '#707070'
      },
      ticks: {
        color: '#ffffff' // White y-axis labels
      }
    }
  },
  plugins: {
    legend: {
      display: false // This hides the legend
    }
  }
});
</script>

<style scoped>
.shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.bar-chart-wrapper {
  position: relative;
  height: 300px;
  width: 100%;
}
</style>
