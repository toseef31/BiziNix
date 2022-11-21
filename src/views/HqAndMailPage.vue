<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <!-- Replace with your content -->
    <div class="px-4 py-6 sm:px-0">Content for support page goes here</div>
    <!-- /End replace -->
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(async () => {
  await store.dispatch("vhqs");
});
</script>
