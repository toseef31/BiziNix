<template>
  <div class="bg-dark-700 relative py-28">
    <div class="container justify-center flex mx-auto">
      <div class="w-full xl:w-2/3 relative">
        <img
          src="../assets/robot-call.png"
          class="h-[520px] shrink-0 z-10 w-auto absolute right-[-12px] top-[-150px]"
        />
        <div class="text-5xl text-white font-bold">
          Potrebujete v <br />
          niečom poradiť ?
        </div>
        <div class="text-base text-white my-4">
          Naše centrum poradenstva Vám pomôže.
        </div>
        <div class="mt-5">
          <div
            @click="redirect()"
            class="w-[200px] shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronDownIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/outline";
import FooterLayout from "../components/FooterLayout.vue";
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
