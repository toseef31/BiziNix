<template>
  <div class="flex flex-row px-10">
    <div class="flex flex-col py-10 items-center basis-5/6">
      <div class="grid grid-cols-2 gap-8">
        <div
          :class="[bankAccount.is_main ? 'border-2 border-teal-500' : 'border-0', 'flex flex-row gap-8 rounded-lg shadow-md p-4 bg-gray-800']"
          v-for="bankAccount in bankAccounts">
          <div class="flex flex-col">
            <FormKit type="text" label="Názov účtu" name="iban" v-model="bankAccount.account_name"
              :classes="{ label: '$reset text-sm text-white mt-1 select-none' }" />
            <FormKit type="text" label="IBAN" name="iban" v-model="bankAccount.iban"
              :classes="{ label: '$reset text-sm text-white mt-1 select-none' }" />
            <FormKit type="text" label="Číslo účtu" name="account_number" v-model="bankAccount.account_number"
              :classes="{ label: '$reset text-sm text-white mt-1 select-none' }" />
            <FormKit type="text" label="Názov banky" name="name" v-model="bankAccount.bank_name"
              :classes="{ label: '$reset text-sm text-white mt-1 select-none' }" />
            <div class="flex flex-row gap-4">
              <FormKit type="text" label="SWIFT" name="swift" v-model="bankAccount.swift"
                :classes="{ label: '$reset text-sm text-white mt-1 select-none' }" />
              <FormKit type="text" label="Kód banky" name="bank_code" v-model="bankAccount.bank_code"
                :classes="{ label: '$reset text-sm text-white mt-1 select-none' }" />
            </div>
            <div class="flex flex-row justify-between">
              <div>
                <button @click="updateActiveBankAccount(bankAccount)" v-if="!bankAccount.is_main"
                  class="flex justify-end w-fit items-center py-2 px-4 hover:cursor-pointer text-teal-500 hover:text-teal-700">
                  Vybrať ako predvyplnený
                </button>
              </div>

              <div>
                <button @click="deleteBankAccountModal(bankAccount)"
                  class="flex justify-end w-fit items-center py-2 px-4 hover:cursor-pointer text-red-700 hover:text-red-500">
                  <TrashIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-6 basis-1/6">
      <div>
        <button @click="showAdditionModalDialog = true"
          class="w-full shadow flex justify-center border items-center py-2 px-4 rounded-lg bg-gray-500 border-gray-500 text-white font-bold hover:text-white hover:cursor-pointer hover:bg-teal-500 hover:border-teal-500 space-x-2">
          <span class="pr-2">Pridať účet</span>
          <PlusCircleIcon class="h-6 w-6 text-white" aria-hidden="true" />
        </button>
      </div>
      <div>
        <button @click="updateBankAccounts"
          class="w-full shadow flex justify-center border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-white font-bold hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2">
          Akualizovať údaje
        </button>
      </div>
    </div>
  </div>
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
  <Dialog :open="showAdditionModalDialog" @close="showAdditionModalDialog = false" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
      <DialogPanel class="w-full max-w-lg bg-gray-900 rounded">
        <div class="flex justify-end px-4 pt-4">
          <button class="bg-red-500 hover:bg-red-700 h-8 px-6 rounded text-white"
            v-on:click="showAdditionModalDialog = false" type="button">
            X
          </button>
        </div>
        <div role="status" class="flex py-10 h-full w-full justify-center text-white">
          <FormKit type="form" :actions="false" id="addBankAccount" @submit-invalid="showErrors"
            #default="{ value, state: { valid } }" @submit="addBankAccount">
            <FormKit type="text" name="account_name" validation="required" v-model="currentBankAccount.account_name"
              label="Názov účtu" />
            <FormKit type="text" name="bank_name" validation="required" v-model="currentBankAccount.bank_name"
              label="Názov banky" />
            <FormKit type="text" name="iban" validation="required" v-model="currentBankAccount.iban" label="IBAN" />
            <FormKit type="text" name="account_number" v-model="currentBankAccount.account_number" label="Číslo účtu" />
            <FormKit type="text" name="swift" validation="required" v-model="currentBankAccount.swift" label="SWIFT" />
            <FormKit type="text" name="bank_code" v-model="currentBankAccount.bank_code" label="Kód banky" />
            <FormKit type="checkbox" label="Predvolený účet?" name="predvoleny" v-model="currentBankAccount.is_main" />
            <FormKit type="submit" label="Pridať" />
          </FormKit>
        </div>
      </DialogPanel>

    </div>
  </Dialog>
  <Dialog :open="showDeletionModalDialog" @close="showDeletionModalDialog = false" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
      <DialogPanel class="w-full max-w-lg bg-gray-900 rounded">
        <div class="flex flex-row justify-start py-8 px-8 text-white font-bold text-xl">
          Naozaj chcete tento bankový účet zmazať? <br>
          IBAN: {{ selectedBankAccount.iban }}
        </div>
        <div class="flex flex-row justify-center pb-4 px-4 gap-8">
          <div class="flex flex-1/4">
            <button class="bg-gray-500 hover:bg-gray-800 h-10 px-8 rounded z-10 text-white"
              v-on:click="showDeletionModalDialog = false">
              Nie
            </button>
          </div>
          <div class="flex flex-1/4 px-4">
            <button class="bg-teal-500 hover:bg-teal-700 h-10 px-8 rounded z-10 text-white"
              v-on:click="deleteBankAccount()">
              Áno
            </button>
          </div>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import store from '@/store';
import { onBeforeMount, ref, watch, computed } from 'vue';
import type Company from "@/types/Company";
import type CompanyBankAccount from "@/types/CompanyBankAccount";
import { Dialog, DialogPanel } from '@headlessui/vue';
import { PlusCircleIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { getValidationMessages } from '@formkit/validation'

let company = ref({} as Company);
const bankAccounts = computed(() => store.state.bankAccounts as CompanyBankAccount[]);
const messages = ref([]);
const currentBankAccount = ref({} as CompanyBankAccount)
const selectedBankAccount = ref({} as CompanyBankAccount);

const showLoadingModalDialog = ref(false);
const showAdditionModalDialog = ref(false);
const showDeletionModalDialog = ref(false);

function deleteBankAccountModal(bankAccount: any) {
  selectedBankAccount.value = bankAccount;
  showDeletionModalDialog.value = true;
}

watch(
  () => store.getters.getSelectedCompany,
  async function () {
    company.value = store.getters.getSelectedCompany;
    await refreshData();
  }
);

async function refreshData() {
  await store
    .dispatch("getCompanyBankDetails", company.value.id)
    .then(async (response) => {
      store.state.bankAccounts = response.data;
    });
}

async function addBankAccount() {
  currentBankAccount.value.company_id = company.value.id;
  await store
    .dispatch("addBankAccount", currentBankAccount.value)
    .then(async () => {
      await refreshData();
      showAdditionModalDialog.value = false;
    });
}

async function updateBankAccounts() {
  showLoadingModalDialog.value = true;

  const bankoveUcty = { bankAccounts: bankAccounts.value };
  await store
    .dispatch("updateCompanyBankAccounts", bankoveUcty)
    .then(async () => {
      await refreshData();
      showLoadingModalDialog.value = false;
    });
}

async function updateActiveBankAccount(bankAccount) {
  showLoadingModalDialog.value = true;

  bankAccounts.value.forEach((account) => {
    if (account.id == bankAccount.id) {
      account.is_main = true;
    } else {
      account.is_main = false;
    }
  });

  const bankoveUcty = { bankAccounts: bankAccounts.value };

  await store
    .dispatch("updateCompanyBankAccounts", bankoveUcty)
    .then(async () => {
      await refreshData();
      showLoadingModalDialog.value = false;
    });
}

async function deleteBankAccount() {
  await store
    .dispatch("deleteBankAccount", selectedBankAccount.value)
    .then(async () => {
      await refreshData();
      showDeletionModalDialog.value = false;
    });
}

function showErrors(node: any) {
  messages.value = []
  const validations = getValidationMessages(node)
  validations.forEach((inputMessages: any) => {
    messages.value = messages.value.concat(
      inputMessages.map((message: any) => message.value)
    )
  })
}

onBeforeMount(async () => {
  company.value = store.getters.getSelectedCompany;
  await refreshData();
})

</script>

<style>
.formkit-input {
  color: black;
}

.formkit-select-icon {
  color: black;
}
</style>