<template>
  <div class="text-4xl font-bold">Vyplňte údaje o spoločnosti</div>
  <div class="mt-2 mb-6">vyplňte zakladne údaje a pridajte zakladateľov (spoločnikov) a konateľov.</div>
  
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <FormKit type="text" name="name" v-model="companyOrZivnostModel.name" label="Názov spoločnosti" />
    <FormKit type="select" name="pravnaForma" label="Právna forma" placeholder="Vybrať" v-model="pravnaForma"
      :options="['s. r. o.',', s. r. o.',', spol. s r. o.']" validation="required" validation-visibility="dirty"
    />
  </div>
  <h2 class="text-xl my-4">Základné imanie </h2>
  <div class="grid grid-cols-3 gap-4 my-4">
    <FormKit type="number" name="vyska" label="Výška €" validation="required|min:5000" v-model="companyOrZivnostModel.imanie_vyska"
    help="Od 1.1.2016 finančné prostriedky do výšky 5000 eur nemusia byť vkladané ná účet v banke. Minimálna výška základného imania pri s.r.o. je podľa zákona 5000,- Eur. Môžete zadať aj viac."
    />
    <FormKit type="number" name="rozsah_splatenia" label="Rozsah splatenia €" validation="required" v-model="companyOrZivnostModel.imanie_splatene"
      help="Od 1.1.2016 finančné prostriedky do výšky 5000 eur nemusia byť vkladané ná účet v banke. V prípade jediného zakladateľa musí byť základné imanie splatené v plnom rozsahu, teda 5000 eur (100%). Ak je zakladateľov viac, rozsah splatenia základného imania postačí vo výške 2500 eur."
    />
  </div>

  <!-- Custom inputs -->
  <div class="flex items-center justify-between">
    <h2 class="text-2xl">Zakladatelia (Spoločníci)</h2>
    <button
      @click.prevent="addItem('zakladatelia')"
      class="text-white font-semibold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
    >
      Pridať zakladateľa
    </button>
  </div>
  <template v-if="zakladateliaSpolocniciList.length === 0">
    <div class="font-bold">Zatiaľ nebol pridaný žiadný zakladateľ (spoločník).</div>
  </template>
  <template v-else>
    <div class="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
      <table class="min-w-full divide-y divide-bizinix-border">
        <thead class="bg-gray-950">
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">Meno a priezvisko</th>
            <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell">Vklad</th>
            <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold sm:table-cell">Podiel</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">Konaťel</th>
            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">Upraviť</th>
            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">Odobrať</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-teal-900 bg-gray-800">
          <tr v-for="(item, index) in zakladateliaSpolocniciList" :key="index">
            <td class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-6">
              {{ item.first_name }} {{ item.last_name }}
              <!-- Stacked "column" for mobile -->
              <dl class="font-normal lg:hidden">
                <dt class="sr-only">Vklad</dt>
                <dd>{{ item.vyska_vkladu }} €</dd>
                <dt class="sr-only sm:hidden">Podiel</dt>
                <dd class="mt-1 truncate sm:hidden">{{ item.podiel_v_spolocnosti }} %</dd>
              </dl>
            </td>
            <td class="hidden px-3 py-4 text-sm lg:table-cell">{{ item.vyska_vkladu }} €</td>
            <td class="hidden px-3 py-4 text-sm sm:table-cell">{{ item.podiel_v_spolocnosti }} %</td>
            <td class="px-3 py-4 text-sm">{{ item.je_konatel }}</td>
            <td class="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
              <button class="flex items-center justify-center w-full" @click.prevent="editItem(index, 'zakladatelia')"><PencilIcon class="h-5 w-5" aria-hidden="true" /></button>
            </td>
            <td class="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
              <button class="flex items-center justify-center w-full" @click.prevent="confirmRemoveItem(index, 'zakladatelia')"><XIcon class="h-5 w-5" aria-hidden="true" /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <!-- <button @click.prevent="logValueForZakladatelia">Log for list zakladatelia.</button> -->
  <div class="flex items-center justify-between mt-6">
      <h2 class="text-2xl">Konatelia</h2>
      <button
        @click.prevent="addItem('konatelia')"
        class="text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
      >
        Pridať konateľa
      </button>
  </div>
  <template v-if="konateliaList.length === 0">
    <div class="font-semibold">Zatiaľ nebol pridaný žiadný konateľ.</div>
  </template>
  <template v-else>
    <div class="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
      <table class="min-w-full divide-y divide-bizinix-border">
        <thead class="bg-gray-950">
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">Meno a priezvisko</th>
            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">Upraviť</th>
            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">Odobrať</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-teal-900 bg-gray-800">
          <tr v-for="(item, index) in konateliaList" :key="index">
            <td class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-6">
              {{ item.first_name }} {{ item.last_name }}
              <!-- Stacked "column" for mobile -->
              <dl class="font-normal lg:hidden">
              </dl>
            </td>
            <td class="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
              <button :disabled="item.je_konatel" class="flex items-center justify-center w-full" @click.prevent="editItem(index, 'konatelia')"><PencilIcon class="h-5 w-5" aria-hidden="true" /></button>
            </td>
            <td class="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
              <button class="flex items-center justify-center w-full" @click.prevent="confirmRemoveItem(index, 'konatelia')"><XIcon class="h-5 w-5" aria-hidden="true" /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
    <!-- <ul>
      <li v-for="(item, index) in zakladateliaSpolocniciList" :key="index">
        {{ item.first_name }} {{ item.last_name }} {{ item.je_konatel }}
        <button
          @click.prevent="editItem(index, 'zakladatelia')">Upraviť</button> | 
        <button @click.prevent="confirmRemoveItem(index, 'zakladatelia')">Odobrať</button>
      </li>
    </ul> -->

    <!-- <ul>
      <li v-for="(item, index) in konateliaList" :key="index">
        {{ item.first_name }} {{ item.last_name }}
        <button :disabled="item.addedFromZakladatelia" @click.prevent="editItem(index, 'konatelia')">Upraviť</button>
        <button @click.prevent="confirmRemoveItem(index, 'konatelia')">Odobrať</button>
      </li>
    </ul> -->
    <!-- <button @click.prevent="logValueForKonatelia">Log for list konatelia.</button> -->

    
    <!-- Modal for Edit -->

    <VueFinalModal
      :modal-id="modalIdAddOrEdit"
      display-directive="if"
      :clickToClose="false"
      :escToClose="false"
      :lockscroll="true"
      class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
      content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
    >
      <h1 class="text-white text-2xl">
        {{ titleModalText }}
      </h1>
      <!-- <button @click.prevent="logNewItemVal" class="text-white">LogNewItemVal</button> -->
        <!-- Spoločníci -->
        <template v-if="currentOperation.type === 'add' || currentOperation.type=== 'edit'">
          <FormKit id="group_spolocnici" name="members_spolocnici"
            type="group"
            #default="{ index, value }"
            v-model="newItem"
          >
            <FormKit type="select" name="typ_zakladatela" id="typ_zakladatela" label="Typ zakladateľa" placeholder="Vyberte typ zakladateľa"
                :options="[{value: 1, label: 'Fyzická osoba' }, {value: 2, label: 'Právnicka osoba' }]" validation="required" validation-visibility="dirty"
              />
            <div v-if="value.typ_zakladatela === 2" class="flex flex-col md:flex-row md:space-x-4">
              <FormKit type="text" name="obchodne_meno" label="Obchodné meno" validation="required" />
              <FormKit type="text" name="ico" label="IČO" validation="required" />
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormKit type="text" name="first_name" v-model="newItem.first_name" label="Krstné meno" validation="required|length:2" />
              <FormKit type="text" name="last_name" v-model="newItem.last_name" label="Priezvisko" validation="required|length:2" />
              <FormKit type="date" style="color-scheme: dark;" name="date_of_birth" autocomplete="date_of_birth" label="Dátum narodenia" validation="required|length:10" />
              <FormKit type="select" name="gender" label="Pohlavie" placeholder="Vyberte pohlavie"
                :options="['Muž','Žena']" validation="required" validation-visibility="dirty"
              />
              <FormKit type="select" name="typ_dokladu_totoznosti" label="Typ dokladu totožnosti" placeholder="Vyberte typ dokladu tožnosti"
                :options="['Občiansky preukaz','Cestovný pas','Vodičský preukaz']" validation="required" validation-visibility="dirty"
              />
              <FormKit type="text" name="cislo_dokladu_totoznosti" label="Číslo dokladu totožnosti" validation="required|length:5" />
              <FormKit type="text" name="title_before_zakladatel" label="Titul pred menom" />
              <FormKit type="text" name="title_after_zakladatel" label="Titul za menom" />
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
      </template>
      <template v-else>
        <div class="text-white py-4">
          Naozaj si prajete odstrániť zakladateľa?          
        </div>
      </template>
      <!-- <div class="text-white">Is form value in main {{ isFormValid }}</div> -->
      <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
        <button class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded" @click.prevent="() => vfm.closeAll()">
          Zrušiť
        </button>
        <button :disabled="!isFormValid" class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded" @click.prevent="closeAndSaveOrDeleteOrEditModal">
          {{ buttonModalText }}
          </button>
      </div>
    </VueFinalModal>

  <!-- Konatelia -->
  <!-- <FormKit id="group_konatelia" name="members_konatelia"
    type="group"
    v-model="konateliaList"
    :config="{ validationVisibility: 'live' }"
    #default="{ index, value }"
  >
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <FormKit type="text" name="first_name" label="Krstné meno" validation="required|length:2" />
      <FormKit type="text" name="last_name" label="Priezvisko" validation="required|length:2" />
      <FormKit type="date" style="color-scheme: dark;" name="date_of_birth" autocomplete="date_of_birth" label="Dátum narodenia" validation="required|length:10" />
      <FormKit type="select" name="gender" label="Pohlavie" placeholder="Vyberte pohlavie"
        :options="['Muž','Žena']" validation="required" validation-visibility="dirty"
      />
      <FormKit type="text" name="title_before_konatel" label="Titul pred menom" />
      <FormKit type="text" name="title_after_konatel" label="Titul za menom" />
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
  </FormKit> -->

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
import { onBeforeMount, onMounted, reactive } from 'vue';
import { ref, toRef } from 'vue';
import { PencilIcon, XIcon } from '@heroicons/vue/outline'
import { useVfm, VueFinalModal } from 'vue-final-modal'
import { getNode } from '@formkit/core'

const vfm = useVfm()
const modalIdAddOrEdit = Symbol('modalIdAddOrEdit')
const buttonModalText = ref<string>()
const titleModalText = ref<string>()
let isFormValid = false
const pravnaForma = ref('');

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

let zakladateliaSpolocniciList = ref([
  {
    company_id: 0,
    obchodne_meno: '',
    ico: '',
    typ_zakladatela: 0, // 1 Fyz Osoba, 2 Prav Osoba
    first_name: 'xxx',
    last_name: 'gggg',
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
  }
])

let konateliaList = ref([
  {
    company_id: 0,
    first_name: 'konatelA' as string,
    last_name: 'konatelB' as string,
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
    je_konatel: true,
    addedFromZakladatelia: false
  }
])

const newItem = ref({
  company_id: 0 as number,
  obchodne_meno: '' as string,
  ico: ''  as string,
  typ_zakladatela: 0 as number, // 1 Fyz Osoba, 2 Prav Osoba
  first_name: 'NewItemFirstName' as string,
  last_name: 'NewItemLastName' as string,
  title_before: '' as string,
  title_after: '' as string,
  gender: '' as string,
  date_of_birth: '' as string,
  rodne_cislo: '' as string,
  street: '' as string,
  street_number: '' as string,
  street_number2: '' as string,
  city: '' as string,
  psc: '' as string,
  country: '' as string,
  typ_dokladu_totoznosti: '' as string,
  cislo_dokladu_totoznosti: '' as string,
  vyska_vkladu: 0 as number,
  podiel_v_spolocnosti: 0 as number,
  rozsah_splatenia_vkladu: 0 as number,
  je_spravca_vkladu: true as boolean,
  je_zakladatel: false as boolean,
  je_konatel: false as boolean
});

const currentOperation = reactive({
  type: null as string | null,
  list: null as string | null,
  index: null as number | null,
});

const selectedList = ref('zakladatelia');
const removeItemIndex = ref();

onBeforeMount( () => {
})

onMounted(() => {
  // const node = getNode('group_spolocnici');
  // if (!node) return;
  //isFormValid = toRef(node?.context?.state as object, 'valid' as never)
})

function editItem(index: number, list: string) {
  console.log("Edit item in list: " + list)
  console.log("Index for edit: " + index)
  buttonModalText.value = 'Upraviť'
  if (list === 'zakladatelia') {
    titleModalText.value = 'Upraviť zakladateľa (spoločníka)'
    newItem.value.first_name = zakladateliaSpolocniciList.value[index].first_name;
    newItem.value.last_name = zakladateliaSpolocniciList.value[index].last_name;
    newItem.value.je_konatel = zakladateliaSpolocniciList.value[index].je_konatel;
  } else if (list === 'konatelia') {
    titleModalText.value = 'Upraviť konateľa'
    newItem.value.first_name = konateliaList.value[index].first_name;
    newItem.value.last_name = konateliaList.value[index].last_name;
  }
  currentOperation.type = 'edit'
  currentOperation.list = list;
  currentOperation.index = index;
  vfm.open(modalIdAddOrEdit)?.then(() => {
    const node = getNode('group_spolocnici');
    if (!node) return;
    isFormValid = toRef(node.context?.state as object, 'valid' as never)
  });
  //modalVisible = setModal('modalForEdit', true)
  console.log("Finish edit");
}

function removeItem(list: string) {
  if (list === 'zakladatelia') {
    zakladateliaSpolocniciList.value.splice(currentOperation.index as number, 1);
  } else if (list === 'konatelia') {
    konateliaList.value.splice(currentOperation.index as number, 1);
  } else if (list === 'both') {
    zakladateliaSpolocniciList.value.splice(currentOperation.index as number, 1);
    konateliaList.value.splice(currentOperation.index as number, 1);
  }
    //modalVisible = setModal('modalForDeleteConfirmation', false);
    vfm.closeAll();
    currentOperation.type = null;
    currentOperation.list = null;
    currentOperation.index = null;
}

async function confirmRemoveItem(index: number, list: string) {
  isFormValid = true
  titleModalText.value = 'Potvrdenie odobratia'
  buttonModalText.value = 'Odobrať'
  currentOperation.type = 'delete';
  currentOperation.list = list;
  currentOperation.index = index;
  console.log("CurrentOperation: ", currentOperation)
  await vfm.open(modalIdAddOrEdit);
  //modalVisible = setModal('modalForDeleteConfirmation', true);

      // if (list === 'zakladatelia' && zakladateliaSpolocniciList.value[index].je_konatel) {
      //   modalVisible = setModal('modalForDeleteConfirmation', true);
      //   removeItemIndex.value = index;
      // } else if (list === 'konatelia' && konateliaList.value[index].addedFromZakladatelia) {
      //   modalVisible = setModal('modalForDeleteConfirmation', true);
      //   removeItemIndex.value = index;
      // } else {
      //   removeItem(index, list);
      // }
}

async function addItem(list: string) {
  console.log("CurrentOperation:", currentOperation)
  currentOperation.type = 'add';
  currentOperation.list = list;
  if(list == 'zakladatelia'){
    titleModalText.value = 'Nový zakladateľ (spoločník)'
  } else {
    titleModalText.value = 'Nový Konateľ'
  }
  buttonModalText.value = 'Pridať'
  await vfm.open(modalIdAddOrEdit)?.then(() => {
    const node = getNode('group_spolocnici');
    if (!node) return;
    isFormValid = toRef(node.context?.state as object, 'valid' as never)
  });
}

function saveItem() {
  if (currentOperation.list === 'zakladatelia') {
    if(currentOperation.type === 'edit'){
      zakladateliaSpolocniciList.value[currentOperation.index as number].first_name = newItem.value.first_name
      zakladateliaSpolocniciList.value[currentOperation.index as number].last_name = newItem.value.last_name
      zakladateliaSpolocniciList.value[currentOperation.index as number].je_konatel = newItem.value.je_konatel
    } else {        
      zakladateliaSpolocniciList.value.push({
        company_id: 0,
        obchodne_meno: '',
        ico: '',
        typ_zakladatela: 0, // 1 Fyz Osoba, 2 Prav Osoba
        first_name: newItem.value.first_name,
        last_name: newItem.value.last_name,
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
        je_zakladatel: true,
        je_konatel: newItem.value.je_konatel,
      });
      if (newItem.value.je_konatel) {
        konateliaList.value.push({
          company_id: 0,
          first_name: newItem.value.first_name,
          last_name: newItem.value.last_name,
          title_before: newItem.value.title_before,
          title_after: newItem.value.title_after,
          gender: newItem.value.gender,
          date_of_birth: newItem.value.date_of_birth,
          rodne_cislo: newItem.value.rodne_cislo,
          street: newItem.value.street,
          street_number: newItem.value.street_number,
          street_number2: newItem.value.street_number2,
          city: newItem.value.city,
          psc: newItem.value.psc,
          country: newItem.value.country,
          je_konatel: newItem.value.je_konatel,
          addedFromZakladatelia: true
        });
      }
    }
  } else if (currentOperation.list === 'konatelia') {

    if(currentOperation.type === 'edit'){
      konateliaList.value[currentOperation.index as number].first_name = newItem.value.first_name
      konateliaList.value[currentOperation.index as number].last_name = newItem.value.last_name
    } else {
      konateliaList.value.push({
        company_id: 0,
        first_name: newItem.value.first_name,
        last_name: newItem.value.last_name,
        title_before: newItem.value.title_before,
        title_after: newItem.value.title_after,
        gender: newItem.value.gender,
        date_of_birth: newItem.value.date_of_birth,
        rodne_cislo: newItem.value.rodne_cislo,
        street: newItem.value.street,
        street_number: newItem.value.street_number,
        street_number2: newItem.value.street_number2,
        city: newItem.value.city,
        psc: newItem.value.psc,
        country: newItem.value.country,
        je_konatel: newItem.value.je_konatel,
        addedFromZakladatelia: false
      });
    }
  }
  closeAndSaveOrDeleteOrEditModal();
  //modalVisible = setModal('modalForEdit', false)
  currentOperation.type = null
  currentOperation.list = null
  currentOperation.index = null
}


function closeAndSaveOrDeleteOrEditModal() {
  vfm.close(modalIdAddOrEdit)?.then(() => {
    if(currentOperation.type === 'delete'){
      removeItem(currentOperation.list as string)
    } else {
      saveItem()
    }
  })
}

function logValueForZakladatelia(){
  console.log(companyOrZivnostModel.value)
  console.log(currentOperation)
  console.log("Zakladatelia list")
  console.log(zakladateliaSpolocniciList.value)
  console.log("NewItem")
  console.log(newItem.value)
}

  
function logValueForKonatelia(){
  console.log(currentOperation)
  console.log("Konatelia list")
  console.log(konateliaList.value.length)
  console.log("NewItem")
  console.log(newItem.value)
}

function logNewItemVal(){
  console.log(currentOperation)
  console.log(newItem.value)
  //const node = getNode('group_spolocnici')
  //isFormValid = toRef(node?.context?.state as object, 'valid' as never)
  //console.log(isFormValid)
  //console.log(getNode('group_spolocnici')?.context?.state)
  console.log(isFormValid)
}

function logNodeFromKonatelia(){
  //console.log(getNode('group_konatelia')?.context?.state)
}

defineExpose({
  companyOrZivnostModel,
  pravnaForma,
  zakladateliaSpolocniciList,
  konateliaList
})

</script>