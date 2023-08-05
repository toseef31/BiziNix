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
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
              <FormKit
                type="text"
                name="name"
                validation="required"
                v-model="company.name"
                label="Názov spoločnosti"
              />
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
              <div class="flex flex-col">
                <label class="formkit-label block mb-1 font-bold text-sm text-white">Spoločnosť</label>
                <Autocomplete v-model="finstatCompany"></Autocomplete>
              </div>
              <FormKit
                type="text"
                name="name"
                v-model="company.ico"
                label="IČO"
                :validation-rules="{ icoIsUnique }"
                validation="required|icoIsUnique"
                :validation-messages="{
                  icoIsUnique: 'Táto firma už používa služby Bizinix. Je to Vaša firma? Ak áno PRIHLÁSTE SA',
                }"
                validation-visibility="live"
                v-on:input="checkIcoOwner"
              />
              <FormKit type="text" name="dic" label="DIČ" v-model="finstatCompanyDetails.Dic"/>
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
import { ref, computed, watch, onMounted } from "vue";
import type Address from "@/types/Address";
import type Company from "@/types/Company";
import Autocomplete from "@/components/Autocomplete.vue";

const companyAddress = ref({} as Address);
const data = computed(() => store.state.orderVhqData);
const finstatCompany = ref({} as any);
const company = ref({} as Company);
const companies = ref([] as any);

const finstatCompanyDetails = ref({} as any);

watch(finstatCompany, (newFinstatCompany, prevFinstatCompany) => {
  if(newFinstatCompany.Spoločnosť !== undefined) {
      getCompanyDetails();
    }
});

async function isIcoAlreadyRegistered(node: any) {
  try {
      const res = await store.dispatch("isIcoAlreadyRegistered", node);
      return res;
  } catch (error) {
      return false;
  }
}

async function icoIsUnique(node: any) {
  const result = await isIcoAlreadyRegistered(node.value);
  return result;
}

async function checkIcoOwner(node: any) {
  const companyRes = companies.value.find(
    (item: any) => item.ico == node
  );
  if(companyRes) {
    company.value = companyRes;
  }
}

async function getCompanyDetails() {
  let ico = {
    ico: ""
  }

  if(finstatCompany.value.Spoločnosť.Ico !== undefined) {
    ico = {
      ico: finstatCompany.value.Spoločnosť.Ico
    }
  }

  await store
      .dispatch("getDetailsOfCompanyFinstat", ico)
      .then((res: any) => {
        finstatCompanyDetails.value = res.data;
        companyAddress.value.city = finstatCompanyDetails.value.City;
        companyAddress.value.street = finstatCompanyDetails.value.Street+" "+finstatCompanyDetails.value.StreetNumber;
        companyAddress.value.psc = finstatCompanyDetails.value.ZipCode;
        companyAddress.value.country = "Slovensko";

        company.value.name = finstatCompanyDetails.value.Name;
        company.value.ico = finstatCompanyDetails.value.Ico;
      })
      .catch((err) => {
        console.log(err);
      });
}

onMounted(async () => {
  if(store.state.user.userId){
    try {
      await store
        .dispatch("getAllCompaniesByUserId", store.state.user.userId)
        .then((response) => {
          companies.value = response.data;
        }).catch((err) => {
          console.log(err)
        });
    } catch (err){
      console.log(err)
    }
  }
});

defineExpose({
  finstatCompanyDetails,
  companyAddress,
  company
})
</script>