<template>
    <div class="grid grid-cols-3 gap-4">  
        <div class="overflow-hidden bg-white shadow">
            <div class="px-4 py-5 sm:px-6">
                <div class="font-bold text-gray-600">Zisk</div>
                <LineChart :chartData="testDataYears" />
            </div>
        </div>
        <div class="overflow-hidden bg-white shadow">
            <div class="px-4 py-5 sm:px-6">
                <div class="font-bold text-gray-600">Tržby</div>
                <LineChart :chartData="testDataYears" />
            </div>
        </div>
        <div class="overflow-hidden bg-white shadow">
            <div class="px-4 py-5 sm:px-6">
                <div class="font-bold text-gray-600">Celkové výnosy</div>
                <BarChart :chartData="testDataYears" />
            </div>
        </div>
        <div class="overflow-hidden bg-white shadow">
            <div class="px-4 py-5 sm:px-6">
                <div class="font-bold text-gray-600">Aktíva</div>
                <DoughnutChart :chartData="testData" />
            </div>
        </div>
        <div class="overflow-hidden bg-white shadow">
            <div class="px-4 py-5 sm:px-6">
                <div class="font-bold text-gray-600">Pasíva</div>
                <DoughnutChart :chartData="testData" />
            </div>
        </div>
        <div class="overflow-hidden bg-white shadow">
            <div class="px-4 py-5 sm:px-6">
                <div class="font-bold text-gray-600">Daň z príjmu</div>
                <LineChart :chartData="testDataYears" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import store from '@/store';
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';
import { DoughnutChart, BarChart, LineChart } from "vue-chart-3";
Chart.register(...registerables);

const testData = {
    labels: ['Základné imanie', 'Fondy zo zisku súčet', 'Rezervy', 'Dlhodobé záväzky', 'Krátkodobé záväzky', 'Bankové úvery'],
    datasets: [
        {
          data: [30, 40, 60, 70, 5, 999],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED', '#97B0C9'],
        },
    ],
};

const testDataYears = {
    labels: ['2018', '2019', '2020', '2021', '2022'],
    datasets: [
        {
          data: [166700, 250999, 335489, 478045, 500000],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
    ],
};

</script>