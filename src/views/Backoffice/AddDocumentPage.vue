<template>
  <div class="min-h-screen bg-gray-900">
    <div class="w-full min-h-screen flex justify-center">
      <FormKit
        type="form"
        id="add-document"
        submit-label="Vystaviť doklad"
        @submit="submitHandler()"
        :actions="false"
        @keydown.enter="$event.preventDefault()"
      >
        <div class="bg-gray-200 rounded-lg px-4 my-2">
          <section>
            <div class="w-full p-4 flex flex-row justify-between">
              <FormKit
                v-model="document.subtype"
                type="select"
                placeholder="Vyberte druh dokladu"
                :options="Constants.DOCUMENT_SUBTYPES"
                @change="documentSubtypeChanged()"
              />
              <button
                class="bg-red-500 hover:bg-red-700 h-8 px-6 rounded z-10 text-white"
                v-on:click="cancelAddition()"
              >
                X
              </button>
            </div>
            <div class="flex flex-row justify-between">
              <div class="flex">
                <h3 class="text-3xl font-bold py-10 text-black">
                  Vystavujete {{ documentTypeStr }} č.
                </h3>
                <div class="py-10 px-2">
                  <FormKit
                    v-model="document.serial_number"
                    autocomplete="nope"
                    id="invoice-number"
                    name="serial_number"
                    type="text"
                  />
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
                  <OfficeBuildingIcon
                    class="w-12 text-black"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <div class="flex">
              <section class="flex flex-col w-full">
                <label for="client-name" class="flex text-black font-bold"
                  >Odberateľ</label
                >
                <div class="flex py-2 w-full">
                  <div class="w-full">
                    <Autocomplete v-model="odberatel"></Autocomplete>
                  </div>
                  <div class="w-full">
                    <FormKit
                      v-model="document.contact_person"
                      autocomplete="nope"
                      id="client-name"
                      name="data[Client][name]"
                      type="text"
                      placeholder="Kontaktná osoba"
                    />
                  </div>
                </div>

                <div class="flex flex-row gap-4">
                  <div class="flex pb-2">
                    <div class="w-full">
                      <FormKit
                        v-model="document.address"
                        autocomplete="nope"
                        id="client-address"
                        name="data[Client][address]"
                        type="text"
                        placeholder="Adresa"
                      />
                    </div>
                  </div>
                  <div class="flex pb-2">
                    <div>
                      <FormKit
                        v-model="document.psc"
                        autocomplete="nope"
                        id="client-zip"
                        name="data[Client][zip]"
                        type="text"
                        placeholder="PSČ"
                      />
                    </div>
                  </div>
                  <div class="flex pb-2">
                    <div class="w-full">
                      <FormKit
                        v-model="document.city"
                        autocomplete="nope"
                        id="client-city"
                        name="data[Client][city]"
                        type="text"
                        placeholder="Mesto"
                      />
                    </div>
                  </div>
                  <div class="flex pb-2">
                    <div class="w-full">
                      <FormKit
                        v-model="document.country"
                        type="select"
                        id="country"
                        name="country"
                        :options="Constants.COUNTRIES"
                      />
                    </div>
                  </div>
                </div>

                <div class="flex flex-row gap-4">
                  <div class="flex pb-2">
                    <div class="w-full">
                      <FormKit
                        v-model="document.ico"
                        autocomplete="nope"
                        id="client-ico"
                        name="data[Client][ico]"
                        type="text"
                        placeholder="IČO"
                      />
                    </div>
                  </div>

                  <div class="flex pb-2">
                    <div class="w-full">
                      <FormKit
                        v-model="document.dic"
                        autocomplete="nope"
                        id="client-dic"
                        name="data[Client][dic]"
                        type="text"
                        placeholder="DIČ"
                      />
                    </div>
                  </div>

                  <div class="flex">
                    <div class="w-full">
                      <FormKit
                        v-model="document.icdph"
                        autocomplete="nope"
                        id="client-icdph"
                        name="data[Client][ic_dph]"
                        type="text"
                        placeholder="IČ DPH"
                      />
                      <label for="client-icdph" class="flex text-black text-xs"
                        >platca DPH</label
                      >
                    </div>
                  </div>
                </div>

                <div class="flex flex-col pt-16">
                  <div class="flex flex-row pb-8">
                    <div class="flex flex-row gap-3">
                      <div class="flex flex-col w-full">
                        <label for="issue-date" class="text-black"
                          >Dátum vystavenia</label
                        >
                        <FormKit
                          type="date"
                          name="Dátum vystavenia"
                          validation="required|length:10"
                          v-model="document.date_of_issue"
                          :value="today"
                        />
                      </div>
                      <div class="flex flex-col w-full">
                        <label for="delivery-date" class="text-black"
                          >Dátum dodania</label
                        >
                        <FormKit
                          type="date"
                          name="Dátum dodania"
                          validation="required|length:10"
                          v-model="document.delivery_date"
                          :value="today"
                        />
                      </div>
                      <div class="flex flex-col w-full">
                        <label for="due-in" class="text-black">Splatnosť</label>
                        <FormKit
                          type="select"
                          id="due-in"
                          name="due-in"
                          :options="Constants.DUES"
                          v-model="document.due_by"
                        />
                      </div>
                      <div
                        class="flex flex-col w-full justify-between"
                        data-slot="invoice-vs"
                        data-slot-rule="non-mobile"
                      >
                        <label for="vs" class="text-black pr-4"
                          >Variabilný symbol</label
                        >
                        <FormKit
                          v-model="document.variabilny"
                          autocomplete="nope"
                          type="text"
                          id="vs"
                          name="[variable]"
                          :value="document.serial_number"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>

          <button
            @click="toggleAccordion()"
            class="flex items-center space-x-3 py-8"
            :aria-expanded="isOpen"
          >
            <label class="pr-2">Zobraziť viac údajov</label>
            <svg
              class="w-3 transition-all duration-200 transform"
              :class="{
                'rotate-180': isOpen,
                'rotate-0': !isOpen,
              }"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 10"
              aria-hidden="true"
            >
              <path
                d="M15 1.2l-7 7-7-7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <section>
            <div class="flex flex-col" v-show="isOpen">
              <div>
                <div class="flex flex-row justify-between pb-8">
                  <div class="flex basis-1/2 flex-col justify-between px-4">
                    <label class="text-black pr-4 font-bold"
                      >Názov Vašej banky</label
                    >
                    <label class="text-black pr-4">
                      {{ companyBankDetails.name }}
                    </label>
                  </div>

                  <div class="flex basis-1/2 flex-col justify-between">
                    <label class="text-black pr-4 font-bold">IBAN</label>
                    <label class="text-black pr-4">
                      {{ companyBankDetails.iban }}
                    </label>
                  </div>
                </div>

                <div class="flex flex-row pb-8">
                  <div class="flex basis-1/2 flex-col justify-between px-4">
                    <label class="text-black pr-4 font-bold">SWIFT</label>
                    <label class="text-black pr-4">
                      {{ companyBankDetails.swift }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="flex flex-row">
                <div class="flex flex-col w-full justify-between px-4">
                  <label for="comment__above" class="text-black"
                    >Poznámka nad položkami</label
                  >
                  <FormKit
                    type="textarea"
                    rows="10"
                    id="comment_above"
                    v-model="document.note_above"
                  />
                </div>
                <div class="flex basis-2/3 flex-col">
                  <label for="comment" class="text-black pb-2"
                    >Poznámka pod položkami</label
                  >
                  <FormKit
                    type="textarea"
                    rows="10"
                    id="comment_below"
                    v-model="document.note_under"
                  />
                </div>
              </div>
              <div class="flex flex-col">
                <div class="flex flex-row gap-3 py-8">
                  <div class="flex flex-col basis-1/4">
                    <label for="delivery-type" class="text-black"
                      >Spôsob dodania</label
                    >
                    <FormKit
                      type="select"
                      id="delivery-type"
                      name="delivery-type"
                      :options="Constants.DELIVERY_TYPES"
                      v-model="document.delivery_method"
                    />
                  </div>
                  <div class="flex flex-col basis-1/4">
                    <label for="payment-type" class="text-black"
                      >Forma úhrady</label
                    >
                    <FormKit
                      type="select"
                      id="payment_type"
                      name="payment_type"
                      :options="Constants.PAYMENT_TYPES"
                      v-model="document.payment_method"
                    />
                  </div>
                  <div class="flex flex-col basis-1/4">
                    <label for="constant-symbol" class="text-black"
                      >Konštantný symbol</label
                    >
                    <FormKit
                      autocomplete="nope"
                      type="text"
                      id="constant-symbol"
                      name="[constant]"
                      v-model="document.konstantny"
                    />
                  </div>
                  <div class="flex flex-col basis-1/4">
                    <label for="specific-symbol" class="text-black"
                      >Špecifický symbol</label
                    >
                    <FormKit
                      autocomplete="nope"
                      type="text"
                      id="specific-symbol"
                      v-model="document.specificky"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col pb-10">
              <div
                class="text-teal-500 flex flex-row bg-gray-700 py-4 rounded-lg"
              >
                <div class="text-teal-500 flex basis-1/12 pl-4">P. Č.</div>
                <div class="text-teal-500 flex basis-3/12">Názov položky</div>
                <div class="text-teal-500 flex basis-2/12 justify-end pr-2">
                  Množstvo
                </div>
                <div class="text-teal-500 flex basis-2/12 pl-12">MJ</div>
                <div class="text-teal-500 flex basis-2/12 justify-end pr-10">
                  Cena
                </div>
                <div
                  class="text-teal-500 flex basis-2/12 justify-end"
                  v-show="company.is_dph"
                >
                  DPH %
                </div>
                <div class="text-teal-500 flex basis-2/12 justify-end pr-4">
                  Spolu
                </div>
              </div>

              <ul class="py-2" id="items_list">
                <li v-for="(item, index) in items" :key="index">
                  <div class="flex flex-row gap-1">
                    <div class="flex flex-col basis-1/12">
                      <div class="flex pl-4">
                        {{ index + 1 }}
                      </div>
                    </div>

                    <div class="flex flex-col basis-5/6">
                      <div class="flex flex-row gap-2">
                        <div class="flex">
                          <FormKit
                            autocomplete="nope"
                            class="flex"
                            id="name"
                            type="text"
                            placeholder="Zadajte názov položky"
                            v-model="item.name"
                          />
                        </div>
                        <div class="flex">
                          <FormKit
                            autocomplete="nope"
                            type="text"
                            id="quantity"
                            class="flex"
                            inputmode="decimal"
                            v-model="item.quantity"
                            @change="quantityEntered(item)"
                          />
                        </div>
                        <div class="flex">
                          <FormKit
                            type="select"
                            id="unit"
                            :options="Constants.UNITS"
                            v-model="item.unit"
                          />
                        </div>
                        <div class="flex">
                          <FormKit
                            autocomplete="nope"
                            type="text"
                            class="flex"
                            id="unit-price"
                            inputmode="decimal"
                            v-model="item.unit_price"
                            @change="priceEntered(item)"
                          />
                        </div>
                        <div class="flex" v-show="company.is_dph">
                          <FormKit
                            autocomplete="nope"
                            type="text"
                            class="flex"
                            id="vat"
                            inputmode="decimal"
                            v-model="item.vat"
                            novalidate
                            @change="vatEntered($event)"
                          />
                        </div>
                      </div>
                      <div class="flex flex-row w-full">
                        <div class="w-full">
                          <FormKit
                            type="text"
                            id="desc"
                            placeholder="Detailný popis položky…"
                            v-model="item.description"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col basis-1/12">
                      <div class="flex">
                        <FormKit
                          autocomplete="nope"
                          type="text"
                          class="flex"
                          id="total"
                          inputmode="decimal"
                          v-model="item.total"
                          disabled
                        />
                      </div>
                      <button
                        type="button"
                        class="hover:bg-red-400 text-red-700 font-bold px-4 rounded-lg"
                        title="Vymazať položku"
                        v-on:click="removeItem(index)"
                      >
                        Vymazať položku
                      </button>
                    </div>
                  </div>
                  <hr class="my-1 h-px bg-gray-500 border-0" />
                </li>
              </ul>

              <div class="flex flex-row pt-4">
                <button
                  type="button"
                  class="shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
                  v-on:click="addItem()"
                >
                  Pridať ďalšiu položku
                </button>
              </div>
            </div>
            <div class="flex justify-end">
              <div class="flex basis-1/4">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <th class="text-right pr-1 text-4xl">
                        {{ totalPrice.toFixed(2) }}
                      </th>
                      <th>
                        <FormKit
                          type="select"
                          id="currency"
                          name="currency"
                          :options="Constants.CURRENCIES"
                          v-model="document.currency"
                        />
                      </th>
                    </tr>
                    <tr v-show="company.is_dph">
                      <th class="text-left pl-2">DPH</th>
                      <th class="text-right pr-2">
                        {{ totalPriceVat }}&nbsp;{{ document.currency }}
                      </th>
                    </tr>
                    <tr v-show="company.is_dph">
                      <th class="text-left pl-2">Celková suma</th>
                      <th class="text-right pr-2">
                        {{ totalPrice + totalPriceVat }}&nbsp;{{
                          document.currency
                        }}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <div class="flex justify-center py-20">
            <FormKit
              label="Vytvoriť doklad"
              type="submit"
              class="shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
            />
          </div>
        </div>
      </FormKit>
    </div>
  </div>
  <Modal
    name="submitted1"
    v-model:visible="isVisible"
    :type="'clean'"
    :closable="false"
    title="Nahrávanie úspešné"
  >
    <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
      <div class="flex flex-row justify-start py-4 px-4 text-white font-bold">
        Doklad bol úspešne nahraný, prajete si pridať ďalší?
      </div>
      <div class="flex flex-row justify-end py-2 px-4">
        <div class="flex flex-1/4 px-4">
          <button
            class="bg-teal-500 hover:bg-teal-700 h-8 px-6 rounded z-10 text-gray-700"
            v-on:click="addNew()"
          >
            Pridať ďalší
          </button>
        </div>
        <div class="flex flex-1/4">
          <button
            class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-white"
            v-on:click="closeModal()"
          >
            Zoznam dokladov
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import type Company from "@/types/Company";
import store from "@/store";
import { ref, onBeforeMount, computed, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import { useModal, Modal } from "usemodal-vue3";
import Constants from "@/helpers/constants";
import { OfficeBuildingIcon } from "@heroicons/vue/outline";
import Autocomplete from "@/components/Autocomplete.vue";

const route = useRoute();
const router = useRouter();
const subtype = Number(route.params.subtype);
const submitted = ref(false);
const today = moment(new Date()).format("YYYY-MM-DD");
const isOpen = ref(false);

const odberatel = ref({} as any);

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
    quantity: 0,
    unit: "ks",
    unit_price: 0.0,
    vat: 0,
    total: 0.0,
    description: "",
  },
]);

const totalPrice: any = computed(() => {
  return items.value.reduce((acc, item) => acc + item.total, 0);
});
const totalPriceVat: any = computed(() => {
  return totalPrice.value * 0.2;
});

const headquarter = ref({
  id: 0,
  address_id: 0,
});

const companyBankDetails = ref({
  name: "",
  iban: "",
  swift: "",
});

const documentTypeStr = ref("faktúru");

const serial_number = ref("");
const variabilny = ref("");

const document = ref({
  type: 1,
  subtype: subtype,
  company_id: company.value.id,
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
  payment_date: "",
});

watch(
  () => store.getters.getSelectedCompany,
  function () {
    refreshData();
  }
);

async function setSerialNumber() {
  store
    .dispatch("getDocumentSnForCompany", company.value.id)
    .then((response) => {
      serial_number.value = response.data;
      variabilny.value = response.data;
    });
}

async function refreshData() {
  await store
    .dispatch("getSelectedCompany", store.state.selectedCompany.id)
    .then((response) => {
      company.value = response.data;
      document.value.company_id = company.value.id;
      //aktualizovat adresu
      store
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
      store
        .dispatch("getCompanyBankDetails", company.value.id)
        .then((response) => {
          companyBankDetails.value = response.data;
        });
    });
}

function toggleAccordion() {
  isOpen.value = !isOpen.value;
}

function priceEntered(item: any) {
  if (item.vat > 0) {
    item.total = item.quantity * item.unit_price;
  } else {
    item.total = item.quantity * item.unit_price;
  }
}

function quantityEntered(item: any) {
  if (item.vat > 0) {
    item.total = item.quantity * item.unit_price;
  } else {
    item.total = item.quantity * item.unit_price;
  }
}

function vatEntered(event: any) {
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
  const item = {
    name: "",
    quantity: 0,
    unit: "ks",
    unit_price: 0.0,
    vat: 0,
    total: 0.0,
    description: "",
  };

  items.value.push(item);
}

function removeItem(index: number) {
  items.value.splice(index, 1);
}

function cancelAddition() {
  router.push({
    name: "My documents",
  });
}

function submitHandler() {
  submitted.value = true;
  document.value.odberatel = odberatel.value.Spoločnosť.Name;
  document.value.items = items.value;
  document.value.paid = document.value.total;

  return store
    .dispatch("addDocument", document.value)
    .then((res) => {
      showModal();
    })
    .catch((err) => {
      console.log(err);
    });
}

const setModal = useModal({
  submitted1: 1,
});

let isVisible = reactive({});

isVisible = setModal("submitted1", false);

function showModal() {
  isVisible = setModal("submitted1", true);
}

function addNew() {
  isVisible = setModal("submitted1", false);
  router.push({
    name: "Add document",
  });
}

function closeModal() {
  isVisible = setModal("submitted1", false);
  router.push({
    name: "My documents",
  });
}

onBeforeMount(async () => {
  await refreshData();
  await setSerialNumber();
});
</script>

<style>
.modal-vue3-footer {
  display: none !important;
}
</style>
