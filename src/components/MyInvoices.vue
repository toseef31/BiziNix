<template>
    <div class="flex flex-row px-10">
        <div v-if="invoices.length > 0">
            <div class="relative sm:rounded-lg py-10 w-full">
                <div class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <table class="min-w-full table-fixed divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Číslo objednávky
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Predmet objednávky
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    <span class="inline-flex items-center text-teal-500">
                                        Dátum vystavenia
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor"
                                                viewBox="0 0 320 512">
                                                <path
                                                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                            </svg>
                                        </button>
                                    </span>
                                </th>

                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Stiahnuť faktúru
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-gray-50">
                            <tr v-for="invoice in invoices" :key="invoice.id">
                                <td class="whitespace-nowrap py-4 pl-3 text-sm font-medium text-gray-900">
                                    {{ invoice.id }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {{ invoice.description }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {{ formatDate(invoice.created_at) }}
                                </td>
                                <td class="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                                    <div class="flex-1 py-4 px-3 text-left">
                                        <button class="font-medium text-gray-900 hover:underline"
                                            v-on:click="downloadInvoice(invoice)">
                                            Stiahnuť faktúru
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Modal
          name="loadingModal"
          v-model:visible="isVisible"
          :type="'clean'"
          :closable="false"
          title="Loading..."
        >
          <div class="w-full h-full">
            <div role="status" class="flex py-10 h-full w-full justify-center">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mr-2 text-white animate-spin dark:text-gray-900 fill-teal-500"
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
          </div>
      </Modal>
        <!-- END OF TABLE -->
    </div>
</template>
  
<script setup lang="ts">
import store from '@/store';
import { onMounted, ref, computed, reactive } from 'vue';
import * as FileSaver from "file-saver";
import * as _ from "lodash";
import dayjs from "dayjs";
import { useModal, Modal } from "usemodal-vue3";
import { toast } from 'vue3-toastify';

const invoices = ref([] as any);

const setModal = useModal({
  loadingModal: 1
});

let isVisible = reactive({});

isVisible = setModal("loadingModal", false);

function showModal(modalName: string) {
  isVisible = setModal(modalName, true);
}

function closeModal(modalName: string) {
  isVisible = setModal(modalName, false);
}

function formatDate(dateString: string) {
    const date = dayjs(dateString);
    return date.format("DD.MM.YYYY");
}

function saveAs(filename: string, blob: Blob) {
    FileSaver.saveAs(blob, filename);
}

async function downloadInvoice(invoice: any) {
    if(invoice.amount <= 0) {
        toast.info('Táto objednávka je spracovaná bezplatne a nie je k nej vystavený žiadny doklad');
    } else {
        showModal('loadingModal');
        const data = {
            'id': invoice.id,
            'type': 2
        }
        try{
            await store.dispatch("getOrderInvoiceForOrderByType", data)
            .then(async (response) => {
            const singleOrderInvoice = ref(response.data.data);
            await store.dispatch("generateInvoiceById", singleOrderInvoice.value.order.id)
            .then(response => {
                const byteCharacters = atob(response.data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                saveAs(singleOrderInvoice.value.file_name, blob);
            });
            })
            .catch(async (e: Error) => {
                console.log('Sťahovanie ostrej FA zlyhalo: ' + e.message);
                console.log('Sťahujem zalohovu FA');
                data.type = 1;
                await store.dispatch("getOrderInvoiceForOrderByType", data)
                .then(async (response) => {
                const singleOrderInvoice = ref(response.data.data);
                await store.dispatch("generateInvoiceById", singleOrderInvoice.value.id)
                .then(response => {
                    const byteCharacters = atob(response.data);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: 'application/pdf' });
                    saveAs(singleOrderInvoice.value.file_name, blob);
                });
                })
                .catch((e: Error) => {
                console.log('Sťahovanie ostrej FA zlyhalo: ' + e.message);
                });
            });
        } catch {
            console.log('Sťahovanie ostrej aj zálohovej FA zlyhalo');
        }

        closeModal('loadingModal');
    }
}

onMounted(async () => {
    await store.dispatch("getAllOrdersForUser", store.state.user.userId)
        .then((response) => {
          invoices.value = response.data.data
        })
})

</script>