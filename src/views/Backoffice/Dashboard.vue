<template>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0">
        <h1 class="text-3xl font-bold text-gray-600 pb-10">
          Moje spoločnosti
        </h1>
        <MyCompanies v-if="!isLoading"></MyCompanies>
        <div class="py-8">
          <button @click="addCompany"
            class="w-fit shadow flex justify-center border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-white font-bold hover:text-white hover:cursor-pointer hover:bg-gray-500 hover:border-gray-500 space-x-2">
            <span class="pr-2">Pridať firmu</span>
          </button>
        </div>
      </div>
      <!-- /End replace -->
    </div>
  </main>
</template>

<script setup lang="ts">
import MyCompanies from '@/components/MyCompanies.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from "vue-router";

const store = useStore();
const isLoading = ref(true);
const router = useRouter();

function addCompany() {
  return router.push({
    name: "Home",
  });
}

onMounted(() => {
  store
    .dispatch('setUserDataAfterLogin').then(() => {
      isLoading.value = false;
    })
})

</script>