<template>
  <div class="text-4xl font-bold">Vyplňte údaje o spoločnosti</div>
  <div class="mt-2 mb-6">vyplňte zakladne údaje a pridajte zakladateľov (spoločnikov) a konateľov.</div>

  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <FormKit type="text" name="name" v-model="companyOrZivnostModel.name" label="Názov spoločnosti"
      validation="required" />
    <FormKit type="select" name="pravnaForma" label="Právna forma" placeholder="Vybrať" v-model="pravnaForma"
      :options="['s. r. o.', ', s. r. o.', ', spol. s r. o.']" validation="required" />
  </div>
  <h2 class="text-xl my-4">Základné imanie </h2>
  <div class="grid grid-cols-3 gap-4 my-4">
    <FormKit type="number" name="vyska" label="Výška €" validation="required|min:5000"
      v-model="companyOrZivnostModel.imanie_vyska"
      help="Od 1.1.2016 finančné prostriedky do výšky 5000 eur nemusia byť vkladané ná účet v banke. Minimálna výška základného imania pri s.r.o. je podľa zákona 5000,- Eur. Môžete zadať aj viac." />
    <FormKit type="number" name="rozsah_splatenia" label="Rozsah splatenia €" validation="required"
      v-model="companyOrZivnostModel.imanie_splatene"
      help="Od 1.1.2016 finančné prostriedky do výšky 5000 eur nemusia byť vkladané ná účet v banke. V prípade jediného zakladateľa musí byť základné imanie splatené v plnom rozsahu, teda 5000 eur (100%). Ak je zakladateľov viac, rozsah splatenia základného imania postačí vo výške 2500 eur." />
  </div>

  <!-- Custom inputs -->
  <div class="flex items-center justify-between">
    <h2 class="text-2xl">Zakladatelia (Spoločníci)</h2>
    <button @click.prevent="addItem('zakladatelia')"
      class="text-white font-semibold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded">
      Pridať zakladateľa
    </button>
  </div>
  <!-- Zakladatelia table -->
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
            <td class="px-3 py-4 text-sm">{{ item.je_konatel ? 'Áno' : 'Nie' }}</td>
            <td class="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
              <button class="flex items-center justify-center w-full" @click.prevent="editItem(index, 'zakladatelia')">
                <PencilIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </td>
            <td class="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
              <button class="flex items-center justify-center w-full"
                @click.prevent="confirmRemoveItem(index, 'zakladatelia')">
                <XMarkIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <!-- <button @click.prevent="logValueForZakladatelia">Log for list zakladatelia.</button> -->
  <div class="flex items-center justify-between mt-6">
    <h2 class="text-2xl">Konatelia</h2>
    <button @click.prevent="addItem('konatelia')"
      class="text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded">
      Pridať konateľa
    </button>
  </div>
  <!-- Konatelia table -->
  <template v-if="konateliaList.length === 0">
    <div class="font-semibold">Zatiaľ nebol pridaný žiadný konateľ.</div>
  </template>
  <div v-if="countOfKonatelia == 0 || countOfZakladatelia == 0"
    class="my-4 flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
    <b>Prosím pridajte minimálne jedného zakladateľa alebo konateľa spoločnosťi.</b>
  </div>
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
              <button :disabled="item.addedFromZakladatelia"
                class="flex items-center justify-center w-full disabled:text-gray-500"
                @click.prevent="editItem(index, 'konatelia')">
                <PencilIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </td>
            <td class="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
              <button :disabled="item.addedFromZakladatelia"
                class="flex items-center justify-center w-full disabled:text-gray-500"
                @click.prevent="confirmRemoveItem(index, 'konatelia')">
                <XMarkIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <!-- <button @click.prevent="logValueForKonatelia">Log for list konatelia.</button> -->
  <!-- Modal for Add/Edit/Remove -->
  <VueFinalModal :modal-id="modalIdAddOrEdit" display-directive="if" :clickToClose="false" :escToClose="false"
    :lockscroll="true" class="block md:flex md:justify-center overflow-auto"
    content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2 overflow-auto h-fit">
    <h1 class="text-white text-2xl">
      {{ titleModalText }}
    </h1>
    <button @click.prevent="isRodneCisloUnique" class="text-white">LogNewItemVal</button>
    <!-- Group form for Spoločníci and Konatelia -->
    <template v-if="currentOperation.type === 'add' || currentOperation.type === 'edit'">
      <FormKit id="group_spolocnici" name="members_spolocnici" type="group" #default="{ index, value }"
        :config="{ validationVisibility: 'live' }" v-model="newItem">
        <FormKit v-if="currentOperation.list === 'zakladatelia'" type="select" name="typ_zakladatela"
          label="Typ zakladateľa" placeholder="Vyberte typ zakladateľa"
          :options="[{ value: 1, label: 'Fyzická osoba' }, { value: 2, label: 'Právnicka osoba' }]"
          validation="required" />
        <div v-if="value.typ_zakladatela === 2" class="flex flex-col md:flex-row md:space-x-4">
          <FormKit type="text" name="obchodne_meno" label="Obchodné meno" validation="required" />
          <FormKit type="text" name="ico" label="IČO" validation="required" />
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormKit type="text" name="first_name" label="Krstné meno" validation="required|length:2" />
          <FormKit type="text" name="last_name" label="Priezvisko" validation="required|length:2" />
          <FormKit type="date" style="color-scheme: dark;" name="date_of_birth" autocomplete="date_of_birth"
            label="Dátum narodenia" validation="required|length:10" />
          <FormKit type="select" name="gender" label="Pohlavie" placeholder="Vyberte pohlavie" :options="['Muž', 'Žena']"
            validation="required" />
          <FormKit type="text" name="nationality" label="Štátna príslušnosť " validation="required|length:2" />
          <FormKit type="select" name="typ_dokladu_totoznosti" label="Typ dokladu totožnosti" validation-visibility="live"
            placeholder="Vyberte typ dokladu tožnosti" :options="['Občiansky preukaz', 'Cestovný pas', 'Vodičský preukaz']"
            validation="required" />
          <FormKit type="text" name="cislo_dokladu_totoznosti" label="Číslo dokladu totožnosti"
            validation="required|length:5" />
          <FormKit type="text" name="title_before" label="Titul pred menom" />
          <FormKit type="text" name="title_after" label="Titul za menom" />
          <FormKit type="text" name="rodne_cislo" label="Rodné číslo" id="rodne_cislo"
            :validation-rules="{ isRodneCisloUnique }" validation="required|length:9|isRodneCisloUnique"
            :validation-messages="{ isRodneCisloUnique: 'Rodne číslo sa už používa!' }" />
          <FormKit type="select" name="country" label="Štát" placeholder="Vyberte štát"
            :options="['Slovensko', 'Česká republika']" validation="required" />
          <FormKit type="text" name="city" label="Mesto" validation="required" />
          <FormKit type="text" name="psc" label="PSČ" validation="required" />
          <FormKit type="text" name="street" label="Ulica" validation="required" />
          <FormKit type="text" name="street_number" label="Súpisne číslo" validation="required" />
          <FormKit type="text" name="street_number2" label="Orientačné číslo" validation="required" />
        </div>
        <div v-if="currentOperation.list === 'zakladatelia'">
          <div class="my-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormKit type="number" name="vyska_vkladu" label="Výška vkladu €" validation="required|min:750"
              help="Zadajte hodnotu napr. 1000 alebo 0" />
            <FormKit type="number" name="podiel_v_spolocnosti" label="Podiel v spoločnosti %" validation="required"
              help="Zadajte hodnotu 0 - 100" />
            <FormKit type="number" name="rozsah_splatenia_vkladu" label="Rozsah splatenia vkladu €" validation="required"
              help="Zadajte hodnotu napr. 3000 alebo 0" />
          </div>
          <div>
            <FormKit type="checkbox" name="je_konatel" label="Tento zakladateľ (spoločník) bude aj konateľom" />
            <FormKit type="checkbox" name="je_spravca_vkladu" :value="true"
              label="Tento zakladateľ (spoločník) bude aj správcom vkladu" />
          </div>
        </div>
      </FormKit>
    </template>
    <template v-else>
      <div v-if="currentOperation.list === 'zakladatelia'" class="text-white py-4">
        Naozaj si prajete odobrať zakladateľa?
      </div>
      <div v-else class="text-white py-4">
        Naozaj si prajete odobrať konateľa?
      </div>
    </template>
    <!-- <div class="text-white">Is form value in main {{ isFormValid }}</div> -->
    <div class="text-white">Rod. cislo: {{ rodneCislo.cislo }}</div>
    <div v-if="!isFormValid.valid" class="text-red-700 p-1 text-center text-lg rounded font-bold bg-red-50">
      Prosím vyplnte všetky povinné polia.
    </div>
    <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
      <button
        class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
        @click.prevent="() => vfm.closeAll()">
        Zrušiť
      </button>
      <button :disabled="!isFormValid.valid"
        class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
        @click.prevent="closeAndSaveOrDeleteOrEditModal">
        {{ buttonModalText }}
      </button>
    </div>
  </VueFinalModal>
  <div class="my-4">
    <FormKit v-model="companyOrZivnostModel.konecny_uzivatelia_vyhod" type="radio" label="Konečným užívateľom výhod sú"
      :options="{ 1: 'Spoločníci/zakladatelia', 2: 'Iné osoby' }" name="konecny_uzivatelia_vyhod" validation="required" />
    <div v-if="companyOrZivnostModel.konecny_uzivatelia_vyhod == 2" class="mt-2">
      <FormKit type="textarea" label="Iné osoby"
        placeholder="Uveďte mená a priezviská, adresu bydliska, dátum narodenia, rodné číslo, číslo pasu alebo občianskeho preukazu."
        help="Uveďte mená a priezviská, adresu bydliska, dátum narodenia, rodné číslo, číslo pasu alebo občianskeho preukazu."
        rows="3" />
    </div>
  </div>
  <div class="my-4">
    <FormKit v-model="companyOrZivnostModel.sposob_konania_konatelov" type="radio" label="Spôsob konania konateľov"
      :options="{
          1: 'V mene spoločnosti koná a podpisuje každý konateľ samostatne',
          2: 'V mene spoločnosti konajú všetci konatelia spoločne',
          3: 'Iné'
        }" name="sposob_konania_konatelov" validation="required" />
    <div v-if="companyOrZivnostModel.sposob_konania_konatelov == 3" class="mt-2">
      <FormKit type="textarea" label="Iný spôsov konania konateľov" rows="3" />
    </div>

  </div>
  Počet pridaných konatelov {{ countOfKonatelia }}
  Počet pridaných zakladatelov {{ countOfZakladatelia }}
</template>

<script setup lang="ts">
import type Company from '@/types/Company';
import { onBeforeMount, onMounted, reactive, watch, type Ref } from 'vue';
import { ref, toRef } from 'vue';
import { PencilIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useVfm, VueFinalModal } from 'vue-final-modal'
import { getNode } from '@formkit/core'
import type CompanyMemberKonatel from '@/types/CompanyMemberKonatel';
import type CompanyMemberSpolocnik from '@/types/CompanyMemberSpolocnik';
import { computed } from 'vue';

const vfm = useVfm()
const modalIdAddOrEdit = Symbol('modalIdAddOrEdit')
const buttonModalText = ref<string>()
const titleModalText = ref<string>()
const isFormValid = ref({
  valid: false
})
const rodneCislo = ref({
  cislo: ''
});
const pravnaForma = ref('s. r. o.');

const countOfZakladatelia = computed(() => {
  return zakladateliaSpolocniciList.value.length
})

const countOfKonatelia = computed(() => {
  return konateliaList.value.length
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
  konecny_uzivatelia_vyhod: 1,
  sposob_konania_konatelov: 1,
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

let zakladateliaSpolocniciList: Ref<CompanyMemberSpolocnik[]> = ref<CompanyMemberSpolocnik[]>([])
let konateliaList: Ref<CompanyMemberKonatel[]> = ref<CompanyMemberKonatel[]>([])

function getDefaultNewItem(): CompanyMemberSpolocnik | CompanyMemberKonatel {
  return {
    company_id: null,
    ico: '',
    typ_zakladatela: null,
    obchodne_meno: '',
    first_name: '',
    last_name: '',
    title_before: '',
    title_after: '',
    gender: '',
    nationality: '',
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
    vyska_vkladu: null,
    podiel_v_spolocnosti: null,
    rozsah_splatenia_vkladu: null,
    je_spravca_vkladu: true,
    je_zakladatel: false,
    je_konatel: false,
    addedFromZakladatelia: false
  };
}

const newItem: Ref<CompanyMemberSpolocnik | CompanyMemberKonatel> = ref<CompanyMemberSpolocnik | CompanyMemberKonatel>(getDefaultNewItem());

function resetNewItem() {
  newItem.value = getDefaultNewItem();
}

const currentOperation = reactive({
  type: null as string | null,
  list: null as string | null,
  index: null as number | null,
});

onBeforeMount(() => {

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
    newItem.value = zakladateliaSpolocniciList.value[index] as CompanyMemberSpolocnik
  } else if (list === 'konatelia') {
    titleModalText.value = 'Upraviť konateľa'
    newItem.value = konateliaList.value[index] as CompanyMemberKonatel
  }
  currentOperation.type = 'edit'
  currentOperation.list = list;
  currentOperation.index = index;
  vfm.open(modalIdAddOrEdit)?.then(() => {
    const node = getNode('group_spolocnici');
    if (!node) return;
    isFormValid.value.valid = toRef(node.context?.state, 'valid')
    rodneCislo.value.cislo = toRef(getNode('rodne_cislo'), 'value')
  });

  console.log("Finish edit");
}

function removeItem(list: string) {
  if (list === 'zakladatelia') {
    if (currentOperation.index !== null) {
      const index = currentOperation.index as number;
      // store removed item
      const removedItem = zakladateliaSpolocniciList.value[index];
      zakladateliaSpolocniciList.value.splice(index, 1);

      // find and remove item from konateliaList
      const konateliaIndex = konateliaList.value.findIndex(item => item.rodne_cislo === removedItem.rodne_cislo);
      if (konateliaIndex !== -1) {
        konateliaList.value.splice(konateliaIndex, 1);
      }
    }
  } else if (list === 'konatelia') {
    if (currentOperation.index !== null) {
      const index = currentOperation.index as number;
      konateliaList.value.splice(index, 1);
    }
  }

  vfm.closeAll();
  currentOperation.type = null;
  currentOperation.list = null;
  currentOperation.index = null;
}


async function confirmRemoveItem(index: number, list: string) {
  titleModalText.value = 'Potvrdenie odobratia'
  buttonModalText.value = 'Odobrať'
  currentOperation.type = 'delete';
  currentOperation.list = list;
  currentOperation.index = index;
  console.log("CurrentOperation: ", currentOperation)
  await vfm.open(modalIdAddOrEdit);
}

function addItem(list: string) {

  currentOperation.type = 'add';
  currentOperation.list = list;
  console.log("CurrentOperation:", currentOperation)
  if (list == 'zakladatelia') {
    titleModalText.value = 'Nový zakladateľ (spoločník)'
  } else {
    titleModalText.value = 'Nový Konateľ'
  }
  buttonModalText.value = 'Pridať'

  vfm.open(modalIdAddOrEdit)?.then(() => {
    // Reset newItem after opening the modal
    resetNewItem()
    console.log("BeforeNode")
    const node = getNode('group_spolocnici');
    console.log("Nodeeeee: ", node)
    if (!node) return;
    isFormValid.value.valid = toRef(node.context?.state, 'valid')
    console.log("After Form node")
    console.log("isFormValid? ", isFormValid.value.valid)
    rodneCislo.value.cislo = toRef(getNode('rodne_cislo'), 'value')
    //rodneCislo.value = getNode('rodne_cislo')
  });

}

function saveItem() {
  if (currentOperation.list === 'zakladatelia') {
    if (currentOperation.type === 'edit') {
      zakladateliaSpolocniciList.value[currentOperation.index as number] = newItem.value as CompanyMemberSpolocnik;
      // check if je_konatel is false
      if (!newItem.value.je_konatel) {
        // find and remove item from konateliaList
        const index = konateliaList.value.findIndex(item => item.rodne_cislo === newItem.value.rodne_cislo);
        if (index !== -1) {
          konateliaList.value.splice(index, 1);
        }
      } else {
        // check if item is already in konateliaList
        const index = konateliaList.value.findIndex(item => item.rodne_cislo === newItem.value.rodne_cislo);
        if (index === -1) {
          // add item to konateliaList
          (newItem.value as CompanyMemberKonatel).addedFromZakladatelia = true;
          konateliaList.value.push(newItem.value as CompanyMemberKonatel);
        } else {
          // update item in konateliaList
          konateliaList.value[index] = newItem.value as CompanyMemberKonatel;
        }
      }
    } else {
      zakladateliaSpolocniciList.value.push(newItem.value as CompanyMemberSpolocnik);
      if (newItem.value.je_konatel) {
        (newItem.value as CompanyMemberKonatel).addedFromZakladatelia = true
        konateliaList.value.push(newItem.value as CompanyMemberKonatel);
      }
    }
  } else if (currentOperation.list === 'konatelia') {
    if (currentOperation.type === 'edit') {
      //(newItem.value as CompanyMemberKonatel).addedFromZakladatelia = false
      konateliaList.value[currentOperation.index as number] = newItem.value as CompanyMemberKonatel
    } else {
      //(newItem.value as CompanyMemberKonatel).addedFromZakladatelia = false
      konateliaList.value.push(newItem.value as CompanyMemberKonatel);
    }
  }

  closeAndSaveOrDeleteOrEditModal();

  currentOperation.type = null
  currentOperation.list = null
  currentOperation.index = null
}


function closeAndSaveOrDeleteOrEditModal() {
  vfm.close(modalIdAddOrEdit)?.then(() => {
    if (currentOperation.type === 'delete') {
      removeItem(currentOperation.list as string)
    } else {
      saveItem()
    }
  })
}

async function isRodneCisloUnique(node: any) {

  console.log("Konatelia: ", konateliaList.value)
  console.log("Zakladatelia: ", zakladateliaSpolocniciList.value)

  if (currentOperation.type === 'add') {
    console.log("Som v Add");
    const count = zakladateliaSpolocniciList.value.filter(item => item.rodne_cislo === node.value as string).length;
    console.log("Count is: ", count)
    if (count) {
      console.log("Rodne cislo nie je uniq")
      return false
    } else {
      console.log("Rodne cislo JE uniq")
      return true
    }
  } else {
    return true
  }

}

function logValueForZakladatelia() {
  console.log(companyOrZivnostModel.value)
  console.log(currentOperation)
  console.log("Zakladatelia list")
  console.log(zakladateliaSpolocniciList.value)
  console.log("NewItem")
  console.log(newItem.value)
}


function logValueForKonatelia() {
  console.log(currentOperation)
  console.log("Konatelia list")
  console.log(konateliaList.value.length)
  console.log("NewItem")
  console.log(newItem.value)
}

function logNewItemVal() {
  console.log(currentOperation)
  console.log(newItem.value)
  //const node = getNode('group_spolocnici')
  //isFormValid = toRef(node?.context?.state as object, 'valid' as never)
  //console.log(isFormValid)
  //console.log(getNode('group_spolocnici')?.context?.state)
  console.log(isFormValid.value.valid)
}

function logNodeFromKonatelia() {
  //console.log(getNode('group_konatelia')?.context?.state)
}

defineExpose({
  companyOrZivnostModel,
  pravnaForma,
  zakladateliaSpolocniciList,
  konateliaList,
  countOfKonatelia,
  countOfZakladatelia
})

</script>