<template>
  <div class="min-h-screen">
    <div class="w-full min-h-screen">
      <div class="flex flex-col container mx-auto h-full text-gray-800">
        <div
          class="flex flex-row px-4 py-8 sm:px-0 font-bold text-5xl justify-center"
        >
          Doručená pošta
        </div>
        <div class="flex flex-row justify-between py-4">
          <div class="flex flex-1/4 flex-row">
            <div class="flex relative">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                id="searchInput"
                v-model="searchQuery"
                placeholder="Vyhľadajte poštu"
                class="h-12 pl-8 w-full shadow px-1 rounded-xl border focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-gray-300 bg-gray-900"
              />
            </div>
          </div>
          <!---->

          <div class="flex flex-1/4 flex-row bg-gray-900 rounded-xl px-4">
            <div class="flex relative">
              <div class="self-center font-bold px-2 text-white">Od:</div>
              <input
                id="searchInput"
                type="date"
                v-model="dateFrom"
                class="h-12 w-full px-1 border-none focus:ring-0 text-white bg-gray-900"
              />
            </div>
            <div class="px-2 font-bold self-center text-2xl">|</div>
            <div class="flex relative">
              <div class="self-center font-bold pr-2 text-white">Do:</div>
              <input
                id="searchInput"
                type="date"
                v-model="dateTo"
                class="h-12 w-full px-1 border-none focus:ring-0 text-white bg-gray-900"
              />
            </div>
          </div>
          <!---->

          <div class="flex flex-1/4">
            <button
              v-show="checkedMails.length > 0"
              class="bg-teal-500 hover:bg-teal-700 h-12 px-6 rounded z-10 font-bold"
              v-on:click="showSendMails()"
            >
              Preposlať poštu
            </button>
            <button
              disabled
              v-show="checkedMails.length == 0"
              class="bg-gray-300 h-12 px-6 rounded z-10 font-bold text-gray-400"
            >
              Preposlať poštu
            </button>
            <Modal
              name="m3"
              v-model:visible="isVisible"
              :type="'clean'"
              :closable="false"
              title="Preposlanie zásielok"
            >
              <div class="bg-gray-600 rounded-lg border-gray-800 border-2">
                <div
                  class="flex flex-col justify-start py-4 px-4 text-white font-bold"
                >
                  <div class="text-xl">
                    Prosím potvrdte preposlanie zvolených zásielok zo zoznamu.
                  </div>
                  <div class="py-3">Na adresu:</div>
                  <FormKit
                    type="text"
                    name="street"
                    label="Ulica"
                    validation="required"
                    v-model="userAddress.street"
                    :value="userAddress.street"
                  />
                  <FormKit
                    type="text"
                    name="street_number"
                    label="Súpisne číslo"
                    validation="required"
                    v-model="userAddress.street_number"
                    :value="userAddress.street_number"
                  />
                  <FormKit
                    type="text"
                    name="street_number2"
                    label="Orientačné číslo"
                    validation="required"
                    v-model="userAddress.street_number2"
                    :value="userAddress.street_number2"
                  />
                  <FormKit
                    type="text"
                    name="city"
                    label="Mesto"
                    validation="required"
                    v-model="userAddress.city"
                    :value="userAddress.city"
                  />
                  <FormKit
                    type="text"
                    name="psc"
                    label="PSČ"
                    validation="required"
                    v-model="userAddress.psc"
                    :value="userAddress.psc"
                  />
                  <FormKit
                    type="select"
                    name="country"
                    label="Štát"
                    placeholder="Vyberte štát"
                    :options="['Slovensko', 'Česká republika']"
                    validation="required"
                    validation-visibility="dirty"
                    v-model="userAddress.country"
                    :value="userAddress.country"
                  />
                </div>
                <div class="flex flex-row justify-end py-2 px-4">
                  <div class="flex flex-1/4 px-4">
                    <button
                      class="bg-teal-500 hover:bg-teal-700 h-8 px-6 rounded z-10 text-gray-800"
                      v-on:click="sendMails()"
                    >
                      Preposlať
                    </button>
                  </div>
                  <div class="flex flex-1/4">
                    <button
                      class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-white"
                      v-on:click="closeModal()"
                    >
                      Zrušiť
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>

          <div class="flex-1/4">
            <div class="flex flex-row text-left font-bold">
              <div class="pr-4">
                {{ address.street }} {{ address.street_number }}/{{ address.street_number2 }},<br />
                {{ address.psc }} {{ address.city }}
              </div>
              <img src="@/assets/company.png" />
            </div>
          </div>
        </div>
        <!-- END OF HEAD -->
        <div v-if="mails.length == 0">
          <div class="flex py-10 h-full w-full justify-center">
            Momentálne nemáte žiadnu poštu pre danú spoločnosť.
          </div>
        </div>
        <div v-if="filteredMailsByDates.length > 0">
          <div class="relative sm:rounded-lg py-10">
            <div
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <table class="min-w-full table-fixed divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                      <input
                        type="checkbox"
                        class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 sm:left-6"
                        :checked="
                          indeterminate ||
                          checkedMails.length === filteredMailsByDates.length
                        "
                        :indeterminate="indeterminate"
                        @change="boxChecked($event)"
                      />
                    </th>
                    <th
                      scope="col"
                      class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Odosielateľ
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Dátum doručenia
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Preposlať
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Scanovať
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Skartovať
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr
                    v-for="mail in paginatedItems"
                    :key="mail.id"
                    :class="[mail.status == 4 && 'bg-gray-50' ]"
                  >
                    <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                      <div
                        v-if="checkedMails.includes(mail)"
                        class="absolute inset-y-0 left-0 w-0.5 bg-teal-600"
                      ></div>
                      <input
                        type="checkbox"
                        class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 sm:left-6"
                        :value="mail"
                        v-model="checkedMails"
                      />
                    </td>
                    <td
                      :class="[
                        'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                        checkedMails.includes(mail)
                          ? 'text-teal-600'
                          : 'text-gray-900',
                      ]"
                    >
                      {{ mail.sender }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ formatDate(mail.distribution_date.toString()) }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      <button
                        v-if="!mail.forward_requested && mail.status != 4"
                        class="font-medium text-gray-900 hover:underline"
                        v-on:click="showSendSingleMail()"
                      >
                        Preposlať originál
                      </button>
                      <Modal
                        name="m2"
                        v-model:visible="isVisible"
                        :type="'clean'"
                        :closable="false"
                        title="Preposlanie zásielky"
                      >
                        <div
                          class="bg-gray-600 rounded-lg border-gray-800 border-2"
                        >
                          <div
                            class="flex flex-col justify-start py-6 px-6 text-white font-bold"
                          >
                            <div class="text-xl">
                              Prosím potvrdte preposlanie zásielky od <br />
                              {{ mail.sender }}
                            </div>
                            <div class="py-3">Na adresu:</div>
                            <FormKit
                              type="text"
                              name="street"
                              label="Ulica"
                              validation="required"
                              v-model="userAddress.street"
                              :value="userAddress.street"
                            />
                            <FormKit
                              type="text"
                              name="street_number"
                              label="Súpisne číslo"
                              validation="required"
                              v-model="userAddress.street_number"
                              :value="userAddress.street_number"
                            />
                            <FormKit
                              type="text"
                              name="street_number2"
                              label="Orientačné číslo"
                              validation="required"
                              v-model="userAddress.street_number2"
                              :value="userAddress.street_number2"
                            />
                            <FormKit
                              type="text"
                              name="city"
                              label="Mesto"
                              validation="required"
                              v-model="userAddress.city"
                              :value="userAddress.city"
                            />
                            <FormKit
                              type="text"
                              name="psc"
                              label="PSČ"
                              validation="required"
                              v-model="userAddress.psc"
                              :value="userAddress.psc"
                            />
                            <FormKit
                              type="select"
                              name="country"
                              label="Štát"
                              placeholder="Vyberte štát"
                              :options="['Slovensko', 'Česká republika']"
                              validation="required"
                              validation-visibility="dirty"
                              v-model="userAddress.country"
                              :value="userAddress.country"
                            />
                          </div>
                          <div class="flex flex-row justify-end py-2 px-4">
                            <div class="flex flex-1/4 px-4">
                              <button
                                class="bg-teal-500 hover:bg-teal-700 h-8 px-6 rounded z-10 text-gray-800"
                                v-on:click="sendSingleMail(mail.id)"
                              >
                                Preposlať
                              </button>
                            </div>
                            <div class="flex flex-1/4">
                              <button
                                class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-white"
                                v-on:click="closeModal()"
                              >
                                Zrušiť
                              </button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                      <div class="text-left" v-if="mail.status == 4" disabled>
                        <button class="font-medium text-gray-900" disabled>
                          Originál preposlaný
                        </button>
                      </div>
                      <div
                        class="text-left"
                        v-if="mail.forward_requested && mail.status != 4"
                      >
                        <button class="font-medium text-gray-900" disabled>
                          Čaká sa na preposlanie
                        </button>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6"
                    >
                      <div
                        class="flex-1 py-4 px-3 text-left"
                        v-if="!mail.scan_requested"
                      >
                        <button
                          class="font-medium text-gray-900 hover:underline"
                          v-on:click="scanSingleMail(mail.id)"
                        >
                          Vyžiadať scan
                        </button>
                      </div>
                      <div
                        class="flex-1 py-4 px-3 text-left"
                        v-if="mail.scan_requested && mail.scan != null"
                      >
                        <button
                          class="font-medium text-gray-900 hover:underline"
                          v-on:click="downloadScanFile(mail.id)"
                        >
                          Pozrieť scan
                        </button>
                      </div>
                      <div
                        class="flex-1 py-4 px-3 text-left"
                        v-if="mail.scan_requested && mail.scan == null"
                      >
                        <button class="font-medium text-gray-900" disabled>
                          Čaká sa na scan
                        </button>
                      </div>
                    </td>
                    <td>
                      <div
                        class="flex-1 py-4 px-3 text-left"
                        v-if="!mail.shred_requested && mail.status != 2"
                      >
                        <button
                          class="font-medium text-gray-900 hover:underline"
                          @click="showModal()"
                        >
                          Skartovať
                        </button>
                      </div>
                      <div
                        class="flex-1 py-4 px-3 text-left"
                        v-if="mail.shred_requested && mail.status != 2"
                      >
                        <button class="font-medium text-gray-900" disabled>
                          Čaká sa na skartovanie
                        </button>
                      </div>
                      <div
                        class="flex-1 py-4 px-3 text-left"
                        v-if="mail.status == 2"
                      >
                        <button class="font-medium text-gray-900" disabled>
                          Skartované
                        </button>
                      </div>
                      <Modal
                        name="m1"
                        v-model:visible="isVisible"
                        :type="'clean'"
                        :closable="false"
                        title="Skartovanie zásielky"
                      >
                        <div
                          class="bg-gray-600 rounded-lg border-gray-800 border-2"
                        >
                          <div
                            class="flex flex-row justify-start py-4 px-4 text-white font-bold"
                          >
                            Prosím potvrdte skartovanie zásielky od
                            {{ mail.sender }}
                          </div>
                          <div class="flex flex-row justify-end py-2 px-4">
                            <div class="flex flex-1/4 px-4">
                              <button
                                class="bg-red-500 hover:bg-red-700 h-8 px-6 rounded z-10 text-white"
                                v-on:click="shredSingleMail(mail.id)"
                              >
                                Skartovať
                              </button>
                            </div>
                            <div class="flex flex-1/4">
                              <button
                                class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-white"
                                v-on:click="closeModal()"
                              >
                                Zrušiť
                              </button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex py-4 justify-end">
              <nav
                class="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                  :disabled="pagination.currentPage <= 1"
                  @click="pagination.currentPage--"
                >
                  <span class="sr-only">Previous</span>
                  <!-- Heroicon name: mini/chevron-left -->
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                  :disabled="pagination.currentPage >= pagination.totalPages"
                  @click="pagination.currentPage++"
                >
                  <span class="sr-only">Next</span>
                  <!-- Heroicon name: mini/chevron-right -->
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
        <!-- END OF TABLE -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CompanySelectorInHeader from "@/components/CompanySelectorInHeader.vue";
import type Mail from "@/@types/Mail";
import store from "@/store";
import { search } from "@formkit/inputs";
import { ChevronDownIcon } from "@heroicons/vue/outline";
import { ref, onBeforeMount, computed, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "@/axios";
import dayjs from "dayjs";
import { useModal, Modal } from "usemodal-vue3";

const route = useRoute();
const searchQuery = ref("");
const dateFrom = ref(null);
const dateTo = ref(null);

const checkedMails = ref([] as any[]);
const indeterminate = computed(
  () =>
    checkedMails.value.length > 0 &&
    checkedMails.value.length < filteredMailsByDates.value.length
);

const setModal = useModal({
  m1: 1,
  m2: 2,
  m3: 3,
});

let isVisible = reactive({});

isVisible = setModal("m1", false);
isVisible = setModal("m2", false);
isVisible = setModal("m3", false);

function showModal() {
  isVisible = setModal("m1", true);
}

function showSendSingleMail() {
  isVisible = setModal("m2", true);
}

function showSendMails() {
  isVisible = setModal("m3", true);
}

function closeModal() {
  isVisible = setModal("m1", false);
  isVisible = setModal("m2", false);
  isVisible = setModal("m3", false);
}

const address = ref({
  id: 0,
  street: "",
  street_number: 0,
  street_number2: 0,
  city: "",
  country: "",
  psc: "",
});

const userAddress = ref({
  street: "",
  street_number: "",
  street_number2: "",
  city: "",
  psc: "",
  country: "",
});

const headquarter = ref({
  id: 0,
  address_id: 0,
});

const selectedCompany = ref();
const mails = ref([] as Mail[]);

watch(
  () => store.getters.getSelectedCompany,
  function () {
    refreshData();
  }
);

watch(
  () => store.state.user.address,
  (newValUserAddres, oldValUserAddres) => {
    userAddress.value = {
      ...JSON.parse(JSON.stringify(newValUserAddres)),
    };
  }
);

const filteredMailsBySearch: any = computed(() => {
  return mails.value.filter((mail: any) => {
    const distribution_date = mail.distribution_date
      .toString()
      .toLocaleLowerCase();
    const sender = mail.sender.toLowerCase();
    const searchTerm = searchQuery.value.toLowerCase();
    return (
      sender.includes(searchTerm) || distribution_date.includes(searchTerm)
    );
  });
});

const filteredMailsByDates: any = computed(() => {
  return filteredMailsBySearch.value.filter((mail: any) => {
    const distribution_date = mail.distribution_date;
    const startDate = dateFrom.value;
    const endDate = dateTo.value;

    if (startDate !== null && endDate !== null) {
      return startDate <= distribution_date && distribution_date <= endDate;
    }
    if (startDate !== null && endDate === null) {
      return startDate <= distribution_date;
    }
    if (startDate === null && endDate !== null) {
      return distribution_date <= endDate;
    }
    return true;
  });
});

const pagination: any = computed(() => {
  return reactive({
    currentPage: 1,
    perPage: 5,
    totalPages: computed(() =>
      Math.ceil(mails.value.length / pagination.value.perPage)
    ),
  });
});

const paginatedItems: any = computed(() => {
  const start = (pagination.value.currentPage - 1) * pagination.value.perPage;
  const stop = start + pagination.value.perPage;
  return filteredMailsByDates.value.slice(start, stop);
});

function boxChecked(event: any) {
  checkedMails.value = event.target.checked
    ? filteredMailsByDates.value.map((mail: Mail) => mail)
    : [];
}

function sendMails() {
  checkedMails.value.forEach(function (value: any) {
    value.forward_requested = 1;
    value.forward_address =
      userAddress.value.street +
      " " +
      userAddress.value.street_number +
      "/" +
      userAddress.value.street_number2 +
      ", " +
      userAddress.value.psc +
      " " +
      userAddress.value.city +
      ", " +
      userAddress.value.country;
  });
  store
    .dispatch("updateMultipleMails", checkedMails.value)
    .then((res) => {
      console.log("Zásielky úspešne zmenené.");
      checkedMails.value = [];
      isVisible = setModal("m3", false);
    })
    .catch((err) => {
      console.log(err);
    });
}

function formatDate(dateString: string) {
  const date = dayjs(dateString);
  return date.format("DD.MM.YYYY");
}

function sendSingleMail(id: any) {
  const mail = mails.value.find((item: any) => item.id == id);
  if (mail) {
    mail.forward_requested = true;
    mail.forward_address =
      userAddress.value.street +
      " " +
      userAddress.value.street_number +
      "/" +
      userAddress.value.street_number2 +
      ", " +
      userAddress.value.psc +
      " " +
      userAddress.value.city +
      ", " +
      userAddress.value.country;
    store
      .dispatch("updateMail", mail)
      .then((res) => {
        console.log("Zásielka úspešne zmenená.");
        isVisible = setModal("m2", false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function shredSingleMail(id: any) {
  const mail = mails.value.find((item: any) => item.id == id);
  if (mail) {
    mail.shred_requested = true;
    store
      .dispatch("updateMail", mail)
      .then((res) => {
        console.log("Zásielka úspešne zmenená.");
        isVisible = setModal("m1", false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function scanSingleMail(id: any) {
  const mail = mails.value.find((item: any) => item.id == id);
  if (mail) {
    mail.scan_requested = true;
    store
      .dispatch("updateMail", mail)
      .then((res) => {
        console.log("Zásielka úspešne zmenená.");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function downloadScanFile(id: any) {
  const mail = mails.value.find((item: any) => item.id == id);
  if (mail) {
    axiosClient
      .get(`/mails/${id}/download`, {
        responseType: "blob",
      })
      .then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", mail.scan);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
  }
}

async function refreshData() {
  await store
    .dispatch("getSelectedCompany", store.state.selectedCompany.id)
    .then((response) => {
      selectedCompany.value = response.data;
    });

  //aktualizovat adresu
  await store
    .dispatch("getHeadquartersById", selectedCompany.value.headquarters_id)
    .then((response) => {
      headquarter.value = response.data;
      store
        .dispatch("getAddressById", headquarter.value.address_id)
        .then((response) => {
          address.value = response.data;
        });
    });

  //vyhladat postu
  await store
    .dispatch("getAllMailsForCompany", selectedCompany.value.id)
    .then((response) => {
      mails.value = response.data;
    });
}

onBeforeMount(async () => {
  store.dispatch("userAddress");
  refreshData();
});
</script>

<style scoped>
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
.modal-vue3-footer {
  display: none !important;
}
</style>
