<template>
    <div class="flex flex-row gap-4">
        <span class="ms-3 font-medium text-gray-900">Súčasný rok</span>
        <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" v-model="dataYearSwitch">
            <div
                class="w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600">
            </div>
        </label>
        <span class="ms-3 font-medium text-gray-900">Posledné 4 roky</span>
    </div>

    <div v-if="!dataYearSwitch">
        <div class="py-4">
            <div class="text-3xl text-gray-800 font-bold">
                Súčasný rok
            </div>
        </div>
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
        </div>

    </div>
    <div v-else>
        <div class="py-4">
            <div class="text-3xl text-gray-800 font-bold">
                Posledné 4 roky
            </div>
        </div>
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

    </div>
</template>

<script setup lang="ts">
import store from '@/store';
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';
import { DoughnutChart, BarChart, LineChart } from "vue-chart-3";
Chart.register(...registerables);

const dataYearSwitch = ref(false);

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