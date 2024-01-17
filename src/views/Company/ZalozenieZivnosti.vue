<template>
  <div class="bg-no-repeat bg-cover" style="background-image:linear-gradient(0deg, rgba(36,36,39,0.9332107843137255) 40%, rgba(0,0,0,0.29735644257703087) 100%), url('../src/assets/zalozenie-fimy-bg.png') ">
    <div class="max-w-7xl flex flex-col md:flex-row min-h-[80vh] items-center mx-auto py-20 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
      <div class="max-w-full">
        <h1 class="!leading-tight text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Jednoduché založenie<br>živnosti za 49 €</h1>
        <p class="mt-8 mb-8 text-2xl text-white">Zaregistrujte alebo upravte svoju živnost rýchlo, z domu a za najmenšie ceny na trhu. Cena obsahuje aj štátne poplatky v hodnote 49€.</p>
        <div class="mt-8 text-white">
          <div class="font-bold text-4xl">Čaka nás</div>
          <div class="mt-2">
            <ul class="list-disc list-inside">
              <li>Predmet podnikania</li>
              <li>Osobné údaje</li>
              <li>Dokončenie objednávky</li>
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
      <h2 class="text-center mb-8 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">Poďme na to</h2>

      <!--FORM -->
      <div>
        <FormKit type="form"
          :actions="false"
          id="zalZivnostiMultiStepForm"
          @submit-invalid="showErrors"
          #default="{ value, state: { valid } }"
          @submit="newSustmiApp"
        >
        <div v-if="messages.length" class="mb-8 p-4 border rounded-md border-red-400 border-solid">
          <ul class="list-disc list-inside validation-errors">
            <li v-for="message in messages">{{ message }}</li>
          </ul>
        </div>
          <FormKit type="multi-step" name="zalZivnostiMultiStepPlugin" id="multiStepPluginZivnost"
            tab-style="tab"
            :allow-incomplete="true"              
            use-local-storage="false"
          >
            <FormKit type="step" name="predmetPodnikania" label="Predmet podnikanie" next-label="Pokračovať">
              <predmetPodnikaniaFormStep ref="subjects_of_business" />
            </FormKit>

            <FormKit type="step" name="podnikatelskeUdaje" label="Podnikateľské údaje" previous-label="Naspäť">
              <podnikatelskeUdajeFormStep ref="businessInfo" />
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
            
            <FormKit type="step" name="userRegister" label="Užívateľský účet" next-label="Pokračovať">
              <userRegisterFormStep ref="userRegisterForm" />
            </FormKit>

            <FormKit type="step" name="fakturacneUdaje" label="Fakturačné údaje" previous-label="Naspäť">
              <fakturacneUdajeFormStep ref="invoiceData" />
            </FormKit>
          </FormKit>

          <div class="p-4 mb-4  bg-gray-900 text-white border rounded-md border-bizinix-border border-solid">
              <p>Poplatok za založenie firmy {{ order.items[0].price }} €.</p>
              <p>Poplatok za predmety podnikania {{ subjects_of_business?.finalPriceForBusinessCategori ?? 0 }} €.</p>
              <p v-if="businessInfo?.placeOfBusinness == 'virtualne'">Poplatok za virtuálne sídlo {{ selectedVhqPackageFromStore.price * 12 ?? 0 }} € rok.</p>
              <p>Celkom k platbe <b>{{ totalForPay }} €</b>. Počet vybratých predmetov podnikania <b>{{ subjects_of_business?.subjects_of_business.length }}</b>.</p>
          </div>
          <FormKit
            type="checkbox"
            label="Všeobecné obchodné podmienky"
            validation="accepted"
            validation-visibility="dirty"
          >
            <template #label="context">
              <span :class="context.classes.label">Súhlasím so <a href="/obchodne-podmienky" target="_blank">všeobecnými podmienkami poskytovania služby</a>.</span>
            </template>
          </FormKit>
          <FormKit type="submit" label="Objednať s povinnosťou platby" />
          <details>
            <pre>{{ value }}</pre>
          </details>


        </FormKit>
        <button @click="newLogSubmit">New log Submit</button>
      </div>

      <p>Selected Vhq:</p>
      <p>{{ selectedVhqFromStore }}</p>
      <p>Selected VhqPacage:</p>
      <p>{{ selectedVhqPackageFromStore }}</p>

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

    </div>
  </div>
</template>

<script setup lang="ts">

import store from "@/store";
import { ref, computed, onMounted } from "vue";
import router from "@/router";
import type User from "@/types/User";
import { toast } from 'vue3-toastify';
import predmetPodnikaniaFormStep from "@/components/forms/predmetPodnikaniaFormStep.vue";
import userRegisterFormStep from "@/components/forms/UserRegisterFormStep.vue";
import podnikatelskeUdajeFormStep from "@/components/forms/podnikatelskeUdajeFormStep.vue";
import fakturacneUdajeFormStep from "@/components/forms/fakturacneUdajeFormStep.vue";
import type Address from "@/types/Address";
import type Order from "@/types/Order";
import type Company from "@/types/Company";
import { getValidationMessages } from '@formkit/validation'
import { getNode } from '@formkit/core'
import type CompanyMemberSpolocnik from "@/types/CompanyMemberSpolocnik";

let errorMsg = ref('');
let errorMsgHq = ref('');
let errorMsgCompany = ref('');
let sucessMsg = ref('');

let subjects_of_business = ref<InstanceType<typeof predmetPodnikaniaFormStep>>(null as any)
let userRegisterForm = ref<InstanceType<typeof userRegisterFormStep>>(null as any)
let businessInfo = ref<InstanceType<typeof podnikatelskeUdajeFormStep>>(null as any)
let invoiceData = ref<InstanceType<typeof fakturacneUdajeFormStep>>(null as any);

let companyOrZivnostModel = ref<Company>({} as any);

let totalForPay = computed(() => subjects_of_business.value?.finalPriceForBusinessCategori + order.value.items[0].price + ((selectedVhqPackageFromStore.value?.price ?? 0) * 12 ))

onMounted(() => {
  const form = getNode('miesto');
  console.log(form?.value);
})

const messages = ref([])

function showErrors(node: any) {
  messages.value = []
  const validations = getValidationMessages(node)
  validations.forEach((inputMessages: any) => {
    messages.value = messages.value.concat(
      inputMessages.map((message: any) => message.value)
    )
  })
}

const isNextButtonDisabledHq = computed(() => {
  if(businessInfo.value?.placeOfBusinness == 'virtualne'){
    if(!selectedVhqFromStore.value.name) {
      return true
    }
  } else {
    return false
  }
})

function newLogSubmit(){

  console.log("Invoice Data");
  console.log(invoiceData.value.orderingAsCompany)
  console.log("Subject of business from defined object");
  console.log(companyOrZivnostModel.value.subjects_of_business);
  console.log("Business Info");
  console.log(businessInfo.value.companyMemberAddress);
  console.log("SubjectOfbusinesss");
  console.log(subjects_of_business.value?.subjects_of_business);
}

let headquarter = ref({
  name: '',
  description: 'živnosť',
  headquarters_type: 3, // 1 Nebytový priestor, 2 Byt, 3 iná budova, 4 rod dom, 5 Samost stoj garaž
  owner_name: '',
  price: 0,
  registry: false,
  forwarding: false,
  scanning: false,
  shredding: false,
  is_virtual: false,
  img: '',
  address_id: 0
})

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
  items: [{
      description: "Založenie živnosti",
      price: 12, // finalna cena za polozku s dph
      price_vat: 2 // toto je len dph
    }],
  fakturacne_udaje_id: 0
})

const userIdFromStore = computed(() => { return store.getters.getUserId })
const selectedVhqFromStore = computed(() => store.getters.getSelectedVhq)
const selectedVhqPackageFromStore = computed(() => store.getters.getSelectedVhqPackage)

/* Submiting form and Api calls */
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

async function registerHqAddress(): Promise<any>  {

  let hqAddress: Address = {
      street: "",
      street_number: "",
      street_number2: "",
      city: "",
      psc: "",
      country: ""
  };

  if(businessInfo.value.placeOfBusinness == 'virtualne'){
      hqAddress.street = selectedVhqFromStore.value.address.street
      hqAddress.street_number = selectedVhqFromStore.value.address.street_number
      hqAddress.street_number2 = selectedVhqFromStore.value.address.street_number2
      hqAddress.city = selectedVhqFromStore.value.address.city
      hqAddress.psc = selectedVhqFromStore.value.address.psc
      hqAddress.country = selectedVhqFromStore.value.address.country
  } else if(businessInfo.value.placeOfBusinness == 'Totožné') {
    hqAddress = businessInfo.value.companyMemberAddress
  } else {
    hqAddress = businessInfo.value.hqAddress
  }
  
  return store.dispatch('registerAddress', hqAddress)
    .then((res: any) => {
      console.log("Registering hq address: " + JSON.stringify(res))
      return res
    })
    .catch((err: any) => {
      errorMsg.value = JSON.stringify(err.response.data.errors) // response data is from store actions
    })
}

async function addHeadquarter(user: User, hqAddressId: any) {

  headquarter.value.address_id = hqAddressId
  if(businessInfo.value.placeOfBusinness == 'virtualne'){
    headquarter.value.name = selectedVhqFromStore.value.name
    headquarter.value.owner_name = selectedVhqFromStore.value.name
    headquarter.value.headquarters_type = 3
    if(selectedVhqPackageFromStore.value.name == 'Mini'){
      headquarter.value.registry = true
    }
    else if(selectedVhqPackageFromStore.value.name != 'Mini'){
      headquarter.value.forwarding = true
      headquarter.value.registry = true
      headquarter.value.scanning = true
      headquarter.value.shredding = true
    }
    headquarter.value.img = selectedVhqFromStore.value.img
    headquarter.value.is_virtual = true
    headquarter.value.price = selectedVhqPackageFromStore.value.price * 12 // ročna platba za balík
  }
  else if(businessInfo.value.placeOfBusinness == 'Totožné'){
    headquarter.value.owner_name = user.first_name + " " + user.last_name
  }
  else {
    headquarter.value.owner_name = "Treba doplniť z oprávnenie."
  }
  headquarter.value.name = user.first_name + " " + user.last_name + " " + businessInfo.value.companyData.name
  headquarter.value.description = "Miesto podnikania k živnosti " + user.first_name + " " + user.last_name

  return store.dispatch('addHeadquarter', headquarter.value)
  .then((res: any) => {
    console.log("Adding hq: " + JSON.stringify(res))
    return res.headquarters
  })
  .catch((err: any) => {
    console.log(err.response.data.errors)
    errorMsg.value = JSON.stringify(err.response.data.errors);
  })
}

async function addCompany(user: User, userId: any, hqId: any) {

  companyOrZivnostModel.value.type = 2 // 2 is zivnost 1 is sro
  companyOrZivnostModel.value.status = 2
  companyOrZivnostModel.value.owner = userId
  companyOrZivnostModel.value.headquarters_id = hqId
  companyOrZivnostModel.value.is_dph = false
  companyOrZivnostModel.value.is_dph = false
  companyOrZivnostModel.value.subjects_of_business = subjects_of_business.value.subjects_of_business
  companyOrZivnostModel.value.name = user.first_name + " " + user.last_name + " " + businessInfo.value.companyData.name
  companyOrZivnostModel.value.zaciatok_opravnenia = businessInfo.value.companyData.zaciatok_opravnenia

  if(headquarter.value.is_virtual) {
    companyOrZivnostModel.value.sidlo_typ_balika = selectedVhqPackageFromStore.value.name;
  }

  return store.dispatch('addCompany', companyOrZivnostModel.value)
  .then((res) => {
    console.log("Adding company: " + JSON.stringify(res))
    console.log("Company from Res " + JSON.stringify(res))
    return res
  }).catch( err => {
    toast.error(err)
  })

}

async function addCompanyMember(companyId: number){

  let member: CompanyMemberSpolocnik = {
    company_id: companyId,
    first_name: businessInfo.value.companyMemberZivnost.first_name,
    last_name: businessInfo.value.companyMemberZivnost.last_name,
    title_before: businessInfo.value.companyMemberZivnost.title_before,
    title_after: businessInfo.value.companyMemberZivnost.title_after,
    gender: businessInfo.value.companyMemberZivnost.gender,
    rodne_cislo: businessInfo.value.companyMemberZivnost.rodne_cislo,
    date_of_birth: businessInfo.value.companyMemberZivnost.date_of_birth,
    street: businessInfo.value.companyMemberAddress.street,
    street_number: businessInfo.value.companyMemberAddress.street_number,
    street_number2: businessInfo.value.companyMemberAddress.street_number2,
    country: businessInfo.value.companyMemberAddress.country,
    city: businessInfo.value.companyMemberAddress.city,
    psc: businessInfo.value.companyMemberAddress.psc,
    nationality: businessInfo.value.nationality,
    vyska_vkladu: 0,
    podiel_v_spolocnosti: 0,
    rozsah_splatenia_vkladu: 0,
    obchodne_meno: businessInfo.value.companyMemberZivnost.first_name + " " + businessInfo.value.companyMemberZivnost.last_name + " " + businessInfo.value.companyData.name,
    je_zakladatel: true,
    je_spravca_vkladu: false,
    je_konatel: false,
    typ_dokladu_totoznosti: 'živnosť',
    cislo_dokladu_totoznosti: 'živnosť',
    typ_zakladatela: 1
  }

  return store.dispatch('addSingleCompanyMember', member)
  .then((res) => {
    console.log("Adding single company member: " + JSON.stringify(res))
    return res
  }).catch( err => {
    toast.error(err)
  })

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
    console.log("Adding invoice profile: ", JSON.stringify(res))
    return res
  })
  .catch((error: any) => {
    errorMsg.value = JSON.stringify(error.response.data.errors)
  })
}

async function addOrder(companyId: any, userId: any, invoiceProfileId?: any) {

  order.value.payment_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  order.value.payment_method = invoiceData.value.paymentOptions
  order.value.company_id = companyId
  order.value.user_id = userId
  order.value.description = "Objednávka založenie živnosti: " + companyId    
  if(businessInfo.value.placeOfBusinness == 'virtualne'){
    order.value.items.push({
      description: 'Virtuálne sídlo: ' + selectedVhqFromStore.value.name + ' na rok',
      price: 0,
      price_vat: 0 * 0.2,
    })
    order.value.items.push({
      description: 'Virtual balík: ' + selectedVhqPackageFromStore.value.name + ' na rok',
      price: selectedVhqPackageFromStore.value.price * 12,
      price_vat: (selectedVhqPackageFromStore.value.price * 12) * 0.2,
    })
  }
  
  companyOrZivnostModel.value.subjects_of_business.forEach(element => {
    order.value.items.push({
      description: element.title as string,
      price: element.price as number,
      price_vat: (element.price as number) * 0.2
    })
  });

  order.value.fakturacne_udaje_id = invoiceProfileId

  order.value.amount = totalForPay.value
  order.value.amount_vat = totalForPay.value * 0.2

  return store.dispatch('addOrder', order.value)
  .then((res) => {
    console.log("Adding order: " + JSON.stringify(res))
    return res.order
  })
  .catch( err => {
    console.log(err.response.data )
  })
  
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

    const regHqRes = await addHeadquarter(userRegisterForm.value.user, hqAddressRes.address_id);
    
    const companyRes = await addCompany(userRegisterForm.value.user, userId, regHqRes.id);
    
    await addCompanyMember(companyRes.company.id);

    let invoiceProfileId = null as unknown as number;
    if(invoiceData.value.createNewInvoiceProfile){
      let invoiceAddressRes: any;
      if(!invoiceData.value.orderingAsCompany){
        invoiceAddressRes = await registerInvoiceAddress(invoiceData.value.invoiceAddress)
      }
      else if (invoiceData.value.orderingAsCompany) {
        invoiceAddressRes = await registerInvoiceAddress(invoiceData.value.invoiceAddress)
      }
      console.log("Invoice AddressId is: ", invoiceAddressRes.address_id)
      const response = await addInvoiceProfile(invoiceAddressRes.address_id, userId)
      invoiceProfileId = response.id
    }
    else {
      invoiceProfileId = invoiceData.value.invoiceProfileId
    }

    const orderRes = await addOrder(companyRes.company.id, userId, invoiceProfileId)

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

  } catch(err: any) {
    errorMsg.value = err
    toast.error(err)
    node.setErrors(err.formErrors, err.fieldErrors)
  }
}

</script>