<template>
  <div class="min-h-screen bg-gray-900">
    <div class="w-full min-h-screen flex justify-center">
      <FormKit
        type="form"
        id="add-document"
        submit-label="Vystaviť doklad"
        @submit="submitHandler()"
        :actions="false"
      >
        <div class="bg-gray-900 text-white rounded-lg px-4 my-2">
          <section>
            <div class="flex flex-row">
              <div class="flex basis-5/6 justify-center">
                <h3 class="text-3xl font-bold text-center py-10 text-white">
                  Detail dokladu č.
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
              <div class="flex basis-1/6 justify-end py-6 px-6">
                <button
                  class="bg-red-500 hover:bg-red-700 h-8 px-6 rounded text-white"
                  v-on:click="cancelEdit()"
                  type="button"
                >
                  X
                </button>
              </div>
            </div>

            <div class="flex">
              <section class="flex flex-col w-full">
                <label for="client-name" class="flex text-white font-bold"
                  >Odberateľ</label
                >
                <div class="flex py-2 justify-between w-full gap-4">
                  <div class="w-full">
                    <FormKit
                      v-model="document.odberatel"
                      autocomplete="nope"
                      id="client-name"
                      name="Odberateľ"
                      type="text"
                      placeholder="Meno alebo IČO firmy"
                      validation="required"
                      label="Meno alebo IČO firmy"
                    />
                  </div>
                  <div class="w-full">
                    <FormKit
                      v-model="document.contact_person"
                      autocomplete="nope"
                      id="client-name"
                      name="data[Client][name]"
                      type="text"
                      placeholder="Kontaktná osoba"
                      label="Kontaktná osoba"
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
                        label="Adresa"
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
                        label="PSČ"
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
                        label="Mesto"
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
                        label="Krajina"
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
                        label="IČO"
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
                        label="DIČ"
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
                        label="IČ DPH"
                      />
                      <label for="client-icdph" class="flex text-white text-xs"
                        >platca DPH</label
                      >
                    </div>
                  </div>
                </div>

                <div class="flex flex-col pt-16">
                  <div class="flex flex-row pb-8">
                    <div class="flex flex-row gap-3">
                      <div class="flex flex-col w-full">
                        <FormKit
                          type="date"
                          name="Dátum vystavenia"
                          validation="required|length:10"
                          v-model="document.date_of_issue"
                          :value="today"
                          label="Dátum vystavenia"
                        />
                      </div>
                      <div class="flex flex-col w-full">
                        <FormKit
                          type="date"
                          name="Dátum dodania"
                          validation="required|length:10"
                          v-model="document.delivery_date"
                          :value="today"
                          label="Dátum dodania"
                        />
                      </div>
                      <div class="flex flex-col w-full">
                        <FormKit
                          type="select"
                          id="due-in"
                          name="due-in"
                          :options="Constants.DUES"
                          v-model="document.due_by"
                          label="Splatnosť"
                        />
                      </div>
                      <div
                        class="flex flex-col w-full justify-between"
                        data-slot="invoice-vs"
                        data-slot-rule="non-mobile"
                      >
                        <FormKit
                          v-model="document.variabilny"
                          autocomplete="nope"
                          type="text"
                          id="vs"
                          name="[variable]"
                          :value="document.serial_number"
                          label="Variabilný symbol"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col pt-8">
                  <div class="flex flex-row gap-3">
                    <div class="flex flex-col w-full" v-if="document.subtype == 4 || document.subtype == 5">
                        <FormKit
                          autocomplete="nope"
                          type="text"
                          id="order-name"
                          label="Názov zákazky"
                          v-model="document.order_name"
                        />
                      </div>
                      <div class="flex flex-col w-full" v-if="document.subtype == 4 || document.subtype == 5">
                        <FormKit
                          autocomplete="nope"
                          type="textarea"
                          id="order-description"
                          label="Predmet zákazky"
                          v-model="document.order_description"
                        />
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
            type="button"
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
            <div class="flex flex-col" v-if="isOpen">
              <div>
                <FormKit
                  type="dropdown"
                  name="bankaccount_dropdown"
                  label="Bankový účet"
                  :options="fetchBankAccounts"
                  validation="required"
                  v-model="bankAccountId"
                  :value="companyBankDetails"
                >
                </FormKit>
              </div>
              <div class="flex flex-row">
                <div class="flex flex-col w-full justify-between px-4">
                  <FormKit
                    type="textarea"
                    rows="10"
                    id="comment_above"
                    label="Poznámka nad položkami"
                    validation="length:0,255"
                    v-model="document.note_above"
                  />
                </div>
                <div class="flex basis-2/3 flex-col">
                  <FormKit
                    type="textarea"
                    rows="10"
                    id="comment_below"
                    label="Poznámka pod položkami"
                    validation="length:0,255"
                    v-model="document.note_under"
                  />
                </div>
              </div>
              <div class="flex flex-col">
                <div class="flex flex-row gap-3 py-8">
                  <div class="flex flex-col basis-1/4">
                    <FormKit
                      type="select"
                      id="delivery-type"
                      name="delivery-type"
                      :options="Constants.DELIVERY_TYPES"
                      v-model="document.delivery_method"
                      label="Spôsob dodania"
                    />
                  </div>
                  <div class="flex flex-col basis-1/4">
                    <FormKit
                      type="select"
                      id="payment_type"
                      name="payment_type"
                      :options="Constants.PAYMENT_TYPES"
                      v-model="document.payment_method"
                      label="Forma úhrady"
                    />
                  </div>
                  <div class="flex flex-col basis-1/4">
                    <FormKit
                      autocomplete="nope"
                      type="text"
                      id="constant-symbol"
                      name="[constant]"
                      v-model="document.konstantny"
                      label="Konštantný symbol"
                      validation="length:0,4"
                    />
                  </div>
                  <div class="flex flex-col basis-1/4">
                    <FormKit
                      autocomplete="nope"
                      type="text"
                      id="specific-symbol"
                      v-model="document.specificky"
                      label="Špecifický symbol"
                      validation="length:0,10"
                    />
                  </div>
                </div>
              </div>
              <div class="flex justify-center py-4 text-white">
                <FormKit
                  type="date"
                  name="Dátum úhrady"
                  label="Dátum úhrady"
                  v-model="document.payment_date"
                  :value="today"
                />
              </div>
            </div>
            <div class="flex flex-col pb-10">
              <div
                class="text-teal-500 flex flex-row bg-gray-700 py-4 rounded-lg"
              >
                <div class="text-teal-500 flex basis-3/12 pl-4">
                  Názov položky
                </div>
                <div class="text-teal-500 flex basis-2/12">Množstvo</div>
                <div class="text-teal-500 flex basis-2/12">MJ</div>
                <div class="text-teal-500 flex basis-2/12">Cena</div>
                <div
                  class="text-teal-500 flex basis-2/12"
                  v-if="document.isDph"
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
                    <div class="flex basis-3/12">
                      <FormKit
                        autocomplete="nope"
                        class="flex"
                        id="name"
                        type="text"
                        placeholder="Zadajte názov položky"
                        v-model="item.name"
                      />
                    </div>
                    <div class="flex basis-2/12">
                      <FormKit
                        autocomplete="nope"
                        type="number"
                        id="quantity"
                        class="flex"
                        inputmode="decimal"
                            step="any"
                            min="0"
                            number
                        v-model="item.quantity"
                        @change="priceEntered(item)"
                      />
                    </div>
                    <div class="flex basis-2/12">
                      <FormKit
                        type="select"
                        id="unit"
                        :options="Constants.UNITS"
                        v-model="item.unit"
                      />
                    </div>
                    <div class="flex basis-2/12">
                      <FormKit
                        autocomplete="nope"
                        type="number"
                        class="flex"
                        id="unit-price"
                        step="0.01"
                        number
                        v-model="item.unit_price"
                        @change="priceEntered(item)"
                      />
                    </div>
                    <div class="flex basis-1/12" v-if="document.isDph">
                      <FormKit
                        autocomplete="nope"
                        type="number"
                        class="flex"
                        id="vat"
                        step="0.01"
                        number
                        v-model="item.vat"
                        novalidate
                        @change="vatEntered($event, item)"
                      />
                    </div>
                    <div class="flex basis-2/12 pl-4">
                      <div class="flex">
                        <FormKit
                          autocomplete="nope"
                          type="text"
                          id="total"
                          step="0.01"
                          number
                          v-model="item.total"
                          disabled
                        />
                      </div>
                      
                    </div>
                  </div>

                  <div class="flex flex-row py-4">
                    <div class="flex basis-3/4">
                      <div class="w-full">
                        <FormKit
                          type="textarea"
                          rows="2"
                          id="desc"
                          validation="length:0,255"
                          placeholder="Detailný popis položky…"
                          v-model="item.description"
                        />
                      </div>
                    </div>
                    <div class="flex basis-1/4 justify-end">
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
                      <th class="text-right pr-1 text-2xl">{{ totalPrice.toFixed(2) }}</th>
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
                    <tr v-if="document.isDph">
                      <th class="text-left pl-2">DPH</th>
                      <th class="text-right pr-2">
                        {{ totalPriceVat.toFixed(2) }}&nbsp;{{ document.currency }}
                      </th>
                    </tr>
                    <tr v-if="document.isDph">
                      <th class="text-left pl-2">Celková suma</th>
                      <th class="text-right pr-2">
                        {{ (totalPrice+totalPriceVat).toFixed(2) }}&nbsp;{{
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
              label="Aktualizovať doklad"
              type="submit"
              class="shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
            />
          </div>
        </div>
      </FormKit>
    </div>
  </div>
</template>

<script setup lang="ts">
import type Company from "@/types/Company";
import store from "@/store";
import { ref, computed, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";
import Constants from "@/helpers/constants";
import { toast } from "vue3-toastify";
import moment from "moment";

const document: any = computed(() => {
  return store.state.document;
});

const items = ref([] as any[]);

const today = moment(new Date()).format("YYYY-MM-DD");
const router = useRouter();
const submitted = ref(false);
const isOpen = ref(false);
const bankAccountId = ref(document.value.bank_account_id);

const company = ref({} as Company);
const address = ref({
  id: 0,
  street: "",
  street_number: 0,
  city: "",
  country: "",
  psc: "",
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

const totalPrice: any = computed(() => {
  return items.value.reduce((acc, item) => acc + item.total, 0);
});

const totalPriceVat: any = computed(() => {
  return items.value.reduce((acc, item) => acc + item.total_vat, 0);
});

watch(bankAccountId, async () => {
  const res = await store.dispatch("getBankAccountById", bankAccountId.value)
  if(res.data) {
    bankAccountId.value = res.data.id;
    companyBankDetails.value = res.data;
  }
})

async function refreshData() {
  await store
    .dispatch("getSelectedCompany", store.state.selectedCompany.id)
    .then((response) => {
      company.value = response.data;
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

function cancelEdit() {
  router.push({
    name: "Doklady",
  });
}

function priceEntered(item: any) {
  if (item.vat > 0) {
    item.total = item.quantity * item.unit_price;
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

function addItem() {
  const item = {
    name: "",
    quantity: 0,
    unit: "ks",
    unit_price: 0.0,
    vat: 0,
    total: 0.0,
    total_vat: 0.0,
    description: "",
  };
  items.value.push(item);
}

function removeItem(index: number) {
  items.value.splice(index, 1);
}

async function fetchBankAccounts() {
  const res = await store.dispatch("getCompanyBankDetails", company.value.id)
  if(res.data[0]?.id){
    return res.data.map((data) => {
        bankAccountId.value = data?.id;
      return {
        label: `${data?.account_name ?? ''} IBAN: ${data?.iban ?? ''}`,
        value: data.id
      }
    })
  } else {
    return []
  }
}

function submitHandler() {
  submitted.value = true;
  document.value.items = items.value;
  document.value.total = totalPrice.value;
  document.value.total_vat = totalPriceVat.value;
  if(document.value.isPaid) {
    document.value.paid = totalPrice.value;
  }
  return store
    .dispatch("updateDocument", document.value)
    .then((res) => {
      store.state.documentTab = 1;
      router.push({
        name: "Doklady",
      });
    })
    .catch((err) => {
      toast.error("Error: " + err.message);
    });
}

onBeforeMount(async () => {
  store.state.mySubmenuActive = 1;
  await refreshData();
  try {
    items.value = JSON.parse(document.value.items);
  } catch {
    console.log("Items are empty")
  }
  
});
</script>
