<template>

  <div class="h-screen bg-no-repeat bg-cover" style="background-image:linear-gradient(0deg, rgba(36,36,36,0.9332107843137255) 40%, rgba(0,0,0,0.29735644257703087) 100%), url('../src/assets/pozadie.png')">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
      <div class="max-w-xl">
        <h2 class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-5xl">Kompletné založenie s.r.o. za 189€</h2>
        <p class="mt-5 text-xl text-white">Zaregistrujte alebo upravte svoju spoločnosť rýchlo, z domu a za najmenšie ceny na trhu.</p>
        <label for="currency" class="block text-base font-medium mt-4 text-gray-300">Chcem si založiť</label>
        <div class="mt-1.5 relative">
          <select id="currency" name="currency" class="appearance-none block w-full bg-none bg-gray-700 border border-transparent rounded-md pl-3 pr-10 py-2 text-base text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm">
            <option>Argentina (ARS)</option>
            <option>Australia (AUD)</option>
            <option selected>United States (USD)</option>
            <option>Canada (CAD)</option>
            <option>France (EUR)</option>
            <option>Japan (JPY)</option>
            <option>Nigeria (NGN)</option>
            <option>Switzerland (CHF)</option>
            <option>United Kingdom (GBP)</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
            <ChevronDownIcon class="h-4 w-4 text-white" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div class="mt-10 w-full max-w-xs">
        <img src="../assets/robot.png">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/solid'

</script>