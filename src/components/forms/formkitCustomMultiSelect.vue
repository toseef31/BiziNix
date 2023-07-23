<template>
    <Multiselect
        :options="props.context.listItems"
        :value="props.context._value"
        mode="tags"
        placeholder="Napíšte a vyhľadajte predmet podnikania, alebo vyberte"
        :searchable="true"
        :min-chars="3"
        :resolve-on-load="true"
        @change="(v: any) => props.context.node.input(v)"
        ref="multiselectRef"
        @open="OpenLogOptions"
    >
        <template v-slot:option="{ option }">
            <div>{{ option['label'] }} <span class="font-medium">({{ option['value']['price'] }} €)</span></div>
        </template>

    </Multiselect>
    <!-- <button @click.self.prevent="selectTag">Davj vyberaj</button> -->
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import { ref } from 'vue';

const props = defineProps(['context'])
const multiselectRef = ref()

const arrayOfObjects = [
{ label: 'Administratívne služby', value: {id: 1, title: 'Administratívne služby', price: 1, description: null, category_id: 1} },
];

function selectTag() {
    multiselectRef.value.deselect(arrayOfObjects)
    multiselectRef.value.select(arrayOfObjects)
}

function OpenLogOptions(){
    console.log("Open")
}

</script>
<style src="@vueform/multiselect/themes/default.css"></style>