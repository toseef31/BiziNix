<template>
  <div class="relative w-64">
    <select id="companies" name="companies"
      class="text-sm lg:text-lg font-medium w-full appearance-none bg-none bg-gray-700 border border-transparent rounded-md pl-3 py-2 text-teal-500 focus:outline-none"
      @change="switchSelect($event)">
      <option v-for="company in companies" :value="company.id" :key="company.id"
        :selected="company.id == currentCompany.id">
        {{ company.name }}
      </option>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
      <ChevronDownIcon class="w-5 text-teal-500" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type Mail from "@/types/Mail";
import store from "@/store";
import { onBeforeMount, ref, watch } from "vue";
import type Company from "@/types/Company";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

const companies = ref([""] as any);
const currentCompany = ref({} as Company);

const headquarter = ref({
  id: 0,
  address_id: 0,
});

const address = ref({
  id: 0,
  street: "",
  street_number: 0,
  city: "",
  country: "",
  psc: "",
});

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
      companies.value = response.data;
      currentCompany.value = companies.value.at(0);
      store.state.selectedCompany = currentCompany.value;
      //aktualizovat adresu
      store
        .dispatch("getHeadquartersById", currentCompany.value.headquarters_id)
        .then((response) => {
          headquarter.value = response.data;
          store
            .dispatch("getAddressById", headquarter.value.address_id)
            .then((response) => {
              address.value = response.data;
              store.state.selectedCompanyAddress = address.value;
            });
        });
    });
});

async function refreshData() {
  currentCompany.value = store.state.selectedCompany;

  //aktualizovat adresu
  await store
    .dispatch("getHeadquartersById", currentCompany.value.headquarters_id)
    .then((response) => {
      headquarter.value = response.data;
      store
        .dispatch("getAddressById", headquarter.value.address_id)
        .then((response) => {
          address.value = response.data;
          store.state.selectedCompanyAddress = address.value;
        });
    });
}

async function switchSelect(event: any) {
  currentCompany.value = companies.value.find(
    (item: any) => item.id == event.target.value
  );

  store.state.selectedCompany = currentCompany.value;

  //aktualizovat adresu
  await store
    .dispatch("getHeadquartersById", currentCompany.value.headquarters_id)
    .then((response) => {
      headquarter.value = response.data;
      store
        .dispatch("getAddressById", headquarter.value.address_id)
        .then((response) => {
          address.value = response.data;
          store.state.selectedCompanyAddress = address.value;
        });
    });
}
</script>
