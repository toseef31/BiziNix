<template>
  <div class="text-white bg-gray-bizinix min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold">Prihláste sa do svojho účtu</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-gray-bizinix py-8 px-4 border border-bizinix-border shadow sm:rounded-lg sm:px-10">
        <div v-if="errorMsg" class="flex items-center justify-between py-3 mb-3 px-4 bg-red-500 rounded">
          {{ errorMsg }}
          <span @click="errorMsg=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </div>

        <FormKit
          type="form"
          submit-label="Prihlásiť sa"
          @submit="login"
        >
          <FormKit type="email" v-model="user.email" name="email" autocomplete="email" label="Emailová adresa" validation="required" />
          <FormKit type="password" v-model="user.password" name="password" label="Heslo" autocomplete="current-password" validation="required" />
        </FormKit>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input v-model="user.remember" id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-sm"> Zapamätať </label>
            </div>

            <div class="text-sm">
              <router-link :to="{ name: 'Forgot Password' }" class="font-medium text-teal-600 hover:text-teal-500"> Zabudli ste heslo? </router-link>
            </div>
          </div>

      </div>
    </div>
  </div>
  <FooterLayout></FooterLayout>  
</template>

<script setup lang="ts">
import store from '@/store';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import FooterLayout from "@/components/FooterLayout.vue";

const router = useRouter();

const user = {
  email: '',
  password: '',
  remember: false
}

let errorMsg = ref();

const login = async (formdata: any, node: any) => {
  await store
    .dispatch('loginUser', user)
    .then((res) => {
      store.dispatch("setUserDataAfterLogin")
      const redirectPath = sessionStorage.getItem('redirectPath')
      if(redirectPath){
        sessionStorage.removeItem('redirectPath') // Clear the redirect path from sessionStorage
        router.push(redirectPath)
      } else {
        const publicPagePath = sessionStorage.getItem('publicPagePath')
        
        if(publicPagePath){
          sessionStorage.removeItem('publicPagePath') // Clear the public page path from sessionStorage
          router.push(publicPagePath)
        }
        else {
          router.push({ name: 'Home'})
        }
      }
    })
    .catch(err => {
      errorMsg.value = err.response.data.error // response data is from store actions
    })
}

</script>