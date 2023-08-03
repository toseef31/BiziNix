<template>

    <FormKit
      type="autocomplete"
      name="autocomplete"
      label="Predmet podnikania"
      :options="loadCurrentlyPopularMovies"
      placeholder="Vyhľadajte alebo vyberte predmet podnikania"
      multiple
      open-on-click
      v-model="subjects_of_business"
      selection-appearance="option"
    >
      <template #option="{ option }">
        <div class="formkit-option grow p-2">
          <span>{{ option.label }}</span> <span class="font-medium">({{ option.__original.price }} €)</span>
        </div>
      </template>

    </FormKit>

    <div class="mt-4 font-bold">Alebo nahrajte všetky potrebné predmety jedným klikom podľa toho, akému oboru sa chcete venovať.</div>

    <div class="mt-4">
      <vue-horizontal responsive v-if="!loading">
          <section v-for="(component, index) in components" :key="index">
              <!-- Render the components from the array with props -->
              <component :is="component.component" :image="component.image" :title="component.title" @click.prevent="logujem()" />
          </section>
      </vue-horizontal>
      <div v-else>
        <div class="flex flex-col items-center py-12">
        <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="mt-4">Načítavanie...</span>
        </div>
      </div>
    </div>

    <!-- <button @click.prevent="logujem">Nastav hodnoty</button> -->

</template>

<script setup lang="ts">
import store from '@/store';
import { getNode } from '@formkit/core';
import { onBeforeMount, ref } from 'vue';
import SignleSubjectOfBusinnesWithImg from './SignleSubjectOfBusinnesWithImg.vue'
import VueHorizontal from "vue-horizontal";

const loading = ref(true);
const imgSource = "src/assets/predmety-podnikania/"
const subjects_of_business = ref<any[]>([]);

onBeforeMount(() => {
})

function logujem() {

  subjects_of_business.value.push({ id: 1, title: 'Administratívne služby', price: 0, description: null, category_id: 1 })
  console.log("aa")
    // console.log("aa")
    // const node = getNode('multiSelId')
    // myModelForVal.value.push('CZ')
    // console.log(subjects_of_business.value)
}

async function loadCurrentlyPopularMovies({ search, page, hasNextPage }: any) {

  const res = await store.dispatch("getAllSubjectOfBusiness")
  loading.value = false
  if(res.data.data){
    if(!search){
      return res.data.data.map((item: any) => ({ label: item.title, value: item }))  
    }
    else {
      const filteredData = res.data.data.filter((item: any) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      const mappedData = filteredData.map((item: any) => ({
        label: item.title,
        value: item,
      }));
      return mappedData
    }  
  }

  loading.value = false
  return []
}

const components = [ 
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "grafika.png", title: "Grafika a design", obj: subjects_of_business },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "doprava.png", title: "Doprava", obj: subjects_of_business },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "administrativa.png", title: "Administratíva", obj: subjects_of_business },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "stavba.png", title: "Stavbárčina", obj: subjects_of_business },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "edukacia.png", title: "Edukácia", obj: subjects_of_business },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "polnohospo.png", title: "Poľnohospodárstvo", obj: subjects_of_business },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "zdravie.png", title: "Zdravie", obj: subjects_of_business },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "marketing.png", title: "Marketing", obj: subjects_of_business },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "obchod.png", title: "Obchod", obj: subjects_of_business },
    { component: SignleSubjectOfBusinnesWithImg, image: imgSource +  "handmade.png", title: "Handmade", obj: subjects_of_business },
 ];

</script>