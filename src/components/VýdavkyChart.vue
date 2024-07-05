
<template>
         <div class="bg-gray-800 p-4 shadow rounded-[1.25rem]">
          <div class="flex justify-between">
          <h2 class="text-xl font-bold mb-2 text-white">Výdavky</h2>
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.0439 9.074C10.2141 8.54724 10.5269 8.07788 10.9475 7.71795C11.368 7.35802 11.8801 7.12157 12.4268 7.03479C12.9735 6.94802 13.5336 7.01432 14.045 7.22634C14.5563 7.43836 14.999 7.78782 15.3239 8.236C15.6493 8.68353 15.8445 9.21231 15.8881 9.76388C15.9316 10.3155 15.8218 10.8683 15.5707 11.3614C15.3196 11.8544 14.9371 12.2684 14.4654 12.5576C13.9937 12.8468 13.4512 12.9999 12.8979 13V14M12.8979 21C11.7161 21 10.5457 20.7672 9.4538 20.3149C8.36187 19.8626 7.36972 19.1997 6.53399 18.364C5.69826 17.5282 5.03533 16.5361 4.58303 15.4442C4.13074 14.3522 3.89795 13.1819 3.89795 12C3.89795 10.8181 4.13074 9.64778 4.58303 8.55585C5.03533 7.46392 5.69826 6.47177 6.53399 5.63604C7.36972 4.80031 8.36187 4.13738 9.4538 3.68508C10.5457 3.23279 11.7161 3 12.8979 3C15.2849 3 17.5741 3.94821 19.2619 5.63604C20.9497 7.32387 21.8979 9.61305 21.8979 12C21.8979 14.3869 20.9497 16.6761 19.2619 18.364C17.5741 20.0518 15.2849 21 12.8979 21ZM12.9479 17V17.1H12.8479V17H12.9479Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </div>
          <div class="flex ">
            <h1 class="text-3xl text-white mt-2">$4811,21</h1>
            <div class="ml-5">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M43.2 26.4286V32.7429L21.6 10.8857L14.4 18.1714L3.36 7L0 10.4L14.4 24.9714L21.6 17.6857L39.84 36.1429H33.6V41H48V26.4286H43.2Z" fill="#E41820"/>
              </svg>

            </div>
          
          </div>
          <LineChart :chartData="profitActualYearData" :chartOptions="chartOptions" style="height: 60%;"/>
        </div>
   </template>
   
   <script setup lang="ts">
   import { ref, computed, onMounted, watch } from 'vue';
   import { Chart, registerables } from 'chart.js';
   import { LineChart } from 'vue-chart-3';
   import store from '@/store';
   import { toast } from 'vue3-toastify';
   
   Chart.register(...registerables);
   const company = computed(() => store.state.selectedCompany);
   const actualYearData = ref({
     total: 0,
     totalVat: 0,
     totalToPay: 0,
     profit: 0,
     monthlySalesData: [] as any[],
     monthlyProfitData: [] as any[]
   });
   const profitActualYearData = ref({
     labels: [] as any[],
     datasets: [
       {
          label: '', // Hide the label by setting it to an empty string
          data: [] as any[],
          borderColor: '#FF5C5C', // Red line color
          backgroundColor: 'rgba(255, 92, 92, 0.2)', // Light red fill color
          fill: true,
          tension: 0.4,
          pointBorderColor: '#ffffff', // White point border color
          pointBackgroundColor: '#FF5C5C', // Red point background color
          pointHoverBackgroundColor: '#ffffff', // White point hover background color
          pointRadius: 6,
          pointHoverRadius: 8,

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
           color: '#ffffff', // White x-axis labels
         },
       },
       y: {
         grid: {
           color: '#ffffff',
         },
         ticks: {
           color: '#ffffff', // White y-axis labels
         },
       },
     },
     plugins: {
       legend: {
         display: false, // This hides the legend
       },
     },
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
   console.log(company.value);
       if(company.value.fakturacia_zaplatene_do && company.value.fakturacia_deaktivovane == 0) {
     
   
           await store
           .dispatch("getFinDataForCompany", company.value.id)
           .then((response) => {
            //  console.log(response.data);
               actualYearData.value = response.data;
            //  console.log(actualYearData.value.total);
   
               // actualYearData.value.monthlySalesData.forEach(element => {
               //     salesActualYearData.value.labels.push(element.month);
               //     salesActualYearData.value.datasets[0].data.push(element.total);
               // });
   
               actualYearData.value.monthlyProfitData.forEach(element => {
                   profitActualYearData.value.labels.push(element.month);
                   profitActualYearData.value.datasets[0].data.push(element.total);
               });
           })
         }
       
       
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