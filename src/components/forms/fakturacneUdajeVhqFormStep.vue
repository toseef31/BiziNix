<template>
  <div class="text-4xl font-bold pb-4">Fakturácia</div>
  <div>
    <FormKit
      type="group"
      v-model="fakturacne_udaje"
      id="Fakturačné údaje"
      name="Fakturačné údaje"
    >
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
          <FormKit
            type="checkbox"
            v-model="invoiceAddressIsSame"
            :ignore="true"
            label="Fakturačné údaje sú rovnaké ako podnikateľské"
            name="invoiceAddressIsSame"
          />
        </div>
        <div v-show="!invoiceAddressIsSame">
          <div v-show="user.userId">
            <div class="py-4">Vyberte iný fakturačný profil alebo si vytvorte nový</div>
            <div class="flex flex-row gap-8 pb-2">
              <div class="flex basis-1/3">
                <div class="relative w-full">
                  <select
                    id="profiles"
                    name="profiles"
                    class="text-sm lg:text-lg font-medium w-full appearance-none bg-none bg-gray-700 border border-transparent rounded-md pl-3 py-2 text-teal-500 focus:outline-none"
                    @change="switchSelect($event)"
                  >
                    <option
                      v-for="profile in invoiceProfiles"
                      :value="profile.id"
                      :key="profile.id"
                      :selected="profile.id == currentInvoiceProfile.id"
                    >
                      {{ profile.name? profile.name : profile.first_name+" "+profile.last_name }}
                    </option>
                  </select>
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center"
                  >
                    <ChevronDownIcon class="w-5 text-teal-500" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div class="flex basis-1/3">
                <button type="button" class="text-gray-800 bg-teal-500 hover:bg-teal-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  v-on:click="addNewProfile()"
                >
                    <span class="pr-5">Pridať nový profil</span>
                    <PlusCircleIcon class="w-5 text-gray-800" aria-hidden="true" />
                </button>
              </div>
            </div> 
          </div>
          <div v-if="showAddNewProfile || !user.userId">
            <div class="py-4">Vytvoriť nový fakturačný profil</div>
            <div class="pb-4">
              <ul class="flex flex-wrap text-sm font-medium text-center text-gray-400">
                <li class="mr-2">
                  <button type="button"
                    @click="currentTab(1)"
                    :class="[
                      activeTab == 1 ? 'bg-teal-500' : 'bg-gray-600',
                      'inline-block px-4 py-3 text-white rounded-lg font-bold hover:bg-gray-400',
                    ]"
                  >Firma</button>
                </li>
                <li class="mr-2">
                  <button type="button"
                    @click="currentTab(2)"
                    :class="[
                      activeTab == 2 ? 'bg-teal-500' : 'bg-gray-600',
                      'inline-block px-4 py-3 text-white rounded-lg font-bold hover:bg-gray-400',
                    ]"
                  >Súkromná osoba</button>
                </li>
            </ul>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center" v-show="activeTab == 2">
              <FormKit
                type="text"
                name="first_name"
                label="Meno"
                v-model="userData.first_name"
              />
              <FormKit
                type="text"
                name="last_name"
                label="Priezvisko"
                v-model="userData.last_name"
              />
            </div>
            <div v-show="activeTab == 1">
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <FormKit type="text" name="name" label="Názov spoločnosti" v-model="currentInvoiceProfile.name" v-if="user.userId"/>
                <div class="flex flex-col" v-else>
                  <label class="formkit-label block mb-1 font-bold text-sm text-white">Spoločnosť</label>
                  <Autocomplete v-model="finstatCompany"></Autocomplete>
                </div>
                <FormKit type="text" name="ico" label="IČO" v-model="currentInvoiceProfile.ico"/>
                <FormKit type="text" name="dic" label="DIČ" v-model="currentInvoiceProfile.dic"/>
              </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormKit
              type="text"
              name="street"
              v-model="invoiceAddress.street"
              label="Ulica a číslo"
            />
            <FormKit
              type="text"
              name="city"
              v-model="invoiceAddress.city"
              label="Mesto"
            />
            <FormKit
              type="text"
              name="psc"
              v-model="invoiceAddress.psc"
              label="PSČ"
            />
            <FormKit
              type="text"
              name="country"
              v-model="invoiceAddress.country"
              label="Krajina"
            />
            <FormKit type="text" name="ic_dph" label="IČ DPH (nepovinné)" v-show="activeTab == 1" v-model="currentInvoiceProfile.ic_dph"/>
            </div>
          </div>
      </div>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { ref, computed, onMounted, watch } from "vue";
import type Address from "@/types/Address";
import type Company from "@/types/Company";
import type User from "@/types/User";
import { ChevronDownIcon, PlusCircleIcon } from "@heroicons/vue/24/outline";
import Autocomplete from "@/components/Autocomplete.vue";

const activeTab = ref(1);
const user = computed(() => store.state.user);
const company = computed(() => store.state.selectedCompany as Company);
const hqAddress = computed(() => store.state.selectedCompanyAddress as Address);
let showAddNewProfile = ref(false);

const userData = computed(() => store.state.user.data as User);
const invoiceAddress = ref({} as Address);

const invoiceAddressIsSame = ref(true);

const fakturacne_udaje = ref({
    first_name: "",
    last_name: "",
    name: "",
    ico: "",
    dic: "",
    ic_dph: "",
    address_id: 0,
    user_id: 0,
    company_id: 0
});

const newProfile = ref({
    id: 0,
    first_name: "",
    last_name: "",
    name: "Nový profil",
    ico: "",
    dic: "",
    ic_dph: "",
    address_id: 0,
    user_id: 0,
    company_id: 0
});

function addNewProfile() {
    if(showAddNewProfile.value) {
      showAddNewProfile.value = false;
      invoiceProfiles.value.pop();
      currentInvoiceProfile.value = invoiceProfiles.value[0];
    } else {
      showAddNewProfile.value = true;
      invoiceProfiles.value.push(newProfile.value);
      currentInvoiceProfile.value = newProfile.value;
    }
}

const finstatCompany = ref({} as any);
const finstatCompanyDetails = ref({} as any);

watch(finstatCompany, (newFinstatCompany, prevFinstatCompany) => {
    if(newFinstatCompany.Spoločnosť !== undefined) {
      getCompanyDetails();
    }
});

async function getCompanyDetails() {
    let ico = {
      ico: ""
    }

    if(finstatCompany.value.Spoločnosť.Ico !== undefined) {
      ico = {
        ico: finstatCompany.value.Spoločnosť.Ico
      }

      await store
      .dispatch("getDetailsOfCompanyFinstat", ico)
      .then((res: any) => {
        finstatCompanyDetails.value = res.data;
        invoiceAddress.value.city = finstatCompanyDetails.value.City;
        invoiceAddress.value.street = finstatCompanyDetails.value.Street+" "+finstatCompanyDetails.value.StreetNumber;
        invoiceAddress.value.psc = finstatCompanyDetails.value.ZipCode;
        invoiceAddress.value.country = "Slovensko";

        currentInvoiceProfile.value.name = finstatCompanyDetails.value.Name;
        currentInvoiceProfile.value.ico = finstatCompanyDetails.value.Ico;
        currentInvoiceProfile.value.dic = finstatCompanyDetails.value.Dic;
        currentInvoiceProfile.value.ic_dph = finstatCompanyDetails.value.IcDPH;

        fakturacne_udaje.value.name = finstatCompanyDetails.value.Name;
        fakturacne_udaje.value.ico = finstatCompanyDetails.value.Ico;
        fakturacne_udaje.value.dic = finstatCompanyDetails.value.Dic;
        fakturacne_udaje.value.ic_dph = finstatCompanyDetails.value.IcDPH;

      })
      .catch((err) => {
        console.log(err);
      });
    }
} 


const invoiceProfiles = ref([] as any);
const currentInvoiceProfile = ref({
    id: 0,
    first_name: "",
    last_name: "",
    name: "",
    ico: "",
    dic: "",
    ic_dph: "",
    address_id: 0,
    user_id: 0,
    company_id: 0
});

function currentTab(tabNumber: any) {
  activeTab.value = tabNumber;
}

function isInvoiceAddressSameAsCompany() {
    if(invoiceAddressIsSame.value == true) {
      fakturacne_udaje.value.ico = company.value.ico;
      fakturacne_udaje.value.dic = company.value.dic;
      fakturacne_udaje.value.ic_dph = company.value.icdph;
      fakturacne_udaje.value.name = company.value.name;
      fakturacne_udaje.value.company_id = company.value.id;
      fakturacne_udaje.value.address_id = hqAddress.value.id;
    } else {
      fakturacne_udaje.value.ico = currentInvoiceProfile.value.ico;
      fakturacne_udaje.value.dic = currentInvoiceProfile.value.dic;
      fakturacne_udaje.value.ic_dph = currentInvoiceProfile.value.ic_dph;
      fakturacne_udaje.value.name = currentInvoiceProfile.value.name;
      fakturacne_udaje.value.company_id = currentInvoiceProfile.value.company_id;
      fakturacne_udaje.value.address_id = currentInvoiceProfile.value.address_id;
      fakturacne_udaje.value.user_id = Number(user.value.userId);
    }
}

async function switchSelect(event: any) {
    if(showAddNewProfile.value) {
      showAddNewProfile.value = false;
      invoiceProfiles.value.pop();
    }

    currentInvoiceProfile.value = invoiceProfiles.value.find(
      (item: any) => item.id == event.target.value
    );

    await store
      .dispatch("getAddressById", currentInvoiceProfile.value.address_id)
      .then((response) => {
        invoiceAddress.value = response.data;
        fakturacne_udaje.value.address_id = response.data.id;
    });
}

onMounted(async () => {
    if(store.state.user.userId) {
      try {
        await store
          .dispatch("getFakturacneUdajeByUserId", store.state.user.userId)
          .then((response) => {
            invoiceProfiles.value = response.data;
            currentInvoiceProfile.value = invoiceProfiles.value.at(0);
            store
              .dispatch("getAddressById", currentInvoiceProfile.value.address_id)
                .then((response) => {
                  invoiceAddress.value = response.data;
                  fakturacne_udaje.value.address_id = response.data.id;
                });
          });
        } catch (err){
        console.log(err)
      }
    }
});

defineExpose({
  isInvoiceAddressSameAsCompany,
  invoiceAddressIsSame,
  invoiceAddress,
  fakturacne_udaje,
  finstatCompanyDetails,
  finstatCompany
})
</script>