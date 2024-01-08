<template>
  <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-gray-900">{{ post.title }}</h1>
  </div>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <!-- <div class="px-4 py-6 sm:px-0"><img src="{{ post.image }}" /></div> -->
    <div class="px-4 py-6 sm:px-0">{{ post.content }}</div>
  </div>
  <div class="bg-gray-800 text-white">
    <CounselingCenter></CounselingCenter>
    <Reviews></Reviews>
    
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
import axios from "axios";

import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";

const route = useRoute();
const errorMsg = ref();
let post = ref({
  id: 0,
  category_id: 0,
  title: "",
  image: "",
  content: "",
  created_at: "",
  updated_at: ""
});


onMounted(() => {
  const postId = route.params.id;

  return axios
    .get(`${import.meta.env.VITE_API_ENDPOINT}/api/posts/${postId}/get`)
    .then((response) => {
      post.value = response.data.data;
      return response;
    })
    .catch((err) => {
      errorMsg.value = err.response.data.message;
    });
});


</script>
