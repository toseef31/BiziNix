<template>
  <div
    class="min-h-screen bg-cover bg-no-repeat bg-fixed bg-center"
    style="background-image: url('../src/assets/2.png')"
  >
    <div
      class="w-full min-h-screen"
      style="
        background-image: linear-gradient(to top,rgba(17, 24, 39, 0.85) 0%,rgba(17, 24, 39, 1) 100%);
      "
    >
      <!--MENU-->
      <div>
        <nav
          class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900"
        >
          <div class="container flex flex-wrap items-center mx-auto">
            <div class="flex md:order-2">
              <div class="relative hidden md:block">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-500"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Search icon</span>
                </div>
                <input
                  type="text"
                  id="search-navbar"
                  class="block w-full p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                  placeholder="Vyhľadajte typ dokumentu"
                />
              </div>
            </div>

            <div
              class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-search"
            >
              <ul
                class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
              >
                <li>
                  <a
                    href="#"
                    class="block py-2 pl-3 pr-4 text-white bg-teal-700 rounded md:bg-transparent md:text-teal-500 md:p-0"
                    aria-current="page"
                    >Účtovné</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >Obchodné</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <!--KONEIC MENU-->

      <!--TABY-->
      <div>
        <ul
          class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4 bg-teal-500"
          id="tabs-tab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <a
              href="#tabs-faktury"
              class="text-gray-800 nav-link block font-bold text-sm leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 mx-6 hover:border-transparent hover:bg-teal-300 focus:border-transparent active"
              id="tabs-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#tabs-home"
              role="tab"
              aria-controls="tabs-home"
              aria-selected="true"
              >Faktúry</a
            >
          </li>
          <li class="nav-item" role="presentation">
            <a
              href="#tabs-zalohove"
              class="text-gray-800 nav-link block font-bold text-sm leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-teal-300 focus:border-transparent"
              id="tabs-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#tabs-profile"
              role="tab"
              aria-controls="tabs-profile"
              aria-selected="false"
              >Zálohové faktúry</a
            >
          </li>
          <li class="nav-item" role="presentation">
            <a
              href="#tabs-dobropisy"
              class="text-gray-800 nav-link block font-bold text-sm leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-teal-300 focus:border-transparent"
              id="tabs-messages-tab"
              data-bs-toggle="pill"
              data-bs-target="#tabs-messages"
              role="tab"
              aria-controls="tabs-messages"
              aria-selected="false"
              >Dobropisy</a
            >
          </li>
          <li class="nav-item" role="presentation">
            <a
              href="#tabs-ponuka"
              class="text-gray-800 nav-link block font-bold text-sm leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-teal-300 focus:border-transparent"
              id="tabs-messages-tab"
              data-bs-toggle="pill"
              data-bs-target="#tabs-messages"
              role="tab"
              aria-controls="tabs-messages"
              aria-selected="false"
              >Cenová ponuka</a
            >
          </li>
          <li class="nav-item" role="presentation">
            <a
              href="#tabs-objednavka"
              class="text-gray-800 nav-link block font-bold text-sm leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-teal-300 focus:border-transparent"
              id="tabs-messages-tab"
              data-bs-toggle="pill"
              data-bs-target="#tabs-messages"
              role="tab"
              aria-controls="tabs-messages"
              aria-selected="false"
              >Objednávka</a
            >
          </li>
        </ul>
      </div>

      <!--KONIEC TABOV-->
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

function redirect() {
  return router.push({
    name: "Add document",
  });
}
</script>
