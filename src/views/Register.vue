<template>

    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Vytvorte si účet</h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Or
                {{ ' ' }}
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Štart your 14-day free trial </a>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form class="space-y-6" @submit.prevent="registerUser">
                    <div v-if="errorMsg" class="flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
                    {{ errorMsg }}
                    <span @click="errorMsg=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                    </div>
                    <div>
                        <label for="first_name" class="block text-sm font-medium text-gray-700"> Krstné meno </label>
                        <div class="mt-1">
                            <input v-model="user.first_name" id="first_name" name="first_name" type="text"
                                autocomplete="first_name" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="last_name" class="block text-sm font-medium text-gray-700"> Priezvisko </label>
                        <div class="mt-1">
                            <input v-model="user.last_name" id="last_name" name="last_name" type="text"
                                autocomplete="last_name" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="title_before" class="block text-sm font-medium text-gray-700"> Titul pred menom </label>
                        <div class="mt-1">
                            <input v-model="user.title_before" id="title_before" name="title_before" type="text"
                                autocomplete="title_before" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    
                    <div>
                        <label for="title_after" class="block text-sm font-medium text-gray-700"> Titul za menom </label>
                        <div class="mt-1">
                            <input v-model="user.title_after" id="title_after" name="title_after" type="text"
                                autocomplete="title_after" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    
                    <div>
                        <label for="gender" class="block text-sm font-medium text-gray-700"> Pohlavie </label>
                        <div class="mt-1">
                            <input v-model="user.gender" id="gender" name="gender" type="text"
                                autocomplete="gender" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                                        
                    <div>
                        <label for="phone" class="block text-sm font-medium text-gray-700"> Telefonné číslo </label>
                        <div class="mt-1">
                            <input v-model="user.phone" id="phone" name="phone" type="text"
                                autocomplete="phone" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                                        
                    <div>
                        <label for="date_of_birth" class="block text-sm font-medium text-gray-700"> Dátum narodenia </label>
                        <div class="mt-1">
                            <input v-model="user.date_of_birth" id="date_of_birth" name="date_of_birth" type="text"
                                autocomplete="date_of_birth" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                                        
                    <div>
                        <label for="rodne_cislo" class="block text-sm font-medium text-gray-700"> Rodné číslo </label>
                        <div class="mt-1">
                            <input v-model="user.rodne_cislo" id="rodne_cislo" name="rodne_cislo" type="text"
                                autocomplete="rodne_cislo" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700"> Email </label>
                        <div class="mt-1">
                            <input v-model="user.email" id="email" name="email" type="email" autocomplete="email"
                                required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700"> Heslo </label>
                        <div class="mt-1">
                            <input v-model="user.password" id="password" name="password" type="password"
                                autocomplete="current-password" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    <div>
                        <label for="password_confirmation" class="block text-sm font-medium text-gray-700"> Zopakujte heslo </label>
                        <div class="mt-1">
                            <input v-model="user.password_confirmation" id="password_confirmation"
                                name="password_confirmation" type="password"
                                autocomplete="current-password_confirmation" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Zaregistrovať sa</button>
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

let errorMsg = ref();

function registerUser() {
    store
        .dispatch('registerUser', user) // dispatch -> register action in store
        .then((res) => {
            router.push({
                name: 'Dashboard'
            })
        })
    .catch(err => {
      errorMsg.value = JSON.stringify(err.response.data.errors) // response data is from store actions
    })

}

</script>