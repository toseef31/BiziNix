<template>
  <Disclosure as="nav" class="bg-gray-900 hidden sm:block" v-slot="{ open }">
    <div class="mx-auto max-w-full px-4 sm:px-6">
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
                active-class="text-gray-400"
                :class="[
                  $router.currentRoute.value.name === item.to.name
                    ? ''
                    : 'text-white hover:text-gray-400',
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
  <Popover class="relative bg-gray-800">
    <div class="mx-auto max-w-full px-4 sm:px-6">
      <div
        class="flex items-center justify-between border-b-2 border-gray-800 py-6 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <span class="sr-only">Bizinix.sk</span>
            <router-link :to="{ path: '/' }">
              <img class="w-32" src="../assets/logo.png" alt="Logo Bizinix" />
            </router-link>
          </a>
        </div>
        <div class="-my-2 -mr-2 md:hidden">
          <PopoverButton
            class="inline-flex items-center justify-center rounded-md bg-teal-600 p-2 text-white hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
          >
            <span class="sr-only">Open menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden space-x-6 md:flex">
          <Popover class="relative" v-slot="{ open, close }">
            <PopoverButton
              :class="[
                open ? 'text-gray-400' : 'text-white',
                'group inline-flex items-center rounded-md bg-gray-800 text-base font-medium hover:text-gray-400 focus:outline-none',
              ]"
              @mouseover="(e) => hoverPopover(e, open)"
              @mouseleave="closePopover(close)"
            >
              <span>Firmy a ich úprava</span>
              <ChevronDownIcon
                :class="[
                  open ? 'text-gray-400' : 'text-white',
                  'ml-2 h-5 w-5 group-hover:text-gray-400',
                ]"
                aria-hidden="true"
              />
            </PopoverButton>

            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel
                class="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2"
                @mouseover.prevent="popoverHover = true"
                @mouseleave.prevent="closePopover(close)"
              >
                <div
                  class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                >
                  <div
                    class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8"
                  >
                    <a
                      v-for="item in solutions"
                      :key="item.name"
                      :href="item.href"
                      class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                    >
                      <component
                        :is="item.icon"
                        class="h-6 w-6 flex-shrink-0 text-indigo-600"
                        aria-hidden="true"
                      />
                      <div class="ml-4">
                        <p class="text-base font-medium text-gray-900">
                          {{ item.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ item.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                  <div
                    class="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8"
                  >
                    <div
                      v-for="item in callsToAction"
                      :key="item.name"
                      class="flow-root"
                    >
                      <a
                        :href="item.href"
                        class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                      >
                        <component
                          :is="item.icon"
                          class="h-6 w-6 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span class="ml-3">{{ item.name }}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>

          <Popover class="relative" v-slot="{ open }">
            <PopoverButton
              :class="[
                open ? 'text-gray-400' : 'text-white',
                'group inline-flex items-center rounded-md bg-gray-800 text-base font-medium hover:text-gray-400 focus:outline-none',
              ]"
            >
              <span>Živnosti a ich úprava</span>
              <ChevronDownIcon
                :class="[
                  open ? 'text-gray-400' : 'text-white',
                  'ml-2 h-5 w-5 group-hover:text-gray-400',
                ]"
                aria-hidden="true"
              />
            </PopoverButton>

            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel
                class="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0"
              >
                <div
                  class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                >
                  <div
                    class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8"
                  >
                    <a
                      v-for="item in resources"
                      :key="item.name"
                      :href="item.href"
                      class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                    >
                      <component
                        :is="item.icon"
                        class="h-6 w-6 flex-shrink-0 text-indigo-600"
                        aria-hidden="true"
                      />
                      <div class="ml-4">
                        <p class="text-base font-medium text-gray-900">
                          {{ item.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ item.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                  <div class="bg-gray-50 px-5 py-5 sm:px-8 sm:py-8">
                    <div>
                      <h3 class="text-base font-medium text-gray-500">
                        Recent Posts
                      </h3>
                      <ul role="list" class="mt-4 space-y-4">
                        <li
                          v-for="post in recentPosts"
                          :key="post.id"
                          class="truncate text-base"
                        >
                          <a
                            :href="post.href"
                            class="font-medium text-gray-900 hover:text-gray-700"
                            >{{ post.name }}</a
                          >
                        </li>
                      </ul>
                    </div>
                    <div class="mt-5 text-sm">
                      <a
                        href="#"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        View all posts
                        <span aria-hidden="true"> &rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>

          <Popover class="relative" v-slot="{ open }">
            <PopoverButton
              :class="[
                open ? 'text-gray-400' : 'text-white',
                'group inline-flex items-center rounded-md bg-gray-800 text-base font-medium hover:text-gray-400 focus:outline-none',
              ]"
            >
              <span>Faktúry, zmluvy a dokumenty</span>
              <ChevronDownIcon
                :class="[
                  open ? 'text-gray-400' : 'text-white',
                  'ml-2 h-5 w-5 group-hover:text-gray-400',
                ]"
                aria-hidden="true"
              />
            </PopoverButton>

            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel
                class="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2"
              >
                <div
                  class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                >
                  <div
                    class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8"
                  >
                    <a
                      v-for="item in solutions"
                      :key="item.name"
                      :href="item.href"
                      class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                    >
                      <component
                        :is="item.icon"
                        class="h-6 w-6 flex-shrink-0 text-indigo-600"
                        aria-hidden="true"
                      />
                      <div class="ml-4">
                        <p class="text-base font-medium text-gray-900">
                          {{ item.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ item.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                  <div
                    class="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8"
                  >
                    <div
                      v-for="item in callsToAction"
                      :key="item.name"
                      class="flow-root"
                    >
                      <a
                        :href="item.href"
                        class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                      >
                        <component
                          :is="item.icon"
                          class="h-6 w-6 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span class="ml-3">{{ item.name }}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>

          <router-link
            to="/counseling-center"
            active-class="text-gray-400"
            :class="[
              $router.currentRoute.value.name === 'Counseling center'
                ? ''
                : 'text-gray-300 hover:text-gray-400',
              'text-base font-medium',
            ]"
          >
            Centrum poradenstva
          </router-link>

          <router-link
            to="/virtualne-sidlo"
            active-class="text-gray-400"
            :class="[
              $router.currentRoute.value.name === 'Virtual hq'
                ? ''
                : 'text-gray-300 hover:text-gray-400',
              'text-base font-medium',
            ]"
          >
            Virtuálne sídlo
          </router-link>
        </PopoverGroup>
        <div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          <router-link
            v-if="!user.userId"
            to="/login"
            class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700"
            >Prihlásiť sa</router-link
          >
          <template v-if="isLoading && user.userId">
            <div class="flex items-center align-middle flex-row">
              <svg class="animate-spin -ml-1 mr-3 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-white">Načitávam...</span>
            </div>
        </template>
        <template v-else>
          <CompanySelectorInHeader v-if="user.userId"></CompanySelectorInHeader>
          <Menu v-if="user.userId" as="div" class="ml-3 relative">
            <div>
              <MenuButton
                class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span class="sr-only">Open user menu</span>
                <div
                  class="font-bold text-gray-700 rounded-full bg-white flex items-center justify-center font-mono h-8 w-8 text-lg"
                >
                  <span v-if="user.data.first_name">{{
                    user.data.first_name[0]
                  }}</span>
                  <span v-else>?</span>
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
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              >
                <MenuItem
                  v-if="!user.userId"
                  v-for="item in topBarNavigation"
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
                  v-if="user.userId"
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
        </template>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <PopoverPanel
        focus
        class="absolute inset-x-0 top-0 origin-top-right z-50 transform p-2 transition md:hidden"
      >
        <div
          class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="px-5 pt-5 pb-6">
            <div class="flex items-center justify-between">
              <div>
                <img class="w-28" src="../assets/logo.png" alt="Logo Bizinix" />
              </div>
              <div class="-mr-2">
                <PopoverButton
                  class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                >
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <div class="mt-6">
              <nav class="grid gap-y-8">
                <a
                  v-for="item in solutions"
                  :key="item.name"
                  :href="item.href"
                  class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                >
                  <component
                    :is="item.icon"
                    class="h-6 w-6 flex-shrink-0 text-indigo-600"
                    aria-hidden="true"
                  />
                  <span class="ml-3 text-base font-medium text-gray-900">{{
                    item.name
                  }}</span>
                </a>
              </nav>
            </div>
          </div>
          <div class="space-y-6 py-6 px-5">
            <div class="grid grid-cols-2 gap-y-4 gap-x-8">
              <a
                href="#"
                class="text-base font-medium text-gray-900 hover:text-gray-700"
                >Pricing</a
              >

              <a
                href="#"
                class="text-base font-medium text-gray-900 hover:text-gray-700"
                >Docs</a
              >
              <a
                v-for="item in resources"
                :key="item.name"
                :href="item.href"
                class="text-base font-medium text-gray-900 hover:text-gray-700"
                >{{ item.name }}</a
              >
            </div>
            <div>
              <a
                href="#"
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >Sign up</a
              >
              <p class="mt-6 text-center text-base font-medium text-gray-500">
                Existing customer?
                {{ " " }}
                <a href="#" class="text-indigo-600 hover:text-indigo-500"
                  >Prihlásiť sa</a
                >
              </p>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
  <router-view></router-view>
  <FooterLayout></FooterLayout>
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
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import {
  CalendarIcon,
  ChartBarIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
} from "@heroicons/vue/24/outline";

import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import CompanySelectorInHeader from "./CompanySelectorInHeader.vue";
import FooterLayout from "@/components/FooterLayout.vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useStore } from "vuex";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
let user = ref();
user = computed(() => store.state.user);
const isLoading = ref(true)

onBeforeMount(async () => {
  console.log("Default Layout with header OnBeforeMount")
  user = computed(() => store.state.user);
  if(user.value.userId){
    await store.dispatch('setUserDataAfterLogin')
    isLoading.value = false
   }
})


watch(user.value, (newValue, oldValue) => {
  console.log("Watchh")
  console.log(newValue)
  if(newValue.userId){
    isLoading.value = false
  }
})

const popoverHover = ref(false)
const popoverTimeout = ref()

const hoverPopover = (e: any, open: any) => {
  popoverHover.value = true
  if (!open) e.target.click()
}

const closePopover = (close: any) => {
  popoverHover.value = false
  if (popoverTimeout.value) clearTimeout(Number(popoverHover.value))
  popoverTimeout.value = setTimeout(() => {
    if (!popoverHover.value) close()
  }, 100)
}

const topBarNavigation = [
  { name: "Podpora", to: { name: "Counseling center" } },
  { name: "Kontakt", to: { name: "Contact" } },
];
const navigation = [
  { name: "Firmy a ich úprava", to: { name: "Dashboard" } },
  { name: "Živnosti a ich úprava", to: { name: "Edit Company" } },
  { name: "Faktúry, zmluvy a iné dokumenty", to: { name: "Documents" } },
  { name: "Centrum poradenstva", to: { name: "Counseling center" } },
  { name: "Virtuálne sídlo", to: { name: "Virtual hq" } },
];
const userNavigation = [
  { name: "Nástenka", to: { name: "Dashboard" } },
  { name: "Sídlo a pošta", to: { name: "Sídlo a pošta" } },
  { name: "Doklady", to: { name: "Doklady" } },
  { name: "Dizajn dokladov", to: { name: "Document designs" } },
  { name: "Úprava firmy", to: { name: "Edit Company" } },
  { name: "Váš profil", to: { name: "User Profil" } },
  { name: "Zmena hesla", to: { name: "User Profil" } },
];
const userNavigationLogOut = [{ name: "Odhlásiť sa", href: "#" }];

const solutions = [
  {
    name: "Analytics",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: ShieldCheckIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Automations",
    description:
      "Build strategic funnels that will drive your customers to convert",
    href: "#",
    icon: ChartBarIcon,
  },
];
const callsToAction = [
  { name: "Watch Demo", href: "#", icon: PlayIcon },
  { name: "Contact Sales", href: "#", icon: PhoneIcon },
];
const resources = [
  {
    name: "Help Center",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Guides",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Events",
    description:
      "See what meet-ups and other events we might be planning near you.",
    href: "#",
    icon: CalendarIcon,
  },
  {
    name: "Security",
    description: "Understand how we take your privacy seriously.",
    href: "#",
    icon: ShieldCheckIcon,
  },
];
const recentPosts = [
  { id: 1, name: "Boost your conversion rate", href: "#" },
  {
    id: 2,
    name: "How to use search engine optimization to drive traffic to your site",
    href: "#",
  },
  { id: 3, name: "Improve your customer experience", href: "#" },
];

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
