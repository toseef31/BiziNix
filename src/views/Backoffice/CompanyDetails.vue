<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900">Detail spoločnosti</h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0">
        <h1 class="mb-4 text-2xl font-bold text-gray-900">
          {{ company.name }}
        </h1>
        <FormKit
          v-model="company.doc_sncounters_id"
          type="select"
          label="Formát čísla"
          :options="sncounters"
          @change="snCounterChanged()"
        />
      </div>
      <!-- /End replace -->
    </div>
  </main>
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const company = ref("") as any;
const sncounters = ref([] as any);

function snCounterChanged() {
  //
}

onBeforeMount(() => {
  const companyId = Number(route.params.id);
  store.dispatch("getCompanyById", companyId).then((response) => {
    company.value = response.data;
  });

  store.dispatch("getDocumentSnCounters").then((response) => {
    sncounters.value = [];
    response.data.data.forEach((sncounter: any) => {
      sncounters.value.push({
        label: sncounter.name,
        value: sncounter.id.toString(),
        description: sncounter.description
      });
    });
  });
});
</script>
