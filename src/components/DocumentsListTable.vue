<template>
  <div class="overflow-x-auto w-full">
    <div class="flex flex-row pb-6 gap-4 justify-start" v-show="selectedDocuments.length > 0">
      <div class="flex">
        <button type="button"
          class="shadow flex border items-center py-2 px-4 rounded-lg bg-red-500 border-red-500 text-white hover:text-red-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
          v-on:click="showDeleteMultipleModalDialog = true">
          Zmazať označené
        </button>
      </div>
      <div class="flex">
        <button type="button"
          class="shadow flex border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
          v-on:click="downloadMultipleDocuments()">
          Stiahnuť označené
        </button>
      </div>
    </div>
    <ul>
      <li class="pb-2" v-for="document in documents" :key="document.id">
        <div :class="[
          document.isIssued ? 'bg-gray-700' : 'bg-slate-500',
          document.isPaid ? 'bg-teal-900' : 'bg-gray-700',
          'flex rounded-2xl',
        ]">
          <div class="flex flex-col basis-3/5 px-4">
            <div class="flex flex-col">
              <div class="flex flex-row text-gray-300 pt-2 px-4 justify-between">
                <div class="text-2xl font-extrabold">
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
              <div class="flex flex-row justify-start pb-4">
                <button v-if="document.isIssued" type="button"
                  class="text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent hover:text-teal-500 focus:outline-none"
                  v-on:click="editDocument(document)">
                  Upraviť
                </button>
                <button v-if="document.isIssued" type="button"
                  class="text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent hover:text-teal-500 focus:outline-none"
                  v-on:click="duplicateDocument(document)">
                  Duplikovať
                </button>
                <button type="button"
                  class="text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent hover:text-teal-500 focus:outline-none"
                  v-on:click="downlaodSingleDocument(document)">
                  Stiahnuť
                </button>
                <button type="button" :disabled="document.isPaid" v-if="document.isIssued" :class="[
                  document.isPaid ? 'text-teal-500' : 'hover:text-teal-500',
                  'text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent focus:outline-none',
                ]" v-on:click="sendReminder(document)">
                  Vystaviť upomienku
                </button>
                <button type="button"
                  class="text-white font-medium text-sm px-5 pt-2.5 mr-2 bg-transparent hover:text-red-500 focus:outline-none"
                  v-on:click="deleteSingleDocument(document)">
                  Zmazať
                </button>
              </div>
            </div>
          </div>
          <div :class="[
            document.isIssued ? 'bg-gray-800' : 'bg-gray-600',
            document.isPaid ? 'bg-teal-700' : 'bg-gray-800',
            'flex flex-col basis-2/5 rounded-2xl text-white py-2',
          ]">
            <div class="flex flex-row">
              <div class="flex flex-col basis-3/4 px-6 py-1">
                <div class="flex text-2xl font-extrabold" v-if="document.isDph">
                  {{ (document.total).toFixed(2) }} {{ document.currency }}
                </div>
                <div class="flex text-2xl font-extrabold" v-else>
                  {{ document.total }} {{ document.currency }}
                </div>
                <div class="flex text-xl" v-if="document.isDph && document.isIssued == 1">{{ document.total+document.total_vat }} {{ document.currency }} s DPH</div>
                <div class="flex text-xl" v-if="document.isDph && document.isIssued == 0 && document.total_vat > 0">{{ document.total+document.total_vat }} {{ document.currency }} s DPH</div>
                <div class="flex text-sm" v-if="document.isIssued">{{ document.overdue }}</div>
              </div>
              <div class="flex flex-col items-center justify-center basis-1/4">
                <div class="flex flex-col items-center pr-2">
                  <div>
                    <input type="checkbox"
                      class="w-6 h-6 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      :value="document" v-model="selectedDocuments" />
                  </div>
                  <div class="flex flex-col pt-4" v-if="document.isIssued">
                    <button :disabled="document.isPaid" @click="repay(document)" :class="[document.isPaid? '' : 'hover:text-teal-500', 'flex flex-col justify-center text-center items-center text-gray-300']">
                      <CreditCardIcon
                                class="ml-1 h-6 w-6 text-primary transition-transform group-hover:text-primary"
                                aria-hidden="true"
                            />
                            <span class="ml-3 text-sm font-medium"
                              v-show="!document.isPaid && document.paid == 0">Neuhradené</span>
                            <span class="ml-3 text-sm font-medium"
                              v-show="!document.isPaid && document.paid > 0">Uhradené {{ document.paid }}{{ document.currency }} z {{ document.total + document.total_vat }}{{ document.currency }}</span>
                            <span class="ml-3 text-sm font-medium"
                              v-show="document.isPaid">Uhradené</span>
                    </button>                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div v-if="documents?.length == 0">
    <div>Momentálne nemáte vo svojom účte žiadne doklady.</div>
  </div>
  <Dialog :open="showDeleteModalDialog" @close="showDeleteModalDialog = false" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
      <DialogPanel class="w-full max-w-lg bg-gray-900 rounded">
          <div class="flex flex-row justify-start py-4 px-4 text-white font-bold text-lg">
            Prosím potvrdte zmazanie dokladu.
          </div>
          <div class="flex flex-row justify-end py-2 px-4">
            <div class="flex flex-1/4 px-4">
              <button class="bg-red-500 hover:bg-red-700 h-8 px-6 rounded z-10 text-white"
                v-on:click="confirmDelete(selectedDocument)">
                Zmazať
              </button>
            </div>
            <div class="flex flex-1/4">
              <button class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-white"
                v-on:click="showDeleteModalDialog = false">
                Zrušiť
              </button>
            </div>
          </div>
      </DialogPanel>
    </div>

  </Dialog>
  <Dialog :open="showDeleteMultipleModalDialog" @close="showDeleteMultipleModalDialog = false" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
      <DialogPanel class="w-full max-w-lg bg-gray-900 rounded">
          <div class="flex flex-row justify-start py-4 px-4 text-white font-bold text-lg">
            Prosím potvrdte zmazanie označených dokladov.
          </div>
          <div class="flex flex-row justify-end py-2 px-4">
            <div class="flex flex-1/4 px-4">
              <button class="bg-red-500 hover:bg-red-700 h-8 px-6 rounded z-10 text-white"
                v-on:click="confirmDeleteMultipleDocuments()">
                Zmazať
              </button>
            </div>
            <div class="flex flex-1/4">
              <button class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-white"
                v-on:click="showDeleteMultipleModalDialog = false">
                Zrušiť
              </button>
            </div>
          </div>
      </DialogPanel>
    </div>

  </Dialog>
  <Dialog :open="showReminderModalDialog" @close="showReminderModalDialog = false" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
      <DialogPanel class="w-full max-w-lg bg-gray-900 rounded">
          <div class="flex justify-start py-4 px-4 text-white font-bold text-lg">
            Prosím potvrďte vystavenie upomienky
          </div>
          <img src="@/assets/upomienka.png" class="h-auto shrink-0 z-0 w-[128px] relative float-right pr-8" />
          <div class="flex p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            role="alert" v-show="selectedDocument.reminder_sent">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">Pozor!</span> Pre tento doklad ste už
              upomienku vystavili.
            </div>
          </div>
          <div class="flex flex-col justify-start px-4 text-white">
            <FormKit type="email" id="reminder_email" label="Email klienta" placeholder="email@example.com"
              v-model="reminderEmail" />
            <FormKit type="textarea" name="reminder_text" label="Sprievodný text upomienky" v-model="reminderText" />
          </div>

          <div class="flex flex-row justify-end py-2 px-4">
            <div class="flex flex-1/4 px-4">
              <button class="bg-teal-500 hover:bg-teal-700 h-8 px-6 rounded z-10 text-white"
                v-on:click="confirmReminder(selectedDocument, reminderEmail, reminderText)">
                Odoslať upomienku
              </button>
            </div>
            <div class="flex flex-1/4">
              <button class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-white"
                v-on:click="showReminderModalDialog = false">
                Zrušiť
              </button>
            </div>
          </div>
      </DialogPanel>
    </div>

  </Dialog>
  <Dialog :open="showRepayModalDialog" @close="showRepayModalDialog = false" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
      <DialogPanel class="w-full max-w-lg bg-gray-900 rounded">
          <div class="flex justify-start py-4 px-4 text-white font-bold text-lg">
            Koľko bolo uhradené?
          </div>
          <div class="flex justify-start px-4 text-white">
            <FormKit type="number" id="repay_amount" label="Zaplatená suma" v-model="totalToPay"
              :value="totalToPay" :min="0" />
          </div>
          <div class="flex justify-start px-4 text-white">
            <FormKit type="date" name="Dátum úhrady" label="Dátum úhrady" validation="required|length:10"
              v-model="selectedDocument.payment_date" :value="today" />
          </div>
          <div class="flex flex-row justify-end py-2 px-4">
            <div class="flex flex-1/4 px-4">
              <button class="bg-teal-500 hover:bg-teal-700 h-8 px-6 rounded z-10 text-white"
                v-on:click="repayConfirm(selectedDocument)">
                Potvrdiť
              </button>
            </div>
            <div class="flex flex-1/4">
              <button class="bg-gray-500 hover:bg-gray-700 h-8 px-6 rounded z-10 text-white"
                v-on:click="showRepayModalDialog = false">
                Zrušiť
              </button>
            </div>
          </div>
      </DialogPanel>
    </div>

  </Dialog>
  <Dialog :open="showLoadingModalDialog" @close="showLoadingModalDialog = false" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
      <DialogPanel class="w-full max-w-sm bg-transparent rounded">
        <div class="w-full h-full">
          <div role="status" class="flex py-10 h-full w-full justify-center">
            <svg aria-hidden="true" class="w-10 h-10 mr-2 text-white animate-spin dark:text-gray-900 fill-teal-500"
              viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import store from "@/store";
import { computed, ref, watch, onBeforeMount } from "vue";
import type Doklad from "@/types/Document";
import { useRouter } from "vue-router";
import { Dialog, DialogPanel } from '@headlessui/vue';
import saveAs from "file-saver";
import moment from "moment";
import * as _ from "lodash";
import type Company from "@/types/Company";
import { toast } from "vue3-toastify";
import { CreditCardIcon } from "@heroicons/vue/24/outline"

const documents = computed(() => store.state.documents);
const router = useRouter();
const today = moment(new Date()).format("YYYY-MM-DD");
const company = ref({} as Company);
const updateFinData = ref(false);

const showLoadingModalDialog = ref(false);
const showDeleteModalDialog = ref(false);
const showDeleteMultipleModalDialog = ref(false);
const showRepayModalDialog = ref(false);
const showReminderModalDialog = ref(false);

const selectedDocuments = ref([] as any[]);
const selectedDocument = ref({} as Doklad);
const reminderEmail = ref("");
const reminderText = ref("Dobrý deň, zasielame Vám upomienku k dokladu.");

const bankAccountId = ref(0);
const totalToPay = ref(0);

const indeterminate = computed(
  () =>
    selectedDocuments.value.length > 0 &&
    selectedDocuments.value.length < documents.value.length
);

watch(
  () => store.getters.getSelectedCompany,
  async function () {
    await refreshData();
  }
);

function saveFile(filename: string, blob: Blob) {
  saveAs(blob, filename);
}

function editDocument(document: Doklad) {
  store.dispatch("setDocument", document).then(() => {
    return router.push({
      name: "Doklad",
    });
  });
}

async function duplicateDocument(document: any) {
  showLoadingModalDialog.value = true;
  let newDocument = {
    type: document.type,
    subtype: document.subtype,
    company_id: document.company_id,
    odberatel: document.odberatel,
    contact_person: document.contact_person,
    address: document.address,
    psc: document.psc,
    city: document.city,
    country: document.country,
    ico: document.ico,
    dic: document.dic,
    icdph: document.icdph,
    serial_number: "",
    variabilny: "",
    konstantny: document.konstantny,
    specificky: document.specificky,
    note_above: document.note_above,
    items: [] as any[],
    note_under: document.note_under,
    date_of_issue: today,
    due_by: document.due_by,
    delivery_method: document.delivery_method,
    delivery_date: today,
    payment_method: document.payment_method,
    currency: document.currency,
    pdf: "",
    isIssued: document.isIssued,
    isPaid: false,
    reminder_sent: false,
    paid: 0,
    total: document.total,
    payment_date: "",
    bank_account_id: bankAccountId.value
  };

  newDocument.items = JSON.parse(document.items);

  const inputs = {
    companyId: company.value.id,
    subtype: document.subtype
  }

  await store
    .dispatch("getDocumentSnForCompany", inputs)
    .then((response) => {
      newDocument.serial_number = response.data;
      newDocument.variabilny = response.data;
    });
  store
    .dispatch("addDocument", newDocument)
    .then((res) => {
      store.dispatch("setDocument", newDocument).then(() => {
        store.state.documents.push(res.Document);
        updateFinData.value = true;
        store.state.document = res.Document;
        showLoadingModalDialog.value = false;
        router.push({
          name: "Doklad",
        });
      });
    })
    .catch((err) => {
      showLoadingModalDialog.value = false;
      toast.error('Error: ' + err);
    });
}

function deleteSingleDocument(document: Doklad) {
  selectedDocument.value = document;
  showDeleteModalDialog.value = true;
}

function confirmDelete(document: Doklad) {
  store
    .dispatch("deleteDocument", document.id)
    .then(() => {
      let index = store.state.documents.findIndex(d => d.id === document.id);
      store.state.documents.splice(index, 1);
      updateFinData.value = true;
      showDeleteModalDialog.value = false;
    })
    .catch((err) => {
      toast.error('Error: ' + err);
    });
}

function confirmDeleteMultipleDocuments() {
  selectedDocuments.value.forEach(function (value: any) {
    store
      .dispatch("deleteDocument", value.id)
      .then(() => {
        let index = store.state.documents.findIndex(d => d.id === value.id);
        store.state.documents.splice(index, 1);
        updateFinData.value = true;
        showDeleteMultipleModalDialog.value = false;
      })
      .catch((err) => {
        toast.error('Error: ' + err);
      });
  });
}

async function downlaodSingleDocument(document: any) {
  if (document.isIssued == 1) {
    await store
      .dispatch("downloadDocument", document.id)
      .then((response) => {
        const byteCharacters = atob(response);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        saveFile("document", blob);
      })
      .catch((e: Error) => {
        toast.error('Error: ' + e);
      });
  } else {
    if(document.pdf) {
      await store
      .dispatch("getDocumentImg", document.id)
      .then((response) => {
        const byteCharacters = atob(response.image);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray]);

        saveFile(document.pdf, blob);
      })
      .catch((e: Error) => {
        toast.error('Error: ' + e);
      });
    } else {
      toast.warning('Pre daný doklad neexistuje súbor.');
    }
    
  }
}

async function downloadMultipleDocuments() {
  selectedDocuments.value.forEach(async function (value: any) {
    if (value.isIssued) {
      await store
        .dispatch("downloadDocument", value.id)
        .then((response) => {
          const byteCharacters = atob(response);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: "application/pdf" });

          saveFile("document", blob);
        })
        .catch((e: Error) => {
          toast.error('Error: ' + e);
        });
    } else {
      await store
        .dispatch("getDocumentImg", value.id)
        .then((response) => {
          const byteCharacters = atob(response.image);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray]);

          saveFile(value.pdf, blob);
        })
        .catch((e: Error) => {
          toast.error('Error: ' + e);
        });
    }
  });
}

function sendReminder(document: Doklad) {
  selectedDocument.value = document;
  showReminderModalDialog.value = true;
}

async function confirmReminder(document: Doklad, email: any, text: any) {
  const data = {
    id: document.id,
    email: email,
    text: text
  };
  await store
    .dispatch("sendReminder", data)
    .then(async() => {
      updateFinData.value = true;
    })
    .catch((err) => {
      toast.error('Error: ' + err);
    });
    showReminderModalDialog.value = false;
    toast.success('Upomienka úspešne odoslaná.');
}

function repay(document: Doklad) {
  selectedDocument.value = document;
  totalToPay.value = (document.total+document.total_vat)-document.paid;
  showRepayModalDialog.value = true;
}

async function repayConfirm(document: Doklad) {
  document.paid = Number(totalToPay.value);
  if (document.paid == document.total+document.total_vat) {
    document.isPaid = true;
  }
  await store
    .dispatch("updateDocument", document)
    .then(async() => {
      updateFinData.value = true;
      showRepayModalDialog.value = false;
    })
    .catch((err) => {
      toast.error('Error: ' + err);
    });
}

async function refreshData() {
  await store
    .dispatch("getSelectedCompany", store.state.selectedCompany.id)
    .then((response) => {
      company.value = response.data;
    });

  const res = await store.dispatch("getCompanyBankDetails", company.value.id)
  if (res.data[0]?.id) {
    res.data.map((data) => {
      if (data?.is_main == 1) {
        bankAccountId.value = data?.id;
      }
    })
  }
}

onBeforeMount(async () => {
  await refreshData();
});

defineExpose({
  updateFinData
});

</script>
