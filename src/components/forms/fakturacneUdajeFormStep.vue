<template>
<div class="text-4xl font-bold">Fakturačné údaje</div>
<div class="mt-2 mb-6">Na nasledujúce údaje vám budeme odosielať faktúri.</div>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
  <FormKit type="text" name="first_name" v-model="fakturacne_udaje[0].first_name" label="Meno" validation="required" />
  <FormKit type="text" name="last_name" v-model="fakturacne_udaje[0].last_name" label="Priezvisko" validation="required" />
  <FormKit type="checkbox" v-model="invoiceAddressIsSame" :ignore="true" :disabled="true" label="Fakturačná adresa je rovnaká ako podnikateľská?" name="invoiceAddressIsSame" />
  </div>
  <div class="w-fit">
    <FormKit type="checkbox" v-model="orderingAsCompany" :ignore="true" label="Objednávate ako firma?" id="orderingAsCompany" name="orderingAsCompany" />
  </div>    
  <div v-show="orderingAsCompany" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <FormKit type="text" name="name" v-model="fakturacne_udaje[0].name" label="Názov firmy" />
      <FormKit type="text" name="ico" v-model="fakturacne_udaje[0].ico" label="IČO" />
      <FormKit type="text" name="dic" v-model="fakturacne_udaje[0].dic" label="DIČ" />
      <FormKit type="text" name="ic_dph" v-model="fakturacne_udaje[0].ic_dph" label="IČ DPH" />
  </div>

  <div>
    <FormKit type="radio" v-model="paymentOptions" label="Spôsob platby?" name="payment_method"
    :options="
    [
      { value: 'iban', label: 'Priamy vklad na účet', help: 'Pošlite vašu platbu priamo na náš bankový účet, ktorý nájdete na ďakovnej stránke po dokončení objednávky.' },
      { value: 'stripe', label: 'Online kartou', help: 'Platba prostredníctvom platobnej brány Stripe.' }
    ]"
    validation="required" />

    <div v-if="paymentOptions == 'stripe'" class="bg-gray-100 my-5 p-4">
      <stripePaymentComponent ref="childRefComponentForPay"></stripePaymentComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import stripePaymentComponent from '@/components/payments/PayStripe.vue'
import type Order from '@/types/Order';

const childRefComponentForPay = ref()
const invoiceAddressIsSame = ref(true);
const orderingAsCompany = ref(false);
let paymentOptions = ref<string>('');
// why array?
let fakturacne_udaje = ref([{
  first_name: '',
  last_name: '',
  name: '',
  ico: '',
  dic: '',
  ic_dph: '',
  address_id: 0
  // TO DO ADDRESS ID
}] as Order["fakturacne_udaje"] )


defineExpose({
  fakturacne_udaje,
  invoiceAddressIsSame,
  paymentOptions,
  childRefComponentForPay
})

</script>