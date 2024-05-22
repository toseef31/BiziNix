<template>
  <!-- PRVA SEKCIA -->
  <div
    class="relative z-0 h-fit w-full max-h-full bg-cover bg-local bg-no-repeat bg-center"
    style="
      height: calc(100vh - 200px);
      background-image: url('../src/assets/2.png');
    "
  >
    <div
      class="w-full flex h-full"
      style="
        background-image: linear-gradient(to top,rgba(17, 24, 39, 0.75) 0%,rgba(17, 24, 39, 0.95) 100%);
      "
    >
      <div class="container flex-col justify-center mx-auto flex h-full py-8">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <div class="text-5xl text-white leading-normal font-bold">
              Vytvárajte a<br />
              spravujte
            </div>
            <div class="text-base text-white my-4">
              <div class="flex items-center space-x-2">
                <div>
                  Faktúry, ponuky, zmluvy a všetky<br />
                  dokumenty, ktoré vaša firma<br />
                  potrebujte
                </div>
              </div>
            </div>
            <div class="mt-5">
              <div
                @click="redirect()"
                class="w-[400px] shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-white hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
              >
                <span class="text-center w-full"
                  >Vyskúšať zadarmo na 3 mesiace</span
                >
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
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>

          </div>
          <div class="flex flex-col">
            <div>
              <img src="@/assets/robot_stripes.png" class="max-w-xs lg:max-w-md" />
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>

  <!-- DRUHA SEKCIA -->
  <div class="bg-gray-900 pt-40 relative -z-10">
    <img src="@/assets/dots_h.png" class="absolute right-8 max-w-xl" />
    <div>
      <div class="container flex-col justify-center mx-auto flex h-full">
        <div class="text-6xl text-white leading-normal font-bold">
          Jedinečný pomer ceny<br />
          a kvality
        </div>
        <div class="text-white my-4 text-xl">
          <div class="flex items-center space-x-2">
            <div>
              Ručíme za najnižšiu cenu v pomere za<br />
              kvalitu na trhu.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- TRETIA SEKCIA -->
  <div
    class="w-full bg-cover bg-local bg-no-repeat bg-center"
    style="
      background-image: url('../src/assets/3.png');
    "
  >
    <div
      class="w-full"
      style="
        background-image: linear-gradient(to top,rgba(17, 24, 39, 0.85) 0%,rgba(17, 24, 39, 1) 100%);
      "
    >
      <div class="mx-auto flex w-full justify-center pb-16">
        <!--NAJOBLUBENEJSIE-->
        <div>
          <section>
            <div>
              <table class="rounded border-separate border-spacing-x-4">
                <tr>
                  <td class="flex pb-20"></td>
                  <td class="mb-16 bg-gray-700 rounded-t-xl">
                    <div class="flex justify-center">
                      <img
                        class="w-28"
                        src="@/assets/logo.png"
                        alt="Logo Bizinix"
                      />
                    </div>
                  </td>
                  <td
                    class="text-white font-bold text-3xl mb-16 px-4 text-center bg-gray-700 rounded-t-xl"
                  >
                    <div class="flex justify-center">Konkurencia</div>
                  </td>
                </tr>
                <tr>
                  <td class="text-white font-bold pb-4 pt-8 px-4">Faktúry</td>
                  <td
                    class="text-teal-500 font-bold pb-4 pt-8 text-center bg-gray-800 border-b-gray-600 border-b-2"
                  >
                    Neobmedzene
                  </td>
                  <td
                    class="text-red-500 font-bold pb-4 pt-8 text-center bg-gray-800 border-b-gray-600 border-b-2"
                  >
                    Obmedzený počet
                  </td>
                </tr>
                <tr>
                  <td class="text-white font-bold py-4 px-4">
                    Iné obchodné dokumenty
                  </td>
                  <td
                    class="text-teal-500 font-bold py-4 text-center bg-gray-800 border-b-gray-600 border-b-2"
                  >
                    Neobmedzene
                  </td>
                  <td
                    class="text-red-500 font-bold py-4 text-center bg-gray-800 border-b-gray-600 border-b-2"
                  >
                    Nezahŕňa
                  </td>
                </tr>
                <tr>
                  <td class="text-white font-bold py-4 px-4">
                    Počet zákazníkov a kontaktov
                  </td>
                  <td
                    class="text-teal-500 font-bold py-4 text-center bg-gray-800 border-b-gray-600 border-b-2"
                  >
                    Neobmedzene
                  </td>
                  <td
                    class="text-red-500 font-bold py-4 text-center bg-gray-800 border-b-gray-600 border-b-2"
                  >
                    Obmedzený počet
                  </td>
                </tr>
                <tr>
                  <td class="text-white font-bold py-4 px-4">
                    Zasielanie upomienok
                  </td>
                  <td
                    class="text-white font-bold py-4 bg-gray-800 border-b-gray-600 border-b-2"
                  >
                    <div class="flex justify-center">
                      <div class="flex justify-center">
                        <CheckIcon
                          class="w-12 text-teal-500"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </td>
                  <td
                    class="text-red-500 font-bold py-4 text-center bg-gray-800 border-b-gray-600 border-b-2"
                  >
                    Nezahŕňa
                  </td>
                </tr>
                <tr>
                  <td class="text-white font-bold py-4 px-4">
                    Import prijatých dokladov
                  </td>
                  <td
                    class="text-white font-bold py-4 bg-gray-800 border-b-gray-600 border-b-2"
                  >
                    <div class="flex justify-center">
                      <CheckIcon
                        class="w-12 text-teal-500"
                        aria-hidden="true"
                      />
                    </div>
                  </td>
                  <td
                    class="text-white font-bold py-4 bg-gray-800 border-b-gray-600 border-b-2"
                  >
                    <div class="flex justify-center">
                      <div class="flex justify-center">
                        <XMarkIcon class="w-12 text-red-500" aria-hidden="true" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="text-white font-bold py-4 px-4">
                    Aktuálny reporting pre účtovníctvo
                  </td>
                  <td
                    class="text-white font-bold py-4 bg-gray-800 border-b-gray-600 border-b-2"
                  >
                    <div class="flex justify-center">
                      <CheckIcon
                        class="w-12 text-teal-500"
                        aria-hidden="true"
                      />
                    </div>
                  </td>
                  <td
                    class="text-white font-bold py-4 bg-gray-800 border-b-gray-600 border-b-2"
                  >
                    <div class="flex justify-center">
                      <XMarkIcon class="w-12 text-red-500" aria-hidden="true" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="text-white font-bold py-4 px-4">
                    Design dokladov
                  </td>
                  <td class="text-white font-bold py-4 bg-gray-800">
                    <div class="flex justify-center">
                      <CheckIcon
                        class="w-12 text-teal-500"
                        aria-hidden="true"
                      />
                    </div>
                  </td>
                  <td class="text-white font-bold py-4 bg-gray-800">
                    <div class="flex justify-center">
                      <XMarkIcon class="w-12 text-red-500" aria-hidden="true" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="py-4"></td>
                  <td class="text-white font-bold py-4 text-2xl text-center">
                    5€/mesiac
                  </td>
                  <td
                    class="text-gray-400 font-bold py-4 px-4 text-2xl text-center"
                  >
                    Viac ako 5,5€ za mesiac
                  </td>
                </tr>
                <tr>
                  <td class="pb-16"></td>
                  <td>
                    <div
                      @click="redirect()"
                      class="w-[400px] shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-white hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
                    >
                      <span class="text-center w-full"
                        >Vyskúšať zadarmo na 3 mesiace</span
                      >
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
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  </td>
                  <td></td>
                </tr>
              </table>
            </div>
          </section>
        </div>
        <!--KONIEC_NAJOBLUBENEJSIE-->
      </div>
    </div>
  </div>

  <!-- STVRTA SEKCIA -->
  <div class="bg-gray-800 text-white py-6">
    <div class="flex flex-row container justify-center mx-auto py-6">
      <div class="flex flex-col px-16 self-center">
        <span class="text-2xl font-bold"
          >Chcete individuálne riešenie na mieru? Kontaktujte našu
          podporu!</span
        >
      </div>
      <div class="flex flex-col">
        <div
          @click="redirectToSupport()"
          class="w-[200px] shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-900 font-bold hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
        >
          <span class="text-center w-full">Podpora</span>
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
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- PIATA SEKCIA -->
  <div class="flex py-20 relative bg-gray-900 z-1">
    <div class="absolute top-4 left-2">
      <img src="@/assets/dots_h.png" class="max-h-[330px]" />
    </div>
    <img
      src="@/assets/robot_left.png"
      class="absolute bottom-[-120px] left-[-90px] z-0 max-h-[720px]"
    />
    <img
      src="@/assets/logo_b.png"
      class="absolute right-5 top-0 max-h-[980px]"
    />
    <div class="container mx-auto text-left">
      <div class="w-full">
        <div
          class="text-5xl mt-4 text-white font-bold leading-normal text-right mb-8"
        >
          Prečo vytvárať <br />
          dokumenty u nás?
        </div>
        <div class="flex py-10 px-10">
          <vue-horizontal
            v-if="whyUs.length > 0"
            responsive
            class="horizontal"
            :items="whyUs"
            :options="options"
          >
            <section v-for="item in whyUs" :key="item.id" class="px-4">
              <!---->
              <div
                class="max-w-xl h-full bg-gray-900 p-14 border rounded-lg border-teal-500"
              >
                <div class="font-bold px-2 my-2 text-white text-lg">
                  {{ item.name }}
                </div>
                <div class="text-white px-2 mb-2 text-sm">
                  {{ item.desc }}
                </div>
              </div>
              <!---->
            </section>
          </vue-horizontal>
        </div>
        <!---->
      </div>
    </div>
  </div>

  <!-- SIESTA SEKCIA -->
  <div class="bg-gray-900 py-20">
    <div
      class="flex container mx-auto mt-28 items-center justify-between space-x-20 w-full"
    >
      <div class="flex-1">
        <div class="text-5xl text-white font-bold">
          Všetko na <br />
          jednom mieste
        </div>
        <div class="text-white text-base mt-4">
          V našom systéme si môžete<br />
          kedykoľvek upraviť
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

  <div class="bg-gray-800 text-white">
    <Reviews></Reviews>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import Reviews from "@/components/Reviews.vue";
import { useRouter } from "vue-router";
import VueHorizontal from "vue-horizontal";
import { ref, computed, onBeforeMount } from "vue";
import store from "@/store";

const router = useRouter();

function redirect() {
  return router.push({
    name: "Order documents",
  });
}

function redirectToSupport() {
  return router.push({
    name: "Counseling center",
  });
}

const whyUs = [
  {id:1, name: "Jednoduché vytváranie faktúr na pár klikov vďaka Finstat API.", desc: "S vystavením dokladu nestrávite viac ako minútu. Integrácia s Finstat API umožňuje rýchle a presné vyplnenie fakturačných údajov."},
  {id:2, name: "Prehľadné prostredie aktuálneho hospodárenia.", desc: "Vždy viete na čom ste. Naše riešenie poskytuje prehľadné a intuitívne rozhranie, ktoré uľahčuje sledovanie a správu finančných tokov."},
  {id:3, name: "Možnosť importovania nákladov a iných prijatých dokladov.", desc: "Ak nejaký fyzicky stratíte, máte ho u nás vždy uložený. Naša platforma umožňuje jednoduché importovanie všetkých dôležitých dokumentov."},
  {id:4, name: "Vybratie si vlastnej šablóny dokladu.", desc: "Vďaka možnosti vybratia si vlastnej šablóny dokladu sa ľahko odlíšite od konkurencie. Naše šablóny sú prispôsobiteľné vašim potrebám a preferenciám."},
  {id:5, name: "Posielanie upomienok o neúhradách priamo z rozhrania.", desc: "Neplatia vám klienti a nechcete im volať kvôli pohľadávkam? Posielajte im upomienky o neúhradách priamo z nášho systému."},
  {id:6, name: "QR kódy v dokladoch pre jednoduchšie platenie faktúr.", desc: "Vďaka QR kódom v našich dokladoch bude platenie faktúr pre vašich klientov oveľa jednoduchšie a rýchlejšie."},
  {id:7, name: "Bezpečné ukladanie a zálohovanie dát.", desc: "Všetky vaše údaje sú u nás bezpečne uložené a pravidelne zálohované, čo zaručuje ich ochranu a dostupnosť."},
]

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

function getElementY(query: any) {
  return (
    window.pageYOffset +
    document.querySelector(query).getBoundingClientRect().top
  );
}

function doScrolling(element: any, duration: any, id: any) {
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

onBeforeMount(async () => {
  await store.dispatch("vhqs");
});
</script>
