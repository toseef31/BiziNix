<template>
  <div class="overflow-x-auto w-full">
    <div
      class="flex flex-row pb-6 gap-4 justify-start"
      v-show="selectedDocuments.length > 0"
    >
      <div class="flex">
        <button
          type="button"
          class="shadow flex border items-center py-2 px-4 rounded-lg bg-red-500 border-red-500 text-white hover:text-red-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
          v-on:click="deleteMultipleDocuments()"
        >
          Zmazať označené
        </button>
      </div>
      <div class="flex">
        <button
          type="button"
          class="shadow flex border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
          v-on:click="downloadMultipleDocuments()"
        >
          Stiahnuť označené
        </button>
      </div>
    </div>
    <ul>
      <li class="pb-2" v-for="document in documents" :key="document.id">
        <div
          :class="[
            document.isIssued ? 'bg-gray-700' : 'bg-gray-500',
            document.isPaid ? 'bg-teal-900' : 'bg-gray-700',
            'flex rounded-2xl',
          ]"
        >
          <div class="flex flex-col basis-4/5 px-4">
            <div class="flex flex-col">
              <div
                class="flex flex-row text-gray-300 pt-2 px-4 justify-between"
              >
                <div class="text-4xl font-extrabold">
                  {{ document.odberatel }}
                </div>
                <div class="flex flex-col">
                  <div class="font-bold text-xl text-right">
                    {{ document.serial_number }}
                  </div>
                  <div class="font-bold text-sm text-right">
                    {{ document.date_of_issue }}
                  </div>
                </div>
              </div>
              <div class="flex flex-row justify-start">
                <button
                  v-show="document.isIssued"
                  type="button"
                  class="text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent hover:text-teal-500 focus:outline-none"
                  v-on:click="editDocument(document.id)"
                >
                  Upraviť
                </button>
                <button
                  v-show="document.isIssued"
                  type="button"
                  class="text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent hover:text-teal-500 focus:outline-none"
                  v-on:click="duplicateDocument(document)"
                >
                  Duplikovať
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent hover:text-teal-500 focus:outline-none"
                  v-on:click="downlaodSingleDocument(document.id)"
                >
                  Stiahnuť
                </button>
                <button
                  type="button"
                  :disabled="document.isPaid"
                  v-show="document.isIssued"
                  :class="[
                    document.isPaid ? 'text-teal-500' : 'hover:text-teal-500',
                    'text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent focus:outline-none',
                  ]"
                  v-on:click="sendReminder()"
                >
                  Vystaviť upomienku
                </button>
                <button
                  v-show="!document.isIssued"
                  :disabled="document.isPaid"
                  :class="[
                    document.isPaid ? 'text-teal-500' : 'hover:text-teal-500',
                    'text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent focus:outline-none',
                  ]"
                  type="button"
                  v-on:click="repay()"
                >
                  <label v-show="!document.isPaid">Uhradiť</label>
                  <label v-show="document.isPaid">Uhradené</label>
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent hover:text-red-500 focus:outline-none"
                  v-on:click="deleteSingleDocument()"
                >
                  Zmazať
                </button>
              </div>
            </div>
          </div>
          <div
            :class="[
              document.isIssued ? 'bg-gray-800' : 'bg-gray-600',
              document.isPaid ? 'bg-teal-700' : 'bg-gray-800',
              'flex flex-col basis-1/4 rounded-2xl text-white py-2',
            ]"
          >
            <div class="flex flex-row">
              <div class="flex flex-col items-end basis-3/5 pr-8">
                <div class="flex text-2xl font-extrabold">
                  {{ document.total }} €
                </div>
                <div class="flex text-xl">{{ document.total }} € s DPH</div>
                <div class="flex text-sm">{{ document.overdue }}</div>
              </div>
              <div class="flex flex-col items-center justify-center basis-2/5">
                <div class="flex items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    :value="document"
                    v-model="selectedDocuments"
                    class="w-6 h-6 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          name="deleteModal"
          v-model:visible="isVisible"
          :type="'clean'"
          :closable="false"
          title="Zmazanie dokladu"
        >
          <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
            <div
              class="flex flex-row justify-start py-4 px-4 text-white font-bold text-lg"
            >
              Prosím potvrdte zmazanie dokladu.
            </div>
            <div class="flex flex-row justify-end py-2 px-4">
              <div class="flex flex-1/4 px-4">
                <button
                  class="bg-red-500 hover:bg-red-700 h-8 px-6 rounded z-10 text-white"
                  v-on:click="confirmDelete(document.id)"
                >
                  Zmazať
                </button>
              </div>
              <div class="flex flex-1/4">
                <button
                  class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-white"
                  v-on:click="closeModal('deleteModal')"
                >
                  Zrušiť
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          name="deleteMultipleModal"
          v-model:visible="isVisible"
          :type="'clean'"
          :closable="false"
          title="Zmazanie dokladov"
        >
          <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
            <div
              class="flex flex-row justify-start py-4 px-4 text-white font-bold text-lg"
            >
              Prosím potvrdte zmazanie označených dokladov.
            </div>
            <div class="flex flex-row justify-end py-2 px-4">
              <div class="flex flex-1/4 px-4">
                <button
                  class="bg-red-500 hover:bg-red-700 h-8 px-6 rounded z-10 text-white"
                  v-on:click="confirmDeleteMultipleDocuments()"
                >
                  Zmazať
                </button>
              </div>
              <div class="flex flex-1/4">
                <button
                  class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-white"
                  v-on:click="closeModal('deleteMultipleModal')"
                >
                  Zrušiť
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          name="reminderModal"
          v-model:visible="isVisible"
          :type="'clean'"
          :closable="false"
          title="Odoslanie upomienky"
        >
          <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
            <img
              src="@/assets/upomienka.png"
              class="h-auto shrink-0 z-0 w-[128px] absolute right-4 top-4"
            />
            <div
              class="flex justify-start py-4 px-4 text-white font-bold text-lg"
            >
              Prosím potvrďte vystavenie upomienky
            </div>
            <div class="flex justify-start px-4 text-white">
              <FormKit
                type="email"
                id="reminder_email"
                label="Email klienta"
                placeholder="email@example.com"
                v-model="reminderEmail"
              />
            </div>

            <div class="flex flex-row justify-end py-2 px-4">
              <div class="flex flex-1/4 px-4">
                <button
                  class="bg-teal-500 hover:bg-teal-700 h-8 px-6 rounded z-10 text-white"
                  v-on:click="confirmReminder(document.id, reminderEmail)"
                >
                  Odoslať upomienku
                </button>
              </div>
              <div class="flex flex-1/4">
                <button
                  class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-white"
                  v-on:click="closeModal('reminderModal')"
                >
                  Zrušiť
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          name="repayModal"
          v-model:visible="isVisible"
          :type="'clean'"
          :closable="false"
          title="Zaplatenie dokladu"
        >
          <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
            <div
              class="flex justify-start py-4 px-4 text-white font-bold text-lg"
            >
              Uhradenie dokladu
            </div>
            <div class="w-full px-4 py-4 text-white bg-gray-900">
              <stripePaymentComponent
                ref="childRefComponentForPay"
              ></stripePaymentComponent>
            </div>
            <div class="flex flex-row justify-end py-2 px-4">
              <div class="flex flex-1/4 px-4">
                <button
                  class="bg-teal-500 hover:bg-teal-700 h-8 px-6 rounded z-10 text-white"
                  v-on:click="repayConfirm(document)"
                >
                  Zaplatiť
                </button>
              </div>
              <div class="flex flex-1/4">
                <button
                  class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-white"
                  v-on:click="closeModal('repayModal')"
                >
                  Zrušiť
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </li>
    </ul>
  </div>
  <div v-if="data.length == 0">
    <div>Momentálne nemáte vo svojom účte žiadne doklady.</div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { computed, ref, reactive } from "vue";
import type Doklad from "@/@types/Document";
import { useRouter } from "vue-router";
import { useModal, Modal } from "usemodal-vue3";
import * as FileSaver from "file-saver";
import moment from "moment";
import stripePaymentComponent from "@/components/payments/PayStripe.vue";

const props = defineProps(["data"]);
const documents = computed(() => props.data);
const router = useRouter();
const today = moment(new Date()).format("YYYY-MM-DD");

const selectedDocuments = ref([] as any[]);
const reminderEmail = ref("");

const setModal = useModal({
  deleteModal: 1,
  deleteMultipleModal: 2,
  reminderModal: 3,
  repayModal: 4,
});

let isVisible = reactive({});

isVisible = setModal("deleteModal", false);
isVisible = setModal("deleteMultipleModal", false);
isVisible = setModal("reminderModal", false);
isVisible = setModal("repayModal", false);

function showModal(modal: string) {
  isVisible = setModal(modal, true);
}

function closeModal(modal: string) {
  isVisible = setModal(modal, false);
}

function saveAs(filename: string, blob: Blob) {
  FileSaver.saveAs(blob, filename);
}

function editDocument(id: any) {
  const document = documents.value.find((d: any) => d.id === id);
  return router.push({
    name: "My document",
    params: { document: JSON.stringify(document) },
  });
}

function duplicateDocument(document: Doklad) {
  document.date_of_issue = today;
  document.delivery_date = today;
  //este treba updatnut VS a serial_number
  store
    .dispatch("addDocument", document)
    .then(() => {
      return router.push({
        name: "My document",
        params: { document: JSON.stringify(document) },
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteSingleDocument() {
  showModal("deleteModal");
}

function confirmDelete(id: any) {
  isVisible = setModal("deleteModal", false);
  store
    .dispatch("deleteDocument", id)
    .then(() => {
      router.go(0);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteMultipleDocuments() {
  showModal("deleteMultipleModal");
}

function confirmDeleteMultipleDocuments() {
  isVisible = setModal("deleteMultipleModal", false);
  selectedDocuments.value.forEach(function (value: any) {
    store
      .dispatch("deleteDocument", value.id)
      .then(() => {
        router.go(0);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function downlaodSingleDocument(id: any) {
  store
    .dispatch("downloadDocument", id)
    .then((response) => {
      const byteCharacters = atob(response.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      saveAs("document", blob);
    })
    .catch((e: Error) => {
      console.log(e);
    });
}

function downloadMultipleDocuments() {
  console.log(selectedDocuments.value);
  selectedDocuments.value.forEach(function (value: any) {
    store
      .dispatch("downloadDocument", value.id)
      .then((response) => {
        const byteCharacters = atob(response.data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        saveAs("document", blob);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  });
}

function sendReminder() {
  showModal("reminderModal");
}

function confirmReminder(id: any, email: any) {
  isVisible = setModal("reminderModal", false);
  const data = {
    id: id,
    email: email,
  };
  store
    .dispatch("sendReminder", data)
    .then((res) => {
      const documentResponse = res;
      console.log("Res " + JSON.stringify(documentResponse));
      return documentResponse;
    })
    .catch((err) => {
      console.log(err);
    });
}

function repay() {
  showModal("repayModal");
}

function repayConfirm(document: any) {
  isVisible = setModal("repayModal", false);
  store
    .dispatch("updateDocument", document)
    .then(() => {
      router.go(0);
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>
