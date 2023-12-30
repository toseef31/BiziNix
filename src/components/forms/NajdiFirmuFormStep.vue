<template>
  <div class="text-4xl font-bold mb-6">Ako prvé zadajte IČO vašej firmy</div>
  <FormKit
    name="Spoločnosť"
    type="autocomplete"
    label="IČO spoločnosti"
    placeholder="Zadajte IČO spoločnosti"
    :options="search"
    validation="required"
  >
    <template #option="{ option }">
      <div class="formkit-option grow p-2">
        <div class="font-bold">{{ option.label }}, {{ option.city }}</div>
        <p class="option-overview">IČO: {{ option.ico }}</p>
      </div>
    </template>
  </FormKit>
  <div class="flex flex-col space-y-4 last:mb-4">
    <EditItemForCompany title="Obchodné meno">
      <div class="grid grid-cols-2 items-center">
        <div>
          <h1 class="text-lg">{{ companyData.obchodne_meno }}</h1>
        </div>
        <div>
          <button @click.prevent="" class="bg-bizinix-teal p-2 rounded">Upraviť</button>
        </div>
      </div>
    </EditItemForCompany>
    <EditItemForCompany title="Konatelia">
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
import { onBeforeMount, ref } from 'vue';
import type Company from '@/types/Company';
import { useVfm, VueFinalModal } from 'vue-final-modal'
import EditItemForCompany from './EditItemForCompany.vue'

const vfm = useVfm()
const modalIdAddOrEditSubjects = Symbol('modalIdAddOrEditSubjects')
const loading = ref(true);
const subjects_of_business = ref<Company['subjects_of_business']>([]);

onBeforeMount(() => {
})

async function search({ search }: any) {
  if (!search) return [];
  if (search.length > 2) {
    const searchQuery = {
      searchQuery: search,
    };
    const res = await store
      .dispatch("searchCompanies", searchQuery)
      .catch((err) => {
        console.log(err);
      });
// update function for search in other API
    return res.data.Results.map((result: any) => {
      return {
        label: result.Name,
        value: result,
        city: result.City,
        ico: result.Ico
      };
    });
  }
  return [];
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