<template>
        <div class="pb-8" v-if="!user.userId">
          <div class="flex flex-row w-full justify-between">
            <div>
              Máte už u nás založenú (a pridanú) firmu a chcete k nej dokúpiť službu Bizinix Doklady? 
              Prihláste sa a predíďte tak "nudnému" vyplňovaniu podnikateľských údajov. ✌️
            </div>
            <div>
              <router-link
                to="/login"
                class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700"
                >Prihlásiť sa</router-link
              >
            </div>
          </div>
        </div>
        <div class="text-4xl font-bold">Identifikujte firmu</div>
        <div class="my-4">
          Vypíšte údaje firmy, z ktorej chcete vystavovať doklady.
          <div class="pb-2 pt-8" v-if="user.userId">
            <div class="py-2">
              Vyberte si zo zoznamu Vašu spoločnosť, pre ktorú chcete balík
              aktivovať:
            </div>
            <div class="relative w-full">
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
          </div>
        </div>
        <div>
          <FormKit
            type="group"
            id="Podnikatelské údaje"
            name="Podnikatelské údaje"
          >
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
              <FormKit
                type="text"
                name="name"
                validation="required"
                v-model="currentCompany.name"
                label="Názov spoločnosti"
              />
              <FormKit
                type="text"
                name="name"
                v-model="currentCompany.ico"
                label="IČO"
                :validation-rules="{ icoIsUnique }"
                validation="required|icoIsUnique"
                :validation-messages="{
                  icoIsUnique: 'Táto firma už používa služby Bizinix. Je to Vaša firma? Ak áno PRIHLÁSTE SA',
                }"
                validation-visibility="live"
                v-on:input="checkIcoOwner"
              />
              <FormKit
                type="text"
                name="dic"
                label="DIČ"
                v-model="currentCompany.dic"
              />
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormKit
                type="text"
                name="street"
                v-model="companyAddress.street"
                label="Ulica"
                validation="required"
              />
              <FormKit
                type="text"
                name="street_number"
                v-model="companyAddress.street_number"
                label="Súpisne číslo"
                validation="required"
              />
              <FormKit
                type="text"
                name="street_number2"
                v-model="companyAddress.street_number2"
                label="Orientačné číslo"
                validation="required"
              />
              <FormKit
                type="text"
                name="city"
                v-model="companyAddress.city"
                label="Mesto"
                validation="required"
              />
              <FormKit
                type="text"
                name="psc"
                v-model="companyAddress.psc"
                label="PSČ"
                validation="required"
              />
              <FormKit
                type="text"
                name="country"
                v-model="companyAddress.country"
                label="Krajina"
                validation="required"
              />
              <FormKit
                type="text"
                name="ic_dph"
                label="IČ DPH (nepovinné)"
                v-model="currentCompany.icdph"
              />
            </div>
            <div v-if="!firstTimeActivation">
              <div class="text-teal-500 font-bold">POZNÁMKA:</div>
              <div>
                Zvolená firma už minula svoje 3 mesiace využívania služby
                zdarma.
              </div>
            </div>
          </FormKit>
        </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { computed, ref, onMounted } from "vue";
import type Address from "@/types/Address";
import type Mail from "@/types/Mail";
import { ChevronDownIcon } from "@heroicons/vue/outline";

const user = computed(() => store.state.user);
const companyAddress = computed(
  () => store.state.selectedCompanyAddress as Address
);

const newCompany = ref({
  id: 0,
  name: "Nová spoločnosť",
  type: 1,
  status: 1,
  ico: "Zadajte IČO",
  dic: "",
  headquarters_id: 0,
  is_dph: false,
  owner: user.value.userId? Number(user.value.userId): 0,
  is_hq_virtual: false
});

const companies = ref([] as any);
const currentCompany = ref({} as any);
const mails = ref([] as Mail[]);

const firstTimeActivation = computed(() => {
  return currentCompany.value.fakturacia_zaplatene_do ? false : true;
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

async function isIcoAlreadyRegistered(node: any) {
  try {
      const res = await store.dispatch("isIcoAlreadyRegistered", node);
      return res;
  } catch (error) {
      return false;
  }
}

async function icoIsUnique(node: any) {
  const result = await isIcoAlreadyRegistered(node.value);
  return result;
}

async function checkIcoOwner(node: any) {
  const companyRes = companies.value.find(
    (item: any) => item.ico == node
  );
  if(companyRes) {
    currentCompany.value = companyRes;
  } else {
    currentCompany.value = newCompany.value;
  }
}

async function switchSelect(event: any) {
  currentCompany.value = companies.value.find(
    (item: any) => item.id == event.target.value
  );
  store.state.selectedCompany = currentCompany.value;
  mails.value = [];

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
  await store
    .dispatch("getAllMailsForCompany", currentCompany.value.id)
    .then((response) => {
      mails.value = response.data;
      store.commit("setSelectedCompanyMails", mails.value);
    });

}

onMounted(async () => {
  try {
    await store
      .dispatch("getAllCompaniesByUserId", store.state.user.userId)
      .then((response) => {
        companies.value = response.data;
        currentCompany.value = companies.value.at(0);
        store.state.selectedCompany = currentCompany.value;
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
      }).catch((err) => {
        currentCompany.value = newCompany.value;
        console.log(err)
      });
    companies.value.push(newCompany.value);
  } catch (err){
    console.log(err)
  }
});

defineExpose({
  isIcoAlreadyRegistered,
  companyAddress,
  currentCompany,
  headquarter
})
</script>