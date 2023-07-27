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

    <div class="mt-4">
        <vue-horizontal v-if="context.listItems.length" responsive>
            <section v-for="(component, index) in components" :key="index">
                <!-- Render the components from the array with props -->
                <component :is="component.component" :image="component.image" :title="component.title" @click.prevent="selectTag(component.obj)" />
            </section>
        </vue-horizontal>
    </div>

    <!-- <div class="flex flex-row gap-8 items-center justify-center">
    </div>
    <button @click.prevent="selectTag">Davj vyberaj</button> -->
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import { ref } from 'vue';
import SignleSubjectOfBusinnesWithImg from './SignleSubjectOfBusinnesWithImg.vue'
import VueHorizontal from "vue-horizontal";
      
const imgSource = "src/assets/predmety-podnikania/"

const arrOfObjGrafika = [
    { label: 'Administratívne služby', value: {id: 1, title: 'Administratívne služby', price: 0, description: null, category_id: 1} },
];

const arrOfObjStavba = [
    { label: 'Stav služby', value: {id: 1, title: 'Administratívne služby', price: 1, description: null, category_id: 1} },
];

const components = [ 
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "grafika.png", title: "Grafika a design", obj: arrOfObjGrafika },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "doprava.png", title: "Doprava", obj: arrOfObjStavba },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "administrativa.png", title: "Administratíva", obj: arrOfObjGrafika },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "stavba.png", title: "Stavbárčina", obj: arrOfObjStavba },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "edukacia.png", title: "Edukácia", obj: arrOfObjGrafika },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "polnohospo.png", title: "Poľnohospodárstvo", obj: arrOfObjStavba },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "zdravie.png", title: "Zdravie", obj: arrOfObjGrafika },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "marketing.png", title: "Marketing", obj: arrOfObjStavba },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "obchod.png", title: "Obchod", obj: arrOfObjGrafika },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "handmade.png", title: "Handmade", obj: arrOfObjStavba },
 ];

const props = defineProps(['context'])
const multiselectRef = ref()

function selectTag(obj: any) {
    multiselectRef.value.deselect(obj)
    multiselectRef.value.select(obj)
}

function OpenLogOptions(){
    console.log("Open")
}

</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>

</style>