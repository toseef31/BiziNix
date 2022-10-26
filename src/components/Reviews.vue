<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="relative z-0 h-full w-full max-h-full"
    style="height: calc(75vh); background: url('../src/assets/pozadie.png') 0% 0% / cover no-repeat fixed;
    "
  >
    <div
      class="w-full pb-24 flex h-full"
      style="background-color: rgba(0, 0, 0, 0.75)"
    >
      <div class="flex-1 flex items-center justify-center">
        <div class="text-5xl text-white font-bold">
          Čo hovoria naši <br />
          zákazníci?
        </div>
      </div>
      <div class="flex-1 flex items-center justify-center">
        <div
          v-for="(review, i) in reviews"
          v-bind:key="review"
          v-bind:data-index="i"
          class="absolute w-[420px]"
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
            <div class="flex-1 px-2 text-center text-white font-light shrink-0">
              {{ review.content }}
            </div>
          </div>
          <div class="font-medium text-white text-center mt-4">
            {{ review.name }}
          </div>
        </div>
        <div class="flex w-[500px] justify-between">
          <div class="w-[30px] flex items-center justify-center">
            <button v-on:click="onPrevious()">
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
          </div>
          <div class="w-[30px] flex items-center justify-center">
            <button v-on:click="onNext()">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, computed } from "vue";
import "animate.css";

const reviews: any = computed(() => {
  return store.state.reviews;
});
let currentIndex = 0;

function animate(element: any, animation: any, onAnimationEnd: any) {
  const plainClassList = Array.prototype.slice.call(element.classList);
  const animationsToRemove = plainClassList.filter((className) =>
    className.includes("animate__")
  );
  element.classList.remove("hidden", ...animationsToRemove);
  element.classList.add("animate__animated", animation);
  if (onAnimationEnd) {
    element.addEventListener("animationend", onAnimationEnd, { once: true });
  }
}

function getNextSlideIndex() {
  if (currentIndex + 1 < reviews.value.length) {
    return currentIndex + 1;
  }
  return 0;
}

function getPreviousSlideIndex() {
  if (currentIndex > 0) {
    return currentIndex - 1;
  }
  return reviews.value.length - 1;
}

function onNext() {
  const element = document.querySelector(`[data-index="${currentIndex}"]`);
  animate(element, "animate__fadeOut", () => {
    if (element != null) element.classList.add("hidden");
  });
  const nextSlideIndex = getNextSlideIndex();
  const nextElement = document.querySelector(
    `[data-index="${nextSlideIndex}"]`
  );
  animate(nextElement, "animate__fadeIn", null);
  currentIndex = nextSlideIndex;
}

function onPrevious() {
  const element = document.querySelector(`[data-index="${currentIndex}"]`);
  animate(element, "animate__fadeOut", () => {
    if (element != null) element.classList.add("hidden");
  });
  const previousSlideIndex = getPreviousSlideIndex();
  const previousElement = document.querySelector(
    `[data-index="${previousSlideIndex}"]`
  );
  animate(previousElement, "animate__fadeIn", null);
  currentIndex = previousSlideIndex;
}

onBeforeMount(async () => {
  await store.dispatch("reviews");

  reviews.value.forEach((_: any, index: any) => {
    if (index != currentIndex) {
      const element = document.querySelector(`[data-index="${index}"`);
      if (element != null) element.classList.add("hidden");
    }
  });
});
</script>
