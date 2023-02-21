<template>
  <div class="overflow-x-auto w-full">
    <ul>
      <li class="pb-4">
        <div class="flex bg-gray-700 rounded-2xl shadow">
          <div class="flex flex-col basis-4/5 px-6 py-2">
            <div class="flex flex-col">
              <div
                class="flex flex-row py-6 text-4xl text-gray-300 px-4 font-extrabold"
              >
                Objedávateľ, s.r.o.
              </div>
              <div class="flex flex-row justify-between">
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Náhľad
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Upraviť
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Duplikovať
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Zmazať
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Stiahnuť
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Vystaviť upomienku
                </button>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col basis-2/5 bg-gray-800 rounded-2xl text-white p-4"
          >
            <div class="flex flex-row">
              <div class="flex flex-col items-end basis-3/4 pr-20">
                <div class="flex text-2xl font-extrabold">12 340,00 €</div>
                <div class="flex text-xl">14 808,00 € s DPH</div>
                <div class="flex text-sm">19.3.2022 - 3 dni po splatnosti</div>
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
                <div class="flex text-center">
                  <label class="relative cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
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
      <li class="pb-4">
        <div class="flex bg-gray-700 rounded-2xl shadow">
          <div class="flex flex-col basis-4/5 px-6 py-2">
            <div class="flex flex-col">
              <div
                class="flex flex-row py-6 text-4xl text-gray-300 px-4 font-extrabold"
              >
                Objedávateľ, s.r.o.
              </div>
              <div class="flex flex-row justify-between">
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Náhľad
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Upraviť
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Duplikovať
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Zmazať
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Stiahnuť
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Vystaviť upomienku
                </button>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col basis-2/5 bg-gray-800 rounded-2xl text-white p-4"
          >
            <div class="flex flex-row">
              <div class="flex flex-col items-end basis-3/4 pr-20">
                <div class="flex text-2xl font-extrabold">12 340,00 €</div>
                <div class="flex text-xl">14 808,00 € s DPH</div>
                <div class="flex text-sm">19.3.2022 - 3 dni po splatnosti</div>
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
                <div class="flex text-center">
                  <label class="relative cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
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
      <li class="pb-4">
        <div class="flex bg-gray-700 rounded-2xl shadow">
          <div class="flex flex-col basis-4/5 px-6 py-2">
            <div class="flex flex-col">
              <div
                class="flex flex-row py-6 text-4xl text-gray-300 px-4 font-extrabold"
              >
                Objedávateľ, s.r.o.
              </div>
              <div class="flex flex-row justify-between">
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Náhľad
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Upraviť
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Duplikovať
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Zmazať
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Stiahnuť
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:text-teal-500 focus:outline-none"
                >
                  Vystaviť upomienku
                </button>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col basis-2/5 bg-gray-800 rounded-2xl text-white p-4"
          >
            <div class="flex flex-row">
              <div class="flex flex-col items-end basis-3/4 pr-20">
                <div class="flex text-2xl font-extrabold">12 340,00 €</div>
                <div class="flex text-xl">14 808,00 € s DPH</div>
                <div class="flex text-sm">19.3.2022 - 3 dni po splatnosti</div>
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
                <div class="flex text-center">
                  <label class="relative cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
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
  <div v-if="companies.length == 0">
    <div>Momentálne nemáte vo svojom účte žiadne dokumenty.</div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import type { id } from "@formkit/i18n";
import { onMounted, ref } from "vue";
const companies = ref([""] as any);

onMounted(() => {
  store
    .dispatch("getAllCompaniesByUserId", store.state.user.userId)
    .then((response) => {
      console.log(response);
      companies.value = response.data;
    });
});
</script>
