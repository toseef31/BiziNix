<template>

<div class="bg-no-repeat bg-cover" style="background-image:linear-gradient(0deg, rgba(0, 0, 0, 0.85) 40%, rgba(0, 0, 0, 0.523) 100%), url('../src/assets/pages/about-us/onasbg.png') ">
    <div class="max-w-7xl flex flex-row min-h-[80vh] items-center mx-auto py-20 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
      <div class="max-w-full">
        <h1 class="!leading-tight text-5xl font-extrabold text-white sm:tracking-tight lg:text-8xl">Bizinix<br>a jeho <span class="text-bizinix-teal">misia</span></h1>
      </div>
      <!-- Second div of flex -->
      <div>
        <img src="@/assets/robot.png" class="max-w-[16rem] lg:max-w-md">
      </div>
    </div>
  </div>

  <div class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-center">O nás</h1>
    </div>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0">
        <p class="py-2">
          Sme tím právnikov, ekonómov a IT špecialistov. Naše skúsenosti sme
          navzájom prepojili a vytvorili sme tento unikátny projekt, ktorého
          cieľom je pomôcť všetkým podnikateľom.
        </p>

        <p class="py-2">
          Čoraz viac pribúdajúca byrokracia zaťažuje podnikanie natoľko, že
          snaha podnikať sa presúva čoraz viac k administratíve.
        </p>

        <p class="py-2">
          Preto sme prišli s riešením, ktoré vám ušetrí nielen finančné
          prostriedky ale predovšetkým čas, ktorého je v podnikaní čoraz menej.
        </p>

        <p class="py-2">
          Využívame najmodernejšie nástroje a technológie v oblasti
          elektronizácie služieb štátnej správy. Za pomoci nášho užívateľom
          prispôsobenému, si dokážete vytvoriť či upraviť spoločnosť bez potreby
          drahých právnických kancelárií, pohodlne vystavovať faktúry, či si
          skontrolovať úradné dokumenty jednoducho i s pomocou smartfónu. Vďaka
          automatizácií systémov Vám vieme zaručiť vysoký štandard všetkých
          služieb, komplexnosť a to všetko za bezkonkurenčné ceny.
        </p>

        <p class="py-2">
          Aby sme Vám doručili tie najlepšie služby na trhu, spolupracujeme s
          advokátmi, právnikmi, účtovnými a daňovými poradcami.
        </p>
      </div>
      <!-- /End replace -->
    </div>
    <div class="bg-gray-800 text-white">
      <CounselingCenter></CounselingCenter>
      <Reviews></Reviews>
    </div>
  </div>
</template>

<script setup lang="ts">
import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";
</script>
