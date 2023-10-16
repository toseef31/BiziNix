<template>
        <div class="text-4xl font-bold pb-4">Účet</div>
        <div class="my-2" v-if="!user.userId">
          Už máte u nás účet?
          <router-link
            to="/login"
            class="text-teal-500 hover:underline"
            >Prihlásiť sa</router-link
          >.
        </div>
        <div>
          <div class="my-2" v-if="user.userId">
            <a class="text-teal-500 hover:underline" href="/moj/dashboard"
              >Prihlásený ako {{ userData.first_name }}
              {{ userData.last_name }}</a
            >
          </div>
          <div v-if="!user.userId">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <FormKit
              type="text"
              name="first_name"
              v-model="userData.first_name"
              id="first_name"
              label="Krstné meno"
              validation="required|length:2"
            />
            <FormKit
              type="text"
              name="last_name"
              v-model="userData.last_name"
              label="Priezvisko"
              validation="required|length:2"
            />
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormKit
              type="email"
              name="email"
              v-model="userData.email"
              label="Email"
              :validation-rules="{ emailIsUnique }"
              validation="required|email|emailIsUnique"
              :validation-messages="{ emailIsUnique: 'E-mail sa už používa!' }"
              validation-visibility="live"
              help="Email ktorý budete používať aj na prihlasenie do účtu."
            />
            <FormKit
              type="password"
              autocomplete="new-password"
              v-model="userData.password"
              name="password"
              label="Heslo"
              validation="required|length:8"
            />
            <FormKit
              type="password"
              autocomplete="new-password"
              v-model="userData.password_confirmation"
              name="password_confirmation"
              label="Zopakujte heslo"
              validation="required|confirm:password"
            />
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormKit
              type="text"
              name="phone"
              v-model="userData.phone"
              autocomplete="phone"
              label="Telefonné číslo"
              validation="required|length:9"
            />
          </div>
        </div>
        </div>
</template>



<script setup lang="ts">
import store from "@/store";
import { ref, computed } from "vue";
import type User from "@/types/User";

const user = computed(() => store.state.user);
const userData = computed(() => store.state.user.data as User);

async function isEmailAlreadyRegistered(node: any) {
  try {
    const res = await store.dispatch("isEmailAlreadyRegistered", node);
    console.log(res);
    return true;
  } catch (error) {
    return false;
  }
}

async function emailIsUnique(node: any) {
  const result = await isEmailAlreadyRegistered(node.value);
  return result;
}

defineExpose({
  userData
})

</script>