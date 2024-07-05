<template>
  <div class="relative w-[16rem] md:w-64 bg-gray-800 rounded-full px-4 py-2">
    <div class="flex justify-between items-center">
      <div>
        <div class="text-gray-400 text-sm">{{currentCompany.first_name}} {{currentCompany.last_name}}</div>
        <div class="text-white font-medium text-lg">{{ currentCompany.name }}</div>
      </div>
      <svg width="30" height="32" @click="toggleDropdown" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.9999 21.3342C15.8244 21.3352 15.6505 21.3016 15.488 21.2352C15.3256 21.1689 15.1778 21.0711 15.0533 20.9476L7.05326 12.9476C6.80218 12.6965 6.66113 12.356 6.66113 12.0009C6.66113 11.6458 6.80218 11.3053 7.05326 11.0542C7.30433 10.8032 7.64485 10.6621 7.99992 10.6621C8.35499 10.6621 8.69552 10.8032 8.94659 11.0542L15.9999 18.1209L23.0533 11.0676C23.3083 10.8491 23.6364 10.735 23.972 10.7479C24.3076 10.7609 24.6259 10.9 24.8633 11.1375C25.1008 11.3749 25.2399 11.6933 25.2529 12.0288C25.2658 12.3644 25.1517 12.6925 24.9333 12.9476L16.9333 20.9476C16.6849 21.1939 16.3497 21.3327 15.9999 21.3342Z" fill="white"/>
      </svg>
    </div>
    <div v-if="isOpen" class="absolute top-12 left-0 right-0 bg-gray-700 border border-teal-500 rounded-lg mt-1 p-4">
      <div class="text-gray-400 text-sm mb-2">{{currentCompany.first_name}} {{currentCompany.last_name}}</div>
      <div class="text-white font-medium text-lg mb-2">{{ currentCompany.name }}</div>
      <div v-for="company in companies" :key="company.id" @click="selectCompany(company)" class="px-4 py-2 hover:bg-gray-600 cursor-pointer">
        <div class="text-gray-400 text-sm">{{company.first_name}} {{company.last_name}}</div>
        <div class="text-teal-500 font-medium">{{ company.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import store from "@/store";
import type Company from "@/types/Company";

const companies = ref([] as Company[]);
const currentCompany = ref({} as Company);
const isOpen = ref(false);

watch(
  () => store.getters.getSelectedCompany,
  function () {
    refreshData();
  }
);

onBeforeMount(async () => {
  await store
    .dispatch("getAllCompaniesByUserId", store.state.user.userId)
    .then((response) => {
      console.log('compaines',response);
      companies.value = response.data.data;
      currentCompany.value = companies.value.at(0);
      store.state.selectedCompany = currentCompany.value;
      refreshData();
    });
});

function refreshData() {
  currentCompany.value = store.state.selectedCompany;
  if (currentCompany.value.headquarters_id !== 0) {
    store
      .dispatch("getHeadquartersById", currentCompany.value.headquarters_id)
      .then((response) => {
        store
          .dispatch("getAddressById", response.data.address_id)
          .then((response) => {
            store.state.selectedCompanyAddress = response.data;
          });
      });
  }
}

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectCompany(company: Company) {
  currentCompany.value = company;
  store.state.selectedCompany = company;
  refreshData();
  isOpen.value = false;
}
</script>

<style scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
</style>
