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
            <div class="flex flex-row py-5 gap-8">
              <div class="flex flex-row">
                <span class="shrink pr-10">Chcete sídlo pre <b>EŠTE NEZALOŽENÚ</b> firmu?</span>
              </div>
              <div>
                <FormKit
                  :checked="newCompany"
                  type="checkbox"
                  id="nova"
                  v-model="newCompany"
                  class="focus:ring-teal-500 focus:border-teal-500 text-teal-500"
                />
              </div>
            </div>
            <!------>
          </div>
          <!---->
          <div
            class="flex basis-3/6 flex-col items-center text-center"
          >
            <VirtualHqPackageVue></VirtualHqPackageVue>
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
const newCompany = ref(false);

function switchSelect(event: any) {
  newCompany.value = false;

  currentVhq.value = vhqs.value.find(
    (item: any) => item.id == event.target.value
  );
}

onBeforeMount(async () => {
  await store.dispatch("vhqs");

  currentVhq.value = vhqs.value.at(0);
});

defineExpose({
    currentVhq,
    newCompany
})
</script>