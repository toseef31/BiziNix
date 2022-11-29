<template>
  <div class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-white text-center">Články</h1>
    </div>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="flex w-full flex-row">
        <div class="flex grow relative">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            id="searchInput"
            v-model="searchQuery"
            placeholder="napr. Ako funguje DPH ?"
            class="h-12 pl-8 w-full shadow px-1 rounded-l border focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-black"
          />
        </div>
        <div class="flex">
          <button
            class="bg-teal-500 hover:bg-teal-700 h-12 px-8 rounded-r z-10"
            v-on:click="search()"
          >
            Hľadať
          </button>
        </div>
      </div>
      <div class="px-4 py-6 sm:px-0">
        <div class="flex flex-wrap mt-6">
          <div
            v-for="post in searchedPosts"
            :key="post.id"
            class="bg-gray-800 mx-2 hover:cursor-pointer mb-5 rounded-lg group group-hover:bg-teal-500 shadow"
            v-on:click="redirectToPost(post.id)"
          >
            <img
              src="../assets/blog-exaple-1.png"
              class="w-full rounded-t-lg h-auto"
            />
            <div
              class="p-4 group group-hover:bg-teal-500 rounded-b-lg text-white group-hover-text-gray-800"
            >
              <div class="text-lg">{{ post.title }}</div>
              <div class="opacity-75">
                {{ post.content.substring(0, 30) + "..." }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /End replace -->
    </div>
    <div class="bg-gray-800 text-white">
      <CounselingCenter></CounselingCenter>
      <Reviews></Reviews>
      <FooterLayout></FooterLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { onMounted, ref, computed } from "vue";
import FooterLayout from "../components/FooterLayout.vue";
import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";
import { useRouter } from "vue-router";

const searchQuery = ref("");
const router = useRouter();
const posts: any = computed(() => {
  return store.state.posts;
});

const searchedPosts = computed(() => {
  if (posts.value != undefined) {
    return posts.value.filter((post: any) => {
      return (
        post.title.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1
      );
    });
  } else {
    return posts.value;
  }
});

function redirectToPost(id: any) {
  return router.push({
    name: "Post",
    params: { id: id },
  });
}

function search() {
  //doScrolling("#faqsDiv", 1000);
}

onMounted(() => {
  store.dispatch("posts");
});
</script>
