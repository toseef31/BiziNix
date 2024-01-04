<template>
  <div class="min-h-screen">
    <div class="w-full min-h-screen flex flex-row">
      <div class="flex flex-col w-full bg-gray-900 basis-1/5">
        <TransitionRoot as="template" :show="sidebarOpen">
          <Dialog as="div" class="relative z-40 md:hidden" @close="sidebarOpen = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
              enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
              leave-to="opacity-0">
              <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
            </TransitionChild>

            <div class="fixed inset-0 z-40 flex">
              <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                enter-from="-translate-x-full" enter-to="translate-x-0"
                leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                leave-to="-translate-x-full">
                <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col pt-5 pb-4">
                  <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="absolute top-0 right-0 -mr-12 pt-2">
                      <button type="button"
                        class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        @click="sidebarOpen = false">
                        <span class="sr-only">Close sidebar</span>
                        <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </TransitionChild>
                  <div class="mt-5 h-0 flex-1">
                    <nav class="space-y-1 px-2">
                      <template v-for="item in navigation" :key="item.name">
                        <button @click="changeTab(item.tab)"
                          :class="[item.tab == activeTab ? 'text-teal-500' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md']">
                          {{ item.name }}
                        </button>
                      </template>
                    </nav>
                  </div>
                </DialogPanel>
              </TransitionChild>
              <div class="w-14 flex-shrink-0" aria-hidden="true">
                <!-- Dummy element to force sidebar to shrink to fit close icon -->
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
        <!-- Static sidebar for desktop -->
        <div class="hidden md:h-min-screen md:flex md:w-full">
          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <div class="w-full">
            <nav class="space-y-1 px-4 py-4" aria-label="Sidebar">
              <template v-for="item in navigation" :key="item.name">
                <button @click="changeTab(item.tab)"
                  :class="[item.tab == activeTab ? 'text-teal-500' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group w-full flex items-center pl-2 py-2 text-lg rounded-md font-bold']">
                  {{ item.name }}
                </button>
              </template>
            </nav>
          </div>
        </div>
      </div>
      <!--KONIEC MENU-->
      <div v-if="!isLoading" class="flex flex-col w-full">
        <div class="flex flex-col w-full" v-if="!company.ico || company.ico == ''">
          <div class="p-10">
            <div class="flex flex-col w-full text-right pb-20">
              <div class="text-sm">
                Stav poslednej objednávky
              </div>
              <div class="font-bold text-sm">
                {{ substatus.description }}
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
        </div>
        <div class="flex flex-col w-full" v-else>
          <div class="p-10" v-if="tab == 1">
            <h1 class="text-3xl font-bold text-gray-600 pb-10">
              Finančný report
            </h1>
            <FinancnyReport></FinancnyReport>
          </div>
          <div class="p-10" v-if="tab == 2">
            <h1 class="text-3xl font-bold text-gray-600 pb-10">
              Firemné údaje
            </h1>
            <FiremneUdaje></FiremneUdaje>
          </div>
          <div class="p-10" v-if="tab == 3">
            <h1 class="text-3xl font-bold text-gray-600 pb-10">
              Bankové účty
            </h1>
            <BankoveUcty></BankoveUcty>
          </div>
        </div>

      </div>
      <div v-else class="flex flex-col w-full justify-center">
        <div role="status" class="flex flex-col w-full items-center">
          <svg aria-hidden="true" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-teal-600"
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
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import type Company from "@/types/Company";
import FinancnyReport from '@/components/FinancnyReport.vue';
import FiremneUdaje from '@/components/FiremneUdaje.vue';
import BankoveUcty from '@/components/BankoveUcty.vue';
import type { XMarkIcon } from "@heroicons/vue/20/solid";

const props = defineProps(['activeTab'])
const router = useRouter();
const company = ref({} as Company);
const companySubstatuses = ref([] as any[]);
const sidebarOpen = ref(false)
const tab = ref(1);
const activeTab = ref(1);
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
  tab.value = tabNumber;
  activeTab.value = tabNumber;
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
  activeTab.value = props.activeTab;
  tab.value = props.activeTab;
  companySubstatuses.value = await store.dispatch("getCompanySubstatuses");
  await refreshData();
  
});
</script>
