<template>
        <div class="text-4xl font-bold">Fakturácia a účet</div>
        <div class="my-2" v-if="!user.userId">
          Už máte u nás účet?
          <router-link
            to="/login"
            class="text-teal-500 hover:underline"
            >Prihlásiť sa</router-link
          >.
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
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
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
              label="Email"
              :validation-rules="{ emailIsUnique }"
              validation="required|email|emailIsUnique"
              :validation-messages="{ emailIsUnique: 'E-mail sa už používa!' }"
              validation-visibility="live"
              help="Email ktorý budete používať aj na prihlasenie do účtu."
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
            />
          </div>

          <FormKit
            type="group"
            v-model="fakturacne_udaje"
            id="Fakturačné údaje"
            name="Fakturačné údaje"
          >
            <div class="text-2xl font-bold py-4">Fakturácia</div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
              <FormKit
                type="text"
                name="first_name"
                label="Meno"
                validation="required"
              />
              <FormKit
                type="text"
                name="last_name"
                label="Priezvisko"
                validation="required"
              />
            </div>
            <div class="w-fit">
              <FormKit
                type="checkbox"
                v-model="orderingAsCompany"
                :ignore="true"
                label="Objednávate ako firma?"
                id="orderingAsCompany"
                name="orderingAsCompany"
              />
            </div>
            <div
              v-show="orderingAsCompany"
              class="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              <FormKit type="text" name="name" label="Názov firmy" />
              <FormKit type="text" name="ico" label="IČO" />
              <FormKit type="text" name="dic" label="DIČ" />
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormKit
                type="text"
                name="street"
                v-model="userAddress.street"
                label="Ulica"
                validation="required"
              />
              <FormKit
                type="text"
                name="street_number"
                v-model="userAddress.street_number"
                label="Súpisne číslo"
                validation="required"
              />
              <FormKit
                type="text"
                name="street_number2"
                v-model="userAddress.street_number2"
                label="Orientačné číslo"
                validation="required"
              />
              <FormKit
                type="text"
                name="city"
                v-model="userAddress.city"
                label="Mesto"
                validation="required"
              />
              <FormKit
                type="text"
                name="psc"
                v-model="userAddress.psc"
                label="PSČ"
                validation="required"
              />
              <FormKit
                type="text"
                name="country"
                v-model="userAddress.country"
                label="Krajina"
                validation="required"
              />
            </div>
            <FormKit type="text" name="ic_dph" label="IČ DPH (nepovinné)" v-show="orderingAsCompany"/>
          </FormKit>
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
const userData = computed(() => store.state.user.data as User);

const company = ref({} as Company);
const invoiceAddress = ref({} as Address);
const userAddress = ref({} as Address);

const orderingAsCompany = ref(false);

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

function isInvoiceAddressSameAsCompany() {
  if(invoiceAddressIsSame.value == true) {
    fakturacne_udaje.value.ico = company.value.ico;
    fakturacne_udaje.value.dic = company.value.dic;
    fakturacne_udaje.value.ic_dph = company.value.icdph;
    fakturacne_udaje.value.name = company.value.name;
    fakturacne_udaje.value.company_id = company.value.id;
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
  invoiceAddressIsSame,
  invoiceAddress,
  fakturacne_udaje,
  userData,
  userAddress
})

</script>