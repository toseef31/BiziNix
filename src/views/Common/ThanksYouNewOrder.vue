<template>
    <main class="bg-gray-bizinix text-white">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div v-if="order && order.order_type === null">
              <CompanyThanksYou></CompanyThanksYou>
          </div>
          <div v-else-if="order && order.order_type === 'documents'">
            <DocumentsThanksYou></DocumentsThanksYou>
          </div>
          <div v-else-if="order && order.order_type === 'vhq'">
            <VhqThanksYouVue></VhqThanksYouVue>
          </div>
          <!-- Objednávka nebola prijatá -->
          <div v-else="!order" class="text-center">
              <EmojiSadIcon class="text-red-500 w-24 h-24 stroke-1 inline" />
              <h1 class="text-6xl my-6 font-bold">Ups, niečo sa pokazilo.</h1>
              <p class="text-xl">Objednávka sa nenašla, alebo nebola prijatá.</p>
          </div>
        </div>
  </main>
  <FooterLayout></FooterLayout>
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { EmojiSadIcon } from "@heroicons/vue/outline";
import FooterLayout from "@/components/FooterLayout.vue";
import CompanyThanksYou from "@/components/payments/CompanyThanksYou.vue";
import DocumentsThanksYou from "@/components/payments/DocumentsThanksYou.vue";
import VhqThanksYouVue from "@/components/payments/VhqThanksYou.vue";

const route = useRoute();
const order = ref();
let orderId: any;
const loading = ref(true)

const getOrderById = async () => {
  const orderId = route.params.orderId;

  const response = await store.dispatch("getOrderById", orderId);
  order.value = response.data;
  loading.value = false;
};

onBeforeMount( async () => {
  await getOrderById();
});

</script>
