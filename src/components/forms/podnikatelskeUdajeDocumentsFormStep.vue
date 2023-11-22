<template>
        <div class="pb-8" v-if="!user.userId">
          <div class="flex flex-row w-full justify-between">
            <div>
              Máte už u nás založenú (a pridanú) firmu a chcete k nej dokúpiť službu Bizinix Doklady? 
              Prihláste sa a predíďte tak "nudnému" vyplňovaniu údajov. ✌️
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
          <div class="text-gray-400">
            Vypíšte údaje firmy, z ktorej chcete vystavovať doklady.
          </div>
          <div class="pb-2 pt-8" v-if="user.userId">
            <div class="pb-4 text-xl">
              Dobrý deň {{user.data.first_name}}!<br>
              Vyberte si zo zoznamu Vašu firmu, pre ktorú chcete službu aktivovať, alebo pridajte inú.
            </div>
            <div class="flex" v-if="!showAddNewCompany">
              <div class="flex basis-2/4">
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
                      {{ company.name }} {{ company.fakturacia_free? "(Skúšobná verzia zdarma)" : !company.fakturacia_free && company.fakturacia_zaplatene_do? "(Služba je aktívna)" : "" }}
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
          </div>
        </div>
        <div class="flex basis-1/3">
          <FormKit type="toggle" track-color-on="#319487" v-if="user.userId" v-model="showAddNewCompany" label="Pridať novú spoločnosť?" name="checkForNewCompany" />
        </div>
        <div v-if="showAddNewCompany || !user.userId">
          <FormKit
            type="group"
            id="Podnikatelské údaje"
            name="Podnikatelské údaje"
          >
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
              <div v-if="!user.userId">
                <div class="flex flex-col">
                  <label class="formkit-label block mb-1 font-bold text-sm text-white">Spoločnosť</label>
                  <Autocomplete v-model="finstatCompany"></Autocomplete>
                </div>
              </div>
              <FormKit
                v-else
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
                  icoIsUnique: 'Táto spoločnosť už používa služby Bizinix. Je to Vaša firma? Ak áno PRIHLÁSTE SA',
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
                label="Ulica a číslo"
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
          </FormKit>
        </div>
        <div v-if="!firstTimeActivation">
          <div class="text-teal-500 font-bold">POZNÁMKA:</div>
          <div>
            Zvolená firma už minula svoje 3 mesiace využívania služby
            zdarma.
          </div>
        </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { computed, ref, onMounted, watch } from "vue";
import type Address from "@/types/Address";
import type Mail from "@/types/Mail";
import { ChevronDownIcon, PlusCircleIcon } from "@heroicons/vue/24/outline";
import Autocomplete from "@/components/Autocomplete.vue";


const user = computed(() => store.state.user);
const companyAddress = computed(
  () => store.state.selectedCompanyAddress as Address
);

let showAddNewCompany = ref(false);
const finstatCompany = ref({} as any);
const finstatCompanyDetails = ref({} as any);

watch(finstatCompany, (newFinstatCompany, prevFinstatCompany) => {
  console.log(newFinstatCompany)
  if(newFinstatCompany.Spoločnosť !== undefined) {
      getCompanyDetails();
    }
});

watch(showAddNewCompany, () => {
  addNewCompany();
});

async function getCompanyDetails() {
  let ico = {
    ico: ""
  }

  if(finstatCompany.value.Spoločnosť !== undefined) {
    ico = {
      ico: finstatCompany.value.Spoločnosť.Ico
    }
  }
  
  await store
      .dispatch("getDetailsOfCompanyFinstat", ico)
      .then((res: any) => {
        finstatCompanyDetails.value = res.data;
        companyAddress.value.city = finstatCompanyDetails.value.City;
        companyAddress.value.street = finstatCompanyDetails.value.Street+" "+finstatCompanyDetails.value.StreetNumber;
        companyAddress.value.psc = finstatCompanyDetails.value.ZipCode;
        companyAddress.value.country = "Slovensko";

        currentCompany.value.name = finstatCompanyDetails.value.Name;
        currentCompany.value.ico = finstatCompanyDetails.value.Ico;
        currentCompany.value.dic = finstatCompanyDetails.value.Dic;
        currentCompany.value.icdph = finstatCompanyDetails.value.IcDPH;
      })
      .catch((err) => {
        console.log(err);
      });
} 

const newCompany = ref({
  id: 0,
  name: "Nová spoločnosť",
  type: 1,
  status: 1,
  ico: "",
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

function addNewCompany() {
  if(showAddNewCompany.value) {
    companies.value.push(newCompany.value);
    currentCompany.value = newCompany.value;
    store.state.selectedCompany = currentCompany.value;
  } else {
    companies.value.pop();
    store.state.selectedCompany = companies.value[0];
    currentCompany.value = store.state.selectedCompany;
  }
}

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
  if(showAddNewCompany.value) {
    showAddNewCompany.value = false;
    companies.value.pop();
  }

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
  if(store.state.user.userId){
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
    } catch (err){
      console.log(err)
    }
  } else {
    currentCompany.value = newCompany.value;
  }
});

defineExpose({
  isIcoAlreadyRegistered,
  companyAddress,
  currentCompany,
  headquarter
})
</script>