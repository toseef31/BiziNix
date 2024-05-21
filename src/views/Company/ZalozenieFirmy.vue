<template>
  <div class="bg-no-repeat bg-cover" style="background-image:linear-gradient(0deg, rgba(36,36,39,0.9332107843137255) 40%, rgba(0,0,0,0.29735644257703087) 100%), url('../src/assets/zalozenie-fimy-bg.png') ">
    <div class="max-w-7xl flex flex-col md:flex-row min-h-[80vh] items-center mx-auto py-20 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
      <div class="max-w-full">
        <h1 class="!leading-tight text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Založenie s.r.o. za 199 €</h1>
        <p class="mt-8 mb-8 text-2xl text-white">Zaregistrujte alebo upravte svoju spoločnosť rýchlo, z domu a za najmenšie ceny na trhu.<br>Cena obsahuje aj štátne poplatky v hodnote 150€.</p>
        <div class="mt-8 text-white">
          <div class="font-bold text-4xl">Čaka nás</div>
          <div class="mt-2">
            <ul class="list-disc list-inside">
              <li>Vyplnenie formulárov</li>
              <li>Platba</li>
              <li>Podpísanie a overenie dokumentov</li>
              <li>Registrácia spoločnosti</li>
              <li>Podnikanie</li>
            </ul>
          </div>
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
      <div>
        <FormKit type="form"
          :actions="false"
          id="zalFirmyMultiStepForm"
          @submit-invalid="showErrors"
          #default="{ value, state: { valid }  }"
          @submit="newSustmiApp"
        >
        <div v-if="messages.length" class="mb-8 p-4 border rounded-md border-red-400 border-solid">
          <ul class="list-disc list-inside validation-errors">
            <li v-for="message in messages">{{ message }}</li>
          </ul>
        </div>
          <FormKit type="multi-step" name="zalFirmyMultiStepPlugin" id="multiStepPluginFirma"
            :allow-incomplete="true"              
            use-local-storage="false"
            tab-style="tab"
          >
            <FormKit type="step" name="predmetPodnikania" label="Predmet podnikanie" next-label="Pokračovať">
              <predmetPodnikaniaFormStep ref="subjects_of_business" />
            </FormKit>

            <FormKit type="step" name="obchodneSidlo" label="Obchodné sídlo" previous-label="Naspäť">
              <obchodneSidloFormStep ref="sidloCompanyAddress" />
              <template #stepNext="{ handlers, node }">
                <!-- incrementStep returns a callable function -->
                <FormKit
                  type="button"
                  :disabled="isNextButtonDisabledHq"
                  @click="handlers.incrementStep(1)()"
                  label="Pokračovať"
                  data-next="true"
                />
              </template>
            </FormKit>

            <FormKit type="step" name="udajeSpolocnosti" label="Údaje o spoločnosti" id="udajeSpolocnostiStep" previous-label="Naspäť">
              <udajeSpolocnostiFormStepRepeater ref="companyMembersAndDetails" />
              <template #stepNext="{ handlers, node }">
                <!-- incrementStep returns a callable function -->
                <FormKit
                  type="button"
                  :disabled="isNextButtonDisabled"
                  @click="handlers.incrementStep(1)()"
                  label="Pokračovať"
                  data-next="true"
                />
              </template>
            </FormKit>

            <FormKit type="step" name="userRegister" label="Užívateľský účet" next-label="Pokračovať">
              <userRegisterFormStep ref="userRegisterForm" />
            </FormKit>

            <FormKit type="step" name="fakturacneUdaje" label="Fakturačné údaje" previous-label="Naspäť">
              <fakturacneUdajeFormStep ref="invoiceData" />
              <template #stepNext>
                <FormKit type="submit" label="Objednať s povinnosťou platby" />                
              </template>
            </FormKit>
          </FormKit>
          <div class="p-4 mb-4 text-white border rounded-md border-bizinix-border border-solid">
            <p>Poplatok za založenie firmy {{ order.items[0].price }} €.</p>
            <p>Poplatok za predmety podnikania {{ subjects_of_business?.finalPriceForBusinessCategori ?? 0 }} €.</p>
            <p v-if="sidloCompanyAddress?.obchodneSidloVirtuOrNormal === 'virtualne'">Poplatok za virtuálne sídlo {{ selectedVhqPackageFromStore.price * 12 ?? 0 }} € rok.</p>
            <p>Celkom k platbe <b>{{ totalForPay }} €</b>. Počet vybratých predmetov podnikania <b>{{ subjects_of_business?.subjects_of_business.length }}</b>.</p>
          </div>
          <!-- <details>
            <pre>{{ value }}</pre>
          </details>     -->
        </FormKit>
        <!-- <div>
          <button @click="logujData">New log Submit</button>
          <p>Selected Vhq:</p>
          <p>{{ selectedVhqFromStore }}</p>
          <p>Selected VhqPacage:</p>
          <p>{{ selectedVhqPackageFromStore }}</p>
        </div> -->
      </div> 
    </div>
  </div>
</template>

<script setup lang="ts">

import store from "@/store";
import { ref, onBeforeMount, onMounted, computed, toRef } from "vue";
import router from "@/router";
import type User from "@/types/User";
import predmetPodnikaniaFormStep from "@/components/forms/predmetPodnikaniaFormStep.vue";
import podnikatelskeUdajeFormStep from "@/components/forms/podnikatelskeUdajeFormStep.vue";
import obchodneSidloFormStep from "@/components/forms/obchodneSidloFormStep.vue";
//import udajeSpolocnostiFormStep from "@/components/forms/udajeSpolocnostiFormStep.vue";
import udajeSpolocnostiFormStepRepeater from "@/components/forms/udajeSpolocnostiFormStepRepeater.vue";
import userRegisterFormStep from "@/components/forms/UserRegisterFormStep.vue";
import fakturacneUdajeFormStep from "@/components/forms/fakturacneUdajeFormStep.vue";
import type Company from "@/types/Company";
import type Address from "@/types/Address";
import type Headquarters from "@/types/Headquarters";
import { getValidationMessages } from '@formkit/validation';
import { getNode } from '@formkit/core';
import { toast } from "vue3-toastify";

const userIdFromStore = computed(() => { return store.getters.getUserId })
const selectedVhqFromStore = computed(() => store.getters.getSelectedVhq)
const selectedVhqPackageFromStore = computed(() => store.getters.getSelectedVhqPackage)
let errorMsg = ref('');
let errorMsgHq = ref('');
let errorMsgCompany = ref('');
let sucessMsg = ref('');
let subjects_of_business = ref<InstanceType<typeof predmetPodnikaniaFormStep>>(null as any)
let sidloCompanyAddress = ref<InstanceType<typeof obchodneSidloFormStep>>(null as any)
//let companyMembersAndDetails = ref<InstanceType<typeof udajeSpolocnostiFormStep>>(null as any);
let companyMembersAndDetails = ref<InstanceType<typeof udajeSpolocnostiFormStepRepeater>>(null as any);
let userRegisterForm = ref<InstanceType<typeof userRegisterFormStep>>(null as any)
let invoiceData = ref<InstanceType<typeof fakturacneUdajeFormStep>>(null as any)
let user = ref<User>();
let companyOrZivnostModel = ref<Company>({} as any);

const isNextButtonDisabled = computed(() => {
  if(companyMembersAndDetails.value?.countOfKonatelFromZakladatelia >= 1
    || companyMembersAndDetails.value?.countOfKonatelia >= 1
  ){
    return false
  }
  else {
    return true
  }
})

const isNextButtonDisabledHq = computed(() => {
  if(sidloCompanyAddress.value?.obchodneSidloVirtuOrNormal === 'virtualne'){
    if(!selectedVhqFromStore.value.name) {
      return true
    }
  } else {
    return false
  }
})

const messages = ref([])

let order = ref({
  payment_date: '' as any,
  payment_method: '',
  order_type: 'company',
  description: '',
  amount: 0, // final cena s dph
  amount_vat: 0, // vat je čisto len dph
  is_paid: false,
  user_id: 0,
  company_id: 0,
  is_tos_accepted: true,
  is_advocate_requested: true,
  items: [
    {
      description: "Založenie firmy",
      price: 199, // finalna cena za polozku s dph
      price_vat: 199 * 0.2 // toto je len dph
    }
  ],
  fakturacne_udaje_id: 0
})

let totalForPay = computed(() => subjects_of_business.value?.finalPriceForBusinessCategori + order.value.items[0].price + ((selectedVhqPackageFromStore.value?.price ?? 0) * 12 ))

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
  console.log('Subject of business',companyOrZivnostModel.value.subjects_of_business)
  console.log(user.value)
  console.log(companyOrZivnostModel.value)
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

 async function registerHqAddress(): Promise<any> {

  try {    
    let hqAddress: Address = {
      street: "",
      street_number: "",
      street_number2: "",
      city: "",
      psc: "",
      country: ""
    };
    if(sidloCompanyAddress.value.obchodneSidloVirtuOrNormal === 'virtualne'){
      hqAddress.street = selectedVhqFromStore.value.address.street
      hqAddress.street_number = selectedVhqFromStore.value.address.street_number
      hqAddress.street_number2 = selectedVhqFromStore.value.address.street_number2
      hqAddress.city = selectedVhqFromStore.value.address.city
      hqAddress.psc = selectedVhqFromStore.value.address.psc
      hqAddress.country = selectedVhqFromStore.value.address.country
      // probaly add updated_at and updated_at?
    } else {
      hqAddress = sidloCompanyAddress.value.hqAddress;
    }

    const res = await store.dispatch('registerAddress', hqAddress);
    //console.log("Registering HQ address: " + JSON.stringify(res));
    return res;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.errors) {
      errorMsg.value = JSON.stringify(err.response.data.errors);
    } else {
      errorMsg.value = 'Nastala chyba pri registrácii HQ adresy.';
    }
  }
}


async function registerUserAndReturnUserId(user: User): Promise<any> {
  try {
    const res = await store.dispatch('registerUser', user);
    sucessMsg.value = "E-mail na aktiváciu účtu bol odoslaný. Prosím skontrolujte si svoju schránkú, alebo priečinok nevyžiadanej pošty.";
    //console.log("Registering user: " + JSON.stringify(res));
    return res.user_id;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.errors) {
      errorMsg.value = JSON.stringify(err.response.data.errors);
    } else {
      errorMsg.value = 'Nastala chyba pri registrácii uživateľa.';
    }
  }
}

async function addHeadquarter(hqAddressId: any): Promise<any> {

  
  const hqInfo = sidloCompanyAddress.value.headquarterInfo;
  const companyOrZivnostModel = companyMembersAndDetails.value.companyOrZivnostModel;
  
  let headquarterData = {
    address_id: hqAddressId,
    name: "Sidlo pre spoločnosť " + companyOrZivnostModel.name,
    description: "Sidlo pre spoločnosť " + companyOrZivnostModel.name,
    owner_name: hqInfo.owner_name,
    headquarters_type: hqInfo.headquarters_type,
    forwarding: hqInfo.forwarding,
    registry: hqInfo.registry,
    scanning: hqInfo.scanning,
    shredding: hqInfo.shredding,
    img: hqInfo.img,
    is_virtual: hqInfo.is_virtual,
    price: hqInfo.price
  } as Headquarters;
  
  // if virtual only
  if(sidloCompanyAddress.value.obchodneSidloVirtuOrNormal === 'virtualne'){
    headquarterData.name = selectedVhqFromStore.value.name
    headquarterData.owner_name = selectedVhqFromStore.value.name
    headquarterData.headquarters_type = 3
    if(selectedVhqPackageFromStore.value.name == 'Mini'){
      headquarterData.registry = true
    }
    else if(selectedVhqPackageFromStore.value.name != 'Mini'){
      headquarterData.forwarding = true
      headquarterData.registry = true
      headquarterData.scanning = true
      headquarterData.shredding = true
    }
    headquarterData.img = selectedVhqFromStore.value.img
    headquarterData.is_virtual = true
    headquarterData.price = selectedVhqPackageFromStore.value.price * 12 // ročna platba za balík
    // base price only for HQ , other price for pcg to order.items?
  }

  try {
    const res = await store.dispatch('addHeadquarter', headquarterData);
    //console.log("Adding HQ: " + JSON.stringify(res));
    return res.headquarters;
  } catch (err: any) {
    console.log(err.response?.data?.errors);
    errorMsg.value = JSON.stringify(err.response?.data?.errors);
  }
}

async function addCompany(userId: any, hqId: any): Promise<any> {

  const companyOrZivnostModelData = {
    name: companyMembersAndDetails.value.companyOrZivnostModel.name + ' ' + companyMembersAndDetails.value.pravnaForma,
    type: companyMembersAndDetails.value.companyOrZivnostModel.type,
    status: companyMembersAndDetails.value.companyOrZivnostModel.status,
    sub_status: companyMembersAndDetails.value.companyOrZivnostModel.sub_status,
    owner: userId,
    headquarters_id: hqId,
    doc_sncounter_id: 1,
    doc_template_id: 1,
    imanie_vyska: companyMembersAndDetails.value.companyOrZivnostModel.imanie_vyska,
    imanie_splatene: companyMembersAndDetails.value.companyOrZivnostModel.imanie_splatene,
    is_dph: companyMembersAndDetails.value.companyOrZivnostModel.is_dph,
    konecny_uzivatelia_vyhod: companyMembersAndDetails.value.companyOrZivnostModel.konecny_uzivatelia_vyhod,
    sposob_konania_konatelov: companyMembersAndDetails.value.companyOrZivnostModel.sposob_konania_konatelov,
    subjects_of_business: subjects_of_business.value.subjects_of_business,
    note: companyMembersAndDetails.value.companyOrZivnostModel.note,
    kuv_details: companyMembersAndDetails.value.ine_osoby,// konecny uzivatelia vyhod
    skk_details: companyMembersAndDetails.value.note_sposob_konania_ine,// sposob konania konatelov
    sidlo_typ_balika: sidloCompanyAddress.value.obchodneSidloVirtuOrNormal === 'virtualne'? selectedVhqPackageFromStore.value.name : null
  };
  
  try {
    const res = await store.dispatch('addCompany', companyOrZivnostModelData);
    //console.log("Adding company: " + JSON.stringify(res));
    return res;
  } catch (err) {
    toast.error('Error: ' + err);
  }
}

async function addMultipleCompanyMembersSpolocnici(companyId: any, companyName: any): Promise<any> {

  companyMembersAndDetails.value.zakladateliaSpolocniciList.forEach((item, index: number) => {
    companyMembersAndDetails.value.zakladateliaSpolocniciList[index].company_id = companyId
    if(companyMembersAndDetails.value.zakladateliaSpolocniciList[index].typ_zakladatela == 1){    
      companyMembersAndDetails.value.zakladateliaSpolocniciList[index].obchodne_meno = companyName
    }
    companyMembersAndDetails.value.zakladateliaSpolocniciList[index].je_zakladatel = true
  })

  let zakladatelia = ref({
    members: companyMembersAndDetails.value.zakladateliaSpolocniciList
  })

  try {
    const res = await store.dispatch('addMultipleCompanyMembers', zakladatelia.value)
    //console.log("Adding Multiple Company Members Spolocnici: " + JSON.stringify(res))
    return res
  } catch(err) {
    toast.error('Error: ' + err)
  }
}

async function addMultipleCompanyMembersKonatelia(companyId: any, companyName: any): Promise<any> {

  companyMembersAndDetails.value.konateliaList.forEach((item, index: number) => {
    companyMembersAndDetails.value.konateliaList[index].company_id = companyId
    companyMembersAndDetails.value.konateliaList[index].obchodne_meno = companyName
    companyMembersAndDetails.value.konateliaList[index].je_konatel = true
  })

  let konatelia = ref({
    members: companyMembersAndDetails.value.konateliaList
  })

  try {
    const res = await store.dispatch('addMultipleCompanyMembers', konatelia.value)
    //console.log("Adding Multiple Company Members Konatelia: " + JSON.stringify(res))
    return res
  } catch (err: any){
    toast.error('Error: ' + err)
  }

}

async function registerInvoiceAddress(invoiceAddress: Address) {
  try {
    const res = await store.dispatch('registerAddress', invoiceAddress);
    //console.log("Registering invoice address: " + JSON.stringify(res));
    return res;
  } catch (err: any) {
    errorMsg.value = JSON.stringify(err.response.data.errors);
  }
}

async function addInvoiceProfile(invoiceAddressId, userId) {
  
  let faktProfil = {
    first_name: invoiceData.value.fakturacne_udaje.first_name,
    last_name: invoiceData.value.fakturacne_udaje.last_name,
    name: invoiceData.value.fakturacne_udaje.name,
    ico: invoiceData.value.fakturacne_udaje.ico,
    dic: invoiceData.value.fakturacne_udaje.dic,
    ic_dph: invoiceData.value.fakturacne_udaje.ic_dph,
    address_id: invoiceAddressId,
    user_id: userId
  }

    return store.dispatch('addInvoiceProfile', faktProfil)
    .then((res) => {
      //console.log("Adding invoice profile: ", JSON.stringify(res))
      return res
    })
    .catch((error: any) => {
      errorMsg.value = JSON.stringify(error.response.data.errors)
    })
}

async function addOrder(companyId: any, userId: any, invoiceAddressId?: any): Promise<any> {
  order.value.payment_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  order.value.payment_method = invoiceData.value.paymentOptions
  order.value.company_id = companyId
  order.value.user_id = userId
  order.value.description = 'Objednávka záloženie firmy: ' + companyId
  if(sidloCompanyAddress.value.obchodneSidloVirtuOrNormal === 'virtualne'){
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
    description: 'Počet predmetov podnikania: ' + subjects_of_business.value.subjects_of_business.length,
    price: subjects_of_business.value?.finalPriceForBusinessCategori,
    price_vat: (subjects_of_business.value?.finalPriceForBusinessCategori) * 0.2
  })

  // subjects_of_business.value.subjects_of_business.forEach(element => {
  //   order.value.items.push({
  //     description: element.title as string,
  //     price: element.price as number,
  //     price_vat: (element.price as number) * 0.2
  //   })
  // });

  order.value.fakturacne_udaje_id = invoiceAddressId

  order.value.amount = totalForPay.value
  order.value.amount_vat = totalForPay.value * 0.2

  try {
    const res = await store.dispatch('addOrder', order.value);
    //console.log("Adding order: " + JSON.stringify(res));
    return res.order;
  } catch (err: any) {
    console.log(err.response.data);
  }

}

const newSustmiApp = async (formdata: any, node: any) => {

  try {    
    let userId = null as unknown as number;
    if(!userIdFromStore.value){
      userId = await registerUserAndReturnUserId(userRegisterForm.value.user);
    } else {
      userId = userIdFromStore.value
    }
    const hqAddressRes = await registerHqAddress();

    const regHqRes = await addHeadquarter(hqAddressRes.address_id);

    const companyRes = await addCompany(userId, regHqRes.id);
    
    await addMultipleCompanyMembersSpolocnici(companyRes.data.company.id, companyRes.data.company.name)
    await addMultipleCompanyMembersKonatelia(companyRes.data.company.id, companyRes.data.company.name)

    let invoiceProfileId = null as unknown as number;
    if(invoiceData.value.createNewInvoiceProfile){
      let invoiceAddressRes: any;
      if(!invoiceData.value.orderingAsCompany){
        invoiceAddressRes = await registerInvoiceAddress(invoiceData.value.invoiceAddress)
      }
      else if (invoiceData.value.orderingAsCompany) {
        invoiceAddressRes = await registerInvoiceAddress(invoiceData.value.invoiceAddress)
      }
      //console.log("Invoice AddressId is: ", invoiceAddressRes.address_id)
      const response = await addInvoiceProfile(invoiceAddressRes.address_id, userId)
      invoiceProfileId = response.id
    }
    else {
      invoiceProfileId = invoiceData.value.invoiceProfileId
    }

    const orderRes = await addOrder(companyRes.data.company.id, userId, invoiceProfileId)
    
    if(orderRes.id){

      //console.log("SUPER! Objednávka bola spracovaná.")

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