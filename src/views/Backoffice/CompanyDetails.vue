<template>
  <div>
   <!-- Sidebar -->
   <Sidebar />

   <!-- Main Content -->
   <div class="flex-1 flex flex-col md:ml-[18.5rem]">
     <Navbar />

     <main class="p-10 flex-1 overflow-y-auto md:pt-16">
       <h1 class="text-2xl font-bold text-white mb-5">Dashboard</h1>
       <!-- Your main content goes here -->
       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <RevenueChart />
        <div class="bg-gray-800 p-4 shadow rounded-[1.25rem]">
          <div class="flex justify-between">
          <h2 class="text-xl font-bold mb-2 text-white">Príjmy</h2>
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.0439 9.074C10.2141 8.54724 10.5269 8.07788 10.9475 7.71795C11.368 7.35802 11.8801 7.12157 12.4268 7.03479C12.9735 6.94802 13.5336 7.01432 14.045 7.22634C14.5563 7.43836 14.999 7.78782 15.3239 8.236C15.6493 8.68353 15.8445 9.21231 15.8881 9.76388C15.9316 10.3155 15.8218 10.8683 15.5707 11.3614C15.3196 11.8544 14.9371 12.2684 14.4654 12.5576C13.9937 12.8468 13.4512 12.9999 12.8979 13V14M12.8979 21C11.7161 21 10.5457 20.7672 9.4538 20.3149C8.36187 19.8626 7.36972 19.1997 6.53399 18.364C5.69826 17.5282 5.03533 16.5361 4.58303 15.4442C4.13074 14.3522 3.89795 13.1819 3.89795 12C3.89795 10.8181 4.13074 9.64778 4.58303 8.55585C5.03533 7.46392 5.69826 6.47177 6.53399 5.63604C7.36972 4.80031 8.36187 4.13738 9.4538 3.68508C10.5457 3.23279 11.7161 3 12.8979 3C15.2849 3 17.5741 3.94821 19.2619 5.63604C20.9497 7.32387 21.8979 9.61305 21.8979 12C21.8979 14.3869 20.9497 16.6761 19.2619 18.364C17.5741 20.0518 15.2849 21 12.8979 21ZM12.9479 17V17.1H12.8479V17H12.9479Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </div>
          <div class="flex ">
            <h1 class="text-3xl text-white mt-2">$48,21</h1>
            <div class="ml-5">
              <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1_393)">
              <path d="M34.3949 7V11.8571H40.6349L22.3949 30.3143L15.1949 23.0286L0.794922 37.6L4.15492 41L15.1949 29.8286L22.3949 37.1143L43.9949 15.2571V21.5714H48.7949V7H34.3949Z" fill="#00A6A6"/>
              </g>
              <defs>
              <clipPath id="clip0_1_393">
              <rect width="48" height="48" fill="white" transform="translate(0.794922)"/>
              </clipPath>
              </defs>
              </svg>

            </div>

          </div>
        </div>
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
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-5">
        <div class="bg-gray-800 p-4 shadow rounded-[1.25rem]">
          <div class="sm:flex sm:items-center">
              <div class="sm:flex-auto">
                <h1 class="text-base text-lg font-semibold leading-6 text-white">Všetky transakcie</h1>
              </div>
              <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5661 18.6654C18.0829 18.6654 19.3125 17.4715 19.3125 15.9987C19.3125 14.5259 18.0829 13.332 16.5661 13.332C15.0494 13.332 13.8198 14.5259 13.8198 15.9987C13.8198 17.4715 15.0494 18.6654 16.5661 18.6654Z" fill="#9BABC5"/>
                <path d="M5.58079 18.6654C7.09755 18.6654 8.32712 17.4715 8.32712 15.9987C8.32712 14.5259 7.09755 13.332 5.58079 13.332C4.06404 13.332 2.83447 14.5259 2.83447 15.9987C2.83447 17.4715 4.06404 18.6654 5.58079 18.6654Z" fill="#9BABC5"/>
                <path d="M27.5515 18.6654C29.0682 18.6654 30.2978 17.4715 30.2978 15.9987C30.2978 14.5259 29.0682 13.332 27.5515 13.332C26.0347 13.332 24.8052 14.5259 24.8052 15.9987C24.8052 17.4715 26.0347 18.6654 27.5515 18.6654Z" fill="#9BABC5"/>
                </svg>
              </div>
            </div>
        </div>
        <div class="bg-gray-900 shadow rounded-[1.25rem]">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mb-4">
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
