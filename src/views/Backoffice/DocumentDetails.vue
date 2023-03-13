<template>
  <header class="bg-gray-900 shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900">Detail dokladu</h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0">
        <h1 class="mb-4 text-2xl font-bold text-gray-900">Content</h1>
      </div>
      <!-- /End replace -->
    </div>
  </main>
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
