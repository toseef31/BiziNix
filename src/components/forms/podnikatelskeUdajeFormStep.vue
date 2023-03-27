<template>
<div class="text-4xl font-bold">Vaše osobné a podnikatelské údaje</div>
<div class="mt-2 mb-6">Na tomto mieste zadajte prosím vaše údje.</div>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
  <FormKit type="text" name="first_name" v-model="user.first_name" id="first_name" label="Krstné meno" validation="required|length:2" />
  <FormKit type="text" name="last_name" v-model="user.last_name" label="Priezvisko" validation="required|length:2" />
  <FormKit type="text" name="name" v-model="companyData.name" label="Dodatok k názvu živnosti" />
  <FormKit type="select" label="Pohlavie" v-model="user.gender" placeholder="Vyberte pohlavie" name="gender" id="gender" :options="['Muž','Žena']" validation="required" validation-visibility="dirty"/>
</div>
<div class="flex flex-col md:flex-row md:space-x-4">
  <FormKit type="checkbox" :ignore="true" v-model="hasTitle" label="Máte titul pred alebo za menom?" id="hasTitle" name="hasTitle" />
  <div v-show="hasTitle" class="grid grid-cols-2 gap-4">
    <FormKit type="text" name="title_before" v-model="user.title_before" label="Titul pred menom" />
    <FormKit type="text" name="title_after" v-model="user.title_after" label="Titul za menom" />
  </div>
</div>
<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
  <FormKit type="text" name="phone" v-model="user.phone" autocomplete="phone" label="Telefonné číslo" validation="required|length:9" />
  <FormKit type="date" name="date_of_birth" v-model="user.date_of_birth" autocomplete="date_of_birth" label="Dátum narodenia" validation="required|length:10" />
  <FormKit type="text" name="rodne_cislo" v-model="user.rodne_cislo" label="Rodné číslo" validation="required|length:10" />
</div>
<div class="grid grid-cols-2 md:grid-cols-6 gap-4">
  <FormKit type="text" name="city" v-model="userAddress.city" label="Mesto" validation="required" />
  <FormKit type="text" name="country" v-model="userAddress.country" label="Krajina" validation="required" />
  <FormKit type="text" name="psc" v-model="userAddress.psc" label="PSČ" validation="required" />
  <FormKit type="text" name="street" v-model="userAddress.street" label="Ulica" validation="required" />
  <FormKit type="text" name="street_number" v-model="userAddress.street_number" label="Súpisne číslo" validation="required" />
  <FormKit type="text" name="street_number2" v-model="userAddress.street_number2" label="Orientačné číslo" validation="required" />
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
<div class="grid grid-cols-1 gap-4">
  <div class="font-bold">Miesto podnikania?</div>
  <FormKit type="checkbox" v-model="placeOfBusinness" :ignore="true" :disabled="true" label="Totožné s trvalým bydliskom?" name="placeOfBusinness" />
</div>
<div class="flex flex-col md:flex-row md:space-x-4">
  <FormKit type="radio" v-model="companyRegDateCheckboxValue" :ignore="true" label="Registrácia živnosti ku dňu?"
  :options="[{ value: 'Nezáleží', label: 'Nezáleží' }, { value: 'Podľa dátumu', label: 'Podľa dátumu' }]" name="companyRegDateCheckbox"
  validation="required" />
  <div v-if="companyRegDateCheckboxValue === 'Podľa dátumu'">
    <FormKit type="date" name="registration_date" v-model="companyData.registration_date" autocomplete="off" label="Dátum zápisu do živnostenského registra" validation="required" />
  </div>
</div>
</template>

<script setup lang="ts">
import type Address from '@/@types/Address';
import type Company from '@/@types/Company';
import type User from '@/@types/User';
import store from '@/store';
import { ref } from 'vue';

const hasTitle = ref(false);
let companyRegDateCheckboxValue = ref("");
const placeOfBusinness = ref(true);

let companyData = ref({
  name: '',
  registration_date: ''
})

let userAddress = ref({
  id: null,
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

let userAddressUserInfoCompanyNameAndRegDate = ref({userAddress, user, companyData})

defineExpose({
  userAddressUserInfoCompanyNameAndRegDate
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