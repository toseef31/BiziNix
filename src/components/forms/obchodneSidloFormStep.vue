<template>
<div class="text-4xl font-bold">Vyberte si sídlo spoločnosti</div>
<div class="mt-2 mb-6">Na tomto mieste vám pomôžeme s výberom sídla spoločnosti.</div>
  <FormKit type="radio" v-model="obchodneSidlo" label="O aké sídlo máte záujem?" name="obchodneSidlo"
  :options="
      [
        { value: 'vlastnePrenajate', label: 'Vlastné alebo prenajaté' },
        // { value: 'virtualne', label: 'Virtuálne' }
      ]"
      validation="required" />
  <div v-if="obchodneSidlo === 'vlastnePrenajate'">
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
      <FormKit type="select" name="headquarters_type" id="headquarters_type" label="Druh priestoru" v-model="headquarterInfo.headquarters_type" placeholder="Vyberte druh priestoru"
        :options=headquartersTypes.values validation="required" validation-visibility="dirty"
      />
      <FormKit type="text" name="ownerName" v-model="headquarterInfo.owner_name" label="Vlastník priestoru" validation="required" />
    </div>
</div>
<div v-if="obchodneSidlo === 'virtualne'">
  <div>
    <p>Prosím pri registrácii zatial použi len Vlastné alebo prenajaté sídlo.</p>
  </div>
</div>
</template>

<script setup lang="ts">
import store from '@/store';
import type Address from '@/types/Address';
import { onBeforeMount } from 'vue';
import { ref } from 'vue';

onBeforeMount( () => {

  store.dispatch("getHeadquartersTypes")
  .then(res => {
    headquartersTypes.value.shift()
    res.data.data.forEach((element: any) => {
      headquartersTypes.value.push({
        value: element.id,
        label: element.name
      })
    });
  })
  
})


let isVirtual = ref(false)
let obchodneSidlo = ref("")
let headquartersTypes = ref([
  {
    label: '' as string,
    value: ''
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
  is_virtual: false, // to do reg virtual
  img: '',
  address_id: 0
})


defineExpose({
  hqAddress,
  headquarterInfo,
  isVirtual
})

</script>