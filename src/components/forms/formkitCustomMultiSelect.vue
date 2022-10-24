<script setup lang="ts">
import Multiselect from '@vueform/multiselect'

const props = defineProps(['context'])

</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<template>
    <Multiselect
        :options="props.context.items"
        :value="props.context._value"
        mode="tags"
        placeholder="Napíšte a vyhľadajte predmet podnikania, alebo vyberte"
        :searchable="true"
        :min-chars="0"
        :infinite="true"
        :limit="20"
        @change="(v: any) => props.context.node.input(v)"
    />
</template>