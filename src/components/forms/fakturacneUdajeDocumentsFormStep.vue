<template>
        <div class="text-4xl font-bold">Fakturácia a účet</div>
        <div class="my-2" v-if="!user.userId">
          Už máte u nás účet?
          <a class="text-teal-500 hover:underline" href="/login"
            >Prihláste sa</a
          >
        </div>
        <div>
          <div class="text-2xl font-bold py-4">Účet</div>
          <div class="my-2" v-if="user.userId">
            <a class="text-teal-500 hover:underline" href="/moj/dashboard"
              >Prihlásený ako {{ userData.first_name }}
              {{ userData.last_name }}</a
            >
          </div>
          <div v-if="!user.userId">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
              <FormKit
                type="text"
                name="first_name"
                v-model="userData.first_name"
                id="first_name"
                label="Krstné meno"
                validation="required|length:2"
              />
              <FormKit
                type="text"
                name="last_name"
                v-model="userData.last_name"
                label="Priezvisko"
                validation="required|length:2"
              />
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormKit
                type="email"
                name="email"
                v-model="userData.email"
                label="Emailová adresa"
                :validation-rules="{ emailIsUnique }"
                validation="required|email|emailIsUnique"
                :validation-messages="{
                  emailIsUnique: 'E-mail sa už používa!',
                }"
                validation-visibility="live"
              />
              <FormKit
                type="password"
                autocomplete="new-password"
                v-model="userData.password"
                name="password"
                label="Heslo"
                validation="required|length:8"
              />
              <FormKit
                type="password"
                autocomplete="new-password"
                v-model="userData.password_confirmation"
                name="password_confirmation"
                label="Zopakujte heslo"
                validation="required|confirm:password"
              />
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormKit
                type="text"
                name="phone"
                v-model="userData.phone"
                autocomplete="phone"
                label="Telefonné číslo (nepovinné)"
                validation="length:9"
              />
            </div>
          </div>

          <FormKit
            type="group"
            v-model="fakturacne_udaje"
            id="Fakturačné údaje"
            name="Fakturačné údaje"
          >
            <div class="text-2xl font-bold pt-4 pb-2">Fakturácia</div>
            <div class="pb-4" v-if="user.userId">
              Vypíšte údaje firmy, ktorou chcete zaplatiť službu Bizinix
              Doklady, Alebo zvoľte jeden z Fakturačných profilov.
            </div>
            <div class="pb-4" v-if="!user.userId">
              Vypíšte údaje firmy, ktorou chcete zaplatiť službu Bizinix Doklady
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
              <FormKit
                type="checkbox"
                v-model="invoiceAddressIsSame"
                :ignore="true"
                label="Fakturačné údaje sú rovnaké ako podnikateľské?"
                name="invoiceAddressIsSame"
              />
            </div>
            <div
              v-show="!invoiceAddressIsSame"
              class="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              <FormKit type="text" name="name" label="Názov spoločnosti" />
              <FormKit type="text" name="ico" label="IČO" />
              <FormKit type="text" name="dic" label="DIČ" />
            </div>
            <div
              v-show="!invoiceAddressIsSame"
              class="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              <FormKit
                type="text"
                name="street"
                v-model="invoiceAddress.street"
                label="Ulica"
              />
              <FormKit
                type="text"
                name="street_number"
                v-model="invoiceAddress.street_number"
                label="Súpisne číslo"
              />
              <FormKit
                type="text"
                name="street_number2"
                v-model="invoiceAddress.street_number2"
                label="Orientačné číslo"
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
              <FormKit type="text" name="ic_dph" label="IČ DPH (nepovinné)" />
            </div>
          </FormKit>
          <div class="w-full" v-show="!firstTimeActivation">
            <div class="flex flex-row gap-11">
              <FormKit
                type="radio"
                v-model="paymentOptions"
                label="Spôsob platby?"
                name="payment_method"
                :options="[
                  {
                    value: 'iban',
                    label: 'Priamy vklad na účet',
                  },
                  {
                    value: 'stripe',
                    label: 'Online kartou',
                  },
                ]"
              />
              <FormKit
                type="checkbox"
                v-model="paymentOptionsLength"
                label="Na ako dlho chcete zaplatiť?"
                name="payment_method_length"
                validation="max:1"
                :options="[
                  {
                    value: 'mesiac',
                    label: 'Platba na 1 mesiac',
                  },
                  {
                    value: 'rok',
                    label: 'Platba na rok',
                  },
                ]"
              />
            </div>
          </div>
        </div>
</template>



<script setup lang="ts">
import store from "@/store";
import { ref, computed } from "vue";
import type Address from "@/types/Address";
import type Company from "@/types/Company";
import type User from "@/types/User";

const user = computed(() => store.state.user);
const company = computed(() => store.state.selectedCompany as Company);
const hqAddress = computed(() => store.state.selectedCompanyAddress as Address);

const userData = computed(() => store.state.user.data as User);
const invoiceAddress = ref({} as Address);

const firstTimeActivation = computed(() => {
  return company.value.fakturacia_zaplatene_do ? false : true;
});

const invoiceAddressIsSame = ref(true);
const paymentOptions = ref("");
const paymentOptionsLength = ref();

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

function isInvoiceAddressSameAsCompany() {
  if(invoiceAddressIsSame.value == true) {
    fakturacne_udaje.value.ico = company.value.ico;
    fakturacne_udaje.value.dic = company.value.dic;
    fakturacne_udaje.value.ic_dph = company.value.icdph;
    fakturacne_udaje.value.name = company.value.name;
    fakturacne_udaje.value.company_id = company.value.id;
    fakturacne_udaje.value.address_id = hqAddress.value.id;
  } else {
    fakturacne_udaje.value.user_id = Number(user.value.userId);
  }
}

async function isEmailAlreadyRegistered(node: any) {
  try {
    const res = await store.dispatch("isEmailAlreadyRegistered", node);
    console.log(res);
    return true;
  } catch (error) {
    return false;
  }
}

async function emailIsUnique(node: any) {
  const result = await isEmailAlreadyRegistered(node.value);
  return result;
}

defineExpose({
  isInvoiceAddressSameAsCompany,
  paymentOptions,
  paymentOptionsLength,
  invoiceAddressIsSame,
  invoiceAddress,
  fakturacne_udaje,
  userData
})

</script>