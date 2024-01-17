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
                        
            <FormKit type="step" name="userRegister" label="Užívateľský účet" next-label="Pokračovať">
              <userRegisterFormStep ref="userRegisterForm" />
            </FormKit>

            <FormKit type="step" name="fakturacneUdaje" label="Fakturačné údaje" previous-label="Naspäť">
              <fakturacneUdajeFormStep ref="invoiceData" />
            </FormKit>

          </FormKit>
          <div class="p-4 mb-4 text-white border rounded-md border-bizinix-border border-solid">
              Celkom k platbe <b>{{ totalForPay }} € / rok</b>.
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
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { ref, computed } from "vue";
import router from "@/router";
import { getValidationMessages } from '@formkit/validation'
import PodnikatelskeUdajeVhqFormStep from "./podnikatelskeUdajeVhqFormStep.vue"
import SidloVhqFormStepVue from "./sidloVhqFormStep.vue";
import userRegisterFormStep from "@/components/forms/UserRegisterFormStep.vue";
import fakturacneUdajeFormStep from "@/components/forms/fakturacneUdajeFormStep.vue";
import { toast } from "vue3-toastify";

let hqDataRef = ref<InstanceType<typeof SidloVhqFormStepVue>>(null as any);
let companyDataRef = ref<InstanceType<typeof PodnikatelskeUdajeVhqFormStep>>(null as any);
let userRegisterForm = ref<InstanceType<typeof userRegisterFormStep>>(null as any);
let invoiceData = ref<InstanceType<typeof fakturacneUdajeFormStep>>(null as any);
const messages = ref([]);
const totalForPay = computed(() => hqDataRef.value?.vhq_package.price * 12)

let addressFromResponse: any,
  hqFromResponse: any,
  companyFromResponse: any,
  orderFromRes: any,
  invoiceProfileFromResponse: any;

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
  fakturacne_udaje_id: 0
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

/* Submiting form and Api calls */
async function addInvoiceProfile(userId, invoiceAddressId): Promise<any> {

  let faktProfil = {
    first_name: invoiceData.value.fakturacne_udaje.first_name,
    last_name: invoiceData.value.fakturacne_udaje.last_name,
    name: invoiceData.value.fakturacne_udaje.name,
    ico: invoiceData.value.fakturacne_udaje.ico,
    dic: invoiceData.value.fakturacne_udaje.dic,
    ic_dph: invoiceData.value.fakturacne_udaje.ic_dph,
    address_id: invoiceAddressId,
    user_id: userId
  }

  return store.dispatch('addInvoiceProfile', faktProfil)
  .then((res) => {
    console.log("Adding invoice profile: ", JSON.stringify(res))
    return res
  })
  .catch((error: any) => {
    console.log(error)
  })
}

function registerAddress(): Promise<Response> {
  return store
    .dispatch("registerAddress", invoiceData.value.invoiceAddress)
    .then((res) => {
      addressFromResponse = res;
      return addressFromResponse;
    })
    .catch((err) => {
      toast.error('Error: ' + err);
    });
}

function registerUserAndReturnUserId(): Promise<any> {
  
  let user;
  if(!userRegisterForm.value.userData.id){
    user = userRegisterForm.value.user
  }

  //userRegisterForm.value.userData.address_id = addressFromResponse.address_id;
  return store
    .dispatch("registerUser", user)
    .then((res) => {
      return res.user_id;
    })
    .catch((err) => {
      toast.error('Error: ' + err);
    });
}

function addHeadquarter(): Promise<Response> {
  headquarter.value.owner_name = "Bizinix";
  headquarter.value.description = "Virtualne sidlo pre spolocnost: " + companyDataRef.value.currentCompany.name;
  headquarter.value.name = "VS-" + companyDataRef.value.currentCompany.name;
  
  //treba podla balika updatnut
  headquarter.value.price = hqDataRef.value.vhq_package.price * 12;
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

function addCompany(userId): Promise<Response> {
  if(userRegisterForm.value.userData.id) {
    companyDataRef.value.currentCompany.owner = userRegisterForm.value.userData.id;
  } else {
    companyDataRef.value.currentCompany.owner = userId;
  }
  companyDataRef.value.currentCompany.headquarters_id = hqFromResponse.id;
  companyDataRef.value.currentCompany.sidlo_typ_balika = hqDataRef.value.vhq_package.name;

  return store
    .dispatch("addCompany", companyDataRef.value.currentCompany)
    .then((res) => {
      companyFromResponse = res;
      return companyFromResponse;
    })
    .catch((err) => {
      toast.error('Error: ' + err);
    });
}

function addOrder(userId, invoiceProfileId): Promise<Response> {

  order.value.payment_date = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  order.value.company_id = companyFromResponse.company.id;
  
  if(userRegisterForm.value.userData.id) {
    order.value.user_id = userRegisterForm.value.userData.id;
  } else {
    order.value.user_id = userId;
  }

  order.value.amount = totalForPay.value;
  order.value.amount_vat = (totalForPay.value) * 0.2;
  order.value.items[0].price = hqDataRef.value.vhq_package.price * 12;
  order.value.items[0].price_vat = (hqDataRef.value.vhq_package.price * 12) * 0.2;

  order.value.fakturacne_udaje_id = invoiceProfileId
  
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

    let userId = null as unknown as number;
    if(!userRegisterForm.value.userData.id){
      userId = await registerUserAndReturnUserId();
    } else {
      userId = userRegisterForm.value.userData.id
    }

    let invoiceProfileId = null as unknown as number;
    if(invoiceData.value.createNewInvoiceProfile){
      let invoiceAddressRes: any;
      if(!invoiceData.value.orderingAsCompany){
        invoiceAddressRes = await registerAddress()
      }
      else if (invoiceData.value.orderingAsCompany) {
        invoiceAddressRes = await registerAddress()
      }
      console.log("Invoice AddressId is: ", invoiceAddressRes.address_id)

      const response = await addInvoiceProfile(userId, invoiceAddressRes.address_id)
      invoiceProfileId = response.id
    }
    else {
      invoiceProfileId = invoiceData.value.invoiceProfileId
    }
    await addHeadquarter();
    await addCompany(userId);
    await addOrder(userId, invoiceProfileId).then(() => {
      router.push({
        name: "Thanks You New Order",
        params: {
          orderId: orderFromRes.id,
        },
      });
    })
    
    node.clearErrors();
  } catch (err: any) {
    node.setErrors(err.formErrors, err.fieldErrors);
  }
};

</script>
