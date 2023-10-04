<template>
    <div class="flex flex-col">
      <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-gray-900 shadow">
        <div class="flex flex-1 justify-between px-4">
          <div class="flex justify-start p-4">
            <img class="w-6" src="../assets/logo-small.png" alt="Logo Bizinix" />
          </div>
          <div class="flex flex-1 justify-end py-2">
              <Menu as="nav" class="flex px-2 items-center justify-between flex-wrap gap-4">
                  <MenuItem v-for="item in topnav" :key="item.name" v-slot="{ active }">
                    <button @click="redirectToByName(item.name)" :class="[active ? 'text-teal-500' : 'text-gray-300 hover:text-white', 'pl-2 py-2 text-sm font-bold']">
                      {{ item.name }}
                    </button>
                  </MenuItem>
              </Menu>
            <div class="bold text-white text-3xl px-4">
              |
            </div>
            <div class="flex items-center">
              <button type="button" class="px-4 text-teal-500" v-on:click="redirectToByName('Counseling center')">
                <span class="sr-only">Counseling center</span>
                <NewspaperIcon class="h-6 w-6" aria-hidden="true" />
              </button>
              <button type="button" class="px-4 text-teal-500" v-on:click="redirectToByName('Contact')">
                <span class="sr-only">Contact us</span>
                <PhoneIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div class="bold text-white text-3xl px-4">
              |
            </div>
            <CompanySelectorInHeader v-if="user.userId"></CompanySelectorInHeader>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }" v-on:click="activePage = item.name">
                    <a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</a>
                  </MenuItem>
                  <MenuItem
                    v-if="user.userId"
                    v-for="item in userNavigationLogOut"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <a
                      @click="logout"
                      class="cursor-pointer"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >{{ item.name }}</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <main class="flex-1">
        <RouterView></RouterView>
      </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import {
  PhoneIcon,
  NewspaperIcon
} from '@heroicons/vue/24/outline'
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CompanySelectorInHeader from "./CompanySelectorInHeader.vue";

const store = useStore();
const router = useRouter();
let user = ref();
user = computed(() => store.state.user);
let activePage = ref("Moja firma");
const currentCompany = computed(() => store.state.selectedCompany)

onBeforeMount(async () => {
  user = computed(() => store.state.user);
  if(user.value.userId){
    await store.dispatch('setUserDataAfterLogin')
   }
})

function redirectToByName(rname: string) {
  if(rname == "Moja firma") {
    return router.push({
      name: "CompanyDetails",
      params: { id: currentCompany.value.id }
    });
  } else {
    return router.push({
      name: rname
    });
  }
}

const userNavigation = [
  { name: 'Môj účet', href: '/moj/user/profile' },
  { name: 'Firmy a služby', href: '/moj/dashboard' },
  { name: 'Fakturácia', href: '/moj/user/fakturacne' }
]

const userNavigationLogOut = [{ name: "Odhlásiť sa", href: "#" }];

const topnav = [
  { name: 'Moja firma'},
  { name: 'Doklady' },
  { name: 'Sídlo a pošta' },
]

function logout() {
  store
    .dispatch("logoutUser") // action in store
    .then(() => {
      router.push({
        name: "Login",
      });
    });
}
</script>