<template>
  <div class="min-h-screen bg-gray-900">
    <div class="w-full min-h-screen flex justify-center">
      <FormKit type="form" id="add-document" submit-label="Vystaviť doklad" @submit="submitHandler()" :actions="false"
        @keydown.enter="$event.preventDefault()">
        <div class="bg-gray-900 text-white rounded-lg px-4 my-2">
          <section>
            <div class="w-full p-4 flex flex-row justify-between">
              <FormKit v-model="document.subtype" type="select" placeholder="Vyberte druh dokladu"
                :options="Constants.DOCUMENT_SUBTYPES" @change="documentSubtypeChanged()" />
              <button class="bg-red-500 hover:bg-red-700 h-8 px-6 rounded text-white" v-on:click="cancelAddition()">
                X
              </button>
            </div>
            <div class="flex flex-row justify-between">
              <div class="flex">
                <h3 class="text-3xl font-bold py-10 text-white">
                  Vystavujete {{ documentTypeStr }} č.
                </h3>
                <div class="py-10 px-2">
                  <FormKit v-model="document.serial_number" autocomplete="nope" id="invoice-number" name="serial_number"
                    type="text" />
                </div>
              </div>
              <div class="flex">
                <div class="py-10 px-2 text-right">
                  <div>
                    <label class="text-sm">
                      {{ company.name }}
                    </label>
                    <br />
                    <label class="text-sm">
                      {{ address.street }} {{ address.street_number }}/{{
                        address.street_number2
                      }}
                      {{ address.city }}
                    </label>
                  </div>
                </div>
                <div class="py-10 px-2">
                  <BuildingOfficeIcon class="w-12 text-white" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div class="flex">
              <section class="flex flex-col w-full">
                <label for="client-name" class="flex text-white font-bold pb-2"
                  v-if="document.subtype != 5">Odberateľ</label>
                <label for="client-name" class="flex text-white font-bold pb-2" v-else>Dodávateľ</label>
                <div class="flex w-full gap-4">
                  <div class="w-full">
                    <label for="issue-date" class="text-white">Názov spoločnosti</label>
                    <Autocomplete v-model="finstatCompany"></Autocomplete>
                  </div>
                  <div class="w-full">
                    <FormKit v-model="document.contact_person" autocomplete="nope" id="client-name"
                      name="data[Client][name]" type="text" placeholder="Kontaktná osoba" label="Kontaktná osoba" />
                  </div>
                </div>

                <div class="flex flex-row gap-4">
                  <div class="flex pb-2">
                    <div class="w-full">
                      <FormKit v-model="document.address" autocomplete="nope" id="client-address"
                        name="data[Client][address]" type="text" placeholder="Adresa" label="Adresa" />
                    </div>
                  </div>
                  <div class="flex pb-2">
                    <div>
                      <FormKit v-model="document.psc" autocomplete="nope" id="client-zip" name="data[Client][zip]"
                        type="text" placeholder="PSČ" label="PSČ" />
                    </div>
                  </div>
                  <div class="flex pb-2">
                    <div class="w-full">
                      <FormKit v-model="document.city" autocomplete="nope" id="client-city" name="data[Client][city]"
                        type="text" placeholder="Mesto" label="Mesto" />
                    </div>
                  </div>
                  <div class="flex pb-2">
                    <div class="w-full">
                      <FormKit v-model="document.country" type="select" id="country" name="country" label="Krajina"
                        :options="Constants.COUNTRIES" />
                    </div>
                  </div>
                </div>

                <div class="flex flex-row gap-4">
                  <div class="flex pb-2">
                    <div class="w-full">
                      <FormKit v-model="document.ico" autocomplete="nope" id="client-ico" name="data[Client][ico]"
                        type="text" placeholder="IČO" label="IČO" />
                    </div>
                  </div>

                  <div class="flex pb-2">
                    <div class="w-full">
                      <FormKit v-model="document.dic" autocomplete="nope" id="client-dic" name="data[Client][dic]"
                        type="text" placeholder="DIČ" label="DIČ" />
                    </div>
                  </div>

                  <div class="flex">
                    <div class="w-full">
                      <FormKit v-model="document.icdph" autocomplete="nope" id="client-icdph" name="data[Client][ic_dph]"
                        type="text" label="IČ DPH" placeholder="IČ DPH" />
                      <label for="client-icdph" class="flex text-white text-xs">platca DPH</label>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col pt-16">
                  <div class="flex flex-row pb-8">
                    <div class="flex flex-row gap-3">
                      <div class="flex flex-col w-full" v-if="document.subtype != 4 && document.subtype != 5">
                        <FormKit type="date" name="Dátum vystavenia" v-model="document.date_of_issue" :value="today"
                          label="Dátum vystavenia" />
                      </div>
                      <div class="flex flex-col w-full" v-else>
                        <FormKit type="date" name="Dátum vystavenia" v-model="document.date_of_issue" :value="today"
                          label="Dátum vyhotovenia" />
                      </div>
                      <div class="flex flex-col w-full" v-if="document.subtype == 1 || document.subtype == 3">
                        <FormKit type="date" name="Dátum dodania" v-model="document.delivery_date" :value="today"
                          label="Dátum dodania" />
                      </div>
                      <div class="flex flex-col w-full" v-if="document.subtype != 4 && document.subtype != 5">
                        <FormKit type="select" id="due-in" name="due-in" label="Splatnosť" :options="Constants.DUES"
                          v-model="document.due_by" />
                      </div>
                      <div class="flex flex-col w-full" v-if="document.subtype == 3">
                        <FormKit type="text" name="K faktúre č." label="K faktúre č." v-model="document.serial_number" />
                      </div>
                      <div class="flex flex-col w-full justify-between" data-slot="invoice-vs" data-slot-rule="non-mobile"
                        v-if="document.subtype != 4 && document.subtype != 5">
                        <FormKit v-model="document.variabilny" autocomplete="nope" type="text" id="vs" name="variable"
                          label="Variabilný symbol" :value="document.serial_number" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col pt-8">
                  <div class="flex flex-row gap-3">
                    <div class="flex flex-col w-full" v-if="document.subtype == 4 || document.subtype == 5">
                      <FormKit autocomplete="nope" type="text" id="order-name" label="Názov zákazky"
                        v-model="document.order_name" />
                    </div>
                    <div class="flex flex-col w-full" v-if="document.subtype == 4 || document.subtype == 5">
                      <FormKit autocomplete="nope" type="textarea" id="order-description" label="Predmet zákazky"
                        v-model="document.order_description" />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>

          <button @click="toggleAccordion()" class="flex items-center space-x-3 py-8" :aria-expanded="isOpen"
            type="button">
            <label class="pr-2">Zobraziť viac údajov</label>
            <svg class="w-3 transition-all duration-200 transform" :class="{
              'rotate-180': isOpen,
              'rotate-0': !isOpen,
            }" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"
              aria-hidden="true">
              <path d="M15 1.2l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <section>
            <div class="flex flex-col" v-if="isOpen">
              <div>
                <FormKit type="dropdown" name="bankaccount_dropdown" label="Bankový účet" :options="fetchBankAccounts"
                  validation="required" v-model="bankAccountId" :value="companyBankDetails">
                </FormKit>
              </div>
              <div class="flex flex-row">
                <div class="flex flex-col w-full justify-between px-4">
                  <FormKit type="textarea" rows="10" id="comment_above" v-model="document.note_above" validation="length:0,255"
                    label="Poznámka nad položkami" />
                </div>
                <div class="flex basis-2/3 flex-col">
                  <FormKit type="textarea" rows="10" id="comment_below" label="Poznámka pod položkami" validation="length:0,255"
                    v-model="document.note_under" />
                </div>
              </div>
              <div class="flex flex-col">
                <div class="flex flex-row gap-3 py-8">
                  <div class="flex flex-col basis-1/4">
                    <FormKit type="select" id="delivery-type" name="delivery-type" label="Spôsob dodania"
                      :options="Constants.DELIVERY_TYPES" v-model="document.delivery_method" />
                  </div>
                  <div class="flex flex-col basis-1/4">
                    <FormKit type="select" id="payment_type" name="payment_type" label="Forma úhrad"
                      :options="Constants.PAYMENT_TYPES" v-model="document.payment_method" />
                  </div>
                  <div class="flex flex-col basis-1/4" v-if="document.subtype != 4 && document.subtype != 5">
                    <FormKit autocomplete="nope" type="text" id="constant-symbol" name="constant" validation="length:0,4"
                      label="Konštantný symbol" v-model="document.konstantny" />
                  </div>
                  <div class="flex flex-col basis-1/4" v-if="document.subtype != 4 && document.subtype != 5">
                    <FormKit autocomplete="nope" type="text" id="specific-symbol" label="Špecifický symbol" validation="length:0,10"
                      v-model="document.specificky" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col pb-10">
              <div class="text-teal-500 flex flex-row bg-gray-700 py-4 rounded-lg">
                <div class="text-teal-500 flex basis-1/12 pl-4">P. Č.</div>
                <div class="text-teal-500 flex basis-3/12 pl-2">Názov položky</div>
                <div class="text-teal-500 flex basis-2/12">
                  Množstvo
                </div>
                <div class="text-teal-500 flex basis-2/12 pl-8">MJ</div>
                <div class="text-teal-500 flex basis-2/12 pr-10">
                  Cena
                </div>
                <div class="text-teal-500 flex basis-2/12" v-if="document.isDph">
                  DPH %
                </div>
                <div class="text-teal-500 flex basis-2/12 justify-end pr-4">
                  Spolu
                </div>
              </div>

              <ul class="py-2" id="items_list">
                <li v-for="(item, index) in items" :key="index">
                  <div class="flex flex-row gap-1">
                    <div class="flex flex-col basis-1/12 mt-6">
                      <div class="flex pl-4">
                        {{ index + 1 }}
                      </div>
                    </div>

                    <div class="flex flex-col basis-9/12">
                      <div class="flex flex-row gap-2">
                        <div class="flex">
                          <FormKit autocomplete="nope" class="flex" id="name" type="text"
                            placeholder="Zadajte názov položky" v-model="item.name" />
                        </div>
                        <div class="flex">
                          <FormKit autocomplete="nope" type="number" id="quantity" class="flex" inputmode="decimal"
                            step="any" min="0" number v-model="item.quantity" @change="quantityEntered(item)" />
                        </div>
                        <div class="flex">
                          <FormKit type="select" id="unit" :options="Constants.UNITS" v-model="item.unit" />
                        </div>
                        <div class="flex">
                          <FormKit autocomplete="nope" type="number" class="flex" id="unit-price" step="0.01" number
                            v-model="item.unit_price" @change="priceEntered(item)" />
                        </div>
                        <div class="flex" v-if="document.isDph">
                          <FormKit autocomplete="nope" type="text" class="flex" id="vat" step="0.01" number
                            v-model="item.vat" novalidate @change="vatEntered($event, item)" />
                        </div>
                      </div>
                      <div class="flex flex-row w-full">
                        <div class="w-full">
                          <FormKit type="text" id="desc" placeholder="Detailný popis položky…" validation="length:0,255"
                            v-model="item.description" />
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col basis-2/12">
                      <div class="flex flex-row gap-2">
                        <div class="flex">
                          <FormKit autocomplete="nope" type="text" class="flex" id="total" step="0.01"
                            number v-model="item.total" disabled />
                        </div>
                      </div>
                      <button type="button" class="hover:bg-red-400 text-red-700 font-bold px-4 rounded-lg"
                        title="Vymazať položku" v-on:click="removeItem(index)">
                        Vymazať položku
                      </button>
                    </div>
                  </div>
                  <hr class="my-1 h-px bg-gray-500 border-0" />
                </li>
              </ul>

              <div class="flex flex-row pt-4">
                <button type="button"
                  class="shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
                  v-on:click="addItem()">
                  Pridať ďalšiu položku
                </button>
              </div>
            </div>
            <div class="flex justify-end">
              <div class="flex basis-1/4">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <th class="text-right pr-1 text-4xl" v-if="document.subtype == 3">
                        {{ totalPrice.toFixed(2) * -1 }}
                      </th>
                      <th class="text-right pr-1 text-4xl" v-else>
                        {{ totalPrice.toFixed(2) }}
                      </th>
                      <th>
                        <FormKit type="select" id="currency" name="currency" :options="Constants.CURRENCIES"
                          v-model="document.currency" />
                      </th>
                    </tr>
                    <tr v-if="document.isDph">
                      <th class="text-right">Spolu s DPH</th>
                      <th class="text-left pl-4">
                        {{ (totalPrice+totalPriceVat).toFixed(2) }}&nbsp;{{ document.currency }}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <div class="flex justify-center py-20">
            <FormKit label="Vytvoriť doklad" type="submit"
              class="shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2" />
          </div>
        </div>
      </FormKit>
    </div>
  </div>
  <Dialog :open="showLoadingModalDialog" @close="showLoadingModalDialog = false" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
      <DialogPanel class="w-full max-w-sm rounded bg-gray-900 shadow text-white">
        <DialogTitle class="text-center py-4 text-xl font-bold">Doklad bol úspešne nahraný, prajete si pridať ďalší?
        </DialogTitle>

        <div class="flex flex-row justify-end py-2 px-4">
          <div class="flex flex-1/4 px-4">
            <button class="bg-teal-500 hover:bg-teal-700 h-8 px-6 rounded z-10 text-gray-700" v-on:click="addNew()">
              Pridať ďalší
            </button>
          </div>
          <div class="flex flex-1/4">
            <button class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-white" v-on:click="closeModal()">
              Zoznam dokladov
            </button>
          </div>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import type Company from "@/types/Company";
import store from "@/store";
import { ref, onBeforeMount, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import Constants from "@/helpers/constants";
import { BuildingOfficeIcon } from "@heroicons/vue/24/outline";
import Autocomplete from "@/components/Autocomplete.vue";
import { toast } from 'vue3-toastify';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';

const route = useRoute();
const router = useRouter();
const subtype = Number(route.params.subtype);
const submitted = ref(false);
const today = moment(new Date()).format("YYYY-MM-DD");
const isOpen = ref(false);
const bankAccountId = ref();
const showLoadingModalDialog = ref(false);
const company = ref({} as Company);
const address = ref({
  id: 0,
  street: "",
  street_number: 0,
  street_number2: 0,
  city: "",
  country: "",
  psc: "",
});

const items = ref([
  {
    name: "",
    quantity: 1,
    unit: "ks",
    unit_price: 0.0,
    vat: 0,
    total: 0.0,
    total_vat: 0.0,
    description: "",
  }
]);

const totalPrice: any = computed(() => {
  return items.value.reduce((acc, item) => acc + item.total, 0);
});
const totalPriceVat: any = computed(() => {
  return items.value.reduce((acc, item) => acc + item.total_vat, 0);
});

const headquarter = ref({
  id: 0,
  address_id: 0,
});

const companyBankDetails = ref({
  id: 0,
  account_name: "",
  bank_name: "",
  iban: "",
  account_number: "",
  swift: "",
  bank_code: "",
  is_main: false,
  company_id: 0
});

const documentTypeStr = ref("faktúru");

const serial_number = ref("");
const variabilny = ref("");

const document = ref({
  type: 1,
  subtype: subtype,
  company_id: company.value.id,
  bank_account_id: null,
  odberatel: "",
  contact_person: "",
  address: "",
  psc: "",
  city: "",
  country: "Slovensko",
  ico: "",
  dic: "",
  icdph: "",
  serial_number: serial_number,
  variabilny: variabilny,
  konstantny: "",
  specificky: "",
  note_above: "",
  items: [] as any[],
  note_under: "",
  date_of_issue: today,
  due_by: "14 dní",
  due_by_date: today,
  delivery_method: "Osobný odber",
  delivery_date: today,
  payment_method: "Bankový prevod",
  currency: "€",
  pdf: "",
  isIssued: true,
  isPaid: false,
  reminder_sent: false,
  paid: 0.0,
  total: totalPrice,
  total_vat: totalPriceVat,
  payment_date: "",
  order_name: "",
  order_description: "",
  isDph: false
});

watch(
  () => store.getters.getSelectedCompany,
  function () {
    refreshData();
  }
);

watch(bankAccountId, async () => {
  const res = await store.dispatch("getBankAccountById", bankAccountId.value)
  if (res.data) {
    bankAccountId.value = res.data.id;
    companyBankDetails.value = res.data;
  }
})

const finstatCompany = ref({} as any);
const finstatCompanyDetails = ref({} as any);

watch(finstatCompany, (newFinstatCompany, prevFinstatCompany) => {
  if (newFinstatCompany.Spoločnosť !== undefined) {
    getCompanyDetails();
  }
});

async function fetchBankAccounts() {
  const res = await store.dispatch("getCompanyBankDetails", company.value.id)
  if (res.data[0]?.id) {
    return res.data.map((data) => {
      if (data?.is_main == 1) {
        bankAccountId.value = data?.id;
      }
      return {
        label: `${data?.account_name ?? ''} IBAN: ${data?.iban ?? ''}`,
        value: data.id
      }
    })
  } else {
    return []
  }
}

async function getCompanyDetails() {
  let ico = {
    ico: ""
  }

  if (finstatCompany.value.Spoločnosť.Ico !== undefined) {
    ico = {
      ico: finstatCompany.value.Spoločnosť.Ico
    }

    await store
      .dispatch("getDetailsOfCompanyFinstat", ico)
      .then((res: any) => {
        finstatCompanyDetails.value = res.data;
        document.value.ico = finstatCompanyDetails.value.Ico;
        document.value.dic = finstatCompanyDetails.value.Dic;
        document.value.icdph = finstatCompanyDetails.value.IcDPH;
        document.value.address = finstatCompanyDetails.value.Street + " " + finstatCompanyDetails.value.StreetNumber;
        document.value.psc = finstatCompanyDetails.value.ZipCode;
        document.value.city = finstatCompanyDetails.value.City;

      })
      .catch((err) => {
        toast.error('Error: ' + err);
      });
  }
}

async function setSerialNumber() {
  const inputs = {
    companyId: company.value.id,
    subtype: document.value.subtype
  }

  await store
    .dispatch("getDocumentSnForCompany", inputs)
    .then((response) => {
      serial_number.value = response.data;
      variabilny.value = response.data;
    });
}

async function refreshData() {
  documentSubtypeChanged();

  await store
    .dispatch("getSelectedCompany", store.state.selectedCompany.id)
    .then(async (response) => {
      company.value = response.data;
      document.value.company_id = company.value.id;
      //aktualizovat adresu
      await store
        .dispatch("getHeadquartersById", company.value.headquarters_id)
        .then((response) => {
          headquarter.value = response.data;
          store
            .dispatch("getAddressById", headquarter.value.address_id)
            .then((response) => {
              address.value = response.data;
            });
        });

      //aktualizovat bankove detaily
      await store
        .dispatch("getCompanyBankDetails", company.value.id)
        .then((response) => {
          const bankAccounts = response.data;
          companyBankDetails.value = bankAccounts.filter((item) => { return (item.is_main == 1); })[0];
          bankAccountId.value = companyBankDetails.value.id;
        });
    });

  if (company.value.is_dph || company.value.icdph) {
    items.value[0].vat = 20;
    document.value.isDph = true;
  }

}

function toggleAccordion() {
  isOpen.value = !isOpen.value;
}

function priceEntered(item: any) {
  if (item.vat > 0) {
    item.total = item.quantity * item.unit_price;
    item.total_vat = item.total * item.vat / 100;
  } else {
    item.total = item.quantity * item.unit_price;
  }
}

function quantityEntered(item: any) {
  if (item.vat > 0) {
    item.total = item.quantity * item.unit_price;
    item.total_vat = item.total * item.vat / 100;
  } else {
    item.total = item.quantity * item.unit_price;
  }
}

function vatEntered(event: any, item: any) {
  if (
    event.target.value == 0 &&
    !document.value.note_above.includes("Prenos daňovej povinnosti")
  ) {
    if (document.value.note_above == "") {
      document.value.note_above = "Prenos daňovej povinnosti";
    } else {
      document.value.note_above += "\nPrenos daňovej povinnosti";
    }
  }
  if (
    event.target.value != 0 &&
    document.value.note_above.includes("Prenos daňovej povinnosti")
  ) {
    document.value.note_above = document.value.note_above.replace(
      "\nPrenos daňovej povinnosti",
      ""
    );
  }

  item.total_vat = item.total * item.vat / 100;

}

function documentSubtypeChanged() {
  switch (document.value.subtype) {
    case 1:
      document.value.type = 1;
      document.value.subtype = 1;
      documentTypeStr.value = "fakúru";
      break;
    case 2:
      document.value.type = 1;
      document.value.subtype = 2;
      documentTypeStr.value = "zálohovú fakúru";
      break;
    case 3:
      document.value.type = 1;
      document.value.subtype = 3;
      documentTypeStr.value = "dobropis";
      break;
    case 4:
      document.value.type = 2;
      document.value.subtype = 4;
      documentTypeStr.value = "cenovú ponuku";
      break;
    case 5:
      document.value.type = 2;
      document.value.subtype = 5;
      documentTypeStr.value = "objednávku";
      break;
  }
}

function addItem() {
  let item = {
    name: "",
    quantity: 1,
    unit: "ks",
    unit_price: 0.0,
    vat: 0,
    total: 0.0,
    total_vat: 0.0,
    description: "",
  };
  if (company.value.is_dph || company.value.icdph) {
    item.vat = 20;
  }
  items.value.push(item);
}

function removeItem(index: number) {
  items.value.splice(index, 1);
}

function cancelAddition() {
  store.state.documentTab = 1;
  router.push({
    name: "Doklady",
  });
}

function submitHandler() {
  if (companyBankDetails.value != undefined) {
    submitted.value = true;
    document.value.odberatel = finstatCompany.value.Spoločnosť.Name;
    document.value.items = items.value;
    document.value.bank_account_id = bankAccountId.value;

    return store
      .dispatch("addDocument", document.value)
      .then((res) => {
        showLoadingModalDialog.value = true;
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error: ' + err);
      });
  } else {
    toast.error('Nemáte pridaný bankový účet.');
  }

}

function addNew() {
  showLoadingModalDialog.value = false;
  store.state.documentTab = 1;
  router.push({
    name: "Add document",
  });
}

function closeModal() {
  showLoadingModalDialog.value = false;
  store.state.documentTab = 1;
  router.push({
    name: "Doklady",
  });
}

onBeforeMount(async () => {
  store.state.mySubmenuActive = 1;
  await refreshData();
  await setSerialNumber();
});
</script>
