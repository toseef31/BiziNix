<template>
<div class="text-4xl font-bold">Vaše osobné údaje</div>
<div class="mt-2 mb-6">Na tomto mieste zadajte prosím vaše údaje.</div>

<template v-if="loading">
  <div class="flex flex-col items-center py-12">
    <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span class="mt-4">Načitávam...</span>
  </div>
</template>

<div class="grid grid-cols-2 md:grid-cols-2 gap-4 items-center">
  <FormKit type="text" :disabled="disabledInputs" name="first_name" v-model="user.first_name" id="first_name" label="Krstné meno" validation="required|length:2" />
  <FormKit type="text" :disabled="disabledInputs"  name="last_name" v-model="user.last_name" label="Priezvisko" validation="required|length:2" />
</div>
<div class="grid grid-cols-2 md:grid-cols-2 gap-4">
  <FormKit type="text" :disabled="disabledInputs" name="phone" v-model="user.phone" autocomplete="phone" label="Telefonné číslo" validation="required|length:9" />
  <FormKit type="email" v-if="!userId" name="email"
    v-model="user.email"
    label="Email"
    :validation-rules="{ emailIsUnique }"
    validation="required|email|emailIsUnique"
    :validation-messages="{ emailIsUnique: 'E-mail sa už používa!'}"
    validation-visibility="live"                  
    help="Email ktorý budete používať aj na prihlasenie do účtu."
  />
  <FormKit type="email" v-if="userId" :disabled="disabledInputs" name="email"
    v-model="user.email"
    label="Email"
    help="Email ktorý budete používať aj na prihlasenie do účtu."
  />
</div>
<div v-if="!userId" class="grid grid-cols-2 md:grid-cols-2 gap-4">
  <FormKit type="password" autocomplete="new-password" v-model="user.password" name="password" label="Heslo" validation="required|length:8" />
  <FormKit type="password" autocomplete="new-password"  v-model="user.password_confirmation" name="password_confirmation" label="Zopakujte heslo" validation="required|confirm:password" />
</div>
<div v-if="isValidEmail &&!isEmailUnique && !userId">
  <div class="mb-4 flex items-center py-3 px-4 bg-red-500 rounded">
    Účet s emailom <b>{{ user.email }}</b> je už zaregistrovaný, zadajte iný email alebo sa prihláste.
  </div>
  <div v-if="errorMsg" class="flex items-center justify-between py-3 mb-3 px-4 bg-red-500 rounded">
    {{ errorMsg }}
    <span @click="errorMsg=''" class="rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
  </div>
  <!-- Login inside parent form -->
  <FormKit
    type="form"
    submit-label="Prihlásiť sa"
    @submit="login"
  >
    <FormKit type="email" v-model="userForLogin.email" name="email" autocomplete="email" label="Emailová adresa" validation="required" />
    <FormKit type="password" v-model="userForLogin.password" name="password" label="Heslo" autocomplete="current-password" validation="required" />
  </FormKit>
</div>
</template>

<script setup lang="ts">
import store from '@/store';
import type User from '@/types/User';
import { computed, onMounted } from 'vue';
import { onBeforeMount, ref } from 'vue';

const isEmailUnique = ref(true)
const disabledInputs = ref(false)
const loading = ref(false);
// Regular expression for matching email addresses
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userId = computed(() => { return store.getters.getUserId })
const userData = computed(() => { return store.getters.getUserData })
let errorMsg = ref();

function btnLog(){
  console.log("Loading hodnota je: ", loading.value)
}
  
const userForLogin = {
    email: '',
    password: ''
  }

let user = ref({
    address_id: 0, // address should be created first and save to store
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
    password_confirmation: '',
} as User)

onBeforeMount( () => {
  if(userId.value){
    disabledInputs.value = true
    user.value.first_name = userData.value.first_name
    user.value.last_name = userData.value.last_name
    user.value.phone = userData.value.phone
    user.value.email = userData.value.email
  }
})

const isValidEmail = computed(() => {
  return emailRegex.test(user.value.email);
});

async function isEmailAlreadyRegistered(node: any) {

    try {
      const res = await store.dispatch("isEmailAlreadyRegistered", node);
      console.log(res);
      isEmailUnique.value = true
      return true;
    }
    catch (error) {
      isEmailUnique.value = false
      return false;
    }
}

async function emailIsUnique(node: any){
  if(!userId.value){
    const result = await isEmailAlreadyRegistered(node.value)
    return result
  } else {
    return true
  }
}

const login = async (formdata: any, node: any) => {

  await store.dispatch('loginUser', userForLogin)
  .then(async (res) => {
      await store.dispatch("setUserDataAfterLogin")
      disabledInputs.value = true
      loading.value = false
      user.value.first_name = userData.value.first_name
      user.value.last_name = userData.value.last_name
      user.value.phone = userData.value.phone
    })
    .catch(err => {
      errorMsg.value = err.response.data.error // response data is from store actions
    })
}

defineExpose({
  user
})

</script>