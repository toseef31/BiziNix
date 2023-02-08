<template>
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
      <FooterLayout></FooterLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import FooterLayout from "@/components/FooterLayout.vue";
import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";
</script>
