<template>
<h1>{{ userProfile }}</h1>

    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Uživatelský profil</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
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
        <form @submit.prevent="updateUser">

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
                  <input type="text" v-model="userProfile.first_name" name="first-name" id="first-name" autocomplete="given-name" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="last-name" class="block text-sm font-medium text-gray-700">Priezvisko</label>
                  <input type="text" v-model="userProfile.last_name" name="last-name" id="last-name" autocomplete="family-name" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6">
                  <label for="email-address" class="block text-sm font-medium text-gray-700">Emailová adresa</label>
                  <input type="text" v-model="userProfile.email" readonly disabled name="email-address" id="email-address" autocomplete="email" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <p class="mt-2 text-sm text-gray-500">Ak si žiadate zmeniť email prosím kontaktujte nás.</p>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="telephone" class="block text-sm font-medium text-gray-700">Telefonné číslo</label>
                  <input type="text" v-model="userProfile.phone" name="telephone" id="telephone" autocomplete="telephone" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="rodne_cislo" class="block text-sm font-medium text-gray-700">Rodné číslo</label>
                  <input disabled readonly type="text" v-model="userProfile.rodne_cislo" name="rodne_cislo" id="rodne_cislo" autocomplete="off" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <p class="mt-2 text-sm text-gray-500">Ak si žiadate zmeniť rodné číslo prosím kontaktujte nás.</p>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="title_before" class="block text-sm font-medium text-gray-700">Titul pred menom</label>
                  <input type="text" v-model="userProfile.title_before" name="title_before" id="title_before" autocomplete="off" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="title_after" class="block text-sm font-medium text-gray-700">Titul za menom</label>
                  <input type="text" v-model="userProfile.title_after" name="title_after" id="title_after" autocomplete="off" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
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
        </form>
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
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">

                <div class="col-span-6">
                  <label for="street-address" class="block text-sm font-medium text-gray-700">Ulica a číslo</label>
                  <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label for="city" class="block text-sm font-medium text-gray-700">Mesto</label>
                  <input type="text" name="city" id="city" autocomplete="city" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="country" class="block text-sm font-medium text-gray-700">Krajina</label>
                  <input type="text" name="country" id="country" autocomplete="country" class="mt-1 focus:ring-green-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="postal-code" class="block text-sm font-medium text-gray-700">PSČ</label>
                  <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">Uložiť</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  </div>
  <!-- /End replace -->
  </div>
  </main>
</template>

<script setup lang="ts">
import axiosClient from '@/axios';
import store from '@/store';
import { ref, computed, watch } from 'vue';

let errorMsg = ref();
let sucessMsg = ref();

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

watch(
  () => store.state.user.data,
  (newVal, oldVal) => {
    console.log("NewVal is: " +  JSON.stringify(newVal))
    userProfile.value = {
      ...JSON.parse(JSON.stringify(newVal))
    } 
  }
)

store.dispatch("setUserDataAfterLogin")

//const userProfile = computed( () => store.state.user.data)

function updateUser(){

  store
    .dispatch("updateUser", {...userProfile.value})
    .then((res) => {
      console.log(userProfile)
      console.log("Ja som sucess masage" + res.sucess)
      sucessMsg.value = "Údaje úspešne zmenené"
    })
    .catch(err => {
    console.log("Ja som error masage: " + err)
    errorMsg.value = err // response data is from store actions
  })
  
}

</script>