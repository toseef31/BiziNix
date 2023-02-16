<template>
  <div
    class="min-h-screen bg-cover bg-no-repeat bg-fixed bg-center"
    style="background-image: url('../src/assets/2.png')"
  >
    <div
      class="w-full min-h-screen"
      style="background-image: linear-gradient(to top, rgba(17, 24, 39, 0.85) 0%, rgba(17, 24, 39, 1) 100%);"
    >
      <div class="flex flex-col px-20 py-20">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col items-center">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"
              ></div>
              <span
                class="text-center ml-3 font-bold text-gray-900 dark:text-gray-300"
                >Vystavené</span
              >
            </label>
          </div>
          <div class="flex flex-col items-center">
            <button
              class="p-0 w-12 h-12 bg-teal-600 rounded-full hover:bg-teal-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
              v-on:click="redirect()"
            >
              <svg
                viewBox="0 0 20 20"
                enable-background="new 0 0 20 20"
                class="w-6 h-6 inline-block"
              >
                <path
                  fill="#FFFFFF"
                  d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
                />
              </svg>
            </button>
            <label class="text-white font-bold text-center">Nový doklad</label>
          </div>
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

function redirect(){
  return router.push({
    name: "Add document"
  });
}

</script>
