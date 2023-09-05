<template>
  <div class="min-h-full">
    <div class="w-full min-h-full flex flex-row">
      <div class="flex flex-col basis-1/5 px-2 py-2 relative">
        <div class="absolute bottom-0 inset-x-0">
          <div class="text-sm px-8">
            V prípade záujmu o
            osobné vyzdvihnutie
            pošty nás kontaktujte
            na 0908478270
          </div>
          <div class="py-4 px-8">
            <hr>
          </div>
          <div class="font-bold px-8">
            Využívate balík
          </div>
          <div class="font-bold px-8">
            PREMIUM
          </div>
          <div class="py-4 px-8">
            <button
              class="bg-teal-500 hover:bg-teal-700 h-12 px-6 rounded z-10 font-bold"
              v-on:click="redirectToOrder()"
            >
              Upraviť balík
            </button>
          </div>
        </div>
      </div>
      <div v-if=" selectedCompany && (new Date(selectedCompany.sidlo_zaplatene_do) < new Date(today) ||
                  selectedCompany.sidlo_zaplatene_do == null ||
                  selectedCompany.sidlo_zaplatene_do == '')
                "
          class="flex flex-col w-full items-center"
      >
        <div class="flex flex-col w-full items-center h-full py-32">
          <div class="text-4xl text-gray-900 font-bold">
            K tejto službe<br />bohužiaľ nemáte<br />prístup...
          </div>
          <div class="py-8">
            <div
              @click="redirectToOrder()"
              class="w-[300px] shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-900 font-bold hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
            >
              <span class="text-center w-full">Kúpiť službu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full" v-else>
        <div class="w-full min-h-full">
          <div class="flex flex-col container mx-auto h-full text-gray-800">
            <h1 class="flex flex-row px-4 py-8 text-3xl font-bold text-gray-600 pb-10 justify-center">
              Doručená pošta
            </h1>
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
                  <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
                    <div
                      class="flex flex-col justify-start py-4 px-4 text-white font-bold"
                    >
                      <img
                        src="@/assets/posta.png"
                        class="h-auto shrink-0 z-0 w-[128px] absolute right-16 top-12"
                      />
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
                      <div class="flex flex-row">
                        <FormKit
                          type="text"
                          name="street_number"
                          label="Súpisne číslo"
                          validation="required"
                          v-model="userAddress.street_number"
                          :value="userAddress.street_number"
                        />
                        <div class="py-6 px-4">/</div>
                        <FormKit
                          type="text"
                          name="street_number2"
                          label="Orientačné číslo"
                          validation="required"
                          v-model="userAddress.street_number2"
                          :value="userAddress.street_number2"
                        />
                      </div>

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
                    {{ address.street }} {{ address.street_number }}/{{
                      address.street_number2
                    }},<br />
                    {{ address.psc }} {{ address.city }}
                  </div>
                  <img src="@/assets/company.png" />
                </div>
              </div>
            </div>
            <!-- END OF HEAD -->
            <div
              role="status"
              class="flex py-10 h-full w-full justify-center"
              v-show="loading"
            >
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-teal-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
            <div v-if="mails.length == 0" v-show="!loading">
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
                          <span
                            class="inline-flex items-center"
                            :class="{
                              'text-teal-500':
                                selectedColumn == 'distribution_date',
                            }"
                          >
                            Dátum doručenia
                            <button>
                              <svg
                                @click="setOrderResultsBy('distribution_date')"
                                xmlns="http://www.w3.org/2000/svg"
                                class="ml-1 w-3 h-3"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 320 512"
                              >
                                <path
                                  d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                                />
                              </svg>
                            </button>
                          </span>
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
                    <tbody class="divide-y divide-gray-200 bg-gray-50">
                      <tr
                        v-for="mail in paginatedItems"
                        :key="mail.id"
                        :class="[mail.status == 1 && 'bg-white']"
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
                          {{ formatDate(mail.distribution_date) }}
                        </td>
                        <td
                          class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          <button
                            v-if="
                              !mail.forward_requested &&
                              mail.status != 4 &&
                              mail.status != 2
                            "
                            class="font-medium text-gray-900 hover:underline"
                            v-on:click="showSendSingleMail(mail)"
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
                              class="bg-gray-800 rounded-lg border-teal-600 border-2"
                            >
                              <div
                                class="flex flex-col justify-start py-6 px-6 text-white font-bold"
                              >
                                <img
                                  src="@/assets/posta.png"
                                  class="h-auto shrink-0 z-0 w-[128px] absolute right-16 top-12"
                                />
                                <div class="text-xl">
                                  Prosím potvrdte preposlanie zásielky od <br />
                                  {{ selectedMail.sender }}
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
                                <div class="flex flex-row">
                                  <FormKit
                                    type="text"
                                    name="street_number"
                                    label="Súpisne číslo"
                                    validation="required"
                                    v-model="userAddress.street_number"
                                    :value="userAddress.street_number"
                                  />
                                  <div class="py-6 px-4">/</div>
                                  <FormKit
                                    type="text"
                                    name="street_number2"
                                    label="Orientačné číslo"
                                    validation="required"
                                    v-model="userAddress.street_number2"
                                    :value="userAddress.street_number2"
                                  />
                                </div>
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
                                    v-on:click="sendSingleMail(selectedMail)"
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
                          <div class="text-left" v-if="mail.status == 2">
                            <button class="font-medium text-gray-900" disabled>
                              Nie je možné preposlať
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
                          <div
                            class="flex-1 py-4 px-3 text-left"
                            v-if="
                              (mail.status == 2 || mail.status == 4) &&
                              mail.scan == null
                            "
                          >
                            <button class="font-medium text-gray-900" disabled>
                              Nie je možné scanovať
                            </button>
                          </div>
                        </td>
                        <td>
                          <div
                            class="flex-1 py-4 px-3 text-left"
                            v-if="!mail.shred_requested && mail.status == 1"
                          >
                            <button
                              class="font-medium text-gray-900 hover:underline"
                              @click="showModal(mail)"
                            >
                              Skartovať
                            </button>
                          </div>
                          <div
                            class="flex-1 py-4 px-3 text-left"
                            v-if="mail.shred_requested && mail.status != 2 && mail.status != 4"
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
                          <div
                            class="flex-1 py-4 px-3 text-left"
                            v-if="mail.status == 4"
                          >
                            <button class="font-medium text-gray-900" disabled>
                              Nie je možné skartovať
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
                              class="bg-gray-700 bg-opacity-95 rounded-lg"
                            >
                              <div
                                class="flex flex-row justify-start py-8 px-8 text-white font-bold"
                              >
                                Naozaj chcete túto zásielku skartovať?
                              </div>
                              <div class="flex flex-row justify-end pb-4 px-4">
                                <div class="flex flex-1/4">
                                  <button
                                    class="bg-gray-500 hover:bg-gray-800 h-8 px-6 rounded z-10 text-white"
                                    v-on:click="closeModal()"
                                  >
                                    Nie
                                  </button>
                                </div>
                                <div class="flex flex-1/4 px-4">
                                  <button
                                    class="bg-teal-500 hover:bg-teal-700 h-8 px-6 rounded z-10 text-white"
                                    v-on:click="shredSingleMail(selectedMail)"
                                  >
                                    Áno
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type Mail from "@/types/Mail";
import store from "@/store";
import { ref, onBeforeMount, computed, reactive, watch } from "vue";
import axiosClient from "@/axios";
import dayjs from "dayjs";
import { useModal, Modal } from "usemodal-vue3";
import * as _ from "lodash";
import { useRouter } from "vue-router";
import moment from "moment";

const searchQuery = ref("");
const dateFrom = ref(null);
const dateTo = ref(null);
const router = useRouter();
const today = moment(new Date()).format("YYYY-MM-DD");

let loading = true;

const selectedColumn = ref("distribution_date");
const selectedDirection = ref("desc");

const checkedMails = ref([] as any[]);
const selectedMail = ref({} as Mail);

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

function showModal(mail: any) {
  selectedMail.value = mail;
  isVisible = setModal("m1", true);
}

function showSendSingleMail(mail: any) {
  selectedMail.value = mail;
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


const userAddress = computed(() => store.state.user.address as any);

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
  return orderedItems.value.slice(start, stop);
});

const orderedItems: any = computed(() => {
  return _.orderBy(
    filteredMailsByDates.value,
    ["distribution_date"],
    [selectedDirection.value.includes("asc") ? "asc" : "desc"]
  );
});

function setOrderResultsBy(column: any) {
  if (selectedColumn.value == column) {
    if (selectedDirection.value == "desc") {
      selectedDirection.value = "asc";
    } else {
      selectedDirection.value = "desc";
    }
  } else {
    selectedDirection.value = "asc";
  }
  selectedColumn.value = column;
}

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

function sendSingleMail(mail: any) {
  selectedMail.value = mail;
  if (selectedMail.value) {
    selectedMail.value.forward_requested = true;
    selectedMail.value.forward_address =
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
      .dispatch("updateMail", selectedMail.value)
      .then((res) => {
        isVisible = setModal("m2", false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function shredSingleMail(mail: any) {
  selectedMail.value = mail;
  if (selectedMail.value) {
    selectedMail.value.shred_requested = true;
    store
      .dispatch("updateMail", selectedMail.value)
      .then((res) => {
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

function redirectToOrder() {
  return router.push({
    name: "Virtual hq",
  });
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
      loading = false;
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
