<template>
  <div class="w-full min-h-screen flex justify-center">
    <div class="flex flex-col py-20 w-full px-20">
      <div class="flex flex-col text-4xl text-gray-600 pb-10">
        Nastavenia dokladov
      </div>
      <div class="text-black pb-4">
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
                  : 'border-2 border-gray-800',
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
                v-on:click="showUploadLogoDialog = true"
              >
                <span class="font-bold w-full px-2">Nahrať logo</span>
              </button>
            </div>
            <Dialog :open="showUploadLogoDialog" @close="showUploadLogoDialog = false" class="relative z-50">
              <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
              <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
                
                <DialogPanel class="w-full max-w-sm rounded bg-gray-900 shadow text-white">
                  <DialogTitle class="text-center py-4 text-xl font-bold">Prosím vyberte súbor
                  </DialogTitle>
                  <div class="flex flex-col justify-end py-2 px-4 gap-4">
                  <div class="flex flex-1/4 px-4">
                    <input
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-600"
                      id="scan"
                      accept="image/*"
                      v-on:change="updateLogoData($event)"
                      name="scan"
                      type="file"
                    />
                    
                  </div>
                  <div class="flex flex-1/4 flex-row justify-between">
                    <button
                      class="bg-teal-500 hover:bg-teal-700 h-8 px-6 rounded z-10 text-gray-800"
                      v-on:click="uploadLogo()"
                    >
                      Nahrať
                    </button>
                    <button
                      class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-gray-600"
                      v-on:click="showUploadLogoDialog = false"
                    >
                      Zrušiť
                    </button>
                  </div>
                </div>
                </DialogPanel>
              </div>
            </Dialog>
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
                v-on:click="showUploadPodpisDialog = true"
              >
                <span class="font-bold w-full px-2">Nahrať podpis</span>
              </button>
            </div>
            <Dialog :open="showUploadPodpisDialog" @close="showUploadPodpisDialog = false" class="relative z-50">
              <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
              <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel class="w-full max-w-sm rounded bg-gray-900 shadow text-white">
                  <DialogTitle class="text-center py-4 text-xl font-bold">Prosím vyberte súbor
                  </DialogTitle>
                  <div class="flex flex-col justify-end py-2 px-4 gap-4">
                  <div class="flex flex-1/4 px-4">
                    <input
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-600"
                      id="scan"
                      accept="image/*"
                      v-on:change="updatePodpisData($event)"
                      name="scan"
                      type="file"
                    />
                  </div>
                  <div class="flex flex-1/4 flex-row justify-between">
                    <button
                      class="bg-teal-500 hover:bg-teal-700 h-8 px-6 rounded z-10 text-gray-800"
                      v-on:click="uploadPodpis()"
                    >
                      Nahrať
                    </button>
                    <button
                      class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-gray-600"
                      v-on:click="showUploadPodpisDialog = false"
                    >
                      Zrušiť
                    </button>
                  </div>
                </div>
                </DialogPanel>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <div class="flex flex-col bg-gray-800 py-2 px-4 rounded-xl">
          <div class="text-2xl text-gray-100 pb-4">
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
        <div class="flex flex-col bg-gray-800 py-2 px-4 rounded-xl" v-if="company.doc_sncounter_id == 3">
          <div class="text-2xl text-gray-100 pb-4">
            Formát vlastného číslovania dokladov
          </div>
          <FormKit
            v-model="company.custom_sncounter_format"
            type="text"
            label="Formát čísla"
          />
          <button type="button"
                  class="text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent hover:text-teal-500 focus:outline-none"
                  v-on:click="updateCompany()">
                  Uložiť
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, ref } from "vue";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import type Company from "@/types/Company";
import { toast } from "vue3-toastify";

const company = ref({} as Company);
const templates = ref([] as any[]);
const uploadImageData = ref({ body: { name: "", logo: "" }, companyId: 0 });
const uploadPodpisData = ref({ body: { name: "", podpis: "" }, companyId: 0 });
const logoSrc = ref();
const podpisSrc = ref();
const sncounters = ref([] as any);

const showUploadLogoDialog = ref(false);
const showUploadPodpisDialog = ref(false);

async function changeTemplate(id: any) {
  company.value.doc_template_id = id;
  await store
    .dispatch("updateCompany", company.value)
    .then(() => {
      toast.success("Šablóna úspešne zmenená.");
    })
    .catch((err) => {
      toast.error('Error: ' + err);
    });
}

async function snCounterChanged() {
  await store
    .dispatch("updateCompany", company.value)
    .then(() => {
      toast.success("Číslovanie úspešne zmenené.");
    })
    .catch((err) => {
      toast.error('Error: ' + err);
    });
}

async function updateCompany() {
  await store
    .dispatch("updateCompany", company.value)
    .then(() => {
      toast.success('Úspešne zmenené')
    })
    .catch((err) => {
      toast.error('Error: ' + err);
    });
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
      showUploadLogoDialog.value = false;
      await refreshData();
    })
    .catch((err) => {
      toast.error('Error: ' + err);
    });
}

async function uploadPodpis() {
  await store
    .dispatch("uploadCompanyPodpis", uploadPodpisData.value)
    .then(async (response) => {
      company.value = response.data;
      showUploadPodpisDialog.value = false;
      await refreshData();
    })
    .catch((err) => {
      toast.error('Error: ' + err);
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
  store.state.mySubmenuActive = 1;
  await refreshData();
});
</script>
