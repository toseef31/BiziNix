<template>
    <div class="flex flex-col px-10">
        <div class="flex flex-col py-10 items-center">
            <div class="flex flex-row gap-8">
                <div class="flex flex-col">
                  <label for="issue-date" class="text-black"
                          >Názov spoločnosti</label
                        >
                    <FormKit type="text" name="name" v-model="company.name"/>
                    <label for="issue-date" class="text-black"
                          >Adresa</label
                        >
                    <FormKit type="text" name="address" v-model="address.street"/>
                    <div class="flex flex-row gap-4">
                      <div class="flex flex-col">
                        <label for="issue-date" class="text-black"
                          >PSČ</label
                        >
                        <FormKit type="text" name="psc" v-model="address.psc"/>

                      </div>
                      <div class="flex flex-col">
                        <label for="issue-date" class="text-black"
                          >Mesto</label
                        >
                        <FormKit type="text" name="city" v-model="address.city"/>

                      </div>
                                          
                    </div>
                    <label for="issue-date" class="text-black"
                          >Krajina</label
                        >
                    <FormKit type="text" name="country" v-model="address.country"/>
                </div>
                <div class="flex flex-col">
                  <label for="issue-date" class="text-black"
                          >IČO</label
                        >
                    <FormKit type="text" name="ico" v-model="company.ico"/>
                    <label for="issue-date" class="text-black"
                          >DIČ</label
                        >
                    <FormKit type="text" name="dic" v-model="company.dic"/>
                    <div class="flex flex-row gap-4">
                      <div class="flex flex-col justify-end">
                        <FormKit
                            type="checkbox"
                            label="Platiteľ DPH?"
                            name="platitel"
                            v-model="company.is_dph"
                            :classes="{label: '$reset text-sm text-black mt-1 select-none'}"
                        />
                      </div>
                      <div class="flex flex-col">
                        <label for="issue-date" class="text-black"
                          >DPH</label
                        > 
                        <FormKit
                            type="select"
                            :options="[{label: 'Platca DPH', value: 'platca'}, {label: 'Neplatca DPH', value: 'neplatca'}]"
                        />
                      </div>
                    </div>
                    <label for="issue-date" class="text-black"
                          >IČ DPH</label
                        >
                    <FormKit type="text" name="icdph" v-model="company.icdph"/>
                    <FormKit
                        type="checkbox"
                        label="Osobitná úprava dane"
                        name="dane"
                        :classes="{label: '$reset text-sm text-black mt-1 select-none'}"
                    />
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <div class="flex flex-row justify-between">
                <div>
                    Prajete si vykonať zmeny Vašej firmy v obchodnom registry? <router-link :to="{ name: 'CompanyDetails', params:{ activeTab: 1 } }">Kliknite sem</router-link>
                </div>
                <div>
                    <button @click="updateCompany" class="w-fit shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-white font-bold hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2">
                        Akualizovať údaje
                    </button>
                </div>
            </div>
        </div>
    </div>
    <Modal
          name="loadingModal"
          v-model:visible="isVisible"
          :type="'clean'"
          :closable="false"
          title="Loading..."
        >
          <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
            <div role="status" class="flex py-10 h-full w-full justify-center">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-teal-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
      </Modal>
</template>

<script setup lang="ts">
import store from '@/store';
import { onMounted, ref, reactive, watch } from 'vue';
import type Company from "@/types/Company";
import type Headquarters from '@/types/Headquarters';
import type Address from '@/types/Address';
import { useModal, Modal } from "usemodal-vue3";

let company = ref({} as Company);
let hq = ref({} as Headquarters);
let address = ref({} as Address);

const setModal = useModal({
  loadingModal: 1,
});

let isVisible = reactive({});

isVisible = setModal("loadingModal", false);

function showModal() {
  isVisible = setModal("loadingModal", true);
}

function closeModal() {
  isVisible = setModal("loadingModal", false);
}

watch(
  () => store.getters.getSelectedCompany,
  function () {
    company.value = store.getters.getSelectedCompany;
  }
);


async function refreshData() {
  await store
    .dispatch("getHeadquartersById", company.value.headquarters_id)
    .then(async (response) => {
      hq.value = response.data;
      await store
        .dispatch("getAddressById", hq.value.address_id)
        .then((response) => {
            address.value = response.data;
        });
    });
}

async function updateCompany() {
    showModal();
    await store
    .dispatch("updateCompany", company.value)
    .then(() => {
        closeModal();
    });
}

onMounted(async () => {
    company.value = store.getters.getSelectedCompany;
    await refreshData();
})

</script>

<style>
.formkit-input {
  color: black;
}

.formkit-select-icon {
  color: black;
}
</style>