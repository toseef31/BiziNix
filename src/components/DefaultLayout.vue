<template>
  <Disclosure as="nav" class="bg-gray-900 hidden sm:block" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-12">
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="hidden sm:block">
            <div class="flex space-x-4">
              <!--- Other links on left side -->
            </div>
          </div>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-end"
        >
          <div class="hidden sm:block">
            <div class="flex space-x-4">
              <router-link
                v-for="item in topBarNavigation"
                :key="item.name"
                :to="item.to"
                active-class="bg-gray-700 text-white"
                :class="[
                  $router.currentRoute.value.name === item.to.name
                    ? ''
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-normal',
                ]"
                >{{ item.name }}</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </Disclosure>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-24">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <router-link :to="{ path: '/' }">
                <img class="w-32" src="../assets/logo.png" alt="Workflow" />
              </router-link>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.to"
                active-class="bg-gray-900 text-white"
                :class="[
                  $router.currentRoute.value.name === item.to.name
                    ? ''
                    : 'text-gray-300 bg-inherit hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                >{{ item.name }}</router-link
              >
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="ml-3 relative">
                <div>
                  <MenuButton
                    class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span class="sr-only">Open user menu</span>
                    <div
                      v-if="user.data.first_name"
                      class="font-bold text-gray-700 rounded-full bg-white flex items-center justify-center font-mono h-8 w-8 text-lg"
                    >
                      {{ user.data.first_name[0] }}
                    </div>
                    <!-- <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" /> -->
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem
                      v-for="item in userNavigation"
                      :key="item.name"
                      v-slot="{ active }"
                    >
                      <router-link
                        :to="item.to"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >{{ item.name }}</router-link
                      >
                    </MenuItem>
                    <MenuItem
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
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            active-class="bg-gray-900 text-white"
            :class="[
              $router.currentRoute.value.name === item.to.name
                ? ''
                : 'text-gray-300 bg-inherit hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
            >{{ item.name }}</router-link
          >
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <router-link
            v-for="item in topBarNavigation"
            :key="item.name"
            :to="item.to"
            active-class="bg-gray-900 text-white"
            :class="[
              $router.currentRoute.value.name === item.to.name
                ? ''
                : 'text-gray-300 bg-inherit hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
            >{{ item.name }}</router-link
          >
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <div
                class="font-bold text-gray-700 rounded-full bg-white flex items-center justify-center font-mono h-8 w-8 text-lg"
              >
                B
              </div>
              <!-- <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" /> -->
            </div>
            <div class="ml-3">
              <div
                v-if="user.data.first_name"
                class="text-base font-medium leading-none text-white"
              >
                {{ user.data.first_name }}
              </div>
              <!-- <div class="text-sm font-medium leading-none text-gray-400">{{ user.email }}</div> -->
            </div>
            <button
              type="button"
              class="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 px-2 space-y-1">
            <router-link
              v-for="item in userNavigation"
              :key="item.name"
              :to="item.to"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 bg-inherit hover:text-white hover:bg-gray-700"
              >{{ item.name }}</router-link
            >
            <DisclosureButton
              v-on:click="logout"
              v-for="item in userNavigationLogOut"
              :key="item.name"
              as="a"
              :href="item.href"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 bg-inherit hover:text-white hover:bg-gray-700"
              >{{ item.name }}</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { BellIcon, MenuIcon, XIcon, LinkIcon } from "@heroicons/vue/outline";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const topBarNavigation = [
  { name: "Podpora", to: { name: "Support" } },
  { name: "Kontakt", to: { name: "Contact" } },
  { name: "Prihlásiť sa", to: { name: "Login" } },
  { name: "Zaregistrovať sa", to: { name: "Register" } },
];
const navigation = [
  { name: "Nástenka", to: { name: "Dashboard" } },
  { name: "Úprava firmy", to: { name: "Edit Company" } },
  { name: "Centrum poradenstva", to: { name: "Counseling center" } },
  { name: "Virtuálne sídlo", to: { name: "Virtual hq" } },
];
const userNavigation = [
  { name: "Váš profil", to: { name: "User Profil" } },
  { name: "Zmena hesla", to: { name: "User Profil" } },
];
const userNavigationLogOut = [{ name: "Odhlásiť sa", href: "#" }];

const store = useStore();
const router = useRouter();

function logout() {
  store
    .dispatch("logoutUser") // action in store
    .then(() => {
      router.push({
        name: "Login",
      });
    });
}

const user = computed(() => store.state.user);
</script>
