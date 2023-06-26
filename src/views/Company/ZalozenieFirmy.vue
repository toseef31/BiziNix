<template>
  <div class="bg-no-repeat bg-cover" style="background-image:linear-gradient(0deg, rgba(36,36,39,0.9332107843137255) 40%, rgba(0,0,0,0.29735644257703087) 100%), url('../src/assets/zalozenie-fimy-bg.png') ">
    <div class="max-w-7xl flex h-[80vh] items-center mx-auto py-20 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
      <div class="max-w-full">
        <h2 class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Založenie s.r.o. za 199 €</h2>
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
      <div class="hidden md:block md:max-w-xs lg:max-w-md">
        <img src="@/assets/robot.png">
      </div>
    </div>
  </div>
  <div class="py-12 mb-12">

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


                <!--FORM -->
        <div>
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

            <FormKit type="step" name="obchodneSidlo" label="Obchodné sídlo" next-label="Pokračovať" previous-label="Naspäť">
              <!-- component for example brevity. -->
              <obchodneSidloFormStep ref="sidloCompanyAddress" />
            </FormKit>

            <FormKit type="step" name="udajeSpolocnosti" label="Údaje o spoločnosti" next-label="Pokračovať" previous-label="Naspäť">
              <!-- component for example brevity. -->
              <udajeSpolocnostiFormStep ref="companyMembersAndDetails" />
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
          <details>
            <pre>{{ value }}</pre>
          </details>
        </FormKit>
        <!-- <button @click="logujData">New log Submit</button> -->
      </div>


      

    </div>
  </div>
  <FooterLayout></FooterLayout>
</template>

<script setup lang="ts">

import store from "@/store";
import { ref, onBeforeMount, onMounted, computed } from "vue";
import useSteps from "@/components/forms/useStep";
import { createInput } from '@formkit/vue'
import formkitCustomMultiSelectVue from "@/components/forms/formkitCustomMultiSelect.vue";
import router from "@/router";
import type User from "@/types/User";
import FooterLayout from "@/components/FooterLayout.vue";
import predmetPodnikaniaFormStep from "@/components/forms/predmetPodnikaniaFormStep.vue";
import podnikatelskeUdajeFormStep from "@/components/forms/podnikatelskeUdajeFormStep.vue";
import obchodneSidloFormStep from "@/components/forms/obchodneSidloFormStep.vue";
import udajeSpolocnostiFormStep from "@/components/forms/udajeSpolocnostiFormStep.vue";
import fakturacneUdajeFormStep from "@/components/forms/fakturacneUdajeFormStep.vue";
import type Company from "@/types/Company";
import type Address from "@/types/Address";
import type Headquarters from "@/types/Headquarters";

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
let addressFromResponse: any, hqAddressFromResponse: any, userFromResponse: any, hqFromResponse: any, companyFomResponse: any, orderFromRes: any;
let subjects_of_business = ref<InstanceType<typeof predmetPodnikaniaFormStep>>(null as any)
let userAddressUserInfoCompanyNameAndRegDate = ref<InstanceType<typeof podnikatelskeUdajeFormStep>>(null as any)
let invoiceData = ref<InstanceType<typeof fakturacneUdajeFormStep>>(null as any);
let sidloCompanyAddress = ref<InstanceType<typeof obchodneSidloFormStep>>(null as any)
let companyMembersAndDetails = ref<InstanceType<typeof udajeSpolocnostiFormStep>>(null as any);

let user = ref<User>();
let headquarter = ref<Headquarters>({} as Headquarters);
let companyOrZivnostModel = ref<Company>({} as any);

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
let paymentOptions = ref("")
let obchodneSidlo = ref("")

let priceForBusinessCategories = ref(0);

// let zakladateliaSpolocnici = ref({
//   members: [{
//     company_id: 0,
//     obchodne_meno: '',
//     ico: '',
//     typ_zakladatela: 0, // 1 Fyz Osoba, 2 Prav Osoba
//     first_name: '',
//     last_name: '',
//     title_before: '',
//     title_after: '',
//     gender: '',
//     date_of_birth: '',
//     rodne_cislo: '',
//     street: '',
//     street_number: '',
//     street_number2: '',
//     city: '',
//     psc: '',
//     country: '',
//     typ_dokladu_totoznosti: '',
//     cislo_dokladu_totoznosti: '',
//     vyska_vkladu: 0,
//     podiel_v_spolocnosti: 0,
//     rozsah_splatenia_vkladu: 0,
//     je_spravca_vkladu: true,
//     je_zakladatel: false,
//     je_konatel: false
//   }]
// })

// let konatelia = ref({
//   members: [{
//     company_id: 0,
//     first_name: '',
//     last_name: '',
//     title_before: '',
//     title_after: '',
//     gender: '',
//     date_of_birth: '',
//     rodne_cislo: '',
//     street: '',
//     street_number: '',
//     street_number2: '',
//     city: '',
//     psc: '',
//     country: '',
//     je_konatel: true
//   }]
// })

// let fakturacne_udaje = ref({
//   first_name: '',
//   last_name: '',
//   name: '',
//   ico: '',
//   dic: '',
//   ic_dph: '',
//   address_id: 12
//   // to do address id
// })

// let sidloCompanyAddress = ref({
//   street: '',
//   street_number: '',
//   street_number2: '',
//   city: '',
//   psc: '',
//   country: '',
//   ownerName: ''
// })

// let companyOrZivnostModel = ref({
//   name: '',
//   headquarters_id: 0,
//   type: 1, // type 1 sro, type 2 živnosť
//   status: 2, // Zakladanie spoločnosti je v priebehu
//   ičo: '',
//   dič: '',
//   icdph: '',
//   is_dph: false,
//   registration_date: '',
//   owner: 0,
//   konecny_uzivatelia_vyhod: 0,
//   sposob_konania_konatelov: 0,
//   subjects_of_business: [{
//     id: '',
//     title: '',
//     price: 0,
//     description: '',
//     category_id: 0
//   }]
// })
// let headquarter = ref({
//   name: '',
//   description: 'test',
//   headquarters_type: 1, // 1 Nebytový priestor, 2 Byt, 3 iná budova, 4 rod dom, 5 Samost stoj garaž
//   owner_name: '',
//   price: 0,
//   registry: false,
//   forwarding: false,
//   scanning: false,
//   shredding: false,
//   is_virtual: false,
//   img: 'test',
//   address_id: 0
// })

let order = ref({
  payment_date: '' as any,
  payment_method: '',
  description: 'test',
  amount: 20, // final cena s dph
  amount_vat: 3.33, // vat je čisto len dph
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

let totalForPay = computed(() => subjects_of_business.value.finalPriceForBusinessCategori + order.value.items[0].price)

onBeforeMount( () => {

  // companyOrZivnostModel.value.subjects_of_business.pop()

  // store.dispatch("getAllSubjectOfBusiness")
  // .then(res => {
  //   businessCategori.value.shift()
  //   res.data.data.forEach((element: any) => {
  //     businessCategori.value.push({
  //       label: element.title,
  //       value: element
  //     })
  //   })

  //   //businessCategori.value.shift()
  //   //businessCategori.value = [ ...businessCategori.value ]

  // })
  //   .catch(err => {
  //   // sucessMsg.value = false
  //   // errorMsg.value = err.response.data.errors // response data is from store actions
  // })

  // store.dispatch("getHeadquartersTypes")
  // .then(res => {
  //   headquartersTypes.value.shift()
  //   res.data.data.forEach((element: any) => {
  //     headquartersTypes.value.push({
  //       value: element.id,
  //       label: element.name
  //     })
  //   });
  // })
})

function logujData(){
  console.log(companyOrZivnostModel.value.subjects_of_business)
  console.log(userAddressUserInfoCompanyNameAndRegDate.value.userAddressUserInfoCompanyNameAndRegDate.userAddress)
  console.log(user.value)
  console.log(headquarter.value)
  console.log(companyOrZivnostModel.value)
  //console.log(fakturacne_udaje.value)
  console.log(paymentOptions.value)
  //console.log(zakladateliaSpolocnici.value)
  //console.log(konatelia.value)
}

function priceForBusinessOfcategories(){
  //let val: any = getNode("PredmetPodnikania")?.value;
  let total = 0;  
  if(companyOrZivnostModel.value.subjects_of_business){
    companyOrZivnostModel.value.subjects_of_business.forEach((element: any) => {
      total = total + element.price;
      console.log(element.price)
    });
  }
  priceForBusinessCategories.value = total
}

/* Submiting form and Api calls */

function registerAddress(): Promise<Response>  {

  return store.dispatch('registerAddress', userAddressUserInfoCompanyNameAndRegDate.value?.userAddressUserInfoCompanyNameAndRegDate.userAddress)
    .then((res) => {
      console.log("Registering address: " + JSON.stringify(res))
      addressFromResponse = res
      return addressFromResponse
    })
    .catch(err => {
      errorMsg.value = JSON.stringify(err.response.data.errors) // response data is from store actions
    })
}

function registerHqAddress(): Promise<Response>  {

return store.dispatch('registerAddress', sidloCompanyAddress.value.hqAddress)
  .then((res) => {
    console.log("Registering hq address: " + JSON.stringify(res))
    hqAddressFromResponse = res
    return hqAddressFromResponse
  })
  .catch(err => {
    errorMsg.value = JSON.stringify(err.response.data.errors) // response data is from store actions
  })
}

function registerUser(): Promise<Response>  {

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

function addHeadquarter(): Promise<Response> {

  headquarter.value.address_id = hqAddressFromResponse.address_id
  headquarter.value.name = "Sidlo pre spoločnosť " + companyMembersAndDetails.value.companyOrZivnostModel.name
  headquarter.value.description = "Sidlo pre spoločnosť " + companyMembersAndDetails.value.companyOrZivnostModel.name 
  headquarter.value.owner_name = sidloCompanyAddress.value.headquarterInfo.owner_name
  headquarter.value.headquarters_type = sidloCompanyAddress.value.headquarterInfo.headquarters_type
  headquarter.value.forwarding = sidloCompanyAddress.value.headquarterInfo.forwarding
  headquarter.value.img = sidloCompanyAddress.value.headquarterInfo.img
  headquarter.value.registry = sidloCompanyAddress.value.headquarterInfo.registry
  headquarter.value.scanning = sidloCompanyAddress.value.headquarterInfo.scanning
  headquarter.value.shredding = sidloCompanyAddress.value.headquarterInfo.shredding
  headquarter.value.shredding = sidloCompanyAddress.value.headquarterInfo.shredding
  headquarter.value.is_virtual = sidloCompanyAddress.value.isVirtual
  headquarter.value.price = sidloCompanyAddress.value.headquarterInfo.price

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

function addCompany(): Promise<Response> {

  companyOrZivnostModel.value.name = companyMembersAndDetails.value.companyOrZivnostModel.name
  companyOrZivnostModel.value.type = companyMembersAndDetails.value.companyOrZivnostModel.type
  companyOrZivnostModel.value.status = companyMembersAndDetails.value.companyOrZivnostModel.status
  companyOrZivnostModel.value.owner = userFromResponse.user_id
  companyOrZivnostModel.value.headquarters_id = hqFromResponse.id
  companyOrZivnostModel.value.imanie_vyska = companyMembersAndDetails.value.companyOrZivnostModel.imanie_vyska
  companyOrZivnostModel.value.imanie_splatene = companyMembersAndDetails.value.companyOrZivnostModel.imanie_splatene
  companyOrZivnostModel.value.is_dph = companyMembersAndDetails.value.companyOrZivnostModel.is_dph
  companyOrZivnostModel.value.zaciatok_opravnenia = userAddressUserInfoCompanyNameAndRegDate.value.userAddressUserInfoCompanyNameAndRegDate.companyData.zaciatok_opravnenia
  companyOrZivnostModel.value.konecny_uzivatelia_vyhod = companyMembersAndDetails.value.companyOrZivnostModel.konecny_uzivatelia_vyhod
  companyOrZivnostModel.value.sposob_konania_konatelov = companyMembersAndDetails.value.companyOrZivnostModel.sposob_konania_konatelov
  companyOrZivnostModel.value.subjects_of_business = subjects_of_business.value.subjects_of_business


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

function addMultipleCompanyMembersSpolocnici(): Promise<Response> {

  companyMembersAndDetails.value.zakladateliaSpolocnici.members.forEach((item, index: any) => {
    companyMembersAndDetails.value.zakladateliaSpolocnici.members[index].company_id = companyFomResponse.company.id
  })

  return store.dispatch('addMultipleCompanyMembers', companyMembersAndDetails.value.zakladateliaSpolocnici)
  .then((res) => {
    console.log("Adding Multiple Company Members Spolocnici: " + JSON.stringify(res))
    let multipleCompanyMembersFromResponse = res
    console.log("Multiple Company Members Spolocnici from response  " + JSON.stringify(multipleCompanyMembersFromResponse))
    return multipleCompanyMembersFromResponse
  }).catch( err => {
    console.log(err)
    })
}

function addMultipleCompanyMembersKonatelia(): Promise<Response> {

  companyMembersAndDetails.value.konatelia.members.forEach((item, index: any) => {
    companyMembersAndDetails.value.konatelia.members[index].company_id = companyFomResponse.company.id
  })

  return store.dispatch('addMultipleCompanyMembers', companyMembersAndDetails.value.konatelia)
  .then((res) => {
    console.log("Adding Multiple Company Members Konatelia: " + JSON.stringify(res))
    let multipleCompanyMembersFromResponse = res
    console.log("Multiple Company Members Konatelia from response  " + JSON.stringify(multipleCompanyMembersFromResponse))
    return multipleCompanyMembersFromResponse
  }).catch( err => {
    console.log(err)
    })
}

function addOrder(): Promise<Response> {
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

// async function isEmailAlreadyRegistered(node: any) {
//   try {
//     const res = await store.dispatch("isEmailAlreadyRegistered", node);
//     console.log(res);
//     return true;
//   }
//   catch (error) {
//     return false;
//   }
// }

// async function emailIsUnique(node: any){
//   const result = await isEmailAlreadyRegistered(node.value)
//   return result
// }

// const childRefComponentForPay = ref()
// const callStripePayment = (totalForPay: number, orderId: any) => {
//   childRefComponentForPay.value.payWithStripe(totalForPay, orderId)
// }

const newSustmiApp = async (formdata: any, node: any) => {
  registerAddress().then(() => {
        registerUser().then(() => {
          
          if(userFromResponse){
          
            registerHqAddress().then(() => {
              addHeadquarter().then(() => {
                addCompany().then(() => {
                  addOrder().then(() => {
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
//             registerHqAddress().then(() => {
//               addHeadquarter().then(() => {
//               addCompany().then(() => {
//                 addMultipleCompanyMembersSpolocnici().then(() => {
//                   addMultipleCompanyMembersKonatelia()
//                   addOrder().then(() => {
//                     userFromResponse = null
//                     hqFromResponse = null
//                     companyOrZivnostModel.value.owner = 0
//                     companyOrZivnostModel.value.headquarters_id = 0
//                     console.log("SUPER!")
//                     router.push({
//                       name:"Thanks You New Order",
//                       params: {
//                         orderId: orderFromRes.id,
//                       }
//                     })
                    
//                   })
//                 })
//               })
//             })
//             })
//           }
//         })
//     })
//     node.clearErrors()
//     // alert('Your application was submitted successfully!')
//   }
//   catch (err: any) {
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