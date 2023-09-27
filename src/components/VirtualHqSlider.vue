<template>
    <vue-horizontal
        v-if="vhqs.length > 0"
            responsive
            class="horizontal"
            :items="vhqs"
            :options="options"
        >
            <section v-for="vhq in vhqs" :key="vhq.id" class="relative px-2">
              <!---->   
              <div
                class="w-[110px] py-1 text-sm bg-gray-800/75 mx-auto rounded-b-lg text-white text-center absolute top-0 left-0 right-0"
              >
                {{ vhq.base_price }}€ / mesiac
              </div>
              <div>
                <button
                  v-on:click.prevent="changeVhq(vhq.id)"
                  class="w-[110px] hover:cursor-pointer hover:bg-gray-800 hover:text-teal-500 py-1 text-sm bg-teal-500 mx-auto rounded text-gray-800 font-bold text-center absolute left-0 right-0 bottom-20"
                >
                  Vybrať
                </button>
              </div>
              <img v-bind:src="vhq.img" class="rounded w-60 h-60 z-0" />
              <div class="font-bold px-2 text-white text-xl">
                {{ vhq.name }}
              </div>
              <div class="text-white px-2 text-sm">
                {{ vhq.address.street }} {{ vhq.address.street_number }} /
                {{ vhq.address.street_number2 }}, <br>
                {{ vhq.address.psc }} {{ vhq.address.city }}
              </div>
              <!---->
            </section>
        <template v-slot:btn-prev>
            <button
                style="align-self: start; padding-top: 24px; margin-right: 50px"
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
            <button style="align-self: start; padding-top: 24px; margin-left: 50px">
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
</template>
<script setup lang="ts">
import store from "@/store";
import { computed, onBeforeMount } from "vue";
import VueHorizontal from "vue-horizontal";

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

function changeVhq(id: any) {
    store.state.selectedVhq = vhqs.value.find((item: any) => item.id == id);
}

onBeforeMount(async () => {
  await store.dispatch("vhqs");
});

defineExpose({
})
</script>