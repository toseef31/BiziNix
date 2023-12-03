<template>
  <div class="text-4xl font-bold mb-6">Ako prvé zadajte IČO vašej firmy</div>
  <FormKit
    name="Spoločnosť"
    type="autocomplete"
    label="IČO spoločnosti"
    placeholder="Zadajte IČO spoločnosti"
    :options="search"
    validation="required"
  >
    <template #option="{ option }">
      <div class="formkit-option grow p-2">
        <div class="font-bold">{{ option.label }}, {{ option.city }}</div>
        <p class="option-overview">IČO: {{ option.ico }}</p>
      </div>
    </template>
  </FormKit>
</template>

<script setup lang="ts">
import store from '@/store';
import { getNode } from '@formkit/core';
import { onBeforeMount, ref } from 'vue';
import type Company from '@/types/Company';
import { useVfm, VueFinalModal } from 'vue-final-modal'

const vfm = useVfm()
const modalIdAddOrEditSubjects = Symbol('modalIdAddOrEditSubjects')
const loading = ref(true);
const subjects_of_business = ref<Company['subjects_of_business']>([]);

onBeforeMount(() => {
})

async function search({ search }: any) {
  if (!search) return [];
  if (search.length > 2) {
    const searchQuery = {
      searchQuery: search,
    };
    const res = await store
      .dispatch("searchCompanies", searchQuery)
      .catch((err) => {
        console.log(err);
      });
// update function for search in other API
    return res.data.Results.map((result: any) => {
      return {
        label: result.Name,
        value: result,
        city: result.City,
        ico: result.Ico
      };
    });
  }
  return [];

}

defineExpose({

})

</script>