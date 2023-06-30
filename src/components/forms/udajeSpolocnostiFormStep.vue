<template>
<div class="text-4xl font-bold">Vyplňte údaje o spoločnosti</div>
<div class="mt-2 mb-6">vyplňte zakladne údaje a pridajte zakladateľov (spoločnikov) a konateľov.</div>
  <FormKit type="text" name="name" v-model="companyOrZivnostModel.name" label="Názov spoločnosti" />
  <h2 class="text-xl my-4">Základné imanie </h2>
  <div class="grid grid-cols-2 gap-4 my-4">
    <FormKit type="number" name="vyska" label="Výška €" validation="required|min:5000" v-model="companyOrZivnostModel.imanie_vyska"
    help="Od 1.1.2016 finančné prostriedky do výšky 5000 eur nemusia byť vkladané ná účet v banke. Minimálna výška základného imania pri s.r.o. je podľa zákona 5000,- Eur. Môžete zadať aj viac."
    />
    <FormKit type="number" name="rozsah_splatenia" label="Rozsah splatenia €" validation="required" v-model="companyOrZivnostModel.imanie_splatene"
      help="Od 1.1.2016 finančné prostriedky do výšky 5000 eur nemusia byť vkladané ná účet v banke. V prípade jediného zakladateľa musí byť základné imanie splatené v plnom rozsahu, teda 5000 eur (100%). Ak je zakladateľov viac, rozsah splatenia základného imania postačí vo výške 2500 eur."
    />
  </div>
  <!-- Spoločníci -->
  <FormKit id="repeater_spolocnici" name="members_spolocnici" type="repeater" label="Zakladatelia (Spoločníci)"
    v-model="zakladateliaSpolocnici.members"
    add-label="Pridať zakladateľa (spoločníka) +" :down-control="false" :up-control="false"
    #default="{ index, value }"
  >
    <FormKit type="select" name="typ_zakladatela" id="typ_zakladatela" label="Typ zakladateľa" placeholder="Vyberte typ zakladateľa"
        :options="[{value: 1, label: 'Fyzická osoba' }, {value: 2, label: 'Právnicka osoba' }]" validation="required" validation-visibility="dirty"
      />
    <div v-if="value.typ_zakladatela === 2" class="flex flex-col md:flex-row md:space-x-4">
      <FormKit type="text" name="obchodne_meno" label="Obchodné meno" validation="required" />
      <FormKit type="text" name="ico" label="IČO" validation="required" />
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <FormKit type="text" name="first_name" label="Krstné meno" validation="required|length:2" />
      <FormKit type="text" name="last_name" label="Priezvisko" validation="required|length:2" />
      <FormKit type="date" name="date_of_birth" autocomplete="date_of_birth" label="Dátum narodenia" validation="required|length:10" />
      <FormKit type="select" name="gender" label="Pohlavie" placeholder="Vyberte pohlavie"
        :options="['Muž','Žena']" validation="required" validation-visibility="dirty"
      />
      <FormKit type="select" name="typ_dokladu_totoznosti" label="Typ dokladu totožnosti" placeholder="Vyberte typ dokladu tožnosti"
        :options="['Občiansky preukaz','Cestovný pas','Vodičský preukaz']" validation="required" validation-visibility="dirty"
      />
      <FormKit type="text" name="cislo_dokladu_totoznosti" label="Číslo dokladu totožnosti" validation="required|length:5" />
      <FormKit type="text" name="title_before" label="Titul pred menom" />
      <FormKit type="text" name="title_after" label="Titul za menom" />
      <FormKit type="text" name="rodne_cislo" label="Rodné číslo" validation="required|length:10" />
      <FormKit type="select" name="country" label="Štát" placeholder="Vyberte štát"
        :options="['Slovensko','Česká republika']" validation="required" validation-visibility="dirty"
      />
      <FormKit type="text" name="city" label="Mesto" validation="required" />
      <FormKit type="text" name="psc" label="PSČ" validation="required" />
      <FormKit type="text" name="street" label="Ulica" validation="required" />
      <FormKit type="text" name="street_number" label="Súpisne číslo" validation="required" />
      <FormKit type="text" name="street_number2" label="Orientačné číslo" validation="required" />
    </div>
    <div class="my-4 grid grid-cols-2 md:grid-cols-3 gap-4">
      <FormKit type="number" name="vyska_vkladu" label="Výška vkladu €" validation="required" help="Zadajte hodnotu napr. 1000 alebo 0" />
      <FormKit type="number" name="podiel_v_spolocnosti" label="Podiel v spoločnosti %" validation="required" help="Zadajte hodnotu 0 - 100" />
      <FormKit type="number" name="rozsah_splatenia_vkladu" label="Rozsah splatenia vkladu €" validation="required" help="Zadajte hodnotu napr. 3000 alebo 0" />
    </div>
    <div>
      <FormKit type="checkbox" name="je_konatel" label="Tento zakladateľ (spoločník) bude aj konateľom" validation-visibility="dirty" />
      <FormKit type="checkbox" name="je_spravca_vkladu" :value="true" label="Tento zakladateľ (spoločník) bude aj správcom vkladu" validation-visibility="dirty" />
    </div>
  </FormKit>
  <!-- Konatelia -->
  <FormKit id="repeater_konatelia" name="members_konatelia" type="repeater" label="Konatelia"
    v-model="konatelia.members"
    add-label="Pridať konateľa +" :down-control="false" :up-control="false"
  >
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <FormKit type="text" name="first_name" label="Krstné meno" validation="required|length:2" />
      <FormKit type="text" name="last_name" label="Priezvisko" validation="required|length:2" />
      <FormKit type="date" name="date_of_birth" autocomplete="date_of_birth" label="Dátum narodenia" validation="required|length:10" />
      <FormKit type="select" name="gender" label="Pohlavie" placeholder="Vyberte pohlavie"
        :options="['Muž','Žena']" validation="required" validation-visibility="dirty"
      />
      <FormKit type="text" name="title_before" label="Titul pred menom" />
      <FormKit type="text" name="title_after" label="Titul za menom" />
      <FormKit type="text" name="rodne_cislo" label="Rodné číslo" validation="required|length:10" />
      <FormKit type="select" name="country" label="Štát" placeholder="Vyberte štát"
        :options="['Slovensko','Česká republika']" validation="required" validation-visibility="dirty"
      />
      <FormKit type="text" name="city" label="Mesto" validation="required" />
      <FormKit type="text" name="psc" label="PSČ" validation="required" />
      <FormKit type="text" name="street" label="Ulica" validation="required" />
      <FormKit type="text" name="street_number" label="Súpisne číslo" validation="required" />
      <FormKit type="text" name="street_number2" label="Orientačné číslo" validation="required" />
    </div>
  </FormKit>
  <div class="my-4">
    <FormKit v-model="companyOrZivnostModel.konecny_uzivatelia_vyhod" type="radio" label="Konečným užívateľom výhod sú" 
      :options="{ 1: 'Spoločníci/zakladatelia', 2: 'Iné osoby' }" name="konecny_uzivatelia_vyhod"
      validation="required"
    />
    <div v-if="companyOrZivnostModel.konecny_uzivatelia_vyhod == 2" class="mt-2">
      <FormKit
        type="textarea"
        label="Iné osoby"
        placeholder="Uveďte mená a priezviská, adresu bydliska, dátum narodenia, rodné číslo, číslo pasu alebo občianskeho preukazu."
        help="Uveďte mená a priezviská, adresu bydliska, dátum narodenia, rodné číslo, číslo pasu alebo občianskeho preukazu."
        rows="3"
      />
    </div>
  </div>
  <div class="my-4">
    <FormKit v-model="companyOrZivnostModel.sposob_konania_konatelov" type="radio" label="Spôsob konania konateľov"
      :options="
        {
          1: 'V mene spoločnosti koná a podpisuje každý konateľ samostatne',
          2: 'V mene spoločnosti konajú všetci konatelia spoločne',
          3: 'Iné'
        }"
      name="sposob_konania_konatelov"
      validation="required"
    />
    <div v-if="companyOrZivnostModel.sposob_konania_konatelov == 3" class="mt-2">
      <FormKit
        type="textarea"
        label="Iný spôsov konania konateľov"
        rows="3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type Company from '@/types/Company';
import { onBeforeMount } from 'vue';
import { ref } from 'vue';

onBeforeMount( () => {
  
})

let companyOrZivnostModel = ref({
  name: '',
  ico: '',
  dic: '',
  icdph: '',
  headquarters_id: 0,
  imanie_vyska: 0,
  imanie_splatene: 0,
  is_dph: false,
  zaciatok_opravnenia: '',
  konecny_uzivatelia_vyhod: 0,
  sposob_konania_konatelov: 0,
  owner: 0,
  note: '',
  type: 1, // type 1 sro, type 2 živnosť
  status: 2, // Zakladanie spoločnosti je v priebehu
  subjects_of_business: [{
    id: '',
    title: '',
    price: 0,
    description: '',
    category_id: 0
  }]
})

let zakladateliaSpolocnici = ref({
  members: [{
    company_id: 0,
    obchodne_meno: '',
    ico: '',
    typ_zakladatela: 0, // 1 Fyz Osoba, 2 Prav Osoba
    first_name: '',
    last_name: '',
    title_before: '',
    title_after: '',
    gender: '',
    date_of_birth: '',
    rodne_cislo: '',
    street: '',
    street_number: '',
    street_number2: '',
    city: '',
    psc: '',
    country: '',
    typ_dokladu_totoznosti: '',
    cislo_dokladu_totoznosti: '',
    vyska_vkladu: 0,
    podiel_v_spolocnosti: 0,
    rozsah_splatenia_vkladu: 0,
    je_spravca_vkladu: true,
    je_zakladatel: false,
    je_konatel: false
  }]
})

let konatelia = ref({
  members: [{
    company_id: 0,
    first_name: '',
    last_name: '',
    title_before: '',
    title_after: '',
    gender: '',
    date_of_birth: '',
    rodne_cislo: '',
    street: '',
    street_number: '',
    street_number2: '',
    city: '',
    psc: '',
    country: '',
    je_konatel: true
  }]
})

defineExpose({
  companyOrZivnostModel,
  zakladateliaSpolocnici,
  konatelia
})

</script>