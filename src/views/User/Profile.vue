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


            <div v-if="errorMsg" class="mb-4 flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
              {{ errorMsg }}
              <span @click="errorMsg = ''"
                class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </div>
            <div v-if="sucessMsg"
              class="mb-4 flex items-center justify-between py-3 px-4 bg-green-500 text-white rounded">
              {{ sucessMsg }}
              <span @click="sucessMsg = ''"
                class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </div>


            <div class="shadow overflow-hidden sm:rounded-md bg-gray-800">
              <FormKit type="form" :actions="false" @submit="updateUser">
                <div class="px-4 py-5  sm:p-6">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <FormKit type="text" v-model="userProfile.first_name" name="first-name" id="first-name"
                        label="Krstné meno" autocomplete="given-name" rules="required|minLength:2"
                        class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <FormKit type="text" v-model="userProfile.last_name" name="last-name" id="last-name"
                        label="Priezvisko" autocomplete="family-name" rules="required|minLength:2"
                        class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div class="col-span-6">
                      <FormKit type="email" v-model="userProfile.email" readonly disabled name="email-address"
                        id="email-address" label="Emailová adresa" autocomplete="email"
                        class="bg-gray-100 mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      <p class="mt-2 text-sm text-gray-500">Ak si žiadate zmeniť email prosím kontaktujte nás.</p>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <FormKit type="text" v-model="userProfile.phone" name="telephone" id="telephone"
                        autocomplete="telephone" label="Telefonné číslo" rules="required|minLength:9"
                        class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <FormKit readonly type="text" v-model="userProfile.rodne_cislo" name="rodne_cislo" id="rodne_cislo"
                        autocomplete="off" label="Rodné číslo"
                        class="bg-gray-100 mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      <p class="mt-2 text-sm text-gray-500">Ak si žiadate zmeniť rodné číslo prosím kontaktujte nás.</p>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <FormKit type="text" v-model="userProfile.title_before" name="title_before" id="title_before"
                        autocomplete="off" label="Titul pred menom"
                        class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <FormKit type="text" v-model="userProfile.title_after" name="title_after" id="title_after"
                        autocomplete="off" label="Titul za menom"
                        class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div class="flex w-full justify-end">
                    <button type="submit"
                      class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded">
                      Aktualizovať
                    </button>
                  </div>
                </div>
              </FormKit>
            </div>
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
            <FormKit type="form" :actions="false" @submit="updateUserAddress">

              <div v-if="errorMsgAddress"
                class="mb-4 flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
                {{ errorMsgAddress }}
                <span @click="errorMsgAddress = ''"
                  class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              </div>
              <div v-if="sucessMsgAddress"
                class="mb-4 flex items-center justify-between py-3 px-4 bg-green-500 text-white rounded">
                {{ sucessMsgAddress }}
                <span @click="sucessMsgAddress = ''"
                  class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              </div>

              <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-gray-800 sm:p-6">
                  <div class="grid grid-cols-6 gap-6">

                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                      <FormKit type="text" v-model="userAddress.street" name="street-address" id="street-address"
                        label="Ulica" autocomplete="street-address" rules="required"
                        class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                      <FormKit type="text" v-model="userAddress.street_number" name="street-number-1" id="street-number-1"
                        label="Súpisné číslo" autocomplete="street-number-1" rules="required"
                        class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                      <FormKit type="text" v-model="userAddress.street_number2" name="street-number-2"
                        id="street-number-2" label="Orientačné číslo" autocomplete="street-number-2" rules="required"
                        class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                      <FormKit type="text" v-model="userAddress.city" name="city" id="city" label="Mesto"
                        autocomplete="city" rules="required"
                        class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                      <FormKit type="text" v-model="userAddress.country" name="country" id="country" label="Krajina"
                        autocomplete="country" rules="required"
                        class="mt-1 focus:ring-green-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                      <FormKit type="text" v-model="userAddress.psc" name="postal-code" id="postal-code" label="PSČ"
                        autocomplete="postal-code" rules="required"
                        class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div class="flex w-full justify-end">
                    <button type="submit"
                      class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded">
                      Aktualizovať
                    </button>
                  </div>
                </div>
              </div>
            </FormKit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from '@/store';
import { ref, watch } from 'vue';

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

function updateUser() {
  store
    .dispatch("updateUser", { ...userProfile.value })
    .then(res => {
      errorMsg.value = false
      sucessMsg.value = "Osobné informácie úspešne zmenené."
    })
    .catch(err => {
      sucessMsg.value = false
      errorMsg.value = err.response.data.errors // response data is from store actions
    })
}

function updateUserAddress() {
  store.dispatch("updateUserAddress", { ...userAddress.value })
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