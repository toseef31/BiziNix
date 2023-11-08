<template>
<div class="text-4xl font-bold">Vaše podnikatelské údaje</div>
<div class="mt-2 mb-6">Na tomto mieste zadajte prosím vaše údaje.</div>
<div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
  <FormKit type="text" name="first_name" v-model="companyMemberZivnost.first_name" id="first_name" label="Krstné meno" validation="required|length:2" />
  <FormKit type="text" name="last_name" v-model="companyMemberZivnost.last_name" label="Priezvisko" validation="required|length:2" />
  <FormKit v-if="isZivnostForm" type="text" name="name" v-model="companyData.name" label="Dodatok k názvu živnosti" placeholder="Názov živnosti" />
</div>
<div>
  <FormKit type="checkbox" :ignore="true" v-model="hasTitle" label="Máte titul pred alebo za menom?" id="hasTitle" name="hasTitle" />
  <div v-show="hasTitle" class="grid grid-cols-3 gap-4">
    <FormKit type="text" name="title_before" v-model="companyMemberZivnost.title_before" label="Titul pred menom" />
    <FormKit type="text" name="title_after" v-model="companyMemberZivnost.title_after" label="Titul za menom" />
  </div>
</div>
<div class="grid md:grid-cols-4 gap-4">
  <FormKit type="date" style="color-scheme: dark;" name="date_of_birth" v-model="companyMemberZivnost.date_of_birth" autocomplete="date_of_birth" label="Dátum narodenia" validation="required" />
  <FormKit type="text" name="rodne_cislo" v-model="companyMemberZivnost.rodne_cislo" label="Rodné číslo" validation="required|length:10" />
  <FormKit type="text" placeholder="napr. Slovenská" name="nationality" v-model="nationality" label="Štátna príslušnosť " validation="required|length:2" help="Vaša štatná príslušnosť." />
  <FormKit type="select" label="Pohlavie" v-model="companyMemberZivnost.gender" placeholder="Vyberte pohlavie" name="gender" id="gender" :options="['Muž','Žena']" validation="required" validation-visibility="dirty"/>
</div>
<div class="font-bold mb-4">Trvalé bydlisko</div>
<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
  <FormKit type="text" name="city" v-model="companyMemberAddress.city" label="Mesto" validation="required" />
  <FormKit type="text" name="country" v-model="companyMemberAddress.country" label="Krajina" validation="required" />
  <FormKit type="text" name="psc" v-model="companyMemberAddress.psc" label="PSČ" validation="required" />
  <FormKit type="text" name="street" v-model="companyMemberAddress.street" label="Ulica" validation="required" />
  <FormKit type="text" name="street_number" v-model="companyMemberAddress.street_number" label="Súpisne číslo"
    validation="require_one:street_number2"
    help="Čislo pred lomítkom"
  />
  <FormKit type="text" name="street_number2" v-model="companyMemberAddress.street_number2" label="Orientačné číslo"
    validation="require_one:street_number"
    help="Číslo za lomítkom"
  />
</div>
<div v-if="isZivnostForm">
    <FormKit type="radio" v-model="placeOfBusinness" label="Miesto podnikania?" id="miesto" name="placeOfBusinness"
      :options="[
          { value: 'Totožné', label: 'Totožné s trvalým bydliskom' },
          { value: 'virtualne', label: 'Virtuálne sídlo' },
          { value: 'Iné', label: 'Na inej adrese' }
      ]"
      validation="required"
    />
    <div v-if="placeOfBusinness === 'virtualne'">
      <div class="">
        <VirtualHqSlider></VirtualHqSlider>
        <VirtualHqPackage></VirtualHqPackage>
      </div>
      <div v-if="!store.state.selectedVhq.name" class="my-4 flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
        <b>Prosím vyberte sídlo.</b>
      </div>
    </div>
    <div v-if="placeOfBusinness == 'Iné'">
      <div class="mb-4">
        <p>
          Ak sa miesto podnikania odlišuje od trvalého bydliska, je potrebné preukázať oprávnenie
          užívať nehnuteľnosť buď nájomnou zmluvou alebo súhlasom vlastníka nehnuteľnosti
          (tento dokument vám môžeme vypracovať a zaslať emailom).
        </p>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <FormKit type="select" name="country" id="country" label="Štát" v-model="hqAddress.country"
          :options="['Slovensko']" validation="required" validation-visibility="dirty"
        />
        <FormKit type="text" name="city" v-model="hqAddress.city" label="Obec" validation="required" />
        <FormKit type="text" name="psc" v-model="hqAddress.psc" label="PSČ" validation="required" />
        <FormKit type="text" name="street" v-model="hqAddress.street" label="Ulica" validation="required" />
        <FormKit type="text" name="hq_street_number" v-model="hqAddress.street_number" label="Súpisne číslo"
          validation="require_one:hq_street_number2"
          help="Číslo pred lomítkom"
        />
        <FormKit type="text" name="hq_street_number2" v-model="hqAddress.street_number2" label="Orientačné číslo"
          validation="require_one:hq_street_number"
          help="Číslo za lomítkom"
        />
      </div>
    </div>
</div>
<div class="flex flex-col md:flex-row md:space-x-4">
  <FormKit type="radio" v-model="companyRegDateCheckboxValue" :ignore="true" label="Registrácia firmy/živnosti ku dňu?" name="companyRegDateCheckbox"
    :options="[
      { value: 'Nezáleží', label: 'Nezáleží' },
      { value: 'Podľa dátumu', label: 'Podľa dátumu' },
    ]"
    validation="required"
  />
  <div v-if="companyRegDateCheckboxValue === 'Podľa dátumu'">
    <FormKit type="date" style="color-scheme: dark;" name="registration_date" v-model="companyData.zaciatok_opravnenia" autocomplete="off" label="Dátum zápisu" validation="required" />
  </div>
</div>
</template>

<script setup lang="ts">
import type Address from '@/types/Address';
import type Company from '@/types/Company';
import type User from '@/types/User';
import store from '@/store';
import { onBeforeMount, onMounted, onUnmounted, watch } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import VirtualHqSlider from '@/components/VirtualHqSlider.vue'
import VirtualHqPackage from '@/components/VirtualHqPackage.vue'
import { getNode } from '@formkit/core'

const route = useRoute()
const isZivnostForm = ref(false);
const hasTitle = ref(false);
const nationality = ref("");
let companyRegDateCheckboxValue = ref("Nezáleží");
const placeOfBusinness = ref("Totožné");

let companyMemberAddress = ref({
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
} as Address)

let companyMemberZivnost = ref({
  first_name: '',
  last_name: '',
  title_before: '',
  title_after: '',
  date_of_birth: '',
  rodne_cislo: '',
  gender: ''
})

let companyData = ref({
  name: '',
  zaciatok_opravnenia: ''
})

let hqAddress = ref({
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
} as Address)

onBeforeMount( () => {
  store.state.selectedVhq = {};
  store.state.selectedVhqPackage = {};

  if(route.fullPath.includes('zivnosti')){    
    isZivnostForm.value = true  
  }
  // const form = getNode('zalZivnostiMultiStepForm');
  // console.log(form?.value);
})

onUnmounted(() => {
  store.state.selectedVhq = {};
  store.state.selectedVhqPackage = {};
})

watch(placeOfBusinness, (newValue) => {
  if(newValue != 'virtualne'){
    store.state.selectedVhq = {};
    store.state.selectedVhqPackage = {};
  }
})

defineExpose({
  placeOfBusinness,
  companyData,
  nationality,
  companyMemberAddress,
  hqAddress,
  companyMemberZivnost
})
</script>