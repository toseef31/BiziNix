<template>
  <div class="w-full min-h-screen flex justify-center bg-gray-900">
    <img src="@/assets/logo_b.png" class="absolute center min-h-screen z-0" />
    <div class="flex py-20 w-full px-20 z-10">
      <div class="flex flex-col basis-2/3">
        <div
          class="text-4xl text-white leading-normal font-bold text-center pt-8 pb-20"
        >
          Vyberte si šablónu pre Vaše doklady
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
      <div class="flex flex-col basis-1/6 items-center">
        <div
          class="max-w-sm bg-gray-800 border border-teal-500 rounded-lg shadow justify-center"
        >
          <img class="rounded-t-lg p-8" v-bind:src="company.logo" alt="" />
          <button
            class="shadow flex border py-2 w-full rounded-b-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
            v-on:click="showModal()"
          >
            <span class="font-bold w-full">Nahrať logo</span>
          </button>
        </div>
        <Modal
          name="uploadModal"
          v-model:visible="isVisible"
          :type="'clean'"
          :closable="false"
          title="Upload logo"
        >
          <div class="bg-gray-600 rounded-lg border-gray-800 border-2">
            <div
              class="flex flex-row justify-start py-4 px-4 text-white font-bold text-lg"
            >
              Prosím vyberte súbor
            </div>
            <div class="flex flex-row justify-end py-2 px-4">
              <div class="flex flex-1/4 px-4">
                <input
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-white"
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
                  class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-white"
                  v-on:click="closeModal()"
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
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import type Company from "@/@types/Company";
import { useModal, Modal } from "usemodal-vue3";
const router = useRouter();
const company = ref({} as Company);
const templates = ref([] as any[]);
const uploadImageData = ref({ body: { name: "", logo: "" }, companyId: 0 });

const setModal = useModal({
  uploadModal: 1,
});

let isVisible = reactive({});

isVisible = setModal("uploadModal", false);

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

function showModal() {
  isVisible = setModal("uploadModal", true);
}

function closeModal() {
  isVisible = setModal("uploadModal", false);
}

function updateLogoData(evt: any) {
  uploadImageData.value.body.name = evt.target.files[0].name;
  uploadImageData.value.body.logo = evt.target.files[0];
}

function uploadLogo() {
  store
    .dispatch("uploadCompanyLogo", uploadImageData.value)
    .then((response) => {
      company.value = response.data;
      isVisible = setModal("uploadModal", false);
      console.log(response)
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
    });

  await store.dispatch("getDocumentTemplates").then((response) => {
    templates.value = response.data;
  });
}

onBeforeMount(async () => {
  await refreshData();
});
</script>
