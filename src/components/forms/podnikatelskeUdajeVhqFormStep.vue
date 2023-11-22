<template>
      <div class="flex flex-row py-5 gap-8">
        <div class="flex flex-row">
          <span class="shrink pr-10">Chcete sídlo pre <b>EŠTE NEZALOŽENÚ</b> firmu?</span>
        </div>
        <div>
          <FormKit
            :checked="newCompany"
            type="checkbox"
            id="nova"
            v-model="newCompany"
            class="focus:ring-teal-500 focus:border-teal-500 text-teal-500"
          />
        </div>
      </div>
      <!-- Podnikatelské údaje New company-->
      <div v-if="newCompany">
        <div class="text-4xl font-bold">Identifikujte firmu</div>
        <div class="my-2">
          Po zaplatení služby dostanete dokument, pomocou ktorého môžete založiť
          firmu na našom (virtuálnom) sídle.
        </div>
        <div class="my-5">
          Chcete, aby sme Vám novú firmu založili my?
          <a class="text-teal-500" href="#">Kliknite sem</a>
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
            </div>
          </FormKit>
        </div>
      </div>
      <!-- Podnikatelské údaje Existing company-->
      <div v-if="!newCompany">
        <div class="text-4xl font-bold">Identifikujte firmu</div>
        <div class="my-2">
          Po zaplatení služby dostanete dokument, pomocou ktorého môžete
          prepísať sídlo Vašej firmy na to naše (virtuálne).
        </div>
        <div class="my-5">
          Chcete, aby sme prepis sídla zabezpečili tiež my?
          <a class="text-teal-500" href="#">Kliknite sem</a>
        </div>
        <div class="flex" v-if="!showAddNewCompany && user.userId">
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
        <div class="flex basis-1/3 pt-4">
          <FormKit type="toggle" track-color-on="#319487" v-if="user.userId" v-model="showAddNewCompany" label="Pridať novú spoločnosť?" name="checkForNewCompany" />
        </div>
        <div v-if="showAddNewCompany || !user.userId">
          <FormKit
            type="group"
            id="Podnikatelské údaje"
            name="Podnikatelské údaje"
          >
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
              <div class="flex flex-col">
                <label class="formkit-label block mb-1 font-bold text-sm text-white">Spoločnosť</label>
                <Autocomplete v-model="finstatCompany" id="pua"></Autocomplete>
              </div>
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
              <FormKit type="text" name="dic" label="DIČ" v-model="finstatCompanyDetails.Dic"/>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormKit
                type="text"
                name="street"
                v-model="companyAddress.street"
                label="Ulica a číslo"
              />
              <FormKit
                type="text"
                name="city"
                v-model="companyAddress.city"
                label="Mesto"
              />
              <FormKit
                type="text"
                name="psc"
                v-model="companyAddress.psc"
                label="PSČ"
              />
              <FormKit
                type="text"
                name="country"
                v-model="companyAddress.country"
                label="Krajina"
              />
            </div>
          </FormKit>
        </div>
      </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { ref, watch, onMounted, computed } from "vue";
import type Address from "@/types/Address";
import type Mail from "@/types/Mail";
import Autocomplete from "@/components/Autocomplete.vue";

const companyAddress = ref({} as Address);
const finstatCompany = ref({} as any);
const currentCompany = ref({} as any);
const companies = ref([] as any);
const newCompany = ref(false);
let showAddNewCompany = ref(false);
const finstatCompanyDetails = ref({} as any);
const user = computed(() => store.state.user);
const mails = ref([] as Mail[]);

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

const companyToAdd = ref({
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

watch(finstatCompany, (newFinstatCompany, prevFinstatCompany) => {
  if(newFinstatCompany.Spoločnosť !== undefined) {
      getCompanyDetails();
    }
});

watch(showAddNewCompany, () => {
  addNewCompany();
});


function addNewCompany() {
  if(showAddNewCompany.value) {
    companies.value.push(companyToAdd.value);
    currentCompany.value = companyToAdd.value;
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
  }
}

async function getCompanyDetails() {
  let ico = {
    ico: ""
  }

  if(finstatCompany.value.Spoločnosť.Ico !== undefined) {
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
      })
      .catch((err) => {
        console.log(err);
      });
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
        }).catch((err) => {
          console.log(err)
        });
    } catch (err){
      console.log(err)
    }
  }
});

defineExpose({
  finstatCompanyDetails,
  companyAddress,
  currentCompany,
  newCompany
})
</script>