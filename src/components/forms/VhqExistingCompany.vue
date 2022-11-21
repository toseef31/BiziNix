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
        <div class="my-2">
          Po zaplatení služby dostanete dokument, pomocou ktorého môžete
          prepísať sídlo Vašej firmy na to naše (virtuálne).
        </div>
        <div class="my-5">
          Chcete, aby sme prepis sídla zabezpečili tiež my?
          <a class="text-teal-500" href="#">Kliknite sem</a>
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
                v-model="companyOrZivnostModel.name"
                label="Názov spoločnosti"
              />
              <FormKit
                type="text"
                name="name"
                validation="required"
                v-model="companyOrZivnostModel.ico"
                label="IČO"
              />
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
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
              v-model="companyOrZivnostModel.name"
              label="Názov spoločnosti"
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
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormKit
              type="email"
              name="email"
              v-model="user.email"
              label="Email"
              :validation-rules="{ emailIsUnique }"
              validation="required|email|emailIsUnique"
              :validation-messages="{ emailIsUnique: 'E-mail sa už používa!' }"
              validation-visibility="live"
              help="Email ktorý budete používať aj na prihlasenie do účtu."
            />
            <FormKit
              type="password"
              autocomplete="new-password"
              v-model="user.password"
              name="password"
              label="Heslo"
              validation="required|length:8"
            />
            <FormKit
              type="password"
              autocomplete="new-password"
              v-model="user.password_confirmation"
              name="password_confirmation"
              label="Zopakujte heslo"
              validation="required|confirm:password"
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
import { ref, onBeforeMount, onMounted } from "vue";
import useSteps from "@/components/forms/useStep";
import { createInput } from "@formkit/vue";
import formkitCustomMultiSelectVue from "@/components/forms/formkitCustomMultiSelect.vue";
import router from "@/router";

const camel2title = (str: string) => str
  .replace(/([A-Z])/g, (match) => ` ${match}`)
  .replace(/^./, (match) => match.toUpperCase())
  .trim()

const props = defineProps({
  data: {
    type: String,
    default: "No data specified"
  }
});

const data = JSON.parse(props.data);

const hasTitle = ref(false);
const invoiceAddressIsSame = ref(true);
const orderingAsCompany = ref(false);
const errorMsg = ref("");
const errorMsgHq = ref("");
const errorMsgCompany = ref("");
const sucessMsg = ref("");
let addressFromResponse: any,
  userFromResponse: any,
  hqFromResponse: any,
  companyFromResponse: any,
  orderFromRes: any;

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

const user = ref({
  address_id: 0, // address should be created first and save to store
  first_name: "",
  last_name: "",
  title_before: "",
  title_after: "",
  gender: "",
  phone: "",
  date_of_birth: "",
  rodne_cislo: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const fakturacne_udaje = ref({
  first_name: "",
  last_name: "",
  name: "",
  ico: "",
  dic: "",
  ic_dph: "",
  address_id: 12,
  // to do address id
});
const userAddress = ref({
  street: "",
  street_number: "",
  street_number2: "",
  city: "",
  psc: "",
  country: "",
});
const companyOrZivnostModel = ref({
  name: '',
  headquarters_id: 0,
  type: 2, // type 1 sro, type 2 živnosť
  status: 2, // Zakladanie spoločnosti je v priebehu
  ico: '',
  dic: '',
  icdph: '',
  is_dph: false,
  registration_date: '',
  owner: 0,
  subjects_of_business: [],
});
const headquarter = ref({
  name: "",
  description: "test",
  headquarters_type: 1, // 1 Nebytový priestor, 2 Byt, 3 iná budova, 4 rod dom, 5 Samost stoj garaž
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
  description: "test",
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
      description: "Zakúpenie virtuálneho sídla",
      price: 12, // finalna cena za polozku s dph
      price_vat: 2, // toto je len dph
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

/* Submiting form and Api calls */

function registerAddress(): Promise<Response> {
  return store
    .dispatch("registerAddress", userAddress.value)
    .then((res) => {
      console.log("Registering address: " + JSON.stringify(res));
      addressFromResponse = res;
      return addressFromResponse;
    })
    .catch((err) => {
      errorMsg.value = JSON.stringify(err.response.data.errors); // response data is from store actions
    });
}

function registerUser(): Promise<Response> {
  user.value.address_id = addressFromResponse.address_id;

  return store
    .dispatch("registerUser", user.value) // dispatch -> register action in store
    .then((res) => {
      sucessMsg.value =
        "E-mail na aktiváciu účtu bol odoslaný. Prosím skontrolujte si svoju schránkú, alebo priečinok nevyžiadanej pošty.";
      userFromResponse = res;
      console.log("Registering user: " + JSON.stringify(res));
      return userFromResponse;
    })
    .catch((err) => {
      errorMsg.value = JSON.stringify(err.response.data.errors); // response data is from store actions
    });
}

function addHeadquarter(): Promise<Response> {
  headquarter.value.owner_name = "Bizinix";
  headquarter.value.name = "VS-" + companyOrZivnostModel.value.name;
  headquarter.value.description = "Virtualne sidlo pre spolocnost: " + companyOrZivnostModel.value.name;
  headquarter.value.price = data.price;

  headquarter.value.registry = data.preberanie;
  headquarter.value.forwarding = data.preposlanie;
  headquarter.value.scanning = data.scanovanie;
  headquarter.value.shredding = data.skartovanie;
  headquarter.value.is_virtual = true;

  headquarter.value.img = data.vhq.img;

  headquarter.value.address_id = data.vhq.address.id;

  return store
    .dispatch("addHeadquarter", headquarter.value)
    .then((res) => {
      console.log("Adding hq: " + JSON.stringify(res));
      hqFromResponse = res.headquarters;
      return hqFromResponse;
    })
    .catch((err) => {
      console.log(err.response.data.errors);
      errorMsg.value = JSON.stringify(err.response.data.errors);
    });
}

function addCompany(): Promise<Response> {
  companyOrZivnostModel.value.owner = userFromResponse.user_id;
  companyOrZivnostModel.value.headquarters_id = hqFromResponse.id;

  return store
    .dispatch("addCompany", companyOrZivnostModel.value)
    .then((res) => {
      console.log("Adding company: " + JSON.stringify(res));
      companyFromResponse = res;
      console.log("Company from Res " + JSON.stringify(companyFromResponse));
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
  order.value.payment_method = paymentOptions.value;
  order.value.company_id = companyFromResponse.company.id;
  order.value.user_id = userFromResponse.user_id;

  order.value.amount = data.price;
  order.value.amount_vat = data.price*0.2;
  order.value.items[0].price = data.price;
  order.value.items[0].price_vat = data.price*0.2;

  order.value.fakturacne_udaje[0].first_name =
    fakturacne_udaje.value.first_name;
  order.value.fakturacne_udaje[0].last_name = fakturacne_udaje.value.last_name;
  order.value.fakturacne_udaje[0].dic = fakturacne_udaje.value.dic;
  order.value.fakturacne_udaje[0].ic_dph = fakturacne_udaje.value.ic_dph;
  order.value.fakturacne_udaje[0].ico = fakturacne_udaje.value.ico;
  if(invoiceAddressIsSame.value){
    order.value.fakturacne_udaje[0].address_id = data.vhq.address.id;
  } else {
    order.value.fakturacne_udaje[0].address_id = addressFromResponse.address_id
  }

  return store
    .dispatch("addOrder", order.value)
    .then((res) => {
      console.log("Adding order: " + JSON.stringify(res));
      orderFromRes = res.order;
      return orderFromRes;
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}

async function isEmailAlreadyRegistered(node: any) {
  try {
    const res = await store.dispatch("isEmailAlreadyRegistered", node);
    console.log(res);
    return true;
  } catch (error) {
    return false;
  }
}

async function emailIsUnique(node: any) {
  const result = await isEmailAlreadyRegistered(node.value);
  return result;
}

const submitApp = async (formData: any, node: any) => {
  console.log(formData);
  try {
    registerAddress().then(() => {
      registerUser().then(() => {
        if (userFromResponse) {
          addHeadquarter().then(() => {
            addCompany().then(() => {
              addOrder().then(() => {
                userFromResponse = null;
                hqFromResponse = null;
                companyOrZivnostModel.value.owner = 0;
                companyOrZivnostModel.value.headquarters_id = 0;
                console.log("SUPER!");
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
    // alert('Your application was submitted successfully!')
  } catch (err: any) {
    node.setErrors(err.formErrors, err.fieldErrors);
  }
};
</script>
