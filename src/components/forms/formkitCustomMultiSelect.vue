<script setup lang="ts">
import Multiselect from '@vueform/multiselect'

const props = defineProps(['context'])

</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<template>
    <Multiselect
        :options="props.context.listItems"
        :value="props.context._value"
        mode="tags"
        placeholder="Napíšte a vyhľadajte predmet podnikania, alebo vyberte"
        :searchable="true"
        :min-chars="3"
        @change="(v: any) => props.context.node.input(v)"
    >
        <template v-slot:option="{ option }">
            {{ option['label'] }} ({{ option['value']['price'] }} €)
        </template>

    </Multiselect>
</template>

<style>
.multiselect-tag {
    white-space: normal;
}
</style>