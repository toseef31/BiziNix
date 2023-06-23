<template>
  <div class="bg-gray-900 text-white">
    <div class="container justify-center flex mx-auto">
      <div class="flex flex-col">
        <div class="w-full bg-gray-800 flex flex-row rounded-l-xl my-10">
          <div class="flex flex-col basis-1/2 font-bold text-4xl p-4">
            Bizinix doklady
          </div>
        </div>
        <div class="flex">
          <DocumentsExistingCompany />
        </div>
      </div>
    </div>
  </div>

  <div class="bg-gray-800 text-white">
    <CounselingCenter></CounselingCenter>
    <Reviews></Reviews>
    <FooterLayout></FooterLayout>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { ref, onBeforeMount } from "vue";
import DocumentsExistingCompany from "../../components/forms/DocumentsExistingCompany.vue";
import FooterLayout from "@/components/FooterLayout.vue";
import CounselingCenter from "@/components/CounselingCenter.vue";
import Reviews from "@/components/Reviews.vue";
import { useRoute } from "vue-router";

const route = useRoute();

</script>
