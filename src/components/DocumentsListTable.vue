<template>
  <div class="overflow-x-auto w-full">
    <div class="flex flex-row pb-6 gap-4 justify-start">
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
        <div class="flex bg-gray-700 rounded-2xl">
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
              <div class="flex flex-row justify-between">
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent hover:text-teal-500 focus:outline-none"
                  v-on:click="editDocument(document.id)"
                >
                  Upraviť
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent hover:text-teal-500 focus:outline-none"
                  v-on:click="duplicateDocument(document)"
                >
                  Duplikovať
                </button>
                <button
                  type="button"
                  class="text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent hover:text-red-500 focus:outline-none"
                  v-on:click="deleteSingleDocument()"
                >
                  Zmazať
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
                  class="text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent hover:text-teal-500 focus:outline-none"
                  v-on:click="sendReminder()"
                >
                  Vystaviť upomienku
                </button>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col basis-2/6 bg-gray-800 rounded-2xl text-white py-2"
          >
            <div class="flex flex-row">
              <div class="flex flex-col items-end basis-3/5 pr-8">
                <div class="flex text-2xl font-extrabold">
                  {{ document.total }} €
                </div>
                <div class="flex text-xl">{{ document.total }} € s DPH</div>
                <div class="flex text-sm">{{ document.overdue }}</div>
              </div>
              <div class="flex flex-col items-center basis-2/5">
                <div class="flex items-center pb-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    :value="document"
                    v-model="selectedDocuments"
                    class="w-6 h-6 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div class="flex">
                  <label class="relative cursor-pointer">
                    <input
                      type="checkbox"
                      v-bind:checked="document.isPaid"
                      class="sr-only peer"
                      disabled
                    />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"
                    ></div>
                    <span
                      v-show="!document.isPaid"
                      class="text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Neuhradená</span
                    >
                    <span
                      v-show="document.isPaid"
                      class="text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Uhradená</span
                    >
                  </label>
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
          <div class="bg-gray-600 rounded-lg border-gray-800 border-2">
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
          title="Zmazanie dokladu"
        >
          <div class="bg-gray-600 rounded-lg border-gray-800 border-2">
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
          <div class="bg-gray-600 rounded-lg border-gray-800 border-2">
            <div
              class="flex justify-start py-4 px-4 text-white font-bold text-lg"
            >
              Prosím potvrdte odoslanie upomienky.
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

const props = defineProps(["data"]);
const documents = computed(() => props.data);
const router = useRouter();

const selectedDocuments = ref([] as any[]);
const reminderEmail = ref("");

const setModal = useModal({
  deleteModal: 1,
  deleteMultipleModal: 2,
  reminderModal: 3
});

let isVisible = reactive({});

isVisible = setModal("deleteModal", false);
isVisible = setModal("deleteMultipleModal", false);
isVisible = setModal("reminderModal", false);

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
  return router.push({
    name: "My document",
    params: { id: id },
  });
}

function duplicateDocument(document: any) {
  store
    .dispatch("addDocument", document)
    .then(() => {
      router.go(0);
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
</script>
