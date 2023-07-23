<template>
  <div class="w-full justify-center bg-center items-center bg-black bg-opacity-70 bg-cover bg-blend-overlay
    bg-[url('../src/assets/pozadie.png')]"
  >
    <div class="text-white max-w-7xl mx-auto flex flex-col md:flex-row py-28">
      <div class="flex-1 flex p-4 items-center">
        <p class="text-center md:text-left text-5xl font-extrabold leading-snug">
          Čo hovoria naši zákazníci?
        </p>
      </div>
      <div class="flex-1 p-4 items-center justify-center">
        <vue-horizontal
          v-if="reviews.length > 0"
          responsive
          class="horizontal"
          :items="reviews"
          :options="options"
        >
          <section
            v-for="review in reviews"
            :key="review.id"
            class="relative px-4"
          >
            <div class="flex items-center justify-center space-x-4">
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
          </section>
          <template v-slot:btn-prev>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-teal-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </template>

          <template v-slot:btn-next>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-teal-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </template>
        </vue-horizontal>
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

<style scoped>
section {
  width: 100%;
}

.horizontal:v-deep(.v-hl-btn-next svg) {
  background: none;
  color: #38b2ac;
  box-shadow: none;
}

.horizontal:v-deep(.v-hl-btn-prev svg) {
  background: none;
  color: #38b2ac;
  box-shadow: none;
}
</style>
