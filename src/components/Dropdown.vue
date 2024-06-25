<template>
    <div class="relative inline-block text-left">
      <div>
        <button @click="toggleDropdown" class="inline-flex font-bold text-white text-lg items-center font-medium text-gray-400 hover:text-white focus:outline-none">
          {{ selectedOption }}
          <svg class="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path :class="{ 'transform rotate-180': isOpen }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
  
      <transition name="fade">
        <div v-if="isOpen" class="absolute mt-2 text-sm bg-gray-800 text-gray-400 rounded-lg" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
          <a href="#" @click="selectOption('Prehľad za aktuálny rok')" class="block px-4 py-2 text-white hover:text-[#14b8a6]" role="menuitem">Prehľad za aktuálny rok</a>
          <a href="#" @click="selectOption('Prehľad za posledné 4 roky')" class="block px-4 py-2 text-white hover:text-[#14b8a6]" role="menuitem">Prehľad za posledné 4 roky</a>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isOpen = ref(false);
  const selectedOption = ref('Prehľad za aktuálny rok');
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  const selectOption = (option) => {
    selectedOption.value = option;
    isOpen.value = false;
  };
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  