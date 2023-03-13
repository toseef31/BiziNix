<template>
  <div class="min-h-screen bg-gray-900">
    <div class="w-full min-h-screen flex justify-center">
      <form
        class="bg-gray-200 rounded-xl my-8 px-8"
        enctype="multipart/form-data"
        action="#"
        method="post"
      >
        <section>
          <h3 class="text-3xl font-bold text-center py-20 text-black">
            Vystavujete doklad
          </h3>

          <div class="flex">
            <section class="flex basis-1/2 flex-col px-8">
              <div class="flex py-2 justify-between">
                <label for="name" class="flex basis-1/3 text-black font-bold"
                  >Vaša firma</label
                >
                <label class="flex basis-2/3 text-black">{{
                  company.name
                }}</label>
              </div>

              <div class="flex flex-col">
                <div class="flex pb-2 justify-between">
                  <label
                    for="address"
                    class="flex basis-1/3 text-black font-bold"
                    >Adresa</label
                  >
                  <label class="flex basis-2/3 text-black"
                    >{{ address.street }} {{ address.street_number }}</label
                  >
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="zip" class="text-black basis-1/3 font-bold"
                    >PSČ</label
                  >
                  <label class="flex basis-2/3 text-black">{{
                    address.psc
                  }}</label>
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="city" class="text-black basis-1/3 font-bold"
                    >Mesto</label
                  >
                  <label class="flex basis-2/3 text-black">{{
                    address.city
                  }}</label>
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="country" class="text-black basis-1/3 font-bold"
                    >Krajina</label
                  >
                  <label class="flex basis-2/3 text-black">{{
                    address.country
                  }}</label>
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="ico" class="text-black basis-1/3 font-bold"
                    >IČO</label
                  >
                  <label class="flex basis-2/3 text-black">{{
                    company.ico
                  }}</label>
                </div>

                <div class="flex pb-2 justify-between">
                  <label for="dic" class="text-black basis-1/3 font-bold"
                    >DIČ</label
                  >
                  <label class="flex basis-2/3 text-black">{{
                    company.dic
                  }}</label>
                </div>

                <div class="flex justify-between">
                  <label for="icdph" class="text-black basis-1/3 font-bold"
                    >IČ DPH</label
                  >
                  <label class="flex basis-2/3 text-black">{{
                    company.icdph
                  }}</label>
                </div>
              </div>
            </section>

            <section class="flex basis-1/2 flex-col">
              <div class="flex py-2 justify-between">
                <label for="client-name" class="flex text-black basis-1/3"
                  >Odberateľ</label
                >
                <div class="w-full">
                  <FormKit
                    autocomplete="nope"
                    id="client-name"
                    name="data[Client][name]"
                    type="text"
                    placeholder="Meno alebo IČO odberateľa …"
                  />
                </div>
              </div>

              <div class="flex flex-col">
                <div class="flex pb-2 justify-between">
                  <label for="client-address" class="flex text-black basis-1/3"
                    >Adresa</label
                  >
                  <div class="w-full">
                    <FormKit
                      autocomplete="nope"
                      id="client-address"
                      name="data[Client][address]"
                      type="text"
                    />
                  </div>
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="client-zip" class="flex text-black basis-1/3"
                    >PSČ</label
                  >
                  <div class="w-full">
                    <FormKit
                      autocomplete="nope"
                      id="client-zip"
                      name="data[Client][zip]"
                      type="text"
                    />
                  </div>
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="client-city" class="flex text-black basis-1/3"
                    >Mesto</label
                  >
                  <div class="w-full">
                    <FormKit
                      autocomplete="nope"
                      id="client-city"
                      name="data[Client][city]"
                      type="text"
                    />
                  </div>
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="client-country" class="flex text-black basis-1/3"
                    >Krajina</label
                  >
                  <div class="w-full">
                    <FormKit
                      type="select"
                      id="country"
                      name="country"
                      :options="countries"
                    />
                  </div>
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="client-ico" class="flex text-black basis-1/3"
                    >IČO</label
                  >
                  <div class="w-full">
                    <FormKit
                      autocomplete="nope"
                      id="client-ico"
                      name="data[Client][ico]"
                      type="text"
                    />
                  </div>
                </div>

                <div class="flex pb-2 justify-between">
                  <label for="client-dic" class="flex text-black basis-1/3"
                    >DIČ</label
                  >
                  <div class="w-full">
                    <FormKit
                      autocomplete="nope"
                      id="client-dic"
                      name="data[Client][dic]"
                      type="text"
                    />
                  </div>
                </div>

                <div class="flex justify-between">
                  <label for="client-icdph" class="flex text-black basis-1/3"
                    >IČ DPH</label
                  >
                  <div class="w-full">
                    <FormKit
                      autocomplete="nope"
                      id="client-icdph"
                      name="data[Client][ic_dph]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
        <hr class="my-8 h-px bg-teal-500 border-0" />
        <section>
          <div class="flex flex-col">
            <div class="flex flex-row pb-8">
              <div
                class="flex flex-col basis-1/2 justify-between px-4"
                data-slot-target="invoice-number"
              >
                <label for="number" class="text-black pr-4 font-bold"
                  >Číslo dokladu</label
                >
                <FormKit
                  autocomplete="nope"
                  type="text"
                  id="number"
                  name="[invoice_no_formatted]"
                  placeholder="napr.: 2023001"
                />
              </div>
              <div
                class="flex flex-col basis-1/2 justify-between"
                data-slot="invoice-vs"
                data-slot-rule="non-mobile"
              >
                <label for="vs" class="text-black pr-4 font-bold"
                  >Variabilný symbol</label
                >
                <FormKit
                  autocomplete="nope"
                  type="text"
                  id="vs"
                  name="[variable]"
                />
              </div>
            </div>

            <div class="flex flex-row justify-between pb-8">
              <div class="flex basis-1/2 flex-col justify-between px-4">
                <label class="text-black pr-4 font-bold"
                  >Názov Vašej banky</label
                >
                <label class="text-black pr-4">{{
                  companyBankDetails.name
                }}</label>
              </div>

              <div class="flex basis-1/2 flex-col justify-between">
                <label class="text-black pr-4 font-bold">IBAN</label>
                <label class="text-black pr-4">{{
                  companyBankDetails.iban
                }}</label>
              </div>
            </div>

            <div class="flex flex-row">
              <div class="flex basis-1/2 flex-col justify-between px-4">
                <label class="text-black pr-4 font-bold">SWIFT</label>
                <label class="text-black pr-4">{{
                  companyBankDetails.swift
                }}</label>
              </div>
            </div>
          </div>
          <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-300" />
          <div class="flex flex-col">
            <div class="flex flex-row">
              <div class="flex flex-col w-full justify-between px-4">
                <label for="comment__above" class="text-black"
                  >Poznámka nad položkami</label
                >
                <FormKit type="textarea" rows="10" id="comment_above" />
              </div>
            </div>
          </div>
          <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-300" />
          <div class="flex flex-col">
            <div
              class="text-teal-500 flex flex-row bg-gray-700 py-4 rounded-lg"
            >
              <div class="text-teal-500 flex basis-3/12 pl-4">
                Názov položky
              </div>
              <div class="text-teal-500 flex basis-2/12">Počet</div>
              <div class="text-teal-500 flex basis-2/12">Jednotka</div>
              <div class="text-teal-500 flex basis-2/12">Cena €</div>
              <div class="text-teal-500 flex basis-2/12">DPH %</div>
              <div class="text-teal-500 flex basis-2/12 justify-end pr-4">
                Celkom €
              </div>
            </div>

            <ul class="py-2">
              <li>
                <div class="flex flex-row gap-1">
                  <div class="flex basis-3/12">
                    <FormKit
                      autocomplete="nope"
                      class="flex"
                      name="[name]"
                      id="name"
                      type="text"
                      placeholder="Zadajte názov položky"
                    />
                  </div>
                  <div class="flex basis-2/12">
                    <FormKit
                      autocomplete="nope"
                      type="text"
                      id="quantity"
                      name="[quantity]"
                      class="flex"
                      pattern="^([\d ]+([,.]\d+)?|[,.]?[\d ]+)$"
                      inputmode="decimal"
                    />
                  </div>
                  <div class="flex basis-2/12">
                    <FormKit
                      type="select"
                      id="unit"
                      name="unit"
                      :options="units"
                    />
                  </div>
                  <div class="flex basis-2/12">
                    <FormKit
                      autocomplete="nope"
                      type="text"
                      name="[unit_price]"
                      class="flex"
                      id="unit-price"
                      pattern="^-?(\d[\d ]*([,.]\d+)?|[,.]?\d[\d ]*)$"
                      inputmode="decimal"
                    />
                  </div>
                  <div class="flex basis-2/12">
                    <FormKit
                      autocomplete="nope"
                      type="text"
                      name="[tax]"
                      class="flex"
                      id="vat"
                      pattern="^(\d[\d ]*([,.]\d+)?|[,.]?\d[\d ]*)$"
                      inputmode="decimal"
                    />
                  </div>
                  <div class="flex basis-2/12">
                    <FormKit
                      autocomplete="nope"
                      type="text"
                      class="flex"
                      id="total"
                      pattern="^-?(\d[\d ]*([,.]\d+)?|[,.]?\d[\d ]*)$"
                      inputmode="decimal"
                    />
                  </div>
                </div>

                <div class="flex flex-row py-4">
                  <div class="flex basis-3/4">
                    <div class="w-full">
                      <FormKit
                        type="textarea"
                        rows="1"
                        id="desc"
                        placeholder="Detailný popis položky…"
                      />
                    </div>
                  </div>
                  <div class="flex basis-1/4 justify-end">
                    <button
                      type="button"
                      class="hover:bg-red-400 text-red-700 font-bold px-4 rounded-lg"
                      title="Vymazať položku"
                      value=""
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
              >
                Pridať ďalšiu položku
              </button>
            </div>
          </div>
          <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-300" />
          <div class="flex flex-col">
            <div class="flex flex-row gap-8">
              <div class="flex basis-2/3 flex-col">
                <label for="comment" class="text-black pb-2"
                  >Poznámka pod položkami</label
                >
                <FormKit type="textarea" rows="10" id="comment_below" />
              </div>

              <div class="flex basis-1/3 flex-col justify-center">
                <div class="bg-gray-800 w-full p-8 border-teal-500 border">
                  <table class="w-full">
                    <tbody>
                      <tr class="text-teal-500">
                        <th class="text-left pl-2">Celkom</th>
                        <th class="text-right pr-2">0,00&nbsp;€</th>
                      </tr>
                      <tr class="text-teal-500">
                        <th class="text-left pl-2">DPH</th>
                        <th class="text-right pr-2">0,00&nbsp;€</th>
                      </tr>
                      <tr class="text-teal-500">
                        <th class="text-left pl-2">Celková suma</th>
                        <th class="text-right pr-2">0,00&nbsp;€</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-300" />
          <div class="flex flex-col">
            <div class="flex flex-row gap-3">
              <div class="flex flex-col basis-1/3">
                <label for="issue-date" class="text-black"
                  >Dátum vystavenia</label
                >
                <FormKit
                  type="date"
                  name="date_of_birth"
                  autocomplete="date_of_birth"
                  validation="required|length:10"
                />
              </div>
              <div class="flex flex-col basis-1/3">
                <label for="due-in" class="text-black">Splatné do</label>
                <FormKit
                  type="select"
                  id="due-in"
                  name="due-in"
                  :options="dues"
                />
              </div>
              <div class="flex flex-col basis-1/3">
                <label for="delivery-date" class="text-black"
                  >Dátum dodania</label
                >
                <FormKit
                  type="date"
                  name="date_of_birth"
                  autocomplete="date_of_birth"
                  validation="required|length:10"
                />
              </div>
            </div>
            <div class="flex flex-row gap-3 py-8">
              <div class="flex flex-col basis-1/4">
                <label for="delivery-type" class="text-black"
                  >Spôsob dodania</label
                >
                <FormKit
                  type="select"
                  id="delivery-type"
                  name="delivery-type"
                  :options="delivery_types"
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
                  :options="payment_types"
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
                />
              </div>
              <div class="flex flex-col basis-1/4">
                <label for="specific-symbol" class="text-black"
                  >Špecifický symbol</label
                >
                <FormKit autocomplete="nope" type="text" id="specific-symbol" />
              </div>
            </div>
            <div class="flex flex-row">
              <div class="flex flex-col basis-1/3">
                <label for="currency" class="text-black">Mena</label>
                <FormKit
                  type="select"
                  id="currency"
                  name="currency"
                  :options="currencies"
                />
              </div>
            </div>
          </div>
        </section>
        <hr class="mt-8 h-px bg-teal-500 border-0" />
        <div class="flex justify-center py-20">
          <button
            class="shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
            type="submit"
          >
            Vytvoriť doklad
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type Company from "@/@types/Company";
import store from "@/store";
import { ref, onBeforeMount, computed, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { createInput } from "@formkit/vue";

const route = useRoute();
const countries = [
  "Slovensko",
  "Česká republika",
  "Afganistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia (Hrvatska)",
  "Cuba",
  "Cyprus",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "France, Metropolitan",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard and Mc Donald Islands",
  "Holy See (Vatican City State)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, Democratic People's Republic of",
  "Korea, Republic of",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libyan Arab Jamahiriya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia, The Former Yugoslav Republic of",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova, Republic of",
  "Monaco",
  "Mongolia",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint LUCIA",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "Spain",
  "Sri Lanka",
  "St. Helena",
  "St. Pierre and Miquelon",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen Islands",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna Islands",
  "Western Sahara",
  "Yemen",
  "Serbia",
  "Zambia",
  "Zimbabwe",
  "Montenegro",
  "St. Vincent and Grenadines",
  "Curaçao",
  "Jersey",
  "Guernsey",
  "South Sudan",
  "Kosovo",
  "Croatia",
];
const currencies = [
  "€",
  "Kč",
  "USD",
  "£",
  "HUF",
  "PLN",
  "CHF",
  "RUB",
  "¥",
  "SEK",
  "AUD",
  "NOK",
  "CAD",
  "RON",
  "LKR",
  "DKK",
  "JPY",
  "HRK",
  "RSD",
  "BGN",
  "MXN",
];
const units = [
  "ks.",
  "hod.",
  "m",
  "km",
  "bm",
  "m2",
  "m3",
  "kg",
  "mesiace",
  "osoba",
];
const payment_types = [
  "Bankový prevod",
  "Hotovosť",
  "Paypal",
  "Trustpay",
  "Besteron",
  "Kreditná karta",
  "Debetná karta",
  "Dobierka",
  "Vzájomný zápočet",
  "GoPay",
  "Viamo",
  "Poštový poukaz",
];
const delivery_types = [
  "Poštou",
  "Kuriérom",
  "Osobný odber",
  "Nákladná doprava",
  "Odberné miesto",
];
const dues = [
  "Dátum vystavenia",
  "1 deň",
  "7 dní",
  "14 dní",
  "30 dní",
  "60 dní",
  "Iné",
];

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
  name: "",
  iban: "",
  swift: "",
});

watch(
  () => store.getters.getSelectedCompany,
  function () {
    refreshData();
  }
);

async function refreshData() {
  await store
    .dispatch("getSelectedCompany", store.state.selectedCompany.id)
    .then((response) => {
      company.value = response.data;
    });

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
    .dispatch("getSelectedCompanyBankDetails", store.state.selectedCompany.id)
    .then((response) => {
      companyBankDetails.value = response.data;
    });
}

onBeforeMount(async () => {
  refreshData();
});
</script>
