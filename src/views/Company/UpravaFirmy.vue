<template>
  <div class="bg-no-repeat bg-cover" style="background-image:linear-gradient(0deg, rgba(36,36,39,0.9332107843137255) 40%, rgba(0,0,0,0.29735644257703087) 100%), url('../src/assets/zalozenie-fimy-bg.png') ">
    <div class="max-w-7xl flex flex-col md:flex-row min-h-[80vh] items-center mx-auto py-20 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
      <div class="max-w-full">
        <h1 class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Zmeny vo firme (S.R.O.)</h1>
        <p class="mt-8 mb-8 text-2xl text-white">Potrebujete vykonať úpravy v obchodnom registri pre vašu spoločnosť s ručením obmedzeným (S.R.O.)? Či už ide o zmenu adresy sídla, výmenu konateľa, pridanie nových oblastí podnikania alebo niečo iné. S našou službou môžete tieto zmeny vybaviť pohodlne a bez nutnosti navštevovať úrady.</p>
        <div class="mt-8 text-white">
          <button @click.prevent="scrollToDiv" class="bg-bizinix-teal font-bold py-4 px-5 rounded">
            Chcem zmeny v spoločnosti            
          </button>          
        </div>
      </div>
      <!-- Second div of flex -->
      <div>
        <img src="@/assets/robot.png" class="max-w-xs lg:max-w-md">
      </div>
    </div>
  </div>
  <div class="py-12 bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-center mb-10 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">Poďme na to</h2>
      <div>
        <div v-if="errorMsg" class="mb-4 flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
          {{ errorMsg }}
          <span @click="errorMsg=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </span>
        </div>
        <div v-if="sucessMsg" class="mb-4 flex items-center justify-between py-3 px-4 bg-green-500 text-white rounded">
          {{ sucessMsg }}
          <span @click="sucessMsg=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </span>
        </div>
      </div>
      <div id="search-form" ref="searchFormDiv">
        <FormKit type="form"
          :actions="false"
          id="upravaFirmyMultiStepForm"
          @submit-invalid="showErrors"
          #default="{ value, state: { valid }  }"
          @submit="newSustmiApp"
        >
        <div v-if="messages.length" class="mb-8 p-4 border rounded-md border-red-400 border-solid">
          <ul class="list-disc list-inside validation-errors">
            <li v-for="message in messages">{{ message }}</li>
          </ul>
        </div>
          <FormKit type="multi-step" name="upravFirmyMultiStepPlugin" id="multiStepPluginUpravFirma"
            :allow-incomplete="true"              
            use-local-storage="false"
            tab-style="tab"
          >
            <FormKit type="step" name="icoFirmy" label="IČO firmy" next-label="Pokračovať">
              <NajdiFirmuFormStep ref="najdiFirmuForm" />
            </FormKit>

            <FormKit type="step" name="userRegister" label="Užívateľský účet" next-label="Pokračovať">
              <userRegisterFormStep ref="userRegisterForm" />
            </FormKit>

            <FormKit type="step" name="fakturacneUdaje" label="Fakturačné údaje" previous-label="Naspäť">
              <fakturacneUdajeFormStep ref="invoiceDataForm" />
              <template #stepNext>
                <FormKit type="submit" label="Objednať s povinnosťou platby" />                
              </template>

            </FormKit>
          </FormKit>
          <div class="p-4 mb-4 text-white border rounded-md border-bizinix-border border-solid">
            <p>Poplatok za úpravy firmy {{ order.items[0].price }} €.</p>
            <p>Poplatok za predmety podnikania {{ najdiFirmuForm?.finalPriceForBusinessCategori ?? 0 }} €.</p>
            <p v-if="najdiFirmuForm?.obchodneSidloVirtuOrNormal === 'virtualne'">Poplatok za virtuálne sídlo {{ selectedVhqPackageFromStore.price * 12 ?? 0 }} € rok.</p>
            <p>Celkom k platbe <b>{{ totalForPay }} €</b>. Počet vybratých nových predmetov podnikania <b>{{ najdiFirmuForm?.subjects_of_business_new.length }}</b>.</p>
          </div>
          <details>
            <pre>{{ value }}</pre>
          </details>    
        </FormKit>
        <button @click="logujData">New log Submit</button>
        <p>Selected Vhq:</p>
        <p>{{ selectedVhqFromStore }}</p>
        <p>Selected VhqPacage:</p>
        <p>{{ selectedVhqPackageFromStore }}</p>
      </div> 
    </div>
  </div>
</template>

<script setup lang="ts">

import store from "@/store";
import { ref, onBeforeMount, onMounted, computed, toRef } from "vue";
import router from "@/router";
import type User from "@/types/User";
import NajdiFirmuFormStep from "@/components/forms/NajdiFirmuFormStep.vue";
import userRegisterFormStep from "@/components/forms/UserRegisterFormStep.vue";
import fakturacneUdajeFormStep from "@/components/forms/fakturacneUdajeFormStep.vue";
//import type Company from "@/types/Company";
import type Address from "@/types/Address";
import type Headquarters from "@/types/Headquarters";
import { getValidationMessages } from '@formkit/validation';
import { getNode } from '@formkit/core';
import { toast } from "vue3-toastify";
import type CompanyMemberKonatel from "@/types/CompanyMemberKonatel";
import type CompanyMemberSpolocnik from "@/types/CompanyMemberSpolocnik";
import type SharesTransfers from "@/types/editCompany/SharesTransfers";

const searchFormDiv = ref();
const scrollToDiv = () => {
  searchFormDiv.value.scrollIntoView({ behavior: 'smooth' });
};

const userIdFromStore = computed(() => { return store.getters.getUserId })
const selectedVhqFromStore = computed(() => store.getters.getSelectedVhq)
const selectedVhqPackageFromStore = computed(() => store.getters.getSelectedVhqPackage)
let errorMsg = ref('');
let errorMsgHq = ref('');
let errorMsgCompany = ref('');
let sucessMsg = ref('');
let najdiFirmuForm = ref<InstanceType<typeof NajdiFirmuFormStep>>(null as any)
let userRegisterForm = ref<InstanceType<typeof userRegisterFormStep>>(null as any)
let invoiceDataForm = ref<InstanceType<typeof fakturacneUdajeFormStep>>(null as any)
let user = ref<User>();


const messages = ref([])

interface CompanyData {
  order_id: number;
  user_id: number;
  actual_company: {
    obchodne_meno: string;
    sidlo: object;
    ico: number;
    pravna_forma: string;
    predmet_cinnosti: string[];
    spolocnici: SpolocnikOrKonatelOrProku[];
    konatelia: SpolocnikOrKonatelOrProku[];
    vyska_vkladu: VyskaVkladu[];
    statutarny_organ: object;
    konanie_menom_spolocnosti: string;
    zakladne_imanie: string;
    ine_zmeny: string;
    removed_subject_business: string[];
    prokurista: SpolocnikOrKonatelOrProku[];
  };
  updated_company: {
    obchodne_meno: string;
    sidlo: object;
    ico: number;
    pravna_forma: string;
    predmet_cinnosti: string[];
    spolocnici: CompanyMemberSpolocnik[];
    konatelia: CompanyMemberKonatel[];
    vyska_vkladu: VyskaVkladu[];
    statutarny_organ: object;
    konanie_menom_spolocnosti: string;
    zakladne_imanie: object[];
    ine_zmeny: string;
    removed_subject_business: string[];
    prokurista: CompanyMemberKonatel[];
  };
  sharesTransfers: SharesTransfers[]
}

interface SpolocnikOrKonatelOrProku {
  function?: string
  country: string | null;
  pohlavie?: string;
  titul_before?: string;
  titul_after?: string;
  name: string;
  street: string;
  city: string;
  number: string;
  zip: string;
  since?: string; // optional field
  datum_narodenia?: string;
  rodne_cislo?: string;
}

interface VyskaVkladu {
  name: string;
  vklad: number;
  splatene: number;
  currency: string;
}

let order = ref({
  payment_date: '' as any,
  payment_method: '',
  order_type: 'cupdate',
  description: '',
  amount: 0, // final cena s dph
  amount_vat: 0, // vat je čisto len dph
  is_paid: false,
  user_id: 0,
  is_tos_accepted: true,
  is_advocate_requested: true,
  items: [
    {
      description: "Úprava firmy",
      price: 20, // finalna cena za polozku s dph
      price_vat: 20 * 0.2 // toto je len dph
    }
  ],
  fakturacne_udaje_id: 0,
})

const newCompanyData: CompanyData = {
  order_id: 0, // Provide your desired value
  user_id: 0, // Provide your desired value
  actual_company: {
    obchodne_meno: "", // Provide your desired values
    sidlo: {}, // Provide your desired values (empty object in this case)
    ico: 0, // Provide your desired value
    pravna_forma: "", // Provide your desired value
    predmet_cinnosti: [], // Empty array for activities
    spolocnici: [], // Empty array for partners
    konatelia: [], // Empty array for directors
    vyska_vkladu: [], // Empty array for contributions
    statutarny_organ: {}, // Provide your desired values (empty object in this case)
    konanie_menom_spolocnosti: "", // Provide your desired value
    zakladne_imanie: '', // Provide your desired values (empty object in this case)
    ine_zmeny: '', // Empty array for other changes
    removed_subject_business: [], // Empty not needed for acutal company
    prokurista: [], // Empty array for procurators
  },
  updated_company: {
    obchodne_meno: "", // Provide your desired values
    sidlo: {}, // Provide your desired values (empty object in this case)
    ico: 0, // Provide your desired value
    pravna_forma: "", // Provide your desired value
    predmet_cinnosti: [], // Empty array for activities
    spolocnici: [], // Empty array for partners
    konatelia: [], // Empty array for directors
    vyska_vkladu: [], // Empty array for contributions
    statutarny_organ: {}, // Provide your desired values (empty object in this case)
    konanie_menom_spolocnosti: "", // Provide your desired value
    zakladne_imanie: [{}], // Provide your desired values (empty object in this case)
    ine_zmeny: '', // Empty array for other changes
    removed_subject_business: [], // Empty array for removed sbj
    prokurista: [], // Empty array for procurators
  },
  sharesTransfers: []
};

let totalForPay = computed(() => najdiFirmuForm.value?.finalPriceForBusinessCategori + order.value.items[0].price + ((selectedVhqPackageFromStore.value?.price ?? 0) * 12 ))

const isUdajeSpolocnostiStepValid = ref({
  valid: false
})

onMounted( () => {

  const node = getNode('udajeSpolocnostiStep')
  if (!node) return;  
  isUdajeSpolocnostiStepValid.value.valid = toRef(node.context?.state, 'valid')

})

function showErrors(node: any) {
  messages.value = []
  const validations = getValidationMessages(node)
  validations.forEach((inputMessages: any) => {
    messages.value = messages.value.concat(
      inputMessages.map((message: any) => message.value)
    )
  })
}

function logujData(){
  console.log('Formdata Udaje Spolocnosti', isUdajeSpolocnostiStepValid.value)
  //console.log('Subject of business',companyOrZivnostModel.value.subjects_of_business)
  console.log(user.value)
  //console.log(companyOrZivnostModel.value)
  //console.log(fakturacne_udaje.value)
  //console.log(zakladateliaSpolocnici.value)
  //console.log(konatelia.value)
}

/* Submiting form and Api calls */

async function registerAddress(userAddress: Address): Promise<any> {
  try {
    const res = await store.dispatch('registerAddress', userAddress);
    console.log("Registering address: " + JSON.stringify(res));
    return res;
  } catch (err: any) {
    errorMsg.value = JSON.stringify(err.response?.data?.errors) || 'Nastala chyba pri registrácii adresy.';
    throw err;
  }
}

async function registerUserAndReturnUserId(user: User): Promise<any> {
  try {
    const res = await store.dispatch('registerUser', user);
    sucessMsg.value = "E-mail na aktiváciu účtu bol odoslaný. Prosím skontrolujte si svoju schránkú, alebo priečinok nevyžiadanej pošty.";
    console.log("Registering user: " + JSON.stringify(res));
    return res.user_id;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.errors) {
      errorMsg.value = JSON.stringify(err.response.data.errors);
    } else {
      errorMsg.value = 'Nastala chyba pri registrácii uživateľa.';
    }
  }
}


async function registerInvoiceAddress(invoiceAddress: Address) {
  try {
    const res = await store.dispatch('registerAddress', invoiceAddress);
    console.log("Registering invoice address: " + JSON.stringify(res));
    return res;
  } catch (err: any) {
    errorMsg.value = JSON.stringify(err.response.data.errors);
  }
}

async function addInvoiceProfile(invoiceAddressId, userId) {
  
  let faktProfil = {
    first_name: invoiceDataForm.value.fakturacne_udaje.first_name,
    last_name: invoiceDataForm.value.fakturacne_udaje.last_name,
    name: invoiceDataForm.value.fakturacne_udaje.name,
    ico: invoiceDataForm.value.fakturacne_udaje.ico,
    dic: invoiceDataForm.value.fakturacne_udaje.dic,
    ic_dph: invoiceDataForm.value.fakturacne_udaje.ic_dph,
    address_id: invoiceAddressId,
    user_id: userId
  }

    return store.dispatch('addInvoiceProfile', faktProfil)
    .then((res) => {
      console.log("Adding invoice profile: ", JSON.stringify(res))
      return res
    })
    .catch((error: any) => {
      errorMsg.value = JSON.stringify(error.response.data.errors)
    })
}

async function addOrder(userId: number, invoiceAddressId?: number): Promise<any> {
  order.value.payment_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  order.value.payment_method = invoiceDataForm.value.paymentOptions
  order.value.user_id = userId
  order.value.description = 'Úprava firmy.'

  if(najdiFirmuForm.value.obchodneSidloVirtuOrNormal === 'virtualne'){
    order.value.items.push({
      description: 'Virtuálne sídlo: ' + selectedVhqFromStore.value.id,
      price: 0,
      price_vat: 0 * 0.2,
    })
    order.value.items.push({
        description: 'Virtual balík: ' + selectedVhqPackageFromStore.value.name + ' na rok',
        price: selectedVhqPackageFromStore.value.price * 12,
        price_vat: (selectedVhqPackageFromStore.value.price * 12) * 0.2,
      })
  }

  order.value.items.push({
    description: 'Počet predmetov podnikania: ' + najdiFirmuForm.value.subjects_of_business_new.length,
    price: najdiFirmuForm?.value.finalPriceForBusinessCategori,
    price_vat: (najdiFirmuForm?.value.finalPriceForBusinessCategori) * 0.2
  })

  // najdiFirmuForm.value.subjects_of_business_new.forEach(element => {
  //   order.value.items.push({
  //     description: element.title as string,
  //     price: element.price as number,
  //     price_vat: (element.price as number) * 0.2
  //   })
  // });

  order.value.fakturacne_udaje_id = invoiceAddressId as number

  order.value.amount = totalForPay.value
  order.value.amount_vat = totalForPay.value * 0.2

  try {
    const res = await store.dispatch('addOrder', order.value);
    console.log("Adding order: " + JSON.stringify(res));
    return res.order;
  } catch (err: any) {
    console.log(err.response.data);
  }

}

async function addUpdatedCompany(orderId: number, userId: number) : Promise<any> {
  newCompanyData.order_id = orderId
  newCompanyData.user_id = userId
  // actual company
  newCompanyData.actual_company.obchodne_meno = najdiFirmuForm.value.companyFromOrSr.obchodne_meno
  newCompanyData.actual_company.pravna_forma = najdiFirmuForm.value.companyFromOrSr.pravna_forma
  newCompanyData.actual_company.ico = najdiFirmuForm.value.companyFromOrSr.ico
  newCompanyData.actual_company.sidlo = najdiFirmuForm.value.companyFromOrSr.adresa
  newCompanyData.actual_company.predmet_cinnosti = najdiFirmuForm.value.companyFromOrSr.predmet_cinnosti
  newCompanyData.actual_company.spolocnici = najdiFirmuForm.value.companyFromOrSr.spolocnici
  newCompanyData.actual_company.konanie_menom_spolocnosti = najdiFirmuForm.value.companyFromOrSr.konanie_menom_spolocnosti
  newCompanyData.actual_company.konatelia = najdiFirmuForm.value.companyFromOrSr.statutarny_organ.konateľ || najdiFirmuForm.value.companyFromOrSr.statutarny_organ.konatelia
  newCompanyData.actual_company.zakladne_imanie = najdiFirmuForm.value.zakladneImanieFromOrSr.splatene + " " + najdiFirmuForm.value.zakladneImanieFromOrSr.currency
  
  // updated company
  const { newCompanyName, newCompanyPravForm } = najdiFirmuForm.value.newCompanyFullName;
  newCompanyData.updated_company.obchodne_meno = `${newCompanyName} ${newCompanyPravForm}`;
  newCompanyData.updated_company.pravna_forma = `${newCompanyPravForm}`;
  newCompanyData.updated_company.ico = najdiFirmuForm.value.companyFromOrSr.ico
  if(najdiFirmuForm.value.obchodneSidloVirtuOrNormal == 'vlastnePrenajate'){
    newCompanyData.updated_company.sidlo = {
    ...najdiFirmuForm.value.newHqAddress, // this will spread the properties of newHqAddress into sidlo
    ...najdiFirmuForm.value.headquarterInfo // this will spread the properties of headquarterInfo into sidlo
    }
  }
  else {
    newCompanyData.updated_company.sidlo = najdiFirmuForm.value.selectedVhqFromStore
  }
  // to do predmet cinnosti
  newCompanyData.updated_company.spolocnici.push(...najdiFirmuForm.value.newSpolocnikList)
  newCompanyData.updated_company.spolocnici.push(...najdiFirmuForm.value.newlyAddedSpolocnikList)
  newCompanyData.updated_company.konatelia.push(...najdiFirmuForm.value.newKonateliaList)
  newCompanyData.updated_company.konatelia.push(...najdiFirmuForm.value.newlyAddedKonatelList)
  newCompanyData.updated_company.konanie_menom_spolocnosti = najdiFirmuForm.value.sposob_konania_konatelov + " " + najdiFirmuForm.value?.sposob_konania_konatelov_ine
  newCompanyData.sharesTransfers = najdiFirmuForm.value.newSharesTransfersList
  newCompanyData.updated_company.removed_subject_business = najdiFirmuForm.value.sbj_old_removed
  newCompanyData.updated_company.predmet_cinnosti = najdiFirmuForm.value.subjects_of_business_new.map(element => {
    return element.title as string
  });
  newCompanyData.updated_company.zakladne_imanie.push(...najdiFirmuForm.value.newZakladneImanie);
  newCompanyData.updated_company.prokurista.push(...najdiFirmuForm.value.newProkuristaList);
  newCompanyData.updated_company.ine_zmeny = najdiFirmuForm.value.ine_zmeny
  try {
    const res = await store.dispatch('addCompanyUpdateOrder', newCompanyData);
    console.log("Adding companyUpdate: " + JSON.stringify(res));
    return res;
  } catch (err: any) {
    console.log(err.response.data);
  }
}

const newSustmiApp = async (formdata: any, node: any) => {

  try {    
    let userId: number;
    if(!userIdFromStore.value){
      userId = await registerUserAndReturnUserId(userRegisterForm.value.user);
    } else {
      userId = userIdFromStore.value
    }

    let invoiceProfileId: number;
    if(invoiceDataForm.value.createNewInvoiceProfile){
      let invoiceAddressRes: any;
      if(!invoiceDataForm.value.orderingAsCompany){
        invoiceAddressRes = await registerInvoiceAddress(invoiceDataForm.value.invoiceAddress)
      }
      else if (invoiceDataForm.value.orderingAsCompany) {
        invoiceAddressRes = await registerInvoiceAddress(invoiceDataForm.value.invoiceAddress)
      }
      console.log("Invoice AddressId is: ", invoiceAddressRes.address_id)
      const response = await addInvoiceProfile(invoiceAddressRes.address_id, userId)
      invoiceProfileId = response.id
    }
    else {
      invoiceProfileId = invoiceDataForm.value.invoiceProfileId
    }
    console.log("Invoice profile ID is: ", invoiceProfileId)
    const orderRes = await addOrder(userId, invoiceProfileId)
    await addUpdatedCompany(orderRes.id, userId);
        
    if(orderRes.id){

      console.log("SUPER! Objednávka bola spracovaná.")

      await router.push({
          name:"Thanks You New Order",
          params: {
            orderId: orderRes.id
            }
      })

      }  
      else {
      errorMsg.value = 'Ups, niečo sa pokazilo. Objednávka nebola spracovaná, prosím skontrolujte vyplnený formuár alebo platbu.'
      }
      node.clearErrors()
            
  } catch (err: any) {
    errorMsg.value = err
    node.setErrors(err.formErrors, err.fieldErrors);
    console.error(err);
  }
}
</script>