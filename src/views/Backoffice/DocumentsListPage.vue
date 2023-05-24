<template>
  <div class="min-h-screen">
    <div class="w-full min-h-screen">
      <!--MENU-->
      <div>
        <nav class="bg-gray-900 border-gray-200 px-2 sm:px-4 py-2.5 rounde">
          <div class="container flex flex-wrap items-center mx-auto">
            <div class="flex md:order-2">
              <div class="relative hidden md:block">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-500"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Search icon</span>
                </div>
                <input
                  type="text"
                  id="search-navbar"
                  v-model="searchQuery"
                  class="block w-full p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                  placeholder="Vyhľadajte doklad"
                />
              </div>
            </div>

            <div
              class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-search"
            >
              <ul
                class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
              >
                <li>
                  <button
                    @click="currentTab(1)"
                    :class="[
                      activeTab == 1 ? 'text-teal-500' : 'text-gray-400',
                      'font-bold block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700',
                    ]"
                  >
                    Účtovné
                  </button>
                </li>
                <li>
                  <button
                    @click="currentTab(2)"
                    :class="[
                      activeTab == 2 ? 'text-teal-500' : 'text-gray-400',
                      'font-bold block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700',
                    ]"
                  >
                    Obchodné
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <!--KONEIC MENU-->

      <!--TABY-->
      <div>
        <ul
          class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 bg-teal-500"
          id="tabs-tab"
          role="tablist"
        >
          <li class="nav-item" role="presentation" v-if="tab === 1">
            <button
              @click="currentDocTab(1)"
              :class="[
                activeDocTab == 1 ? 'bg-teal-600' : '',
                'nav-link block font-bold text-sm leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 ml-6 hover:border-transparent hover:bg-teal-300 focus:border-transparent h-full',
              ]"
            >
              Faktúry
            </button>
          </li>
          <li class="nav-item" role="presentation" v-if="tab === 1">
            <button
              @click="currentDocTab(2)"
              :class="[
                activeDocTab == 2 ? 'bg-teal-600' : '',
                'nav-link block font-bold text-sm leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 hover:border-transparent hover:bg-teal-300 focus:border-transparent h-full',
              ]"
            >
              Zálohové faktúry
            </button>
          </li>
          <li class="nav-item" role="presentation" v-if="tab === 1">
            <button
              @click="currentDocTab(3)"
              :class="[
                activeDocTab == 3 ? 'bg-teal-600' : '',
                'nav-link block font-bold text-sm leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 hover:border-transparent hover:bg-teal-300 focus:border-transparent h-full',
              ]"
            >
              Dobropisy
            </button>
          </li>
          <li class="nav-item" role="presentation" v-if="tab === 2">
            <button
              @click="currentDocTab(4)"
              :class="[
                activeDocTab == 4 ? 'bg-teal-600' : '',
                'nav-link block font-bold text-sm leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 ml-6 hover:border-transparent hover:bg-teal-300 focus:border-transparent h-full',
              ]"
            >
              Cenová ponuka
            </button>
          </li>
          <li class="nav-item" role="presentation" v-if="tab === 2">
            <button
              @click="currentDocTab(5)"
              :class="[
                activeDocTab == 5 ? 'bg-teal-600' : '',
                'nav-link block font-bold text-sm leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 hover:border-transparent hover:bg-teal-300 focus:border-transparent h-full',
              ]"
            >
              Objednávka
            </button>
          </li>
        </ul>
      </div>

      <!--KONIEC TABOV-->
      <div class="flex justify-center">
        <div
          class="flex flex-row bg-gray-700 text-gray-300 rounded-b-lg font-bold"
        >
          <div class="py-6 px-12">SPOLU {{ total.toFixed(2) }}€ bez DPH</div>
          <div class="py-6">|</div>
          <div class="py-6 px-12">
            NEUHRADENÉ {{ totalToPay.toFixed(2) }}€ bez DPH
          </div>
        </div>
      </div>

      <div class="flex flex-col px-20 py-10">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <FormKit
              type="checkbox"
              name="vystavene"
              label="Vystavené"
              validation-visibility="dirty"
              v-model="isIssuedChecked"
            />
            <FormKit
              type="checkbox"
              name="prijate"
              label="Prijaté"
              validation-visibility="dirty"
              v-model="isReceivedChecked"
            />
            <div class="pt-4">
              Importujte prijaté doklady <br />
              <button
                class="font-bold"
                v-on:click="openImportDialog('importModal')"
              >
                TU
              </button>
            </div>
            <Modal
              name="importModal"
              v-model:visible="isVisible"
              :type="'clean'"
              :closable="false"
              title="Importovanie dokladu"
            >
              <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
                <img
                  src="@/assets/doklad.png"
                  class="h-auto shrink-0 z-0 w-[128px] absolute right-16 top-12"
                />
                <div
                  class="flex justify-between py-8 px-4 text-white font-bold text-lg"
                >
                  Importujte prijatý doklad
                  <button
                    class="bg-red-500 hover:bg-red-700 h-8 px-6 rounded z-10 text-white"
                    v-on:click="closeDialog('importModal')"
                  >
                    X
                  </button>
                </div>
                <FormKit
                  type="form"
                  id="add-document"
                  submit-label="Importovať doklad"
                  @submit="importDocument()"
                  :actions="false"
                >
                  <div class="flex px-4 pt-10 text-white z-10 relative">
                    <FormKit
                      v-model="document.subtype"
                      :value="activeDocTab"
                      type="select"
                      name="Druh dokladu"
                      placeholder="Vyberte druh dokladu"
                      :options="Constants.DOCUMENT_SUBTYPES"
                      @change="documentSubtypeChanged()"
                      validation="required"
                    />
                  </div>
                  <div class="pl-4 text-white w-full py-4">
                    <FormKit
                      type="text"
                      name="Od koho je doklad"
                      label="Od koho je doklad"
                      validation="required"
                      v-model="document.odberatel"
                    />
                  </div>
                  <div class="pl-4 text-white w-full py-4">
                    <FormKit
                      type="text"
                      name="Číslo dokladu"
                      label="Číslo dokladu"
                      v-model="document.serial_number"
                    />
                  </div>
                  <div class="flex flex-row pb-8 gap-4">
                    <div class="flex text-white pl-4 basis-1/3">
                      <FormKit
                        type="date"
                        name="Termín prijatia"
                        label="Termín prijatia"
                        validation="required|length:10"
                        v-model="document.date_of_issue"
                        :value="today"
                      />
                    </div>
                    <div class="flex text-white basis-2/3 pr-4">
                      <div class="w-full">
                        <FormKit
                          type="text"
                          id="amount"
                          name="Suma"
                          label="Suma v €"
                          v-model="document.total"
                          validation="required"
                        />
                      </div>
                      <div class="w-full">
                        <FormKit
                          type="select"
                          label="DPH"
                          name="DPH"
                          :options="['s DPH', 'bez DPH']"
                          @change="dphChanged($event)"
                          validation="required"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="pl-4 w-full text-white">
                    <FormKit
                      id="scan"
                      label="Importovať doklad"
                      accept="image/*"
                      v-on:change="updateImgData($event)"
                      name="scan"
                      type="file"
                    />
                  </div>

                  <div class="flex flex-row justify-end py-8 px-4 gap-4">
                    <div class="flex flex-1/4">
                      <FormKit
                        label="Importovať doklad"
                        type="submit"
                        class="shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
                      />
                    </div>
                  </div>
                </FormKit>
              </div>
            </Modal>
          </div>
          <div class="flex flex-col items-center w-full py-8 px-10">
            <DocumentsListTable
              :data="filteredDocumentsBySearch"
            ></DocumentsListTable>
          </div>
          <div class="flex flex-col items-center">
            <button
              class="p-0 w-12 h-12 bg-gray-800 rounded-full hover:bg-gray-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
              v-on:click="redirect()"
            >
              <svg
                viewBox="0 0 20 20"
                enable-background="new 0 0 20 20"
                class="w-6 h-6 inline-block"
              >
                <path
                  fill="#FFFFFF"
                  d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
                />
              </svg>
            </button>
            <label class="font-bold text-center">Nový doklad</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, ref, computed, watch, reactive } from "vue";
import { useRouter } from "vue-router";
import DocumentsListTable from "@/components/DocumentsListTable.vue";
import type Company from "@/@types/Company";
import type Doklad from "@/@types/Document";
import { useModal, Modal } from "usemodal-vue3";
import moment from "moment";
import Constants from "@/helpers/constants";

const router = useRouter();
const tab = ref(1);
const activeTab = ref(1);
const docTab = ref(1);
const activeDocTab = ref(1);
const company = ref({} as Company);
const documents = ref([] as any[]);
const filteredDocuments = ref([] as any[]);
const searchQuery = ref("");
const isIssuedChecked = ref(true);
const isReceivedChecked = ref(true);
const today = moment(new Date()).format("YYYY-MM-DD");
const uploadImageData = ref({ body: { name: "", logo: "" }, companyId: 0 });
const document = ref({
  type: activeTab,
  subtype: activeDocTab,
  company_id: company.value.id,
  odberatel: "",
  serial_number: "",
  isIssued: false,
  isPaid: false,
  total: 0,
  payment_date: "",
  date_of_issue: today,
});

const setModal = useModal({
  importModal: 1,
});
let isVisible = reactive({});
isVisible = setModal("importModal", false);

const filteredDocumentsByIssued: any = computed(() => {
  return filteredDocuments.value.filter((document: any) => {
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
      return true;
    }
  });
});

const filteredDocumentsBySearch: any = computed(() => {
  return filteredDocumentsByIssued.value.filter((document: any) => {
    const odberatel = document.odberatel.toLowerCase();
    const serial_number = document.serial_number.toLowerCase();
    const searchTerm = searchQuery.value.toLowerCase();
    return odberatel.includes(searchTerm) || serial_number.includes(searchTerm);
  });
});

const total: any = computed(() => {
  return filteredDocumentsBySearch.value.reduce(
    (acc: any, item: any) => acc + item.total,
    0
  );
});

const totalToPay: any = computed(() => {
  return filteredDocumentsBySearch.value.reduce(
    (acc: any, item: any) => (!item.isPaid ? acc + item.total : acc + 0),
    0
  );
});

function dphChanged(event: any) {
  //
}

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
  uploadImageData.value.body.logo = evt.target.files[0];
}

function currentTab(tabNumber: any) {
  tab.value = tabNumber;
  activeTab.value = tabNumber;
}

function currentDocTab(tabNumber: any) {
  docTab.value = tabNumber;
  activeDocTab.value = tabNumber;
  switch (tabNumber) {
    case 1:
      filteredDocuments.value = documents.value.filter((document: any) => {
        if (document.subtype == 1) {
          return true;
        }
      });
      break;
    case 2:
      filteredDocuments.value = documents.value.filter((document: any) => {
        if (document.subtype == 2) {
          return true;
        }
      });
      break;
    case 3:
      filteredDocuments.value = documents.value.filter((document: any) => {
        if (document.subtype == 3) {
          return true;
        }
      });
      break;
    case 4:
      filteredDocuments.value = documents.value.filter((document: any) => {
        if (document.subtype == 4) {
          return true;
        }
      });
      break;
    case 5:
      filteredDocuments.value = documents.value.filter((document: any) => {
        if (document.subtype == 5) {
          return true;
        }
      });
      break;
  }
}

function redirect() {
  return router.push({
    name: "Add document",
    params: { subtype: activeDocTab.value },
  });
}

function openImportDialog(modal: string) {
  isVisible = setModal(modal, true);
}

function closeDialog(modal: string) {
  isVisible = setModal(modal, false);
}

function importDocument() {
  document.value.isIssued = false;
  document.value.company_id = company.value.id;
  document.value.serial_number = '420';

  return store
    .dispatch("addDocument", document.value)
    .then((res) => {
      //uploadImg();
      closeDialog("importModal");
      router.go(0);
    })
    .catch((err) => {
      console.log(err);
    });
}

function uploadImg() {
  store
    .dispatch("uploadDocumentImg", uploadImageData.value)
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
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
      store
        .dispatch("getAllDocumentsForCompany", company.value.id)
        .then((response) => {
          documents.value = response.data;
          filteredDocuments.value = documents.value.filter((document: any) => {
            if (document.subtype == 1) {
              return true;
            }
          });
          filteredDocumentsByIssued.value = filteredDocuments.value;
        });
    });
}

onBeforeMount(async () => {
  await refreshData();
});
</script>
