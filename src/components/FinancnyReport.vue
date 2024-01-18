<template>
    <div class="pb-2">
            <div class=" text-gray-800 font-bold">
                Uvedené sumy sú bez DPH.
            </div>
        </div>
    <div>
        <div class="py-4">
            <div class="text-3xl text-gray-800 font-bold">
                Súčasný rok
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="overflow-hidden bg-white shadow">
                <div class="px-4 py-5 sm:px-6">
                    <div class="font-bold text-gray-600">Zisk - {{ actualYearData.profit }}€</div>
                    <LineChart :chartData="profitActualYearData" />
                </div>
            </div>
            <div class="overflow-hidden bg-white shadow">
                <div class="px-4 py-5 sm:px-6">
                    <div class="font-bold text-gray-600">Tržby - {{ actualYearData.total }}€</div>
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
                    <div class="flex flex-row gap-2">
                        <Popover v-slot="{ open, close }" class="relative">
                            <PopoverButton
                            class="group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-primary"
                            @mouseover="(e) => hoverPopover(e, open)"
                            @mouseleave="closePopover(close)"
                            >
                            <InformationCircleIcon
                                class="ml-1 h-6 w-6 text-primary transition-transform group-hover:text-primary"
                                aria-hidden="true"
                            />
                            </PopoverButton>

                            <transition
                            enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0 translate-y-1"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 translate-y-1"
                            >
                            <PopoverPanel
                                class="absolute z-10 mt-3 w-auto min-w-[15rem] px-2 sm:px-0"
                                @mouseover.prevent="popoverHover = true"
                                @mouseleave.prevent="closePopover(close)"
                            >
                                <div
                                class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                                >
                                <div class="relative z-10 grid gap-1 bg-white p-3">
                                    <slot> Aktíva sú ekonomické prostriedky, ktoré sú výsledkom minulých udalostí, od ktorých sa očakáva, že v budúcnosti povedú k zvýšeniu ekonomických úžitkov.  </slot>
                                </div>
                                </div>
                            </PopoverPanel>
                            </transition>
                        </Popover>
                        <div class="font-bold text-gray-600">Aktíva</div>

                    </div>

                    <BarChart :chartData="assetsData" />
                </div>
            </div>
            <div class="overflow-hidden bg-white shadow">
                <div class="px-4 py-5 sm:px-6">
                    <div class="flex flex-row gap-2">
                        <Popover v-slot="{ open, close }" class="relative">
                            <PopoverButton
                            class="group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-primary"
                            @mouseover="(e) => hoverPopover(e, open)"
                            @mouseleave="closePopover(close)"
                            >
                            <InformationCircleIcon
                                class="ml-1 h-6 w-6 text-primary transition-transform group-hover:text-primary"
                                aria-hidden="true"
                            />
                            </PopoverButton>

                            <transition
                            enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0 translate-y-1"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 translate-y-1"
                            >
                            <PopoverPanel
                                class="absolute z-10 mt-3 w-auto min-w-[15rem] px-2 sm:px-0"
                                @mouseover.prevent="popoverHover = true"
                                @mouseleave.prevent="closePopover(close)"
                            >
                                <div
                                class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                                >
                                <div class="relative z-10 grid gap-1 bg-white p-3">
                                    <slot> Pasíva sú zdroje majetku, ktoré predstavujú celkovú sumu záväzkov účtovnej jednotky vrátane iných pasív a rozdielu majetku a záväzkov. </slot>
                                </div>
                                </div>
                            </PopoverPanel>
                            </transition>
                        </Popover>
                        <div class="font-bold text-gray-600">Pasíva</div>

                    </div>
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
import { toast } from 'vue3-toastify';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { InformationCircleIcon } from "@heroicons/vue/24/outline";
Chart.register(...registerables);

const company = computed(() => store.state.selectedCompany);
const popoverHover = ref(false);
const popoverTimeout = ref();

const actualYearData = ref({
  total: 0,
  totalVat: 0,
  totalToPay: 0,
  profit: 0,
  monthlySalesData: [] as any[],
  monthlyProfitData: [] as any[]
});

const hoverPopover = (e: any, open: boolean): void => {
  popoverHover.value = true
  if (!open) {
    e.target.parentNode.click()
  }
}

const closePopover = (close: any): void => {
  popoverHover.value = false
  if (popoverTimeout.value) clearTimeout(popoverTimeout.value)
  popoverTimeout.value = setTimeout(() => {
    if (!popoverHover.value) {
      close()
    }
  }, 100)
}

const profitActualYearData = ref({
    labels: [] as any[],
    datasets: [
        {
            label: company.value.name,
            data: [] as any[],
            backgroundColor: ['#b2d8d8'],
            fill: false,
            borderColor: '#008080',
            tension: 0.3,
            pointStyle: 'circle',
            pointRadius: 8,
            pointHoverRadius: 10
        },
    ],
});

const salesActualYearData = ref({
    labels: [] as any[],
    datasets: [
        {
            label: company.value.name,
            data: [] as any[],
            backgroundColor: ['#b2d8d8'],
            fill: false,
            borderColor: '#008080',
            tension: 0.3,
            pointStyle: 'circle',
            pointRadius: 8,
            pointHoverRadius: 10
        },
    ],
});

const assetsData = ref({
    labels: [] as any[],
    datasets: [
        {
            label: company.value.name,
            data: [] as any[],
            backgroundColor: ['#b2d8d8', '#66b2b2', '#008080', '#006666'],
        },
    ],
});

const equityData = ref({
    labels: [] as any[],
    datasets: [
        {
            label: company.value.name,
            data: [] as any[],
            backgroundColor: ['#b2d8d8', '#66b2b2', '#008080', '#006666'],
        },
    ],
});

const profitData = ref({
    labels: [] as any[],
    datasets: [
        {
            label: company.value.name,
            data: [] as any[],
            backgroundColor: ['#b2d8d8'],
            fill: false,
            borderColor: '#008080',
            tension: 0.3,
            pointStyle: 'circle',
            pointRadius: 8,
            pointHoverRadius: 10
        },
    ],
});

const salesData = ref({
    labels: [] as any[],
    datasets: [
        {
            label: company.value.name,
            data: [] as any[],
            backgroundColor: ['#b2d8d8'],
            fill: false,
            borderColor: '#008080',
            tension: 0.3,
            pointStyle: 'circle',
            pointRadius: 8,
            pointHoverRadius: 10
        },
    ],
});

async function getChartData(val: any) {
    let ico = {
        ico: ""
    }

    if (company.value !== undefined) {
        ico = {
            ico: company.value.ico
        }
    }

    await store
        .dispatch("getCompanyFindataFinstat", ico)
        .then((res) => {
            if(res.data.Ratios) {
                res.data.Ratios[0].Values.slice().reverse().forEach(element => {
                    profitData.value.labels.push(element.Year);
                    profitData.value.datasets[0].data.push(element.Value);
                });

                res.data.Ratios[1].Values.slice().reverse().forEach(element => {
                    salesData.value.labels.push(element.Year);
                    salesData.value.datasets[0].data.push(element.Value);
                });

                res.data.Ratios[2].Values.slice().reverse().forEach(element => {
                    assetsData.value.labels.push(element.Year);
                    assetsData.value.datasets[0].data.push(element.Value);
                });

                res.data.Ratios[3].Values.slice().reverse().forEach(element => {
                    equityData.value.labels.push(element.Year);
                    equityData.value.datasets[0].data.push(element.Value);
                });
            }
        })
        .catch((err) => {
            toast.error('Error: ' + err);
        });

    await store
        .dispatch("getFinDataForCompany", company.value.id)
        .then((response) => {
            actualYearData.value = response.data;
            actualYearData.value.monthlySalesData.forEach(element => {
                salesActualYearData.value.labels.push(element.month);
                salesActualYearData.value.datasets[0].data.push(element.total);
            });

            actualYearData.value.monthlyProfitData.forEach(element => {
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