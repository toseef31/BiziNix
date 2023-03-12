<template>
  <!-- PRVA SEKCIA -->
  <div
    class="relative z-0 h-full w-full max-h-full bg-cover bg-local bg-no-repeat bg-center"
    style="
      height: calc(100vh - 200px);
      background-image: url('../src/assets/2.png');
    "
  >
    <img
      src="@/assets/robot_stripes.png"
      class="absolute bottom-[-82px] right-0"
      style="height: calc(100vh - 260px)"
    />
    <div
      class="w-full flex h-full"
      style="
        background-image: linear-gradient(to top,rgba(17, 24, 39, 0.75) 0%,rgba(17, 24, 39, 0.95) 100%);
      "
    >
      <div class="container flex-col justify-center mx-auto flex h-full">
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
              >Vyskúšať zadarmo na 6 mesiacov</span
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
    </div>
  </div>

  <!-- DRUHA SEKCIA -->
  <div class="bg-gray-900 pt-40">
    <img src="@/assets/dots_h.png" class="absolute right-8 max-w-xl" />
    <div>
      <div class="container flex-col justify-center mx-auto flex h-full">
        <div class="text-5xl text-white leading-normal font-bold">
          Vyberte si balík, ktorý <br />
          vám vyhovuje
        </div>
        <div class="text-base text-white my-4">
          <div class="flex items-center space-x-2">
            <div>
              Ručíme za najnižšie ceny na trhu.<br />
              Ak nájdete nižšiu, radi sa jej prispôsobíme
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- TRETIA SEKCIA -->
  <div
    class="relative z-0 h-full w-full max-h-full bg-cover bg-local bg-no-repeat bg-center"
    style="
      height: calc(85vh);
      background-image: url('../src/assets/3.png');
    "
  >
    <div
      class="w-full flex h-full"
      style="
        background-image: linear-gradient(to top,rgba(17, 24, 39, 0.85) 0%,rgba(17, 24, 39, 1) 100%);
      "
    >
      <div class="container justify-center mx-auto flex pb-8">
        <!--NAJOBLUBENEJSIE-->
        <div>
          <section>
            <div>
              <div class="grid grid-cols-3 gap-8 place-items-end">
                <!-- Pricing Card -->
                <div
                  class="w-full h-fit p-8 mx-auto text-center rounded-lg shadow bg-gray-400 text-gray-800"
                >
                  <h3 class="mb-8 text-3xl font-extrabold">Mini</h3>
                  <!-- List -->
                  <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex flex-col items-center space-x-3">
                      <span class="text-lg font-bold">Faktúry</span>
                      <span>5 zákazníkov</span>
                    </li>
                    <li class="flex flex-col items-center space-x-3">
                      <span class="text-lg font-bold">Design dokladov</span>
                      <span>5 šablón</span>
                    </li>
                    <li class="flex flex-col items-center space-x-3">
                      <span class="text-lg font-bold">Firmy</span>
                      <span>1 firma na účte</span>
                    </li>
                  </ul>
                  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                  <div class="flex flex-col items-cenetr my-10">
                    <span class="text-xl font-extrabold">Zdarma</span>
                  </div>
                  <a
                    href="#"
                    class="text-gray-900 font-extrabold bg-teal-600 hover:bg-teal-700 focus:ring-4 rounded-lg text-sm px-5 py-2.5 text-center focus:ring-teal-900"
                    >Spustiť</a
                  >
                </div>
                <!-- Pricing Card -->
                <div
                  class="w-full h-fit p-8 mx-auto text-center rounded-lg shadow bg-gray-800 text-white"
                >
                  <h3 class="mb-8 text-3xl font-extrabold">Classic</h3>
                  <!-- List -->
                  <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex flex-col items-center space-x-3">
                      <span class="text-lg font-bold">Faktúry</span>
                      <span>neobmedzene zákazníkov</span>
                    </li>
                    <li class="flex flex-col items-center space-x-3">
                      <span class="text-lg font-bold">Design dokladov</span>
                      <span>neobmedzene</span>
                    </li>
                    <li class="flex flex-col items-center space-x-3">
                      <span class="text-lg font-bold">Firmy</span>
                      <span>3 firmy na účte</span>
                    </li>
                    <li class="flex flex-col items-center space-x-3">
                      <span class="text-lg font-bold"
                        >Zmluvy a iné dokumenty</span
                      >
                      <span>3 dokumenty / mesiac</span>
                    </li>
                  </ul>
                  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                  <div class="flex flex-col items-center my-8">
                    <span class="text-xl font-extrabold">4€/mesiac</span>
                    <span class="text-sm font-bold">alebo 40€/rok</span>
                  </div>
                  <a
                    href="#"
                    class="text-gray-900 font-extrabold bg-teal-600 hover:bg-teal-700 focus:ring-4font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-teal-900"
                    >Vyskúšať 6 mesiacov zdarma</a
                  >
                </div>
                <!-- Pricing Card -->
                <div
                  class="w-full h-fit p-8 mx-auto text-center rounded-lg shadow bg-gray-400 text-gray-800"
                >
                  <h3 class="mb-8 text-3xl font-extrabold">Pro</h3>
                  <!-- List -->
                  <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex flex-col items-center space-x-3">
                      <span class="text-lg font-bold">Faktúry</span>
                      <span>neobmedzene zákazníkov</span>
                    </li>
                    <li class="flex flex-col items-center space-x-3">
                      <span class="text-lg font-bold">Design dokladov</span>
                      <span>neobmedzene</span>
                    </li>
                    <li class="flex flex-col items-center space-x-3">
                      <span class="text-lg font-bold">Firmy</span>
                      <span>neobmedzene</span>
                    </li>
                    <li class="flex flex-col items-center space-x-3">
                      <span class="text-lg font-bold"
                        >Zmluvy a iné dokumenty</span
                      >
                      <span>neobmedzene</span>
                    </li>
                    <li class="flex flex-col items-center space-x-3">
                      <span class="text-lg font-bold">Zmeny firiem</span>
                      <span>zdarma</span>
                    </li>
                  </ul>
                  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                  <div class="flex flex-col items-center my-8">
                    <span class="text-xl font-extrabold">10€/mesiac</span>
                    <span class="text-sm font-bold">alebo 90€/rok</span>
                  </div>
                  <a
                    href="#"
                    class="text-gray-900 font-extrabold bg-teal-600 hover:bg-teal-700 focus:ring-4 rounded-lg text-sm px-5 py-2.5 text-center focus:ring-teal-900"
                    >Vyskúšať 6 mesiacov zdarma</a
                  >
                </div>
              </div>
            </div>
          </section>
        </div>
        <!--KONIEC_NAJOBLUBENEJSIE-->
      </div>
    </div>
  </div>

  <!-- STVRTA SEKCIA -->
  <div class="bg-gray-800 text-white z-2">
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
            v-if="vhqs.length > 0"
            responsive
            class="horizontal"
            :items="vhqs"
            :options="options"
          >
            <section v-for="vhq in vhqs" :key="vhq.id" class="px-4">
              <!---->
              <div
                class="w-full h-full bg-gray-900 p-14 border rounded-lg border-teal-500"
              >
                <div class="font-medium px-2 my-2 text-white text-lg">
                  {{ vhq.name }}
                </div>
                <div class="text-white px-2 mb-2 text-sm">
                  {{ vhq.address.street }} {{ vhq.address.street_number }},
                  {{ vhq.address.psc }} {{ vhq.address.city }}
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
    <CounselingCenter></CounselingCenter>
    <Reviews></Reviews>
    <FooterLayout></FooterLayout>
  </div>
</template>

<script setup lang="ts">
import FooterLayout from "@/components/FooterLayout.vue";
import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";
import { useRouter } from "vue-router";
import VueHorizontal from "vue-horizontal";
import { ref, computed, onBeforeMount, reactive } from "vue";
import store from "@/store";

const router = useRouter();

function redirect() {
  return router.push({
    name: "Counseling center",
  });
}

function redirectToSupport() {
  return router.push({
    name: "Counseling center",
  });
}

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
