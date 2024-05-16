<script setup lang="ts">
import store from "@/store";
import { toast } from "vue3-toastify";

async function search({ search }: any) {
  if (!search) return [];
  if (search.length > 2) {
    const searchQuery = {
      searchQuery: search,
    };
    const res = await store
      .dispatch("searchCompanies", searchQuery)
      .catch((err) => {
        toast.error('Error: ' + err);
      });
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
</script>

<template>
    <FormKit
      name="Spoločnosť"
      type="autocomplete"
      placeholder="Meno alebo IČO spoločnosti"
      :options="search"
      validation="required"
    >
      <template #option="{ option }">
        <div class="formkit-option grow p-2 text-white">
            <div class="font-bold">{{ option.label }}, {{ option.city }}</div>
            <p class="option-overview">IČO: {{ option.ico }}</p>
        </div>
      </template>
    </FormKit>
</template>

<style scoped>
</style>
