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
                        <div v-if="!item.children">
                          <button @click="currentDocTab(0, item.tab)"
                            :class="[item.tab == activeTab ? 'text-teal-500' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md']">
                            {{ item.name }}
                          </button>
                        </div>
                        <Disclosure as="div" v-else class="space-y-1" v-slot="{ open }">
                          <DisclosureButton
                            :class="[item.tab == activeTab ? 'text-teal-500' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500']">
                            <span class="flex-1">{{ item.name }}</span>
                            <svg xmlns="http://www.w3.org/2000/svg"
                              :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400']"
                              viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd"
                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                clip-rule="evenodd"></path>
                            </svg>
                          </DisclosureButton>
                          <DisclosurePanel class="space-y-1">
                            <DisclosureButton v-for="subItem in item.children" :key="subItem.name"
                              @click="currentDocTab(subItem.subTab, item.tab)" as="button"
                              :class="[subItem.subTab == activeDocTab ? 'text-teal-500' : 'text-gray-300']"
                              class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                              {{ subItem.name }}
                            </DisclosureButton>
                          </DisclosurePanel>
                        </Disclosure>
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
        <div class="flex flex-col w-full h-full">
          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <div class="flex flex-col w-full">
            <nav class="space-y-1 px-4 py-4" aria-label="Sidebar">
              <template v-for="item in navigation" :key="item.name">
                <div v-if="!item.children">
                  <button @click="currentDocTab(0, item.tab)"
                    :class="[item.tab == activeTab ? 'text-teal-500' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group w-full flex items-center pl-2 py-2 text-sm rounded-md font-bold']">
                    {{ item.name }}
                  </button>
                </div>
                <Disclosure as="div" v-else class="space-y-1" v-slot="{ open }">
                  <DisclosureButton
                    :class="[item.tab == activeTab ? 'text-teal-500' : ' text-gray-300 hover:bg-gray-700 hover:text-white', 'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500']">
                    <span class="flex-1">{{ item.name }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg"
                      :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400']"
                      viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </DisclosureButton>
                  <DisclosurePanel class="space-y-1">
                    <button v-for="subItem in item.children" :key="subItem.name" as="button"
                      @click="currentDocTab(subItem.subTab, item.tab)"
                      :class="[subItem.subTab == activeDocTab ? 'text-teal-500' : 'text-gray-300']"
                      class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium hover:bg-gray-700 hover:text-white">
                      {{ subItem.name }}
                    </button>
                  </DisclosurePanel>
                </Disclosure>
              </template>
            </nav>
          </div>
          <div class="flex flex-col px-2 py-2 relative w-full h-full">
            <div class="sticky top-[75vh] px-8">
              <div class="flex flex-col justify-center w-full gap-1 px-8 py-8 bg-gray-800 rounded-lg">
                <div class="text-teal-500">
                  Tržba (Obrat)
                </div>
                <div class="text-white">
                  {{ finData.total.toFixed(2) }} €
                </div>
                <div class="text-gray-300 text-sm" v-if="company.is_dph">
                  {{ finData.totalVat.toFixed(2) }} € s DPH
                </div>
                <div class="text-teal-500">
                  Zisk
                </div>
                <div class="text-white">
                  {{ finData.profit.toFixed(2) }} €
                </div>
                <div class="text-red-500">
                  Neuhradené / Pohľadávky
                </div>
                <div class="text-white">
                  {{ finData.totalToPay.toFixed(2) }} €
                </div>
                <div class="text-gray-300 text-sm text-right">
                  Viac info vo <router-link :to="{ name: 'CompanyDetails', params: { activeTab: 1 } }">finančnom
                    reporte</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--KONIEC MENU-->
      <div v-if="!isLoading" class="flex flex-col w-full items-center">
        <div v-if="new Date(company.fakturacia_zaplatene_do) < new Date(today) ||
          company.fakturacia_zaplatene_do == null ||
          company.fakturacia_zaplatene_do == ''
          " class="flex flex-col w-full items-center">
          <div class="flex flex-col w-full items-center h-full py-32">
            <div class="text-4xl text-gray-900 font-bold">
              K tejto službe<br />bohužiaľ nemáte<br />prístup...
            </div>
            <div class="py-8">
              <div @click="redirectToOrder()"
                class="w-[300px] shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-900 font-bold hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2">
                <span class="text-center w-full">Kúpiť službu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
            <div class="text-sm">3 mesiace zadarmo. Potom 5€/mesiac</div>
          </div>
        </div>

        <div class="flex flex-col w-full" v-else>
          <div v-if="tab == 1 || tab == 2">
            <div class="flex flex-col px-20 py-10">
              <div class="flex flex-row justify-between">
                <div class="flex flex-col">
                  <div class="flex flex-row">
                    <FormKit type="checkbox" name="vystavene" validation-visibility="dirty" v-model="isIssuedChecked" />
                    <label for="due-in" class="text-black">Vystavené</label>
                  </div>
                  <div class="flex flex-row">
                    <FormKit type="checkbox" name="prijate" validation-visibility="dirty" v-model="isReceivedChecked" />
                    <label for="due-in" class="text-black">Prijaté</label>
                  </div>
                  <div class="pt-4">
                    Importujte prijaté doklady <br />
                    <button class="font-bold" v-on:click="showImportPopup = true">
                      TU
                    </button>
                  </div>
                  <Dialog :open="showImportPopup" @close="showImportPopup = false" class="relative z-50">
                    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
                      <DialogPanel class="w-full max-w-sm rounded bg-gray-900 shadow text-white">
                        <DialogTitle class="text-center py-4 text-xl font-bold">Importovanie dokladu</DialogTitle>
                        <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
                          <img src="@/assets/doklad.png" class="h-auto shrink-0 z-0 w-[128px] absolute right-16 top-12" />
                          <div class="flex justify-between py-8 px-4 text-white font-bold text-lg">
                            Importujte prijatý doklad
                            <button class="bg-red-500 hover:bg-red-700 h-8 px-6 rounded z-10 text-white"
                              v-on:click="showImportPopup = false">
                              X
                            </button>
                          </div>
                          <FormKit type="form" id="add-document" submit-label="Importovať doklad"
                            @submit="importDocument()" :actions="false">
                            <div class="flex px-4 pt-10 text-white z-10 relative">
                              <FormKit v-model="document.subtype" :value="activeDocTab" type="select" name="Druh dokladu"
                                placeholder="Vyberte druh dokladu" :options="Constants.DOCUMENT_SUBTYPES"
                                @change="documentSubtypeChanged()" validation="required" />
                            </div>
                            <div class="px-4 text-white w-full py-4">
                              <FormKit type="text" name="Od koho je doklad" label="Od koho je doklad"
                                validation="required" v-model="document.odberatel" />
                            </div>
                            <div class="px-4 text-white w-full py-4">
                              <FormKit type="text" name="Číslo dokladu" label="Číslo dokladu"
                                v-model="document.serial_number" />
                            </div>
                            <div class="flex flex-row pb-8 gap-4">
                              <div class="flex text-white pl-4 basis-1/3">
                                <FormKit type="date" name="Termín prijatia" label="Termín prijatia"
                                  validation="required|length:10" v-model="document.date_of_issue" :value="today" />
                              </div>
                              <div class="flex text-white basis-2/3 pr-4 gap-2">
                                <div class="w-full">
                                  <FormKit type="number" id="amount" name="Suma" label="Suma v €" step="any" min="0"
                                    number v-model="document.total" validation="required" />
                                </div>
                                <div class="w-full">
                                  <FormKit type="select" label="DPH" name="DPH" :options="['bez DPH', 's DPH']"
                                    @change="dphChanged($event)" validation="required" />
                                </div>
                              </div>
                            </div>
                            <div class="px-4 w-full text-white">
                              <FormKit id="scan" label="Importovať doklad" accept=".jpg,.png,.pdf"
                                validation="mime:.jpg,.png,.pdf" v-on:change="updateImgData($event)" name="scan"
                                type="file" validation-visibility="live" />
                            </div>

                            <div class="flex flex-row justify-end py-8 px-4 gap-4">
                              <div class="flex flex-1/4">
                                <FormKit label="Importovať doklad" type="submit"
                                  class="shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2" />
                              </div>
                            </div>
                          </FormKit>
                        </div>
                      </DialogPanel>
                    </div>

                  </Dialog>
                </div>
                <div class="flex flex-col items-center w-full py-8 px-10">
                  <h1 class="text-5xl font-bold pb-8 text-gray-800">{{ title }}</h1>
                  <div class="flex flex-row w-full justify-center gap-10 py-4">
                    <div class="flex flex-1/4 flex-row">
                      <div class="flex relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-300" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                          </svg>
                        </div>
                        <input id="searchInput" v-model="searchQuery" placeholder="Vyhľadajte doklad"
                          class="h-12 pl-8 w-full shadow px-1 rounded-xl border focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-gray-300 bg-gray-900" />
                      </div>
                    </div>
                    <!---->

                    <div class="flex flex-1/4 flex-row bg-gray-900 rounded-xl px-4">
                      <div class="flex relative">
                        <div class="self-center font-bold px-2 text-white">Od:</div>
                        <input id="searchInput" type="date" v-model="dateFrom"
                          class="h-12 w-full px-1 border-none focus:ring-0 text-white bg-gray-900" />
                      </div>
                      <div class="px-2 font-bold self-center text-2xl text-gray-600">|</div>
                      <div class="flex relative">
                        <div class="self-center font-bold pr-2 text-white">Do:</div>
                        <input id="searchInput" type="date" v-model="dateTo"
                          class="h-12 w-full px-1 border-none focus:ring-0 text-white bg-gray-900" />
                      </div>
                    </div>
                    <!---->
                  </div>
                  <DocumentsListTable ref="documentsListTableRef"></DocumentsListTable>
                  <div class="flex flex-row w-full py-4 justify-around">
                    <div v-if="documentsData.next_page_url != null">
                      <button
                        class="bg-teal-500 hover:bg-teal-700 px-4 shadow flex justify-center border items-center py-4 rounded-lg text-white"
                        v-on:click="getDocuments(documentsData.current_page, searchQuery, dateFrom, dateTo, 'next', selectedColumn, activeDocTab)">
                        <span class="px-4">Načítať viac</span>
                        <ChevronDownIcon class="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col items-center">
                  <button
                    class="p-0 w-12 h-12 bg-gray-800 rounded-full hover:bg-gray-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                    v-on:click="redirect()">
                    <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
                      <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                        C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                        C15.952,9,16,9.447,16,10z" />
                    </svg>
                  </button>
                  <label class="font-bold text-center">Nový doklad</label>
                </div>
              </div>
              <Dialog :open="showBankPopup" @close="showBankPopup = false" class="relative z-50">
                <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
                  <DialogPanel class="w-full max-w-sm rounded bg-gray-900 shadow text-white">
                    <DialogTitle class="text-center py-4 text-xl font-bold">Bankový účet</DialogTitle>

                    <p class="p-8">
                      Predtým ako budte môcť vystavovať doklady si pridajte Bankový účet.
                    </p>
                    <div class="flex flex-row justify-between py-2 px-4">
                      <button class="px-2 py-2 hover:text-teal-500" @click="redirectToBankAccounts()">Pridať účet</button>
                      <button class="px-2 hover:text-red-500" @click="showBankPopup = false">Zatvoriť</button>
                    </div>
                  </DialogPanel>
                </div>
              </Dialog>
            </div>
          </div>
          <div v-else>
            <DocumentsDesignPage></DocumentsDesignPage>
          </div>
        </div>
      </div>
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
  </div>
</template>

<style>
.foreground {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  opacity: 0.9;
}
</style>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import DocumentsListTable from "@/components/DocumentsListTable.vue";
import type Company from "@/types/Company";
import moment from "moment";
import Constants from "@/helpers/constants";
import DocumentsDesignPage from "./DocumentsDesignPage.vue";
import { Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogPanel, TransitionChild, TransitionRoot, DialogTitle } from '@headlessui/vue';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import { toast } from "vue3-toastify";

const isLoading = ref(true);
const sidebarOpen = ref(false)
const router = useRouter();
const tab = ref(1);
const activeTab = ref(1);
const docTab = ref(1);
const activeDocTab = ref(1);
const company = ref({} as Company);
const documents = computed(() => store.state.documents);
const searchQuery = ref("");
const dateFrom = ref(null);
const dateTo = ref(null);
const isIssuedChecked = ref(true);
const isReceivedChecked = ref(true);
const today = moment(new Date()).format("YYYY-MM-DD");
const uploadImageData = ref({ body: { name: "", img: "" }, documentId: 0 });
const documentsData = ref();
const selectedColumn = ref("serial_number");
const selectedDirection = ref("desc");
const ogDocs = ref([] as any[]);
let documentsListTableRef = ref<InstanceType<typeof DocumentsListTable>>(null as any);
const showBankPopup = ref(false);
const showImportPopup = ref(false);
const bankAccounts = ref([] as any[]);
const bankAccountId = ref(0);

const document = ref({
  type: activeTab,
  subtype: activeDocTab,
  company_id: company.value.id,
  odberatel: "",
  serial_number: "",
  isIssued: false,
  isPaid: false,
  reminder_sent: false,
  total: 0,
  payment_date: "",
  date_of_issue: today,
  isDph: false,
  currency: "€",
  bank_account_id: 0
});

let title = ref("Faktúry");
const finData = ref({
  total: 0,
  totalVat: 0,
  totalToPay: 0,
  profit: 0,
  monthlySalesData: [] as any[],
  monthlyProfitData: [] as any[]
});

const navigation = [
  {
    name: 'Účtovné',
    tab: 1,
    children: [
      { name: 'Faktúry', subTab: 1 },
      { name: 'Zálohové faktúry', subTab: 2 },
      { name: 'Dobropisy', subTab: 3 }
    ],
  },
  {
    name: 'Obchodné',
    tab: 2,
    children: [
      { name: 'Cenová ponuka', subTab: 4 },
      { name: 'Objednávka', subTab: 5 }
    ],
  },
  {
    name: 'Nastavenia',
    tab: 3
  },
]

function dphChanged(event: any) {
  if (event.target.value == 's DPH') {
    document.value.isDph = true;
  } else {
    document.value.isDph = false;
  }
}

watch(() => documentsListTableRef.value?.updateFinData,
  async function () {
    if (documentsListTableRef.value?.updateFinData == true) {
      await store
        .dispatch("getFinDataForCompany", company.value.id)
        .then((response) => {
          finData.value = response.data;
          documentsListTableRef.value.updateFinData = false;
        })
    }

  }
);

function documentSubtypeChanged() {
  switch (document.value.subtype) {
    case 1:
      document.value.type = 1;
      document.value.subtype = 1;
      break;
    case 2:
      document.value.type = 1;
      document.value.subtype = 2;
      break;
    case 3:
      document.value.type = 1;
      document.value.subtype = 3;
      break;
    case 4:
      document.value.type = 2;
      document.value.subtype = 4;
      break;
    case 5:
      document.value.type = 2;
      document.value.subtype = 5;
      break;
  }
}

function updateImgData(evt: any) {
  uploadImageData.value.body.name = evt.target.files[0].name;
  uploadImageData.value.body.img = evt.target.files[0];
}

async function currentDocTab(tabNumber: number, page: number) {
  tab.value = page;
  activeTab.value = page;

  docTab.value = tabNumber;
  activeDocTab.value = tabNumber;
  await getDocuments(1, null, null, null, '', selectedColumn.value, tabNumber);
  switch (tabNumber) {
    case 1:
      title.value = "Faktúry";
      break;
    case 2:
      title.value = "Zálohové faktúry";
      break;
    case 3:
      title.value = "Dobropisy";
      break;
    case 4:
      title.value = "Cenová ponuka";
      break;
    case 5:
      title.value = "Objednávka";
      break;
  }
}

function redirect() {
  if (bankAccounts.value.length > 0) {
    return router.push({
      name: "Add document",
      params: { subtype: activeDocTab.value },
    });
  } else {
    showBankPopup.value = true;
  }
}

function redirectToBankAccounts() {
  store.state.myCompanyDetailsTab = 3;
  return router.push({
    name: "CompanyDetails",
    params: { id: company.value.id }
  });
}

function redirectToOrder() {
  return router.push({
    name: "Order documents",
  });
}

function importDocument() {
  document.value.isIssued = false;
  document.value.company_id = company.value.id;
  document.value.bank_account_id = bankAccountId.value;

  if (document.value.serial_number == "") {
    document.value.serial_number = "0";
  }

  return store
    .dispatch("addDocument", document.value)
    .then(async (res) => {
      await uploadImg(res.Document.id);
      await refreshData();
      showImportPopup.value = false;
    })
    .catch((err) => {
      toast.error('Error: ' + err);
    });
}

async function uploadImg(documentId) {
  uploadImageData.value.documentId = documentId;
  await store
    .dispatch("uploadDocumentImg", uploadImageData.value)
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      toast.error('Error: ' + err);
    });
}

function filterDataByIssued() {
  store.state.documents = ogDocs.value.filter((document: any) => {
    if (document.isIssued == 1 && isIssuedChecked.value == true) {
      return true;
    } else if (document.isIssued == 0 && isReceivedChecked.value == true) {
      return true;
    } else if (
      isIssuedChecked.value == true &&
      isReceivedChecked.value == true
    ) {
      return true;
    } else if (
      isIssuedChecked.value == false &&
      isReceivedChecked.value == false
    ) {
      return false;
    }
  });
}

watch(
  () => store.getters.getSelectedCompany,
  async function () {
    await refreshData();
  }
);

watch(
  () => isIssuedChecked.value,
  async function () {
    filterDataByIssued();
  }
);

watch(
  () => isReceivedChecked.value,
  async function () {
    filterDataByIssued();
  }
);

watch(
  () => searchQuery.value,
  async function () {
    await getDocuments(documentsData.value.current_page, searchQuery.value, dateFrom.value, dateTo.value, '', selectedColumn.value, activeDocTab.value);
  }
);

watch(
  () => dateFrom.value,
  async function () {
    await getDocuments(documentsData.value.current_page, searchQuery.value, dateFrom.value, dateTo.value, '', selectedColumn.value, activeDocTab.value);
  }
);

watch(
  () => dateTo.value,
  async function () {
    await getDocuments(documentsData.value.current_page, searchQuery.value, dateFrom.value, dateTo.value, '', selectedColumn.value, activeDocTab.value);
  }
);

async function orderBy(column) {
  selectedColumn.value = column;
  selectedDirection.value == 'asc' ? selectedDirection.value = 'desc' : selectedDirection.value = 'asc';
  getDocuments(documentsData.value.current_page, searchQuery.value, dateFrom.value, dateTo.value, '', selectedColumn.value, activeDocTab.value);
}

async function getDocuments(page: number, searchQuery: any, from: any, to: any, direction: any, column: any, type: number) {
  const inputs = {
    companyId: company.value.id,
    page: page,
    body: { type: type, orderBy: 'date_of_issue desc, serial_number desc', searchQuery: searchQuery, dateFrom: from, dateTo: to }
  }

  if (direction == 'next') {
    inputs.page++;
    await store
      .dispatch("getAllDocumentsForCompany", inputs)
      .then((response) => {
        response.data.data.forEach(element => {
          documents.value.push(element);
        });
        documentsData.value = response.data;
        ogDocs.value = store.state.documents;
      });
  } else {
    await store
      .dispatch("getAllDocumentsForCompany", inputs)
      .then((response) => {
        store.state.documents = response.data.data;
        documentsData.value = response.data;
        ogDocs.value = store.state.documents;
      });
  }
}

async function refreshData() {
  tab.value = store.state.documentTab;
  activeTab.value = tab.value;
  await store
    .dispatch("getSelectedCompany", store.state.selectedCompany.id)
    .then(async (response) => {
      company.value = response.data;
      await getDocuments(1, null, null, null, '', selectedColumn.value, 1);
      await store
        .dispatch("getFinDataForCompany", company.value.id)
        .then((response) => {
          finData.value = response.data;
        });
      await store
        .dispatch("getCompanyBankDetails", store.state.selectedCompany.id)
        .then((response) => {
          bankAccounts.value = response.data;
          if (bankAccounts.value.length > 0) {
            bankAccounts.value.map((data) => {
              if (data?.is_main == 1) {
                bankAccountId.value = data?.id;
              }
            })
          }
        });
    });
  isLoading.value = false;
}

onBeforeMount(async () => {
  store.state.mySubmenuActive = 1;
  await refreshData();
});
</script>

<style scoped>
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
