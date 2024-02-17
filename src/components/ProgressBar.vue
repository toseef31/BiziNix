<template>
  <div
    class="h-2 rounded overflow-visible border border-teal-500 max-w-40 box-sizing: border-box"
    :style="{ width: `${progress > 0 ? progress + '%' : '100%'}` }"
    :class="{ 'bg-gray-200': progress === 0, 'bg-teal-600': progress > 0 }"
  >
      <div class="h-full"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    progress: {
      type: Number,
      default: 0,
    },
  });
  
  const progress = ref(props.progress);
  
  watch(props, (val) => {
    progress.value = val.progress;
  });
  </script>
  
  <style scoped>
  /* Customize these styles as needed */
  </style>
  