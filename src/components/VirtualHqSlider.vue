<template>
    <vue-horizontal
        v-if="vhqs.length > 0"
            responsive
            :items="vhqs"
        >
            <section v-for="vhq in vhqs" :key="vhq.id" class="relative px-2">
              <div :id="'vhq-' + vhq.id">
                <div
                  class="w-[110px] py-1 text-sm bg-gray-800/75 mx-auto rounded-b-lg text-white text-center absolute top-0 left-0 right-0"
                >
                  od 7 € / mesiac
                </div>
                <div>
                  <button
                    v-on:click="changeVhq($event,vhq.id)"
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
              </div>
            </section>
    </vue-horizontal>
</template>
<script setup lang="ts">
import store from "@/store";
import { computed, onBeforeMount, ref } from "vue";
import VueHorizontal from "vue-horizontal";

const previouslyClickedElementRef = ref(null as unknown as HTMLElement);

const vhqs: any = computed(() => {
  return store.state.vhqs;
});

function changeVhq(event,id: any) {
  
  const divElement = document.getElementById(`vhq-${id}`) as unknown as HTMLElement

  if(previouslyClickedElementRef.value){
    previouslyClickedElementRef.value.style.border = ''
    divElement.style.borderRadius = ''
  }
  if(divElement){
    divElement.style.border = '2px #006464 solid'
    divElement.style.borderRadius = '4px'
  }
  previouslyClickedElementRef.value = divElement
  // Prevent the default click event behavior
  event.preventDefault();
  store.state.selectedVhq = vhqs.value.find((item: any) => item.id == id);
}

onBeforeMount(async () => {
  await store.dispatch("vhqs");
});

</script>