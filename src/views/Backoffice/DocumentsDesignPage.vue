<template>
  <div class="w-full min-h-screen flex justify-center bg-gray-900">
    <img src="@/assets/logo_b.png" class="absolute center min-h-screen z-0" />
    <div class="flex py-20 w-full px-20 z-10">
      <div class="flex flex-col basis-2/3">
        <div
          class="text-4xl text-white leading-normal font-bold text-center pt-8 pb-20"
        >
          Vyberte si šablónu pre Vaše doklady
        </div>
        <div
          class="container mx-auto space-y-2 lg:space-y-0 lg:gap-4 lg:grid lg:grid-cols-3"
        >
          <div class="w-full rounded hover:opacity-50 text-center">
            <img
              src="https://assets-global.website-files.com/6253f6e60f27498e7d4a1e46/6271a4e4cfea70cec0004fee_Freelancer-Invoice-Template2-DB.jpeg"
              alt="image"
              class="border-teal-500 border-4"
            />
            <span
              class="bg-teal-500 text-gray-800 text-lg font-bold px-6 py-3 rounded"
              >Používa sa</span
            >
          </div>
          <div class="w-full rounded hover:opacity-50">
            <img
              src="https://assets-global.website-files.com/6253f6e60f27498e7d4a1e46/6271a4e4cfea70cec0004fee_Freelancer-Invoice-Template2-DB.jpeg"
              alt="image"
            />
          </div>
          <div class="w-full rounded hover:opacity-50">
            <img
              src="https://assets-global.website-files.com/6253f6e60f27498e7d4a1e46/6271a4e4cfea70cec0004fee_Freelancer-Invoice-Template2-DB.jpeg"
              alt="image"
            />
          </div>
        </div>
        <div
          class="container mx-auto space-y-2 lg:space-y-0 lg:gap-4 lg:grid lg:grid-cols-3 py-8"
        >
          <div class="w-full rounded hover:opacity-50">
            <img
              src="https://assets-global.website-files.com/6253f6e60f27498e7d4a1e46/6271a4e4cfea70cec0004fee_Freelancer-Invoice-Template2-DB.jpeg"
              alt="image"
            />
          </div>
          <div class="w-full rounded hover:opacity-50">
            <img
              src="https://assets-global.website-files.com/6253f6e60f27498e7d4a1e46/6271a4e4cfea70cec0004fee_Freelancer-Invoice-Template2-DB.jpeg"
              alt="image"
            />
          </div>
          <div class="w-full rounded hover:opacity-50">
            <img
              src="https://assets-global.website-files.com/6253f6e60f27498e7d4a1e46/6271a4e4cfea70cec0004fee_Freelancer-Invoice-Template2-DB.jpeg"
              alt="image"
            />
          </div>
        </div>
        <div
          class="container mx-auto space-y-2 lg:space-y-0 lg:gap-4 lg:grid lg:grid-cols-3"
        >
          <div class="w-full rounded hover:opacity-50">
            <img
              src="https://assets-global.website-files.com/6253f6e60f27498e7d4a1e46/6271a4e4cfea70cec0004fee_Freelancer-Invoice-Template2-DB.jpeg"
              alt="image"
            />
          </div>
          <div class="w-full rounded hover:opacity-50">
            <img
              src="https://assets-global.website-files.com/6253f6e60f27498e7d4a1e46/6271a4e4cfea70cec0004fee_Freelancer-Invoice-Template2-DB.jpeg"
              alt="image"
            />
          </div>
          <div class="w-full rounded hover:opacity-50">
            <img
              src="https://assets-global.website-files.com/6253f6e60f27498e7d4a1e46/6271a4e4cfea70cec0004fee_Freelancer-Invoice-Template2-DB.jpeg"
              alt="image"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col basis-1/6 items-center">
        <div
          class="max-w-sm bg-gray-800 border border-teal-500 rounded-lg shadow justify-center"
        >
          <img class="rounded-t-lg p-8" src="@/assets/logo-small.png" alt="" />
          <button
            class="shadow flex border py-2 w-full rounded-b-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
            v-on:click="uploadDialog()"
          >
            <span class="font-bold w-full">Nahrať logo</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

function uploadDialog() {
  return router.push({
    name: "Document designs",
  });
}
</script>
