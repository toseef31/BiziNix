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
        <CompanyThanksYou v-if="order && order.order_type === 'company' || order.order_type ==='cupdate'" />
        <DocumentsThanksYou v-else-if="order && order.order_type === 'documents'" />
        <VhqThanksYouVue v-else-if="order && order.order_type === 'vhq'" />
        <MailThanksYouVue v-else-if="order && order.order_type === 'mail'" />
      </template>
      <template v-else>
        <div class="text-center py-12">
          <FaceFrownIcon class="text-red-500 w-24 h-24 stroke-1 inline" />
          <h1 class="text-6xl my-6 font-bold">Ups, niečo sa pokazilo.</h1>
          <p class="text-xl">Objednávka sa nenašla, alebo nebola prijatá.</p>
        </div>
      </template>
      <div class="p-4 text-center">Ďakujeme za dôveru.</div>
    </div>
  </main>
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { FaceFrownIcon } from "@heroicons/vue/24/outline";
import CompanyThanksYou from "@/components/payments/CompanyThanksYou.vue";
import DocumentsThanksYou from "@/components/payments/DocumentsThanksYou.vue";
import VhqThanksYouVue from "@/components/payments/VhqThanksYou.vue";
import MailThanksYouVue from "@/components/payments/MailThanksYou.vue";

const route = useRoute();
const order = ref<any>();
const loading = ref(true);

const user = computed(() => store.state.user.userId);

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
  await getOrderById(orderId);
});
</script>
