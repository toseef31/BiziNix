<template>
  <div class="text-4xl font-bold">Vyplňte údaje o spoločnosti</div>
  <div class="mt-2 mb-6">vyplňte zakladne údaje a pridajte zakladateľov (spoločnikov) a konateľov.</div>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <FormKit type="text" name="name" v-model="companyOrZivnostModel.name" label="Názov spoločnosti"
      validation="required" />
    <FormKit type="select" name="pravnaForma" label="Právna forma" placeholder="Vybrať" v-model="pravnaForma"
      :options="['s. r. o.', ', s. r. o.', ', spol. s r. o.']" validation="required" />
  </div>
  <!-- Zakladatelia table -->
  <div class="flex flex-col mb-2">
    <h2 class="text-2xl">Zakladatelia (Spoločníci)</h2>
    <template v-if="zakladateliaSpolocniciList.length === 0">
        <div class="font-bold">Zatiaľ nebol pridaný žiadný zakladateľ (spoločník).</div>
    </template>
  </div>
  <FormKit
    type="group"
    id="group_spolocnici"
    name="spolocnici"
    #default="{ value, state: { valid } }"
  >
    <FormKit
      id="repeater_spolocnici"
      name="rep_spolocnici"
      type="repeater"
      :insert-control="true"
      add-label="+ Pridať zakladateľa"
      v-model="zakladateliaSpolocniciList"
      #default="{ index, value, state: { valid } }"
    >
      <FormKit type="select" name="typ_zakladatela"
        label="Typ zakladateľa"
        :options="[
          { value: 1, label: 'Fyzická osoba' },
          { value: 2, label: 'Právnicka osoba' }
        ]"
        validation="required"
      />
      <div v-if="value.typ_zakladatela === 2" class="flex flex-col md:flex-row md:space-x-4">
        <FormKit type="text" name="obchodne_meno" label="Obchodné meno" validation="required" />
        <FormKit type="text" name="ico" label="IČO" />
      </div>
      <div v-if="value.typ_zakladatela != 2" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormKit type="text" name="first_name" label="Krstné meno" validation="required|length:2" />
        <FormKit type="text" name="last_name" label="Priezvisko" validation="required|length:2" />
        <FormKit type="date" style="color-scheme: dark;" name="date_of_birth" autocomplete="date_of_birth"
          label="Dátum narodenia" validation="required" />
        <FormKit type="select" name="gender" label="Pohlavie" placeholder="Vyberte pohlavie" :options="['Muž', 'Žena']"
          validation="required" />
        <FormKit type="text" name="nationality" label="Štátna príslušnosť " validation="required|length:2" />
        <FormKit type="select" name="typ_dokladu_totoznosti" label="Typ dokladu totožnosti" validation-visibility="blur"
          placeholder="Vyberte typ dokladu tožnosti" :options="['Občiansky preukaz', 'Cestovný pas', 'Vodičský preukaz']"
          validation="required" />
        <FormKit type="text" name="cislo_dokladu_totoznosti" label="Číslo dokladu totožnosti"
          validation="required|length:5" />
        <FormKit type="text" name="title_before" label="Titul pred menom" />
        <FormKit type="text" name="title_after" label="Titul za menom" />
        <FormKit type="text" name="rodne_cislo" label="Rodné číslo" id="rodne_cislo"
          validation="required|length:9"
          validation-visibility="blur"
          />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormKit type="select" name="country" label="Štát" placeholder="Vyberte štát"
          :options="['Slovensko', 'Česká republika']" validation="required" />
        <FormKit type="text" name="city" label="Mesto" validation="required" />
        <FormKit type="text" name="psc" label="PSČ" validation="required" />
        <FormKit type="text" name="street" label="Ulica" validation="required" />
        <FormKit type="text" name="street_number" label="Súpisne číslo" validation="require_one:street_number2" help="Číslo pred lomítkom" />
        <FormKit type="text" name="street_number2" label="Orientačné číslo" validation="require_one:street_number" help="Číslo za lomítkom" />
      </div>
      <div>
        <div class="my-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          <FormKit type="number" :index="index" name="vyska_vkladu" label="Výška vkladu €"
            :validation-rules="{ validateVyskaVkladu }"
            validation="required|min:750|validateVyskaVkladu"
            validation-visibility="live"
            :validation-messages="{
              validateVyskaVkladu: 'Pri jednom spoločníkovi/zakladatelovi sa vyžaduje vklad. min 5000 €.'
            }"
            help="Zadajte hodnotu napr. 5000"
          />
           <!-- Automaticky počitať od výšky vkladu -->
          <FormKit type="number" :index="index" name="podiel_v_spolocnosti" label="Podiel v spoločnosti %"
            :validation-rules="{ validatePodielVSpolocnosti }"
            validation="required|max:100|min:0|validatePodielVSpolocnosti"
            :validation-messages="{
              validatePodielVSpolocnosti: 'Podiel všetkých spoločníkov je väčší než 100 %.'
            }"
            help="Zadajte hodnotu 0 - 100" />
            <!-- // Rozsah splatenia vkladu € moze byt max do vysky vkladu alebo 1- max vyska vkladu -->
          <FormKit type="number" name="rozsah_splatenia_vkladu" label="Rozsah splatenia vkladu €" validation="required|min:750"
            help="Zadajte hodnotu napr. 5000" />
        </div>
        <div>
          <FormKit v-if="value.typ_zakladatela != 2" type="checkbox" name="je_konatel" label="Tento zakladateľ (spoločník) bude aj konateľom" />
          <FormKit
            type="checkbox"
            name="je_spravca_vkladu"
            v-if="!isCheckboxHidden || value.je_spravca_vkladu"
            @change="handleCheckboxChange(index)"
            label="Tento zakladateľ (spoločník) bude aj správcom vkladu"
            help="Správca vkladu musí byť vždy ustanovený. Môže to byť iba jeden zo spoločníkov."
          />
        </div>
      </div>
      <div v-if="value.typ_zakladatela == 2">
        <h2 class="text-xl my-4 text-white">Zastúpenie osobou (konateľ)</h2>
        <div class="grid grid-cols-2 gap-4">
          <FormKit type="group" name="zastupitel">
            <FormKit type="text" name="first_name" label="Krstné meno" validation="required|length:2" />
            <FormKit type="text" name="last_name" label="Priezvisko" validation="required|length:2" />
            <FormKit type="date" style="color-scheme: dark;" name="date_of_birth" autocomplete="date_of_birth"
              label="Dátum narodenia" validation="required"
            />           
            <FormKit type="text" name="rodne_cislo" label="Rodné číslo" id="rodne_cislo"
              validation="required|length:9"
              validation-visibility="blur"
            />            
          </FormKit>
        </div>    
      </div>
        <!-- <div class="text-white">Rod. cislo: {{ rodneCislo.cislo }}</div> -->
        <!-- <div v-if="!valid" class="text-red-700 p-1 text-center text-lg rounded font-bold bg-red-50 mb-4">
          Prosím vyplnte všetky povinné polia.
        </div> -->
    </FormKit>
  </FormKit>
  <!-- <template v-if="zakladateliaSpolocniciList.length === 0">
    <div class="font-bold">Zatiaľ nebol pridaný žiadný zakladateľ (spoločník).</div>
  </template> -->
  <!-- <button @click.prevent="logValueForZakladatelia">Log for list zakladatelia.</button> -->
  <!-- Konatelia table -->
  <div class="flex flex-col mt-6 mb-2">
    <h2 class="text-2xl">Konatelia</h2>
    <template v-if="zakladateliaSpolocniciList.length === 0">
        <div class="font-bold">Zatiaľ nebol pridaný žiadný zakladateľ (spoločník).</div>
    </template>
    <ul class="list-none list-inside my-1">
      <li class="" v-for="konatel in konatelNamesFromZakladatelia">
        <div class="flex flex-row items-center">
          <Tippy>
            <UserIcon class="h-5 w-5 text-bizinix-teal" aria-hidden="true" />
            <template #content>
              Konateľ je pridaný ako zakladateľ.
            </template>
          </Tippy>
          <span class="text-lg">{{ konatel.first_name }} {{ konatel.last_name }}</span>
        </div>
      </li>
    </ul>
  </div>
  <!-- <button @click.prevent="logValueForKonatelia">Log for list konatelia.</button> -->
  <!-- Modal for SpolocnikZakladatel Add/Edit -->
  <!-- Form for SpolocnikZakladatel -->  
  <!-- Modal for Remove SpolocnikZakladatel -->
  <VueFinalModal :modal-id="modalRemoveSpolocnikZakladatel" display-directive="if" :clickToClose="false" :escToClose="false"
    :lockscroll="true" class="block md:flex md:justify-center overflow-auto"
    content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2 overflow-auto h-fit"
  >
    <div class="text-white py-4">
      Naozaj si prajete odobrať spoločníka/zakladateľa?
    </div>
    <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
      <button
        class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
        @click="() => vfm.closeAll()"
      >
        Zrušiť
      </button>
      <button
        class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
        @click.prevent="removeSpolocnikZakladatel"
      >
        {{ buttonModalText }}
      </button>
    </div>
  </VueFinalModal>
  <!-- Modal for Konatel Add/Edit -->
  <!-- Form for Konatelia -->
    <FormKit
      type="group"
      id="group_konatelia" name="konatelia"
      #default="{ value, state: { valid } }"
    >
      <FormKit
        id="repeater_konatelia"
        name="rep_konatelia"
        type="repeater"
        :insert-control="true"
        :remove="{ logValueForKonatelia }"
        add-label="+ Pridať konateľa"
        v-model="konateliaList"
        min="0"
      >
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormKit type="text" name="first_name" label="Krstné meno" validation="required|length:2" />
        <FormKit type="text" name="last_name" label="Priezvisko" validation="required|length:2" />
        <FormKit type="date" style="color-scheme: dark;" name="date_of_birth" autocomplete="date_of_birth"
          label="Dátum narodenia" validation="required" />
        <FormKit type="select" name="gender" label="Pohlavie" placeholder="Vyberte pohlavie" :options="['Muž', 'Žena']"
          validation="required" />
        <FormKit type="text" name="nationality" label="Štátna príslušnosť " validation="required|length:2" />
        <FormKit type="select" name="typ_dokladu_totoznosti" label="Typ dokladu totožnosti" validation-visibility="blur"
          placeholder="Vyberte typ dokladu tožnosti" :options="['Občiansky preukaz', 'Cestovný pas', 'Vodičský preukaz']"
          validation="required" />
        <FormKit type="text" name="cislo_dokladu_totoznosti" label="Číslo dokladu totožnosti"
          validation="required|length:5" />
        <FormKit type="text" name="title_before" label="Titul pred menom" />
        <FormKit type="text" name="title_after" label="Titul za menom" />
        <FormKit type="text" name="rodne_cislo" label="Rodné číslo" id="rodne_cislo"
          validation="required|length:9"
          validation-visibility="blur" />
        <FormKit type="select" name="country" label="Štát" placeholder="Vyberte štát"
          :options="['Slovenská republika', 'Česká republika']" validation="required" />
        <FormKit type="text" name="city" label="Mesto" validation="required" />
        <FormKit type="text" name="psc" label="PSČ" validation="required" />
        <FormKit type="text" name="street" label="Ulica" validation="required" />
        <FormKit type="text" name="street_number" label="Súpisne číslo" validation="require_one:street_number2" help="Číslo pred lomítkom" />
        <FormKit type="text" name="street_number2" label="Orientačné číslo" validation="require_one:street_number" help="Číslo za lomítkom" />
      </div>
      <!-- <div class="text-white">Rod. cislo: {{ rodneCislo.cislo }}</div> -->
      <!-- <div v-if="!valid" class="text-red-700 p-1 text-center text-lg rounded font-bold bg-red-50 mb-4">
        Prosím vyplnte všetky povinné polia.
      </div> -->
    </FormKit>
  </FormKit>
  <!-- <template v-if="countOfKonatelia === 0">
    <div class="font-semibold">Zatiaľ nebol pridaný žiadný konateľ.</div>
  </template> -->
  <!-- Modal for Konatel Remove -->
  <VueFinalModal :modal-id="modalRemoveKonatel" display-directive="if" :clickToClose="false" :escToClose="false"
    :lockscroll="true" class="block md:flex md:justify-center overflow-auto"
    content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2 overflow-auto h-fit"
  >
    <div class="text-white py-4">
      Naozaj si prajete odobrať konateľa?
    </div>
    <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
      <button
        class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
        @click.prevent="() => vfm.closeAll()"
      >
        Zrušiť
      </button>
      <button
        class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
        @click.prevent="removeKonatel"
      >
        {{ buttonModalText }}
      </button>
    </div>
  </VueFinalModal>
  <!-- Inputs inside step for paren formm -->
  <h2 class="text-xl my-4">Základné imanie </h2>
  <div class="grid grid-cols-2 gap-4 my-4">
    <FormKit type="number" name="vyska" label="Výška €"
      v-model="companyOrZivnostModel.imanie_vyska"
      :validation-rules="{ validateImanieVyska }"
      validation="required|min:5000|validateImanieVyska"
      :validation-messages="{
        validateImanieVyska: 'Základné imanie sa nezhoduje so súčtom vkladov spoločníkov'
      }"
      help="Od 1.1.2016 finančné prostriedky do výšky 5000 eur nemusia byť vkladané ná účet v banke. Minimálna výška základného imania pri s.r.o. je podľa zákona 5000,- Eur. Môžete zadať aj viac."
    />
    <FormKit type="number" name="rozsah_splatenia" label="Rozsah splatenia €"
      v-model="companyOrZivnostModel.imanie_splatene"
      :validation-rules="{ validateMinRozsahSplatenia, validateAllRozsahSplatenia }"
      validation="required|min:2500|validateMinRozsahSplatenia|validateAllRozsahSplatenia"
      validation-visibility="blur"
      :validation-messages="{
        validateMinRozsahSplatenia: 'V prípade jediného zakladateľa musí byť základné imanie splatené v plnom rozsahu, teda 5000 eur (100%). Ak je zakladateľov viac, rozsah splatenia základného imania postačí vo výške 2500 eur.',
        validateAllRozsahSplatenia: 'Rozsah splatenia základného imania sa nezhoduje so súčtom rozsahu splatenia vkladov spoločníkov.',
      }"
      help="Od 1.1.2016 finančné prostriedky do výšky 5000 eur nemusia byť vkladané ná účet v banke. V prípade jediného zakladateľa musí byť základné imanie splatené v plnom rozsahu, teda 5000 eur (100%). Ak je zakladateľov viac, rozsah splatenia základného imania postačí vo výške 2500 eur."
    />
  </div>
  <div class="my-2">
    <template v-if="countOfPravOsobaFromZakladatelia >= 1 && countOfFyzOsobaFromZakladatelia == 0">
      <FormKit v-model="companyOrZivnostModel.konecny_uzivatelia_vyhod" type="radio" label="Konečným užívateľom výhod sú"
        :options="{ 2: 'Iné osoby' }" :value="2" name="konecny_uzivatelia_vyhod" validation="required"
      />
      <FormKit type="textarea" v-model="companyOrZivnostModel.note" label="Konečným užívateľom výhod sú iné osoby"
          placeholder="Uveďte mená a priezviská, adresu bydliska, dátum narodenia, rodné číslo, číslo pasu alebo občianskeho preukazu."
          help="Uveďte mená a priezviská, adresu bydliska, dátum narodenia, rodné číslo, číslo pasu alebo občianskeho preukazu."
          rows="3"
          validation="required"
        />
    </template>
    <template v-else>
      <FormKit v-model="companyOrZivnostModel.konecny_uzivatelia_vyhod" type="radio" label="Konečným užívateľom výhod sú"
        :options="{ 1: 'Spoločníci/zakladatelia', 2: 'Iné osoby' }" name="konecny_uzivatelia_vyhod" validation="required"
      />
      <div v-if="companyOrZivnostModel.konecny_uzivatelia_vyhod == 2" class="mt-2">
        <FormKit type="textarea" v-model="ine_osoby" label="Iné osoby"
          placeholder="Uveďte mená a priezviská, adresu bydliska, dátum narodenia, rodné číslo, číslo pasu alebo občianskeho preukazu."
          help="Uveďte mená a priezviská, adresu bydliska, dátum narodenia, rodné číslo, číslo pasu alebo občianskeho preukazu."
          rows="3"
          validation="required"
        />
      </div>
    </template>
  </div>
  <div class="my-4">
    <FormKit v-model="companyOrZivnostModel.sposob_konania_konatelov" type="radio" label="Spôsob konania konateľov"
      :options="{
          1: 'V mene spoločnosti koná a podpisuje každý konateľ samostatne',
          2: 'V mene spoločnosti konajú všetci konatelia spoločne',
          3: 'Iné'
        }" name="sposob_konania_konatelov" validation="required" />
    <div v-if="companyOrZivnostModel.sposob_konania_konatelov == 3" class="mt-2">
      <FormKit type="textarea" v-model="note_sposob_konania_ine" label="Iný spôsov konania konateľov" rows="3" />
    </div>

  </div>
  <div class="mb-2">
    Počet pridaných konatelov {{ countOfKonatelia }}
    Počet pridaných zakladatelov {{ countOfZakladatelia }}
    {{ zakladateliaSpolocniciList }}
    {{ konateliaList }}
    rozsah_splatenia {{ calculatedRozsahSplatenia }}
  </div>
  <div v-if="countOfKonatelFromZakladatelia == 0 && countOfKonatelia == 0"
    class="my-4 flex items-center justify-between py-3 px-4 bg-red-500 text-white rounded">
    <b>Prosím pridajte minimálne jedného zakladateľa a konateľa spoločnosťi.</b>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, watch, ref, toRef, type Ref, effect } from 'vue';
import { PencilIcon, XMarkIcon, UserIcon } from '@heroicons/vue/24/outline'
import { useVfm, VueFinalModal } from 'vue-final-modal'
import { getNode } from '@formkit/core'
import type CompanyMemberKonatel from '@/types/CompanyMemberKonatel';
import type CompanyMemberSpolocnik from '@/types/CompanyMemberSpolocnik';
import { computed } from 'vue';
import { Tippy } from "vue-tippy";
import 'tippy.js/dist/tippy.css' // optional for styling

const vfm = useVfm()
const modalRemoveSpolocnikZakladatel = Symbol('modalRemoveSpolocnikZakladatel')
const modalRemoveKonatel = Symbol('modalRemoveKonatel')
const buttonModalText = ref<string>()
const titleModalText = ref<string>('Modal Title')

let isCheckboxHidden = ref(false);

onMounted(()=> {
  zakladateliaSpolocniciList.value.length = 0  
  konateliaList.value.length = 0
})

const rodneCislo = ref({
  cislo: ''
});
const pravnaForma = ref('s. r. o.');
let spravcaVkladuNotExist = ref(true);

const countOfZakladatelia = computed(() => {
  return zakladateliaSpolocniciList.value.length
})

const countOfKonatelFromZakladatelia = computed(() => {
  return zakladateliaSpolocniciList.value.filter(item => item.je_konatel).length;
});

const countOfPravOsobaFromZakladatelia = computed(() => {
  return zakladateliaSpolocniciList.value.filter(member => member.typ_zakladatela == 2).length;
});

const countOfFyzOsobaFromZakladatelia = computed(() => {
  return zakladateliaSpolocniciList.value.filter(member => member.typ_zakladatela == 1).length;
});

const konatelNamesFromZakladatelia = computed(() => {
  return zakladateliaSpolocniciList.value
    .filter(item => item.je_konatel)
    .map(item => ({ first_name: item.first_name, last_name: item.last_name }));
});

const countOfKonatelia = computed(() => {
  return konateliaList.value.length
})

let checkedItemIndex: null;

let companyOrZivnostModel = ref({
  name: '',
  ico: '',
  dic: '',
  icdph: '',
  headquarters_id: 0,
  imanie_vyska: 5000,
  imanie_splatene: 0,
  is_dph: false,
  zaciatok_opravnenia: '',
  konecny_uzivatelia_vyhod: 1,
  sposob_konania_konatelov: 1,
  owner: 0,
  note: '',
  type: 1, // type 1 sro, type 2 živnosť
  status: 2, // neaktívna spoločnosť
  sub_status: 1, // Zakladanie spoločnosti je v priebehu
  subjects_of_business: [{
    id: '',
    title: '',
    price: 0,
    description: '',
    category_id: 0
  }]
})

let note_sposob_konania_ine = ref('');
let ine_osoby = ref('');

let zakladateliaSpolocniciList: Ref<CompanyMemberSpolocnik[]> = ref<CompanyMemberSpolocnik[]>([]);
let konateliaList: Ref<CompanyMemberKonatel[]> = ref<CompanyMemberKonatel[]>([]);

// let zastupitel = ref({
//   company_id: null,
//   ico: '',
//   typ_zakladatela: 1,
//   obchodne_meno: '',
//   first_name: '',
//   last_name: '',
//   title_before: '',
//   title_after: '',
//   gender: '',
//   nationality: '',
//   date_of_birth: '',
//   rodne_cislo: '',
//   street: '',
//   street_number: '',
//   street_number2: '',
//   city: '',
//   psc: '',
//   country: '',
//   typ_dokladu_totoznosti: '',
//   cislo_dokladu_totoznosti: '',
//   vyska_vkladu: 0,
//   podiel_v_spolocnosti: 0,
//   rozsah_splatenia_vkladu: 0,
//   je_spravca_vkladu: false,
//   je_zakladatel: false,
//   je_konatel: false,
//   je_zastupitel: true
// });

function getDefaultNewItemSpolocnik(): CompanyMemberSpolocnik {
  return {
    company_id: null,
    ico: '',
    typ_zakladatela: 1,
    obchodne_meno: '',
    first_name: 'Janko',
    last_name: 'Hrasko',
    title_before: '',
    title_after: '',
    gender: 'Muž',
    nationality: 'Slovenská',
    date_of_birth: '1993-01-20',
    rodne_cislo: '123456789',
    street: 'Kupelska',
    street_number: '50',
    street_number2: '',
    city: 'Sobrance',
    psc: '07301',
    country: 'Slovensko',
    typ_dokladu_totoznosti: 'Cestovný pas',
    cislo_dokladu_totoznosti: 'BC456789123',
    vyska_vkladu: 5000,
    podiel_v_spolocnosti: 100,
    rozsah_splatenia_vkladu: 5000,
    je_spravca_vkladu: false,
    je_zakladatel: true,
    je_konatel: false
  };
}

function getDefaultNewItemKonatel(): CompanyMemberKonatel {
  return {
    company_id: null,
    first_name: '',
    last_name: '',
    title_before: '',
    title_after: '',
    gender: '',
    date_of_birth: '',
    rodne_cislo: '',
    street: '',
    obchodne_meno: '',
    nationality: '',
    street_number: '',
    street_number2: '',
    city: '',
    psc: '',
    country: '',
    je_konatel: true,
    added_from_zakladatelia: false
  };
}

const newItemSpolocnik: Ref<CompanyMemberSpolocnik> = ref<CompanyMemberSpolocnik>(getDefaultNewItemSpolocnik());
const newItemKonatel: Ref<CompanyMemberKonatel> = ref<CompanyMemberKonatel>(getDefaultNewItemKonatel());

function resetNewItem() {
  newItemSpolocnik.value = getDefaultNewItemSpolocnik();
  newItemKonatel.value = getDefaultNewItemKonatel();
}

const calculatedImanieVyska = computed(() => {
  return zakladateliaSpolocniciList.value.reduce((acc, item) => {
    let vyska_vkladu = Number(item.vyska_vkladu);
    if (isNaN(vyska_vkladu)) {
      vyska_vkladu = 0;  // or handle error
    }
    return acc + vyska_vkladu;
  }, 0);
});

effect(() => {
  companyOrZivnostModel.value.imanie_vyska = calculatedImanieVyska.value;
});

const calculatedRozsahSplatenia = computed(() => {
  return zakladateliaSpolocniciList.value.reduce((acc, item) => {
    let rozsah_splatenia_vkladu = Number(item.rozsah_splatenia_vkladu);
    if (isNaN(rozsah_splatenia_vkladu)) {
      rozsah_splatenia_vkladu = 0;  // or handle error
    }
    return acc + rozsah_splatenia_vkladu;
  }, 0);
});

effect(() => {
  companyOrZivnostModel.value.imanie_splatene = calculatedRozsahSplatenia.value;
});

async function closeModal(){
  vfm.closeAll().then( () => {
    console.log("Closing all modals");
  }) 
}

function removeSpolocnikZakladatel(){
  vfm.closeAll();
}

function removeKonatel(){
}

async function confirmRemoveItemSpolocnikZakladatel(index: number) {
  titleModalText.value = 'Potvrdenie odobratia'
  buttonModalText.value = 'Odobrať'
  await vfm.open(modalRemoveSpolocnikZakladatel);
}

async function confirmRemoveItemKonatel(index: number) {
  titleModalText.value = 'Potvrdenie odobratia'
  buttonModalText.value = 'Odobrať'
  await vfm.open(modalRemoveKonatel);
}

async function isRodneCisloUnique(node: any) {
  console.log(node.value);
  if (zakladateliaSpolocniciList.value.length > 1 || konateliaList.value.length > 1) {
    const isRodneCisloInZakladatelia = zakladateliaSpolocniciList.value.some(
      (item) => item.rodne_cislo === node.value as string
    );
    const isRodneCisloInKonatelia = konateliaList.value.some(
      (item) => item.rodne_cislo === node.value as string
    );

    console.log(isRodneCisloInZakladatelia, isRodneCisloInKonatelia);

    if (isRodneCisloInZakladatelia || isRodneCisloInKonatelia) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

function validateMinRozsahSplatenia(node) {
  if(zakladateliaSpolocniciList.value.length == 1 && node.value < 5000) {
    return false;
  }
  else if(zakladateliaSpolocniciList.value.length >= 2 && node.value < 2500)  {
    return false;     
  } else {
    return true;
  }
}

function validateAllRozsahSplatenia(node) {
  if(calculatedRozsahSplatenia.value == node.value){
    return true;
  }
  else {
    return false;
  }
}

function validateImanieVyska(node) {
  if(calculatedImanieVyska.value == node.value){
    return true;
  }
  else {
    return false;
  }
}

function validateVyskaVkladu(node){
  zakladateliaSpolocniciList.value[node.props.index].vyska_vkladu = Number(node.value);
  
  let vyskaVkladu = zakladateliaSpolocniciList.value.reduce((acc, item) => {
    let vyska_vkladu = Number(item.vyska_vkladu);
    if (isNaN(vyska_vkladu)) {
      vyska_vkladu = 0;  // or handle error
    }
    return acc + vyska_vkladu;
  }, 0);

  if(zakladateliaSpolocniciList.value.length === 1 && vyskaVkladu < 5000){
    return false;
  }
  else {
    return true;
  }
}

function validatePodielVSpolocnosti(node){
    // Update the podiel_v_spolocnosti of the item at the given index
    zakladateliaSpolocniciList.value[node.props.index].podiel_v_spolocnosti = Number(node.value);

    // Calculate the sum of podiel_v_spolocnosti for all items
    let podiel = zakladateliaSpolocniciList.value.reduce((acc, item) => {
      let podiel_v_spolocnosti = Number(item.podiel_v_spolocnosti);
      if (isNaN(podiel_v_spolocnosti)) {
        podiel_v_spolocnosti = 0;  // or handle error
      }
      return acc + podiel_v_spolocnosti;
    }, 0);
    
    console.log(podiel)
    if(podiel > 100){
      return false
    }
    else {
      return true
    }
}

// function validateVyskaVkladu(node){
//     // Update the podiel_v_spolocnosti of the item at the given index
//     zakladateliaSpolocniciList.value[node.props.index].vyska_vkladu = Number(node.value);

//     // Calculate the sum of podiel_v_spolocnosti for all items
//     let vyskaVkladu = zakladateliaSpolocniciList.value.reduce((acc, item) => {
//       let vyska_vkladu = Number(item.vyska_vkladu);
//       if (isNaN(vyska_vkladu)) {
//         vyska_vkladu = 0;  // or handle error
//       }
//       return acc + vyska_vkladu;
//     }, 0);
    
//     if(zakladateliaSpolocniciList.value.length == 1 && vyskaVkladu < 5000){
//       return false
//     }
//     else if(zakladateliaSpolocniciList.value.length >= 2 && vyskaVkladu < 2500) {
//       return false
//     }
//     else {
//       return true
//     }
// }

watch(zakladateliaSpolocniciList, (newList) => {let checkedIndex = newList.findIndex(item => item.je_spravca_vkladu === true);
  isCheckboxHidden.value = checkedIndex !== -1;
}, { deep: true });

function handleCheckboxChange(index) {
  for (let i = 0; i < zakladateliaSpolocniciList.value.length; i++) {
    if (i !== index) {
      zakladateliaSpolocniciList.value[i].je_spravca_vkladu = false;
    }
  }
}

function logValueForZakladatelia() {
  console.log(companyOrZivnostModel.value)
  console.log("Zakladatelia list")
  console.log(zakladateliaSpolocniciList.value)
  console.log("NewItem")
  console.log(newItemSpolocnik.value)
  console.log(newItemKonatel.value)
}

function logValueForKonatelia() {
  console.log("Konatelia list")
  console.log(konateliaList.value.length)
  console.log("NewItems")
  console.log(newItemSpolocnik.value)
  console.log(newItemKonatel.value)
}

function logNewItemVal() {
  console.log(newItemSpolocnik.value)
  console.log(newItemKonatel.value)
  //const node = getNode('form_spolocnici')
  //console.log(getNode('form_spolocnici')?.context?.state)
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
  countOfZakladatelia,
  countOfKonatelFromZakladatelia,
  note_sposob_konania_ine,
  ine_osoby
})

</script>