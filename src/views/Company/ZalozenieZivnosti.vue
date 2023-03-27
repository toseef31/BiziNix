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
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-center mb-8 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">Poďme na to</h2>

      <!-- NOVY FORM -->
      <div>
        <FormKit type="form"
        :actions="false"
        id="zalZivnostiMultiStepPlugin"
        #default="{ value }"
        @submit="newSustmiApp"
        >
          <FormKit type="multi-step" name="zalZivnostiMultiStepPlugin" tab-style="tab">
            <FormKit type="step" name="predmetPodnikania" label="Predmet podnikanie">
              <!-- component for example brevity. -->
              <predmetPodnikaniaFormStep ref="subjects_of_business" />
            </FormKit>

            <FormKit type="step" name="podnikatelskeUdaje" label="Podnikateľské údaje">
              <!-- component for example brevity. -->
              <podnikatelskeUdajeFormStep ref="userAddressUserInfoCompanyNameAndRegDate" />
            </FormKit>

            <FormKit type="step" name="fakturacneUdaje" label="Fakturačné údaje">
            <!-- component for example brevity. -->
            <fakturacneUdajeFormStep ref="invoiceData" />

            <!-- using step slot for submit button-->
            <template #stepNext>
              <FormKit type="submit" />
            </template>
            </FormKit>
          </FormKit>
          <details>
            <pre>{{ value }}</pre>
          </details>
        </FormKit>
        <button @click="newLogSubmit">New log Submit</button>
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
import { ref, onBeforeMount, onMounted, computed } from "vue";
import useSteps from "@/components/forms/useStep";
import { createInput } from '@formkit/vue'
import formkitCustomMultiSelectVue from "@/components/forms/formkitCustomMultiSelect.vue";
import router from "@/router";
import type User from "@/@types/User";
import { toast } from 'vue3-toastify';
import { getNode } from '@formkit/core';
import useCalculatePriceForBusinessCategories from './Composables/CalculatePriceForBusinessCategories'
import stripePaymentComponent from '@/components/payments/PayStripe.vue'
import predmetPodnikaniaFormStep from "@/components/forms/predmetPodnikaniaFormStep.vue";
import podnikatelskeUdajeFormStep from "@/components/forms/podnikatelskeUdajeFormStep.vue";
import fakturacneUdajeFormStep from "@/components/forms/fakturacneUdajeFormStep.vue";
import type predmetPodnikaniaFormStepVue from "@/components/forms/predmetPodnikaniaFormStep.vue";
import type Address from "@/@types/Address";
import type Order from "@/@types/Order";
import type Company from "@/@types/Company";
import { fa } from "@formkit/i18n";


onBeforeMount(() => {
      
  // companyOrZivnostModel.value!.subjects_of_business.pop()
  // store.dispatch("getAllSubjectOfBusiness")
  // .then(res => {
  //   businessCategori.value.shift()
  //   res.data.data.forEach((element: any) => {
  //     businessCategori.value.push({
  //       label: element.title,
  //       value: element
  //     })
  //   })
  // })
  //   .catch(err => {
  //   errorMsg.value = err.response.data.errors // response data is from store actions
  // })

})


onMounted(() => {

  //let formsValues: any = getNode('zalZivnostiMultiStepPlugin')?.value;

  // userAddress = ref({
  //   street: formsValues['zalZivnostiMultiStepPlugin'].podnikatelskeUdaje.street,
  //   street_number: formsValues['zalZivnostiMultiStepPlugin'].podnikatelskeUdaje.street_number,
  //   street_number2: formsValues['zalZivnostiMultiStepPlugin'].podnikatelskeUdaje.street_number2,
  //   city: formsValues['zalZivnostiMultiStepPlugin'].podnikatelskeUdaje.city,
  //   psc: formsValues['zalZivnostiMultiStepPlugin'].podnikatelskeUdaje.psc,
  //   country: formsValues['zalZivnostiMultiStepPlugin'].podnikatelskeUdaje.country,
  // })

})

const hasTitle = ref(false);
const invoiceAddressIsSame = ref(true);
const placeOfBusinness = ref(true);
const dateOfRegisterCompany = ref(true);
const orderingAsCompany = ref(false);
let errorMsg = ref('');
let errorMsgHq = ref('');
let errorMsgCompany = ref('');
let sucessMsg = ref('');
let addressFromResponse: any, userFromResponse: any, hqFromResponse: any, companyFomResponse: any, orderFromRes: any;

// const camel2title = (str: string) => str
//   .replace(/([A-Z])/g, (match) => ` ${match}`)
//   .replace(/^./, (match) => match.toUpperCase())
//   .trim()

// const { steps, visitedSteps, activeStep, setStep, stepPlugin } = useSteps()
// const multiSelVueForm = createInput(formkitCustomMultiSelectVue, {
//   props: ['items'],
// })
// const checkStepValidity = (stepName: any) => {
//   return (steps[stepName].errorCount > 0 || steps[stepName].blockingCount > 0) && visitedSteps.value.includes(stepName)
// }

// let businessCategori = ref([
//   {
//     label: '' as string,
//     value: ''
//   }
// ])


let subjects_of_business = ref<InstanceType<typeof predmetPodnikaniaFormStepVue>>(null as any)
let userAddressUserInfoCompanyNameAndRegDate = ref<InstanceType<typeof podnikatelskeUdajeFormStep>>(null as any)
let invoiceData = ref<InstanceType<typeof fakturacneUdajeFormStep>>(null as any);

let userAddress = ref<Address>();
let user = ref<User>();
let companyOrZivnostModel = ref<Company>({} as any);

let totalForPay = computed(() => subjects_of_business.value.finalPriceForBusinessCategori + order.value.items[0].price)

  // let userAddress = ref<Address>({
//   id: null,
//   street: '',
//   street_number: '',
//   street_number2: '',
//   city: '',
//   psc: '',
//   country: ''
// })

function newLogSubmit(){

  console.log("InvData");
  console.log(invoiceData.value)

//console.log(formsValues['zalZivnostiMultiStepPlugin'].predmetPodnikania.subjects_of_business);
//companyOrZivnostModel.value?.subjects_of_business.shift();
//companyOrZivnostModel.value.subjects_of_business.push(formsValues['zalZivnostiMultiStepPlugin'].predmetPodnikania.subjects_of_business)
console.log("CompanyModel");
console.log(companyOrZivnostModel.value.subjects_of_business);

console.log("UserAddresssssss");
console.log(userAddressUserInfoCompanyNameAndRegDate.value?.userAddressUserInfoCompanyNameAndRegDate.userAddress);

console.log("SubjectOfbusinesss");
console.log(subjects_of_business.value?.subjects_of_business);
console.log("UserAddresssssss original");
console.log(userAddress.value);

}

//let companyRegDateCheckboxValue = ref("")
// let fakturacne_udaje = ref({
//   first_name: '',
//   last_name: '',
//   name: '',
//   ico: '',
//   dic: '',
//   ic_dph: '',
//   address_id: 12
//   // TO DO ADDRESS ID
// })

// let user = ref({
//     address_id: 0, // address should be created first and save to store
//     first_name: '',
//     last_name: '',
//     title_before: '',
//     title_after: '',
//     gender: '',
//     phone: '',
//     date_of_birth: '',
//     rodne_cislo: '',
//     email: '',
//     password: '',
//     password_confirmation: '',
// } as User )

// let companyOrZivnostModel = ref({
//   name: '',
//   headquarters_id: 0,
//   type: 2, // type 1 sro, type 2 živnosť
//   status: 2, // Zakladanie spoločnosti je v priebehu
//   ičo: '',
//   dič: '',
//   icdph: '',
//   is_dph: false,
//   registration_date: '',
//   owner: 0,
//   subjects_of_business: [{
//     id: '',
//     title: '',
//     price: 0,
//     description: '',
//     category_id: 0
//   }]
// })

let headquarter = ref({
  name: '',
  description: 'test',
  headquarters_type: 1, // 1 Nebytový priestor, 2 Byt, 3 iná budova, 4 rod dom, 5 Samost stoj garaž
  owner_name: '',
  price: 0,
  registry: false,
  forwarding: false,
  scanning: false,
  shredding: false,
  is_virtual: false,
  img: 'test',
  address_id: 0
})

let order = ref({
  payment_date: '' as any,
  payment_method: '',
  description: 'test',
  amount: 12, // final cena s dph
  amount_vat: 2, // vat je čisto len dph
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

//const { calculatePriceForBusinessOfcategories, finalPriceForBusinessCategori }  = useCalculatePriceForBusinessCategories(companyOrZivnostModel.value!.subjects_of_business)

function logujData(){
  console.log(companyOrZivnostModel.value.subjects_of_business)
  console.log(userAddress.value)
  console.log(user.value)
  console.log(headquarter.value)
  console.log(companyOrZivnostModel.value)
  //console.log(fakturacne_udaje.value)
  //console.log(paymentOptions)
  console.log(order.value)
}

/* Submiting form and Api calls */

async function registerAddress() {

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

async function addHeadquarter() {
  headquarter.value.owner_name = user.value?.first_name + " " + user.value?.last_name

  if(placeOfBusinness.value){
    headquarter.value.name = 'Rovnaký názov ako moja trvalá adresa'
  }
  else {
    headquarter.value.name = 'Iný názov'
  }

  headquarter.value.address_id = addressFromResponse.address_id

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

  companyOrZivnostModel.value.type = '2'
  companyOrZivnostModel.value.owner = userFromResponse.user_id
  companyOrZivnostModel.value.headquarters_id = hqFromResponse.id
  companyOrZivnostModel.value.is_dph = false
  companyOrZivnostModel.value.subjects_of_business = subjects_of_business.value.subjects_of_business
  companyOrZivnostModel.value.name = user.value?.first_name + " " + user.value?.last_name + " " + userAddressUserInfoCompanyNameAndRegDate.value.userAddressUserInfoCompanyNameAndRegDate.companyData.name
  companyOrZivnostModel.value.registration_date = userAddressUserInfoCompanyNameAndRegDate.value.userAddressUserInfoCompanyNameAndRegDate.companyData.registration_date

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
  order.value.fakturacne_udaje[0].dic = invoiceData.value.fakturacne_udaje[0].dic
  order.value.fakturacne_udaje[0].ic_dph = invoiceData.value.fakturacne_udaje[0].ic_dph
  order.value.fakturacne_udaje[0].ico = invoiceData.value.fakturacne_udaje[0].ic_dph
  if(invoiceData.value.invoiceAddressIsSame){
    order.value.fakturacne_udaje[0].address_id = addressFromResponse.address_id
  }

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

const childRefComponentForPay = ref()
const callStripePayment = (totalForPay: number, orderId: any) => {
    childRefComponentForPay.value.pay(totalForPay, orderId)
}

const newSustmiApp = async (formdata: any, node: any) => {
  registerAddress().then(() => {
        registerUser().then(() => {
          if(userFromResponse){
            addHeadquarter().then(() => {
              addCompany().then(() => {
                addOrder().then(() => {
                  userFromResponse = null
                  hqFromResponse = null
                  companyOrZivnostModel.value.owner = 0
                  companyOrZivnostModel.value.headquarters_id = 0
                  console.log("SUPER!")

                  if(invoiceData.value.paymentOptions == "stripe"){
                    callStripePayment(totalForPay.value, orderFromRes.id)
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
          }
        })
    })
}


const submitApp = async (formData: any, node: any) => {

  console.log(formData)
  
  try {  
    registerAddress().then(() => {
        registerUser().then(() => {
          if(userFromResponse){
            addHeadquarter().then(() => {
              addCompany().then(() => {
                addOrder().then(() => {
                  userFromResponse = null
                  hqFromResponse = null
                  companyOrZivnostModel.value.owner = 0
                  companyOrZivnostModel.value.headquarters_id = 0
                  console.log("SUPER!")

                  if(invoiceData.value.paymentOptions == "stripe"){
                    callStripePayment(totalForPay.value, orderFromRes.id)
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
          }
        })
    })

    node.clearErrors()
    // alert('Your application was submitted successfully!')

  }
  catch (err: any) {
    console.log(err)
    node.setErrors(err.formErrors, err.fieldErrors)
  }

}

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