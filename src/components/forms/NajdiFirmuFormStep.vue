<template>
  <div class="text-4xl font-bold mb-6">Ako prvé zadajte IČO vašej firmy</div>
  <FormKit
    name="Spoločnosť"
    type="autocomplete"
    label="IČO spoločnosti"
    placeholder="Zadajte IČO spoločnosti"
    :options="search"
    validation="required|length:6"
    empty-message="Subjekt nebol nájdený, zadajte správne ičo."
    v-model="companyFromOsRs"
  >
    <template #option="{ option }">
      <div class="formkit-option grow p-2">
        <div class="font-bold">{{ option.label }}, {{ option.city }}</div>
      </div>
    </template>
  </FormKit>
  <div class="flex flex-col space-y-4 last:mb-4">
    {{companyFromOsRs}}
    <EditItemForCompany title="Obchodné meno">
      <div class="grid grid-cols-2 items-center">
        <div>
          <h1 v-bind:class="{ 'text-cross': newCompanyFullName.newCompanyName != ''  }" class="text-lg">{{ companyFromOsRs?.obchodne_meno }}</h1>
          <h1 class="text-lg">{{ newCompanyFullName.newCompanyName + " " + newCompanyFullName.newCompanyPravForm}}</h1>
        </div>
        <div>
          <button @click="editCompanyName" class="bg-bizinix-teal p-2 rounded">Upraviť</button>
          <VueFinalModal
              :modal-id="modalIdAddOrEditSubjects"
              display-directive="if"
              :clickToClose="false"
              :escToClose="false"
              :lockscroll="true"
              class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
              content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
            >
              <h1 class="text-white text-2xl">
                Obchodné meno
              </h1>
              <p class="text-white mb-4" >Obchodné meno nemôže byť totožné s už existujúcim. Názov si overte cez www.orsr.sk alebo www.rpo.sk. Čiarky, pomlčky, medzery, veľké/malé písmená a podobne nie sú dostatočným odlišovacím znakom.</p>
              <FormKit
                type="form"
                id="form_new_business_name" name="new_business_name"
                @submit="closeModalAndSaveOrEditSpolocnikZakladatel"
                :config="{ validationVisibility: 'live' }"
                submit-label="Pridať"
                #default="{ value, state: { valid } }"
                :actions="false"
              >
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <FormKit type="text" name="new_business_name" v-model="newCompanyFullName.newCompanyName" label="Nové obchodné meno" placeholder="Napíšte nové obchodné meno" validation="required|length:2" />
                <FormKit type="select" name="pravnaForma" label="Právna forma" v-model="newCompanyFullName.newCompanyPravForm" placeholder="Vybrať"
                  :options="['s. r. o.', ', s. r. o.', ', spol. s r. o.']" validation="required"
                />
              </div>
                <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
                <button
                  class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
                  type="button"
                  @click.prevent="closeModalForCompanyName"
                >
                  Zrušiť
                </button>
                <button
                  :disabled="!valid"
                  type="submit"
                  class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
                >
                Potvrdiť
                </button>
              </div>
              </FormKit>
            </VueFinalModal>         
              </div>
            </div>
    </EditItemForCompany>
    <EditItemForCompany title="Sídlo">
      <div class="grid grid-cols-2 items-center">
        <div>
          <h1 class="text-lg">{{ companyFromOsRs?.adresa.street + " " + companyFromOsRs?.adresa.number }}</h1>
          <h1 class="text-lg">{{ companyFromOsRs?.adresa.city + " " + companyFromOsRs?.adresa.zip }}</h1>
          <!-- <h1 class="text-lg">{{ newCompanyFullName.newCompanyName + " " + newCompanyFullName.newCompanyPravForm}}</h1> -->
        </div>
        <div>
          <button @click="editCompanyName" class="bg-bizinix-teal p-2 rounded">Upraviť</button>
          <VueFinalModal
              :modal-id="modalIdAddOrEditSubjects"
              display-directive="if"
              :clickToClose="false"
              :escToClose="false"
              :lockscroll="true"
              class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
              content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
            >
              <h1 class="text-white text-2xl">
                Obchodné meno
              </h1>
              <p class="text-white mb-4" >Obchodné meno nemôže byť totožné s už existujúcim. Názov si overte cez www.orsr.sk alebo www.rpo.sk. Čiarky, pomlčky, medzery, veľké/malé písmená a podobne nie sú dostatočným odlišovacím znakom.</p>
              <FormKit
                type="form"
                id="form_new_business_name" name="new_business_name"
                @submit="closeModalAndSaveOrEditSpolocnikZakladatel"
                :config="{ validationVisibility: 'live' }"
                submit-label="Pridať"
                #default="{ value, state: { valid } }"
                :actions="false"
              >
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <FormKit type="text" name="new_business_name" v-model="newCompanyFullName.newCompanyName" label="Nové obchodné meno" placeholder="Napíšte nové obchodné meno" validation="required|length:2" />
                <FormKit type="select" name="pravnaForma" label="Právna forma" v-model="newCompanyFullName.newCompanyPravForm" placeholder="Vybrať"
                  :options="['s. r. o.', ', s. r. o.', ', spol. s r. o.']" validation="required"
                />
              </div>
                <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
                <button
                  class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
                  type="button"
                  @click.prevent="closeModalForCompanyName"
                >
                  Zrušiť
                </button>
                <button
                  :disabled="!valid"
                  type="submit"
                  class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
                >
                Potvrdiť
                </button>
              </div>
              </FormKit>
            </VueFinalModal>         
              </div>
            </div>
    </EditItemForCompany>
    <EditItemForCompany title="Konatelia">
      <div class="grid grid-cols-2 items-center">
        <div>
          <h1 class="text-lg">{{ companyFromOsRs?.statutarny_organ.konateľ[0].name }}</h1>
          <!-- <h1 class="text-lg">{{ newCompanyFullName.newCompanyName + " " + newCompanyFullName.newCompanyPravForm}}</h1> -->
        </div>
        <div>
          <button @click="editCompanyName" class="bg-bizinix-teal p-2 rounded">Upraviť</button>
          <VueFinalModal
              :modal-id="modalIdAddOrEditSubjects"
              display-directive="if"
              :clickToClose="false"
              :escToClose="false"
              :lockscroll="true"
              class="block md:flex md:justify-center md:items-center overflow-x-hidden overflow-y-auto"
              content-class="flex flex-col max-w-5xl m-4 p-4 bg-gray-bizinix border border-bizinix-border rounded space-y-2"
            >
              <h1 class="text-white text-2xl">
                Obchodné meno
              </h1>
              <p class="text-white mb-4" >Obchodné meno nemôže byť totožné s už existujúcim. Názov si overte cez www.orsr.sk alebo www.rpo.sk. Čiarky, pomlčky, medzery, veľké/malé písmená a podobne nie sú dostatočným odlišovacím znakom.</p>
              <FormKit
                type="form"
                id="form_new_business_name" name="new_business_name"
                @submit="closeModalAndSaveOrEditSpolocnikZakladatel"
                :config="{ validationVisibility: 'live' }"
                submit-label="Pridať"
                #default="{ value, state: { valid } }"
                :actions="false"
              >
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <FormKit type="text" name="new_business_name" v-model="newCompanyFullName.newCompanyName" label="Nové obchodné meno" placeholder="Napíšte nové obchodné meno" validation="required|length:2" />
                <FormKit type="select" name="pravnaForma" label="Právna forma" v-model="newCompanyFullName.newCompanyPravForm" placeholder="Vybrať"
                  :options="['s. r. o.', ', s. r. o.', ', spol. s r. o.']" validation="required"
                />
              </div>
                <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
                <button
                  class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-transparent px-9 py-3 border border-bizinix-border hover:border-teal-700 rounded"
                  type="button"
                  @click.prevent="closeModalForCompanyName"
                >
                  Zrušiť
                </button>
                <button
                  :disabled="!valid"
                  type="submit"
                  class="w-full md:w-1/2 text-white font-bold disabled:bg-gray-700 disabled:border-gray-700 bg-bizinix-teal hover:border-teal-700 hover:bg-teal-700 px-9 py-3 border border-bizinix-border rounded"
                >
                Potvrdiť
                </button>
              </div>
              </FormKit>
            </VueFinalModal>         
              </div>
            </div>
    </EditItemForCompany>
    <EditItemForCompany title="Spoločníci">
    </EditItemForCompany>
    <EditItemForCompany title="Spôsob konania konateľov">
    </EditItemForCompany>
    <EditItemForCompany title="Predmet podnikania">
    </EditItemForCompany>
    <EditItemForCompany title="Základné imanie">
    </EditItemForCompany>
    <EditItemForCompany title="Prokurista">
    </EditItemForCompany>
    <EditItemForCompany title="Iné zmeny">
    </EditItemForCompany>
  </div>
</template>

<script setup lang="ts">

import store from '@/store';
import { getNode } from '@formkit/core';
import { onBeforeMount, reactive, ref } from 'vue';
import type Company from '@/types/Company';
import { useVfm, VueFinalModal } from 'vue-final-modal'
import EditItemForCompany from './EditItemForCompany.vue'
import { toast } from "vue3-toastify";

const companyFromOsRs = ref();
const vfm = useVfm()
const modalIdAddOrEditSubjects = Symbol('modalIdAddOrEditSubjects')
const loading = ref(true);
const subjects_of_business = ref<Company['subjects_of_business']>([]);
let newCompanyFullName = reactive({
  newCompanyName: '',
  newCompanyPravForm: ''
})

onBeforeMount(async () => {
  // const res = await store.dispatch("getCompanyFromOrsrByIco", "36562939");
  // console.log(res);
})

async function search({ search }: any) {
  if (!search) return [];
  if (search.length > 5) {
    const searchQuery = {
      searchQuery: search,
    };
    const res = await store
      .dispatch("getCompanyFromOrsrByIco", searchQuery.searchQuery)
      .catch((err) => {
        toast.error(err);
      });
      console.log(res)
    return [{
        label: res.data.obchodne_meno,
        value: res.data,
        city: res.data.adresa.city
    }];
  }
  return [];
} 

function editCompanyName() {
  vfm.open(modalIdAddOrEditSubjects)
}

function closeModalForCompanyName(){
  vfm.closeAll().then(() => {
    newCompanyFullName.newCompanyName = '';
    newCompanyFullName.newCompanyPravForm = '';
  })
}

function closeModalAndSaveOrEditSpolocnikZakladatel() {
  console.log("Calling submit function!")
  vfm.close(modalIdAddOrEditSubjects)?.then(() => {
    console.log("then");
  })
}

const companyData = ref({
      typ_sudu: "MS",
      prislusny_sud: "Bratislava III",
      oddiel: "Sro",
      vlozka: "66264/B",
      typ_osoby: "pravnicka",
      hlavicka: "Spoločnosť zapísaná v obchodnom registri Mestského súdu Bratislava III, oddiel Sro, vložka 66264/B.",
      hlavicka_kratka: "MS Bratislava III, oddiel Sro, vložka 66264/B",
      obchodne_meno: "Top 1 Accounting, s.r.o.",
      obchodne_meno_since: "09.07.2010",
      likvidacia: 0,
      adresa: {
        street: "Cintorínska",
        number: "12",
        city: "Bratislava - mestská časť Staré Mesto",
        zip: "81108",
        since: "21.01.2021"
      },
      ico: 45633461,
      den_zapisu: "01.07.2010",
      pravna_forma: "Spoločnosť s ručením obmedzeným",
      predmet_cinnosti: [
        "kúpa tovaru na účely jeho predaja konečnému spotrebiteľovi (maloobchod) alebo iným prevádzkovateľom živnosti (veľkoobchod)",
        "sprostredkovateľská činnosť v oblasti služieb",
        "počítačové služby",
        "služby súvisiace s počítačovým spracovaním údajov",
        "poskytovanie úverov alebo pôžičiek z peňažných zdrojov získaných výlučne bez verejnej výzvy a bez verejnej ponuky majetkových hodnôt",
        "administratívne služby",
        "činnosť podnikateľských, organizačných a ekonomických poradcov",
        "vedenie účtovníctva",
        "reklamné a marketingové služby",
        "Fotografické služby",
        "Čistiace a upratovacie služby",
        "Skladovanie a pomocné činnosti v doprave",
        "Prenájom hnuteľných vecí",
        "Vykonávanie mimoškolskej vzdelávacej činnosti",
        "Uskutočňovanie stavieb a ich zmien",
        "Prípravné práce k realizácii stavby",
        "Dokončovacie stavebné práce pri realizácii exteriérov a interiérov",
        "Výskum a vývoj v oblasti prírodných, technických, spoločenských a humanitných vied",
        "Prevádzkovanie športových zariadení a zariadení slúžiacich na regeneráciu a rekondíciu",
        "Organizovanie športových, kultúrnych a iných spoločenských podujatí",
        "Prevádzkovanie kultúrnych, spoločenských a zábavných zariadení",
        "Prenájom nehnuteľností spojený s poskytovaním iných než základných služieb spojených s prenájmom",
        "Verejné obstarávanie",
        "Ubytovacie služby v ubytovacích zariadeniach s prevádzkovaním pohostinských činností v týchto zariadeniach a v chatovej osade triedy 3, v kempingoch triedy 3 a 4"
      ],
      spolocnici: [
        {
          name: "MK Tax Audit Advisory s. r. o.",
          street: "Cintorínska",
          city: "Bratislava - mestská časť Staré Mesto",
          number: "12",
          zip: "81108",
          since: "21.01.2021"
        },
        {
          name: "Ing. PhDr. Michal Kováčik",
          street: "Cintorínska",
          city: "Bratislava - mestská časť Staré Mesto",
          number: "12",
          zip: "81108",
          since: "21.01.2021"
        }
      ],
      vyska_vkladu: [
        {
          name: "MK Tax Audit Advisory s. r. o.",
          vklad: 2500,
          splatene: 2500,
          currency: "EUR"
        },
        {
          name: "Ing. PhDr. Michal Kováčik",
          vklad: 2500,
          splatene: 2500,
          currency: "EUR"
        }
      ],
      statutarny_organ: {
        konateľ: [
          {
            name: "Romana Kováčik",
            street: "Cintorínska",
            city: "Bratislava - mestská časť Staré Mesto",
            number: "12",
            zip: "81108",
            since: "01.06.2021"
          }
        ]
      },
      konanie_menom_spolocnosti: "V mene spoločnosti koná a za spoločnosť podpisuje konateľ spoločnosti samostatne a to tak, že k vytlačenému alebo napísanému obchodnému menu spoločnosti a menu a funkcii konajúceho pripojí svoj vlastnoručný podpis.",
      zakladne_imanie: {
        imanie: 5000,
        splatene: 5000,
        currency: "EUR"
      },
      dalsie_skutocnosti: [
        {
          eventText: "Spoločnosť bola založená spoločenskou zmluvou zo dňa 10.06.2010 v zmysle príslušných ustanovení zákona č. 513/1991 Zb. Obchodný zákonník.",
          eventDate: "09.07.2010"
        },
        {
          eventText: "Zápisnica z valného zhromaždenia zo dňa 25.02.2011",
          eventDate: "26.03.2011"
        },
        {
          eventText: "Zápisnica z mimoriadneho valného zhromaždenia zo dňa 21.06.2011.",
          eventDate: "06.08.2011"
        },
        {
          eventText: "Zápisnica z valného zhromaždenia zo dňa 13.1.2012",
          eventDate: "23.02.2012"
        },
        {
          eventText: "Zápisnica z valného zhromaždenia zo dňa 27.04.2013.",
          eventDate: "21.05.2013"
        },
        {
          eventText: "Zápisnica z valného zhromaždenia zo dňa 16.11.2015.",
          eventDate: "12.12.2015"
        }
      ],
      datum_aktualizacie: "20.12.2023",
      datum_vypisu: "21.12.2023"
    });


defineExpose({

})

</script>

<style>
.text-cross {
  text-decoration: line-through;
}
</style>