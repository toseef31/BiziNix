<template>
  <div class="flex flex-row px-10">
    <div class="flex flex-col py-10 basis-3/4 pr-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="invoiceProfiles.length > 0">
        <div class="" v-for="profile in invoiceProfiles">
          <div class="overflow-hidden bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg font-bold leading-6 text-gray-900">{{ profile.name ? profile.name : profile.first_name +" "+profile.last_name }}</h3>
              <p v-if="profile.ico" class="mt-1 max-w-2xl text-sm text-gray-500">IČO:{{ profile.ico }}</p>
              <div class="my-2 border-b border-gray-200"></div>
              <p><button @click="invoiceProfileDetails(profile.id)" class="text-teal-500 hover:underline">Zobraziť
                  podrobnosti</button></p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="invoiceProfiles.length == 0">
        <div>Momentálne nemáte vo svojom účte žiadne fakturačné profily.</div>
      </div>
    </div>
    <div class="flex flex-col gap-6 basis-1/4">
      <div>
        <button @click="showAddProfile()"
          class="w-full shadow flex justify-center border items-center py-2 px-4 rounded-lg bg-gray-500 border-gray-500 text-white font-bold hover:text-white hover:cursor-pointer hover:bg-teal-500 hover:border-teal-500 space-x-2">
          <span class="pr-2">Pridať fakturačný profil</span>
          <PlusCircleIcon class="h-6 w-6 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
  <Dialog :open="showProfileDetailsDialog" @close="showProfileDetailsDialog = false" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
      <DialogPanel class="w-full max-w-lg bg-transparent rounded">
        <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
          <div class="flex justify-end px-4 pt-4">
            <button class="bg-red-500 hover:bg-red-700 h-8 px-6 rounded text-white"
              v-on:click="showProfileDetailsDialog = false" type="button">
              X
            </button>
          </div>
          <div role="status" class="flex py-10 h-full w-full justify-center text-white">
            <FormKit type="form" :actions="false" id="profileDetails" @submit-invalid="showErrors"
              #default="{ value, state: { valid } }" @submit="updateInvoiceProfile">
              <div class="px-4">
                <div class="flex">
                  <FormKit type="checkbox" v-model="isCompany" :checked="isCompany"
                    label="Fakturačný profil firmy?"></FormKit>
                </div>
                <div class="flex flex-row gap-2" v-if="!isCompany">
                  <FormKit type="text" name="first_name" v-model="currentInvoiceProfile.first_name" label="Krstné meno" />
                  <FormKit type="text" name="last_name" v-model="currentInvoiceProfile.last_name" label="Priezvisko" />
                </div>
                <div class="flex flex-row gap-2" v-if="isCompany">
                  <FormKit type="text" name="name" v-model="currentInvoiceProfile.name" label="Názov spoločnosti" />
                  <FormKit type="text" name="ico" v-model="currentInvoiceProfile.ico" label="IČO" />
                </div>
                <div class="flex flex-row gap-2" v-if="isCompany">
                  <FormKit type="text" name="dic" v-model="currentInvoiceProfile.dic" label="DIČ" />
                  <FormKit type="text" name="ic_dph" v-model="currentInvoiceProfile.ic_dph" label="IČ DPH" />
                </div>
              </div>
              <div class="mx-2 my-2 border-b border-gray-200"></div>
              <!-- ADDRESS -->
              <div class="grid grid-cols-3 gap-4 px-4">
                <FormKit type="select" name="country" id="country" placeholder="Vybrať" label="Štát"
                  v-model="invoiceAddress.country" :options="['Slovensko', 'Česko']" validation="required"
                  validation-visibility="dirty" />
                <FormKit type="text" name="city" v-model="invoiceAddress.city" label="Obec" validation="required" />
                <FormKit type="text" name="psc" v-model="invoiceAddress.psc" label="PSČ" validation="required" />
                <FormKit type="text" name="street" v-model="invoiceAddress.street" label="Ulica" validation="required" />
                <FormKit type="text" name="inv_street_number" v-model="invoiceAddress.street_number" label="Súpisne číslo"
                  validation="require_one:inv_street_number2" help="Číslo pred lomítkom" />
                <FormKit type="text" name="inv_street_number2" v-model="invoiceAddress.street_number2"
                  label="Orientačné číslo" validation="require_one:inv_street_number" help="Číslo za lomítkom" />
              </div>
              <div class="px-4">
                <FormKit type="submit" label="Aktualizovať" />
              </div>
            </FormKit>
          </div>
        </div>
      </DialogPanel>
    </div>

  </Dialog>
  <Dialog :open="showAddProfileDialog" @close="showAddProfileDialog = false" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
      <DialogPanel class="w-full max-w-lg bg-gray-900 rounded">
        <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
          <div class="flex justify-end px-4 pt-4">
            <button class="bg-red-500 hover:bg-red-700 h-8 px-6 rounded text-white"
              v-on:click="showAddProfileDialog = false" type="button">
              X
            </button>
          </div>
          <div role="status" class="flex py-10 h-full w-full justify-center text-white">
            <FormKit type="form" :actions="false" id="addInvoiceProfile" @submit-invalid="showErrors"
              #default="{ value, state: { valid } }" @submit="addInvoiceProfile">
              <div class="px-4">
                <div class="flex">
                  <FormKit type="checkbox" v-model="isCompany" :checked="isCompany" label="Fakturačný profil firmy?">
                  </FormKit>
                </div>
                <div class="flex flex-row gap-2" v-if="!isCompany">
                  <FormKit type="text" name="first_name" v-model="currentInvoiceProfile.first_name" label="Krstné meno" />
                  <FormKit type="text" name="last_name" v-model="currentInvoiceProfile.last_name" label="Priezvisko" />
                </div>
                <div class="flex flex-row gap-2" v-if="isCompany">
                  <FormKit type="text" name="name" v-model="currentInvoiceProfile.name" label="Názov spoločnosti" />
                  <FormKit type="text" name="ico" v-model="currentInvoiceProfile.ico" label="IČO" />
                </div>
                <div class="flex flex-row gap-2" v-if="isCompany">
                  <FormKit type="text" name="dic" v-model="currentInvoiceProfile.dic" label="DIČ" />
                  <FormKit type="text" name="ic_dph" v-model="currentInvoiceProfile.ic_dph" label="IČ DPH" />
                </div>
              </div>
              <div class="mx-2 my-2 border-b border-gray-200"></div>
              <!-- ADDRESS -->
              <div class="grid grid-cols-3 gap-4 px-4">
                <FormKit type="select" name="country" id="country" placeholder="Vybrať" label="Štát"
                  v-model="invoiceAddress.country" :options="['Slovensko', 'Česko']" validation="required"
                  validation-visibility="dirty" />
                <FormKit type="text" name="city" v-model="invoiceAddress.city" label="Obec" validation="required" />
                <FormKit type="text" name="psc" v-model="invoiceAddress.psc" label="PSČ" validation="required" />
                <FormKit type="text" name="street" v-model="invoiceAddress.street" label="Ulica" validation="required" />
                <FormKit type="text" name="inv_street_number" v-model="invoiceAddress.street_number" label="Súpisne číslo"
                  validation="require_one:inv_street_number2" help="Číslo pred lomítkom" />
                <FormKit type="text" name="inv_street_number2" v-model="invoiceAddress.street_number2"
                  label="Orientačné číslo" validation="require_one:inv_street_number" help="Číslo za lomítkom" />
              </div>
              <div class="px-4">
                <FormKit type="submit" label="Pridať" />
              </div>
            </FormKit>
          </div>
        </div>
      </DialogPanel>
    </div>

  </Dialog>
</template>

<script setup lang="ts">
import store from '@/store';
import { onMounted, ref, computed, watch } from 'vue';
import { Dialog, DialogPanel } from '@headlessui/vue';
import { getValidationMessages } from '@formkit/validation'
import { PlusCircleIcon } from '@heroicons/vue/24/outline';
import type Address from '@/types/Address';
import { toast } from "vue3-toastify";

const user = computed(() => store.state.user.userId);
let invoiceProfiles = ref([] as any);
const messages = ref([]);
let currentInvoiceProfile = ref({} as any)
const invoiceAddressId = ref();
const isCompany = ref(false);
const showProfileDetailsDialog = ref(false);
const showAddProfileDialog = ref(false);

let invoiceAddress = ref({
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
} as Address)

watch(currentInvoiceProfile, async () => {
  if (currentInvoiceProfile.value.id) {
    const res = await store.dispatch("getFakturacneUdajeById", currentInvoiceProfile.value.id)
    if (res.data) {
      invoiceAddressId.value = res.data.address_id;
      await store
        .dispatch("getAddressById", invoiceAddressId.value)
        .then((response) => {
          invoiceAddress.value = response.data;
        });
    }
  } else {
    invoiceAddressId.value = 0;
    invoiceAddress = ref({
      street: '',
      street_number: '',
      street_number2: '',
      city: '',
      psc: '',
      country: '',
    } as Address);
  }
})

function invoiceProfileDetails(id: number) {
  currentInvoiceProfile.value = invoiceProfiles.value.filter((item) => { return (item.id == id); })[0];
  showProfileDetailsDialog.value = true;
}

function showAddProfile() {
  currentInvoiceProfile.value = {};
  showAddProfileDialog.value = true;
}

async function addInvoiceProfile() {
  await store
    .dispatch("registerAddress", invoiceAddress.value)
    .then(async (res) => {
      invoiceAddressId.value = res.address_id;
      currentInvoiceProfile.value.user_id = user.value;
      currentInvoiceProfile.value.address_id = invoiceAddressId.value;
      await store
        .dispatch("addInvoiceProfile", currentInvoiceProfile.value)
        .then(async () => {
          await store.dispatch("getFakturacneUdajeByUserId", store.state.user.userId)
            .then((response) => {
              invoiceProfiles.value = response.data
              showAddProfileDialog.value = false;
            })
        });
    })
    .catch((err) => {
      toast.error('Error: ' + err);
    });
}

async function updateInvoiceProfile() {
  await store
    .dispatch("updateInvoiceProfile", currentInvoiceProfile.value)
    .then(async () => {
      await store.dispatch("updateAddress", invoiceAddress.value)
        .then(async () => {
          await store.dispatch("getFakturacneUdajeByUserId", store.state.user.userId)
            .then((response) => {
              invoiceProfiles.value = response.data
              showProfileDetailsDialog.value = false;
            })
        })
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


onMounted(async () => {
  await store.dispatch("getFakturacneUdajeByUserId", store.state.user.userId)
    .then((response) => {
      invoiceProfiles.value = response.data
    })
})

</script>