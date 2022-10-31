<template>
  <div class="bg-gray-800 text-white">
    <div
      class="relative z-0 h-full w-full max-h-full bg-cover bg-local bg-no-repeat bg-center"
      style="
        height: calc(100vh - 200px);
        background-image: url('../src/assets/5.png');
      "
    >
      <img
        src="../assets/robot.png"
        class="absolute bottom-[-82px] right-0"
        style="height: calc(100vh - 260px)"
      />
      <div
        class="w-full w-full flex h-full"
        style="background-color: rgba(0, 0, 0, 0.75)"
      >
        <div class="container flex-col justify-center mx-auto flex h-full">
          <div class="text-5xl text-white leading-normal font-bold">
            Poradíme,<br />
            vysvetlíme a <br />
            vyrešime
          </div>
          <div class="text-base text-white mt-4">
            Vyhladajte odpoveď podľa kľúčových slov
          </div>
          <div class="w-[420px]">
            <div class="flex w-full relative">
              <input
                v-model="searchQuery"
                placeholder="Ako funguje DPH ?"
                class="h-10 w-full shadow px-1 rounded border focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-black"
              />
              <div
                class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-900 py-20">
      <div class="container mx-auto">
        <div class="flex">
          <div class="flex-1 pr-20">
            <div class="text-5xl text-white leading-normal font-bold">
              Často kladené <br />
              otázky
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
            <div class="text-5xl text-white leading-normal font-bold">
              Články k vašej <br />
              otázke
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
        </div>
      </div>
    </div>
    <div class="bg-gray-800 py-20">
      <div class="container mx-auto">
        <div class="text-5xl text-center text-white leading-normal font-bold">
          Nenašli ste svoju <br />
          odpoveď?
        </div>
        <div class="text-base text-center text-white mt-4">
          Spojte sa s nami
        </div>
        <div class="flex text-center mt-20 w-full">
          <div class="flex-1 py-10">
            <div class="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-20 h-20 text-teal-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </div>
            <div class="text-white text-base mt-4 text-grey-800">
              <a href="tel:+421908478270">+421 908 478 270</a>
            </div>
          </div>
          <div class="flex-1 py-10 border-r border-gray-600 border-l">
            <div class="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-20 h-20 text-teal-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                />
              </svg>
            </div>
            <div class="text-white text-base mt-4 text-grey-800">
              <button class="chat-button" v-on:click="openLiveChat()">
                Spustiť LiveChat
              </button>
            </div>
          </div>
          <div class="flex-1 py-10">
            <div class="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-20 h-20 text-teal-500"
              >
                <path
                  stroke-linecap="round"
                  d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                />
              </svg>
            </div>
            <div class="text-white text-base mt-4 text-grey-800">
              <a href="mailto:support@bizinix.sk">support@bizinix.sk</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Reviews></Reviews>
    <FooterLayout></FooterLayout>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { onMounted, ref, computed } from "vue";
import FooterLayout from "../components/FooterLayout.vue";
import CounselingCenter from "@/components/CounselingCenter.vue";
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

onMounted(() => {
  store.dispatch("faqs");
  store.dispatch("posts");
});
</script>
