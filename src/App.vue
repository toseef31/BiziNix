<script setup lang="ts">
import { RouterView } from "vue-router";
import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
  <div>
    <ModalsContainer />
  </div>
  <router-view></router-view>
</template>
