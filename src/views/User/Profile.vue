<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-gray-600 pb-10">
        Uživatelský profil
    </h1>
    <div class="px-4 py-6 sm:px-0">
      <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Osobné informácie</h3>
              <p class="mt-1 text-sm text-gray-600">Meno a prezvisko, alebo telefonné číslo a e-mail.</p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <Form @submit="updateUser">

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

              <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label for="first-name" class="block text-sm font-medium text-gray-700">Krstné meno</label>
                      <Field type="text" v-model="userProfile.first_name" name="first-name" id="first-name" autocomplete="given-name" rules="required|minLength:2"
                      class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      <ErrorMessage name="first-name" />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="last-name" class="block text-sm font-medium text-gray-700">Priezvisko</label>
                      <Field type="text" v-model="userProfile.last_name" name="last-name" id="last-name" autocomplete="family-name" rules="required|minLength:2"
                      class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      <ErrorMessage name="last-name" />
                    </div>

                    <div class="col-span-6">
                      <label for="email-address" class="block text-sm font-medium text-gray-700">Emailová adresa</label>
                      <Field type="email" v-model="userProfile.email" readonly disabled name="email-address" id="email-address" autocomplete="email" class="bg-gray-100 mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      <p class="mt-2 text-sm text-gray-500">Ak si žiadate zmeniť email prosím kontaktujte nás.</p>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="telephone" class="block text-sm font-medium text-gray-700">Telefonné číslo</label>
                      <Field type="text" v-model="userProfile.phone" name="telephone" id="telephone" autocomplete="telephone" rules="required|minLength:9" 
                      class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      <ErrorMessage name="telephone" />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="rodne_cislo" class="block text-sm font-medium text-gray-700">Rodné číslo</label>
                      <Field readonly type="text" v-model="userProfile.rodne_cislo" name="rodne_cislo" id="rodne_cislo" autocomplete="off" class="bg-gray-100 mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      <p class="mt-2 text-sm text-gray-500">Ak si žiadate zmeniť rodné číslo prosím kontaktujte nás.</p>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="title_before" class="block text-sm font-medium text-gray-700">Titul pred menom</label>
                      <Field type="text" v-model="userProfile.title_before" name="title_before" id="title_before" autocomplete="off" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="title_after" class="block text-sm font-medium text-gray-700">Titul za menom</label>
                      <Field type="text" v-model="userProfile.title_after" name="title_after" id="title_after" autocomplete="off" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <!-- <div class="col-span-6 sm:col-span-3">
                      <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                      <select id="country" name="country" autocomplete="country-name" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div> -->
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">Uložiť</button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200" />
        </div>
      </div>

      <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Adresa</h3>
              <p class="mt-1 text-sm text-gray-600">Trvala adresa bydliska.</p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <Form @submit="updateUserAddress">

              <div v-if="errorMsgAddress" class="mb-4 flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
              {{ errorMsgAddress }}
              <span @click="errorMsgAddress=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </div>
            <div v-if="sucessMsgAddress" class="mb-4 flex items-center justify-between py-3 px-4 bg-green-500 text-white rounded">
              {{ sucessMsgAddress }}
              <span @click="sucessMsgAddress=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </div>

              <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div class="grid grid-cols-6 gap-6">

                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label for="street-address" class="block text-sm font-medium text-gray-700">Ulica</label>
                      <Field type="text" v-model="userAddress.street" name="street-address" id="street-address" autocomplete="street-address" rules="required"
                      class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      <ErrorMessage name="street-address" />
                    </div>

                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label for="street-number-1" class="block text-sm font-medium text-gray-700">Súpisné číslo</label>
                      <Field type="text" v-model="userAddress.street_number" name="street-number-1" id="street-number-1" autocomplete="street-number-1" rules="required"
                      class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      <ErrorMessage name="street-number-1" />
                    </div>

                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label for="street-number-2" class="block text-sm font-medium text-gray-700">Orientačné číslo</label>
                      <Field type="text" v-model="userAddress.street_number2" name="street-number-2" id="street-number-2" autocomplete="street-number-2" rules="required"
                      class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      <ErrorMessage name="street-number-2" />
                    </div>

                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label for="city" class="block text-sm font-medium text-gray-700">Mesto</label>
                      <Field type="text" v-model="userAddress.city" name="city" id="city" autocomplete="city" rules="required"
                      class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      <ErrorMessage name="city" />
                    </div>

                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label for="country" class="block text-sm font-medium text-gray-700">Krajina</label>
                      <Field type="text" v-model="userAddress.country" name="country" id="country" autocomplete="country" rules="required" 
                      class="mt-1 focus:ring-green-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      <ErrorMessage name="country" />
                    </div>

                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label for="postal-code" class="block text-sm font-medium text-gray-700">PSČ</label>
                      <Field type="text" v-model="userAddress.psc" name="postal-code" id="postal-code" autocomplete="postal-code" rules="required" 
                      class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      <ErrorMessage name="postal-code" />
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">Uložiť</button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from '@/store';
import { ref, watch } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';

let errorMsg = ref();
let sucessMsg = ref();
let errorMsgAddress = ref();
let sucessMsgAddress = ref();

store.dispatch("setUserDataAfterLogin")
store.dispatch("userAddress")

let userProfile = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  title_before: "",
  title_after: "",
  gender: "",
  date_of_birth: "",
  rodne_cislo: "",  
});

let userAddress = ref({
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
})


watch(
  () => store.state.user.data,
  (newValUserProfile, oldValUserProfile) => {
    userProfile.value = {
      ...JSON.parse(JSON.stringify(newValUserProfile))
    }
  }
)

watch(
  () => store.state.user.address,
  (newValUserAddres, oldValUserAddres) => {
    userAddress.value = {
      ...JSON.parse(JSON.stringify(newValUserAddres))
    } 
  }
)

function updateUser(){
  store
  .dispatch("updateUser", {...userProfile.value})
  .then(res => {  
      errorMsg.value = false
      sucessMsg.value = "Osobné informácie úspešne zmenené."
    })
    .catch(err => {
    sucessMsg.value = false
    errorMsg.value = err.response.data.errors // response data is from store actions
  })  
}

function updateUserAddress(){
  store.dispatch("updateUserAddress", {...userAddress.value})
  .then(res => {
    errorMsgAddress.value = false
    sucessMsgAddress.value = "Adresa úspešne zmenená."
  })
  .catch(err => {
    sucessMsgAddress.value = false
    errorMsgAddress.value = err.response.data.errors // response data is from store actions
  })  
}



</script>