<template>
  <FormKit
    type="form"
    #default="{ value, state: { valid } }"
    :plugins="[stepPlugin]"
    @submit="submitApp"
    :actions="false"
  >
    <!-- Zoznam krokov list steps -->
    <div class="flex items-center justify-center">
      <ul
        class="steps m-8 list-none flex flex-col md:flex-row space-x-8 cursor-pointer"
      >
        <li
          v-for="(step, stepName) in steps"
          :class="[
            'step px-4 py-5 my-1',
            { 'has-errors': checkStepValidity(stepName) },
          ]"
          :key="step"
          @click="activeStep = stepName.toString()"
          :data-step-valid="step.valid && step.errorCount === 0"
          :data-step-active="activeStep === stepName.toString()"
        >
          <span
            v-if="checkStepValidity(stepName)"
            class="step--errors"
            v-text="step.errorCount + step.blockingCount"
          />
          {{ camel2title(stepName.toString()) }}
        </li>
      </ul>
    </div>
    <div class="form-body my-6">
      <!-- Podnikatelské údaje -->
      <section v-show="activeStep === 'Podnikatelské údaje'">
        <div class="pb-8" v-if="!user.userId">
          <div class="flex flex-row">
            <div>
              Máte už u nás založenú (a pridanú) firmu a chcete k nej dokúpiť
              službu Bizinix Doklady? <br />
              Prihláste sa a predíďte tak "nudnému" vyplňovaniu podnikateľských
              údajov. ✌️
            </div>
            <div>
              <router-link
                to="/login"
                class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700"
                >Prihlásiť sa</router-link
              >
            </div>
          </div>
        </div>
        <div class="text-4xl font-bold">Identifikujte firmu</div>
        <div class="my-4">
          Vypíšte údaje firmy, z ktorej chcete vystavovať doklady.
          <div class="pb-2 pt-8">
            <div class="py-2">
              Vyberte si zo zoznamu Vašu spoločnosť, pre ktorú chcete balík
              aktivovať:
            </div>
            <CompanySelectorInHeader
              v-if="user.userId"
            ></CompanySelectorInHeader>
          </div>
        </div>
        <div>
          <FormKit
            type="group"
            id="Podnikatelské údaje"
            name="Podnikatelské údaje"
          >
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
              <FormKit
                type="text"
                name="name"
                validation="required"
                v-model="company.name"
                label="Názov spoločnosti"
              />
              <FormKit
                type="text"
                name="name"
                validation="required"
                v-model="company.ico"
                label="IČO"
              />
              <FormKit
                type="text"
                name="dic"
                label="DIČ"
                v-model="company.dic"
              />
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormKit
                type="text"
                name="street"
                v-model="companyAddress.street"
                label="Ulica"
                validation="required"
              />
              <FormKit
                type="text"
                name="street_number"
                v-model="companyAddress.street_number"
                label="Súpisne číslo"
                validation="required"
              />
              <FormKit
                type="text"
                name="street_number2"
                v-model="companyAddress.street_number2"
                label="Orientačné číslo"
                validation="required"
              />
              <FormKit
                type="text"
                name="city"
                v-model="companyAddress.city"
                label="Mesto"
                validation="required"
              />
              <FormKit
                type="text"
                name="psc"
                v-model="companyAddress.psc"
                label="PSČ"
                validation="required"
              />
              <FormKit
                type="text"
                name="country"
                v-model="companyAddress.country"
                label="Krajina"
                validation="required"
              />
              <FormKit
                type="text"
                name="ic_dph"
                label="IČ DPH (nepovinné)"
                v-model="company.icdph"
              />
            </div>
            <div v-if="!firstTimeActivation">
              <div class="text-teal-500 font-bold">POZNÁMKA:</div>
              <div>
                Zvolená firma už minula svoje 3 mesiace využívania služby
                zdarma.
              </div>
            </div>
          </FormKit>
        </div>
      </section>
      <!-- Fakturačné údaje -->
      <section v-show="activeStep === 'Fakturačné údaje'">
        <div class="text-4xl font-bold">Fakturácia a účet</div>
        <div class="my-2" v-if="!user.userId">
          Už máte u nás účet?
          <a class="text-teal-500 hover:underline" href="/login"
            >Prihláste sa</a
          >
        </div>
        <div class="my-2" v-if="user.userId">
          <a class="text-teal-500 hover:underline" href="/dashboard"
            >Prihlásený ako {{ userData.first_name }}
            {{ userData.last_name }}</a
          >
        </div>
        <div>
          <div class="text-2xl font-bold py-4">Účet</div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
            <FormKit
              type="text"
              name="first_name"
              v-model="userData.first_name"
              id="first_name"
              label="Krstné meno"
              validation="required|length:2"
            />
            <FormKit
              type="text"
              name="last_name"
              v-model="userData.last_name"
              label="Priezvisko"
              validation="required|length:2"
            />
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormKit
              type="email"
              name="email"
              v-model="userData.email"
              label="Emailová adresa"
              :validation-rules="{ emailIsUnique }"
              validation="required|email|emailIsUnique"
              :validation-messages="{ emailIsUnique: 'E-mail sa už používa!' }"
              validation-visibility="live"
            />
            <FormKit
              type="password"
              autocomplete="new-password"
              v-model="userData.password"
              name="password"
              label="Heslo"
              validation="required|length:8"
            />
            <FormKit
              type="password"
              autocomplete="new-password"
              v-model="userData.password_confirmation"
              name="password_confirmation"
              label="Zopakujte heslo"
              validation="required|confirm:password"
            />
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormKit
              type="text"
              name="phone"
              v-model="userData.phone"
              autocomplete="phone"
              label="Telefonné číslo (nepovinné)"
              validation="length:9"
            />
          </div>
          <FormKit
            type="group"
            v-model="fakturacne_udaje"
            id="Fakturačné údaje"
            name="Fakturačné údaje"
          >
            <div class="text-2xl font-bold pt-4 pb-2">Fakturácia</div>
            <div class="pb-4" v-if="user.userId">
              Vypíšte údaje firmy, ktorou chcete zaplatiť službu Bizinix
              Doklady, Alebo zvoľte jeden z Fakturačných profilov.
            </div>
            <div class="pb-4" v-if="!user.userId">
              Vypíšte údaje firmy, ktorou chcete zaplatiť službu Bizinix Doklady
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
              <FormKit
                type="checkbox"
                v-model="invoiceAddressIsSame"
                :ignore="true"
                label="Fakturačné údaje sú rovnaké ako podnikateľské?"
                name="invoiceAddressIsSame"
              />
            </div>
            <div
              v-show="!invoiceAddressIsSame"
              class="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              <FormKit type="text" name="name" label="Názov spoločnosti" />
              <FormKit type="text" name="ico" label="IČO" />
              <FormKit type="text" name="dic" label="DIČ" />
            </div>
            <div
              v-show="!invoiceAddressIsSame"
              class="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              <FormKit
                type="text"
                name="street"
                v-model="userAddress.street"
                label="Ulica"
                validation="required"
              />
              <FormKit
                type="text"
                name="street_number"
                v-model="userAddress.street_number"
                label="Súpisne číslo"
                validation="required"
              />
              <FormKit
                type="text"
                name="street_number2"
                v-model="userAddress.street_number2"
                label="Orientačné číslo"
                validation="required"
              />
              <FormKit
                type="text"
                name="city"
                v-model="userAddress.city"
                label="Mesto"
                validation="required"
              />
              <FormKit
                type="text"
                name="psc"
                v-model="userAddress.psc"
                label="PSČ"
                validation="required"
              />
              <FormKit
                type="text"
                name="country"
                v-model="userAddress.country"
                label="Krajina"
                validation="required"
              />
              <FormKit type="text" name="ic_dph" label="IČ DPH (nepovinné)" />
            </div>
          </FormKit>
          <div class="w-full" v-show="!firstTimeActivation">
            <div class="flex flex-row gap-11">
              <FormKit
                type="radio"
                v-model="paymentOptions"
                label="Spôsob platby?"
                name="payment_method"
                :options="[
                  {
                    value: 'iban',
                    label: 'Priamy vklad na účet',
                  },
                  {
                    value: 'stripe',
                    label: 'Online kartou',
                  },
                ]"
              />
              <FormKit
                type="checkbox"
                v-model="paymentOptionsLength"
                label="Na ako dlho chcete zaplatiť?"
                name="payment_method_length"
                v-show="paymentOptions == 'iban'"
                validation="max:1"
                :options="[
                  {
                    value: 'mesiac',
                    label: 'Platba na 1 mesiac',
                  },
                  {
                    value: 'polrok',
                    label: 'Platba na 6 mesiacov',
                  },
                  {
                    value: 'rok',
                    label: 'Platba na rok',
                  },
                ]"
              />
            </div>

            <div v-show="paymentOptions == 'stripe'">
              <div class="flex flex-row gap-12">
                <div>
                  <stripe-checkout
                    ref="checkoutMonthlyRef"
                    mode="subscription"
                    :pk="publishableKey"
                    :line-items="stripeButtonDataMonthly.lineItems"
                    :success-url="successURL"
                    :cancel-url="cancelURL"
                  />
                  <button
                    @click="continueToPayment(checkoutMonthlyRef)"
                    class="shadow flex font-bold justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
                  >
                    {{ stripeButtonDataMonthly.text }}
                  </button>
                </div>
                <div>
                  <stripe-checkout
                    ref="checkoutYearlyRef"
                    mode="subscription"
                    :pk="publishableKey"
                    :line-items="stripeButtonDataYearly.lineItems"
                    :success-url="successURL"
                    :cancel-url="cancelURL"
                  />
                  <button
                    @click="continueToPayment(checkoutYearlyRef)"
                    class="shadow flex font-bold justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
                  >
                    {{ stripeButtonDataYearly.text }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="flex my-2 justify-center space-x-4">
      <FormKit
        type="button"
        :disabled="activeStep == 'Podnikatelské údaje'"
        @click="setStep(-1)"
        v-text="'Predchadzajúci krok'"
      />
      <FormKit
        type="button"
        class="next"
        :disabled="activeStep == 'Fakturačné údaje'"
        @click="setStep(1)"
        v-text="'Ďalší krok'"
      />
    </div>

    <div class="w-full" v-show="firstTimeActivation">
      <FormKit
        type="submit"
        label="Objednať na 3 mesiace zdarma"
        :disabled="!valid"
      />
      <div class="pb-4 text-xs italic">
        Prvú faktúru obdržíte o 3 mesiace. <br />
        Dovtedy Vám nebudeme nič účtovať.
      </div>
    </div>

    <div class="w-full" v-show="paymentOptions == 'iban'">
      <FormKit
        type="submit"
        label="Objednať s povinnosťou platby"
        :disabled="!valid"
      />
    </div>

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
  </FormKit>
</template>

<script setup lang="ts">
import store from "@/store";
import { ref, computed, onBeforeMount, reactive } from "vue";
import useSteps from "@/components/forms/useStep";
import { createInput } from "@formkit/vue";
import formkitCustomMultiSelectVue from "@/components/forms/formkitCustomMultiSelect.vue";
import router from "@/router";
import type Address from "@/types/Address";
import type Company from "@/types/Company";
import type User from "@/types/User";
import type Order from "@/types/Order";
import CompanySelectorInHeader from "@/components/CompanySelectorInHeader.vue";
import moment from "moment";
import { useModal, Modal } from "usemodal-vue3";
import { StripeCheckout } from "@vue-stripe/vue-stripe";

const user = computed(() => store.state.user);
const company = computed(() => store.state.selectedCompany as Company);
const companyAddress = computed(
  () => store.state.selectedCompanyAddress as Address
);
const userAddressId = computed(() => store.state.user.addressId);
const userData = computed(() => store.state.user.data as User);
const userAddress = ref({} as Address);

const today = moment(new Date()).format("YYYY-MM-DD");
const firstTimePaymentDate = moment(today).add(90, "days").format("YYYY-MM-DD");
const halfYearPaymentDate = moment(today).add(180, "days").format("YYYY-MM-DD");
const monthlyPaymentDate = moment(today).add(30, "days").format("YYYY-MM-DD");
const yearlyPaymentDate = moment(today).add(365, "days").format("YYYY-MM-DD");

const firstTimeActivation = computed(() => {
  return company.value.fakturacia_zaplatene_do ? false : true;
});

const camel2title = (str: string) =>
  str
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();

const hasTitle = ref(false);
const invoiceAddressIsSame = ref(true);
const orderingAsCompany = ref(false);
let orderFromRes: any;

const { steps, visitedSteps, activeStep, setStep, stepPlugin } = useSteps();
const multiSelVueForm = createInput(formkitCustomMultiSelectVue, {
  props: ["items"],
});

const checkStepValidity = (stepName: any) => {
  return (
    (steps[stepName].errorCount > 0 || steps[stepName].blockingCount > 0) &&
    visitedSteps.value.includes(stepName)
  );
};

const paymentOptions = ref("");
const paymentOptionsLength = ref("");

const fakturacne_udaje = ref({
  first_name: "",
  last_name: "",
  name: "",
  ico: "",
  dic: "",
  ic_dph: "",
  address_id: Number(userAddressId.value),
});

const order = ref({} as Order);

const stripeButtonDataMonthly = {
  text: "Mesačne - 5€",
  lineItems: [
    {
      price: "price_1NQ4aKGgtUfdovJEygXKtqGe",
      quantity: 1,
    },
  ],
};

const stripeButtonDataYearly = {
  text: "Ročne - 50€",
  lineItems: [
    {
      price: "price_1NQ4aKGgtUfdovJEA9xf8Zev",
      quantity: 1,
    },
  ],
};

const publishableKey =
  "pk_test_51MITbvGgtUfdovJEpJnABGplaqRoPVkj91G43vWG9d9wCD3KIWdQCU7SgQ6Ux35xG1QCt4Y0C18M8nagqfyRPmIB00tNZZq9Hi";
const checkoutMonthlyRef = ref(null);
const checkoutYearlyRef = ref(null);
const cancelURL = "http://localhost:8080/documents/order";
const baseSuccessURL = "http://localhost:8080/dakujeme-nova-objednavka/";
let successURL = baseSuccessURL;

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

async function addOrder(): Promise<Response> {
  showModal();
  order.value.payment_date = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  order.value.payment_method = paymentOptions.value;
  order.value.company_id = company.value.id;
  order.value.user_id = Number(user.value.userId);

  order.value.amount = 0;
  order.value.amount_vat = 0 * 0.2;

  let items = [
    {
      price: 0,
      price_vat: 0,
      description: "Objednávka balíčku dokladov",
    },
  ];

  if (paymentOptions.value == "iban") {
    switch (paymentOptionsLength.value) {
      case "mesiac":
        company.value.fakturacia_zaplatene_do = monthlyPaymentDate;
        order.value.amount = 5;
        order.value.amount_vat = 5 * 0.2;
        items = [
          {
            price: 5,
            price_vat: 5 * 0.2,
            description: "Objednávka balíčku dokladov na 1 mesiac",
          },
        ];
        break;
      case "polrok":
        company.value.fakturacia_zaplatene_do = halfYearPaymentDate;
        order.value.amount = 25;
        order.value.amount_vat = 25 * 0.2;
        items = [
          {
            price: 25,
            price_vat: 25 * 0.2,
            description: "Objednávka balíčku dokladov na 6 mesiacov",
          },
        ];
        break;
      case "rok":
        company.value.fakturacia_zaplatene_do = yearlyPaymentDate;
        order.value.amount = 50;
        order.value.amount_vat = 50 * 0.2;
        items = [
          {
            price: 50,
            price_vat: 50 * 0.2,
            description: "Objednávka balíčku dokladov na rok",
          },
        ];
        break;
    }
  } else if (paymentOptions.value == "stripe") {
    order.value.amount = 0;
    order.value.amount_vat = 0 * 0.2;

    items = [
      {
        price: 0,
        price_vat: 0,
        description: "Objednávka balíčku dokladov",
      },
    ];
  }

  if (fakturacne_udaje.value.first_name) {
    order.value.items = items;
    order.value.fakturacne_udaje.push(fakturacne_udaje.value);

    order.value.is_tos_accepted = true;
    order.value.is_advocate_requested = false;
    order.value.description = "Objednávka balíčku dokladov";
    order.value.is_paid = false;

    return store
      .dispatch("addOrder", order.value)
      .then((res) => {
        orderFromRes = res.order;
        return orderFromRes;
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  } else {
    return orderFromRes;
  }
}

const submitApp = async (formData: any, node: any) => {
  try {
    if (paymentOptions.value == "iban") {
      await continueWithoutPayment();
    } else if (firstTimeActivation.value) {
      await continueFirstTimeActivation();
    }
    node.clearErrors();
  } catch (err: any) {
    console.log(err);
    node.setErrors(err.formErrors, err.fieldErrors);
    closeModal();
  }
};

async function isEmailAlreadyRegistered(node: any) {
  try {
    const res = await store.dispatch("isEmailAlreadyRegistered", node);
    console.log(res);
    return true;
  }
  catch (error) {
    return false;
  }
}

async function emailIsUnique(node: any){
  const result = await isEmailAlreadyRegistered(node.value)
  return result
}

async function continueFirstTimeActivation() {
  try {
    paymentOptions.value = "iban";
    await addOrder().then(() => {
      company.value.fakturacia_zaplatene_do = firstTimePaymentDate;
      store
        .dispatch("updateCompany", company.value)
        .then((res) => {
          router.push({
            name: "Thanks You New Order",
            params: {
              orderId: orderFromRes.id,
            },
          });
        })
        .catch((err) => {
          console.log(err);
          closeModal();
        });
    });
  } catch (err: any) {
    console.log(err);
    closeModal();
  }
}

async function continueWithoutPayment() {
  try {
    await addOrder().then(() => {
      store
        .dispatch("updateCompany", company.value)
        .then((res) => {
          router.push({
            name: "Thanks You New Order",
            params: {
              orderId: orderFromRes.id,
            },
          });
        })
        .catch((err) => {
          console.log(err);
          closeModal();
        });
    });
  } catch (err: any) {
    console.log(err);
    closeModal();
  }
}

async function continueToPayment(ref: any) {
  try {
    await addOrder().then(() => {
      if (ref == checkoutMonthlyRef.value) {
        company.value.fakturacia_zaplatene_do = monthlyPaymentDate;
      } else {
        company.value.fakturacia_zaplatene_do = yearlyPaymentDate;
      }
      store
        .dispatch("updateCompany", company.value)
        .then((res) => {
          successURL = baseSuccessURL.concat(orderFromRes.id);
          ref.redirectToCheckout();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (err: any) {
    console.log(err);
    closeModal();
  }
}

onBeforeMount(async () => {
  await store
    .dispatch("getAddressById", userAddressId.value)
    .then((response) => {
      userAddress.value = response.data;
    });
});
</script>
