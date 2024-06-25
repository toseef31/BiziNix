<template>
    <div :class="['h-screen bg-gray-800 text-white pl-[1.5rem] p-x-4 z-10 fixed md:mt-0 mt-16 top-0 left-0 transform md:transform-none transition-transform', { '-translate-x-full': !isOpen, 'translate-x-0': isOpen }]" style="width: 295px;">
      <!-- Logo -->
      <div class="ml-[2rem] mb-12 mt-12">
        <router-link :to="{ path: '/' }">
          <img class="w-[10rem]" src="../assets/logo.png" alt="Logo Bizinix" />
        </router-link>
      </div>
      <!-- Navigation -->
      <nav class="space-y-4">
        <!-- Dashboard -->
        <a href="#" class="flex items-center py-2  hover:bg-gray-700" :class="{'text-[#00F6F6] border-r-4 border-[#00F6F6]': activeItem === 'dashboard'}" @click="activeItem = 'dashboard'">
          <span class="mr-3">
            <!-- Your dashboard icon here -->
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4C13.6266 4 11.3066 4.70379 9.33316 6.02236C7.35977 7.34094 5.8217 9.21509 4.91345 11.4078C4.0052 13.6005 3.76756 16.0133 4.23058 18.3411C4.6936 20.6689 5.83649 22.8071 7.51472 24.4853C9.19295 26.1635 11.3312 27.3064 13.6589 27.7694C15.9867 28.2324 18.3995 27.9948 20.5922 27.0866C22.7849 26.1783 24.6591 24.6402 25.9776 22.6668C27.2962 20.6935 28 18.3734 28 16M16 4C19.1826 4 22.2348 5.26428 24.4853 7.51472C26.7357 9.76516 28 12.8174 28 16M16 4V16M28 16H16M16 16L24 24.6667" stroke="#00F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
              </span>
              Dashboard
            </a>
            <!-- Bizinix Doklady -->
            <div>
        <div class="flex items-center justify-between py-2 border-b border-gray-700 mr-[2rem] text-gray-400 ">
          Bizinix Doklady
        </div>
        <div class="space-y-2 mt-2">
          <a href="#" class="flex items-center px-2 py-2 rounded hover:bg-gray-700 hover:text-[#00F6F6] text-white" >
            <span class="mr-[1rem] ">
              <div class="group">
                <svg class="w-8 h-8 group-hover:stroke-[#00F6F6]" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.6668 15.9987H16.0002M16.0002 15.9987H21.3335M16.0002 15.9987V21.332M16.0002 15.9987V10.6654M5.3335 22.3987V9.5987C5.3335 8.10536 5.3335 7.3587 5.62416 6.78803C5.88016 6.28536 6.28683 5.8787 6.7895 5.6227C7.36016 5.33203 8.10683 5.33203 9.60016 5.33203H22.4002C23.8935 5.33203 24.6402 5.33203 25.2108 5.6227C25.7126 5.87836 26.1205 6.28629 26.3762 6.78803C26.6668 7.3587 26.6668 8.10536 26.6668 9.5987V22.3987C26.6668 23.892 26.6668 24.6387 26.3762 25.2094C26.1204 25.7111 25.7125 26.119 25.2108 26.3747C24.6402 26.6654 23.8962 26.6654 22.4055 26.6654H9.59616C8.1055 26.6654 7.35883 26.6654 6.7895 26.3747C6.28775 26.119 5.87982 25.7111 5.62416 25.2094C5.3335 24.6387 5.3335 23.892 5.3335 22.3987Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </span>
            Vytvoriť  doklad
          </a>


          <div class="relative group">
            <a href="#" class="flex items-center justify-between px-2 py-2 rounded hover:bg-gray-700 hover:text-[#00F6F6] text-white" @click="toggleDropdown('bizinix')">
              <span class="flex items-center mr-[1rem] group">
                <svg class="mr-[1rem] group-hover:stroke-[#00F6F6]" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9998 22.6667H19.9998M11.9998 18.6667H19.9998M17.3332 4H10.9332C9.43984 4 8.69317 4 8.1225 4.29067C7.62071 4.54625 7.21275 4.9542 6.95717 5.456C6.6665 6.02667 6.6665 6.77333 6.6665 8.26667V23.7333C6.6665 25.2267 6.6665 25.9733 6.95717 26.544C7.21283 27.0457 7.62076 27.4537 8.1225 27.7093C8.69184 28 9.4385 28 10.9292 28H21.0705C22.5612 28 23.3065 28 23.8758 27.7093C24.3785 27.4533 24.7865 27.0453 25.0425 26.544C25.3332 25.9733 25.3332 25.2293 25.3332 23.7387V12.4347L25.3318 12M17.3332 4C17.7145 4.004 17.9545 4.01867 18.1838 4.07333C18.4558 4.14 18.7172 4.24667 18.9558 4.39333C19.2252 4.55867 19.4558 4.78933 19.9158 5.25067L24.0838 9.41733C24.5452 9.87867 24.7745 10.108 24.9398 10.3773C25.0865 10.6173 25.1932 10.876 25.2598 11.148C25.3132 11.3787 25.3278 11.62 25.3318 12M17.3332 4V7.73333C17.3332 9.22667 17.3332 9.97333 17.6238 10.544C17.8795 11.0457 18.2874 11.4537 18.7892 11.7093C19.3585 12 20.1052 12 21.5958 12H25.3318" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Faktúry
              </span>
            
            <span class="group">
            <svg class="group-hover:stroke-[#00F6F6]" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.9999 21.3323C15.8244 21.3333 15.6505 21.2996 15.488 21.2333C15.3256 21.1669 15.1778 21.0692 15.0533 20.9456L7.05326 12.9456C6.80218 12.6945 6.66113 12.354 6.66113 11.9989C6.66113 11.6439 6.80218 11.3033 7.05326 11.0523C7.30433 10.8012 7.64485 10.6602 7.99992 10.6602C8.35499 10.6602 8.69552 10.8012 8.94659 11.0523L15.9999 18.1189L23.0533 11.0656C23.3083 10.8472 23.6364 10.733 23.972 10.746C24.3076 10.759 24.6259 10.8981 24.8633 11.1355C25.1008 11.373 25.2399 11.6913 25.2529 12.0269C25.2658 12.3624 25.1517 12.6905 24.9333 12.9456L16.9333 20.9456C16.6849 21.1919 16.3497 21.3308 15.9999 21.3323Z" fill="white"/>
                </svg>
            </span>
          </a>
            <!-- <button class="flex items-center justify-between w-full px-4 py-2 rounded hover:bg-gray-700" >
              <span class="flex items-center">
                <i class="fas fa-chevron-down mr-3"></i>
                Faktúry
              </span>
              <i :class="[dropdowns.bizinix ? 'fa-chevron-up' : 'fa-chevron-down']" class="fas"></i>
            </button> -->
            <div v-if="dropdowns.bizinix" class="space-y-2 mt-2 ml-8">
              <a href="#" class="flex items-center px-4 py-2 rounded hover:bg-gray-700 text-white">
                <i class="fas fa-angle-right mr-3"></i>
                Sublink 1
              </a>
              <a href="#" class="flex items-center px-4 py-2 rounded hover:bg-gray-700 text-white">
                <i class="fas fa-angle-right mr-3"></i>
                Sublink 2
              </a>
            </div>
          </div>

          <div class="relative">
            <a href="#" class="flex items-center justify-between px-2 py-2 rounded hover:bg-gray-700 hover:text-[#00F6F6] text-white group" @click="toggleDropdown('doklady')">
              <span class="flex items-center">
              <svg class="mr-[1rem] group-hover:stroke-[#00F6F6]" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.3332 4H10.9332C9.43984 4 8.69317 4 8.1225 4.29067C7.62071 4.54625 7.21275 4.9542 6.95717 5.456C6.6665 6.02667 6.6665 6.77333 6.6665 8.26667V23.7333C6.6665 25.2267 6.6665 25.9733 6.95717 26.544C7.21283 27.0457 7.62076 27.4537 8.1225 27.7093C8.69184 28 9.4385 28 10.9292 28H21.0705C22.5612 28 23.3065 28 23.8758 27.7093C24.3785 27.4533 24.7865 27.0453 25.0425 26.544C25.3332 25.9733 25.3332 25.2293 25.3332 23.7387V12M17.3332 4C17.7145 4.004 17.9545 4.01867 18.1852 4.07333C18.4572 4.14 18.7172 4.24667 18.9558 4.39333C19.2252 4.55867 19.4558 4.78933 19.9158 5.25067L24.0838 9.41733C24.5452 9.87867 24.7745 10.108 24.9398 10.3773C25.0865 10.6173 25.1932 10.876 25.2598 11.148C25.3132 11.3787 25.3292 11.62 25.3332 12M17.3332 4V7.73333C17.3332 9.22667 17.3332 9.97333 17.6238 10.544C17.8795 11.0457 18.2874 11.4537 18.7892 11.7093C19.3585 12 20.1052 12 21.5958 12H25.3332" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Obchodné doklady
            </span>
            <span class="group">
            <svg class="group-hover:stroke-[#00F6F6]" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.9999 21.3323C15.8244 21.3333 15.6505 21.2996 15.488 21.2333C15.3256 21.1669 15.1778 21.0692 15.0533 20.9456L7.05326 12.9456C6.80218 12.6945 6.66113 12.354 6.66113 11.9989C6.66113 11.6439 6.80218 11.3033 7.05326 11.0523C7.30433 10.8012 7.64485 10.6602 7.99992 10.6602C8.35499 10.6602 8.69552 10.8012 8.94659 11.0523L15.9999 18.1189L23.0533 11.0656C23.3083 10.8472 23.6364 10.733 23.972 10.746C24.3076 10.759 24.6259 10.8981 24.8633 11.1355C25.1008 11.373 25.2399 11.6913 25.2529 12.0269C25.2658 12.3624 25.1517 12.6905 24.9333 12.9456L16.9333 20.9456C16.6849 21.1919 16.3497 21.3308 15.9999 21.3323Z" fill="white"/>
                </svg>
            </span>
          </a>
        
            <div v-if="dropdowns.doklady" class="space-y-2 mt-2 ml-8">
              <a href="#" class="flex items-center px-4 py-2 rounded hover:bg-gray-700 text-white">
                <i class="fas fa-angle-right mr-3"></i>
                doklady 1
              </a>
              <a href="#" class="flex items-center px-4 py-2 rounded hover:bg-gray-700 text-white">
                <i class="fas fa-angle-right mr-3"></i>
                doklady 2
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Virtuálne Sídlo -->
      <div>
        <div class="flex items-center justify-between py-2 border-b border-gray-700 mr-[2rem] text-gray-400">
          Virtuálne Sídlo
        </div>
        <div class="space-y-2 mt-2">
          <a href="#" class="flex items-center px-2 py-2 rounded hover:bg-gray-700 text-white hover:text-[#00F6F6] group">
            <span class="mr-[1rem]">
              <svg class="group-hover:stroke-[#00F6F6]" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.6665 26.6654H5.33317M5.33317 26.6654H11.9998M5.33317 26.6654V9.5987C5.33317 8.10536 5.33317 7.3587 5.62384 6.78803C5.87984 6.28536 6.2865 5.8787 6.78917 5.6227C7.35984 5.33203 8.1065 5.33203 9.59984 5.33203H11.7332C13.2265 5.33203 13.9732 5.33203 14.5425 5.6227C15.0452 5.8787 15.4545 6.28536 15.7092 6.78803C15.9998 7.35736 15.9998 8.10403 15.9998 9.5947V13.332M11.9998 26.6654H26.6665M11.9998 26.6654V19.156C11.9998 18.456 11.9998 18.1054 12.0838 17.7787C12.1585 17.4894 12.2812 17.2147 12.4465 16.9654C12.6332 16.6854 12.8945 16.4494 13.4145 15.9827L16.4838 13.2254C17.4905 12.3214 17.9945 11.8694 18.5638 11.6974C19.0656 11.5462 19.6008 11.5462 20.1025 11.6974C20.6732 11.8694 21.1772 12.3214 22.1852 13.2267L25.2518 15.9827C25.7718 16.4494 26.0318 16.6854 26.2198 16.9654C26.3852 17.2147 26.5078 17.4894 26.5812 17.7787C26.6665 18.1054 26.6665 18.456 26.6665 19.156V26.6654M26.6665 26.6654H29.3332" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            Moje virtuálne sídlo
          </a>
          <a href="#" class="flex items-center px-2 py-2 rounded hover:bg-gray-700 text-white hover:text-[#00F6F6] group">
            <span class="mr-[1rem]">
              <svg class="group-hover:stroke-[#00F6F6]" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="stroke-current text-white group-hover:text-[#00F6F6]" d="M5.33333 8.0013L13.4773 14.1506L13.48 14.1533C14.384 14.816 14.836 15.148 15.332 15.276C15.7701 15.3893 16.2299 15.3893 16.668 15.276C17.164 15.148 17.6173 14.816 18.524 14.1506C18.524 14.1506 23.7467 10.1426 26.6667 8.0013M4 21.068V10.9346C4 9.4413 4 8.69464 4.29067 8.12397C4.54667 7.6213 4.95333 7.21464 5.456 6.95864C6.02667 6.66797 6.77333 6.66797 8.26667 6.66797H23.7333C25.2267 6.66797 25.9733 6.66797 26.5427 6.95864C27.0453 7.21464 27.4533 7.6213 27.7093 8.12397C28 8.6933 28 9.43997 28 10.9306V21.0733C28 22.564 28 23.308 27.7093 23.8786C27.4532 24.3805 27.0448 24.7884 26.5427 25.044C25.9733 25.3346 25.228 25.3346 23.7373 25.3346H8.26267C6.772 25.3346 6.02533 25.3346 5.456 25.044C4.95426 24.7883 4.54633 24.3804 4.29067 23.8786C4 23.308 4 22.5613 4 21.068Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            Schránka
          </a>
        </div>
      </div>
      </nav>
      <div class="flex flex-col justify-end h-[30%]">
        <a href="#" class="flex items-center px-2 py-2 rounded hover:bg-gray-700 hover:text-[#00F6F6] text-white group">
        <span class="mr-[1rem]">
          <svg class="group-hover:stroke-[#00F6F6]" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="stroke-current" d="M18.1331 28.1011L25.4131 23.8984C26.1918 23.4491 26.5798 23.2251 26.8625 22.9117C27.1126 22.6341 27.3015 22.3071 27.4171 21.9517C27.5465 21.5504 27.5465 21.1024 27.5465 20.2091V11.7904C27.5465 10.8971 27.5465 10.4491 27.4158 10.0477C27.3002 9.69241 27.1112 9.36534 26.8611 9.08773C26.5811 8.77573 26.1945 8.55173 25.4225 8.1064L18.1331 3.8984C17.3558 3.44907 16.9678 3.22507 16.5545 3.1384C16.1888 3.06064 15.8108 3.06064 15.4451 3.1384C15.0318 3.22507 14.6438 3.44907 13.8665 3.8984L6.58379 8.1024C5.80779 8.5504 5.41979 8.7744 5.13846 9.08773C4.88835 9.36534 4.69938 9.69241 4.58379 10.0477C4.45313 10.4504 4.45312 10.8984 4.45312 11.7957V20.2024C4.45312 21.0997 4.45313 21.5491 4.58379 21.9504C4.69938 22.3057 4.88835 22.6328 5.13846 22.9104C5.41979 23.2251 5.80913 23.4491 6.58513 23.8971L13.8651 28.1011C14.6438 28.5504 15.0318 28.7744 15.4451 28.8611C15.8105 28.9397 16.1891 28.9397 16.5545 28.8611C16.9678 28.7744 17.3558 28.5504 18.1331 28.1011Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="stroke-current" d="M12 16C12 17.0609 12.4214 18.0783 13.1716 18.8284C13.9217 19.5786 14.9391 20 16 20C17.0609 20 18.0783 19.5786 18.8284 18.8284C19.5786 18.0783 20 17.0609 20 16C20 14.9391 19.5786 13.9217 18.8284 13.1716C18.0783 12.4214 17.0609 12 16 12C14.9391 12 13.9217 12.4214 13.1716 13.1716C12.4214 13.9217 12 14.9391 12 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        Nastavenie firmy
      </a>
      </div>
      
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const isOpen = ref(false)
  const activeItem = ref('dashboard')
  const dropdowns = ref({
    bizinix: false,
  })
  
  const toggleSidebar = () => {
    isOpen.value = !isOpen.value
  }
  
  const handleToggleEvent = () => {
    toggleSidebar()
  }
  
  const toggleDropdown = (dropdown) => {
    dropdowns.value[dropdown] = !dropdowns.value[dropdown]
  }
  
  onMounted(() => {
    window.addEventListener('toggleSidebar', handleToggleEvent)
  })
  
  onUnmounted(() => {
    window.removeEventListener('toggleSidebar', handleToggleEvent)
  })
  </script>
  
  <style scoped>
  /* Additional styling if needed */
  </style>
  