<template>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div v-if="order" class="text-center">
        <BadgeCheckIcon class="text-teal-500 w-24 h-24 stroke-1 inline" />
        <h1 class="text-6xl my-6 font-bold text-gray-900">Ďakujeme vám.</h1>
        <div class="text-xl">
          Vaša objednávka #{{ order.id }} bola prijatá na spracovanie o ďalšom
          postupe Vás budeme informovať e-mailom.
        </div>
      </div>
      <div v-else="!order" class="text-center">
        <EmojiSadIcon class="text-red-500 w-24 h-24 stroke-1 inline" />
        <p class="text-xl">Objednávka sa nenašla, alebo nebola prijatá.</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { BadgeCheckIcon } from "@heroicons/vue/outline";
import { EmojiSadIcon } from "@heroicons/vue/outline";

const route = useRoute();
const order = ref();

onBeforeMount(() => {
  const orderId = route.params.orderId;
  store.dispatch("getOrderById", orderId).then((response) => {
    order.value = response.data;
  });
});
</script>
