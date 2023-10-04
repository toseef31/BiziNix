<template>
  <!--FORM -->
  <div>
        <FormKit type="form"
          :actions="false"
          id="vhqOrder"
          @submit-invalid="showErrors"  
          #default="{ value, state: { valid } }"
          @submit="submitApp"
        >
        <div>
          <ul class="validation-errors" v-if="messages.length">
            <li v-for="message in messages">{{ message }}</li>
          </ul>
        </div>
          <FormKit type="multi-step" name="vhqOrderMultiStepPlugin" tab-style="tab">
            <FormKit type="step" name="sidloUdaje" label="Výber sídla" next-label="Pokračovať" previous-label="Naspäť">
              <SidloVhqFormStepVue ref="hqDataRef" />
            </FormKit>

            <FormKit type="step" name="podnikatelskeUdaje" label="Podnikateľské údaje" next-label="Pokračovať" previous-label="Naspäť">
              <PodnikatelskeUdajeVhqFormStep ref="companyDataRef" />
            </FormKit>

            <FormKit type="step" name="ucet" label="Účet" previous-label="Naspäť">
            <UcetVhqFormStep ref="accountDataRef" />
            </FormKit>

            <FormKit type="step" name="fakturacneUdaje" label="Fakturačné údaje" previous-label="Naspäť">
            <FakturacneUdajeVhqFormStep ref="invoiceDataRef" />
            </FormKit>
          </FormKit>
          <div class="p-4 mb-4 text-white border rounded-md border-bizinix-border border-solid">
              Celkom k platbe <b>{{ totalForPay * 12 }} € / rok</b>.
          </div>
          <FormKit
            type="checkbox"
            label="Všeobecné obchodné podmienky"
            validation="accepted"
            validation-visibility="dirty"
          >
            <template #label="context">
              <span :class="context.classes.label">Súhlasím so <a href="/obchodne-podmienky" target="_blank">všeobecnými podmienkami poskytovania služby</a>.</span>
            </template>
          </FormKit>
          <FormKit type="submit" label="Objednať" />
        </FormKit>
        <Modal
          name="loadingModal"
          v-model:visible="isVisible"
          :type="'clean'"
          :closable="false"
          title="Loading..."
        >
          <div class="bg-gray-800 rounded-lg border-teal-600 border-2">
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
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { ref, computed, reactive } from "vue";
import router from "@/router";
import { getValidationMessages } from '@formkit/validation'
import FakturacneUdajeVhqFormStep from "./fakturacneUdajeVhqFormStep.vue";
import UcetVhqFormStep from "./ucetVhqFormStep.vue";
import PodnikatelskeUdajeVhqFormStep from "./podnikatelskeUdajeVhqFormStep.vue"
import { useModal, Modal } from "usemodal-vue3";
import SidloVhqFormStepVue from "./sidloVhqFormStep.vue";

let hqDataRef = ref<InstanceType<typeof SidloVhqFormStepVue>>(null as any);
let companyDataRef = ref<InstanceType<typeof PodnikatelskeUdajeVhqFormStep>>(null as any);
let accountDataRef = ref<InstanceType<typeof UcetVhqFormStep>>(null as any);
let invoiceDataRef = ref<InstanceType<typeof FakturacneUdajeVhqFormStep>>(null as any);
const messages = ref([]);
const totalForPay = computed(() => hqDataRef.value?.vhq_package.price)

let addressFromResponse: any,
  userFromResponse: any,
  hqFromResponse: any,
  companyFromResponse: any,
  orderFromRes: any;

const headquarter = ref({
  name: "",
  description: "test",
  headquarters_type: 1,
  owner_name: "",
  price: 0,
  registry: false,
  forwarding: false,
  scanning: false,
  shredding: false,
  is_virtual: false,
  img: "test",
  address_id: 0,
});
const order = ref({
  payment_date: "" as any,
  payment_method: "",
  order_type: 'vhq',
  description: "Objednávka virtuálneho sídla",
  amount: 0,
  amount_vat: 0,
  is_paid: false,
  user_id: 0,
  company_id: 0,
  is_tos_accepted: true,
  is_advocate_requested: true,
  items: [
    {
      description: "Zakúpenie virtuálneho sídla",
      price: 0,
      price_vat: 0,
    },
  ],
  fakturacne_udaje: [
    {
      first_name: "",
      last_name: "",
      name: "",
      ico: "",
      dic: "",
      ic_dph: "",
      address_id: "",
    },
  ],
});

function showErrors(node: any) {
  messages.value = []
  const validations = getValidationMessages(node)
  validations.forEach((inputMessages: any) => {
    messages.value = messages.value.concat(
      inputMessages.map((message: any) => message.value)
    )
  })
}

const setModal = useModal({
  loadingModal: 1,
});

let isVisible = reactive({});

isVisible = setModal("loadingModal", false);

function showModal() {
  isVisible = setModal("loadingModal", true);
}

function closeModal() {
  isVisible = setModal("loadingModal", false);
}

/* Submiting form and Api calls */

function registerAddress(): Promise<Response> {
  return store
    .dispatch("registerAddress", invoiceDataRef.value.invoiceAddress)
    .then((res) => {
      addressFromResponse = res;
      return addressFromResponse;
    })
    .catch((err) => {
      console.log(err);
    });
}

function registerUser(): Promise<Response> {
  accountDataRef.value.userData.address_id = addressFromResponse.address_id;

  return store
    .dispatch("registerUser", accountDataRef.value.userData)
    .then((res) => {
      userFromResponse = res;
      return userFromResponse;
    })
    .catch((err) => {
      console.log(err);
    });
}

function addHeadquarter(): Promise<Response> {
  headquarter.value.owner_name = "Bizinix";
  headquarter.value.description = "Virtualne sidlo pre spolocnost: " + companyDataRef.value.company.name;
  headquarter.value.name = "VS-" + companyDataRef.value.company.name;
  
  //treba podla balika updatnut
  headquarter.value.price = hqDataRef.value.vhq_package.price;
  headquarter.value.is_virtual = true;
  headquarter.value.img = store.state.selectedVhq.img;
  headquarter.value.address_id = store.state.selectedVhq.address_id;
  headquarter.value.registry = false;
  headquarter.value.forwarding = false;
  headquarter.value.scanning = false;
  headquarter.value.shredding = false;

  return store
    .dispatch("addHeadquarter", headquarter.value)
    .then((res) => {
      hqFromResponse = res.headquarters;
      return hqFromResponse;
    })
    .catch((err) => {
      console.log(err.response.data.value.errors);
    });
}

function addCompany(): Promise<Response> {
  companyDataRef.value.company.owner = userFromResponse.user_id;
  companyDataRef.value.company.headquarters_id = hqFromResponse.id;
  companyDataRef.value.company.sidlo_typ_balika = hqDataRef.value.vhq_package.name;

  return store
    .dispatch("addCompany", companyDataRef.value.company)
    .then((res) => {
      companyFromResponse = res;
      return companyFromResponse;
    })
    .catch((err) => {
      console.log(err);
    });
}

function addOrder(): Promise<Response> {
  order.value.payment_date = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  order.value.company_id = companyFromResponse.company.id;
  order.value.user_id = userFromResponse.user_id;

  order.value.amount = hqDataRef.value.vhq_package.price * 12;
  order.value.amount_vat = (hqDataRef.value.vhq_package.price * 12) * 0.2;
  order.value.items[0].price = hqDataRef.value.vhq_package.price * 12;
  order.value.items[0].price_vat = (hqDataRef.value.vhq_package.price * 12) * 0.2;

  order.value.fakturacne_udaje[0].first_name = invoiceDataRef.value.fakturacne_udaje.first_name;
  order.value.fakturacne_udaje[0].last_name = invoiceDataRef.value.fakturacne_udaje.last_name;
  order.value.fakturacne_udaje[0].dic = invoiceDataRef.value.fakturacne_udaje.dic;
  order.value.fakturacne_udaje[0].ic_dph = invoiceDataRef.value.fakturacne_udaje.ic_dph;
  order.value.fakturacne_udaje[0].ico = invoiceDataRef.value.fakturacne_udaje.ico;
  order.value.fakturacne_udaje[0].address_id = addressFromResponse.address_id
  
  return store
    .dispatch("addOrder", order.value)
    .then((res) => {
      orderFromRes = res.order;
      return orderFromRes;
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}

const submitApp = async (formData: any, node: any) => {
  showModal();
  try {
    registerAddress().then(() => {
      registerUser().then(() => {
        if (userFromResponse) {
          addHeadquarter().then(() => {
            addCompany().then(() => {
              addOrder().then(() => {
                userFromResponse = null;
                hqFromResponse = null;
                companyDataRef.value.company.owner = 0;
                companyDataRef.value.company.headquarters_id = 0;
                closeModal();
                router.push({
                  name: "Thanks You New Order",
                  params: {
                    orderId: orderFromRes.id,
                  },
                });
              });
            });
          });
        }
      });
    });
    node.clearErrors();
  } catch (err: any) {
    node.setErrors(err.formErrors, err.fieldErrors);
    closeModal();
  }
};

</script>
