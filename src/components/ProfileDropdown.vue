<template>
    <div class="relative">
      <button @click="toggleDropdown" class="flex items-center text-white focus:outline-none w-12 h-12 ">
        <img src="https://via.placeholder.com/40" alt="Profile" class="rounded-full">
      </button>
      <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
        <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Your Profile</a>
        <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</a>
        <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Sign out</a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const dropdownOpen = ref(false)
  
  const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value
  }
  
  const closeDropdown = () => {
    dropdownOpen.value = false
  }
  
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      closeDropdown()
    }
  })
  </script>
  
  <style scoped>
  /* Additional styling if needed */
  </style>
  