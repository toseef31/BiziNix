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

    <div class="mt-4 font-bold">Alebo nahrajte všetky potrebné predmety jedným klikom podľa toho, akému oboru sa chcete venovať.</div>


    <vue-horizontal responsive>
        <div v-for="(component, index) in components" :key="index">
        <!-- Render the components from the array with props -->
        <component :is="component.component" :image="component.image" :title="component.title" />
    </div>
    </vue-horizontal>

    <!-- <div class="flex flex-row gap-8 items-center justify-center">
    </div>
    <button @click.prevent="selectTag">Davj vyberaj</button> -->
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import { ref } from 'vue';
import SignleSubjectOfBusinnesWithImg from './SignleSubjectOfBusinnesWithImg.vue'
import VueHorizontal from "vue-horizontal";

const items =  [...Array(20).keys()].map((i) => {
        return {title: `Item ${i}`, content: `🚀 Content ${i}`};
      })

      //<SignleSubjectOfBusinnesWithImg :image="imgSource" :title="titleFor" @click.prevent="selectTag" />

      
const imgSource = "src/assets/predmety-podnikania/grafika.png"
const titleFor = "bbb"

const components = [ 
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource , title: titleFor },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource , title: titleFor },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource , title: titleFor },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource , title: titleFor },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource , title: titleFor },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource , title: titleFor },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource , title: titleFor },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource , title: titleFor }
 ];

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