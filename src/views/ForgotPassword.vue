<template>

  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Obnova hesla</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="forgotPasswordSendEmmail">
        <div v-if="errorMsg" class="flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
          {{ errorMsg }}
          <span @click="errorMsg=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </div>
        <div v-if="emailWithPasswordWasSend" class="flex items-center justify-between py-3 px-4 bg-green-500 text-white rounded">
          {{ emailWithPasswordWasSend }}
          <span @click="emailWithPasswordWasSend=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"> E-mail použitý pri registrácii </label>
            <div class="mt-1">
              <input v-model="user.email" id="email" name="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">Odoslať</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from '@/store';
import { ref } from 'vue';

const user = {
  email: '',
}

let errorMsg = ref();
let emailWithPasswordWasSend = ref();


function forgotPasswordSendEmmail(){
  store
    .dispatch('forgotPasswordSendEmmail', user)
    .then(res => {
        errorMsg.value = null
        emailWithPasswordWasSend.value = res.data.message
    })
    .catch(err => {
        emailWithPasswordWasSend.value = null
        errorMsg.value = err.response.data.message // response data is from store actions
    })

}

</script>