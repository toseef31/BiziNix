<template>
    <main class="bg-gray-bizinix text-white">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <template v-if="loading">
          <div class="flex flex-col items-center py-12">
            <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="mt-4">Načitávam...</span>
          </div>
        </template>
        <template v-else-if="!loading && order">
          <div class="text-center">
            <CheckBadgeIcon class="text-teal-500 w-24 h-24 stroke-1 inline" />
            <h1 class="text-6xl my-6 font-bold">Ďakujeme Vám.</h1>
            <div class="text-xl">
                Platba za objednávku <b>#{{ order.id }}</b> prebehla úspešne o ďalšom postupe Vás budeme informovať.
                <div v-if="selectedOptionForPay === 'stripe'">
                  <u>Uhradili ste <b>{{ order.amount }}</b> €, pomocou platobnej brány Stripe.</u>
                </div>
                <div v-else-if="selectedOptionForPay === 'iban'">
                  <u>Uhradťe prosim <b>{{ order.amount }}</b> € na nasledujúce bankové spojenie, a ako <b>variabilný symbol</b> použite <b>00{{ order.id }}</b>.</u>
                  <ul class="mt-4">
                    <li>SK64 1100 0000 0029 4015 7525</li>
                    <li>TATRSKBX</li>
                    <li>Tatra banka, a.s.</li>
                  </ul>
                </div>
                <div v-else>
                  Zaplatili ste.
                </div>
            </div>
          </div>
        </template>
        <template v-else class="text-center">
            <FaceFrownIcon class="text-red-500 w-24 h-24 stroke-1 inline" />
            <h1 class="text-6xl my-6 font-bold">Ups, niečo sa pokazilo.</h1>
            <p class="text-xl">Objednávka sa nenašla, alebo nebola zaplatená.</p>
        </template>
        <div class="p-4 text-center">Ďakujeme za dôveru.</div>
      </div>
  </main>
</template>

<script setup lang="ts">

import store from "@/store";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { CheckBadgeIcon, FaceFrownIcon } from "@heroicons/vue/24/outline";

const loading = ref(true);
const route = useRoute();
const order = ref();
const selectedOptionForPay = ref();

const getOrderById = async (orderId: string) => {
  try {
    const response = await store.dispatch("getOrderById", orderId);
    order.value = response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
  } finally {
    loading.value = false;
  }
};


onBeforeMount(async () => {
  const orderId = route.params.orderId as string;
  selectedOptionForPay.value = route.params.paymentMethod;
  await getOrderById(orderId);
});

</script>
