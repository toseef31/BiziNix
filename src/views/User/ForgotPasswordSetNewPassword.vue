<template>

  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Obnova hesla</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="forgotPasswordSetNewPassword">
        <div v-if="errorMsg" class="flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
          {{ errorMsg }}
          <span @click="errorMsg=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </div>
        <div v-if="setNewPassword" class="flex items-center justify-between py-3 px-4 bg-green-500 text-white rounded">
          {{ setNewPassword }}
          <span @click="setNewPassword=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"> E-mail použitý pri registrácii </label>
            <div class="mt-1">
              <input disabled readonly v-model="newPassword.email" id="email" name="email" type="email" autocomplete="email" required class="cursor-not-allowed bg appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"> Nové heslo </label>
            <div class="mt-1">
              <input v-model="newPassword.password" id="password" name="password" type="password" autocomplete="off" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700"> Potvrďte nové heslo </label>
            <div class="mt-1">
              <input v-model="newPassword.password_confirmation" id="password_confirmation" name="password_confirmation" type="password" autocomplete="off" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Odoslať</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from '@/store';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const newPassword = ref({
  email: '',
  password: '',
  password_confirmation: '',
  token: ''
})

let errorMsg = ref();
let setNewPassword = ref();


onMounted(() => {
  
  const token = route.params.token

  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}/api/password/find/${token}`)
  .then(response => {
    // console.log(response);
    newPassword.value.email = response.data.email
    newPassword.value.token = response.data.token
    return response;
  })
  .catch(err => {
    errorMsg.value = err.response.data.message // response data is from store actions
  })

})

function forgotPasswordSetNewPassword(){
  store
    .dispatch('forgotPasswordSetNewPassword', newPassword.value)
    .then(res => {
        // console.log(res.data)
        errorMsg.value = null
        setNewPassword.value = "Heslo úspešne zmenené. Budete presmerovaný na prihlásenie."
        setTimeout(() => {
          router.push({
            name: 'Login'
          })
        }, 5000);
    })
    .catch(err => {
        // console.log(err)
        setNewPassword.value = null
        errorMsg.value = err.response.data.message // response data is from store actions
    })
}

</script>