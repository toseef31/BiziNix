<template>
  <div class="bg-gray-900 text-white">
    <!--NAJOBLUBENEJSIE-->
    <div>
      <section class="bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h3 class="mb-4 text-2xl tracking-tight font-extrabold text-white">
              Najobľúbenejšie
            </h3>
          </div>
          <div
            class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0"
          >
            <!-- Pricing Card -->
            <div
              class="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-gray-800 text-white"
            >
              <h3 class="text-2xl font-bold">Bizinix<br>Doklady</h3>
              <div class="flex justify-center items-baseline mb-8 mt-2">
                <span class="text-5xl font-extrabold">5€</span><span class="text-sm text-gray-500 font-bold">/mesačne</span>
              </div>
              <!-- List -->
              <ul role="list" class="mb-8 space-y-4 text-left">
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="font-semibold">Neobmedzený počet zákazníkov</span>
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="font-semibold">Nastavenie úhrad a report</span>
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="font-semibold"
                    >Import prijatých dokladov</span
                  >
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="font-semibold"
                    >Zasielanie upomienok</span
                  >
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="font-semibold"
                    >Výber designu dokladov</span
                  >
                </li>
              </ul>
                <router-link
                  to="/documents"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700"
                  >Skúsiť 3 mesiace zdarma</router-link
                >
            </div>
            <!-- Pricing Card -->
            <div
              class="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-gray-800 text-white"
            >
              <h3 class="text-2xl font-semibold">Najlepšie<br>virtuálne sídlo</h3>
              <div class="flex justify-center items-baseline mb-8 mt-2">
                <span class="text-sm text-gray-500 font-bold">od</span><span class="text-5xl font-extrabold">7€</span><span class="text-sm text-gray-500 font-bold">/mesačne</span>
              </div>
              <!-- List -->
              <ul role="list" class="mb-8 space-y-4 text-left">
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="font-semibold">Emailové notifikácie</span>
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="font-semibold">Možnosť skartácie</span>
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="font-semibold"
                    >Možnosť preposlania</span
                  >
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="font-semibold"
                    >Možnosť vyžiadania scanu</span
                  >
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="font-semibold"
                    >Prepojenie so slovensko.sk</span
                  >
                </li>
              </ul>
                <router-link
                  to="/virtualne-sidlo"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700"
                  >Mám záujem</router-link
                >
            </div>
            <!-- Pricing Card -->
            <div
              class="flex flex-col p-6 mx-auto max-w-lg text-center ounded-lg border shadow border-gray-600 xl:p-8 bg-gray-800 text-white"
            >
              <h3 class="text-2xl font-semibold">Založenie<br>s.r.o.</h3>
              <div class="flex justify-center items-baseline mb-2 mt-2">
                <span class="text-5xl font-extrabold">199€</span>
              </div>
              <div class="mb-4">
                <span class="text-gray-500">vrátane štátneho poplatku</span>
              </div>
              <!-- List -->
              <ul role="list" class="mb-8 space-y-4 text-left">
                <li class="flex items-center space-x-3">
                  <span>Založte si u nás novú s.r.o. za najnižšiu cenu na trhu. V rámci balíku od nás dostanete službu
                    <span class="text-teal-500">Bizinix doklady na 3 mesiace zdarma</span>
                    a kopu ďalších výhod.</span>
                </li>
              </ul>
              <div class="flex w-full h-full place-items-end">
                  <router-link
                  to="/zalozenie-firmy"
                  class="w-full inline-flex justify-center whitespace-nowrap rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700"
                  >Mám záujem</router-link
                  >
              </div>  
            </div>
          </div>
        </div>
      </section>
    </div>
    <!--KONIEC_NAJOBLUBENEJSIE-->
    <!--VSETKY-->
    <div class="flex w-full">
      <div class="flex flex-col w-full justify-center">
        <div class="w-full text-center">
          <h3 class="text-2xl tracking-tight font-extrabold text-white">
            Administratívne<br>služby
          </h3>
        </div>
        <section class="bg-gray-900 w-full py-20 px-20">
          <h3 class="text-xl tracking-tight font-extrabold text-white py-2">SRO</h3>
          <table
            class="w-full text-sm text-left text-gray-400 table-fixed"
          >
            <thead
              class="text-xs uppercase bg-gray-700 text-gray-400"
            >
              <tr>
                <th class="py-3 pl-4">Položka</th>
                <th class="py-3">Popis</th>
                <th class="py-3 pr-8 text-right">Cena</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-b bg-gray-800 border-gray-700"
              >
                <td class="py-4 pl-4 text-white font-medium">Založenie sro</td>
                <td class="py-4">Vrátane štátneho poplatku a neobmedzeného množstva voľných živnost</td>
                <td class="py-4 pr-8 text-right">199€</td>
              </tr>
              <tr
                class="bg-gray-800"
              >
                <td class="py-4 pl-4 text-white font-medium">Zmeny v sro</td>
                <td class="py-4">Vrátane štátneho poplatku a neobmedzeného množstva voľných živnost</td>
                <td class="py-4 pr-8 text-right">69€</td>
              </tr>
            </tbody>
          </table>
          <h3 class="text-xl tracking-tight font-extrabold text-white py-2">Živnosť</h3>
          <table
            class="w-full text-sm text-left  text-gray-400 table-fixed"
          >
            <thead
              class="text-xs  uppercase  bg-gray-700 text-gray-400"
            >
              <tr>
                <th scope="col" class="py-3 pl-4">Položka</th>
                <th scope="col" class="py-3">Popis</th>
                <th scope="col" class="py-3 pr-8 text-right">Cena</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b bg-gray-800 border-gray-700">
                <td class="py-4 pl-4 text-white font-medium">Založenie živnosti </td>
                <td class="py-4">Vrátane všetkých poplatkov a neobmedzeného množstva voľných živnost</td>
                <td class="py-4 pr-8 text-right">1€</td>
              </tr>
              <tr class="border-b bg-gray-800 border-gray-700">
                <td class="py-4 pl-4 text-white font-medium">Zmeny v živnosti</td>
                <td class="py-4">Vrátane všetkých poplatkov a neobmedzeného množstva voľných živnost</td>
                <td class="py-4 pr-8 text-right">10€</td>
              </tr>
              <tr class="border-b bg-gray-800 border-gray-700">
                <td class="py-4 pl-4 text-white font-medium">Pozastavenie živnosti</td>
                <td class="py-4">Vrátane všetkých poplatkov</td>
                <td class="py-4 pr-8 text-right">10€</td>
              </tr>
              <tr class="border-b bg-gray-800 border-gray-700">
                <td class="py-4 pl-4 text-white font-medium">Obnovenie živnosti</td>
                <td class="py-4">Vrátane všetkých poplatkov</td>
                <td class="py-4 pr-8 text-right">10€</td>
              </tr>
              <tr class="bg-gray-800">
                <td class="py-4 pl-4 text-white font-medium">Zrušenie živnosti</td>
                <td class="py-4">Vrátane všetkých poplatkov</td>
                <td class="py-4 pr-8 text-right">10€</td>
              </tr>
            </tbody>
          </table>
          <h3 class="text-xl tracking-tight font-extrabold text-white py-2">Obchodné združenie</h3>
          <table
            class="w-full text-sm text-left  text-gray-400 table-fixed"
          >
            <thead
              class="text-xs  uppercase  bg-gray-700 text-gray-400"
            >
              <tr>
                <th scope="col" class="py-3 pl-4">Položka</th>
                <th scope="col" class="py-3">Popis</th>
                <th scope="col" class="py-3 pr-8 text-right">Cena</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b bg-gray-800 border-gray-700">
                <td class="py-4 pl-4 text-white font-medium">Založenie občianskeho združenia</td>
                <td class="py-4">Vrátane všetkých poplatkov</td>
                <td class="py-4 pr-8 text-right">89€</td>
              </tr>
              <tr class="bg-gray-800">
                <td class="py-4 pl-4 text-white font-medium">Registrácia na darovanie 2% z daní</td>
                <td class="py-4">Vrátane všetkých poplatkov</td>
                <td class="py-4 pr-8 text-right">XY€</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
    <!--KONIEC_VSETKY-->
  </div>
  <div class="bg-gray-800 text-white">
    <CounselingCenter></CounselingCenter>
    <Reviews></Reviews>
    
  </div>
</template>

<script setup lang="ts">

import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";
</script>
