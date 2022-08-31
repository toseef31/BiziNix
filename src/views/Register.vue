<template>

    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Vytvorte si účet</h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Or
                {{ ' ' }}
                <a href="#" class="font-medium text-teal-600 hover:text-teal-500"> Štart your 14-day free trial </a>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <errors>
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
                </errors>
                <form class="grid grid-cols-1 lg:grid-cols-2 gap-6" @submit.prevent="registerUser">
                    
                    <!-- Start first column -->
                    <div class="space-y-6">

                    <div class="md:col-span-1">
                        <div>
                            <h3 class="text-lg font-medium leading-6 text-gray-900">Osobné informácie</h3>
                        </div>
                    </div>

                    <div>
                        <label for="first_name" class="block text-sm font-medium text-gray-700"> Krstné meno </label>
                        <div class="mt-1">
                            <input v-model="user.first_name" id="first_name" name="first_name" type="text"
                                autocomplete="first_name" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="last_name" class="block text-sm font-medium text-gray-700"> Priezvisko </label>
                        <div class="mt-1">
                            <input v-model="user.last_name" id="last_name" name="last_name" type="text"
                                autocomplete="last_name" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                        </div>
                    </div>


                    <div class="flex items-start">
                        <div class="flex h-5 items-center">
                            <input v-model="hasTitle" id="hastitle" name="hastitle" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="hastitle" class="font-medium text-gray-700">Máte titul pred alebo za menom?</label>
                        </div>
                    </div>

                    <div v-if="hasTitle" class="transition-all duration-300">
                        <label for="title_before" class="block text-sm font-medium text-gray-700"> Titul pred menom </label>
                        <div class="mt-1">
                            <input v-model="user.title_before" id="title_before" name="title_before" type="text"
                                autocomplete="title_before" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                        </div>
                    </div>
                    
                    <div v-if="hasTitle">
                        <label for="title_after" class="block text-sm font-medium text-gray-700"> Titul za menom </label>
                        <div class="mt-1">
                            <input v-model="user.title_after" id="title_after" name="title_after" type="text"
                                autocomplete="title_after" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                        </div>
                    </div>
                    
                    <div>
                        <label for="gender" class="block text-sm font-medium text-gray-700"> Pohlavie </label>
                        <div class="mt-1">
                            <select required v-model="user.gender" id="gender" name="gender" autocomplete="gender" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm">
                                <option>Muž</option>
                                <option>Žena</option>
                            </select>
                            <!-- <input v-model="user.gender" id="gender" name="gender" type="text"
                                autocomplete="gender" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" /> -->
                        </div>
                    </div>
                                        
                    <div>
                        <label for="phone" class="block text-sm font-medium text-gray-700"> Telefonné číslo </label>
                        <div class="mt-1">
                            <input v-model="user.phone" id="phone" name="phone" type="text"
                                autocomplete="phone" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                        </div>
                    </div>
                                        
                    <div>
                        <label for="date_of_birth" class="block text-sm font-medium text-gray-700"> Dátum narodenia </label>
                        <div class="mt-1">
                            <input v-model="user.date_of_birth" id="date_of_birth" name="date_of_birth" type="date"
                                autocomplete="date_of_birth" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                        </div>
                    </div>
                                        
                    <div>
                        <label for="rodne_cislo" class="block text-sm font-medium text-gray-700"> Rodné číslo </label>
                        <div class="mt-1">
                            <input v-model="user.rodne_cislo" id="rodne_cislo" name="rodne_cislo" type="text"
                                autocomplete="rodne_cislo" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700"> Email </label>
                        <div class="mt-1">
                            <input v-model="user.email" id="email" name="email" type="email" autocomplete="email"
                                required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700"> Heslo </label>
                        <div class="mt-1">
                            <input v-model="user.password" id="password" name="password" type="password"
                                autocomplete="current-password" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                                <p class="mt-2 text-sm text-gray-500">Heslo musí mať aspoň 8 znakov.</p>
                        </div>
                    </div>
                    <div>
                        <label for="password_confirmation" class="block text-sm font-medium text-gray-700"> Zopakujte heslo </label>
                        <div class="mt-1">
                            <input v-model="user.password_confirmation" id="password_confirmation"
                                name="password_confirmation" type="password"
                                autocomplete="current-password_confirmation" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                        </div>
                    </div>

                    <!-- End first column -->
                    </div>

                    <!-- 
                    <div class="hidden sm:block" aria-hidden="true">
                        <div class="py-5">
                            <div class="border-t border-gray-200" />
                        </div>
                    </div> -->

                    <!-- Start second column -->
                    <div class="space-y-6">

                    <div class="md:col-span-1">
                        <div>
                            <h3 class="text-lg font-medium leading-6 text-gray-900">Adresa</h3>
                        </div>
                    </div>

                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label for="street-address" class="block text-sm font-medium text-gray-700">Ulica</label>
                  <input type="text" v-model="userAddress.street" name="street-address" id="street-address" autocomplete="street-address" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label for="street-address" class="block text-sm font-medium text-gray-700">Súpisné číslo</label>
                  <input type="text" v-model="userAddress.street_number" name="street-address" id="street-address" autocomplete="street-address" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label for="street-address" class="block text-sm font-medium text-gray-700">Orientačné číslo</label>
                  <input type="text" v-model="userAddress.street_number2" name="street-address" id="street-address" autocomplete="street-address" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label for="city" class="block text-sm font-medium text-gray-700">Mesto</label>
                  <input type="text" v-model="userAddress.city" name="city" id="city" autocomplete="city" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="country" class="block text-sm font-medium text-gray-700">Krajina</label>
                  <input type="text" v-model="userAddress.country" name="country" id="country" autocomplete="country" class="mt-1 focus:ring-green-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="postal-code" class="block text-sm font-medium text-gray-700">PSČ</label>
                  <input type="text" v-model="userAddress.psc" name="postal-code" id="postal-code" autocomplete="postal-code" class="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                    <div>
                        <button type="submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">Zaregistrovať sa</button>
                    </div>

                    <!-- End second column -->
                    </div>

                </form>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import store from '@/store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = {
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
    password_confirmation: ''
}

const userAddress = {
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
}

let errorMsg = ref();
let sucessMsg = ref();
let hasTitle = ref();

function registerUser() {
    store
        .dispatch('registerUser', user) // dispatch -> register action in store
        .then((res) => {
            sucessMsg.value = "E-mail na aktiváciu účtu bol odoslaný. Prosím skontrolujte si svoju schránkú, alebo priečinok nevyžiadanej pošty."
            setTimeout(() => {
            router.push({
                name: 'Login'
            })
            }, 1200);
        })
    .catch(err => {
      errorMsg.value = JSON.stringify(err.response.data.errors) // response data is from store actions
    })
}

</script>