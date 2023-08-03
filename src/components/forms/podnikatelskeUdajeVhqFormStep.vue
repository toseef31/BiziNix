<template>
      <!-- Podnikatelské údaje New company-->
      <div v-show="data.createCompany">
        <div class="text-4xl font-bold">Identifikujte firmu</div>
        <div class="my-2">
          Po zaplatení služby dostanete dokument, pomocou ktorého môžete založiť
          firmu na našom (virtuálnom) sídle.
        </div>
        <div class="my-5">
          Chcete, aby sme Vám novú firmu založili my?
          <a class="text-teal-500" href="#">Kliknite sem</a>
        </div>
        <div>
          <FormKit
            type="group"
            id="Podnikatelské údaje"
            name="Podnikatelské údaje"
          >
            <div>
              <Autocomplete v-model="finstatCompany"></Autocomplete>
              {{ finstatCompany }}
            </div>
          </FormKit>
        </div>
      </div>
      <!-- Podnikatelské údaje Existing company-->
      <div v-show="!data.createCompany">
        <div class="text-4xl font-bold">Identifikujte firmu</div>
        <div class="my-2">
          Po zaplatení služby dostanete dokument, pomocou ktorého môžete
          prepísať sídlo Vašej firmy na to naše (virtuálne).
        </div>
        <div class="my-5">
          Chcete, aby sme prepis sídla zabezpečili tiež my?
          <a class="text-teal-500" href="#">Kliknite sem</a>
        </div>
        <div>
          <FormKit
            type="group"
            id="Podnikatelské údaje"
            name="Podnikatelské údaje"
          >
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
              <FormKit
                type="text"
                name="name"
                validation="required"
                v-model="company.name"
                label="Názov spoločnosti"
              />
              <FormKit
                type="text"
                name="name"
                v-model="company.ico"
                label="IČO"
              />
              <FormKit type="text" name="dic" label="DIČ" v-model="company.dic"/>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormKit
                type="text"
                name="street"
                v-model="companyAddress.street"
                label="Ulica a číslo"
              />
              <FormKit
                type="text"
                name="city"
                v-model="companyAddress.city"
                label="Mesto"
              />
              <FormKit
                type="text"
                name="psc"
                v-model="companyAddress.psc"
                label="PSČ"
              />
              <FormKit
                type="text"
                name="country"
                v-model="companyAddress.country"
                label="Krajina"
              />
            </div>
          </FormKit>
        </div>
      </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { ref, computed } from "vue";
import type Address from "@/types/Address";
import type Company from "@/types/Company";
import Autocomplete from "@/components/Autocomplete.vue";

const companyAddress = ref({} as Address);
const data = computed(() => store.state.orderVhqData);
const finstatCompany = ref({} as any);
const company = ref({} as Company);

defineExpose({
  companyAddress,
  company
})
</script>