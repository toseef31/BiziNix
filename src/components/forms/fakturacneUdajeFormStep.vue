<template>
  <div class="text-4xl font-bold">Fakturačné údaje</div>
  <div class="mt-2 mb-6">Na nasledujúce údaje vám budeme odosielať faktúri.</div>
  <template v-if="isLoading">
    <div class="flex flex-col py-12">
      <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="mt-4">Načitávam...</span>
    </div>
  </template>
  <template v-else>
    <div class="flex">
        <FormKit v-if="userHasInvoiceProfile && !createNewInvoiceProfile"
          type="dropdown"
          name="invoice_profile_dropdown"
          label="Fakturačný profil"
          placeholder="Vybrať"
          :options="fetchInvoiceProfiles"
          always-load-on-open
          validation="required"
          v-model="invoiceProfileId"
        >
        </FormKit>
      </div>

    <div class="flex flex-row gap-8">
      <FormKit type="toggle" track-color-on="#319487" v-if="userId" v-model="createNewInvoiceProfile" label="Vytvoriť nový profil fakturačný profil?" name="checkForNewInvoiceProfil" />
      <div class="flex" v-if="!userHasInvoiceProfile || createNewInvoiceProfile">
        <FormKit type="checkbox" v-model="orderingAsCompany" label="Objednávate ako firma?" id="orderingAsCompany" name="orderingAsCompany" />
      </div>
    </div>
    <div v-if="!userHasInvoiceProfile || createNewInvoiceProfile">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center" v-if="!orderingAsCompany">
        <FormKit type="text" name="first_name" v-model="fakturacne_udaje.first_name" label="Meno" validation="required" />
        <FormKit type="text" name="last_name" v-model="fakturacne_udaje.last_name" label="Priezvisko" validation="required" />
      </div>
      <div v-if="!orderingAsCompany" class="grid grid-cols-3 gap-4">
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
      <div v-if="orderingAsCompany" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="flex flex-col">
            <label class="formkit-label block mb-1 font-bold text-sm text-white">Spoločnosť</label>
            <Autocomplete v-model="finstatCompany"></Autocomplete>
          </div>
          <FormKit type="text" name="ico" v-model="fakturacne_udaje.ico" label="IČO" validation="required" />
          <FormKit type="text" name="dic" v-model="fakturacne_udaje.dic" label="DIČ" validation="required" />
          <FormKit type="text" name="ic_dph" v-model="fakturacne_udaje.ic_dph" label="IČ DPH" />

          <FormKit type="select" name="country" id="country" placeholder="Vybrať" label="Štát" v-model="invoiceAddress.country"
            :options="['Slovensko', 'Česko']" validation="required" validation-visibility="dirty"
          />
          <FormKit type="text" name="city" v-model="invoiceAddress.city" label="Obec" validation="required" />
          <FormKit type="text" name="psc" v-model="invoiceAddress.psc" label="PSČ" validation="required" />
          <FormKit type="text" name="street" v-model="invoiceAddress.street" label="Ulica" validation="required" />
          <FormKit type="text" name="inv_company_street_number" v-model="invoiceAddress.street_number" label="Súpisne číslo"
            validation="require_one:inv_company_street_number2"
            help="Číslo pred lomítkom"
          />
          <FormKit type="text" name="inv_company_street_number2" v-model="invoiceAddress.street_number2" label="Orientačné číslo"
            validation="require_one:inv_company_street_number"
            help="Číslo za lomítkom"
          />
      </div>
    </div>
  </template>
  <!-- <button @click.prevent="LogValForInfoiceProfile"> logValFor Invoice profile </button> -->
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import type Address from '@/types/Address';
import store from '@/store';
import Autocomplete from "@/components/Autocomplete.vue";
import { toast } from "vue3-toastify";

const createNewInvoiceProfile = ref(false);
const orderingAsCompany = ref(false);
const invoiceProfileId = ref();
const invoiceAddressId = ref();
const userId = computed(() => { return store.getters.getUserId })
const isLoading = ref(true)
const userHasInvoiceProfile = ref(false)
const invoiceProfileOptions = computed(() => {
  const options = reactive([{
    label: 'Default' as string,
    value: 'Default' as number | string
  }])
  return options
})

let paymentOptions = ref<string>('');
const finstatCompany = ref({} as any);

let fakturacne_udaje = ref({
  first_name: '',
  last_name: '',
  name: '',
  ico: '',
  dic: '',
  ic_dph: ''
})

let invoiceAddress = ref({
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
} as Address)

onMounted( async () => {
  if(userId.value){
    fetchInvoiceProfiles()
  } else {
    isLoading.value = false
    createNewInvoiceProfile.value = true
  }
})

watch(finstatCompany, (newFinstatCompany, prevFinstatCompany) => {
  if(newFinstatCompany.Spoločnosť !== undefined) {
    getCompanyDetails();
      
    }
});

async function getCompanyDetails() {
  let ico = {
    ico: ""
  }

  if(finstatCompany.value.Spoločnosť !== undefined) {
    ico = {
      ico: finstatCompany.value.Spoločnosť.Ico
    }
  }
  
  await store
      .dispatch("getDetailsOfCompanyFinstat", ico)
      .then((res: any) => {
        fakturacne_udaje.value.name = res.data.Name;
        fakturacne_udaje.value.dic = res.data.Dic;
        fakturacne_udaje.value.ic_dph = res.data.IcDPH;
        fakturacne_udaje.value.ico = res.data.Ico;

        invoiceAddress.value.city = res.data.City;
        invoiceAddress.value.street = res.data.Street+" "+res.data.StreetNumber;
        invoiceAddress.value.psc = res.data.ZipCode;
        invoiceAddress.value.country = "Slovensko";
      })
      .catch((err) => {
        toast.error('Error: ' + err);
      });
} 

async function fetchInvoiceProfiles() {
  const res = await store.dispatch("getFakturacneUdajeByUserId", userId.value)
  isLoading.value = false
  if(res.data[0]?.id){
    userHasInvoiceProfile.value = true
    return res.data.map((data) => {
      return {
        label: `${data?.name ?? ''} ${data?.first_name ?? ''} ${data?.last_name ?? ''} ${data?.ico ? 'IČO: ' + data.ico : ''} ${data?.dic ? 'DIČ: ' + data.dic : ''}`,
        value: data.id
      }
    })
  } else {
    isLoading.value = false
    return []
  }
}

watch([userId, userHasInvoiceProfile], async ([newValUserId, newValUserHasInvoiceProfile], [oldValUserId, oldValUserHasInvoiceProfile]) => {
  if(newValUserId){
    isLoading.value = false;
    fetchInvoiceProfiles()
  } if(newValUserHasInvoiceProfile) {
    createNewInvoiceProfile.value = false
  }
})

watch(invoiceProfileId, async () => {
  const res = await store.dispatch("getFakturacneUdajeById", invoiceProfileId.value)
  if(res.data) {
    invoiceAddressId.value = res.data.address_id;
  }
})

function LogValForInfoiceProfile(){
  console.log("Valu for invoice profile: ", invoiceProfileId.value)
  console.log("Valu for createnewInvoice: ", createNewInvoiceProfile.value)
}

defineExpose({
  fakturacne_udaje,
  orderingAsCompany,
  paymentOptions,
  invoiceAddress,
  userHasInvoiceProfile,
  invoiceProfileId,
  invoiceAddressId,
  createNewInvoiceProfile
})

</script>