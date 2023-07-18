<template>
    <main class="bg-gray-bizinix text-white">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div v-if="order">
          <div class="text-center">
            <BadgeCheckIcon class="text-teal-500 w-24 h-24 stroke-1 inline" />
            <h1 class="text-6xl my-6 font-bold">Ďakujeme vám.</h1>
            <div class="text-xl">
                Platba za objednávku <b>#{{ order.id }}</b> prebehla úspešne o ďalšom postupe Vás budeme informovať.
                <div v-if="selectedOptionForPay === 'stripe'">
                  Super platba stripe.
                </div>
                <div v-else-if="selectedOptionForPay === 'iban'">
                  Platim ibanom.
                </div>
                <div v-else>
                  Zaplatil si, ale nezname čím.
                </div>
            </div>
          </div>
        </div>
        <!-- Objednávka nebola prijatá -->
        <div v-else="!order" class="text-center">
            <EmojiSadIcon class="text-red-500 w-24 h-24 stroke-1 inline" />
            <h1 class="text-6xl my-6 font-bold">Ups, niečo sa pokazilo.</h1>
            <p class="text-xl">Objednávka sa nenašla, alebo nebola prijatá.</p>
        </div>
        <div class="p-4 text-center">Ďakujeme za dôveru.</div>
      </div>
  </main>
  <FooterLayout></FooterLayout>
</template>

<script setup lang="ts">

import store from "@/store";
import { onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { BadgeCheckIcon } from "@heroicons/vue/outline";
import { EmojiSadIcon } from "@heroicons/vue/outline";
import FooterLayout from "@/components/FooterLayout.vue";

const route = useRoute();
const order = ref();
const selectedOptionForPay = ref();
let orderId: any

onBeforeMount(() => {
  orderId = route.params.orderId;
  selectedOptionForPay.value = route.params.paymentMethod;
  store.dispatch("getOrderById", orderId).then((response) => {
    order.value = response.data;
  });
});

</script>
