<template>
  <div class="flex flex-col">
    <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-gray-900 shadow">
      <div class="flex flex-1 justify-between px-4">
        <div class="flex justify-start p-4">
          <img class="w-6" src="../assets/logo-small.png" alt="Logo Bizinix" />
        </div>
        <div class="flex flex-1 justify-end py-2">
          <Menu as="nav" class="flex px-2 items-center justify-between flex-wrap gap-4">
            <MenuItem v-for="(item, index) in topnav" :key="index">
            <button @click="redirectToByName(item.name)"
              :class="[activeTopNav == index ? 'text-teal-500' : 'text-gray-300 hover:text-white', 'pl-2 py-2 text-sm font-bold']">
              {{ item.name }}
              <span v-if="item.name == 'Sídlo a pošta' && mailCounter > 0">
                <span
                  class="inline-flex absolute items-center justify-center w-4 h-4 ms-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                  {{ mailCounter }}
                </span>
              </span>
            </button>
            </MenuItem>
          </Menu>
          <div class="bold text-white text-3xl px-4">
            |
          </div>
          <div class="flex items-center">
            <div>
              <button type="button" class="px-4 text-teal-500" v-on:click="showNotification = !showNotification;">
                <span class="sr-only">Notifications</span>
                <span v-if="notifications.length > 0">
                  <span
                    class="inline-flex absolute items-center justify-center w-4 h-4 ms-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                    {{ notifications.length }}
                  </span>
                </span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
                
              </button>
              <div v-if="showNotification && notifications.length > 0" @click="showNotification = false" class="fixed inset-0 h-full w-full z-10">
              </div>

              <div v-if="showNotification && notifications.length > 0" class="absolute right-10 mt-5 overflow-hidden z-20" style="width:20rem;">
                <div class="flex flex-col py-2 gap-2">
                  <div class="px-2 py-2 flex flex-row items-start bg-gray-900 bg-opacity-70 rounded-md text-gray-300"
                    v-for="notification in notifications">
                    <div class="flex flex-col"> {{ notification.data.message }} </div>
                    <div class="flex flex-col justify-end items-end gap-6">
                      <div class="flex">
                        <button class="px-2" v-on:click="markAsRead(notification)">
                          <XCircleIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div class="flex">
                        <button class="px-4 flex justify-center items-center bg-teal-500 hover:bg-teal-700 rounded-md"
                          v-on:click="notificationAction(notification.data.action)">
                          <span class="px-2 py-2">Prejsť</span>
                          <ArrowRightIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="px-2 py-2 flex flex-row items-center text-center bg-gray-900 bg-opacity-70 rounded-md text-gray-300"
                    v-if="notifications.length == 0">
                    <div class="flex flex-col w-full"> Nemáte žiadne notifikácie </div>
                  </div>
                </div>
              </div>
            </div>

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
              <MenuButton
                class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }"
                  v-on:click="activePage = item.name">
                <a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{
                  item.name }}</a>
                </MenuItem>
                <MenuItem v-if="user.userId" v-for="item in userNavigationLogOut" :key="item.name" v-slot="{ active }">
                <a @click="logout" class="cursor-pointer" :class="[
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700',
                ]">{{ item.name }}</a>
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
import { ref, computed, onBeforeMount, watch } from 'vue'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import {
  PhoneIcon,
  BellIcon,
  XCircleIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CompanySelectorInHeader from "./CompanySelectorInHeader.vue";

const store = useStore();
const router = useRouter();
let user = ref();
user = computed(() => store.state.user);
let activePage = ref("Moja firma");
const currentCompany = computed(() => store.state.selectedCompany);
const notifications = computed(() => store.state.notifications as any[]);
const showNotification = ref(true);
const mailCounter = ref(0);

onBeforeMount(async () => {
  user = computed(() => store.state.user);
  if (user.value.userId) {
    await store.dispatch('setUserDataAfterLogin')
    await store.dispatch('getNotifications')
    await getUnseenMails();
  }
})

async function getUnseenMails() {
  await store
    .dispatch("getUnseenCount", currentCompany.value.id)
    .then((response) => {
      mailCounter.value = response.data;
    });
}

watch(
  () => store.state.mails,
  async function () {
      await getUnseenMails();
  }
);

const activeTopNav = computed(() => store.state.mySubmenuActive);

function redirectToByName(rname: string) {
  switch (rname) {
    case 'Moja firma': store.state.mySubmenuActive = 0; break;
    case 'Doklady': store.state.mySubmenuActive = 1; break;
    case 'Sídlo a pošta': store.state.mySubmenuActive = 2; break;
  }

  if (rname == "Moja firma") {
    store.state.myCompanyDetailsTab = 1;
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

function notificationAction(action: string) {
  switch (action) {
    case 'bankaccount':
      store.state.myCompanyDetailsTab = 3;
      return router.push({
        name: "CompanyDetails",
        params: { id: currentCompany.value.id }
      });
    case 'companydetails':
      store.state.myCompanyDetailsTab = 2;
      return router.push({
        name: "CompanyDetails",
        params: { id: currentCompany.value.id }
      });
    case 'documentdetails':
      store.state.documentTab = 3;
      return router.push({
        name: "Doklady"
      });
    case 'mails':
      return router.push({
        name: "Sídlo a pošta"
      });
  }

}

async function markAsRead(notification) {
  const notification_id = {
    notification_id: notification.id
  }
  await store.dispatch("markNotificationAsRead", notification_id);
}

const userNavigation = [
  { name: 'Môj účet', href: '/moj/user/profile' },
  { name: 'Firmy a služby', href: '/moj/dashboard' },
  { name: 'Fakturácia', href: '/moj/user/fakturacne' }
]

const userNavigationLogOut = [{ name: "Odhlásiť sa", href: "#" }];

const topnav = [
  { name: 'Moja firma' },
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