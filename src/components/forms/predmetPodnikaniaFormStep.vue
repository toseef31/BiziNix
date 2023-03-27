<template>
  <div class="text-4xl font-bold">Vyberte si premet podnikania</div>
  <div class="mt-2 mb-6">Na tomto mieste vám pomôžeme s výberom najvhodnejších predmetov podnikania. Ako prvú zadajte hlavnú činosť podnikania.</div>
    <FormKit :type="multiSelVueForm" id="subjects_of_business" v-model="subjects_of_business" name="subjects_of_business" label="Predmet podnikania" autocomplete="off"
      :items="businessCategori"
      @input="calculatePriceForBusinessOfcategories"
      placeholder="Example placeholder"
      help="Môžete vybrať aj viac predmetov podnikania."
      validation="required"/>
      <div>Cena za zavolené predmety podnikania <b>{{ finalPriceForBusinessCategori }} €.</b></div>
  </template>

<script setup lang="ts">
import { createInput } from '@formkit/vue'
import { onMounted, ref } from 'vue';
import formkitCustomMultiSelectVue from './formkitCustomMultiSelect.vue';
import useCalculatePriceForBusinessCategories from '@/views/Company/Composables/CalculatePriceForBusinessCategories'
import store from '@/store';
import type Company from '@/@types/Company';

const multiSelVueForm = createInput(formkitCustomMultiSelectVue, {
  props: ['items'],
})

let businessCategori = ref([
  {
    label: '',
    value: ''
  }
])

let subjects_of_business = ref([{
    id: 0,
    title: '',
    price: 0,
    description:'',
    category_id: 0
  }] as Company["subjects_of_business"] )

const { calculatePriceForBusinessOfcategories, finalPriceForBusinessCategori }  = useCalculatePriceForBusinessCategories(subjects_of_business.value)

onMounted(() => {
  businessCategori.value.pop()
  subjects_of_business.value.pop()
  store.dispatch("getAllSubjectOfBusiness")
  .then(res => {
    res.data.data.forEach((element: any) => {
      businessCategori.value.push({
        label: element.title,
        value: element
      })
    })
  })
  .catch(err => {
      console.log(err);
  })
})

defineExpose({
  subjects_of_business,
  finalPriceForBusinessCategori
})

</script>