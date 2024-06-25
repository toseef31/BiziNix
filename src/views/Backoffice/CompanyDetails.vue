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
        <Dropdown />
      </div>
       <!-- Your main content goes here -->
       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <RevenueChart />
       
        <PríjmyChart />
        <VýdavkyChart />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-5">
       <Všetky />
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
       <!-- <div class="min-h-screen">
   <div class="w-full min-h-screen flex flex-row">
     -->
     <!--KONIEC MENU-->
     <!-- <div v-if="!isLoading" class="flex flex-col w-full">
       <div class="flex flex-col w-full" v-if="!company.ico || company.ico == ''">
         <div class="p-10">
           <div class="flex flex-col w-full text-right pb-20">
             <div class="text-sm">
               Stav poslednej objednávky
             </div>
             <div class="font-bold text-sm">
               {{ substatus?.description }}
             </div>
           </div>
           <div class="flex flex-col items-center">
             <div class="w-fit flex">
               <div class="border border-gray-200 bg-gray-200 rounded-lg p-8 flex flex-row justify-between gap-4">
                 <div class="flex flex-col basis-1/3 justify-center">
                   <img src="@/assets/robot_stop.png" class="max-w-40 self-center" />
                 </div>
                 <div class="flex flex-col basis-2/3 justify-center">
                   <div class="text-sm">
                     <p class="font-bold text-3xl pb-8">
                       Ups, vyzerá to tak,
                       že táto firma zatiaľ
                       nie je aktívna.
                     </p>
                     <p class="font-bold">
                       Na využívanie Bizinix služieb je potrebné, aby Vaša firma bola založená, fungujúca a mala
                       pridelené IČO.<br>
                       <br>
                       Pokiaľ si myslíte, že ide o chybu, kontaktujte našu podporu.
                     </p>
                     <div class="py-8">
                       <div @click="redirect()"
                         class="w-fit shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-900 font-bold hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2">
                         <span class="w-full">Kontaktovať podporu</span>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                           stroke="currentColor" class="w-6 h-6">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                         </svg>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div> -->
       <!-- <div class="flex flex-col w-full" v-else>
         <div class="p-10" v-if="activeTab == 1">
           <h1 class="text-3xl font-bold text-gray-600 pb-10">
             Finančný report
           </h1>
           <FinancnyReport></FinancnyReport>
         </div>
         <div class="p-10" v-if="activeTab == 2">
           <h1 class="text-3xl font-bold text-gray-600 pb-10">
             Firemné údaje
           </h1>
           <FiremneUdaje></FiremneUdaje>
         </div>
         <div class="p-10" v-if="activeTab == 3">
           <h1 class="text-3xl font-bold text-gray-600 pb-10">
             Bankové účty
           </h1>
           <BankoveUcty></BankoveUcty>
         </div>
       </div> -->

     <!-- </div>
     <div v-else class="flex flex-col w-full justify-center">
       <div role="status" class="flex flex-col w-full items-center">
         <svg aria-hidden="true" class="w-10 h-10 mr-2 text-white animate-spin dark:text-gray-900 fill-teal-500"
           viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path
             d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
             fill="currentColor" />
           <path
             d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
             fill="currentFill" />
         </svg>
         <span class="sr-only">Loading...</span>
       </div>
     </div>
   </div>
 </div> -->
       <!-- Add more content here -->
     </main>
   </div>
 </div>

</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, ref, watch, computed, defineAsyncComponent  } from "vue";
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
 }
);

async function refreshData() {
 await store
   .dispatch("getSelectedCompany", store.state.selectedCompany.id)
   .then((response) => {
     company.value = response.data;
     substatus.value = companySubstatuses.value.find((item: any) => item.id == company.value.sub_status);
     isLoading.value = false;
   });
}

onBeforeMount(async () => {
 companySubstatuses.value = await store.dispatch("getCompanySubstatuses");
 store.state.mySubmenuActive = 0;
 await refreshData();
 
});
</script>
