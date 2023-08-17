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
          <FormKit type="multi-step" name="zalFirmyMultiStepPlugin" use-local-storage="true" tab-style="tab">

            <FormKit type="step" name="predmetPodnikania" label="Predmet podnikanie" next-label="Pokračovať">
              <predmetPodnikaniaFormStep ref="subjects_of_business" />
            </FormKit>

            <FormKit type="step" name="obchodneSidlo" label="Obchodné sídlo" next-label="Pokračovať" previous-label="Naspäť">
              <obchodneSidloFormStep ref="sidloCompanyAddress" />
            </FormKit>

            <FormKit type="step" name="udajeSpolocnosti" label="Údaje o spoločnosti" next-label="Pokračovať" previous-label="Naspäť">
              <udajeSpolocnostiFormStep ref="companyMembersAndDetails" />
            </FormKit>

            <FormKit type="step" name="podnikatelskeUdaje" label="Podnikateľské údaje" next-label="Pokračovať" previous-label="Naspäť">
              <podnikatelskeUdajeFormStep ref="userAddressUserInfoCompanyNameAndRegDate" />
            </FormKit>

            <FormKit type="step" name="fakturacneUdaje" label="Fakturačné údaje" previous-label="Naspäť">
              <fakturacneUdajeFormStep ref="invoiceData" />
            </FormKit>
          </FormKit>
          <details>
            <pre>{{ value }}</pre>
          </details>    
            <div class="p-4 mb-4 text-white border rounded-md border-bizinix-border border-solid">
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

        </FormKit>
        <!-- <button @click="logujData">New log Submit</button> -->
      </div> 
    </div>
  </div>
</template>

<script setup lang="ts">

import store from "@/store";
import { ref, onBeforeMount, onMounted, computed } from "vue";
import router from "@/router";
import type User from "@/types/User";
import predmetPodnikaniaFormStep from "@/components/forms/predmetPodnikaniaFormStep.vue";
import podnikatelskeUdajeFormStep from "@/components/forms/podnikatelskeUdajeFormStep.vue";
import obchodneSidloFormStep from "@/components/forms/obchodneSidloFormStep.vue";
import udajeSpolocnostiFormStep from "@/components/forms/udajeSpolocnostiFormStep.vue";
import fakturacneUdajeFormStep from "@/components/forms/fakturacneUdajeFormStep.vue";
import type Company from "@/types/Company";
import type Address from "@/types/Address";
import type Headquarters from "@/types/Headquarters";
import { getValidationMessages } from '@formkit/validation'

const hasTitle = ref(false);
const hasTitleZakladatel = ref(false);
const invoiceAddressIsSame = ref(true);
const placeOfBusinness = ref(true);
const dateOfRegisterCompany = ref(true);
const orderingAsCompany = ref(false);
let errorMsg = ref('');
let errorMsgHq = ref('');
let errorMsgCompany = ref('');
let sucessMsg = ref('');
let subjects_of_business = ref<InstanceType<typeof predmetPodnikaniaFormStep>>(null as any)
let userAddressUserInfoCompanyNameAndRegDate = ref<InstanceType<typeof podnikatelskeUdajeFormStep>>(null as any)
let invoiceData = ref<InstanceType<typeof fakturacneUdajeFormStep>>(null as any);
let sidloCompanyAddress = ref<InstanceType<typeof obchodneSidloFormStep>>(null as any)
let companyMembersAndDetails = ref<InstanceType<typeof udajeSpolocnostiFormStep>>(null as any);

let user = ref<User>();
let headquarter = ref<Headquarters>({} as Headquarters);
let companyOrZivnostModel = ref<Company>({} as any);


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

let businessCategori = ref([
  {
    label: '' as string,
    value: ''
  }
])

let headquartersTypes = ref([
  {
    label: '' as string,
    value: ''
  }
])

let companyRegDateCheckboxValue = ref("")
let obchodneSidlo = ref("")

let priceForBusinessCategories = ref(0);

let order = ref({
  payment_date: '' as any,
  payment_method: '',
  order_type: 'company',
  description: 'test',
  amount: 0, // final cena s dph
  amount_vat: 0, // vat je čisto len dph
  is_paid: false,
  address_id: 0,
  user_id: 0,
  company_id: 0,
  is_tos_accepted: true,
  is_advocate_requested: true,
  items: [
    {
      description: "Založenie firmy",
      price: 20, // finalna cena za polozku s dph
      price_vat: 3.33 // toto je len dph
    }
  ],
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

let totalForPay = computed(() => subjects_of_business.value?.finalPriceForBusinessCategori + order.value.items[0].price)

onBeforeMount( () => {

})

function logujData(){
  console.log(companyOrZivnostModel.value.subjects_of_business)
  console.log(userAddressUserInfoCompanyNameAndRegDate.value.userAddressUserInfoCompanyNameAndRegDate.userAddress)
  console.log(user.value)
  console.log(headquarter.value)
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

 async function registerHqAddress(hqAddress: Address): Promise<any> {

  try {
    const res = await store.dispatch('registerAddress', hqAddress);
    console.log("Registering HQ address: " + JSON.stringify(res));
    return res;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.errors) {
      errorMsg.value = JSON.stringify(err.response.data.errors);
    } else {
      errorMsg.value = 'Nastala chyba pri registrácii HQ adresy.';
    }
  }
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

async function addHeadquarter(hqAddressId: any): Promise<any> {
  const hqInfo = sidloCompanyAddress.value.headquarterInfo;
  const companyOrZivnostModel = companyMembersAndDetails.value.companyOrZivnostModel;

  const headquarterData = {
    address_id: hqAddressId,
    name: "Sidlo pre spoločnosť " + companyOrZivnostModel.name,
    description: "Sidlo pre spoločnosť " + companyOrZivnostModel.name,
    owner_name: hqInfo.owner_name,
    headquarters_type: hqInfo.headquarters_type,
    forwarding: hqInfo.forwarding,
    img: hqInfo.img,
    registry: hqInfo.registry,
    scanning: hqInfo.scanning,
    shredding: hqInfo.shredding,
    is_virtual: sidloCompanyAddress.value.isVirtual,
    price: hqInfo.price
  };

  try {
    const res = await store.dispatch('addHeadquarter', headquarterData);
    console.log("Adding HQ: " + JSON.stringify(res));
    return res.headquarters;
  } catch (err: any) {
    console.log(err.response?.data?.errors);
    errorMsg.value = JSON.stringify(err.response?.data?.errors);
  }
}

async function addCompany(userId: any, hqId: any): Promise<any> {

  const companyOrZivnostModelData = {
    name: companyMembersAndDetails.value.companyOrZivnostModel.name + companyMembersAndDetails.value.pravnaForma,
    type: companyMembersAndDetails.value.companyOrZivnostModel.type,
    status: companyMembersAndDetails.value.companyOrZivnostModel.status,
    owner: userId,
    headquarters_id: hqId,
    imanie_vyska: companyMembersAndDetails.value.companyOrZivnostModel.imanie_vyska,
    imanie_splatene: companyMembersAndDetails.value.companyOrZivnostModel.imanie_splatene,
    is_dph: companyMembersAndDetails.value.companyOrZivnostModel.is_dph,
    zaciatok_opravnenia: userAddressUserInfoCompanyNameAndRegDate.value.userAddressUserInfoCompanyNameAndRegDate.companyData.zaciatok_opravnenia,
    konecny_uzivatelia_vyhod: companyMembersAndDetails.value.companyOrZivnostModel.konecny_uzivatelia_vyhod,
    sposob_konania_konatelov: companyMembersAndDetails.value.companyOrZivnostModel.sposob_konania_konatelov,
    subjects_of_business: subjects_of_business.value.subjects_of_business
  };

  try {
    const res = await store.dispatch('addCompany', companyOrZivnostModelData);
    console.log("Adding company: " + JSON.stringify(res));
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function addMultipleCompanyMembersSpolocnici(companyId: any): Promise<any> {

  companyMembersAndDetails.value.zakladateliaSpolocniciList.forEach((item, index: any) => {
    companyMembersAndDetails.value.zakladateliaSpolocniciList[index].company_id = companyId
  })

  try {
    const res = await store.dispatch('addMultipleCompanyMembers', companyMembersAndDetails.value.zakladateliaSpolocniciList)
    console.log("Adding Multiple Company Members Spolocnici: " + JSON.stringify(res))
    return res
  } catch(err) {
    console.log(err)
  }
}

async function addMultipleCompanyMembersKonatelia(companyId: any): Promise<any> {

  companyMembersAndDetails.value.konateliaList.forEach((item, index: any) => {
    companyMembersAndDetails.value.konateliaList[index].company_id = companyId
  })

  try {
    const res = await store.dispatch('addMultipleCompanyMembers', companyMembersAndDetails.value.konateliaList)
    console.log("Adding Multiple Company Members Konatelia: " + JSON.stringify(res))
    return res
  } catch (err: any){
    console.log(err)
  }

}

//invoiceData.value.invoiceAddress

async function registerInvoiceAddress(invoiceAddress: Address) {
  try {
    const res = await store.dispatch('registerAddress', invoiceAddress);
    console.log("Registering invoice address: " + JSON.stringify(res));
    return res;
  } catch (err: any) {
    errorMsg.value = JSON.stringify(err.response.data.errors);
  }
}

async function addOrder(companyId: any, userId: any, userAddressId: any, invoiceAddressId?: any): Promise<any> {
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

  try {
    const res = await store.dispatch('addOrder', order.value);
    console.log("Adding order: " + JSON.stringify(res));
    return res.order;
  } catch (err: any) {
    console.log(err.response.data);
  }

}

const newSustmiApp = async (formdata: any, node: any) => {

  try {

    const userAddressRes = await registerAddress(userAddressUserInfoCompanyNameAndRegDate.value?.userAddressUserInfoCompanyNameAndRegDate.userAddress);

    const regUserRes = await registerUser(userAddressUserInfoCompanyNameAndRegDate.value?.userAddressUserInfoCompanyNameAndRegDate.user, userAddressRes.address_id);

    const hqAddressRes = await registerHqAddress(sidloCompanyAddress.value.hqAddress);

    const regHqRes = await addHeadquarter(hqAddressRes.address_id);

    const companyRes = await addCompany(regUserRes.user_id, regHqRes.id);
    
    await addMultipleCompanyMembersSpolocnici(companyRes.company.id)
    await addMultipleCompanyMembersKonatelia(companyRes.company.id)


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
            
  } catch (err: any) {
    node.setErrors(err.formErrors, err.fieldErrors);
    console.error(err);
  }
}
</script>