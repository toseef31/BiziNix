<template>
  <div class="flex flex-row px-10">
    <div class="flex flex-col py-10 basis-3/4 pr-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="invoiceProfiles.length > 0">
          <div class="" v-for="profile in invoiceProfiles">        
              <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                  <div class="px-4 py-5 sm:px-6">
                      <h3 class="text-lg font-bold leading-6 text-gray-900">{{ profile.name? profile.name : profile.first_name+" "+profile.last_name }}</h3>
                      <p v-if="profile.ico" class="mt-1 max-w-2xl text-sm text-gray-500">IČO:{{ profile.ico }}</p>
                      <div class="my-2 border-b border-gray-200"></div>
                      <p><button @click="invoiceProfileDetails(profile.id)" class="text-teal-500 hover:underline">Zobraziť podrobnosti</button></p>
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
              <button @click="showAddProfile()" class="w-full shadow flex justify-center border items-center py-2 px-4 rounded-lg bg-gray-500 border-gray-500 text-white font-bold hover:text-white hover:cursor-pointer hover:bg-teal-500 hover:border-teal-500 space-x-2">
                  <span class="pr-2">Pridať fakturačný profil</span>
                  <PlusCircleIcon class="h-6 w-6 text-white" aria-hidden="true" />
              </button>
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
          <div class="bg-gray-100 opacity-50">
            <div role="status" class="flex py-10 h-full w-full justify-center">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-teal-600"
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
    <Modal
          name="profileDetails"
          v-model:visible="isVisible"
          :type="'clean'"
          :closable="false"
          title="Aktualizácia profilu"
        >
        <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
            <div class="flex justify-end px-4 pt-4">
              <button
                class="bg-red-500 hover:bg-red-700 h-8 px-6 rounded text-white"
                v-on:click="closeModal('profileDetails')"
                type="button"
              >
                X
              </button>
            </div>
            <div role="status" class="flex py-10 h-full w-full justify-center text-white">
              <FormKit type="form"
                :actions="false"
                id="profileDetails"
                @submit-invalid="showErrors"  
                #default="{ value, state: { valid } }"
                @submit="updateInvoiceProfile"
              >
                <div class="px-4">
                  <div class="flex flex-row gap-2">
                    <FormKit
                      type="text"
                      name="first_name"
                      v-model="currentInvoiceProfile.first_name"
                      label="Krstné meno"
                    />
                    <FormKit
                      type="text"
                      name="last_name"
                      v-model="currentInvoiceProfile.last_name"
                      label="Priezvisko"
                    />
                  </div>
                  <div class="flex flex-row gap-2">
                    <FormKit
                      type="text"
                      name="name"
                      v-model="currentInvoiceProfile.name"
                      label="Názov spoločnosti"
                    />
                    <FormKit
                      type="text"
                      name="ico"
                      v-model="currentInvoiceProfile.ico"
                      label="IČO"
                    />
                  </div>
                  <div class="flex flex-row gap-2">
                    <FormKit
                      type="text"
                      name="dic"
                      v-model="currentInvoiceProfile.dic"
                      label="DIČ"
                    />
                    <FormKit
                      type="text"
                      name="ic_dph"
                      v-model="currentInvoiceProfile.ic_dph"
                      label="IČ DPH"
                    />
                  </div>
                </div>
                <div class="mx-2 my-2 border-b border-gray-200"></div>
                <!-- ADDRESS -->
                <div class="grid grid-cols-3 gap-4 px-4">
                  <FormKit type="select" name="country" id="country" placeholder="Vybrať" label="Štát" v-model="invoiceAddress.country"
                    :options="['Slovensko', 'Česko']" validation="required" validation-visibility="dirty"
                  />
                  <FormKit type="text" name="city" v-model="invoiceAddress.city" label="Obec" validation="required" />
                  <FormKit type="text" name="psc" v-model="invoiceAddress.psc" label="PSČ" validation="required" />
                  <FormKit type="text" name="street" v-model="invoiceAddress.street" label="Ulica" validation="required" />
                  <FormKit type="text" name="inv_street_number" v-model="invoiceAddress.street_number" label="Súpisne číslo"
                    validation="require_one:inv_street_number2"
                    help="Číslo pred lomítkom"
                  />
                  <FormKit type="text" name="inv_street_number2" v-model="invoiceAddress.street_number2" label="Orientačné číslo"
                    validation="require_one:inv_street_number"
                    help="Číslo za lomítkom"
                  />
                </div>  
                <div class="px-4">
                  <FormKit type="submit" label="Aktualizovať"/>
                </div>
              </FormKit>
            </div>
          </div>
      </Modal>
      <Modal
          name="addProfile"
          v-model:visible="isVisible"
          :type="'clean'"
          :closable="false"
          title="Pridanie nového fakturačného profilu"
        >
          <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
            <div class="flex justify-end px-4 pt-4">
              <button
                class="bg-red-500 hover:bg-red-700 h-8 px-6 rounded text-white"
                v-on:click="closeModal('addProfile')"
                type="button"
              >
                X
              </button>
            </div>
            <div role="status" class="flex py-10 h-full w-full justify-center text-white">
              <FormKit type="form"
                :actions="false"
                id="addInvoiceProfile"
                @submit-invalid="showErrors"  
                #default="{ value, state: { valid } }"
                @submit="addInvoiceProfile"
              >
                <div class="px-4">
                  <div class="flex flex-row gap-2">
                    <FormKit
                      type="text"
                      name="first_name"
                      v-model="currentInvoiceProfile.first_name"
                      label="Krstné meno"
                    />
                    <FormKit
                      type="text"
                      name="last_name"
                      v-model="currentInvoiceProfile.last_name"
                      label="Priezvisko"
                    />
                  </div>
                  <div class="flex flex-row gap-2">
                    <FormKit
                      type="text"
                      name="name"
                      v-model="currentInvoiceProfile.name"
                      label="Názov spoločnosti"
                    />
                    <FormKit
                      type="text"
                      name="ico"
                      v-model="currentInvoiceProfile.ico"
                      label="IČO"
                    />
                  </div>
                  <div class="flex flex-row gap-2">
                    <FormKit
                      type="text"
                      name="dic"
                      v-model="currentInvoiceProfile.dic"
                      label="DIČ"
                    />
                    <FormKit
                      type="text"
                      name="ic_dph"
                      v-model="currentInvoiceProfile.ic_dph"
                      label="IČ DPH"
                    />
                  </div>
                </div>
                <div class="mx-2 my-2 border-b border-gray-200"></div>
                <!-- ADDRESS -->
                <div class="grid grid-cols-3 gap-4 px-4">
                  <FormKit type="select" name="country" id="country" placeholder="Vybrať" label="Štát" v-model="invoiceAddress.country"
                    :options="['Slovensko', 'Česko']" validation="required" validation-visibility="dirty"
                  />
                  <FormKit type="text" name="city" v-model="invoiceAddress.city" label="Obec" validation="required" />
                  <FormKit type="text" name="psc" v-model="invoiceAddress.psc" label="PSČ" validation="required" />
                  <FormKit type="text" name="street" v-model="invoiceAddress.street" label="Ulica" validation="required" />
                  <FormKit type="text" name="inv_street_number" v-model="invoiceAddress.street_number" label="Súpisne číslo"
                    validation="require_one:inv_street_number2"
                    help="Číslo pred lomítkom"
                  />
                  <FormKit type="text" name="inv_street_number2" v-model="invoiceAddress.street_number2" label="Orientačné číslo"
                    validation="require_one:inv_street_number"
                    help="Číslo za lomítkom"
                  />
                </div>
                <div class="px-4">
                  <FormKit type="submit" label="Pridať"/>
                </div>
              </FormKit>
            </div>
          </div>
      </Modal>
</template>

<script setup lang="ts">
import store from '@/store';
import { onMounted, ref, reactive, computed, watch } from 'vue';
import { useModal, Modal } from "usemodal-vue3";
import { getValidationMessages } from '@formkit/validation'
import { PlusCircleIcon } from '@heroicons/vue/24/outline';
import type Address from '@/types/Address';
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const user = computed(() => store.state.user.userId);
let invoiceProfiles = ref([] as any);
const messages = ref([]);
let currentInvoiceProfile = ref({} as any)
const invoiceAddressId = ref();
const router = useRouter();

let invoiceAddress = ref({
  street: '',
  street_number: '',
  street_number2: '',
  city: '',
  psc: '',
  country: '',
} as Address)

watch(currentInvoiceProfile, async () => {
  if(currentInvoiceProfile.value.id) {
    const res = await store.dispatch("getFakturacneUdajeById", currentInvoiceProfile.value.id)
    if(res.data) {
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

const setModal = useModal({
  profileDetails: 1,
  addProfile: 2,
  loadingModal: 3
});

let isVisible = reactive({});

isVisible = setModal("profileDetails", false);
isVisible = setModal("addProfile", false);
isVisible = setModal("loadingModal", false);

function showModal(modalName: string) {
  isVisible = setModal(modalName, true);
}

function closeModal(modalName: string) {
  isVisible = setModal(modalName, false);
}

function invoiceProfileDetails(id: number) {
    currentInvoiceProfile.value = invoiceProfiles.value.filter((item) => { return (item.id == id); })[0];
    showModal("profileDetails");
}

function showAddProfile() {
    currentInvoiceProfile.value = {};
    showModal("addProfile");
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
          closeModal("addInvoiceProfile");
          await store.dispatch("getFakturacneUdajeByUserId", store.state.user.userId)
          .then((response) => {
              invoiceProfiles.value = response.data
              closeModal("addProfile");
          })
      });
    })
    .catch((err) => {
      toast.error('Error: ' + err);
    });
}

async function updateInvoiceProfile() {
    showModal("loadingModal");
    await store
    .dispatch("updateInvoiceProfile", currentInvoiceProfile.value)
    .then(async () => {
      await store.dispatch("updateAddress", invoiceAddress.value)
        .then(async () => {
            closeModal("loadingModal");
            await store.dispatch("getFakturacneUdajeByUserId", store.state.user.userId)
            .then((response) => {
                invoiceProfiles.value = response.data
                closeModal("profileDetails");
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