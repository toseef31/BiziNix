<template>
    <div class="flex flex-row rounded py-12">
          <div class="flex basis-1/6 flex-col bg-gray-900/95 pr-20">
            <div class="text-3xl text-white font-bold pb-4">
              Miesto sídla
            </div>
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
            <!------>
          </div>
          <!---->
          <div
            class="flex basis-3/6 flex-col items-center text-center"
          >
            <VirtualHqPackageVue @update-package="updatePackage"></VirtualHqPackageVue>
          </div>
          <div
            class="flex basis-2/6 flex-col items-center justify-center"
          >
            <img src="@/assets/robot-vhq.png" class="w-full" />
          </div>
        </div>
</template>
<script setup lang="ts">
import store from "@/store";
import { computed, onBeforeMount, ref } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/outline";
import VirtualHqPackageVue from "../VirtualHqPackage.vue";

const vhqs: any = computed(() => {
  return store.state.vhqs;
});

const currentVhq: any = computed(() => {
  return store.state.selectedVhq;
});

const vhq_package = ref({
  name: "Mini",
  name_desc: "Základ, bez prehľadu o pošte",
  desc: "Zriadenie sídla a označenie schránky.",
  price: 7
});

const updatePackage = (updatedPackage: any) => {
  vhq_package.value = updatedPackage;
};

function switchSelect(event: any) {
  store.state.selectedVhq = vhqs.value.find(
    (item: any) => item.id == event.target.value
  );
}

onBeforeMount(async () => {
  await store.dispatch("vhqs");
});

defineExpose({
    vhq_package
})
</script>