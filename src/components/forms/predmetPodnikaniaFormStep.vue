<template>
    <FormKit
      type="autocomplete"
      name="subjects_of_business"
      label="Predmet podnikania"
      :options="loadSubjectOfBusiness"
      placeholder="Vyhľadajte alebo vyberte predmet podnikania"
      multiple
      open-on-click
      v-model="subjects_of_business"
      selection-appearance="option"
      @input="calculatePriceForBusinessOfcategories"
      validation="required"
      load-on-created="true"
    >
    <template #option="{ option }">
      <div class="formkit-option grow p-2">
        <span>{{ option.label }}</span> <span class="font-medium">({{ option.__original?.price }} €)</span>
      </div>
    </template>

    </FormKit>

    <div class="my-4">
      <div class="flex flex-col-reverse md:flex-row items-center justify-between">
        <div>
          <div class="font-bold">Alebo nahrajte všetky potrebné predmety jedným klikom podľa toho, akému oboru sa chcete venovať.</div>
        </div>
        <div v-if="subjects_of_business.length > 0">
          <button
            @click.prevent="openModal()"
            class="mb-3 text-white font-semibold disabled:bg-gray-700 disabled:border-gray-700 bg-red-800 hover:bg-red-700 px-6 py-2 border border-red-800 rounded hover:border-red-700"
          >
          Vymazať všetky
        </button>
        </div>
      </div>
      <VueFinalModal
        :modal-id="modalIdAddOrEditSubjects"
        display-directive="if"
        :clickToClose="false"
        :escToClose="false"
        :lockscroll="true"
        class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
        content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
      >
      <h1 class="text-white text-2xl">
        Potvrdenie odstránenia
      </h1>
      <p class="text-white mb-4" >Naozaj chcete odstrániť všetky predmety podnikania?</p>
      <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
        <button class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded" @click.prevent="() => vfm.closeAll()">
          Zrušiť
        </button>
        <button class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded" @click.prevent="closeModalAndRmoveAllSubjectOfBusiness()">
          Odstrániť
        </button>
      </div>
      </VueFinalModal>
      <!-- Slider -->
      <div class="mt-4">
        <vue-horizontal responsive v-if="!loading">
            <section v-for="(component, index) in components" :key="index">
                <!-- Render the components from the array with props -->
                <component :is="component.component" :image="component.image" :title="component.title" @click.prevent="addSubjectOfBusinessToAutoselect(component.obj)" />
            </section>
        </vue-horizontal>
        <div v-else>
          <div class="flex flex-col items-center py-12">
          <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="mt-4">Načítavanie...</span>
          </div>
        </div>
      </div>
      <!-- Price calculation -->
      <div>Cena za vybraté predmety podnikania <span class="font-medium">{{ finalPriceForBusinessCategori }}</span> €.</div>
    </div>

</template>

<script setup lang="ts">
import store from '@/store';
import { getNode } from '@formkit/core';
import { onBeforeMount, ref } from 'vue';
import SignleSubjectOfBusinnesWithImg from './SignleSubjectOfBusinnesWithImg.vue'
import VueHorizontal from "vue-horizontal";
import useCalculatePriceForBusinessCategories from '@/views/Company/Composables/CalculatePriceForBusinessCategories';
import type Company from '@/types/Company';
import { useVfm, VueFinalModal } from 'vue-final-modal'

const vfm = useVfm()
const modalIdAddOrEditSubjects = Symbol('modalIdAddOrEditSubjects')
const loading = ref(true);
const imgSource = "src/assets/predmety-podnikania/"
const subjects_of_business = ref<Company['subjects_of_business']>([]);

const arrOfObjGrafika: Company['subjects_of_business'] = [
    { id: 6, title: "Dizajnérske činnosti", price: 0, description: null, category_id: 1 },
    { id: 27, title: "Počítačové služby a služby súvisiace s počítačovým spracovaním údajov", price: 0, description: null, category_id: 1 },
    { id: 52, title: "Reklamné a marketingové služby, prieskum trhu a verejnej mienky", price: 0, description: null, category_id: 1 },
    { id: 1, title: "Administratívne služby", price: 0, description: null, category_id: 1 },
    { id: 55, title: "Služby súvisiace s produkciou filmov, videozáznamov a zvukových nahrávok", price: 0, description: null, category_id: 1 },
    { id: 2, title: "Činnosť podnikateľských, organizačných a ekonomických poradcov", price: 0, description: null, category_id: 1 },
    { id: 17, title: "Kúpa tovaru na účely jeho predaja konečnému spotrebiteľovi (maloobchod) alebo iným prevádzkovateľom živnosti (veľkoobchod)", price: 0, description: null, category_id: 1 },
    { id: 63, title: "Sprostredkovateľská činnosť v oblasti obchodu, služieb, výroby", price: 0, description: null, category_id: 1 },
    { id: 75, title: "Vydavateľská činnosť, polygrafická výroba a knihárske práce", price: 0, description: null, category_id: 1 },
    { id: 77, title: "Vykonávanie mimoškolskej vzdelávacej činnosti", price: 0, description: null, category_id: 1 }
];

const arrOfObjDoprava: Company['subjects_of_business'] = [
  { id: 19, title: "Nákladná cestná doprava vykonávaná vozidlami s celkovou hmotnosťou do 3,5 t vrátane prípojného vozidla", price: 0, description: null, category_id: 1 },
  { id: 31, title: "Poskytovanie služieb osobného charakteru", price: 0, description: null, category_id: 1 },
  { id: 53, title: "Skladovanie a pomocné činnosti v doprave", price: 0, description: null, category_id: 1 },
  { id: 69, title: "Údržba motorových vozidiel bez zásahu do motorickej časti vozidla", price: 0, description: null, category_id: 1 },
  { id: 41, title: "Prenájom hnuteľných vecí", price: 0, description: null, category_id: 1 },
  { id: 17, title: "Kúpa tovaru na účely jeho predaja konečnému spotrebiteľovi (maloobchod) alebo iným prevádzkovateľom živnosti (veľkoobchod)", price: 0, description: null, category_id: 1 },
  { id: 63, title: "Sprostredkovateľská činnosť v oblasti obchodu, služieb, výroby", price: 0, description: null, category_id: 1 },
  { id: 27, title: "Počítačové služby a služby súvisiace s počítačovým spracovaním údajov", price: 0, description: null, category_id: 1 },
  { id: 52, title: "Reklamné a marketingové služby, prieskum trhu a verejnej mienk", price: 0, description: null, category_id: 1 },
  { id: 1, title: "Administratívne služby", price: 0, description: null, category_id: 1 },
  { id: 4, title: "Čistiace a upratovacie služby", price: 0, description: null, category_id: 1 },
];

const arrOfObjAdministrativa: Company['subjects_of_business'] = [
  { id: 1, title: "Administratívne služby", price: 0, description: null, category_id: 1 },
  { id: 2, title: "Činnosť podnikateľských, organizačných a ekonomických poradcov", price: 0, description: null, category_id: 1 },
  { id: 52, title: "Reklamné a marketingové služby, prieskum trhu a verejnej mienk", price: 0, description: null, category_id: 1 },
  { id: 72, title: "Vedenie účtovníctva", price: 0, description: null, category_id: 1 },
  { id: 27, title: "Počítačové služby a služby súvisiace s počítačovým spracovaním údajov", price: 0, description: null, category_id: 1 },
  { id: 17, title: "Kúpa tovaru na účely jeho predaja konečnému spotrebiteľovi (maloobchod) alebo iným prevádzkovateľom živnosti (veľkoobchod)", price: 0, description: null, category_id: 1 },
  { id: 63, title: "Sprostredkovateľská činnosť v oblasti obchodu, služieb, výroby", price: 0, description: null, category_id: 1 },
  { id: 41, title: "Prenájom hnuteľných vecí", price: 0, description: null, category_id: 1 },
];

const arrOfObjStavba: Company['subjects_of_business'] = [
  { id: 71, title: "Uskutočňovanie stavieb a ich zmien", price: 0, description: null, category_id: 1 },
  { id: 51, title: "Prípravné práce k realizácii stavby", price: 0, description: null, category_id: 1 },
  { id: 7, title: "Dokončovacie stavebné práce pri realizácii exteriérov a interiérov", price: 0, description: null, category_id: 1 },
  { id: 19, title: "Nákladná cestná doprava vykonávaná vozidlami s celkovou hmotnosťou do 3,5 t vrátane prípojného vozidla", price: 0, description: null, category_id: 1 },
  { id: 15, title: "Inžinierska činnosť, stavebné cenárstvo, projektovanie a konštruovanie elektrických zariadení", price: 0, description: null, category_id: 1 },
  { id: 4, title: "Čistiace a upratovacie služby", price: 0, description: null, category_id: 1 },
  { id: 41, title: "Prenájom hnuteľných vecí", price: 0, description: null, category_id: 1 },
  { id: 53, title: "Skladovanie a pomocné činnosti v doprave", price: 0, description: null, category_id: 1 },
  { id: 42, title: "Prenájom nehnuteľností spojený s poskytovaním iných než základných služieb spojených s prenájmom", price: 0, description: null, category_id: 1 },
  { id: 2, title: "Činnosť podnikateľských, organizačných a ekonomických poradcov", price: 0, description: null, category_id: 1 },
  { id: 52, title: "Reklamné a marketingové služby, prieskum trhu a verejnej mienky", price: 0, description: null, category_id: 1 },
  { id: 17, title: "Kúpa tovaru na účely jeho predaja konečnému spotrebiteľovi (maloobchod) alebo iným prevádzkovateľom živnosti (veľkoobchod)", price: 0, description: null, category_id: 1 },
  { id: 63, title: "Sprostredkovateľská činnosť v oblasti obchodu, služieb, výroby", price: 0, description: null, category_id: 1 },
];

const arrOfObjEdu: Company['subjects_of_business'] = [
  { id: 77, title: "Vykonávanie mimoškolskej vzdelávacej činnosti", price: 0, description: null, category_id: 1 },
  { id: 21, title: "Odborná príprava v oblasti environmentálneho manažérstva a auditu", price: 0, description: null, category_id: 1 },
  { id: 37, title: "Poskytovanie sociálnych služieb", price: 0, description: null, category_id: 1 },
  { id: 31, title: "Poskytovanie služieb osobného charakteru", price: 0, description: null, category_id: 1 },
  { id: 32, title: "Poskytovanie služieb rýchleho občerstvenia v spojení s predajom na priamu konzumáciu", price: 0, description: null, category_id: 1 },
  { id: 52, title: "Reklamné a marketingové služby, prieskum trhu a verejnej mienky", price: 0, description: null, category_id: 1 },
  { id: 27, title: "Počítačové služby a služby súvisiace s počítačovým spracovaním údajov", price: 0, description: null, category_id: 1 },
  { id: 1, title: "Administratívne služby", price: 0, description: null, category_id: 1 },
  { id: 17, title: "Kúpa tovaru na účely jeho predaja konečnému spotrebiteľovi (maloobchod) alebo iným prevádzkovateľom živnosti (veľkoobchod)", price: 0, description: null, category_id: 1 },
  { id: 63, title: "Sprostredkovateľská činnosť v oblasti obchodu, služieb, výroby", price: 0, description: null, category_id: 1 },
];

const arrOfObjPolnoHos: Company['subjects_of_business'] = [
  { id: 35, title: "Poskytovanie služieb v poľnohospodárstve a záhradníctve", price: 0, description: null, category_id: 1 },
  { id: 34, title: "Poskytovanie služieb v lesníctve a poľovníctve", price: 0, description: null, category_id: 1 },
  { id: 70, title: "Úprava nerastov, dobývanie rašeliny a bahna a ich úprava", price: 0, description: null, category_id: 1 },
  { id: 92, title: "Výroba kŕmnych zmesí", price: 0, description: null, category_id: 1 },
  { id: 99, title: "Výroba potravinárskych výrobkov", price: 0, description: null, category_id: 1 },
  { id: 28, title: "Podnikanie v oblasti nakladania s iným ako nebezpečným odpadom", price: 0, description: null, category_id: 1 },
  { id: 17, title: "Kúpa tovaru na účely jeho predaja konečnému spotrebiteľovi (maloobchod) alebo iným prevádzkovateľom živnosti (veľkoobchod)", price: 0, description: null, category_id: 1 },
  { id: 63, title: "Sprostredkovateľská činnosť v oblasti obchodu, služieb, výroby", price: 0, description: null, category_id: 1 },
  { id: 53, title: "Skladovanie a pomocné činnosti v doprave", price: 0, description: null, category_id: 1 },
  { id: 2, title: "Činnosť podnikateľských, organizačných a ekonomických poradcov", price: 0, description: null, category_id: 1 },
  { id: 27, title: "Počítačové služby a služby súvisiace s počítačovým spracovaním údajov", price: 0, description: null, category_id: 1 },
  { id: 52, title: "Reklamné a marketingové služby, prieskum trhu a verejnej mienky", price: 0, description: null, category_id: 1 },
];

const arrOfObjZdravie: Company['subjects_of_business'] = [
  { id: 106, title: "Výskum a vývoj v oblasti prírodných, technických, spoločenských a humanitných vied", price: 0, description: null, category_id: 1 },
  { id: 1, title: "Administratívne služby", price: 0, description: null, category_id: 1 },
  { id: 47, title: "Prevádzkovanie športových zariadení a zariadení slúžiacich na regeneráciu a rekondíciu", price: 0, description: null, category_id: 1 },
  { id: 29, title: "Poskytovanie obslužných služieb pri kultúrnych a iných spoločenských podujatiach", price: 0, description: null, category_id: 1 },
  { id: 26, title: "Organizovanie športových, kultúrnych a iných spoločenských podujatí", price: 0, description: null, category_id: 1 },
  { id: 32, title: "Poskytovanie služieb rýchleho občerstvenia v spojení s predajom na priamu konzumáciu", price: 0, description: null, category_id: 1 },
  { id: 56, title: "Služby súvisiace so skrášľovaním tela", price: 0, description: null, category_id: 1 },
  { id: 17, title: "Kúpa tovaru na účely jeho predaja konečnému spotrebiteľovi (maloobchod) alebo iným prevádzkovateľom živnosti (veľkoobchod)", price: 0, description: null, category_id: 1 },
  { id: 77, title: "Vykonávanie mimoškolskej vzdelávacej činnosti", price: 0, description: null, category_id: 1 },
  { id: 63, title: "Sprostredkovateľská činnosť v oblasti obchodu, služieb, výroby", price: 0, description: null, category_id: 1 },
  { id: 53, title: "Skladovanie a pomocné činnosti v doprave", price: 0, description: null, category_id: 1 },
  { id: 2, title: "Činnosť podnikateľských, organizačných a ekonomických poradcov", price: 0, description: null, category_id: 1 },
  { id: 27, title: "Počítačové služby a služby súvisiace s počítačovým spracovaním údajov", price: 0, description: null, category_id: 1 },
  { id: 52, title: "Reklamné a marketingové služby, prieskum trhu a verejnej mienky", price: 0, description: null, category_id: 1 },
  { id: 31, title: "Poskytovanie služieb osobného charakteru", price: 0, description: null, category_id: 1 },
];

const arrOfObjMarketing: Company['subjects_of_business'] = [
    { id: 6, title: "Dizajnérske činnosti", price: 0, description: null, category_id: 1 },
    { id: 27, title: "Počítačové služby a služby súvisiace s počítačovým spracovaním údajov", price: 0, description: null, category_id: 1 },
    { id: 52, title: "Reklamné a marketingové služby, prieskum trhu a verejnej mienky", price: 0, description: null, category_id: 1 },
    { id: 1, title: "Administratívne služby", price: 0, description: null, category_id: 1 },
    { id: 55, title: "Služby súvisiace s produkciou filmov, videozáznamov a zvukových nahrávok", price: 0, description: null, category_id: 1 },
    { id: 2, title: "Činnosť podnikateľských, organizačných a ekonomických poradcov", price: 0, description: null, category_id: 1 },
    { id: 17, title: "Kúpa tovaru na účely jeho predaja konečnému spotrebiteľovi (maloobchod) alebo iným prevádzkovateľom živnosti (veľkoobchod)", price: 0, description: null, category_id: 1 },
    { id: 63, title: "Sprostredkovateľská činnosť v oblasti obchodu, služieb, výroby", price: 0, description: null, category_id: 1 },
    { id: 77, title: "Vykonávanie mimoškolskej vzdelávacej činnosti", price: 0, description: null, category_id: 1 },
    { id: 26, title: "Organizovanie športových, kultúrnych a iných spoločenských podujatí", price: 0, description: null, category_id: 1 },
    { id: 106, title: "Výskum a vývoj v oblasti prírodných, technických, spoločenských a humanitných vied", price: 0, description: null, category_id: 1 },
    { id: 41, title: "Prenájom hnuteľných vecí", price: 0, description: null, category_id: 1 },
];

const arrOfObjObchod: Company['subjects_of_business'] = [
    { id: 27, title: "Počítačové služby a služby súvisiace s počítačovým spracovaním údajov", price: 0, description: null, category_id: 1 },
    { id: 52, title: "Reklamné a marketingové služby, prieskum trhu a verejnej mienky", price: 0, description: null, category_id: 1 },
    { id: 1, title: "Administratívne služby", price: 0, description: null, category_id: 1 },
    { id: 2, title: "Činnosť podnikateľských, organizačných a ekonomických poradcov", price: 0, description: null, category_id: 1 },
    { id: 17, title: "Kúpa tovaru na účely jeho predaja konečnému spotrebiteľovi (maloobchod) alebo iným prevádzkovateľom živnosti (veľkoobchod)", price: 0, description: null, category_id: 1 },
    { id: 63, title: "Sprostredkovateľská činnosť v oblasti obchodu, služieb, výroby", price: 0, description: null, category_id: 1 },
    { id: 41, title: "Prenájom hnuteľných vecí", price: 0, description: null, category_id: 1 },
    { id: 42, title: "Prenájom nehnuteľností spojený s poskytovaním iných než základných služieb spojených s prenájmom", price: 0, description: null, category_id: 1 },
    { id: 31, title: "Poskytovanie služieb osobného charakteru", price: 0, description: null, category_id: 1 },
    { id: 75, title: "Vydavateľská činnosť, polygrafická výroba a knihárske práce", price: 0, description: null, category_id: 1 }
];

const arrOfObjHandMade: Company['subjects_of_business'] = [
    { id: 87, title: "Výroba hračiek a hier", price: 0, description: null, category_id: 1 },
    { id: 83, title: "Výroba bižutérie a suvenírov", price: 0, description: null, category_id: 1 },
    { id: 103, title: "Výroba sviečok a tieniacej techniky", price: 0, description: null, category_id: 1 },
    { id: 88, title: "Výroba hudobných nástrojov", price: 0, description: null, category_id: 1 },
    { id: 93, title: "Výroba metiel, kief a maliarskeho náradia", price: 0, description: null, category_id: 1 },
    { id: 66, title: "Textilná výroba", price: 0, description: null, category_id: 1 },
    { id: 23, title: "Opracovanie drevnej hmoty a výroba komponentov z dreva", price: 0, description: null, category_id: 1 },
    { id: 82, title: "Výroba a opracovanie jednoduchých výrobkov z kovu", price: 0, description: null, category_id: 1 },
    { id: 85, title: "Výroba celulózy, papiera, lepenky a výrobkov z týchto materiálov", price: 0, description: null, category_id: 1 },
    { id: 104, title: "Výroba výrobkov z gumy a výrobkov z plastov", price: 0, description: null, category_id: 1 },
    { id: 96, title: "Výroba nekovových minerálnych výrobkov a výrobkov z betónu, sadry a cementu", price: 0, description: null, category_id: 1 },
    { id: 52, title: "Reklamné a marketingové služby, prieskum trhu a verejnej mienky", price: 0, description: null, category_id: 1 },
    { id: 2, title: "Činnosť podnikateľských, organizačných a ekonomických poradcov", price: 0, description: null, category_id: 1 },
    { id: 17, title: "Kúpa tovaru na účely jeho predaja konečnému spotrebiteľovi (maloobchod) alebo iným prevádzkovateľom živnosti (veľkoobchod)", price: 0, description: null, category_id: 1 },
    { id: 63, title: "Sprostredkovateľská činnosť v oblasti obchodu, služieb, výroby", price: 0, description: null, category_id: 1 },
    { id: 27, title: "Počítačové služby a služby súvisiace s počítačovým spracovaním údajov", price: 0, description: null, category_id: 1 }
];

onBeforeMount(() => {
})

function addSubjectOfBusinessToAutoselect(objOfArray: any) {

  subjects_of_business.value.push(...objOfArray)
  console.log("aa")
    // console.log("aa")
    // const node = getNode('multiSelId')
    // myModelForVal.value.push('CZ')
    // console.log(subjects_of_business.value)
}

async function loadSubjectOfBusiness({ search, page, hasNextPage }: any) {

  const res = await store.dispatch("getAllSubjectOfBusiness")
  loading.value = false
  if(res.data.data){

    if(!search){
      return res.data.data.map((item: any) => ({ label: item.title, value: item }))  
    }
    
    else {
      const filteredData = res.data.data.filter((item: any) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      const mappedData = filteredData.map((item: any) => ({
        label: item.title,
        value: item,
      }));
      return mappedData
    }  
  }

  loading.value = false
  return []
}

const components = [ 
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "grafika.png", title: "Grafika a design", obj: arrOfObjGrafika },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "doprava.png", title: "Doprava", obj: arrOfObjDoprava },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "administrativa.png", title: "Administratíva", obj: arrOfObjAdministrativa },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "stavba.png", title: "Stavbárčina", obj: arrOfObjStavba },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "edukacia.png", title: "Edukácia", obj: arrOfObjEdu },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "polnohospo.png", title: "Poľnohospodárstvo", obj: arrOfObjPolnoHos },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "zdravie.png", title: "Zdravie", obj: arrOfObjZdravie },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "marketing.png", title: "Marketing", obj: arrOfObjMarketing },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "obchod.png", title: "Obchod", obj: arrOfObjObchod },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "handmade.png", title: "Handmade", obj: arrOfObjHandMade },
 ];

 const { calculatePriceForBusinessOfcategories, finalPriceForBusinessCategori }  = useCalculatePriceForBusinessCategories(subjects_of_business.value)

 function openModal(){
  vfm.open(modalIdAddOrEditSubjects);
 }
 
 function closeModalAndRmoveAllSubjectOfBusiness(){
  vfm.close(modalIdAddOrEditSubjects)?.then(() => {
    subjects_of_business.value.splice(0, subjects_of_business.value.length)
  })
 }

 defineExpose({
  subjects_of_business,
  finalPriceForBusinessCategori
})

</script>