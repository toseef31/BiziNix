
  <template>
  <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-gray-900 shadow">
    <div class="flex flex-1 justify-between p-10 md:mt-6 bg-gray-900">
      <div class="flex items-center">
        <button @click="toggleSidebar" class="md:hidden text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        
        <SearchBar class="hidden md:flex" />
      </div>
      <div class="flex flex-1 justify-end items-center py-2">
      
        <div class="flex items-center">
          <button type="button" class="text-teal-500 hidden md:block bg-gray-800 p-3 mr-[2rem] rounded-full" @click="showNotification = !showNotification;">
            <span class="sr-only">Notifications</span>
            
             
           
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.0667 24.532L26.9774 21.7467C25.9139 20.322 25.3374 18.5926 25.3334 16.8147V11.9987C25.3308 9.75624 24.5209 7.58968 23.0518 5.8954C21.5828 4.20112 19.5529 3.09238 17.3334 2.77203V2.66536C17.3334 2.31174 17.1929 1.9726 16.9429 1.72256C16.6928 1.47251 16.3537 1.33203 16.0001 1.33203C15.6465 1.33203 15.3073 1.47251 15.0573 1.72256C14.8072 1.9726 14.6667 2.31174 14.6667 2.66536V2.77203C12.4473 3.09238 10.4174 4.20112 8.94832 5.8954C7.47929 7.58968 6.66938 9.75624 6.66675 11.9987V16.8147C6.66294 18.5928 6.08699 20.3225 5.02408 21.748L2.93342 24.532C2.78485 24.7301 2.69437 24.9657 2.67214 25.2123C2.6499 25.4589 2.69678 25.7068 2.80751 25.9283C2.91825 26.1498 3.08847 26.3361 3.29911 26.4662C3.50974 26.5964 3.75247 26.6654 4.00008 26.6654H10.8561C11.1471 27.8088 11.8108 28.8227 12.7424 29.5468C13.6739 30.271 14.8202 30.6641 16.0001 30.6641C17.18 30.6641 18.3262 30.271 19.2578 29.5468C20.1893 28.8227 20.8531 27.8088 21.1441 26.6654H28.0001C28.2477 26.6654 28.4904 26.5964 28.7011 26.4662C28.9117 26.3361 29.0819 26.1498 29.1926 25.9283C29.3034 25.7068 29.3503 25.4589 29.328 25.2123C29.3058 24.9657 29.2153 24.7301 29.0667 24.532ZM16.0001 27.9987C15.5341 27.9973 15.0766 27.8734 14.6736 27.6393C14.2706 27.4053 13.9363 27.0694 13.7041 26.6654H18.2961C18.0639 27.0694 17.7295 27.4053 17.3265 27.6393C16.9235 27.8734 16.4661 27.9973 16.0001 27.9987ZM6.66675 23.9987L7.15742 23.3454C8.56495 21.4585 9.32789 19.1687 9.33342 16.8147V11.9987C9.33342 10.2306 10.0358 8.53489 11.286 7.28465C12.5363 6.03441 14.232 5.33203 16.0001 5.33203C17.7682 5.33203 19.4639 6.03441 20.7141 7.28465C21.9644 8.53489 22.6667 10.2306 22.6667 11.9987V16.8147C22.6715 19.1699 23.435 21.4608 24.8441 23.348L25.3334 23.9987H6.66675Z" fill="#9BABC5"/>
            </svg>
            <!-- <span v-if="notifications.length > 0"> -->
            <span class="inline-flex absolute items-center justify-center w-4 h-4 ms-1 ml-[1rem] mt-[-0.5rem] p-2.5 text-xs font-semibold text-black bg-[#00F6F6] rounded-full">
                20
            </span>
             <!-- </span> -->
          </button>
          
          <button type="button" class="text-teal-500 hidden md:block bg-gray-800 p-3 mr-[2rem]   rounded-full" @click="redirectToByName('Contact')">
            <span class="sr-only">Contact us</span>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.9067 7.89464C28.6658 7.5191 28.3345 7.21002 27.9431 6.99571C27.5518 6.7814 27.1129 6.66871 26.6667 6.66797H5.33341C4.62617 6.66797 3.94789 6.94892 3.4478 7.44902C2.9477 7.94911 2.66675 8.62739 2.66675 9.33464V22.668C2.66675 23.3752 2.9477 24.0535 3.4478 24.5536C3.94789 25.0537 4.62617 25.3346 5.33341 25.3346H26.6667C27.374 25.3346 28.0523 25.0537 28.5524 24.5536C29.0525 24.0535 29.3334 23.3752 29.3334 22.668V9.33464C29.3321 8.82367 29.184 8.32385 28.9067 7.89464ZM24.5868 9.33464L16.2934 15.548C16.2052 15.615 16.0975 15.6513 15.9867 15.6513C15.876 15.6513 15.7683 15.615 15.6801 15.548L7.40008 9.33464H24.5868ZM5.33341 22.668V11.1213L14.0934 17.6946C14.6441 18.1058 15.3129 18.328 16.0001 18.328C16.6873 18.328 17.3561 18.1058 17.9067 17.6946L26.6667 11.1213V22.668H5.33341Z" fill="#9BABC5"/>
            </svg>
            <span class="inline-flex absolute items-center justify-center w-4 h-4 ms-1 ml-[1rem] mt-[-0.5rem] p-2.5 text-xs font-semibold text-black bg-[#00F6F6] rounded-full">
                20
            </span>
          </button>
          <CompanySelectorInHeader v-if="user.userId"></CompanySelectorInHeader>
          <div class="ml-4 flex items-center ">
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-14 w-14 ">
                <span class="sr-only">Open user menu</span>
                <img class="rounded-full"
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
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  import { ref, computed, onBeforeMount, watch } from 'vue'
  import SearchBar from '@/components/SearchBar.vue'
import ProfileDropdown from '@/components/ProfileDropdown.vue'
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
  const toggleSidebar = () => {
  const event = new Event('toggleSidebar')
  window.dispatchEvent(event)
}
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
  