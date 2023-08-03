<template>
  <div class="bg-no-repeat bg-cover" style="background-image:linear-gradient(0deg, rgba(36,36,39,0.9332107843137255) 40%, rgba(0,0,0,0.29735644257703087) 100%), url('../src/assets/zalozenie-fimy-bg.png') ">
    <div class="max-w-7xl flex h-[80vh] items-center mx-auto py-20 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
      <div class="max-w-full">
        <h2 class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Jednoduché založenie<br>živnosti za 49 €</h2>
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
      <div class="hidden md:block md:max-w-xs lg:max-w-md">
        <img src="@/assets/robot.png">
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
          <FormKit type="multi-step" name="zalZivnostiMultiStepPlugin" tab-style="tab">
            <FormKit type="step" name="predmetPodnikania" label="Predmet podnikanie" next-label="Pokračovať">
              <predmetPodnikaniaFormStep ref="subjects_of_business" />
            </FormKit>

            <FormKit type="step" name="podnikatelskeUdaje" label="Podnikateľské údaje" next-label="Pokračovať" previous-label="Naspäť">
              <podnikatelskeUdajeFormStep ref="userAddressUserInfoCompanyNameAndRegDate" />
            </FormKit>

            <FormKit type="step" name="fakturacneUdaje" label="Fakturačné údaje" previous-label="Naspäť">
            <fakturacneUdajeFormStep ref="invoiceData" />
            </FormKit>
          </FormKit>

          <div class="p-4 mb-4  bg-gray-900 text-white border rounded-md border-bizinix-border border-solid">
            Celkom k platbe <b>{{ totalForPay }} €</b>. Počet vybratých predmetov podnikania <b>{{ subjects_of_business?.subjects_of_business.length }}</b>.
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
        <!-- <button @click="newLogSubmit">New log Submit</button> -->
      </div>

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
import podnikatelskeUdajeFormStep from "@/components/forms/podnikatelskeUdajeFormStep.vue";
import fakturacneUdajeFormStep from "@/components/forms/fakturacneUdajeFormStep.vue";
import type Address from "@/types/Address";
import type Order from "@/types/Order";
import type Company from "@/types/Company";
import { getValidationMessages } from '@formkit/validation'
import { getNode } from '@formkit/core'

let errorMsg = ref('');
let errorMsgHq = ref('');
let errorMsgCompany = ref('');
let sucessMsg = ref('');

let subjects_of_business = ref<InstanceType<typeof predmetPodnikaniaFormStep>>(null as any)
let userAddressUserInfoCompanyNameAndRegDate = ref<InstanceType<typeof podnikatelskeUdajeFormStep>>(null as any)
let invoiceData = ref<InstanceType<typeof fakturacneUdajeFormStep>>(null as any);

let userAddress = ref<Address>();
let user = ref<User>();
let companyOrZivnostModel = ref<Company>({} as any);

let totalForPay = computed(() => subjects_of_business.value?.finalPriceForBusinessCategori + order.value.items[0].price)

onMounted(() => {
  const form = getNode('miesto');
  console.log(form?.value);
})

// const childRefComponentForPay = ref()
// const callStripePayment = (totalForPay: number, orderId: any) => {
//   childRefComponentForPay.value.payWithStripe(totalForPay, orderId)
// }


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

function newLogSubmit(){

  console.log("InvData");
  console.log(invoiceData.value)
  console.log("CompanyModel");
  console.log(companyOrZivnostModel.value.subjects_of_business);
  console.log("UserAddresssssss");
  console.log(userAddressUserInfoCompanyNameAndRegDate.value?.userAddressUserInfoCompanyNameAndRegDate.userAddress);

  console.log("SubjectOfbusinesss");
  console.log(subjects_of_business.value?.subjects_of_business);
  console.log("UserAddresssssss original");
  console.log(userAddress.value);
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
  description: 'test',
  amount: 0, // final cena s dph
  amount_vat: 0, // vat je čisto len dph
  is_paid: false,
  address_id: 0,
  user_id: 0,
  company_id: 0,
  is_tos_accepted: true,
  is_advocate_requested: true,
  items: [{
      description: "Založenie živnosti",
      price: 12, // finalna cena za polozku s dph
      price_vat: 2 // toto je len dph
    }],
  fakturacne_udaje: [{
    first_name: '',
    last_name: '',
    name: '',
    ico: '',
    dic: '',
    ic_dph: '',
    address_id: ''
  }]
})


/* Submiting form and Api calls */

async function registerAddress(userAddress: Address) {

  return store.dispatch('registerAddress', userAddress)
    .then((res) => {
      console.log("Registering address: " + JSON.stringify(res))
      return res
    })
    .catch(err => {
      errorMsg.value = JSON.stringify(err.response.data.errors) // response data is from store actions
    })
}

async function registerUser(user: User, addressId: any): Promise<any> {
  user.address_id = addressId;

  try {
    const res = await store.dispatch('registerUser', user);
    sucessMsg.value = "E-mail na aktiváciu účtu bol odoslaný. Prosím skontrolujte si svoju schránkú, alebo priečinok nevyžiadanej pošty.";
    console.log("Registering user: " + JSON.stringify(res));
    return res;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.errors) {
      errorMsg.value = JSON.stringify(err.response.data.errors);
    } else {
      errorMsg.value = 'Nastala chyba pri registrácii uživateľa.';
    }
  }
}


async function registerHqAddress(hqAddress: Address): Promise<any>  {

  if(userAddressUserInfoCompanyNameAndRegDate.value.placeOfBusinness == 'Totožné'){
    hqAddress = userAddressUserInfoCompanyNameAndRegDate.value?.userAddressUserInfoCompanyNameAndRegDate.userAddress
  }
  
  return store.dispatch('registerAddress', hqAddress)
    .then((res) => {
      console.log("Registering hq address: " + JSON.stringify(res))
      return res
    })
    .catch(err => {
      errorMsg.value = JSON.stringify(err.response.data.errors) // response data is from store actions
    })
}

async function addHeadquarter(user: User, hqAddressId: any) {

  headquarter.value.address_id = hqAddressId

  if(userAddressUserInfoCompanyNameAndRegDate.value.placeOfBusinness == 'Totožné'){
    headquarter.value.owner_name = user.first_name + " " + user.last_name
  }
  else {
    headquarter.value.owner_name = "Treba doplniť z oprávnenie."
  }
  headquarter.value.name = user.first_name + " " + user.last_name + " " + userAddressUserInfoCompanyNameAndRegDate.value.userAddressUserInfoCompanyNameAndRegDate.companyData.name
  headquarter.value.description = "Miesto podnikania k živnosti " + user.first_name + " " + user.last_name

  return store.dispatch('addHeadquarter', headquarter.value)
  .then((res) => {
    console.log("Adding hq: " + JSON.stringify(res))
    return res.headquarters
  })
  .catch(err => {
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
  companyOrZivnostModel.value.subjects_of_business = subjects_of_business.value.subjects_of_business
  companyOrZivnostModel.value.name = user.first_name + " " + user.last_name + " " + userAddressUserInfoCompanyNameAndRegDate.value.userAddressUserInfoCompanyNameAndRegDate.companyData.name
  companyOrZivnostModel.value.zaciatok_opravnenia = userAddressUserInfoCompanyNameAndRegDate.value.userAddressUserInfoCompanyNameAndRegDate.companyData.zaciatok_opravnenia

  return store.dispatch('addCompany', companyOrZivnostModel.value)
  .then((res) => {
    console.log("Adding company: " + JSON.stringify(res))
    console.log("Company from Res " + JSON.stringify(res))
    return res
  }).catch( err => {
    console.log(err)
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

async function addOrder(companyId: any, userId: any, userAddressId: any, invoiceAddressId?: any) {

  order.value.payment_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  order.value.payment_method = invoiceData.value.paymentOptions
  order.value.company_id = companyId
  order.value.user_id = userId
  order.value.address_id = userAddressId

  companyOrZivnostModel.value.subjects_of_business.forEach(element => {
    order.value.items.push({
      description: element.title,
      price: element.price,
      price_vat: element.price * 0.2
    })
  });

  order.value.fakturacne_udaje[0].first_name = invoiceData.value.fakturacne_udaje[0].first_name
  order.value.fakturacne_udaje[0].last_name = invoiceData.value.fakturacne_udaje[0].last_name
  order.value.fakturacne_udaje[0].name = invoiceData.value.fakturacne_udaje[0].name
  order.value.fakturacne_udaje[0].dic = invoiceData.value.fakturacne_udaje[0].dic
  order.value.fakturacne_udaje[0].ic_dph = invoiceData.value.fakturacne_udaje[0].ic_dph
  order.value.fakturacne_udaje[0].ico = invoiceData.value.fakturacne_udaje[0].ic_dph
  if(invoiceData.value.invoiceAddressIsSame){
    order.value.fakturacne_udaje[0].address_id = userAddressId
  } else {
    order.value.fakturacne_udaje[0].address_id = invoiceAddressId
  }
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

    const userAddressRes = await registerAddress(userAddressUserInfoCompanyNameAndRegDate.value?.userAddressUserInfoCompanyNameAndRegDate.userAddress);

    const regUserRes = await registerUser(userAddressUserInfoCompanyNameAndRegDate.value?.userAddressUserInfoCompanyNameAndRegDate.user, userAddressRes.address_id);
    
    const hqAddressRes = await registerHqAddress(userAddressUserInfoCompanyNameAndRegDate.value.hqAddress); 

    const regHqRes = await addHeadquarter(userAddressUserInfoCompanyNameAndRegDate.value?.userAddressUserInfoCompanyNameAndRegDate.user, hqAddressRes.address_id);
    
    const companyRes = await addCompany(userAddressUserInfoCompanyNameAndRegDate.value?.userAddressUserInfoCompanyNameAndRegDate.user, regUserRes.user_id, regHqRes.id);

    let invoiceAddressRes: any;
    if(!invoiceData.value.invoiceAddressIsSame && !invoiceData.value.orderingAsCompany)
    {
      invoiceAddressRes = await registerInvoiceAddress(invoiceData.value.invoiceAddress)
    }
    else if(invoiceData.value.orderingAsCompany)
    {
      invoiceAddressRes = await registerInvoiceAddress(invoiceData.value.invoiceAddressForCompany)
    }

    const orderRes = await addOrder(companyRes.company.id, regUserRes.user_id, userAddressRes.address_id, invoiceAddressRes?.address_id)

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
    console.log(err)
    node.setErrors(err.formErrors, err.fieldErrors)
  }
}

</script>