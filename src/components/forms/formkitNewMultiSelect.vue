<template>
  <FormKit
    type="form"
    #default="{ value }"
    name="customSect"
    :actions="false"
    use-local-storage="true"
  >
    <FormKit
    type="autocomplete"
      name="autocomplete"
      label="Search for a country"
      :options="loadCurrentlyPopularMovies"
      placeholder="Example: United States"
      multiple
      selection-appearance="option"
      :filter="(option:any, search: any) =>
        option.value.label.toLowerCase().startsWith(search.toLowerCase())"
    >

        <template #option="{ option }">
        <div class="formkit-option grow p-2">
          <span>{{ option.label }}</span> <span class="font-medium">({{ option.__original.price }} €)</span>
        </div>
      </template>
    </FormKit>
    <pre wrap>{{ value }}</pre>
    <button @click.prevent="logujem">Nastav hodnoty</button>
  </FormKit>
</template>

<script setup lang="ts">
import store from '@/store';
import { getNode } from '@formkit/core';
import { map } from 'lodash';
import { onBeforeMount, ref } from 'vue';

const subjects_of_business = ref([
  {
    label: '',
    value: ''
  }
]);
const myModelForVal = ref(['US', 'AF', 'AX'])
const carBrands = [{ label: 'Audi', value: 'audi', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/audi-logo.png' },{ label: 'BMW', value: 'bmw', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/bmw-logo.png' },{ label: 'Citroen', value: 'citroen', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/citroen-logo.png' },{ label: 'Dacia', value: 'dacia', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/dacia-logo.png' },{ label: 'Fiat', value: 'fiat', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/fiat-logo.png' },{ label: 'Ford', value: 'ford', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/ford-logo.png' },{ label: 'Ferrari', value: 'ferrari', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/ferrari-logo.png' },{ label: 'Honda', value: 'honda', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/honda-logo.png' },{ label: 'Hyundai', value: 'hyundai', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/hyundai-logo.png' },{ label: 'Jaguar', value: 'jaguar', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/jaguar-logo.png' },{ label: 'Jeep', value: 'jeep', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/jeep-logo.png' },{ label: 'Kia', value: 'kia', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/kia-logo.png' },{ label: 'Land Rover', value: 'land rover', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/land-rover-logo.png' },{ label: 'Mazda', value: 'mazda', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/mazda-logo.png' },{ label: 'Mercedes', value: 'mercedes', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/mercedes-logo.png' },{ label: 'Mini', value: 'mini', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/mini-logo.png' },{ label: 'Mitsubishi', value: 'mitsubishi', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/mitsubishi-logo.png' },{ label: 'Nissan', value: 'nissan', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/nissan-logo.png' },{ label: 'Opel', value: 'opel', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/opel-logo.png' },{ label: 'Peugeot', value: 'peugeot', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/peugeot-logo.png' },{ label: 'Porsche', value: 'porsche', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/porsche-logo.png' },{ label: 'Renault', value: 'renault', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/renault-logo.png' },{ label: 'Saab', value: 'saab', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/saab-logo.png' },{ label: 'Skoda', value: 'skoda', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/skoda-logo.png' },{ label: 'Subaru', value: 'subaru', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/subaru-logo.png' },{ label: 'Suzuki', value: 'suzuki', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/suzuki-logo.png' },{ label: 'Toyota', value: 'toyota', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/toyota-logo.png' },{ label: 'Volkswagen', value: 'volkswagen', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/volkswagen-logo.png' },{ label: 'Volvo', value: 'volvo', logo: 'https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/volvo-logo.png' }];
function logujem() {

    console.log("aa")
    const node = getNode('multiSelId')
    myModelForVal.value.push('CZ')
    console.log(subjects_of_business.value)
}


onBeforeMount(() => {
  // //businessCategori.value.pop()
  // subjects_of_business.value.pop()
  // store.dispatch("getAllSubjectOfBusiness")
  // .then(res => {
  //   res.data.data.forEach((element: any) => {
  //       subjects_of_business.value.push({
  //       label: element.title,
  //       value: element.title
  //     })
  //   })
  // })
  // .catch(err => {
  //     console.log(err);
  // })
})

async function loadCurrentlyPopularMovies({ search, page, hasNextPage }: any) {

  // to do search
  //if (!search) return []

  const res = await store.dispatch("getAllSubjectOfBusiness")
  if(res.data.data){
    return res.data.data.map((item: any) => ({ label: item.title, value: item }))    
  }
  return []

  // const res = await fetch(
  //   `https://api.themoviedb.org/3/movie/popular?api_key=f48bcc9ed9cbce41f6c28ea181b67e14&language=en-US&page=${page}`
  // )
  // if (res.ok) {
  //   const data = await res.json()
  //   if (page !== data.total_pages) hasNextPage()
  //   return data.results.map((item: any) => ({ label: item.title, value: item.id }))
  // }
  // return []
}

</script>