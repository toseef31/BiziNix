<template>
  <div class=" bg-gray-900">
   
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

async function notificationAction(data: any) {
  switch (data.action) {
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
      const notifyData = JSON.parse(data.data);
      if(notifyData.company_id != currentCompany.value.id){
        await store.dispatch("getCompanyById", notifyData.company_id).then((response) => {
          store.state.selectedCompany = response.data;
        }).catch((error) => {
          console.log(error);
        })
      }
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
  store.state.notifications = notifications.value.filter((item) => { return (item.id != notification.id); });
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