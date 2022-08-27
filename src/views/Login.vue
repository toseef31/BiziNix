<template>

  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Prihláste sa do svojho účtu</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        {{ ' ' }}
        <a href="#" class="font-medium text-teal-600 hover:text-teal-500"> start your 14-day free trial </a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="login">
        <div v-if="errorMsg" class="flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
          {{ errorMsg }}
          <span @click="errorMsg=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"> Emailová adresa </label>
            <div class="mt-1">
              <input v-model="user.email" id="email" name="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"> Heslo </label>
            <div class="mt-1">
              <input v-model="user.password" id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input v-model="user.remember" id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Zapamätať </label>
            </div>

            <div class="text-sm">
              <router-link :to="{ name: 'Forgot Password' }" class="font-medium text-teal-600 hover:text-teal-500"> Zabudli ste heslo? </router-link>
            </div>
          </div>

          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">Prihlásiť sa</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from '@/store';
import { useRouter } from 'vue-router';
import { ref } from 'vue';


const router = useRouter();

const user = {
  email: '',
  password: '',
  remember: false
}

let errorMsg = ref();


function login(){
  store
    .dispatch('loginUser', user)
    .then((res) => {
      console.log(res)
      router.push({
        name: 'Dashboard',  
      })
    })
    .catch(err => {
      errorMsg.value = err.response.data.error // response data is from store actions
    })
}

</script>