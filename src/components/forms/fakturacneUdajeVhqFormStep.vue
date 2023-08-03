<template>
        <div class="text-4xl font-bold pb-4">Fakturácia</div>
        <div>
          <FormKit
            type="group"
            v-model="fakturacne_udaje"
            id="Fakturačné údaje"
            name="Fakturačné údaje"
          >
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
              <Autocomplete v-model="finstatCompany"></Autocomplete>
              <FormKit type="text" name="ico" label="IČO" v-model="finstatCompanyDetails.Ico" />
              <FormKit type="text" name="dic" label="DIČ" v-model="finstatCompanyDetails.Dic" />
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormKit
                type="text"
                name="street"
                v-model="invoiceAddress.street"
                label="Ulica a číslo"
                validation="required"
              />
              <FormKit
                type="text"
                name="city"
                v-model="invoiceAddress.city"
                label="Mesto"
                validation="required"
              />
              <FormKit
                type="text"
                name="psc"
                v-model="invoiceAddress.psc"
                label="PSČ"
                validation="required"
              />
              <FormKit
                type="text"
                name="country"
                v-model="invoiceAddress.country"
                label="Krajina"
                validation="required"
              />
            </div>
            <FormKit type="text" name="ic_dph" label="IČ DPH (nepovinné)" v-show="orderingAsCompany" v-model="finstatCompanyDetails.IcDPH"/>
          </FormKit>
        </div>
</template>



<script setup lang="ts">
import store from "@/store";
import { ref, computed, watch } from "vue";
import type Address from "@/types/Address";
import type Company from "@/types/Company";
import Autocomplete from "@/components/Autocomplete.vue";

const user = computed(() => store.state.user);
const company = ref({} as Company);
const invoiceAddress = ref({} as Address);
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

const finstatCompany = ref({} as any);
const finstatCompanyDetails = ref({} as any);

watch(finstatCompany, (newFinstatCompany, prevFinstatCompany) => {
  if(newFinstatCompany.Spoločnosť !== undefined) {
      getCompanyDetails();
    }
});

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
        invoiceAddress.value.city = finstatCompanyDetails.value.City;
        invoiceAddress.value.street = finstatCompanyDetails.value.Street+" "+finstatCompanyDetails.value.StreetNumber;
        invoiceAddress.value.psc = finstatCompanyDetails.value.ZipCode;
        invoiceAddress.value.country = "Slovensko";

        fakturacne_udaje.value.name = finstatCompanyDetails.value.Name;
        fakturacne_udaje.value.ico = finstatCompanyDetails.value.Ico;
        fakturacne_udaje.value.dic = finstatCompanyDetails.value.Dic;
        fakturacne_udaje.value.ic_dph = finstatCompanyDetails.value.IcDPH;

      })
      .catch((err) => {
        console.log(err);
      });
} 

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

defineExpose({
  isInvoiceAddressSameAsCompany,
  invoiceAddressIsSame,
  invoiceAddress,
  fakturacne_udaje,
  finstatCompany,
  finstatCompanyDetails
})

</script>