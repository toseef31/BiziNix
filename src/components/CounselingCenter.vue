<template>
  <div class="mx-auto max-w-7xl bg-dark-700 relative py-20">
    <div class="flex flex-col md:flex-row justify-center items-center">
      <div class="flex-1 p-4">
        <div class="text-5xl text-white font-extrabold leading-snug">
          Potrebujete s niečim poradiť?
        </div>
        <div class="text-white my-6 text-xl font-bold">
          Naše centrum poradenstva Vám pomôže.
        </div>
        <div>
          <div
            @click="redirect()"
            class="w-[200px] shadow flex justify-between border items-center py-4 px-6 rounded-lg bg-teal-500 font-bold border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
          >
            <span class="text-center w-full">Mám otázku</span>
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
      <div class="flex-1 p-4">
        <img
          src="@/assets/robot-call.png"
          class="w-4/5"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronDownIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/outline";
import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function redirect() {
  return router.push({
    name: "Counseling center",
  });
}
</script>
