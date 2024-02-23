<template>

<div class="bg-no-repeat bg-cover" style="background-image:linear-gradient(to bottom,rgba(17, 24, 39, 0.75) 0%,rgba(17, 24, 39, 0.95) 100%), url('../src/assets/pages/about-us/onasbg.png') ">
    <div class="max-w-7xl flex flex-row min-h-[60vh] items-center mx-auto py-20 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
      <div class="max-w-full">
        <h1 class="!leading-tight text-5xl font-extrabold text-white sm:tracking-tight lg:text-8xl">Bizinix<br>a jeho <span class="text-bizinix-teal">misia</span></h1>
      </div>
      <div>
        <img src="@/assets/robot.png" class="max-w-[16rem] lg:max-w-md">
      </div>
    </div>
  </div>

  <div class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="flex flex-row pb-8">
        <div class="flex flex-col justify-between">
          <div class="text-5xl font-bold pt-16">
            Ciele, pre ktoré <br>sme vznikli
          </div>
          <div>
            <img src="@/assets/robot_targets.png" class="max-w-[16rem] lg:max-w-md pb-4">
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-row items-center">
            <div>
              <img src="@/assets/numbers/1.png" class="max-w-[12rem] lg:max-w-md">
            </div>
            <div class="font-bold text-lg">
              Uľahčenie podnikania na Slovensku
            </div>
          </div>
          <div class="flex flex-row items-center">
            <div>
              <img src="@/assets/numbers/2.png" class="max-w-[16rem] lg:max-w-md">
            </div>
            <div class="font-bold text-lg">
              Nárast podnikateľského prostredia
            </div>
          </div>
          <div class="flex flex-row items-center">
            <div>
              <img src="@/assets/numbers/3.png" class="max-w-[16rem] lg:max-w-md">
            </div>
            <div class="font-bold text-lg">
              Zhromaždenie všetkého potrebného pod jednu strechu
            </div>
          </div>
          <div class="flex flex-row items-center">
            <div>
              <img src="@/assets/numbers/4.png" class="max-w-[16rem] lg:max-w-md">
            </div>
            <div class="font-bold text-lg">
              Poskytnutie odborného poradenstva pre začínajúcich podnikateľov
            </div>
          </div>
          <div class="flex flex-row items-center">
            <div>
              <img src="@/assets/numbers/5.png" class="max-w-[16rem] lg:max-w-md">
            </div>
            <div class="font-bold text-lg">
              Pomoc nie len s vznikom a správou, ale aj s rastom podnikov
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row py-16">
        <div class="flex flex-col">
          <div class="text-center text-5xl font-bold">
            <span class="text-teal-500">Bizinix sú ľudia</span> z prostredia IT, účtovníctva a práva, ktorí majú <span class="text-teal-500">skúsenosti s podnikateľskými procesmi</span> na území Slovenska.
          </div>
        </div>
      </div>
      <div class="flex flex-row py-16">
        <div class="flex flex-col justify-center items-center w-full">
          <hr class="w-48 h-1 mx-auto my-4 border-0 rounded md:my-10 bg-gray-600">
        </div>
      </div>
      <div class="flex flex-row relative">
        <div class="flex flex-col w-full">
          <img
            src="@/assets/robot_stars.png"
            class="absolute bottom-[-6rem] left-[-40rem] z-0 max-h-[720px]"
          />
          <img
            src="@/assets/pages/about-us/pismenob.png"
            class="absolute bottom-0 right-[-8rem] z-0"
          />
          <div class="text-right text-4xl font-bold py-8">
            Naši odborní partneri,<br> ktorí Vás vynesú ku<br> hviezdam
          </div>
          <div class="flex py-10 px-10">
          <vue-horizontal
            responsive
            class="horizontal"
            :items="partners"
            :options="options"
          >
            <section v-for="partner in partners" :key="partner.id" class="px-4">
              <!---->
              <div
                class="flex flex-col w-full h-full bg-gray-900 p-14 border rounded-lg border-teal-500 justify-between items-center"
              >
                <img class="max-w-[8rem]" :src="partner.logo" />
                <div class="px-2 my-2 text-white text-lg font-bold">
                  {{ partner.name }}
                </div>
              </div>
              <!---->
            </section>

            <template v-slot:btn-prev>
              <button
                style="align-self: start; padding-top: 24px; margin-right: 30px"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-12 h-12 text-teal-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            </template>

            <template v-slot:btn-next>
              <button style="align-self: start; padding-top: 24px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-12 h-12 text-teal-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </template>
          </vue-horizontal>
        </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-800 text-white z-50 relative">
      <CounselingCenter></CounselingCenter>
      <Reviews></Reviews>
    </div>
  </div>
</template>

<script setup lang="ts">
import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";
import VueHorizontal from "vue-horizontal";

const partners = [
  {
    id: 1,
    name: "Advokátska kancelária a rozhodcovský súd",
    logo: "https://agmpartners.sk/public/images/web/logo.png"
  },
  {
    id: 2,
    name: "Účtovná kancelária a daňové poradenstvo",
    logo: "https://t1a.sk/wp-content/uploads/2018/02/cropped-logoT1a-1.png"
  },
  {
    id: 3,
    name: "Združenie reklamných agentúr v Bratislave",
    logo: "https://soso.solutions/wp-content/uploads/2021/11/Novy%CC%81-projekt-10-e1636308304517.png"
  },
];

let options: {
  responsive: [
    { end: 576; size: 1 },
    { start: 576; end: 768; size: 2 },
    { start: 768; end: 992; size: 3 },
    { size: 4 }
  ];
};

</script>
