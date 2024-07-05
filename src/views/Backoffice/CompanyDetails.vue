<template>
  <div>
   <!-- Sidebar -->
   <Sidebar />

   <!-- Main Content -->
   <div class="flex-1 flex flex-col md:ml-[18.5rem]">
     <Navbar />

     <main class="md:p-10 p-3 flex-1 overflow-y-auto md:pt-16">
      <div class="flex items-center md:mt-0 mt-[2rem] mb-[3rem]">
        <h1 class="text-2xl font-bold text-white mr-[4rem]">Dashboard</h1>
        <Dropdown @update-charts="handleUpdateCharts" />
      </div>
       <!-- Your main content goes here -->
       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <RevenueChart :actualYearData="actualYearData" :profitChartData="profitChartData" />
       
        <PríjmyChart :actualYearData="actualYearData"  :salesChartData="salesChartData"/>
        <VýdavkyChart />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-5">
       <Všetky :profitChartData="profitChartData" :salesChartData="salesChartData" />
        <div class="bg-gray-900 shadow rounded-[1.25rem]">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        <div class="bg-gray-800 shadow p-4 rounded-[1.25rem]">
          <Pošta/>
        </div>
        <div class="bg-gray-800 p-4 shadow rounded-[1.25rem]">
         <Posledné/>
        </div>
      
      </div>
      
        </div>
      
      </div>
      <div class="container mx-auto mt-3">
    <Carousel />
  </div>

       <!-- Add more content here -->
     </main>
   </div>
 </div>

</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, ref, watch, computed, onMounted  } from "vue";
import { useRouter } from "vue-router";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import type Company from "@/types/Company";
import FinancnyReport from '@/components/FinancnyReport.vue';
import FiremneUdaje from '@/components/FiremneUdaje.vue';
import BankoveUcty from '@/components/BankoveUcty.vue';
import type { XMarkIcon } from "@heroicons/vue/20/solid";
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import Carousel from '@/components/Carousel.vue'
import Pošta from '@/components/Pošta.vue'
import Posledné from '@/components/Posledné.vue'
import RevenueChart from '@/components/RevenueChart.vue';
import PríjmyChart from '@/components/PríjmyChart.vue';
import VýdavkyChart from '@/components/VýdavkyChart.vue';
import Všetky from '@/components/Všetky.vue';
import Dropdown from '@/components/Dropdown.vue';

const router = useRouter();
const company = ref({} as Company);
const companySubstatuses = ref([] as any[]);
const sidebarOpen = ref(false)
const activeTab = computed(() => store.state.myCompanyDetailsTab);
const substatus = ref({} as any);
const isLoading = ref(true);
const defaultOption = ref('Prehľad za aktuálny rok');

const navigation = [
 {
   name: 'Finančný report',
   tab: 1
 },
 {
   name: 'Firemné údaje',
   tab: 2
 },
 {
   name: 'Bankové účty',
   tab: 3
 }
]

function changeTab(tabNumber: number) {
 store.state.myCompanyDetailsTab = tabNumber;
}

function redirect() {
 return router.push({
   name: "Counseling center",
 });
}

watch(
 () => store.getters.getSelectedCompany,
 function () {
   refreshData();
  //  getChartData(company.value.ico);
 }
);

async function refreshData() {
 await store
   .dispatch("getSelectedCompany", store.state.selectedCompany.id)
   .then((response) => {
     company.value = response.data;
     substatus.value = companySubstatuses.value.find((item: any) => item.id == company.value.sub_status);
     isLoading.value = false;
    fetchCurrentYearData();
   });
}

onBeforeMount(async () => {
 companySubstatuses.value = await store.dispatch("getCompanySubstatuses");
 store.state.mySubmenuActive = 0;
 await refreshData();
//  await getChartData(company.value.ico);
 
});

const actualYearData = ref({
  profitSum: 0,
  salesSum: 0,
  monthlyProfitData: [],
  monthlySalesData: []
});

const profitChartData = ref({
  labels: [],
  datasets: [
    {
      label: '',
      data: [],
      borderColor: '#ffffff', // White border line
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      fill: true,
      tension: 0.4,
      pointBorderColor: '#ffffff', // Customize the point border color
      pointBackgroundColor: '#ffffff', // Customize the point background color
      pointHoverBackgroundColor: '#ffffff', // Customize the point hover background color
      pointRadius: 6,
      pointHoverRadius: 8,

    }
  ]
});

const salesChartData = ref({
  labels: [],
  datasets: [
    {
      label: '',
      data: [],
      borderColor: '#3DD4D4', // Customize the line color
      backgroundColor: 'rgba(61, 212, 212, 0.2)', // Customize the fill color
      fill: true,
      tension: 0.4,
      pointBorderColor: '#ffffff', // Customize the point border color
      pointBackgroundColor: '#3DD4D4', // Customize the point background color
      pointHoverBackgroundColor: '#ffffff', // Customize the point hover background color
      pointRadius: 6,
      pointHoverRadius: 8,

    }
  ]
});

function handleUpdateCharts(data) {
  actualYearData.value = {
    profitSum: data.profitSum,
    salesSum: data.salesSum,
    monthlyProfitData: data.profitData,
    monthlySalesData: data.salesData
  };

  profitChartData.value = {
    labels: data.labels,
    datasets: [
      {
        label: '',
        data: data.profitData.map(d => d.total),
        borderColor: '#ffffff', // White border line
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        fill: true,
        tension: 0.4,
        pointBorderColor: '#ffffff', // Customize the point border color
        pointBackgroundColor: '#ffffff', // Customize the point background color
        pointHoverBackgroundColor: '#ffffff', // Customize the point hover background color
        pointRadius: 6,
        pointHoverRadius: 8,

      }
    ]
  };

  salesChartData.value = {
    labels: data.labels,
    datasets: [
      {
        label: '',
        data: data.salesData.map(d => d.total),
        borderColor: '#3DD4D4', // Customize the line color
        backgroundColor: 'rgba(61, 212, 212, 0.2)', // Customize the fill color
        fill: true,
        tension: 0.4,
        pointBorderColor: '#ffffff', // Customize the point border color
        pointBackgroundColor: '#3DD4D4', // Customize the point background color
        pointHoverBackgroundColor: '#ffffff', // Customize the point hover background color
        pointRadius: 6,
        pointHoverRadius: 8,

      }
    ]
  };
}

async function fetchCurrentYearData() {
  try {
    const ico = store.state.selectedCompany.id;
    console.log(ico);
    const response = await store.dispatch("getFinDataForCompany", ico);
    const data = response.data;
console.log(data);
    if (data) {
      const monthlyProfitData = data.monthlyProfitData;
      const monthlySalesData = data.monthlySalesData;

      handleUpdateCharts({
        profitSum: data.profit,
        salesSum: data.total,
        profitData: monthlyProfitData,
        salesData: monthlySalesData,
        labels: monthlyProfitData.map(d => d.month)
      });
    }
  } catch (err) {
    toast.error('Error: ' + err);
  }
}

// onMounted(fetchCurrentYearData);

</script>
