<template>
  <div class="bg-gray-800 text-white">
    <div class="flex min-h-[50vh] bg-black bg-opacity-70 bg-cover bg-blend-overlay w-full bg-no-repeat bg-center bg-[url('../src/assets/5.png')]" >
        <div class="flex-col justify-center mx-auto flex">
            <div class="flex flex-col items-center">
                <div class="text-3xl md:text-5xl text-white font-bold">
                  Poradíme vysvetlíme a vyrešime
                </div>
                <div class="text-base text-white mt-4 mb-4">
                  Vyhľadajte odpoveď podľa kľúčových slov
                </div>
            </div>
            <div>
          <div class="mt-1 flex rounded-md shadow-sm">
            <div class="relative flex flex-grow items-stretch focus-within:z-10">
              <input type="text" id="searchInput" v-model="searchQuery"
                class="text-gray-800 font-medium block w-full rounded-none rounded-l-md border-gray-300 pl-2 py-4 focus:border-teal-500 focus:ring-teal-500"
                placeholder="Ako funguje DPH?"
              />
            </div>
            <button type="button" v-on:click="search()" class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
              <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
              <span>Hľadať</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-900 py-20">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row p-4">
          <div class="flex-1 pr-20">
            <div
              class="text-4xl md:text-5xl text-white leading-normal font-bold"
              id="faqsDiv"
            >
              Často kladené otázky
            </div>
            <div v-for="faq in searchedFaqs" :key="faq.id">
              <button
                class="w-full mt-6 text-left"
                v-on:click="showDescForFaq(faq)"
              >
                <div class="w-full">
                  <div
                    class="flex px-1 border-gray-600 border-b group h-12 items-center text-white justify-between"
                  >
                    <div
                      class="group-hover:cursor-pointer w-full group-hover:text-teal-500"
                    >
                      {{ faq.title }}
                    </div>
                    <svg
                      v-show="!faq.isOpen"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 group-hover:text-teal-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                    <svg
                      v-show="faq.isOpen"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 group-hover:text-teal-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </div>
                  <!---->
                </div>
              </button>
              <div
                class="text-sm p-5 bg-gray-800 text-white"
                id="{{faq.id}}"
                v-show="faq.isOpen"
              >
                {{ faq.content }}
              </div>
            </div>
          </div>
          <div class="flex-1">
            <div class="text-4xl md:text-5xl text-white leading-normal font-bold mt-4 md:mt-0">
              Články k vašej otázke
            </div>
            <div class="flex flex-wrap mt-6">
              <div
                v-for="post in searchedPosts"
                :key="post.id"
                class="bg-gray-800 mx-2 hover:cursor-pointer mb-5 rounded-lg group group-hover:bg-teal-500 shadow"
                style="width: calc(50% - 2rem)"
                v-on:click="redirectToPost(post.id)"
              >
                <img
                  src="@/assets/blog-exaple-1.png"
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
        </div>
      </div>
    </div>
    <div class="bg-gray-800 py-20">
      <div class="max-w-7xl mx-auto py-4 px-2 sm:px-6 lg:px-8 bg-gray-800">
        <div class="text-4xl md:text-5xl text-center text-white leading-normal font-bold">
          Nenašli ste svoju odpoveď?
        </div>
        <div class="text-base text-center text-white mt-4">
          Spojte sa s nami
        </div>
        <div class="flex mt-20">
          <div class="flex-1 flex flex-col justify-center">
            <div class="text-3xl font-bold text-white">
              Zákaznícka podpora
            </div>
            <div class="text-base mt-4">
              <a href="tel:+421908478270">+421 908 478 270</a>
            </div>
            <div class="text-base">
              <a href="mailto:support@bizinix.sk">support@bizinix.sk</a>
            </div>
          </div>
          <div class="flex-1 py-10 bg-gray-900 rounded-xl">
            <div class="px-6 flex flex-row justify-between">
              <div class="flex basis-1/4">
                <div class="flex flex-col">
                  <div class="text-3xl font-bold text-teal-500">LiveChat</div>
                  <div class="text-base text-white mt-4">
                    Pokecajme si hneď teraz online
                  </div>
                  <div class="pt-6">
                    <button
                      class="bg-teal-500 hover:bg-teal-700 text-gray-900 font-bold py-2 px-4 rounded"
                      v-on:click="openLiveChat()"
                    >
                      Spustiť
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex basis-3/4 relative">
                <div class="absolute inset-y-0 right-0 flex items-center">
                  <img class="max-h-[360px]" src="@/assets/robot-head.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Reviews></Reviews>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import store from "@/store";
import { onMounted, ref, computed } from "vue";
import Reviews from "@/components/Reviews.vue";
import { useRouter } from "vue-router";

const faqs: any = computed(() => {
  return store.state.faqs;
});

const posts: any = computed(() => {
  return store.state.posts;
});

const router = useRouter();
const searchQuery = ref("");

const searchedFaqs = computed(() => {
  if (faqs.value != undefined) {
    return faqs.value.filter((faq: any) => {
      return (
        faq.title.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1
      );
    });
  } else {
    return faqs.value;
  }
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

function showDescForFaq(i: any) {
  if (i.isOpen == null) {
    i.isOpen = true;
  } else if (i.isOpen == true) {
    i.isOpen = false;
  } else {
    i.isOpen = true;
  }
}

function openLiveChat() {
  window.tidioChatApi.display(true);
  window.tidioChatApi.open();
}

function redirectToPost(id: any) {
  return router.push({
    name: "Post",
    params: { id: id },
  });
}

function search() {
  doScrolling("#faqsDiv", 1000);
}

function getElementY(query: any) {
  return (
    window.pageYOffset +
    document.querySelector(query).getBoundingClientRect().top
  );
}

function doScrolling(element: any, duration: any) {
  const startingY = window.pageYOffset;
  const elementY = getElementY(element);
  const targetY =
    document.body.scrollHeight - elementY < window.innerHeight
      ? document.body.scrollHeight - window.innerHeight
      : elementY;
  const diff = targetY - startingY;
  const easing = function (t: any) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  let start: any;

  if (!diff) return;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    let percent = Math.min(time / duration, 1);
    percent = easing(percent);

    window.scrollTo(0, startingY + diff * percent);

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}

onMounted(() => {
  store.dispatch("faqs");
  store.dispatch("posts");
});
</script>
