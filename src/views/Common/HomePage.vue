<template>
  <div class="bg-no-repeat bg-cover" style="background-image:linear-gradient(0deg, rgba(36,36,39,0.9332107843137255) 40%, rgba(0,0,0,0.29735644257703087) 100%), url('../src/assets/pozadie.png')">
    <div class="max-w-7xl flex h-[50vh] md:h-[80vh] items-center mx-auto py-20 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
      <div class="max-w-full">
        <h2 class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Založenie s.r.o.<br>za 199 € (komplet)</h2>
        <p class="mt-8 mb-8 text-2xl text-white">Zaregistrujte alebo upravte svoju spoločnosť rýchlo,<br>z domu a za najnižšie ceny na trhu.</p>
        <div class="flex"> 
          <div>
            <input type="text" value="Chcem si založiť" readonly disabled id="currency" name="currency" class="w-full text-sm lg:text-lg font-medium appearance-none bg-none bg-gray-100 border border-transparent rounded-l-md p-2 text-black focus:outline-none">
            <!-- <select id="currency" name="currency" disabled class="appearance-none block w-full bg-none bg-white border border-transparent rounded-l-md pl-3 pr-10 py-2 text-base text-black focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm">
              <option selected>Chcem si založiť</option>
            </select> -->
          </div>
          <div class="relative w-64">
            <select v-model="compamyType" @change="selectedCompanyType" id="type" name="type" class="text-sm lg:text-lg font-medium w-full appearance-none bg-none bg-white border border-transparent rounded-r-md pl-3 py-2 text-black focus:outline-none">
              <option v-for="option in options" :value="option.value">{{ option.text }}</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center"
            >
              <ChevronDownIcon class="w-5 text-black" aria-hidden="true" />
            </div>
          </div>
          <div class="ml-2">
            <button type="button" @click="submitCompanyType" class="inline-flex items-center p-[8.1px] border border-transparent rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none">
                <ChevronDoubleRightIcon class="w-5 lg:w-7" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div class="hidden md:block md:max-w-xs lg:max-w-md">
        <img src="@/assets/robot.png">
      </div>
    </div>
  </div>
  <!-- After slider -->
  <div class="py-6 bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto py-4 px-2 sm:px-6 lg:px-8 bg-gray-800">
        <h1 class="text-center text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Všetko, čo potrebuje vaše podnikanie</h1>
        <div class="flex gap-14 mt-14 flex-col md:flex-row">
        <div class="border-2 rounded-tr-[80px] border-teal-600 hover:border-teal-700 p-8">
          <h2 class="font-bold text-3xl">Zakladanie a zmeny vo firmách</h2>
          <div class="mt-4">Kompletné založenie alebo úprava <b>s.r.o.</b> či <b>živnosti</b>. Okrem minimálnych cien Vám vďaka partnerom garantujeme <b>najrýchlejšie vybavenie</b> žiadostí na úradoch.</div>
          <router-link to="/zalozenie-firmy">
            <button class="text-white mt-4 bg-bizinix-teal hover:bg-teal-700 px-6 py-2 rounded">Zaloťiť s.r.o.</button>
          </router-link>
        </div>
        <div class="border-2 rounded-tr-[80px] border-teal-600 hover:border-teal-700 p-8">
          <h2 class="font-bold text-3xl">Vytváranie a správa dokumentov</h2>
          <div class="mt-4">Vystavujte a spravujte svoje faktúry, objednávky alebo cenové ponuky <b>pohodlne na pár klikov</b>. S nami budete mať vždy aktuálny <b>prehľad</b> o Vašom hospodárení.</div>
          <router-link to="/documents">
            <button class="text-white mt-4 bg-bizinix-teal hover:bg-teal-700 px-6 py-2 rounded">Viac informácii</button>
          </router-link>
        </div>
        <div class="border-2 rounded-tr-[80px] border-teal-600 hover:border-teal-700 p-8">
          <h2 class="font-bold text-3xl">Najlepšie virtuálne sídlo</h2>
          <div class="mt-4">Zriaďte si sídlo spoločnosti v <b>lukratívnych</b> častiach Bratislavy. Po poštu chodiť nemusíte. Obsah Vašej poštovej schránky môžete sledovať, prezerať a spravovať <b>online.</b></div>
          <router-link to="/virtualne-sidlo">
            <button class="text-white mt-4 bg-bizinix-teal hover:bg-teal-700 px-6 py-2 rounded">Založiť Virtuálne sídlo</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-gray-800 text-white">
    <CounselingCenter></CounselingCenter>
    <Reviews></Reviews>
  </div>

</template>

<script setup lang="ts">
import router from '@/router';
import { ChevronDownIcon, ChevronDoubleRightIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue';
import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";

const compamyType = ref('živnosť')
const options = ref([
  {text: "Živnosť (1 €)", value: "živnosť"},
  {text: "Firmu s.r.o. (199 €)", value: "firma"}
])

function selectedCompanyType(){
  //console.log(compamyType.value)
}

function submitCompanyType(){
  if(compamyType.value === "firma"){
    router.push({ name: 'ZalFirmy' });
  }
  else if(compamyType.value === "živnosť"){
    router.push({ name: 'ZalZivnosti' });
  }
  else{
    alert("Zvoľte prosím čo si chceťe založiť.")
  }
}

</script>
