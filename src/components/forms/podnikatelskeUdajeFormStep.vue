<template>
<div class="text-4xl font-bold">Vaše osobné a podnikatelské údaje</div>
<div class="mt-2 mb-6">Na tomto mieste zadajte prosím vaše údje.</div>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
  <FormKit type="text" name="first_name" v-model="user.first_name" id="first_name" label="Krstné meno" validation="required|length:2" />
  <FormKit type="text" name="last_name" v-model="user.last_name" label="Priezvisko" validation="required|length:2" />
  <div v-show="isZivnostForm">
    <FormKit type="text" name="name" v-model="companyData.name" label="Dodatok k názvu živnosti" />
  </div>
  <FormKit type="select" label="Pohlavie" v-model="user.gender" placeholder="Vyberte pohlavie" name="gender" id="gender" :options="['Muž','Žena']" validation="required" validation-visibility="dirty"/>
</div>
<div class="flex flex-col md:flex-row md:space-x-4">
  <FormKit type="checkbox" :ignore="true" v-model="hasTitle" label="Máte titul pred alebo za menom?" id="hasTitle" name="hasTitle" />
  <div v-show="hasTitle" class="grid grid-cols-2 gap-4">
    <FormKit type="text" name="title_before" v-model="user.title_before" label="Titul pred menom" />
    <FormKit type="text" name="title_after" v-model="user.title_after" label="Titul za menom" />
  </div>
</div>
<div class="grid grid-cols-2 gap-4">
  <FormKit type="text" name="phone" v-model="user.phone" autocomplete="phone" label="Telefonné číslo" validation="required|length:9" />
  <FormKit type="date" style="color-scheme: dark;" name="date_of_birth" v-model="user.date_of_birth" autocomplete="date_of_birth" label="Dátum narodenia" validation="required" />
  <FormKit type="text" name="rodne_cislo" v-model="user.rodne_cislo" label="Rodné číslo" validation="required|length:10" />
  <FormKit type="text" name="nationality" v-model="nationality" label="Štátna príslušnosť " validation="required|length:2" />
</div>
<div class="grid grid-cols-2 md:grid-cols-6 gap-4">
  <FormKit type="text" name="city" v-model="userAddress.city" label="Mesto" validation="required" />
  <FormKit type="text" name="country" v-model="userAddress.country" label="Krajina" validation="required" />
  <FormKit type="text" name="psc" v-model="userAddress.psc" label="PSČ" validation="required" />
  <FormKit type="text" name="street" v-model="userAddress.street" label="Ulica" validation="required" />
  <FormKit type="text" name="street_number" v-model="userAddress.street_number" label="Súpisne číslo"
    validation="require_one:street_number2"
    help="Čislo pred lomítkom"
  />
  <FormKit type="text" name="street_number2" v-model="userAddress.street_number2" label="Orientačné číslo"
    validation="require_one:street_number"
    help="Číslo za lomítkom"
  />
</div>
<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
  <FormKit type="email" name="email"
    v-model="user.email"
    label="Email"
    :validation-rules="{ emailIsUnique }"
    validation="required|email|emailIsUnique"
    :validation-messages="{ emailIsUnique: 'E-mail sa už používa!'}"
    validation-visibility="live"                  
    help="Email ktorý budete používať aj na prihlasenie do účtu."
  />
  <FormKit type="password" autocomplete="new-password" v-model="user.password" name="password" label="Heslo" validation="required|length:8" />
  <FormKit type="password" autocomplete="new-password"  v-model="user.password_confirmation" name="password_confirmation" label="Zopakujte heslo" validation="required|confirm:password" />
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

onBeforeMount( () => {
  // const form = getNode('zalZivnostiMultiStepForm');
  // console.log(form?.value);

  if(route.fullPath.includes('zivnosti')){    
    isZivnostForm.value = true  
  }
})

onUnmounted(() => {
  store.state.selectedVhq = {};
  store.state.selectedVhqPackage = {};
})

const hasTitle = ref(false);
const isZivnostForm = ref(false);
let companyRegDateCheckboxValue = ref("Nezáleží");
const placeOfBusinness = ref("Totožné");
watch(placeOfBusinness, (newValue) => {
  if(newValue != 'virtualne'){
    store.state.selectedVhq = {};
    store.state.selectedVhqPackage = {};
  }
})
const nationality = ref("");

let companyData = ref({
  name: '',
  zaciatok_opravnenia: ''
})

let userAddress = ref({
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
} as Address)

let user = ref({
    address_id: 0, // address should be created first and save to store
    first_name: '',
    last_name: '',
    title_before: '',
    title_after: '',
    gender: '',
    phone: '',
    date_of_birth: '',
    rodne_cislo: '',
    email: '',
    password: '',
    password_confirmation: '',
} as User)

let userAddressUserInfoCompanyNameAndRegDate = ref({ userAddress, user, companyData })

let hqAddress = ref({
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
  is_virtual: false, // to do reg virtual
  img: '',
  address_id: 0
})

defineExpose({
  placeOfBusinness,
  userAddressUserInfoCompanyNameAndRegDate,
  nationality,
  hqAddress,
})

async function isEmailAlreadyRegistered(node: any) {
  try {
    const res = await store.dispatch("isEmailAlreadyRegistered", node);
    console.log(res);
    return true;
  }
  catch (error) {
    return false;
  }
}

async function emailIsUnique(node: any){
  const result = await isEmailAlreadyRegistered(node.value)
  return result
}


</script>