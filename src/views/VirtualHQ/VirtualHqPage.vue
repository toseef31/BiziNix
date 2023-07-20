<template>
  <div
    class="relative z-0 h-full w-full max-h-full bg-cover bg-local bg-no-repeat bg-center"
    style="
      height: calc(100vh - 200px);
      background-image: url('../src/assets/6.png');
    "
  >
    <img
      src="@/assets/robot_stripes.png"
      class="absolute bottom-[-82px] right-0"
      style="height: calc(100vh - 260px)"
    />
    <div
      class="w-full flex h-full"
      style="background-color: rgba(0, 0, 0, 0.75)"
    >
      <div class="container flex-col justify-center mx-auto flex h-full">
        <div class="text-5xl text-white leading-normal font-bold">
          Najlepšie <br />
          virtuálne sídlo
        </div>
        <div class="text-base text-white my-4">
          <div class="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-2 h-2 text-white"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                clip-rule="evenodd"
              />
            </svg>
            <span>
              Ukladanie všetkých doručených listín na jednom mieste, v
              digitálnej podobe
            </span>
          </div>
          <div class="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-2 h-2 text-white"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                clip-rule="evenodd"
              />
            </svg>
            <span> Expresné preposielanie originálov </span>
          </div>
          <div class="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-2 h-2 text-white"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Preberanie pošty z úradov</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-2 h-2 text-white"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Emailové notifikácie o prijatej pošte</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-gray-900 py-14">
    <div
      class="flex container mx-auto mt-28 items-center justify-between space-x-20 w-full"
    >
      <div class="flex-1">
        <div class="text-5xl text-white font-bold leading-normal">
          Vieme, čo <br />potrebujete
        </div>
        <div class="text-white text-base mt-4">
          DUMMY TEXT Všetka korešpondencia prichádzajúca na sídlo <br />
          firmy (virtuálne sídlo firmy) sa uchováva. Následne sa z virtuálneho
          <br />
          sídla firmy preposiela na dohodnutú korešpondenčnú adresu. <br />
          Preposielanie z virtuálneho sídla firmy je štandardne 1x za mesiac
          <br />
          (do 3 pracovných dní nasledujúceho mesiaca).
        </div>
      </div>
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
        <div class="text-white text-base mt-4">
          Základná cena obsahuje zriadenie sídla označenie schránky a email
          notifikácie o prijatej <br />
          pošte. V prípade záujmu k sídlu doplnte ďalšie služby (napríklad
          preberanie pošty, <br />
          ich scanovanie).
        </div>

        <div class="flex mt-10">
          <vue-horizontal
            v-if="vhqs.length > 0"
            responsive
            class="horizontal"
            :items="vhqs"
            :options="options"
          >
            <section v-for="vhq in vhqs" :key="vhq.id" class="relative px-4">
              <!---->
              <div
                class="w-[110px] py-1 text-sm bg-gray-800/75 mx-auto rounded-b-lg text-white text-center absolute top-0 left-0 right-0"
              >
                {{ vhq.base_price }}€ / mesiac
              </div>
              <div>
                <button
                  v-on:click="doScrolling('#detailsDiv', 1000, vhq.id)"
                  class="w-[110px] hover:cursor-pointer hover:bg-gray-800 hover:text-teal-500 py-1 text-sm bg-teal-500 mx-auto rounded text-gray-800 font-bold text-center absolute bottom-[120px] left-0 right-0"
                >
                  Vybrať
                </button>
              </div>
              <img v-bind:src="vhq.img" class="w-full rounded h-5/6" />
              <div class="font-medium px-2 my-2 text-white text-lg">
                {{ vhq.name }}
              </div>
              <div class="text-white px-2 mb-2 text-sm">
                {{ vhq.address.street }} {{ vhq.address.street_number }} /
                {{ vhq.address.street_number2 }}, {{ vhq.address.psc }}
                {{ vhq.address.city }}
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
        <!---->
      </div>
    </div>
  </div>

  <div class="bg-gray-900 pt-14 z-1 text-white" id="detailsDiv">
    <div class="flex w-full">
      <div class="flex flex-col items-end w-full relative">
        <img
          src="@/assets/robot_left.png"
          class="absolute bottom-0 left-[-90px] z-0 max-h-[720px]"
        />
        <img
          src="@/assets/dots_h.png"
          class="absolute bottom-5 right-5 z-0 max-h-[330px]"
        />
        <div class="text-white text-2xl mt-4 mx-40 text-right">
          Chcete na sídlo prijímať poštu a <br />
          mať všetko prehľadne uložené online?
        </div>
        <div class="text-5xl text-white font-bold leading-normal mx-40">
          Doplňte si ďalšie služby
        </div>
        <div class="flex flex-row rounded max-w-5xl py-12 mx-40 z-10">
          <div class="flex flex-col py-5 px-10 bg-gray-900/95 pr-20">
            <div class="relative w-64">
              <select
                id="vhqs"
                name="vhqs"
                class="text-sm lg:text-lg font-medium w-full appearance-none bg-none bg-gray-700 border border-transparent rounded-md pl-3 py-2 text-teal-500 focus:outline-none"
                @change="switchSelect($event)"
              >
                <option
                  v-for="vhq in vhqs"
                  :value="vhq.id"
                  :key="vhq.id"
                  :selected="vhq.id == currentVhq.id"
                >
                  {{ vhq.name }}
                </option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center"
              >
                <ChevronDownIcon class="w-5 text-teal-500" aria-hidden="true" />
              </div>
            </div>
            <div class="text-base shrink pt-5">
              Základná cena
              <span class="text-teal-500"
                >{{ currentVhq.base_price }}€/mesiac</span
              >
              obsahuje zriadenie sídla a označenie schránky a email notifikácie
              o prijatej pošte.
            </div>
            <div class="text-2xl font-bold py-5">
              V prípade záujmu si k sídlu doplňte ďalšie služby
            </div>
            <!------>
            <div class="flex flex-row py-5 justify-between">
              <div class="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span class="shrink pr-10"
                  >Preberanie a online evidencia zásielok</span
                >
              </div>
              <div>
                <input
                  :checked="preberanie"
                  type="checkbox"
                  id="preberanie"
                  class="focus:ring-teal-500 focus:border-teal-500 text-teal-500"
                  @change="preberanieChanged($event)"
                />
                <label for="preberanie" class="pl-2">4€/mesiac</label>
              </div>
            </div>
            <!------>
            <div class="flex flex-row py-5 justify-between">
              <div class="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span class="shrink pr-10">Preposlanie pošty</span>
              </div>
              <div>
                <input
                  :checked="preposlanie"
                  type="checkbox"
                  id="preposielanie"
                  @change="preposielanieChanged($event)"
                  class="focus:ring-teal-500 focus:border-teal-500 text-teal-500"
                />
                <label for="preposielanie" class="pl-2">1€/mesiac</label>
              </div>
            </div>
            <!------>
            <div class="flex flex-row py-5 justify-between">
              <div class="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span class="shrink pr-10">Skenovanie zásielok</span>
              </div>
              <div>
                <input
                  :checked="scanovanie"
                  type="checkbox"
                  id="scanovanie"
                  @change="scanovanieChanged($event)"
                  class="focus:ring-teal-500 focus:border-teal-500 text-teal-500"
                />
                <label for="scanovanie" class="pl-2">5€/mesiac</label>
              </div>
            </div>
            <!------>
            <div class="flex flex-row py-5 justify-between">
              <div class="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span class="shrink pr-10">Skartácia na požiadanie</span>
              </div>
              <div>
                <input
                  :checked="skartovanie"
                  type="checkbox"
                  id="skartovanie"
                  @change="skartovanieChanged($event)"
                  class="focus:ring-teal-500 focus:border-teal-500 text-teal-500"
                />
                <label for="skartovanie" class="pl-2">2€/mesiac</label>
              </div>
            </div>
            <!------>
            <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <div class="flex flex-row py-5 justify-between">
              <div class="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span class="shrink pr-10">Chcem sídlo na firmu, která ešte neexistuje</span>
              </div>
              <div>
                <input
                  :checked="newCompany"
                  type="checkbox"
                  id="nova"
                  @change="newCompanyChanged($event)"
                  class="focus:ring-teal-500 focus:border-teal-500 text-teal-500"
                />
              </div>
            </div>
            <!------>
          </div>
          <!---->
          <div
            class="flex basis-1/4 flex-col items-center text-center bg-gray-800"
          >
            <img v-bind:src="currentVhq.img" class="h-[300px] w-full" />
            <div class="px-3 py-2 shrink text-sm">
              {{ currentVhq.name }}, {{ currentVhq.address.street }}
              {{ currentVhq.address.street_number }}/{{ currentVhq.address.street_number2 }},
              {{ currentVhq.address.psc }}
              {{ currentVhq.address.city }}
            </div>
            <div class="pt-10 text-xm">Výsledná cena</div>
            <div class="px-3 py-2 text-2xl font-bold">
              {{ final_price }}€/mesiac
            </div>
            <div class="py-5">
              <button
                v-on:click="createNewOrder()"
                class="px-6 py-2 hover:cursor-pointer hover:bg-gray-800 hover:text-teal-500 hover:border hover:border-teal-500 text-sm bg-teal-500 mx-auto rounded text-gray-800 font-bold text-center"
              >
                Pokračovať
              </button>
            </div>
          </div>
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
import { ref, computed, onBeforeMount, reactive } from "vue";

import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";
import { ChevronDownIcon } from "@heroicons/vue/outline";
import { useRouter } from "vue-router";
import VueHorizontal from "vue-horizontal";

const router = useRouter();

const vhqs: any = computed(() => {
  return store.state.vhqs;
});

let options: {
  responsive: [
    { end: 576; size: 1 },
    { start: 576; end: 768; size: 2 },
    { start: 768; end: 992; size: 3 },
    { size: 4 }
  ];
};

const hasPrev = ref();
const hasNext = ref();

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

const final_price = ref(0);
const preberanie = ref(false);
const preposlanie = ref(false);
const scanovanie = ref(false);
const skartovanie = ref(false);
const newCompany = ref(false);

function switchSelect(event: any) {
  preberanie.value = false;
  preposlanie.value = false;
  scanovanie.value = false;
  skartovanie.value = false;
  newCompany.value = false;

  currentVhq.value = vhqs.value.find(
    (item: any) => item.id == event.target.value
  );
  final_price.value = currentVhq.value.base_price;
}

function getElementY(query: any) {
  return (
    window.pageYOffset +
    document.querySelector(query).getBoundingClientRect().top
  );
}

function doScrolling(element: any, duration: any, id: any) {
  currentVhq.value = vhqs.value.find((item: any) => item.id == id);
  final_price.value = currentVhq.value.base_price;
  preberanie.value = false;
  preposlanie.value = false;
  scanovanie.value = false;
  skartovanie.value = false;
  newCompany.value = false;

  const startingY = window.pageYOffset;
  const elementY = getElementY(element);
  const targetY =
    document.body.scrollHeight - elementY < window.innerHeight
      ? document.body.scrollHeight - window.innerHeight
      : elementY;
  const diff = targetY - startingY;
  const easing = function (t: any) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  let start: any;

  if (!diff) return;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    let percent = Math.min(time / duration, 1);
    percent = easing(percent);

    window.scrollTo(0, startingY + diff * percent);

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}

function preberanieChanged(event: any) {
  if (event.target.checked) {
    preberanie.value = true;
    final_price.value += 4;
  } else {
    preberanie.value = false;
    final_price.value -= 4;
  }
}

function preposielanieChanged(event: any) {
  if (event.target.checked) {
    preposlanie.value = true;
    final_price.value += 1;
  } else {
    preposlanie.value = false;
    final_price.value -= 1;
  }
}

function scanovanieChanged(event: any) {
  if (event.target.checked) {
    scanovanie.value = true;
    final_price.value += 5;
  } else {
    scanovanie.value = false;
    final_price.value -= 5;
  }
}

function skartovanieChanged(event: any) {
  if (event.target.checked) {
    skartovanie.value = true;
    final_price.value += 2;
  } else {
    skartovanie.value = false;
    final_price.value -= 2;
  }
}

function newCompanyChanged(event: any) {
  if (event.target.checked) {
    newCompany.value = true;
  } else {
    newCompany.value = false;
  }
}

function createNewOrder() {
  const data = {
    createCompany: newCompany.value,
    skartovanie: skartovanie.value,
    preposlanie: preposlanie.value,
    scanovanie: scanovanie.value,
    preberanie: preberanie.value,
    price: final_price.value,
    vhq: currentVhq.value
  };

  store.state.orderVhqData = data;

  console.log(store.state.orderVhqData)

  return router.push({
    name: "Order vhq"
  });
}

onBeforeMount(async () => {
  await store.dispatch("vhqs");

  currentVhq.value = vhqs.value.at(0);
  final_price.value = currentVhq.value.base_price;
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
