<template>
<div class="text-4xl font-bold">Vyberte si sídlo spoločnosti</div>
<div class="mt-2 mb-6">Na tomto mieste vám pomôžeme s výberom sídla spoločnosti.</div>
  <FormKit type="radio" v-model="obchodneSidloVirtuOrNormal" label="O aké sídlo máte záujem?" name="obchodneSidloVirtuOrNormal"
  :options="
      [
        { value: 'vlastnePrenajate', label: 'Vlastné alebo prenajaté' },
        { value: 'virtualne', label: 'Virtuálne sídlo' }
      ]"
      validation="required" />
  <div v-if="obchodneSidloVirtuOrNormal === 'vlastnePrenajate'">
    <div class="grid grid-cols-3 gap-4">
      <FormKit type="select" name="country" id="country" label="Štát" v-model="hqAddress.country" placeholder="Vyberte štát"
        :options="['Slovensko','Česká republika']" validation="required" validation-visibility="dirty"
      />
    <FormKit type="text" name="city" v-model="hqAddress.city" label="Obec" validation="required" />
    <FormKit type="text" name="psc" v-model="hqAddress.psc" label="PSČ" validation="required" />
    <FormKit type="text" name="street" v-model="hqAddress.street" label="Ulica" validation="required" />
    <FormKit type="text" name="street_number" v-model="hqAddress.street_number" label="Súpisne číslo"
      validation="require_one:street_number2"
      help="Čislo pred lomítkom"
    />
    <FormKit type="text" name="street_number2" v-model="hqAddress.street_number2" label="Orientačné číslo"
      validation="require_one:street_number"
      help="Čislo za lomítkom"
    />
    </div>
    <div class="mb-4">
      <p>
        Na vytvorenie dokumentu "Súhlas vlastníka nehnuteľnosti" so zápisom nehnuteľnosti do obchodného registra ako sídla spoločnosti budeme potrebovať nasledovné údaje:
      </p>
    </div>
    <div class="flex flex-col md:flex-row md:space-x-4">
      <FormKit type="select" name="headquarters_type" id="headquarters_type_company" label="Druh priestoru"
        v-model="headquarterInfo.headquarters_type" placeholder="Vyberte druh priestoru"
        :options="[
          { label: 'Nebytový priestor', value: 1 },
          { label: 'Byt v bytovom dome', value: 2 },
          { label: 'Iná budova', value: 3 },
          { label: 'Rodinný dom', value: 4 },
          { label: 'Samostatne stojaca garáž', value: 5 }
        ]"
        validation="required" validation-visibility="dirty"
      />
      <FormKit type="text" name="ownerName" v-model="headquarterInfo.owner_name" label="Vlastník priestoru" validation="required" />
    </div>
</div>
<div v-if="obchodneSidloVirtuOrNormal === 'virtualne'">
  <div class="flex flex-col md:flex-row gap-8 mb-4">
        <div>
          <div class="pb-8 font-bold text-lg w-full text-left"> Vyberte si sídlo</div>
          <VirtualHqSlider></VirtualHqSlider>
        </div>
        <div>
          <VirtualHqPackage></VirtualHqPackage>
        </div>
      </div>
  <div v-if="!store.state.selectedVhq.name" class="my-4 flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
      <b>Prosím vyberte sídlo.</b>
  </div>
</div>
</template>

<script setup lang="ts">
import store from '@/store';
import type Address from '@/types/Address';
import { onBeforeMount, onMounted, onUnmounted, watch } from 'vue';
import { ref } from 'vue';
import VirtualHqSlider from '@/components/VirtualHqSlider.vue'
import VirtualHqPackage from '@/components/VirtualHqPackage.vue'

onMounted( () => {
  store.state.selectedVhq = {};
  store.state.selectedVhqPackage = {};  
})

onUnmounted(() => {
  store.state.selectedVhq = {};
  store.state.selectedVhqPackage = {};
})

let obchodneSidloVirtuOrNormal = ref("")
watch(obchodneSidloVirtuOrNormal, (newValue) => {
  if(newValue === 'vlastnePrenajate'){
    store.state.selectedVhq = {};
    store.state.selectedVhqPackage = {};
  }
})


let headquartersTypes = ref([
  {
    label: '',
    value: 0 as number
  }
])

let hqAddress = ref({
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
} as Address)

let headquarterInfo = ref({
  name: '',
  description: '',
  headquarters_type: 0,
  owner_name: '',
  price: 0,
  registry: false,
  forwarding: false,
  scanning: false,
  shredding: false,
  is_virtual: false,
  img: '',
  address_id: 0
})


defineExpose({
  hqAddress,
  headquarterInfo,
  obchodneSidloVirtuOrNormal
})

</script>