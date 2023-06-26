<template>
  <FormKit
    type="form"
    id="vhqExistingCompany"
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
        <div class="text-4xl font-bold">Identifikujte firmu</div>
        <div class="my-4">
          Vyberte si zo zoznamu Vašu firmu, pre ktorú chcete balík aktivovať:
          <div class="py-2">
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
                disabled
              />
              <FormKit
                type="text"
                name="name"
                validation="required"
                v-model="company.ico"
                label="IČO"
                disabled
              />
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormKit
                type="text"
                name="street"
                v-model="companyAddress.street"
                label="Ulica"
                validation="required"
                disabled
              />
              <FormKit
                type="text"
                name="street_number"
                v-model="companyAddress.street_number"
                label="Súpisne číslo"
                validation="required"
                disabled
              />
              <FormKit
                type="text"
                name="street_number2"
                v-model="companyAddress.street_number2"
                label="Orientačné číslo"
                validation="required"
                disabled
              />
              <FormKit
                type="text"
                name="city"
                v-model="companyAddress.city"
                label="Mesto"
                validation="required"
                disabled
              />
              <FormKit
                type="text"
                name="psc"
                v-model="companyAddress.psc"
                label="PSČ"
                validation="required"
                disabled
              />
              <FormKit
                type="text"
                name="country"
                v-model="companyAddress.country"
                label="Krajina"
                validation="required"
                disabled
              />
            </div>
          </FormKit>
        </div>
      </section>
      <!-- Fakturačné údaje -->
      <section v-show="activeStep === 'Fakturačné údaje'">
        <div class="text-4xl font-bold">Fakturácia a účet</div>
        <div class="my-2">
          Už máte u nás účet?
          <a class="text-teal-500" href="/login">Prihláste sa</a>
        </div>
        <div>
          <div class="text-2xl font-bold py-4">Účet</div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <FormKit
              type="text"
              name="first_name"
              v-model="user.first_name"
              id="first_name"
              label="Krstné meno"
              validation="required|length:2"
            />
            <FormKit
              type="text"
              name="last_name"
              v-model="user.last_name"
              label="Priezvisko"
              validation="required|length:2"
            />
            <FormKit
              type="text"
              name="name"
              v-model="company.name"
              label="Názov spoločnosti"
              disabled
            />
            <FormKit
              type="select"
              label="Pohlavie"
              v-model="user.gender"
              placeholder="Vyberte pohlavie"
              name="gender"
              id="gender"
              :options="['Muž', 'Žena']"
              validation="required"
              validation-visibility="dirty"
            />
          </div>
          <div class="flex flex-col md:flex-row md:space-x-4">
            <FormKit
              type="checkbox"
              :ignore="true"
              v-model="hasTitle"
              label="Máte titul pred alebo za menom?"
              id="hasTitle"
              name="hasTitle"
            />
            <div v-show="hasTitle" class="grid grid-cols-2 gap-4">
              <FormKit
                type="text"
                name="title_before"
                v-model="user.title_before"
                label="Titul pred menom"
              />
              <FormKit
                type="text"
                name="title_after"
                v-model="user.title_after"
                label="Titul za menom"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormKit
              type="text"
              name="phone"
              v-model="user.phone"
              autocomplete="phone"
              label="Telefonné číslo"
              validation="required|length:9"
            />
            <FormKit
              type="date"
              name="date_of_birth"
              v-model="user.date_of_birth"
              autocomplete="date_of_birth"
              label="Dátum narodenia"
              validation="required|length:10"
            />
            <FormKit
              type="text"
              name="rodne_cislo"
              v-model="user.rodne_cislo"
              label="Rodné číslo"
              validation="required|length:10"
            />
          </div>
          <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
            <FormKit
              type="text"
              name="city"
              v-model="userAddress.city"
              label="Mesto"
              validation="required"
            />
            <FormKit
              type="text"
              name="country"
              v-model="userAddress.country"
              label="Krajina"
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
          </div>
          <FormKit
            type="group"
            v-model="fakturacne_udaje"
            id="Fakturačné údaje"
            name="Fakturačné údaje"
          >
            <div class="text-2xl font-bold py-4">Fakturácia</div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
              <FormKit
                type="text"
                name="first_name"
                label="Meno"
                validation="required"
              />
              <FormKit
                type="text"
                name="last_name"
                label="Priezvisko"
                validation="required"
              />
              <FormKit
                type="checkbox"
                v-model="invoiceAddressIsSame"
                :ignore="true"
                label="Fakturačná adresa je rovnaká ako podnikateľská?"
                name="invoiceAddressIsSame"
              />
            </div>
            <div class="w-fit">
              <FormKit
                type="checkbox"
                v-model="orderingAsCompany"
                :ignore="true"
                label="Objednávate ako firma?"
                id="orderingAsCompany"
                name="orderingAsCompany"
              />
            </div>
            <div
              v-show="orderingAsCompany"
              class="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              <FormKit type="text" name="name" label="Názov firmy" />
              <FormKit type="text" name="ico" label="IČO" />
              <FormKit type="text" name="dic" label="DIČ" />
              <FormKit type="text" name="ic_dph" label="IČ DPH" />
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
            </div>

            <div class="w-full">
              <FormKit
                type="radio"
                v-model="paymentOptions"
                label="Spôsob platby?"
                name="payment_method"
                :options="[
                  {
                    value: 'iban',
                    label: 'Priamy vklad na účet',
                    help: 'Pošlite vašu platbu priamo na náš bankový účet, ktorý nájdete na ďakovnej stránke po dokončení objednávky.',
                  },
                  {
                    value: 'stripe',
                    label: 'Online kartou',
                    help: 'Platba prostredníctvom platobnej brány Stripe.',
                  },
                ]"
                validation="required"
              />
            </div>
          </FormKit>
        </div>
      </section>
    </div>

    <div class="flex my-2 justify-center space-x-4">
      <FormKit
        type="button"
        :disabled="activeStep == 'Podnikatelské údaje'"
        @click="setStep(-1)"
        v-text="'Previous step'"
      />
      <FormKit
        type="button"
        class="next"
        :disabled="activeStep == 'Fakturačné údaje'"
        @click="setStep(1)"
        v-text="'Next step'"
      />
    </div>

    <FormKit
      type="submit"
      label="Objednať s povinnosťou platby"
      :disabled="!valid"
    />
  </FormKit>
</template>

<script setup lang="ts">
import store from "@/store";
import { ref, onBeforeMount, computed } from "vue";
import useSteps from "@/components/forms/useStep";
import { createInput } from "@formkit/vue";
import formkitCustomMultiSelectVue from "@/components/forms/formkitCustomMultiSelect.vue";
import router from "@/router";
import type Address from "@/types/Address";
import type Company from "@/types/Company";
import type User from "@/types/User";
import CompanySelectorInHeader from "@/components/CompanySelectorInHeader.vue";
import moment from "moment";

const user = computed(() => store.state.user);
const company = computed(() => store.state.selectedCompany);
const companyAddress = computed(
  () => store.state.selectedCompanyAddress as Address
);
const userAddress = computed(() => store.state.user.address as Address);

const today = moment(new Date()).format("YYYY-MM-DD");
const firstTimePaymentDate = moment(today).add(90, "days").format("YYYY-MM-DD");

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

const fakturacne_udaje = ref({
  first_name: "",
  last_name: "",
  name: "",
  ico: "",
  dic: "",
  ic_dph: "",
  address_id: 1,
});

const order = ref({
  payment_date: "" as any,
  payment_method: "",
  description: "test doklady",
  amount: 12, // final cena s dph
  amount_vat: 2, // vat je čisto len dph
  is_paid: false,
  address_id: 0,
  user_id: 0,
  company_id: 0,
  is_tos_accepted: true,
  is_advocate_requested: true,
  items: [
    {
      description: "Zakúpenie dokladov pre firmu",
      price: 0, // finalna cena za polozku s dph
      price_vat: 0, // toto je len dph
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

async function addOrder(): Promise<Response> {
  order.value.payment_date = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  order.value.payment_method = paymentOptions.value;
  order.value.company_id = company.value.id;
  order.value.user_id = user.value.userId;

  order.value.amount = 0;
  order.value.amount_vat = 0 * 0.2;
  order.value.items[0].price = 0;
  order.value.items[0].price_vat = 0 * 0.2;

  order.value.fakturacne_udaje[0].first_name =
    fakturacne_udaje.value.first_name;
  order.value.fakturacne_udaje[0].last_name = fakturacne_udaje.value.last_name;
  order.value.fakturacne_udaje[0].dic = fakturacne_udaje.value.dic;
  order.value.fakturacne_udaje[0].ic_dph = fakturacne_udaje.value.ic_dph;
  order.value.fakturacne_udaje[0].ico = fakturacne_udaje.value.ico;
  order.value.fakturacne_udaje[0].address_id = user.value.addressId;

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
  try {
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
      });
      
    });
    node.clearErrors();
  } catch (err: any) {
    console.log(err)
    node.setErrors(err.formErrors, err.fieldErrors);
  }
};
</script>
