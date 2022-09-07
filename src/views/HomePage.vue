<template>

  <div class="bg-no-repeat bg-cover" style="background-image:linear-gradient(0deg, rgba(36,36,39,0.9332107843137255) 40%, rgba(0,0,0,0.29735644257703087) 100%), url('../src/assets/pozadie.png')">
    <div class="max-w-7xl flex h-[80vh] items-center mx-auto py-20 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
      <div class="max-w-2xl">
        <h2 class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Založenie s.r.o.<br>za 189€ (komplet)</h2>
        <p class="mt-8 mb-8 text-2xl text-white">Zaregistrujte alebo upravte svoju spoločnosť rýchlo,<br>z domu a za najnižšie ceny na trhu.</p>
        <div class="grid grid-cols-3 gap-0"> 
          <div class="mt-1.5 relative">
            <input type="text" value="Chcem si založiť" readonly disabled id="currency" name="currency" class="text-lg font-medium appearance-none block w-full bg-none bg-gray-100 border border-transparent rounded-l-md pl-3 pr-10 py-2 text-black focus:outline-none focus:ring-1 focus:ring-black focus:border-black ">
            <!-- <select id="currency" name="currency" disabled class="appearance-none block w-full bg-none bg-white border border-transparent rounded-l-md pl-3 pr-10 py-2 text-base text-black focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm">
              <option selected>Chcem si založiť</option>
            </select> -->
          </div>
          <div class="mt-1.5 relative">
            <select id="currency" name="currency" class="text-lg font-medium appearance-none block w-full bg-none bg-white border border-transparent rounded-r-md pl-3 pr-10 py-2 text-black focus:outline-none focus:ring-1 focus:ring-black focus:border-black ">
              <option selected>Živnosť (15 €)</option>
              <option>Firmu s.r.o. (20 €)</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
              <ChevronDownIcon class="w-5 text-black" aria-hidden="true" />
            </div>
          </div>
          <div class="mt-1.5 ml-2 relative">
            <button type="button" class="inline-flex items-center p-[8.1px] border border-transparent rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                <ChevronDoubleRightIcon class="w-7" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div class="mt-10 w-full max-w-xs">
        <img src="../assets/robot.png">
      </div>
    </div>
  </div>
  <div class="bg-gray-800 text-white">
  <div class="max-w-7xl mx-auto py-4 px-2 sm:px-6 lg:px-8 bg-gray-800">
    Text
  </div>
</div>
</template>

<script setup lang="ts">
import { ChevronDownIcon, ChevronDoubleRightIcon } from '@heroicons/vue/outline'

</script>