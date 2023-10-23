<template>
<div class="text-4xl font-bold">Fakturačné údaje</div>
<div class="mt-2 mb-6">Na nasledujúce údaje vám budeme odosielať faktúri.</div>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
    <FormKit type="text" name="first_name" v-model="fakturacne_udaje.first_name" label="Meno" validation="required" />
    <FormKit type="text" name="last_name" v-model="fakturacne_udaje.last_name" label="Priezvisko" validation="required" />
  </div>
  <div>
    <FormKit type="checkbox" v-if="!orderingAsCompany && !isFirmaFormOrder" v-model="invoiceAddressIsSame" label="Fakturačná adresa je rovnaká ako podnikateľská?" name="invoiceAddressIsSame" />
    <FormKit type="checkbox" v-model="orderingAsCompany" @click="setFalseInvoiceAddressIsSame" label="Objednávate ako firma?" id="orderingAsCompany" name="orderingAsCompany" />
  </div>
  <div v-if="!invoiceAddressIsSame && !orderingAsCompany" class="grid grid-cols-3 gap-4">
    <FormKit type="select" name="country" id="country" placeholder="Vybrať" label="Štát" v-model="invoiceAddress.country"
      :options="['Slovensko', 'Česko']" validation="required" validation-visibility="dirty"
    />
    <FormKit type="text" name="city" v-model="invoiceAddress.city" label="Obec" validation="required" />
    <FormKit type="text" name="psc" v-model="invoiceAddress.psc" label="PSČ" validation="required" />
    <FormKit type="text" name="street" v-model="invoiceAddress.street" label="Ulica" validation="required" />
    <FormKit type="text" name="inv_street_number" v-model="invoiceAddress.street_number" label="Súpisne číslo"
      validation="require_one:inv_street_number2"
      help="Číslo pred lomítkom"
    />
    <FormKit type="text" name="inv_street_number2" v-model="invoiceAddress.street_number2" label="Orientačné číslo"
      validation="require_one:inv_street_number"
      help="Číslo za lomítkom"
    />
  </div>
  <div class="w-fit">
  </div>    
  <div v-if="orderingAsCompany" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <FormKit type="text" name="name" v-model="fakturacne_udaje.name" label="Názov firmy" validation="required" />
      <FormKit type="text" name="ico" v-model="fakturacne_udaje.ico" label="IČO" validation="required" />
      <FormKit type="text" name="dic" v-model="fakturacne_udaje.dic" label="DIČ" validation="required" />
      <FormKit type="text" name="ic_dph" v-model="fakturacne_udaje.ic_dph" label="IČ DPH" />

      <FormKit type="select" name="country" id="country" placeholder="Vybrať" label="Štát" v-model="invoiceAddressForCompany.country"
        :options="['Slovensko', 'Česko']" validation="required" validation-visibility="dirty"
      />
      <FormKit type="text" name="city" v-model="invoiceAddressForCompany.city" label="Obec" validation="required" />
      <FormKit type="text" name="psc" v-model="invoiceAddressForCompany.psc" label="PSČ" validation="required" />
      <FormKit type="text" name="street" v-model="invoiceAddressForCompany.street" label="Ulica" validation="required" />
      <FormKit type="text" name="inv_company_street_number" v-model="invoiceAddressForCompany.street_number" label="Súpisne číslo"
        validation="require_one:inv_company_street_number2"
        help="Číslo pred lomítkom"
      />
      <FormKit type="text" name="inv_company_street_number2" v-model="invoiceAddressForCompany.street_number2" label="Orientačné číslo"
        validation="require_one:inv_company_street_number"
        help="Číslo za lomítkom"
      />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import type Order from '@/types/Order';
import type Address from '@/types/Address';
import { useRoute } from 'vue-router';

const route = useRoute()
let invoiceAddressIsSame = ref(true);
const orderingAsCompany = ref(false);
const isFirmaFormOrder = ref(false);

let paymentOptions = ref<string>('');
// why array?
let fakturacne_udaje = ref({
  first_name: '',
  last_name: '',
  name: '',
  ico: '',
  dic: '',
  ic_dph: '',
  address_id: 0
})

let invoiceAddress = ref({
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
} as Address)


let invoiceAddressForCompany = ref({
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
} as Address)

onBeforeMount( () => {
  if(route.fullPath.includes('firmy')){    
    isFirmaFormOrder.value = true;
    invoiceAddressIsSame.value = false;
  }
})

function setFalseInvoiceAddressIsSame() {
  invoiceAddressIsSame.value = false
  console.log(invoiceAddressIsSame.value)
}

defineExpose({
  fakturacne_udaje,
  invoiceAddressIsSame,
  orderingAsCompany,
  paymentOptions,
  invoiceAddress,
  invoiceAddressForCompany
})

</script>