<template>
    <div>
        <div class="py-4">
            <div class="text-3xl text-gray-800 font-bold">
                Súčasný rok
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="overflow-hidden bg-white shadow">
                <div class="px-4 py-5 sm:px-6">
                    <div class="font-bold text-gray-600">Zisk</div>
                    <LineChart :chartData="profitActualYearData" />
                </div>
            </div>
            <div class="overflow-hidden bg-white shadow">
                <div class="px-4 py-5 sm:px-6">
                    <div class="font-bold text-gray-600">Tržby</div>
                    <LineChart :chartData="salesActualYearData" />
                </div>
            </div>
        </div>

    </div>
    <div>
        <div class="py-4">
            <div class="text-3xl text-gray-800 font-bold">
                Posledné 4 roky
            </div>
        </div>
        <div class="grid grid-cols-4 gap-4">
            <div class="overflow-hidden bg-white shadow">
                <div class="px-4 py-5 sm:px-6">
                    <div class="font-bold text-gray-600">Zisk</div>
                    <LineChart :chartData="profitData" />
                </div>
            </div>
            <div class="overflow-hidden bg-white shadow">
                <div class="px-4 py-5 sm:px-6">
                    <div class="font-bold text-gray-600">Tržby</div>
                    <LineChart :chartData="salesData" />
                </div>
            </div>
            <div class="overflow-hidden bg-white shadow">
                <div class="px-4 py-5 sm:px-6">
                    <div class="font-bold text-gray-600">Aktíva</div>
                    <BarChart :chartData="assetsData" />
                </div>
            </div>
            <div class="overflow-hidden bg-white shadow">
                <div class="px-4 py-5 sm:px-6">
                    <div class="font-bold text-gray-600">Pasíva</div>
                    <BarChart :chartData="equityData" />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import store from '@/store';
import { onMounted, ref, computed, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { BarChart, LineChart } from "vue-chart-3";
import { toast } from 'vue3-toastify'
Chart.register(...registerables);

const company = computed(() => store.state.selectedCompany);

const profitActualYearData = ref({
    labels: [] as any[],
    datasets: [
        {
            label: company.value.name,
            data: [] as any[], 
            backgroundColor: ['#008080'],
        },
    ],
});

const salesActualYearData = ref({
    labels: [] as any[],
    datasets: [
        {
            label: company.value.name,
            data: [] as any[], 
            backgroundColor: ['#008080'],
        },
    ],
});

const assetsData = ref({
    labels: [] as any[],
    datasets: [
        {
            label: company.value.name,
            data: [] as any[], 
            backgroundColor: ['#008080'],
        },
    ],
});

const equityData = ref({
    labels: [] as any[],
    datasets: [
        {
            label: company.value.name,
            data: [] as any[], 
            backgroundColor: ['#008080'],
        },
    ],
});

const profitData = ref({
    labels: [] as any[],
    datasets: [
        {
            label: company.value.name,
            data: [] as any[], 
            backgroundColor: ['#008080'],
        },
    ],
});

const salesData = ref({
    labels: [] as any[],
    datasets: [
        {
            label: company.value.name,
            data: [] as any[], 
            backgroundColor: ['#008080'],
        },
    ],
});

async function getChartData(val: any) {
    let ico = {
        ico: ""
    }

    if(company.value !== undefined) {
        ico = {
            ico: company.value.ico
        }
    }

    await store
      .dispatch("getCompanyFindataFinstat", ico)
      .then((res) => {
        res.data.Ratios[0].Values.slice().reverse().forEach(element  => {
            profitData.value.labels.push(element.Year);
            profitData.value.datasets[0].data.push(element.Value);
        });

        res.data.Ratios[1].Values.slice().reverse().forEach(element  => {
            salesData.value.labels.push(element.Year);
            salesData.value.datasets[0].data.push(element.Value);
        });

        res.data.Ratios[2].Values.slice().reverse().forEach(element  => {
            assetsData.value.labels.push(element.Year);
            assetsData.value.datasets[0].data.push(element.Value);
        });

        res.data.Ratios[3].Values.slice().reverse().forEach(element  => {
            equityData.value.labels.push(element.Year);
            equityData.value.datasets[0].data.push(element.Value);
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error: '+err);
    });

    await store
        .dispatch("getFinDataForCompany", company.value.id)
        .then((response) => {
          response.data.monthlySalesData.forEach(element  => {
            salesActualYearData.value.labels.push(element.month);
            salesActualYearData.value.datasets[0].data.push(element.total);
        });

        response.data.monthlyProfitData.forEach(element  => {
            profitActualYearData.value.labels.push(element.month);
            profitActualYearData.value.datasets[0].data.push(element.total);
        });
    })
}

watch(
  () => store.getters.getSelectedCompany,
  function () {
    getChartData(company.value.ico);
  }
);

onMounted(async () => {
    await getChartData(company.value.ico);  
});

</script>