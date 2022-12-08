<template>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Nástenka</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <h1 class="mb-4 text-2xl font-bold text-gray-900">Moje spoločnosti</h1>
          <MyCompanies></MyCompanies>
        </div>
        <!-- /End replace -->
      </div>
    </main>
</template>

<script setup lang="ts">
import MyCompanies from '@/components/MyCompanies.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex'

const store = useStore();

onMounted(() => {
  store
    .dispatch('setUserDataAfterLogin')
})

</script>