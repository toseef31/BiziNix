<template>
  <div class="py-12 bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col">
        <div class="w-full bg-gray-800 flex flex-row rounded-l-xl my-10">
          <div class="flex flex-col basis-1/2 font-bold text-4xl p-4">
            Virtuálne sídlo pre
            <p v-if="data.createCompany" class="text-teal-500">
              ešte nezaloženú firmu
            </p>
            <p v-else class="text-teal-500">existujúcu firmu</p>
          </div>
          <div class="flex basis-1/2 justify-end text-right">
            <div class="flex flex-col">
              <div class="flex pt-4 pb-2 pr-4 text-lg">
                {{ data.vhq.name }}, {{ data.vhq.address.street }}/{{ data.vhq.address.street_number2 }},
                {{ data.vhq.address.psc }} {{ data.vhq.address.city }}
              </div>
              <div class="flex font-bold text-2xl pr-4 pb-1 self-end">
                {{ data.price }}€/mesiac
              </div>
            </div>
            <div>
              <img :src="data.vhq.img" class="max-h-[160px]" />
            </div>
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
import { computed } from "vue";
import VhqOrderComponent from "../../components/forms/VhqOrderComponent.vue";

import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";

const data = computed(() => store.state.orderVhqData);

</script>
