<template>
        <div class="relative w-64">
          <select
            id="companies"
            name="companies"
            class="text-sm lg:text-lg font-medium w-full appearance-none bg-none bg-gray-700 border border-transparent rounded-md pl-3 py-2 text-teal-500 focus:outline-none"
            @change="switchSelect($event)"
          >
            <option
              v-for="company in companies"
              :value="company.id"
              :key="company.id"
              :selected="company.id == currentCompany.id"
            >
              {{ company.name }}
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center"
          >
            <ChevronDownIcon class="w-5 text-teal-500" aria-hidden="true" />
          </div>
        </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/outline";
import type Mail from '@/@types/Mail';
import store from '@/store';
import { inject, onBeforeMount, onMounted, provide, ref } from 'vue';

const companies = ref([""] as any);
const mails = ref([] as Mail[]);
const currentCompany = ref({
  created_at: "",
  dic: "",
  fakturacia_zaplatene_do: "",
  headquarters_id: 0,
  icdph: "",
  ico: "",
  id: 0,
  imanie_splatene: 0,
  imanie_vyska: 0,
  is_dph: 0,
  konecny_uzivatelia_vyhod: 1,
  last_step: 0,
  name: "name",
  note: null,
  owner: 0,
  registration_date: "",
  sidlo_zaplatene_do: "",
  sposob_konania_konatelov: 1,
  status: 1,
  subjects_of_business: null,
  type: 1,
  updated_at: "",
});

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

const emit = defineEmits(['myEmails', 'addresses']);

onBeforeMount(async () => {

  await store
    .dispatch("getAllCompaniesByUserId", store.state.user.userId)
    .then((response) => {
      companies.value = response.data;
      currentCompany.value = companies.value.at(0);
    });

});

function switchSelect(event: any) {

  currentCompany.value = companies.value.find(
    (item: any) => item.id == event.target.value
  );

  mails.value = [];

  //aktualizovat adresu
  store
    .dispatch("getHeadquartersById", currentCompany.value.headquarters_id)
    .then((response) => {
      headquarter.value = response.data;
      store
        .dispatch("getAddressById", headquarter.value.address_id)
        .then((response) => {
          address.value = response.data;
          emit('addresses', address.value)
        });
    });

  //vyhladat postu
  store
    .dispatch("getAllMailsForCompany", currentCompany.value.id)
    .then((response) => {
      mails.value = response.data;
      emit('myEmails', mails.value)
    });
}

</script>