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
  <div class="py-12 mb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-center mb-10 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">Poďme na to</h2>

      <!--FORM -->
      <div>
        <div class="p-4 mb-4 bg-white border rounded-md border-[#ccccd7] border-solid">Celkom k platbe <b>{{ totalForPay }} €</b>. Vybratých živností <b>{{ subjects_of_business?.subjects_of_business.length }}</b>.</div>
        <FormKit type="form"
        :actions="false"
        id="zalZivnostiMultiStepPlugin"
        #default="{ value }"
        @submit="newSustmiApp"
        >
          <FormKit type="multi-step" name="zalZivnostiMultiStepPlugin" tab-style="tab">
            <FormKit type="step" name="predmetPodnikania" label="Predmet podnikanie" next-label="Pokračovať">
              <!-- component for example brevity. -->
              <predmetPodnikaniaFormStep ref="subjects_of_business" />
            </FormKit>

            <FormKit type="step" name="podnikatelskeUdaje" label="Podnikateľské údaje" next-label="Pokračovať" previous-label="Naspäť">
              <!-- component for example brevity. -->
              <podnikatelskeUdajeFormStep ref="userAddressUserInfoCompanyNameAndRegDate" />
            </FormKit>

            <FormKit type="step" name="fakturacneUdaje" label="Fakturačné údaje" previous-label="Naspäť">
            <!-- component for example brevity. -->
            <fakturacneUdajeFormStep ref="invoiceData" />
            <!-- using step slot for submit button-->
            <template #stepNext>
              <FormKit type="submit" label="Objednať s povinnosťou platby" />
            </template>
            </FormKit>
          </FormKit>
          <!-- <details>
            <pre>{{ value }}</pre>
          </details> -->
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
  <!-- <FooterLayout></FooterLayout> -->
</template>

<script setup lang="ts">

import store from "@/store";
import { ref, computed } from "vue";
import router from "@/router";
import type User from "@/types/User";
import FooterLayout from "@/components/FooterLayout.vue";
import { toast } from 'vue3-toastify';
import predmetPodnikaniaFormStep from "@/components/forms/predmetPodnikaniaFormStep.vue";
import podnikatelskeUdajeFormStep from "@/components/forms/podnikatelskeUdajeFormStep.vue";
import fakturacneUdajeFormStep from "@/components/forms/fakturacneUdajeFormStep.vue";
import type Address from "@/types/Address";
import type Order from "@/types/Order";
import type Company from "@/types/Company";

const hasTitle = ref(false);
const invoiceAddressIsSame = ref(true);
const placeOfBusinness = ref(true);
const dateOfRegisterCompany = ref(true);
const orderingAsCompany = ref(false);
let errorMsg = ref('');
let errorMsgHq = ref('');
let errorMsgCompany = ref('');
let sucessMsg = ref('');
let addressFromResponse: any, userFromResponse: any, hqAddressFromResponse: any, invAddressFromResponse: any, hqFromResponse: any, companyFomResponse: any, orderFromRes: any;

let subjects_of_business = ref<InstanceType<typeof predmetPodnikaniaFormStep>>(null as any)
let userAddressUserInfoCompanyNameAndRegDate = ref<InstanceType<typeof podnikatelskeUdajeFormStep>>(null as any)
let invoiceData = ref<InstanceType<typeof fakturacneUdajeFormStep>>(null as any);

let userAddress = ref<Address>();
let user = ref<User>();
let companyOrZivnostModel = ref<Company>({} as any);

let totalForPay = computed(() => subjects_of_business.value?.finalPriceForBusinessCategori + order.value.items[0].price)

// const childRefComponentForPay = ref()
// const callStripePayment = (totalForPay: number, orderId: any) => {
//   childRefComponentForPay.value.payWithStripe(totalForPay, orderId)
// }

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
  console.log()
  console.log(invoiceData.value.childRefComponentForPay.payWithStripe(1,1))

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

async function registerAddress(): Promise<Response> {

  userAddress.value = userAddressUserInfoCompanyNameAndRegDate.value?.userAddressUserInfoCompanyNameAndRegDate.userAddress
  return store.dispatch('registerAddress', userAddress.value)
    .then((res) => {
      console.log("Registering address: " + JSON.stringify(res))
      addressFromResponse = res
      return addressFromResponse
    })
    .catch(err => {
      errorMsg.value = JSON.stringify(err.response.data.errors) // response data is from store actions
    })
}

async function registerUser() {

  user.value  = userAddressUserInfoCompanyNameAndRegDate.value?.userAddressUserInfoCompanyNameAndRegDate.user;
  user.value.address_id  = addressFromResponse.address_id

  return store.dispatch('registerUser', user.value) // dispatch -> register action in store
      .then((res) => {
          sucessMsg.value = "E-mail na aktiváciu účtu bol odoslaný. Prosím skontrolujte si svoju schránkú, alebo priečinok nevyžiadanej pošty."
          userFromResponse = res
          console.log("Registering user: " + JSON.stringify(res))
          return userFromResponse
      })
  .catch(err => {
    errorMsg.value = JSON.stringify(err.response.data.errors) // response data is from store actions
  })
}

function registerHqAddress(): Promise<Response>  {

  if(userAddressUserInfoCompanyNameAndRegDate.value.userAddressUserInfoCompanyNameAndRegDate.placeOfBusinness == 'Totožné'){
    userAddressUserInfoCompanyNameAndRegDate.value.hqAddress = userAddressUserInfoCompanyNameAndRegDate.value?.userAddressUserInfoCompanyNameAndRegDate.userAddress
  }
  
  return store.dispatch('registerAddress', userAddressUserInfoCompanyNameAndRegDate.value.hqAddress)
    .then((res) => {
      console.log("Registering hq address: " + JSON.stringify(res))
      hqAddressFromResponse = res
      return hqAddressFromResponse
    })
    .catch(err => {
      errorMsg.value = JSON.stringify(err.response.data.errors) // response data is from store actions
    })
}

async function addHeadquarter() {


  headquarter.value.address_id = hqAddressFromResponse.address_id
  if(userAddressUserInfoCompanyNameAndRegDate.value.userAddressUserInfoCompanyNameAndRegDate.placeOfBusinness == 'Totožné'){
    headquarter.value.owner_name = user.value?.first_name + " " + user.value?.last_name
  }
  else {
    headquarter.value.owner_name = "Treba doplniť z oprávnenie."
  }
  headquarter.value.name = user.value?.first_name + " " + user.value?.last_name + " " + userAddressUserInfoCompanyNameAndRegDate.value.userAddressUserInfoCompanyNameAndRegDate.companyData.name
  headquarter.value.description = "Miesto podnikania k živnosti " + user.value?.first_name + " " + user.value?.last_name

  return store.dispatch('addHeadquarter', headquarter.value)
  .then((res) => {
    console.log("Adding hq: " + JSON.stringify(res))
    hqFromResponse = res.headquarters
    return hqFromResponse
  })
  .catch(err => {
    console.log(err.response.data.errors)
    errorMsg.value = JSON.stringify(err.response.data.errors);
  })
}

async function addCompany() {

  companyOrZivnostModel.value.type = 2 // 2 is zivnost 1 is sro
  companyOrZivnostModel.value.status = 2
  companyOrZivnostModel.value.owner = userFromResponse.user_id
  companyOrZivnostModel.value.headquarters_id = hqFromResponse.id
  companyOrZivnostModel.value.is_dph = false
  companyOrZivnostModel.value.subjects_of_business = subjects_of_business.value.subjects_of_business
  companyOrZivnostModel.value.name = user.value?.first_name + " " + user.value?.last_name + " " + userAddressUserInfoCompanyNameAndRegDate.value.userAddressUserInfoCompanyNameAndRegDate.companyData.name
  companyOrZivnostModel.value.zaciatok_opravnenia = userAddressUserInfoCompanyNameAndRegDate.value.userAddressUserInfoCompanyNameAndRegDate.companyData.zaciatok_opravnenia

  return store.dispatch('addCompany', companyOrZivnostModel.value)
  .then((res) => {
    console.log("Adding company: " + JSON.stringify(res))
    companyFomResponse = res
    console.log("Company from Res " + JSON.stringify(companyFomResponse))
    return companyFomResponse
  }).catch( err => {
    console.log(err)
  })

}

async function registerInvoiceAddress() {
  
  return store.dispatch('registerAddress', invoiceData.value.invoiceAddress)
    .then((res) => {
      console.log("Registering invoice address: " + JSON.stringify(res))
      invAddressFromResponse = res
      return invAddressFromResponse
    })
    .catch(err => {
      errorMsg.value = JSON.stringify(err.response.data.errors) // response data is from store actions
    })
}

async function addOrder() {

  order.value.payment_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  order.value.payment_method = invoiceData.value.paymentOptions
  order.value.company_id = companyFomResponse.company.id
  order.value.user_id = userFromResponse.user_id
  order.value.address_id = addressFromResponse.address_id

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
    order.value.fakturacne_udaje[0].address_id = addressFromResponse.address_id
  } else {
    order.value.fakturacne_udaje[0].address_id = invAddressFromResponse.address_id
  }
  order.value.amount = totalForPay.value
  order.value.amount_vat = totalForPay.value * 0.2

  return store.dispatch('addOrder', order.value)
  .then((res) => {
    console.log("Adding order: " + JSON.stringify(res))
    orderFromRes = res.order
    return orderFromRes
  })
  .catch( err => {
    console.log(err.response.data )
  })
  
}

async function isEmailAlreadyRegistered(node: any) {
  try {
    const res = await store.dispatch("isEmailAlreadyRegistered", node);
    console.log(res);
    return true;
  }
  catch (error) {
    return false;
  }
}

async function emailIsUnique(node: any){
  const result = await isEmailAlreadyRegistered(node.value)
  return result
}


async function handleAPICallsAndSubmitForm() {
  try{
    const resRegisterUserAddress = await registerAddress()
    const resRegisterUser = await registerUser()
    const resAddHeadquarter = await addHeadquarter()
    const resAddCompany = await addCompany()



  } catch(error){
    console.log(error)
  }
}


const newSustmiApp = async (formdata: any, node: any) => {
  registerAddress().then(() => {
        registerUser().then(() => {
          if(userFromResponse){

            registerHqAddress().then(() => {

              addHeadquarter().then(() => {
                addCompany().then(async () => {

                  if(!invoiceData.value.invoiceAddressIsSame){
                    await registerInvoiceAddress()
                  }
                  await addOrder().then(() => {
                    userFromResponse = null
                    hqFromResponse = null
                    companyOrZivnostModel.value.owner = 0
                    companyOrZivnostModel.value.headquarters_id = 0
                    console.log("SUPER!")
                    if(invoiceData.value.paymentOptions == "stripe"){
                      invoiceData.value.childRefComponentForPay.payWithStripe(totalForPay.value, orderFromRes.id)
                    } else {
                    router.push({
                      name:"Thanks You New Order",
                      params: {
                        orderId: orderFromRes.id,
                        }
                      })
                    }
                  })
                })
              })

            })
          }
        })
    })
}


// const submitApp = async (formData: any, node: any) => {

//   console.log(formData)
  
//   try {  
//     registerAddress().then(() => {
//         registerUser().then(() => {
//           if(userFromResponse){
//             addHeadquarter().then(() => {
//               addCompany().then(() => {
//                 addOrder().then(() => {
//                   userFromResponse = null
//                   hqFromResponse = null
//                   companyOrZivnostModel.value.owner = 0
//                   companyOrZivnostModel.value.headquarters_id = 0
//                   console.log("SUPER!")

//                   if(invoiceData.value.paymentOptions == "stripe"){
//                     callStripePayment(totalForPay.value, orderFromRes.id)
//                   } else {
//                       router.push({
//                         name:"Thanks You New Order",
//                         params: {
//                           orderId: orderFromRes.id,
//                         }
//                     })
//                   }

//                 })
//               })
//             })
//           }
//         })
//     })

//     node.clearErrors()
//     // alert('Your application was submitted successfully!')

//   }
//   catch (err: any) {
//     console.log(err)
//     node.setErrors(err.formErrors, err.fieldErrors)
//   }

// }

// // This is just a mock of an actual axios instance.
// const axios = {
//   post: (formData: any) => {
//     return new Promise((resolve, reject) => {
//       let response = { status: 200, formErrors: {} , fieldErrors: {} }
//       if (formData.organizationInfo.org_name.toLowerCase().trim() !== 'formkit') {
//         response = {
//           status: 400,
//           formErrors: ['There was an error in this form, please correct and re-submit to validate.'],
//           fieldErrors: {
//               'organizationInfo.org_name': 'Organization Name must be "FormKit", we tricked you!'
//           }
//         }
//       }
//       setTimeout(() => {
//         if (response.status === 200) {
//           resolve(response)
//         } else {
//           reject(response)
//         }
//       }, 1500)
//     })
    
//   }
// }
</script>