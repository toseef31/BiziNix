<template>
  <div
    class="min-h-screen bg-cover bg-no-repeat bg-fixed bg-center"
    style="background-image: url('../src/assets/6.png')"
  >
    <div
      class="w-full min-h-screen"
      style="background-color: rgba(0, 0, 0, 0.75)"
    >
      <div class="flex flex-col container mx-auto h-full text-white">
        <!--toto bude treba potom premiestnit do menu-->
        <div class="relative w-64">
          <select
            id="companies"
            name="companies"
            class="text-sm lg:text-lg font-medium w-full appearance-none bg-none bg-gray-700 border border-transparent rounded-md pl-3 py-2 text-teal-500 focus:outline-none"
            @change="switchSelect($event)"
          >
            <option
              v-for="company in companies"
              :value="company.id"
              :key="company.id"
              :selected="company.id == currentCompany.id"
            >
              {{ company.name }}
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center"
          >
            <ChevronDownIcon class="w-5 text-teal-500" aria-hidden="true" />
          </div>
        </div>
        <!---->
        <div
          class="flex flex-row px-4 py-4 sm:px-0 font-bold text-5xl justify-center"
        >
          Doručená pošta
        </div>
        <div class="flex flex-row justify-center">
          <div><b>K dispozícii:</b> 15/15 scanov 15/15 skartov</div>
          <div class="px-2 font-bold">|</div>
          <div class="font-bold">
            <a href="#" class="hover:underline">Upraviť balík</a>
          </div>
        </div>
        <div class="flex flex-row justify-between py-6">
          <div class="flex flex-1/4 flex-row">
            <div class="flex relative">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-gray-400"
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
                class="h-12 pl-8 w-full shadow px-1 rounded border focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-black"
              />
            </div>
          </div>
          <!---->

          <div class="flex flex-1/4 flex-row bg-gray-900 rounded-xl px-4">
            <div class="flex relative">
              <div class="self-center font-bold px-2">Od:</div>
              <input
                id="searchInput"
                type="date"
                v-model="dateFrom"
                class="h-12 w-full px-1 border-none focus:ring-0 text-white bg-gray-900"
              />
            </div>
            <div class="px-2 font-bold self-center text-2xl">|</div>
            <div class="flex relative">
              <div class="self-center font-bold pr-2">Do:</div>
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
              class="bg-teal-500 hover:bg-teal-700 h-12 px-6 rounded z-10"
              v-on:click="sendMails()"
            >
              Preposlať poštu
            </button>
          </div>

          <div class="flex-1/4">
            <div class="flex flex-row text-left font-bold">
              <div class="pr-4">
                {{ address.street }} {{ address.street_number }}, <br />
                {{ address.psc }} {{ address.city }}
              </div>
              <img src="../assets/company.png" />
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
              <div
                v-for="mail in filteredMailsByDates"
                :key="mail.id"
                class="bg-white border-b rounded-xl dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex flex-row my-2"
              >
                <div
                  class="flex-1 py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xl"
                >
                  {{ mail.sender }}
                </div>
                <div class="flex-1 py-4 px-6 text-right">
                  {{ mail.distribution_date }}
                </div>
                <div class="flex-1 py-4 px-6 text-right">
                  <button
                    class="font-medium text-white hover:underline"
                    v-on:click="sendSingleMail(mail.id)"
                  >
                    Preposlať originál
                  </button>
                </div>
                <div
                  class="flex-1 py-4 px-6 text-right"
                  v-if="!mail.scan_requested"
                >
                  <button
                    class="font-medium text-white hover:underline"
                    v-on:click="scanSingleMail(mail.id)"
                  >
                    Vyžiadať scan
                  </button>
                </div>
                <div
                  class="flex-1 py-4 px-6 text-right"
                  v-if="mail.scan_requested"
                >
                  <button
                    class="font-medium text-white hover:underline"
                    v-on:click="downloadScanFile(mail.id)"
                  >
                    Pozrieť scan
                  </button>
                </div>
                <div class="flex-1 py-4 px-6 text-right">
                  <button
                    class="font-medium text-white hover:underline"
                    v-on:click="shredSingleMail(mail.id)"
                  >
                    Skartovať
                  </button>
                </div>
              </div>
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
import type Mail from "@/@types/Mail";
import store from "@/store";
import { search } from "@formkit/inputs";
import { ChevronDownIcon } from "@heroicons/vue/outline";
import { ref, onBeforeMount, computed, reactive } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "@/axios";

const route = useRoute();
const searchQuery = ref("");
const dateFrom = ref(null);
const dateTo = ref(null);

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

const companies = ref([""] as any);
const mails = ref([] as Mail[]);
const currentCompany = ref({
  created_at: "",
  dic: "",
  fakturacia_zaplatene_do: "",
  headquarters_id: 0,
  icdph: "",
  ico: "",
  id: 0,
  imanie_splatene: 0,
  imanie_vyska: 0,
  is_dph: 0,
  konecny_uzivatelia_vyhod: 1,
  last_step: 0,
  name: "name",
  note: null,
  owner: 0,
  registration_date: "",
  sidlo_zaplatene_do: "",
  sposob_konania_konatelov: 1,
  status: 1,
  subjects_of_business: null,
  type: 1,
  updated_at: "",
});

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
    perPage: 10,
    totalPages: computed(() =>
      Math.ceil(mails.value.length / pagination.value.perPage)
    ),
  });
});

const paginatedItems: any = computed(() => {
  const { currentPage, perPage } = pagination;
  const start = (currentPage - 1) * perPage;
  const stop = start + perPage;
  return filteredMailsByDates.value.slice(start, stop);
});

function sendMails() {
  const filteredMails = filteredMailsByDates.value;
  filteredMails.forEach(function (value: any) {
    value.forward_requested = true;
  }); 
  console.log(filteredMails);
  store
    .dispatch("updateMultipleMails", { filteredMails })
    .then((res) => {
      console.log("Zásielky úspešne zmenené.");
    })
    .catch((err) => {
      console.log(err);
    });
}

function sendSingleMail(id: any) {
  const mail = mails.value.find((item: any) => item.id == id);
  if (mail) {
    mail.forward_requested = true;
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

function shredSingleMail(id: any) {
  const mail = mails.value.find((item: any) => item.id == id);
  if (mail) {
    mail.shred_requested = true;
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

function switchSelect(event: any) {
  currentCompany.value = companies.value.find(
    (item: any) => item.id == event.target.value
  );

  mails.value = [];

  //aktualizovat adresu
  store
    .dispatch("getHeadquartersById", currentCompany.value.headquarters_id)
    .then((response) => {
      headquarter.value = response.data;
      store
        .dispatch("getAddressById", headquarter.value.address_id)
        .then((response) => {
          address.value = response.data;
        });
    });

  //vyhladat postu
  store
    .dispatch("getAllMailsForCompany", currentCompany.value.id)
    .then((response) => {
      mails.value = response.data;
    });
}

onBeforeMount(async () => {
  await store
    .dispatch("getAllCompaniesByUserId", store.state.user.userId)
    .then((response) => {
      companies.value = response.data;
      currentCompany.value = companies.value.at(0);
    });

  //aktualizovat adresu
  await store
    .dispatch("getHeadquartersById", currentCompany.value.headquarters_id)
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
    .dispatch("getAllMailsForCompany", currentCompany.value.id)
    .then((response) => {
      mails.value = response.data;
    });
});
</script>

<style scoped>
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
