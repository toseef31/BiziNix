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
  <div class="py-6 bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-800">
      <h2 class="text-center text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Poďme na to</h2>
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

      <FormKit type="form" id="zalZivForm"
        #default="{ value, state: { valid } }"
        :plugins="[stepPlugin]"
        @submit="submitApp"
        :actions="false"
      >
        <!-- Zoznam krokov list steps -->
        <div class="flex items-center justify-center">
          <ul class="steps m-8 list-none flex flex-col md:flex-row space-x-8 cursor-pointer">
            <li v-for="(step, stepName) in steps" :class="['step px-4 py-5 my-1', { 'has-errors': checkStepValidity(stepName) }]" @click="activeStep = stepName.toString()"
            :data-step-valid="step.valid && step.errorCount === 0" :data-step-active="activeStep === stepName.toString()">
              <span
                v-if="checkStepValidity(stepName)"
                class="step--errors"
                v-text="step.errorCount + step.blockingCount"
              />
              {{ camel2title(stepName.toString()) }}
            </li>
          </ul>
        </div>
        <div class="form-body my-6">
          <!-- Predmet podnikania -->
          <section v-show="activeStep === 'PredmetPodnikania'">
            <div class="text-4xl font-bold">Vyberte si premet podnikania</div>
            <div class="mt-2 mb-6">Na tomto mieste vám pomôžeme s výberom najvhodnejších predmetov podnikania. Ako prvú zadajte hlavnú činosť podnikania.</div>
            <FormKit type="group" id="PredmetPodnikania" name="PredmetPodnikania">            
              <FormKit :type="multiSelVueForm" id="subjects_of_business" v-model="companyOrZivnostModel.subjects_of_business" name="subjects_of_business" label="Predmet podnikania" autocomplete="off"
                :items="businessCategori"
                @input="priceForBusinessOfcategories"
                placeholder="Example placeholder"
                help="Môžete vybrať aj viac predmetov podnikania."
                validation="required"/>
            </FormKit>
          </section>
          <!-- Podnikatelské údaje -->
          <section v-show="activeStep === 'Podnikatelské údaje'">
            <div class="text-4xl font-bold">Vaše osobné a podnikatelské údaje</div>
            <div class="my-2">Na tomto mieste zadajte prosím vaše údje.</div>
            <div>
              <FormKit type="group" id="Podnikatelské údaje" name="Podnikatelské údaje">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                  <FormKit type="text" name="first_name" v-model="user.first_name" id="first_name" label="Krstné meno" validation="required|length:2" />
                  <FormKit type="text" name="last_name" v-model="user.last_name" label="Priezvisko" validation="required|length:2" />
                  <FormKit type="text" name="name" v-model="companyOrZivnostModel.name" label="Dodatok k názvu živnosti" />
                  <FormKit type="select" label="Pohlavie" v-model="user.gender" placeholder="Vyberte pohlavie" name="gender" id="gender" :options="['Muž','Žena']" validation="required" validation-visibility="dirty"/>
                </div>
                <div class="flex flex-col md:flex-row md:space-x-4">
                  <FormKit type="checkbox" :ignore="true" v-model="hasTitle" label="Máte titul pred alebo za menom?" id="hasTitle" name="hasTitle" />
                  <div v-show="hasTitle" class="grid grid-cols-2 gap-4">
                    <FormKit type="text" name="title_before" v-model="user.title_before" label="Titul pred menom" />
                    <FormKit type="text" name="title_after" v-model="user.title_after" label="Titul za menom" />
                  </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormKit type="text" name="phone" v-model="user.phone" autocomplete="phone" label="Telefonné číslo" validation="required|length:9" />
                  <FormKit type="date" name="date_of_birth" v-model="user.date_of_birth" autocomplete="date_of_birth" label="Dátum narodenia" validation="required|length:10" />
                  <FormKit type="text" name="rodne_cislo" v-model="user.rodne_cislo" label="Rodné číslo" validation="required|length:10" />
                </div>
                <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <FormKit type="text" name="city" v-model="userAddress.city" label="Mesto" validation="required" />
                  <FormKit type="text" name="country" v-model="userAddress.country" label="Krajina" validation="required" />
                  <FormKit type="text" name="psc" v-model="userAddress.psc" label="PSČ" validation="required" />
                  <FormKit type="text" name="street" v-model="userAddress.street" label="Ulica" validation="required" />
                  <FormKit type="text" name="street_number" v-model="userAddress.street_number" label="Súpisne číslo" validation="required" />
                  <FormKit type="text" name="street_number2" v-model="userAddress.street_number2" label="Orientačné číslo" validation="required" />
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormKit type="email" name="email"
                    v-model="user.email"
                    label="Email"
                    :validation-rules="{ emailIsUnique }"
                    validation="required|email|emailIsUnique"
                    :validation-messages="{ emailIsUnique: 'E-mail sa už používa!'}"
                    validation-visibility="live"                  
                    help="Email ktorý budete používať aj na prihlasenie do účtu."
                  />
                  <FormKit type="password" autocomplete="new-password" v-model="user.password" name="password" label="Heslo" validation="required|length:8" />
                  <FormKit type="password" autocomplete="new-password"  v-model="user.password_confirmation" name="password_confirmation" label="Zopakujte heslo" validation="required|confirm:password" />
                </div>
                <div class="grid grid-cols-1 gap-4">
                  <div class="font-bold">Miesto podnikania?</div>
                  <FormKit type="checkbox" v-model="placeOfBusinness" :ignore="true" :disabled="true" label="Totožné s trvalým bydliskom?" name="placeOfBusinness" />
                </div>
                <div class="flex flex-col md:flex-row md:space-x-4">
                  <FormKit type="radio" v-model="companyRegDateCheckboxValue" :ignore="true" label="Registrácia živnosti ku dňu?"
                  :options="[{ value: 'Nezáleží', label: 'Nezáleží' }, { value: 'Podľa dátumu', label: 'Podľa dátumu' }]" name="companyRegDateCheckbox"
                  validation="required" />
                  <div v-if="companyRegDateCheckboxValue === 'Podľa dátumu'">
                    <FormKit type="date" name="registration_date" v-model="companyOrZivnostModel.registration_date" autocomplete="off" label="Dátum zápisu do živnostenského registra" validation="required" />
                  </div>
                </div>
              </FormKit>
            </div>
          </section>
          <!-- Fakturačné údaje -->
          <section v-show="activeStep === 'Fakturačné údaje'">
            <div class="text-4xl font-bold">Fakturačné údaje</div>
            <div class="my-2">Na nasledujúce údaje vám budeme odosielať faktúri.</div>
            <div>
              <FormKit type="group" v-model="fakturacne_udaje" id="Fakturačné údaje" name="Fakturačné údaje">
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
                <FormKit type="text" name="first_name" label="Meno" validation="required" />
                <FormKit type="text" name="last_name" label="Priezvisko" validation="required" />
                <FormKit type="checkbox" v-model="invoiceAddressIsSame" :ignore="true" :disabled="true" label="Fakturačná adresa je rovnaká ako podnikateľská?" name="invoiceAddressIsSame" />
                </div>
                <div class="w-fit">
                  <FormKit type="checkbox" v-model="orderingAsCompany" :ignore="true" label="Objednávate ako firma?" id="orderingAsCompany" name="orderingAsCompany" />
                </div>
                <div v-show="orderingAsCompany" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <FormKit type="text" name="name" label="Názov firmy" />
                    <FormKit type="text" name="ico" label="IČO" />
                    <FormKit type="text" name="dic" label="DIČ" />
                    <FormKit type="text" name="ic_dph" label="IČ DPH" />
                </div>

                <div class="w-full">
                  <FormKit type="radio" v-model="paymentOptions" label="Spôsob platby?" name="payment_method"
                  :options="
                  [
                    { value: 'iban', label: 'Priamy vklad na účet', help: 'Pošlite vašu platbu priamo na náš bankový účet, ktorý nájdete na ďakovnej stránke po dokončení objednávky.' },
                    { value: 'stripe', label: 'Online kartou', help: 'Platba prostredníctvom platobnej brány Stripe.' }
                  ]"
                  validation="required" />
                </div>

              </FormKit>
            </div>
          </section>
        </div>

        <div class="flex my-2 justify-center space-x-4">
          <FormKit type="button" :disabled="activeStep == 'PredmetPodnikania'" @click="setStep(-1)" v-text="'Previous step'" />
          <FormKit type="button" class="next" :disabled="activeStep == 'Fakturačné údaje' " @click="setStep(1)" v-text="'Next step'"/>
        </div>

        <div class="my-4">
          <div>Cena za zavolené predmety podnikania: {{ priceForBusinessCategories }}</div>
          <div>Celkom k úhrade: {{ totalForPay }}</div>
        </div>

        <FormKit type="submit" label="Objednať s povinnosťou platby" :disabled="!valid" />
        <button class="bg-fuchsia-500 p-2 rounded-md" @click="logujData">Loguj dáda</button> 
        <pre wrap>{{ value }}</pre>

      </FormKit>

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

const camel2title = (str: string) => str
  .replace(/([A-Z])/g, (match) => ` ${match}`)
  .replace(/^./, (match) => match.toUpperCase())
  .trim()

const { steps, visitedSteps, activeStep, setStep, stepPlugin } = useSteps()
const multiSelVueForm = createInput(formkitCustomMultiSelectVue, {
  props: ['items'],
})
const checkStepValidity = (stepName: any) => {
  return (steps[stepName].errorCount > 0 || steps[stepName].blockingCount > 0) && visitedSteps.value.includes(stepName)
}

let businessCategori = ref([
  {
    label: '' as string,
    value: ''
  }
])

let companyRegDateCheckboxValue = ref("")
let paymentOptions = ref("")
let priceForBusinessCategories = ref(0);
let fakturacne_udaje = ref({
  first_name: '',
  last_name: '',
  name: '',
  ico: '',
  dic: '',
  ic_dph: '',
  address_id: 12
  // to do address id
})
let userAddress = ref({
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
})
let user = ref({
    address_id: 0, // address should be created first and save to store
    first_name: '',
    last_name: '',
    title_before: '',
    title_after: '',
    gender: '',
    phone: '',
    date_of_birth: '',
    rodne_cislo: '',
    email: '',
    password: '',
    password_confirmation: '',
} as User)
let companyOrZivnostModel = ref({
  name: '',
  headquarters_id: 0,
  type: 2, // type 1 sro, type 2 živnosť
  status: 2, // Zakladanie spoločnosti je v priebehu
  ičo: '',
  dič: '',
  icdph: '',
  is_dph: false,
  registration_date: '',
  owner: 0,
  subjects_of_business: [{
    id: '',
    title: '',
    price: 0,
    description: '',
    category_id: 0
  }]
})
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

let totalForPay = computed(() => priceForBusinessCategories.value + order.value.items[0].price)

onBeforeMount( () => {

  companyOrZivnostModel.value.subjects_of_business.pop()

  store.dispatch("getAllSubjectOfBusiness")
  .then(res => {
    businessCategori.value.shift()
    res.data.data.forEach((element: any) => {
      businessCategori.value.push({
        label: element.title,
        value: element
      })
    })

    //businessCategori.value.shift()
    //businessCategori.value = [ ...businessCategori.value ]

  })
    .catch(err => {
    // sucessMsg.value = false
    // errorMsg.value = err.response.data.errors // response data is from store actions
  })
})

function logujData(){
  console.log(companyOrZivnostModel.value.subjects_of_business)
  console.log(userAddress.value)
  console.log(user.value)
  console.log(headquarter.value)
  console.log(companyOrZivnostModel.value)
  console.log(fakturacne_udaje.value)
  console.log(paymentOptions.value)
  console.log(order.value)
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

function registerUser(): Promise<Response>  {

  user.value.address_id = addressFromResponse.address_id

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
  headquarter.value.owner_name = user.value.first_name + " " + user.value.last_name

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

function addCompany(): Promise<Response> {

  let dodatokNazvuZivnosti: string = companyOrZivnostModel.value.name // Dodatok k nazvu živnosti
  companyOrZivnostModel.value.owner = userFromResponse.user_id
  companyOrZivnostModel.value.headquarters_id = hqFromResponse.id
  companyOrZivnostModel.value.name = user.value.first_name + " " + user.value.last_name + " " + dodatokNazvuZivnosti

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

function addOrder(): Promise<Response> {
  order.value.payment_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  order.value.payment_method = paymentOptions.value
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

  order.value.fakturacne_udaje[0].first_name = fakturacne_udaje.value.first_name
  order.value.fakturacne_udaje[0].last_name = fakturacne_udaje.value.last_name
  order.value.fakturacne_udaje[0].dic = fakturacne_udaje.value.dic
  order.value.fakturacne_udaje[0].ic_dph = fakturacne_udaje.value.ic_dph
  order.value.fakturacne_udaje[0].ico = fakturacne_udaje.value.ico
  if(invoiceAddressIsSame.value){
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
                  router.push({
                    name:"Thanks You New Order",
                    params: {
                      orderId: orderFromRes.id,
                    }
                  })
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