<template>
  <div class="flex items-center min-h-[80vh] bg-black bg-opacity-70 bg-blend-overlay bg-[url('../src/assets/6.png')] bg-cover bg-no-repeat bg-center">
    <div class="max-w-7xl flex flex-col md:flex-row items-center mx-auto py-20 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
      <div class="max-w-full">
        <h1 class="!leading-tight text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Najlepšie virtuálne sídlo
        </h1>
        <div class="text-base text-white my-4">
          <ul class="list-disc list-inside">
            <li>Ukladanie všetkých doručených listín na jednom mieste, v digitálnej podobe</li>
            <li>Expresné preposielanie originálov</li>
            <li>Preberanie pošty z úradov</li>
            <li>Emailové notifikácie o prijatej pošte</li>
          </ul>
        </div>
      </div>
      <!-- Second div of flex -->
      <div>
        <img src="@/assets/robot_stripes.png" class="max-w-xs lg:max-w-md" />
      </div>
    </div>
  </div>
  <div class="bg-gray-bizinix">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="flex flex-col md:flex-row container mx-auto mt-28 items-center justify-between space-x-20 w-full">
        <div class="flex-1">
          <div class="text-4xl md:text-5xl text-white font-bold leading-normal">
            Vieme, čo potrebujete
          </div>
          <div class="text-white text-base mt-4">
            Všetka korešpondencia prichádzajúca na sídlo <br />
            firmy (virtuálne sídlo firmy) sa uchováva. Následne sa z virtuálneho
            <br />
            sídla firmy preposiela na dohodnutú korešpondenčnú adresu. <br />
            Preposielanie z virtuálneho sídla firmy je štandardne 1x za mesiac
            <br />
            (do 3 pracovných dní nasledujúceho mesiaca).
          </div>
        </div>
        <div>
          <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/JdNw6DmRMDQ?controls=0"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        ></iframe>
        </div>
      </div>
    </div>
  </div>
  <div
    class="flex py-20 w-full h-full bg-cover bg-no-repeat bg-center bg-local relative"
    style="
      background-image: linear-gradient(
        to top,
        rgba(17, 24, 39, 1) 0%,
        rgba(17, 24, 39, 1) 40%,
        rgba(31, 41, 55, 1) 40%,
        rgba(31, 41, 55, 1) 100%
      );
    "
  >
    <div class="absolute bottom-[-5px] left-5">
      <img src="@/assets/dots_h.png" class="max-h-[330px]" />
    </div>
    <div class="container mx-auto text-left">
      <div class="w-full">
        <div class="text-5xl mt-4 text-white font-bold leading-normal">
          Vyberte si lukratívne sídlo
        </div>
        <div class="text-white text-base mt-4 mb-10">
          Základná cena obsahuje zriadenie sídla označenie schránky a email
          notifikácie o prijatej <br />
          pošte. V prípade záujmu k sídlu doplnte ďalšie služby (napríklad
          preberanie pošty, <br />
          ich scanovanie).
        </div>
        <VirtualHqSlider v-model="currentVhq"></VirtualHqSlider>
        <!---->
      </div>
    </div>
  </div>

  <div class="bg-gray-900 py-8 z-1 text-white" id="detailsDiv">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col">
          <div class="flex flex-col items-end w-full pb-8">
            <div class="text-white text-2xl mt-4 text-right">
              Pokračujte s objednávkou a majte to
            </div>
            <div class="text-white text-5xl mt-4 text-right font-bold">
              Najlepšie virtuálne sídlo
            </div>
          </div>
          <div>
            <VhqOrderComponent />
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
import store from "@/store";
import { ref, computed, onBeforeMount } from "vue";
import VhqOrderComponent from "../../components/forms/VhqOrderComponent.vue";
import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";
import VirtualHqSlider from "@/components/VirtualHqSlider.vue";

const vhqs: any = computed(() => {
  return store.state.vhqs;
});

const currentVhq = ref({
  id: 0,
  base_price: 0,
  name: "test",
  description: "test",
  img: "https://beta.bizinix.sk/img/vcompany.jpg",
  address: {
    id: 0,
    street: "Ulica",
    street_number: "1",
    street_number2: "2",
    city: "Bratislava",
    country: "Slovensko",
    psc: "04001",
    created_at: "",
    updated_at: "",
  },
  address_id: 0,
});

onBeforeMount(async () => {
  await store.dispatch("vhqs");
  currentVhq.value = vhqs.value.at(0);
});
</script>

<style scoped>
section {
  width: 100%;
  margin-right: 24px;
}

@media (min-width: 640px) {
  section {
    width: calc((100% - (24px)) / 2);
  }
}

@media (min-width: 768px) {
  section {
    width: calc((100% - (2 * 24px)) / 3);
  }
}

@media (min-width: 1024px) {
  section {
    width: calc((100% - (3 * 24px)) / 3);
  }
}

@media (min-width: 1280px) {
  section {
    width: calc((100% - (3 * 24px)) / 3);
  }
}
</style>
