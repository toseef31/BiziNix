<template>
  <div class="overflow-x-auto w-full">
    <ul>
      <li class="pb-2" v-for="document in documents" :key="document.id">
        <div class="flex bg-gray-700 rounded-2xl shadow">
          <div class="flex flex-col basis-4/5 px-6 py-2">
            <div class="flex flex-col">
              <div
                class="flex flex-row py-2 text-gray-300 px-4 justify-between"
              >
                <div class="text-4xl font-extrabold">
                  {{ document.odberatel }}
                </div>
                <div class="flex flex-col">
                  <div class="font-bold text-xl text-right">
                    {{ document.serial_number }}
                  </div>
                  <div class="font-bold text-sm text-right">
                    {{ document.date_of_issue }}
                  </div>
                </div>
              </div>
              <div class="flex flex-row justify-between">
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-1 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Upraviť
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-1 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Duplikovať
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-1 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Zmazať
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-1 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Stiahnuť
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-1 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Vystaviť upomienku
                </button>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col basis-2/6 bg-gray-800 rounded-2xl text-white py-4"
          >
            <div class="flex flex-row">
              <div class="flex flex-col items-end basis-3/4 pr-20">
                <div class="flex text-2xl font-extrabold">12 340,00 €</div>
                <div class="flex text-xl">14 808,00 € s DPH</div>
                <div class="flex text-sm">3 dni po splatnosti</div>
              </div>
              <div class="flex flex-col items-center basis-1/4">
                <div class="flex items-center pb-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    class="w-6 h-6 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div class="flex">
                  <label class="relative cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="document.isPaid"
                      class="sr-only peer"
                    />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"
                    ></div>
                    <span
                      class="text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Neuhradená</span
                    >
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div v-if="data.length == 0">
    <div>Momentálne nemáte vo svojom účte žiadne doklady.</div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import type { id } from "@formkit/i18n";
import { computed } from "vue";
import type Doklad from "@/@types/Document";
const props = defineProps(["data"]);

const documents = computed(() => props.data);

</script>
