<template>
  <div class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-center">Kontakt</h1>
      <p class="text-xl font-bold py-2">Kontaktné údaje</p>
        <p>
          Bizinix, s.r.o. <br />
          Ružinovská 18186/44,<br />
          821 03 Bratislava - mestská časť Ružinov
        </p>
        <p class="py-2">
          IČO: 55734367<br />
          DIČ: 2122082391 <br />
          IČ DPH: Nie je platca DPH
        </p>
        <p>
          Pracujeme ONLINE (We work ONLINE)<br />
          Pracovné dni: 8:00 - 17:30 (Working days: 8:00 a.m. to 5:30 p.m.)
          <br />
          Kontaktujte nás telefonicky alebo online (Contact us by phone or
          online) <br />Pre návštvevu u nás si s nami vopred dohodnite
          15-minutové stretnutie na konkrétny deň a čas. (Make an appointment in
          advance for your visit)
        </p>

        <div class="flex my-8">
        <div class="flex-1 flex flex-col justify-center">
          <div class="text-3xl font-bold">
            Zákaznícka podpora
          </div>
          <div class="text-base mt-4">
            <a href="tel:+421908478270">+421 908 478 270</a>
          </div>
          <div class="text-base">
            <a href="mailto:support@bizinix.sk">support@bizinix.sk</a>
          </div>
        </div>
        <div class="flex-1 py-10 bg-gray-800 rounded-xl">
          <div class="px-6 flex flex-row justify-between">
            <div class="flex basis-1/4">
              <div class="flex flex-col">
                <div class="text-3xl font-bold text-teal-500">LiveChat</div>
                <div class="text-base text-white mt-4">
                  Pokecajme si hneď teraz online
                </div>
                <div class="pt-6">
                  <button
                    class="bg-teal-500 hover:bg-teal-700 text-gray-900 font-bold py-2 px-4 rounded"
                    v-on:click="openLiveChat()"
                  >
                    Spustiť
                  </button>
                </div>
              </div>
            </div>
            <div class="flex basis-3/4 relative">
              <div class="absolute inset-y-0 right-0 flex items-center">
                <img class="max-h-[360px]" src="@/assets/robot-head.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CounselingCenter></CounselingCenter>
  <Reviews></Reviews>
</template>

<script setup lang="ts">
import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";

function openLiveChat() {
  window.tidioChatApi.display(true);
  window.tidioChatApi.open();
}
</script>
