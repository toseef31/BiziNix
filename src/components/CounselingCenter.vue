<template>
  <div class="bg-gray-800">
    <div class="max-w-7xl mx-auto py-4 px-2 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-center">
        <div class="w-full md:w-1/2">
          <div class="text-center md:text-left text-4xl md:text-5xl text-white font-extrabold leading-snug">
            Potrebujete poradiť?
          </div>
          <div class="text-center md:text-left text-white my-6 text-xl font-bold">
            Naše centrum poradenstva Vám pomôže.
          </div>
          <div class="flex items-center justify-center md:justify-start">
            <div
              @click="redirect()"
              class="w-[200px] shadow flex justify-between border items-center py-4 px-6 rounded-lg bg-teal-500 font-bold border-teal-500 text-white hover:cursor-pointer hover:bg-gray-800 space-x-2"
            >
              <span class="text-center w-full text-white">Mám otázku</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 p-4 flex items-center justify-center">
          <img
            src="@/assets/robot-call.png"
            class="max-w-sm md:max-w-md"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function redirect() {
  return router.push({
    name: "Counseling center",
  });
}
</script>
