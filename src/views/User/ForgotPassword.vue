<template>

  <div class="text-white bg-gray-bizinix min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold">Obnova hesla</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="py-8 px-4 shadow border border-bizinix-border sm:rounded-lg sm:px-10">

        <div v-if="errorMsg" class="flex items-center justify-between py-3 mb-3 px-4 bg-red-500 text-white rounded">
          {{ errorMsg }}
          <span @click="errorMsg=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </div>
        <div v-if="emailWithPasswordWasSend" class="flex items-center justify-between py-3 mb-3 px-4 bg-green-500 text-white rounded">
          {{ emailWithPasswordWasSend }}
          <span @click="emailWithPasswordWasSend=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </div>

        <FormKit
          type="form"
          submit-label="Odoslať e-mail"
          @submit="forgotPasswordSendEmmail"
        >
          <FormKit type="email" v-model="user.email" name="email" autocomplete="email" label="E-mail použitý pri registráci" validation="required" />
        
        </FormKit>

      </div>
    </div>
  </div>
  <FooterLayout></FooterLayout>
</template>

<script setup lang="ts">
import store from '@/store';
import { ref } from 'vue';
import FooterLayout from '@/components/FooterLayout.vue';

const user = {
  email: '',
}

let errorMsg = ref();
let emailWithPasswordWasSend = ref();


async function forgotPasswordSendEmmail(){
  await store
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