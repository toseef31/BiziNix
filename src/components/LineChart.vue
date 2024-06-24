<template>
    <line-chart :chart-data="chartData" :chart-options="chartOptions"></line-chart>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { LineChart } from 'vue-chart-3';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
  } from 'chart.js';
  
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
  );
  
  const chartData = ref({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Revenue',
        data: [10000, 11000, 13000, 14000, 13000],
        borderColor: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        fill: true,
        tension: 0.4,
        display: false,
      },
    ],
  });
  
  const chartOptions = ref({
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff',
        },
      },
      y: {
        grid: {
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  });
  </script>
  