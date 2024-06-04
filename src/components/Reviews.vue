<template>
  <div class="py-24 w-full justify-center bg-center items-center bg-black bg-opacity-70 bg-cover bg-blend-overlay
    bg-[url('../src/assets/pozadie.png')]"
  >
    <div class="max-w-7xl px-4 mx-auto flex flex-col md:flex-row items-center justify-center">
      <div class="md:w-1/2">
        <h3 class="mb-8 md:mb-0 text-3xl md:text-6xl font-extrabold">
          Čo hovoria naši zákazníci?
        </h3>
      </div>
      <div class="w-full md:w-1/2 text-white">      
        <div class="p-4 items-center justify-center">
          <vue-horizontal
            v-if="reviews.length > 0"
            responsive
            :items="reviews"
          >
            <section
              v-for="review in reviews"
              :key="review.id"
              class="relative px-8 w-full"
            >
            <div>
              <div class="flex items-center justify-center">
                <svg
                  v-for="j in review.stars"
                  :key="j"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 text-teal-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="flex mt-5">
                <div
                  class="flex-1 px-2 text-center font-light shrink-0"
                >
                  {{ review.content }}
                </div>
              </div>
              <div class="font-medium text-center mt-4">
                {{ review.name }}
              </div>
            </div>
            </section>
          </vue-horizontal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, computed } from "vue";
import VueHorizontal from "vue-horizontal";

const reviews: any = computed(() => {
  return store.state.reviews;
});

let options: {
  responsive: [
    { end: 576; size: 1 },
    { start: 576; end: 768; size: 2 },
    { start: 768; end: 992; size: 3 },
    { size: 4 }
  ];
};

onBeforeMount(async () => {
  await store.dispatch("reviews");
});
</script>
