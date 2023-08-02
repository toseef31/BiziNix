<script setup lang="ts">
import store from "@/store";

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
  <FormKit type="form" :actions="false">
    <FormKit
      id="i_autocomplete"
      name="Spoločnosť"
      type="autocomplete"
      placeholder="Meno alebo IČO spoločnosti"
      :options="search"
      selection-appearance="option"
      required
    >
      <template #option="{ option }">
        <div class="formkit-option">
          <div class="text-container">
            <div class="font-bold">{{ option.label }}, {{ option.city }}</div>
            <p class="option-overview">IČO: {{ option.ico }}</p>
          </div>
        </div>
      </template>
    </FormKit>
  </FormKit>
</template>

<style>
.formkit-listbox-button {
  display: none;
  visibility: hidden;
}

.formkit-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.option-overview {
  font-size: 11px;
}

.text-container {
  width: 100%;
}

#i_autocomplete_inner {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
