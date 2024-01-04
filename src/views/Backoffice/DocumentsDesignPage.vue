<template>
  <div class="w-full min-h-screen flex justify-center bg-gray-400">
    <div class="flex flex-col py-20 w-full px-20 z-10">
      <div class="flex flex-col text-4xl text-gray-600 pb-10">
        Nastavenia dokladov
      </div>
      <div class="text-white pb-4">
        Prajete si vykonať zmeny Vašich firemných údajov ? <router-link :to="{ name: 'CompanyDetails', params: { activeTab: 2 } }" class=" text-teal-600">Kliknite sem</router-link>
      </div>  
      <div class="flex flex-row pb-10">
        <div class="flex flex-col basis-2/3"> 
        <div
          class="text-2xl text-gray-600 pb-4"
        >
          Design dokladov
        </div>
        <div
          class="container mx-auto space-y-2 lg:space-y-0 lg:gap-4 lg:grid lg:grid-cols-3"
        >
          <div
            class="w-full rounded hover:opacity-50 text-center"
            v-for="template in templates"
            :key="template.id"
          >
            <img
              v-bind:src="template.img"
              v-on:click="changeTemplate(template.id)"
              alt="image"
              :class="[
                company.doc_template_id == template.id
                  ? 'border-teal-500 border-4'
                  : '',
                '',
              ]"
            />
            <span
              v-show="company.doc_template_id == template.id"
              class="bg-teal-500 text-gray-800 text-lg font-bold px-6 py-3 rounded"
              >Používa sa</span
            >
          </div>
        </div>
      </div>
        <div class="flex flex-col px-8">
          <div class="flex flex-col basis-1/3 px-8">  
            <div
              class="text-2xl text-gray-600 pb-4"
            >
              Logo firmy
            </div>
            <div
              class="max-w-sm bg-gray-100 border border-teal-500 rounded-lg shadow justify-center"
            >
              <img
                class="rounded-t-lg p-6 max-w-sm"
                v-bind:src="'data:image/png;base64,' + logoSrc"
                alt=""
              />
              <button
                class="shadow flex border py-2 w-full rounded-b-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
                v-on:click="showModal('uploadLogoModal')"
              >
                <span class="font-bold w-full px-2">Nahrať logo</span>
              </button>
            </div>
            <Modal
              name="uploadLogoModal"
              v-model:visible="isVisible"
              :type="'clean'"
              :closable="false"
              title="Upload logo"
            >
              <div class="bg-gray-100 rounded-lg border-teal-600 border-2">
                <div
                  class="flex flex-row justify-start py-4 px-4 text-gray-600 font-bold text-lg"
                >
                  Prosím vyberte súbor
                </div>
                <div class="flex flex-row justify-end py-2 px-4">
                  <div class="flex flex-1/4 px-4">
                    <input
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-600"
                      id="scan"
                      accept="image/*"
                      v-on:change="updateLogoData($event)"
                      name="scan"
                      type="file"
                    />
                    <button
                      class="bg-teal-500 hover:bg-teal-700 h-8 px-6 rounded z-10 text-gray-800"
                      v-on:click="uploadLogo()"
                    >
                      Nahrať
                    </button>
                  </div>
                  <div class="flex flex-1/4">
                    <button
                      class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-gray-600"
                      v-on:click="closeModal('uploadLogoModal')"
                    >
                      Zrušiť
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
          <div class="flex flex-col basis-1/3 px-8">
            <div
              class="text-2xl text-gray-600 pt-10 pb-4"
            >
              Podpis
            </div>
            <div
              class="max-w-sm bg-gray-100 border border-teal-500 rounded-lg shadow justify-center"
            >
              <img
                class="rounded-t-lg p-6 max-w-sm"
                v-bind:src="'data:image/png;base64,' + podpisSrc"
                alt=""
              />
              <button
                class="shadow flex border py-2 w-full rounded-b-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
                v-on:click="showModal('uploadPodpisModal')"
              >
                <span class="font-bold w-full px-2">Nahrať podpis</span>
              </button>
            </div>
            <Modal
              name="uploadPodpisModal"
              v-model:visible="isVisible"
              :type="'clean'"
              :closable="false"
              title="Upload podpis"
            >
              <div class="bg-gray-100 rounded-lg border-teal-600 border-2">
                <div
                  class="flex flex-row justify-start py-4 px-4 text-gray-600 font-bold text-lg"
                >
                  Prosím vyberte súbor
                </div>
                <div class="flex flex-row justify-end py-2 px-4">
                  <div class="flex flex-1/4 px-4">
                    <input
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-600"
                      id="scan"
                      accept="image/*"
                      v-on:change="updatePodpisData($event)"
                      name="scan"
                      type="file"
                    />
                    <button
                      class="bg-teal-500 hover:bg-teal-700 h-8 px-6 rounded z-10 text-gray-800"
                      v-on:click="uploadPodpis()"
                    >
                      Nahrať
                    </button>
                  </div>
                  <div class="flex flex-1/4">
                    <button
                      class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-gray-600"
                      v-on:click="closeModal('uploadPodpisModal')"
                    >
                      Zrušiť
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="flex flex-col">
          <div class="text-2xl text-gray-600 pb-4">
            Formát číslovania dokladov
          </div>
          <FormKit
            v-model="company.doc_sncounter_id"
            type="select"
            label="Formát čísla"  
            :options="sncounters"
            @change="snCounterChanged()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useModal, Modal } from "usemodal-vue3";
import type Company from "@/types/Company";

const router = useRouter();
const company = ref({} as Company);
const templates = ref([] as any[]);
const uploadImageData = ref({ body: { name: "", logo: "" }, companyId: 0 });
const uploadPodpisData = ref({ body: { name: "", podpis: "" }, companyId: 0 });
const logoSrc = ref();
const podpisSrc = ref();
const sncounters = ref([] as any);

const setModal = useModal({
  uploadLogoModal: 1,
  uploadPodpisModal: 2,
});

let isVisible = reactive({});

isVisible = setModal("uploadLogoModal", false);
isVisible = setModal("uploadPodpisModal", false);

async function changeTemplate(id: any) {
  company.value.doc_template_id = id;
  await store
    .dispatch("updateCompany", company.value)
    .then((res) => {
      console.log("Šablóna úspešne zmenená.");
    })
    .catch((err) => {
      console.log(err);
    });
}

async function snCounterChanged() {
  await store
    .dispatch("updateCompany", company.value)
    .then((res) => {
      console.log("Číslovanie úspešne zmenené.");
    })
    .catch((err) => {
      console.log(err);
    });
}

function showModal(modal) {
  isVisible = setModal(modal, true);
}

function closeModal(modal) {
  isVisible = setModal(modal, false);
}

function updateLogoData(evt: any) {
  uploadImageData.value.body.name = evt.target.files[0].name;
  uploadImageData.value.body.logo = evt.target.files[0];
}

function updatePodpisData(evt: any) {
  uploadPodpisData.value.body.name = evt.target.files[0].name;
  uploadPodpisData.value.body.podpis = evt.target.files[0];
}

async function uploadLogo() {
  await store
    .dispatch("uploadCompanyLogo", uploadImageData.value)
    .then(async (response) => {
      company.value = response.data;
      isVisible = setModal("uploadLogoModal", false);
      await refreshData();
    })
    .catch((err) => {
      console.log(err);
    });
}

async function uploadPodpis() {
  await store
    .dispatch("uploadCompanyPodpis", uploadPodpisData.value)
    .then(async (response) => {
      company.value = response.data;
      isVisible = setModal("uploadPodpisModal", false);
      await refreshData();
    })
    .catch((err) => {
      console.log(err);
    });
}

async function refreshData() {
  await store
    .dispatch("getSelectedCompany", store.state.selectedCompany.id)
    .then((response) => {
      company.value = response.data;
      uploadImageData.value.companyId = company.value.id;
      uploadPodpisData.value.companyId = company.value.id;
      store.dispatch("getCompanyLogo", company.value.id).then((response) => {
        logoSrc.value = response.image;
      });
      store.dispatch("getCompanyPodpis", company.value.id).then((response) => {
        podpisSrc.value = response.image;
      });
    });

  await store.dispatch("getDocumentTemplates").then((response) => {
    templates.value = response.data;
  });

  await store.dispatch("getDocumentSnCounters").then((response) => {
    sncounters.value = [];
    response.data.data.forEach((sncounter: any) => {
      sncounters.value.push({
        label: sncounter.name,
        value: sncounter.id.toString(),
        description: sncounter.description
      });
    });
  });
}

onBeforeMount(async () => {
  await refreshData();
});
</script>
