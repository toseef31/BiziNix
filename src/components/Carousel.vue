<template>
    <div class="relative">
    <div class="overflow-hidden">
      <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }">
        <div v-for="(item, index) in items" :key="index" class="carousel-item flex-none w-full md:w-1/3 p-2">
          <div :style="{ backgroundImage: `url(${item.image})` }" class="bg-cover bg-center p-8 h-64 rounded-[1.25rem] shadow-lg text-white flex flex-col justify-between">
            <div>
              <h2 class="text-2xl font-bold mb-2">{{ item.heading }}</h2>
              <p>{{ item.detail }}</p>
            </div>
            <button class="bg-[#00A6A6] hover:bg-[#00A6A6] text-white font-bold py-2 px-4 rounded w-[8rem]">
              {{ item.buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
      <button class="absolute top-1/2 left-[-1rem] rounded-full transform -translate-y-1/2 bg-gray-800 text-white px-2 py-2" @click="prevSlide">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button class="absolute top-1/2 right-[-1rem] rounded-full transform -translate-y-1/2 bg-gray-800 text-white px-2 py-2" @click="nextSlide">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const items = [
    {
      image: '/1.png', // Replace with your image URL
      heading: 'Advokátska kancelária pre vás.',
      detail: 'Lorem ipsum dolor sit amet consectetur. Mattis eget pellentesque pellentesque eget odio.',
      buttonText: 'Viac info'
    },
    {
      image: '/2.png', // Replace with your image URL
      heading: 'Potrebujete pomôcť s účtovníctvom?',
      detail: 'Lorem ipsum dolor sit amet consectetur. Mattis eget pellentesque pellentesque eget odio.',
      buttonText: 'Viac info'
    },
    {
      image: '/3.png', // Replace with your image URL
      heading: 'Postaráme sa o váš marketingový plán.',
      detail: 'Lorem ipsum dolor sit amet consectetur. Mattis eget pellentesque pellentesque eget odio.',
      buttonText: 'Viac info'
    },
    {
      image: 'https://via.placeholder.com/600x400', // Replace with your image URL
      heading: 'Item 4',
      detail: 'This is a short detail about item 4.',
      buttonText: 'Viac info'
    },
    {
      image: 'https://via.placeholder.com/600x400', // Replace with your image URL
      heading: 'Item 5',
      detail: 'This is a short detail about item 5.',
      buttonText: 'Viac info'
    },
    {
      image: 'https://via.placeholder.com/600x400', // Replace with your image URL
      heading: 'Item 6',
      detail: 'This is a short detail about item 6.',
      buttonText: 'Viac info'
    },
  ]
  const currentIndex = ref(0)
  const itemsPerView = 3
  
  const prevSlide = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--
    } else {
      currentIndex.value = items.length - itemsPerView
    }
  }
  
  const nextSlide = () => {
    if (currentIndex.value < items.length - itemsPerView) {
      currentIndex.value++
    } else {
      currentIndex.value = 0
    }
  }
  </script>
  
  <style scoped>
  .carousel-item {
    transition: transform 0.5s ease-in-out;
  }
  </style>
  