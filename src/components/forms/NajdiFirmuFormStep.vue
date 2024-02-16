<template>
  <div class="text-4xl font-bold mb-6">Ako prvé zadajte IČO vašej firmy</div>
  <FormKit
    name="Spoločnosť"
    type="autocomplete"
    label="IČO spoločnosti"
    placeholder="Zadajte IČO spoločnosti"
    :options="search"
    validation="required|length:6"
    empty-message="Subjekt nebol nájdený, zadajte správne ičo."
    v-model="companyFromOsRs"
  >
    <template #option="{ option }">
      <div class="formkit-option grow p-2">
        <div class="font-bold">{{ option.label }}, {{ option.city }}</div>
      </div>
    </template>
  </FormKit>
  <div class="flex flex-col space-y-4 last:mb-4">
    {{companyFromOsRs}}
    Konateliaaa: {{ konateliaFromOrSr }}
    Konatelia lenght {{ konateliaFromOrSr?.length }}
    <br><b>New Konatelia {{ newKonateliaList }}</b>
    <!-- Nazov spolocnosti -->
    <EditItemForCompany title="Obchodné meno">
      <div class="grid grid-cols-2 items-center">
        <div>
          <h3 v-bind:class="{ 'text-cross': newCompanyFullName.newCompanyName != ''  }" class="text-lg">{{ companyFromOsRs?.obchodne_meno }}</h3>
          <h3 class="text-lg font-bold">{{ newCompanyFullName.newCompanyName + " " + newCompanyFullName.newCompanyPravForm}}</h3>
        </div>
        <div>
          <button @click.prevent="openEditCompanyName" class="bg-bizinix-teal p-2 rounded">Upraviť</button>
          <VueFinalModal
              :modal-id="modalIdAddOrEditCompanyName"
              display-directive="if"
              :clickToClose="false"
              :escToClose="false"
              :lockscroll="true"
              class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
              content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
            >
              <h3 class="text-white text-2xl">
                Obchodné meno
              </h3>
              <p class="text-white mb-4" >Obchodné meno nemôže byť totožné s už existujúcim. Názov si overte cez www.orsr.sk alebo www.rpo.sk. Čiarky, pomlčky, medzery, veľké/malé písmená a podobne nie sú dostatočným odlišovacím znakom.</p>
              <FormKit
                type="form"
                id="form_new_business_name" name="new_business_name"
                @submit="closeModalAndSaveOrEditCompanyName"
                :config="{ validationVisibility: 'live' }"
                submit-label="Pridať"
                #default="{ value, state: { valid } }"
                :actions="false"
              >
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormKit type="text" name="new_business_name" v-model="newCompanyFullName.newCompanyName" label="Nové obchodné meno" placeholder="Napíšte nové obchodné meno" validation="required|length:2" />
                  <FormKit type="select" name="pravnaForma" label="Právna forma" v-model="newCompanyFullName.newCompanyPravForm" placeholder="Vybrať"
                    :options="['s. r. o.', ', s. r. o.', ', spol. s r. o.']" validation="required"
                  />
                  </div>
                    <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
                    <button
                      class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
                      type="button"
                      @click.prevent="closeModalForCompanyName"
                    >
                      Zrušiť
                    </button>
                    <button
                      :disabled="!valid"
                      type="submit"
                      class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
                    >
                      Potvrdiť
                    </button>
                  </div>
              </FormKit>
            </VueFinalModal>         
              </div>
            </div>
    </EditItemForCompany>
    <!-- Sídlo -->    
    <EditItemForCompany title="Sídlo">
      <div class="grid grid-cols-2 items-center">
        <div>
          <h3 v-bind:class="{ 'text-cross': newHqAddress.country != '' || selectedVhqFromStore.name != null }" class="text-lg">{{ companyFromOsRs?.adresa.street + " " + companyFromOsRs?.adresa.number }}</h3>
          <h3 v-bind:class="{ 'text-cross': newHqAddress.city != '' || selectedVhqFromStore.name != null }" class="text-lg">{{ companyFromOsRs?.adresa.city + " " + companyFromOsRs?.adresa.zip }}</h3>
          <div v-if="obchodneSidloVirtuOrNormal == 'vlastnePrenajate'">
            <h3 class="text-lg font-bold">{{ newHqAddress.country + " " + newHqAddress.city  + " " + newHqAddress.psc + " " + newHqAddress.street + " " + newHqAddress.street_number }}</h3>
          </div>
          <div v-else>
            <h3 class="text-lg font-bold">{{ selectedVhqFromStore.name }}</h3>
          </div>
        </div>
        <div>
          <button @click="openEditSidlo" class="bg-bizinix-teal p-2 rounded">Upraviť</button>
          <VueFinalModal
              :modal-id="modalIdAddOrEditSidlo"
              display-directive="if"
              :clickToClose="false"
              :escToClose="false"
              :lockscroll="true"
              class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
              content-class="text-white flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
            >
                <h3 class="text-white text-2xl">
                  Sídlo
                </h3>
                <FormKit
                  type="form"
                  id="form_sidlo" name="new_sidlo"
                  @submit="closeModalAndSaveOrEditSidlo"
                  :config="{ validationVisibility: 'live' }"
                  submit-label="Pridať"
                  #default="{ value, state: { valid } }"
                  :actions="false"
                >
                <FormKit type="radio" v-model="obchodneSidloVirtuOrNormal" label="O aké sídlo máte záujem?" name="obchodneSidloVirtuOrNormal"
                  :options="
                      [
                        { value: 'vlastnePrenajate', label: 'Vlastné alebo prenajaté' },
                        { value: 'virtualne', label: 'Virtuálne sídlo' }
                      ]"
                      validation="required"
                />
                  <div v-if="obchodneSidloVirtuOrNormal === 'vlastnePrenajate'">
                    <div class="grid grid-cols-3 gap-4">
                      <FormKit type="select" name="country" id="country" label="Štát" v-model="newHqAddress.country" placeholder="Vyberte štát"
                        :options="['Slovensko','Česká republika']" validation="required" validation-visibility="dirty"
                      />
                    <FormKit type="text" name="city" v-model="newHqAddress.city" label="Obec" validation="required" />
                    <FormKit type="text" name="psc" v-model="newHqAddress.psc" label="PSČ" validation="required" />
                    <FormKit type="text" name="street" v-model="newHqAddress.street" label="Ulica" validation="required" />
                    <FormKit type="text" name="street_number" v-model="newHqAddress.street_number" label="Súpisne číslo"
                      validation="require_one:street_number2"
                      help="Čislo pred lomítkom"
                    />
                    <FormKit type="text" name="street_number2" v-model="newHqAddress.street_number2" label="Orientačné číslo"
                      validation="require_one:street_number"
                      help="Čislo za lomítkom"
                    />
                    </div>
                    <div class="mb-4">
                      <p>
                        Na vytvorenie dokumentu "Súhlas vlastníka nehnuteľnosti" so zápisom nehnuteľnosti do obchodného registra ako sídla spoločnosti budeme potrebovať nasledovné údaje:
                      </p>
                    </div>
                    <div class="flex flex-col md:flex-row md:space-x-4">
                      <FormKit type="select" name="headquarters_type" id="headquarters_type_company" label="Druh priestoru"
                        v-model="headquarterInfo.headquarters_type" placeholder="Vyberte druh priestoru"
                        :options="[
                          { label: 'Nebytový priestor', value: 1 },
                          { label: 'Byt v bytovom dome', value: 2 },
                          { label: 'Iná budova', value: 3 },
                          { label: 'Rodinný dom', value: 4 },
                          { label: 'Samostatne stojaca garáž', value: 5 }
                        ]"
                        validation="required" validation-visibility="dirty"
                      />
                      <FormKit type="text" name="ownerName" v-model="headquarterInfo.owner_name" label="Vlastník priestoru" validation="required" />
                    </div>
                  </div>
                  <div v-if="obchodneSidloVirtuOrNormal === 'virtualne'">
                    <div class="flex flex-col md:flex-row gap-8 mb-4">
                          <div>
                            <div class="pb-8 font-bold text-lg w-full text-left"> Vyberte si sídlo</div>
                            <VirtualHqSlider></VirtualHqSlider>
                          </div>
                        </div>
                    <div v-if="!store.state.selectedVhq.name" class="my-4 flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
                        <b>Prosím vyberte sídlo.</b>
                    </div>
                  </div>
                  <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
                    <button
                      class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
                      type="button"
                      @click.prevent="closeModalForSidlo"
                    >
                      Zrušiť
                    </button>
                    <button
                      :disabled="!valid || isNextButtonDisabledHq"
                      type="submit"
                      class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
                    >
                      Potvrdiť
                    </button>
                  </div>
                </FormKit>
              </VueFinalModal>         
              </div>
            </div>
    </EditItemForCompany>
    <!-- Konatelia -->
    <EditItemForCompany title="Konatelia">
      <div v-for="(konatelDiv, index ) in konateliaFromOrSr" :key="index" class="grid grid-cols-2 items-center space-y-4">
        <div>
          <h3 :index="index" class="text-lg" :class="{ 'text-cross': checkHasChange(newKonateliaList[index]) }">{{ konatelDiv.name }}</h3>
          <div v-if="newKonateliaList[index] && checkHasChange(newKonateliaList[index])">
            <h3 class="text-lg font-bold">{{ newKonateliaList[index]?.title_before + " " + newKonateliaList[index]?.first_name + " " + newKonateliaList[index]?.last_name + " " +  newKonateliaList[index]?.title_after }} {{ newKonateliaList[index].hasChange }}</h3>             
          </div>  
        </div>
        <div class="flex space-x-4">
          <button @click="openEditKonatel(index)" class="bg-bizinix-teal p-2 rounded">Zmeniť údaje {{ index }}</button>
          <button @click="openEditCancelKonatel(index)" class="bg-bizinix-teal p-2 rounded">Zruš konateľa {{ index }}</button>
          <button>
            <Tippy>
              <ReceiptRefundIcon @click.prevent="returnChangesBack(index)" class="h-7 w-h-7 text-bizinix-teal" aria-hidden="true" />
              <template #content>
                Vrátiť zmeny späť
              </template>
            </Tippy>
          </button>
        </div>
        <VueFinalModal
          :modal-id="modalIdAddOrEditKonatel"
          display-directive="if"
          :clickToClose="false"
          :escToClose="false"
          :lockscroll="true"
          class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
          content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
        >
          <h3 class="text-white text-2xl">Zmeniť osobné údaje konateľa</h3>
          <p class="text-white mb-4" >Zadajte nové údaje alebo prepíšte existujúce údaje tak, ako chcete, aby sa zapísali do obchodného registra</p>
          <small class="text-white">Pozor, všetky nové údaje musia byť už zapísané v občianskom preukaze.</small>
          <!-- get konatel via openEditKonatel and asign to form via property name="" -->
          <FormKit
            type="form"
            id="form_new_konatelia" name="new_konatelia"
            @submit="closeModalAndSaveOrEditKonatel"
            :config="{ validationVisibility: 'live' }"
            submit-label="Pridať"
            #default="{ value, state: { valid } }"
            :actions="false"
            v-model="konatel"
          >
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormKit type="text" name="first_name" label="Krstné meno" validation="required|length:2" />
            <FormKit type="text" name="last_name" label="Priezvisko" validation="required|length:2" />
            <FormKit type="date" style="color-scheme: dark;" name="date_of_birth" autocomplete="date_of_birth"
              label="Dátum narodenia" validation="required" />
            <FormKit type="select" name="gender" label="Pohlavie" placeholder="Vyberte pohlavie" :options="['Muž', 'Žena']"
              validation="required" />
            <FormKit type="text" name="title_before" label="Titul pred menom" />
            <FormKit type="text" name="title_after" label="Titul za menom" />
            <FormKit type="text" name="rodne_cislo" label="Rodné číslo" id="rodne_cislo"
              validation="required|length:9"
              validation-visibility="blur" />
            <FormKit type="select" name="country" label="Štát" placeholder="Vyberte štát"
              :options="['Slovenská republika', 'Česká republika']" validation="required" />
            <FormKit type="text" name="city" label="Mesto" validation="required" />
            <FormKit type="text" name="psc" label="PSČ" validation="required" />
            <FormKit type="text" name="street" label="Ulica" validation="required" />
            <FormKit type="text" name="street_number" label="Súpisne číslo" validation="require_one:street_number2" />
            <FormKit type="text" name="street_number2" label="Orientačné číslo" validation="require_one:street_number" />
          </div>
            <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
            <button
              class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
              type="button"
              @click.prevent="closeModalForKonatel"
            >
              Zrušiť
            </button>
            <button
              :disabled="!valid"
              type="submit"
              class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
            >
            Potvrdiť
            </button>
          </div>
          </FormKit>  
        </VueFinalModal>
        <!-- Odovlat konatela -->
        <VueFinalModal
          :modal-id="modalIdCancelKonatel"
          display-directive="if"
          :clickToClose="false"
          :escToClose="false"
          :lockscroll="true"
          class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
          content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
        >
          <h3 class="text-white text-2xl">Odvolať konateľa</h3>          
          <h3 class="text-white text-xl pb-4">{{ konatel?.title_before + " " + konatel.first_name + " " + konatel.last_name + " " + konatel?.title_after }}</h3>
          <FormKit
            type="form"
            id="form_cancel_konatelia" name="cancel_konatelia"
            @submit="closeModalAndSaveCanceledKonatel"
            :config="{ validationVisibility: 'blur' }"
            submit-label="Pridať"
            #default="{ value, state: { valid } }"
            :actions="false"            
          >
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormKit type="text" name="rodne_cislo_odvolat" label="Rodné číslo" id="rodne_cislo_odvolat"
              validation="length:9"
            />
            <FormKit type="date" style="color-scheme: dark;" name="datum_odvolat_od"
              label="Odvolať od" validation="required"
            />
          </div>
            <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
            <button
              class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
              type="button"
              @click.prevent="closeModalForCancelKonatel"
            >
              Zrušiť
            </button>
            <button
              :disabled="!valid"
              type="submit"
              class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
            >
            Potvrdiť
            </button>
          </div>
          </FormKit>  
        </VueFinalModal>  
      </div>
    </EditItemForCompany>
    <EditItemForCompany title="Spoločníci">
    </EditItemForCompany>
    <EditItemForCompany title="Spôsob konania konateľov">
    </EditItemForCompany>
    <EditItemForCompany title="Predmet podnikania">
    </EditItemForCompany>
    <EditItemForCompany title="Základné imanie">
    </EditItemForCompany>
    <EditItemForCompany title="Prokurista">
    </EditItemForCompany>
    <EditItemForCompany title="Iné zmeny">
    </EditItemForCompany>
  </div>
</template>

<script setup lang="ts">

import store from '@/store';
import { getNode } from '@formkit/core';
import { onBeforeMount, reactive, ref, computed, onMounted, onUnmounted, watch } from 'vue';
import type Company from '@/types/Company';
import { useVfm, VueFinalModal, useModal, useModalSlot } from 'vue-final-modal'
import EditItemForCompany from './EditItemForCompany.vue'
import { toast } from "vue3-toastify";
import type Address from '@/types/Address';
import VirtualHqSlider from '@/components/VirtualHqSlider.vue'
import type CompanyMemberKonatel from '@/types/CompanyMemberKonatel';
import { Tippy } from "vue-tippy";
import 'tippy.js/dist/tippy.css' // optional for styling
import { PencilIcon, XMarkIcon, UserIcon, ReceiptRefundIcon } from '@heroicons/vue/24/outline'

// defineProps<{
//   indexKonatel: number
// }>()

const companyFromOsRs = ref();
const vfm = useVfm()
const modalIdAddOrEditCompanyName = Symbol('modalIdAddOrEditCompanyName')
const modalIdAddOrEditKonatel = Symbol('modalIdAddOrEditKonatel')
const modalIdCancelKonatel = Symbol('modalICancelKonatel')
const modalIdAddOrEditSidlo = Symbol('modalIdAddOrEditSidlo')
const loading = ref(true);
const subjects_of_business = ref<Company['subjects_of_business']>([]);
const selectedVhqFromStore = computed(() => store.getters.getSelectedVhq)
let newCompanyFullName = reactive({
  newCompanyName: '',
  newCompanyPravForm: ''
})
let konatelIndex: number;
let konatelObject: CompanyMemberKonatel = {
  company_id: null,
  first_name: '',
  last_name: '',
  title_before: '',
  title_after: '',
  gender: '',
  rodne_cislo: '',
  date_of_birth: '',
  street: '',
  street_number: '',
  street_number2: '',
  country: '',
  obchodne_meno: '',
  city: '',
  psc: '',
  je_konatel: true,
  hasChange: false,
};
let konatel = ref(konatelObject);
let newKonateliaList = ref<CompanyMemberKonatel[]>([])

let obchodneSidloVirtuOrNormal = ref("vlastnePrenajate")
let newHqAddress = ref({
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
} as Address)

let headquarterInfo = ref({
  name: '',
  description: '',
  headquarters_type: 0,
  owner_name: '',
  price: 0,
  registry: false,
  forwarding: false,
  scanning: false,
  shredding: false,
  is_virtual: false,
  img: '',
  address_id: 0
})

onMounted( () => {
  store.state.selectedVhq = {};
  store.state.selectedVhqPackage = {};  
})

onUnmounted(() => {
  store.state.selectedVhq = {};
  store.state.selectedVhqPackage = {};
})

async function search({ search }: any) {
  if (!search) return [];
  if (search.length > 5) {
    const searchQuery = {
      searchQuery: search,
    };
    const res = await store
      .dispatch("getCompanyFromOrsrByIco", searchQuery.searchQuery)
      .catch((err) => {
        toast.error('Error: ' + err);
      });
      console.log(res)
    return [{
        label: res.data.obchodne_meno,
        value: res.data,
        city: res.data.adresa.city
    }];
  }
  return [];
}

const konateliaFromOrSr = computed(() => {
  if(companyFromOsRs.value){
    //const list = [{}];
    //const emptyList = companyFromOsRs?.value.statutarny_organ.konateľ === 0 ? companyFromOsRs.value.statutarny_organ.konatelia : companyFromOsRs?.value.statutarny_organ.konateľ
    if(companyFromOsRs?.value.statutarny_organ.konateľ){
      return companyFromOsRs?.value.statutarny_organ.konateľ;
    }
    else if(companyFromOsRs?.value.statutarny_organ.konatelia){
      return companyFromOsRs?.value.statutarny_organ.konatelia
    }
    else {
      return [];
    }
  }
})

function openEditCompanyName() {
  vfm.open(modalIdAddOrEditCompanyName)
}

function openEditKonatel(index: number) {
  vfm.open(modalIdAddOrEditKonatel)?.then(() => {    
    newKonateliaList.value.length = konateliaFromOrSr.value.length        
    konatelIndex = index
    console.log("Lenght of newKonateliaList", newKonateliaList.value.length)
    // get current konatel if index exist if no then work with konatel
    if(newKonateliaList.value[index] !== undefined){
      konatel.value = newKonateliaList.value[index];
      console.log("if");
    } else {
      console.log("Start editing konatel orSr at index:", konatelIndex);
      getSpecificKonatel(index)
    }
  })
}

function openEditCancelKonatel(index: number) {
  vfm.open(modalIdCancelKonatel)?.then(() => {
    konatelIndex = index
    getSpecificKonatel(index)
  })
}

const modalInstanceKonatel = useModal({
  component: VueFinalModal,
  attrs: {}
});

function openEditSidlo(){
  vfm.open(modalIdAddOrEditSidlo)
}

function closeModalForCompanyName(){ 
  vfm.closeAll().then(() => {
  })
}

function closeModalForSidlo(){ 
  vfm.closeAll().then(() => {
  })
}

function closeModalForKonatel(){ 
  vfm.closeAll().then(() => {
  })
}
function closeModalForCancelKonatel(){ 
  vfm.closeAll().then(() => {
  })
}

function closeModalAndSaveOrEditCompanyName() {
  console.log("Calling submit function!")
  vfm.close(modalIdAddOrEditCompanyName)?.then(() => {
    console.log("then");
  })
}

function closeModalAndSaveOrEditSidlo() {
  console.log("Calling submit function!")
  vfm.close(modalIdAddOrEditSidlo)?.then(() => {
    console.log("then");
  })
}

function closeModalAndSaveOrEditKonatel() {
  console.log("Calling submit function!")
  vfm.close(modalIdAddOrEditKonatel)?.then(() => {
    if (konatelIndex >= 0 && konatelIndex < newKonateliaList.value.length) {
      konatel.value.hasChange = true;
      newKonateliaList.value[konatelIndex] = konatel.value;
    } else {
      console.error('Index out of bounds');
    }
  }).finally(() => {
  })
}

function closeModalAndSaveCanceledKonatel() {
  console.log("Calling submit function!")
  vfm.close(modalIdCancelKonatel)?.then(() => {
    console.log("then");
  })
}

function getSpecificKonatel(index:number){
  
  let fullNameWithTitlesFromOrSr = nameComposerFromOrSr(konateliaFromOrSr.value[index].name);
  
  konatel.value.title_before = fullNameWithTitlesFromOrSr.title_before    
  konatel.value.first_name = fullNameWithTitlesFromOrSr.first_name
  konatel.value.last_name = fullNameWithTitlesFromOrSr.last_name
  konatel.value.title_after = fullNameWithTitlesFromOrSr.title_after

  konatel.value.country = konateliaFromOrSr.value[index].country
  konatel.value.city = konateliaFromOrSr.value[index].city
  konatel.value.psc = konateliaFromOrSr.value[index].zip
  konatel.value.street = konateliaFromOrSr.value[index].street
  konatel.value.street_number = konateliaFromOrSr.value[index].number.split("/")[0]
  konatel.value.street_number2 = konateliaFromOrSr.value[index].number.split("/")[1]
}

const isNextButtonDisabledHq = computed(() => {
  if(obchodneSidloVirtuOrNormal.value === 'virtualne'){
    if(!selectedVhqFromStore.value.name) {
      return true
    }
  } else {
    return false
  }
})

watch(obchodneSidloVirtuOrNormal, (newValue) => {
  if(newValue === 'vlastnePrenajate'){
    store.state.selectedVhq = {};
    store.state.selectedVhqPackage = {};
  }
})

function checkHasChange(item: CompanyMemberKonatel): boolean {
  if (item && item.hasChange === true) {
    return true;
  } else {
    return false;
  }
}

function compareArraysAtIndex(array1FromOrSr: any[], array2: any[], index: number): boolean {
  let fullName: string[] = array1FromOrSr[index].name.split(" ");    
  if (array1FromOrSr[index] && array2[index]) {
    console.log("Full name", fullName)
    console.log("Full lenght", fullName.length)
    if(fullName.length == 3 && fullName[0].includes(".") == true){
      //index 0 title index 3 title after
      return fullName[1] !== array2[index].first_name || fullName[2] !== array2[index].last_name;
    }
    else if(fullName.length >= 4 && fullName[0].includes(".") == true && fullName[1].includes(".") == false){
      //index 0,1 title index 4 title after
      return fullName[1] !== array2[index].first_name || fullName[2] !== array2[index].last_name;
    } 
    else if(fullName.length >= 4 && fullName[0].includes(".") == true && fullName[1].includes(".") == true){
      //index 0,1 title index 4 title after
      return fullName[2] !== array2[index].first_name || fullName[3] !== array2[index].last_name;
    }  
    else {
      //index 0 first name index 1 last name
      return fullName[0] !== array2[index].first_name || fullName[1] !== array2[index].last_name;
    }
  } else {
    console.info('Index out of bounds or item does not exist');
    return false;
  }
}

function returnChangesBack(index: number){
  //newKonateliaList.value[index] = Object.assign({}, konatelObject);
  let fullNameWithTitlesFromOrSr = nameComposerFromOrSr(konateliaFromOrSr.value[index].name);
  newKonateliaList.value[index].title_before = fullNameWithTitlesFromOrSr.title_before
  newKonateliaList.value[index].first_name = fullNameWithTitlesFromOrSr.first_name
  newKonateliaList.value[index].last_name = fullNameWithTitlesFromOrSr.last_name
  newKonateliaList.value[index].title_after = fullNameWithTitlesFromOrSr.title_after  

  newKonateliaList.value[index].country = konateliaFromOrSr.value[index].country
  newKonateliaList.value[index].city = konateliaFromOrSr.value[index].city
  newKonateliaList.value[index].psc = konateliaFromOrSr.value[index].zip
  newKonateliaList.value[index].street = konateliaFromOrSr.value[index].street
  newKonateliaList.value[index].street_number = konateliaFromOrSr.value[index].number.split("/")[0]
  newKonateliaList.value[index].street_number2 = konateliaFromOrSr.value[index].number.split("/")[1]
  // set hasChange back to false
  newKonateliaList.value[index].hasChange = false
  // no values from orsr
  newKonateliaList.value[index].date_of_birth = ''
  newKonateliaList.value[index].rodne_cislo = ''
  newKonateliaList.value[index].gender = ''
}

function nameComposerFromOrSr(fullNameWithTitleFromOrSr: string) {  
  let fullName: string[] = fullNameWithTitleFromOrSr.split(" ");
  let fullNameWithTitle = {
    title_before: '',
    first_name: '',
    last_name: '',
    title_after: ''    
  };

  if(fullName.length === 3 && fullName[0].includes(".")) {
    // Case when there is a title before the name and no title after
    fullNameWithTitle.title_before = fullName[0];
    fullNameWithTitle.first_name = fullName[1];
    fullNameWithTitle.last_name = fullName[2];
  } else if(fullName.length >= 4 && fullName[0].includes(".") && !fullName[1].includes(".")) {
    // Case when there is a title before the name and a title after
    fullNameWithTitle.title_before = fullName[0];
    fullNameWithTitle.first_name = fullName[1];
    fullNameWithTitle.last_name = fullName[2];
    fullNameWithTitle.title_after = fullName[3];
  } else if(fullName.length >= 4 && fullName[0].includes(".") && fullName[1].includes(".")) {
    // Case when there are two titles before the name
    fullNameWithTitle.title_before = fullName[0] + " " +  fullName[1];
    fullNameWithTitle.first_name = fullName[2];
    fullNameWithTitle.last_name = fullName[3];
    fullNameWithTitle.title_after = fullName[4] || ''; // Use empty string if no title after
  } else {
    // Case when there are no titles
    fullNameWithTitle.first_name = fullName[0];
    fullNameWithTitle.last_name = fullName[1];
  }
  return fullNameWithTitle;
}


//test data
const companyData = ref({
      typ_sudu: "MS",
      prislusny_sud: "Bratislava III",
      oddiel: "Sro",
      vlozka: "66264/B",
      typ_osoby: "pravnicka",
      hlavicka: "Spoločnosť zapísaná v obchodnom registri Mestského súdu Bratislava III, oddiel Sro, vložka 66264/B.",
      hlavicka_kratka: "MS Bratislava III, oddiel Sro, vložka 66264/B",
      obchodne_meno: "Top 1 Accounting, s.r.o.",
      obchodne_meno_since: "09.07.2010",
      likvidacia: 0,
      adresa: {
        street: "Cintorínska",
        number: "12",
        city: "Bratislava - mestská časť Staré Mesto",
        zip: "81108",
        since: "21.01.2021"
      },
      ico: 45633461,
      den_zapisu: "01.07.2010",
      pravna_forma: "Spoločnosť s ručením obmedzeným",
      predmet_cinnosti: [
        "kúpa tovaru na účely jeho predaja konečnému spotrebiteľovi (maloobchod) alebo iným prevádzkovateľom živnosti (veľkoobchod)",
        "sprostredkovateľská činnosť v oblasti služieb",
        "počítačové služby",
        "služby súvisiace s počítačovým spracovaním údajov",
        "poskytovanie úverov alebo pôžičiek z peňažných zdrojov získaných výlučne bez verejnej výzvy a bez verejnej ponuky majetkových hodnôt",
        "administratívne služby",
        "činnosť podnikateľských, organizačných a ekonomických poradcov",
        "vedenie účtovníctva",
        "reklamné a marketingové služby",
        "Fotografické služby",
        "Čistiace a upratovacie služby",
        "Skladovanie a pomocné činnosti v doprave",
        "Prenájom hnuteľných vecí",
        "Vykonávanie mimoškolskej vzdelávacej činnosti",
        "Uskutočňovanie stavieb a ich zmien",
        "Prípravné práce k realizácii stavby",
        "Dokončovacie stavebné práce pri realizácii exteriérov a interiérov",
        "Výskum a vývoj v oblasti prírodných, technických, spoločenských a humanitných vied",
        "Prevádzkovanie športových zariadení a zariadení slúžiacich na regeneráciu a rekondíciu",
        "Organizovanie športových, kultúrnych a iných spoločenských podujatí",
        "Prevádzkovanie kultúrnych, spoločenských a zábavných zariadení",
        "Prenájom nehnuteľností spojený s poskytovaním iných než základných služieb spojených s prenájmom",
        "Verejné obstarávanie",
        "Ubytovacie služby v ubytovacích zariadeniach s prevádzkovaním pohostinských činností v týchto zariadeniach a v chatovej osade triedy 3, v kempingoch triedy 3 a 4"
      ],
      spolocnici: [
        {
          name: "MK Tax Audit Advisory s. r. o.",
          street: "Cintorínska",
          city: "Bratislava - mestská časť Staré Mesto",
          number: "12",
          zip: "81108",
          since: "21.01.2021"
        },
        {
          name: "Ing. PhDr. Michal Kováčik",
          street: "Cintorínska",
          city: "Bratislava - mestská časť Staré Mesto",
          number: "12",
          zip: "81108",
          since: "21.01.2021"
        }
      ],
      vyska_vkladu: [
        {
          name: "MK Tax Audit Advisory s. r. o.",
          vklad: 2500,
          splatene: 2500,
          currency: "EUR"
        },
        {
          name: "Ing. PhDr. Michal Kováčik",
          vklad: 2500,
          splatene: 2500,
          currency: "EUR"
        }
      ],
      statutarny_organ: {
        konateľ: [
          {
            name: "Romana Kováčik",
            street: "Cintorínska",
            city: "Bratislava - mestská časť Staré Mesto",
            number: "12",
            zip: "81108",
            since: "01.06.2021"
          }
        ]
      },
      konanie_menom_spolocnosti: "V mene spoločnosti koná a za spoločnosť podpisuje konateľ spoločnosti samostatne a to tak, že k vytlačenému alebo napísanému obchodnému menu spoločnosti a menu a funkcii konajúceho pripojí svoj vlastnoručný podpis.",
      zakladne_imanie: {
        imanie: 5000,
        splatene: 5000,
        currency: "EUR"
      },
      dalsie_skutocnosti: [
        {
          eventText: "Spoločnosť bola založená spoločenskou zmluvou zo dňa 10.06.2010 v zmysle príslušných ustanovení zákona č. 513/1991 Zb. Obchodný zákonník.",
          eventDate: "09.07.2010"
        },
        {
          eventText: "Zápisnica z valného zhromaždenia zo dňa 25.02.2011",
          eventDate: "26.03.2011"
        },
        {
          eventText: "Zápisnica z mimoriadneho valného zhromaždenia zo dňa 21.06.2011.",
          eventDate: "06.08.2011"
        },
        {
          eventText: "Zápisnica z valného zhromaždenia zo dňa 13.1.2012",
          eventDate: "23.02.2012"
        },
        {
          eventText: "Zápisnica z valného zhromaždenia zo dňa 27.04.2013.",
          eventDate: "21.05.2013"
        },
        {
          eventText: "Zápisnica z valného zhromaždenia zo dňa 16.11.2015.",
          eventDate: "12.12.2015"
        }
      ],
      datum_aktualizacie: "20.12.2023",
      datum_vypisu: "21.12.2023"
    });

defineExpose({

})

</script>

<style>
.text-cross {
  text-decoration: line-through;
}
</style>